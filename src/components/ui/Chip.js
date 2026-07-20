export function Chip({
  label    = '',
  selected = false,
  disabled = false,
  icon     = '',
  value    = '',
  attrs    = '',
} = {}) {
  return `
    <button
      class="chip${selected ? ' chip--selected' : ''}"
      type="button"
      role="checkbox"
      aria-checked="${selected}"
      ${disabled ? 'disabled aria-disabled="true"' : ''}
      ${value ? `data-value="${value}"` : ''}
      ${attrs}
    >
      ${icon ? `<span class="chip__icon" aria-hidden="true">${icon}</span>` : ''}
      ${label}
    </button>
  `;
}
