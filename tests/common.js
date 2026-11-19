// What every test shares: where the site is served, which language to test it in, and its words.
//   BASE       the address of the site (default http://localhost:8765, as tests/run.sh serves it)
//   SITE_LANG  en (default) or es
const path = require('path');
const { pathToFileURL } = require('url');

const ROOT = path.resolve(__dirname, '..');
const BASE = (process.env.BASE || 'http://localhost:8765').replace(/\/$/, '');
const LANG = process.env.SITE_LANG === 'es' ? 'es' : 'en';
// an address on the site with the painting left out (so the controls run at full speed), in the language under test;
// more= is the rest of the query and the #worldview/act
const site = (more = '', paint = false) => `${BASE}/?${paint ? '' : 'nopaint&'}lang=${LANG}${more}`;
// the worldviews as the page shows them in that language
async function worldviews() {
  const { WORLDVIEWS } = await import(pathToFileURL(path.join(ROOT, 'js/worldviews.js')).href);
  if (LANG === 'es') {
    const { CATALOGUE } = await import(pathToFileURL(path.join(ROOT, 'js/catalogue.js')).href);
    (await import(pathToFileURL(path.join(ROOT, 'js/es.js')).href)).apply(WORLDVIEWS, CATALOGUE);
  }
  return WORLDVIEWS;
}
// a software GPU, for the tests that need the painting itself
const PAINT_ARGS = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'];

module.exports = { ROOT, BASE, LANG, site, worldviews, PAINT_ARGS };
