// Each deploy raises the ?v= number on these four imports and on the two in index.html, all to the same
// value, so that browsers fetch the new files together instead of mixing new ones with old cached ones.
import { createPainter } from './paint.js?v=66';
import { WORLDVIEWS, HOME } from './worldviews.js?v=66';
import { CATALOGUE } from './catalogue.js?v=66';
import { createMenu } from './menu.js?v=66';

// The address ends in #worldview/act, for example #deism/reason.
// For stills: ?wv=deism&act=3&t=5 freezes the clock; adding &k=0.5 shows the
// halfway point of the move from another worldview, named with &from= (and its act with &fromAct=).

const $ = (id) => document.getElementById(id);
const params = new URLSearchParams(location.search);
// (a number from the address, kept to a range; anything else gives the fallback)
const num = (name, lo, hi, fallback) => { const v = Number(params.get(name)); return Number.isFinite(v) ? Math.min(hi, Math.max(lo, v)) : fallback; };
const frozen = params.has('t') ? num('t', 0, 1e5, 5) : null;
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
// Names come from the address, which anyone can write: ask only whether WORLDVIEWS has a worldview of that name,
// never whether it has the property, since every object has some (constructor, __proto__, toString ...).
const built = (id) => Object.prototype.hasOwnProperty.call(WORLDVIEWS, id);
// The address is read loosely: in any case, with spaces or escapes, and with the act or the worldview left out.
// What it does not name comes from the fallback.
function readHash(fallback) {
  let h = location.hash.slice(1);
  try { h = decodeURIComponent(h); } catch (e) { /* a broken escape: read it as it is */ }
  const [a = '', b = ''] = h.toLowerCase().split('/').map((x) => x.trim());
  const wv = built(a) ? a : fallback.wv;
  const slug = built(a) ? b : a;
  const bySlug = WORLDVIEWS[wv].acts.findIndex((x) => x.slug === slug);
  return { wv, act: bySlug >= 0 ? bySlug : fallback.act };
}
const wvParam = (params.get('wv') || '').toLowerCase();
const start = { wv: built(wvParam) ? wvParam : HOME, act: Math.min(3, Math.max(0, (Number(params.get('act')) || 1) - 1)) };
Object.assign(cur, readHash(start));
const actOf = (c = cur) => WORLDVIEWS[c.wv].acts[c.act];
// the address in its one proper form, put in place of any other way of writing it
const address = () => `#${cur.wv}/${actOf().slug}`;
if (location.hash && location.hash !== address()) history.replaceState(null, '', address());
const target = () => ({ ...actOf().p, act: cur.act });

// Every move, between acts or between worldviews, is this blend of every value at once. It walks the keys
// of the target, so each value must exist on both sides (see the rules at the top of worldviews.js).
const lerp = (a, b, k) => (typeof a === 'number' ? a + (b - a) * k : a.map((v, i) => v + (b[i] - v) * k));
const blendP = (a, b, k) => { const o = {}; for (const n in b) o[n] = lerp(a[n], b[n], k); return o; };
const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

let live = target(), settled = -1;
// the worldviews whose values are on the page: one at rest; during a move, those it blends between
let onPage = new Set([cur.wv]);
let from = live;
let t0 = -1e9;
let dur = 1;
if (params.has('k')) {
  const other = built(params.get('from')) ? params.get('from') : Object.keys(WORLDVIEWS).find((w) => w !== cur.wv);
  const fa = params.has('fromAct') ? Math.min(3, Math.max(0, (Number(params.get('fromAct')) || 1) - 1)) : cur.act;
  live = blendP({ ...WORLDVIEWS[other].acts[fa].p, act: cur.act }, target(), num('k', 0, 1, 0.5));
  onPage = new Set([other, cur.wv]);
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
  labels[k] = { el, g, path, dot, on: false, timer: null, w: 0, h: 0, show: 0, lift: 0 };
}
// (the line and its dot fade themselves, rather than their group, for the reason given at flatten() below)
function fadeLeader(L, a) {
  L.path.style.strokeOpacity = (0.9 * a).toFixed(3);
  L.dot.style.fillOpacity = a.toFixed(3);
}
// A quotation mark that opens a line set flush left hangs out into the margin, so that the letters, not the mark,
// keep the line; and one that closes a line set flush right hangs out on that side.
const hang = (s, align) => (align === 'left' ? s.replace(/^([“‘])/, '<span class="hang-l">$1</span>')
  : align === 'right' ? s.replace(/([”’])$/, '<span class="hang-r">$1</span>') : s);
function setLabel(k, content, instant, wait = 550) {
  const L = labels[k];
  const html = content ? `${hang(content[0], ALIGN[k])}<small>${hang(content[1], ALIGN[k])}</small>` : '';
  if (L.html === html) return;
  L.html = html;
  clearTimeout(L.timer);
  const apply = () => {
    L.el.innerHTML = html;
    L.on = !!content;
    L.show = L.on ? 1 : 0;
    if (instant) L.lift = L.show;
    L.el.style.opacity = L.on ? 1 : 0;
    fadeLeader(L, L.on ? 1 : 0);
    measure();
  };
  if (instant) return apply();
  L.el.style.opacity = 0;
  L.show = 0;
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
// The button goes where its words say. Its words change only when the old ones have faded, so a second click
// in that time, as in a double-click, asks the old question again and finds us already there.
let moveTo = null;
moveBtn.onclick = () => { auto = false; go(moveTo, cur.act, true); };

// Where a long word in an act's name may break, should the names have to take two lines on a phone (a soft hyphen,
// seen only where the word is broken). A word missing here simply does not break; then, if it is too wide, only the
// open act keeps its name.
const BREAKS = 'De-con-struc-tion For-get-ful-ness Dis-con-nec-tion Super-sti-tion Im-per-ma-nence En-hance-ment Sin-gu-lar-ity '
  + 'Cul-ti-va-tion Re-mem-brance Ap-pease-ment Re-demp-tion Clock-mak-er Sub-mis-sion Ex-tinc-tion Alien-ation Rev-o-lu-tion '
  + 'Re-pres-sion Ful-fil-ment Un-fin-ished For-get-ting Ig-no-rance Un-cer-tain Judge-ment Suf-fer-ing Com-mu-nism Awak-en-ing '
  + 'As-cen-sion Knowl-edge An-ces-tors Ex-pres-sion';
const SHY = Object.fromEntries(BREAKS.split(' ').map((w) => [w.replace(/-/g, ''), w.replace(/-/g, '\u00ad')]));
const breakable = (name) => name.split(' ').map((w) => w.split('-').map((x) => SHY[x] ?? x).join('-')).join(' ');

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
    marks.forEach((b, i) => { b.textContent = breakable(wv.acts[i].name); });
    moveBtn.textContent = wv.move.q;
    moveTo = wv.move.to;
    $('scene').setAttribute('aria-label', `The painting. ${KEYS.filter((k) => a.labels[k]).map((k) => `${a.labels[k][0]}: ${a.labels[k][1]}.`).join(' ')}`);
    document.body.classList.remove('swap', 'swap-all');
    if (!instant) resize(false);                // new words may take a different amount of room
  };
  clearTimeout(swapTimer);
  if (instant) return fill();
  document.body.classList.add(wholePage ? 'swap-all' : 'swap');
  swapTimer = setTimeout(fill, 480);
}

// A move to another worldview chosen on the page (by its question or from the menu) is a new step in the browser's
// history, so that Back returns to the worldview before; a change of act only rewrites the address.
function go(wv, act, step = false) {
  if (!built(wv)) return;
  act = Math.min(3, Math.max(0, act));
  if (wv === cur.wv && act === cur.act) return;
  const moved = wv !== cur.wv;
  // (a move that interrupts another keeps the worldviews of both on the page until it settles)
  onPage = performance.now() - t0 < dur ? new Set([...onPage, wv]) : new Set([cur.wv, wv]);
  from = { ...live };
  cur.wv = wv;
  cur.act = act;
  t0 = performance.now();
  dur = reduced ? 1 : moved ? 4200 : 2600;
  history[step && moved ? 'pushState' : 'replaceState'](null, '', address());
  if (moved) startGlide(wv);
  renderText(false, moved);
  if (moved) { menu.setCurrent(wv); menu.peek(1600); }
}
// ---------- the menu of worldviews ----------
const menu = createMenu($('menu'), CATALOGUE, {
  isBuilt: built,
  onSelect: (id) => { auto = false; go(id, cur.act, true); },
});
menu.setCurrent(cur.wv);
window.__menu = menu;
// an address typed or pasted while the page is open
// (and Back or Forward; some browsers report those as one of these events, some as the other, some as both)
// (an address that names nothing leaves the page where it is; but one with no # at all, as when Back returns to
// the first page of the visit, goes back to where the visit began)
const fromAddress = () => {
  const h = readHash(location.hash.length > 1 ? cur : start);
  auto = false;
  go(h.wv, h.act);
  if (location.hash !== address()) history.replaceState(null, '', address());
};
addEventListener('hashchange', fromAddress);
addEventListener('popstate', fromAddress);
if (frozen === null) menu.peek(2800);

let auto = frozen === null && !location.hash && !params.has('act') && !reduced;
addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') { auto = false; go(cur.wv, cur.act + 1); }
  if (e.key === 'ArrowLeft') { auto = false; go(cur.wv, cur.act - 1); }
});
setInterval(() => { if (auto && !document.hidden) go(cur.wv, (cur.act + 1) % 4); }, 14000);

// ---------- layout ----------
let unit = 1, ext = 1, cx = 0, cy = 0, scale = 1, quality = 1, markH = 0, markY = -0.795;   // (markY: the middle of the names)
let wordsRight = -1e9, wordsBottom = 1e9;       // the corner of the words on the left, in scene units
const rects = new Float32Array(12), lifts = [0, 0, 0];
// Three layouts: the words beside the painting; the same with smaller words, for squarish windows; or the title
// above the painting and the words below. (A window too short for words below has a fourth: smaller words and
// smaller lettering.) Each window gets the first beside layout that leaves the words room above the names of the
// acts, unless the layout with words below gives a painting nearly as large. The choice is made only when the window
// itself changes, never when the words of a new act arrive, so the page never flips from one layout to another
// while someone reads; and so it is made for the longest words on the site.
// Each sum below reads the page as it is laid out at that moment, so the right class must be on the body first.
const headBottom = () => document.querySelector('.head').getBoundingClientRect().bottom + 4;
const actHeight = (Hh) => Hh - document.querySelector('.act').getBoundingClientRect().top + 4;
// beside: the painting's centre stays at least 0.45 of its unit to the right of the words, as at 1024 x 768
const wideUnit = (W, Hh) => Math.min(Hh / 2, W / 1.5, (W / 2 - document.querySelector('.t').getBoundingClientRect().right) / 0.45);
// With the title above and the words below, the painting gets the room between them. Each worldview keeps room
// for its own title and for the tallest of its acts, found by trying each, so that the painting keeps one size and
// place from act to act. (The act's box is held at that height, and shorter words sit at its top, just under the
// line of history.) Between worldviews the size may change, and then it glides, while the words are away.
let narrowRoom = {};
function measureNarrowRoom(Hh) {
  const act = document.querySelector('.act'), els = [$('name'), $('actName'), $('actText'), moveBtn];
  const keep = els.map((e) => e.textContent), out = {};
  for (const [id, wv] of Object.entries(WORLDVIEWS)) {
    $('name').textContent = wv.name;
    moveBtn.textContent = wv.move.q;
    act.style.minHeight = '';
    let tall = 0;
    for (const a of wv.acts) {
      $('actName').textContent = a.name;
      $('actText').textContent = a.text;
      tall = Math.max(tall, act.getBoundingClientRect().height);
    }
    act.style.minHeight = `${Math.ceil(tall)}px`;
    out[id] = { head: headBottom(), tall: Math.ceil(tall), act: actHeight(Hh) };
  }
  els.forEach((e, i) => { e.textContent = keep[i]; });
  act.style.minHeight = '';
  return out;
}
const narrowUnit = (W, Hh, r) => Math.min((Hh - r.head - r.act) / 1.94, W / 1.85);
function narrowPlace(W, Hh, wv) {
  const r = narrowRoom[wv], u = narrowUnit(W, Hh, r);
  return { unit: u, cx: W / 2, cy: r.head + (Hh - r.head - r.act) / 2 + 0.02 * u, ext: W / 2 / u - 0.13 };
}
const longest = (pick) => Object.values(WORLDVIEWS).flatMap(pick).reduce((a, b) => (b.length > a.length ? b : a), '');
const LONGEST = [longest((w) => [w.name]), longest((w) => [w.tagline]), longest((w) => w.acts.map((a) => a.name)),
  longest((w) => w.acts.map((a) => a.text)), longest((w) => [w.move.q])];
// where the words on the left would end with the longest title, tagline, act and question on the site
function tallestWords() {
  const els = [$('name'), $('tag'), $('actName'), $('actText'), moveBtn], keep = els.map((e) => e.textContent);
  els.forEach((e, i) => { e.textContent = LONGEST[i]; });
  const bottom = moveBtn.getBoundingClientRect().bottom;
  els.forEach((e, i) => { e.textContent = keep[i]; });
  return bottom;
}
// in a beside layout, do the words end above the names of the acts, with room under them for a label
// that drops below them (as the name of the problem does)? Names wholly to the right of the words need no room.
function wordsFit(W, Hh, u) {
  const ext = Math.min(1.05, W / 2 / u - 0.16);
  if (W / 2 - 0.96 * ext * u > document.querySelector('.t').getBoundingClientRect().right) return true;
  const top = Hh / 2 + 0.795 * u - marks[0].offsetHeight / 2;
  return tallestWords() + 0.03 * u + 2 * parseFloat(getComputedStyle(labels.sin.el).fontSize) + 4 < top;
}
let pageLayout = 'wide';
// (the washes gain nothing visible beyond 1.5 pixels per point, and twice the density costs nearly twice as much)
let repaint = true;
function fitCanvas() {
  scale = Math.min(window.devicePixelRatio || 1, 1.5) * quality;
  if (painter) painter.resize(Math.round(innerWidth * scale), Math.round(innerHeight * scale));
  repaint = true;                                  // (a canvas is cleared when its size changes: paint it again at once)
}
function resize(choose = true) {
  const W = innerWidth, Hh = innerHeight, body = document.body.classList;
  fitCanvas();
  const set = (l) => { for (const c of ['narrow', 'compact', 'short']) body.toggle(c, l === c); };
  if (choose) {
    let best = 'short', u = 0;
    if (Hh < 520) { set('short'); u = Hh / 2; }               // (there is no room for words below)
    else for (const l of ['wide', 'compact']) { set(l); if (wordsFit(W, Hh, wideUnit(W, Hh))) { best = l; u = wideUnit(W, Hh); break; } }
    set('narrow');
    narrowRoom = measureNarrowRoom(Hh);
    // (in a tall window the words below use the page better, so beside must win clearly; and the choice is made
    // for the worldview that leaves the painting least room)
    const nu = Math.min(...Object.values(narrowRoom).map((r) => narrowUnit(W, Hh, r)));
    pageLayout = nu * 1.15 > u ? 'narrow' : best;
  }
  set(pageLayout);
  const narrow = pageLayout === 'narrow', short = pageLayout === 'short';
  document.querySelector('.act').style.minHeight = narrow ? `${narrowRoom[cur.wv].tall}px` : '';
  if (narrow) {
    // title above, painting in the middle, the act's words below
    const to = narrowPlace(W, Hh, cur.wv);
    if (glide) { glide.to = to; return; }
    ({ unit, cx, cy, ext } = to);
  } else if (short) {
    // a phone held sideways: the words take the whole height on the left, and the painting, with the line of
    // history under it, is centred in the room to their right, which leaves the painting about 1.2 of its unit on
    // each side for its labels and the line, so that the line starts clear of the words
    const right = document.querySelector('.t').getBoundingClientRect().right;
    cx = (right + W) / 2;
    unit = Math.min(Hh / 2, (W - right) / 2 / 1.2);
    cy = Hh / 2;
    ext = Math.min(1.05, (W - cx) / unit - 0.12);
  } else {
    unit = wideUnit(W, Hh);
    cx = W / 2;
    cy = Hh / 2;
    ext = Math.min(1.05, W / 2 / unit - 0.16);
  }
  glide = null;
  fit();
}
// the size of the painting gliding to that of the next worldview, over the time its words are away
let glide = null;
function startGlide(wv) {
  if (pageLayout !== 'narrow' || reduced || frozen !== null) return;
  glide = { from: { unit, cx, cy, ext }, to: narrowPlace(innerWidth, innerHeight, wv), t0: performance.now() };
}
function stepGlide(now) {
  if (!glide) return;
  const k = ease(Math.min(1, (now - glide.t0) / 560)), f = glide.from, to = glide.to;
  unit = f.unit + (to.unit - f.unit) * k;
  cx = f.cx + (to.cx - f.cx) * k;
  cy = f.cy + (to.cy - f.cy) * k;
  ext = f.ext + (to.ext - f.ext) * k;
  if (k === 1) glide = null;
  fit();
}
// everything placed by the painting's size and place
function fit() {
  const W = innerWidth, Hh = innerHeight, narrow = pageLayout === 'narrow', short = pageLayout === 'short';
  marks.forEach((b, i) => {
    b.style.left = `${cx + ext * (-0.72 + 0.48 * i) * unit}px`;
    b.style.top = `${cy + 0.795 * unit}px`;
  });
  const room = (x) => `${Math.max(60, ((W - cx) / unit - x - 0.1) * unit)}px`;   // (room to the right edge)
  labels.bridge.el.style.maxWidth = room(Math.max(0.22, actOf().p.lBrX));
  // (man's label and sin's sit at the world's side, mirrored: measured from there, but never from further out than 0.56)
  const side = Math.min(0.56, actOf().p.rW + actOf().p.lSide);
  labels.self.el.style.maxWidth = room(side);
  // (sin's label reaches left, toward the menu's strip of dabs down the edge of the page: it stops short of them)
  labels.sin.el.style.maxWidth = `${Math.max(60, Math.min(parseFloat(room(side)), cx - side * unit - 44))}px`;
  // in a short window the words on the left reach down beside the painting: keep clear of them
  if (short) labels.sin.el.style.maxWidth = `${Math.max(60, cx - 0.52 * unit - document.querySelector('.t').getBoundingClientRect().right - 10)}px`;
  // If the four names cannot sit side by side on one line, each may take two, in its own share of the line, with
  // its last line where a single line would sit. If a word is still too wide for its share, only the open act keeps
  // its name. (The test is made with every name in bold, as the open one is, so that the choice holds from act to act.)
  const gap = 0.48 * ext * unit, M = $('marks');
  M.classList.remove('tight', 'wrap');
  M.style.setProperty('--gap', `${Math.max(24, gap - 4).toFixed(0)}px`);
  M.style.setProperty('--wrapW', `${Math.max(24, gap - 6).toFixed(0)}px`);
  // (names need at least 10px of clear space between them, whatever padding their buttons have)
  const pad = 2 * parseFloat(getComputedStyle(marks[0]).paddingLeft), h1 = marks[0].offsetHeight;
  if (marks.some((b, i) => i < 3 && (b.offsetWidth + marks[i + 1].offsetWidth) / 2 - pad + 10 > gap)) {
    M.classList.add('wrap', 'measure');
    const cs = getComputedStyle(marks[0]), lh = parseFloat(cs.lineHeight), padV = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
    const ok = marks.every((b) => b.scrollWidth <= b.clientWidth + 0.5 && b.offsetHeight - padV <= 2 * lh + 1);
    M.classList.remove('measure');
    if (!ok) M.classList.replace('wrap', 'tight');
  }
  let hMax = h1;
  if (M.classList.contains('wrap')) marks.forEach((b) => { b.style.top = `${cy + 0.795 * unit + h1 / 2}px`; hMax = Math.max(hMax, b.offsetHeight); });
  markH = hMax / unit;
  markY = -0.795 + (hMax - h1) / 2 / unit;
  marks.forEach((b, i) => { markW[i] = b.offsetWidth / unit - 2 * parseFloat(getComputedStyle(b).paddingLeft) / unit; });
  // When only the open act keeps its name, a long name on an outer mark can reach past the edge of the page, or on
  // the left into the strip where the menu's dabs sit: it is moved in just far enough to clear them.
  const tightNow = $('marks').classList.contains('tight');
  marks.forEach((b, i) => {
    markDx[i] = 0;
    if (!tightNow || i !== cur.act) return;
    const x = cx + ext * (-0.72 + 0.48 * i) * unit, w = b.offsetWidth;
    const nx = Math.min(Math.max(x, 52 + w / 2), W - 8 - w / 2);
    if (nx !== x) { b.style.left = `${nx}px`; markDx[i] = (nx - x) / unit; }
  });
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

function layout(p, G, dt) {
  // the world's name sits low in its shape, but never down among the names of the acts
  const godY = p.Gy + p.rG * p.lGodK, worldY = Math.max(p.Wy - p.rW * 0.6, markY + markH / 2 + labels.world.h / 2);
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
  // How much each name shows, following its fade (the .5s of .l in the stylesheet).
  for (const k of KEYS) {
    const L = labels[k];
    L.lift = L.show > L.lift ? Math.min(L.show, L.lift + dt / 0.5) : Math.max(L.show, L.lift - dt / 0.5);
  }
  // (a target can be set relative to man, and then moves with him)
  const at = { bridge: [p.lBrX, p.lBrY, p.tBrX, p.tBrY + p.tBrS * p.Sy], self: [p.rW + p.lSide, p.Sy + 0.03, 0.105, p.Sy] };
  // lettering on the left drops below the words there if it would run into them
  // (once the stain has been lifted onto the cross, its name moves up beside it)
  // (in Marxism the stain sits on the top of the pyramid, not on man, and its name goes with it)
  const onY = p.Wy + p.rW * 0.52;
  const sinX = lerp(-(p.rW + p.lSide), -0.15, p.stainUp), sinY0 = lerp(lerp(p.Sy - 0.08, 0.03, p.stainUp), onY + 0.04, p.stainOn);
  const sinY = sinX - labels.sin.w < wordsRight + 0.03 ? Math.min(sinY0, wordsBottom - labels.sin.h / 2 - 0.03) : sinY0;
  at.sin = [sinX, sinY, lerp(lerp(-0.02 - p.stainR * 0.8, -0.115, p.stainUp), -p.stainR * 0.8, p.stainOn), lerp(lerp(p.Sy - 0.06, 0.03, p.stainUp), onY, p.stainOn)];
  keepApart(at, godY, worldY, dt);
  for (const k of MOVABLE) place(k, at[k][0], at[k][1] + slide[k][0], at[k][2], at[k][3]);
  // The paper under a name is lifted only while the name shows, and fades with it,
  // so no pale patch is left behind while the shapes move and the new names wait to appear.
  ['god', 'world', 'bridge'].forEach((k, i) => { const v = labels[k].lift; lifts[i] = v * v * (3 - 2 * v); });
  const bl = labels.bridge;
  rects.set([0, godY, labels.god.w / 2 + 0.02, labels.god.h / 2 + 0.012, 0, worldY, labels.world.w / 2 + 0.02, labels.world.h / 2 + 0.012,
    p.lBrX + bl.w / 2, p.lBrY + slide.bridge[0], bl.w / 2 + 0.02, bl.h / 2 + 0.012]);
}

// ---------- keeping the lettering apart ----------
// Each act places its labels by hand (worldviews.js), and they are checked at rest. But while one act blends into
// the next, or in a window of a size no one tried, a label can come to lie on another, on the names of the acts or
// on the words at the left. Then the labels with leader lines (bridge, self and sin) slide up or down, by the least
// distance that clears everything; the names inside the shapes, the act names and the words keep their places.
// A label with room keeps the place it was given. The slide follows a damped spring, so a label never jumps; a
// label that is out of sight takes its place at once, and so appears where it belongs.
const MOVABLE = ['bridge', 'self', 'sin'];
const slide = { bridge: [0, 0], self: [0, 0], sin: [0, 0] };   // [distance, speed], in scene units, up positive
const markW = [0, 0, 0, 0];                                    // the widths of the act names, in scene units
const markDx = [0, 0, 0, 0];                                   // how far a name has been moved in from its mark (fit)
// a label's box as [left, bottom, right, top] in scene units
function boxOf(k, x, y) {
  const L = labels[k], a = ALIGN[k], l = a === 'center' ? x - L.w / 2 : a === 'left' ? x : x - L.w;
  return [l, y - L.h / 2, l + L.w, y + L.h / 2];
}
const hits = (a, b) => a[0] < b[2] && a[2] > b[0] && a[1] < b[3] - 1e-6 && a[3] > b[1] + 1e-6;
function keepApart(at, godY, worldY, dt) {
  const gap = 6 / unit, fixed = [];
  if (labels.god.on) fixed.push(boxOf('god', 0, godY));
  if (labels.world.on) fixed.push(boxOf('world', 0, worldY));
  const tight = $('marks').classList.contains('tight');
  for (let i = 0; i < 4; i++) {
    if (tight && i !== cur.act) continue;
    const x = ext * (-0.72 + 0.48 * i) + markDx[i];
    fixed.push([x - markW[i] / 2, markY - markH / 2, x + markW[i] / 2, markY + markH / 2]);
  }
  if (wordsRight > -1e8) fixed.push([-1e9, wordsBottom, wordsRight, 1e9]);
  const top = cy / unit - gap, bottom = -(innerHeight - cy) / unit + gap;
  for (const k of MOVABLE) {
    const L = labels[k], s = slide[k];
    if (!L.on) continue;
    const b = boxOf(k, at[k][0], at[k][1]);
    // the distances that would set the label just above or just below each thing in its way, nearest first,
    // keeping to the side it has already slid to unless the other is clearly nearer
    const tries = [0];
    for (const o of fixed) tries.push(o[3] + gap - b[1], o[1] - gap - b[3]);
    const cost = (c) => Math.abs(c) + (c * s[0] < 0 ? 0.03 : 0);
    tries.sort((m, n) => cost(m) - cost(n));
    const ok = (c) => {
      const m = [b[0], b[1] + c, b[2], b[3] + c];
      if (c !== 0 && (m[3] > top || m[1] < bottom)) return false;
      return !fixed.some((o) => hits(m, o));
    };
    const want = tries.find((c) => Math.abs(c) <= 0.35 && ok(c)) ?? 0;
    if (frozen !== null || reduced || L.lift < 0.05) { s[0] = want; s[1] = 0; }
    else {
      const w = 9, n = Math.ceil(dt / 0.01), h = dt / Math.max(1, n);
      for (let i = 0; i < n; i++) { s[1] += (w * w * (want - s[0]) - 2 * w * s[1]) * h; s[0] += s[1] * h; }
    }
    // later labels keep clear of this one where it is headed
    fixed.push([b[0], b[1] + want, b[2], b[3] + want]);
  }
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

  // ----- the wheel of the year: a ring round the world with its eight festivals, the solstices and equinoxes as small
  //       circles and the days between as ticks, and a mark going round as the year turns (once about every 50 s,
  //       with the colours of the land in the painting) -----
  if (p.wheelYr > 0.01) {
    const R = p.rW + 0.075, wy = -p.Wy;
    let ticks = '', quarters = '';
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4 - Math.PI / 2, ca = Math.cos(a), sa = Math.sin(a);
      if (i % 2) ticks += `M${f((R - 0.016) * ca)},${f(wy + (R - 0.016) * sa)} L${f((R + 0.016) * ca)},${f(wy + (R + 0.016) * sa)} `;
      else quarters += `<circle cx="${f(R * ca)}" cy="${f(wy + R * sa)}" r=".013" fill="${PAP}" stroke="${ACC}" stroke-width=".0045"/>`;
    }
    const ya = ((c.t * 0.02) % 1) * 2 * Math.PI - Math.PI / 2;
    g += `<g opacity="${f(p.wheelYr)}"><circle cx="0" cy="${f(wy)}" r="${f(R)}" fill="none" stroke="${PAP}" stroke-width=".0165" opacity=".92"/><circle cx="0" cy="${f(wy)}" r="${f(R)}" fill="none" stroke="${ACC}" stroke-width=".0045"/>`;
    g += `${stroke(ticks, ACC, 0.0045)}${quarters}<circle cx="${f(R * Math.cos(ya))}" cy="${f(wy + R * Math.sin(ya))}" r=".011" fill="${ACC}" stroke="${PAP}" stroke-width=".004"/></g>`;
  }
  // ----- the circle cast round man for the rite, with the four quarters marked -----
  if (p.cast > 0.01) {
    const r = 0.125, sy = -p.Sy;
    let marks = '';
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2, x = r * Math.cos(a), y = sy + r * Math.sin(a);
      marks += `<circle cx="${f(x)}" cy="${f(y)}" r=".009" fill="${ACC}" stroke="${PAP}" stroke-width=".004"/>`;
    }
    g += `<g opacity="${f(p.cast)}"><circle cx="0" cy="${f(sy)}" r="${r}" fill="none" stroke="${PAP}" stroke-width=".0145" opacity=".92"/><circle cx="0" cy="${f(sy)}" r="${r}" fill="none" stroke="${ACC}" stroke-width=".0045"/>`;
    g += `<circle cx="0" cy="${f(sy)}" r="${r}" fill="none" stroke="${PAP}" stroke-width=".0036" stroke-linecap="round" stroke-dasharray=".001 .05" stroke-dashoffset="${f(-c.t * 0.02)}"/>${marks}</g>`;
  }

  // ----- a beam of consciousness rising from man to the Universe; widened, a spiral of lives winding up toward it -----
  if (p.spiral > 0.01) {
    const y0 = p.Sy + 0.09, y1 = p.Gy - p.rG * 0.45;
    if (y1 > y0) {
      let d = '';
      for (let i = 0; i <= 64; i++) {
        const s = i / 64, y = y0 + (y1 - y0) * s, x = p.spiralW * 0.07 * (1 - 0.5 * s) * Math.sin(s * 3.5 * 2 * Math.PI + c.t * 0.4);
        d += `${i ? 'L' : 'M'}${f(x)},${f(-y)} `;
      }
      g += `<g opacity="${f(p.spiral)}">${stroke(d, ACC, 0.0042)}<path d="${d}" fill="none" stroke="${PAP}" stroke-width=".0036" stroke-linecap="round" stroke-dasharray=".001 .03" stroke-dashoffset="${f(-c.t * 0.025)}"/></g>`;
    }
  }

  // ----- rings round man: closing in as he looks inward, or going out from him as he expresses himself -----
  if (p.rings > 0.01) {
    const k = (p.ringDir + 1) / 2;
    let d = '';
    for (let i = 0; i < 3; i++) {
      const ph = (c.t * 0.12 + i / 3) % 1, r = 0.095 + 0.2 * lerp(1 - ph, ph, k), op = Math.sin(Math.PI * ph);
      d += `<g opacity="${f(op)}"><circle cx="0" cy="${f(-p.Sy)}" r="${f(r)}" fill="none" stroke="${PAP}" stroke-width=".0125" opacity=".92"/><circle cx="0" cy="${f(-p.Sy)}" r="${f(r)}" fill="none" stroke="${ACC}" stroke-width=".004"/></g>`;
    }
    g += `<g opacity="${f(p.rings)}">${d}</g>`;
  }
  // ----- other people's rules: a ring of short bars round man, hemming him in; thrown off, they burst outward -----
  if (p.fence > 0.01) {
    let d = '';
    for (let i = 0; i < 14; i++) {
      const h = Math.sin(i * 12.9898) * 43758.5453, rnd = h - Math.floor(h);
      const a = (i / 14) * 2 * Math.PI + p.burst * (rnd - 0.5) * 0.6, r0 = 0.125 + p.burst * (0.14 + 0.12 * rnd), L = 0.05;
      const tilt = p.burst * (rnd - 0.5) * 1.6, ca = Math.cos(a), sa = Math.sin(a), cb = Math.cos(a + tilt), sb = Math.sin(a + tilt);
      const x0 = r0 * ca, y0 = p.Sy + r0 * sa;
      d += `M${f(x0)},${f(-y0)} L${f(x0 + L * cb)},${f(-(y0 + L * sb))} `;
    }
    // (two rails join the posts into a fence; when it bursts they are gone)
    const rails = p.burst < 0.99 ? `<g opacity="${f(1 - p.burst)}">${[0.135, 0.165].map((r) => `<circle cx="0" cy="${f(-p.Sy)}" r="${r}" fill="none" stroke="${PAP}" stroke-width=".0125" opacity=".92"/><circle cx="0" cy="${f(-p.Sy)}" r="${r}" fill="none" stroke="${DARK}" stroke-width=".0036"/>`).join('')}</g>` : '';
    g += `<g opacity="${f(p.fence * (1 - 0.5 * p.burst))}">${rails}${stroke(d, DARK, 0.0062)}</g>`;
  }

  // ----- uploading: bits going up from man to a chip set in the place left empty above -----
  if (p.upload > 0.01) {
    const cy = p.Gy - p.rG * 0.42, S = 0.052, y0 = p.Sy + 0.09, y1 = cy - S - 0.012;
    let pins = '';
    for (let i = -1.5; i <= 1.5; i++) {
      const o = i * 0.026;
      pins += `M${f(o)},${f(-(cy + S))} v-.016 M${f(o)},${f(-(cy - S))} v.016 M${f(-S)},${f(-(cy + o))} h-.016 M${f(S)},${f(-(cy + o))} h.016 `;
    }
    const chip = `M${f(-S)},${f(-(cy + S))} H${f(S)} V${f(-(cy - S))} H${f(-S)}Z`;
    g += `<g opacity="${f(p.upload)}">`;
    if (y1 > y0) {
      const d = `M0,${f(-y0)} V${f(-y1)}`;
      g += `<path d="${d}" fill="none" stroke="${PAP}" stroke-width=".02" stroke-dasharray=".014 .018" stroke-dashoffset="${f(-c.t * 0.03 + 0.002)}" opacity=".92"/>`;
      g += `<path d="${d}" fill="none" stroke="${ACC}" stroke-width=".011" stroke-dasharray=".01 .022" stroke-dashoffset="${f(-c.t * 0.03)}"/>`;
    }
    g += `${stroke(pins, ACC, 0.004)}<path d="${chip}" fill="${PAP}" fill-opacity=".9" stroke="${PAP}" stroke-width=".016" stroke-linejoin="round" opacity=".92"/><path d="${chip}" fill="none" stroke="${ACC}" stroke-width=".0045"/>`;
    g += `<rect x="${f(-S * 0.45)}" y="${f(-(cy + S * 0.45))}" width="${f(S * 0.9)}" height="${f(S * 0.9)}" fill="none" stroke="${ACC}" stroke-width=".0025" opacity=".7"/></g>`;
  }

  // ----- progress: a stair from the world up to where man has climbed, with a mark going up it -----
  if (p.steps > 0.01) {
    const y0 = p.Wy + p.rW + 0.012, y1 = p.Sy - 0.09, n = 5;
    if (y1 > y0 + 0.04) {
      const x0 = -0.2, x1 = -0.02, dy = (y1 - y0) / n, dx = (x1 - x0) / n;
      let d = `M${f(x0)},${f(-y0)} `;
      for (let i = 1; i <= n; i++) d += `V${f(-(y0 + i * dy))} H${f(x0 + i * dx)} `;
      g += `<g opacity="${f(p.steps)}">${stroke(d, ACC, 0.0045)}<path d="${d}" fill="none" stroke="${PAP}" stroke-width=".0036" stroke-linecap="round" stroke-dasharray=".001 .04" stroke-dashoffset="${f(-c.t * 0.02)}"/></g>`;
    }
  }

  // ----- the covenant: two lines between God and man, his and his people's. Broken, his stays whole while theirs
  //       breaks into pieces. The tablets of the law hang on it, or an empty place where the Messiah is awaited. -----
  if (p.covenant > 0.01) {
    const y0 = G.y - G.r - 0.015, y1 = p.Sy + 0.095;
    if (y0 > y1) {
      // (from God wherever he is: during a move from a worldview where he goes round man, he is not yet overhead)
      const L = `M${f(G.x - 0.014)},${f(-y0)} L-.014,${f(-y1)}`, R = `M${f(G.x + 0.014)},${f(-y0)} L.014,${f(-y1)}`;
      const dash = p.broken > 0.02 ? ` stroke-dasharray="${f(0.03 * (1 - p.broken) + 0.01)} ${f(0.026 * p.broken)}"` : '';
      g += `<g opacity="${f(p.covenant)}">${stroke(L, ACC, 0.0045)}<path d="${L}" fill="none" stroke="${PAP}" stroke-width=".0036" stroke-linecap="round" stroke-dasharray=".001 .03" stroke-dashoffset="${f(-c.t * 0.015)}"/>`;
      g += `<path d="${R}" fill="none" stroke="${PAP}" stroke-width=".0165" stroke-linecap="round" opacity=".92"${dash}/><path d="${R}" fill="none" stroke="${ACC}" stroke-width=".0045" stroke-linecap="round"${dash}/></g>`;
    }
  }
  const mid = (G.y - G.r + p.Wy + p.rW) / 2;
  if (p.tablets > 0.01) {
    let d = '', lines = '';
    for (const x of [-0.038, 0.038]) {
      const w = 0.066, h = 0.115, bot = -(mid - h / 2), top = -(mid + h / 2);
      d += `M${f(x - w / 2)},${f(bot)} L${f(x - w / 2)},${f(top + w / 2)}${arcC(x, top + w / 2, w / 2, Math.PI, 2 * Math.PI)} L${f(x + w / 2)},${f(bot)}Z `;
      for (let i = 0; i < 4; i++) { const y = top + 0.045 + i * 0.017; lines += `M${f(x - 0.018)},${f(y)} H${f(x + 0.018)} `; }
    }
    g += `<g opacity="${f(p.tablets)}"><path d="${d}" fill="${PAP}" stroke="${PAP}" stroke-width=".016" stroke-linejoin="round" opacity=".92"/><path d="${d}" fill="${PAP}" stroke="${ACC}" stroke-width=".0045" stroke-linejoin="round"/>`;
    g += `<path d="${lines}" fill="none" stroke="${ACC}" stroke-width=".0026" stroke-linecap="round" opacity=".8"/></g>`;
  }
  if (p.awaited > 0.01) {
    g += `<g opacity="${f(p.awaited)}"><circle cx="0" cy="${f(-mid)}" r=".05" fill="${PAP}" fill-opacity=".85" stroke="${PAP}" stroke-width=".014" opacity=".92"/>`;
    g += `<circle cx="0" cy="${f(-mid)}" r=".05" fill="none" stroke="${ACC}" stroke-width=".0045" stroke-linecap="round" stroke-dasharray=".012 .014" stroke-dashoffset="${f(c.t * 0.004)}"/></g>`;
  }

  // ----- the Quran sent down: a ruled line from God to man, with its pages coming down it. God himself stays above. -----
  if (p.sent > 0.01) {
    const y0 = G.y - G.r - 0.02, y1 = p.Sy + 0.095;
    if (y0 > y1) {
      const d = `M${f(G.x)},${f(-y0)} L0,${f(-y1)}`;
      g += `<g opacity="${f(p.sent)}">${stroke(d, ACC, 0.0035)}`;
      g += `<path d="${d}" fill="none" stroke="${PAP}" stroke-width=".026" stroke-dasharray=".026 .05" stroke-dashoffset="${f(-c.t * 0.02 - 0.002)}" opacity=".92"/>`;
      g += `<path d="${d}" fill="none" stroke="${ACC}" stroke-width=".016" stroke-dasharray=".022 .054" stroke-dashoffset="${f(-c.t * 0.02)}"/></g>`;
    }
  }

  // ----- the scales of judgement: hung below God, tipping one way and then the other, never coming to rest -----
  if (p.scales > 0.01) {
    const py = G.y - G.r - 0.1, L = 0.2, a = 0.16 * Math.sin(c.t * 0.35) + 0.05 * Math.sin(c.t * 0.9);
    const ex = L * Math.cos(a), ey = L * Math.sin(a);
    let d = `M0,${f(-(G.y - G.r - 0.015))} V${f(-py)} M${f(-ex)},${f(-(py + ey))} L${f(ex)},${f(-(py - ey))} `;
    for (const s of [-1, 1]) {
      const x = s * ex, y = py - s * ey, by = y - 0.11;
      d += `M${f(x)},${f(-y)} L${f(x - 0.05)},${f(-by)} M${f(x)},${f(-y)} L${f(x + 0.05)},${f(-by)} M${f(x + 0.05)},${f(-by)}${arcC(x, -by, 0.05, 0, Math.PI)} `;
    }
    g += `<g opacity="${f(p.scales)}">${stroke(d, ACC, 0.0045)}<circle cx="0" cy="${f(-py)}" r=".011" fill="${ACC}" stroke="${PAP}" stroke-width=".004"/></g>`;
  }

  // ----- what the workers make, drawn up in three streams to the few at the top of the pyramid -----
  if (p.extract > 0.01) {
    const yT = p.Wy + p.rW * 0.6;
    let d = '', heads = '';
    for (const s of [-1, 0, 1]) {
      const x0 = 0.2 * s, y0 = s ? p.Sy - 0.02 : p.Sy + 0.085, xe = 0.035 * s;
      d += `M${f(x0)},${f(-y0)} Q${f(x0 * 0.9)},${f(-(yT - 0.1))} ${f(xe)},${f(-yT)} `;
      const deg = (Math.atan2(-(yT - (yT - 0.1)), xe - x0 * 0.9) * 180) / Math.PI;
      heads += `<path transform="translate(${f(xe)},${f(-yT)}) rotate(${f(deg)})" d="M.012,0 L-.016,-.014 L-.016,.014Z" fill="${ACC}" stroke="${PAP}" stroke-width=".004" stroke-linejoin="round"/>`;
    }
    g += `<g opacity="${f(p.extract)}">${stroke(d, ACC, 0.0045)}<path d="${d}" fill="none" stroke="${PAP}" stroke-width=".0045" stroke-linecap="round" stroke-dasharray=".004 .026" stroke-dashoffset="${f(-c.t * 0.03)}"/>${heads}</g>`;
  }

  // ----- revolution: a heavy arrow from the workers up to the top, which they take -----
  if (p.revolt > 0.01) {
    const y0 = p.Sy + 0.085, y1 = Math.max(y0 + 0.06, p.Wy + p.rW * lerp(0.8, 0.05, p.level));   // (lower as the pyramid is levelled)
    g += `<g opacity="${f(p.revolt)}">${stroke(`M0,${f(-y0)} V${f(-(y1 - 0.035))}`, ACC, 0.014)}
      <path d="M0,${f(-y0)} V${f(-(y1 - 0.04))}" fill="none" stroke="${PAP}" stroke-width=".005" stroke-linecap="round" stroke-dasharray=".012 .05" stroke-dashoffset="${f(c.t * 0.05)}"/>
      ${shape(`M0,${f(-y1)} L-.034,${f(-(y1 - 0.05))} L.034,${f(-(y1 - 0.05))}Z`, ACC)}</g>`;
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
// (it runs some thirty times a frame, so it works from a table of angles and makes no arrays: the sums are orbitAt's)
const AROUND = new Float64Array(96).map((_, i) => (i % 2 ? Math.sin : Math.cos)((Math.floor(i / 2) * Math.PI) / 24));
function orbitFits(p, R, rot) {
  const Ry = orbitRy(p, R), c = Math.cos(rot), s = Math.sin(rot);
  for (let i = 0; i < 96; i += 2) {
    const ca = AROUND[i], sa = AROUND[i + 1];
    const x = R * ca * c - Ry * sa * s, y = p.Sy + R * ca * s + Ry * sa * c, r = p.rG * (1 + 0.2 * sa) + 0.03;
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
let gTurn = null;
function godAt(p, dt) {
  const k = p.orbit;
  if (k < 0.001) { oShape = null; gTurn = null; return { x: 0, y: p.Gy, r: p.rG, front: 0, back: 0, R: p.oR, rot: p.oRot, want: [p.oR, p.oRot] }; }
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
  // Between his place above and his place on the orbit he goes round man, never through him: the blend is of his
  // angle and distance about man, the shorter way round, and that way is kept from frame to frame once chosen.
  const aA = Math.atan2(p.Gy - p.Sy, 0), rA = Math.abs(p.Gy - p.Sy), rB = Math.hypot(x, y - p.Sy);
  let turn = Math.atan2(y - p.Sy, x) - aA;
  const near = gTurn === null ? 0 : gTurn;
  turn -= 2 * Math.PI * Math.round((turn - near) / (2 * Math.PI));
  gTurn = k >= 1 ? null : turn;                   // (fully on the orbit, either way gives the same place)
  const kb = (k - 0.001) / 0.999;                  // (from 0 where the orbit begins above, so he starts without a step)
  const a = aA + turn * kb, d = lerp(rA, rB, kb);
  return { x: d * Math.cos(a), y: p.Sy + d * Math.sin(a), r: p.rG * (1 + 0.2 * s * k), front: k * ns, back: k * (1 - ns), R, rot, want };
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
let lastDraw = 0, ceiling = 1, raisedAt = -1e9, calm = 0;
const U = {};             // the shader's uniforms, refilled each painting
// The values that never change in some worldviews, as #defines for a version of the shader that leaves out what
// cannot show there (see version() in paint.js). Only values passed by name are fixed in this way: never those
// worked out in frame(), which change even where the value of the same name does not (uTick, uSoul).
const WORKED = new Set(['uRes', 'uCen', 'uUnit', 'uT', 'uG', 'uGx', 'uGf', 'uGb', 'uW', 'uSoul', 'uSpA', 'uSp[0]', 'uRipY', 'uTick', 'uHands', 'uLab[0]', 'uLabA']);
const fixedMemo = new Map();
let readyNext = false, workedChecked = false;
function fixedIn(ids) {
  const key = [...ids].sort().join(' ');
  if (!fixedMemo.has(key)) {
    const ps = [...ids].flatMap((id) => WORLDVIEWS[id].acts.map((a) => a.p));
    fixedMemo.set(key, autoU
      .filter(([u, k]) => !WORKED.has(u) && typeof ps[0][k] === 'number' && ps.every((q) => q[k] === ps[0][k]))
      .map(([u, k]) => `#define ${u} ${Number.isInteger(ps[0][k]) ? ps[0][k].toFixed(1) : ps[0][k]}`).join('\n'));
  }
  return fixedMemo.get(key);
}
let autoU = null;         // [uniform, value] pairs filled by name, found at the first painting
function frame(now) {
  requestAnimationFrame(frame);
  // If frames come slowly, paint at a lower resolution rather than stutter. Normally the change waits until nothing
  // is moving, where a jump in sharpness would show; but if frames are very slow it is made at once, since a
  // graphics card that is overwhelmed can fail outright. When frames have come at full speed for a while, the
  // resolution goes back up a step; if that step proves too much, it comes down again and stays below it.
  const moving = now - t0 < dur + 400;
  if (frozen === null && lastT && now - lastT < 400) {      // a long gap means the page was hidden, not slow
    acc += now - lastT;
    if (++nF === 20) {
      const ms = acc / nF;
      if (quality > 0.5 && (ms > 80 || (ms > 36 && !moving))) {
        if (now - raisedAt < 15000) { ceiling = quality - 0.25; raisedAt = -1e9; }
        quality -= 0.25; calm = 0; fitCanvas();
      } else if (ms < 20 && !moving && quality < ceiling) {
        if (++calm === 5) { quality += 0.25; raisedAt = now; calm = 0; fitCanvas(); }
      } else calm = 0;
      acc = 0; nF = 0;
    }
  }
  lastT = now;
  // While nothing on the page moves quickly, 30 paintings a second are enough: the washes drift by less than a
  // point between them. Moves, the glide between sizes and God's orbit get every frame the screen offers.
  const quick = moving || glide || live.orbit > 0.01 || frozen !== null;
  if (!quick && !repaint && now - lastDraw < 1000 / 30 - 4) return;
  repaint = false;
  const dt = lastDraw ? Math.min(100, now - lastDraw) / 1000 : 0;
  lastDraw = now;

  // (once a move is over the values stand still, so they are taken once rather than blended afresh each frame)
  if (!params.has('k')) {
    if (now - t0 < dur) { live = blendP(from, target(), ease((now - t0) / dur)); settled = -1; }
    else if (settled !== t0) { live = target(); settled = t0; onPage = new Set([cur.wv]); readyNext = true; }
  }
  const p = live;
  const t = frozen !== null ? frozen : reduced ? 0 : now / 1000;
  const hd = hands();
  arrow = frozen !== null ? frozen * 0.04 * p.flow : arrow + dt * 0.04 * p.flow * (reduced ? 0 : 1);
  orb = frozen !== null ? Math.PI / 2 + frozen * p.oSpd : orb + dt * p.oSpd * (reduced ? 0 : 1);
  const G = godAt(p, dt);
  window.__G = { ...G, cx, cy, unit, sy: p.Sy, quality };   // for tests: where God has got to, man, and the resolution

  const css = rgb(p.acc);
  if (css !== accent) { accent = css; document.documentElement.style.setProperty('--red', css); }

  stepGlide(now);
  layout(p, G, dt);
  if (p.spirits > 0.01) spiritsAt(p, t);
  if (painter) {
    // Values named for a uniform (glow for uGlow) go to the shader by themselves; the rest are worked out here,
    // and set after them, so that these win where a name is shared (uSoul, uTick).
    if (!autoU) autoU = Object.keys(p).map((k) => [`u${k[0].toUpperCase()}${k.slice(1)}`, k]).filter(([u]) => painter.uniforms.has(u));
    for (const [u, k] of autoU) U[u] = p[k];
    const entry = p.Wy + p.rW - 0.02;
    U.uRes = [canvas.width, canvas.height];
    U.uCen = [cx * scale, canvas.height - cy * scale];
    U.uUnit = unit * scale;
    U.uT = t;
    U.uG = [G.y, G.r];
    U.uGx = G.x;
    U.uGf = G.front;
    U.uGb = G.back;
    U.uW = [p.Wy, p.rW];
    U.uSoul = [spirits[0], spirits[1], p.spirits > 0.01 ? p.soul * p.spirits * (1 - 0.8 * p.anger) : 0];
    U.uSpA = p.spirits;
    U['uSp[0]'] = spirits;
    U.uRipY = entry + (p.Sy - entry) * p.ripAt;
    U.uTick = hd.whole;
    U.uHands = [hd.sec, hd.min, hd.hour];
    U['uLab[0]'] = rects;
    U.uLabA = lifts;
    painter.draw(U, fixedIn(onPage), !reduced && frozen === null && !params.has('k') && now - t0 < dur);
    // once a worldview has settled, its question's move is made ready in the background
    if (readyNext) { readyNext = false; painter.prepare(fixedIn([cur.wv, WORLDVIEWS[cur.wv].move.to])); }
    // (a value worked out here but missing from WORKED could be fixed wrongly: say so)
    if (!workedChecked) {
      workedChecked = true;
      const byName = new Set(autoU.map(([u]) => u));
      for (const u in U) if (!byName.has(u) && !WORKED.has(u)) console.error(`main.js: ${u} is worked out in frame() but missing from WORKED`);
    }
  }
  drawConn(p, { t, arrow, orb, tock: hd.tock }, G);
}

addEventListener('resize', resize);
renderText(true);
resize();
document.fonts.ready.then(resize);
requestAnimationFrame(frame);
