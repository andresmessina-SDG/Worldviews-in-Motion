// The change of language and the buds on phone labels, at their edges: rapid clicks, a change during a move or a move
// during a change, history, resizing, blocked storage, Spanish failing to load, reduced motion, the keyboard.
// Starts in English whatever SITE_LANG says.
const { chromium } = require('playwright');
const { BASE } = require('./common');
const URL0 = `${BASE}/?nopaint`;
const results = [];
const check = (name, ok, info = '') => { results.push(ok); console.log(`${ok ? 'PASS' : 'FAIL'}  ${name} ${ok ? '' : info}`); };
const state = (p) => p.evaluate(() => {
  const vis = (el) => parseFloat(getComputedStyle(el).opacity);
  return { lang: document.documentElement.lang, name: document.getElementById('name').textContent, act: document.getElementById('actName').textContent,
    text: document.getElementById('actText').textContent, q: document.querySelector('#moves button').textContent, hash: location.hash, search: location.search,
    body: document.body.className, title: document.title,
    labels: [...document.querySelectorAll('#labels .l')].map((l) => [l.textContent, vis(l).toFixed(2)]),
    textOp: [vis(document.getElementById('name')), vis(document.getElementById('actText')), vis(document.querySelector('#moves button'))],
    tab: document.querySelector('.tab-name').textContent, cur: document.querySelector('#lang a[aria-current]')?.lang,
    inkLeft: document.querySelector('#lang .ink').style.left };
});
// every word on the page in one language
const allIn = (s, l) => {
  const es = /[áéíóúñ¿]|Cosmovisiones| el | la |El |La /;
  const words = [s.name, s.act, s.text, s.q, ...s.labels.map((x) => x[0])].join(' ');
  return l === 'es' ? s.lang === 'es' && s.title.includes('Cosmovisiones') : s.lang === 'en' && !es.test(words) && s.title.includes('Worldviews');
};
const settledOk = (s) => s.textOp.every((o) => o > 0.99) && !/lang-(in|out)|swap/.test(s.body) && s.labels.every((l) => l[0] === '' || l[1] === '1.00');
(async () => {
  const b = await chromium.launch();
  const mk = async (w = 1280, h = 800, opts = {}) => {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, ...opts });
    const p = await ctx.newPage(); p.errs = [];
    p.on('pageerror', (e) => p.errs.push(e.message)); p.on('console', (m) => { if (m.type() === 'error') p.errs.push(m.text()); });
    return p;
  };
  // 1. rapid clicks: es, en, es within 300ms
  { const p = await mk(); await p.goto(URL0 + '#deism/reason'); await p.waitForTimeout(1500);
    await p.click('#lang a[lang=es]'); await p.waitForTimeout(150); await p.click('#lang a[lang=en]'); await p.waitForTimeout(150); await p.click('#lang a[lang=es]');
    await p.waitForTimeout(4000); let s = await state(p);
    check('rapid clicks end settled, in one language', settledOk(s) && (allIn(s, 'es') || allIn(s, 'en')), JSON.stringify(s));
    check('switch shows the language the page is in', s.cur === s.lang, `${s.cur} ${s.lang}`);
    // the click that was ignored: does clicking again now work?
    const other = s.lang === 'es' ? 'en' : 'es'; await p.click(`#lang a[lang=${other}]`); await p.waitForTimeout(3500); s = await state(p);
    check('a later click still works', allIn(s, other) && settledOk(s), JSON.stringify(s));
    check('no errors (rapid)', !p.errs.length, p.errs.join(' | ')); }
  // 2. switch during a move between worldviews
  { const p = await mk(); await p.goto(URL0 + '#christian/fall'); await p.waitForTimeout(1500);
    await p.click('#moves button'); await p.waitForTimeout(1000); await p.click('#lang a[lang=es]');
    await p.waitForTimeout(9000); const s = await state(p);
    check('switch during a move: lands in Spanish on Judaism, settled', allIn(s, 'es') && s.name === 'Judaísmo' && settledOk(s), JSON.stringify(s));
    check('no errors (during move)', !p.errs.length, p.errs.join(' | ')); }
  // 3. a move started during the change
  { const p = await mk(); await p.goto(URL0 + '#christian/fall'); await p.waitForTimeout(1500);
    await p.click('#lang a[lang=es]'); await p.waitForTimeout(300); await p.click('#moves button', { force: true });
    await p.waitForTimeout(9000); const s = await state(p);
    check('move started during the change: settled, words match the worldview', settledOk(s) && allIn(s, 'es') && ((s.hash.startsWith('#judaism') && s.name === 'Judaísmo') || (s.hash.startsWith('#christian') && s.name === 'Teísmo cristiano')), JSON.stringify(s));
    // a keyboard act change during a change
    await p.click('#lang a[lang=en]'); await p.waitForTimeout(200); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(5000); const s2 = await state(p);
    check('arrow key during a change: settled, act and words agree', settledOk(s2) && allIn(s2, 'en'), JSON.stringify(s2));
    check('no errors (move during change)', !p.errs.length, p.errs.join(' | ')); }
  // 4. Back and Forward after a change
  { const p = await mk(); await p.goto(URL0 + '#christian/creation'); await p.waitForTimeout(1500);
    await p.click('#moves button'); await p.waitForTimeout(7500);
    await p.click('#lang a[lang=es]'); await p.waitForTimeout(3000);
    await p.goBack(); await p.waitForTimeout(7500); let s = await state(p);
    check('Back after a change: earlier worldview, still Spanish', s.hash.startsWith('#christian') && allIn(s, 'es') && settledOk(s), JSON.stringify(s));
    await p.goForward(); await p.waitForTimeout(7500); s = await state(p);
    check('Forward: Judaism, Spanish', s.hash.startsWith('#judaism') && allIn(s, 'es'), JSON.stringify(s));
    await p.reload(); await p.waitForTimeout(1500); s = await state(p);
    check('reload keeps Spanish', allIn(s, 'es'), JSON.stringify(s));
    check('no errors (history)', !p.errs.length, p.errs.join(' | ')); }
  // 5. resize across layouts during a change
  { const p = await mk(1280, 800); await p.goto(URL0 + '#marxism/revolution'); await p.waitForTimeout(1500);
    await p.click('#lang a[lang=es]'); await p.waitForTimeout(250); await p.setViewportSize({ width: 390, height: 844 }); await p.waitForTimeout(3500);
    let s = await state(p);
    check('resize to a phone during a change: narrow, Spanish, settled', s.body.includes('narrow') && allIn(s, 'es') && settledOk(s), JSON.stringify(s));
    const pill = await p.evaluate(() => { const r = document.getElementById('lang').getBoundingClientRect(); return [r.left, r.right, r.top, innerWidth]; });
    check('switch on screen after resize', pill[0] > 0 && pill[1] < pill[3] && pill[2] >= 0, JSON.stringify(pill));
    await p.setViewportSize({ width: 1280, height: 800 }); await p.waitForTimeout(1500);
    await p.click('#lang a[lang=en]'); await p.waitForTimeout(3500); s = await state(p);
    const ink = await p.evaluate(() => { const i = document.querySelector('#lang .ink').getBoundingClientRect(), a = document.querySelector('#lang a[aria-current]').getBoundingClientRect(); return Math.abs(i.left - a.left) + Math.abs(i.width - a.width); });
    check('ink sits under the open half after resizes', ink < 2, ink);
    check('no errors (resize)', !p.errs.length, p.errs.join(' | ')); }
  // 6. storage blocked
  { const ctx = await b.newContext({ viewport: { width: 1280, height: 800 } }); await ctx.addInitScript(() => { Object.defineProperty(window, 'localStorage', { get() { throw new Error('blocked'); } }); });
    const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(e.message));
    await p.goto(URL0 + '#islam/creation'); await p.waitForTimeout(1500); await p.click('#lang a[lang=es]'); await p.waitForTimeout(3000); const s = await state(p);
    check('storage blocked: still switches', allIn(s, 'es') && settledOk(s), JSON.stringify(s)); check('no errors (storage)', !errs.length, errs.join(' | ')); }
  // 7. Spanish file fails to load
  { const ctx = await b.newContext({ viewport: { width: 1280, height: 800 } }); await ctx.route(/es\.js/, (r) => r.abort());
    const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(e.message));
    await p.goto(URL0 + '&lang=es#islam/creation'); await p.waitForTimeout(2000); const s = await state(p);
    check('Spanish unreachable at load: English page, working', allIn(s, 'en') && s.name === 'Islam' && s.cur === 'en', JSON.stringify(s)); check('no uncaught errors (es missing)', !errs.length, errs.join(' | ')); }
  // 8. reduced motion
  { const p = await mk(1280, 800, { reducedMotion: 'reduce' }); await p.goto(URL0 + '#taoism/the-way'); await p.waitForTimeout(1500);
    await p.click('#lang a[lang=es]'); await p.waitForTimeout(300); const s = await state(p);
    check('reduced motion: changes at once', allIn(s, 'es') && settledOk(s), JSON.stringify(s)); }
  // 9. keyboard on the switch
  { const p = await mk(); await p.goto(URL0 + '#nihilism/an-accident'); await p.waitForTimeout(1500);
    await p.focus('#lang a[lang=es]'); await p.keyboard.press('Enter'); await p.waitForTimeout(3000); const s = await state(p);
    check('Enter on the switch works', allIn(s, 'es') && settledOk(s), JSON.stringify(s)); }
  // 10. buds on a phone
  { const p = await mk(390, 844, { hasTouch: true }); await p.goto(URL0 + '#christian/redemption'); await p.waitForTimeout(2000);
    const calls = await p.evaluate(() => document.querySelectorAll('#labels .l.call').length);
    const bud = await p.evaluate(() => { const t = document.querySelector('#labels .l.bridge .tl'); const cs = getComputedStyle(t, '::after'); return [cs.width, cs.borderRadius, cs.animationName]; });
    check('buds call before any is opened', calls >= 4 && bud[2] === 'bud-call', `${calls} ${bud}`);
    await p.tap('#labels .l.self'); await p.waitForTimeout(600);
    const after = await p.evaluate(() => [localStorage.getItem('budsKnown'), document.querySelector('#labels .l.self').classList.contains('open'), getComputedStyle(document.querySelector('#labels .l.self small')).display]);
    check('tap opens a label and is remembered', after[0] === '1' && after[1] && after[2] === 'block', after);
    await p.keyboard.press('ArrowRight'); await p.waitForTimeout(3500);
    const calls2 = await p.evaluate(() => document.querySelectorAll('#labels .l.call').length);
    check('after one is opened, new labels no longer call', calls2 === 0, calls2);
    // a bud never alone on its line
    const lone = await p.evaluate(() => [...document.querySelectorAll('#labels .l .tl')].filter((t) => t.getClientRects().length > 1).length);
    check('the last word and its bud never part', lone === 0, lone);
    // change of language with a label open
    await p.tap('#labels .l.god'); await p.waitForTimeout(300); await p.tap('#lang a[lang=es]'); await p.waitForTimeout(3500);
    const s = await state(p); const open = await p.evaluate(() => document.querySelectorAll('#labels .l.open').length);
    check('language change with a label open: settled, closed', allIn(s, 'es') && settledOk(s) && open === 0, `${open} ${JSON.stringify(s)}`);
    check('no errors (buds)', !p.errs.length, p.errs.join(' | ')); }
  // 11. desktop: no buds
  { const p = await mk(1280, 800); await p.goto(URL0 + '#christian/redemption'); await p.waitForTimeout(1500);
    const w = await p.evaluate(() => getComputedStyle(document.querySelector('#labels .l.god .tl'), '::after').content);
    check('no bud on a wide screen', w === 'none' || w === 'normal', w); }
  console.log(results.every(Boolean) ? 'ALL PASS' : `${results.filter((x) => !x).length} FAILED`);
  await b.close();
  process.exitCode = results.every(Boolean) ? 0 : 1;
})();
