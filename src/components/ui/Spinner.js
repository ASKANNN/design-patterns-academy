export function Spinner({
  size  = 'md',
  color = '',
  label = 'Loading…',
  attrs = '',
} = {}) {
  return `
    <span
      class="spinner spinner--${size}${color ? ` spinner--${color}` : ''}"
      role="status"
      aria-label="${label}"
      ${attrs}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="100%" height="100%" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.2"/>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"/>
      </svg>
    </span>
  `;
}
