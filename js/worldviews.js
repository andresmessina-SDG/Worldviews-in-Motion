// The worldviews. Each is a set of values the painting and its connectors read:
// a base that holds for the whole worldview, and what changes in each of its four acts.
// Every value is a number or a colour, so any act can blend into any other.
//
// Rules for working in this file:
// - Every key is in DEFAULTS below, in the one form it always takes (a number, or a colour as [r, g, b] from
//   0 to 1). A base, or an act, gives only the keys where it differs. A new key goes into DEFAULTS, set to the
//   value that means "not here" (usually 0). A move blends key by key, so a key in a base or an act but not in
//   DEFAULTS (a misspelt name, say) is reported in the browser's console as the page loads.
// - Places are in scene units: x across, y up, 0 at the middle of the painting, about 1 from the
//   middle to the top. Gy, Wy and Sy are the heights of the Ultimate, the world and man.
// - acc is the accent colour of the connectors and of the open act's name: dark enough to read on paper.
// - move names the next worldview and the question that leads to it. The worldviews form one loop,
//   so adding one also means rewording the question of the worldview that now leads into it.
// - labels: god, world, bridge, self and sin, each [title, sub]; leave one out for no label. The title
//   names the thing; the sub says what this worldview holds about it, and is where its weakness should
//   show. lGodK, lSide, lBrX/lBrY and tBrX/tBrY (+ tBrS) place them. A label must not cross another,
//   at rest or while it moves between acts, at any window size from a 320-pixel phone up: check them all.
// - Words: plain English and short sentences, after Orwell's rules; the terms a worldview needs are fine.
//   Avoid stock formulas such as "an X that Y" ("matter that thinks"); say it as a person would.
// - Act names stay short: all four share the line of history, even on a small phone.

// Each value as most worldviews have it, so that each base below lists only where its worldview differs.
const DEFAULTS = {
  // where things stand (scene units, y up)
  Gy: 0.56, rG: 0.15, Wy: -0.43, rW: 0.36, Sy: -0.02, bOff: 0,
  // palette
  glory: [0.95, 0.95, 0.94], sky: [0.97, 0.76, 0.56], far: [0.8, 0.84, 0.86], low: [0.72, 0.88, 0.85], deep: [0.5, 0.68, 0.8],
  sea: [0.22, 0.6, 0.66], land: [0.3, 0.62, 0.42], shade: [0.14, 0.28, 0.5], warm: 0.25, bg: 0.4,
  godC: [0.95, 0.94, 0.9], godRim: [0.86, 0.86, 0.84], godA: 0,
  stainC: [0.13, 0.11, 0.22], stainS: 1,
  // what is present and what moves
  wave: 0, haloL: 0, haloR: 0, clock: 0, ring: 0,
  box: 0, lat: 0, pulse: 0, bare: 0, manA: 1, manC: [0.9, 0.5, 0.3], empty: 0, drain: 0, pool: 0, hollow: 0,
  selfR: 0.02, selfA: 0, selfC: [0.86, 0.33, 0.24],
  one: 0, maya: 0, worldA: 1, manI: 1, wheel: 0,
  moons: 0, seasons: 0, aura: 0, circuit: 0, shards: 0, dominant: 0, play: 0, gap: 0, script: 0, pyr: 0, level: 0, strata: 0, split: 0, churn: 0, stainOn: 0, star: 0, law: 0,
  spirits: 0, pull: 0, anger: 0, near: 0, offer: 0, bi: 0, unbound: 0, bonds: 0, loose: 0, lineage: 0, yin: 0, mist: 0, current: 0, push: 0, along: 0, flux: 0, bundle: 0, scatter: 0, spokes: 0, scan: 0, lit: 0, stainUp: 0, stainR: 0.02, stainA: 0, glow: 0, dull: 0, rip: 0, ripAt: 1,
  demi: 0, demiY: 0.3, demiR: 0.085,
  // connectors
  bridge: 0, bw: 0.006, bbot: -0.02, crim: 0, cross: 0, snap: 0, flow: 0,
  wheelYr: 0, cast: 0, spiral: 0, spiralW: 0, rings: 0, ringDir: 0, fence: 0, burst: 0, upload: 0, steps: 0, covenant: 0, broken: 0, tablets: 0, awaited: 0, sent: 0, scales: 0, extract: 0, revolt: 0, ghost: 0, reason: 0, call: 0, rise: 0, orbit: 0, oR: 0.6, oTilt: 0.4, oRot: 0, oSpd: 0, forms: 0, partake: 0, copies: 0, copyDark: 0, soul: 0, soulY: 0, ladder: 0, rebirth: 0, divide: 0, divY: 0.14, pleroma: 0, sophia: 0, spheres: 0, guard: 0, gates: 0, seeming: 0, tick: 0, acc: [163, 38, 43],
  // lettering
  lGodK: 0, lSide: 0.1, lBrX: 0.3, lBrY: 0.145, tBrX: 0.05, tBrY: 0.11, tBrS: 0,
};

const christianBase = {
  // where things stand (scene units, y up)
  Gy: 0.445, rG: 0.29, Sy: -0.4, bOff: 0.03,
  // palette
  glory: [1, 0.94, 0.66], far: [0.8, 0.7, 0.82],
  warm: 0.55, bg: 0.5,
  godC: [0.98, 0.78, 0.3], godRim: [0.9, 0.46, 0.34], godA: 1,
  stainS: 0,
  // what is present and what moves
  wave: 1, haloL: 1, ring: 1,
  // connectors
  bridge: 0.95, bw: 0.044, bbot: -0.12, flow: 1,
  // lettering
  lGodK: 0.38, lBrX: 0.22, tBrY: 0.095,
};

const deismBase = {
  rG: 0.2, Wy: -0.35, rW: 0.31, Sy: -0.35, bOff: -0.1,
  glory: [0.98, 0.96, 0.86], sky: [0.94, 0.9, 0.78], far: [0.8, 0.81, 0.86], low: [0.82, 0.88, 0.9], deep: [0.6, 0.7, 0.8],
  sea: [0.36, 0.56, 0.72], land: [0.46, 0.62, 0.66], bg: 0.42,
  godC: [0.97, 0.86, 0.56], godRim: [0.9, 0.74, 0.56], godA: 0.62,
  stainC: [0.46, 0.46, 0.54],
  haloR: 1, clock: 1,
  dull: 0.15,
  ghost: 0.75, tick: 1, acc: [63, 98, 127],
  lGodK: 0.12, lSide: 0.2, lBrX: 0.2, lBrY: 0.14, tBrX: 0.035, tBrY: 0.12,
};

const mtdBase = {
  // Gy is where God's name stands, and where God would stand if he kept his place.
  Gy: 0.72, rG: 0.13, Wy: -0.02, rW: 0.3,
  glory: [1, 0.96, 0.8], sky: [0.98, 0.88, 0.87], far: [0.88, 0.84, 0.93], low: [0.96, 0.92, 0.84], deep: [0.9, 0.84, 0.88],
  sea: [0.95, 0.72, 0.76], land: [0.96, 0.87, 0.56], shade: [0.66, 0.5, 0.64],
  godC: [0.98, 0.91, 0.58], godRim: [0.96, 0.74, 0.76], godA: 0.85,
  stainC: [0.48, 0.5, 0.6],
  manC: [0.9, 0.52, 0.6],
  selfR: 0.05, selfA: 0.18, selfC: [0.95, 0.56, 0.64],
  orbit: 1, oR: 0.62, oTilt: 0.42, oRot: 0.45, oSpd: 0.12, acc: [182, 72, 108],
  lBrX: 0.32, lBrY: -0.3, tBrX: 0.085, tBrY: -0.06, tBrS: 1,
};

const judaismBase = {
  // the one God above, bound to Israel by covenant: two lines, his and theirs
  Gy: 0.58, rG: 0.22, Wy: -0.28, rW: 0.36, Sy: -0.22,
  glory: [1, 0.98, 0.9], sky: [0.9, 0.92, 0.95], far: [0.82, 0.85, 0.92], low: [0.9, 0.9, 0.86], deep: [0.7, 0.76, 0.86],
  sea: [0.3, 0.5, 0.72], land: [0.82, 0.76, 0.58], shade: [0.2, 0.3, 0.5], warm: 0.3, bg: 0.42,
  godC: [0.99, 0.95, 0.82], godRim: [0.6, 0.72, 0.9], godA: 1,
  stainC: [0.18, 0.18, 0.26],
  manC: [0.68, 0.4, 0.28],
  haloL: 1, covenant: 1,
  acc: [40, 82, 150],
  lBrX: 0.2, lBrY: 0.14, tBrX: 0.016, tBrY: 0.22,
};

const islamBase = {
  // God high above and far off, in glory; his will comes down, but he does not
  Gy: 0.57, rG: 0.24, Wy: -0.3, rW: 0.34, Sy: -0.3,
  glory: [1, 0.96, 0.84], sky: [0.95, 0.9, 0.78], far: [0.84, 0.86, 0.82], low: [0.9, 0.88, 0.8], deep: [0.72, 0.78, 0.72],
  sea: [0.24, 0.55, 0.45], land: [0.85, 0.72, 0.42], shade: [0.16, 0.32, 0.3], warm: 0.35, bg: 0.42,
  godC: [0.98, 0.88, 0.6], godRim: [0.9, 0.74, 0.42], godA: 1,
  stainC: [0.2, 0.18, 0.2],
  manC: [0.72, 0.38, 0.24],
  star: 1,
  acc: [30, 105, 80],
  lBrX: 0.2, lBrY: 0.2, tBrX: 0.012, tBrY: 0.12,
};

const naturalismBase = {
  rG: 0.19, Wy: -0.24, rW: 0.4, Sy: -0.2,
  glory: [0.95, 0.95, 0.93], sky: [0.87, 0.9, 0.9], low: [0.8, 0.85, 0.8], deep: [0.62, 0.7, 0.76],
  sea: [0.44, 0.58, 0.7], land: [0.5, 0.62, 0.5], warm: 0.4, bg: 0.42,
  stainC: [0.34, 0.36, 0.42],
  box: 1, lat: 1, pulse: 1, bare: 1, manC: [0.3, 0.42, 0.54], empty: 0.8,
  acc: [70, 100, 78],
  lBrX: 0.26, lBrY: 0.29, tBrX: 0.16, tBrY: 0.17,
};

const humanismBase = {
  // nothing above, but man bright with a light of his own; later he climbs toward the place left empty
  Gy: 0.66, rG: 0.18, Wy: -0.33, rW: 0.34, Sy: -0.26,
  glory: [0.98, 0.96, 0.9], sky: [0.97, 0.88, 0.7], far: [0.84, 0.86, 0.88], low: [0.86, 0.9, 0.92], deep: [0.64, 0.74, 0.84],
  sea: [0.4, 0.62, 0.78], land: [0.9, 0.76, 0.46], shade: [0.22, 0.32, 0.5], warm: 0.45, bg: 0.4,
  stainC: [0.4, 0.4, 0.46],
  bare: 0.45, manC: [0.9, 0.56, 0.22], empty: 0.8,
  selfR: 0.07, selfA: 0.25, selfC: [0.98, 0.78, 0.36], glow: 0.35,
  acc: [176, 110, 30],
  lBrX: 0.24, lBrY: 0.05, tBrX: -0.05, tBrY: 0.06,
};

const nihilismBase = {
  Gy: 0.62, Wy: 0, rW: 0.34, Sy: 0.04,
  sky: [0.9, 0.9, 0.9], far: [0.84, 0.84, 0.86], low: [0.86, 0.85, 0.84], deep: [0.76, 0.76, 0.79],
  sea: [0.4, 0.43, 0.5], land: [0.5, 0.5, 0.55], warm: 0.12, bg: 0.34,
  stainC: [0.3, 0.3, 0.36],
  box: 1, lat: 0.45, pulse: 0.3, bare: 0.6, manC: [0.42, 0.44, 0.5], empty: 0.45, drain: 0.35, pool: 0.25,
  dull: 0.6,
  acc: [86, 82, 100],
  lBrX: 0.27, lBrY: -0.52, tBrX: 0.15, tBrY: -0.44,
};

const existentialismBase = {
  Gy: 0.62, Wy: -0.06, rW: 0.38,
  sky: [0.9, 0.89, 0.88], far: [0.83, 0.83, 0.85], low: [0.85, 0.84, 0.83], deep: [0.74, 0.74, 0.77],
  sea: [0.38, 0.4, 0.46], land: [0.47, 0.47, 0.51], warm: 0.1, bg: 0.36,
  stainC: [0.26, 0.26, 0.32],
  box: 1, lat: 0.35, pulse: 0.3, bare: 0.6, manC: [0.85, 0.3, 0.2], empty: 0.4, drain: 0.4,
  selfR: 0.09, selfA: 0.3,
  dull: 0.7,
  acc: [190, 66, 44],
  lBrY: 0.42, tBrX: 0.13,
};

const postmodernBase = {
  // nothing above that anyone can know; below, the world as a collage of shards, written over
  Gy: 0.62, rG: 0.19, Wy: -0.2, rW: 0.4, Sy: -0.1,
  glory: [0.96, 0.95, 0.96], sky: [0.92, 0.9, 0.94], far: [0.86, 0.84, 0.9], low: [0.9, 0.88, 0.9], deep: [0.76, 0.74, 0.82],
  sea: [0.4, 0.76, 0.78], land: [0.9, 0.5, 0.7], shade: [0.34, 0.3, 0.52], warm: 0.2, bg: 0.38,
  stainC: [0.22, 0.18, 0.3],
  bare: 0.5, manC: [0.42, 0.3, 0.5], empty: 0.7,
  shards: 1, script: 1,
  acc: [168, 46, 110],
  lBrX: 0.3, lBrY: 0.3, tBrX: 0.2, tBrY: 0.08,
};

const individualBase = {
  // nothing above; man at the centre, with a colour of his own, looking inward
  Gy: 0.62, rG: 0.19, Wy: -0.22, rW: 0.4, Sy: -0.12,
  glory: [0.98, 0.95, 0.93], sky: [0.97, 0.9, 0.88], far: [0.9, 0.84, 0.9], low: [0.95, 0.9, 0.88], deep: [0.84, 0.76, 0.84],
  sea: [0.62, 0.66, 0.8], land: [0.94, 0.78, 0.6], shade: [0.4, 0.3, 0.5], warm: 0.35, bg: 0.4,
  stainC: [0.3, 0.24, 0.3],
  bare: 0.45, manC: [0.62, 0.34, 0.6], empty: 0.7,
  selfR: 0.08, selfA: 0.35, selfC: [0.94, 0.5, 0.38],
  rings: 1, ringDir: -1,
  acc: [180, 78, 46],
  lBrX: 0.3, lBrY: 0.22, tBrX: 0.17, tBrY: -0.02,
};

const newAgeBase = {
  // the Universe as a violet mist above, with no edge; man in an aura, a spark of the same divinity
  Gy: 0.55, rG: 0.3, Wy: -0.3, rW: 0.36, Sy: -0.2,
  glory: [0.99, 0.95, 0.98], sky: [0.96, 0.88, 0.94], far: [0.86, 0.82, 0.94], low: [0.92, 0.88, 0.94], deep: [0.78, 0.72, 0.88],
  sea: [0.6, 0.56, 0.84], land: [0.94, 0.7, 0.78], shade: [0.4, 0.3, 0.56], warm: 0.3, bg: 0.4,
  godC: [0.78, 0.6, 0.92], godRim: [0.9, 0.7, 0.86],
  stainC: [0.34, 0.3, 0.4],
  manC: [0.6, 0.36, 0.66],
  mist: 1, aura: 0.75,
  acc: [140, 62, 150],
  lBrX: 0.22, lBrY: 0.2, tBrX: 0.012, tBrY: 0.2,
};

const paganBase = {
  // the Goddess as the triple moon above; the earth below, turning through the seasons inside the wheel of the year
  Gy: 0.62, rG: 0.2, Wy: -0.2, rW: 0.36, Sy: -0.12,
  glory: [0.96, 0.96, 0.98], sky: [0.84, 0.86, 0.92], far: [0.8, 0.82, 0.9], low: [0.86, 0.9, 0.84], deep: [0.66, 0.74, 0.7],
  sea: [0.36, 0.55, 0.55], land: [0.5, 0.7, 0.42], shade: [0.2, 0.3, 0.3], warm: 0.25, bg: 0.4,
  godC: [0.9, 0.9, 0.96], godRim: [0.75, 0.78, 0.9],
  stainC: [0.3, 0.26, 0.22],
  manC: [0.6, 0.4, 0.3],
  moons: 1, seasons: 1, wheelYr: 1,
  acc: [62, 112, 58],
  lGodK: -1.05, lSide: 0.16, lBrX: 0.36, lBrY: 0.22, tBrX: 0.31, tBrY: 0.107,
};

const transhumanBase = {
  // nothing above, yet; below, nature, and man in it, about to take the work of making himself into his own hands
  Gy: 0.62, rG: 0.19, Wy: -0.25, rW: 0.38, Sy: -0.2,
  glory: [0.96, 0.97, 0.98], sky: [0.9, 0.94, 0.95], far: [0.82, 0.88, 0.92], low: [0.86, 0.92, 0.92], deep: [0.66, 0.76, 0.84],
  sea: [0.3, 0.62, 0.66], land: [0.55, 0.7, 0.5], shade: [0.2, 0.3, 0.45], warm: 0.15, bg: 0.4,
  stainC: [0.3, 0.3, 0.34],
  bare: 0.5, manC: [0.76, 0.5, 0.38], empty: 0.75,
  acc: [80, 70, 160],
  lBrX: 0.3, lBrY: 0.2, tBrX: 0.15, tBrY: -0.1,
};

const marxistBase = {
  // nothing above; below, society as a pyramid in two storeys: what men make, and what rests on it
  Gy: 0.62, rG: 0.2, Wy: -0.16, rW: 0.44, Sy: -0.27,
  glory: [0.96, 0.94, 0.9], sky: [0.9, 0.86, 0.8], far: [0.82, 0.8, 0.8], low: [0.88, 0.82, 0.76], deep: [0.74, 0.66, 0.62],
  sea: [0.74, 0.34, 0.26], land: [0.88, 0.84, 0.76], shade: [0.36, 0.2, 0.2], warm: 0.2, bg: 0.4,
  stainC: [0.2, 0.12, 0.12],
  bare: 0.5, manC: [0.42, 0.14, 0.12], empty: 0.8,
  pyr: 1, strata: 1, split: 0.05, churn: 1,
  acc: [168, 48, 32],
  lBrX: 0.32, lBrY: 0.1, tBrX: 0.15, tBrY: -0.138,
};

const hinduBase = {
  // the Ultimate and the world are one shape: the world's own circle is not drawn
  Gy: 0.08, rG: 0.36, Wy: 0.08, rW: 0.46,
  glory: [0.99, 0.76, 0.34], sky: [0.9, 0.42, 0.58], far: [0.66, 0.5, 0.76], low: [0.92, 0.6, 0.6], deep: [0.7, 0.52, 0.76],
  sea: [0.9, 0.5, 0.4], land: [0.92, 0.6, 0.3], warm: 0.3, bg: 0.46,
  godC: [0.96, 0.52, 0.16], godRim: [0.9, 0.4, 0.42], godA: 1,
  stainC: [0.36, 0.22, 0.4],
  manC: [0.74, 0.16, 0.24], hollow: 1,
  one: 1, maya: 0.5, worldA: 0,
  acc: [172, 44, 100],
  lGodK: 0.45, lSide: 0.06, lBrX: 0.28, lBrY: 0.63, tBrX: 0.23, tBrY: 0.478,
};

const buddhistBase = {
  // no Ultimate drawn: its place and size only centre the wheel on the self
  Gy: 0.04, rG: 0.3, Wy: 0.04, rW: 0.33, Sy: 0.04,
  glory: [0.97, 0.93, 0.84], sky: [0.92, 0.86, 0.78], far: [0.8, 0.77, 0.76], low: [0.9, 0.85, 0.78], deep: [0.8, 0.74, 0.72],
  sea: [0.93, 0.67, 0.32], land: [0.88, 0.55, 0.3], warm: 0.35, bg: 0.36,
  godC: [0.95, 0.9, 0.8], godRim: [0.86, 0.8, 0.76],
  stainC: [0.32, 0.12, 0.13],
  bare: 0.35, manC: [0.55, 0.18, 0.18],
  flux: 1, bundle: 1,
  acc: [140, 47, 47],
  lGodK: 1.75, lSide: 0.08, lBrY: -0.38, tBrX: 0.26, tBrY: -0.26,
};

const taoistBase = {
  // the source is painted as mist above, with no edge and no outline
  Gy: 0.5, rG: 0.28, Wy: -0.14, Sy: 0.02,
  glory: [0.97, 0.96, 0.93], sky: [0.9, 0.91, 0.9], far: [0.82, 0.84, 0.84], low: [0.88, 0.9, 0.88], deep: [0.78, 0.82, 0.8],
  sea: [0.32, 0.34, 0.36], land: [0.8, 0.89, 0.85], warm: 0, bg: 0.34,
  godC: [0.58, 0.6, 0.61], godRim: [0.7, 0.72, 0.72],
  stainC: [0.24, 0.2, 0.18],
  manC: [0.76, 0.22, 0.15],
  yin: 1, mist: 1, current: 0.5,
  acc: [46, 112, 98],
  lBrY: 0.3, tBrX: 0.113, tBrY: -0.027,
};

const confucianBase = {
  // round Heaven above, square Earth below
  Gy: 0.565, rG: 0.215, Wy: -0.13, rW: 0.38, Sy: -0.05,
  glory: [0.97, 0.96, 0.92], sky: [0.86, 0.9, 0.9], low: [0.94, 0.89, 0.8], deep: [0.86, 0.79, 0.68],
  sea: [0.87, 0.72, 0.44], land: [0.8, 0.64, 0.42], warm: 0.3, bg: 0.38,
  godC: [0.74, 0.86, 0.83], godRim: [0.52, 0.7, 0.7], godA: 0.85,
  stainC: [0.38, 0.32, 0.27],
  box: 1, manC: [0.64, 0.23, 0.17],
  bi: 1, bonds: 1,
  acc: [160, 58, 42],
  lBrY: 0.35, tBrX: 0.17,
};

const animistBase = {
  // the High God is small, faint and far off; the world below is full of spirits
  Gy: 0.66, rG: 0.085, Wy: -0.1, rW: 0.4, Sy: -0.1,
  glory: [0.96, 0.93, 0.85], sky: [0.89, 0.87, 0.79], far: [0.79, 0.8, 0.74], low: [0.87, 0.85, 0.75], deep: [0.72, 0.73, 0.63],
  sea: [0.6, 0.72, 0.52], land: [0.8, 0.66, 0.45], warm: 0.45,
  godC: [0.96, 0.86, 0.6], godRim: [0.86, 0.7, 0.5], godA: 0.35,
  stainC: [0.19, 0.16, 0.14],
  manC: [0.56, 0.3, 0.2],
  spirits: 1,
  acc: [150, 90, 45],
  lGodK: -2.25, lBrY: 0.32, tBrX: 0.06, tBrY: -0.03,
};

const platonistBase = {
  // two storeys: the Good and the Forms above, still and eternal; the world of becoming below, always changing
  Gy: 0.64, rG: 0.12, Wy: -0.3, rW: 0.34, Sy: -0.3,
  glory: [1, 0.97, 0.86], sky: [0.97, 0.94, 0.87], far: [0.88, 0.87, 0.93], low: [0.84, 0.82, 0.91], deep: [0.66, 0.62, 0.79],
  sea: [0.58, 0.55, 0.75], land: [0.74, 0.7, 0.82], shade: [0.32, 0.29, 0.52], warm: 0.1,
  godC: [1, 0.9, 0.6], godRim: [0.96, 0.82, 0.58], godA: 0.9,
  stainC: [0.24, 0.21, 0.36],
  manA: 0.4, manC: [0.56, 0.42, 0.42],
  spirits: 1,
  forms: 1, partake: 1, copies: 1, soul: 1, soulY: -0.3, divide: 1, acc: [82, 72, 148],
  lBrX: 0.45, lBrY: 0.38, tBrX: 0.378, tBrY: 0.285,
};

const gnosticBase = {
  // three storeys: the true God in the Fullness, high and far; below the Limit, the lesser god who made the world;
  // and the world itself, shut in by the seven heavens of his rulers, with a spark of the true God asleep in man
  Gy: 0.66, rG: 0.1, Wy: -0.4, rW: 0.3, Sy: -0.4,
  glory: [0.96, 0.96, 0.99], sky: [0.9, 0.89, 0.95], far: [0.8, 0.8, 0.9], low: [0.62, 0.6, 0.52], deep: [0.44, 0.42, 0.38],
  sea: [0.36, 0.38, 0.32], land: [0.5, 0.44, 0.3], shade: [0.2, 0.17, 0.14], warm: 0.2,
  godC: [0.99, 0.93, 0.74], godRim: [0.86, 0.84, 0.96], godA: 1.1,
  stainC: [0.2, 0.17, 0.14],
  manA: 0.8, manC: [0.6, 0.45, 0.34],
  spirits: 1, soul: 1, soulY: -0.4,
  demi: 1, demiY: 0.26, unbound: 1, pleroma: 1, spheres: 1, divide: 1, divY: 0.44, acc: [128, 84, 30],
  lBrX: 0.3, lBrY: 0.26, tBrX: 0.09, tBrY: 0.26,
};

// An act's values: the defaults, then its worldview's base, then its own. A key the defaults lack is a mistake
// (a misspelt name would otherwise be carried along unread), so it is reported at once.
const build = (base, acts) => acts.map((a) => {
  for (const k of [...Object.keys(base), ...Object.keys(a.p)]) if (!(k in DEFAULTS)) console.error(`worldviews.js: unknown key ${k}`);
  return { ...a, p: { ...DEFAULTS, ...base, ...a.p } };
});

export const WORLDVIEWS = {
  christian: {
    name: 'Christian Theism',
    tagline: 'God made the world, and he came down to save it.',
    move: { to: 'judaism', q: 'What if the Messiah has not yet come?' },
    acts: build(christianBase, [
      {
        slug: 'creation',
        name: 'Creation',
        text: 'God made the world out of nothing and called it good. He made man in his image and spoke with him.',
        p: { rip: 0.9, ripAt: 0 },
        labels: {
          god: ['The triune God', 'Father, Son and Holy Spirit'],
          world: ['Creation', 'Distinct from God, and good'],
          bridge: ['God speaks', 'His word and his covenant'],
          self: ['Man', 'Made in the image of God'],
        },
      },
      {
        slug: 'fall',
        name: 'Fall',
        text: 'Man rebelled against God. Sin corrupted his heart and brought death and ruin into the world.',
        p: { snap: 1, stainR: 0.16, stainA: 0.62, dull: 1, rip: -0.8, lBrY: 0.075, tBrX: 0.02, tBrY: 0.045 },
        labels: {
          god: ['The triune God', 'Father, Son and Holy Spirit'],
          world: ['Creation', 'Still good, now spoiled'],
          bridge: ['Fellowship broken', 'Man hides from God'],
          self: ['Man', 'Still God’s image, now a sinner'],
          sin: ['Sin', 'Rebellion in the heart'],
        },
      },
      {
        slug: 'redemption',
        name: 'Redemption',
        text: 'God came down. The Son became man, died for sinners and rose again. All who trust him are forgiven.',
        p: { bridge: 1, bbot: -0.33, crim: 1, cross: 1, stainUp: 1, stainR: 0.1, stainA: 0.6, glow: 1, dull: 0.3, rip: 0.8, lBrY: 0.04, tBrY: -0.01 },
        labels: {
          god: ['The triune God', 'Father, Son and Holy Spirit'],
          world: ['Creation', 'Loved, and being restored'],
          bridge: ['Christ the Mediator', 'God comes down to man'],
          self: ['Man', 'Saved by grace, through faith'],
          sin: ['Sin', 'Paid for at the cross'],
        },
      },
      {
        slug: 'new-creation',
        name: 'New Creation',
        text: 'Christ will return, raise the dead and judge the world. God will live with his people in a world made new.',
        p: { Gy: 0.4, rG: 0.27, Wy: -0.28, rW: 0.38, Sy: -0.26, bridge: 1, bbot: -0.19, crim: 1, lit: 1, glow: 1, rip: 0.7, lBrX: 0.2, lBrY: 0.12, tBrX: 0.03, tBrY: 0.06 },
        labels: {
          god: ['The triune God', 'Father, Son and Holy Spirit'],
          world: ['The new creation', 'No more sin or death'],
          bridge: ['Face to face', 'They will see his face'],
          self: ['God’s people', 'Raised, and at home with him'],
        },
      },
    ]),
  },

  deism: {
    name: 'Deism',
    tagline: 'God wound the clock and left it to run.',
    move: { to: 'mtd', q: 'What if the distant God is there when we need him?' },
    acts: build(deismBase, [
      {
        slug: 'clockmaker',
        name: 'The Clockmaker',
        text: 'God made the world, set it running by fixed laws and stepped back. He does not speak or act within it.',
        p: {},
        labels: {
          god: ['The Creator', 'Distant and silent'],
          world: ['The world', 'A machine run by fixed laws'],
          bridge: ['No word from above', 'God has not spoken'],
          self: ['Man', 'Able to reason'],
        },
      },
      {
        slug: 'ignorance',
        name: 'Ignorance',
        text: 'Nothing is broken at the root. Men are held back by ignorance and superstition.',
        p: { stainR: 0.15, stainA: 0.5, dull: 0.6 },
        labels: {
          god: ['The Creator', 'Distant and silent'],
          world: ['The world', '“Whatever is, is right”'],
          bridge: ['No word from above', 'God has not spoken'],
          self: ['Man', 'His reason clouded'],
          sin: ['Ignorance', 'And superstition'],
        },
      },
      {
        slug: 'reason',
        name: 'Reason',
        text: 'Reason and good conduct are enough. Man studies nature and works out his duty for himself.',
        p: { reason: 1, ghost: 0.45, stainR: 0.08, stainA: 0.15, glow: 0.9 },
        labels: {
          god: ['The Creator', 'Known only by inference'],
          world: ['The world', 'Its laws are man’s teacher'],
          bridge: ['Reason', 'Man reasons his way up'],
          self: ['Man', 'Guided by his own light'],
        },
      },
      {
        slug: 'end',
        name: 'An Uncertain End',
        text: 'The good may be rewarded after death. God has made no promise, so no one can be sure.',
        p: { Gy: 0.62, rG: 0.16, godA: 0.36, reason: 0.3, glow: 0.4, dull: 0.3, lBrY: 0.19, tBrY: 0.17 },
        labels: {
          god: ['The Creator', 'Further off, still silent'],
          world: ['The world', 'Ticking on'],
          bridge: ['No promise', 'Nothing has been said'],
          self: ['Man', 'Hoping for a reward'],
        },
      },
    ]),
  },

  mtd: {
    name: 'Moralistic Therapeutic Deism',
    tagline: 'Be nice, be happy, and call on God when you need him.',
    move: { to: 'naturalism', q: 'What if no one is there to call on?' },
    acts: build(mtdBase, [
      {
        slug: 'a-kindly-god',
        name: 'A Kindly God',
        text: 'A God exists who made the world and watches over it. He wants people to be good, nice and fair to each other.',
        p: {},
        labels: {
          god: ['God', 'Kind, and circling round man'],
          world: ['The world', 'Watched over'],
          self: ['Man', 'Basically good'],
        },
      },
      {
        slug: 'feeling-bad',
        name: 'Feeling Bad',
        text: 'No one is really bad. What goes wrong is unhappiness: stress, hurt feelings and low self-esteem.',
        p: { oR: 0.68, oTilt: 0.3, oSpd: 0.04, rG: 0.09, godA: 0.45, selfA: 0.06, selfR: 0.03, stainR: 0.12, stainA: 0.45, dull: 0.4 },
        labels: {
          god: ['God', 'Out of mind until needed'],
          world: ['The world', 'Stressful'],
          self: ['Man', 'Still good, but unhappy'],
          sin: ['Unhappiness', 'Hurt feelings, not sin'],
        },
      },
      {
        slug: 'help',
        name: 'Help',
        text: 'God need not be involved in daily life, but he can be called on to solve a problem. The goal of life is to be happy and to feel good about oneself.',
        p: { oR: 0.45, oTilt: 0.55, oSpd: 0.42, rG: 0.14, godA: 0.95, call: 1, selfA: 0.5, selfR: 0.11, stainR: 0.05, stainA: 0.15, glow: 0.6, dull: 0.05, rip: 0.5 },
        labels: {
          god: ['God', 'On call, like a butler'],
          world: ['The world', 'Bearable again'],
          bridge: ['Prayer', 'A call for help'],
          self: ['Man', 'Feeling good about himself'],
          sin: ['Unhappiness', 'Soothed, with nothing to forgive'],
        },
      },
      {
        slug: 'heaven',
        name: 'Heaven',
        text: 'Good people go to heaven when they die, and nearly everyone is good enough.',
        p: { Gy: 0.78, Wy: -0.42, worldA: 0.6, Sy: 0.14, oR: 0.5, oTilt: 0.4, oSpd: 0.15, rG: 0.14, rise: 1, selfA: 0, glow: 0.5 },
        labels: {
          god: ['God', 'Still at their service'],
          world: ['The world', 'Left behind'],
          self: ['Good people', 'Good enough by their own measure'],
        },
      },
    ]),
  },

  judaism: {
    name: 'Judaism',
    tagline: 'One God chose one people, and gave them his law.',
    move: { to: 'islam', q: 'What if God spoke again, through one last prophet?' },
    acts: build(judaismBase, [
      {
        slug: 'creation',
        name: 'Creation',
        text: 'The LORD, the one God, made the world good and made man in his image. He chose Abraham, and through him Israel, and bound himself to them by covenant.',
        p: { rip: 0.8, ripAt: 0 },
        labels: {
          god: ['The LORD', '“The LORD is one”'],
          world: ['Creation', 'Made by God, and good'],
          bridge: ['The covenant', 'With Abraham and his children'],
          self: ['Man', 'Made in the image of God'],
        },
      },
      {
        slug: 'exile',
        name: 'Sin and Exile',
        text: 'Man is born with the evil inclination; the good one comes later, and he is free to choose. Israel broke the covenant and was exiled, the temple destroyed and the sacrifices ended.',
        p: { broken: 1, stainR: 0.12, stainA: 0.5, dull: 0.4, rip: -0.6 },
        labels: {
          god: ['The LORD', 'Faithful to his covenant'],
          world: ['Creation', 'Good, but Israel is in exile'],
          bridge: ['The covenant', 'Broken by Israel, kept by God'],
          self: ['Man', 'Free to choose the good'],
          sin: ['Sin', 'The evil inclination, not a fallen nature'],
        },
      },
      {
        slug: 'torah',
        name: 'Torah',
        text: 'God gave Moses the Torah at Sinai, written and oral, and the Talmud records the oral law. A Jew returns to God by repentance, prayer and charity, which now replace the sacrifices.',
        p: { tablets: 1, stainR: 0.08, stainA: 0.3, dull: 0.15, glow: 0.3, tBrX: 0.075 },
        labels: {
          god: ['The LORD', 'He forgives the penitent'],
          world: ['Creation', 'Hallowed by the commandments'],
          bridge: ['The Torah, written and oral', 'A yoke no one has fully borne'],
          self: ['Israel', 'Returning to God by repentance'],
          sin: ['Sin', 'No sacrifice for it since AD 70'],
        },
      },
      {
        slug: 'the-world-to-come',
        name: 'The World to Come',
        text: 'The Messiah, a man descended from David, will come. He will gather the exiles, rebuild the temple and bring peace. The dead will be raised to the world to come.',
        p: { awaited: 1, lit: 0.6, glow: 0.6, rip: 0.6, tBrX: 0.052 },
        labels: {
          god: ['The LORD', 'King over all the earth'],
          world: ['The world to come', 'The temple rebuilt, and peace'],
          bridge: ['The Messiah', 'Still awaited, though the temple has fallen'],
          self: ['Israel', 'Gathered home, and raised'],
        },
      },
    ]),
  },

  islam: {
    name: 'Islam',
    tagline: 'There is no god but God, and man must submit to him.',
    move: { to: 'deism', q: 'What if God never spoke at all?' },
    acts: build(islamBase, [
      {
        slug: 'creation',
        name: 'Creation',
        text: 'There is no god but God. He is one, with no partner and no son. He made the world by his command, “Be!”, and set man on the earth as his deputy.',
        p: { rip: 0.8, ripAt: 0 },
        labels: {
          god: ['Allah', '“He neither begets nor is born”'],
          world: ['Creation', 'Made by his word, “Be!”'],
          self: ['Man', 'God’s deputy on earth'],
        },
      },
      {
        slug: 'forgetfulness',
        name: 'Forgetfulness',
        text: 'Adam disobeyed and God forgave him, so no sin is passed down. Man is born pure, but weak and forgetful. The worst sin is to set up partners beside God.',
        p: { stainR: 0.1, stainA: 0.4, dull: 0.35, rip: -0.4 },
        labels: {
          god: ['Allah', 'Shirk alone he will not forgive'],
          world: ['Creation', 'Full of signs, unheeded'],
          self: ['Man', 'Born pure, but weak'],
          sin: ['Forgetfulness', 'A weakness, not a fallen nature'],
        },
      },
      {
        slug: 'submission',
        name: 'Submission',
        text: 'God sent prophets, and last of all Muhammad, with the Quran. Jesus was a prophet, not the Son of God, and he was not crucified. Man must submit to God’s law and keep the Five Pillars.',
        p: { sent: 1, law: 1, stainR: 0.07, stainA: 0.18, dull: 0.1, glow: 0.4, lBrY: 0.2, tBrX: 0.012, tBrY: 0.18 },
        labels: {
          god: ['Allah', 'He reveals his will, not himself'],
          world: ['Creation', 'To be ruled by God’s law'],
          bridge: ['The Quran', 'The word made book, not flesh'],
          self: ['The Muslim', 'Saved by submitting, if God wills'],
          sin: ['Forgetfulness', 'Forgiven, with no atonement'],
        },
      },
      {
        slug: 'judgement',
        name: 'Judgement',
        text: 'On the Last Day the dead will be raised and their deeds weighed. Those God accepts enter the Garden, and the rest go to the Fire. No one can be sure which awaits him.',
        p: { scales: 1, law: 0.4, sea: [0.3, 0.62, 0.42], land: [0.62, 0.76, 0.4], glow: 0.3, lBrX: 0.3, lBrY: 0.24, tBrX: 0.2, tBrY: 0.2 },
        labels: {
          god: ['Allah', 'Judge, but never Father'],
          world: ['The Garden', 'For those God accepts'],
          bridge: ['The scales', 'Deeds weighed, and no one can be sure'],
          self: ['Man', 'Hoping his good outweighs his bad'],
        },
      },
    ]),
  },

  naturalism: {
    name: 'Naturalism',
    tagline: 'Matter is all there is, and nobody made it.',
    move: { to: 'humanism', q: 'What if man can be good without God?' },
    acts: build(naturalismBase, [
      {
        slug: 'matter',
        name: 'Matter Alone',
        text: 'The cosmos is all there is. No one made it, and nothing exists outside it.',
        p: {},
        labels: {
          god: ['Nothing above', 'No God and no world beyond'],
          world: ['The cosmos', 'Matter and energy, and nothing else'],
          bridge: ['A closed system', 'Every event has a natural cause'],
          self: ['Man', 'Made by chance and time'],
        },
      },
      {
        slug: 'suffering',
        name: 'Suffering',
        text: 'The world has not fallen. Pain and death are simply how nature works. Good and evil are human ideas.',
        p: { stainR: 0.15, stainA: 0.5, dull: 0.5, pulse: 0.8 },
        labels: {
          god: ['Nothing above', 'No one to blame'],
          world: ['The cosmos', 'It does not care'],
          bridge: ['A closed system', 'Every event has a natural cause'],
          self: ['Man', 'He suffers and he dies'],
          sin: ['Suffering', 'No one meant it'],
        },
      },
      {
        slug: 'science',
        name: 'Science',
        text: 'Man has only himself to rely on. Science explains nature, and technology puts it to work.',
        p: { stainR: 0.07, stainA: 0.15, glow: 1, rip: 0.9, scan: 1 },
        labels: {
          god: ['Nothing above', 'No one to ask'],
          world: ['The cosmos', 'Studied, measured and used'],
          bridge: ['Still closed', 'No help comes from outside'],
          self: ['Man', 'His reason is one more product of nature'],
        },
      },
      {
        slug: 'extinction',
        name: 'Extinction',
        text: 'Each person dies and is gone. In time the stars burn out and the cosmos goes cold.',
        p: { dull: 1, warm: 0, manA: 0.22, pulse: 0.12, lat: 0.6, bg: 0.34, empty: 0.5,
          sea: [0.52, 0.58, 0.66], land: [0.56, 0.6, 0.62] },
        labels: {
          god: ['Nothing above', 'No one to remember'],
          world: ['The cosmos', 'Cold, dark and running down'],
          bridge: ['No goal', 'History is heading nowhere'],
          self: ['Man', 'Here briefly, then gone'],
        },
      },
    ]),
  },

  humanism: {
    name: 'Secular Humanism',
    tagline: 'Man needs no God: reason can make the world good.',
    move: { to: 'nihilism', q: 'What if none of it matters?' },
    acts: build(humanismBase, [
      {
        slug: 'man-the-measure',
        name: 'Man the Measure',
        text: 'The cosmos is all there is, and nobody made it. Man is its finest product, made by chance over long ages, and the only one who can understand it.',
        p: {},
        labels: {
          god: ['Nothing above', '“No deity will save us”'],
          world: ['The cosmos', 'Matter, and nothing more'],
          self: ['Man', 'Of great worth, though made by chance'],
        },
      },
      {
        slug: 'superstition',
        name: 'Superstition',
        text: 'Nothing is wrong with man at heart. The trouble lies in ignorance, poverty and prejudice, and above all in religion, which stops people thinking for themselves.',
        p: { stainOn: 1, stainR: 0.12, stainA: 0.45, dull: 0.3, glow: 0.2, selfA: 0.12 },
        labels: {
          god: ['Nothing above', 'A story man outgrows'],
          world: ['The cosmos', 'Neither for us nor against us'],
          self: ['Man', 'Good at heart, held back'],
          sin: ['Superstition', 'The fault lies outside man'],
        },
      },
      {
        slug: 'progress',
        name: 'Progress',
        text: 'Reason and science will set man free. With education, technology and good laws, people can build a better world and choose their own values.',
        p: { Wy: -0.4, rW: 0.3, Sy: 0.28, steps: 1, stainOn: 1, selfA: 0.55, selfR: 0.12, glow: 0.7, rip: 0.6, lSide: -0.1, lBrX: 0.16, lBrY: 0.02, tBrX: -0.08, tBrY: 0.04 },
        labels: {
          god: ['Nothing above', '“We must save ourselves”'],
          world: ['The cosmos', 'It tells us no “ought”'],
          bridge: ['Progress', 'Ever upward, by man’s own effort'],
          self: ['Man', 'Choosing his own values'],
        },
      },
      {
        slug: 'this-life-only',
        name: 'This Life Only',
        text: 'Each person dies and is gone, and lives on only in what he leaves behind. In the far future the sun will burn out and take mankind with it.',
        p: { Wy: -0.4, rW: 0.3, Sy: 0.28, steps: 0.7, lBrX: 0.16, lBrY: 0.02, tBrX: -0.08, tBrY: 0.04, selfA: 0, glow: 0, manA: 0.18, hollow: 1, manI: 0.6, dull: 1, warm: 0, bg: 0.34,
          sea: [0.52, 0.58, 0.66], land: [0.6, 0.6, 0.6], lSide: -0.1 },
        labels: {
          god: ['Nothing above', 'No one to remember mankind'],
          world: ['The cosmos', 'Cooling, and running down'],
          bridge: ['Progress', 'A stair to nowhere, in the end'],
          self: ['Man', 'Remembered for a while, then gone'],
        },
      },
    ]),
  },

  nihilism: {
    name: 'Nihilism',
    tagline: 'No God above, and no meaning below.',
    move: { to: 'existentialism', q: 'What if man makes his own meaning?' },
    acts: build(nihilismBase, [
      {
        slug: 'accident',
        name: 'An Accident',
        text: 'The cosmos is here for no reason, and so is man. Nobody intended either.',
        p: {},
        labels: {
          god: ['Nothing above', 'No God and no purpose'],
          world: ['The cosmos', 'Here for no reason'],
          bridge: ['Meaning drains away', 'Nothing is left to hold it'],
          self: ['Man', 'An accident'],
        },
      },
      {
        slug: 'no-meaning',
        name: 'No Meaning',
        text: 'Nothing is good or evil, and nothing is worth more than anything else. Even truth is in doubt.',
        p: { drain: 0.6, pool: 0.5, lat: 0.2, pulse: 0, empty: 0.38 },
        labels: {
          god: ['Nothing above', 'No one to judge'],
          world: ['The cosmos', 'Empty of value'],
          bridge: ['Meaning drains away', 'Nothing is left to hold it'],
          self: ['Man', 'He cannot trust his own mind'],
        },
      },
      {
        slug: 'no-remedy',
        name: 'No Remedy',
        text: 'Nothing is wrong, so nothing can be put right. Few people manage to live as if this were true.',
        p: { drain: 0.8, pool: 0.75, lat: 0, pulse: 0, empty: 0.3, hollow: 1, manA: 0.3 },
        labels: {
          god: ['Nothing above', 'No one to save'],
          world: ['The cosmos', 'It offers nothing'],
          bridge: ['No way out', 'And nowhere to go'],
          self: ['Man', 'Hollow, with no reason to act'],
        },
      },
      {
        slug: 'nothing',
        name: 'Nothing',
        text: 'Death ends every life, and the cosmos will not notice. It makes no difference that anyone lived.',
        p: { drain: 1, pool: 1, lat: 0, pulse: 0, empty: 0.2, hollow: 1, manA: 0, dull: 1, lBrY: -0.62, tBrX: 0.13, tBrY: -0.64 },
        labels: {
          god: ['Nothing above', 'Nothing ahead'],
          world: ['The cosmos', 'Emptied'],
          bridge: ['All of it runs off', 'Nothing is kept'],
          self: ['Man', 'Gone, and it did not matter'],
        },
      },
    ]),
  },

  existentialism: {
    name: 'Existentialism',
    tagline: 'The world has no meaning, so man must make his own.',
    move: { to: 'postmodernism', q: 'What if even the self is made by language?' },
    acts: build(existentialismBase, [
      {
        slug: 'thrown',
        name: 'Thrown In',
        text: 'Man finds himself in a world with no meaning. He exists first, and what he is has yet to be decided.',
        p: {},
        labels: {
          god: ['Nothing above', 'No God to give a purpose'],
          world: ['The world', 'Solid, silent and absurd'],
          self: ['Man', 'Existence comes before essence'],
        },
      },
      {
        slug: 'absurd',
        name: 'The Absurd',
        text: 'Man wants meaning and the world has none to give. Living by other people’s rules only hides the fact.',
        p: { stainR: 0.13, stainA: 0.4, selfA: 0.15, selfR: 0.07 },
        labels: {
          god: ['Nothing above', 'No one to answer'],
          world: ['The world', 'It answers nothing'],
          self: ['Man', 'Free, anxious and alone'],
          sin: ['Bad faith', 'Hiding from his own freedom'],
        },
      },
      {
        slug: 'choice',
        name: 'Choice',
        text: 'He must choose, and his choices make him what he is. Whatever meaning his life has, he gives it.',
        p: { selfA: 1, selfR: 0.2, glow: 0.35, rip: 0.5 },
        labels: {
          god: ['Nothing above', 'No one to correct him'],
          world: ['The world', 'Still silent'],
          bridge: ['Meaning of his own making', 'Any choice will do, if it is truly his'],
          self: ['Man', 'What he chooses, he becomes'],
        },
      },
      {
        slug: 'death',
        name: 'Death',
        text: 'Death ends what he was making of himself. His meaning lasts no longer than he does.',
        p: { selfA: 0.3, selfR: 0.13, hollow: 1, manA: 0.22, dull: 1, lBrY: 0.4, tBrX: 0.1, tBrY: 0.07 },
        labels: {
          god: ['Nothing above', 'No one to keep what he made'],
          world: ['The world', 'It goes on unchanged'],
          bridge: ['Meaning of his own making', 'It fades when he does'],
          self: ['Man', 'His work ends with him'],
        },
      },
    ]),
  },

  postmodernism: {
    name: 'Postmodernism',
    tagline: 'No truth, only stories, and every story serves power.',
    move: { to: 'marxism', q: 'What if one story is true after all: class war?' },
    acts: build(postmodernBase, [
      {
        slug: 'only-stories',
        name: 'Only Stories',
        text: 'No one can know reality as it is. Language does not describe the world; it builds one. Each culture lives inside its own stories, and none stands above the rest.',
        p: {},
        labels: {
          god: ['Nothing above', 'No Word, only words'],
          world: ['Reality', 'Hidden behind our words'],
          bridge: ['Language', 'It builds the world it seems to show'],
          self: ['Man', 'Made by the stories told about him'],
        },
      },
      {
        slug: 'power',
        name: 'Power',
        text: 'Every claim to truth is a bid for power. The grand stories of God, reason and progress have been used to silence those who see the world otherwise.',
        p: { dominant: 1, stainR: 0.1, stainA: 0.45, dull: 0.2 },
        labels: {
          god: ['Nothing above', 'One more story, told for power'],
          world: ['Reality', 'Painted in the rulers’ colours'],
          bridge: ['The grand story', 'Called a mask for power'],
          self: ['Man', 'Shaped by those in power'],
          sin: ['Oppression', 'Called wrong, though nothing is'],
        },
      },
      {
        slug: 'deconstruction',
        name: 'Deconstruction',
        text: 'Take the grand stories apart and expose the power behind them. Let every group tell its own story, and let none claim to be true for all.',
        p: { gap: 1, script: 0.6, stainR: 0.07, stainA: 0.25, glow: 0.3, rip: 0.5 },
        labels: {
          god: ['Nothing above', 'Truth with a small t'],
          world: ['Reality', 'Whatever a group agrees on'],
          bridge: ['Deconstruction', 'It spares only its own story'],
          self: ['Man', 'Free to tell his own story'],
          sin: ['Oppression', 'Named, with no standard to judge it'],
        },
      },
      {
        slug: 'endless-play',
        name: 'Endless Play',
        text: 'There is no final chapter. Stories replace stories, and no one can say which is true. What works for now is all we can hope for.',
        p: { gap: 1, play: 1, script: 0.3, worldA: 0.75, bundle: 1, scatter: 0.8, manA: 0.6, dull: 0.3 },
        labels: {
          god: ['Nothing above', 'No last word'],
          world: ['Reality', 'Lost for good'],
          bridge: ['Stories', 'Endless, and none of them true'],
          self: ['The self', 'Coming apart'],
        },
      },
    ]),
  },

  marxism: {
    name: 'Marxism',
    tagline: 'History is a war of classes, and revolution will end it.',
    move: { to: 'individualism', q: 'What if it is the self that needs freeing?' },
    acts: build(marxistBase, [
      {
        slug: 'matter-in-motion',
        name: 'Matter in Motion',
        text: 'Matter is all there is, and it moves forward through conflict. Man is a working animal. How he makes his living shapes his laws, his morals and his religion.',
        p: {},
        labels: {
          god: ['Nothing above', '“The opium of the people”'],
          world: ['Society', 'Built on how men make a living'],
          bridge: ['The economic base', 'All ideas rest on it, even Marx’s'],
          self: ['Man', 'The sum of his social relations'],
        },
      },
      {
        slug: 'alienation',
        name: 'Alienation',
        text: 'Private property split mankind into classes. The owners live on what the workers make, and the worker is cut off from his work, from others and from himself.',
        p: { split: 0.35, land: [0.92, 0.7, 0.3], extract: 1, stainOn: 1, stainR: 0.09, stainA: 0.55, dull: 0.25, tBrX: 0.188, tBrY: -0.06 },
        labels: {
          god: ['Nothing above', '“The sigh of the oppressed”'],
          world: ['Class society', 'Owners against workers'],
          bridge: ['Surplus value', 'As if labour alone made value'],
          self: ['The worker', 'A stranger to his own work'],
          sin: ['Exploitation', 'Evil in the system, not the heart'],
        },
      },
      {
        slug: 'revolution',
        name: 'Revolution',
        text: 'The workers will rise and overthrow the owners by force. Their party will rule in their name, take the land and the factories, and plan all production from the centre.',
        p: { split: 0.35, land: [0.6, 0.12, 0.12], churn: 0.5, revolt: 1, lat: 0.5, stainOn: 1, stainR: 0.1, stainA: 0.6, glow: 0.3, rip: 0.6, lBrY: 0.12, tBrX: 0.012, tBrY: 0 },
        labels: {
          god: ['Nothing above', 'Man must save himself'],
          world: ['The workers’ state', 'Planned without prices to plan by'],
          bridge: ['Revolution', 'Salvation by seizing power'],
          self: ['The new man', 'To be remade by new conditions'],
          sin: ['Exploitation', 'Still in the hearts of the new rulers'],
        },
      },
      {
        slug: 'communism',
        name: 'Communism',
        text: 'In the end the state will wither away. With no classes and no property, all will share: “from each according to his ability, to each according to his needs.”',
        p: { level: 1, strata: 0, churn: 0, worldA: 0.6, sea: [0.92, 0.66, 0.56], land: [0.94, 0.8, 0.6], manA: 0.2, hollow: 1, manI: 0.6, glow: 0.3 },
        labels: {
          god: ['Nothing above', 'No judgement to come'],
          world: ['The classless society', 'Heaven on earth, always to come'],
          self: ['Man', 'Spent for a future he will not see'],
        },
      },
    ]),
  },
  individualism: {
    name: 'Expressive Individualism',
    tagline: 'The true self lies within, and must be set free.',
    move: { to: 'transhumanism', q: 'What if the body itself can be remade to fit the self?' },
    acts: build(individualBase, [
      {
        slug: 'the-inner-self',
        name: 'The Inner Self',
        text: 'Each person has a true self within: feelings and desires that are his alone. Who he really is, he finds by looking inward, not to God or to others.',
        p: {},
        labels: {
          god: ['Nothing above', 'Look within instead'],
          world: ['Society', 'A stage for the self'],
          self: ['The self', 'Its feelings are its truth'],
        },
      },
      {
        slug: 'repression',
        name: 'Repression',
        text: 'What is wrong lies outside the self: family, tradition, religion and the moral rules that tell people who to be. To deny one’s desires is to be false to oneself.',
        p: { rings: 0, fence: 1, selfA: 0.15, selfR: 0.05, dull: 0.3, stainR: 0.14 },
        labels: {
          god: ['Nothing above', 'Or one more rule to throw off'],
          world: ['Society', 'Its rules hem the self in'],
          self: ['The self', 'Held in by others’ rules'],
          sin: ['Repression', 'Sin is saying no to oneself'],
        },
      },
      {
        slug: 'self-expression',
        name: 'Self-Expression',
        text: 'Freedom comes by discovering who you really are and expressing it, whatever others think. Society’s task is to affirm each person’s chosen identity.',
        p: { ringDir: 1, fence: 0.35, burst: 1, selfA: 1, selfR: 0.22, glow: 0.4, rip: 0.6 },
        labels: {
          god: ['Nothing above', 'The self is its own judge'],
          world: ['Society', 'Required to affirm'],
          bridge: ['Authenticity', 'Following the heart, which deceives'],
          self: ['The self', 'Its own maker'],
        },
      },
      {
        slug: 'fulfilment',
        name: 'Fulfilment',
        text: 'The goal of life is to become fully oneself and to feel fulfilled. Beyond that there is no hope: when the self dies, the story it told about itself ends.',
        p: { rings: 0.4, ringDir: 1, selfA: 0.7, selfR: 0.3, sea: [0.82, 0.5, 0.72], land: [0.95, 0.62, 0.48], manA: 0.3, hollow: 1, manI: 0.7, glow: 0.2 },
        labels: {
          god: ['Nothing above', 'No one to say who I am'],
          world: ['Society', 'A crowd of selves, each alone'],
          self: ['The self', 'Fulfilled, until it dies'],
        },
      },
    ]),
  },

  transhumanism: {
    name: 'Transhumanism',
    tagline: 'Man is unfinished, and technology will finish him.',
    move: { to: 'new-age', q: 'What if man becomes divine by awakening, not by machines?' },
    acts: build(transhumanBase, [
      {
        slug: 'unfinished',
        name: 'Unfinished',
        text: 'Man is a product of evolution, and evolution is not done. Human nature is a work in progress, and we can now take the work into our own hands.',
        p: {},
        labels: {
          god: ['Nothing above', '“Not yet”'],
          world: ['Nature', 'Raw material to improve on'],
          self: ['Man', 'A rough draft, not God’s image'],
        },
      },
      {
        slug: 'limits',
        name: 'Limits',
        text: 'What is wrong is our biology: ageing, disease, weakness and death. These are not punishments or mysteries. They are engineering problems.',
        p: { stainR: 0.12, stainA: 0.5, stainC: [0.34, 0.34, 0.38], dull: 0.45, manA: 0.8, rip: -0.4 },
        labels: {
          god: ['Nothing above', 'No one to blame for death'],
          world: ['Nature', 'Blind, cruel and slow'],
          self: ['Man', 'Trapped in a failing body'],
          sin: ['Death', 'A problem to solve, not a wage'],
        },
      },
      {
        slug: 'enhancement',
        name: 'Enhancement',
        text: 'Science will make us more than human: genes edited, bodies repaired, minds joined to machines. Each person may choose his own upgrades.',
        p: { circuit: 0.2, manC: [0.42, 0.58, 0.7], stainR: 0.07, stainA: 0.25, stainC: [0.34, 0.34, 0.38], glow: 0.4, rip: 0.5 },
        labels: {
          god: ['Nothing above', 'Man means to fill the gap'],
          world: ['Nature', 'Being redesigned'],
          bridge: ['Technology', 'Salvation by upgrade'],
          self: ['The posthuman', 'Remade by his own hand'],
          sin: ['Death', 'Delayed, not defeated'],
        },
      },
      {
        slug: 'the-singularity',
        name: 'The Singularity',
        text: 'Machines will one day surpass their makers. Minds may be copied into computers and live on for as long as the hardware runs. Death will be optional.',
        p: { circuit: 1, upload: 1, manC: [0.42, 0.58, 0.7], manA: 0.3, hollow: 1, manI: 0.7, dull: 0.35, sea: [0.46, 0.56, 0.62], land: [0.6, 0.64, 0.64], rG: 0.24, lGodK: 0.36, lBrX: 0.2, lBrY: 0.3, tBrX: 0.012, tBrY: 0.3 },
        labels: {
          god: ['The Singularity', '“You will be like God”'],
          world: ['Nature', 'Wired over'],
          bridge: ['Uploading', 'A copy, but is anyone in it?'],
          self: ['The body', 'Left behind'],
        },
      },
    ]),
  },

  'new-age': {
    name: 'New Age',
    tagline: 'All is one, all is divine, and so are you.',
    move: { to: 'neo-paganism', q: 'What if the gods are many?' },
    acts: build(newAgeBase, [
      {
        slug: 'all-is-one',
        name: 'All Is One',
        text: 'Everything is one, and the one is divine: a living energy, not a Person. Each of us is a spark of it. In the depths of the self, each person is God.',
        p: {},
        labels: {
          god: ['The Universe', 'Energy, not a Person'],
          world: ['The cosmos', 'One with the self'],
          self: ['The self', '“I am God”'],
        },
      },
      {
        slug: 'forgetting',
        name: 'Forgetting',
        text: 'What is wrong is not sin but forgetting. We have lost sight of our own divinity and live shut inside narrow, everyday consciousness.',
        p: { aura: 0.15, stainR: 0.1, stainA: 0.35, dull: 0.35, mist: 0.7 },
        labels: {
          god: ['The Universe', 'No one to offend'],
          world: ['The cosmos', 'Seen only on the surface'],
          self: ['The self', 'Asleep to its own divinity'],
          sin: ['Forgetting', 'Not sin, only a narrow mind'],
        },
      },
      {
        slug: 'awakening',
        name: 'Awakening',
        text: 'Meditation, crystals, channelling and other techniques open the mind to a higher consciousness. The awakened self finds that it creates its own reality.',
        p: { aura: 1, spiral: 1, stainR: 0.06, stainA: 0.15, glow: 0.5, rip: 0.6 },
        labels: {
          god: ['The Universe', 'Tapped, not worshipped'],
          world: ['The cosmos', 'Shaped by the mind'],
          bridge: ['Cosmic consciousness', 'Where right and wrong dissolve'],
          self: ['The self', 'Creating its own reality'],
          sin: ['Forgetting', 'Cured by technique, not grace'],
        },
      },
      {
        slug: 'ascension',
        name: 'Ascension',
        text: 'Death is a passage, not an end. The soul returns in life after life, rising toward the light, and mankind is on the edge of a new age.',
        p: { aura: 0.8, spiral: 1, spiralW: 1, manA: 0.3, hollow: 1, manI: 0.7, mist: 1.15, glow: 0.4, tBrX: 0.05 },
        labels: {
          god: ['The Universe', 'Reached by climbing, not by grace'],
          world: ['The new age', 'Always about to dawn'],
          bridge: ['Reincarnation', 'Life after life, and no Saviour'],
          self: ['The soul', 'Rising, with no judgement to face'],
        },
      },
    ]),
  },

  'neo-paganism': {
    name: 'Neo-Paganism',
    tagline: 'The earth is sacred, and the wheel of the year turns for ever.',
    move: { to: 'hindu-monism', q: 'What if the many gods are faces of one?' },
    acts: build(paganBase, [
      {
        slug: 'the-sacred-earth',
        name: 'The Sacred Earth',
        text: 'The divine lives within nature. Wiccans honour a Goddess and a God, other pagans many gods. The earth is the Goddess’s body, and all life shares in her.',
        p: {},
        labels: {
          god: ['The Goddess', 'Maiden, Mother and Crone'],
          world: ['The earth', 'Her body, and divine'],
          bridge: ['The wheel of the year', 'Eight festivals, turning for ever'],
          self: ['Man', 'A child of the earth'],
        },
      },
      {
        slug: 'disconnection',
        name: 'Disconnection',
        text: 'Nothing in us is sinful. What has gone wrong is that people have lost touch with nature and the old ways, cut off by cities, machines and the churches.',
        p: { wheelYr: 0.35, stainR: 0.11, stainA: 0.45, dull: 0.45, moons: 0.7 },
        labels: {
          god: ['The Goddess', 'Forgotten, not offended'],
          world: ['The earth', 'Wounded by industry'],
          self: ['Man', 'Cut off from the earth'],
          sin: ['Disconnection', 'Imbalance, not sin'],
        },
      },
      {
        slug: 'ritual-and-magic',
        name: 'Ritual and Magic',
        text: 'Rites at the full moon and the festivals restore the bond. Magic works by will and the energies of nature, bound only by the Rede: “An it harm none, do what ye will.”',
        p: { cast: 1, stainR: 0.06, stainA: 0.15, glow: 0.4, rip: 0.5, lBrX: 0.47, lBrY: 0.12, tBrX: 0.09, tBrY: -0.03 },
        labels: {
          god: ['The Goddess', 'Called down in the rite'],
          world: ['The earth', 'Served in place of its Maker'],
          bridge: ['Magic', 'Power sought, not grace received'],
          self: ['The pagan', '“Harm none”, by his own measure'],
          sin: ['Disconnection', 'Healed by ritual, with nothing to forgive'],
        },
      },
      {
        slug: 'the-wheel-turns',
        name: 'The Wheel Turns',
        text: 'Death is part of the cycle, like winter. The soul rests in the Summerland and is born again. The wheel turns, and nothing ends or is made new.',
        p: { manA: 0.3, hollow: 1, manI: 0.7, dull: 0.2 },
        labels: {
          god: ['The Goddess', 'Crone, and then Maiden again'],
          world: ['The earth', 'Always turning, never made new'],
          bridge: ['The wheel of the year', 'Round and round, with no last day'],
          self: ['Man', 'Back to the earth, and born again'],
        },
      },
    ]),
  },

  'hindu-monism': {
    name: 'Hindu Monism',
    tagline: 'All is one, and the one is Brahman.',
    move: { to: 'buddhism', q: 'What if there is no self, and no One either?' },
    acts: build(hinduBase, [
      {
        slug: 'the-one',
        name: 'The One',
        text: 'Brahman alone is real: one, without parts and beyond all description. Everything that exists is Brahman.',
        p: {},
        labels: {
          god: ['Brahman', 'The One, and all that is'],
          world: ['The world', 'Not made by Brahman: it is Brahman'],
          self: ['Atman', 'The self is Brahman too'],
        },
      },
      {
        slug: 'ignorance',
        name: 'Ignorance',
        text: 'The many things we see are maya, an appearance. Mistaking them for real, the self is reborn again and again.',
        p: { maya: 1, wheel: 1, hollow: 0, stainR: 0.12, stainA: 0.5 },
        labels: {
          god: ['Brahman', 'The only reality'],
          world: ['Maya', 'An illusion, but whose?'],
          bridge: ['Samsara', 'The wheel of rebirth, driven by karma'],
          self: ['Atman', 'It believes it is separate'],
          sin: ['Avidya', 'Ignorance of what the self is'],
        },
      },
      {
        slug: 'knowledge',
        name: 'Knowledge',
        text: 'Release comes by knowing that the self is Brahman. Meditation and discipline lead there, often over many lives.',
        p: { maya: 0.6, wheel: 0.7, hollow: 1, manC: [0.9, 0.42, 0.16], manA: 0.6, stainR: 0.07, stainA: 0.2, glow: 0.7, rip: 0.7 },
        labels: {
          god: ['Brahman', 'Beyond good and evil'],
          world: ['Maya', 'Seen through'],
          bridge: ['Samsara', 'Many lives may pass first'],
          self: ['Atman', '“You are that”'],
          sin: ['Avidya', 'Clearing'],
        },
      },
      {
        slug: 'release',
        name: 'Release',
        text: 'The self is freed from rebirth and is no longer separate, like a drop returning to the sea. No person remains.',
        p: { maya: 0.15, wheel: 0.12, manA: 0, manI: 0.3, glow: 0.5 },
        labels: {
          god: ['Brahman', 'All that there ever was'],
          world: ['Moksha', 'Release from the wheel'],
          self: ['The self', 'No one is left to enjoy it'],
        },
      },
    ]),
  },
  buddhism: {
    name: 'Buddhism',
    tagline: 'Life is suffering, and the cure is to stop craving.',
    move: { to: 'taoism', q: 'What if we should flow with change, not escape it?' },
    acts: build(buddhistBase, [
      {
        slug: 'impermanence',
        name: 'Impermanence',
        text: 'Everything arises from causes and passes away. Nothing lasts: there is no creator and no lasting self.',
        p: {},
        labels: {
          god: ['No creator', 'Even the gods are born and die'],
          world: ['All things', 'Arising and passing away'],
          self: ['The self', 'Five passing parts, and no soul'],
        },
      },
      {
        slug: 'suffering',
        name: 'Suffering',
        text: 'Life is suffering, because we crave what cannot last. Craving makes karma, and karma brings rebirth.',
        p: { wheel: 1, stainR: 0.13, stainA: 0.55, dull: 0.3 },
        labels: {
          god: ['No creator', 'No one above to help'],
          world: ['Samsara', 'Birth, death and birth again'],
          bridge: ['Rebirth', 'Though no self is reborn'],
          self: ['The self', 'Grasping at what cannot last'],
          sin: ['Craving', 'Thirst for what passes'],
        },
      },
      {
        slug: 'the-path',
        name: 'The Path',
        text: 'Craving can be ended. The Eightfold Path of wisdom, conduct and meditation leads there, and each must walk it himself.',
        p: { wheel: 0.35, spokes: 1, flux: 0.7, stainR: 0.07, stainA: 0.2, glow: 0.5 },
        labels: {
          god: ['No creator', 'No grace from outside'],
          bridge: ['The Eightfold Path', 'Wisdom, conduct and meditation'],
          self: ['The self', 'At the hub, by its own effort'],
          sin: ['Craving', 'Cooling'],
        },
      },
      {
        slug: 'nirvana',
        name: 'Nirvana',
        text: 'When craving ends, rebirth ends and the flame goes out. The Buddha would not say whether anyone remains.',
        p: { wheel: 0, spokes: 0, flux: 0.3, worldA: 0.45, warm: 0, sea: [0.86, 0.84, 0.82], land: [0.88, 0.86, 0.84], scatter: 1, hollow: 1, manA: 0, manI: 0.7, glow: 0.3, bare: 0.6 },
        labels: {
          god: ['No creator', 'Nothing above to meet'],
          world: ['Nirvana', 'The flame blown out'],
          self: ['The self', 'Was anyone ever there?'],
        },
      },
    ]),
  },
  taoism: {
    name: 'Taoism',
    tagline: 'Go with the Way of nature, and never force it.',
    move: { to: 'confucianism', q: 'What if order comes from duty, not from letting go?' },
    acts: build(taoistBase, [
      {
        slug: 'the-way',
        name: 'The Way',
        text: 'The Tao is the nameless source of all things. From it come yin and yang, and from their turning, everything else.',
        p: {},
        labels: {
          god: ['The Tao', 'The Way that cannot be named'],
          world: ['The ten thousand things', 'Yin and yang, always turning'],
          self: ['Man', 'One thing among ten thousand'],
        },
      },
      {
        slug: 'forcing',
        name: 'Forcing',
        text: 'Trouble comes when man forces things by grasping, scheming and making rules. He falls out of step with the Way.',
        p: { push: 1, stainR: 0.12, stainA: 0.5, dull: 0.25 },
        labels: {
          god: ['The Tao', 'It does not take sides'],
          world: ['The ten thousand things', 'Still turning'],
          self: ['Man', 'Pushing against the current'],
          sin: ['Forcing', 'Grasping, scheming, rules'],
        },
      },
      {
        slug: 'not-forcing',
        name: 'Not Forcing',
        text: 'Stop striving and yield, like water: soft, yet it wears away stone. Live simply and let things take their course.',
        p: { current: 1, push: 0, along: 1, stainR: 0.05, stainA: 0.12, glow: 0.4 },
        labels: {
          god: ['The Tao', 'Followed, but never met'],
          world: ['The ten thousand things', 'Light and dark, both needed'],
          bridge: ['Wu wei', 'Moving with the current'],
          self: ['Man', 'Yielding, like water'],
        },
      },
      {
        slug: 'return',
        name: 'Return',
        text: 'At death a person changes back into the Way, as autumn gives way to winter. There is nothing to mourn.',
        p: { Gy: 0.22, rG: 0.5, lGodK: 0.62, current: 0.6, manA: 0, hollow: 1, manI: 0.35, mist: 1.2 },
        labels: {
          god: ['The Tao', 'Unaware that he has gone'],
          world: ['The ten thousand things', 'Turning on without end'],
          self: ['Man', 'Changed back into the Way'],
        },
      },
    ]),
  },
  confucianism: {
    name: 'Confucianism',
    tagline: 'Do your duty in your place, and there will be order.',
    move: { to: 'animism', q: 'What if the ancestors are not the only spirits?' },
    acts: build(confucianBase, [
      {
        slug: 'order',
        name: 'Order',
        text: 'Heaven orders all things but does not speak. Man is born into bonds of duty, and his nature is good, if cultivated.',
        p: {},
        labels: {
          god: ['Heaven', '“What does Heaven ever say?”'],
          world: ['All under Heaven', 'The family, and the state'],
          bridge: ['The five bonds', 'Each with its own duties'],
          self: ['Man', 'Good by nature, if cultivated'],
        },
      },
      {
        slug: 'disorder',
        name: 'Disorder',
        text: 'Disorder comes when people neglect their duties: rulers without virtue, sons without respect. The bonds loosen.',
        p: { loose: 1, stainR: 0.12, stainA: 0.45, dull: 0.3 },
        labels: {
          god: ['Heaven', 'Silent still'],
          world: ['All under Heaven', 'Out of order'],
          bridge: ['The five bonds', 'Loosened'],
          self: ['Man', 'Out of his place'],
          sin: ['Neglect', 'Duties left undone'],
        },
      },
      {
        slug: 'cultivation',
        name: 'Cultivation',
        text: 'Order returns through study, ritual and respect for parents. The gentleman perfects himself, and his example spreads.',
        p: { stainR: 0.05, stainA: 0.12, glow: 0.6, rip: 0.8 },
        labels: {
          god: ['Heaven', 'Read only in the order of things'],
          world: ['All under Heaven', 'In order again'],
          bridge: ['Ritual', 'Right conduct, practised daily'],
          self: ['The gentleman', 'Made good by his own effort'],
          sin: ['Neglect', 'Mended'],
        },
      },
      {
        slug: 'remembrance',
        name: 'Remembrance',
        text: 'Confucius said little of death: “Not yet knowing life, how can we know death?” The living honour the dead with rites.',
        p: { lineage: 1, manA: 0.25, hollow: 1, manI: 0.6, tBrX: 0.03, tBrY: 0.14 },
        labels: {
          god: ['Heaven', 'Says nothing of death'],
          world: ['All under Heaven', 'Order handed down'],
          bridge: ['The ancestors', 'Honoured by the living'],
          self: ['Man', 'Remembered while the rites go on'],
        },
      },
    ]),
  },
  animism: {
    name: 'Animism',
    tagline: 'The world is full of spirits, and they must be kept content.',
    move: { to: 'platonism', q: 'What if reason can climb past the spirits to the Good?' },
    acts: build(animistBase, [
      {
        slug: 'a-world-alive',
        name: 'A World Alive',
        text: 'Spirits live in rivers, trees, animals and the dead. Far above them is a Creator, but he has withdrawn and is seldom called on.',
        p: {},
        labels: {
          god: ['The High God', 'Far off, and seldom called on'],
          world: ['The world', 'Alive with spirits'],
          self: ['Man', 'One life among many spirits'],
        },
      },
      {
        slug: 'offence',
        name: 'Offence',
        text: 'Sickness and misfortune come when spirits are offended, taboos broken or curses laid. Life is lived in fear of unseen powers.',
        p: { pull: 1, anger: 1, stainR: 0.1, stainA: 0.3, dull: 0.35 },
        labels: {
          god: ['The High God', 'Too far away to help'],
          world: ['The world', 'Its spirits turned against him'],
          self: ['Man', 'Afraid of what he cannot see'],
          sin: ['Offence', 'A taboo broken, a spirit angered'],
        },
      },
      {
        slug: 'appeasement',
        name: 'Appeasement',
        text: 'A diviner finds out which spirit is angry. Sacrifices, charms and rites appease it and restore the balance, for a while.',
        p: { pull: 0.75, anger: 0.15, offer: 1, stainR: 0.05, stainA: 0.12, dull: 0.1 },
        labels: {
          god: ['The High God', 'Still not called on'],
          world: ['The world', 'Balanced again, for now'],
          bridge: ['Sacrifice', 'Given to buy peace'],
          self: ['Man', 'Bargaining for safety'],
          sin: ['Offence', 'Appeased, not forgiven'],
        },
      },
      {
        slug: 'the-ancestors',
        name: 'The Ancestors',
        text: 'At death a person joins the ancestors, who stay near and must be fed. When no one remembers their names, they fade away.',
        p: { near: 1, manA: 0.2, hollow: 1, manI: 0.55, spirits: 0.8 },
        labels: {
          god: ['The High God', 'Still far off'],
          world: ['The world', 'Its spirits remain'],
          self: ['Man', 'An ancestor, until forgotten'],
        },
      },
    ]),
  },
  platonism: {
    name: 'Platonism',
    tagline: 'The real world lies above this one, and the soul must climb back to it.',
    move: { to: 'gnosticism', q: 'What if the craftsman is blind?' },
    acts: build(platonistBase, [
      {
        slug: 'two-worlds',
        name: 'Two Worlds',
        text: 'Above the changing world are the Forms: perfect, eternal patterns, with the Good over them all. A divine craftsman shaped matter after them, so all we see is a copy.',
        p: {},
        labels: {
          god: ['The Good', 'Source of all, but not a person'],
          world: ['The world of becoming', 'Copies, always changing'],
          bridge: ['The Forms', 'Perfect and unchanging'],
          self: ['Man', 'An immortal soul in a body'],
        },
      },
      {
        slug: 'the-cave',
        name: 'The Cave',
        text: 'The soul has fallen into a body and forgotten the Forms. Like prisoners in a cave, people take shadows for the real thing.',
        p: { forms: 0.3, partake: 0, copyDark: 1, manA: 0.95, anger: 0.7, godA: 0.6, stainR: 0.12, stainA: 0.4, dull: 0.55 },
        labels: {
          god: ['The Good', 'Shining, but unseen'],
          world: ['The cave', 'Shadows taken for real'],
          bridge: ['The Forms', 'Forgotten'],
          self: ['The soul', 'Imprisoned in the body'],
          sin: ['Ignorance', 'Forgetting, not rebellion'],
        },
      },
      {
        slug: 'the-ascent',
        name: 'The Ascent',
        text: 'Philosophy turns the soul from shadows toward the light. Through reason and self-discipline it recalls the Forms and climbs toward the Good.',
        p: { forms: 0.85, partake: 0.5, copyDark: 0.3, manA: 0.45, soulY: 0.07, ladder: 1, stainR: 0.05, stainA: 0.12, dull: 0.15, glow: 0.3, lBrX: 0.3, lBrY: 0.03, tBrX: 0.032, tBrY: 0.02 },
        labels: {
          god: ['The Good', 'Waiting to be reached'],
          world: ['The world of becoming', 'Seen through at last'],
          bridge: ['The ascent', 'By reason, for the few'],
          self: ['The philosopher', 'Recalling what he once knew'],
          sin: ['Ignorance', 'Cured by knowledge'],
        },
      },
      {
        slug: 'release',
        name: 'Release',
        text: 'At death the purified soul leaves the body for good and returns to the Forms. Other souls are born again into new bodies.',
        p: { soulY: 0.3, manA: 0.15, hollow: 1, manI: 0.6, ladder: 0.5, rebirth: 1, partake: 0.6, lBrX: 0.3, lBrY: 0.45, tBrX: 0.035, tBrY: 0.33 },
        labels: {
          god: ['The Good', 'Seen at last, but it cannot love'],
          world: ['The world of becoming', 'Where other souls are reborn'],
          bridge: ['The soul', 'Free of the body for ever'],
          self: ['The body', 'Left behind like a tomb'],
        },
      },
    ]),
  },
  gnosticism: {
    name: 'Gnosticism',
    tagline: 'A lesser god made this world, and secret knowledge is the way out.',
    move: { to: 'christian', q: 'What if God came in the flesh?' },
    acts: build(gnosticBase, [
      {
        slug: 'the-fullness',
        name: 'The Fullness',
        text: 'The true God dwells far above in the Fullness, beyond all knowing. One of its powers fell, and from her error came a lesser god. He made this world, and thinks he is the only God.',
        p: { sophia: 1 },
        labels: {
          god: ['The true God', 'Beyond all knowing'],
          world: ['The world', 'Matter, made by mistake'],
          bridge: ['The maker', 'A lesser god, and blind'],
          self: ['Man', 'A spark of God in clay'],
        },
      },
      {
        slug: 'the-prison',
        name: 'The Prison',
        text: 'Sparks of the true God lie asleep in human bodies, held there by the maker’s rulers. The trouble is not sin but matter, and forgetting who you really are.',
        p: { sophia: 0.3, guard: 1, anger: 0.5, stainR: 0.12, stainA: 0.45, dull: 0.5 },
        labels: {
          god: ['The true God', 'Beyond all knowing'],
          world: ['The prison', 'Ruled by his powers'],
          bridge: ['The maker', 'Jailer, not Father'],
          self: ['The spark', 'Asleep in the body'],
          sin: ['Matter', 'Evil in the stuff, not the will'],
        },
      },
      {
        slug: 'knowledge',
        name: 'Knowledge',
        text: 'A Revealer comes down in disguise. He only seems to have a body, and he dies for no one. He brings secret knowledge, and those with the spark wake up and remember their home.',
        p: { guard: 0.4, gates: 0.75, seeming: 1, stainR: 0.07, stainA: 0.2, dull: 0.3, glow: 0.5, lBrY: 0.04, tBrX: 0.045, tBrY: 0.02 },
        labels: {
          god: ['The true God', 'Beyond all knowing'],
          world: ['The world', 'Not worth saving'],
          bridge: ['The Revealer', 'He only seemed to be flesh'],
          self: ['The awakened few', 'Saved by knowing, not by grace'],
          sin: ['Matter', 'Escaped, never forgiven'],
        },
      },
      {
        slug: 'the-return',
        name: 'The Return',
        text: 'At death the awakened spark rises past the rulers of the heavens, gives them the secret words and goes home. The body is left to rot, and in the end all matter is destroyed.',
        p: { soulY: 0.5, gates: 1, demi: 0.45, worldA: 0.6, dull: 0.6, manA: 0.15, hollow: 1, manI: 0.6, glow: 0.3, lBrY: 0.39, tBrX: 0.03, tBrY: 0.5 },
        labels: {
          god: ['The true God', 'Reached, but still unknown'],
          world: ['The world', 'Burned up, not made new'],
          bridge: ['The spark', 'Home past the gatekeepers'],
          self: ['The body', 'Thrown off for good'],
        },
      },
    ]),
  },
};

export const HOME = 'christian';
