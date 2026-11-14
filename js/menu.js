// The menu: index tabs on the left edge of the sheet, one per worldview.
// At rest only their painted ends show. Near the edge they slide out, and a lens
// follows the pointer: the tab under it is largest, its neighbours a little less,
// and the far ones small, so all twenty fit without scrolling.

const FONT = 21;        // lettering size at the centre of the lens, px
const REST = 10.8;      // and far from it
const LENS = 1.25;      // how much taller the focused tab is than a resting one
const SPREAD = 1.7;     // how many neighbours the lens reaches

const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
const backOut = (x) => 1 + 2.2 * Math.pow(x - 1, 3) + 1.2 * Math.pow(x - 1, 2);   // settle with a slight overshoot

export function createMenu(root, items, { isBuilt, onSelect }) {
  const N = items.length;
  root.innerHTML = `<svg width="0" height="0" aria-hidden="true"><filter id="dab-edge" x="-20%" y="-20%" width="140%" height="140%">
    <feTurbulence type="fractalNoise" baseFrequency=".09" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="5"/></filter></svg>`;

  const tabs = items.map((it, i) => {
    const b = document.createElement('button');
    const built = isBuilt(it.id);
    b.className = `tab ${built ? '' : 'pencil'}`;
    b.style.setProperty('--c1', it.c[0]);
    b.style.setProperty('--c2', it.c[1]);
    b.innerHTML = `<span class="tab-name">${it.name}</span><span class="tab-dab"></span>`;
    if (!built) { b.setAttribute('aria-disabled', 'true'); b.title = 'Not yet painted'; }
    b.addEventListener('click', () => choose(i));
    b.addEventListener('focus', () => { keyFocus = i; });
    b.addEventListener('blur', () => { if (keyFocus === i) keyFocus = -1; });
    root.appendChild(b);
    return { el: b, name: b.firstChild, dab: b.lastChild, built, gapBefore: i > 0 && items[i - 1].family !== it.family, w: 0 };
  });
  const rules = tabs.filter((t) => t.gapBefore).map(() => {
    const r = document.createElement('i');
    r.className = 'tab-rule';
    root.appendChild(r);
    return r;
  });

  let cur = 0;                 // the worldview now open
  let f = 0;                   // where the lens sits, in tab positions
  let openT = 0;               // 0 hidden, 1 revealed
  let holdUntil = 0;           // stay revealed at least until this time
  let px = 9999, py = 0;       // pointer
  let mouseNear = false;
  let keyFocus = -1;
  let hot = -1;
  let scrub = null;            // a finger pressed on the edge and sliding
  let menuW = 220;
  let last = 0;

  function choose(i) {
    if (!tabs[i].built) return;
    holdUntil = performance.now() + 900;
    if (i !== cur) onSelect(items[i].id);
  }

  // ---------- pointer ----------
  addEventListener('pointermove', (e) => {
    px = e.clientX; py = e.clientY;
    if (e.pointerType === 'mouse') {
      mouseNear = px < 26 || (openT > 0.05 && px < menuW + 34);
      if (mouseNear) holdUntil = performance.now() + 450;
    }
  });
  document.addEventListener('pointerleave', () => { mouseNear = false; px = 9999; });
  addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse') return;
    px = e.clientX; py = e.clientY;
    if (openT < 0.5 && px < 34) {
      scrub = { y: py, t: performance.now(), moved: false };
      holdUntil = performance.now() + 60000;
      e.preventDefault();
    } else if (openT > 0.5 && px > menuW + 20) {
      holdUntil = 0;                              // a tap elsewhere puts the tabs away
    }
  }, { passive: false });
  addEventListener('pointerup', (e) => {
    if (!scrub) return;
    const held = performance.now() - scrub.t;
    const s = scrub;
    scrub = null;
    if (s.moved || held > 350) {                  // press, slide, lift: choose what is under the finger
      if (hot >= 0) choose(hot);
      holdUntil = performance.now() + 500;
    } else holdUntil = performance.now() + 4500;  // a quick tap only opens the tabs
  });
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { holdUntil = 0; if (keyFocus >= 0) tabs[keyFocus].el.blur(); }
    if (keyFocus < 0) return;
    if (e.key === 'ArrowDown') { tabs[Math.min(N - 1, keyFocus + 1)].el.focus(); e.preventDefault(); }
    if (e.key === 'ArrowUp') { tabs[Math.max(0, keyFocus - 1)].el.focus(); e.preventDefault(); }
  });

  // ---------- geometry ----------
  let top = 0, total = 0, restW = 0;
  const GAP = 9;
  function measure() {
    for (const t of tabs) t.w = t.name.offsetWidth;                 // width of the name at full size
    restW = Math.max(...tabs.map((t) => t.w)) * (REST / FONT) + 46;
    const vh = innerHeight, pad = Math.max(22, vh * 0.055);
    const gaps = rules.length * GAP;
    total = Math.min(vh - 2 * pad - gaps, N * 30);
    top = (vh - total - gaps) / 2;
  }
  // Heights for a lens centred at position c. The total never changes: tall tabs borrow from the rest.
  const hs = new Float32Array(N), ys = new Float32Array(N), lens = new Float32Array(N);
  function spread(c) {
    let sum = 0;
    for (let i = 0; i < N; i++) { lens[i] = Math.exp(-Math.pow((i - c) / SPREAD, 2)); sum += 1 + LENS * lens[i]; }
    let y = top;
    for (let i = 0; i < N; i++) {
      if (tabs[i].gapBefore) y += GAP;
      hs[i] = (total * (1 + LENS * lens[i])) / sum;
      ys[i] = y;
      y += hs[i];
    }
  }
  const centreOf = (c) => {
    const i = clamp(Math.floor(c), 0, N - 2), k = c - i;
    return (ys[i] + hs[i] / 2) * (1 - k) + (ys[i + 1] + hs[i + 1] / 2) * k;
  };
  // Which lens position puts its centre under a given height on screen.
  function positionAt(y) {
    let c = clamp(((y - top) / total) * N - 0.5, 0, N - 1);
    for (let n = 0; n < 5; n++) { spread(c); c = clamp(c + ((y - centreOf(c)) / (total / N)) * 0.7, 0, N - 1); }
    return c;
  }

  // ---------- loop ----------
  function frame(now) {
    const dt = Math.min(0.1, (now - last) / 1000 || 0);
    last = now;
    if (scrub && Math.abs(py - scrub.y) > 12) scrub.moved = true;

    const wantOpen = mouseNear || !!scrub || keyFocus >= 0 || now < holdUntil;
    openT = clamp(openT + (wantOpen ? dt / 0.55 : -dt / 0.4), 0, 1);
    const following = openT > 0.2 && ((mouseNear && px < menuW + 34) || !!scrub);
    const aim = keyFocus >= 0 ? keyFocus : following ? positionAt(py) : cur;
    f += (aim - f) * (1 - Math.exp(-dt * 13));
    spread(f);

    hot = -1;
    if (following) for (let i = 0; i < N; i++) if (py >= ys[i] && py < ys[i] + hs[i]) hot = i;
    document.body.classList.toggle('menu-open', openT > 0.35);

    let widest = 0, r = 0;
    for (let i = 0; i < N; i++) {
      const t = tabs[i], L = lens[i];
      const h = hs[i] - 3;
      const size = clamp(hs[i] * 0.4, REST, FONT);
      const k = size / FONT;
      // tabs nearest the lens come out first, the rest follow
      const d = Math.abs(i - f) / N;
      const out = backOut(clamp(openT * 1.5 - d * 0.5, 0, 1));
      const isCur = i === cur;
      const show = 13 + (isCur ? 11 : 0) + out * (Math.max(restW, t.w * k + 50) - 13 + L * 14 + (isCur ? 6 : 0));
      const lean = following ? clamp((py - (ys[i] + hs[i] / 2)) / 260, -1, 1) * 1.6 * L * openT : 0;
      t.el.style.height = `${h.toFixed(1)}px`;
      t.el.style.transform = `translate3d(${(show - 420).toFixed(1)}px, ${ys[i].toFixed(1)}px, 0) rotate(${lean.toFixed(2)}deg)`;
      t.name.style.transform = `scale(${k.toFixed(3)})`;
      t.name.style.opacity = clamp(out * 1.4 - 0.2, 0, 1).toFixed(2);
      const ds = clamp(h * 0.62, 9, 26) * (1 + 0.35 * L * openT + (i === hot ? 0.18 : 0));
      t.dab.style.width = t.dab.style.height = `${ds.toFixed(1)}px`;
      t.el.classList.toggle('hot', i === hot || i === keyFocus);
      t.el.classList.toggle('cur', isCur);
      t.el.tabIndex = openT > 0.5 || isCur ? 0 : -1;
      widest = Math.max(widest, show);
      if (t.gapBefore) {
        const rule = rules[r++];
        rule.style.transform = `translate3d(0, ${(ys[i] - GAP / 2 - 1).toFixed(1)}px, 0)`;
        rule.style.width = `${(restW * 0.55 * openT).toFixed(1)}px`;
        rule.style.opacity = (0.5 * openT).toFixed(2);
      }
    }
    menuW = widest;
    requestAnimationFrame(frame);
  }

  addEventListener('resize', measure);
  document.fonts.ready.then(measure);
  measure();
  requestAnimationFrame(frame);

  return {
    setCurrent(id) { cur = Math.max(0, items.findIndex((x) => x.id === id)); },
    // show the tabs for a moment, so people learn they are there
    peek(ms) { holdUntil = Math.max(holdUntil, performance.now() + ms); },
  };
}
