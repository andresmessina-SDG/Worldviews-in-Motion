import { createPainter } from './paint.js';
import { WORLDVIEWS, ORDER, ACTS, HOME } from './worldviews.js';

const $ = (s) => document.querySelector(s);
const canvas = $('#paint');
const stage = $('#stage');
const ui = $('.ui');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let painter = null;
try {
  painter = createPainter(canvas);
} catch (err) {
  console.error(err);
}
if (!painter) $('#nogl').hidden = false;

// ---------- state ----------

const cur = { id: HOME, act: 0 };
const target = () => WORLDVIEWS[cur.id].acts[cur.act].state;

function lerp(a, b, t) {
  if (typeof a === 'number') return a + (b - a) * t;
  if (Array.isArray(a)) return a.map((v, i) => lerp(v, b[i], t));
  const o = {};
  for (const k in a) o[k] = lerp(a[k], b[k], t);
  return o;
}
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

let live = lerp(target(), target(), 0);
let from = live;
let to = live;
let t0 = 0;
let dur = 1;

function go(id, act, instant = false) {
  if (!WORLDVIEWS[id]) id = HOME;
  act = Math.max(0, Math.min(ACTS.length - 1, act));
  const changedView = id !== cur.id;
  if (!changedView && act === cur.act && !instant) return;
  cur.id = id;
  cur.act = act;
  from = live;
  to = target();
  t0 = performance.now();
  dur = instant || reduced ? 1 : changedView ? 2400 : 1500;
  history.replaceState(null, '', `#${id}/${act + 1}`);
  renderUI(instant);
}

// ---------- interface ----------

const labelKeys = ['U', 'W', 'S', 'B', 'P', 'R', 'T'];
const labelAlign = { U: 'center', W: 'center', S: 'left', B: 'left', P: 'right', R: 'right', T: 'center' };
const labelEls = {};
for (const k of labelKeys) {
  const el = document.createElement('div');
  el.className = `label ${labelAlign[k]}`;
  $('#labels').appendChild(el);
  labelEls[k] = { el, text: '', pending: null };
}

function labelText(k) {
  const l = WORLDVIEWS[cur.id].labels[k];
  return (Array.isArray(l) ? l[cur.act] : l) || '';
}

function setLabel(k, text) {
  const L = labelEls[k];
  if (L.text === text) return;
  L.text = text;
  L.el.dataset.on = '0';
  clearTimeout(L.pending);
  L.pending = setTimeout(() => {
    L.el.textContent = text;
    L.el.dataset.on = text ? '1' : '0';
  }, 450);
}

ORDER.forEach((id) => {
  const b = document.createElement('button');
  b.style.background = WORLDVIEWS[id].swatch;
  b.title = WORLDVIEWS[id].name;
  b.setAttribute('aria-label', WORLDVIEWS[id].name);
  b.dataset.id = id;
  b.onclick = () => go(id, cur.act);
  $('#swatches').appendChild(b);
});

ACTS.forEach((name, i) => {
  const b = document.createElement('button');
  b.textContent = name;
  b.setAttribute('role', 'tab');
  b.onclick = () => go(cur.id, i);
  $('#acts').appendChild(b);
});

let swapTimer = null;
function renderUI(instant) {
  const wv = WORLDVIEWS[cur.id];
  document.title = `${wv.name} · Worldviews in Motion`;
  [...$('#acts').children].forEach((b, i) => b.setAttribute('aria-selected', i === cur.act));
  [...$('#swatches').children].forEach((b) => b.setAttribute('aria-current', b.dataset.id === cur.id));
  labelKeys.forEach((k) => setLabel(k, labelText(k)));

  const fill = () => {
    $('#name').textContent = wv.name;
    $('#tagline').textContent = wv.tagline;
    $('#actTitle').textContent = wv.acts[cur.act].title;
    $('#caption').textContent = wv.acts[cur.act].text;
    $('#margin').innerHTML = '';
    const b = document.createElement('b');
    b.textContent = `In the margin · ${wv.margin[0]}`;
    $('#margin').append(b, wv.margin[1]);

    const moves = $('#moves');
    moves.innerHTML = '';
    wv.moves.forEach((m) => {
      const btn = document.createElement('button');
      btn.textContent = m.q;
      if (m.to === HOME) btn.className = 'home';
      btn.onclick = () => go(m.to, cur.act);
      moves.appendChild(btn);
    });
    if (cur.id !== HOME && !wv.moves.some((m) => m.to === HOME)) {
      const btn = document.createElement('button');
      btn.textContent = 'Return home';
      btn.className = 'home';
      btn.onclick = () => go(HOME, cur.act);
      moves.appendChild(btn);
    }
    ui.classList.remove('swap');
    measure();
  };

  clearTimeout(swapTimer);
  if (instant) return fill();
  ui.classList.add('swap');
  swapTimer = setTimeout(fill, 350);
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') go(cur.id, cur.act + 1);
  else if (e.key === 'ArrowLeft') go(cur.id, cur.act - 1);
  else if (e.key === 'Home' || e.key === 'Escape') go(HOME, cur.act);
});

// ---------- layout ----------

const view = { cx: 0, cy: 0, scale: 1 };
function measure() {
  const r = stage.getBoundingClientRect();
  view.scale = Math.max(60, Math.min(r.width / 1.62, r.height / 1.98));
  view.cx = r.left + r.width / 2;
  view.cy = r.top + r.height / 2 - 0.03 * view.scale;
  if (painter) painter.resize();
}
window.addEventListener('resize', measure);
new ResizeObserver(measure).observe(stage);

function place(k, x, y, alpha) {
  const { el } = labelEls[k];
  const px = view.cx + x * view.scale;
  const py = view.cy - y * view.scale;
  const shift = { center: '-50%', left: '0%', right: '-100%' }[labelAlign[k]];
  el.style.transform = `translate(${px}px, ${py}px) translate(${shift}, -50%)`;
  el.style.opacity = el.dataset.on === '1' && alpha > 0.15 ? 1 : 0;
}

function placeLabels(s) {
  const { U, W, S, B, P, R, T } = s;
  const stained = P.a > 0.3 ? P.r * 0.95 : 0;
  place('U', U.x, U.y + U.r * 0.45, U.a);
  place('W', W.x, W.y - W.r * 0.58, W.a);
  place('S', S.x + Math.max(S.r, stained) + 0.035, S.y + 0.01, S.a);
  place('B', (B.ax + B.bx) / 2 + B.w + 0.035, (B.ay + B.by) / 2, B.a);
  place('P', P.x - P.r - 0.05, P.y - 0.02, P.a);
  place('R', R.x - R.r * 0.75 - 0.05, R.y + 0.06, R.a);
  place('T', T.th > 1 ? 0 : T.x, T.y - 0.055, T.a);
}

// ---------- loop ----------

function frame(now) {
  const t = Math.min(1, (now - t0) / dur);
  live = lerp(from, to, ease(t));
  if (painter) painter.draw(live, view, reduced ? 0 : now / 1000, Math.sin(Math.PI * t));
  placeLabels(live);
  requestAnimationFrame(frame);
}

const [hid, hact] = location.hash.slice(1).split('/');
cur.id = '';
go(hid || HOME, (parseInt(hact, 10) || 1) - 1, true);
live = to;
from = to;
measure();
requestAnimationFrame(frame);
