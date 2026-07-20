let _uid = 0;
const uid = (prefix = 'inp') => `${prefix}-${++_uid}`;

export function Input({
  id          = uid(),
  type        = 'text',
  placeholder = '',
  value       = '',
  size        = '',
  disabled    = false,
  error       = false,
  attrs       = '',
} = {}) {
  const cls = ['field__input', size ? `field__input--${size}` : ''].filter(Boolean).join(' ');

  return `
    <input
      class="${cls}"
      id="${id}"
      type="${type}"
      placeholder="${placeholder}"
      ${value ? `value="${value}"` : ''}
      ${disabled ? 'disabled' : ''}
      ${error ? 'aria-invalid="true"' : ''}
      ${attrs}
    />
  `;
}
