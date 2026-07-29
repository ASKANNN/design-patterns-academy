let _uid = 0;
const uid = (prefix = 'modal') => `${prefix}-${++_uid}`;

export function Modal({
  id     = uid(),
  title  = 'Dialog',
  body   = '',
  footer = '',
  size   = 'md',
  attrs  = '',
} = {}) {
  const titleId = `${id}-title`;

  return `
    <div
      class="modal"
      id="${id}"
      role="dialog"
      aria-modal="true"
      aria-labelledby="${titleId}"
      aria-hidden="true"
      ${attrs}
    >
      <div class="modal__backdrop" data-modal-close aria-hidden="true"></div>
      <div class="modal__panel modal__panel--${size}" role="document">

        <div class="modal__header">
          <h2 class="modal__title" id="${titleId}">${title}</h2>
          <button class="icon-btn icon-btn--ghost icon-btn--sm modal__close" type="button" aria-label="Close dialog" data-modal-close>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <line x1="3" y1="3" x2="15" y2="15"/>
              <line x1="15" y1="3" x2="3" y2="15"/>
            </svg>
          </button>
        </div>

        <div class="modal__body">
          ${body}
        </div>

        ${footer ? `<div class="modal__footer">${footer}</div>` : ''}

      </div>
    </div>
  `;
}
