export function CopyButton({
  text  = '',
  label = 'Copy',
  size  = '',
  attrs = '',
} = {}) {
  return `
    <button
      class="copy-btn${size ? ` copy-btn--${size}` : ''}"
      type="button"
      aria-label="Copy to clipboard"
      data-copy="${text}"
      ${attrs}
    >
      <svg class="copy-btn__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
      </svg>
      <span class="copy-btn__label">${label}</span>
    </button>
  `;
}
