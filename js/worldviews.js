// The worldviews. Each is a set of values the painting and its connectors read:
// a base that holds for the whole worldview, and what changes in each of its four acts.
// Every value is a number or a colour, so any act can blend into any other.

const christianBase = {
  // where things stand (scene units, y up)
  Gy: 0.445, rG: 0.29, Wy: -0.43, rW: 0.36, Sy: -0.4, bOff: 0.03,
  // palette
  glory: [1, 0.94, 0.66], sky: [0.97, 0.76, 0.56], far: [0.8, 0.7, 0.82], low: [0.72, 0.88, 0.85], deep: [0.5, 0.68, 0.8],
  sea: [0.22, 0.6, 0.66], land: [0.3, 0.62, 0.42], warm: 0.55, bg: 0.5,
  godC: [0.98, 0.78, 0.3], godRim: [0.9, 0.46, 0.34], godA: 1,
  stainC: [0.13, 0.11, 0.22], stainS: 0,
  // what is present and what moves
  wave: 1, haloL: 1, haloR: 0, clock: 0, ring: 1,
  box: 0, lat: 0, pulse: 0, bare: 0, manA: 1, manC: [0.9, 0.5, 0.3], empty: 0, drain: 0, pool: 0, hollow: 0,
  selfR: 0.02, selfA: 0, selfC: [0.86, 0.33, 0.24],
  one: 0, maya: 0, worldA: 1, manI: 1, wheel: 0,
  bi: 0, bonds: 0, loose: 0, lineage: 0, yin: 0, mist: 0, current: 0, push: 0, along: 0, flux: 0, bundle: 0, scatter: 0, spokes: 0, scan: 0, lit: 0, stainUp: 0, stainR: 0.02, stainA: 0, glow: 0, dull: 0, rip: 0, ripAt: 1,
  // connectors
  bridge: 0.95, bw: 0.044, bbot: -0.12, crim: 0, cross: 0, snap: 0, flow: 1,
  ghost: 0, reason: 0, tick: 0, acc: [163, 38, 43],
  // lettering
  lGodK: 0.38, lSide: 0.1, lBrX: 0.22, lBrY: 0.145, tBrX: 0.05, tBrY: 0.095,
};

const deismBase = {
  Gy: 0.56, rG: 0.2, Wy: -0.35, rW: 0.31, Sy: -0.35, bOff: -0.1,
  glory: [0.98, 0.96, 0.86], sky: [0.94, 0.9, 0.78], far: [0.8, 0.81, 0.86], low: [0.82, 0.88, 0.9], deep: [0.6, 0.7, 0.8],
  sea: [0.36, 0.56, 0.72], land: [0.46, 0.62, 0.66], warm: 0.25, bg: 0.42,
  godC: [0.97, 0.86, 0.56], godRim: [0.9, 0.74, 0.56], godA: 0.62,
  stainC: [0.46, 0.46, 0.54], stainS: 1,
  wave: 0, haloL: 0, haloR: 1, clock: 1, ring: 0,
  box: 0, lat: 0, pulse: 0, bare: 0, manA: 1, manC: [0.9, 0.5, 0.3], empty: 0, drain: 0, pool: 0, hollow: 0,
  selfR: 0.02, selfA: 0, selfC: [0.86, 0.33, 0.24],
  one: 0, maya: 0, worldA: 1, manI: 1, wheel: 0,
  bi: 0, bonds: 0, loose: 0, lineage: 0, yin: 0, mist: 0, current: 0, push: 0, along: 0, flux: 0, bundle: 0, scatter: 0, spokes: 0, scan: 0, lit: 0, stainUp: 0, stainR: 0.02, stainA: 0, glow: 0, dull: 0.15, rip: 0, ripAt: 1,
  bridge: 0, bw: 0.006, bbot: -0.02, crim: 0, cross: 0, snap: 0, flow: 0,
  ghost: 0.75, reason: 0, tick: 1, acc: [63, 98, 127],
  lGodK: 0.12, lSide: 0.2, lBrX: 0.2, lBrY: 0.14, tBrX: 0.035, tBrY: 0.12,
};

const naturalismBase = {
  Gy: 0.56, rG: 0.19, Wy: -0.24, rW: 0.4, Sy: -0.2, bOff: 0,
  glory: [0.95, 0.95, 0.93], sky: [0.87, 0.9, 0.9], far: [0.8, 0.84, 0.86], low: [0.8, 0.85, 0.8], deep: [0.62, 0.7, 0.76],
  sea: [0.44, 0.58, 0.7], land: [0.5, 0.62, 0.5], warm: 0.4, bg: 0.42,
  godC: [0.95, 0.94, 0.9], godRim: [0.86, 0.86, 0.84], godA: 0,
  stainC: [0.34, 0.36, 0.42], stainS: 1,
  wave: 0, haloL: 0, haloR: 0, clock: 0, ring: 0,
  box: 1, lat: 1, pulse: 1, bare: 1, manA: 1, manC: [0.3, 0.42, 0.54], empty: 0.8, drain: 0, pool: 0, hollow: 0,
  selfR: 0.02, selfA: 0, selfC: [0.86, 0.33, 0.24],
  one: 0, maya: 0, worldA: 1, manI: 1, wheel: 0,
  bi: 0, bonds: 0, loose: 0, lineage: 0, yin: 0, mist: 0, current: 0, push: 0, along: 0, flux: 0, bundle: 0, scatter: 0, spokes: 0, scan: 0, lit: 0, stainUp: 0, stainR: 0.02, stainA: 0, glow: 0, dull: 0, rip: 0, ripAt: 1,
  bridge: 0, bw: 0.006, bbot: -0.02, crim: 0, cross: 0, snap: 0, flow: 0,
  ghost: 0, reason: 0, tick: 0, acc: [70, 100, 78],
  lGodK: 0, lSide: 0.1, lBrX: 0.26, lBrY: 0.29, tBrX: 0.16, tBrY: 0.17,
};

const nihilismBase = {
  Gy: 0.62, rG: 0.15, Wy: 0, rW: 0.34, Sy: 0.04, bOff: 0,
  glory: [0.95, 0.95, 0.94], sky: [0.9, 0.9, 0.9], far: [0.84, 0.84, 0.86], low: [0.86, 0.85, 0.84], deep: [0.76, 0.76, 0.79],
  sea: [0.4, 0.43, 0.5], land: [0.5, 0.5, 0.55], warm: 0.12, bg: 0.34,
  godC: [0.95, 0.94, 0.9], godRim: [0.86, 0.86, 0.84], godA: 0,
  stainC: [0.3, 0.3, 0.36], stainS: 1,
  wave: 0, haloL: 0, haloR: 0, clock: 0, ring: 0,
  box: 1, lat: 0.45, pulse: 0.3, bare: 0.6, manA: 1, manC: [0.42, 0.44, 0.5], empty: 0.45, drain: 0.35, pool: 0.25, hollow: 0,
  selfR: 0.02, selfA: 0, selfC: [0.86, 0.33, 0.24],
  one: 0, maya: 0, worldA: 1, manI: 1, wheel: 0,
  bi: 0, bonds: 0, loose: 0, lineage: 0, yin: 0, mist: 0, current: 0, push: 0, along: 0, flux: 0, bundle: 0, scatter: 0, spokes: 0, scan: 0, lit: 0, stainUp: 0, stainR: 0.02, stainA: 0, glow: 0, dull: 0.6, rip: 0, ripAt: 1,
  bridge: 0, bw: 0.006, bbot: -0.02, crim: 0, cross: 0, snap: 0, flow: 0,
  ghost: 0, reason: 0, tick: 0, acc: [86, 82, 100],
  lGodK: 0, lSide: 0.1, lBrX: 0.27, lBrY: -0.52, tBrX: 0.15, tBrY: -0.44,
};

const existentialismBase = {
  Gy: 0.62, rG: 0.15, Wy: -0.06, rW: 0.38, Sy: -0.02, bOff: 0,
  glory: [0.95, 0.95, 0.94], sky: [0.9, 0.89, 0.88], far: [0.83, 0.83, 0.85], low: [0.85, 0.84, 0.83], deep: [0.74, 0.74, 0.77],
  sea: [0.38, 0.4, 0.46], land: [0.47, 0.47, 0.51], warm: 0.1, bg: 0.36,
  godC: [0.95, 0.94, 0.9], godRim: [0.86, 0.86, 0.84], godA: 0,
  stainC: [0.26, 0.26, 0.32], stainS: 1,
  wave: 0, haloL: 0, haloR: 0, clock: 0, ring: 0,
  box: 1, lat: 0.35, pulse: 0.3, bare: 0.6, manA: 1, manC: [0.85, 0.3, 0.2], empty: 0.4, drain: 0.4, pool: 0, hollow: 0,
  selfR: 0.09, selfA: 0.3, selfC: [0.86, 0.33, 0.24],
  one: 0, maya: 0, worldA: 1, manI: 1, wheel: 0,
  bi: 0, bonds: 0, loose: 0, lineage: 0, yin: 0, mist: 0, current: 0, push: 0, along: 0, flux: 0, bundle: 0, scatter: 0, spokes: 0, scan: 0, lit: 0, stainUp: 0, stainR: 0.02, stainA: 0, glow: 0, dull: 0.7, rip: 0, ripAt: 1,
  bridge: 0, bw: 0.006, bbot: -0.02, crim: 0, cross: 0, snap: 0, flow: 0,
  ghost: 0, reason: 0, tick: 0, acc: [190, 66, 44],
  lGodK: 0, lSide: 0.1, lBrX: 0.3, lBrY: 0.42, tBrX: 0.13, tBrY: 0.11,
};

const hinduBase = {
  // the Ultimate and the world are one shape: the world's own circle is not drawn
  Gy: 0.08, rG: 0.36, Wy: 0.08, rW: 0.46, Sy: -0.02, bOff: 0,
  glory: [0.99, 0.76, 0.34], sky: [0.9, 0.42, 0.58], far: [0.66, 0.5, 0.76], low: [0.92, 0.6, 0.6], deep: [0.7, 0.52, 0.76],
  sea: [0.9, 0.5, 0.4], land: [0.92, 0.6, 0.3], warm: 0.3, bg: 0.46,
  godC: [0.96, 0.52, 0.16], godRim: [0.9, 0.4, 0.42], godA: 1,
  stainC: [0.36, 0.22, 0.4], stainS: 1,
  wave: 0, haloL: 0, haloR: 0, clock: 0, ring: 0,
  box: 0, lat: 0, pulse: 0, bare: 0, manA: 1, manC: [0.74, 0.16, 0.24], empty: 0, drain: 0, pool: 0, hollow: 1,
  selfR: 0.02, selfA: 0, selfC: [0.86, 0.33, 0.24],
  one: 1, maya: 0.5, worldA: 0, manI: 1, wheel: 0,
  bi: 0, bonds: 0, loose: 0, lineage: 0, yin: 0, mist: 0, current: 0, push: 0, along: 0, flux: 0, bundle: 0, scatter: 0, spokes: 0, scan: 0, lit: 0, stainUp: 0, stainR: 0.02, stainA: 0, glow: 0, dull: 0, rip: 0, ripAt: 1,
  bridge: 0, bw: 0.006, bbot: -0.02, crim: 0, cross: 0, snap: 0, flow: 0,
  ghost: 0, reason: 0, tick: 0, acc: [172, 44, 100],
  lGodK: 0.45, lSide: 0.06, lBrX: 0.28, lBrY: 0.63, tBrX: 0.23, tBrY: 0.478,
};

const buddhistBase = {
  // no Ultimate drawn: its place and size only centre the wheel on the self
  Gy: 0.04, rG: 0.3, Wy: 0.04, rW: 0.33, Sy: 0.04, bOff: 0,
  glory: [0.97, 0.93, 0.84], sky: [0.92, 0.86, 0.78], far: [0.8, 0.77, 0.76], low: [0.9, 0.85, 0.78], deep: [0.8, 0.74, 0.72],
  sea: [0.93, 0.67, 0.32], land: [0.88, 0.55, 0.3], warm: 0.35, bg: 0.36,
  godC: [0.95, 0.9, 0.8], godRim: [0.86, 0.8, 0.76], godA: 0,
  stainC: [0.32, 0.12, 0.13], stainS: 1,
  wave: 0, haloL: 0, haloR: 0, clock: 0, ring: 0,
  box: 0, lat: 0, pulse: 0, bare: 0.35, manA: 1, manC: [0.55, 0.18, 0.18], empty: 0, drain: 0, pool: 0, hollow: 0,
  selfR: 0.02, selfA: 0, selfC: [0.86, 0.33, 0.24],
  one: 0, maya: 0, worldA: 1, manI: 1, wheel: 0,
  bi: 0, bonds: 0, loose: 0, lineage: 0, yin: 0, mist: 0, current: 0, push: 0, along: 0, flux: 1, bundle: 1, scatter: 0, spokes: 0, scan: 0, lit: 0, stainUp: 0, stainR: 0.02, stainA: 0, glow: 0, dull: 0, rip: 0, ripAt: 1,
  bridge: 0, bw: 0.006, bbot: -0.02, crim: 0, cross: 0, snap: 0, flow: 0,
  ghost: 0, reason: 0, tick: 0, acc: [140, 47, 47],
  lGodK: 1.75, lSide: 0.08, lBrX: 0.3, lBrY: -0.38, tBrX: 0.26, tBrY: -0.26,
};

const taoistBase = {
  // the source is painted as mist above, with no edge and no outline
  Gy: 0.5, rG: 0.28, Wy: -0.14, rW: 0.36, Sy: 0.02, bOff: 0,
  glory: [0.97, 0.96, 0.93], sky: [0.9, 0.91, 0.9], far: [0.82, 0.84, 0.84], low: [0.88, 0.9, 0.88], deep: [0.78, 0.82, 0.8],
  sea: [0.32, 0.34, 0.36], land: [0.8, 0.89, 0.85], warm: 0, bg: 0.34,
  godC: [0.58, 0.6, 0.61], godRim: [0.7, 0.72, 0.72], godA: 0,
  stainC: [0.24, 0.2, 0.18], stainS: 1,
  wave: 0, haloL: 0, haloR: 0, clock: 0, ring: 0,
  box: 0, lat: 0, pulse: 0, bare: 0, manA: 1, manC: [0.76, 0.22, 0.15], empty: 0, drain: 0, pool: 0, hollow: 0,
  selfR: 0.02, selfA: 0, selfC: [0.86, 0.33, 0.24],
  one: 0, maya: 0, worldA: 1, manI: 1, wheel: 0,
  bi: 0, bonds: 0, loose: 0, lineage: 0, yin: 1, mist: 1, current: 0.5, push: 0, along: 0, flux: 0, bundle: 0, scatter: 0, spokes: 0, scan: 0, lit: 0, stainUp: 0, stainR: 0.02, stainA: 0, glow: 0, dull: 0, rip: 0, ripAt: 1,
  bridge: 0, bw: 0.006, bbot: -0.02, crim: 0, cross: 0, snap: 0, flow: 0,
  ghost: 0, reason: 0, tick: 0, acc: [46, 112, 98],
  lGodK: 0, lSide: 0.1, lBrX: 0.3, lBrY: 0.3, tBrX: 0.113, tBrY: -0.027,
};

const confucianBase = {
  // round Heaven above, square Earth below
  Gy: 0.565, rG: 0.215, Wy: -0.13, rW: 0.38, Sy: -0.05, bOff: 0,
  glory: [0.97, 0.96, 0.92], sky: [0.86, 0.9, 0.9], far: [0.8, 0.84, 0.86], low: [0.94, 0.89, 0.8], deep: [0.86, 0.79, 0.68],
  sea: [0.87, 0.72, 0.44], land: [0.8, 0.64, 0.42], warm: 0.3, bg: 0.38,
  godC: [0.74, 0.86, 0.83], godRim: [0.52, 0.7, 0.7], godA: 0.85,
  stainC: [0.38, 0.32, 0.27], stainS: 1,
  wave: 0, haloL: 0, haloR: 0, clock: 0, ring: 0,
  box: 1, lat: 0, pulse: 0, bare: 0, manA: 1, manC: [0.64, 0.23, 0.17], empty: 0, drain: 0, pool: 0, hollow: 0,
  selfR: 0.02, selfA: 0, selfC: [0.86, 0.33, 0.24],
  one: 0, maya: 0, worldA: 1, manI: 1, wheel: 0,
  bi: 1, bonds: 1, loose: 0, lineage: 0, yin: 0, mist: 0, current: 0, push: 0, along: 0, flux: 0, bundle: 0, scatter: 0, spokes: 0, scan: 0, lit: 0, stainUp: 0, stainR: 0.02, stainA: 0, glow: 0, dull: 0, rip: 0, ripAt: 1,
  bridge: 0, bw: 0.006, bbot: -0.02, crim: 0, cross: 0, snap: 0, flow: 0,
  ghost: 0, reason: 0, tick: 0, acc: [160, 58, 42],
  lGodK: 0, lSide: 0.1, lBrX: 0.3, lBrY: 0.35, tBrX: 0.17, tBrY: 0.11,
};

const build = (base, acts) => acts.map((a) => ({ ...a, p: { ...base, ...a.p } }));

export const WORLDVIEWS = {
  christian: {
    name: 'Christian Theism',
    tagline: 'God made the world, and he came down to save it.',
    move: { to: 'deism', q: 'What if God never spoke?' },
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
    move: { to: 'naturalism', q: 'What if there is no clockmaker?' },
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

  naturalism: {
    name: 'Naturalism',
    tagline: 'Matter is all there is, and nobody made it.',
    move: { to: 'nihilism', q: 'What if none of it matters?' },
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
    move: { to: 'hindu-monism', q: 'What if the separate self is an illusion?' },
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
    move: { to: 'christian', q: 'What if Heaven has spoken?' },
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
};

export const HOME = 'christian';
