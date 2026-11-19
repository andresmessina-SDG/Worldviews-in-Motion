// Which shader program paints: the full one or a version, at rest, during a move, and whether the next move's version
// is ready ahead. Every version must compile: any error fails.
const { chromium } = require('playwright');
const { site, PAINT_ARGS } = require('./common');
(async () => {
  const b = await chromium.launch({ args: [...PAINT_ARGS, '--disable-gpu-compositing'] });
  const pg = await b.newPage({ viewport: { width: 480, height: 320 }, deviceScaleFactor: 1 }); const errs = [];
  pg.on('console', m => m.type() === 'error' && errs.push(m.text())); pg.on('pageerror', e => errs.push(e.message));
  await pg.addInitScript(() => {
    window.__progs = new Map(); window.__using = null; window.__made = 0;
    const P = WebGLRenderingContext.prototype, cp = P.createProgram, up = P.useProgram, sh = P.shaderSource;
    P.createProgram = function () { const p = cp.call(this); window.__progs.set(p, 'prog' + (window.__made++)); return p; };
    P.useProgram = function (p) { window.__using = window.__progs.get(p); return up.call(this, p); };
    window.__draws = []; const d = P.drawArrays; P.drawArrays = function (...a) { if (!this.getParameter(this.FRAMEBUFFER_BINDING)) window.__draws.push(window.__using); return d.apply(this, a); };
    // stand in for KHR_parallel_shader_compile: here every compile is finished as soon as it is asked for
    const ge = P.getExtension, gp = P.getProgramParameter;
    P.getExtension = function (n) { return n === 'KHR_parallel_shader_compile' ? { COMPLETION_STATUS_KHR: 0x91B1 } : ge.call(this, n); };
    P.getProgramParameter = function (p, n) { return n === 0x91B1 ? true : gp.call(this, p, n); };
    console.log('parallel compile', !!document.createElement('canvas').getContext('webgl').getExtension('KHR_parallel_shader_compile'));
  });
  pg.on('console', m => m.type() === 'log' && console.log('page:', m.text()));
  const seen = async (label) => { const r = await pg.evaluate(() => { const d = window.__draws; window.__draws = []; const c = {}; d.forEach(x => { c[x] = (c[x] || 0) + 1; }); return [c, window.__made]; }); console.log(label.padEnd(26), JSON.stringify(r[0]), 'programs made', r[1]); };
  await pg.goto(site('#platonism/release', true)); await pg.mouse.move(470, 200);
  await pg.waitForTimeout(1500); await seen('first 1.5 s');
  await pg.waitForTimeout(3000); await seen('then 3 s at rest');
  await pg.evaluate(() => document.querySelector('#moves button').click());
  await pg.waitForTimeout(4600); await seen('move to Gnosticism');
  await pg.waitForTimeout(3000); await seen('Gnosticism at rest');
  await pg.evaluate(() => { document.querySelector('#moves button').click(); });
  await pg.waitForTimeout(4600); await seen('move to Christian');
  await pg.waitForTimeout(3000); await seen('Christian at rest');
  console.log('errors', errs); await b.close();
  process.exitCode = errs.length ? 1 : 0;
})();
