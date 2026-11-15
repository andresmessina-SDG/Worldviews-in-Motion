// The painting. One watercolor shader draws every worldview; what differs
// between them (places, palette, which motions run) arrives as uniforms,
// so one painting can turn into another by blending those values.
//
// Rules for adding to the painting:
// - A new part reads a uniform declared below and is wrapped in if (uX > .001), so that worldviews without it
//   pay nothing for it. A uniform named after a value in worldviews.js (uGlow for glow) is filled from it by
//   itself; any other must be worked out in main.js (frame). One left without a value would read as 0, and
//   its part would silently vanish, so the first painting reports any such in the browser's console.
// - The whole cost of the page is work per pixel, done millions of times a frame. Work a part out only
//   where it can show (the copies, the spirits and the soul skip every pixel out of their reach), keep
//   loops short, and remember that a move between two worldviews runs both worldviews' parts at once.
// - A shape that moves must carry its brushwork with it: take the noise for its edges and pen lines from
//   field(), centred on the shape (with layersAt and penW), not from the paper's noise, or its outline
//   will crawl and shimmer as it moves.
// - This is WebGL 1 (GLSL ES 1.0): loops need fixed bounds and arrays cannot be given values when declared,
//   so values chosen by index are picked with ?: (as the copies are).
// - The paper's grain and the finer wobble of every edge (H, wM, wF and the rest below) do not change while the
//   painting keeps its size and place, so BAKE paints them into two textures whenever it moves or is resized,
//   and each frame reads them back instead of working them out again. Noise that moves with time, or with a
//   shape (wL, field()), is worked out each frame as before.
// - Colour is laid down as pigment. A holds how much light each pixel's paint absorbs: K(colour) adds a
//   wash of that colour, A *= 1. - x lifts paint off, and the paper's colour is finally multiplied by exp(-A).

const FRAG = `
precision highp float;
uniform vec2 uRes, uCen;
uniform float uT, uUnit;

// where things stand
uniform vec2 uG, uW;            // y and radius of the Ultimate and of the world
uniform float uGx, uGf, uGb;    // the Ultimate's x, and how far it stands in front of the world or behind it
uniform float uSy;              // man
// palette
uniform vec3 uGlory, uSky, uFar, uLow, uDeep, uSea, uLand, uShade, uGodC, uGodRim, uStainC;
uniform float uBg, uWarm, uGodA;
// what is present, and what moves
uniform float uWave, uHaloL, uHaloR, uClock, uRing, uStainS;
uniform float uBox, uLat, uPulse, uBare, uManA;   // a squared, sealed world; its lattice of law; an empty upper page
uniform vec3 uManC;
uniform float uDrain, uPool, uHollow;
uniform float uSelfR, uSelfA;                        // colour that man spreads around himself, by his own hand
uniform vec3 uSelfC;
uniform float uOne, uMaya, uWorldA, uManI;           // all things as one ocean; the appearances rippling on it; how much of the world and of man is drawn
uniform float uStainUp, uLit;   // the stain lifted from man onto the cross; the world lit by God's own light
uniform float uScan;            // man measuring the lattice around him, by a light of his own
uniform vec4 uSp[9];            // spirits: where each is, how dark, how present
uniform float uSpA;
uniform float uBi;              // the Ultimate as a jade disc of Heaven, with a round hole at its centre
uniform float uYin, uMist;      // the world as yin and yang turning; a nameless source, painted as mist with no edge
uniform vec3 uSoul;             // the soul as a small light: where it is, and how much of it there is
uniform float uCopies, uCopyDark;  // copies of the eternal Forms, drifting in the world of becoming; how far they have darkened into shadows
uniform float uFlux, uBundle, uScatter;   // things arising and passing away; a self made of five parts; those parts drifting apart
uniform float uStainR, uStainA, uGlow, uDull, uRip, uRipY, uTick;
uniform vec3 uHands;            // second, minute and hour hands, radians clockwise from the top
uniform vec4 uLab[3];           // where lettering sits inside a shape, and its half size
uniform vec3 uLabA;             // how much each of those three names shows
uniform sampler2D uBakeA, uBakeB;  // the noise that stands still (see BAKE), when uBaked is 1
uniform float uBaked;

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
// fewer octaves, for noise carried with a shape: the finest ones fall below a pixel
float fbm3(vec2 p){
  float a = .5, s = 0.;
  for (int i = 0; i < 3; i++){ s += a * noise(p); p = M * p + vec2(17.1, 9.2); a *= .5; }
  return s * (.96875 / .875);              // the same average as five octaves
}
float paperH(vec2 f){ return .5 * noise(f * .42) + .3 * noise(f * .95 + 7.3) + .2 * noise(f * .13 + 3.1); }
float sdSeg(vec2 p, vec2 a, vec2 b){
  vec2 pa = p - a, ba = b - a;
  return length(pa - ba * clamp(dot(pa, ba) / max(dot(ba, ba), 1e-5), 0., 1.));
}
// a regular polygon of n sides, r from its centre to the middle of a side (n = 0 gives a circle)
float sdPoly(vec2 p, float r, float n){
  if (n < .5) return length(p) - r;
  float s = 6.2832 / n, a = atan(p.x, p.y) + 3.14159;
  return cos(floor(.5 + a / s) * s - a) * length(p) - r;
}
vec2 rot(vec2 v, float a){ float c = cos(a), s = sin(a); return vec2(c * v.x - s * v.y, s * v.x + c * v.y); }
vec3 K(vec3 c){ return -log(c); }

vec2 q, wL, wM, wF;
float H, PW;

// A wash built from five misregistered glazes, each with its own tide line.
// m and f are the noise that wobbles its edge: the paper's own, or noise carried along with a moving shape.
float layersAt(float d, float seed, float spread, float ew, float tide, vec2 m, vec2 f){
  float s = 0.;
  for (int i = 0; i < 5; i++){
    float fi = float(i);
    float a = seed + fi * 2.399;
    vec2 dir = vec2(cos(a), sin(a));
    float n = dot(m, dir) * 2.2 + dot(f, dir.yx) * .7;
    float di = d + n * spread + fi * spread * .12;
    s += smoothstep(ew, -ew, di) + exp(-pow((di + ew * 2.) / (ew * 2. + .003), 2.)) * tide;
  }
  return s * .2;
}
float layers(float d, float seed, float spread, float ew, float tide){ return layersAt(d, seed, spread, ew, tide, wM, wF); }
float bloomAt(vec2 p, float seed, vec2 l, vec2 m, vec2 f){
  float b = fbm(p * 1.7 + l * 1.3 + seed) + f.x * .05 + m.y * .06;
  return 1. - .32 * smoothstep(.55, .59, b) + .5 * exp(-pow((b - .548) / .016, 2.));
}
float bloom(vec2 p, float seed){ return bloomAt(p, seed, wL, wM, wF); }
float penW(float d, float pw){ return smoothstep(pw, pw * .3, abs(d)); }
float pen(float d){ return penW(d, PW); }
// The paper's noise, but sampled in a shape's own frame (r is the place relative to its centre), so that a shape
// that moves carries its brushwork with it: its edges, tide lines and pen strokes keep their look instead of crawling.
void field(vec2 r, out vec2 l, out vec2 m, out vec2 f, out float pw){
  l = vec2(fbm3(r * 1.2 + uT * .012), fbm3(r * 1.2 + vec2(31.7, 11.3) - uT * .012)) - .5;
  m = vec2(fbm(r * 4.5 + 5.), fbm(r * 4.5 + vec2(7., 23.))) - .5;
  f = vec2(fbm3(r * 22. + 1.), fbm3(r * 22. + vec2(13., 4.))) - .5;
  pw = .0028 * (.5 + noise(r * 9.));
}
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
  float Hx, grain;
  if (uBaked > .5) {
    vec2 at = frag / uRes;
    vec4 a = texture2D(uBakeA, at), b = texture2D(uBakeB, at);
    wM = a.xy - .5; wF = a.zw - .5; H = b.x; Hx = b.y; PW = .0028 * (.5 + b.z); grain = b.w;
  } else {
    wM = vec2(fbm(q * 4.5 + 5.), fbm(q * 4.5 + vec2(7., 23.))) - .5;
    wF = vec2(fbm(q * 22. + 1.), fbm(q * 22. + vec2(13., 4.))) - .5;
    H = paperH(frag);
    Hx = paperH(frag + vec2(1.2, 1.2));
    PW = .0028 * (.5 + noise(q * 9.));
    grain = noise(frag * .02);
  }

  float v1 = fbm(q * 1.1 + wL * 1.6 + 2.), v2 = fbm(q * 2.3 - wL * 2.2 + 7.);
  float blooms = mix(1., bloom(q, 1.) * bloom(q * 2.1, 5.), .22);
  float streaks = .8 + .4 * noise(vec2(q.x * 2.5 + wL.x * 3., q.y * 34. + wL.y * 8.));
  float wob = wM.x * .025 + wF.y * .006;
  vec2 hand = wL * .06;
  const float tide = .8;

  vec2 G = vec2(uGx, uG.x);  float rG = uG.y;
  vec2 Wc = vec2(0., uW.x); float rW = uW.y;
  vec2 Sc = vec2(0., uSy);  float rS = .066;
  // each shape's own noise, worked out only where it shows: over God, along the world's edge, and around man
  vec2 gL = wL, gM = wM, gF = wF, kL = wL, kM = wM, kF = wF, sL = wL, sM = wM, sF = wF;
  float gPW = PW, kPW = PW, sPW = PW;
  if (length(q - G) < rG * (1. + 1.5 * uOne) + .16 && uGodA > .001) field(q - G, gL, gM, gF, gPW);
  vec2 bq0 = abs(q - Wc) - (rW - .035);
  if (abs(mix(length(q - Wc) - rW, length(max(bq0, 0.)) + min(max(bq0.x, bq0.y), 0.) - .035, uBox)) < .1 && uWorldA > .001) field(q - Wc, kL, kM, kF, kPW);
  if (length(q - Sc) < .17) field(q - Sc, sL, sM, sF, sPW);
  float gwob = gM.x * .025 + gF.y * .006, kwob = kM.x * .025 + kF.y * .006, swob = sM.x * .025 + sF.y * .006;
  float dG = length(q + gL * .06 - G) - rG;
  vec2 bq = abs(q + kL.yx * .03 - Wc) - (rW - .035);
  float dW = mix(length(q + kL.yx * .06 - Wc) - rW, length(max(bq, 0.)) + min(max(bq.x, bq.y), 0.) - .035, uBox);
  float pres = smoothstep(0., .3, uGodA);                       // is there anything above at all
  float dS = length(q + sL * .024 - Sc) - rS;
  if (uBundle > .001) {
    // no single self: five small parts held loosely together, each going its own way
    float db = 1e3;
    for (int i = 0; i < 5; i++) {
      float fi = float(i);
      float a = fi * 1.2566 + t * (.04 + .025 * fi);
      float rr = (.056 + .01 * sin(t * .23 + fi * 2.1)) * (1. + 3.5 * uScatter);
      db = min(db, length(q + sL * .024 - Sc - vec2(cos(a), sin(a)) * rr) - (.021 + .003 * sin(t * .6 + fi)));
    }
    dS = mix(dS, db, uBundle);
  }
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
  if (uMist > .001) {
    // a source that cannot be named: ink mist with no edge, drifting
    float mr = length((q - G) * vec2(.72, 1.)) + (noise(q * 2.4 + vec2(t * .04, -t * .03)) - .5) * .4 * rG;
    float m = smoothstep(rG * 1.7, -rG * .3, mr);
    m *= m * (3. - 2. * m);
    A += K(uGodC) * m * uMist * (.4 + .5 * v1 + .3 * fbm(q * 3. + t * .02)) * mix(1., bloom(q * 1.7, 71.), .5);
  }

  // glory going out from God in slow waves
  float wave = max(0., sin((rg - rG) * 16. - t * .9 + wM.x * 2.));
  A *= 1. - .3 * uWave * wave * wave * exp(-(rg - rG) * 2.6) * smoothstep(rG, rG + .05, rg);

  A *= 1. - .93 * max(layersAt(dG, 11., .04, .0045, 0., gM, gF) * pres * (1. - uOne), layersAt(dW, 17., .04, .0045, 0., kM, kF) * uWorldA);
  float ink = 0.;

  // ---------- the world ----------
  {
    float dens = layersAt(dW, 2., .03, .0045, tide, kM, kF) * uWorldA;
    vec2 p = q - Wc;
    // drained: the wash thin at the top, heavier where it gathered
    dens *= mix(1., mix(.1, 1., smoothstep(.75, -1., p.y / rW + (v2 - .5) * 1.2)), uDrain);
    float gaveOut = mix(1., step(.5, noise(p * 4. + 2.)), uDrain);
    // nothing lasts: the wash gathers and thins by turns, and small rings open and vanish all over it
    if (uFlux > .001) {
      float ph = .5 + .5 * sin(t * .3 + 6.2832 * fbm(p * 2.2 + 31.));
      dens *= mix(1., .35 + .8 * smoothstep(.2, .8, ph), uFlux);
      vec2 fp = p + wM * .01;
      const float fc = .11;
      vec2 c = floor(fp / fc);
      float h = hash(c + 41.), life = fract(t * (.05 + .05 * h) + h * 7.);
      vec2 ctr = (c + .3 + .4 * vec2(hash(c + 3.), hash(c + 9.))) * fc;
      float ringF = smoothstep(.0032, .0012, abs(length(fp - ctr) - .006 - .03 * life)) * (1. - life) * smoothstep(0., .1, life) * step(.4, h);
      ink += ringF * smoothstep(-.012, -.04, dW) * uFlux * .75;
    }
    float m1 = smoothstep(.35, .65, fbm(p * 1.9 + wL * 1.2 + 4. + t * .02));
    float m2 = smoothstep(.45, .7, fbm(p * 2.6 - wL + 13. - t * .015));
    vec3 sea = mix(uSea, vec3(.42, .52, .58), uDull * .7);
    vec3 land = mix(uLand, vec3(.44, .51, .5), uDull * .7);
    // lit by God himself: his gold falling on the world from above, while the world keeps its own colours below
    float lit = uLit * smoothstep(-.75, .35, p.y / rW + (v1 - .5) * .7 + wM.x * .3);
    A *= 1. - .85 * lit * smoothstep(.02, -.04, dW);
    dens *= 1. - .5 * lit;
    sea = mix(sea, vec3(.99, .8, .42), lit);
    land = mix(land, vec3(.99, .9, .62), lit);
    vec3 Aw = K(sea) * dens * (1. - m1 * .7) * bloom(q * 2.6, 47.) * (.75 + .7 * v2);
    Aw += K(land) * dens * m1 * (.6 + .5 * v1);
    Aw += K(vec3(.86, .66, .3)) * dens * m2 * uWarm * (1. - .6 * uDull);
    Aw += K(mix(uShade, vec3(.95, .6, .3), lit)) * dens * smoothstep(-.3, 1., dot(p, vec2(.45, -.9)) / rW) * (.4 + .5 * v1);
    if (uYin > .001) {
      // yin and yang: two halves, each with a seed of the other, turning slowly for ever
      vec2 u = rot(p + wM * .012, t * .06);
      float R = rW, sw = .014;
      float jag = (noise(u * 11. + 5.) - .5) * .018;
      float dark = smoothstep(-sw, sw, u.x + jag);
      dark = mix(dark, 0., smoothstep(sw, -sw, length(u - vec2(0., R * .5)) - R * .5 + jag));
      dark = mix(dark, 1., smoothstep(sw, -sw, length(u + vec2(0., R * .5)) - R * .5 + jag));
      dark = mix(dark, 1., smoothstep(sw, -sw, length(u - vec2(0., R * .5)) - R * .13 + jag));
      dark = mix(dark, 0., smoothstep(sw, -sw, length(u + vec2(0., R * .5)) - R * .13 + jag));
      vec3 At = K(uSea) * dens * dark * (.8 + .6 * v1) * bloom(q * 2.2, 13.) + K(uLand) * dens * (1. - dark) * (.5 + .6 * v2);
      Aw = mix(Aw, At, uYin);
    }
    A += Aw;
    ink += penW(dW + .01 - kwob, kPW) * gaveOut + penW(dW - .024 + kwob * 1.3, kPW) * step(.5, noise(p * 5. + 8.)) * (1. - uClock) * mix(1., .6, uDrain);

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

      // science: the stretch of the lattice man has measured, lit by his own small lamp and no other.
      // Rings go out from him, stop where his reach ends, and never pass the walls.
      if (uScan > .001) {
        vec2 sp = gp - vec2(0., uSy - Wc.y);
        float sr = length(sp), R = .25 + .015 * sin(t * .4);
        float reach = smoothstep(R, R - .09, sr + (noise(gp * 9. + t * .05) - .5) * .04) * inside * uScan;
        A *= 1. - .6 * reach;
        A += K(vec3(.97, .93, .8)) * reach * .18;
        float node = step(.5, hash(cell)) * smoothstep(R, R - .05, length(cell * cs - vec2(0., uSy - Wc.y)));
        ink += smoothstep(.0028, .001, abs(length(gp - cell * cs) - .017)) * node * inside * uScan * .9;
        float sweep = fract(t * .12);
        ink += smoothstep(.0026, .0008, abs(sr - .07 - sweep * (R - .07))) * step(.45, fract(atan(sp.y, sp.x) * 18. / 6.2832))
             * (1. - sweep) * inside * uScan * .8;
      }
    }
  }

  // ---------- copies of the Forms: circle, triangle, square and hexagon, each a little wrong and never the same twice.
  //            In the cave they darken and spread into shadows. ----------
  if (uCopies > .001 && dW < .01) {                 // (only inside the world, and only near each copy: the rest of the page skips this)
    float inW = smoothstep(.0, -.03, dW) * uWorldA;
    for (int i = 0; i < 4; i++) {
      float fi = float(i);
      vec2 off = i == 0 ? vec2(-.19, .1) : i == 1 ? vec2(-.1, .2) : i == 2 ? vec2(.1, .2) : vec2(.19, .1);
      float n = i == 0 ? 0. : i == 1 ? 3. : i == 2 ? 4. : 6.;
      vec2 c = Wc + off + .016 * vec2(sin(t * .21 + fi * 1.7), cos(t * .17 + fi * 2.3));
      if (length(q - c) > .11) continue;
      vec2 lp = rot(q - c, .4 * sin(t * .11 + fi * 1.3) + fi * .7);
      lp += (vec2(noise(lp * 7. + t * .15 + fi * 5.), noise(lp * 7. - t * .13 + fi * 5. + 9.)) - .5) * mix(.014, .03, uCopyDark);
      float sz = .036 * (1. + .14 * sin(t * .3 + fi * 1.7)) * (1. + .3 * uCopyDark);
      float d = sdPoly(lp, sz, n);
      float blur = mix(.006, .022, uCopyDark);
      float fill = smoothstep(blur, -blur * 1.5, d);
      vec3 col = mix(vec3(.58, .52, .8), uStainC, uCopyDark);
      A += K(col) * fill * mix(.55, .9, uCopyDark) * (.75 + .5 * v1) * inW * uCopies;
      ink += smoothstep(.0026, .0008, abs(d + .002)) * .55 * (1. - uCopyDark) * step(.35, noise(lp * 30. + fi)) * inW * uCopies;
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
    float dens = layersAt(dG, 1., mix(.03, .1, uOne), mix(.0045, .03, uOne), mix(tide, .25, uOne), gM, gF) * uGodA;
    vec2 gq = q - G;
    float gv1 = v1, gv2 = v2;
    if (dens > .001) { gv1 = fbm(gq * 1.1 + gL * 1.6 + 2.); gv2 = fbm(gq * 2.3 - gL * 2.2 + 7.); }
    // going round: in front of the world it covers what lies under it; behind, the world hides it
    float inG = smoothstep(.012, -.02, dG) * pres, inW = smoothstep(.004, -.02, dW) * uWorldA;
    A *= 1. - .88 * uGf * inG;
    ink *= 1. - uGf * inG;
    dens *= 1. - .93 * uGb * inW;
    float hole = length(q + gL * .06 - G) - rG * .34;
    dens *= mix(1., smoothstep(-.012, .014, hole), uBi);
    float ink0 = ink;
    float bandsG = mix(1., .6 + .5 * sin(rg * 15. + gM.x * 7. + gL.y * 5. - t * .15), uMaya);
    float core = mix(.42, 1.05, smoothstep(0., rG, rg + gM.x * .1));
    A += K(uGodC) * dens * core * bloomAt(gq * 2.4, 31., gL, gM, gF) * (.85 + .6 * gv2);
    A += K(uGodRim) * dens * smoothstep(rG * .5, rG, rg + gM.y * .15) * (.2 + .55 * gv1) * bandsG;
    A *= 1. - .35 * uOne * exp(-rg * rg / .03);
    ink += (penW(dG + .012 + gwob, gPW) + penW(dG - .02 - gwob * 1.4, gPW) * step(.45, noise(gq * 6. + 2.))) * (1. - uOne) * (1. - .93 * uGb * inW);
    ink += penW(hole + .004 - gwob * .6, gPW) * uBi;
    // the many things: rings drawn on the surface, moving outward and never arriving
    if (uMaya > .001) {
      float rr = length(q + gL * .06 - G);
      float u = rr * 6.5 - t * .04;
      float id = floor(u);
      ink += penW((fract(u) - .5) / 6.5, gPW) * step(.42, noise(gq * 4.5 + id * 7.3)) * smoothstep(.05, .13, rr) * smoothstep(rG + .2, rG - .06, rr) * .6 * uMaya;
    }
    // drawn by hand, each ring turning at its own pace
    float loose = penW(dG - .075 + gwob * .8, gPW) * step(.4, noise(rot(gq, t * .05) * 4. + 5.)) * .8;
    loose += penW(dG - .13 - gwob, gPW) * step(.55, noise(rot(gq, -t * .035) * 3. + 9.)) * .6;
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
    vec2 sc = mix(Sc + vec2(-.02, -.02), vec2(0., .03), uStainUp);
    if (uStainA > .001 && length(q - sc) < uStainR + .22) {
      vec2 cL, cM, cF; float cPW;
      field(q - sc, cL, cM, cF, cPW);
      float creep = fbm((q - sc) * 5. + vec2(t * .05, -t * .04)) - .5;
      float d = length(q + cL * .12 + cM * .05 - sc) - uStainR * (1. + .07 * sin(t * .8)) - cM.x * .06 - creep * .07;
      A += K(uStainC) * layersAt(d, 6., mix(.03, .05, uStainS), mix(.012, .03, uStainS), mix(.5, .3, uStainS), cM, cF) * uStainA;
    }
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

  // ---------- spirits: small lights wandering the world, or dark presences pressing in ----------
  if (uSpA > .001) {
    for (int i = 0; i < 9; i++) {
      vec4 s = uSp[i];
      if (s.w < .002) continue;                     // (gone, as all but the soul are in Platonism)
      float d = length(q + hand * .3 - s.xy);
      if (d > .3) continue;                         // (too far for any of its light to reach)
      float g1 = exp(-pow(d / .022, 2.)), g2 = exp(-pow(d / .048, 2.)), g3 = exp(-pow(d / .085, 2.));
      float lightA = s.w * (1. - s.z);
      A *= 1. - lightA * min(.92, .62 * g3 + .4 * g2);
      A += K(vec3(.99, .86, .5)) * lightA * (g1 * .55 + g2 * .12);
      A += K(uStainC) * s.w * s.z * (g2 * 1.1 + g1 * .6);
      ink += pen(d - .019 - wob * .4) * s.w * .55 * step(.3, noise(q * 20. + float(i) * 3.1 + t * .3));
    }
  }

  // ---------- man ----------
  {
    float dens = layersAt(dS, 5., .01, .0035, tide, sM, sF) * uManA;
    A += K(mix(uManC, vec3(.6, .42, .38), uDull * .8)) * dens * 1.1 + K(gold) * dens * .4 * (1. - uDull) * uRing;
    float ring = exp(-pow((dS - .024) / .009, 2.)) * (1. - .5 * uDull);
    A *= 1. - .85 * ring * uRing;
    A += K(vec3(.98, .72, .18)) * ring * (.85 + .25 * sin(t * 1.6)) * uRing;
    float hollow = mix(1., step(.42, fract(atan(q.y - Sc.y, q.x) * 14. / 6.2832 + t * .012)), uHollow);
    ink += (penW(dS - .012 + swob * .4, sPW) * hollow + penW(dS - .037 - swob * .3, sPW) * step(.4, noise((q - Sc) * 14. + 3.)) * .7 * (1. - uClock) * (1. - uBox)) * mix(mix(.35, .8, uHollow), 1., uManA) * uManI;
  }

  // ---------- the soul: a small gold light, in the body or climbing out of it ----------
  float dSoul = length(q - uSoul.xy);
  if (uSoul.z > .001 && dSoul < .3) {
    float d = dSoul;
    float c1 = exp(-pow(d / .017, 2.)), c2 = exp(-pow(d / .045, 2.)), c3 = exp(-pow(d / .09, 2.));
    A *= 1. - uSoul.z * min(.9, .75 * c2 + .3 * c3);
    A += K(vec3(1., .82, .4)) * uSoul.z * (c1 * 1.1 + c2 * .28);
  }

  A += K(vec3(.2, .13, .1)) * min(ink, 1.) * (.5 + H);

  // lettering inside a shape: paper lifted a little with a damp brush
  float lift = 0.;
  for (int i = 0; i < 3; i++){
    vec4 L = uLab[i];
    float a = i == 0 ? uLabA.x : i == 1 ? uLabA.y : uLabA.z;
    if (a <= .001) continue;
    vec2 b = abs(q + wM * .02 - L.xy) - L.zw + .03;
    lift = max(lift, a * smoothstep(.05, -.02, length(max(b, 0.)) + min(max(b.x, b.y), 0.) - .03 + wF.x * .01));
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
  col *= .985 + .03 * grain;
  gl_FragColor = vec4(col, 1.);
}`;

// The noise that stands still, in two textures the size of the canvas: the middle and fine wobble (wM, wF) in
// the first; the paper's grain and its light (H, Hx), the pen's width and the paper's tone in the second.
// Every value lies between 0 and 1, as a texture holds it.
const BAKE = `
precision highp float;
uniform vec2 uCen;
uniform float uUnit, uPart;
${FRAG.slice(FRAG.indexOf('float hash('), FRAG.indexOf('float sdSeg('))}
void main(){
  vec2 frag = gl_FragCoord.xy, q = (frag - uCen) / uUnit;
  if (uPart < .5) gl_FragColor = vec4(fbm(q * 4.5 + 5.), fbm(q * 4.5 + vec2(7., 23.)), fbm(q * 22. + 1.), fbm(q * 22. + vec2(13., 4.)));
  else gl_FragColor = vec4(paperH(frag), paperH(frag + vec2(1.2, 1.2)), noise(q * 9.), noise(frag * .02));
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
  let prog, bakeProg, checked = false;
  const uniforms = new Set();          // the uniforms the shader uses (an array as uSp[0])
  const OWN = new Set(['uBakeA', 'uBakeB', 'uBaked']);   // (set here, not by main.js)
  const link = (frag) => {
    const pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, 'attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }'));
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, frag));
    gl.bindAttribLocation(pr, 0, 'p');
    gl.linkProgram(pr);
    return pr;
  };
  // the baked noise: two textures, each with a framebuffer to paint into it; bakedAt says for which size and place
  let bakeTex = [], bakeFb = [], bakeLoc = {}, bakedAt = '', canBake = false;
  const makeBake = () => {
    bakeTex = []; bakeFb = []; bakedAt = '';
    for (let i = 0; i < 2; i++) {
      const tex = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0 + i);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, canvas.width, canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      for (const [k, v] of [[gl.TEXTURE_MIN_FILTER, gl.NEAREST], [gl.TEXTURE_MAG_FILTER, gl.NEAREST], [gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE], [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE]]) gl.texParameteri(gl.TEXTURE_2D, k, v);
      const fb = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      canBake = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
      bakeTex.push(tex); bakeFb.push(fb);
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  };
  const bake = (cen, u) => {
    const key = `${canvas.width},${canvas.height},${cen[0]},${cen[1]},${u}`;
    if (key === bakedAt) return;
    bakedAt = key;
    gl.useProgram(bakeProg);
    gl.uniform2f(bakeLoc.uCen, cen[0], cen[1]);
    gl.uniform1f(bakeLoc.uUnit, u);
    for (let i = 0; i < 2; i++) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, bakeFb[i]);
      gl.uniform1f(bakeLoc.uPart, i);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.useProgram(prog);
  };
  const init = () => {
  prog = link(FRAG);
  bakeProg = link(BAKE);
  bakeLoc = { uCen: gl.getUniformLocation(bakeProg, 'uCen'), uUnit: gl.getUniformLocation(bakeProg, 'uUnit'), uPart: gl.getUniformLocation(bakeProg, 'uPart') };
  gl.useProgram(prog);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.viewport(0, 0, canvas.width, canvas.height);
  locs = {};
  uniforms.clear();
  for (let i = 0, n = gl.getProgramParameter(prog, gl.ACTIVE_UNIFORMS); i < n; i++) uniforms.add(gl.getActiveUniform(prog, i).name);
  checked = false;
  gl.uniform1i(gl.getUniformLocation(prog, 'uBakeA'), 0);
  gl.uniform1i(gl.getUniformLocation(prog, 'uBakeB'), 1);
  makeBake();
  gl.uniform1f(gl.getUniformLocation(prog, 'uBaked'), canBake ? 1 : 0);
  };
  init();
  // a phone may take the graphics context away while the page is in the background
  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); lost = true; });
  canvas.addEventListener('webglcontextrestored', () => { init(); lost = false; });

  const loc = (n) => (n in locs ? locs[n] : (locs[n] = gl.getUniformLocation(prog, n)));

  return {
    uniforms,
    resize(w, h) {
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
        for (const tex of bakeTex) gl.deleteTexture(tex);
        for (const fb of bakeFb) gl.deleteFramebuffer(fb);
        makeBake();
      }
    },
    // values: { name: number | [x, y] | [x, y, z] | Float32Array (vec4 array) }
    draw(values) {
      if (lost) return;
      if (!checked) {
        checked = true;
        const missing = [...uniforms].filter((n) => !(n in values) && !OWN.has(n));
        if (missing.length) console.error(`paint.js: no value for ${missing.join(', ')}`);
      }
      for (const name in values) {
        const v = values[name];
        const l = loc(name);
        if (l === null) continue;
        if (typeof v === 'number') gl.uniform1f(l, v);
        else if (v instanceof Float32Array) gl.uniform4fv(l, v);
        else if (v.length === 2) gl.uniform2f(l, v[0], v[1]);
        else gl.uniform3f(l, v[0], v[1], v[2]);
      }
      if (canBake) bake(values.uCen, values.uUnit);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
  };
}
