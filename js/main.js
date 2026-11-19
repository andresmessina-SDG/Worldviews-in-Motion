// Each deploy raises the ?v= number on these four imports and on the two in index.html, all to the same
// value, so that browsers fetch the new files together instead of mixing new ones with old cached ones.
import { createPainter } from './paint.js?v=109';
import { WORLDVIEWS, HOME } from './worldviews.js?v=109';
import { CATALOGUE } from './catalogue.js?v=109';
import { createMenu } from './menu.js?v=109';

// The address ends in #worldview/act, for example #deism/reason.
// For stills: ?wv=deism&act=3&t=5 freezes the clock; adding &k=0.5 shows the
// halfway point of the move from another worldview, named with &from= (and its act with &fromAct=).

const $ = (id) => document.getElementById(id);
const params = new URLSearchParams(location.search);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
// (a number from the address, kept to a range; anything else gives the fallback)
const num = (name, lo, hi, fallback) => { const v = Number(params.get(name)); return Number.isFinite(v) ? Math.min(hi, Math.max(lo, v)) : fallback; };
// ---------- language ----------
// English unless Spanish is asked for: in the address (?lang=es), by the reader's earlier choice, or by the browser's
// own language. Spanish lays its words over the English (js/es.js); the English is kept, to go back to.
const LANGS = ['en', 'es'];
const savedLang = (() => { try { return localStorage.getItem('lang'); } catch (e) { return null; } })();
const askedLang = (params.get('lang') || '').toLowerCase();
let lang = LANGS.includes(askedLang) ? askedLang : LANGS.includes(savedLang) ? savedLang
  : /^es\b/i.test(navigator.language || '') ? 'es' : 'en';
const UI_EN = {
  site: 'Worldviews in Motion', menu: 'Worldviews', acts: 'The four acts', painting: 'The painting.',
  pencil: 'not yet painted', language: 'Language', nogl: $('nogl').textContent,
  description: document.querySelector('meta[name="description"]').content,
};
const TEXT_EN = {
  names: CATALOGUE.map((c) => c.name),
  wv: Object.fromEntries(Object.entries(WORLDVIEWS).map(([id, w]) => [id, {
    name: w.name, tagline: w.tagline, move: w.move, acts: w.acts.map((x) => ({ name: x.name, text: x.text, labels: x.labels })),
  }])),
};
let T = UI_EN, BREAKS_ES = '', esModule = null;
const loadEs = async () => (esModule ||= await import('./es.js?v=109'));
function applyLang(l) {
  if (l === 'es') {
    esModule.apply(WORLDVIEWS, CATALOGUE);
    T = esModule.UI;
    BREAKS_ES = esModule.BREAKS;
  } else {
    CATALOGUE.forEach((c, i) => { c.name = TEXT_EN.names[i]; });
    for (const [id, e] of Object.entries(TEXT_EN.wv)) {
      const w = WORLDVIEWS[id];
      Object.assign(w, { name: e.name, tagline: e.tagline, move: e.move });
      w.acts.forEach((x, i) => Object.assign(x, e.acts[i]));
    }
    T = UI_EN;
  }
  lang = l;
  document.documentElement.lang = l;
  document.querySelector('.k').textContent = T.site;
  document.querySelector('meta[name="description"]').content = T.description;
  $('menu').setAttribute('aria-label', T.menu);
  $('marks').setAttribute('aria-label', T.acts);
  $('lang').setAttribute('aria-label', T.language);
  $('nogl').textContent = T.nogl;
}
if (lang === 'es') {
  try { await loadEs(); applyLang('es'); } catch (err) { console.error(err); lang = 'en'; }
}
// The switch: a pill with a half for each language, the open one inked in. The ink slides across to the other
// half, and the page changes its language where it stands (see changeLang below), without being loaded again.
const langLinks = LANGS.map((l) => {
  const a = document.createElement('a');
  a.lang = l;
  a.hreflang = l;
  a.textContent = l.toUpperCase();
  a.title = l === 'en' ? 'English' : 'Español';
  a.setAttribute('aria-label', a.title);
  a.addEventListener('click', (e) => { e.preventDefault(); changeLang(l); });
  $('lang').appendChild(a);
  return a;
});
const langInk = document.createElement('span');
langInk.className = 'ink';
langInk.setAttribute('aria-hidden', 'true');
$('lang').prepend(langInk);
function markLang() {
  langLinks.forEach((a) => {
    const u = new URL(location.href);
    u.searchParams.set('lang', a.lang);
    a.href = u.pathname + u.search + u.hash;
    if (a.lang === lang) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
  });
  const on = langLinks.find((a) => a.lang === lang);
  langInk.style.left = `${on.offsetLeft}px`;
  langInk.style.width = `${on.offsetWidth}px`;
}

const frozen = params.has('t') ? num('t', 0, 1e5, 5) : null;

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

// A move, between acts or between worldviews, blends every value (stageP below sets the order they go in). It walks
// the keys of the target, so each value must exist on both sides (see the rules at the top of worldviews.js).
const lerp = (a, b, k) => (typeof a === 'number' ? a + (b - a) * k : a.map((v, i) => v + (b[i] - v) * k));
const blendP = (a, b, k) => { const o = {}; for (const n in b) o[n] = lerp(a[n], b[n], k); return o; };
const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

// A move is staged. The strokes that join and mark things (the connectors named below) do not blend with the rest:
// those the new page lacks are withdrawn first, back toward where they start; then the shapes and colours travel;
// then the new page's connectors are drawn in, from their start to their finish. So no worldview's bridge or
// ladder is ever left standing in another's world. Between two acts of one worldview the three beats overlap;
// between worldviews they follow one another. A connector both pages have stays, and changes with the shapes.
// drawn[n] is how far connector n is drawn (missing: wholly); its value keeps the strength it has when at rest.
const STAGED = new Set(['ladder', 'bridge', 'ghost', 'empty', 'wheel', 'spokes', 'current', 'push', 'offer', 'bonds', 'wheelYr', 'cast', 'spiral',
  'rings', 'fence', 'upload', 'steps', 'covenant', 'tablets', 'awaited', 'sent', 'scales', 'extract', 'revolt', 'reason', 'call', 'rise',
  'divide', 'partake', 'forms', 'rebirth', 'pleroma', 'spheres', 'seeming']);
let drawn = {}, drawnFrom = {};
const unit01 = (v) => Math.min(1, Math.max(0, v));
function stageP(a, b, x, whole) {
  const e1 = ease(unit01(x / (whole ? 0.2 : 0.5)));
  const e2 = whole ? ease(unit01((x - 0.16) / 0.58)) : ease(x);
  const e3 = ease(unit01((x - (whole ? 0.7 : 0.35)) / (whole ? 0.3 : 0.65)));
  const o = {};
  for (const n in b) {
    if (!STAGED.has(n)) { o[n] = lerp(a[n], b[n], e2); continue; }
    const d0 = drawnFrom[n] ?? 1, was = a[n] > 0.01 && d0 > 0.003, will = b[n] > 0.01;
    if (will && was) { o[n] = lerp(a[n], b[n], e2); drawn[n] = lerp(d0, 1, e2); }
    else if (will) { o[n] = b[n]; drawn[n] = e3; }
    else if (was) { o[n] = a[n]; drawn[n] = d0 * (1 - e1); }
    else { o[n] = b[n]; drawn[n] = 1; }
  }
  return o;
}

let live = target(), settled = -1;
// the worldviews whose values are on the page: one at rest; during a move, those it blends between
let onPage = new Set([cur.wv]);
let from = live;
let t0 = -1e9;
let dur = 1;
let homeAt = -1e9;        // when the light of a homecoming is at its height
let whole = false;        // is the move under way one between worldviews
if (params.has('k')) {
  const other = built(params.get('from')) ? params.get('from') : Object.keys(WORLDVIEWS).find((w) => w !== cur.wv);
  const fa = params.has('fromAct') ? Math.min(3, Math.max(0, (Number(params.get('fromAct')) || 1) - 1)) : cur.act;
  live = blendP({ ...WORLDVIEWS[other].acts[fa].p, act: cur.act }, target(), num('k', 0, 1, 0.5));
  onPage = new Set([other, cur.wv]);
}

// ---------- lettering ----------
// hot: the place a label names ([x, y, radius, strength]); the painting lifts the paint there a little and the
// label's line is drawn heavier, while the pointer is on the label.
let hotKey = null, hotWas = null;
const hot = new Float32Array(4), named = {};
addEventListener('click', () => { if (pageLayout !== 'narrow') return; hotKey = null; let any = false; for (const o of KEYS) any = labels[o].el.classList.toggle('open', false) || any; measure(); repaint = true; });
const KEYS = ['god', 'world', 'bridge', 'self', 'sin'];
const READ = ['god', 'world', 'self', 'bridge', 'sin'];     // the order they are read in
const ALIGN = { god: 'center', world: 'center', bridge: 'left', self: 'left', sin: 'right' };
const NS = 'http://www.w3.org/2000/svg';
const labels = {};
// has this reader opened a label on a phone? until then, each new label's bud calls attention to itself (see .call)
let budsKnown = (() => { try { return localStorage.getItem('budsKnown') === '1'; } catch (e) { return false; } })();
for (const k of KEYS) {
  const el = document.createElement('div');
  el.className = `l ${ALIGN[k]} ${k}`;
  $('labels').appendChild(el);
  // On a phone only a label's first line shows; a tap opens its second, and closes any other that was open.
  el.addEventListener('click', (e) => {
    if (pageLayout !== 'narrow') return;
    e.stopPropagation();
    for (const o of KEYS) if (o !== k) labels[o].el.classList.remove('open');
    hotKey = el.classList.toggle('open') ? k : null;
    if (hotKey && !budsKnown) {
      budsKnown = true;
      for (const o of KEYS) labels[o].el.classList.remove('call');
      try { localStorage.setItem('budsKnown', '1'); } catch (err) { /* only for this visit */ }
    }
    measure();
    repaint = true;
  });
  // The pointer on a label (or, on a phone, the label opened) lights the thing it names: see hot below.
  el.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse' && pageLayout !== 'narrow') hotKey = k; });
  el.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse' && pageLayout !== 'narrow' && hotKey === k) hotKey = null; });
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
  // (the title's last word is held to the bud that follows it on a phone, so the bud never takes a line of its own)
  const title = content ? hang(content[0], ALIGN[k]).replace(/(\S+)$/, '<span class="tl">$1</span>') : '';
  const html = content ? `<span class="ti">${title}</span><small>${hang(content[1], ALIGN[k])}</small>` : '';
  if (L.html === html) return;
  L.html = html;
  clearTimeout(L.timer);
  const apply = () => {
    L.el.innerHTML = html;
    L.el.classList.remove('open', 'call');
    if (content && !budsKnown && !reduced && pageLayout === 'narrow') { void L.el.offsetWidth; L.el.classList.add('call'); }
    if (hotKey === k && (!content || pageLayout === 'narrow')) hotKey = null;
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
// Beside the question, the loop it belongs to: a ring with a dab for every worldview in the order the questions
// lead through them, home at the top, and the one on the page marked.
const LOOP = [HOME];
while (WORLDVIEWS[LOOP[LOOP.length - 1]].move.to !== HOME && LOOP.length < 99) LOOP.push(WORLDVIEWS[LOOP[LOOP.length - 1]].move.to);
const loopEl = document.createElement('div');
loopEl.id = 'loop';
$('moves').appendChild(loopEl);
function drawLoop() {
  const at = LOOP.indexOf(cur.wv), n = LOOP.length;
  let d = '';
  LOOP.forEach((id, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n, x = (15 * Math.cos(a)).toFixed(2), y = (15 * Math.sin(a)).toFixed(2);
    const col = (CATALOGUE.find((c) => c.id === id) || { c: ['#999', '#999'] }).c[i ? 1 : 0];
    d += i === at ? `<circle cx="${x}" cy="${y}" r="3.2" fill="var(--red)" stroke="#2b211d" stroke-width=".9"/>`
      : `<circle cx="${x}" cy="${y}" r="${i ? 1.55 : 2.2}" fill="${col}"${i ? '' : ' stroke="#2b211d" stroke-width=".6"'}/>`;
  });
  loopEl.innerHTML = `<svg viewBox="-20 -20 40 40"><circle r="19.2" fill="#f8f2e4" stroke="#2b211d" stroke-width="1"/>${d}<path d="M-5.5,0 H5 M1.2,-3.6 L5.2,0 L1.2,3.6" fill="none" stroke="#2b211d" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}
function placeLoop() {
  const s = loopEl.offsetWidth / 2;
  loopEl.style.left = `${moveBtn.offsetLeft + moveBtn.offsetWidth - s - 1}px`;
  loopEl.style.top = `${moveBtn.offsetTop + moveBtn.offsetHeight / 2 - s}px`;
}
moveBtn.onclick = () => { auto = false; go(moveTo, cur.act, true); };

// Where a long word in an act's name may break, should the names have to take two lines on a phone (a soft hyphen,
// seen only where the word is broken). A word missing here simply does not break; then, if it is too wide, only the
// open act keeps its name.
const BREAKS = 'De-con-struc-tion For-get-ful-ness Dis-con-nec-tion Super-sti-tion Im-per-ma-nence En-hance-ment Sin-gu-lar-ity '
  + 'Cul-ti-va-tion Re-mem-brance Ap-pease-ment Re-demp-tion Clock-mak-er Sub-mis-sion Ex-tinc-tion Alien-ation Rev-o-lu-tion '
  + 'Re-pres-sion Ful-fil-ment Un-fin-ished For-get-ting Ig-no-rance Un-cer-tain Judge-ment Suf-fer-ing Com-mu-nism Awak-en-ing '
  + 'As-cen-sion Knowl-edge An-ces-tors Ex-pres-sion';
const shyOf = (breaks) => Object.fromEntries(breaks.trim().split(' ').map((w) => [w.replace(/-/g, ''), w.replace(/-/g, '\u00ad')]));
let SHY = shyOf(`${BREAKS} ${BREAKS_ES}`);
const breakable = (name) => name.split(' ').map((w) => w.split('-').map((x) => SHY[x] ?? x).join('-')).join(' ');

// When a move answers the question of the page it leaves, the question is set large where the words were, for as
// long as the shapes travel; the words of the new worldview come only when it has gone.
const ask = $('ask');
let askTimers = [];
function caption(q, slow = 1) {
  askTimers.forEach(clearTimeout);
  ask.classList.remove('on');
  if (!q) return;
  askTimers = [setTimeout(() => {
    // (where the words stand: the column at the left, or on a phone the space under the painting)
    const narrow = pageLayout === 'narrow', a = document.querySelector('.act').getBoundingClientRect(), h = document.querySelector('.head').getBoundingClientRect();
    const top = narrow ? a.top : h.top, bottom = Math.max(a.bottom, top + 80);
    ask.style.cssText = `left:${a.left}px; top:${top}px; width:${a.width}px; height:${bottom - top}px`;
    ask.textContent = q;
    ask.classList.add('on');
  }, 520), setTimeout(() => ask.classList.remove('on'), 3300 * slow)];
}

let swapTimer = null;
function renderText(instant, wholePage, asked, slow = 1) {
  const wv = WORLDVIEWS[cur.wv];
  const a = actOf();
  marks.forEach((b, i) => b.setAttribute('aria-current', i === cur.act));
  // between worldviews the lettering stays away until the shapes have nearly settled
  // (they come in the order the eye should read the picture: the Ultimate, the world, man, what joins them, the problem)
  KEYS.forEach((k) => setLabel(k, a.labels[k], instant, (wholePage && !reduced ? 4300 * slow : 550) + (reduced ? 0 : 170 * READ.indexOf(k))));
  const fill = () => {
    document.title = `${wv.name} · ${T.site}`;
    $('name').textContent = wv.name;
    $('tag').textContent = wv.tagline;
    $('actName').textContent = a.name;
    $('actText').textContent = a.text;
    marks.forEach((b, i) => { b.textContent = breakable(wv.acts[i].name); });
    moveBtn.textContent = wv.move.q;
    moveTo = wv.move.to;
    drawLoop();
    $('scene').setAttribute('aria-label', `${T.painting} ${KEYS.filter((k) => a.labels[k]).map((k) => `${a.labels[k][0]}: ${a.labels[k][1]}.`).join(' ')}`);
    document.body.classList.remove('swap', 'swap-all');
    // the new words come up from a little below, as the old went up and away
    if (!instant && !reduced) { document.body.classList.add('rise'); void document.body.offsetWidth; document.body.classList.remove('rise'); }
    if (!instant) resize(false);                // new words may take a different amount of room
    placeLoop();
  };
  clearTimeout(swapTimer);
  if (instant) { caption(null); return fill(); }
  document.body.classList.add(wholePage ? 'swap-all' : 'swap');
  caption(asked, slow);
  swapTimer = setTimeout(fill, asked ? 3900 * slow : wholePage ? 480 : 700);   // (an act's words change as the dot on the line of history sets off)
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
  drawnFrom = { ...drawn };
  const asked = moved && WORLDVIEWS[cur.wv].move.to === wv ? WORLDVIEWS[cur.wv].move.q : null;   // (the question, if this move answers it)
  cur.wv = wv;
  cur.act = act;
  t0 = performance.now();
  whole = moved;
  // (coming home, back to where the questions began, the move takes longer, and light floods the page as it lands)
  const home = !!asked && wv === HOME && !reduced, slow = home ? 1.3 : 1;
  homeAt = home ? t0 + 0.62 * 5600 * slow : -1e9;
  dur = reduced ? 1 : moved ? 5600 * slow : 2600;
  history[step && moved ? 'pushState' : 'replaceState'](null, '', address());
  if (moved) startGlide(wv);
  renderText(false, moved, reduced ? null : asked, slow);
  if (moved) { menu.setCurrent(wv); menu.peek(1600); }
}
// ---------- the menu of worldviews ----------
const menu = createMenu($('menu'), CATALOGUE, {
  isBuilt: built,
  pencil: T.pencil,
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
const wordsBox = new Float32Array(4);           // where the words stand, for the painting to lift the paper under them: centre and half size
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
const findLongest = () => [longest((w) => [w.name]), longest((w) => [w.tagline]), longest((w) => w.acts.map((a) => a.name)),
  longest((w) => w.acts.map((a) => a.text)), longest((w) => [w.move.q])];
let LONGEST = findLongest();
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
  {
    // (beside the painting: from the title down to the question; on a phone: the act's words under the painting)
    const a = document.querySelector('.act').getBoundingClientRect(), h = narrow ? a : document.querySelector('.head').getBoundingClientRect();
    const l = Math.min(a.left, h.left), r = Math.max(a.right, h.right), t = h.top, b = Math.max(a.bottom, h.bottom);
    wordsBox.set([((l + r) / 2 - cx) / unit, (cy - (t + b) / 2) / unit, (r - l) / 2 / unit, (b - t) / 2 / unit]);
  }
  placeLoop();
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
  // what each label names, for the light under the pointer
  named.god = [G.x, G.y, G.r + 0.03]; named.world = [0, p.Wy, p.rW + 0.03]; named.self = [0, p.Sy, 0.11];
  named.bridge = [at.bridge[2], at.bridge[3], 0.1]; named.sin = [at.sin[2], at.sin[3], Math.max(0.08, p.stainR + 0.05)];
  const want = hotKey && labels[hotKey].on ? 1 : 0;
  if (want && (hot[3] < 0.02 || hotWas === hotKey)) { hot.set(named[hotKey]); hotWas = hotKey; }
  // (from one label straight to another: the light goes out before it comes on in the new place)
  const aim = want && hotWas === hotKey ? 1 : 0;
  hot[3] += (aim - hot[3]) * Math.min(1, dt * 9);
  if (hot[3] < 0.002) hot[3] = 0;
  for (const k of KEYS) labels[k].g.classList.toggle('hot', k === hotKey);
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

// ----- places shared by the connectors and the painting (each worked out once, from the same values) -----
// the five bonds: ruler, father, elder brother, friend, wife; or, as the line of descent, father to son to son.
// Each is [x, y in svg coordinates, strength].
const BOND = [[0, 0.21], [-0.15, 0.14], [0.15, 0.14], [-0.2, 0.02], [0, -0.18]];
const BLINE = [[0, 0.33], [0, 0.19], [0.06, 0.12], [-0.06, 0.12], [0, -0.17]];
const BLOP = [0.3, 0.6, 0, 0, 1];
function bondPlaces(p, t) {
  const sy = -p.Sy;
  return BOND.map(([bx, by], i) => {
    const drift = 0.05 * p.loose;
    const ox = drift * Math.sin(t * (0.21 + 0.07 * i) + i * 2.3), oy = drift * Math.cos(t * (0.17 + 0.05 * i) + i * 1.7);
    return [lerp(bx, BLINE[i][0], p.lineage) + ox, sy - (lerp(by, BLINE[i][1], p.lineage) + oy), p.bonds * lerp(1, BLOP[i], p.lineage)];
  });
}
// the Fullness: eight pairs of powers round the true God, the ring wide enough to clear his name, easing to a new
// width when the name changes. One partner (the eighth from the top on the right) is the power that fell.
// Each is { x, y (svg coordinates), r, lost, b (its angle, clockwise from the right, as svg measures) }.
let aeons = [];
function aeonPlaces(p, G, t) {
  const Ry = G.r + 0.1, want = Math.max(Ry, (labels.god.w / 2 + 0.035) / Math.cos(Math.PI / 8));
  plerR = plerR === null ? want : lerp(plerR, want, 0.06);
  const R = plerR, out = [];
  for (let i = 0; i < 8; i++) {
    const a = (i + 0.5) * (Math.PI / 4);                          // (svg angles: a pair at each side of the bottom, none level with the name)
    for (const s of [-1, 1]) {
      const b = a + (s * 0.068 * Ry) / R;
      out.push({ x: G.x + R * Math.cos(b), y: -G.y + Ry * Math.sin(b), r: 0.0125 * (1 + 0.12 * Math.sin(t * 0.7 + i * 1.3 + s)), lost: i === 1 && s === 1, b });
    }
  }
  return out;
}
// the scales: the beam's pivot height, its tilt, and its half length
const scalesAt = (p, G, t) => ({ py: G.y - G.r - 0.1, a: 0.16 * Math.sin(t * 0.35) + 0.05 * Math.sin(t * 0.9), L: 0.2 });
// the chip set where God was: its centre's height and half size
const chipAt = (p) => ({ cy: p.Gy - p.rG * 0.42, S: 0.052 });
// the Quran's line, from God down to man: its two ends (scene units, y up)
const sentLine = (p, G) => ({ x0: G.x, y0: G.y - G.r - 0.02, y1: p.Sy + 0.095 });

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
const COPIES = [[-0.19, 0.1], [-0.1, 0.2], [0.1, 0.2], [0.19, 0.1]], FSZ = 0.044;
const DARK = '#33271f', RED = [163, 38, 43], OCHRE = [176, 122, 30], GREY = '#6f6a66', PAP = '#f8f2e4';
const f = (n) => n.toFixed(4);
const rgb = (c) => `rgb(${c.map(Math.round).join(',')})`;
// (bare: a line drawn over something the painting paints, which must not be washed out by paper laid under the line)
const stroke = (d, col, wd, bare = false) => (bare ? `<path d="${d}" fill="none" stroke="${col}" stroke-width="${f(wd)}" data-bare="1"/>`
  : `<path d="${d}" fill="none" stroke="${PAP}" stroke-width="${f(wd + 0.012)}" stroke-linecap="round" stroke-linejoin="round" opacity=".92"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${f(wd)}" stroke-linecap="round" stroke-linejoin="round"/>`);
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
// ----- the pen -----
// A line drawn by hand rather than by machine: a filled shape, thin where the pen touches down and lifts, full in the
// middle, its edges wavering a little. The waver is laid along the line's own length from its start, with a seed for
// each connector, so it travels with the line when the line moves and never changes from frame to frame.
const hash1 = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const noise1 = (seed, t) => { const i = Math.floor(t), u = t - i, s = u * u * (3 - 2 * u); return hash1(seed + i) * (1 - s) + hash1(seed + i + 1) * s - 0.5; };
// pts: [[x, y], ...] in svg coordinates; w: the full width; closed: round a shape, with no ends
function penPath(pts, w, seed, { taper = 0.3, wobble = 0.003, closed = false } = {}) {
  // walk the line at even steps, so the waver and the pressure follow its length
  const P = closed ? [...pts, pts[0]] : pts, samples = [];
  let total = 0;
  const lens = [];
  for (let i = 1; i < P.length; i++) { const l = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); lens.push(l); total += l; }
  if (total < 1e-4) return '';
  const n = Math.max(2, Math.ceil(total / 0.008));
  let seg = 0, acc = 0;
  for (let k = 0; k <= n; k++) {
    const s = (k / n) * total;
    while (seg < lens.length - 1 && acc + lens[seg] < s) { acc += lens[seg]; seg++; }
    const u = lens[seg] ? (s - acc) / lens[seg] : 0, a = P[seg], b = P[seg + 1];
    samples.push([a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u, s]);
  }
  const L = [], R = [];
  samples.forEach(([x, y, s], k) => {
    const a = samples[Math.max(0, k - 1)], b = samples[Math.min(samples.length - 1, k + 1)];
    let nx = -(b[1] - a[1]), ny = b[0] - a[0];
    const nl = Math.hypot(nx, ny) || 1; nx /= nl; ny /= nl;
    const v = s / total, press = closed ? 1 : taper + (1 - taper) * Math.pow(Math.sin(Math.PI * Math.min(1, Math.max(0, v))), 0.35);
    const half = (w / 2) * press * (1 + 0.3 * noise1(seed + 7, s / 0.025));
    const off = wobble * noise1(seed, s / 0.06);
    L.push([x + nx * (off + half), y + ny * (off + half)]);
    R.push([x + nx * (off - half), y + ny * (off - half)]);
  });
  const pt = ([x, y]) => `${f(x)},${f(y)}`;
  if (closed) return `M${L.map(pt).join(' L')}Z M${R.reverse().map(pt).join(' L')}Z`;
  return `M${L.map(pt).join(' L')} L${R.reverse().map(pt).join(' L')}Z`;
}
// ink from the pen on wet paper: a pale band of lifted paper under it, a faint bleed of the ink into the paper
// around it, the line itself, and a small pool where the pen came to rest
function ink(pts, w, col, seed, opts = {}) {
  const rule = opts.closed ? 'evenodd' : 'nonzero';
  // (the lifted paper fades out from the line in three soft steps, rather than ending in a hard edge)
  let out = '';
  for (const [dw, op] of [[0.026, 0.1], [0.015, 0.2], [0.007, 0.36]]) out += `<path d="${penPath(pts, w + dw, seed + 3, { ...opts, taper: 0.7 })}" fill="${PAP}" fill-rule="${rule}" opacity="${op}"/>`;
  out += `<path d="${penPath(pts, w * 2.3, seed + 5, { ...opts, wobble: (opts.wobble ?? 0.003) * 1.7 })}" fill="${col}" fill-rule="${rule}" opacity=".13"/>`;
  out += `<path d="${penPath(pts, w, seed, opts)}" fill="${col}" fill-rule="${rule}" opacity=".9"/>`;
  if (!opts.closed && opts.pool !== false) { const e = pts[pts.length - 1]; out += `<circle cx="${f(e[0])}" cy="${f(e[1])}" r="${f(w * 0.8)}" fill="${col}" opacity=".8"/>`; }
  return out;
}
// A path's outline as lists of points, one list for each part it is made of (M, L, H, V, C, Q and Z, all absolute,
// as the connectors write them); null if it uses anything else.
function pathPoints(d) {
  const tok = d.match(/[A-Za-z]|-?\d*\.?\d+(?:e-?\d+)?/g) || [];
  const parts = [];
  let cur = null, x = 0, y = 0, i = 0, cmd = '';
  const num = () => Number(tok[i++]);
  while (i < tok.length) {
    if (/[A-Za-z]/.test(tok[i])) cmd = tok[i++];
    if (cmd === 'M') { x = num(); y = num(); cur = { pts: [[x, y]], closed: false }; parts.push(cur); cmd = 'L'; }
    else if (!cur) return null;
    else if (cmd === 'L') { x = num(); y = num(); cur.pts.push([x, y]); }
    else if (cmd === 'H') { x = num(); cur.pts.push([x, y]); }
    else if (cmd === 'V') { y = num(); cur.pts.push([x, y]); }
    else if (cmd === 'C' || cmd === 'Q') {
      const q = cmd === 'Q', c1 = [num(), num()], c2 = q ? c1 : [num(), num()], e = [num(), num()], s0 = [x, y];
      for (let k = 1; k <= 8; k++) {
        const t = k / 8, u = 1 - t;
        cur.pts.push(q ? [u * u * s0[0] + 2 * u * t * c1[0] + t * t * e[0], u * u * s0[1] + 2 * u * t * c1[1] + t * t * e[1]]
          : [u * u * u * s0[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * e[0], u * u * u * s0[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * e[1]]);
      }
      [x, y] = e;
    } else if (cmd === 'Z' || cmd === 'z') { cur.closed = true; if (cur.pts.length > 1) { const a = cur.pts[0], b = cur.pts[cur.pts.length - 1]; if (Math.hypot(a[0] - b[0], a[1] - b[1]) < 1e-6) cur.pts.pop(); } [x, y] = cur.pts[0]; cmd = ''; }
    else return null;
    if (tok[i] === undefined) break;
  }
  return parts;
}
const ringPoints = (cx, cy, rx, ry) => { const n = Math.max(24, Math.min(160, Math.ceil(2 * Math.PI * Math.max(rx, ry) / 0.012))); return Array.from({ length: n }, (_, i) => [cx + rx * Math.cos((2 * Math.PI * i) / n), cy + ry * Math.sin((2 * Math.PI * i) / n)]); };
// Every plain line in a connector's drawing given to the pen (see ink): its outlines and its rules alike. A dashed line
// stays as it is (its dashes run along it as the clock turns, and a pen line would have to be redrawn as they go), and
// so do filled shapes. The plain paper strokes laid under lines so that they read on a dark wash are dropped, since
// each pen line brings its own softer one. seed names the connector, so its lines keep their waver from frame to frame.
const attrsOf = (a) => { const o = {}; for (const m of a.matchAll(/([\w-]+)="([^"]*)"/g)) o[m[1]] = m[2]; return o; };
// (a line that has not moved since the last frame is not drawn again: its pen strokes are kept)
const inked = new Map();
function inkify(svg, seed) {
  let n = 0;
  if (inked.size > 600) inked.clear();
  return svg.replace(/<(path|circle|ellipse)\b([^>]*?)\/>/g, (whole, tag, a) => {
    const k = n++, key = `${seed}|${k}|${whole}`;
    if (inked.has(key)) return inked.get(key);
    const out = inkOne(whole, tag, a, seed, k);
    inked.set(key, out);
    return out;
  });
}
function inkOne(whole, tag, a, seed, k) {
  {
    const A = attrsOf(a);
    if (!A.stroke || (tag === 'path' && !A.fill) || A['stroke-dasharray']) return whole;
    if (A.stroke === PAP) return A.opacity === '.92' && (!A.fill || A.fill === 'none') ? '' : whole;
    // a filled shape with an outline (a node, a pan): the fill as it was, the outline by the pen over it
    let under = '';
    if (A.fill && A.fill !== 'none') {
      if (Number(A['stroke-width'] || 0) < 0.002) return whole;
      under = whole.replace(/\sstroke(-width|-linejoin|-linecap)?="[^"]*"/g, '');
    }
    const w = Number(A['stroke-width'] || 0.004);
    let parts;
    if (tag === 'path') parts = pathPoints(A.d);
    else if (tag === 'circle') parts = [{ pts: ringPoints(+(A.cx || 0), +(A.cy || 0), +A.r, +A.r), closed: true }];
    else parts = [{ pts: ringPoints(+(A.cx || 0), +(A.cy || 0), +A.rx, +A.ry), closed: true }];
    if (!parts) return whole;
    const op = (A.opacity ? +A.opacity : 1) * (A['stroke-opacity'] ? +A['stroke-opacity'] : 1);
    const keep = ['transform', 'clip-path'].filter((x) => A[x]).map((x) => ` ${x}="${A[x]}"`).join('');
    const fine = w < 0.003 || A['data-bare'];   // (a hairline, or a line over painted things: no bleed or paper under it, only the pen)
    let out = '';
    parts.forEach((pt, j) => {
      if (pt.pts.length < 2) return;
      let len = 0; for (let i = 1; i < pt.pts.length; i++) len += Math.hypot(pt.pts[i][0] - pt.pts[i - 1][0], pt.pts[i][1] - pt.pts[i - 1][1]);
      const sd = seed + k * 13.7 + j * 5.3, opts = { closed: pt.closed, pool: len > 0.08, wobble: Math.min(0.003, 0.0012 + len * 0.004) };
      out += fine ? `<path d="${penPath(pt.pts, w * 1.15, sd, opts)}" fill="${A.stroke}" fill-rule="evenodd" opacity=".9"/>` : ink(pt.pts, w, A.stroke, sd, opts);
    });
    return `${under}<g${keep} opacity="${f(op)}">${out}</g>`;
  }
}
const seedOf = (name) => { let h = 7; for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) % 9973; return h; };
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

let plerR = null;           // the width of the ring of powers round God, in Gnosticism
// How a connector comes and goes while it is being drawn (see stageP): wiped along the way it runs, as the pen
// would draw it, by a clip path that grows from its start (clip paths are safe: see the rules above).
// ['y', a, b]: from height a to height b; ['x', a, b]: across; ['sweep', x, y]: round that point, clockwise from
// the top; nothing: it fades. Heights reach a little past the connector, so that none of it is left for the end.
const runs = (n, p, G) => {
  const down = ['y', G.y - G.r * 0.4, p.Sy - 0.13], up = ['y', p.Sy - 0.02, G.y - G.r + 0.06];
  switch (n) {
    case 'bridge': case 'covenant': case 'sent': case 'seeming': case 'ghost': return down;
    case 'scales': return ['y', G.y - G.r + 0.02, G.y - G.r - 0.34];
    case 'partake': return ['y', 0.4, p.Wy];
    case 'rebirth': return ['y', 0.28, -0.22];
    case 'ladder': case 'reason': case 'spiral': case 'upload': case 'steps': return up;
    case 'rise': return ['y', p.Wy + p.rW, p.Sy + 0.02];
    case 'revolt': case 'extract': return ['y', p.Sy, p.Wy + p.rW + 0.05];
    case 'spheres': return ['y', p.Wy + p.rW * 0.2, p.Wy + p.rW + 0.26];
    case 'divide': return ['x', -0.47, 0.47];
    case 'wheel': case 'empty': return ['sweep', 0, p.Gy];
    case 'pleroma': return ['sweep', G.x, G.y];
    case 'wheelYr': return ['sweep', 0, p.Wy];
    case 'cast': case 'fence': return ['sweep', 0, p.Sy];
    default: return ['fade'];
  }
};
let clipN = 0;
function reveal(n, inner, p, G, k = drawn[n] ?? 1) {
  inner = inkify(inner, seedOf(n));
  if (k >= 0.999) return inner;
  if (k <= 0.003) return '';
  const [kind, a, b] = runs(n, p, G);
  let cut;
  if (kind === 'y') {
    const y = a + (b - a) * k;              // (svg y runs down: the rectangle spans from -a to -y, with a margin behind the start)
    cut = b < a ? `<rect x="-3" y="${f(-a - 0.04)}" width="6" height="${f(a - y + 0.04)}"/>` : `<rect x="-3" y="${f(-y)}" width="6" height="${f(y - a + 0.04)}"/>`;
  } else if (kind === 'x') {
    cut = `<rect x="${f(a - 0.02)}" y="-3" width="${f((b - a) * k + 0.02)}" height="6"/>`;
  } else if (kind === 'sweep') {
    let d = `M${f(a)},${f(-b)}`;
    for (let i = 0; i <= 12; i++) { const t = -Math.PI / 2 + (k * 2 * Math.PI * i) / 12; d += ` L${f(a + 3 * Math.cos(t))},${f(-b + 3 * Math.sin(t))}`; }
    cut = `<path d="${d}Z"/>`;
  } else return `<g opacity="${f(k)}">${inner}</g>`;
  const id = `rv${clipN++}`;
  return `<defs><clipPath id="${id}">${cut}</clipPath></defs><g clip-path="url(#${id})" opacity="${f(Math.min(1, k * 6))}">${inner}</g>`;
}

function drawConn(p, c, G) {
  clipN = 0;
  const bTop = p.Gy - p.rG + p.bOff;
  const top = -bTop, bot = -p.bbot;              // svg y grows downward
  const ACC = rgb(p.acc);
  let g = '';

  // ----- the ascent: a ladder from man up through the dividing line toward the Forms -----
  if (p.ladder > 0.01) {
    const g0 = g; g = '';
    const y0 = p.Sy + 0.09, y1 = p.divY + 0.15, HW = 0.024;
    let d = `M${f(-HW)},${f(-y0)} V${f(-y1)} M${f(HW)},${f(-y0)} V${f(-y1)} `;
    for (let y = y0 + 0.03; y < y1 - 0.01; y += 0.046) d += `M${f(-HW)},${f(-y)} H${f(HW)} `;
    // (it fades quickly and lies under anything else, so that the bridge coming down in its place reads cleanly)
    g += `<g opacity="${f(p.ladder * p.ladder)}">${stroke(d, ACC, 0.0045)}</g>`;
    g = g0 + reveal('ladder', g, p, G);
  }

  // ----- the bridge from God to man, with arrowheads running down it -----
  if (p.bridge > 0.01) {
    const g0 = g; g = '';
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
    g = g0 + reveal('bridge', g, p, G);
  }

  // ----- where a word from God would have come: an empty, dashed outline -----
  if (p.ghost > 0.01) {
    const g0 = g; g = '';
    g += `<path d="M-.022,${f(top)} V${f(bot)} M.022,${f(top)} V${f(bot)}" fill="none" stroke="${GREY}" stroke-width=".0042" stroke-linecap="round" stroke-dasharray=".016 .018" opacity="${f(p.ghost)}"/>`;
    g = g0 + reveal('ghost', g, p, G);
  }

  // ----- where God would stand: an empty place, marked out and left blank -----
  if (p.empty > 0.01) {
    const g0 = g; g = '';
    g += `<circle cx="0" cy="${f(-p.Gy)}" r="${f(p.rG)}" fill="none" stroke="${GREY}" stroke-width=".0042" stroke-linecap="round" stroke-dasharray=".016 .018" stroke-dashoffset="${f(c.t * 0.004)}" opacity="${f(p.empty)}"/>`;
    g = g0 + reveal('empty', g, p, G);
  }

  // ----- the wheel of rebirth: a ring around everything, turning without end.
  //       With spokes it becomes the wheel of the teaching, turning about the self at its hub. -----
  const wr = Math.max(p.wheel, p.spokes);
  if (wr > 0.01) {
    const g0 = g; g = '';
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
    g = g0 + reveal('wheel', g, p, G, Math.max(drawn.wheel ?? 1, drawn.spokes ?? 1));
  }

  // ----- the current: the line where yin meets yang, turning with them, and the stream that carries man round.
  //       Man either pushes against it, straining, or goes along with it. -----
  if (p.current > 0.01) {
    const g0 = g; g = '';
    const R = p.rW, wy = -p.Wy, deg = (c.t * 0.06 * 180) / Math.PI;
    const s = `M0,${f(-R)}${arcC(0, -R / 2, R / 2, -Math.PI / 2, Math.PI / 2)}${arcC(0, R / 2, R / 2, -Math.PI / 2, -1.5 * Math.PI)}`;
    const r0 = Math.abs(p.Sy - p.Wy);
    g += `<g opacity="${f(p.current)}"><g transform="translate(0 ${f(wy)}) rotate(${f(deg)})">${stroke(s, ACC, 0.006)}</g>`;
    g += `<circle cx="0" cy="${f(wy)}" r="${f(r0)}" fill="none" stroke="${ACC}" stroke-width=".0065" stroke-linecap="round" stroke-dasharray=".014 .026" stroke-dashoffset="${f(-c.t * 0.012)}" opacity=".85"/></g>`;
    g = g0 + reveal('current', g, p, G);
  }
  if (p.push > 0.01) {
    const g0 = g; g = '';
    // at man's place on the stream the current runs right, so he pushes leftward; as he gives up, the strain goes out of it
    const strain = 1 - p.along, jit = 0.012 * strain * Math.sin(c.t * 7.3) * Math.sin(c.t * 2.1);
    const dir = -1, x0 = dir * 0.085, x1 = dir * (0.085 + (0.1 + 0.02 * Math.sin(c.t * 1.3)) * Math.min(1, p.push * 1.5));
    const y = -p.Sy + jit;
    const head = `M${f(x1)},${f(y)} L${f(x1 - dir * 0.03)},${f(y - 0.02)} L${f(x1 - dir * 0.03)},${f(y + 0.02)}Z`;
    g += `<g opacity="${f(p.push)}">${stroke(`M${f(x0)},${f(y)} L${f(x1 - dir * 0.02)},${f(y)}`, ACC, 0.007)}${shape(head, ACC)}</g>`;
    g = g0 + reveal('push', g, p, G);
  }

  // ----- offerings: short lines from man out to the spirits that troubled him, with gifts travelling along them -----
  if (p.offer > 0.01 && p.spirits > 0.01) {
    const g0 = g; g = '';
    let d = '';
    for (let i = 0; i < 5; i++) {
      const x = spirits[i * 4], y = spirits[i * 4 + 1], dx = x, dy = y - p.Sy, L = Math.hypot(dx, dy) || 1;
      if (L < 0.11) continue;
      d += `M${f(dx / L * 0.075)},${f(-(p.Sy + dy / L * 0.075))} L${f(x - dx / L * 0.03)},${f(-(y - dy / L * 0.03))} `;
    }
    g += `<g opacity="${f(p.offer)}">${stroke(d, ACC, 0.0045)}<path d="${d}" fill="none" stroke="${PAP}" stroke-width=".0045" stroke-linecap="round" stroke-dasharray=".006 .022" stroke-dashoffset="${f(-c.t * 0.02)}"/></g>`;
    g = g0 + reveal('offer', g, p, G);
  }

  // ----- the five bonds: ruler, father and elder brother above man, a friend beside him, a wife below.
  //       Loosened, the people drift out of place and the lines break; at death they close into a line of
  //       generations, with offerings rising from the living to the dead. -----
  if (p.bonds > 0.01) {
    const g0 = g; g = '';
    const sy = -p.Sy;
    let lines = '', dots = '', rite = '';
    bondPlaces(p, c.t).forEach(([x, y, op], i) => {
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
      // (where the painting paints the people, only their outline is drawn here)
      dots += `<circle cx="${f(x)}" cy="${f(y)}" r=".028" fill="${painter ? 'none' : PAP}" stroke="${ACC}" stroke-width=".0055"${painter ? ' data-bare="1"' : ''} opacity="${f(op)}"/>`;
    });
    g += lines + rite + dots;
    g = g0 + reveal('bonds', g, p, G);
  }

  // ----- the wheel of the year: a ring round the world with its eight festivals, the solstices and equinoxes as small
  //       circles and the days between as ticks, and a mark going round as the year turns (once about every 50 s,
  //       with the colours of the land in the painting) -----
  if (p.wheelYr > 0.01) {
    const g0 = g; g = '';
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
    g = g0 + reveal('wheelYr', g, p, G);
  }
  // ----- the circle cast round man for the rite, with the four quarters marked -----
  if (p.cast > 0.01) {
    const g0 = g; g = '';
    const r = 0.125, sy = -p.Sy;
    let marks = '';
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2, x = r * Math.cos(a), y = sy + r * Math.sin(a);
      marks += `<circle cx="${f(x)}" cy="${f(y)}" r=".009" fill="${ACC}" stroke="${PAP}" stroke-width=".004"/>`;
    }
    g += `<g opacity="${f(p.cast)}"><circle cx="0" cy="${f(sy)}" r="${r}" fill="none" stroke="${PAP}" stroke-width=".0145" opacity=".92"/><circle cx="0" cy="${f(sy)}" r="${r}" fill="none" stroke="${ACC}" stroke-width=".0045"/>`;
    g += `<circle cx="0" cy="${f(sy)}" r="${r}" fill="none" stroke="${PAP}" stroke-width=".0036" stroke-linecap="round" stroke-dasharray=".001 .05" stroke-dashoffset="${f(-c.t * 0.02)}"/>${marks}</g>`;
    g = g0 + reveal('cast', g, p, G);
  }

  // ----- a beam of consciousness rising from man to the Universe; widened, a spiral of lives winding up toward it -----
  if (p.spiral > 0.01) {
    const g0 = g; g = '';
    const y0 = p.Sy + 0.09, y1 = p.Gy - p.rG * 0.45;
    if (y1 > y0) {
      let d = '';
      for (let i = 0; i <= 64; i++) {
        const s = i / 64, y = y0 + (y1 - y0) * s, x = p.spiralW * 0.07 * (1 - 0.5 * s) * Math.sin(s * 3.5 * 2 * Math.PI + c.t * 0.4);
        d += `${i ? 'L' : 'M'}${f(x)},${f(-y)} `;
      }
      g += `<g opacity="${f(p.spiral)}">${stroke(d, ACC, 0.0042)}<path d="${d}" fill="none" stroke="${PAP}" stroke-width=".0036" stroke-linecap="round" stroke-dasharray=".001 .03" stroke-dashoffset="${f(-c.t * 0.025)}"/></g>`;
    }
    g = g0 + reveal('spiral', g, p, G);
  }

  // ----- rings round man: closing in as he looks inward, or going out from him as he expresses himself -----
  if (p.rings > 0.01) {
    const g0 = g; g = '';
    const k = (p.ringDir + 1) / 2;
    let d = '';
    for (let i = 0; i < 3; i++) {
      const ph = (c.t * 0.12 + i / 3) % 1, r = 0.095 + 0.2 * lerp(1 - ph, ph, k), op = Math.sin(Math.PI * ph);
      d += `<g opacity="${f(op)}"><circle cx="0" cy="${f(-p.Sy)}" r="${f(r)}" fill="none" stroke="${PAP}" stroke-width=".0125" opacity=".92"/><circle cx="0" cy="${f(-p.Sy)}" r="${f(r)}" fill="none" stroke="${ACC}" stroke-width=".004"/></g>`;
    }
    g += `<g opacity="${f(p.rings)}">${d}</g>`;
    g = g0 + reveal('rings', g, p, G);
  }
  // ----- other people's rules: a ring of short bars round man, hemming him in; thrown off, they burst outward -----
  if (p.fence > 0.01) {
    const g0 = g; g = '';
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
    g = g0 + reveal('fence', g, p, G);
  }

  // ----- uploading: bits going up from man to a chip set in the place left empty above -----
  if (p.upload > 0.01) {
    const g0 = g; g = '';
    const { cy, S } = chipAt(p), y0 = p.Sy + 0.09, y1 = cy - S - 0.012;
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
    g += `${stroke(pins, ACC, 0.004, !!painter)}${painter ? '' : `<path d="${chip}" fill="${PAP}" fill-opacity=".9" stroke="${PAP}" stroke-width=".016" stroke-linejoin="round" opacity=".92"/>`}<path d="${chip}" fill="none" stroke="${ACC}" stroke-width=".0045"${painter ? ' data-bare="1"' : ''}/>`;
    g += `<rect x="${f(-S * 0.45)}" y="${f(-(cy + S * 0.45))}" width="${f(S * 0.9)}" height="${f(S * 0.9)}" fill="none" stroke="${ACC}" stroke-width=".0025" opacity=".7"/></g>`;
    g = g0 + reveal('upload', g, p, G);
  }

  // ----- progress: a stair from the world up to where man has climbed, with a mark going up it -----
  if (p.steps > 0.01) {
    const g0 = g; g = '';
    const y0 = p.Wy + p.rW + 0.012, y1 = p.Sy - 0.09, n = 5;
    if (y1 > y0 + 0.04) {
      const x0 = -0.2, x1 = -0.02, dy = (y1 - y0) / n, dx = (x1 - x0) / n;
      let d = `M${f(x0)},${f(-y0)} `;
      for (let i = 1; i <= n; i++) d += `V${f(-(y0 + i * dy))} H${f(x0 + i * dx)} `;
      g += `<g opacity="${f(p.steps)}">${stroke(d, ACC, 0.0045)}<path d="${d}" fill="none" stroke="${PAP}" stroke-width=".0036" stroke-linecap="round" stroke-dasharray=".001 .04" stroke-dashoffset="${f(-c.t * 0.02)}"/></g>`;
    }
    g = g0 + reveal('steps', g, p, G);
  }

  // ----- the covenant: two lines between God and man, his and his people's. Broken, his stays whole while theirs
  //       breaks into pieces. The tablets of the law hang on it, or an empty place where the Messiah is awaited. -----
  if (p.covenant > 0.01) {
    const g0 = g; g = '';
    const y0 = G.y - G.r - 0.015, y1 = p.Sy + 0.095;
    if (y0 > y1) {
      // (from God wherever he is: during a move from a worldview where he goes round man, he is not yet overhead)
      // his line: whole, a little heavier, with the slow dots of his faithfulness running down it
      const his = [[G.x - 0.015, -y0], [-0.015, -y1]], theirs = [[G.x + 0.015, -y0], [0.015, -y1]];
      // (where the painting paints the tablets, the lines pass behind them: they are cut away there)
      const tm = (G.y - G.r + p.Wy + p.rW) / 2, behind = painter && (p.tablets > 0.01 || p.awaited > 0.01);
      // (the cut: the tablets' box, or the awaited place's round)
      const hole = p.tablets >= p.awaited ? `M-.075,${f(-tm - 0.06)} H.075 V${f(-tm + 0.06)} H-.075Z`
        : `M.052,${f(-tm)}${arcC(0, -tm, 0.052, 0, Math.PI)}${arcC(0, -tm, 0.052, Math.PI, 2 * Math.PI)}Z`;
      const L = `M${f(his[0][0])},${f(his[0][1])} L${f(his[1][0])},${f(his[1][1])}`;
      if (behind) g += `<defs><clipPath id="cvb"><path clip-rule="evenodd" d="M-3,-3 H3 V3 H-3Z ${hole}"/></clipPath></defs><g clip-path="url(#cvb)">`;
      g += `<g opacity="${f(p.covenant)}">${ink(his, 0.0058, ACC, 11)}<path d="${L}" fill="none" stroke="${PAP}" stroke-width=".0034" stroke-linecap="round" stroke-dasharray=".001 .03" stroke-dashoffset="${f(-c.t * 0.015)}"/>`;
      // theirs: the same pen, broken into pieces as the people break it
      if (p.broken > 0.02) {
        const len = y0 - y1, on = 0.03 * (1 - p.broken) + 0.01, period = on + 0.026 * p.broken;
        for (let s0 = 0, i = 0; s0 < len; s0 += period, i++) {
          const a = s0, b = Math.min(len, s0 + on), at = (t) => [G.x + 0.015 + (0 - G.x) * (t / len), -y0 + t];
          if (b - a > 0.002) g += ink([at(a), at(b)], 0.0048, ACC, 40 + i, { pool: false, taper: 0.5 });
        }
      } else g += ink(theirs, 0.0048, ACC, 23);
      g += behind ? '</g></g>' : '</g>';
    }
    g = g0 + reveal('covenant', g, p, G);
  }
  const mid = (G.y - G.r + p.Wy + p.rW) / 2;
  if (p.tablets > 0.01 && !painter) {
    const g0 = g; g = '';
    // two tablets of stone, cut by hand: a cool stone wash, darker where it dries at the rim, an uneven outline,
    // and the commandments as rows of short carved marks
    let body = '', marks = '';
    [-0.038, 0.038].forEach((x, ti) => {
      const w = 0.066, h = 0.115, bot = -(mid - h / 2), top = -(mid + h / 2), r = w / 2, pts = [];
      pts.push([x - r, bot]);
      for (let i = 0; i <= 10; i++) { const a = Math.PI + (i / 10) * Math.PI; pts.push([x + r * Math.cos(a), top + r + r * Math.sin(a)]); }
      pts.push([x + r, bot]);
      const out = pts.map(([px, py], i) => [px + 0.0016 * noise1(70 + ti * 13, i * 0.9), py + 0.0016 * noise1(90 + ti * 13, i * 0.9)]);
      const d = `M${out.map(([px, py]) => `${f(px)},${f(py)}`).join(' L')}Z`;
      body += `<path d="${d}" fill="url(#stone)"/><path d="${d}" fill="none" stroke="${ACC}" stroke-width=".006" stroke-linejoin="round" opacity=".22"/>`;
      body += ink(out, 0.0044, DARK, 120 + ti * 17, { closed: true, wobble: 0.0012 });
      // five rows, each of two or three words of uneven length
      for (let row = 0; row < 5; row++) {
        const y = top + 0.04 + row * 0.0145;
        let xx = x - 0.021;
        for (let wd = 0; wd < 3 && xx < x + 0.019; wd++) {
          const len = 0.007 + 0.011 * hash1(ti * 50 + row * 7 + wd), e = Math.min(x + 0.021, xx + len);
          if (e - xx > 0.003) marks += ink([[xx, y], [e, y + 0.0006 * noise1(row, wd)]], 0.0021, ACC, 200 + ti * 40 + row * 5 + wd, { pool: false, taper: 0.4, wobble: 0.0006 });
          xx = e + 0.004;
        }
      }
    });
    const stone = `<defs><linearGradient id="stone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6f2ea"/><stop offset=".7" stop-color="#e7e4dc"/><stop offset="1" stop-color="#d9d7d2"/></linearGradient></defs>`;
    g += `<g opacity="${f(p.tablets)}">${stone}${body}${marks}</g>`;
    g = g0 + reveal('tablets', g, p, G);
  }
  if (p.awaited > 0.01) {
    const g0 = g; g = '';
    g += `<g opacity="${f(p.awaited)}">${painter ? '' : `<circle cx="0" cy="${f(-mid)}" r=".05" fill="${PAP}" fill-opacity=".85" stroke="${PAP}" stroke-width=".014" opacity=".92"/>`}`;
    g += `<circle cx="0" cy="${f(-mid)}" r=".05" fill="none" stroke="${ACC}" stroke-width=".0045" stroke-linecap="round" stroke-dasharray=".012 .014" stroke-dashoffset="${f(c.t * 0.004)}"/></g>`;
    g = g0 + reveal('awaited', g, p, G);
  }

  // ----- the Quran sent down: a ruled line from God to man, with its pages coming down it. God himself stays above. -----
  if (p.sent > 0.01) {
    const g0 = g; g = '';
    const { x0, y0, y1 } = sentLine(p, G);
    if (y0 > y1) {
      const d = `M${f(x0)},${f(-y0)} L0,${f(-y1)}`;
      g += `<g opacity="${f(p.sent)}">${stroke(d, ACC, 0.0035, !!painter)}`;
      // (the pages coming down: painted, where there is a painting; drawn as heavy dashes where there is not)
      if (!painter) {
        g += `<path d="${d}" fill="none" stroke="${PAP}" stroke-width=".026" stroke-dasharray=".026 .05" stroke-dashoffset="${f(-c.t * 0.02 - 0.002)}" opacity=".92"/>`;
        g += `<path d="${d}" fill="none" stroke="${ACC}" stroke-width=".016" stroke-dasharray=".022 .054" stroke-dashoffset="${f(-c.t * 0.02)}"/>`;
      }
      g += '</g>';
    }
    g = g0 + reveal('sent', g, p, G);
  }

  // ----- the scales of judgement: hung below God, tipping one way and then the other, never coming to rest -----
  if (p.scales > 0.01) {
    const g0 = g; g = '';
    const { py, a, L } = scalesAt(p, G, c.t);
    const ex = L * Math.cos(a), ey = L * Math.sin(a);
    let d = `M0,${f(-(G.y - G.r - 0.015))} V${f(-py)} M${f(-ex)},${f(-(py + ey))} L${f(ex)},${f(-(py - ey))} `;
    for (const s of [-1, 1]) {
      const x = s * ex, y = py - s * ey, by = y - 0.11;
      d += `M${f(x)},${f(-y)} L${f(x - 0.05)},${f(-by)} M${f(x)},${f(-y)} L${f(x + 0.05)},${f(-by)} M${f(x + 0.05)},${f(-by)}${arcC(x, -by, 0.05, 0, Math.PI)} `;
    }
    g += `<g opacity="${f(p.scales)}">${stroke(d, ACC, 0.0045, !!painter)}<circle cx="0" cy="${f(-py)}" r=".011" fill="${ACC}" stroke="${PAP}" stroke-width=".004"/></g>`;
    g = g0 + reveal('scales', g, p, G);
  }

  // ----- what the workers make, drawn up in three streams to the few at the top of the pyramid -----
  if (p.extract > 0.01) {
    const g0 = g; g = '';
    const yT = p.Wy + p.rW * 0.6;
    let d = '', heads = '';
    for (const s of [-1, 0, 1]) {
      const x0 = 0.2 * s, y0 = s ? p.Sy - 0.02 : p.Sy + 0.085, xe = 0.035 * s;
      d += `M${f(x0)},${f(-y0)} Q${f(x0 * 0.9)},${f(-(yT - 0.1))} ${f(xe)},${f(-yT)} `;
      const deg = (Math.atan2(-(yT - (yT - 0.1)), xe - x0 * 0.9) * 180) / Math.PI;
      heads += `<path transform="translate(${f(xe)},${f(-yT)}) rotate(${f(deg)})" d="M.012,0 L-.016,-.014 L-.016,.014Z" fill="${ACC}" stroke="${PAP}" stroke-width=".004" stroke-linejoin="round"/>`;
    }
    g += `<g opacity="${f(p.extract)}">${stroke(d, ACC, 0.0045)}<path d="${d}" fill="none" stroke="${PAP}" stroke-width=".0045" stroke-linecap="round" stroke-dasharray=".004 .026" stroke-dashoffset="${f(-c.t * 0.03)}"/>${heads}</g>`;
    g = g0 + reveal('extract', g, p, G);
  }

  // ----- revolution: a heavy arrow from the workers up to the top, which they take -----
  if (p.revolt > 0.01) {
    const g0 = g; g = '';
    const y0 = p.Sy + 0.085, y1 = Math.max(y0 + 0.06, p.Wy + p.rW * lerp(0.8, 0.05, p.level));   // (lower as the pyramid is levelled)
    g += `<g opacity="${f(p.revolt)}">${stroke(`M0,${f(-y0)} V${f(-(y1 - 0.035))}`, ACC, 0.014)}
      <path d="M0,${f(-y0)} V${f(-(y1 - 0.04))}" fill="none" stroke="${PAP}" stroke-width=".005" stroke-linecap="round" stroke-dasharray=".012 .05" stroke-dashoffset="${f(c.t * 0.05)}"/>
      ${shape(`M0,${f(-y1)} L-.034,${f(-(y1 - 0.05))} L.034,${f(-(y1 - 0.05))}Z`, ACC)}</g>`;
    g = g0 + reveal('revolt', g, p, G);
  }

  // ----- reason: a thin line climbing from man, with marks moving upward -----
  if (p.reason > 0.01) {
    const g0 = g; g = '';
    const y0 = -(p.Wy + p.rW + 0.115), y1 = top + 0.035;
    g += `<g opacity="${f(p.reason)}">${stroke(`M0,${f(y0)} V${f(y1)}`, ACC, 0.0075)}
      <path d="M0,${f(y0)} V${f(y1 + 0.02)}" fill="none" stroke="${PAP}" stroke-width=".0038" stroke-linecap="round" stroke-dasharray=".016 .07" stroke-dashoffset="${f(c.t * 0.045)}"/>
      <path d="M0,${f(y1 - 0.04)} L-.021,${f(y1 + 0.004)} L.021,${f(y1 + 0.004)}Z" fill="${ACC}" stroke="${PAP}" stroke-width=".004" stroke-linejoin="round"/></g>`;
    g = g0 + reveal('reason', g, p, G);
  }

  // ----- a call for help: arcs going out from man toward God, wherever he has got to -----
  if (p.call > 0.01) {
    const g0 = g; g = '';
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
    g = g0 + reveal('call', g, p, G);
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
    const g0 = g; g = '';
    const y0 = p.Wy + p.rW + 0.02, y1 = p.Sy - 0.095;
    if (y1 > y0) {
      const d = `M0,${f(-y0)} V${f(-y1)}`;
      g += `<g opacity="${f(p.rise)}"><path d="${d}" fill="none" stroke="${PAP}" stroke-width=".0145" stroke-linecap="round" stroke-dasharray=".001 .024" stroke-dashoffset="${f(-c.t * 0.02)}" opacity=".92"/><path d="${d}" fill="none" stroke="${ACC}" stroke-width=".0065" stroke-linecap="round" stroke-dasharray=".001 .024" stroke-dashoffset="${f(-c.t * 0.02)}"/></g>`;
    }
    g = g0 + reveal('rise', g, p, G);
  }

  // ----- the line between the seen and the known: ruled, and fading out at its ends -----
  if (p.divide > 0.01) {
    const g0 = g; g = '';
    let segs = '';
    for (let i = 0; i < 24; i++) {
      const x0 = -0.44 + (0.88 * i) / 24, x1 = x0 + 0.88 / 24 - 0.006, m = 1 - Math.pow(Math.abs((x0 + x1) / 2) / 0.44, 3);
      segs += `<path d="M${f(x0)},${f(-p.divY)} H${f(x1)}" fill="none" stroke="${DARK}" stroke-width=".0026" opacity="${f(m)}"/>`;
    }
    g += `<g opacity="${f(p.divide * 0.55)}">${segs}</g>`;
    g = g0 + reveal('divide', g, p, G);
  }

  // ----- participation: each copy below hangs from its Form above by a dotted thread, with being coming down it -----
  if (p.partake > 0.01) {
    const g0 = g; g = '';
    let d = '';
    FORMS.forEach(([fx, fy], i) => {
      const [cx0, cy0] = COPIES[i], x1 = cx0, y1 = p.Wy + cy0 + 0.05;
      d += `M${f(fx)},${f(-(fy - FSZ - 0.012))} L${f(x1)},${f(-y1)} `;
    });
    g += `<g opacity="${f(p.partake)}"><path d="${d}" fill="none" stroke="${ACC}" stroke-width=".0014" opacity=".45"/>`;
    g += `<path d="${d}" fill="none" stroke="${ACC}" stroke-width=".0058" stroke-linecap="round" stroke-dasharray=".001 .02" stroke-dashoffset="${f(-c.t * 0.012)}" opacity=".9"/></g>`;
    g = g0 + reveal('partake', g, p, G);
  }

  // ----- the Forms: perfect figures in ruled ink, and the one thing on the page that never moves -----
  if (p.forms > 0.01 && !painter) {
    const g0 = g; g = '';
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
    g = g0 + reveal('forms', g, p, G);
  }

  // ----- rebirth: souls not yet pure carried back down into the world, round and round -----
  if (p.rebirth > 0.01) {
    const g0 = g; g = '';
    const P = [[0.37, 0.22], [0.58, 0.12], [0.52, -0.12], [0.32, -0.15]];
    const d = `M${f(P[0][0])},${f(-P[0][1])} C${f(P[1][0])},${f(-P[1][1])} ${f(P[2][0])},${f(-P[2][1])} ${f(P[3][0] + 0.012)},${f(-(P[3][1] + 0.004))}`;
    const ang = (Math.atan2(-(P[3][1] - P[2][1]), P[3][0] - P[2][0]) * 180) / Math.PI;
    g += `<g opacity="${f(p.rebirth)}">${stroke(d, ACC, 0.0045)}<path d="${d}" fill="none" stroke="${PAP}" stroke-width=".0045" stroke-linecap="round" stroke-dasharray=".001 .03" stroke-dashoffset="${f(-c.t * 0.03)}"/>`;
    g += `<path transform="translate(${f(P[3][0])},${f(-P[3][1])}) rotate(${f(ang)})" d="M.012,0 L-.018,-.017 L-.018,.017Z" fill="${ACC}" stroke="${PAP}" stroke-width=".004" stroke-linejoin="round"/></g>`;
    g = g0 + reveal('rebirth', g, p, G);
  }

  // ----- Gnosticism: the Fullness, a ring of powers in pairs round the unknown Father. One pair has lost a partner:
  //       Wisdom, who fell. Her place is left empty, and a dotted trail runs down from it to the maker she brought forth. -----
  if (p.pleroma > 0.01) {
    const g0 = g; g = '';
    // (wide enough that the pairs level with God's name stay clear of it, whatever size the lettering has here;
    // when the name changes, the ring eases to its new width rather than jumping)
    const Ry = G.r + 0.1, R = plerR, FALLEN = 1;
    // (where the painting paints the powers, it draws them whole: only the empty place of the one that fell is drawn here)
    let rings = '', lost = '', ringsInk = '', lostInk = '';
    for (const { x, y, r, lost: fell } of aeons) {
      const c0 = `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}"/>`;
      if (fell) { lost += c0; lostInk = painter ? '' : `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="${PAP}" fill-opacity=".6" stroke="${DARK}" stroke-width=".0032"/>`; }
      else { rings += c0; if (!painter) ringsInk += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="none" stroke="${DARK}" stroke-width=".0032"/>`; }
    }
    g += `<g opacity="${f(p.pleroma)}">${painter ? '' : `<g fill="${PAP}" fill-opacity=".6" stroke="${PAP}" stroke-width=".0115" opacity=".92">${rings}</g>`}${ringsInk}`;
    g += `<g opacity="${f(1 - p.sophia)}">${lostInk}</g>`;
    g += `<g opacity="${f(p.sophia)}" fill="none" stroke="${DARK}" stroke-width=".0026" stroke-dasharray=".006 .006">${lost}</g></g>`;
    if (p.sophia > 0.01 && p.demi > 0.01) {
      const b = (FALLEN + 0.5) * (Math.PI / 4) + (0.068 * Ry) / R, x0 = G.x + R * Math.cos(b), y0 = -G.y + Ry * Math.sin(b) + 0.02;
      const x1 = p.demiR * 0.5, y1 = -(p.demiY + p.demiR + 0.025);
      const d = `M${f(x0)},${f(y0)} C${f(x0 + 0.16)},${f(y0 + 0.02)} ${f(x1 + 0.2)},${f(y1 - 0.04)} ${f(x1)},${f(y1)}`;
      g += `<g opacity="${f(p.sophia * Math.min(1, p.demi * 2) * p.pleroma)}"><path d="${d}" fill="none" stroke="${PAP}" stroke-width=".0135" stroke-linecap="round" stroke-dasharray=".001 .018" stroke-dashoffset="${f(-c.t * 0.015)}" opacity=".92"/><path d="${d}" fill="none" stroke="${ACC}" stroke-width=".0065" stroke-linecap="round" stroke-dasharray=".001 .018" stroke-dashoffset="${f(-c.t * 0.015)}"/></g>`;
    }
    g = g0 + reveal('pleroma', g, p, G);
  }

  // ----- Gnosticism: the seven heavens of the maker's rulers, arched over the world, each with its ruler going round.
  //       On guard, the rulers gather at the top, where the way up lies; the gates there open for the Revealer coming
  //       down and for the spark going home, and the rulers stand aside. -----
  if (p.spheres > 0.01) {
    const g0 = g; g = '';
    const top = 1.5 * Math.PI, span = Math.PI / 2 - 0.42, N = 10;
    let segs = '', rulers = '';
    for (let i = 0; i < 7; i++) {
      const r = p.rW + 0.05 + i * 0.026, half = (0.003 + 0.05 * p.gates) / r;   // (the gate's half width, as an angle)
      for (const s of [-1, 1]) {
        for (let k = 0; k < N; k++) {
          const u0 = half + ((span - half) * k) / N, u1 = half + ((span - half) * (k + 1)) / N - 0.004 / r;
          const m = 1 - Math.pow((u0 + u1) / 2 / span, 3);              // (fading out toward the ends)
          const a0 = top + s * u0, a1 = top + s * u1;
          segs += `<path d="M${f(r * Math.cos(a0))},${f(-p.Wy + r * Math.sin(a0))}${arcC(0, -p.Wy, r, a0, a1)}" fill="none" stroke="${DARK}" stroke-width=".0026" opacity="${f(m)}"/>`;
        }
      }
      // each ruler goes to and fro along his heaven; on guard he stands at the gate, to one side of it
      const side = i % 2 ? 1 : -1;
      const roam = top + side * (0.12 + (span - 0.3) * (0.5 + 0.5 * Math.sin(c.t * (0.05 + 0.011 * i) + i * 1.9)));
      const post = top + side * (half + (0.016 + 0.01 * Math.sin(c.t * 0.6 + i)) / r);
      const a = lerp(roam, post, p.guard);
      rulers += `<circle cx="${f(r * Math.cos(a))}" cy="${f(-p.Wy + r * Math.sin(a))}" r=".0085"/>`;
    }
    g += `<g opacity="${f(p.spheres)}"><g opacity=".7">${segs}</g>`;
    g += `<g fill="${DARK}" stroke="${PAP}" stroke-width=".004">${rulers}</g></g>`;
    g = g0 + reveal('spheres', g, p, G);
  }

  // ----- Gnosticism: the Revealer, coming down from the Fullness past the maker and through the gates. He is an
  //       outline only, dashed and never painted: he only seemed to have a body. -----
  if (p.seeming > 0.01) {
    const g0 = g; g = '';
    const yR = p.Wy + p.rW + 0.12, rR = 0.04, y0 = G.y - G.r - 0.115;   // (from just below the ring of powers)
    const d = `M${f(G.x)},${f(-y0)} C${f(G.x + 0.32)},${f(-(y0 - 0.12))} ${f(0.3)},${f(-(yR + 0.22))} 0,${f(-(yR + rR + 0.015))}`;
    const d2 = `M0,${f(-(yR - rR - 0.015))} V${f(-(p.Sy + 0.085))}`;
    const dots = (dd) => `<path d="${dd}" fill="none" stroke="${PAP}" stroke-width=".0125" stroke-linecap="round" stroke-dasharray=".001 .02" stroke-dashoffset="${f(-c.t * 0.02)}" opacity=".92"/><path d="${dd}" fill="none" stroke="${ACC}" stroke-width=".0055" stroke-linecap="round" stroke-dasharray=".001 .02" stroke-dashoffset="${f(-c.t * 0.02)}"/>`;
    g += `<g opacity="${f(p.seeming)}">${dots(d)}${dots(d2)}`;
    g += `<circle cx="0" cy="${f(-yR)}" r="${f(rR)}" fill="${PAP}" fill-opacity=".45" stroke="${PAP}" stroke-width=".0125" opacity=".92"/>`;
    g += `<circle cx="0" cy="${f(-yR)}" r="${f(rR)}" fill="none" stroke="${ACC}" stroke-width=".0045" stroke-dasharray=".011 .009" stroke-dashoffset="${f(c.t * 0.01)}"/></g>`;
    g = g0 + reveal('seeming', g, p, G);
  }

  // ----- the line of history -----
  const ty = 0.87, bx = ext * (-0.72 + 0.48 * p.act);
  g += ink([[-ext, ty], [ext + 0.04, ty]], 0.0055, DARK, 501, { pool: false, wobble: 0.0015 });
  // (inked in as far as the open act: how much of the story has been told)
  if (bx + ext > 0.01) g += ink([[-ext, ty], [bx, ty]], 0.0115, ACC, 509, { pool: false, wobble: 0.0015, taper: 0.55 });
  if (p.tick > 0.01) {
    let ticks = '';
    for (let i = 0; i <= 48; i++) ticks += `M${f(-ext + (2 * ext * i) / 48)},${ty + 0.012} v.014 `;
    g += `<path d="${ticks}" stroke="${DARK}" stroke-width=".002" opacity="${f(0.7 * p.tick)}"/>`;
  }
  g += `<path d="M${f(ext + 0.085)},${ty} L${f(ext + 0.03)},${ty - 0.026} L${f(ext + 0.03)},${ty + 0.026}Z" fill="${DARK}" stroke="${PAP}" stroke-width=".004" stroke-linejoin="round"/>`;
  for (let i = 0; i < 4; i++) g += `<circle cx="${f(ext * (-0.72 + 0.48 * i))}" cy="${ty}" r=".013" fill="${i < p.act - 0.5 ? ACC : PAP}" stroke="${DARK}" stroke-width=".0055"/>`;
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
// The pictorial things the painting paints, each as [x, y (scene units, y up), size, how far in]: the Messiah's empty
// place, the chip, the two pans of the scales, the five people of the bonds, and the Quran's pages coming down.
const awaitV = new Float32Array(4), chipV = new Float32Array(4), panV = new Float32Array(8), bondV = new Float32Array(20), pageV = new Float32Array(40), aeonV = new Float32Array(64);
let accC = [0.64, 0.15, 0.17];
const inOf = (n, p) => (p[n] > 0.01 ? p[n] * (drawn[n] ?? 1) : 0);
function paintedThings(p, G, t) {
  accC = p.acc.map((v) => v / 255);
  awaitV.set([0, (G.y - G.r + p.Wy + p.rW) / 2, 0.05, inOf('awaited', p)]);
  const ch = chipAt(p);
  chipV.set([0, ch.cy, ch.S, inOf('upload', p)]);
  const sc = scalesAt(p, G, t), ex = sc.L * Math.cos(sc.a), ey = sc.L * Math.sin(sc.a), si = inOf('scales', p);
  panV.set([-ex, sc.py + ey - 0.11, 0.05, si, ex, sc.py - ey - 0.11, 0.05, si]);
  const bi = inOf('bonds', p) / Math.max(p.bonds, 1e-3);
  bondPlaces(p, t).forEach(([x, y, op], i) => bondV.set([x, -y, 0.028, op * bi], i * 4));
  // the powers of the Fullness: each comes in as the pen sweeps round to it (see runs: 'sweep' from the top, clockwise)
  aeonV.fill(0);
  const k = drawn.pleroma ?? 1;
  aeons.forEach((a, i) => {
    const from = (a.b + Math.PI / 2 + 4 * Math.PI) % (2 * Math.PI), here = Math.min(1, Math.max(0, (k * 2 * Math.PI - from) / 0.3));
    aeonV.set([a.x, -a.y, a.r, p.pleroma * here * (a.lost ? 1 - p.sophia : 1)], i * 4);
  });
  // the pages: one every .076 along the line, moving down it at .02 a second, as the dashes once did
  pageV.fill(0);
  // (enough pages to cover the whole line, however long; and none below the part of it drawn so far)
  const sl = sentLine(p, G), dx = 0 - sl.x0, dy = sl.y1 - sl.y0, len = Math.hypot(dx, dy);
  const si2 = p.sent > 0.01 ? p.sent : 0, reach = len * (drawn.sent ?? 1);
  if (si2 > 0 && len > 0.05) {
    for (let k = 0; k < 10; k++) {
      const s0 = ((t * 0.02 + k * 0.076) % (10 * 0.076)) + 0.011;
      if (s0 > Math.min(len, reach) - 0.011) continue;
      const u = s0 / len, fade = Math.min(1, s0 / 0.04, (len - s0) / 0.04);
      pageV.set([sl.x0 + dx * u, sl.y0 + dy * u, Math.atan2(dy, dx), si2 * fade], k * 4);
    }
  }
}
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
    if (i === 0) {
      x = lerp(x, 0, p.soul); y = lerp(y, p.soulY, p.soul);
      // (in Gnosticism the spark going home passes round the maker, not through him, by the way the Revealer came)
      x += p.pleroma * 0.2 * Math.exp(-(((y - p.demiY) / 0.13) ** 2));
    } else a1 *= 1 - p.soul;
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
const WORKED = new Set(['uRes', 'uCen', 'uUnit', 'uT', 'uG', 'uGx', 'uGf', 'uGb', 'uW', 'uSoul', 'uSpA', 'uSp[0]', 'uRipY', 'uTick', 'uHands', 'uLab[0]', 'uLabA', 'uWords', 'uHome', 'uHot', 'uWash', 'uFormsIn', 'uTabletsIn', 'uAwait', 'uChip', 'uPan[0]', 'uBond[0]', 'uPage[0]', 'uAeon[0]', 'uAccC']);
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
    if (now - t0 < dur) { live = stageP(from, target(), (now - t0) / dur, whole); settled = -1; }
    else if (settled !== t0) { live = target(); drawn = {}; settled = t0; onPage = new Set([cur.wv]); readyNext = true; }
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
  aeons = p.pleroma > 0.01 ? aeonPlaces(p, G, t) : [];
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
    U.uWords = wordsBox;
    U.uHot = hot;
    U.uWash = washOf(now);
    // the pictorial things the painting paints (the connectors leave them out while it does): as far as they are drawn in
    U.uFormsIn = p.forms > 0.01 ? p.forms * (drawn.forms ?? 1) : 0;
    U.uTabletsIn = p.tablets > 0.01 ? p.tablets * (drawn.tablets ?? 1) : 0;
    paintedThings(p, G, t);
    U.uAwait = awaitV; U.uChip = chipV; U['uPan[0]'] = panV; U['uBond[0]'] = bondV; U['uPage[0]'] = pageV; U['uAeon[0]'] = aeonV; U.uAccC = accC;
    U.uHome = Math.exp(-(((now - homeAt) / 1100) ** 2));
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

// The language switch stands on the line of the site's name: at the right of the column of words, or of the page.
// On a phone the name is centred, and the switch takes the middle of the room between it and the paper's edge;
// should that room be too narrow, it shows only the other language.
function placeLang() {
  const sw = $('lang'), k = document.querySelector('.k'), rg = document.createRange();
  rg.selectNodeContents(k);
  const kr = rg.getBoundingClientRect(), W = innerWidth;
  sw.classList.remove('one');
  const edge = pageLayout === 'narrow' ? Math.max(16, 0.045 * W) : W * (pageLayout === 'wide' ? 0.08 : pageLayout === 'compact' ? 0.05 : 0.04);
  let w = sw.offsetWidth;
  if (pageLayout === 'narrow' && W - edge - kr.right < w + 12) { sw.classList.add('one'); w = sw.offsetWidth; }
  const x = pageLayout === 'narrow' ? Math.max(kr.right + 8, (kr.right + W - edge - w) / 2) : W - edge - w;
  sw.style.left = `${Math.round(x)}px`;
  let y = (kr.top + kr.bottom) / 2 - sw.offsetHeight / 2;
  // (on a phone a long title can reach under it: it keeps above the title's line)
  if (pageLayout === 'narrow') { rg.selectNodeContents($('name')); y = Math.min(y, rg.getBoundingClientRect().top + 3 - sw.offsetHeight); }
  sw.style.top = `${Math.round(y)}px`;
  sw.classList.add('placed');
}
// ---------- a change of language ----------
// The painting stays as it is and goes on moving; only the words change. The old ones dissolve into the paper like
// ink into a wet sheet (lang-out); a stroke of clean water passes across the painting, lifting its colour a little
// (washOf); and the new words are brushed in from the left, one after another in the order they are read (lang-in).
const INKED = ['.k', '#name', '#tag', '#actName', '#actText', '#moves button', ...READ.map((k) => `#labels .l.${k}`), '#marks button'];
let washAt = -1e9, changing = false;
const wash = [0, 0];          // (a plain pair: the painter takes a Float32Array for a vec4)
// the stroke of water: where it has got to across the painting, how wide, how strongly it lifts the paint
// (for stills: ?wash=0.5 holds the stroke halfway across)
const washHeld = params.has('wash') ? num('wash', 0, 1, 0.5) : null;
function washOf(now) {
  const k = washHeld ?? (now - washAt) / 1700;
  [wash[0], wash[1]] = k <= 0 || k >= 1 ? [0, 0] : [-2.3 + 4.6 * ease(k), Math.sin(Math.PI * k)];
  return wash;
}
const pause = (ms) => new Promise((r) => setTimeout(r, ms));
async function changeLang(l) {
  if (l === lang || changing || !LANGS.includes(l)) return;
  changing = true;
  try { localStorage.setItem('lang', l); } catch (err) { /* not kept: the address still carries it */ }
  try {
    if (l === 'es') await loadEs();
  } catch (err) {
    // (Spanish could not be fetched: load the page again in it, as a last resort)
    const to = new URL(location.href); to.searchParams.set('lang', l); location.replace(to.href); return;
  }
  // (whatever happens below, the switch is free again afterwards, and no word is left hidden)
  try {
    // (a move under way finishes first, so that its words are not cut short)
    const left = t0 + dur - performance.now();
    if (left > 0) await pause(left + 60);
    const calm = reduced || frozen !== null;
    lang = l;
    markLang();                                   // the ink slides to the other half
    const B = document.body.classList;
    if (!calm) {
      washAt = performance.now() + 250;
      INKED.forEach((sel, i) => document.querySelectorAll(sel).forEach((el) => el.style.setProperty('--d', `${(i * 0.045).toFixed(3)}s`)));
      // (a label's line is drawn once its words are on the paper)
      READ.forEach((k) => labels[k].g.style.setProperty('--d', `${((INKED.indexOf(`#labels .l.${k}`) + 4) * 0.045).toFixed(3)}s`));
      B.add('lang-out');
      await pause(500);
    }
    applyLang(l);
    SHY = shyOf(`${BREAKS} ${BREAKS_ES}`);
    LONGEST = findLongest();
    const u = new URL(location.href);
    u.searchParams.set('lang', l);
    history.replaceState(history.state, '', u.pathname + u.search + u.hash);
    // The new words may need other room. The layout is chosen again for them; on a phone the painting glides to its
    // new size rather than jumping.
    const was = { unit, cx, cy, ext }, layoutWas = pageLayout;
    resize(true);
    if (!calm && layoutWas === 'narrow' && pageLayout === 'narrow') {
      glide = { from: was, to: { unit, cx, cy, ext }, t0: performance.now() };
      ({ unit, cx, cy, ext } = was);
      fit();
    }
    menu.rename();
    renderText(true);
    placeLang();
    markLang();
    if (!calm) {
      B.remove('lang-out');
      B.add('lang-in');
      await pause(1500 + INKED.length * 45);
      B.remove('lang-in');
    }
  } finally {
    document.body.classList.remove('lang-out', 'lang-in');
    changing = false;
  }
}
addEventListener('resize', resize);
addEventListener('resize', placeLang);
addEventListener('resize', markLang);
renderText(true);
resize();
placeLang();
markLang();
// (the first labels are lettered before the layout is known: on a phone, their buds call now)
if (pageLayout === 'narrow' && !budsKnown && !reduced) for (const k of KEYS) if (labels[k].on) labels[k].el.classList.add('call');
document.fonts.ready.then(() => { resize(); placeLang(); markLang(); });
requestAnimationFrame(frame);
