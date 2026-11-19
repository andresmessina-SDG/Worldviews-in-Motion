// Every act of every worldview at 21 window sizes: no word, label, name of an act or the language switch may lie on
// another or run off the page. (Known false alarm: "320x568 narrow christian/1: menu open", from the test's mouse.)
const { chromium } = require('playwright');
const { site } = require('./common');
const SIZES = [[1440,900],[1920,1080],[1280,720],[1024,768],[2560,1080],[1100,800],[768,1024],[390,844],[320,568],[360,640],[1366,600],[1280,1024],[3440,1440],[1024,600],[600,1024],[412,915],[375,667],[1536,730],[1280,620],[820,1180],[1180,820]];
const WV = {christian:4,judaism:4,islam:4,deism:4,mtd:4,naturalism:4,humanism:4,nihilism:4,existentialism:4,postmodernism:4,marxism:4,individualism:4,transhumanism:4,'new-age':4,'neo-paganism':4,'hindu-monism':4,buddhism:4,taoism:4,confucianism:4,animism:4,platonism:4,gnosticism:4};
(async () => {
  const b = await chromium.launch();
  let bad = 0;
  for (const [w, h] of SIZES) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    p.on('pageerror', e => console.log('PAGEERR', e.message));
    p.on('console', m => { if (m.type() === 'error') console.log('ERR', m.text()); });
    await p.goto('about:blank'); await p.mouse.move(w * 0.7, h * 0.5);
    for (const wv in WV) for (let act = 1; act <= 4; act++) {
      await p.goto(site(`&wv=${wv}&act=${act}&t=5`));
      await p.mouse.move(w * 0.7, h * 0.5 + act);
      await p.waitForTimeout(330);
      const out = await p.evaluate(() => {
        const R = (el, name) => { const r = el.getBoundingClientRect(); return { name, l: r.left, t: r.top, r: r.right, b: r.bottom }; };
        const vis = (el) => getComputedStyle(el).opacity > 0.5 && getComputedStyle(el).display !== 'none' && el.getBoundingClientRect().width > 0;
        const labels = [...document.querySelectorAll('.l')].filter(vis).map(el => R(el, 'label:' + el.textContent.slice(0, 18)));
        const marks = [...document.querySelectorAll('#marks button')].filter(el => !document.getElementById('marks').classList.contains('tight') || el.getAttribute('aria-current') === 'true').map(el => R(el, 'mark:' + el.textContent));
        const text = ['.k', 'h1', '.tag', '.act h2', '.act p', '#moves button'].map(s => document.querySelector(s)).filter(vis).map(el => {
          // measure the words themselves, not the full-width block
          const rg = document.createRange(); rg.selectNodeContents(el); if (el.id === 'actText' && el.firstChild) rg.setStart(el.firstChild, 1);   /* (the drop cap's box reaches above its ink, into the heading's box) */ const r = el.tagName === 'BUTTON' ? el.getBoundingClientRect() : rg.getBoundingClientRect();
          return { name: 'text:' + el.textContent.slice(0, 16), l: r.left, t: r.top, r: r.right, b: r.bottom };
        });
        const sw = [...document.querySelectorAll('#lang a')].filter(el => el.getBoundingClientRect().width > 0).map(el => R(el, 'lang:' + el.textContent)); const all = [...labels, ...marks, ...text, ...sw];
        const W = innerWidth, H = innerHeight, issues = [];
        for (const a of all) if (a.l < 2 || a.t < 2 || a.r > W - 2 || a.b > H - 2) issues.push(`off-screen ${a.name} [${a.l | 0},${a.t | 0},${a.r | 0},${a.b | 0}]`);
        for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) {
          const a = all[i], c = all[j];
          if (a.name.startsWith('lang') && c.name.startsWith('lang')) continue; if (a.name.startsWith('text') && c.name.startsWith('text')) { if (!(a.b - 6 <= c.t || c.b - 6 <= a.t)) issues.push(`text overlap ${a.name} / ${c.name}`); continue; }
          const pad = a.name.startsWith('mark') && c.name.startsWith('mark') ? -8 : (a.name.startsWith('lang') || c.name.startsWith('lang')) ? -4 : 0;   // marks carry padding
          if (a.l < c.r + pad && c.l < a.r + pad && a.t < c.b + pad && c.t < a.b + pad) issues.push(`overlap ${a.name} / ${c.name}`);
        }
        return { issues, narrow: document.body.classList.contains('narrow'), menuOpen: document.body.classList.contains('menu-open') };
      });
      // (the menu open over a page is reported, but is not a failure: the test's own mouse can call it out)
      if (out.menuOpen) console.log(`note: ${w}x${h} ${wv}/${act}: menu open`);
      if (out.issues.length) { bad++; console.log(`${w}x${h}${out.narrow ? ' narrow' : ''} ${wv}/${act}:\n   ` + out.issues.join('\n   ')); }
    }
    await p.close();
  }
  console.log('pages with issues:', bad);
  console.log(bad ? `${bad} FAILED` : 'ALL PASS');
  await b.close();
  process.exitCode = bad ? 1 : 0;
})();
