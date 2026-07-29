const ILLUSTRATIONS = {
  'not-found': `
    <rect class="error-illustration__base" x="14" y="40" width="48" height="38" rx="8"/>
    <path class="error-illustration__base" d="M24 58h28M24 66h20"/>
    <path class="error-illustration__dash" d="M62 59c30 0 46 0 62 0"/>
    <circle class="error-illustration__particle" cx="93" cy="59" r="2.6"/>
    <g class="error-illustration__ghost-wrap">
      <circle class="error-illustration__glow" cx="162" cy="59" r="26"/>
      <rect class="error-illustration__ghost" x="138" y="40" width="48" height="38" rx="8"/>
      <text class="error-illustration__mark" x="162" y="65" text-anchor="middle">?</text>
    </g>
  `,
  pattern: `
    <rect class="error-illustration__base" x="14" y="34" width="50" height="46" rx="6"/>
    <path class="error-illustration__base" d="M14 48h50M22 60h20M22 68h14"/>
    <path class="error-illustration__dash" d="M64 57c30 0 46 0 62 0"/>
    <circle class="error-illustration__particle" cx="95" cy="57" r="2.6"/>
    <g class="error-illustration__ghost-wrap">
      <circle class="error-illustration__glow" cx="163" cy="57" r="28"/>
      <rect class="error-illustration__ghost" x="138" y="34" width="50" height="46" rx="6"/>
      <path class="error-illustration__ghost" d="M138 48h50"/>
      <text class="error-illustration__mark" x="163" y="65" text-anchor="middle">?</text>
    </g>
  `,
  server: `
    <rect class="error-illustration__base" x="14" y="40" width="48" height="38" rx="8"/>
    <path class="error-illustration__base" d="M24 58h28M24 66h20"/>
    <path class="error-illustration__crack" d="M62 59 76 46 84 66 96 50 106 59"/>
    <g class="error-illustration__ghost-wrap">
      <circle class="error-illustration__glow error-illustration__glow--warn" cx="162" cy="59" r="26"/>
      <rect class="error-illustration__ghost error-illustration__ghost--warn" x="138" y="40" width="48" height="38" rx="8"/>
      <text class="error-illustration__mark error-illustration__mark--warn" x="162" y="65" text-anchor="middle">!</text>
    </g>
  `,
};

const BACKDROP_POINTS = [
  [4, 38], [14, 66], [26, 30], [38, 72], [50, 42],
  [62, 68], [74, 34], [86, 62], [94, 40], [20, 48],
];

const BACKDROP_LINES = [
  [0, 2], [2, 9], [9, 4], [4, 6], [6, 8], [1, 2], [3, 4], [5, 7],
];

function _backdrop() {
  const nodes = BACKDROP_POINTS
    .map(([x, y], i) => `<circle class="error-page__bg-node" cx="${x}" cy="${y}" r="0.7" style="animation-delay:${(i * 0.4).toFixed(2)}s"/>`)
    .join('');

  const lines = BACKDROP_LINES
    .map(([a, b], i) => {
      const [x1, y1] = BACKDROP_POINTS[a];
      const [x2, y2] = BACKDROP_POINTS[b];
      return `<line class="error-page__bg-line" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="animation-delay:${(i * 0.6).toFixed(2)}s"/>`;
    })
    .join('');

  return `
    <svg class="error-page__backdrop" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      ${lines}
      ${nodes}
    </svg>
  `;
}

export function ErrorPage({
  variant     = 'not-found',
  code        = '',
  title       = '',
  description = '',
  actions     = '',
} = {}) {
  const glyph = ILLUSTRATIONS[variant] || ILLUSTRATIONS['not-found'];

  return `
    <div class="error-page" aria-labelledby="error-title">
      ${_backdrop()}
      <div class="container">
        <div class="error-page__content">
          <div class="error-page__art">
            <svg class="error-illustration" viewBox="0 0 200 106" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
              ${glyph}
            </svg>
            ${code ? `<span class="error-page__code" aria-hidden="true">${code}</span>` : ''}
          </div>
          <h1 class="error-page__title" id="error-title">${title}</h1>
          ${description ? `<p class="error-page__desc">${description}</p>` : ''}
          ${actions ? `<div class="error-page__actions">${actions}</div>` : ''}
        </div>
      </div>
    </div>
  `;
}
