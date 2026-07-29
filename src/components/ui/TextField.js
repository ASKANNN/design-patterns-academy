let _uid = 0;
const uid = (prefix = 'tf') => `${prefix}-${++_uid}`;

export function TextField({
  id          = uid(),
  label       = 'Label',
  type        = 'text',
  placeholder = '',
  value       = '',
  helper      = '',
  error       = '',
  required    = false,
  disabled    = false,
  size        = '',
  attrs       = '',
} = {}) {
  const hasError  = Boolean(error);
  const errorId   = hasError ? `${id}-error`  : '';
  const helperId  = helper   ? `${id}-helper` : '';
  const describedBy = [errorId, helperId].filter(Boolean).join(' ');
  const inputCls  = ['field__input', size ? `field__input--${size}` : ''].filter(Boolean).join(' ');

  return `
    <div class="field${hasError ? ' field--error' : ''}">
      <label class="field__label" for="${id}">
        ${label}
        ${required ? '<span class="field__required" aria-hidden="true">*</span>' : ''}
      </label>
      <input
        class="${inputCls}"
        id="${id}"
        type="${type}"
        placeholder="${placeholder}"
        ${value ? `value="${value}"` : ''}
        ${required ? 'required aria-required="true"' : ''}
        ${disabled ? 'disabled' : ''}
        ${hasError ? 'aria-invalid="true"' : ''}
        ${describedBy ? `aria-describedby="${describedBy}"` : ''}
        ${attrs}
      />
      ${helper && !hasError ? `<p class="field__helper" id="${helperId}">${helper}</p>` : ''}
      ${hasError ? `<p class="field__error" id="${errorId}" role="alert">${error}</p>` : ''}
    </div>
  `;
}
