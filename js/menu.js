// The menu: a painter's test strip down the left margin of the sheet, one dab of
// paint per worldview. Near the edge each dab is pulled into a brushstroke with its
// name lettered on it, and a lens follows the pointer: the stroke under it is largest,
// its neighbours a little less, and the far ones small, so all twenty fit without scrolling.

const FONT = 21;        // lettering size at the centre of the lens, px
const REST = 10.8;      // and far from it
const LENS = 1.25;      // how much taller the focused tab is than a resting one
const SPREAD = 1.7;     // how many neighbours the lens reaches
const HERE = 0.55;      // extra height always given to the worldview now open
const EDGE = 26;        // a mouse this close to the left edge calls the tabs out
const TOUCH_EDGE = 44;  // a finger needs a wider strip

const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
const backOut = (x) => 1 + 2.2 * Math.pow(x - 1, 3) + 1.2 * Math.pow(x - 1, 2);   // settle with a slight overshoot

export function createMenu(root, items, { isBuilt, onSelect }) {
  const N = items.length;
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.innerHTML = `<svg width="0" height="0" aria-hidden="true"><filter id="dab-edge" x="-20%" y="-20%" width="140%" height="140%">
    <feTurbulence type="fractalNoise" baseFrequency=".09" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="5"/></filter>
    <filter id="veil-edge" x="-10%" y="-5%" width="130%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency=".007" numOctaves="3" seed="2"/><feDisplacementMap in="SourceGraphic" scale="70"/></filter></svg>`;
  root.insertAdjacentHTML('beforeend', '<div class="menu-veil"></div>');

  const tabs = items.map((it, i) => {
    const b = document.createElement('button');
    const built = isBuilt(it.id);
    b.className = `tab ${built ? '' : 'pencil'}`;
    b.style.setProperty('--c1', it.c[0]);
    b.style.setProperty('--c2', it.c[1]);
    b.innerHTML = `<span class="tab-stroke"></span>${built ? '' : '<span class="tab-note">not yet painted</span>'}<span class="tab-name">${it.name}</span><span class="tab-dab"></span>`;
    if (!built) b.setAttribute('aria-disabled', 'true');
    b.addEventListener('click', () => { choose(i); b.blur(); });
    // only a keyboard's focus should hold the menu open, not the focus a click leaves behind
    b.addEventListener('focus', () => { if (b.matches(':focus-visible')) keyFocus = i; });
    b.addEventListener('blur', () => { if (keyFocus === i) keyFocus = -1; });
    root.appendChild(b);
    return { el: b, name: b.querySelector('.tab-name'), dab: b.lastChild, built, gapBefore: i > 0 && items[i - 1].family !== it.family, w: 0 };
  });

  let cur = 0;                 // the worldview now open
  let f = 0;                   // where the lens sits, in tab positions
  let aim = 0;                 // where it is heading
  let openT = 0;               // 0 hidden, 1 out
  let depth = 0.3;             // how far out "out" is: 1 in use, less for a passing glimpse
  let holdUntil = 0;           // stay fully out at least until this time
  let peekUntil = 0;           // show a glimpse until this time
  let px = 9999, py = 0;       // pointer
  let mouseNear = false;
  let dismissed = false;       // a choice was made: stay away until the pointer leaves and returns
  let keyFocus = -1;
  let hot = -1;
  let scrub = null;            // a finger pressed on the tabs
  let menuW = 220;
  let last = 0;
  let stamp = '';
  let lastTouch = -1e9;

  function choose(i) {
    if (!tabs[i].built) return;
    dismissed = true;
    mouseNear = false;
    holdUntil = performance.now() + 250;
    if (i !== cur) onSelect(items[i].id);
  }
  const inReach = () => px < EDGE || (openT > 0.05 && px < menuW + 34);

  // ---------- mouse ----------
  addEventListener('pointermove', (e) => {
    px = e.clientX; py = e.clientY;
    // a touch is followed by make-believe mouse events: ignore those
    if (e.pointerType !== 'mouse') { lastTouch = performance.now(); return; }
    if (performance.now() - lastTouch < 900) return;
    const near = inReach();
    if (!near) dismissed = false;
    mouseNear = near && !dismissed;
    if (mouseNear) holdUntil = performance.now() + 450;
  });
  const away = () => { mouseNear = false; dismissed = false; px = 9999; };
  document.documentElement.addEventListener('mouseleave', away);
  addEventListener('blur', away);

  // ---------- touch: press the edge, slide to move the lens, lift to choose ----------
  addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse') return;
    lastTouch = performance.now();
    mouseNear = false;
    px = e.clientX; py = e.clientY;
    const wasOpen = openT > 0.6 && depth > 0.6;
    if (px < TOUCH_EDGE || (wasOpen && px < menuW + 20)) {
      scrub = { y: py, t: performance.now(), moved: false, wasOpen };
      e.preventDefault();
    } else if (wasOpen) holdUntil = 0;              // a tap elsewhere puts the tabs away
  }, { passive: false });
  const lift = (chooseIt) => {
    if (!scrub) return;
    const s = scrub, held = performance.now() - s.t;
    scrub = null;
    if (chooseIt && (s.wasOpen || s.moved || held > 350) && hot >= 0 && tabs[hot].built) choose(hot);
    else holdUntil = performance.now() + 4500;      // a first quick tap only opens the tabs
  };
  addEventListener('pointerup', (e) => { if (e.pointerType !== 'mouse') { lastTouch = performance.now(); lift(true); } });
  addEventListener('pointercancel', () => lift(false));

  // ---------- keyboard ----------
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { holdUntil = 0; dismissed = true; if (keyFocus >= 0) tabs[keyFocus].el.blur(); }
    if (keyFocus < 0) return;
    if (e.key === 'ArrowDown') { tabs[Math.min(N - 1, keyFocus + 1)].el.focus(); e.preventDefault(); }
    if (e.key === 'ArrowUp') { tabs[Math.max(0, keyFocus - 1)].el.focus(); e.preventDefault(); }
  });

  // ---------- geometry ----------
  let top = 0, total = 0, restW = 0, small = REST;
  const GAP = 9;
  function measure() {
    for (const t of tabs) t.w = t.name.offsetWidth;                 // width of the name at full size
    const vh = innerHeight, pad = Math.max(18, vh * 0.055);
    const gaps = tabs.filter((t) => t.gapBefore).length * GAP;
    total = Math.max(N * 11, Math.min(vh - 2 * pad - gaps, N * 30));
    top = (vh - total - gaps) / 2;
    small = Math.min(REST, (total / N) * 0.5);                      // in a short window the resting lettering shrinks too
    restW = Math.max(...tabs.map((t) => t.w)) * (small / FONT) + 46;
    stamp = '';
  }
  // Heights for a lens centred at position c. The total never changes: tall tabs borrow from the rest.
  const hs = new Float32Array(N), ys = new Float32Array(N), lens = new Float32Array(N), wt = new Float32Array(N);
  function spread(c) {
    let sum = 0;
    for (let i = 0; i < N; i++) { lens[i] = Math.exp(-Math.pow((i - c) / SPREAD, 2)); wt[i] = 1 + LENS * lens[i] + (i === cur ? HERE : 0); sum += wt[i]; }
    let y = top;
    for (let i = 0; i < N; i++) {
      if (tabs[i].gapBefore) y += GAP;
      hs[i] = (total * wt[i]) / sum;
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

    const inUse = mouseNear || !!scrub || keyFocus >= 0 || now < holdUntil;
    const glimpse = !inUse && now < peekUntil;
    const want = inUse || glimpse ? 1 : 0;
    openT = calm ? want : clamp(openT + (want ? dt / 0.55 : -dt / 0.4), 0, 1);
    // in use the tabs come right out; for a passing glimpse they only edge forward
    if (openT === 0 && !inUse) depth = 0.3;
    else depth = calm ? (inUse ? 1 : 0.3) : depth + ((inUse ? 1 : 0.3) - depth) * (1 - Math.exp(-dt * 10));

    const following = openT > 0.2 && ((mouseNear && px < menuW + 34) || !!scrub);
    // while the tabs slide away the lens stays where it was, then goes home to the open worldview
    if (keyFocus >= 0) aim = keyFocus;
    else if (following) aim = positionAt(py);
    else if (!inUse && (openT < 0.05 || glimpse)) aim = cur;
    else if (!inUse && openT === 1) aim = cur;
    f = calm ? aim : f + (aim - f) * (1 - Math.exp(-dt * 13));
    spread(f);

    hot = -1;
    if (following) for (let i = 0; i < N; i++) if (py >= ys[i] && py < ys[i] + hs[i]) hot = i;
    const shown = hot >= 0 ? hot : keyFocus;

    // nothing has moved since the last frame: leave the page alone
    const key = `${openT.toFixed(3)}|${f.toFixed(3)}|${depth.toFixed(2)}|${shown}|${cur}|${following ? py | 0 : ''}`;
    if (key === stamp) return requestAnimationFrame(frame);
    stamp = key;

    document.body.classList.toggle('menu-open', openT > 0.35 && depth > 0.6);
    let widest = 0;
    for (let i = 0; i < N; i++) {
      const t = tabs[i], L = lens[i];
      const h = hs[i] - 3;
      const size = clamp(hs[i] * 0.4, small, FONT);
      const k = size / FONT;
      // strokes nearest the lens are pulled out first, the rest follow
      const d = Math.abs(i - f) / N;
      const x = clamp(openT * 1.5 - d * 0.5, 0, 1);
      const out = (calm ? x : backOut(x)) * depth;
      const isCur = i === cur;
      t.el.style.height = `${h.toFixed(1)}px`;
      t.el.style.transform = `translate3d(0, ${ys[i].toFixed(1)}px, 0)`;
      t.el.style.setProperty('--out', out.toFixed(3));
      t.el.style.setProperty('--lens', L.toFixed(3));
      t.el.style.setProperty('--tw', `${(t.w * k).toFixed(1)}px`);
      t.name.style.transform = `scale(${k.toFixed(3)})`;
      t.el.style.setProperty('--ink-in', clamp(out * 1.6 - 0.5, 0, 1).toFixed(2));
      const ds = clamp(h * 0.62, 8, 26) * (1 + 0.35 * L * openT * depth + (i === shown ? 0.18 : 0));
      t.dab.style.width = t.dab.style.height = `${ds.toFixed(1)}px`;
      t.el.style.setProperty('--ds', `${ds.toFixed(1)}px`);
      t.el.classList.toggle('hot', i === shown);
      t.el.classList.toggle('cur', isCur);
      t.el.tabIndex = isCur || (openT > 0.5 && depth > 0.6) ? 0 : -1;
      widest = Math.max(widest, 44 + out * (t.w * k + 20));
    }
    menuW = widest;
    root.style.setProperty('--mopen', (openT * clamp(depth * 1.6 - 0.6, 0, 1)).toFixed(3));
    root.style.setProperty('--mw', `${widest.toFixed(0)}px`);
    requestAnimationFrame(frame);
  }

  addEventListener('resize', measure);
  document.fonts.ready.then(measure);
  measure();
  requestAnimationFrame(frame);

  return {
    setCurrent(id) { cur = Math.max(0, items.findIndex((x) => x.id === id)); stamp = ''; },
    // slide the tabs a little way out for a moment, so people learn they are there
    peek(ms) { peekUntil = Math.max(peekUntil, performance.now() + ms); },
    // for tests
    state: () => ({ openT, depth, f, hot, cur, keyFocus, mouseNear, dismissed, menuW }),
  };
}
