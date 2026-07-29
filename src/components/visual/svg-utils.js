
export function escapeText(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function rect(node) {
  const x = Number(node.x) || 0;
  const y = Number(node.y) || 0;
  const w = Number(node.w) || 160;
  const h = Number(node.h) || 64;
  return { x, y, w, h, cx: x + w / 2, cy: y + h / 2 };
}

export function borderPoint(r, tx, ty) {
  const dx = tx - r.cx;
  const dy = ty - r.cy;
  if (dx === 0 && dy === 0) return { x: r.cx, y: r.cy };

  const halfW = r.w / 2;
  const halfH = r.h / 2;
  const scaleX = dx === 0 ? Infinity : halfW / Math.abs(dx);
  const scaleY = dy === 0 ? Infinity : halfH / Math.abs(dy);
  const scale = Math.min(scaleX, scaleY);

  return { x: r.cx + dx * scale, y: r.cy + dy * scale };
}

export function connect(fromRect, toRect) {
  const start = borderPoint(fromRect, toRect.cx, toRect.cy);
  const end = borderPoint(toRect, fromRect.cx, fromRect.cy);
  return {
    x1: start.x,
    y1: start.y,
    x2: end.x,
    y2: end.y,
    mx: (start.x + end.x) / 2,
    my: (start.y + end.y) / 2,
  };
}

export function r2(n) {
  return Math.round(n * 100) / 100;
}

export function sideConnect(fromRect, toRect, bend = 0, bendSpan = null) {
  const x1 = fromRect.x + fromRect.w;
  const y1 = fromRect.cy;
  const x2 = toRect.x;
  const y2 = toRect.cy;
  return { x1, y1, x2, y2, mx: (x1 + x2) / 2, my: (y1 + y2) / 2 + bend, bendSpan };
}

export function curvePath(p) {
  const dx = (p.x2 - p.x1) * 0.5;
  const bend = Number.isFinite(p.my) ? p.my - (p.y1 + p.y2) / 2 : 0;

  if (bend && Array.isArray(p.bendSpan)) {
    const [spanX1, spanX2] = p.bendSpan;
    const flatY = p.y1 + bend;
    const riseDx = (spanX1 - p.x1) * 0.6;
    const fallDx = (p.x2 - spanX2) * 0.6;
    return `M ${r2(p.x1)} ${r2(p.y1)} `
      + `C ${r2(p.x1 + riseDx)} ${r2(p.y1)}, ${r2(spanX1 - riseDx)} ${r2(flatY)}, ${r2(spanX1)} ${r2(flatY)} `
      + `L ${r2(spanX2)} ${r2(flatY)} `
      + `C ${r2(spanX2 + fallDx)} ${r2(flatY)}, ${r2(p.x2 - fallDx)} ${r2(p.y2)}, ${r2(p.x2)} ${r2(p.y2)}`;
  }

  return `M ${r2(p.x1)} ${r2(p.y1)} C ${r2(p.x1 + dx)} ${r2(p.y1 + bend)}, ${r2(p.x2 - dx)} ${r2(p.y2 + bend)}, ${r2(p.x2)} ${r2(p.y2)}`;
}
