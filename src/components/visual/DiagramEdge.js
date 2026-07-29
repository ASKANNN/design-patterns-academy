import { escapeText, r2, curvePath } from './svg-utils.js';

export const EDGE_TYPES = {
  inheritance: { marker: 'inheritance', dashed: false },
  association: { marker: 'association', dashed: false },
  dependency:  { marker: 'association', dashed: true  },
  aggregation: { marker: 'aggregation', dashed: false },
  composition: { marker: 'composition', dashed: false },
};

export function DiagramEdge(edge = {}, pts, defsPrefix = 'dia', opts = {}) {
  const { type = 'association', label = '', variant = '', labelDx = 0, labelDy = 0 } = edge;

  if (opts.concept) {
    const vc = variant ? ` diagram__flow--${escapeText(variant)}` : '';
    const vcDash = variant ? ` diagram__flow-dash--${escapeText(variant)}` : '';
    const d = curvePath(pts);
    const path = `
      <path class="diagram__flow${vc}" d="${d}" marker-end="url(#${defsPrefix}-flow)" fill="none" aria-hidden="true" />
      <path class="diagram__flow-dash${vcDash}" d="${d}" fill="none" aria-hidden="true" />`;
    const labelBlock = label ? _flowLabel(label, pts, labelDx, labelDy) : '';
    return `${path}${labelBlock}`;
  }

  const def = EDGE_TYPES[type] || EDGE_TYPES.association;
  const cls = `diagram__edge diagram__edge--${type}${def.dashed ? ' diagram__edge--dashed' : ''}`;
  const markerId = `${defsPrefix}-${def.marker}`;

  const line = `
      <line class="${cls}" x1="${r2(pts.x1)}" y1="${r2(pts.y1)}" x2="${r2(pts.x2)}" y2="${r2(pts.y2)}" marker-end="url(#${markerId})" aria-hidden="true" />`;

  const labelBlock = label
    ? `
      <text class="diagram__edge-label" x="${r2(pts.mx)}" y="${r2(pts.my - 6)}" text-anchor="middle" aria-hidden="true">${escapeText(label)}</text>`
    : '';

  return `${line}${labelBlock}`;
}

function _flowLabel(label, pts, labelDx = 0, labelDy = 0) {
  const gap    = Math.abs(pts.x2 - pts.x1);
  const PAD    = 12;
  const CHAR_W = 7.5;
  const maxW   = Math.max(gap - 2 * PAD, 32);
  const x      = r2(pts.mx + labelDx);
  const y      = r2(pts.my - 20 + labelDy);
  const base   = `class="diagram__flow-label" text-anchor="middle" aria-hidden="true"`;

  const tl = label.length * CHAR_W > maxW
    ? ` textLength="${r2(maxW)}" lengthAdjust="spacingAndGlyphs"`
    : '';

  return `
      <text ${base} x="${x}" y="${y}"${tl}>${escapeText(label)}</text>`;
}

export function DiagramMarkers(defsPrefix = 'dia') {
  const m = (name, inner) => `
      <marker id="${defsPrefix}-${name}" class="diagram__marker diagram__marker--${name}" markerWidth="14" markerHeight="14" refX="12" refY="6" orient="auto" markerUnits="userSpaceOnUse">${inner}
      </marker>`;

  return `
    <defs>${
      m('association', `
        <path d="M2,2 L12,6 L2,10" />`)
    }${
      m('inheritance', `
        <path d="M1,1 L13,6 L1,11 Z" />`)
    }${
      m('aggregation', `
        <path d="M1,6 L7,2 L13,6 L7,10 Z" />`)
    }${
      m('composition', `
        <path d="M1,6 L7,2 L13,6 L7,10 Z" />`)
    }
    </defs>`;
}
