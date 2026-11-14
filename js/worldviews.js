// The worldviews. Each is a set of values the painting and its connectors read:
// a base that holds for the whole worldview, and what changes in each of its four acts.
// Every value is a number or a colour, so any act can blend into any other.

const christianBase = {
  // where things stand (scene units, y up)
  Gy: 0.47, rG: 0.29, Wy: -0.43, rW: 0.36, Sy: -0.4, bOff: 0.03,
  // palette
  glory: [1, 0.94, 0.66], sky: [0.97, 0.76, 0.56], far: [0.8, 0.7, 0.82], low: [0.72, 0.88, 0.85], deep: [0.5, 0.68, 0.8],
  sea: [0.22, 0.6, 0.66], land: [0.3, 0.62, 0.42], warm: 0.55, bg: 0.5,
  godC: [0.98, 0.78, 0.3], godRim: [0.9, 0.46, 0.34], godA: 1,
  stainC: [0.13, 0.11, 0.22], stainS: 0,
  // what is present and what moves
  wave: 1, haloL: 1, haloR: 0, clock: 0, ring: 1,
  stainR: 0.02, stainA: 0, glow: 0, dull: 0, rip: 0, ripAt: 1,
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
  stainR: 0.02, stainA: 0, glow: 0, dull: 0.15, rip: 0, ripAt: 1,
  bridge: 0, bw: 0.006, bbot: -0.02, crim: 0, cross: 0, snap: 0, flow: 0,
  ghost: 0.75, reason: 0, tick: 1, acc: [63, 98, 127],
  lGodK: 0.12, lSide: 0.2, lBrX: 0.2, lBrY: 0.14, tBrX: 0.035, tBrY: 0.12,
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
        text: 'God made the world and called it good. He made man in his image and spoke with him.',
        p: { rip: 0.9, ripAt: 0 },
        labels: {
          god: ['The triune God', 'Father, Son and Holy Spirit'],
          world: ['Creation', 'Made by God, and good'],
          bridge: ['God speaks', 'His word and his covenant'],
          self: ['Man', 'Made in the image of God'],
        },
      },
      {
        slug: 'fall',
        name: 'Fall',
        text: 'Man rebelled against God. Sin took hold of the heart and spoiled the whole world.',
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
        text: 'God came down. The Son became man, died on the cross for sin and rose again.',
        p: { bridge: 1, bbot: -0.33, crim: 1, cross: 1, stainR: 0.1, stainA: 0.55, glow: 1, dull: 0.3, rip: 0.8, lBrY: 0.04, tBrY: -0.01 },
        labels: {
          god: ['The triune God', 'Father, Son and Holy Spirit'],
          world: ['Creation', 'Loved, and being restored'],
          bridge: ['Christ the Mediator', 'God comes down to man'],
          self: ['Man', 'Forgiven through Christ'],
          sin: ['Sin', 'Paid for at the cross'],
        },
      },
      {
        slug: 'new-creation',
        name: 'New Creation',
        text: 'God will live with his people in a world made new. He remains God, and they remain his creatures.',
        p: { Gy: 0.2, rG: 0.36, Wy: -0.2, rW: 0.38, Sy: 0, bridge: 0, crim: 1, glow: 0.8, rip: 0.7 },
        labels: {
          god: ['The triune God', 'Father, Son and Holy Spirit'],
          world: ['The new creation', 'The world made new'],
          self: ['God’s people', 'At home with him'],
        },
      },
    ]),
  },

  deism: {
    name: 'Deism',
    tagline: 'God wound the clock and left it to run.',
    move: { to: 'christian', q: 'What if God has spoken?' },
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
          world: ['The world', 'Still running as designed'],
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
        p: { Gy: 0.66, rG: 0.16, godA: 0.36, reason: 0.3, glow: 0.4, dull: 0.3, lBrY: 0.21, tBrY: 0.19 },
        labels: {
          god: ['The Creator', 'Further off, still silent'],
          world: ['The world', 'Ticking on'],
          bridge: ['No promise', 'Nothing has been said'],
          self: ['Man', 'Hoping for a reward'],
        },
      },
    ]),
  },
};

export const HOME = 'christian';
