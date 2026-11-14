// Study: deism, one move away from Christian theism. God has not spoken.
// The address ends in #creation, #fall, #redemption or #new-creation.
// ?act=1..4 and ?t=seconds open on an act with the clock frozen (for stills).

const ACTS = [
  {
    name: 'The Clockmaker',
    text: 'God made the world, set it running by fixed laws and stepped back. He does not speak or act within it.',
    p: { join: 0, bbot: -0.03, ba: 0, crim: 0, cross: 0, stainR: 0.02, stainA: 0, glow: 0, dull: 0.15, snap: 0, rip: 0, ripAt: 1 },
    labels: {
      god: ['The Creator', 'Distant and silent'],
      world: ['The world', 'A machine run by fixed laws'],
      bridge: ['No word from above', 'God has not spoken'],
      self: ['Man', 'Able to reason'],
    },
  },
  {
    name: 'Ignorance',
    text: 'Nothing is broken at the root. Men are held back by ignorance and superstition.',
    p: { join: 0, bbot: -0.03, ba: 0, crim: 0, cross: 0, stainR: 0.15, stainA: 0.5, glow: 0, dull: 0.6, snap: 0, rip: 0, ripAt: 1 },
    labels: {
      god: ['The Creator', 'Distant and silent'],
      world: ['The world', 'Still running as designed'],
      bridge: ['No word from above', 'God has not spoken'],
      self: ['Man', 'His reason clouded'],
      sin: ['Ignorance', 'And superstition'],
    },
  },
  {
    name: 'Reason',
    text: 'Reason and good conduct are enough. Man studies nature and works out his duty for himself.',
    p: { join: 0, bbot: -0.03, ba: 0, crim: 0, cross: 1, stainR: 0.08, stainA: 0.15, glow: 0.9, dull: 0.15, snap: 0, rip: 0, ripAt: 1 },
    labels: {
      god: ['The Creator', 'Known only by inference'],
      world: ['The world', 'Its laws are man’s teacher'],
      bridge: ['Reason', 'Man reasons his way up'],
      self: ['Man', 'Guided by his own light'],
    },
  },
  {
    name: 'An Uncertain End',
    text: 'The good may be rewarded after death. God has made no promise, so no one can be sure.',
    p: { join: 1, bbot: -0.03, ba: 0, crim: 0, cross: 0.3, stainR: 0.02, stainA: 0, glow: 0.4, dull: 0.3, snap: 0, rip: 0, ripAt: 1 },
    labels: {
      god: ['The Creator', 'Further off, still silent'],
      world: ['The world', 'Ticking on'],
      bridge: ['No promise', 'Nothing has been said'],
      self: ['Man', 'Hoping for a reward'],
    },
  },
];

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uT, uUnit, uExt, uRip, uRipY;
uniform vec2 uCen;
uniform float uTl;
uniform float uJoin, uBbot, uBa, uCrim, uCross, uStainR, uStainA, uGlow, uDull, uAct;
uniform vec4 uLab[3];

float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3. - 2. * f);
  return mix(mix(hash(i), hash(i + vec2(1., 0.)), f.x), mix(hash(i + vec2(0., 1.)), hash(i + vec2(1., 1.)), f.x), f.y);
}
const mat2 M = mat2(1.6, 1.2, -1.2, 1.6);
float fbm(vec2 p){
  float a = .5, s = 0.;
  for (int i = 0; i < 5; i++){ s += a * noise(p); p = M * p + vec2(17.1, 9.2); a *= .5; }
  return s;
}
float paperH(vec2 f){ return .5 * noise(f * .42) + .3 * noise(f * .95 + 7.3) + .2 * noise(f * .13 + 3.1); }
float sdSeg(vec2 p, vec2 a, vec2 b){
  vec2 pa = p - a, ba = b - a;
  return length(pa - ba * clamp(dot(pa, ba) / max(dot(ba, ba), 1e-5), 0., 1.));
}
vec2 rot(vec2 v, float a){ float c = cos(a), s = sin(a); return vec2(c * v.x - s * v.y, s * v.x + c * v.y); }
vec3 K(vec3 c){ return -log(c); }

vec2 q, wL, wM, wF;
float H, PW;

// A wash built from five misregistered glazes, each with its own tide line.
float layers(float d, float seed, float spread, float ew, float tide){
  float s = 0.;
  for (int i = 0; i < 5; i++){
    float fi = float(i);
    float a = seed + fi * 2.399;
    vec2 dir = vec2(cos(a), sin(a));
    float n = dot(wM, dir) * 2.2 + dot(wF, dir.yx) * .7;
    float di = d + n * spread + fi * spread * .12;
    s += smoothstep(ew, -ew, di) + exp(-pow((di + ew * 2.) / (ew * 2. + .003), 2.)) * tide;
  }
  return s * .2;
}
float bloom(vec2 p, float seed){
  float b = fbm(p * 1.7 + wL * 1.3 + seed) + wF.x * .05 + wM.y * .06;
  return 1. - .32 * smoothstep(.55, .59, b) + .5 * exp(-pow((b - .548) / .016, 2.));
}
float pen(float d){ return smoothstep(PW, PW * .3, abs(d)); }

void main(){
  vec2 frag = gl_FragCoord.xy;
  q = (frag - uCen) / uUnit;
  float t = uT;

  wL = vec2(fbm(q * 1.2 + t * .012), fbm(q * 1.2 + vec2(31.7, 11.3) - t * .012)) - .5;
  wM = vec2(fbm(q * 4.5 + 5.), fbm(q * 4.5 + vec2(7., 23.))) - .5;
  wF = vec2(fbm(q * 22. + 1.), fbm(q * 22. + vec2(13., 4.))) - .5;
  H = paperH(frag);
  float Hx = paperH(frag + vec2(1.2, 1.2));
  PW = .0028 * (.5 + noise(q * 9.));

  float v1 = fbm(q * 1.1 + wL * 1.6 + 2.), v2 = fbm(q * 2.3 - wL * 2.2 + 7.);
  float blooms = mix(1., bloom(q, 1.) * bloom(q * 2.1, 5.), .22);
  float streaks = .8 + .4 * noise(vec2(q.x * 2.5 + wL.x * 3., q.y * 34. + wL.y * 8.));
  float wob = wM.x * .025 + wF.y * .006;
  vec2 hand = wL * .06;
  const float tide = .8;

  // ---------- where things stand in this act ----------
  vec2 G = vec2(0., mix(.56, .66, uJoin));  float rG = mix(.2, .16, uJoin);
  vec2 Wc = vec2(0., -.37); float rW = .32;
  vec2 Sc = vec2(0., -.34);   float rS = .066;
  float bTop = G.y - rG + .03;
  vec2 qb = q + hand * .5;
  float dG = length(q + hand - G) - rG;
  float dW = length(q + hand.yx - Wc) - rW;
  float dS = length(q + hand * .4 - Sc) - rS;
  float dB = sdSeg(qb, vec2(0., bTop), vec2(0., uBbot)) - .04;
  float dX = sdSeg(qb, vec2(-.125, .03), vec2(.125, .03)) - .034;
  float rg = length(q - G), rw = length(q - Wc);
  float ang = atan(q.y - G.y, q.x - G.x);

  vec3 gold = vec3(.98, .78, .3), crimson = vec3(.68, .1, .14), umber = vec3(.42, .28, .22);
  vec3 glory = vec3(.98, .96, .86), apricot = vec3(.94, .9, .78), mauve = vec3(.8, .81, .86);
  vec3 aqua = vec3(.82, .88, .9), blue = vec3(.6, .7, .8);

  // ---------- the two realms ----------
  float up = smoothstep(-.28, .18, q.y + (v1 - .5) * .7 + wM.x * .15);
  float nearG = exp(-pow(max(rg - rG, 0.) / .5, 2.));
  vec3 A = up * (K(glory) * nearG * .8 + K(apricot) * (1. - nearG) * (.35 + 1.1 * v2) + K(mauve) * smoothstep(.45, 1.5, rg) * (.3 + 1.5 * v1))
         + (1. - up) * (K(aqua) * (.45 + .9 * v2) + K(blue) * smoothstep(.3, 1.3, rw) * (.4 + 1.5 * v1));
  A *= blooms * streaks * .42 * mix(.8, 1., smoothstep(.3, .5, fbm(q * 1.4 + wL + 20.) + .12));
  A += K(vec3(.62, .6, .66)) * uDull * .12 * (.5 + v2);

  // glory going out from God in slow waves
  float outside = smoothstep(rG, rG + .05, rg);
  float wave = max(0., sin((rg - rG) * 16. - t * .9 + wM.x * 2.));
  A *= 1. - 0. * wave * outside;   // no light goes out

  A *= 1. - .93 * max(layers(dG, 11., .04, .0045, 0.), layers(dW, 17., .04, .0045, 0.));
  float ink = 0.;

  // ---------- creation ----------
  {
    float dens = layers(dW, 2., .03, .0045, tide);
    vec2 p = q - Wc;
    float m1 = smoothstep(.35, .65, fbm(p * 1.9 + wL * 1.2 + 4. + t * .02));
    float m2 = smoothstep(.45, .7, fbm(p * 2.6 - wL + 13. - t * .015));
    vec3 sea = mix(vec3(.36, .56, .72), vec3(.5, .56, .62), uDull * .7);
    vec3 green = mix(vec3(.46, .62, .66), vec3(.52, .56, .58), uDull * .7);
    A += K(sea) * dens * (1. - m1 * .7) * bloom(q * 2.6, 47.) * (.75 + .7 * v2);
    A += K(green) * dens * m1 * (.6 + .5 * v1);
    A += K(vec3(.86, .74, .5)) * dens * m2 * .25 * (1. - .6 * uDull);
    A += K(vec3(.14, .28, .5)) * dens * smoothstep(-.3, 1., dot(p, vec2(.45, -.9)) / rW) * (.4 + .5 * v1);
    ink += pen(dW + .01 - wob);
    // the world as a clock: a ruled ring, sixty divisions, and a marker that ticks once a second
    float aw = atan(p.y, p.x);
    float d60 = abs(fract(aw * 60. / 6.2832 + .5) - .5) * 6.2832 / 60. * rw;
    float d12 = abs(fract(aw * 12. / 6.2832 + .5) - .5) * 6.2832 / 12. * rw;
    ink += smoothstep(.0022, .0008, abs(rw - rW - .032));
    ink += smoothstep(.0022, .0008, d60) * smoothstep(.034, .036, rw - rW) * smoothstep(.054, .052, rw - rW);
    ink += smoothstep(.0036, .0016, d12) * smoothstep(.034, .036, rw - rW) * smoothstep(.076, .074, rw - rW);
    float ah = 1.5708 - floor(t) * 6.2832 / 60.;
    ink += smoothstep(.013, .011, length(p - (rW + .1) * vec2(cos(ah), sin(ah))));
  }

  // ---------- ripples through creation: light when God acts, shadow when sin spreads ----------
  {
    float rr = length(q + wL * .03 - vec2(0., uRipY));
    float rip = pow(max(0., sin(rr * 15. - t * 1.2)), 6.) * exp(-rr * 3.) * smoothstep(0., .06, rr) * smoothstep(0., -.03, dW);
    A *= 1. - .4 * max(uRip, 0.) * rip;
    A += K(vec3(.13, .11, .22)) * max(-uRip, 0.) * rip * .35;
  }

  // ---------- the Ultimate ----------
  {
    float dens = layers(dG, 1., .03, .0045, tide);
    float core = mix(.42, 1.05, smoothstep(0., rG, rg + wM.x * .1));
    A += K(vec3(.97, .86, .56)) * dens * core * bloom(q * 2.4, 31.) * (.85 + .6 * v2) * .62 * (1. - .45 * uJoin);
    A += K(vec3(.9, .74, .56)) * dens * smoothstep(rG * .5, rG, rg + wM.y * .15) * (.2 + .55 * v1) * .5 * (1. - .45 * uJoin);
    ink += pen(dG + .012 + wob) + pen(dG - .02 - wob * 1.4) * step(.45, noise(q * 6. + 2.));
    // halo rings, each turning at its own pace
    ink += smoothstep(.0022, .0008, abs(rg - rG - .07)) * .7;
    
    ink += smoothstep(.005, .0025, abs(rg - rG - .13)) * step(.72, fract(ang * 60. / 6.2832 + floor(t) * .5)) * .55;
  }

  // ---------- light lifted around the self ----------
  A *= 1. - .75 * uGlow * exp(-pow(length(q - Sc) / .19, 2.));

  // ---------- the bridge, with arrows running down inside it ----------
  {
    float streak = .75 + .5 * noise(vec2(q.x * 120., q.y * 6.));
    float db = layers(dB, 3., .012, .004, tide) * streak * uBa;
    float dx = layers(dX, 4., .012, .004, tide) * (.75 + .5 * noise(vec2(q.x * 6., q.y * 120.))) * uCross;
    float ph = fract((qb.y - abs(qb.x) * 1.15) / .125 + t * .32 + wF.x * .12);
    float chev = smoothstep(0., .1, ph) * smoothstep(.5, .36, ph);
    chev *= smoothstep(uBbot - .02, uBbot + .05, qb.y) * smoothstep(bTop + .01, bTop - .05, qb.y);
    vec3 bc = mix(vec3(.8, .5, .16), crimson, uCrim);
    vec3 cc = mix(vec3(.99, .93, .7), vec3(.99, .82, .45), uCrim);
    A *= 1. - .8 * chev * smoothstep(.006, -.006, dB) * uBa;   // arrows stay pale over any colour beneath
    A += K(bc) * db * 1.15 * (1. - .92 * chev);
    A += K(cc) * db * chev * .55;
    A += K(crimson) * dx * (1. - .5 * db) * 1.15;
    float dBX = mix(dB, min(dB, dX), step(.5, uCross));
    ink += pen(dBX - .01 + wob * .4) * smoothstep(.1, .5, uBa);
  }

  // ---------- sin: a stain that keeps creeping ----------
  {
    float creep = fbm(q * 5. + vec2(t * .05, -t * .04)) - .5;
    float d = length(q + wL * .12 + wM * .05 - Sc - vec2(-.02, -.02)) - uStainR * (1. + .07 * sin(t * .8)) - wM.x * .06 - creep * .07;
    A += K(vec3(.46, .46, .54)) * layers(d, 6., .05, .03, .3) * uStainA;
  }

  // ---------- the self, ringed with gold ----------
  {
    float dens = layers(dS, 5., .01, .0035, tide);
    A += K(mix(vec3(.9, .5, .3), vec3(.6, .42, .38), uDull * .8)) * dens * 1.1 + K(gold) * dens * .4 * (1. - uDull);
    float ring = exp(-pow((dS - .024) / .009, 2.)) * (1. - .5 * uDull);
    A += K(vec3(.6, .62, .68)) * ring * .5;
    ink += pen(dS - .012 + wob * .4) + pen(dS - .037 - wob * .3) * step(.4, noise(q * 14. + 3.)) * .7;
  }

  // ---------- history: one stroke, four marks, and where we are ----------
  if (uTl > .5) {
    float y = -.87;
    vec2 p = q + wL * .02;
    float along = clamp((q.x + uExt) / (2. * uExt), 0., 1.);
    float d = sdSeg(p, vec2(-uExt, y), vec2(uExt - .05, y)) - mix(.006, .016, along) * (.8 + .4 * noise(vec2(q.x * 3., 1.)));
    float dry = smoothstep(.25, .45, H + .3 * noise(vec2(q.x * 5., q.y * 90.)));
    vec2 ph = p - vec2(uExt + .03, y);
    float dH = max(abs(ph.y) + ph.x * .58, -ph.x - .105);
    A += K(umber) * (smoothstep(.004, -.004, d) * dry * .85 + layers(dH, 9., .008, .004, tide) * .95);
    ink += pen(dH - .009 + wob * .3);
    for (int i = 0; i < 4; i++){
      float dm = length(p - vec2(uExt * (-.72 + .48 * float(i)), y)) - .017;
      A += K(umber) * layers(dm, 20. + float(i), .006, .004, tide) * .9;
      ink += pen(dm - .009);
    }
    float dbd = length(p - vec2(uExt * (-.72 + .48 * uAct), y)) - .03 * (1. + .07 * sin(t * 2.4));
    A += K(crimson) * layers(dbd, 12., .006, .004, tide) * 1.1;
    A += K(vec3(.98, .74, .2)) * exp(-pow((dbd - .016) / .007, 2.)) * .9;
  }

  A += K(vec3(.2, .13, .1)) * min(ink, 1.) * (.5 + H);

  // lettering inside a shape: paper lifted a little with a damp brush
  float lift = 0.;
  for (int i = 0; i < 3; i++){
    vec4 L = uLab[i];
    if (L.z <= 0.) continue;
    vec2 b = abs(q + wM * .02 - L.xy) - L.zw + .03;
    lift = max(lift, smoothstep(.05, -.02, length(max(b, 0.)) + min(max(b.x, b.y), 0.) - .03 + wF.x * .01));
  }
  A *= 1. - .72 * lift;

  // ---------- paper, grain and the taped margin ----------
  A *= 1. + .63 * (.5 - H);
  vec2 b = abs(frag - .5 * uRes) - (.5 * uRes - uUnit * .07);
  float dF = max(b.x, b.y) / uUnit + wF.x * .006 + wM.y * .004;
  float m = smoothstep(.003, -.003, dF);
  A = A * m + K(apricot) * exp(-pow((dF + .006) / .006, 2.)) * .3 * m;

  vec3 col = vec3(.982, .972, .945) * exp(-A);
  col *= 1. + (H - Hx) * .2;
  col *= .985 + .03 * noise(frag * .02);
  gl_FragColor = vec4(col, 1.);
}`;

// ---------- WebGL ----------
const canvas = document.getElementById('c');
const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
if (!gl) {
  document.getElementById('nogl').hidden = false;
  throw new Error('WebGL unavailable');
}
const sh = (type, src) => {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
  return s;
};
const prog = gl.createProgram();
gl.attachShader(prog, sh(gl.VERTEX_SHADER, 'attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }'));
gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
gl.bindAttribLocation(prog, 0, 'p');
gl.linkProgram(prog);
gl.useProgram(prog);
gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
gl.enableVertexAttribArray(0);
gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
const locs = {};
const U = (n) => locs[n] || (locs[n] = gl.getUniformLocation(prog, n));

// ---------- acts ----------
const params = new URLSearchParams(location.search);
const frozen = params.has('t') ? Number(params.get('t')) : null;
const SLUGS = ['clockmaker', 'ignorance', 'reason', 'end'];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const clock = (now) => (frozen !== null ? frozen : reduced ? 0 : now / 1000);
const fromHash = SLUGS.indexOf(location.hash.slice(1));
let act = fromHash >= 0 ? fromHash : Math.min(3, Math.max(0, (Number(params.get('act')) || 1) - 1));
let live = { ...ACTS[act].p, act };
let from = live;
let t0 = -1e9;
const DUR = 2600;
const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

// ---------- lettering ----------
const KEYS = ['god', 'world', 'bridge', 'self', 'sin'];
const ALIGN = { god: 'center', world: 'center', bridge: 'left', self: 'left', sin: 'right' };
const labels = {};
const svg = document.getElementById('lines');
const NS = 'http://www.w3.org/2000/svg';
for (const k of KEYS) {
  const el = document.createElement('div');
  el.className = `l ${ALIGN[k]}`;
  document.getElementById('labels').appendChild(el);
  const g = document.createElementNS(NS, 'g');
  const path = document.createElementNS(NS, 'path');
  const dot = document.createElementNS(NS, 'circle');
  dot.setAttribute('r', 2.6);
  g.append(path, dot);
  if (ALIGN[k] !== 'center') svg.appendChild(g);
  labels[k] = { el, g, path, dot, on: false, timer: null };
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

const marks = ACTS.map((a, i) => {
  const b = document.createElement('button');
  b.textContent = a.name;
  b.onclick = () => { auto = false; go(i); };
  document.getElementById('marks').appendChild(b);
  return b;
});

let swapTimer = null;
function renderText(instant) {
  const a = ACTS[act];
  marks.forEach((b, i) => b.setAttribute('aria-current', i === act));
  KEYS.forEach((k) => setLabel(k, a.labels[k], instant));
  const fill = () => {
    document.getElementById('actName').textContent = a.name;
    document.getElementById('actText').textContent = a.text;
    document.body.classList.remove('swap');
  };
  clearTimeout(swapTimer);
  if (instant) return fill();
  document.body.classList.add('swap');
  swapTimer = setTimeout(fill, 450);
}
function go(i) {
  i = (i + ACTS.length) % ACTS.length;
  if (i === act) return;
  from = { ...live };
  act = i;
  t0 = performance.now();
  history.replaceState(null, '', `#${SLUGS[i]}`);
  renderText(false);
}
let auto = frozen === null && !params.has('act') && fromHash < 0 && !reduced;
addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') { auto = false; go(Math.min(3, act + 1)); }
  if (e.key === 'ArrowLeft') { auto = false; go(Math.max(0, act - 1)); }
});
setInterval(() => { if (auto && !document.hidden) go(act + 1); }, 14000);

// ---------- layout ----------
let dpr = 1, unit = 1, ext = 1, cx = 0, cy = 0, quality = 1;
const rects = new Float32Array(12);
const head = document.querySelector('.head');
const actBox = document.querySelector('.act');
function resize() {
  const W = innerWidth, Hh = innerHeight;
  const narrow = W / Hh < 1.3;
  document.body.classList.toggle('narrow', narrow);
  if (narrow) {
    // title above, painting in the middle, the act's words below
    const topH = head.getBoundingClientRect().bottom + 4;
    const botH = Hh - actBox.getBoundingClientRect().top + 4;
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
  dpr = Math.min(window.devicePixelRatio || 1, 2) * quality;
  canvas.width = Math.round(W * dpr);
  canvas.height = Math.round(Hh * dpr);
  gl.viewport(0, 0, canvas.width, canvas.height);
  marks.forEach((b, i) => {
    b.style.left = `${cx + ext * (-0.72 + 0.48 * i) * unit}px`;
    b.style.top = `${cy + 0.795 * unit}px`;
  });
  const room = (x) => `${Math.max(60, (W / 2 / unit - x - 0.1) * unit)}px`;
  labels.bridge.el.style.maxWidth = room(0.22);
  labels.self.el.style.maxWidth = room(0.58);
  labels.sin.el.style.maxWidth = room(0.58);
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
  const x0 = X(x + gap), y0 = Y(y), x1 = X(tx), y1 = Y(ty);
  L.path.setAttribute('d', `M${x0},${y0} L${x1},${y1}`);
  L.dot.setAttribute('cx', x1);
  L.dot.setAttribute('cy', y1);
}

// Where things stand for a given set of act values (scene units, y up).
function sceneY(p) {
  const Gy = 0.56 + 0.1 * p.join, rG = 0.2 - 0.04 * p.join;
  const Wy = -0.37, rW = 0.32, Sy = -0.34;
  const bTop = Gy - rG - 0.1;                 // the gap begins below God's outer ring
  return { Gy, rG, Wy, rW, Sy, bTop, brk: 0, ripY: Sy };
}

function layout(p) {
  const { Gy, rG, Wy, rW, Sy, bTop, brk } = sceneY(p);
  const godY = Gy + rG * 0.12, worldY = Wy - rW * 0.6;
  place('god', 0, godY);
  place('world', 0, worldY);
  const by = (bTop + p.bbot) / 2;
  place('bridge', 0.2, by + 0.02, 0.035, by);
  place('self', rW + 0.2, Sy + 0.03, 0.105, Sy);
  place('sin', -(rW + 0.2), Sy - 0.08, -0.02 - p.stainR * 0.8, Sy - 0.06);
  const bl = labels.bridge;
  rects.set([0, godY, labels.god.w / 2 + 0.02, labels.god.h / 2 + 0.012, 0, worldY, labels.world.w / 2 + 0.02, labels.world.h / 2 + 0.012,
    0.2 + bl.w / 2, by + 0.02, bl.on ? bl.w / 2 + 0.02 : 0, bl.h / 2 + 0.012]);
}

// ---------- connectors ----------
// Things that join, point and mark are drawn as plain strokes over the paint:
// warm ink, one accent colour, and a paper-coloured edge so they read on any wash.
const connSvg = document.getElementById('conn');
const DARK = '#33271f', RED = '#a3262b', OCHRE = '#b07a1e', PAP = '#f8f2e4';
const f = (n) => n.toFixed(4);
const hex = (c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
const blend = (a, b, k) => `rgb(${hex(a).map((v, i) => Math.round(v + (hex(b)[i] - v) * k)).join(',')})`;
const stroke = (d, col, wd) => `<path d="${d}" fill="none" stroke="${PAP}" stroke-width="${wd + 0.012}" stroke-linecap="round" stroke-linejoin="round" opacity=".92"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${wd}" stroke-linecap="round" stroke-linejoin="round"/>`;
const shape = (d, col) => `<path d="${d}" fill="${col}" stroke="${PAP}" stroke-width=".012" stroke-linejoin="round" opacity=".92"/><path d="${d}" fill="${col}"/>`;

function drawConn(p, t) {
  const sc = sceneY(p);
  const top = -sc.bTop, bot = -p.bbot;            // svg y grows downward
  const STEEL = '#3f627f', GREY = '#6f6a66';
  let g = '';

  // where a word from God would have come: an empty, dashed outline
  g += `<g opacity="${f(0.75 - 0.3 * p.cross)}" fill="none" stroke="${GREY}" stroke-width=".0042" stroke-linecap="round" stroke-dasharray=".016 .018">
    <path d="M-.022,${f(top)} V${f(bot)} M.022,${f(top)} V${f(bot)}"/></g>`;

  // reason: a thin line climbing from man, with marks moving upward
  if (p.cross > 0.01) {
    const y0 = -(sc.Sy + 0.085), y1 = top + 0.035;
    g += `<g opacity="${f(p.cross)}">${stroke(`M0,${f(y0)} V${f(y1)}`, STEEL, 0.0075)}
      <path d="M0,${f(y0)} V${f(y1 + 0.02)}" fill="none" stroke="${PAP}" stroke-width=".0038" stroke-linecap="round" stroke-dasharray=".016 .07" stroke-dashoffset="${f(t * 0.045)}"/>
      <path d="M0,${f(y1 - 0.04)} L-.021,${f(y1 + 0.004)} L.021,${f(y1 + 0.004)}Z" fill="${STEEL}" stroke="${PAP}" stroke-width=".004" stroke-linejoin="round"/></g>`;
  }

  // the line of history, ticking evenly
  const ty = 0.87, bx = ext * (-0.72 + 0.48 * p.act);
  g += stroke(`M${f(-ext)},${ty} H${f(ext + 0.04)}`, DARK, 0.0055);
  let ticks = '';
  for (let x = -ext; x <= ext; x += (2 * ext) / 48) ticks += `M${f(x)},${ty + 0.012} v.014 `;
  g += `<path d="${ticks}" stroke="${DARK}" stroke-width=".002" opacity=".7"/>`;
  g += `<path d="M${f(ext + 0.085)},${ty} L${f(ext + 0.03)},${ty - 0.026} L${f(ext + 0.03)},${ty + 0.026}Z" fill="${DARK}" stroke="${PAP}" stroke-width=".004" stroke-linejoin="round"/>`;
  for (let i = 0; i < 4; i++) g += `<circle cx="${f(ext * (-0.72 + 0.48 * i))}" cy="${ty}" r=".013" fill="${PAP}" stroke="${DARK}" stroke-width=".0055"/>`;
  g += `<circle cx="${f(bx)}" cy="${ty}" r="${f(0.03 + (Math.floor(t) % 2) * 0.004)}" fill="none" stroke="${STEEL}" stroke-width=".003"/><circle cx="${f(bx)}" cy="${ty}" r=".018" fill="${STEEL}" stroke="${PAP}" stroke-width=".004"/>`;

  connSvg.innerHTML = `<g transform="translate(${f(cx)},${f(cy)}) scale(${f(unit)})">${g}</g>`;
}

// ---------- loop ----------
let lastT = 0, acc = 0, nF = 0;
function frame(now) {
  // if frames come slowly, paint at a lower resolution rather than stutter
  if (frozen === null && lastT) {
    acc += now - lastT;
    if (++nF === 40) {
      if (acc / nF > 36 && quality > 0.5) { quality -= 0.25; resize(); }
      acc = 0; nF = 0;
    }
  }
  lastT = now;
  const x = Math.min(1, (now - t0) / DUR);
  const target = { ...ACTS[act].p, act };
  const e = ease(x);
  for (const k in target) live[k] = from[k] + (target[k] - from[k]) * e;
  layout(live);

  gl.uniform2f(U('uRes'), canvas.width, canvas.height);
  gl.uniform1f(U('uUnit'), unit * dpr);
  gl.uniform2f(U('uCen'), cx * dpr, canvas.height - cy * dpr);
  gl.uniform1f(U('uRip'), live.rip);
  gl.uniform1f(U('uRipY'), sceneY(live).ripY);
  gl.uniform1f(U('uExt'), ext);
  gl.uniform1f(U('uT'), clock(now));
  gl.uniform1f(U('uJoin'), live.join);
  gl.uniform1f(U('uBbot'), live.bbot);
  gl.uniform1f(U('uBa'), 0);
  gl.uniform1f(U('uTl'), 0);
  gl.uniform1f(U('uCrim'), live.crim);
  gl.uniform1f(U('uCross'), 0);
  gl.uniform1f(U('uStainR'), live.stainR);
  gl.uniform1f(U('uStainA'), live.stainA);
  gl.uniform1f(U('uGlow'), live.glow);
  gl.uniform1f(U('uDull'), live.dull);
  gl.uniform1f(U('uAct'), live.act);
  gl.uniform4fv(U('uLab[0]'), rects);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  drawConn(live, clock(now));
  requestAnimationFrame(frame);
}

addEventListener('resize', resize);
renderText(true);
resize();
document.fonts.ready.then(resize);
requestAnimationFrame(frame);
