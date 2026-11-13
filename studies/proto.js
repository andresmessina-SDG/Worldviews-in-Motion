// Four ink-and-wash prototypes, each a different worldview in its own palette.
// Pick with ?p=1|2|3|4.

const PROTOS = {
  1: {
    name: 'Christian Theism',
    tag: 'Creator and creation: distinct, and joined from above.',
    labels: [
      ['The triune God', 0, 0.56, ''],
      ['Christ the Mediator', 0.07, 0.1, 'left'],
      ['Image-bearer', 0.09, -0.39, 'left'],
      ['Sin', -0.16, -0.45, 'right'],
      ['The created world', 0, -0.66, ''],
      ['Creation', -0.84, -0.8, 'small'],
      ['Fall', -0.32, -0.8, 'small'],
      ['Redemption', 0.2, -0.8, 'small now'],
      ['Consummation', 0.72, -0.8, 'small'],
    ],
  },
  2: {
    name: 'Naturalism',
    tag: 'The cosmos is all there is: a closed system of cause and effect.',
    labels: [
      ['The cosmos: all there is', 0, 0.3, ''],
      ['Matter that thinks', 0.09, -0.05, 'left'],
      ['Nothing beyond the cosmos', 0, 0.69, ''],
      ['Cause and effect, unbroken', 0, -0.36, ''],
      ['Time, without a goal', 0, -0.8, ''],
    ],
  },
  3: {
    name: 'Hindu Monism',
    tag: 'All is one, and the one is Brahman.',
    labels: [
      ['Brahman: the One', 0, 0.22, ''],
      ['Atman: the self', 0.22, -0.08, 'left'],
      ['Avidya: ignorance', 0.03, -0.2, 'right'],
      ['Maya: the world of appearances', 0, -0.4, ''],
      ['Samsara: the wheel of rebirth', 0, -0.78, ''],
    ],
  },
  4: {
    name: 'Nihilism',
    tag: 'Nothing above, and no meaning within.',
    labels: [
      ['A cosmos drained of meaning', 0, 0.3, ''],
      ['The self, an accident', 0.09, 0.06, 'left'],
      ['Value runs off the page', 0, -0.72, ''],
    ],
  },
};
const params = new URLSearchParams(location.search);
const proto = PROTOS[params.get('p')] ? Number(params.get('p')) : 1;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform float uScene;
uniform float uUnit;
uniform vec4 uLab[12];

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
float sdBox(vec2 p, float h, float r){
  vec2 b = abs(p) - h + r;
  return length(max(b, 0.)) + min(max(b.x, b.y), 0.) - r;
}
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
float splatter(float thr){ return splat(q, 14., thr, 1.) + splat(q + 7.3, 31., thr, 2.) + splat(q, 60., .93, 3.); }
// A pen line following the contour d = 0.
float pen(float d){ return smoothstep(PW, PW * .3, abs(d)); }
float broken(float k, float seed, float thr){ return step(thr, noise(q * k + seed)); }
float chev(vec2 c, vec2 dir, float s){
  vec2 n = vec2(-dir.y, dir.x);
  vec2 p = q + wM * .006;
  return pen(min(sdSeg(p, c, c - dir * s + n * s), sdSeg(p, c, c - dir * s - n * s)));
}
float dryStroke(vec2 a, vec2 b, float head){
  vec2 p = q + wL * .02;
  float d = sdSeg(p, a, b) - .011 * (.7 + .6 * noise(vec2(q.x * 3., 1.)));
  float da = min(sdSeg(p, b + vec2(.03, 0.), b + vec2(-.035, .04)), sdSeg(p, b + vec2(.03, 0.), b + vec2(-.035, -.04))) - .008;
  float dry = smoothstep(.3, .5, H + .3 * noise(vec2(q.x * 5., q.y * 90.)));
  return smoothstep(.004, -.004, d) * dry + smoothstep(.004, -.004, da) * head;
}

void main(){
  vec2 frag = gl_FragCoord.xy;
  q = (frag - .5 * uRes) / uUnit;
  float t = uTime * .015;

  wL = vec2(fbm(q * 1.2 + t), fbm(q * 1.2 + vec2(31.7, 11.3) - t)) - .5;
  wM = vec2(fbm(q * 4.5 + 5.), fbm(q * 4.5 + vec2(7., 23.))) - .5;
  wF = vec2(fbm(q * 22. + 1.), fbm(q * 22. + vec2(13., 4.))) - .5;
  H = paperH(frag);
  float Hx = paperH(frag + vec2(1.2, 1.2));
  PW = .0028 * (.5 + noise(q * 9.));

  float v1 = fbm(q * 1.1 + wL * 1.6 + 2.), v2 = fbm(q * 2.3 - wL * 2.2 + 7.);
  float blooms = mix(1., bloom(q, 1.) * bloom(q * 2.1, 5.), .22);
  float streaks = .8 + .4 * noise(vec2(q.x * 2.5 + wL.x * 3., q.y * 34. + wL.y * 8.));
  float patches = mix(.8, 1., smoothstep(.3, .5, fbm(q * 1.4 + wL + 20.) + .12));
  float wob = wM.x * .025 + wF.y * .006;
  vec2 hand = wL * .06;
  float tide = .8;

  vec3 A = vec3(0.);
  float ink = 0.;
  vec3 edgeTint = vec3(.9, .7, .5);
  vec3 inkCol = vec3(.2, .13, .1);

  if (uScene < 1.5) {
    // ================= Christian theism: two realms, a bridge from above =================
    vec2 G = vec2(0., .47);   float rG = .29;
    vec2 Wc = vec2(0., -.43); float rW = .36;
    vec2 Sc = vec2(0., -.4);
    float dG = length(q + hand - G) - rG;
    float dW = length(q + hand.yx - Wc) - rW;
    float dS = length(q + hand * .4 - Sc) - .058;
    float dB = sdSeg(q + hand * .5, vec2(0., .2), vec2(0., -.33)) - .026;
    float dX = sdSeg(q + hand * .5, vec2(-.085, 0.), vec2(.085, 0.)) - .022;
    float rg = length(q - G), rw = length(q - Wc);

    vec3 glory = vec3(1., .94, .66), apricot = vec3(.97, .76, .56), mauve = vec3(.8, .7, .82);
    vec3 aqua = vec3(.72, .88, .85), blue = vec3(.5, .68, .8);
    edgeTint = apricot;

    float up = smoothstep(-.28, .18, q.y + (v1 - .5) * .7 + wM.x * .15);
    float nearG = exp(-pow(max(rg - rG, 0.) / .5, 2.));
    A = up * (K(glory) * nearG * .8 + K(apricot) * (1. - nearG) * (.35 + 1.1 * v2) + K(mauve) * smoothstep(.45, 1.5, rg) * (.3 + 1.5 * v1))
      + (1. - up) * (K(aqua) * (.45 + .9 * v2) + K(blue) * smoothstep(.3, 1.3, rw) * (.4 + 1.5 * v1));
    A *= blooms * streaks * .5 * patches;
    A *= 1. - .93 * max(layers(dG, 11., .04, .0045, 0.), layers(dW, 17., .04, .0045, 0.));

    // the Ultimate: gold leaf warming to rose at the rim, pale at the heart
    float dens = layers(dG, 1., .03, .0045, tide);
    float core = mix(.42, 1.05, smoothstep(0., rG, rg + wM.x * .1));
    A += K(vec3(.98, .78, .3)) * dens * core * bloom(q * 2.4, 31.) * (.85 + .6 * v2);
    A += K(vec3(.9, .46, .34)) * dens * smoothstep(rG * .5, rG, rg + wM.y * .15) * (.2 + .55 * v1);

    // creation: many colours held within one boundary
    dens = layers(dW, 2., .03, .0045, tide);
    vec2 p = q - Wc;
    float m1 = smoothstep(.35, .65, fbm(p * 1.9 + wL * 1.2 + 4.));
    float m2 = smoothstep(.45, .7, fbm(p * 2.6 - wL + 13.));
    float bl = bloom(q * 2.6, 47.);
    A += K(vec3(.22, .6, .66)) * dens * (1. - m1 * .7) * bl * (.75 + .7 * v2);
    A += K(vec3(.3, .62, .42)) * dens * m1 * (.6 + .5 * v1);
    A += K(vec3(.86, .66, .3)) * dens * m2 * .55;
    A += K(vec3(.14, .28, .5)) * dens * smoothstep(-.3, 1., dot(p, vec2(.45, -.9)) / rW) * (.4 + .5 * v1);

    A *= 1. - .7 * exp(-pow(length(q - Sc) / .16, 2.));   // remedy: light lifted around the self

    float streak = .75 + .5 * noise(vec2(q.x * 120., q.y * 6.));
    float db = layers(dB, 3., .012, .004, tide) * streak;
    float dx = layers(dX, 4., .012, .004, tide) * (.75 + .5 * noise(vec2(q.x * 6., q.y * 120.)));
    A += K(vec3(.68, .1, .14)) * (db + dx * (1. - .5 * db)) * 1.15;

    float dP = length(q + wL * .12 + wM * .05 - Sc - vec2(-.03, -.03)) - .1 - wM.x * .06;
    A += K(vec3(.13, .11, .22)) * layers(dP, 6., .03, .012, .5) * .5;

    dens = layers(dS, 5., .01, .0035, tide);
    A += K(vec3(.9, .5, .3)) * dens * 1.1 + K(vec3(.98, .78, .3)) * dens * .4;

    A += K(vec3(.45, .3, .24)) * dryStroke(vec2(-1.05, -.87), vec2(1.05, -.87), 1.) * .8;

    // ink: loose outlines, and halo rings instead of rays
    ink += pen(dG + .012 + wob) + pen(dG - .02 - wob * 1.4) * broken(6., 2., .45);
    ink += pen(dG - .075 + wob * .8) * broken(4., 5., .4) * .8;
    ink += pen(dG - .13 - wob) * broken(3., 9., .55) * .6;
    float ang = atan(q.y - G.y, q.x - G.x);
    ink += smoothstep(.006, .003, abs(dG - .185)) * step(.72, fract(ang * 60. / 6.2832)) * .7;
    ink += pen(dW + .01 - wob) + pen(dW - .024 + wob * 1.3) * broken(5., 8., .5);
    ink += pen(dS - .012 + wob * .4) + pen(min(dB, dX) - .01 + wob * .4);
    ink += chev(vec2(-.07, .1), vec2(0., -1.), .028) + chev(vec2(-.07, .15), vec2(0., -1.), .028);
    for (int i = 0; i < 4; i++){
      float tx = -.84 + .52 * float(i);
      ink += pen(sdSeg(q + wM * .006, vec2(tx, -.845), vec2(tx, -.895)));
    }
    A += K(vec3(.98, .76, .25)) * exp(-pow((dS - .022) / .009, 2.)) * .9;

  } else if (uScene < 2.5) {
    // ================= Naturalism: one sealed box, nothing above =================
    vec2 C = vec2(0., -.03);
    vec2 p = q + hand * .35 - C;
    float dBx = sdBox(p, .45, .035);
    vec2 Sc = vec2(0., -.05);
    float dS = length(q + hand * .3 - Sc) - .06;

    vec3 slate = vec3(.66, .74, .8), sage = vec3(.76, .8, .74), rust = vec3(.82, .56, .4);
    edgeTint = slate;
    A = K(slate) * (.3 + 1. * v2) + K(sage) * (.5 * v1) + K(rust) * smoothstep(.58, .75, v1) * .3;
    A *= blooms * streaks * .7 * patches;
    A *= mix(1., .28, smoothstep(.2, .85, q.y + wL.y * .4));      // the upper page left almost bare
    A *= 1. - .93 * layers(dBx, 11., .02, .004, 0.);

    float dens = layers(dBx, 2., .014, .004, tide);
    float bl = bloom(q * 2.2, 47.);
    A += K(vec3(.44, .58, .7)) * dens * bl * (.6 + .8 * v2);
    A += K(vec3(.2, .3, .44)) * dens * smoothstep(-.2, 1., dot(p, vec2(.3, -.9)) / .45) * (.4 + .6 * v1);
    A += K(rust) * dens * smoothstep(.55, .72, fbm(p * 2.4 + 9.)) * .5;
    A += K(vec3(.5, .62, .5)) * dens * smoothstep(.5, .7, fbm(p * 2. + 31.)) * .4;

    dens = layers(dS, 5., .01, .0035, tide);
    A += K(vec3(.24, .36, .5)) * dens * 1.1;

    A += K(vec3(.36, .34, .36)) * dryStroke(vec2(-1.05, -.87), vec2(1., -.87), 0.) * .7 * smoothstep(.75, -.5, q.x + (H - .5) * .5);

    // ink: ruled outlines and the lattice of law inside
    float inside = smoothstep(.0, -.02, dBx);
    vec2 gp = p + wM * .012;
    float gx = abs(fract(gp.x / .15 + .5) - .5) * .15;
    float gy = abs(fract(gp.y / .15 + .5) - .5) * .15;
    ink += (smoothstep(PW * .8, PW * .2, gx) + smoothstep(PW * .8, PW * .2, gy)) * inside * .3 * broken(7., 3., .3);
    vec2 cell = floor(gp / .15 + .5);
    float node = length(gp - cell * .15) - .009;
    ink += smoothstep(.003, 0., node) * inside * step(.45, hash(cell)) * .7;
    ink += pen(dBx + .012 + wob * .4) + pen(dBx - .018 - wob * .5) * broken(5., 2., .4);
    ink += pen(dS - .012 + wob * .4);
    vec2 gc = q + hand * .4 - vec2(0., .69);
    ink += pen(length(gc) - .13) * step(.5, fract(atan(gc.y, gc.x) * 22. / 6.2832)) * .55;
    // cause runs to effect: small arrowheads along the lattice
    vec2 ac = (cell + vec2(.5, 0.)) * .15;
    if (hash(cell + 4.) > .55) ink += smoothstep(PW, PW * .3, min(sdSeg(gp, ac, ac + vec2(-.014, .012)), sdSeg(gp, ac, ac + vec2(-.014, -.012)))) * inside * .7;

  } else if (uScene < 3.5) {
    // ================= Hindu monism: one ocean, no edges =================
    vec2 C = vec2(0., -.02);
    float r = length(q - C + wL * .14);
    vec2 Sc = vec2(.14, -.08);
    float dS = length(q + hand * .3 - Sc) - .055;

    vec3 saffron = vec3(.99, .72, .26), magenta = vec3(.86, .3, .5), violet = vec3(.5, .32, .64), marigold = vec3(.96, .52, .16);
    edgeTint = magenta;
    float bands = .5 + .5 * sin(r * 15. + wM.x * 7. + wL.y * 5.);
    A = K(saffron) * (.2 + .7 * exp(-r * r / .5)) * (.6 + .8 * v2)
      + K(magenta) * smoothstep(.15, .9, r) * (.15 + .8 * v1) * (.45 + .7 * bands)
      + K(violet) * smoothstep(.75, 1.5, r) * (.3 + 1.1 * v2);
    A *= blooms * streaks * (.55 + .3 * patches);

    float dOne = r - .48;
    float dens = layers(dOne, 1., .1, .03, .25);
    A += K(marigold) * dens * (.35 + .5 * v2) * bloom(q * 2.2, 31.);
    A += K(vec3(.9, .4, .42)) * dens * smoothstep(.1, .5, r) * (.2 + .5 * v1) * (.6 + .5 * bands);
    A *= 1. - .35 * exp(-r * r / .03);

    float dP = length(q + wL * .1 - Sc) - .13 - wM.x * .05;
    A += K(vec3(.36, .22, .4)) * layers(dP, 6., .04, .02, .3) * .55;
    dens = layers(dS, 5., .01, .0035, tide);
    A += K(vec3(.74, .16, .24)) * dens * .8 + K(vec3(.96, .52, .16)) * dens * .5;


    // ink: ripples in the ocean, and the wheel that binds
    float rr = length(q + hand - C);
    ink += pen(rr - .2 + wob) * broken(5., 1., .55) * .5;
    ink += pen(rr - .34 - wob) * broken(4., 6., .5) * .5;
    ink += pen(rr - .5 + wob * 1.3) * broken(3.5, 11., .45) * .6;
    ink += pen(rr - .66 + wob * .5) + pen(rr - .69 - wob * .6) * broken(4., 4., .3);
    float ang = atan(q.y - C.y, q.x - C.x);
    float sa = abs(fract(ang * 12. / 6.2832 + .5) - .5) * 6.2832 / 12. * rr;
    ink += smoothstep(PW * 1.2, PW * .4, sa) * smoothstep(.69, .7, rr) * smoothstep(.76, .75, rr);
    float sang = atan(q.y - Sc.y, q.x - Sc.x);
    ink += pen(dS - .014 + wob * .4) * step(.45, fract(sang * 11. / 6.2832));
    for (int i = 0; i < 3; i++){
      float a = .6 + 2.0944 * float(i);
      vec2 c = C + .675 * vec2(cos(a), sin(a));
      ink += chev(c, vec2(-sin(a), cos(a)), .035);
    }

  } else {
    // ================= Nihilism: the box, with its pigment running off =================
    vec2 C = vec2(0., .1);
    vec2 p = q + hand * .35 - C;
    float dBx = sdBox(p, .38, .03);
    float y0 = C.y - .38;

    vec3 payne = vec3(.4, .43, .5), ash = vec3(.74, .74, .76), sepia = vec3(.78, .7, .6);
    edgeTint = ash;
    A = K(ash) * (.15 + .6 * v2) * smoothstep(.42, .6, fbm(q * 1.4 + wL + 20.)) + K(sepia) * smoothstep(.55, .75, v1) * .35;
    A *= blooms * streaks;

    // the wash has drained: thin at the top, heavier where it gathered
    float drain = mix(.12, 1., smoothstep(.3, -.4, p.y + (v2 - .5) * .5));
    float dens = layers(dBx, 2., .02, .004, tide) * drain;
    A += K(payne) * dens * bloom(q * 2.6, 47.) * bloom(q * 4., 3.) * (.5 + .8 * v2);
    A += K(vec3(.2, .22, .3)) * dens * smoothstep(.0, -.38, p.y) * (.2 + .5 * v1);

    // drips
    vec2 dp = q + wM * .012;
    float cw = .075, cid = floor(dp.x / cw), drip = 0.;
    for (int i = -1; i <= 1; i++){
      float id = cid + float(i);
      float hx = hash(vec2(id, 7.));
      float cx = (id + .25 + .5 * hash(vec2(id, 3.))) * cw;
      if (abs(cx - C.x) > .35 || hx < .3) continue;
      float L = .08 + .6 * hx * hash(vec2(id, 5.));
      float wd = .005 + .009 * hash(vec2(id, 9.));
      float bulb = smoothstep(y0 - L + .05, y0 - L, dp.y);
      float d = sdSeg(dp, vec2(cx, y0 + .03), vec2(cx, y0 - L)) - wd * (1. + .9 * bulb);
      drip = max(drip, smoothstep(.003, -.003, d) * (.45 + .6 * bulb));
    }
    A += K(payne) * drip * 1.1;

    // where it pools along the bottom of the sheet
    float dPool = q.y + .8 + (v2 - .5) * .22 + wM.x * .05;
    A += K(vec3(.34, .36, .44)) * layers(dPool, 8., .03, .006, .9) * (.35 + .6 * v1) * bloom(q * 3., 9.);


    // ink: an outline giving out, and a self with nothing inside
    ink += pen(dBx + .012 + wob * .5) * broken(4., 2., .5) * .8;
    ink += pen(dBx - .018 - wob * .5) * broken(5., 7., .62) * .6;
    float dS = length(q + hand * .3 - vec2(0., .06)) - .06;
    float ang = atan(q.y - .06, q.x);
    ink += pen(dS + wob * .3) * step(.4, fract(ang * 14. / 6.2832)) * .8;
    inkCol = vec3(.24, .22, .24);
  }

  A += K(inkCol) * min(ink, 1.) * (.5 + H);

  // lettering: paper lifted with a damp brush behind each label
  float lift = 0.;
  for (int i = 0; i < 12; i++){
    vec4 L = uLab[i];
    if (L.z <= 0.) continue;
    vec2 b = abs(q + wM * .02 - L.xy) - L.zw + .03;
    float d = length(max(b, 0.)) + min(max(b.x, b.y), 0.) - .03 + wF.x * .01;
    lift = max(lift, smoothstep(.035, -.012, d));
  }
  A *= 1. - .84 * lift;

  // ---------- paper, grain and the taped margin ----------
  A *= 1. + .63 * (.5 - H);
  vec2 b = abs(frag - .5 * uRes) - (.5 * uRes - uUnit * .07);
  float dF = max(b.x, b.y) / uUnit + wF.x * .006 + wM.y * .004;
  float m = smoothstep(.003, -.003, dF);
  A = A * m + K(edgeTint) * exp(-pow((dF + .006) / .006, 2.)) * .3 * m;

  vec3 col = vec3(.982, .972, .945) * exp(-A);
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
gl.bindAttribLocation(prog, 0, 'p');
gl.linkProgram(prog);
gl.useProgram(prog);
gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
gl.enableVertexAttribArray(0);
gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
const U = (n) => gl.getUniformLocation(prog, n);

const P = PROTOS[proto];
document.getElementById('name').textContent = P.name;
document.getElementById('tag').textContent = P.tag;
const nav = document.getElementById('nav');
for (const k in PROTOS) {
  const a = document.createElement('a');
  a.href = `?p=${k}`;
  a.textContent = k;
  a.title = PROTOS[k].name;
  if (Number(k) === proto) a.className = 'on';
  nav.appendChild(a);
}
const els = P.labels.map(([text, , , cls]) => {
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
  P.labels.forEach(([, x, y], i) => {
    els[i].style.left = `${innerWidth / 2 + x * unit}px`;
    els[i].style.top = `${innerHeight / 2 - y * unit}px`;
  });
  const rects = [...els, document.querySelector('.t')].map((el) => {
    const r = el.getBoundingClientRect();
    return [(r.left + r.width / 2 - innerWidth / 2) / unit, (innerHeight / 2 - r.top - r.height / 2) / unit, r.width / 2 / unit + 0.02, r.height / 2 / unit + 0.012];
  });
  while (rects.length < 12) rects.push([0, 0, 0, 0]);
  gl.uniform4fv(U('uLab[0]'), new Float32Array(rects.flat()));
}
addEventListener('resize', resize);
resize();
document.fonts.ready.then(resize);

const still = params.has('still');
function frame(now) {
  gl.uniform2f(U('uRes'), canvas.width, canvas.height);
  gl.uniform1f(U('uUnit'), unit * dpr);
  gl.uniform1f(U('uTime'), still ? 0 : now / 1000);
  gl.uniform1f(U('uScene'), proto);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  if (!still) requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
