let _uid = 0;
const uid = (prefix = 'rb') => `${prefix}-${++_uid}`;

export function Radio({
  id       = uid(),
  label    = '',
  name     = 'radio',
  value    = '',
  checked  = false,
  disabled = false,
  attrs    = '',
} = {}) {
  return `
    <label class="radio${disabled ? ' radio--disabled' : ''}" for="${id}">
      <input
        class="radio__input"
        type="radio"
        id="${id}"
        name="${name}"
        ${value ? `value="${value}"` : ''}
        ${checked  ? 'checked' : ''}
        ${disabled ? 'disabled' : ''}
        ${attrs}
      />
      <span class="radio__circle" aria-hidden="true">
        <span class="radio__dot"></span>
      </span>
      ${label ? `<span class="radio__label">${label}</span>` : ''}
    </label>
  `;
}
