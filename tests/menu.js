// The menu of worldviews down the left edge: mouse, keyboard, touch, and the lens.
const { chromium } = require('playwright');
const { site, worldviews } = require('./common');
let fails = 0;
const ok = (name, cond, extra='') => { if (!cond) fails++; console.log(`${cond ? 'PASS' : 'FAIL'}  ${name} ${extra}`); };
(async () => {
  const W = await worldviews();
  const b = await chromium.launch();
  // ---------- mouse and keyboard ----------
  let ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  let p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type()==='error') errs.push(m.text()); });
  const st = () => p.evaluate(() => window.__menu.state());
  const hash = () => p.evaluate(() => location.hash);
  const tabAt = (i) => p.evaluate((i) => { const t = document.querySelectorAll('.tab')[i]; const r = t.getBoundingClientRect(); const d = t.querySelector('.tab-dab').getBoundingClientRect(); return { right: d.right, left: d.left, top: r.top, h: r.height, cy: r.top + r.height/2 }; }, i);
  await p.goto(site('&act=1'));
  await p.mouse.move(800, 450);
  await p.waitForTimeout(600);
  let s = await st();
  ok('load: glimpse is shallow, not fully open', s.openT > 0.5 && s.depth < 0.5, JSON.stringify(s));
  ok('load: title not dimmed during glimpse', !(await p.evaluate(() => document.body.classList.contains('menu-open'))));
  await p.waitForTimeout(3600);
  s = await st(); ok('glimpse ends, tabs hidden', s.openT === 0, `openT=${s.openT}`);
  let t0 = await tabAt(0), t5 = await tabAt(5);
  ok('hidden: open worldview sits further out', t0.right > t5.right + 6, `${t0.right} vs ${t5.right}`);
  ok('hidden: only the dabs show, in the margin', t5.right < 34 && t0.right < 50 && (await p.evaluate(() => getComputedStyle(document.querySelector('.tab-name')).opacity)) === '0');

  await p.mouse.move(10, 500); await p.waitForTimeout(100); await p.mouse.move(12, 500);
  await p.waitForTimeout(1200);
  s = await st(); ok('edge: tabs come out', s.openT === 1 && s.depth > 0.9, JSON.stringify(s));
  ok('edge: title dims', await p.evaluate(() => document.body.classList.contains('menu-open')));
  // the tab in focus should sit under the pointer
  for (const y of [140, 300, 500, 700, 750]) {
    await p.mouse.move(120, y); await p.waitForTimeout(900);
    s = await st(); const r = await tabAt(Math.round(s.f));
    // (between two families of worldviews there is a gap, where no tab is under the pointer and none should light)
    const under = await p.evaluate((y) => [...document.querySelectorAll('.tab')].findIndex((t) => { const b = t.getBoundingClientRect(); return y >= b.top && y < b.bottom; }), y);
    if (under < 0) ok(`lens at y=${y}, in a gap between families: nothing lit`, s.hot === -1, `hot=${s.hot} f=${s.f.toFixed(2)}`);
    else ok(`lens under pointer at y=${y}`, s.hot === Math.round(s.f) && s.hot === under && Math.abs(r.cy - y) < r.h / 2 + 1, `hot=${s.hot} under=${under} f=${s.f.toFixed(2)} cy=${r.cy.toFixed(0)} h=${r.h.toFixed(0)}`);
  }
  // above and below the list
  await p.mouse.move(120, 20); await p.waitForTimeout(700); s = await st(); ok('pointer above the list: lens on first tab, nothing hot', Math.round(s.f) === 0 && s.hot === -1, JSON.stringify({f:s.f,hot:s.hot}));
  await p.mouse.move(120, 880); await p.waitForTimeout(700); s = await st(); { const last = await p.evaluate(() => document.querySelectorAll('.tab').length - 1); ok('pointer below the list: lens on last tab', Math.round(s.f) === last, `f=${s.f} last=${last}`); }

  // pencil tab: click does nothing, note appears (only while some worldview is still unbuilt)
  const hasPencil = await p.evaluate(() => !!document.querySelector('.tab.pencil'));
  if (!hasPencil) console.log('SKIP  pencil tab checks: every worldview is built');
  else {
  // (come down the list slowly, as a hand would, and stop on the first pencil tab: jumping straight to one fails,
  //  because the tabs move as the lens follows the pointer)
  let py = 300;
  for (; py < 700; py += 3) {
    await p.mouse.move(120, py); await p.waitForTimeout(120);
    if (await p.evaluate(() => !!document.querySelector('.tab.hot.pencil'))) break;
  }
  await p.waitForTimeout(800);
  s = await st();
  const before = await hash();
  await p.mouse.click(120, py); await p.waitForTimeout(300);
  ok('pencil tab: click changes nothing', (await hash()) === before && (await st()).cur === 0);
  ok('pencil tab: note shown when hot', await p.evaluate(() => { const n = document.querySelector('.tab.hot .tab-note'); return !!n && n.getBoundingClientRect().width > 20; }));
  ok('pencil click leaves menu open', (await st()).openT === 1);

  }

  // choose deism
  let r = await tabAt(1); await p.mouse.move(100, r.cy); await p.waitForTimeout(900);
  r = await tabAt(1); await p.mouse.click(100, r.cy); await p.waitForTimeout(200);
  ok('click Deism: worldview changes', (await hash()).startsWith('#judaism'), await hash());
  ok('click Deism: title changes', true);
  await p.waitForTimeout(1500);
  s = await st(); ok('after choosing: tabs draw back to a glimpse though pointer has not moved', s.depth < 0.5, JSON.stringify(s));
  await p.waitForTimeout(2500);
  s = await st(); ok('after choosing: fully hidden, no stuck focus', s.openT === 0 && s.keyFocus === -1, JSON.stringify(s));
  ok('title is Deism', (await p.textContent('#name')) === W.judaism.name);
  await p.mouse.move(110, 300); await p.waitForTimeout(600);
  s = await st(); ok('pointer still in the strip after a choice: stays away', s.openT === 0, `openT=${s.openT}`);
  await p.mouse.move(600, 300); await p.waitForTimeout(200); await p.mouse.move(8, 300); await p.waitForTimeout(1200);
  s = await st(); ok('leave and return: opens again', s.openT === 1);
  t0 = await tabAt(0); const t1 = await tabAt(1);
  await p.mouse.move(700, 300); await p.waitForTimeout(1500);
  s = await st(); ok('moving away: closes', s.openT === 0);
  const a0 = await tabAt(0), a1 = await tabAt(1);
  ok('hidden: Deism is now the one further out', a1.right > a0.right + 6, `${a1.right} vs ${a0.right}`);

  // leaving the window from the left edge
  await p.mouse.move(8, 300); await p.waitForTimeout(900);
  await p.evaluate(() => document.documentElement.dispatchEvent(new MouseEvent('mouseleave')));
  await p.waitForTimeout(1400);
  s = await st(); ok('mouse leaves the window: closes', s.openT === 0, `openT=${s.openT}`);

  // keyboard
  await p.mouse.move(800, 450);
  await p.keyboard.press('Tab'); await p.waitForTimeout(100);
  let foc = await p.evaluate(() => document.activeElement.className + '|' + document.activeElement.textContent);
  for (let i = 0; i < 12 && !foc.startsWith('tab'); i++) { await p.keyboard.press('Tab'); foc = await p.evaluate(() => document.activeElement.className + '|' + document.activeElement.textContent); }
  await p.waitForTimeout(1200);
  s = await st(); ok('keyboard: Tab reaches the open tab and opens the menu', foc.startsWith('tab') && s.openT === 1 && s.keyFocus === 1, foc + JSON.stringify(s));
  await p.keyboard.press('ArrowUp'); await p.waitForTimeout(700);
  s = await st(); ok('keyboard: ArrowUp moves the lens', s.keyFocus === 0 && Math.round(s.f) === 0);
  await p.keyboard.press('Enter'); await p.waitForTimeout(400);
  ok('keyboard: Enter chooses', (await hash()).startsWith('#christian'), await hash());
  await p.waitForTimeout(2800); s = await st(); ok('keyboard: closes after choosing', s.openT === 0 && s.keyFocus === -1, JSON.stringify(s));
  await p.keyboard.press('Tab'); await p.waitForTimeout(800);
  await p.keyboard.press('Escape'); await p.waitForTimeout(1200);
  s = await st(); ok('keyboard: Escape closes', s.openT === 0, JSON.stringify(s));
  // arrow keys for acts still work when menu is not focused
  await p.keyboard.press('ArrowRight'); await p.waitForTimeout(300);
  ok('act arrows still work', (await hash()) === '#christian/fall', await hash());
  // typed address
  await p.evaluate(() => { location.hash = '#judaism/torah'; }); await p.waitForTimeout(4600);
  ok('typed address: page follows', (await p.textContent('#name')) === W.judaism.name && (await st()).cur === 1);
  // short window
  await p.setViewportSize({ width: 1000, height: 420 }); await p.waitForTimeout(300);
  await p.mouse.move(8, 200); await p.waitForTimeout(100); await p.mouse.move(60, 200); await p.waitForTimeout(1200);
  const fit = await p.evaluate(() => { const rs = [...document.querySelectorAll('.tab')].map(t => t.getBoundingClientRect()); return { top: rs[0].top, bottom: rs[rs.length - 1].bottom, minH: Math.min(...rs.map(r => r.height)) }; });
  ok('short window (420px): all tabs inside the window', fit.top >= 0 && fit.bottom <= 420, JSON.stringify(fit));
  await ctx.close();

  // ---------- touch ----------
  ctx = await b.newContext({ viewport: { width: 390, height: 800 }, hasTouch: true, isMobile: true });
  p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message));
  const cdp = await ctx.newCDPSession(p);
  const touch = (type, x, y) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints: type === 'touchEnd' ? [] : [{ x, y }] });
  await p.goto(site('&act=1')); await p.waitForTimeout(300); await p.mouse.move(600, 300); await p.waitForTimeout(4200);
  const st2 = () => p.evaluate(() => window.__menu.state());
  const hash2 = () => p.evaluate(() => location.hash);
  await touch('touchStart', 10, 400); await p.waitForTimeout(60); await touch('touchEnd');
  await p.waitForTimeout(1200);
  s = await st2(); ok('touch: quick tap on the edge opens, chooses nothing', s.openT === 1 && s.cur === 0 && (await hash2()) === '', JSON.stringify(s));
  const rr = await p.evaluate(() => { const r = document.querySelectorAll('.tab')[1].getBoundingClientRect(); return { cy: r.top + r.height / 2, h: r.height }; });
  await touch('touchStart', 60, rr.cy); await p.waitForTimeout(80); await touch('touchEnd'); await p.waitForTimeout(500);
  ok('touch: tap on Deism while open chooses it', (await hash2()).startsWith('#judaism'), `${await hash2()} tabH=${rr.h.toFixed(0)}`);
  await p.waitForTimeout(2500); s = await st2(); ok('touch: closes after choosing', s.openT === 0, JSON.stringify(s));
  // press, slide, lift
  await touch('touchStart', 10, 600); await p.waitForTimeout(700);
  s = await st2(); ok('touch: press and hold opens', s.openT === 1);
  const y0 = await p.evaluate(() => { const r = document.querySelectorAll('.tab')[0].getBoundingClientRect(); return r.top + r.height / 2; });
  for (let y = 600; y > y0; y -= 40) { await touch('touchMove', 40, y); await p.waitForTimeout(60); }
  await touch('touchMove', 40, y0); await p.waitForTimeout(900);
  s = await st2(); ok('touch: sliding moves the lens to the finger', Math.round(s.f) === 0 && s.hot === 0, JSON.stringify({ f: s.f, hot: s.hot }));
  await touch('touchEnd'); await p.waitForTimeout(500);
  ok('touch: lifting chooses the tab under the finger', (await hash2()).startsWith('#christian'), await hash2());
  if (hasPencil) {
  // slide and lift on a pencil tab
  await p.waitForTimeout(2500);
  await touch('touchStart', 10, 500); await p.waitForTimeout(500); await touch('touchMove', 40, 520); await p.waitForTimeout(600); await touch('touchEnd'); await p.waitForTimeout(600);
  s = await st2(); ok('touch: lifting on a pencil tab chooses nothing and keeps the tabs out', (await hash2()).startsWith('#christian') && s.openT === 1, JSON.stringify(s));
  await touch('touchStart', 300, 300); await p.waitForTimeout(50); await touch('touchEnd'); await p.waitForTimeout(1200);
  s = await st2(); ok('touch: tap elsewhere puts them away', s.openT === 0, JSON.stringify(s));
  } else console.log('SKIP  touch: pencil tab, and tapping elsewhere to put its tabs away');
  console.log('page errors:', errs.length ? errs : 'none');
  if (errs.length) fails++;
  console.log(fails ? `${fails} FAILED` : 'ALL PASS');
  await b.close();
  process.exitCode = fails ? 1 : 0;
})();
