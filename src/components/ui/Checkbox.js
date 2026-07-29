let _uid = 0;
const uid = (prefix = 'cb') => `${prefix}-${++_uid}`;

export function Checkbox({
  id       = uid(),
  label    = '',
  checked  = false,
  disabled = false,
  value    = '',
  name     = '',
  attrs    = '',
} = {}) {
  return `
    <label class="checkbox${disabled ? ' checkbox--disabled' : ''}" for="${id}">
      <input
        class="checkbox__input"
        type="checkbox"
        id="${id}"
        ${name  ? `name="${name}"` : ''}
        ${value ? `value="${value}"` : ''}
        ${checked  ? 'checked' : ''}
        ${disabled ? 'disabled' : ''}
        ${attrs}
      />
      <span class="checkbox__box" aria-hidden="true">
        <svg class="checkbox__check" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="1.5 5 4 7.5 8.5 2"/>
        </svg>
      </span>
      ${label ? `<span class="checkbox__label">${label}</span>` : ''}
    </label>
  `;
}
