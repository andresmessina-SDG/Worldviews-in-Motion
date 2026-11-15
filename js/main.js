// Each deploy raises the ?v= number on these four imports and on the two in index.html, all to the same
// value, so that browsers fetch the new files together instead of mixing new ones with old cached ones.
import { createPainter } from './paint.js?v=32';
import { WORLDVIEWS, HOME } from './worldviews.js?v=32';
import { CATALOGUE } from './catalogue.js?v=32';
import { createMenu } from './menu.js?v=32';

// The address ends in #worldview/act, for example #deism/reason.
// For stills: ?wv=deism&act=3&t=5 freezes the clock; adding &k=0.5 shows the
// halfway point of the move from another worldview, named with &from= (and its act with &fromAct=).

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

// Every move, between acts or between worldviews, is this blend of every value at once. It walks the keys
// of the target, so each value must exist on both sides (see the rules at the top of worldviews.js).
const lerp = (a, b, k) => (typeof a === 'number' ? a + (b - a) * k : a.map((v, i) => v + (b[i] - v) * k));
const blendP = (a, b, k) => { const o = {}; for (const n in b) o[n] = lerp(a[n], b[n], k); return o; };
const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

let live = target();
let from = live;
let t0 = -1e9;
let dur = 1;
if (params.has('k')) {
  const other = WORLDVIEWS[params.get('from')] ? params.get('from') : Object.keys(WORLDVIEWS).find((w) => w !== cur.wv);
  const fa = params.has('fromAct') ? Math.min(3, Math.max(0, Number(params.get('fromAct')) - 1)) : cur.act;
  live = blendP({ ...WORLDVIEWS[other].acts[fa].p, act: cur.act }, target(), Number(params.get('k')));
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
  if (ALIGN[k] !== 'center' || k === 'god') $('lines').appendChild(g);
  labels[k] = { el, g, path, dot, on: false, timer: null, w: 0, h: 0 };
}
// (the line and its dot fade themselves, rather than their group, for the reason given at flatten() below)
function fadeLeader(L, a) {
  L.path.style.strokeOpacity = (0.9 * a).toFixed(3);
  L.dot.style.fillOpacity = a.toFixed(3);
}
function setLabel(k, content, instant, wait = 550) {
  const L = labels[k];
  const html = content ? `${content[0]}<small>${content[1]}</small>` : '';
  if (L.html === html) return;
  L.html = html;
  clearTimeout(L.timer);
  const apply = () => {
    L.el.innerHTML = html;
    L.on = !!content;
    L.el.style.opacity = L.on ? 1 : 0;
    fadeLeader(L, L.on ? 1 : 0);
    measure();
  };
  if (instant) return apply();
  L.el.style.opacity = 0;
  fadeLeader(L, 0);
  L.timer = setTimeout(apply, wait);
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
  // between worldviews the lettering stays away until the shapes have nearly settled
  KEYS.forEach((k) => setLabel(k, a.labels[k], instant, wholePage && !reduced ? 2900 : 550));
  const fill = () => {
    document.title = `${wv.name} · Worldviews in Motion`;
    $('name').textContent = wv.name;
    $('tag').textContent = wv.tagline;
    $('actName').textContent = a.name;
    $('actText').textContent = a.text;
    marks.forEach((b, i) => { b.textContent = wv.acts[i].name; });
    moveBtn.textContent = wv.move.q;
    document.body.classList.remove('swap', 'swap-all');
    if (!instant) resize();                     // new words may take a different amount of room
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
let unit = 1, ext = 1, cx = 0, cy = 0, scale = 1, quality = 1, markH = 0;
let wordsRight = -1e9, wordsBottom = 1e9;       // the corner of the words on the left, in scene units
const rects = new Float32Array(12);
function resize() {
  const W = innerWidth, Hh = innerHeight;
  const narrow = W / Hh < 1.3;
  document.body.classList.toggle('narrow', narrow);
  const short = !narrow && Hh < 520;
  document.body.classList.toggle('short', short);
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
  // (the washes gain nothing visible beyond 1.5 pixels per point, and twice the density costs nearly twice as much)
  scale = Math.min(window.devicePixelRatio || 1, 1.5) * quality;
  if (painter) painter.resize(Math.round(W * scale), Math.round(Hh * scale));
  marks.forEach((b, i) => {
    b.style.left = `${cx + ext * (-0.72 + 0.48 * i) * unit}px`;
    b.style.top = `${cy + 0.795 * unit}px`;
  });
  const room = (x) => `${Math.max(60, (W / 2 / unit - x - 0.1) * unit)}px`;
  labels.bridge.el.style.maxWidth = room(Math.max(0.22, actOf().p.lBrX));
  labels.self.el.style.maxWidth = room(0.56);
  labels.sin.el.style.maxWidth = room(0.56);
  // in a short window the words on the left reach down beside the painting: keep clear of them
  if (short) labels.sin.el.style.maxWidth = `${Math.max(60, cx - 0.52 * unit - document.querySelector('.t').getBoundingClientRect().right - 10)}px`;
  // if the four names cannot sit side by side, only the open act keeps its name
  const gap = 0.48 * ext * unit;
  $('marks').classList.remove('tight');
  // (names need at least 10px of clear space between them, whatever padding their buttons have)
  const pad = 2 * parseFloat(getComputedStyle(marks[0]).paddingLeft);
  $('marks').classList.toggle('tight', marks.some((b, i) => i < 3 && (b.offsetWidth + marks[i + 1].offsetWidth) / 2 - pad + 10 > gap));
  $('marks').style.setProperty('--gap', `${Math.max(24, gap - 4).toFixed(0)}px`);
  markH = marks[0].offsetHeight / unit;
  const words = narrow ? null : $('moves').getBoundingClientRect();
  wordsRight = words ? (words.right - cx) / unit : -1e9;
  wordsBottom = words ? (cy - words.bottom) / unit : 1e9;
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

function layout(p, G) {
  // the world's name sits low in its shape, but never down among the names of the acts
  const godY = p.Gy + p.rG * p.lGodK, worldY = Math.max(p.Wy - p.rW * 0.6, -0.795 + markH / 2 + labels.world.h / 2);
  place('god', 0, godY);
  // when God goes round man, his name keeps its place and a line follows him, dropped while he is behind
  // the world or below man, where it would have to cut across them
  const lg = labels.god;
  const show = p.orbit * Math.max(0, Math.min(1, 1 - 1.6 * G.back, (G.y - p.Sy) / 0.12));
  lg.g.style.display = show > 0.01 ? '' : 'none';
  if (show > 0.01) {
    const y0 = godY - lg.h / 2 - 0.012, dx = -G.x, dy = y0 - G.y, L = Math.hypot(dx, dy) || 1;
    const ex = G.x + (dx / L) * G.r * 0.92, ey = G.y + (dy / L) * G.r * 0.92;
    lg.path.setAttribute('d', `M${X(0)},${Y(y0)} L${X(ex)},${Y(ey)}`);
    lg.dot.setAttribute('cx', X(ex));
    lg.dot.setAttribute('cy', Y(ey));
    if (lg.on) { lg.path.style.strokeOpacity = (0.9 * show).toFixed(3); lg.dot.style.fillOpacity = show.toFixed(3); }
  }
  place('world', 0, worldY);
  place('bridge', p.lBrX, p.lBrY, p.tBrX, p.tBrY + p.tBrS * p.Sy);    // (a target can be set relative to man, and then moves with him)
  place('self', p.rW + p.lSide, p.Sy + 0.03, 0.105, p.Sy);
  // lettering on the left drops below the words there if it would run into them
  // (once the stain has been lifted onto the cross, its name moves up beside it)
  const sinX = lerp(-(p.rW + p.lSide), -0.15, p.stainUp), sinY0 = lerp(p.Sy - 0.08, 0.03, p.stainUp);
  const sinY = sinX - labels.sin.w < wordsRight + 0.03 ? Math.min(sinY0, wordsBottom - labels.sin.h / 2 - 0.03) : sinY0;
  place('sin', sinX, sinY, lerp(-0.02 - p.stainR * 0.8, -0.115, p.stainUp), lerp(p.Sy - 0.06, 0.03, p.stainUp));
  const bl = labels.bridge;
  rects.set([0, godY, labels.god.w / 2 + 0.02, labels.god.h / 2 + 0.012, 0, worldY, labels.world.w / 2 + 0.02, labels.world.h / 2 + 0.012,
    p.lBrX + bl.w / 2, p.lBrY, bl.on ? bl.w / 2 + 0.02 : 0, bl.h / 2 + 0.012]);
}

// ---------- connectors ----------
// Rules for connectors, each learned from something that went wrong:
// - Work in scene units, y up, as the painting does. SVG's y runs down, so every y written below is negated.
// - Draw a connector only while its value is above 0.01, and fade it with opacity on its group; flatten()
//   then moves that opacity onto the strokes and fills. Never use masks or filters here: like a
//   translucent group, they make the browser draw apart and lay down again, which some drivers get wrong
//   (the bridge once split in two mid-move). Clip paths are safe.
// - Never draw a half circle or half ellipse with SVG's arc command: with its two ends exactly opposite,
//   rounding makes its centre hop from frame to frame. Use arcC(), or a whole <ellipse> clipped in two.
// - A stroke-dashoffset that grows more negative with time moves the dashes toward the end of the path.
// - Everything here is drawn in the same frame as the painting, from the same values: never place a
//   connector by anything the painting does not also see, or the two drift apart.
// Things that join, point and mark are drawn as plain strokes over the paint:
// warm ink, one accent colour, and a paper-coloured edge so they read on any wash.
const connSvg = $('conn');
// Platonism: the four Forms above (x, y, sides: 0 is the circle), their copies in the world (from its centre),
// their size, and the height of the line between the seen and the known
const FORMS = [[-0.32, 0.27, 0], [-0.16, 0.33, 3], [0.16, 0.33, 4], [0.32, 0.27, 6]];
const COPIES = [[-0.19, 0.1], [-0.1, 0.2], [0.1, 0.2], [0.19, 0.1]], FSZ = 0.044, DIVIDE = 0.14;
const DARK = '#33271f', RED = [163, 38, 43], OCHRE = [176, 122, 30], GREY = '#6f6a66', PAP = '#f8f2e4';
const f = (n) => n.toFixed(4);
const rgb = (c) => `rgb(${c.map(Math.round).join(',')})`;
const stroke = (d, col, wd) => `<path d="${d}" fill="none" stroke="${PAP}" stroke-width="${f(wd + 0.012)}" stroke-linecap="round" stroke-linejoin="round" opacity=".92"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${f(wd)}" stroke-linecap="round" stroke-linejoin="round"/>`;
// A circular arc as cubic Béziers, in svg coordinates (angles grow clockwise on screen). SVG's own arc command has
// to work out a centre, and for a half circle that sum is balanced on a knife edge: rounding tips it one way or the
// other from frame to frame, and the curve hops. Béziers have no centre to work out.
function arcC(cx, cy, r, a0, a1) {
  const n = Math.max(1, Math.ceil(Math.abs(a1 - a0) / (Math.PI / 2) - 1e-9)), da = (a1 - a0) / n, k = (4 / 3) * Math.tan(da / 4) * r;
  let d = '';
  for (let i = 0; i < n; i++) {
    const a = a0 + i * da, e = a + da;
    const x0 = cx + r * Math.cos(a), y0 = cy + r * Math.sin(a), x3 = cx + r * Math.cos(e), y3 = cy + r * Math.sin(e);
    d += ` C${f(x0 - k * Math.sin(a))},${f(y0 + k * Math.cos(a))} ${f(x3 + k * Math.sin(e))},${f(y3 - k * Math.cos(e))} ${f(x3)},${f(y3)}`;
  }
  return d;
}
const shape = (d, col) => `<path d="${d}" fill="${col}" stroke="${PAP}" stroke-width=".012" stroke-linejoin="round" opacity=".92"/><path d="${d}" fill="${col}"/>`;

// Opacity is written on groups above, which is the easy way to fade a connector. But a translucent group makes the
// browser draw it apart and lay the result down again, and some graphics drivers lay it down shifted or upside down:
// that is what split the bridge in two partway through a move. So before the browser sees it, every group's opacity
// is pushed down onto the strokes and fills inside, where it is applied directly as they are drawn.
function flatten(el, a) {
  for (const c of el.children) {
    const tag = c.tagName;
    if (tag === 'defs' || tag === 'clipPath') continue;
    let op = a;
    if (c.hasAttribute('opacity')) { op *= Number(c.getAttribute('opacity')); c.removeAttribute('opacity'); }
    if (tag === 'g') flatten(c, op);
    else if (op < 0.9995) {
      for (const k of ['fill-opacity', 'stroke-opacity']) c.setAttribute(k, ((c.hasAttribute(k) ? Number(c.getAttribute(k)) : 1) * op).toFixed(4));
    }
  }
}

function drawConn(p, c, G) {
  const bTop = p.Gy - p.rG + p.bOff;
  const top = -bTop, bot = -p.bbot;              // svg y grows downward
  const ACC = rgb(p.acc);
  let g = '';

  // ----- the ascent: a ladder from man up through the dividing line toward the Forms -----
  if (p.ladder > 0.01) {
    const y0 = p.Sy + 0.09, y1 = DIVIDE + 0.15, HW = 0.024;
    let d = `M${f(-HW)},${f(-y0)} V${f(-y1)} M${f(HW)},${f(-y0)} V${f(-y1)} `;
    for (let y = y0 + 0.03; y < y1 - 0.01; y += 0.046) d += `M${f(-HW)},${f(-y)} H${f(HW)} `;
    // (it fades quickly and lies under anything else, so that the bridge coming down in its place reads cleanly)
    g += `<g opacity="${f(p.ladder * p.ladder)}">${stroke(d, ACC, 0.0045)}</g>`;
  }

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
      const upper = `M${f(-HW)},${f(top + HW)}${arcC(0, top + HW, HW, Math.PI, 2 * Math.PI)} L${jag(yb - gap / 2).join(' L')}Z`;
      const lower = `M${jag(yb + gap / 2).reverse().join(' L')} L${f(HW)},${f(bot - HW)}${arcC(0, bot - HW, HW, 0, Math.PI)}Z`;
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

  // ----- where God would stand: an empty place, marked out and left blank -----
  if (p.empty > 0.01) {
    g += `<circle cx="0" cy="${f(-p.Gy)}" r="${f(p.rG)}" fill="none" stroke="${GREY}" stroke-width=".0042" stroke-linecap="round" stroke-dasharray=".016 .018" stroke-dashoffset="${f(c.t * 0.004)}" opacity="${f(p.empty)}"/>`;
  }

  // ----- the wheel of rebirth: a ring around everything, turning without end.
  //       With spokes it becomes the wheel of the teaching, turning about the self at its hub. -----
  const wr = Math.max(p.wheel, p.spokes);
  if (wr > 0.01) {
    const R = p.rG + 0.1, wy = -p.Gy;
    let heads = '', spokes = '';
    for (let i = 0; i < 4; i++) {
      const a = c.t * 0.07 + (i * Math.PI) / 2, deg = (a * 180) / Math.PI;
      heads += `<path transform="translate(${f(R * Math.cos(a))},${f(wy + R * Math.sin(a))}) rotate(${f(deg + 90)})" d="M.026,0 L-.014,-.021 L-.014,.021Z" fill="${ACC}" stroke="${PAP}" stroke-width=".004" stroke-linejoin="round"/>`;
    }
    if (p.spokes > 0.01) {
      let d = '';
      for (let i = 0; i < 8; i++) {
        const a = c.t * 0.035 + (i * Math.PI) / 4, ca = Math.cos(a), sa = Math.sin(a);
        d += `M${f(0.125 * ca)},${f(wy + 0.125 * sa)} L${f((R - 0.012) * ca)},${f(wy + (R - 0.012) * sa)} `;
      }
      spokes = `<g opacity="${f(p.spokes / wr)}">${stroke(d, ACC, 0.0055)}<circle cx="0" cy="${f(wy)}" r=".125" fill="none" stroke="${PAP}" stroke-width=".0175" opacity=".92"/><circle cx="0" cy="${f(wy)}" r=".125" fill="none" stroke="${ACC}" stroke-width=".0055"/></g>`;
    }
    g += `<g opacity="${f(wr)}"><circle cx="0" cy="${f(wy)}" r="${f(R)}" fill="none" stroke="${PAP}" stroke-width=".0195" opacity=".92"/><circle cx="0" cy="${f(wy)}" r="${f(R)}" fill="none" stroke="${ACC}" stroke-width=".0075"/>${spokes}<g opacity="${f(p.wheel / wr)}">${heads}</g></g>`;
  }

  // ----- the current: the line where yin meets yang, turning with them, and the stream that carries man round.
  //       Man either pushes against it, straining, or goes along with it. -----
  if (p.current > 0.01) {
    const R = p.rW, wy = -p.Wy, deg = (c.t * 0.06 * 180) / Math.PI;
    const s = `M0,${f(-R)}${arcC(0, -R / 2, R / 2, -Math.PI / 2, Math.PI / 2)}${arcC(0, R / 2, R / 2, -Math.PI / 2, -1.5 * Math.PI)}`;
    const r0 = Math.abs(p.Sy - p.Wy);
    g += `<g opacity="${f(p.current)}"><g transform="translate(0 ${f(wy)}) rotate(${f(deg)})">${stroke(s, ACC, 0.006)}</g>`;
    g += `<circle cx="0" cy="${f(wy)}" r="${f(r0)}" fill="none" stroke="${ACC}" stroke-width=".0065" stroke-linecap="round" stroke-dasharray=".014 .026" stroke-dashoffset="${f(-c.t * 0.012)}" opacity=".85"/></g>`;
  }
  if (p.push > 0.01) {
    // at man's place on the stream the current runs right, so he pushes leftward; as he gives up, the strain goes out of it
    const strain = 1 - p.along, jit = 0.012 * strain * Math.sin(c.t * 7.3) * Math.sin(c.t * 2.1);
    const dir = -1, x0 = dir * 0.085, x1 = dir * (0.085 + (0.1 + 0.02 * Math.sin(c.t * 1.3)) * Math.min(1, p.push * 1.5));
    const y = -p.Sy + jit;
    const head = `M${f(x1)},${f(y)} L${f(x1 - dir * 0.03)},${f(y - 0.02)} L${f(x1 - dir * 0.03)},${f(y + 0.02)}Z`;
    g += `<g opacity="${f(p.push)}">${stroke(`M${f(x0)},${f(y)} L${f(x1 - dir * 0.02)},${f(y)}`, ACC, 0.007)}${shape(head, ACC)}</g>`;
  }

  // ----- offerings: short lines from man out to the spirits that troubled him, with gifts travelling along them -----
  if (p.offer > 0.01 && p.spirits > 0.01) {
    let d = '';
    for (let i = 0; i < 5; i++) {
      const x = spirits[i * 4], y = spirits[i * 4 + 1], dx = x, dy = y - p.Sy, L = Math.hypot(dx, dy) || 1;
      if (L < 0.11) continue;
      d += `M${f(dx / L * 0.075)},${f(-(p.Sy + dy / L * 0.075))} L${f(x - dx / L * 0.03)},${f(-(y - dy / L * 0.03))} `;
    }
    g += `<g opacity="${f(p.offer)}">${stroke(d, ACC, 0.0045)}<path d="${d}" fill="none" stroke="${PAP}" stroke-width=".0045" stroke-linecap="round" stroke-dasharray=".006 .022" stroke-dashoffset="${f(-c.t * 0.02)}"/></g>`;
  }

  // ----- the five bonds: ruler, father and elder brother above man, a friend beside him, a wife below.
  //       Loosened, the people drift out of place and the lines break; at death they close into a line of
  //       generations, with offerings rising from the living to the dead. -----
  if (p.bonds > 0.01) {
    const BOND = [[0, 0.21], [-0.15, 0.14], [0.15, 0.14], [-0.2, 0.02], [0, -0.18]];
    const LINE = [[0, 0.33], [0, 0.19], [0.06, 0.12], [-0.06, 0.12], [0, -0.17]];
    const LOP = [0.3, 0.6, 0, 0, 1];
    const sy = -p.Sy;
    let lines = '', dots = '', rite = '';
    BOND.forEach(([bx, by], i) => {
      const drift = 0.05 * p.loose;
      const ox = drift * Math.sin(c.t * (0.21 + 0.07 * i) + i * 2.3), oy = drift * Math.cos(c.t * (0.17 + 0.05 * i) + i * 1.7);
      const x = lerp(bx, LINE[i][0], p.lineage) + ox, y = sy - (lerp(by, LINE[i][1], p.lineage) + oy);
      const op = p.bonds * lerp(1, LOP[i], p.lineage);
      if (op < 0.01) return;
      const dx = x, dy = y - sy, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L;
      const a = 0.078, b = L - 0.034;
      if (b > a) {
        const d = `M${f(ux * a)},${f(sy + uy * a)} L${f(ux * b)},${f(sy + uy * b)}`;
        const dash = p.loose > 0.02 ? ` stroke-dasharray="${f(0.03 * (1 - p.loose) + 0.012)} ${f(0.03 * p.loose)}"` : '';
        lines += `<g opacity="${f(op)}"><path d="${d}" fill="none" stroke="${PAP}" stroke-width=".0145" stroke-linecap="round" opacity=".92"${dash}/><path d="${d}" fill="none" stroke="${ACC}" stroke-width=".0055" stroke-linecap="round"${dash}/></g>`;
        if (i === 4 && p.lineage > 0.01) {
          // offerings: marks rising from the descendant to the one he remembers
          rite = `<path d="${d}" fill="none" stroke="${PAP}" stroke-width=".005" stroke-linecap="round" stroke-dasharray=".008 .03" stroke-dashoffset="${f(c.t * 0.025)}" opacity="${f(op * p.lineage)}"/>`;
        }
      }
      dots += `<circle cx="${f(x)}" cy="${f(y)}" r=".028" fill="${PAP}" stroke="${ACC}" stroke-width=".0055" opacity="${f(op)}"/>`;
    });
    g += lines + rite + dots;
  }

  // ----- reason: a thin line climbing from man, with marks moving upward -----
  if (p.reason > 0.01) {
    const y0 = -(p.Wy + p.rW + 0.115), y1 = top + 0.035;
    g += `<g opacity="${f(p.reason)}">${stroke(`M0,${f(y0)} V${f(y1)}`, ACC, 0.0075)}
      <path d="M0,${f(y0)} V${f(y1 + 0.02)}" fill="none" stroke="${PAP}" stroke-width=".0038" stroke-linecap="round" stroke-dasharray=".016 .07" stroke-dashoffset="${f(c.t * 0.045)}"/>
      <path d="M0,${f(y1 - 0.04)} L-.021,${f(y1 + 0.004)} L.021,${f(y1 + 0.004)}Z" fill="${ACC}" stroke="${PAP}" stroke-width=".004" stroke-linejoin="round"/></g>`;
  }

  // ----- a call for help: arcs going out from man toward God, wherever he has got to -----
  if (p.call > 0.01) {
    const dx = G.x, dy = G.y - p.Sy, dist = Math.hypot(dx, dy) || 1;
    const span = Math.max(0.02, dist - G.r - 0.125), deg = (Math.atan2(dx, dy) * 180) / Math.PI;
    let arcs = '';
    for (let i = 0; i < 3; i++) {
      const ph = (c.t * 0.22 + i / 3) % 1, r = 0.095 + ph * span, op = Math.sin(Math.PI * ph);
      const w = Math.min(0.14, 0.05 + r * 0.32), h = Math.sqrt(Math.max(0, r * r - w * w));
      const d = `M${f(-w)},${f(-(p.Sy + h))}${arcC(0, -p.Sy, r, Math.atan2(-h, -w), Math.atan2(-h, w))}`;
      arcs += `<g opacity="${f(op)}">${stroke(d, ACC, 0.0055)}</g>`;
    }
    g += `<g opacity="${f(p.call)}" transform="rotate(${f(deg)} 0 ${f(-p.Sy)})">${arcs}</g>`;
  }

  // ----- God's orbit round man: a true ellipse, turned to the orbit's tilt and cut in two in its own frame.
  //       The near half is drawn plainly; the far half is faint, dashed and hidden by the world.
  //       God sits on his track, so the line stops at his edge rather than crossing him. -----
  if (p.orbit > 0.01) {
    const R = G.R, Ry = orbitRy(p, R), co = Math.cos(G.rot), si = Math.sin(G.rot);
    const frame = `translate(0 ${f(-p.Sy)}) rotate(${f((-G.rot * 180) / Math.PI)})`;
    const ell = (a) => `<ellipse cx="0" cy="0" rx="${f(R)}" ry="${f(Ry)}" fill="none" ${a}/>`;
    // everything outside a circle, as a clip path (a mask would make the browser draw the group apart and lay it down
    // again, which some graphics drivers do wrongly)
    const outside = (id, x, y, r) => `<clipPath id="${id}"><path clip-rule="evenodd" d="M-3,-3 H3 V3 H-3Z M${f(x + r)},${f(y)}${arcC(x, y, r, 0, Math.PI)}${arcC(x, y, r, Math.PI, 2 * Math.PI)}Z"/></clipPath>`;
    let heads = '';
    for (let i = 1; i <= 2; i++) {
      const a = c.orb + i * 2.094, sa = Math.sin(a), ca = Math.cos(a);
      const [x, y] = orbitAt(p, a, R, G.rot);
      // fading, never popping: fainter on the far side, and gone as it slips behind the world
      const hide = Math.min(1, Math.max(0, (p.rW + 0.04 - Math.hypot(x, y - p.Wy)) / 0.05)) * Math.min(1, Math.max(0, -sa / 0.15));
      const op = (0.45 + 0.55 * Math.min(1, Math.max(0, (sa + 0.15) / 0.3))) * (1 - hide);
      if (op < 0.01) continue;
      const tx = -R * sa * co - Ry * ca * si, ty = -R * sa * si + Ry * ca * co;     // the way he is going
      const deg = (Math.atan2(-ty, tx) * 180) / Math.PI;
      heads += `<path transform="translate(${f(x)},${f(-y)}) rotate(${f(deg)})" d="M.019,0 L-.011,-.015 L-.011,.015Z" fill="${ACC}" stroke="${PAP}" stroke-width=".004" stroke-linejoin="round" opacity="${f(op)}"/>`;
    }
    g += `<defs><clipPath id="orbNear"><rect x="-3" y="-3" width="6" height="3"/></clipPath><clipPath id="orbFar"><rect x="-3" y="0" width="6" height="3"/></clipPath>`;
    g += `${outside('orbOutW', 0, -p.Wy, p.rW + 0.008)}${outside('orbOutG', G.x, -G.y, G.r * 0.97)}</defs>`;
    g += `<g opacity="${f(p.orbit * 0.85)}">`;
    g += `<g clip-path="url(#orbOutW)"><g clip-path="url(#orbOutG)" opacity=".5"><g transform="${frame}">${ell(`clip-path="url(#orbFar)" stroke="${ACC}" stroke-width=".004" stroke-linecap="round" stroke-dasharray=".012 .016"`)}</g></g></g>`;
    g += `<g clip-path="url(#orbOutG)"><g transform="${frame}">${ell(`clip-path="url(#orbNear)" stroke="${PAP}" stroke-width=".0165" opacity=".92"`)}${ell(`clip-path="url(#orbNear)" stroke="${ACC}" stroke-width=".0045"`)}</g></g>`;
    g += `${heads}</g>`;
  }

  // ----- the way up to heaven: a dotted trail from the world to man, who has left it -----
  if (p.rise > 0.01) {
    const y0 = p.Wy + p.rW + 0.02, y1 = p.Sy - 0.095;
    if (y1 > y0) {
      const d = `M0,${f(-y0)} V${f(-y1)}`;
      g += `<g opacity="${f(p.rise)}"><path d="${d}" fill="none" stroke="${PAP}" stroke-width=".0145" stroke-linecap="round" stroke-dasharray=".001 .024" stroke-dashoffset="${f(-c.t * 0.02)}" opacity=".92"/><path d="${d}" fill="none" stroke="${ACC}" stroke-width=".0065" stroke-linecap="round" stroke-dasharray=".001 .024" stroke-dashoffset="${f(-c.t * 0.02)}"/></g>`;
    }
  }

  // ----- the line between the seen and the known: ruled, and fading out at its ends -----
  if (p.divide > 0.01) {
    let segs = '';
    for (let i = 0; i < 24; i++) {
      const x0 = -0.44 + (0.88 * i) / 24, x1 = x0 + 0.88 / 24 - 0.006, m = 1 - Math.pow(Math.abs((x0 + x1) / 2) / 0.44, 3);
      segs += `<path d="M${f(x0)},${f(-DIVIDE)} H${f(x1)}" opacity="${f(m)}"/>`;
    }
    g += `<g opacity="${f(p.divide * 0.55)}" stroke="${DARK}" stroke-width=".0026" stroke-linecap="round">${segs}</g>`;
  }

  // ----- participation: each copy below hangs from its Form above by a dotted thread, with being coming down it -----
  if (p.partake > 0.01) {
    let d = '';
    FORMS.forEach(([fx, fy], i) => {
      const [cx0, cy0] = COPIES[i], x1 = cx0, y1 = p.Wy + cy0 + 0.05;
      d += `M${f(fx)},${f(-(fy - FSZ - 0.012))} L${f(x1)},${f(-y1)} `;
    });
    g += `<g opacity="${f(p.partake)}"><path d="${d}" fill="none" stroke="${ACC}" stroke-width=".0014" opacity=".45"/>`;
    g += `<path d="${d}" fill="none" stroke="${ACC}" stroke-width=".0058" stroke-linecap="round" stroke-dasharray=".001 .02" stroke-dashoffset="${f(-c.t * 0.012)}" opacity=".9"/></g>`;
  }

  // ----- the Forms: perfect figures in ruled ink, and the one thing on the page that never moves -----
  if (p.forms > 0.01) {
    let d = '';
    FORMS.forEach(([fx, fy, n]) => {
      if (!n) { d += `M${f(fx + FSZ)},${f(-fy)}${arcC(fx, -fy, FSZ, 0, Math.PI)}${arcC(fx, -fy, FSZ, Math.PI, 2 * Math.PI)}Z `; return; }
      const R = FSZ / Math.cos(Math.PI / n);           // to a corner, so the sides sit at FSZ like the copies'
      for (let k = 0; k <= n; k++) {
        const a = Math.PI / n + (k * 2 * Math.PI) / n;   // a flat side at the bottom, as the copies have
        d += `${k ? 'L' : 'M'}${f(fx + R * Math.sin(a))},${f(-fy + R * Math.cos(a))} `;
      }
      d += 'Z ';
    });
    g += `<g opacity="${f(p.forms)}"><path d="${d}" fill="${PAP}" fill-opacity=".55" stroke="${PAP}" stroke-width=".0145" stroke-linejoin="round" opacity=".92"/><path d="${d}" fill="none" stroke="${DARK}" stroke-width=".0038" stroke-linejoin="round"/></g>`;
  }

  // ----- rebirth: souls not yet pure carried back down into the world, round and round -----
  if (p.rebirth > 0.01) {
    const P = [[0.37, 0.22], [0.58, 0.12], [0.52, -0.12], [0.32, -0.15]];
    const d = `M${f(P[0][0])},${f(-P[0][1])} C${f(P[1][0])},${f(-P[1][1])} ${f(P[2][0])},${f(-P[2][1])} ${f(P[3][0] + 0.012)},${f(-(P[3][1] + 0.004))}`;
    const ang = (Math.atan2(-(P[3][1] - P[2][1]), P[3][0] - P[2][0]) * 180) / Math.PI;
    g += `<g opacity="${f(p.rebirth)}">${stroke(d, ACC, 0.0045)}<path d="${d}" fill="none" stroke="${PAP}" stroke-width=".0045" stroke-linecap="round" stroke-dasharray=".001 .03" stroke-dashoffset="${f(-c.t * 0.03)}"/>`;
    g += `<path transform="translate(${f(P[3][0])},${f(-P[3][1])}) rotate(${f(ang)})" d="M.012,0 L-.018,-.017 L-.018,.017Z" fill="${ACC}" stroke="${PAP}" stroke-width=".004" stroke-linejoin="round"/></g>`;
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
  flatten(connSvg, 1);
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
let lastT = 0, acc = 0, nF = 0, arrow = 0, orb = Math.PI / 2, accent = '';
// Where God actually is. Most worldviews keep him in his place above; one sends him round man,
// a little larger and in front of the world on the near side, smaller and behind it on the far side.
// The orbit is a tilted ellipse round man; a is the angle along it, and its near half is where sin(a) > 0.
// Its depth never lets God, passing in front of or behind man, touch man's own rings.
// (rounded maximum and minimum, so the depth never changes course abruptly as an act blends into the next)
const smax = (a, b, k = 0.03) => (a + b + Math.sqrt((a - b) * (a - b) + k * k)) / 2;
const smin = (a, b, k = 0.03) => (a + b - Math.sqrt((a - b) * (a - b) + k * k)) / 2;
const orbitRy = (p, R) => smin(R, smax(R * p.oTilt, p.rG * 1.2 + 0.11));
function orbitAt(p, a, R, rot) {
  const ca = Math.cos(a), sa = Math.sin(a), Ry = orbitRy(p, R), c = Math.cos(rot), s = Math.sin(rot);
  return [R * ca * c - Ry * sa * s, p.Sy + R * ca * s + Ry * sa * c, sa];
}
// As wide and as level as asked, unless that would carry God into the words on the left, off the page or into his own name.
// Where room is short the orbit first tips up more steeply, and only then grows smaller.
function orbitFits(p, R, rot) {
  for (let i = 0; i < 48; i++) {
    const [x, y, sa] = orbitAt(p, (i * Math.PI) / 24, R, rot), r = p.rG * (1 + 0.2 * sa) + 0.03;
    if ((x - r < wordsRight && y + r > wordsBottom) || Math.abs(x) + r > ext + 0.04 || y + r > p.Gy - 0.09) return false;
  }
  return true;
}
// Found by halving the interval each time rather than by steps, so the shape changes smoothly as an act blends into the next.
function orbitShape(p) {
  // never smaller than the world while man stands in it; once he has left it, only clear of man himself
  const out = Math.min(1, Math.max(0, (Math.abs(p.Sy - p.Wy) - p.rW * 0.5) / (p.rW * 0.5)));
  const steep = Math.max(p.oRot, 1), floor = lerp(p.rW + 0.05, 0.27, out);
  if (orbitFits(p, p.oR, p.oRot)) return [p.oR, p.oRot];
  if (orbitFits(p, p.oR, steep)) {
    let lo = p.oRot, hi = steep;                 // the least tilt that fits
    for (let n = 0; n < 14; n++) { const m = (lo + hi) / 2; if (orbitFits(p, p.oR, m)) hi = m; else lo = m; }
    return [p.oR, hi];
  }
  let lo = floor, hi = p.oR;                     // the widest orbit that fits, at the steepest tilt
  if (!orbitFits(p, lo, steep)) return [floor, steep];
  for (let n = 0; n < 14; n++) { const m = (lo + hi) / 2; if (orbitFits(p, m, steep)) lo = m; else hi = m; }
  return [lo, steep];
}
// The orbit's size and tilt follow what fits on a damped spring: when the room changes all at once
// (the words of a new act arrive), God's speed still changes smoothly and he never jerks.
let oShape = null, oVel = [0, 0];
function godAt(p, dt) {
  const k = p.orbit;
  if (k < 0.001) { oShape = null; return { x: 0, y: p.Gy, r: p.rG, front: 0, back: 0, R: p.oR, rot: p.oRot, want: [p.oR, p.oRot] }; }
  const want = orbitShape(p);
  if (!oShape || frozen !== null) { oShape = want.slice(); oVel = [0, 0]; }
  else {
    const w = 3.2, n = Math.ceil(dt / 0.01), h = dt / Math.max(1, n);
    for (let i = 0; i < n; i++) for (const j of [0, 1]) {
      oVel[j] += (w * w * (want[j] - oShape[j]) - 2 * w * oVel[j]) * h;
      oShape[j] += oVel[j] * h;
    }
  }
  const [R, rot] = oShape, [x, y, s] = orbitAt(p, orb, R, rot);
  // in front of the world or behind it, with only a quick crossfade where he crosses its edge
  const nearSide = Math.min(1, Math.max(0, (s + 0.1) / 0.2)), ns = nearSide * nearSide * (3 - 2 * nearSide);
  return { x: k * x, y: lerp(p.Gy, y, k), r: p.rG * (1 + 0.2 * s * k), front: k * ns, back: k * (1 - ns), R, rot, want };
}
// ---------- spirits ----------
// Nine small presences wander the world. The first five can turn dark and close in on man; the rest can
// gather round him as the ancestors he joins. The painting and the connectors both read these places.
const SPIRIT = [[0.55, 0.3, 0.07], [0.8, 1.6, -0.05], [0.4, 2.7, 0.06], [0.9, 3.9, -0.08], [0.65, 5.1, 0.05],
  [0.85, 0.9, -0.06], [0.5, 2.1, 0.09], [0.75, 4.4, -0.07], [0.9, 5.7, 0.05]];
const RING = [0.9, 1.75, 2.6, 4.1, 5.2, 0.4, 2.2, 3.4, 5.9];
const spirits = new Float32Array(36);
function spiritsAt(p, t) {
  SPIRIT.forEach(([fr, a0, w], i) => {
    const R = p.rW * (0.25 + 0.6 * fr), a = a0 + t * w;
    let x = R * Math.cos(a), y = p.Wy + R * Math.sin(a) + 0.012 * Math.sin(t * 0.7 + i);
    const k = i < 5 ? p.pull : p.near, rr = i < 5 ? 0.135 : 0.11;
    const b = RING[i] + 0.15 * Math.sin(t * 0.3 + i);
    x = lerp(x, rr * Math.cos(b), k);
    y = lerp(y, p.Sy + rr * Math.sin(b), k);
    const dark = i < 5 ? p.anger : 0;
    let a1 = p.spirits * (i < 5 ? 1 : lerp(1, 0.55, p.near)) * (0.85 + 0.15 * Math.sin(t * 1.9 + i * 2.3));
    // one soul: the first light settles in man (or wherever the soul has climbed to) and the rest fade away
    if (i === 0) { x = lerp(x, 0, p.soul); y = lerp(y, p.soulY, p.soul); } else a1 *= 1 - p.soul;
    spirits.set([x, y, dark, a1], i * 4);
  });
  return spirits;
}

// Anything that moves must move by values that change smoothly from one frame to the next. A value found in
// steps, or a hard max or min between two moving values, makes a shape shake all through a move (the orbit
// once did): search by halving, use smax() and smin(), and follow a jumping target on a spring.
function frame(now) {
  const dt = lastT ? Math.min(100, now - lastT) / 1000 : 0;
  // If frames come slowly, paint at a lower resolution rather than stutter. Normally the change waits until nothing
  // is moving, where a jump in sharpness would show; but if frames are very slow it is made at once, since a
  // graphics card that is overwhelmed can fail outright.
  const moving = now - t0 < dur + 400;
  if (frozen === null && lastT && now - lastT < 400) {      // a long gap means the page was hidden, not slow
    acc += now - lastT;
    if (++nF === 20) {
      const ms = acc / nF;
      if (quality > 0.5 && (ms > 80 || (ms > 36 && !moving))) { quality -= 0.25; resize(); }
      acc = 0; nF = 0;
    }
  }
  lastT = now;

  if (!params.has('k')) live = blendP(from, target(), ease(Math.min(1, (now - t0) / dur)));
  const p = live;
  const t = frozen !== null ? frozen : reduced ? 0 : now / 1000;
  const hd = hands();
  arrow = frozen !== null ? frozen * 0.04 * p.flow : arrow + dt * 0.04 * p.flow * (reduced ? 0 : 1);
  orb = frozen !== null ? Math.PI / 2 + frozen * p.oSpd : orb + dt * p.oSpd * (reduced ? 0 : 1);
  const G = godAt(p, dt);
  window.__G = { ...G, cx, cy, unit };                // for tests of where God has got to

  const css = rgb(p.acc);
  if (css !== accent) { accent = css; document.documentElement.style.setProperty('--red', css); }

  layout(p, G);
  if (p.spirits > 0.01) spiritsAt(p, t);
  if (painter) {
    const entry = p.Wy + p.rW - 0.02;
    // Every uniform the shader declares must be passed here under the same name: one never set reads as 0,
    // and its part of the painting silently disappears. An array of vec4 goes as a Float32Array (as uSp).
    painter.draw({
      uRes: [canvas.width, canvas.height], uCen: [cx * scale, canvas.height - cy * scale], uUnit: unit * scale, uT: t,
      uG: [G.y, G.r], uGx: G.x, uGf: G.front, uGb: G.back, uW: [p.Wy, p.rW], uSy: p.Sy,
      uGlory: p.glory, uSky: p.sky, uFar: p.far, uLow: p.low, uDeep: p.deep, uSea: p.sea, uLand: p.land, uShade: p.shade,
      uGodC: p.godC, uGodRim: p.godRim, uStainC: p.stainC, uBg: p.bg, uWarm: p.warm, uGodA: p.godA,
      uBox: p.box, uLat: p.lat, uPulse: p.pulse, uBare: p.bare, uManA: p.manA, uManC: p.manC, uDrain: p.drain, uPool: p.pool, uHollow: p.hollow, uSelfR: p.selfR, uSelfA: p.selfA, uSelfC: p.selfC,
      uOne: p.one, uMaya: p.maya, uWorldA: p.worldA, uManI: p.manI,
      uWave: p.wave, uHaloL: p.haloL, uHaloR: p.haloR, uClock: p.clock, uRing: p.ring, uStainS: p.stainS,
      uStainUp: p.stainUp, uCopies: p.copies, uCopyDark: p.copyDark, uSoul: [spirits[0], spirits[1], p.spirits > 0.01 ? p.soul * p.spirits * (1 - 0.8 * p.anger) : 0], uLit: p.lit, uScan: p.scan, uSpA: p.spirits, 'uSp[0]': spirits, uBi: p.bi, uYin: p.yin, uMist: p.mist, uFlux: p.flux, uBundle: p.bundle, uScatter: p.scatter, uStainR: p.stainR, uStainA: p.stainA, uGlow: p.glow, uDull: p.dull, uRip: p.rip, uRipY: entry + (p.Sy - entry) * p.ripAt,
      uTick: hd.whole, uHands: [hd.sec, hd.min, hd.hour], 'uLab[0]': rects,
    });
  }
  drawConn(p, { t, arrow, orb, tock: hd.tock }, G);
  requestAnimationFrame(frame);
}

addEventListener('resize', resize);
renderText(true);
resize();
document.fonts.ready.then(resize);
requestAnimationFrame(frame);
