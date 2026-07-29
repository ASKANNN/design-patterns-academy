let _uid = 0;
const uid = (prefix = 'tog') => `${prefix}-${++_uid}`;

export function Toggle({
  id       = uid(),
  label    = '',
  checked  = false,
  disabled = false,
  name     = '',
  value    = '',
  attrs    = '',
} = {}) {
  return `
    <label class="toggle${disabled ? ' toggle--disabled' : ''}" for="${id}">
      <input
        class="toggle__input"
        type="checkbox"
        role="switch"
        id="${id}"
        ${name  ? `name="${name}"` : ''}
        ${value ? `value="${value}"` : ''}
        ${checked  ? 'checked' : ''}
        ${disabled ? 'disabled' : ''}
        ${attrs}
      />
      <span class="toggle__track" aria-hidden="true">
        <span class="toggle__thumb"></span>
      </span>
      ${label ? `<span class="toggle__label">${label}</span>` : ''}
    </label>
  `;
}
