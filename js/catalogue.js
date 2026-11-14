// Every worldview the site plans to show, in menu order: grouped by family,
// and within a family following the chain of questions that leads from one to the next.
// Each has two colours for its dab of paint. Those not yet built appear in pencil.

export const CATALOGUE = [
  { id: 'christian', name: 'Christian Theism', family: 'theistic', c: ['#e9b548', '#3c9aa0'] },
  { id: 'deism', name: 'Deism', family: 'theistic', c: ['#e6d39a', '#5f86a8'] },
  { id: 'mtd', name: 'Moralistic Therapeutic Deism', family: 'theistic', c: ['#f6e08a', '#f3c0cb'] },
  { id: 'judaism', name: 'Judaism', family: 'theistic', c: ['#e8e2d0', '#2f5fa8'] },
  { id: 'islam', name: 'Islam', family: 'theistic', c: ['#d9b44a', '#1f7a5a'] },

  { id: 'platonism', name: 'Platonism', family: 'classical', c: ['#e8dcc0', '#8a7fc0'] },

  { id: 'naturalism', name: 'Naturalism', family: 'secular', c: ['#b9c3b0', '#7f97a8'] },
  { id: 'humanism', name: 'Secular Humanism', family: 'secular', c: ['#f0c070', '#6aa6c8'] },
  { id: 'nihilism', name: 'Nihilism', family: 'secular', c: ['#c9c9cc', '#6c7180'] },
  { id: 'existentialism', name: 'Existentialism', family: 'secular', c: ['#d94f3a', '#3a3f4a'] },
  { id: 'postmodernism', name: 'Postmodernism', family: 'secular', c: ['#40c0c0', '#e05fa0'] },
  { id: 'marxism', name: 'Marxism', family: 'secular', c: ['#e0a030', '#c22d2d'] },

  { id: 'individualism', name: 'Expressive Individualism', family: 'lived', c: ['#f08a5d', '#b06ab3'] },
  { id: 'transhumanism', name: 'Transhumanism', family: 'lived', c: ['#40e0d0', '#6a5acd'] },
  { id: 'new-age', name: 'New Age', family: 'lived', c: ['#f0a0c0', '#a070d0'] },

  { id: 'hindu-monism', name: 'Hindu Monism', family: 'eastern', c: ['#f29a2e', '#d9458f'] },
  { id: 'buddhism', name: 'Buddhism', family: 'eastern', c: ['#e9a23b', '#8c2f2f'] },
  { id: 'taoism', name: 'Taoism', family: 'eastern', c: ['#9fc5b8', '#2f2f2f'] },
  { id: 'confucianism', name: 'Confucianism', family: 'eastern', c: ['#d8c8a0', '#a03a2a'] },
  { id: 'animism', name: 'Animism', family: 'eastern', c: ['#a06a3a', '#4a7a3a'] },
];
