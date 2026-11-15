// The connectors are described in a small piece of SVG (easy to write and read), but painted here on a canvas:
// cleared and drawn whole every frame. A full-page SVG rebuilt sixty times a second is left to the browser to
// redraw in tiles, and when the painting keeps the graphics card busy some tiles can lag behind others, so a
// line shows in pieces. A canvas has no tiles to go stale: each frame is complete or not shown at all.
//
// Only what the connectors use is understood: path, circle, ellipse and rect; groups with opacity and
// transform (translate, rotate, scale); fill, stroke and their widths, ends, joins, dashes and opacities;
// clip paths; and masks that cut black shapes out of what they cover.

const NUM = /-?\d*\.?\d+(?:e[-+]?\d+)?/gi;
const INHERITED = ['fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'stroke-dasharray', 'stroke-dashoffset', 'fill-opacity'];

function transform(ctx, tr) {
  const re = /(translate|rotate|scale)\(([^)]*)\)/g;
  let m;
  while ((m = re.exec(tr))) {
    const v = (m[2].match(NUM) || []).map(Number);
    if (m[1] === 'translate') ctx.translate(v[0] || 0, v[1] || 0);
    else if (m[1] === 'scale') ctx.scale(v[0], v.length > 1 ? v[1] : v[0]);
    else {
      const a = (v[0] * Math.PI) / 180;
      if (v.length > 2) { ctx.translate(v[1], v[2]); ctx.rotate(a); ctx.translate(-v[1], -v[2]); } else ctx.rotate(a);
    }
  }
}

function outline(el) {
  const n = (k) => Number(el.getAttribute(k)) || 0;
  switch (el.tagName) {
    case 'path': return new Path2D(el.getAttribute('d') || '');
    case 'circle': { const p = new Path2D(); p.arc(n('cx'), n('cy'), n('r'), 0, 2 * Math.PI); return p; }
    case 'ellipse': { const p = new Path2D(); p.ellipse(n('cx'), n('cy'), n('rx'), n('ry'), 0, 0, 2 * Math.PI); return p; }
    case 'rect': { const p = new Path2D(); p.rect(n('x'), n('y'), n('width'), n('height')); return p; }
    default: return null;
  }
}

const ref = (el, k) => { const m = /url\(#([^)]+)\)/.exec(el.getAttribute(k) || ''); return m ? m[1] : null; };

function paint(ctx, el, s) {
  const p = outline(el);
  if (!p) return;
  const fill = s.fill === undefined ? '#000' : s.fill;
  if (fill !== 'none') {
    const a = ctx.globalAlpha;
    if (s['fill-opacity'] !== undefined) ctx.globalAlpha = a * Number(s['fill-opacity']);
    ctx.fillStyle = fill;
    ctx.fill(p);
    ctx.globalAlpha = a;
  }
  if (s.stroke && s.stroke !== 'none') {
    ctx.strokeStyle = s.stroke;
    ctx.lineWidth = s['stroke-width'] !== undefined ? Number(s['stroke-width']) : 1;
    ctx.lineCap = s['stroke-linecap'] || 'butt';
    ctx.lineJoin = s['stroke-linejoin'] || 'miter';
    ctx.setLineDash(s['stroke-dasharray'] ? (s['stroke-dasharray'].match(NUM) || []).map(Number) : []);
    ctx.lineDashOffset = Number(s['stroke-dashoffset']) || 0;
    ctx.stroke(p);
  }
}

export function createInk(canvas) {
  const ctx = canvas.getContext('2d');
  const layer = document.createElement('canvas');       // for masked groups, drawn apart and then cut
  const lctx = layer.getContext('2d');
  const parser = new DOMParser();
  let W = 0, H = 0, dpr = 1;

  function walk(c, parent, st, defs) {
    for (const el of parent.children) {
      const tag = el.tagName;
      if (tag === 'defs') { for (const d of el.children) defs[d.getAttribute('id')] = d; continue; }
      const op = el.hasAttribute('opacity') ? Number(el.getAttribute('opacity')) : 1;
      if (!(op > 0.001)) continue;
      const s = { ...st };
      for (const k of INHERITED) if (el.hasAttribute(k)) s[k] = el.getAttribute(k);
      c.save();
      if (el.hasAttribute('transform')) transform(c, el.getAttribute('transform'));
      c.globalAlpha *= op;
      const clip = ref(el, 'clip-path');
      if (clip && defs[clip]) {
        const cp = new Path2D();
        for (const k of defs[clip].children) { const o = outline(k); if (o) cp.addPath(o); }
        c.clip(cp);
      }
      const mask = ref(el, 'mask');
      if (mask && defs[mask] && c === ctx) {
        // draw the group by itself, cut the mask's black shapes out of it, then lay it down
        lctx.setTransform(1, 0, 0, 1, 0, 0);
        lctx.clearRect(0, 0, layer.width, layer.height);
        lctx.setTransform(c.getTransform());
        lctx.globalAlpha = 1;
        if (tag === 'g') walk(lctx, el, s, defs); else paint(lctx, el, s);
        lctx.globalCompositeOperation = 'destination-out';
        for (const k of defs[mask].children) {
          const f = (k.getAttribute('fill') || '').toLowerCase();
          if (f === '#000' || f === '#000000' || f === 'black') { const o = outline(k); if (o) { lctx.fillStyle = '#000'; lctx.fill(o); } }
        }
        lctx.globalCompositeOperation = 'source-over';
        c.save();
        c.setTransform(1, 0, 0, 1, 0, 0);
        c.drawImage(layer, 0, 0);
        c.restore();
      } else if (tag === 'g') walk(c, el, s, defs);
      else paint(c, el, s);
      c.restore();
    }
  }

  return {
    resize(w, h, ratio) {
      W = w; H = h; dpr = ratio;
      for (const cv of [canvas, layer]) { cv.width = Math.round(w * ratio); cv.height = Math.round(h * ratio); }
    },
    draw(svg) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalAlpha = 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const doc = parser.parseFromString(`<svg xmlns="http://www.w3.org/2000/svg">${svg}</svg>`, 'image/svg+xml');
      const root = doc.documentElement;
      if (root.tagName !== 'svg') return;               // (a parse error: draw nothing rather than garbage)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      walk(ctx, root, {}, {});
    },
  };
}
