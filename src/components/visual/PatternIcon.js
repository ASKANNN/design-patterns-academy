
const SIZE_CLASS = {
  sm: 'pattern-icon--sm',
  md: 'pattern-icon--md',
  lg: 'pattern-icon--lg',
  xl: 'pattern-icon--xl',
};

export const PATTERN_GLYPHS = {

  singleton: `
    <circle class="pattern-icon__base" cx="4" cy="5.5" r="1.5" style="fill:currentColor;stroke:none" />
    <circle class="pattern-icon__base" cx="4" cy="12" r="1.5" style="fill:currentColor;stroke:none" />
    <circle class="pattern-icon__base" cx="4" cy="18.5" r="1.5" style="fill:currentColor;stroke:none" />
    <path class="pattern-icon__base" d="M6 6.1 9.6 8.4M6 12h3.6M6 17.9 9.6 15.6" />
    <rect class="pattern-icon__accent" x="11" y="5.5" width="9.5" height="13" rx="3" />`,

  'factory-method': `
    <rect class="pattern-icon__base" x="3" y="8" width="7.5" height="9.5" rx="2" />
    <path class="pattern-icon__accent" d="M11 12.7h4.6M13.7 10.4 16 12.7 13.7 15" />
    <rect class="pattern-icon__accent pattern-icon__accent--fill" x="16.8" y="9.7" width="4.6" height="4.6" rx="1.4" />`,

  'abstract-factory': `
    <rect class="pattern-icon__base" x="3" y="8" width="7.5" height="9.5" rx="2" />
    <path class="pattern-icon__base" d="M11 10.8 15.5 6.6M11 14.7 15.6 17" />
    <rect class="pattern-icon__accent" x="15.5" y="3.6" width="5.4" height="5.4" rx="1.5" />
    <circle class="pattern-icon__accent pattern-icon__accent--fill" cx="18.4" cy="17" r="2.7" />`,

  builder: `
    <rect class="pattern-icon__accent" x="3" y="5.5" width="6" height="3.4" rx="1" />
    <rect class="pattern-icon__accent" x="3" y="10.3" width="6" height="3.4" rx="1" />
    <rect class="pattern-icon__accent" x="3" y="15.1" width="6" height="3.4" rx="1" />
    <path class="pattern-icon__base" d="M9.4 12h3.2" />
    <rect class="pattern-icon__base" x="13" y="5" width="7.5" height="14" rx="2" />`,

  prototype: `
    <rect class="pattern-icon__base" x="3" y="8" width="8" height="11" rx="2" />
    <rect class="pattern-icon__accent" x="10.5" y="5" width="8" height="11" rx="2" />
    <path class="pattern-icon__accent pattern-icon__accent--fill" d="M20 2.6 20.9 4.7 23 5.6 20.9 6.5 20 8.6 19.1 6.5 17 5.6 19.1 4.7Z" />`,

  adapter: `
    <rect class="pattern-icon__base" x="2.5" y="8" width="6" height="8" rx="1.5" />
    <circle class="pattern-icon__base" cx="19" cy="12" r="3.4" />
    <rect class="pattern-icon__accent" x="8" y="9.2" width="7.8" height="5.6" rx="2.5" />`,

  bridge: `
    <rect class="pattern-icon__base" x="2.8" y="5" width="4.6" height="14" rx="2" />
    <rect class="pattern-icon__base" x="16.6" y="5" width="4.6" height="14" rx="2" />
    <rect class="pattern-icon__accent" x="6.6" y="9.8" width="10.8" height="4.4" rx="2" />`,

  composite: `
    <rect class="pattern-icon__base" x="9" y="3" width="6" height="5" rx="1.5" />
    <path class="pattern-icon__base" d="M12 8v3.5M5.8 15.5V13h12.4v2.5" />
    <rect class="pattern-icon__accent" x="3" y="15.5" width="5.6" height="5.5" rx="1.5" />
    <rect class="pattern-icon__accent" x="15.4" y="15.5" width="5.6" height="5.5" rx="1.5" />`,

  decorator: `
    <rect class="pattern-icon__accent" x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <rect class="pattern-icon__base" x="8" y="8" width="8" height="8" rx="2" />`,

  proxy: `
    <rect class="pattern-icon__base" x="11" y="6" width="9.5" height="12" rx="2" />
    <path class="pattern-icon__accent" d="M6.5 3.4 10.5 5.1V11c0 3.6-1.8 5.7-4 6.7-2.2-1-4-3.1-4-6.7V5.1Z" />`,

  facade: `
    <rect class="pattern-icon__accent" x="3" y="5" width="6" height="14" rx="2" />
    <path class="pattern-icon__base" d="M9.4 8 14 5.6M9.4 12H14M9.4 16 14 18.4" />
    <rect class="pattern-icon__base" x="14" y="3.6" width="6.4" height="4" rx="1.2" />
    <rect class="pattern-icon__base" x="14" y="10" width="6.4" height="4" rx="1.2" />
    <rect class="pattern-icon__base" x="14" y="16.4" width="6.4" height="4" rx="1.2" />`,

  flyweight: `
    <rect class="pattern-icon__base" x="2.8" y="4.5" width="6" height="4.4" rx="1.4" />
    <rect class="pattern-icon__base" x="2.8" y="9.8" width="6" height="4.4" rx="1.4" />
    <rect class="pattern-icon__base" x="2.8" y="15.1" width="6" height="4.4" rx="1.4" />
    <path class="pattern-icon__base" d="M9 7 13 11M9 12h4M9 17 13 13" />
    <path class="pattern-icon__accent pattern-icon__accent--fill" d="M17 7.8 21.2 12 17 16.2 12.8 12Z" />`,

  observer: `
    <rect class="pattern-icon__base" x="7.5" y="9" width="6.5" height="6" rx="2" />
    <circle class="pattern-icon__base" cx="20" cy="4.5" r="1.5" style="fill:currentColor;stroke:none" />
    <circle class="pattern-icon__base" cx="21" cy="12" r="1.5" style="fill:currentColor;stroke:none" />
    <circle class="pattern-icon__base" cx="20" cy="19.5" r="1.5" style="fill:currentColor;stroke:none" />
    <path class="pattern-icon__accent" d="M14.5 10.5 18.4 5.6M14.5 12h4M14.5 13.5 18.4 18.4" />`,

  'chain-of-responsibility': `
    <path class="pattern-icon__accent" d="M2.6 6h16.8M16.8 3.6 19.4 6l-2.6 2.4" />
    <rect class="pattern-icon__base" x="2.5" y="11" width="5" height="6.5" rx="1.5" />
    <rect class="pattern-icon__base" x="9.5" y="11" width="5" height="6.5" rx="1.5" />
    <rect class="pattern-icon__base" x="16.5" y="11" width="5" height="6.5" rx="1.5" />`,

  command: `
    <rect class="pattern-icon__base" x="2.5" y="9" width="5" height="6" rx="2" />
    <path class="pattern-icon__base" d="M7.5 12h2.3M14.8 12H16.5" />
    <rect class="pattern-icon__accent" x="9.8" y="8" width="5" height="8" rx="1.5" />
    <circle class="pattern-icon__base" cx="19" cy="12" r="2.8" />`,

  interpreter: `
    <circle class="pattern-icon__accent pattern-icon__accent--fill" cx="12" cy="5" r="2.4" />
    <circle class="pattern-icon__base" cx="6" cy="13" r="2.2" />
    <circle class="pattern-icon__base" cx="18" cy="13" r="2.2" />
    <path class="pattern-icon__base" d="M10.4 6.6 7.4 11.2M13.6 6.6 16.6 11.2" />
    <path class="pattern-icon__accent" d="M6 15.2v3.4h12v-3.4" />`,

  iterator: `
    <rect class="pattern-icon__base" x="8.5" y="4" width="11.5" height="3.3" rx="1" />
    <rect class="pattern-icon__base" x="8.5" y="10.3" width="11.5" height="3.3" rx="1" />
    <rect class="pattern-icon__base" x="8.5" y="16.6" width="11.5" height="3.3" rx="1" />
    <path class="pattern-icon__accent" d="M4 4.5v13.5M2 16l2 2.4 2-2.4" />
    <path class="pattern-icon__accent pattern-icon__accent--fill" d="M4 10.2 6.6 12 4 13.8Z" />`,

  mediator: `
    <circle class="pattern-icon__base" cx="12" cy="3.6" r="1.6" style="fill:currentColor;stroke:none" />
    <circle class="pattern-icon__base" cx="20.4" cy="12" r="1.6" style="fill:currentColor;stroke:none" />
    <circle class="pattern-icon__base" cx="12" cy="20.4" r="1.6" style="fill:currentColor;stroke:none" />
    <circle class="pattern-icon__base" cx="3.6" cy="12" r="1.6" style="fill:currentColor;stroke:none" />
    <path class="pattern-icon__base" d="M12 5.6v3.2M18.4 12h-3.2M12 18.4v-3.2M5.6 12h3.2" />
    <circle class="pattern-icon__accent pattern-icon__accent--fill" cx="12" cy="12" r="3.1" />`,

  memento: `
    <rect class="pattern-icon__base" x="3" y="7" width="8" height="11" rx="2" />
    <rect class="pattern-icon__accent" x="13.5" y="4.5" width="6.5" height="8" rx="1.5" />
    <path class="pattern-icon__accent" d="M17 13.4c0 3.5-2.6 4.9-6 4.9M13.4 16.6 11 18.3l2.4 1.7" />`,

  state: `
    <circle class="pattern-icon__base" cx="18" cy="7" r="2.6" />
    <circle class="pattern-icon__base" cx="12" cy="18" r="2.6" />
    <path class="pattern-icon__base" d="M6.4 9.3 9.6 15.4M14.7 16.8 17.2 10.4" />
    <circle class="pattern-icon__accent pattern-icon__accent--fill" cx="6" cy="7" r="2.9" />`,

  strategy: `
    <rect class="pattern-icon__base" x="3" y="9" width="6" height="6" rx="2" />
    <path class="pattern-icon__base" d="M9.2 12h3.4" />
    <rect class="pattern-icon__base" x="13" y="4.5" width="7.5" height="3.6" rx="1.1" />
    <rect class="pattern-icon__accent" x="13" y="10.2" width="7.5" height="3.6" rx="1.1" />
    <rect class="pattern-icon__base" x="13" y="15.9" width="7.5" height="3.6" rx="1.1" />`,

  'template-method': `
    <path class="pattern-icon__base" d="M4 5.4v13.2" />
    <rect class="pattern-icon__base" x="6" y="4" width="14" height="2.9" rx="1" />
    <rect class="pattern-icon__accent" x="6" y="8.6" width="14" height="2.9" rx="1" />
    <rect class="pattern-icon__base" x="6" y="13.1" width="14" height="2.9" rx="1" />
    <rect class="pattern-icon__accent" x="6" y="17.6" width="14" height="2.9" rx="1" />`,

  visitor: `
    <rect class="pattern-icon__base" x="3" y="13" width="4.6" height="5.6" rx="1.5" />
    <rect class="pattern-icon__base" x="9.7" y="13" width="4.6" height="5.6" rx="1.5" />
    <rect class="pattern-icon__base" x="16.4" y="13" width="4.6" height="5.6" rx="1.5" />
    <path class="pattern-icon__accent" d="M4 9.5Q7.3 3.8 11 9.5 14.7 3.8 18 9.5" />
    <path class="pattern-icon__accent" d="M18 9.5 20 7.6M18 9.5 15.8 8.2" />`,
};

const CATEGORIES = new Set(['creational', 'structural', 'behavioral']);

function _esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function PatternIcon({
  pattern = '',
  category = '',
  size = 'md',
  title = '',
  emphasis = false,
  animated = false,
  className = '',
  attrs = '',
} = {}) {
  const glyph = PATTERN_GLYPHS[String(pattern)];
  if (!glyph) return '';

  const cls = [
    'pattern-icon',
    CATEGORIES.has(category) ? `pattern-icon--${category}` : '',
    SIZE_CLASS[size] || SIZE_CLASS.md,
    emphasis ? 'pattern-icon--emphasis' : '',
    animated ? 'pattern-icon--animated' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const labelled = Boolean(title);
  const a11y = labelled
    ? ` role="img" aria-label="${_esc(title)}"`
    : ' aria-hidden="true" focusable="false"';

  return `
    <svg class="${cls}" viewBox="0 0 24 24" fill="none"${a11y}${attrs ? ` ${attrs}` : ''} xmlns="http://www.w3.org/2000/svg">${glyph}
    </svg>`;
}
