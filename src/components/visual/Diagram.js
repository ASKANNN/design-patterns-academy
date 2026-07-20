import { escapeText, rect, connect, sideConnect, r2, curvePath } from './svg-utils.js';
import { DiagramNode, renderIcon } from './DiagramNode.js';
import { DiagramEdge, DiagramMarkers } from './DiagramEdge.js';

export function Diagram(model = {}) {
  const {
    id = 'diagram',
    style = '',
    title = '',
    description = '',
    category = '',
    width = 640,
    height = 400,
    nodes = [],
    edges = [],
    caption = '',
  } = model;

  if (!Array.isArray(nodes) || nodes.length === 0) return '';

  if (style === 'nested') return _nestedDiagram(model);

  if (style === 'chain') return _chainDiagram(model);

  if (style === 'facade') return _facadeDiagram(model);

  if (style === 'pool') return _poolDiagram(model);

  if (style === 'gateway') return _gatewayDiagram(model);

  if (style === 'command') return _commandDiagram(model);

  if (style === 'expression') return _expressionDiagram(model);

  if (style === 'cursor') return _cursorDiagram(model);

  const concept = style === 'concept';
  const safeId = String(id).replace(/[^a-zA-Z0-9_-]/g, '') || 'diagram';
  const titleId = `${safeId}-title`;
  const descId = `${safeId}-desc`;

  const geometry = new Map();
  nodes.forEach((n) => {
    if (n && n.id != null) geometry.set(String(n.id), rect(n));
  });

  const edgesSvg = (Array.isArray(edges) ? edges : [])
    .map((edge) => {
      const from = geometry.get(String(edge.from));
      const to = geometry.get(String(edge.to));
      if (!from || !to) return '';
      const pts = concept ? sideConnect(from, to) : connect(from, to);
      return DiagramEdge(edge, pts, safeId, { concept });
    })
    .join('');

  const nodeOpts = { concept, prefix: safeId };
  const nodesSvg = nodes.map((n) => DiagramNode(n, nodeOpts)).join('');

  const defs = concept ? _conceptDefs(safeId) : DiagramMarkers(safeId);

  const rootCls = [
    'diagram',
    concept ? 'diagram--concept' : '',
    category ? `diagram--${escapeText(category)}` : '',
  ]
    .filter(Boolean)
    .join(' ');

  const captionBlock = caption
    ? `
    <figcaption class="diagram__caption">${escapeText(caption)}</figcaption>`
    : '';

  return `
  <figure class="${rootCls}">
    <div class="diagram__viewport">
      <svg class="diagram__svg"
           viewBox="0 0 ${Number(width) || 640} ${Number(height) || 400}"
           role="img"
           aria-labelledby="${titleId}${description ? ` ${descId}` : ''}"
           preserveAspectRatio="xMidYMid meet"
           xmlns="http://www.w3.org/2000/svg">
        <title id="${titleId}">${escapeText(title)}</title>${
    description
      ? `
        <desc id="${descId}">${escapeText(description)}</desc>`
      : ''
  }
        ${defs}
        <g class="diagram__edges" aria-hidden="true">${edgesSvg}
        </g>
        <g class="diagram__nodes" role="list">${nodesSvg}
        </g>
      </svg>
    </div>${captionBlock}
  </figure>`;
}

function _conceptDefs(prefix) {
  return `
    <defs>
      <linearGradient id="${prefix}-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" class="diagram__grad-start" />
        <stop offset="1" class="diagram__grad-end" />
      </linearGradient>
      <marker id="${prefix}-flow" class="diagram__marker diagram__marker--flow" markerWidth="15" markerHeight="15" refX="10" refY="7.5" orient="auto" markerUnits="userSpaceOnUse">
        <path d="M2,2 L12.5,7.5 L2,13 Z" />
      </marker>
    </defs>`;
}

function _nestedDiagram(model) {
  const {
    id = 'diagram', category = '', width = 960, height = 470,
    title = '', description = '', caption = '',
  } = model;

  const nodes = Array.isArray(model.nodes) ? model.nodes : [];
  const client = nodes.find((n) => n && n.role === 'client');
  const shells = nodes.filter((n) => n && n.role === 'shell');
  const core   = nodes.find((n) => n && n.role === 'core');
  if (!core || shells.length === 0) return '';

  const safeId = String(id).replace(/[^a-zA-Z0-9_-]/g, '') || 'diagram';
  const titleId = `${safeId}-title`;
  const descId = `${safeId}-desc`;
  const W = Number(width) || 960;
  const H = Number(height) || 470;

  const PAD = 24;
  const CLIENT_W = 156, CLIENT_H = 104;
  const GAP = 92;
  const HEADER = 56;
  const SHELL_SCALE = 0.82;
  const TOP_BIAS = 0.72;

  const clientG = { x: PAD, y: H / 2 - CLIENT_H / 2, w: CLIENT_W, h: CLIENT_H };

  const sx0 = clientG.x + CLIENT_W + GAP;
  const sx1 = W - PAD;
  const sy0 = PAD;
  const sy1 = H - PAD;
  const W0 = sx1 - sx0;
  const H0 = sy1 - sy0;
  const cx0 = (sx0 + sx1) / 2;

  const shellGeom = shells.map((_, i) => {
    const s = Math.pow(SHELL_SCALE, i);
    const w = W0 * s;
    const h = H0 * s;
    return { x: cx0 - w / 2, y: sy0 + (H0 - h) * TOP_BIAS, w, h };
  });

  const inner = shellGeom[shellGeom.length - 1];
  const coreW = Math.min(360, W0 * 0.55);
  const coreH = Math.min(150, H0 * 0.42);
  const innerContentTop = inner.y + HEADER;
  const innerContentBottom = inner.y + inner.h - 20;
  const coreG = {
    x: cx0 - coreW / 2,
    y: (innerContentTop + innerContentBottom) / 2 - coreH / 2,
    w: coreW, h: coreH,
  };

  const clientSvg = DiagramNode({ ...client, ...clientG }, { concept: true, prefix: safeId });

  const shellsSvg = shells
    .map((n, i) => _shellNode(n, shellGeom[i], i))
    .join('');

  const coreSvg = DiagramNode({ ...core, ...coreG, emphasis: true }, { concept: true, prefix: safeId });

  const entry = (Array.isArray(model.edges) ? model.edges : [])[0];
  let entrySvg = '';
  if (entry) {
    const outer = shellGeom[0];
    const ey = clientG.y + clientG.h / 2;
    const pts = {
      x1: clientG.x + clientG.w, y1: ey,
      x2: outer.x,               y2: outer.y + outer.h / 2,
      mx: (clientG.x + clientG.w + outer.x) / 2, my: ey,
    };
    entrySvg = DiagramEdge(entry, pts, safeId, { concept: true });
  }

  const leftMid = (g) => ({ x: g.x, y: g.y + g.h / 2 });
  const rails = [];
  for (let i = 1; i < shellGeom.length; i += 1) {
    const a = leftMid(shellGeom[i - 1]);
    const b = leftMid(shellGeom[i]);
    rails.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y });
  }
  const lastShell = shellGeom[shellGeom.length - 1];
  rails.push({
    x1: lastShell.x, y1: lastShell.y + lastShell.h / 2,
    x2: coreG.x, y2: coreG.y + coreG.h / 2,
  });
  const railsSvg = rails
    .map((p) => `
        <path class="diagram__flow diagram__flow--guide" d="${curvePath(p)}" fill="none" aria-hidden="true" />`)
    .join('');

  const rootCls = [
    'diagram', 'diagram--concept', 'diagram--nested',
    category ? `diagram--${escapeText(category)}` : '',
  ].filter(Boolean).join(' ');

  const captionBlock = caption
    ? `
    <figcaption class="diagram__caption">${escapeText(caption)}</figcaption>`
    : '';

  return `
  <figure class="${rootCls}">
    <div class="diagram__viewport">
      <svg class="diagram__svg"
           viewBox="0 0 ${W} ${H}"
           role="img"
           aria-labelledby="${titleId}${description ? ` ${descId}` : ''}"
           preserveAspectRatio="xMidYMid meet"
           xmlns="http://www.w3.org/2000/svg">
        <title id="${titleId}">${escapeText(title)}</title>${
    description
      ? `
        <desc id="${descId}">${escapeText(description)}</desc>`
      : ''
  }
        ${_conceptDefs(safeId)}
        <g class="diagram__edges" aria-hidden="true">${entrySvg}${railsSvg}
        </g>
        <g class="diagram__nodes" role="list">${clientSvg}${shellsSvg}${coreSvg}
        </g>
      </svg>
    </div>${captionBlock}
  </figure>`;
}

function _shellNode(node, g, index) {
  const { id, label = '', badge = '', action = '', icon = 'layers' } = node;
  const aria = action ? `${label} — ${action}` : label;

  const CHIP = 38;
  const chipX = g.x + 16, chipY = g.y + 13;
  const titleX = chipX + CHIP + 12;
  const titleY = g.y + 38;

  const iconEl = icon ? renderIcon(icon, chipX + 7, chipY + 7, 24, 'diagram__shell-icon') : '';

  let badgeEl = '';
  if (badge) {
    const badgeW = Math.max(54, badge.length * 7.4 + 24);
    const badgeX = g.x + g.w - 16 - badgeW;
    const badgeY = g.y + 12;
    badgeEl = `
      <g class="diagram__shell-badge" aria-hidden="true">
        <rect x="${r2(badgeX)}" y="${r2(badgeY)}" width="${r2(badgeW)}" height="26" rx="13" ry="13" />
        <text x="${r2(badgeX + badgeW / 2)}" y="${r2(badgeY + 18)}" text-anchor="middle">${escapeText(badge)}</text>
      </g>`;
  }

  let toastEl = '';
  if (action) {
    const toastText = `✓ ${action}`;
    const shellCx = g.x + g.w / 2;
    const tW = Math.max(96, toastText.length * 7 + 30);
    const tX = shellCx - tW / 2;
    const tY = g.y + 13;
    toastEl = `
      <g class="diagram__shell-toast" aria-hidden="true">
        <rect x="${r2(tX)}" y="${r2(tY)}" width="${r2(tW)}" height="24" rx="12" ry="12" />
        <text x="${r2(shellCx)}" y="${r2(tY + 16.5)}" text-anchor="middle">${escapeText(toastText)}</text>
      </g>`;
  }

  return `
    <g class="diagram__shell" data-node-id="${escapeText(id)}" data-shell-index="${index}" tabindex="0" role="listitem" aria-label="${escapeText(aria)}">
      <rect class="diagram__shell-bg" x="${r2(g.x)}" y="${r2(g.y)}" width="${r2(g.w)}" height="${r2(g.h)}" rx="20" ry="20" />
      <rect class="diagram__shell-chip" x="${r2(chipX)}" y="${r2(chipY)}" width="${CHIP}" height="${CHIP}" rx="11" ry="11" aria-hidden="true" />${iconEl}
      <text class="diagram__shell-title" x="${r2(titleX)}" y="${r2(titleY)}">${escapeText(label)}</text>${badgeEl}${toastEl}
    </g>`;
}

function _chainDiagram(model) {
  const {
    id = 'diagram', category = '', width = 1000, height = 300,
    title = '', description = '', caption = '',
  } = model;

  const nodes = Array.isArray(model.nodes) ? model.nodes : [];
  const client = nodes.find((n) => n && n.role === 'client');
  const handlers = nodes.filter((n) => n && n.role === 'handler');
  if (!client || handlers.length === 0) return '';

  const safeId = String(id).replace(/[^a-zA-Z0-9_-]/g, '') || 'diagram';
  const titleId = `${safeId}-title`;
  const descId = `${safeId}-desc`;
  const W = Number(width) || 1000;
  const H = Number(height) || 300;

  const PAD = 24;
  const CLIENT_W = 150, CLIENT_H = 104;
  const GAP = 60;
  const STATION_H = 132;
  const STATION_MIN = 138, STATION_MAX = 200;
  const CELL_GAP = 30;

  const stationCy = PAD + 14 + STATION_H / 2;
  const clientG = { x: PAD, y: stationCy - CLIENT_H / 2, w: CLIENT_W, h: CLIENT_H };

  const sx0 = clientG.x + CLIENT_W + GAP;
  const sx1 = W - PAD;
  const cell = (sx1 - sx0) / handlers.length;

  const need = handlers.reduce((m, n) => {
    const t  = String(n.label ?? '').length * 8.4 + 28;
    const gw = String(n.guard ?? '').length * 7 + 24;
    return Math.max(m, t, gw);
  }, 0);
  const sw = Math.min(STATION_MAX, Math.max(STATION_MIN, Math.min(cell - CELL_GAP, need)));

  const stationGeom = handlers.map((_, i) => ({
    x: sx0 + cell * (i + 0.5) - sw / 2,
    y: stationCy - STATION_H / 2,
    w: sw, h: STATION_H,
  }));

  const clientSvg = DiagramNode({ ...client, ...clientG }, { concept: true, prefix: safeId });
  const stationsSvg = handlers.map((n, i) => _stationNode(n, stationGeom[i], i)).join('');

  const railY = stationCy;
  const baseX1 = clientG.x + clientG.w;
  const baseX2 = stationGeom[stationGeom.length - 1].x + sw;
  const baseRail = `
        <line class="diagram__rail-base" x1="${r2(baseX1)}" y1="${r2(railY)}" x2="${r2(baseX2)}" y2="${r2(railY)}" aria-hidden="true" />`;

  const segs = [{ x1: baseX1, x2: stationGeom[0].x }];
  for (let i = 1; i < stationGeom.length; i += 1) {
    segs.push({ x1: stationGeom[i - 1].x + sw, x2: stationGeom[i].x });
  }
  const segsSvg = segs
    .map((s) => `
        <path class="diagram__flow diagram__flow--rail" d="${curvePath({ x1: s.x1, y1: railY, x2: s.x2, y2: railY })}" fill="none" marker-end="url(#${safeId}-chev)" aria-hidden="true" />`)
    .join('');

  const rootCls = [
    'diagram', 'diagram--concept', 'diagram--chain',
    category ? `diagram--${escapeText(category)}` : '',
  ].filter(Boolean).join(' ');

  const captionBlock = caption
    ? `
    <figcaption class="diagram__caption">${escapeText(caption)}</figcaption>`
    : '';

  return `
  <figure class="${rootCls}">
    <div class="diagram__viewport">
      <svg class="diagram__svg"
           viewBox="0 0 ${W} ${H}"
           role="img"
           aria-labelledby="${titleId}${description ? ` ${descId}` : ''}"
           preserveAspectRatio="xMidYMid meet"
           xmlns="http://www.w3.org/2000/svg">
        <title id="${titleId}">${escapeText(title)}</title>${
    description
      ? `
        <desc id="${descId}">${escapeText(description)}</desc>`
      : ''
  }
        ${_chainDefs(safeId)}
        <g class="diagram__edges" aria-hidden="true">${baseRail}${segsSvg}
        </g>
        <g class="diagram__nodes" role="list">${clientSvg}${stationsSvg}
        </g>
      </svg>
    </div>${captionBlock}
  </figure>`;
}

function _chainDefs(prefix) {
  return `
    <defs>
      <linearGradient id="${prefix}-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" class="diagram__grad-start" />
        <stop offset="1" class="diagram__grad-end" />
      </linearGradient>
      <marker id="${prefix}-chev" class="diagram__chev" markerWidth="12" markerHeight="12" refX="7" refY="6" orient="auto" markerUnits="userSpaceOnUse">
        <path d="M2 2 L8 6 L2 10" fill="none" />
      </marker>
    </defs>`;
}

function _stationNode(node, g, index) {
  const { id, label = '', guard = '', decision = '', verdict = '', icon = 'cube' } = node;
  const title = String(label);
  const guardText = String(guard ?? '');
  const decisionText = String(decision ?? '');
  const aria = guardText ? `${title} — ${guardText}` : title;

  const cx = g.x + g.w / 2;

  const CHIP = 34;
  const chipX = cx - CHIP / 2, chipY = g.y + 20;
  const iconEl = icon ? renderIcon(icon, chipX + 5, chipY + 5, 24, 'diagram__station-icon') : '';
  const titleY = chipY + CHIP + 24;
  const guardY = titleY + 22;

  const maxW = g.w - 20;
  const titleTL = title.length * 8 > maxW
    ? ` textLength="${r2(maxW)}" lengthAdjust="spacingAndGlyphs"`
    : '';

  const orderEl = `
      <g class="diagram__station-order" aria-hidden="true">
        <circle cx="${r2(g.x + 20)}" cy="${r2(g.y + 20)}" r="12" />
        <text x="${r2(g.x + 20)}" y="${r2(g.y + 24.5)}" text-anchor="middle">${index + 1}</text>
      </g>`;

  const stampEl = verdict === 'handle'
    ? `
      <g class="diagram__station-stamp" aria-hidden="true">
        <circle cx="${r2(g.x + g.w - 20)}" cy="${r2(g.y + 20)}" r="12" />
        <path d="M${r2(g.x + g.w - 25)} ${r2(g.y + 20)} l3.4 3.4 l6 -7" fill="none" />
      </g>`
    : '';

  let decisionEl = '';
  if (decisionText) {
    const dW = Math.max(72, decisionText.length * 7.4 + 26);
    const dX = cx - dW / 2;
    const dY = g.y + g.h + 12;
    decisionEl = `
      <g class="diagram__station-decision" aria-hidden="true">
        <rect x="${r2(dX)}" y="${r2(dY)}" width="${r2(dW)}" height="26" rx="13" ry="13" />
        <text x="${r2(cx)}" y="${r2(dY + 17.5)}" text-anchor="middle">${escapeText(decisionText)}</text>
      </g>`;
  }

  const clsVerdict = verdict ? ` diagram__station--${escapeText(verdict)}` : '';

  return `
    <g class="diagram__station${clsVerdict}" data-node-id="${escapeText(id)}" data-station-index="${index}" tabindex="0" role="listitem" aria-label="${escapeText(aria)}">
      <rect class="diagram__station-bg" x="${r2(g.x)}" y="${r2(g.y)}" width="${r2(g.w)}" height="${r2(g.h)}" rx="18" ry="18" />
      <rect class="diagram__station-chip" x="${r2(chipX)}" y="${r2(chipY)}" width="${CHIP}" height="${CHIP}" rx="10" ry="10" aria-hidden="true" />${iconEl}
      <text class="diagram__station-title" x="${r2(cx)}" y="${r2(titleY)}" text-anchor="middle"${titleTL}>${escapeText(title)}</text>${guardText ? `
      <text class="diagram__station-guard" x="${r2(cx)}" y="${r2(guardY)}" text-anchor="middle">${escapeText(guardText)}</text>` : ''}${orderEl}${stampEl}${decisionEl}
    </g>`;
}

function _facadeDiagram(model) {
  const {
    id = 'diagram', category = '', width = 860, height = 470,
    title = '', description = '', caption = '',
  } = model;

  const nodes = Array.isArray(model.nodes) ? model.nodes : [];
  const client = nodes.find((n) => n && n.role === 'client');
  const facade = nodes.find((n) => n && n.role === 'facade');
  const parts  = nodes.filter((n) => n && n.role === 'subsystem');
  if (!client || !facade || parts.length === 0) return '';

  const safeId = String(id).replace(/[^a-zA-Z0-9_-]/g, '') || 'diagram';
  const titleId = `${safeId}-title`;
  const descId = `${safeId}-desc`;
  const W = Number(width) || 860;
  const H = Number(height) || 470;

  const PAD = 24;
  const midY = H / 2;

  const CLIENT_W = 150, CLIENT_H = 96;
  const clientG = { x: PAD, y: midY - CLIENT_H / 2, w: CLIENT_W, h: CLIENT_H };

  const FACADE_W = 158, FACADE_H = 300;
  const GAP1 = 60;
  const facadeG = {
    x: clientG.x + CLIENT_W + GAP1, y: midY - FACADE_H / 2, w: FACADE_W, h: FACADE_H,
  };

  const GAP2 = 62;
  const regionX = facadeG.x + FACADE_W + GAP2;
  const region = { x: regionX, y: PAD, w: (W - PAD) - regionX, h: H - PAD * 2 };

  const RPAD = 22;
  const HEADER = 54;
  const partX = region.x + RPAD;
  const partW = region.w - RPAD * 2;
  const stackTop = region.y + HEADER;
  const stackBottom = region.y + region.h - RPAD;
  const PART_GAP = 18;
  const n = parts.length;
  const partH = Math.min(84, (stackBottom - stackTop - PART_GAP * (n - 1)) / n);
  const stackH = partH * n + PART_GAP * (n - 1);
  const stackY0 = stackTop + ((stackBottom - stackTop) - stackH) / 2;
  const partGeom = parts.map((_, i) => ({
    x: partX, y: stackY0 + i * (partH + PART_GAP), w: partW, h: partH,
  }));

  const clientSvg = DiagramNode({ ...client, ...clientG }, { concept: true, prefix: safeId });
  const facadeSvg = DiagramNode({ ...facade, ...facadeG, emphasis: true }, { concept: true, prefix: safeId });
  const partsSvg = parts
    .map((p, i) => DiagramNode({ ...p, ...partGeom[i] }, { concept: true, prefix: safeId }))
    .join('');

  const regionLabel = typeof model.subsystemLabel === 'string' ? model.subsystemLabel : '';
  const regionSvg = _facadeRegion(region, regionLabel);

  const entrySvg = _facadeFlow(
    { x1: clientG.x + clientG.w, y1: clientG.y + clientG.h / 2,
      x2: facadeG.x,            y2: facadeG.y + facadeG.h / 2 }, safeId);
  const facadeRightX = facadeG.x + facadeG.w;
  const facadeMidY = facadeG.y + facadeG.h / 2;
  const fanSvg = partGeom
    .map((g) => _facadeFlow(
      { x1: facadeRightX, y1: facadeMidY, x2: g.x, y2: g.y + g.h / 2 }, safeId))
    .join('');

  const rootCls = [
    'diagram', 'diagram--concept', 'diagram--facade',
    category ? `diagram--${escapeText(category)}` : '',
  ].filter(Boolean).join(' ');

  const captionBlock = caption
    ? `
    <figcaption class="diagram__caption">${escapeText(caption)}</figcaption>`
    : '';

  return `
  <figure class="${rootCls}">
    <div class="diagram__viewport">
      <svg class="diagram__svg"
           viewBox="0 0 ${W} ${H}"
           role="img"
           aria-labelledby="${titleId}${description ? ` ${descId}` : ''}"
           preserveAspectRatio="xMidYMid meet"
           xmlns="http://www.w3.org/2000/svg">
        <title id="${titleId}">${escapeText(title)}</title>${
    description
      ? `
        <desc id="${descId}">${escapeText(description)}</desc>`
      : ''
  }
        ${_conceptDefs(safeId)}
        <g class="diagram__edges" aria-hidden="true">${regionSvg}${entrySvg}${fanSvg}
        </g>
        <g class="diagram__nodes" role="list">${clientSvg}${facadeSvg}${partsSvg}
        </g>
      </svg>
    </div>${captionBlock}
  </figure>`;
}

function _facadeRegion(g, label) {
  const labelEl = label
    ? `
      <text class="diagram__region-title" x="${r2(g.x + 22)}" y="${r2(g.y + 34)}">${escapeText(label)}</text>`
    : '';
  return `
      <rect class="diagram__region-bg" x="${r2(g.x)}" y="${r2(g.y)}" width="${r2(g.w)}" height="${r2(g.h)}" rx="22" ry="22" />
      <line class="diagram__region-wall" x1="${r2(g.x)}" y1="${r2(g.y + 18)}" x2="${r2(g.x)}" y2="${r2(g.y + g.h - 18)}" />${labelEl}`;
}

function _facadeFlow(p, safeId) {
  return `
      <path class="diagram__flow diagram__flow--facade" d="${curvePath(p)}" fill="none" marker-end="url(#${safeId}-flow)" aria-hidden="true" />`;
}

function _poolDiagram(model) {
  const {
    id = 'diagram', category = '', width = 900, height = 440,
    title = '', description = '', caption = '',
  } = model;

  const nodes = Array.isArray(model.nodes) ? model.nodes : [];
  const client = nodes.find((n) => n && n.role === 'client');
  const factory = nodes.find((n) => n && n.role === 'factory');
  const items = nodes.filter((n) => n && n.role === 'flyweight');
  if (!client || !factory || items.length === 0) return '';

  const safeId = String(id).replace(/[^a-zA-Z0-9_-]/g, '') || 'diagram';
  const titleId = `${safeId}-title`;
  const descId = `${safeId}-desc`;
  const W = Number(width) || 900;
  const H = Number(height) || 440;

  const PAD = 24;
  const midY = H / 2;

  const CLIENT_W = 150, CLIENT_H = 96;
  const clientG = { x: PAD, y: midY - CLIENT_H / 2, w: CLIENT_W, h: CLIENT_H };

  const FACTORY_W = 176, FACTORY_H = 220;
  const GAP1 = 60;
  const factoryG = {
    x: clientG.x + CLIENT_W + GAP1, y: midY - FACTORY_H / 2, w: FACTORY_W, h: FACTORY_H,
  };

  const GAP2 = 64;
  const regionX = factoryG.x + FACTORY_W + GAP2;
  const region = { x: regionX, y: PAD, w: (W - PAD) - regionX, h: H - PAD * 2 };

  const RPAD = 22;
  const HEADER = 54;
  const BADGE_GAP = 28;
  const BADGE_MAX = 150;
  const n = items.length;
  const slot = (region.w - RPAD * 2) / n;
  const bd = Math.min(BADGE_MAX, slot - BADGE_GAP);
  const contentTop = region.y + HEADER;
  const contentBottom = region.y + region.h - RPAD;
  const cy = (contentTop + contentBottom) / 2;
  const bx0 = region.x + RPAD;
  const itemGeom = items.map((_, i) => {
    const cx = bx0 + slot * (i + 0.5);
    return { x: cx - bd / 2, y: cy - bd / 2, w: bd, h: bd, cx, cy };
  });

  const clientSvg = DiagramNode({ ...client, ...clientG }, { concept: true, prefix: safeId });
  const factorySvg = DiagramNode({ ...factory, ...factoryG, emphasis: true }, { concept: true, prefix: safeId });
  const itemsSvg = items.map((n2, i) => _poolBadge(n2, itemGeom[i], i)).join('');

  const poolLabel = typeof model.poolLabel === 'string' ? model.poolLabel : '';
  const regionSvg = _poolRegion(region, poolLabel);

  const entrySvg = _poolFlow(
    { x1: clientG.x + clientG.w, y1: clientG.y + clientG.h / 2,
      x2: factoryG.x,            y2: factoryG.y + factoryG.h / 2 }, safeId);
  const factoryRightX = factoryG.x + factoryG.w;
  const factoryMidY = factoryG.y + factoryG.h / 2;
  const fanSvg = itemGeom
    .map((g) => _poolFlow(
      { x1: factoryRightX, y1: factoryMidY, x2: g.x, y2: g.cy }, safeId))
    .join('');

  const rootCls = [
    'diagram', 'diagram--concept', 'diagram--pool',
    category ? `diagram--${escapeText(category)}` : '',
  ].filter(Boolean).join(' ');

  const captionBlock = caption
    ? `
    <figcaption class="diagram__caption">${escapeText(caption)}</figcaption>`
    : '';

  return `
  <figure class="${rootCls}">
    <div class="diagram__viewport">
      <svg class="diagram__svg"
           viewBox="0 0 ${W} ${H}"
           role="img"
           aria-labelledby="${titleId}${description ? ` ${descId}` : ''}"
           preserveAspectRatio="xMidYMid meet"
           xmlns="http://www.w3.org/2000/svg">
        <title id="${titleId}">${escapeText(title)}</title>${
    description
      ? `
        <desc id="${descId}">${escapeText(description)}</desc>`
      : ''
  }
        ${_conceptDefs(safeId)}
        <g class="diagram__edges" aria-hidden="true">${regionSvg}${entrySvg}${fanSvg}
        </g>
        <g class="diagram__nodes" role="list">${clientSvg}${factorySvg}${itemsSvg}
        </g>
      </svg>
    </div>${captionBlock}
  </figure>`;
}

function _poolRegion(g, label) {
  const labelEl = label
    ? `
      <text class="diagram__pool-title" x="${r2(g.x + g.w / 2)}" y="${r2(g.y + 34)}" text-anchor="middle">${escapeText(label)}</text>`
    : '';
  return `
      <rect class="diagram__pool-bg" x="${r2(g.x)}" y="${r2(g.y)}" width="${r2(g.w)}" height="${r2(g.h)}" rx="22" ry="22" />${labelEl}`;
}

function _poolBadge(node, g, index) {
  const { id, label = '', icon = 'cube' } = node;
  const r = g.w / 2;
  const iconSize = Math.max(20, Math.min(28, r * 0.4));
  const iconEl = icon
    ? renderIcon(icon, g.cx - iconSize / 2, g.cy - r * 0.52, iconSize, 'diagram__pool-icon')
    : '';
  const labelY = g.cy + r * 0.42;

  return `
    <g class="diagram__pool-item" data-node-id="${escapeText(id)}" data-pool-index="${index}" tabindex="0" role="listitem" aria-label="${escapeText(label)}">
      <circle class="diagram__pool-token" cx="${r2(g.cx)}" cy="${r2(g.cy)}" r="${r2(r)}" />${iconEl}
      <text class="diagram__pool-label" x="${r2(g.cx)}" y="${r2(labelY)}" text-anchor="middle">${escapeText(label)}</text>
    </g>`;
}

function _poolFlow(p, safeId) {
  return `
      <path class="diagram__flow diagram__flow--pool" d="${curvePath(p)}" fill="none" marker-end="url(#${safeId}-flow)" aria-hidden="true" />`;
}

function _gatewayDiagram(model) {
  const {
    id = 'diagram', category = '', width = 820, height = 460,
    title = '', description = '', caption = '',
  } = model;

  const nodes = Array.isArray(model.nodes) ? model.nodes : [];
  const client = nodes.find((n) => n && n.role === 'client');
  const proxy = nodes.find((n) => n && n.role === 'proxy');
  const service = nodes.find((n) => n && n.role === 'service');
  if (!client || !proxy || !service) return '';

  const safeId = String(id).replace(/[^a-zA-Z0-9_-]/g, '') || 'diagram';
  const titleId = `${safeId}-title`;
  const descId = `${safeId}-desc`;
  const W = Number(width) || 820;
  const H = Number(height) || 460;

  const PAD = 24;
  const rowY = H * 0.65;

  const CLIENT_W = 150, CLIENT_H = 96;
  const clientG = { x: PAD, y: rowY - CLIENT_H / 2, w: CLIENT_W, h: CLIENT_H };

  const PROXY_W = 210, PROXY_H = 180;
  const GAP1 = 64;
  const proxyG = {
    x: clientG.x + CLIENT_W + GAP1, y: rowY - PROXY_H / 2, w: PROXY_W, h: PROXY_H,
  };

  const SERVICE_W = 170, SERVICE_H = 110;
  const GAP2 = 64;
  const serviceG = {
    x: proxyG.x + PROXY_W + GAP2, y: rowY - SERVICE_H / 2, w: SERVICE_W, h: SERVICE_H,
  };

  const contentRight = serviceG.x + SERVICE_W;
  const shiftX = (W - PAD - contentRight) / 2;
  clientG.x += shiftX;
  proxyG.x += shiftX;
  serviceG.x += shiftX;

  const clientSvg = DiagramNode({ ...client, ...clientG }, { concept: true, prefix: safeId });
  const proxySvg = DiagramNode({ ...proxy, ...proxyG, emphasis: true }, { concept: true, prefix: safeId });
  const serviceSvg = DiagramNode({ ...service, ...serviceG }, { concept: true, prefix: safeId });

  const entrySvg = _gatewayFlow(
    { x1: clientG.x + clientG.w, y1: clientG.y + clientG.h / 2,
      x2: proxyG.x,             y2: proxyG.y + proxyG.h / 2 }, safeId);
  const delegateSvg = _gatewayFlow(
    { x1: proxyG.x + proxyG.w, y1: proxyG.y + proxyG.h / 2,
      x2: serviceG.x,          y2: serviceG.y + serviceG.h / 2 }, safeId);

  const blockedLabel = typeof model.blockedLabel === 'string' ? model.blockedLabel : '';
  const blockedSvg = _gatewayBlocked(clientG, serviceG, PAD, blockedLabel);

  const rootCls = [
    'diagram', 'diagram--concept', 'diagram--gateway',
    category ? `diagram--${escapeText(category)}` : '',
  ].filter(Boolean).join(' ');

  const captionBlock = caption
    ? `
    <figcaption class="diagram__caption">${escapeText(caption)}</figcaption>`
    : '';

  return `
  <figure class="${rootCls}">
    <div class="diagram__viewport">
      <svg class="diagram__svg"
           viewBox="0 0 ${W} ${H}"
           role="img"
           aria-labelledby="${titleId}${description ? ` ${descId}` : ''}"
           preserveAspectRatio="xMidYMid meet"
           xmlns="http://www.w3.org/2000/svg">
        <title id="${titleId}">${escapeText(title)}</title>${
    description
      ? `
        <desc id="${descId}">${escapeText(description)}</desc>`
      : ''
  }
        ${_conceptDefs(safeId)}
        <g class="diagram__edges" aria-hidden="true">${blockedSvg}${entrySvg}${delegateSvg}
        </g>
        <g class="diagram__nodes" role="list">${clientSvg}${proxySvg}${serviceSvg}
        </g>
      </svg>
    </div>${captionBlock}
  </figure>`;
}

function _gatewayBlocked(clientG, serviceG, pad, label) {
  const x1 = clientG.x + clientG.w / 2, y1 = clientG.y;
  const x2 = serviceG.x + serviceG.w / 2, y2 = serviceG.y;
  const peakY = pad + 36;
  const midX = (x1 + x2) / 2;
  const bx = 0.25 * x1 + 0.5 * midX + 0.25 * x2;
  const by = 0.25 * y1 + 0.5 * peakY + 0.25 * y2;

  const labelEl = label
    ? `
      <text class="diagram__gateway-blocked-label" x="${r2(bx)}" y="${r2(by + 32)}" text-anchor="middle">${escapeText(label)}</text>`
    : '';

  return `
      <path class="diagram__gateway-blocked-path" d="M ${r2(x1)} ${r2(y1)} Q ${r2(midX)} ${r2(peakY)} ${r2(x2)} ${r2(y2)}" fill="none" aria-hidden="true" />
      <g class="diagram__gateway-blocked-badge" aria-hidden="true">
        <circle cx="${r2(bx)}" cy="${r2(by)}" r="15" />
        <line x1="${r2(bx - 8)}" y1="${r2(by + 8)}" x2="${r2(bx + 8)}" y2="${r2(by - 8)}" />
      </g>${labelEl}`;
}

function _gatewayFlow(p, safeId) {
  return `
      <path class="diagram__flow diagram__flow--gateway" d="${curvePath(p)}" fill="none" marker-end="url(#${safeId}-flow)" aria-hidden="true" />`;
}

function _commandDiagram(model) {
  const {
    id = 'diagram', category = '', width = 860, height = 420,
    title = '', description = '', caption = '',
  } = model;

  const nodes = Array.isArray(model.nodes) ? model.nodes : [];
  const client = nodes.find((n) => n && n.role === 'client');
  const invoker = nodes.find((n) => n && n.role === 'invoker');
  const command = nodes.find((n) => n && n.role === 'command');
  const receiver = nodes.find((n) => n && n.role === 'receiver');
  if (!client || !invoker || !command || !receiver) return '';

  const safeId = String(id).replace(/[^a-zA-Z0-9_-]/g, '') || 'diagram';
  const titleId = `${safeId}-title`;
  const descId = `${safeId}-desc`;
  const W = Number(width) || 860;
  const H = Number(height) || 420;

  const PAD = 24;
  const rowY = H / 2;

  const CLIENT_W = 150, CLIENT_H = 96;
  const clientG = { x: PAD, y: rowY - CLIENT_H / 2, w: CLIENT_W, h: CLIENT_H };

  const INVOKER_W = 196, INVOKER_H = 172;
  const GAP1 = 60;
  const invokerG = {
    x: clientG.x + CLIENT_W + GAP1, y: rowY - INVOKER_H / 2, w: INVOKER_W, h: INVOKER_H,
  };

  const CAPSULE_W = 168, CAPSULE_H = 72;
  const OVERLAP = 42;
  const commandG = {
    x: invokerG.x + invokerG.w - OVERLAP, y: rowY - CAPSULE_H / 2, w: CAPSULE_W, h: CAPSULE_H,
  };

  const RECEIVER_W = 150, RECEIVER_H = 96;
  const GAP2 = 56;
  const receiverG = {
    x: commandG.x + CAPSULE_W + GAP2, y: rowY - RECEIVER_H / 2, w: RECEIVER_W, h: RECEIVER_H,
  };

  const contentRight = receiverG.x + RECEIVER_W;
  const shiftX = (W - PAD - contentRight) / 2;
  clientG.x += shiftX;
  invokerG.x += shiftX;
  commandG.x += shiftX;
  receiverG.x += shiftX;

  const clientSvg = DiagramNode({ ...client, ...clientG }, { concept: true, prefix: safeId });
  const invokerSvg = DiagramNode({ ...invoker, ...invokerG, emphasis: true }, { concept: true, prefix: safeId });
  const receiverSvg = DiagramNode({ ...receiver, ...receiverG }, { concept: true, prefix: safeId });

  const socketG = {
    x: invokerG.x + invokerG.w - OVERLAP - 12, y: commandG.y - 8,
    w: OVERLAP + 20, h: CAPSULE_H + 16,
  };
  const socketSvg = `
      <rect class="diagram__command-socket" x="${r2(socketG.x)}" y="${r2(socketG.y)}" width="${r2(socketG.w)}" height="${r2(socketG.h)}" rx="${r2(socketG.h / 2)}" ry="${r2(socketG.h / 2)}" aria-hidden="true" />`;

  const commandSvg = _capsuleNode(command, commandG);

  const entrySvg = _commandFlow(
    { x1: clientG.x + clientG.w, y1: clientG.y + clientG.h / 2,
      x2: invokerG.x,            y2: invokerG.y + invokerG.h / 2 }, safeId);
  const socketFlowSvg = _commandFlow(
    { x1: invokerG.x + invokerG.w - OVERLAP, y1: rowY,
      x2: commandG.x,                        y2: rowY }, safeId);
  const executeSvg = _commandFlow(
    { x1: commandG.x + CAPSULE_W, y1: rowY,
      x2: receiverG.x,            y2: receiverG.y + receiverG.h / 2 }, safeId);

  const rootCls = [
    'diagram', 'diagram--concept', 'diagram--command',
    category ? `diagram--${escapeText(category)}` : '',
  ].filter(Boolean).join(' ');

  const captionBlock = caption
    ? `
    <figcaption class="diagram__caption">${escapeText(caption)}</figcaption>`
    : '';

  return `
  <figure class="${rootCls}">
    <div class="diagram__viewport">
      <svg class="diagram__svg"
           viewBox="0 0 ${W} ${H}"
           role="img"
           aria-labelledby="${titleId}${description ? ` ${descId}` : ''}"
           preserveAspectRatio="xMidYMid meet"
           xmlns="http://www.w3.org/2000/svg">
        <title id="${titleId}">${escapeText(title)}</title>${
    description
      ? `
        <desc id="${descId}">${escapeText(description)}</desc>`
      : ''
  }
        ${_conceptDefs(safeId)}
        <g class="diagram__edges" aria-hidden="true">${socketSvg}${entrySvg}${socketFlowSvg}${executeSvg}
        </g>
        <g class="diagram__nodes" role="list">${clientSvg}${invokerSvg}${commandSvg}${receiverSvg}
        </g>
      </svg>
    </div>${captionBlock}
  </figure>`;
}

function _capsuleNode(node, g) {
  const { id, label = '', icon = 'layers' } = node;
  const cy = g.y + g.h / 2;

  const CHIP = 40;
  const chipX = g.x + 16, chipY = cy - CHIP / 2;
  const iconEl = icon ? renderIcon(icon, chipX + 7, chipY + 7, 26, 'diagram__capsule-icon') : '';
  const titleX = chipX + CHIP + 12;
  const maxW = g.w - (titleX - g.x) - 30;
  const titleTL = label.length * 8 > maxW
    ? ` textLength="${r2(maxW)}" lengthAdjust="spacingAndGlyphs"`
    : '';

  return `
    <g class="diagram__capsule" data-node-id="${escapeText(id)}" tabindex="0" role="listitem" aria-label="${escapeText(label)}">
      <rect class="diagram__capsule-bg" x="${r2(g.x)}" y="${r2(g.y)}" width="${r2(g.w)}" height="${r2(g.h)}" rx="${r2(g.h / 2)}" ry="${r2(g.h / 2)}" />
      <rect class="diagram__capsule-chip" x="${r2(chipX)}" y="${r2(chipY)}" width="${CHIP}" height="${CHIP}" rx="${r2(CHIP / 2)}" ry="${r2(CHIP / 2)}" aria-hidden="true" />${iconEl}
      <text class="diagram__capsule-title" x="${r2(titleX)}" y="${r2(cy + 5)}"${titleTL}>${escapeText(label)}</text>
      <g class="diagram__capsule-undo" aria-hidden="true">
        <circle cx="${r2(g.x + g.w - 18)}" cy="${r2(g.y)}" r="15" />
        <text x="${r2(g.x + g.w - 18)}" y="${r2(g.y + 5)}" text-anchor="middle">↺</text>
      </g>
    </g>`;
}

function _commandFlow(p, safeId) {
  return `
      <path class="diagram__flow diagram__flow--command" d="${curvePath(p)}" fill="none" marker-end="url(#${safeId}-flow)" aria-hidden="true" />`;
}

function _expressionDiagram(model) {
  const {
    id = 'diagram', category = '', width = 940, height = 560,
    title = '', description = '', caption = '',
  } = model;

  const nodes = Array.isArray(model.nodes) ? model.nodes : [];
  const client = nodes.find((n) => n && n.role === 'client');
  const root = nodes.find((n) => n && n.role === 'root');
  const branch = nodes.find((n) => n && n.role === 'branch');
  const rootLeaf = nodes.find((n) => n && n.role === 'root-leaf');
  const branchLeaves = nodes.filter((n) => n && n.role === 'branch-leaf');
  if (!client || !root || !branch || !rootLeaf || branchLeaves.length < 2) return '';

  const safeId = String(id).replace(/[^a-zA-Z0-9_-]/g, '') || 'diagram';
  const titleId = `${safeId}-title`;
  const descId = `${safeId}-desc`;
  const W = Number(width) || 940;
  const H = Number(height) || 560;

  const PAD = 24;
  const CLIENT_W = 150, CLIENT_H = 104;
  const NONTERM_W = 160, NONTERM_H = 128;
  const TERM_W = 124, TERM_H = 84;
  const GAP = 70;

  const ROW1_CY = 104;
  const ROW2_CY = 302;
  const ROW3_CY = 478;

  const treeX0 = PAD + CLIENT_W + GAP;
  const treeX1 = W - PAD;
  const treeW = treeX1 - treeX0;
  const slotW = treeW / 3;
  const slotCx = (i) => treeX0 + slotW * (i + 0.5);

  const leafAX = slotCx(0);
  const leafBX = slotCx(1);
  const rootLeafX = slotCx(2);
  const branchX = (leafAX + leafBX) / 2;
  const rootX = (branchX + rootLeafX) / 2;

  const box = (cx, cy, w, h) => ({ x: cx - w / 2, y: cy - h / 2, w, h, cx, cy });

  let clientG = box(PAD + CLIENT_W / 2, ROW2_CY, CLIENT_W, CLIENT_H);
  let rootG = box(rootX, ROW1_CY, NONTERM_W, NONTERM_H);
  let branchG = box(branchX, ROW2_CY, NONTERM_W, NONTERM_H);
  let rootLeafG = box(rootLeafX, ROW2_CY, TERM_W, TERM_H);
  let leafAG = box(leafAX, ROW3_CY, TERM_W, TERM_H);
  let leafBG = box(leafBX, ROW3_CY, TERM_W, TERM_H);

  const contentRight = Math.max(
    rootG.x + rootG.w, rootLeafG.x + rootLeafG.w,
    leafAG.x + leafAG.w, leafBG.x + leafBG.w,
  );
  const shiftX = (W - PAD - contentRight) / 2;
  [clientG, rootG, branchG, rootLeafG, leafAG, leafBG].forEach((g) => {
    g.x += shiftX; g.cx += shiftX;
  });

  const clientSvg = DiagramNode({ ...client, ...clientG }, { concept: true, prefix: safeId });
  const resultSvg = client.result ? (() => {
    const text = String(client.result);
    const rW = Math.max(64, text.length * 9 + 34);
    const rH = 30;
    const rX = clientG.x + clientG.w - rW / 2;
    const rY = clientG.y + clientG.h - rH / 2;
    return `
      <g class="diagram__result-badge" data-node-id="result" aria-hidden="true">
        <rect x="${r2(rX)}" y="${r2(rY)}" width="${r2(rW)}" height="${r2(rH)}" rx="15" ry="15" />
        <text x="${r2(rX + rW / 2)}" y="${r2(rY + rH / 2 + 4.5)}" text-anchor="middle">= ${escapeText(text)}</text>
      </g>`;
  })() : '';
  const rootSvg = DiagramNode({ ...root, ...rootG, emphasis: true }, { concept: true, prefix: safeId });
  const branchSvg = DiagramNode({ ...branch, ...branchG, emphasis: true }, { concept: true, prefix: safeId });
  const rootLeafSvg = DiagramNode({ ...rootLeaf, ...rootLeafG }, { concept: true, prefix: safeId });
  const leafASvg = DiagramNode({ ...branchLeaves[0], ...leafAG }, { concept: true, prefix: safeId });
  const leafBSvg = DiagramNode({ ...branchLeaves[1], ...leafBG }, { concept: true, prefix: safeId });

  const edgesById = new Map();
  (Array.isArray(model.edges) ? model.edges : []).forEach((e) => {
    if (e) edgesById.set(`${e.from}->${e.to}`, e);
  });
  const edgeFlow = (sourceId, targetId, parentG, childG, pts) => {
    const edge = edgesById.get(`${sourceId}->${targetId}`);
    return edge
      ? DiagramEdge(edge, {
        ...pts,
        mx: (pts.x1 + pts.x2) / 2,
        my: (pts.y1 + pts.y2) / 2,
      }, safeId, { concept: true })
      : _expressionFlow(pts, safeId);
  };

  const entryPts = { x1: clientG.x + clientG.w, y1: clientG.cy, x2: rootG.x, y2: rootG.cy };
  const entrySvg = edgeFlow(client.id, root.id, clientG, rootG, entryPts);
  const toBranchSvg = edgeFlow(root.id, branch.id, rootG, branchG,
    { x1: rootG.cx, y1: rootG.y + rootG.h, x2: branchG.cx, y2: branchG.y });
  const toRootLeafSvg = edgeFlow(root.id, rootLeaf.id, rootG, rootLeafG,
    { x1: rootG.cx, y1: rootG.y + rootG.h, x2: rootLeafG.cx, y2: rootLeafG.y });
  const toLeafASvg = edgeFlow(branch.id, branchLeaves[0].id, branchG, leafAG,
    { x1: branchG.cx, y1: branchG.y + branchG.h, x2: leafAG.cx, y2: leafAG.y });
  const toLeafBSvg = edgeFlow(branch.id, branchLeaves[1].id, branchG, leafBG,
    { x1: branchG.cx, y1: branchG.y + branchG.h, x2: leafBG.cx, y2: leafBG.y });

  const rootCls = [
    'diagram', 'diagram--concept', 'diagram--expression',
    category ? `diagram--${escapeText(category)}` : '',
  ].filter(Boolean).join(' ');

  const captionBlock = caption
    ? `
    <figcaption class="diagram__caption">${escapeText(caption)}</figcaption>`
    : '';

  return `
  <figure class="${rootCls}">
    <div class="diagram__viewport">
      <svg class="diagram__svg"
           viewBox="0 0 ${W} ${H}"
           role="img"
           aria-labelledby="${titleId}${description ? ` ${descId}` : ''}"
           preserveAspectRatio="xMidYMid meet"
           xmlns="http://www.w3.org/2000/svg">
        <title id="${titleId}">${escapeText(title)}</title>${
    description
      ? `
        <desc id="${descId}">${escapeText(description)}</desc>`
      : ''
  }
        ${_conceptDefs(safeId)}
        <g class="diagram__edges" aria-hidden="true">${entrySvg}${toBranchSvg}${toRootLeafSvg}${toLeafASvg}${toLeafBSvg}
        </g>
        <g class="diagram__nodes" role="list">${clientSvg}${resultSvg}${rootSvg}${branchSvg}${rootLeafSvg}${leafASvg}${leafBSvg}
        </g>
      </svg>
    </div>${captionBlock}
  </figure>`;
}

function _expressionFlow(p, safeId) {
  return `
      <path class="diagram__flow diagram__flow--expression" d="${curvePath(p)}" fill="none" marker-end="url(#${safeId}-flow)" aria-hidden="true" />`;
}

function _cursorDiagram(model) {
  const {
    id = 'diagram', category = '', width = 940, height = 420,
    title = '', description = '', caption = '',
  } = model;

  const nodes = Array.isArray(model.nodes) ? model.nodes : [];
  const client = nodes.find((n) => n && n.role === 'client');
  const iterator = nodes.find((n) => n && n.role === 'iterator');
  const elements = nodes.filter((n) => n && n.role === 'element');
  if (!client || !iterator || elements.length === 0) return '';

  const safeId = String(id).replace(/[^a-zA-Z0-9_-]/g, '') || 'diagram';
  const titleId = `${safeId}-title`;
  const descId = `${safeId}-desc`;
  const W = Number(width) || 940;
  const H = Number(height) || 420;

  const PAD = 24;
  const midY = H / 2;

  const CLIENT_W = 150, CLIENT_H = 96;
  const clientG = { x: PAD, y: midY - CLIENT_H / 2, w: CLIENT_W, h: CLIENT_H };

  const ITER_W = 190, ITER_H = 176;
  const GAP1 = 56;
  const iteratorG = {
    x: clientG.x + CLIENT_W + GAP1, y: midY - ITER_H / 2, w: ITER_W, h: ITER_H,
  };

  const GAP2 = 60;
  const regionX = iteratorG.x + ITER_W + GAP2;
  const region = { x: regionX, y: PAD, w: (W - PAD) - regionX, h: H - PAD * 2 };

  const RPAD = 22;
  const HEADER = 52;
  const CARET_ZONE = 24;
  const CELL_GAP = 16;
  const CELL_MAX = 96;
  const n = elements.length;
  const available = region.w - RPAD * 2;
  const cell = Math.min(CELL_MAX, (available - CELL_GAP * (n - 1)) / n);
  const rowW = cell * n + CELL_GAP * (n - 1);
  const rowX0 = region.x + (region.w - rowW) / 2;
  const contentTop = region.y + HEADER;
  const contentBottom = region.y + region.h - RPAD - CARET_ZONE;
  const cy = (contentTop + contentBottom) / 2;
  const elemGeom = elements.map((_, i) => {
    const x = rowX0 + i * (cell + CELL_GAP);
    return { x, y: cy - cell / 2, w: cell, h: cell, cx: x + cell / 2, cy };
  });

  const clientSvg = DiagramNode({ ...client, ...clientG }, { concept: true, prefix: safeId });
  const iteratorSvg = DiagramNode({ ...iterator, ...iteratorG, emphasis: true }, { concept: true, prefix: safeId });
  const elemsSvg = elements.map((n2, i) => _cellNode(n2, elemGeom[i], i)).join('');

  const collectionLabel = typeof model.collectionLabel === 'string' ? model.collectionLabel : '';
  const regionSvg = _cursorRegion(region, collectionLabel);

  const entrySvg = _cursorFlow(
    { x1: clientG.x + clientG.w, y1: clientG.y + clientG.h / 2,
      x2: iteratorG.x,           y2: iteratorG.y + iteratorG.h / 2 }, safeId);
  const iterRightX = iteratorG.x + iteratorG.w;
  const iterMidY = iteratorG.y + iteratorG.h / 2;
  const spokesSvg = elemGeom
    .map((g) => _cursorFlow({ x1: iterRightX, y1: iterMidY, x2: g.cx, y2: g.y }, safeId))
    .join('');

  const rootCls = [
    'diagram', 'diagram--concept', 'diagram--cursor',
    category ? `diagram--${escapeText(category)}` : '',
  ].filter(Boolean).join(' ');

  const captionBlock = caption
    ? `
    <figcaption class="diagram__caption">${escapeText(caption)}</figcaption>`
    : '';

  return `
  <figure class="${rootCls}">
    <div class="diagram__viewport">
      <svg class="diagram__svg"
           viewBox="0 0 ${W} ${H}"
           role="img"
           aria-labelledby="${titleId}${description ? ` ${descId}` : ''}"
           preserveAspectRatio="xMidYMid meet"
           xmlns="http://www.w3.org/2000/svg">
        <title id="${titleId}">${escapeText(title)}</title>${
    description
      ? `
        <desc id="${descId}">${escapeText(description)}</desc>`
      : ''
  }
        ${_conceptDefs(safeId)}
        <g class="diagram__edges" aria-hidden="true">${regionSvg}${entrySvg}${spokesSvg}
        </g>
        <g class="diagram__nodes" role="list">${clientSvg}${iteratorSvg}${elemsSvg}
        </g>
      </svg>
    </div>${captionBlock}
  </figure>`;
}

function _cursorRegion(g, label) {
  const labelEl = label
    ? `
      <text class="diagram__cursor-title" x="${r2(g.x + g.w / 2)}" y="${r2(g.y + 34)}" text-anchor="middle">${escapeText(label)}</text>`
    : '';
  return `
      <rect class="diagram__cursor-bg" x="${r2(g.x)}" y="${r2(g.y)}" width="${r2(g.w)}" height="${r2(g.h)}" rx="22" ry="22" />${labelEl}`;
}

function _cellNode(node, g, index) {
  const { id, label = '', icon = 'cube' } = node;
  const iconSize = Math.max(18, Math.min(24, g.w * 0.26));
  const iconEl = icon
    ? renderIcon(icon, g.cx - iconSize / 2, g.y + g.h * 0.22, iconSize, 'diagram__cell-icon')
    : '';
  const labelY = g.cy + g.h * 0.32;
  const maxW = g.w - 12;
  const labelTL = label.length * 6.6 > maxW
    ? ` textLength="${r2(maxW)}" lengthAdjust="spacingAndGlyphs"`
    : '';
  const caretBaseY = g.y + g.h + 15;
  const caretTipY = g.y + g.h + 3;

  return `
    <g class="diagram__cell" data-node-id="${escapeText(id)}" data-cell-index="${index}" tabindex="0" role="listitem" aria-label="${escapeText(label)}">
      <rect class="diagram__cell-bg" x="${r2(g.x)}" y="${r2(g.y)}" width="${r2(g.w)}" height="${r2(g.h)}" rx="14" ry="14" />${iconEl}
      <text class="diagram__cell-label" x="${r2(g.cx)}" y="${r2(labelY)}" text-anchor="middle"${labelTL}>${escapeText(label)}</text>
      <path class="diagram__cell-cursor" d="M ${r2(g.cx - 7)} ${r2(caretBaseY)} L ${r2(g.cx + 7)} ${r2(caretBaseY)} L ${r2(g.cx)} ${r2(caretTipY)} Z" aria-hidden="true" />
    </g>`;
}

function _cursorFlow(p, safeId) {
  return `
      <path class="diagram__flow diagram__flow--cursor" d="${curvePath(p)}" fill="none" marker-end="url(#${safeId}-flow)" aria-hidden="true" />`;
}
