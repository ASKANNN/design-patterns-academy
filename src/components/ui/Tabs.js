let _uid = 0;
const uid = (prefix = 'tabs') => `${prefix}-${++_uid}`;

export function Tabs({
  tabs        = [],
  id          = uid(),
  variant     = '',
  label       = 'Tabs',
  activeIndex = 0,
  attrs       = '',
} = {}) {
  const tabButtons = tabs.map((tab, i) => {
    const isActive = i === activeIndex;
    return `
      <button
        class="tabs__tab"
        type="button"
        role="tab"
        id="${id}-tab-${i}"
        aria-selected="${isActive}"
        aria-controls="${id}-panel-${i}"
        ${isActive ? '' : 'tabindex="-1"'}
      >
        ${tab.label}
        ${tab.count !== undefined ? `<span class="tabs__count">${tab.count}</span>` : ''}
      </button>
    `;
  }).join('');

  const panels = tabs.map((tab, i) => {
    const isActive = i === activeIndex;
    return `
      <div
        class="tabs__panel"
        role="tabpanel"
        id="${id}-panel-${i}"
        aria-labelledby="${id}-tab-${i}"
        ${isActive ? '' : 'hidden'}
      >
        ${tab.panel}
      </div>
    `;
  }).join('');

  return `
    <div class="tabs${variant ? ` tabs--${variant}` : ''}" id="${id}" ${attrs}>
      <div class="tabs__list" role="tablist" aria-label="${label}">
        ${tabButtons}
      </div>
      <div class="tabs__panels">
        ${panels}
      </div>
    </div>
  `;
}
