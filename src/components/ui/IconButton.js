export function IconButton({
  icon     = '',
  label    = 'Action',
  variant  = 'ghost',
  size     = 'md',
  round    = false,
  disabled = false,
  type     = 'button',
  attrs    = '',
} = {}) {
  return `
    <button
      class="icon-btn icon-btn--${variant} icon-btn--${size}${round ? ' icon-btn--round' : ''}"
      type="${type}"
      aria-label="${label}"
      ${disabled ? 'disabled' : ''}
      ${attrs}
    >
      ${icon}
    </button>
  `;
}
