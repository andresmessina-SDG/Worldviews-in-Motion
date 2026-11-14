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
  box: 0, lat: 0, pulse: 0, bare: 0, manA: 1, manC: [0.9, 0.5, 0.3], empty: 0, drain: 0, pool: 0, hollow: 0,
  selfR: 0.02, selfA: 0, selfC: [0.86, 0.33, 0.24],
  stainR: 0.02, stainA: 0, glow: 0, dull: 0.15, rip: 0, ripAt: 1,
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
  stainR: 0.02, stainA: 0, glow: 0, dull: 0, rip: 0, ripAt: 1,
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
  stainR: 0.02, stainA: 0, glow: 0, dull: 0.6, rip: 0, ripAt: 1,
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
  stainR: 0.02, stainA: 0, glow: 0, dull: 0.7, rip: 0, ripAt: 1,
  bridge: 0, bw: 0.006, bbot: -0.02, crim: 0, cross: 0, snap: 0, flow: 0,
  ghost: 0, reason: 0, tick: 0, acc: [190, 66, 44],
  lGodK: 0, lSide: 0.1, lBrX: 0.3, lBrY: 0.42, tBrX: 0.13, tBrY: 0.11,
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
        text: 'The world has not fallen. Pain, want and death are simply how nature works.',
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
        p: { stainR: 0.07, stainA: 0.15, glow: 1, rip: 0.9 },
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
    move: { to: 'christian', q: 'What if meaning is given, not made?' },
    acts: build(existentialismBase, [
      {
        slug: 'thrown',
        name: 'Thrown In',
        text: 'Man finds himself in a world with no meaning. He exists first, and what he is has yet to be decided.',
        p: {},
        labels: {
          god: ['Nothing above', 'No God to give a purpose'],
          world: ['The world', 'Solid, silent and absurd'],
          self: ['Man', 'He exists before he is anything'],
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
};

export const HOME = 'christian';
