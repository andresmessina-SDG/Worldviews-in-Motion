// Style studies: one composition (Christian theism, the Redemption act)
// painted three ways. Pick with ?style=1|2|3.

const STYLES = { 1: 'Luminous', 2: 'Ink & wash', 3: 'Nocturne' };
const style = Number(new URLSearchParams(location.search).get('style')) || 1;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform float uStyle;
uniform float uUnit;

float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
vec2 hash2(vec2 p){ float n = hash(p); return vec2(n, hash(p + n * 37.1 + 11.3)); }
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
  return length(pa - ba * clamp(dot(pa, ba) / dot(ba, ba), 0., 1.));
}
vec3 K(vec3 c){ return -log(c); }

vec2 wL, wM, wF;
float H;

// A wash built from five misregistered glazes, each with its own tide line.
float layers(float d, float seed, float spread, float ew, float tide){
  float s = 0.;
  for (int i = 0; i < 5; i++){
    float fi = float(i);
    float a = seed + fi * 2.399;
    vec2 dir = vec2(cos(a), sin(a));
    float n = dot(wM, dir) * 2.2 + dot(wF, dir.yx) * .7;
    float di = d + n * spread + fi * spread * .12;
    float body = smoothstep(ew, -ew, di);
    float rim = exp(-pow((di + ew * 2.) / (ew * 2. + .003), 2.));
    s += body + rim * tide;
  }
  return s * .2;
}
// Backruns: pale blooms with a dark, frilled fringe.
float bloom(vec2 p, float seed){
  float b = fbm(p * 1.7 + wL * 1.3 + seed) + wF.x * .05 + wM.y * .06;
  float inside = smoothstep(.55, .59, b);
  float ring = exp(-pow((b - .548) / .016, 2.));
  return 1. - .32 * inside + .5 * ring;
}
float splat(vec2 p, float scale, float thr, float seed){
  vec2 g = p * scale, id = floor(g), f = fract(g);
  vec2 r = hash2(id + seed);
  if (r.x < thr) return 0.;
  vec2 c = .3 + .4 * hash2(id + seed + 5.7);
  float rad = .03 + .2 * pow(r.y, 3.);
  float d = (length(f - c) - rad) / scale + wF.y * .004;
  return smoothstep(.002, -.002, d) * (.6 + .7 * exp(-pow((d + .004) / .004, 2.)));
}
// Salt: crystals that push pigment away, leaving pale stars with dark halos.
vec2 salt(vec2 p, float scale){
  vec2 g = p * scale, id = floor(g), f = fract(g);
  float lift = 0., halo = 0.;
  for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++){
    vec2 o = vec2(float(i), float(j));
    vec2 c = o + hash2(id + o + 3.3);
    float sz = .05 + .32 * pow(hash(id + o + 9.1), 5.);
    float d = length(f - c) / sz + wF.x * 1.4 + wM.x * .6;
    lift = max(lift, smoothstep(1., .25, d));
    halo = max(halo, exp(-pow((d - 1.25) / .3, 2.)) * smoothstep(.1, .3, sz));
  }
  return vec2(lift, halo);
}

void main(){
  vec2 frag = gl_FragCoord.xy;
  vec2 q = (frag - .5 * uRes) / uUnit;
  float t = uTime * .015;
  bool S1 = uStyle < 1.5, S2 = uStyle > 1.5 && uStyle < 2.5, S3 = uStyle > 2.5;

  wL = vec2(fbm(q * 1.2 + t), fbm(q * 1.2 + vec2(31.7, 11.3) - t)) - .5;
  wM = vec2(fbm(q * 4.5 + 5.), fbm(q * 4.5 + vec2(7., 23.))) - .5;
  wF = vec2(fbm(q * 22. + 1.), fbm(q * 22. + vec2(13., 4.))) - .5;
  H = paperH(frag);
  float Hx = paperH(frag + vec2(1.2, 1.2));

  // composition
  vec2 G = vec2(0., .47);   float rG = .3;
  vec2 Wc = vec2(0., -.43); float rW = .37;
  vec2 Sc = vec2(0., -.4);  float rS = .058;
  vec2 hand = wL * .06;     // the wobble of a hand-drawn shape
  float dG = length(q + hand - G) - rG;
  float dW = length(q + hand.yx - Wc) - rW;
  float dS = length(q + hand * .4 - Sc) - rS;
  float dB = sdSeg(q + hand * .5, vec2(0., .2), vec2(0., -.33)) - .026;
  float dX = sdSeg(q + hand * .5, vec2(-.085, .0), vec2(.085, .0)) - .022;
  float rg = length(q - G), rw = length(q - Wc);

  float spread = S1 ? .05 : .03;
  float ew     = S1 ? .014 : .0045;
  float tide   = S1 ? .35 : (S2 ? .8 : .55);

  // palettes
  vec3 paper   = S1 ? vec3(.976, .962, .928) : (S2 ? vec3(.982, .972, .945) : vec3(.97, .955, .92));
  vec3 skyNear = S3 ? vec3(.98, .72, .38) : vec3(1., .93, .6);
  vec3 skyMid  = S3 ? vec3(.36, .2, .46)  : (S2 ? vec3(.97, .78, .56) : vec3(.96, .64, .5));
  vec3 skyFar  = S3 ? vec3(.1, .11, .3)   : (S2 ? vec3(.8, .72, .82) : vec3(.56, .5, .74));
  vec3 seaNear = S3 ? vec3(.12, .28, .42) : (S2 ? vec3(.72, .88, .85) : vec3(.5, .82, .8));
  vec3 seaFar  = S3 ? vec3(.04, .1, .2)   : (S2 ? vec3(.5, .68, .78) : vec3(.18, .4, .58));
  vec3 gold    = vec3(.99, .76, .2);
  vec3 orange  = vec3(.93, .46, .14);
  vec3 seaCol  = S3 ? vec3(.16, .62, .62) : vec3(.2, .6, .66);
  vec3 deepCol = vec3(.1, .26, .46);
  vec3 landCol = vec3(.56, .58, .22);
  vec3 earth   = vec3(.62, .36, .18);
  vec3 crimson = vec3(.68, .1, .14);
  vec3 stain   = vec3(.13, .11, .22);

  // ---------- background: the two realms, wet in wet ----------
  float v1 = fbm(q * 1.1 + wL * 1.6 + 2.), v2 = fbm(q * 2.3 - wL * 2.2 + 7.);
  float up = smoothstep(-.28, .18, q.y + (v1 - .5) * .7 + wM.x * .15);
  float nearG = exp(-pow(max(rg - rG, 0.) / (S3 ? .34 : .5), 2.));
  float farG = smoothstep(.45, 1.5, rg);
  float farW = smoothstep(.3, 1.3, rw);
  vec3 A = up * (K(skyNear) * nearG * (S3 ? 1.1 : .8)
               + K(skyMid) * (1. - nearG) * (.35 + 1.1 * v2)
               + K(skyFar) * farG * (.3 + 1.5 * v1))
         + (1. - up) * (K(seaNear) * (.45 + .9 * v2) + K(seaFar) * farW * (.4 + 1.5 * v1));
  A *= bloom(q, 1.) * bloom(q * 2.1, 5.);
  A *= .8 + .4 * noise(vec2(q.x * 2.5 + wL.x * 3., q.y * 34. + wL.y * 8.));   // brush streaks
  if (S2) A *= .55 * smoothstep(.3, .5, fbm(q * 1.4 + wL + 20.) + .12);       // patches of bare paper
  if (S3) {
    A *= 1.25;
    vec2 st = salt(q, 9.) + .6 * salt(q + 3.7, 21.);
    float sky = smoothstep(rG + .02, rG + .3, rg) * smoothstep(rW, rW + .2, rw);
    A *= 1. - .85 * min(st.x, 1.) * sky;
    A *= 1. + .5 * st.y * sky;
  }

  // rays of glory, lifted out of the sky
  float ang = atan(q.y - G.y, q.x - G.x);
  float ray = pow(.5 + .5 * sin(ang * 16. + wM.x * 5. + wL.y * 3.), 4.);
  ray *= smoothstep(rG - .02, rG + .1, rg) * exp(-(rg - rG) * (S3 ? 1.6 : 2.4));
  A *= 1. - (S3 ? .75 : .5) * ray;
  if (S3) A *= 1. - .6 * exp(-pow(max(rg - rG, 0.) / .16, 2.));

  // reserve the shapes: the background stops just short of them
  float bodyG = layers(dG, 11., spread * 1.3, ew, 0.);
  float bodyW = layers(dW, 17., spread * 1.3, ew, 0.);
  float reserve = S1 ? .55 : .93;
  A *= 1. - reserve * max(bodyG, bodyW);
  A += (S1 ? .25 : .5) * K(mix(skyMid, seaFar, 1. - up)) * (exp(-pow(dG / .012, 2.)) + exp(-pow(dW / .012, 2.))) * (.5 + v2);

  // ---------- the Ultimate ----------
  {
    float dens = layers(dG, 1., spread, ew, tide);
    float core = mix(.5, 1.05, smoothstep(0., rG, rg + wM.x * .1));
    float bl = bloom(q * 2.4, 31.);
    A += K(gold) * dens * core * bl * (.85 + .6 * v2);
    A += K(orange) * dens * smoothstep(rG * .55, rG, rg + wM.y * .15) * (.25 + .5 * v1);
  }

  // ---------- the world ----------
  {
    float dens = layers(dW, 2., spread, ew, tide);
    vec2 p = q - Wc;
    float land = smoothstep(.5, .56, fbm(p * 3.2 + wL * 1.5 + 4.) + wF.x * .08);
    float shade = smoothstep(-.3, 1., dot(p, vec2(.45, -.9)) / rW);
    float bl = bloom(q * 2.6, 47.);
    A += K(seaCol) * dens * (1. - land * .75) * bl * (.8 + .7 * v2);
    A += K(deepCol) * dens * shade * (.5 + .6 * v1);
    A += K(landCol) * dens * land * (.7 + .5 * v1);
    A += K(earth) * dens * land * smoothstep(.45, .7, v2) * .6;
  }

  // ---------- remedy: light lifted around the self ----------
  A *= 1. - .7 * exp(-pow(length(q - Sc) / .16, 2.));

  // ---------- the bridge and its cross-beam ----------
  {
    float streak = .75 + .5 * noise(vec2(q.x * 120., q.y * 6.));
    float dens = layers(dB, 3., .012, .004, tide) * streak;
    float densX = layers(dX, 4., .012, .004, tide) * (.75 + .5 * noise(vec2(q.x * 6., q.y * 120.)));
    A += K(crimson) * (dens + densX * (1. - .5 * dens)) * 1.15;
    A += K(vec3(.4, .1, .2)) * dens * smoothstep(.1, -.33, q.y) * .3;
  }

  // ---------- problem: what remains of the stain ----------
  {
    float d = length(q + wL * .12 + wM * .05 - Sc - vec2(-.03, -.03)) - .1 - wM.x * .06;
    float dens = layers(d, 6., .03, .012, .5);
    A += K(stain) * dens * .5;
  }

  // ---------- the self ----------
  {
    float dens = layers(dS, 5., .01, .0035, tide);
    A += K(vec3(.9, .5, .3)) * dens * 1.1;
    A += K(gold) * dens * .4;
  }

  // ---------- time: one dry brushstroke ----------
  {
    vec2 a = vec2(-1.05, -.9), b = vec2(1.0, -.9);
    vec2 p = q + wL * .02;
    float d = sdSeg(p, a, b) - .012 * (.7 + .6 * noise(vec2(q.x * 3., 1.)));
    float da = min(sdSeg(p, b + vec2(.03, 0.), b + vec2(-.035, .04)), sdSeg(p, b + vec2(.03, 0.), b + vec2(-.035, -.04))) - .009;
    float dry = smoothstep(.3, .5, H + .3 * noise(vec2(q.x * 5., q.y * 90.)));
    float dens = (smoothstep(.004, -.004, d) * dry + smoothstep(.004, -.004, da)) * .9;
    if (S3) { A *= 1. - .82 * dens; A += K(vec3(.98, .86, .6)) * dens * .5; }
    else A += K(vec3(.45, .3, .24)) * dens * (S1 ? .55 : .8);
  }

  // ---------- flicked paint ----------
  {
    float sp = splat(q, 14., S2 ? .9 : .95, 1.) + splat(q + 7.3, 31., S2 ? .9 : .95, 2.) + splat(q, 60., .92, 3.);
    vec3 spc = S3 ? vec3(.95, .8, .45) : mix(orange, deepCol, step(0., -q.y + wL.y));
    if (S3) A *= 1. - .9 * min(sp, 1.) * up; else A += K(spc) * sp * .7;
  }

  // ---------- ink (style 2) ----------
  if (S2) {
    float wob = wM.x * .025 + wF.y * .006;
    float w = .0028 * (.5 + noise(q * 9.));
    float ink = 0.;
    ink += smoothstep(w, w * .3, abs(dG + .012 + wob));
    ink += smoothstep(w, w * .3, abs(dG - .02 - wob * 1.4)) * step(.45, noise(q * 6. + 2.));
    ink += smoothstep(w, w * .3, abs(dW + .01 - wob));
    ink += smoothstep(w, w * .3, abs(dW - .024 + wob * 1.3)) * step(.5, noise(q * 5. + 8.));
    ink += smoothstep(w, w * .3, abs(dS - .012 + wob * .4));
    ink += smoothstep(w, w * .3, abs(min(dB, dX) - .01 + wob * .4));
    float ra = (ang + wL.x * .12) * 16. / 6.2832 + .5;
    float rd = abs(fract(ra) - .5) * 6.2832 / 16. * rg;
    float len = rG + .16 + .22 * hash(vec2(floor(ra), 3.));
    ink += smoothstep(w * 1.3, w * .4, rd) * smoothstep(rG + .05, rG + .07, rg) * smoothstep(len, len - .03, rg);
    A += K(vec3(.2, .13, .1)) * min(ink, 1.) * (.5 + H);
  }

  // ---------- paper ----------
  float gran = S3 ? .6 : .45;
  A *= 1. + gran * (.5 - H) * 1.4;
  if (!S1) {
    // a taped margin: paint stops at a crisp, slightly ragged edge
    vec2 b = abs((frag - .5 * uRes)) - (.5 * uRes - uUnit * .07);
    float dF = (max(b.x, b.y)) / uUnit + wF.x * .006 + wM.y * .004;
    float m = smoothstep(.003, -.003, dF);
    A = A * m + (S3 ? K(vec3(.3, .3, .5)) : K(skyMid)) * exp(-pow((dF + .006) / .006, 2.)) * .35 * m;
  }
  vec3 col = paper * exp(-A);
  col *= 1. + (H - Hx) * .2;
  col *= .985 + .03 * noise(frag * .02);
  gl_FragColor = vec4(col, 1.);
}`;

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
gl.linkProgram(prog);
gl.useProgram(prog);
gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
gl.enableVertexAttribArray(0);
gl.bindAttribLocation(prog, 0, 'p');
gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
const U = (n) => gl.getUniformLocation(prog, n);

document.body.classList.toggle('dark', style === 3);
document.body.classList.toggle('frame', style !== 1);
const nav = document.getElementById('nav');
for (const k in STYLES) {
  const a = document.createElement('a');
  a.href = `?style=${k}`;
  a.textContent = STYLES[k];
  if (Number(k) === style) a.className = 'on';
  nav.appendChild(a);
}

const LABELS = [
  ['The triune God', 0, 0.58, ''],
  ['Christ the Mediator', 0.07, 0.1, 'left'],
  ['Image-bearer', 0.09, -0.39, 'left light'],
  ['Sin', -0.16, -0.45, 'right light'],
  ['Creation', 0, -0.66, 'light'],
  ['History moves toward a goal', 0, -0.83, ''],
];
const els = LABELS.map(([text, , , cls]) => {
  const d = document.createElement('div');
  d.className = `l ${cls}`;
  d.textContent = text;
  document.getElementById('labels').appendChild(d);
  return d;
});

let dpr = 1;
let unit = 1;
function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(innerWidth * dpr);
  canvas.height = Math.round(innerHeight * dpr);
  gl.viewport(0, 0, canvas.width, canvas.height);
  unit = Math.min(innerHeight / 2, innerWidth / 1.5);
  LABELS.forEach(([, x, y], i) => {
    els[i].style.left = `${innerWidth / 2 + x * unit}px`;
    els[i].style.top = `${innerHeight / 2 - y * unit}px`;
  });
}
addEventListener('resize', resize);
resize();

const still = new URLSearchParams(location.search).has('still');
function frame(now) {
  gl.uniform2f(U('uRes'), canvas.width, canvas.height);
  gl.uniform1f(U('uUnit'), unit * dpr);
  gl.uniform1f(U('uTime'), still ? 0 : now / 1000);
  gl.uniform1f(U('uStyle'), style);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  if (!still) requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
