// Each worldview is a "score": the same primitives, restated for each of four acts.
//
//   U  the Ultimate        W  the world          S  the self
//   B  the bridge          P  the problem        R  the remedy
//   T  the shape of time   X  the cross-beam
//
// Scene units: origin at centre, y up, roughly -1..1 tall.

export const ACTS = ['Origin', 'Problem', 'Remedy', 'Destiny'];

const gold = [0.95, 0.72, 0.28];
const teal = [0.38, 0.63, 0.66];
const rose = [0.84, 0.42, 0.36];
const crimson = [0.7, 0.17, 0.19];
const light = [1.0, 0.94, 0.7];

const BASE = {
  U: { x: 0, y: 0.5, r: 0.33, soft: 0.012, col: gold, a: 0.85 },
  W: { x: 0, y: -0.38, r: 0.36, soft: 0.012, col: teal, a: 0.8, sq: 0 },
  S: { x: 0, y: -0.34, r: 0.075, soft: 0.008, col: rose, a: 0.95 },
  B: { ax: 0, ay: 0.17, bx: 0, by: -0.02, w: 0.02, soft: 0.008, col: [0.86, 0.56, 0.2], a: 0 },
  P: { x: 0, y: -0.34, r: 0.1, soft: 0.05, a: 0 },
  R: { x: 0, y: -0.34, r: 0.2, a: 0, col: light },
  T: { x: -0.475, y: -0.88, L: 0.45, th: 0.04, a: 0.6, arrow: 1 },
  X: { x: 0, y: -0.02, s: 0.07, a: 0, col: crimson },
};

const merge = (a, b) => {
  const o = { ...a };
  for (const k in b) o[k] = { ...a[k], ...b[k] };
  return o;
};
// A straight timeline of length L with its left end pinned.
const line = (L, extra = {}) => ({ x: -0.7 + L / 2, L, ...extra });

function score(common, acts) {
  const base = merge(BASE, common);
  return acts.map((a) => ({ title: a.title, text: a.text, state: merge(base, a.state) }));
}

export const WORLDVIEWS = {
  christian: {
    name: 'Christian Theism',
    tagline: 'Creator and creation: distinct, and joined from above.',
    swatch: '#e9b548',
    margin: ['The human', 'Every person bears the image of God: a small circle carrying the color of the greater.'],
    labels: {
      U: 'The triune God',
      W: 'Creation',
      S: 'Image-bearer',
      B: ['Word and covenant', '', 'Christ the Mediator', ''],
      P: 'Sin',
      T: 'History moves toward a goal',
    },
    moves: [
      { to: 'deism', q: 'What if God never spoke?' },
      { to: 'monism', q: 'What if Creator and creation were one?' },
    ],
    acts: score({}, [
      {
        title: 'Creation',
        text: 'A personal, triune God makes a world distinct from himself and calls it good. He speaks to it, and makes humanity in his image.',
        state: { B: { a: 0.6 }, T: line(0.45) },
      },
      {
        title: 'Fall',
        text: 'The problem lies in the human heart: rebellion against the Maker. The rupture spreads into everything we touch.',
        state: {
          B: { by: 0.1, a: 0.25 },
          P: { r: 0.2, a: 0.8 },
          S: { col: [0.6, 0.4, 0.38] },
          W: { col: [0.42, 0.58, 0.62] },
          T: line(0.75),
        },
      },
      {
        title: 'Redemption',
        text: 'The bridge is built from above. God the Son takes on flesh, bears the stain at the cross, and rises.',
        state: {
          B: { by: -0.27, w: 0.028, col: crimson, a: 0.9 },
          X: { a: 0.9 },
          P: { r: 0.11, a: 0.4 },
          R: { a: 0.55 },
          T: line(1.05),
        },
      },
      {
        title: 'New Creation',
        text: 'God dwells with his people in a renewed world. Creator and creature are united, and never dissolved into one another.',
        state: {
          U: { y: 0.2, r: 0.38 },
          W: { y: -0.2, r: 0.38, col: [0.34, 0.66, 0.66] },
          S: { y: 0, r: 0.08 },
          B: { ay: 0.02, by: -0.02, a: 0 },
          P: { y: 0, a: 0 },
          R: { y: 0, r: 0.16, a: 0.5 },
          X: { y: 0 },
          T: line(1.4),
        },
      },
    ]),
  },

  deism: {
    name: 'Deism',
    tagline: 'A Maker who wound the clock and stepped away.',
    swatch: '#e6cf8f',
    margin: ['Knowledge', 'Nature and reason are the only books. Scripture and miracle are set aside.'],
    labels: {
      U: 'The distant Creator',
      W: 'The clockwork world',
      S: 'Rational man',
      P: 'Ignorance and superstition',
      R: 'The light of reason',
      T: 'Time ticks on',
    },
    moves: [
      { to: 'naturalism', q: 'What if no one wound the clock?' },
      { to: 'christian', q: 'What if he has spoken?' },
    ],
    acts: score(
      {
        U: { y: 0.64, r: 0.23, col: [0.94, 0.82, 0.52], a: 0.6 },
        W: { col: [0.45, 0.6, 0.72] },
        S: { col: [0.74, 0.5, 0.4] },
      },
      [
        {
          title: 'The Clockmaker',
          text: 'A Creator designs an orderly universe, sets it running by fixed laws, and does not intervene again.',
          state: { T: line(0.45) },
        },
        {
          title: 'Clouded Reason',
          text: 'There is no fall. What troubles us is ignorance and superstition, which obscure the plain light of nature.',
          state: { P: { r: 0.13, soft: 0.09, a: 0.4 }, T: line(0.75) },
        },
        {
          title: 'Reason and Virtue',
          text: 'Reason and moral effort are enough. No revelation is given and no rescue is needed.',
          state: { R: { r: 0.22, a: 0.55 }, P: { r: 0.08, soft: 0.09, a: 0.12 }, T: line(1.05) },
        },
        {
          title: 'A Silent Horizon',
          text: 'Perhaps the virtuous are rewarded after death. The Maker has made no promise either way.',
          state: { U: { y: 0.7, a: 0.32 }, R: { r: 0.22, a: 0.3 }, T: line(1.4) },
        },
      ],
    ),
  },

  naturalism: {
    name: 'Naturalism',
    tagline: 'The cosmos is all there is: a closed system of cause and effect.',
    swatch: '#8fa3b0',
    margin: ['Knowledge', 'What can be known is what science can measure. The mind is itself a product of the cosmos.'],
    labels: {
      W: 'The cosmos: all there is',
      S: 'Matter that thinks',
      P: 'Ignorance and scarcity',
      R: 'Science and technology',
      T: 'Time, without a goal',
    },
    moves: [{ to: 'deism', q: 'What if the cosmos had a Maker?' }],
    acts: score(
      {
        U: { y: 0.82, r: 0.14, col: [0.95, 0.88, 0.7], a: 0 },
        W: { y: -0.08, r: 0.5, sq: 1, col: [0.56, 0.64, 0.7], a: 0.72 },
        S: { y: -0.08, col: [0.36, 0.47, 0.54] },
        P: { y: -0.08 },
        R: { y: -0.08, col: [0.93, 0.97, 0.9] },
        B: { ay: 0.5, by: 0.45 },
        T: { y: -0.9 },
      },
      [
        {
          title: 'Matter Alone',
          text: 'Matter and energy have always existed or arose unguided. Life and mind emerged from them by natural processes.',
          state: { T: line(0.45) },
        },
        {
          title: 'No Fall',
          text: 'Nothing has gone wrong in any ultimate sense. Suffering comes from ignorance, scarcity, and our evolutionary inheritance.',
          state: { P: { r: 0.14, soft: 0.09, a: 0.38 }, T: line(0.75) },
        },
        {
          title: 'Human Progress',
          text: 'The remedy is ours to engineer: science, education, and technology, steadily applied.',
          state: { R: { r: 0.24, a: 0.6 }, P: { r: 0.08, soft: 0.09, a: 0.12 }, T: line(1.05) },
        },
        {
          title: 'The End',
          text: 'Each person ends at death. In the far future the universe itself runs down.',
          state: {
            S: { a: 0, soft: 0.06 },
            W: { a: 0.32, soft: 0.05 },
            T: line(1.4, { arrow: 0, a: 0.3 }),
          },
        },
      ],
    ),
  },

  monism: {
    name: 'Hindu Monism',
    tagline: 'Advaita Vedanta: all is one, and the one is Brahman.',
    swatch: '#d98a5c',
    margin: ['External reality', 'The many things we see are maya: a painted veil over the One.'],
    labels: {
      U: 'Brahman: the One',
      W: 'Maya: the world of appearances',
      S: 'Atman',
      P: 'Avidya: ignorance',
      R: ['', '', 'Liberating knowledge', ''],
      T: 'Samsara: the wheel of rebirth',
    },
    moves: [{ to: 'christian', q: 'What if the Creator is distinct from creation?' }],
    acts: score(
      {
        U: { y: -0.02, r: 0.5, soft: 0.2, col: [0.96, 0.62, 0.28], a: 0.55 },
        W: { y: -0.02, r: 0.5, soft: 0.16, col: [0.78, 0.48, 0.62], a: 0.45 },
        S: { x: 0.13, y: -0.06, soft: 0.05, col: [0.8, 0.36, 0.34], a: 0.6 },
        P: { x: 0.13, y: -0.06 },
        R: { x: 0.13, y: -0.06 },
        B: { ay: 0, by: -0.04 },
        T: { x: 0, y: -0.7, L: 4.27, th: 6.2832, a: 0.25, arrow: 0 },
      },
      [
        {
          title: 'All Is One',
          text: 'Only Brahman is real: one infinite, impersonal reality. The world of separate things is appearance.',
          state: {},
        },
        {
          title: 'The Illusion of Separateness',
          text: 'The problem is ignorance. We take ourselves to be separate selves, and so are bound to the wheel of rebirth.',
          state: { S: { soft: 0.008, a: 0.95 }, P: { r: 0.15, soft: 0.1, a: 0.4 }, T: { a: 0.7 } },
        },
        {
          title: 'Liberating Knowledge',
          text: 'Through discipline and insight, the self comes to know what it has always been: Atman is Brahman.',
          state: { S: { soft: 0.07, r: 0.09, a: 0.6 }, P: { r: 0.08, soft: 0.1, a: 0.12 }, R: { a: 0.55 }, T: { a: 0.45 } },
        },
        {
          title: 'Moksha',
          text: 'Release from the wheel. The drop returns to the ocean, and the separate self is no more.',
          state: { S: { r: 0.3, soft: 0.3, a: 0 }, R: { r: 0.3, a: 0.25 }, T: { a: 0.08 } },
        },
      ],
    ),
  },
};

export const ORDER = ['christian', 'deism', 'naturalism', 'monism'];
export const HOME = 'christian';
