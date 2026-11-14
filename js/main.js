import { createPainter } from './paint.js?v=7';
import { WORLDVIEWS, HOME } from './worldviews.js?v=7';
import { CATALOGUE } from './catalogue.js?v=7';
import { createMenu } from './menu.js?v=7';

// The address ends in #worldview/act, for example #deism/reason.
// For stills: ?wv=deism&act=3&t=5 freezes the clock; adding &k=0.5 shows the
// halfway point of the move from the other worldview.

const $ = (id) => document.getElementById(id);
const params = new URLSearchParams(location.search);
const frozen = params.has('t') ? Number(params.get('t')) : null;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

const canvas = $('c');
let painter = null;
// ?nopaint leaves the sheet blank, so tests of the controls run at full speed
if (!params.has('nopaint')) {
  try { painter = createPainter(canvas); } catch (err) { console.error(err); }
  if (!painter) $('nogl').hidden = false;
}

// ---------- where we are ----------
const cur = { wv: HOME, act: 0 };
function readHash() {
  const [a, b] = location.hash.slice(1).split('/');
  const wv = WORLDVIEWS[a] ? a : WORLDVIEWS[params.get('wv')] ? params.get('wv') : HOME;
  const slug = WORLDVIEWS[a] ? b : a;
  const bySlug = WORLDVIEWS[wv].acts.findIndex((x) => x.slug === slug);
  return { wv, act: bySlug >= 0 ? bySlug : Math.min(3, Math.max(0, (Number(params.get('act')) || 1) - 1)) };
}
Object.assign(cur, readHash());
const actOf = (c = cur) => WORLDVIEWS[c.wv].acts[c.act];
const target = () => ({ ...actOf().p, act: cur.act });

const lerp = (a, b, k) => (typeof a === 'number' ? a + (b - a) * k : a.map((v, i) => v + (b[i] - v) * k));
const blendP = (a, b, k) => { const o = {}; for (const n in b) o[n] = lerp(a[n], b[n], k); return o; };
const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

let live = target();
let from = live;
let t0 = -1e9;
let dur = 1;
if (params.has('k')) {
  const other = Object.keys(WORLDVIEWS).find((w) => w !== cur.wv);
  live = blendP({ ...WORLDVIEWS[other].acts[cur.act].p, act: cur.act }, target(), Number(params.get('k')));
}

// ---------- lettering ----------
const KEYS = ['god', 'world', 'bridge', 'self', 'sin'];
const ALIGN = { god: 'center', world: 'center', bridge: 'left', self: 'left', sin: 'right' };
const NS = 'http://www.w3.org/2000/svg';
const labels = {};
for (const k of KEYS) {
  const el = document.createElement('div');
  el.className = `l ${ALIGN[k]}`;
  $('labels').appendChild(el);
  const g = document.createElementNS(NS, 'g');
  const path = document.createElementNS(NS, 'path');
  const dot = document.createElementNS(NS, 'circle');
  dot.setAttribute('r', 2.6);
  g.append(path, dot);
  if (ALIGN[k] !== 'center') $('lines').appendChild(g);
  labels[k] = { el, g, path, dot, on: false, timer: null, w: 0, h: 0 };
}
function setLabel(k, content, instant) {
  const L = labels[k];
  const html = content ? `${content[0]}<small>${content[1]}</small>` : '';
  if (L.html === html) return;
  L.html = html;
  clearTimeout(L.timer);
  const apply = () => {
    L.el.innerHTML = html;
    L.on = !!content;
    L.el.style.opacity = L.on ? 1 : 0;
    L.g.style.opacity = L.on ? 1 : 0;
    measure();
  };
  if (instant) return apply();
  L.el.style.opacity = 0;
  L.g.style.opacity = 0;
  L.timer = setTimeout(apply, 550);
}

const marks = [0, 1, 2, 3].map((i) => {
  const b = document.createElement('button');
  b.onclick = () => { auto = false; go(cur.wv, i); };
  $('marks').appendChild(b);
  return b;
});
const moveBtn = document.createElement('button');
$('moves').appendChild(moveBtn);
moveBtn.onclick = () => { auto = false; go(WORLDVIEWS[cur.wv].move.to, cur.act); };

let swapTimer = null;
function renderText(instant, wholePage) {
  const wv = WORLDVIEWS[cur.wv];
  const a = actOf();
  marks.forEach((b, i) => b.setAttribute('aria-current', i === cur.act));
  KEYS.forEach((k) => setLabel(k, a.labels[k], instant));
  const fill = () => {
    document.title = `${wv.name} · Worldviews in Motion`;
    $('name').textContent = wv.name;
    $('tag').textContent = wv.tagline;
    $('actName').textContent = a.name;
    $('actText').textContent = a.text;
    marks.forEach((b, i) => { b.textContent = wv.acts[i].name; });
    moveBtn.textContent = wv.move.q;
    document.body.classList.remove('swap', 'swap-all');
  };
  clearTimeout(swapTimer);
  if (instant) return fill();
  document.body.classList.add(wholePage ? 'swap-all' : 'swap');
  swapTimer = setTimeout(fill, 480);
}

function go(wv, act) {
  if (!WORLDVIEWS[wv]) return;
  act = Math.min(3, Math.max(0, act));
  if (wv === cur.wv && act === cur.act) return;
  const moved = wv !== cur.wv;
  from = { ...live };
  cur.wv = wv;
  cur.act = act;
  t0 = performance.now();
  dur = reduced ? 1 : moved ? 4200 : 2600;
  history.replaceState(null, '', `#${wv}/${actOf().slug}`);
  renderText(false, moved);
  if (moved) { menu.setCurrent(wv); menu.peek(1600); }
}
// ---------- the menu of worldviews ----------
const menu = createMenu($('menu'), CATALOGUE, {
  isBuilt: (id) => !!WORLDVIEWS[id],
  onSelect: (id) => { auto = false; go(id, cur.act); },
});
menu.setCurrent(cur.wv);
window.__menu = menu;
// an address typed or pasted while the page is open
addEventListener('hashchange', () => { const h = readHash(); auto = false; go(h.wv, h.act); });
if (frozen === null) menu.peek(2800);

let auto = frozen === null && !location.hash && !params.has('act') && !reduced;
addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') { auto = false; go(cur.wv, cur.act + 1); }
  if (e.key === 'ArrowLeft') { auto = false; go(cur.wv, cur.act - 1); }
});
setInterval(() => { if (auto && !document.hidden) go(cur.wv, (cur.act + 1) % 4); }, 14000);

// ---------- layout ----------
let unit = 1, ext = 1, cx = 0, cy = 0, scale = 1, quality = 1;
const rects = new Float32Array(12);
function resize() {
  const W = innerWidth, Hh = innerHeight;
  const narrow = W / Hh < 1.3;
  document.body.classList.toggle('narrow', narrow);
  if (narrow) {
    // title above, painting in the middle, the act's words below
    const topH = document.querySelector('.head').getBoundingClientRect().bottom + 4;
    const botH = Hh - document.querySelector('.act').getBoundingClientRect().top + 4;
    unit = Math.min((Hh - topH - botH) / 1.94, W / 1.85);
    cx = W / 2;
    cy = topH + (Hh - topH - botH) / 2 + 0.02 * unit;
    ext = W / 2 / unit - 0.13;
  } else {
    unit = Math.min(Hh / 2, W / 1.5);
    cx = W / 2;
    cy = Hh / 2;
    ext = Math.min(1.05, W / 2 / unit - 0.16);
  }
  scale = Math.min(window.devicePixelRatio || 1, 2) * quality;
  if (painter) painter.resize(Math.round(W * scale), Math.round(Hh * scale));
  marks.forEach((b, i) => {
    b.style.left = `${cx + ext * (-0.72 + 0.48 * i) * unit}px`;
    b.style.top = `${cy + 0.795 * unit}px`;
  });
  const room = (x) => `${Math.max(60, (W / 2 / unit - x - 0.1) * unit)}px`;
  labels.bridge.el.style.maxWidth = room(0.22);
  labels.self.el.style.maxWidth = room(0.56);
  labels.sin.el.style.maxWidth = room(0.56);
  measure();
}
function measure() {
  for (const k of KEYS) {
    labels[k].w = labels[k].el.offsetWidth / unit;
    labels[k].h = labels[k].el.offsetHeight / unit;
  }
}
const X = (x) => cx + x * unit;
const Y = (y) => cy - y * unit;

function place(k, x, y, tx, ty) {
  const L = labels[k];
  const shift = { center: '-50%', left: '0%', right: '-100%' }[ALIGN[k]];
  L.el.style.transform = `translate(${X(x)}px, ${Y(y)}px) translate(${shift}, -50%)`;
  if (tx === undefined) return;
  // a leader line from the lettering to the thing it names
  const gap = 0.02 * (ALIGN[k] === 'right' ? 1 : -1);
  L.path.setAttribute('d', `M${X(x + gap)},${Y(y)} L${X(tx)},${Y(ty)}`);
  L.dot.setAttribute('cx', X(tx));
  L.dot.setAttribute('cy', Y(ty));
}

function layout(p) {
  const godY = p.Gy + p.rG * p.lGodK, worldY = p.Wy - p.rW * 0.6;
  place('god', 0, godY);
  place('world', 0, worldY);
  place('bridge', p.lBrX, p.lBrY, p.tBrX, p.tBrY);
  place('self', p.rW + p.lSide, p.Sy + 0.03, 0.105, p.Sy);
  place('sin', -(p.rW + p.lSide), p.Sy - 0.08, -0.02 - p.stainR * 0.8, p.Sy - 0.06);
  const bl = labels.bridge;
  rects.set([0, godY, labels.god.w / 2 + 0.02, labels.god.h / 2 + 0.012, 0, worldY, labels.world.w / 2 + 0.02, labels.world.h / 2 + 0.012,
    p.lBrX + bl.w / 2, p.lBrY, bl.on ? bl.w / 2 + 0.02 : 0, bl.h / 2 + 0.012]);
}

// ---------- connectors ----------
// Things that join, point and mark are drawn as plain strokes over the paint:
// warm ink, one accent colour, and a paper-coloured edge so they read on any wash.
const connSvg = $('conn');
const DARK = '#33271f', RED = [163, 38, 43], OCHRE = [176, 122, 30], GREY = '#6f6a66', PAP = '#f8f2e4';
const f = (n) => n.toFixed(4);
const rgb = (c) => `rgb(${c.map(Math.round).join(',')})`;
const stroke = (d, col, wd) => `<path d="${d}" fill="none" stroke="${PAP}" stroke-width="${f(wd + 0.012)}" stroke-linecap="round" stroke-linejoin="round" opacity=".92"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${f(wd)}" stroke-linecap="round" stroke-linejoin="round"/>`;
const shape = (d, col) => `<path d="${d}" fill="${col}" stroke="${PAP}" stroke-width=".012" stroke-linejoin="round" opacity=".92"/><path d="${d}" fill="${col}"/>`;

function drawConn(p, c) {
  const bTop = p.Gy - p.rG + p.bOff;
  const top = -bTop, bot = -p.bbot;              // svg y grows downward
  const ACC = rgb(p.acc);
  let g = '';

  // ----- the bridge from God to man, with arrowheads running down it -----
  if (p.bridge > 0.01) {
    const WD = p.bw, HW = WD / 2, k = WD / 0.044;
    const COL = rgb(lerp(OCHRE, RED, p.crim));
    let arrows = '';
    const gapS = 0.085;
    for (let oy = top - 2 * gapS + (c.arrow % gapS); oy < bot; oy += gapS) arrows += `<path d="M${f(-0.0135 * k)},${f(oy)} L0,${f(oy + 0.0165 * k)} L${f(0.0135 * k)},${f(oy)}"/>`;
    const arrowsIn = `<g clip-path="url(#bc)" fill="none" stroke="${PAP}" stroke-width="${f(0.0085 * k)}" stroke-linecap="round" stroke-linejoin="round" opacity="${f(Math.min(1, p.flow * 2))}">${arrows}</g>`;
    g += `<g opacity="${f(Math.min(1, p.bridge * 1.3))}">`;
    if (p.snap > 0.02) {
      // snapped: two pieces whose jagged ends would fit, the lower one fallen aside
      const yb = -(bTop - (bTop - p.bbot) * 0.5), gap = 0.085 * p.snap;
      const jag = (y) => [[HW, -0.012], [HW * 0.35, 0.012], [-HW * 0.25, -0.016], [-HW, 0.008]].map(([x, dy]) => `${f(x)},${f(y + dy)}`);
      const upper = `M${f(-HW)},${f(top + HW)} A${f(HW)} ${f(HW)} 0 0 1 ${f(HW)},${f(top + HW)} L${jag(yb - gap / 2).join(' L')}Z`;
      const lower = `M${jag(yb + gap / 2).reverse().join(' L')} L${f(HW)},${f(bot - HW)} A${f(HW)} ${f(HW)} 0 0 1 ${f(-HW)},${f(bot - HW)}Z`;
      const lean = p.snap * (13 + 1.8 * Math.sin(c.t * 0.9));
      g += `<defs><clipPath id="bc"><path d="${upper}"/></clipPath></defs>${shape(upper, COL)}${arrowsIn}`;
      g += `<g transform="rotate(${f(lean)} 0 ${f(bot)})" opacity="${f(1 - 0.22 * p.snap)}">${shape(lower, COL)}</g>`;
    } else {
      g += `<defs><clipPath id="bc"><rect x="-.04" y="${f(top)}" width=".08" height="${f(Math.max(0.001, bot - top))}"/></clipPath></defs>`;
      g += stroke(`M0,${f(top)} V${f(bot)}`, COL, WD);
      g += `<g opacity="${f(p.cross)}">${stroke(`M-.105,-.03 H.105`, COL, WD)}</g>`;
      g += `<path d="M0,${f(top)} V${f(bot)}" fill="none" stroke="${COL}" stroke-width="${f(WD)}" stroke-linecap="round"/>${arrowsIn}`;
    }
    g += '</g>';
  }

  // ----- where a word from God would have come: an empty, dashed outline -----
  if (p.ghost > 0.01) {
    g += `<path d="M-.022,${f(top)} V${f(bot)} M.022,${f(top)} V${f(bot)}" fill="none" stroke="${GREY}" stroke-width=".0042" stroke-linecap="round" stroke-dasharray=".016 .018" opacity="${f(p.ghost)}"/>`;
  }

  // ----- reason: a thin line climbing from man, with marks moving upward -----
  if (p.reason > 0.01) {
    const y0 = -(p.Wy + p.rW + 0.115), y1 = top + 0.035;
    g += `<g opacity="${f(p.reason)}">${stroke(`M0,${f(y0)} V${f(y1)}`, ACC, 0.0075)}
      <path d="M0,${f(y0)} V${f(y1 + 0.02)}" fill="none" stroke="${PAP}" stroke-width=".0038" stroke-linecap="round" stroke-dasharray=".016 .07" stroke-dashoffset="${f(c.t * 0.045)}"/>
      <path d="M0,${f(y1 - 0.04)} L-.021,${f(y1 + 0.004)} L.021,${f(y1 + 0.004)}Z" fill="${ACC}" stroke="${PAP}" stroke-width=".004" stroke-linejoin="round"/></g>`;
  }

  // ----- the line of history -----
  const ty = 0.87, bx = ext * (-0.72 + 0.48 * p.act);
  g += stroke(`M${f(-ext)},${ty} H${f(ext + 0.04)}`, DARK, 0.0055);
  if (p.tick > 0.01) {
    let ticks = '';
    for (let i = 0; i <= 48; i++) ticks += `M${f(-ext + (2 * ext * i) / 48)},${ty + 0.012} v.014 `;
    g += `<path d="${ticks}" stroke="${DARK}" stroke-width=".002" opacity="${f(0.7 * p.tick)}"/>`;
  }
  g += `<path d="M${f(ext + 0.085)},${ty} L${f(ext + 0.03)},${ty - 0.026} L${f(ext + 0.03)},${ty + 0.026}Z" fill="${DARK}" stroke="${PAP}" stroke-width=".004" stroke-linejoin="round"/>`;
  for (let i = 0; i < 4; i++) g += `<circle cx="${f(ext * (-0.72 + 0.48 * i))}" cy="${ty}" r=".013" fill="${PAP}" stroke="${DARK}" stroke-width=".0055"/>`;
  const beat = lerp(0.004 * Math.sin(c.t * 2.4), 0.005 * c.tock, p.tick);     // a pulse, or the tick of a clock
  g += `<circle cx="${f(bx)}" cy="${ty}" r="${f(0.031 + beat)}" fill="none" stroke="${ACC}" stroke-width=".003"/><circle cx="${f(bx)}" cy="${ty}" r=".018" fill="${ACC}" stroke="${PAP}" stroke-width=".004"/>`;

  connSvg.innerHTML = `<g transform="translate(${f(cx)},${f(cy)}) scale(${f(unit)})">${g}</g>`;
}

// ---------- time ----------
// The clock in the painting keeps the visitor's own time. The second hand ticks:
// it jumps, overshoots a little and settles.
const TAU = Math.PI * 2;
function hands() {
  let s, m, h;
  if (frozen !== null) { s = 37 + frozen; m = 8 + s / 60; h = 10 + m / 60; }
  else {
    const d = new Date();
    s = d.getSeconds() + d.getMilliseconds() / 1000;
    m = d.getMinutes() + s / 60;
    h = (d.getHours() % 12) + m / 60;
  }
  const whole = Math.floor(s), x = Math.min(1, (s - whole) / 0.22);
  const settle = 1 + 2.4 * Math.pow(x - 1, 3) + 1.4 * Math.pow(x - 1, 2);    // ease out, with a small overshoot
  return { sec: ((whole - 1 + settle) / 60) * TAU, min: (m / 60) * TAU, hour: (h / 12) * TAU, whole, tock: 1 - x };
}

// ---------- loop ----------
let lastT = 0, acc = 0, nF = 0, arrow = 0, accent = '';
function frame(now) {
  const dt = lastT ? Math.min(100, now - lastT) / 1000 : 0;
  // if frames come slowly, paint at a lower resolution rather than stutter
  if (frozen === null && lastT) {
    acc += now - lastT;
    if (++nF === 40) {
      if (acc / nF > 36 && quality > 0.5) { quality -= 0.25; resize(); }
      acc = 0; nF = 0;
    }
  }
  lastT = now;

  if (!params.has('k')) live = blendP(from, target(), ease(Math.min(1, (now - t0) / dur)));
  const p = live;
  const t = frozen !== null ? frozen : reduced ? 0 : now / 1000;
  const hd = hands();
  arrow = frozen !== null ? frozen * 0.04 * p.flow : arrow + dt * 0.04 * p.flow * (reduced ? 0 : 1);

  const css = rgb(p.acc);
  if (css !== accent) { accent = css; document.documentElement.style.setProperty('--red', css); }

  layout(p);
  if (painter) {
    const entry = p.Wy + p.rW - 0.02;
    painter.draw({
      uRes: [canvas.width, canvas.height], uCen: [cx * scale, canvas.height - cy * scale], uUnit: unit * scale, uT: t,
      uG: [p.Gy, p.rG], uW: [p.Wy, p.rW], uSy: p.Sy,
      uGlory: p.glory, uSky: p.sky, uFar: p.far, uLow: p.low, uDeep: p.deep, uSea: p.sea, uLand: p.land,
      uGodC: p.godC, uGodRim: p.godRim, uStainC: p.stainC, uBg: p.bg, uWarm: p.warm, uGodA: p.godA,
      uWave: p.wave, uHaloL: p.haloL, uHaloR: p.haloR, uClock: p.clock, uRing: p.ring, uStainS: p.stainS,
      uStainR: p.stainR, uStainA: p.stainA, uGlow: p.glow, uDull: p.dull, uRip: p.rip, uRipY: entry + (p.Sy - entry) * p.ripAt,
      uTick: hd.whole, uHands: [hd.sec, hd.min, hd.hour], 'uLab[0]': rects,
    });
  }
  drawConn(p, { t, arrow, tock: hd.tock });
  requestAnimationFrame(frame);
}

addEventListener('resize', resize);
renderText(true);
resize();
document.fonts.ready.then(resize);
requestAnimationFrame(frame);
