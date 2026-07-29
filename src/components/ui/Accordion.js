let _uid = 0;
const uid = (prefix = 'acc') => `${prefix}-${++_uid}`;

export function Accordion({
  items = [],
  id    = uid(),
  attrs = '',
} = {}) {
  const itemsHtml = items.map((item, i) => {
    const itemId    = `${id}-item-${i}`;
    const triggerId = `${itemId}-trigger`;
    const panelId   = `${itemId}-panel`;
    const isOpen    = Boolean(item.open);

    return `
      <div class="accordion__item${isOpen ? ' is-open' : ''}" id="${itemId}">
        <h3 class="accordion__heading">
          <button
            class="accordion__trigger"
            type="button"
            id="${triggerId}"
            aria-expanded="${isOpen}"
            aria-controls="${panelId}"
          >
            <span>${item.title}</span>
            <svg class="accordion__icon" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <polyline points="5 8 10 13 15 8"/>
            </svg>
          </button>
        </h3>
        <div
          class="accordion__panel"
          id="${panelId}"
          role="region"
          aria-labelledby="${triggerId}"
          ${isOpen ? '' : 'hidden'}
        >
          <div class="accordion__content">
            ${item.content}
          </div>
        </div>
      </div>
    `;
  }).join('');

  return `<div class="accordion" id="${id}" ${attrs}>${itemsHtml}</div>`;
}
