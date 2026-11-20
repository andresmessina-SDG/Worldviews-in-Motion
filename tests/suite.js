// The behaviour of the page: the loop of questions, moves interrupted, typed addresses, resizing, Back,
// the light under a label, the drift of the words, reduced motion and the labels on a phone.
const { chromium } = require('playwright');
const { site, worldviews } = require('./common');
const URL = site('');
let fails = 0;
const ok = (name, cond, extra = '') => { if (!cond) fails++; console.log(`${cond ? 'PASS' : 'FAIL'}  ${name} ${cond ? '' : extra}`); };
const rest = (p) => p.evaluate(() => {
  const cs = (s) => getComputedStyle(document.querySelector(s));
  const l = document.querySelector('#loop').getBoundingClientRect(), bt = document.querySelector('#moves button').getBoundingClientRect();
  return {
    name: document.querySelector('#name').textContent, hash: location.hash,
    ask: document.querySelector('#ask').classList.contains('on'), askOp: +cs('#ask').opacity,
    cls: document.body.className, actOp: +cs('.act').opacity, headOp: +cs('.head').opacity, textOp: +cs('#actText').opacity, textTr: cs('#actText').transform,
    clips: document.querySelectorAll('#conn clipPath[id^=rv]').length,
    ring: Math.abs((l.top + l.bottom) / 2 - (bt.top + bt.bottom) / 2) + Math.abs(l.right - bt.right - l.width / 2 + 1),
    labelsOn: [...document.querySelectorAll('.l')].filter((e) => +getComputedStyle(e).opacity > 0.9).length,
    labelsWant: [...document.querySelectorAll('.l')].filter((e) => e.innerHTML).length,
    btn: document.querySelector('#moves button').textContent,
  };
});
const atRest = (r) => !r.ask && r.askOp < 0.02 && !/swap|rise/.test(r.cls) && r.actOp > 0.98 && r.headOp > 0.98 && r.textOp > 0.98 && (r.textTr === 'none' || r.textTr === 'matrix(1, 0, 0, 1, 0, 0)') && r.clips === 0 && r.ring < 2 && r.labelsOn === r.labelsWant;
(async () => {
  const W = await worldviews();
  const b = await chromium.launch();
  const errs = [];
  const page = async (w, h, opts = {}) => { const p = await b.newPage({ viewport: { width: w, height: h }, ...opts }); p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); }); await p.mouse.move(w * .8, h * .3); return p; };

  // A. round the whole loop by its questions, at a desktop and a phone size
  for (const [w, h] of [[1280, 800], [375, 667]]) {
    const p = await page(w, h); await p.goto(URL + '#christian/creation'); await p.waitForTimeout(1500);
    let cur = 'christian', bad = [];
    for (let i = 0; i < 22; i++) {
      const next = W[cur].move.to;
      await p.evaluate(() => document.querySelector('#moves button').click());
      await p.waitForTimeout(700);
      const mid = await rest(p);
      if (!mid.ask && !(await p.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches))) bad.push(`${cur}: no caption`);
      await p.waitForTimeout((next === 'christian' ? 7300 : 5600) + 900);
      const r = await rest(p);
      if (r.name !== W[next].name || !r.hash.startsWith('#' + next) || !atRest(r) || r.btn !== W[next].move.q) bad.push(`${cur}->${next}: ${JSON.stringify(r)}`);
      cur = next;
    }
    ok(`loop of 22 by its questions at ${w}x${h}: each arrives whole and at rest`, bad.length === 0 && cur === 'christian', bad.slice(0, 3).join('\n'));
    await p.close();
  }

  // B. jumps: every change of act in six worldviews, each frame: does any showing label, or God, leap?
  for (const [w, h] of [[1280, 800], [390, 844]]) {
    const p = await page(w, h); let worst = 0, where = '', n = 0;
    for (const wv of ['christian', 'mtd', 'platonism', 'gnosticism', 'judaism', 'marxism', 'confucianism']) {
      await p.goto(URL + `#${wv}`); await p.waitForTimeout(1200);
      await p.evaluate(() => {
        window.__log = [];
        const f = (now) => { const u = window.__G.unit, row = [now, window.__G.x * u, window.__G.y * u];
          for (const e of document.querySelectorAll('.l')) { const m = new DOMMatrix(getComputedStyle(e).transform), o = +getComputedStyle(e).opacity; row.push(o > 0.6 ? m.e : NaN, o > 0.6 ? m.f : NaN); }
          window.__log.push(row); requestAnimationFrame(f); };
        requestAnimationFrame(f);
      });
      for (const z of [1, 2, 3, 0, 2]) {
        await p.evaluate(() => { window.__log.length = 0; });
        await p.evaluate((i) => document.querySelectorAll('#marks button')[i].click(), z); await p.waitForTimeout(3300);
        const L = await p.evaluate(() => window.__log.slice());
        for (let i = 1; i < L.length; i++) { const dt = L[i][0] - L[i - 1][0]; if (dt > 40 || dt <= 0) continue;
          for (let j = 1; j < L[i].length; j++) { const d = Math.abs(L[i][j] - L[i - 1][j]); if (d > worst) { worst = d; where = `${wv} to act ${z + 1}, value ${j}, ${d.toFixed(1)}px in ${dt.toFixed(0)}ms`; } } }
        n++;
      }
    }
    ok(`no leap in ${n} act changes at ${w}x${h} (largest step in one frame ${worst.toFixed(1)}px)`, worst < 14, where);
    await p.close();
  }

  // C. interruptions
  {
    const p = await page(1280, 800); await p.goto(URL + '#christian/fall'); await p.waitForTimeout(1500);
    await p.evaluate(() => document.querySelector('#moves button').click()); await p.waitForTimeout(1500);
    await p.keyboard.press('ArrowRight'); await p.waitForTimeout(800);
    await p.evaluate(() => document.querySelector('#moves button').click()); await p.waitForTimeout(300);
    await p.keyboard.press('ArrowLeft'); await p.waitForTimeout(2500);
    for (let i = 0; i < 8; i++) { await p.keyboard.press(i % 3 ? 'ArrowRight' : 'ArrowLeft'); await p.waitForTimeout(110); }
    await p.waitForTimeout(8500);
    let r = await rest(p);
    ok('moves interrupted by other moves and by quick keys: settles whole', atRest(r) && r.hash.startsWith('#' + { [W.christian.name]: 'christian', [W.judaism.name]: 'judaism', [W.islam.name]: 'islam' }[r.name]), JSON.stringify(r));
    // a question asked, then the menu's choice at once
    await p.evaluate(() => document.querySelector('#moves button').click()); await p.waitForTimeout(900);
    await p.evaluate(() => { location.hash = '#taoism/the-way'; }); await p.waitForTimeout(8000);
    r = await rest(p);
    ok('a typed address during a move: the page follows it and settles', r.name === W.taoism.name && atRest(r), JSON.stringify(r));
    // resize while moving
    await p.evaluate(() => document.querySelector('#moves button').click()); await p.waitForTimeout(1200);
    await p.setViewportSize({ width: 700, height: 900 }); await p.waitForTimeout(1500); await p.setViewportSize({ width: 1440, height: 760 }); await p.waitForTimeout(7000);
    r = await rest(p);
    ok('the window resized twice during a move: settles whole', r.name === W.confucianism.name && atRest(r), JSON.stringify(r));
    // back
    await p.goBack(); await p.waitForTimeout(7000); r = await rest(p);
    ok('Back returns to the worldview before', r.name === W.taoism.name && atRest(r), JSON.stringify(r));
    // hover
    const box = await p.evaluate(() => { const e = [...document.querySelectorAll('.l')].find((x) => x.innerHTML && getComputedStyle(x).textAlign !== 'center'); const r = e.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; });
    await p.mouse.move(box[0], box[1]); await p.waitForTimeout(600);
    const hotN = await p.evaluate(() => document.querySelectorAll('#lines g.hot').length);
    await p.mouse.move(1300, 60); await p.waitForTimeout(600);
    ok('the pointer on a label marks its line, and off it unmarks', hotN === 1 && (await p.evaluate(() => document.querySelectorAll('#lines g.hot').length)) === 0, `hot ${hotN}`);
    // the words of an act: leave upward, arrive from below
    await p.keyboard.press('ArrowRight'); await p.waitForTimeout(450);
    const out = await p.evaluate(() => [+getComputedStyle(document.querySelector('#actText')).opacity, new DOMMatrix(getComputedStyle(document.querySelector('#actText')).transform).f, +getComputedStyle(document.querySelector('#moves button')).opacity]);
    await p.waitForTimeout(450);
    const inn = await p.evaluate(() => [+getComputedStyle(document.querySelector('#actText')).opacity, new DOMMatrix(getComputedStyle(document.querySelector('#actText')).transform).f]);
    await p.waitForTimeout(2600); r = await rest(p);
    ok('an act\'s words go up and out, the next come up from below, the question stays', out[0] < 0.3 && out[1] < -3 && out[2] > 0.98 && inn[1] > 0 && atRest(r), JSON.stringify([out, inn]));
    await p.close();
  }

  // F. reduced motion
  {
    const p = await page(1280, 800, { reducedMotion: 'reduce' }); await p.goto(URL + '#platonism/release'); await p.waitForTimeout(1200);
    await p.evaluate(() => document.querySelector('#moves button').click()); await p.waitForTimeout(250);
    const mid = await rest(p); await p.waitForTimeout(1800); const r = await rest(p);
    ok('reduced motion: no caption, and the new page stands at once', !mid.ask && r.name === W.gnosticism.name && atRest(r), JSON.stringify(r));
    await p.close();
  }

  // G. phone labels, as they behave with no note to open (every label now has one, so the notes are withheld here;
  // the cards themselves are tests/notes.js's)
  {
    const ctx = await b.newContext({ viewport: { width: 375, height: 667 }, hasTouch: true });
    await ctx.route(/notes\.js/, (r) => r.abort());
    const p = await ctx.newPage(); await p.mouse.move(372, 664);
    await p.goto(URL + '#gnosticism/knowledge'); await p.waitForTimeout(1500);
    const smalls = () => p.evaluate(() => [...document.querySelectorAll('.l small')].filter((e) => getComputedStyle(e).display !== 'none').length);
    const s0 = await smalls();
    await p.evaluate((t) => [...document.querySelectorAll('.l')].find((e) => e.textContent.includes(t)).click(), W.gnosticism.acts[2].labels.bridge[0]); await p.waitForTimeout(300); const s1 = await smalls();
    await p.evaluate((t) => [...document.querySelectorAll('.l')].find((e) => e.textContent.includes(t)).click(), W.gnosticism.acts[2].labels.sin[0]); await p.waitForTimeout(300); const s2 = await smalls();
    // an open label must not lie on another label
    const over = await p.evaluate(() => { const L = [...document.querySelectorAll('.l')].filter((e) => e.innerHTML).map((e) => e.getBoundingClientRect()); let n = 0; for (let i = 0; i < L.length; i++) for (let j = i + 1; j < L.length; j++) if (L[i].left < L[j].right && L[j].left < L[i].right && L[i].top < L[j].bottom && L[j].top < L[i].bottom) n++; return n; });
    await p.mouse.click(300, 620); await p.waitForTimeout(300); const s3 = await smalls();
    await p.evaluate((t) => [...document.querySelectorAll('.l')].find((e) => e.textContent.includes(t)).click(), W.gnosticism.acts[2].labels.bridge[0]); await p.waitForTimeout(200);
    await p.evaluate(() => document.querySelectorAll('#marks button')[3].click()); await p.waitForTimeout(3600); const s4 = await smalls();
    ok('phone: second lines closed; a tap opens one, another tap moves it, a tap elsewhere or a new act closes it', s0 === 0 && s1 === 1 && s2 === 1 && s3 === 0 && s4 === 0, [s0, s1, s2, s3, s4].join(' '));
    ok('phone: an opened label lies on no other label', over === 0, `${over} overlaps`);
    await ctx.close();
  }
  ok('no errors in the console through all of it', errs.length === 0, errs.slice(0, 4).join(' | '));
  console.log(fails ? `${fails} FAILED` : 'ALL PASS'); await b.close();
  process.exitCode = fails ? 1 : 0;
})();
