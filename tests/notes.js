// The note cards: a label with a note opens a card with it, placed on the screen and clear of the other labels and the
// language switch; it closes on Escape, a click elsewhere, a change of act, a move, or a change of language; the keyboard
// can open it; and labels without a note behave as before.
const { chromium } = require('playwright');
const { BASE } = require('./common');

let fails = 0;
const ok = (name, cond, extra = '') => { if (!cond) fails++; console.log(`${cond ? 'PASS' : 'FAIL'}  ${name} ${cond ? '' : extra}`); };
const state = (p) => p.evaluate(() => {
  const c = document.getElementById('card'), r = c.getBoundingClientRect(), cv = c.querySelector('canvas').getBoundingClientRect();
  // (the other labels step back while a card is open, so the card may lie over them; it must never cover the switch, nor
  // the words of the page unless they too have stepped back)
  const dimmed = [...document.querySelectorAll('#labels .l')].every((l) => l.classList.contains('open') || !l.textContent || +getComputedStyle(l).opacity < 0.3);
  const others = ['.head', '.act'].map((q) => document.querySelector(q)).filter((e) => +getComputedStyle(e.closest('.t')).opacity > 0.5).map((e) => { const rg = document.createRange(); rg.selectNodeContents(e); return rg.getBoundingClientRect(); });
  const sw = document.getElementById('lang').getBoundingClientRect();
  const hit = (a, b) => Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) * Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
  return {
    cls: c.className, k: c.querySelector('.k').textContent, note: c.querySelector('.note').textContent, lang: document.documentElement.lang,
    onScreen: cv.left >= 0 && cv.top >= 0 && cv.right <= innerWidth && cv.bottom <= innerHeight,
    over: others.reduce((s, b) => s + hit(r, b), 0) + hit(r, sw), dimmed, opacity: +getComputedStyle(c.querySelector('.note')).opacity,
  };
});
(async () => {
  const b = await chromium.launch();
  const errs = [];
  const page = async (w, h, opts = {}) => {
    const p = await b.newPage({ viewport: { width: w, height: h }, ...opts });
    p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
    await p.mouse.move(w - 3, h - 3);
    return p;
  };
  const tapOrClick = (p, sel, touch) => (touch ? p.tap(sel) : p.click(sel));

  // every label with a note, at each size: the card opens with its note, on the screen, clear of the rest
  for (const [w, h, touch] of [[1440, 900], [1024, 700], [390, 844, true], [320, 568, true], [768, 1024, true]]) {
    const p = await page(w, h, touch ? { hasTouch: true } : {});
    for (const act of ['creation', 'fall', 'redemption', 'new-creation']) {
      await p.goto(`${BASE}/?nopaint&lang=en#christian/${act}`);
      // (the test's mouse starts in the corner, on the menu's edge, and calls it out: no real phone has a pointer there)
      await p.mouse.move(w - 3, h - 3); await p.waitForTimeout(3200);
      for (const k of ['god', 'world', 'bridge', 'self', 'sin']) {
        if (!(await p.$(`#labels .l.${k}.has-note`))) continue;
        await tapOrClick(p, `#labels .l.${k}`, touch); await p.waitForTimeout(2600);
        const s = await state(p);
        const good = s.cls.includes('open') && s.note.length > 40 && s.onScreen && s.over < 1 && s.dimmed && s.opacity > 0.95;
        ok(`${w}x${h} ${act} ${k}: opens on the screen, clear of the switch and the words, the other labels stepping back`, good, JSON.stringify(s));
        await p.keyboard.press('Escape'); await p.waitForTimeout(800);
      }
    }
    await p.close();
  }

  // closing
  {
    const p = await page(1280, 800);
    await p.goto(`${BASE}/?nopaint&lang=en#christian/redemption`); await p.waitForTimeout(900);
    await p.click('#labels .l.bridge'); await p.waitForTimeout(1500);
    await p.keyboard.press('Escape'); await p.waitForTimeout(800);
    ok('Escape closes it, and the label keeps the focus', (await state(p)).cls === '' && await p.evaluate(() => document.activeElement.classList.contains('bridge')));
    await p.click('#labels .l.bridge'); await p.waitForTimeout(1200);
    await p.mouse.click(640, 760); await p.waitForTimeout(800);
    ok('a click elsewhere closes it', (await state(p)).cls === '');
    await p.click('#labels .l.self'); await p.waitForTimeout(1200);
    await p.keyboard.press('ArrowRight'); await p.waitForTimeout(800);
    ok('a change of act closes it', (await state(p)).cls === '');
    await p.waitForTimeout(2000);
    await p.click('#labels .l.self'); await p.waitForTimeout(1200);
    await p.evaluate(() => { location.hash = '#judaism/creation'; }); await p.waitForTimeout(800);
    ok('a move to another worldview closes it', (await state(p)).cls === '');
    await p.goto(`${BASE}/?nopaint&lang=en#christian/fall`); await p.waitForTimeout(900);
    await p.click('#labels .l.sin'); await p.waitForTimeout(1500);
    await p.click('#lang a[lang=es]'); await p.waitForTimeout(3200);
    ok('a change of language closes it', (await state(p)).cls === '');
    await p.click('#labels .l.sin'); await p.waitForTimeout(1500);
    const s = await state(p);
    ok('the card then speaks Spanish', s.lang === 'es' && s.k === 'Pecado' && s.note.startsWith('El pecado'), JSON.stringify(s));
    await p.close();
  }

  // the keyboard, and reduced motion
  {
    const p = await page(1280, 800, { reducedMotion: 'reduce' });
    await p.goto(`${BASE}/?nopaint&lang=en#christian/creation`); await p.waitForTimeout(900);
    await p.focus('#labels .l.self'); await p.keyboard.press('Enter'); await p.waitForTimeout(150);
    const s = await state(p);
    ok('Enter opens it; with reduced motion its words are there at once', s.cls.includes('open') && s.opacity > 0.95, JSON.stringify(s));
    await p.close();
  }

  // labels with no note: on a phone, a tap still opens the second line in place, and no card
  {
    const p = await page(390, 844, { hasTouch: true });
    await p.goto(`${BASE}/?nopaint&lang=en#deism/reason`); await p.waitForTimeout(900);
    await p.tap('#labels .l.self'); await p.waitForTimeout(500);
    const r = await p.evaluate(() => [document.getElementById('card').className, document.querySelector('#labels .l.self').classList.contains('open'), document.querySelectorAll('#labels .has-note').length]);
    ok('a label with no note: its second line, and no card', r[0] === '' && r[1] && r[2] === 0, JSON.stringify(r));
    await p.close();
  }

  ok('no errors in the console', errs.length === 0, errs.slice(0, 3).join(' | '));
  console.log(fails ? `${fails} FAILED` : 'ALL PASS');
  await b.close();
  process.exitCode = fails ? 1 : 0;
})();
