// The painting engine: every primitive is a signed distance field laid down
// as a watercolor wash on paper. One fragment shader, driven entirely by state.

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }`;

const FRAG = `
precision highp float;

uniform vec2 uRes;
uniform vec2 uCenter;   // scene origin in device pixels (y up)
uniform float uScale;   // device pixels per scene unit
uniform float uTime;
uniform float uWet;     // 0..1, rises during a morph

uniform vec4 uU;  uniform vec4 uUc;                    // Ultimate: x y r soft / rgb a
uniform vec4 uW;  uniform vec4 uWc; uniform float uWsq; // World (+ squareness)
uniform vec4 uS;  uniform vec4 uSc;                    // Self
uniform vec4 uB;  uniform vec4 uBc; uniform vec2 uBp;  // Bridge: a b / rgb a / width soft
uniform vec4 uP;  uniform float uPa;                   // Problem stain
uniform vec4 uR;  uniform vec3 uRc;                    // Remedy light: x y r a
uniform vec4 uT;  uniform vec2 uTa;                    // Time: x y length bend / alpha arrow
uniform vec4 uX;  uniform vec3 uXc;                    // Cross-beam: x y size a

float hash(vec2 p){
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3. - 2. * f);
  return mix(mix(hash(i), hash(i + vec2(1., 0.)), f.x),
             mix(hash(i + vec2(0., 1.)), hash(i + vec2(1., 1.)), f.x), f.y);
}
float fbm(vec2 p){
  float a = .5, s = 0.;
  for (int i = 0; i < 4; i++){ s += a * noise(p); p = p * 2.03 + vec2(17.1, 9.2); a *= .5; }
  return s;
}
vec2 rot(vec2 v, float a){ float c = cos(a), s = sin(a); return vec2(c * v.x - s * v.y, s * v.x + c * v.y); }

float sdSeg(vec2 p, vec2 a, vec2 b){
  vec2 pa = p - a, ba = b - a;
  float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-6), 0., 1.);
  return length(pa - ba * h);
}
float sdArc(vec2 p, vec2 sc, float ra){
  p.x = abs(p.x);
  return (sc.y * p.x > sc.x * p.y) ? length(p - sc * ra) : abs(length(p) - ra);
}

// Pigment density of a wash, given distance to its edge.
float wash(float d, float soft, float vari, float grain){
  float s = max(soft, .004);
  float body = smoothstep(s, -s, d);
  float hard = 1. - smoothstep(.02, .12, soft);
  float pool = exp(-pow((d + .014) / .011, 2.)) * hard;   // pigment pooling at a crisp edge
  float dens = body * (.74 + .9 * vari) * (.86 + .28 * grain) + pool * .3;
  return clamp(dens, 0., 1.15);
}
vec3 glaze(vec3 col, vec3 pig, float a){ return col * mix(vec3(1.), pig, clamp(a, 0., 1.)); }

void main(){
  vec2 frag = gl_FragCoord.xy;
  vec2 q = (frag - uCenter) / uScale;
  float t = uTime * .02;

  // shared noise fields
  vec2 w1 = vec2(fbm(q * 2.3 + t), fbm(q * 2.3 + vec2(31.7, 11.3) - t)) - .47;
  vec2 w2 = vec2(fbm(q * 9. + 5.), fbm(q * 9. + vec2(7., 23.))) - .47;
  float grain = noise(frag * .9) * .5 + noise(frag * .31) * .5;
  float wet = uWet * .035;

  // paper
  float tone = fbm(q * .8 + 40.);
  vec3 col = vec3(.972, .952, .915) * (.955 + .05 * grain) * (.97 + .05 * tone);
  col *= 1. - .07 * smoothstep(.5, 1.5, length((frag - .5 * uRes) / uRes.y));

  // time: a dry brush line that can bend into a wheel
  {
    float th = max(uT.w, .04);
    float R = uT.z / th;
    vec2 c = uT.xy + vec2(0., R);
    vec2 pp = q + rot(w1, 5.) * .012 + w2 * .004;
    vec2 pt = pp - c; pt.y = -pt.y;
    float a = th * .5;
    float d = sdArc(pt, vec2(sin(a), cos(a)), R) - .0065;
    vec2 tip = c + R * vec2(sin(a), -cos(a));
    vec2 tg = vec2(cos(a), sin(a));
    float da = min(sdSeg(pp, tip, tip - .05 * rot(tg, .5)), sdSeg(pp, tip, tip - .05 * rot(tg, -.5))) - .0055;
    float dens = smoothstep(.004, -.004, d) + smoothstep(.004, -.004, da) * uTa.y;
    dens = clamp(dens, 0., 1.) * (.45 + .9 * grain);
    col = glaze(col, vec3(.42, .33, .29), dens * uTa.x);
  }

  // world
  {
    float amp = .03 + uW.w * .35 + wet;
    vec2 p = q + rot(w1, 2.) * amp + rot(w2, 1.) * amp * .22 - uW.xy;
    float dc = length(p) - uW.z;
    vec2 bb = abs(p) - vec2(uW.z * .92) + .04;
    float db = length(max(bb, 0.)) + min(max(bb.x, bb.y), 0.) - .04;
    float d = mix(dc, db, uWsq);
    float dens = wash(d, uW.w, dot(w1, vec2(.8, .6)), grain);
    col = glaze(col, uWc.rgb, dens * uWc.a);
  }

  // the Ultimate
  {
    float amp = .03 + uU.w * .35 + wet;
    vec2 p = q + rot(w1, 4.1) * amp + rot(w2, 2.7) * amp * .22 - uU.xy;
    float d = length(p) - uU.z;
    float dens = wash(d, uU.w, dot(w1, vec2(-.6, .8)), grain);
    col = glaze(col, uUc.rgb, dens * uUc.a);
  }

  // remedy: light lifted out of the paint
  {
    vec2 p = q + rot(w1, 1.3) * .05 - uR.xy;
    float g = exp(-dot(p, p) / max(uR.z * uR.z, 1e-4)) * uR.w;
    col = mix(col, uRc, clamp(g, 0., 1.) * .8);
  }

  // bridge
  {
    vec2 p = q + rot(w1, 3.3) * (.012 + wet * .5) + w2 * .004;
    float d = sdSeg(p, uB.xy, uB.zw) - uBp.x;
    float dens = wash(d, uBp.y, dot(w1, vec2(.3, -.9)), grain);
    col = glaze(col, uBc.rgb, dens * uBc.a);
  }

  // self
  {
    float amp = .012 + uS.w * .4 + wet * .5;
    vec2 p = q + rot(w1, .7) * amp + rot(w2, 3.9) * amp * .3 - uS.xy;
    float d = length(p) - uS.z;
    float dens = wash(d, uS.w, dot(w1, vec2(.9, .2)), grain);
    col = glaze(col, uSc.rgb, dens * uSc.a);
  }

  // problem: a dark stain with ragged, creeping edges
  {
    vec2 p = q + rot(w1, 6.) * (.1 + wet) + rot(w2, .4) * .03 - uP.xy;
    float d = length(p) - uP.z - w2.x * .06;
    float dens = wash(d, uP.w, dot(w1, vec2(-.5, -.8)), grain);
    col = glaze(col, vec3(.17, .15, .27), dens * uPa);
  }

  // cross-beam
  {
    vec2 p = q + rot(w1, 3.3) * .012 + w2 * .004;
    float d = sdSeg(p, uX.xy - vec2(uX.z, 0.), uX.xy + vec2(uX.z, 0.)) - .017;
    float dens = wash(d, .007, dot(w1, vec2(.3, -.9)), grain);
    col = glaze(col, uXc, dens * uX.w);
  }

  gl_FragColor = vec4(col, 1.);
}`;

export function createPainter(canvas) {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
  if (!gl) return null;

  const compile = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  };
  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
  gl.useProgram(prog);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const cache = {};
  const u = (name) => cache[name] || (cache[name] = gl.getUniformLocation(prog, name));
  let dpr = 1;

  return {
    resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    },
    // view: { cx, cy, scale } in CSS pixels, y measured from the top
    draw(s, view, time, wet) {
      const { U, W, S, B, P, R, T, X } = s;
      gl.uniform2f(u('uRes'), canvas.width, canvas.height);
      gl.uniform2f(u('uCenter'), view.cx * dpr, canvas.height - view.cy * dpr);
      gl.uniform1f(u('uScale'), view.scale * dpr);
      gl.uniform1f(u('uTime'), time);
      gl.uniform1f(u('uWet'), wet);
      gl.uniform4f(u('uU'), U.x, U.y, U.r, U.soft);
      gl.uniform4f(u('uUc'), ...U.col, U.a);
      gl.uniform4f(u('uW'), W.x, W.y, W.r, W.soft);
      gl.uniform4f(u('uWc'), ...W.col, W.a);
      gl.uniform1f(u('uWsq'), W.sq);
      gl.uniform4f(u('uS'), S.x, S.y, S.r, S.soft);
      gl.uniform4f(u('uSc'), ...S.col, S.a);
      gl.uniform4f(u('uB'), B.ax, B.ay, B.bx, B.by);
      gl.uniform4f(u('uBc'), ...B.col, B.a);
      gl.uniform2f(u('uBp'), B.w, B.soft);
      gl.uniform4f(u('uP'), P.x, P.y, P.r, P.soft);
      gl.uniform1f(u('uPa'), P.a);
      gl.uniform4f(u('uR'), R.x, R.y, R.r, R.a);
      gl.uniform3f(u('uRc'), ...R.col);
      gl.uniform4f(u('uT'), T.x, T.y, T.L, T.th);
      gl.uniform2f(u('uTa'), T.a, T.arrow);
      gl.uniform4f(u('uX'), X.x, X.y, X.s, X.a);
      gl.uniform3f(u('uXc'), ...X.col);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
  };
}
