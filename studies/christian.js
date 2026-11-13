// Christian theism as a living painting: four acts, always in motion.
// ?act=1..4 opens on an act; ?t=seconds freezes the clock (for stills).

const ACTS = [
  {
    name: 'Creation',
    text: 'God made the world and called it good. He made man in his image and spoke with him.',
    p: { join: 0, bbot: -0.12, ba: 0.95, crim: 0, cross: 0, stainR: 0.02, stainA: 0, glow: 0, dull: 0 },
    labels: {
      god: ['The triune God', 'Father, Son and Holy Spirit'],
      world: ['Creation', 'Made by God, and good'],
      bridge: ['God speaks', 'His word and his covenant'],
      self: ['Man', 'Made in the image of God'],
    },
  },
  {
    name: 'Fall',
    text: 'Man rebelled against God. Sin took hold of the heart and spoiled the whole world.',
    p: { join: 0, bbot: 0.14, ba: 0.5, crim: 0, cross: 0, stainR: 0.16, stainA: 0.62, glow: 0, dull: 1 },
    labels: {
      god: ['The triune God', 'Father, Son and Holy Spirit'],
      world: ['Creation', 'Still good, now spoiled'],
      bridge: ['Fellowship broken', 'Man hides from God'],
      self: ['Man', 'Still God’s image, now a sinner'],
      sin: ['Sin', 'Rebellion in the heart'],
    },
  },
  {
    name: 'Redemption',
    text: 'God came down. The Son became man, died on the cross for sin and rose again.',
    p: { join: 0, bbot: -0.33, ba: 1, crim: 1, cross: 1, stainR: 0.1, stainA: 0.55, glow: 1, dull: 0.3 },
    labels: {
      god: ['The triune God', 'Father, Son and Holy Spirit'],
      world: ['Creation', 'Loved, and being restored'],
      bridge: ['Christ the Mediator', 'God comes down to man'],
      self: ['Man', 'Forgiven through Christ'],
      sin: ['Sin', 'Paid for at the cross'],
    },
  },
  {
    name: 'New Creation',
    text: 'God will live with his people in a world made new. He remains God, and they remain his creatures.',
    p: { join: 1, bbot: -0.12, ba: 0, crim: 1, cross: 0, stainR: 0.02, stainA: 0, glow: 0.8, dull: 0 },
    labels: {
      god: ['The triune God', 'Father, Son and Holy Spirit'],
      world: ['The new creation', 'The world made new'],
      self: ['God’s people', 'At home with him'],
    },
  },
];

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uT, uUnit, uExt;
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
  q = (frag - .5 * uRes) / uUnit;
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
  vec2 G = vec2(0., mix(.47, .2, uJoin));   float rG = mix(.29, .36, uJoin);
  vec2 Wc = vec2(0., mix(-.43, -.2, uJoin)); float rW = mix(.36, .38, uJoin);
  vec2 Sc = vec2(0., mix(-.4, 0., uJoin));   float rS = .066;
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
  vec3 glory = vec3(1., .94, .66), apricot = vec3(.97, .76, .56), mauve = vec3(.8, .7, .82);
  vec3 aqua = vec3(.72, .88, .85), blue = vec3(.5, .68, .8);

  // ---------- the two realms ----------
  float up = smoothstep(-.28, .18, q.y + (v1 - .5) * .7 + wM.x * .15);
  float nearG = exp(-pow(max(rg - rG, 0.) / .5, 2.));
  vec3 A = up * (K(glory) * nearG * .8 + K(apricot) * (1. - nearG) * (.35 + 1.1 * v2) + K(mauve) * smoothstep(.45, 1.5, rg) * (.3 + 1.5 * v1))
         + (1. - up) * (K(aqua) * (.45 + .9 * v2) + K(blue) * smoothstep(.3, 1.3, rw) * (.4 + 1.5 * v1));
  A *= blooms * streaks * .5 * mix(.8, 1., smoothstep(.3, .5, fbm(q * 1.4 + wL + 20.) + .12));
  A += K(vec3(.62, .6, .66)) * uDull * .12 * (.5 + v2);

  // glory going out from God in slow waves
  float outside = smoothstep(rG, rG + .05, rg);
  float wave = max(0., sin((rg - rG) * 16. - t * .9 + wM.x * 2.));
  A *= 1. - .3 * wave * wave * exp(-(rg - rG) * 2.6) * outside;

  A *= 1. - .93 * max(layers(dG, 11., .04, .0045, 0.), layers(dW, 17., .04, .0045, 0.));
  float ink = 0.;

  // ---------- creation ----------
  {
    float dens = layers(dW, 2., .03, .0045, tide);
    vec2 p = q - Wc;
    float m1 = smoothstep(.35, .65, fbm(p * 1.9 + wL * 1.2 + 4. + t * .02));
    float m2 = smoothstep(.45, .7, fbm(p * 2.6 - wL + 13. - t * .015));
    vec3 sea = mix(vec3(.22, .6, .66), vec3(.4, .52, .56), uDull * .7);
    vec3 green = mix(vec3(.3, .62, .42), vec3(.42, .5, .44), uDull * .7);
    A += K(sea) * dens * (1. - m1 * .7) * bloom(q * 2.6, 47.) * (.75 + .7 * v2);
    A += K(green) * dens * m1 * (.6 + .5 * v1);
    A += K(vec3(.86, .66, .3)) * dens * m2 * .55 * (1. - .6 * uDull);
    A += K(vec3(.14, .28, .5)) * dens * smoothstep(-.3, 1., dot(p, vec2(.45, -.9)) / rW) * (.4 + .5 * v1);
    ink += pen(dW + .01 - wob) + pen(dW - .024 + wob * 1.3) * step(.5, noise(q * 5. + 8.));
  }

  // ---------- the Ultimate ----------
  {
    float dens = layers(dG, 1., .03, .0045, tide);
    float core = mix(.42, 1.05, smoothstep(0., rG, rg + wM.x * .1));
    A += K(gold) * dens * core * bloom(q * 2.4, 31.) * (.85 + .6 * v2);
    A += K(vec3(.9, .46, .34)) * dens * smoothstep(rG * .5, rG, rg + wM.y * .15) * (.2 + .55 * v1);
    ink += pen(dG + .012 + wob) + pen(dG - .02 - wob * 1.4) * step(.45, noise(q * 6. + 2.));
    // halo rings, each turning at its own pace
    ink += pen(dG - .075 + wob * .8) * step(.4, noise(rot(q - G, t * .05) * 4. + 5.)) * .8;
    ink += pen(dG - .13 - wob) * step(.55, noise(rot(q - G, -t * .035) * 3. + 9.)) * .6;
    ink += smoothstep(.006, .003, abs(dG - .185)) * step(.72, fract(ang * 60. / 6.2832 + t * .06)) * .7;
  }

  // ---------- light lifted around the self ----------
  A *= 1. - .7 * uGlow * exp(-pow(length(q - Sc) / .17, 2.));

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
    float d = length(q + wL * .12 + wM * .05 - Sc - vec2(-.02, -.02)) - uStainR - wM.x * .06 - creep * .07;
    A += K(vec3(.13, .11, .22)) * layers(d, 6., .03, .012, .5) * uStainA;
  }

  // ---------- the self, ringed with gold ----------
  {
    float dens = layers(dS, 5., .01, .0035, tide);
    A += K(mix(vec3(.9, .5, .3), vec3(.6, .42, .38), uDull * .8)) * dens * 1.1 + K(gold) * dens * .4 * (1. - uDull);
    float ring = exp(-pow((dS - .024) / .009, 2.)) * (1. - .5 * uDull);
    A *= 1. - .85 * ring;
    A += K(vec3(.98, .72, .18)) * ring * (.85 + .25 * sin(t * 1.6));
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
let act = Math.min(3, Math.max(0, (Number(params.get('act')) || 1) - 1));
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
  renderText(false);
}
let auto = frozen === null && !params.has('act');
addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') { auto = false; go(Math.min(3, act + 1)); }
  if (e.key === 'ArrowLeft') { auto = false; go(Math.max(0, act - 1)); }
});
setInterval(() => { if (auto && !document.hidden) go(act + 1); }, 11000);

// ---------- layout ----------
let dpr = 1, unit = 1, ext = 1;
const rects = new Float32Array(12);
function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(innerWidth * dpr);
  canvas.height = Math.round(innerHeight * dpr);
  gl.viewport(0, 0, canvas.width, canvas.height);
  unit = Math.min(innerHeight / 2, innerWidth / 1.5);
  ext = Math.min(1.05, innerWidth / 2 / unit - 0.16);
  marks.forEach((b, i) => {
    b.style.left = `${innerWidth / 2 + ext * (-0.72 + 0.48 * i) * unit}px`;
    b.style.top = `${innerHeight / 2 + 0.795 * unit}px`;
  });
  measure();
}
function measure() {
  for (const k of KEYS) {
    labels[k].w = labels[k].el.offsetWidth / unit;
    labels[k].h = labels[k].el.offsetHeight / unit;
  }
}
const X = (x) => innerWidth / 2 + x * unit;
const Y = (y) => innerHeight / 2 - y * unit;

function place(k, x, y, tx, ty) {
  const L = labels[k];
  const shift = { center: '-50%', left: '0%', right: '-100%' }[ALIGN[k]];
  L.el.style.transform = `translate(${X(x)}px, ${Y(y)}px) translate(${shift}, -50%)`;
  if (tx === undefined) return;
  // a leader line from the lettering to the thing it names
  const gap = 0.02 * (ALIGN[k] === 'right' ? 1 : -1);
  const x0 = X(x + gap), y0 = Y(y), x1 = X(tx), y1 = Y(ty);
  L.path.setAttribute('d', conn >= 4 ? `M${x0},${y0} L${x1},${y1}` : `M${x0},${y0} Q${(x0 + x1) / 2},${y0} ${x1},${y1}`);
  L.dot.setAttribute('cx', x1);
  L.dot.setAttribute('cy', y1);
}

function layout(p) {
  const mix = (a, b) => a + (b - a) * p.join;
  const Gy = mix(0.47, 0.2), rG = mix(0.29, 0.36);
  const Wy = mix(-0.43, -0.2), rW = mix(0.36, 0.38);
  const Sy = mix(-0.4, 0);
  const godY = Gy + rG * 0.38, worldY = Wy - rW * 0.6;
  place('god', 0, godY);
  place('world', 0, worldY);
  const bTop = Gy - rG + 0.03;
  const by = Math.max(-0.02, (bTop + p.bbot) / 2 + 0.07);
  place('bridge', 0.22, by + 0.03, 0.055, by - 0.02);
  place('self', rW + 0.1, Sy + 0.03, 0.105, Sy);
  place('sin', -(rW + 0.1), Sy - 0.08, -0.02 - p.stainR * 0.8, Sy - 0.06);
  const bl = labels.bridge;
  rects.set([0, godY, labels.god.w / 2 + 0.02, labels.god.h / 2 + 0.012, 0, worldY, labels.world.w / 2 + 0.02, labels.world.h / 2 + 0.012,
    0.22 + bl.w / 2, by + 0.03, bl.on ? bl.w / 2 + 0.02 : 0, bl.h / 2 + 0.012]);
}

// ---------- connectors ----------
// Things that join, point and mark (the bridge, its arrows, the line of history)
// are drawn as crisp graphics over the paint. ?conn=1 gilded, 2 engraved, 3 glass.
const conn = Number(params.get('conn')) || 0;
const CONN_NAMES = ['Watercolor', 'Gilded', 'Engraved', 'Glass', 'Line', 'Bold', 'Channel'];
document.body.classList.add(`conn${conn}`);
const nav = document.getElementById('nav');
CONN_NAMES.forEach((n, i) => {
  const a = document.createElement('a');
  a.textContent = n;
  a.href = i ? `?conn=${i}` : '?';
  if (i === conn) a.className = 'on';
  nav.appendChild(a);
});
const connSvg = document.getElementById('conn');
const INK = '#2b211d', RUBY = '#8f1d22', PAPER = '#fbf6ea';
const f = (n) => n.toFixed(4);

function chevrons(w, y0, y1, t, s, draw) {
  let out = '';
  for (let oy = y0 - 2 * s + ((t * 0.04) % s); oy < y1; oy += s) out += draw(oy);
  return out;
}
const chevPath = (w, oy, h, th) => `M${-w},${f(oy)} L0,${f(oy + h)} L${w},${f(oy)} L${w},${f(oy + th)} L0,${f(oy + h + th)} L${-w},${f(oy + th)}Z`;
const lozenge = (x, y, r) => `M${f(x)},${f(y - r)} L${f(x + r * 0.8)},${f(y)} L${f(x)},${f(y + r)} L${f(x - r * 0.8)},${f(y)}Z`;

function drawConn(p, t) {
  const top = -(p.join * (0.2 - 0.47) + 0.47 - (0.29 + p.join * 0.07) + 0.03);   // svg y grows downward
  const bot = -p.bbot;
  const h = Math.max(0.001, bot - top);
  const w = 0.045, cy = -0.03, L = 0.135, T = 0.036;
  const crim = p.crim, ba = p.ba, cr = p.cross;
  const ty = 0.87, xs = [0, 1, 2, 3].map((i) => ext * (-0.72 + 0.48 * i)), bx = ext * (-0.72 + 0.48 * p.act);
  let g = '';

  if (conn === 1) {
    // ----- gilded: gold leaf, a coloured field, fine black line -----
    const b = 0.012;
    g += `<defs><linearGradient id="gold" x1="0" y1="0" x2="1" y2="1" spreadMethod="reflect" gradientTransform="translate(${f(Math.sin(t * 0.5) * 0.35)},0)">
      <stop offset="0" stop-color="#fbeeb0"/><stop offset=".3" stop-color="#e2b33c"/><stop offset=".55" stop-color="#a8741a"/><stop offset=".78" stop-color="#f3d77a"/><stop offset="1" stop-color="#b8862a"/></linearGradient>
      <filter id="sh" x="-50%" y="-20%" width="200%" height="140%"><feDropShadow dx="0" dy=".005" stdDeviation=".006" flood-color="#3a2410" flood-opacity=".4"/></filter>
      <clipPath id="bc"><rect x="${-w}" y="${f(top)}" width="${2 * w}" height="${f(h)}" rx=".012"/></clipPath></defs>`;
    g += `<g opacity="${f(ba)}" filter="url(#sh)">
      <rect x="${-w - b}" y="${f(top - b)}" width="${2 * (w + b)}" height="${f(h + 2 * b)}" rx=".022" fill="url(#gold)" stroke="${INK}" stroke-width=".0035"/>
      <rect x="${-w}" y="${f(top)}" width="${2 * w}" height="${f(h)}" rx=".012" fill="#1f4a8a"/>
      <rect x="${-w}" y="${f(top)}" width="${2 * w}" height="${f(h)}" rx=".012" fill="${RUBY}" opacity="${f(crim)}"/>
      <g clip-path="url(#bc)" fill="url(#gold)" stroke="${INK}" stroke-width=".002">${chevrons(w, top, bot, t, 0.11, (oy) => `<path d="${chevPath(w - 0.008, oy, 0.04, 0.026)}"/>`)}</g>
      <rect x="${-w}" y="${f(top)}" width="${2 * w}" height="${f(h)}" rx=".012" fill="none" stroke="${INK}" stroke-width=".003"/></g>`;
    const beam = (k) => `M${-L * k},${f(cy - T * 1.45 * k)} L${-L * 0.36},${f(cy - T * 0.85 * k)} L${L * 0.36},${f(cy - T * 0.85 * k)} L${L * k},${f(cy - T * 1.45 * k)} L${L * k},${f(cy + T * 1.45 * k)} L${L * 0.36},${f(cy + T * 0.85 * k)} L${-L * 0.36},${f(cy + T * 0.85 * k)} L${-L * k},${f(cy + T * 1.45 * k)}Z`;
    g += `<g opacity="${f(cr)}" filter="url(#sh)"><path d="${beam(1)}" fill="url(#gold)" stroke="${INK}" stroke-width=".0035"/>
      <path d="${beam(0.76)}" fill="${RUBY}" stroke="${INK}" stroke-width=".0025"/>
      <circle cx="0" cy="${cy}" r=".027" fill="url(#gold)" stroke="${INK}" stroke-width=".003"/><circle cx="0" cy="${cy}" r=".013" fill="#1f4a8a" stroke="${INK}" stroke-width=".002"/>
      <circle cx="-.004" cy="${cy - 0.004}" r=".004" fill="#fff" opacity=".7"/></g>`;
    g += `<g filter="url(#sh)"><line x1="${-ext}" y1="${ty}" x2="${ext}" y2="${ty}" stroke="${INK}" stroke-width=".018" stroke-linecap="round"/>
      <line x1="${-ext}" y1="${ty}" x2="${ext}" y2="${ty}" stroke="url(#gold)" stroke-width=".011" stroke-linecap="round"/>
      <path d="M${ext + 0.09},${ty} L${ext - 0.02},${ty - 0.05} Q${ext + 0.015},${ty} ${ext - 0.02},${ty + 0.05}Z" fill="url(#gold)" stroke="${INK}" stroke-width=".0035" stroke-linejoin="round"/>
      ${xs.map((x) => `<circle cx="${f(x)}" cy="${ty}" r=".02" fill="url(#gold)" stroke="${INK}" stroke-width=".003"/><circle cx="${f(x)}" cy="${ty}" r=".008" fill="${INK}"/>`).join('')}
      <circle cx="${f(bx)}" cy="${ty}" r="${f(0.032 + 0.002 * Math.sin(t * 2.4))}" fill="url(#gold)" stroke="${INK}" stroke-width=".003"/>
      <circle cx="${f(bx)}" cy="${ty}" r=".021" fill="${RUBY}" stroke="${INK}" stroke-width=".002"/><circle cx="${f(bx - 0.007)}" cy="${ty - 0.007}" r=".005" fill="#fff" opacity=".75"/></g>`;
  } else if (conn === 2) {
    // ----- engraved: ruled ink lines on bare paper, one red -----
    const col = crim > 0.5 ? RUBY : '#8a5a12';
    let hatch = '';
    for (let y = top + 0.012; y < bot - 0.006; y += 0.012) hatch += `M${-w + 0.004},${f(y)} h.012 M${w - 0.016},${f(y)} h.012 `;
    g += `<defs><clipPath id="bc"><rect x="${-w}" y="${f(top)}" width="${2 * w}" height="${f(h)}"/></clipPath></defs>`;
    g += `<g opacity="${f(ba)}"><rect x="${-w}" y="${f(top)}" width="${2 * w}" height="${f(h)}" fill="${PAPER}" opacity=".86"/>
      <path d="${hatch}" stroke="${INK}" stroke-width=".0016" opacity=".7"/>
      <g clip-path="url(#bc)" fill="none" stroke="${col}" stroke-width=".0075" stroke-linecap="round" stroke-linejoin="round">${chevrons(w, top, bot, t, 0.085, (oy) => `<path d="M${-w + 0.02},${f(oy)} L0,${f(oy + 0.03)} L${w - 0.02},${f(oy)}"/>`)}</g>
      <path d="M${-w},${f(top)} V${f(bot)} M${w},${f(top)} V${f(bot)}" stroke="${INK}" stroke-width=".0045" stroke-linecap="round"/>
      <path d="M${-w - 0.009},${f(top)} V${f(bot)} M${w + 0.009},${f(top)} V${f(bot)}" stroke="${INK}" stroke-width=".0015"/>
      <path d="M${-w - 0.02},${f(bot)} H${w + 0.02} M${-w - 0.02},${f(top)} H${w + 0.02}" stroke="${INK}" stroke-width=".0035" stroke-linecap="round"/></g>`;
    g += `<g opacity="${f(cr)}"><rect x="${-L}" y="${f(cy - T)}" width="${2 * L}" height="${2 * T}" fill="${PAPER}" opacity=".92"/>
      <rect x="${-L}" y="${f(cy - T)}" width="${2 * L}" height="${2 * T}" fill="none" stroke="${INK}" stroke-width=".0045"/>
      <rect x="${-L + 0.009}" y="${f(cy - T + 0.009)}" width="${2 * L - 0.018}" height="${2 * T - 0.018}" fill="none" stroke="${INK}" stroke-width=".0015"/>
      <path d="M${-L},${f(cy - T - 0.012)} V${f(cy + T + 0.012)} M${L},${f(cy - T - 0.012)} V${f(cy + T + 0.012)}" stroke="${INK}" stroke-width=".0045" stroke-linecap="round"/>
      <path d="${lozenge(0, cy, 0.024)}" fill="${RUBY}"/><path d="${lozenge(-0.075, cy, 0.01)}${lozenge(0.075, cy, 0.01)}" fill="${INK}"/></g>`;
    g += `<line x1="${-ext}" y1="${ty}" x2="${ext + 0.06}" y2="${ty}" stroke="${INK}" stroke-width=".0045" stroke-linecap="round"/>
      <line x1="${-ext}" y1="${ty + 0.011}" x2="${ext}" y2="${ty + 0.011}" stroke="${INK}" stroke-width=".0015"/>
      <path d="M${ext + 0.015},${ty - 0.035} L${ext + 0.07},${ty} L${ext + 0.015},${ty + 0.035}" fill="none" stroke="${INK}" stroke-width=".0045" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M${-ext},${ty - 0.025} V${ty + 0.025}" stroke="${INK}" stroke-width=".0045" stroke-linecap="round"/>
      ${xs.map((x) => `<circle cx="${f(x)}" cy="${ty}" r=".014" fill="${PAPER}" stroke="${INK}" stroke-width=".004"/>`).join('')}
      <circle cx="${f(bx)}" cy="${ty}" r="${f(0.03 + 0.003 * Math.sin(t * 2.4))}" fill="none" stroke="${RUBY}" stroke-width=".0025"/><circle cx="${f(bx)}" cy="${ty}" r=".017" fill="${RUBY}"/>`;
  } else if (conn === 3) {
    // ----- glass: jewel-coloured panes held in dark lead -----
    const LEAD = '#1d1714', b = 0.008;
    g += `<defs><linearGradient id="ruby" x1="0" x2="1"><stop offset="0" stop-color="#7c1018"/><stop offset=".5" stop-color="#cf2a32"/><stop offset="1" stop-color="#7c1018"/></linearGradient>
      <linearGradient id="saph" x1="0" x2="1"><stop offset="0" stop-color="#173a80"/><stop offset=".5" stop-color="#3f79d6"/><stop offset="1" stop-color="#173a80"/></linearGradient>
      <linearGradient id="amber" x1="0" x2="1"><stop offset="0" stop-color="#d98a12"/><stop offset=".5" stop-color="#ffd86b"/><stop offset="1" stop-color="#d98a12"/></linearGradient>
      <clipPath id="bc"><rect x="${-w}" y="${f(top)}" width="${2 * w}" height="${f(h)}"/></clipPath></defs>`;
    g += `<g opacity="${f(ba)}"><rect x="${-w - b}" y="${f(top - b)}" width="${2 * (w + b)}" height="${f(h + 2 * b)}" rx=".006" fill="${LEAD}"/>
      <rect x="${-w}" y="${f(top)}" width="${2 * w}" height="${f(h)}" fill="url(#saph)"/>
      <rect x="${-w}" y="${f(top)}" width="${2 * w}" height="${f(h)}" fill="url(#ruby)" opacity="${f(crim)}"/>
      <g clip-path="url(#bc)" fill="url(#amber)" stroke="${LEAD}" stroke-width=".006" stroke-linejoin="round">${chevrons(w, top, bot, t, 0.12, (oy) => `<path d="${chevPath(w, oy, 0.045, 0.04)}" opacity="${f(0.88 + 0.12 * Math.sin(t * 1.3 + oy * 30))}"/>`)}</g>
      <rect x="${-w + 0.008}" y="${f(top + 0.01)}" width=".006" height="${f(Math.max(0, h - 0.02))}" fill="#fff" opacity=".28"/></g>`;
    g += `<g opacity="${f(cr)}"><rect x="${-L - b}" y="${f(cy - T - b)}" width="${2 * (L + b)}" height="${2 * (T + b)}" rx=".006" fill="${LEAD}"/>
      <rect x="${-L}" y="${f(cy - T)}" width="${2 * L}" height="${2 * T}" fill="url(#ruby)"/>
      <path d="M${-w - 0.004},${f(cy - T)} V${f(cy + T)} M${w + 0.004},${f(cy - T)} V${f(cy + T)}" stroke="${LEAD}" stroke-width=".006"/>
      <path d="${lozenge(0, cy, T)}" fill="url(#amber)" stroke="${LEAD}" stroke-width=".006" stroke-linejoin="round"/>
      <rect x="${-L + 0.008}" y="${f(cy - T + 0.007)}" width="${2 * L - 0.016}" height=".005" fill="#fff" opacity=".28"/></g>`;
    g += `<line x1="${-ext}" y1="${ty}" x2="${ext}" y2="${ty}" stroke="${LEAD}" stroke-width=".009" stroke-linecap="round"/>
      <path d="M${ext + 0.085},${ty} L${ext - 0.015},${ty - 0.048} L${ext - 0.015},${ty + 0.048}Z" fill="url(#amber)" stroke="${LEAD}" stroke-width=".007" stroke-linejoin="round"/>
      ${xs.map((x) => `<path d="${lozenge(x, ty, 0.026)}" fill="url(#saph)" stroke="${LEAD}" stroke-width=".006" stroke-linejoin="round"/>`).join('')}
      <path d="${lozenge(bx, ty, 0.04 + 0.003 * Math.sin(t * 2.4))}" fill="url(#ruby)" stroke="${LEAD}" stroke-width=".007" stroke-linejoin="round"/>
      <path d="${lozenge(bx - 0.006, ty - 0.008, 0.008)}" fill="#fff" opacity=".6"/>`;
  } else {
    // ----- modern and minimal: plain lines in warm ink, one accent colour -----
    const DARK = '#33271f', ACC = crim > 0.5 ? '#a3262b' : '#b07a1e', RED = '#a3262b', PAP = '#f8f2e4';
    const line = (d, col, wd, extra = '') => `<path d="${d}" fill="none" stroke="${PAP}" stroke-width="${wd + 0.012}" stroke-linecap="round" stroke-linejoin="round" opacity=".92"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${wd}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
    const axis = `M0,${f(top)} V${f(bot)}`;
    g += `<defs><clipPath id="bc"><rect x="-.06" y="${f(top)}" width=".12" height="${f(h)}"/></clipPath></defs><g opacity="${f(Math.min(1, ba * 1.3))}">`;
    if (conn === 4) {
      // one fine line, dashes of light running down it, a plain arrowhead
      g += line(`M0,${f(top)} V${f(bot - 0.03)}`, ACC, 0.009);
      g += `<path d="M0,${f(top)} V${f(bot - 0.04)}" fill="none" stroke="${PAP}" stroke-width=".0045" stroke-linecap="round" stroke-dasharray=".018 .075" stroke-dashoffset="${f(-t * 0.05)}"/>`;
      g += `<path d="M0,${f(bot + 0.004)} L-.024,${f(bot - 0.042)} L.024,${f(bot - 0.042)}Z" fill="${ACC}" stroke="${PAP}" stroke-width=".004" stroke-linejoin="round"/>`;
      g += `<g opacity="${f(cr)}">${line(`M-.085,${cy} H.085`, ACC, 0.009)}</g>`;
    } else if (conn === 5) {
      // one bold stroke with pale arrows moving inside it
      g += line(axis, ACC, 0.036);
      g += `<g opacity="${f(cr)}">${line(`M-.1,${cy} H.1`, ACC, 0.036)}</g>`;
      g += `<path d="${axis}" fill="none" stroke="${ACC}" stroke-width=".036" stroke-linecap="round"/>`;
      g += `<g clip-path="url(#bc)" fill="none" stroke="${PAP}" stroke-width=".0065" stroke-linecap="round" stroke-linejoin="round">${chevrons(w, top, bot, t, 0.075, (oy) => `<path d="M-.0095,${f(oy)} L0,${f(oy + 0.011)} L.0095,${f(oy)}"/>`)}</g>`;
    } else {
      // an open channel in outline, with beads descending through it
      const a = 0.02, x = 0.1;
      const outline = cr > 0.5
        ? `M${-a},${f(top)} V${f(cy - a)} H${-x} V${f(cy + a)} H${-a} V${f(bot)} M${a},${f(top)} V${f(cy - a)} H${x} V${f(cy + a)} H${a} V${f(bot)} M${-x},${f(cy - a)} V${f(cy + a)} M${x},${f(cy - a)} V${f(cy + a)}`
        : `M${-a},${f(top)} V${f(bot)} M${a},${f(top)} V${f(bot)}`;
      g += `<path d="M0,${f(top)} V${f(bot)}" stroke="${PAP}" stroke-width="${2 * a}" opacity=".8"/>`;
      g += `<rect x="${-x}" y="${f(cy - a)}" width="${2 * x}" height="${2 * a}" fill="${PAP}" opacity="${f(0.8 * cr)}"/>`;
      g += line(outline, DARK, 0.0048);
      g += `<g clip-path="url(#bc)" fill="${ACC}">${chevrons(w, top + 0.01, bot, t, 0.065, (oy) => `<circle cx="0" cy="${f(oy)}" r=".0085"/>`)}</g>`;
    }
    g += '</g>';
    // the line of history
    g += line(`M${-ext},${ty} H${ext + 0.04}`, DARK, 0.0055);
    g += `<path d="M${ext + 0.085},${ty} L${ext + 0.03},${ty - 0.026} L${ext + 0.03},${ty + 0.026}Z" fill="${DARK}" stroke="${PAP}" stroke-width=".004" stroke-linejoin="round"/>`;
    g += xs.map((x) => `<circle cx="${f(x)}" cy="${ty}" r=".013" fill="${PAP}" stroke="${DARK}" stroke-width=".0055"/>`).join('');
    g += `<circle cx="${f(bx)}" cy="${ty}" r="${f(0.031 + 0.004 * Math.sin(t * 2.4))}" fill="none" stroke="${RED}" stroke-width=".003"/><circle cx="${f(bx)}" cy="${ty}" r=".018" fill="${RED}" stroke="${PAP}" stroke-width=".004"/>`;
  }
  connSvg.innerHTML = `<g transform="translate(${innerWidth / 2},${innerHeight / 2}) scale(${unit})">${g}</g>`;
}

// ---------- loop ----------
function frame(now) {
  const x = Math.min(1, (now - t0) / DUR);
  const target = { ...ACTS[act].p, act };
  const e = ease(x);
  for (const k in target) live[k] = from[k] + (target[k] - from[k]) * e;
  layout(live);

  gl.uniform2f(U('uRes'), canvas.width, canvas.height);
  gl.uniform1f(U('uUnit'), unit * dpr);
  gl.uniform1f(U('uExt'), ext);
  gl.uniform1f(U('uT'), frozen !== null ? frozen : now / 1000);
  gl.uniform1f(U('uJoin'), live.join);
  gl.uniform1f(U('uBbot'), live.bbot);
  gl.uniform1f(U('uBa'), conn ? 0 : live.ba);
  gl.uniform1f(U('uTl'), conn ? 0 : 1);
  gl.uniform1f(U('uCrim'), live.crim);
  gl.uniform1f(U('uCross'), conn ? 0 : live.cross);
  gl.uniform1f(U('uStainR'), live.stainR);
  gl.uniform1f(U('uStainA'), live.stainA);
  gl.uniform1f(U('uGlow'), live.glow);
  gl.uniform1f(U('uDull'), live.dull);
  gl.uniform1f(U('uAct'), live.act);
  gl.uniform4fv(U('uLab[0]'), rects);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  if (conn) drawConn(live, frozen !== null ? frozen : now / 1000);
  requestAnimationFrame(frame);
}

addEventListener('resize', resize);
renderText(true);
resize();
document.fonts.ready.then(resize);
requestAnimationFrame(frame);
