// The painting. One watercolor shader draws every worldview; what differs
// between them (places, palette, which motions run) arrives as uniforms,
// so one painting can turn into another by blending those values.

const FRAG = `
precision highp float;
uniform vec2 uRes, uCen;
uniform float uT, uUnit;

// where things stand
uniform vec2 uG, uW;            // y and radius of the Ultimate and of the world
uniform float uSy;              // man
// palette
uniform vec3 uGlory, uSky, uFar, uLow, uDeep, uSea, uLand, uGodC, uGodRim, uStainC;
uniform float uBg, uWarm, uGodA;
// what is present, and what moves
uniform float uWave, uHaloL, uHaloR, uClock, uRing, uStainS;
uniform float uBox, uLat, uPulse, uBare, uManA;   // a squared, sealed world; its lattice of law; an empty upper page
uniform vec3 uManC;
uniform float uDrain, uPool, uHollow;
uniform float uSelfR, uSelfA;                        // colour that man spreads around himself, by his own hand
uniform vec3 uSelfC;
uniform float uOne, uMaya, uWorldA, uManI;           // all things as one ocean; the appearances rippling on it; how much of the world and of man is drawn                // the world's pigment running off, gathering below, and a self left empty
uniform float uStainR, uStainA, uGlow, uDull, uRip, uRipY, uTick;
uniform vec3 uHands;            // second, minute and hour hands, radians clockwise from the top
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
float rule(float d, float w){ return smoothstep(w, w * .35, abs(d)); }       // a ruled line: even, exact
float clockHand(vec2 p, float a, float r0, float r1, float w){
  vec2 dir = vec2(sin(a), cos(a));
  return smoothstep(w, w * .45, sdSeg(p, dir * r0, dir * r1));
}

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

  vec2 G = vec2(0., uG.x);  float rG = uG.y;
  vec2 Wc = vec2(0., uW.x); float rW = uW.y;
  vec2 Sc = vec2(0., uSy);  float rS = .066;
  float dG = length(q + hand - G) - rG;
  vec2 bq = abs(q + hand.yx * .5 - Wc) - (rW - .035);
  float dW = mix(length(q + hand.yx - Wc) - rW, length(max(bq, 0.)) + min(max(bq.x, bq.y), 0.) - .035, uBox);
  float pres = smoothstep(0., .3, uGodA);                       // is there anything above at all
  float dS = length(q + hand * .4 - Sc) - rS;
  float rg = length(q - G), rw = length(q - Wc);
  float ang = atan(q.y - G.y, q.x - G.x);
  vec3 gold = vec3(.98, .78, .3);

  // ---------- the two realms ----------
  float up = smoothstep(-.28, .18, q.y + (v1 - .5) * .7 + wM.x * .15);
  float nearG = exp(-pow(max(rg - rG, 0.) / .5, 2.));
  vec3 A = up * (K(uGlory) * nearG * .8 + K(uSky) * (1. - nearG) * (.35 + 1.1 * v2) + K(uFar) * smoothstep(.45, 1.5, rg) * (.3 + 1.5 * v1))
         + (1. - up) * (K(uLow) * (.45 + .9 * v2) + K(uDeep) * smoothstep(.3, 1.3, rw) * (.4 + 1.5 * v1));
  if (uOne > .001) {
    // no realms: one colour spreading from the centre, in slow bands
    float bands = .5 + .5 * sin(rg * 15. + wM.x * 7. + wL.y * 5. - t * .15);
    vec3 A1 = K(uGlory) * (.2 + .7 * exp(-rg * rg / .5)) * (.6 + .8 * v2)
            + K(uSky) * smoothstep(.15, .9, rg) * (.15 + .8 * v1) * (.45 + .7 * bands)
            + K(uFar) * smoothstep(.75, 1.5, rg) * (.3 + 1.1 * v2);
    A = mix(A, A1, uOne);
  }
  A *= blooms * streaks * uBg * mix(.8, 1., smoothstep(.3, .5, fbm(q * 1.4 + wL + 20.) + .12));
  A += K(vec3(.62, .6, .66)) * uDull * .12 * (.5 + v2);
  A *= mix(1., .26, uBare * smoothstep(.15, .8, q.y + wL.y * .4));   // the upper page left almost bare

  // glory going out from God in slow waves
  float wave = max(0., sin((rg - rG) * 16. - t * .9 + wM.x * 2.));
  A *= 1. - .3 * uWave * wave * wave * exp(-(rg - rG) * 2.6) * smoothstep(rG, rG + .05, rg);

  A *= 1. - .93 * max(layers(dG, 11., .04, .0045, 0.) * pres * (1. - uOne), layers(dW, 17., .04, .0045, 0.) * uWorldA);
  float ink = 0.;

  // ---------- the world ----------
  {
    float dens = layers(dW, 2., .03, .0045, tide) * uWorldA;
    vec2 p = q - Wc;
    // drained: the wash thin at the top, heavier where it gathered
    dens *= mix(1., mix(.1, 1., smoothstep(.75, -1., p.y / rW + (v2 - .5) * 1.2)), uDrain);
    float gaveOut = mix(1., step(.5, noise(q * 4. + 2.)), uDrain);
    float m1 = smoothstep(.35, .65, fbm(p * 1.9 + wL * 1.2 + 4. + t * .02));
    float m2 = smoothstep(.45, .7, fbm(p * 2.6 - wL + 13. - t * .015));
    vec3 sea = mix(uSea, vec3(.42, .52, .58), uDull * .7);
    vec3 land = mix(uLand, vec3(.44, .51, .5), uDull * .7);
    A += K(sea) * dens * (1. - m1 * .7) * bloom(q * 2.6, 47.) * (.75 + .7 * v2);
    A += K(land) * dens * m1 * (.6 + .5 * v1);
    A += K(vec3(.86, .66, .3)) * dens * m2 * uWarm * (1. - .6 * uDull);
    A += K(vec3(.14, .28, .5)) * dens * smoothstep(-.3, 1., dot(p, vec2(.45, -.9)) / rW) * (.4 + .5 * v1);
    ink += pen(dW + .01 - wob) * gaveOut + pen(dW - .024 + wob * 1.3) * step(.5, noise(q * 5. + 8.)) * (1. - uClock) * mix(1., .6, uDrain);

    // what ran off: drips from the foot of the world, drops falling from them, and a pool beneath
    if (uDrain > .001) {
      float y0 = Wc.y - rW, poolY = y0 - .3;
      vec2 dp = q + wM * .012;
      float cw = .07, cid = floor(dp.x / cw), drip = 0.;
      for (int i = -1; i <= 1; i++){
        float id = cid + float(i);
        float hx = hash(vec2(id, 7.));
        float dx = (id + .25 + .5 * hash(vec2(id, 3.))) * cw;
        if (abs(dx) > rW - .04 || hx < .3) continue;
        float L = (.05 + .24 * hx * hash(vec2(id, 5.))) * uDrain * (.88 + .12 * sin(t * .35 + hx * 40.));
        float wd = .004 + .008 * hash(vec2(id, 9.));
        float bulb = smoothstep(y0 - L + .04, y0 - L, dp.y);
        float d = sdSeg(dp, vec2(dx, y0 + .03), vec2(dx, y0 - L)) - wd * (1. + .9 * bulb);
        drip = max(drip, smoothstep(.003, -.003, d) * (.45 + .6 * bulb));
        float fall = fract(t * (.05 + .05 * hx) + hx * 9.);
        float fy = mix(y0 - L, poolY, fall * fall);
        drip = max(drip, smoothstep(.003, -.002, length((dp - vec2(dx, fy)) * vec2(1., .6)) - wd * .8) * (1. - fall) * step(.5, hash(vec2(id, 11.))) * .8);
      }
      A += K(mix(uSea, vec3(.3, .32, .4), .5)) * drip * 1.1;
      float th = .034 * uPool * smoothstep(rW + .22, rW * .2, abs(q.x + wL.x * .2));
      float dPool = abs(q.y - poolY + (v2 - .5) * .05 + wM.x * .02) - th * (1. + .12 * sin(t * .3 + q.x * 7.)) + .012;
      A += K(vec3(.34, .36, .44)) * layers(dPool, 8., .02, .005, .9) * (.4 + .6 * v1) * bloom(q * 3., 9.) * smoothstep(0., .15, uPool);
    }

    // the world as a clock: a ruled ring, sixty divisions, and three hands
    if (uClock > .001) {
      float e = rw - rW;
      float aw = atan(p.x, p.y);
      float d60 = abs(fract(aw * 60. / 6.2832 + .5) - .5) * 6.2832 / 60. * rw;
      float d12 = abs(fract(aw * 12. / 6.2832 + .5) - .5) * 6.2832 / 12. * rw;
      float c = rule(e - .032, .0022) + rule(e - .082, .0012) * .6;
      c += rule(d60, .0019) * smoothstep(.034, .036, e) * smoothstep(.054, .052, e);
      c += rule(d12, .0034) * smoothstep(.034, .036, e) * smoothstep(.078, .076, e);
      c += clockHand(p, uHands.z, .095, rW * .5, .0062);
      c += clockHand(p, uHands.y, .095, rW * .8, .0044);
      c += clockHand(p, uHands.x, .095, rW * .9, .0019) + clockHand(p, uHands.x + 3.14159, .095, .13, .0019);
      c += rule(length(p) - .09, .0018);
      c += smoothstep(.0105, .0085, length(p - (rW + .105) * vec2(sin(uHands.x), cos(uHands.x))));
      ink += min(c, 1.) * uClock;
    }

    // the world as a closed system: a ruled lattice of law, with causes running on to their effects
    if (uLat > .001) {
      const float cs = .1;
      vec2 gp = p + wM * .01;
      vec2 cell = floor(gp / cs + .5);
      vec2 gd = abs(gp - cell * cs);
      float inside = smoothstep(-.012, -.03, dW);
      float lat = (rule(gd.x, .0015) + rule(gd.y, .0015)) * .26;
      lat += smoothstep(.003, 0., length(gp - cell * cs) - .0075) * step(.5, hash(cell)) * .7;
      float ph = fract(gp.x / (cs * 4.) - t * .1 * (.6 + hash(vec2(cell.y, 3.))) + hash(vec2(cell.y, 7.)));
      float pv = fract(-gp.y / (cs * 4.) - t * .1 * (.6 + hash(vec2(cell.x, 5.))) + hash(vec2(cell.x, 9.)));
      float run = rule(gd.y, .0034) * smoothstep(0., .16, ph) * smoothstep(.2, .16, ph) * step(.3, hash(vec2(cell.y, 1.)));
      run += rule(gd.x, .0034) * smoothstep(0., .16, pv) * smoothstep(.2, .16, pv) * step(.3, hash(vec2(cell.x, 2.)));
      ink += (lat + run * .75 * uPulse) * inside * uLat;
    }
  }

  ink *= uWorldA;

  // ---------- ripples through the world: light when God acts, shadow when sin spreads ----------
  {
    float rr = length(q + wL * .03 - vec2(0., uRipY));
    float rip = pow(max(0., sin(rr * 15. - t * 1.2)), 6.) * exp(-rr * 3.) * smoothstep(0., .06, rr) * smoothstep(0., -.03, mix(dW, dG, uOne));
    A *= 1. - .4 * max(uRip, 0.) * rip;
    A += K(vec3(.13, .11, .22)) * max(-uRip, 0.) * rip * .35;
  }

  // ---------- the Ultimate ----------
  {
    float dens = layers(dG, 1., mix(.03, .1, uOne), mix(.0045, .03, uOne), mix(tide, .25, uOne)) * uGodA;
    float ink0 = ink;
    float bandsG = mix(1., .6 + .5 * sin(rg * 15. + wM.x * 7. + wL.y * 5. - t * .15), uMaya);
    float core = mix(.42, 1.05, smoothstep(0., rG, rg + wM.x * .1));
    A += K(uGodC) * dens * core * bloom(q * 2.4, 31.) * (.85 + .6 * v2);
    A += K(uGodRim) * dens * smoothstep(rG * .5, rG, rg + wM.y * .15) * (.2 + .55 * v1) * bandsG;
    A *= 1. - .35 * uOne * exp(-rg * rg / .03);
    ink += (pen(dG + .012 + wob) + pen(dG - .02 - wob * 1.4) * step(.45, noise(q * 6. + 2.))) * (1. - uOne);
    // the many things: rings drawn on the surface, moving outward and never arriving
    if (uMaya > .001) {
      float rr = length(q + hand - G);
      float u = rr * 6.5 - t * .04;
      float id = floor(u);
      ink += pen((fract(u) - .5) / 6.5) * step(.42, noise(q * 4.5 + id * 7.3)) * smoothstep(.05, .13, rr) * smoothstep(rG + .2, rG - .06, rr) * .6 * uMaya;
    }
    // drawn by hand, each ring turning at its own pace
    float loose = pen(dG - .075 + wob * .8) * step(.4, noise(rot(q - G, t * .05) * 4. + 5.)) * .8;
    loose += pen(dG - .13 - wob) * step(.55, noise(rot(q - G, -t * .035) * 3. + 9.)) * .6;
    loose += smoothstep(.006, .003, abs(dG - .185)) * step(.72, fract(ang * 60. / 6.2832 + t * .06)) * .7;
    // ruled, and stepping once a second
    float ruled = rule(rg - rG - .07, .0022) * .7;
    ruled += smoothstep(.005, .0025, abs(rg - rG - .13)) * step(.72, fract(ang * 60. / 6.2832 + uTick * .5)) * .55;
    ink += loose * uHaloL + ruled * uHaloR;
    ink = mix(ink0, ink, pres);
  }

  // ---------- light lifted around man ----------
  A *= 1. - .72 * uGlow * exp(-pow(length(q - Sc) / .18, 2.));

  // ---------- the problem: a stain, or a haze ----------
  {
    float creep = fbm(q * 5. + vec2(t * .05, -t * .04)) - .5;
    float d = length(q + wL * .12 + wM * .05 - Sc - vec2(-.02, -.02)) - uStainR * (1. + .07 * sin(t * .8)) - wM.x * .06 - creep * .07;
    A += K(uStainC) * layers(d, 6., mix(.03, .05, uStainS), mix(.012, .03, uStainS), mix(.5, .3, uStainS)) * uStainA;
  }

  // ---------- meaning of man's own making: his colour brushed outward into a world that has none ----------
  if (uSelfA > .001) {
    vec2 sp = q + wL * .05 - Sc;
    float r = length(sp);
    vec2 dir = sp / max(r, 1e-4);
    float d = r - uSelfR * (1. + .07 * sin(t * .5)) - (noise(dir * 2.2 + t * .06) - .5) * .11 - wM.x * .05;
    float strokes = .5 + 1. * smoothstep(.3, .75, noise(dir * 3.4 + vec2(r * 8. - t * .28, wL.x * 2.)));
    float inside = smoothstep(0., -.025, dW);
    A *= 1. - .55 * uSelfA * smoothstep(.03, -.06, d) * inside;
    A += K(uSelfC) * layers(d, 9., .035, .012, .6) * strokes * uSelfA * inside;
  }

  // ---------- man ----------
  {
    float dens = layers(dS, 5., .01, .0035, tide) * uManA;
    A += K(mix(uManC, vec3(.6, .42, .38), uDull * .8)) * dens * 1.1 + K(gold) * dens * .4 * (1. - uDull) * uRing;
    float ring = exp(-pow((dS - .024) / .009, 2.)) * (1. - .5 * uDull);
    A *= 1. - .85 * ring * uRing;
    A += K(vec3(.98, .72, .18)) * ring * (.85 + .25 * sin(t * 1.6)) * uRing;
    float hollow = mix(1., step(.42, fract(atan(q.y - Sc.y, q.x) * 14. / 6.2832 + t * .012)), uHollow);
    ink += (pen(dS - .012 + wob * .4) * hollow + pen(dS - .037 - wob * .3) * step(.4, noise(q * 14. + 3.)) * .7 * (1. - uClock) * (1. - uBox)) * mix(mix(.35, .8, uHollow), 1., uManA) * uManI;
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
  A = A * m + K(uSky) * exp(-pow((dF + .006) / .006, 2.)) * .3 * m;

  vec3 col = vec3(.982, .972, .945) * exp(-A);
  col *= 1. + (H - Hx) * .2;
  col *= .985 + .03 * noise(frag * .02);
  gl_FragColor = vec4(col, 1.);
}`;

export function createPainter(canvas) {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
  if (!gl) return null;
  let locs = {};
  let lost = false;
  const sh = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  };
  let prog;
  const init = () => {
  prog = gl.createProgram();
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, 'attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }'));
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
  gl.bindAttribLocation(prog, 0, 'p');
  gl.linkProgram(prog);
  gl.useProgram(prog);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.viewport(0, 0, canvas.width, canvas.height);
  locs = {};
  };
  init();
  // a phone may take the graphics context away while the page is in the background
  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); lost = true; });
  canvas.addEventListener('webglcontextrestored', () => { init(); lost = false; });

  const loc = (n) => (n in locs ? locs[n] : (locs[n] = gl.getUniformLocation(prog, n)));

  return {
    resize(w, h) {
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    },
    // values: { name: number | [x, y] | [x, y, z] | Float32Array (vec4 array) }
    draw(values) {
      if (lost) return;
      for (const name in values) {
        const v = values[name];
        const l = loc(name);
        if (l === null) continue;
        if (typeof v === 'number') gl.uniform1f(l, v);
        else if (v instanceof Float32Array) gl.uniform4fv(l, v);
        else if (v.length === 2) gl.uniform2f(l, v[0], v[1]);
        else gl.uniform3f(l, v[0], v[1], v[2]);
      }
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
  };
}
