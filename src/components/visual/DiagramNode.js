import { escapeText, rect, r2 } from './svg-utils.js';

const ICONS = {
  user:  '<circle cx="12" cy="8.5" r="4.2"/><path d="M4.6 20c0-4.1 3.7-6.3 7.4-6.3s7.4 2.2 7.4 6.3"/>',
  cube:  '<path d="M12 2.6 20.4 7v10L12 21.4 3.6 17V7z"/><path d="M12 2.6V12M20.4 7 12 12 3.6 7"/>',
  layers:'<path d="M12 3 21 8l-9 5-9-5z"/><path d="M3.5 13 12 18l8.5-5"/>',
  spark: '<path d="M12 3v18M3 12h18M6 6l12 12M18 6 6 18"/>',
};

function _icon(name, x, y, size, cls) {
  const glyph = ICONS[name];
  if (!glyph) return '';
  const s = size / 24;
  return `<g class="${cls}" transform="translate(${r2(x)},${r2(y)}) scale(${r2(s)})" aria-hidden="true">${glyph}</g>`;
}

export function renderIcon(name, x, y, size, cls) {
  return _icon(name, x, y, size, cls);
}

export function DiagramNode(node = {}, opts = {}) {
  return opts.concept ? _conceptCard(node, opts) : _umlNode(node);
}

function _conceptCard(node, opts) {
  const {
    id,
    label = '',
    subtitle = '',
    icon = '',
    badge = '',
    emphasis = false,
    ariaLabel = '',
    focusable = true,
  } = node;

  const g = rect(node);
  const prefix = opts.prefix || 'dia';
  const cls = `diagram__card${emphasis ? ' diagram__card--emphasis' : ''}`;

  const a11yLabel =
    ariaLabel || (subtitle ? `${label} — ${subtitle}` : label);

  const focusAttrs = focusable
    ? ` tabindex="0" role="listitem" aria-label="${escapeText(a11yLabel)}"`
    : ' aria-hidden="true"';

  const bgFill = emphasis ? ` style="fill:url(#${prefix}-grad)"` : '';

  let inner;
  if (emphasis) {
    const cx = g.cx;
    const maxW = g.w - 24;

    const CHIP_H          = 56;
    const CHIP_TO_TITLE   = 30;
    const TITLE_TO_SUB    = 24;
    const TITLE_DESC      = 4;
    const SUB_DESC        = 3;

    const groupH = subtitle
      ? CHIP_H + CHIP_TO_TITLE + TITLE_TO_SUB + SUB_DESC
      : CHIP_H + CHIP_TO_TITLE + TITLE_DESC;

    const chipY          = r2(g.cy - groupH / 2);
    const titleBaselineY = r2(chipY + CHIP_H + CHIP_TO_TITLE);
    const subBaselineY   = r2(chipY + CHIP_H + CHIP_TO_TITLE + TITLE_TO_SUB);

    const titleTL = label.length * 9 > maxW ? ` textLength="${r2(maxW)}" lengthAdjust="spacingAndGlyphs"` : '';
    const subTL   = subtitle.length * 7.5 > maxW ? ` textLength="${r2(maxW)}" lengthAdjust="spacingAndGlyphs"` : '';

    inner = `
      ${icon ? `<rect class="diagram__card-chip diagram__card-chip--on-accent" x="${r2(cx - 28)}" y="${chipY}" width="56" height="56" rx="16" ry="16" aria-hidden="true" />` : ''}
      ${icon ? _icon(icon, cx - 15, chipY + 13, 30, 'diagram__card-icon diagram__card-icon--on-accent') : ''}
      <text class="diagram__card-title diagram__card-title--on-accent" x="${r2(cx)}" y="${titleBaselineY}" text-anchor="middle"${titleTL}>${escapeText(label)}</text>
      ${subtitle ? `<text class="diagram__card-sub diagram__card-sub--on-accent" x="${r2(cx)}" y="${subBaselineY}" text-anchor="middle"${subTL}>${escapeText(subtitle)}</text>` : ''}
      ${badge ? `
      <g class="diagram__badge" aria-hidden="true">
        <circle cx="${r2(g.x + g.w - 28)}" cy="${r2(g.y + 28)}" r="17"/>
        <text x="${r2(g.x + g.w - 28)}" y="${r2(g.y + 34)}" text-anchor="middle">${escapeText(badge)}</text>
      </g>` : ''}`;
  } else {
    const tx = g.x + 62;
    const maxW = g.w - 76;
    const titleTL = label.length * 8 > maxW ? ` textLength="${r2(maxW)}" lengthAdjust="spacingAndGlyphs"` : '';
    const subTL   = subtitle.length * 7.5 > maxW ? ` textLength="${r2(maxW)}" lengthAdjust="spacingAndGlyphs"` : '';
    inner = `
      ${icon ? `<rect class="diagram__card-chip" x="${r2(g.x + 14)}" y="${r2(g.cy - 20)}" width="40" height="40" rx="12" ry="12" aria-hidden="true" />` : ''}
      ${icon ? _icon(icon, g.x + 21, g.cy - 13, 26, 'diagram__card-icon') : ''}
      <text class="diagram__card-title" x="${r2(tx)}" y="${r2(g.cy - 3)}"${titleTL}>${escapeText(label)}</text>
      ${subtitle ? `<text class="diagram__card-sub" x="${r2(tx)}" y="${r2(g.cy + 17)}"${subTL}>${escapeText(subtitle)}</text>` : ''}`;
  }

  return `
    <g class="${cls}" data-node-id="${escapeText(id)}"${focusAttrs}>
      <rect class="diagram__card-bg" x="${r2(g.x)}" y="${r2(g.y)}" width="${r2(g.w)}" height="${r2(g.h)}" rx="16" ry="16"${bgFill} />${inner}
    </g>`;
}

function _umlNode(node) {
  const {
    id,
    label = '',
    members = [],
    variant = 'concrete',
    ariaLabel = '',
    focusable = true,
  } = node;

  const g = rect(node);
  const cls = `diagram__node diagram__node--${variant}`;

  const a11yLabel =
    ariaLabel ||
    (members.length
      ? `${label}. Members: ${members.join(', ')}`
      : label);

  const titleY = members.length ? g.y + 22 : g.cy + 5;
  const titleBlock = `
      <text class="diagram__node-title" x="${r2(g.cx)}" y="${r2(titleY)}" text-anchor="middle">${escapeText(label)}</text>`;

  let membersBlock = '';
  if (members.length) {
    const sepY = g.y + 34;
    const lineStart = g.y + 52;
    const lineStep = 18;
    const lines = members
      .map((m, i) => {
        const my = lineStart + i * lineStep;
        return `
      <text class="diagram__node-member" x="${r2(g.x + 12)}" y="${r2(my)}">${escapeText(m)}</text>`;
      })
      .join('');
    membersBlock = `
      <line class="diagram__node-sep" x1="${r2(g.x)}" y1="${r2(sepY)}" x2="${r2(g.x + g.w)}" y2="${r2(sepY)}" />${lines}`;
  }

  const focusAttrs = focusable
    ? ` tabindex="0" role="listitem" aria-label="${escapeText(a11yLabel)}"`
    : ' aria-hidden="true"';

  return `
    <g class="${cls}" data-node-id="${escapeText(id)}"${focusAttrs}>
      <rect class="diagram__node-box" x="${r2(g.x)}" y="${r2(g.y)}" width="${r2(g.w)}" height="${r2(g.h)}" rx="12" ry="12" />
      <rect class="diagram__node-accent" x="${r2(g.x)}" y="${r2(g.y)}" width="${r2(g.w)}" height="4" rx="2" ry="2" aria-hidden="true" />${titleBlock}${membersBlock}
    </g>`;
}
