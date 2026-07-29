let _uid = 0;
const uid = (prefix = 'sel') => `${prefix}-${++_uid}`;

export function Select({
  id          = uid(),
  label       = 'Label',
  options     = [],
  selected    = '',
  helper      = '',
  error       = '',
  required    = false,
  disabled    = false,
  placeholder = 'Select an option',
  attrs       = '',
} = {}) {
  const hasError    = Boolean(error);
  const errorId     = hasError ? `${id}-error`  : '';
  const helperId    = helper   ? `${id}-helper` : '';
  const describedBy = [errorId, helperId].filter(Boolean).join(' ');

  const optionsHtml = options.map(opt =>
    `<option value="${opt.value}" ${opt.value === selected ? 'selected' : ''}>${opt.label}</option>`
  ).join('');

  return `
    <div class="field${hasError ? ' field--error' : ''}">
      <label class="field__label" for="${id}">
        ${label}
        ${required ? '<span class="field__required" aria-hidden="true">*</span>' : ''}
      </label>
      <select
        class="field__select"
        id="${id}"
        ${required ? 'required aria-required="true"' : ''}
        ${disabled ? 'disabled' : ''}
        ${hasError ? 'aria-invalid="true"' : ''}
        ${describedBy ? `aria-describedby="${describedBy}"` : ''}
        ${attrs}
      >
        ${placeholder ? `<option value="" ${!selected ? 'selected' : ''} disabled>${placeholder}</option>` : ''}
        ${optionsHtml}
      </select>
      ${helper && !hasError ? `<p class="field__helper" id="${helperId}">${helper}</p>` : ''}
      ${hasError ? `<p class="field__error" id="${errorId}" role="alert">${error}</p>` : ''}
    </div>
  `;
}
