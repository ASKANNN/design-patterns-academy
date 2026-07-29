let _uid = 0;
const uid = (prefix = 'ta') => `${prefix}-${++_uid}`;

export function TextArea({
  id          = uid(),
  label       = 'Label',
  placeholder = '',
  value       = '',
  rows        = 4,
  size        = '',
  helper      = '',
  error       = '',
  required    = false,
  disabled    = false,
  attrs       = '',
} = {}) {
  const hasError  = Boolean(error);
  const errorId   = hasError ? `${id}-error`  : '';
  const helperId  = helper   ? `${id}-helper` : '';
  const describedBy = [errorId, helperId].filter(Boolean).join(' ');
  const areaCls   = ['field__textarea', size ? `field__textarea--${size}` : ''].filter(Boolean).join(' ');

  return `
    <div class="field${hasError ? ' field--error' : ''}">
      <label class="field__label" for="${id}">
        ${label}
        ${required ? '<span class="field__required" aria-hidden="true">*</span>' : ''}
      </label>
      <textarea
        class="${areaCls}"
        id="${id}"
        rows="${rows}"
        placeholder="${placeholder}"
        ${required ? 'required aria-required="true"' : ''}
        ${disabled ? 'disabled' : ''}
        ${hasError ? 'aria-invalid="true"' : ''}
        ${describedBy ? `aria-describedby="${describedBy}"` : ''}
        ${attrs}
      >${value}</textarea>
      ${helper && !hasError ? `<p class="field__helper" id="${helperId}">${helper}</p>` : ''}
      ${hasError ? `<p class="field__error" id="${errorId}" role="alert">${error}</p>` : ''}
    </div>
  `;
}
