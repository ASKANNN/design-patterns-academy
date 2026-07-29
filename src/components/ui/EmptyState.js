export function EmptyState({
  icon        = defaultIcon(),
  title       = 'Nothing here yet',
  description = '',
  actions     = '',
  size        = '',
  attrs       = '',
} = {}) {
  return `
    <div class="empty-state${size ? ` empty-state--${size}` : ''}" ${attrs}>
      <div class="empty-state__icon" aria-hidden="true">
        ${icon}
      </div>
      <h3 class="empty-state__title">${title}</h3>
      ${description ? `<p class="empty-state__description">${description}</p>` : ''}
      ${actions ? `<div class="empty-state__actions">${actions}</div>` : ''}
    </div>
  `;
}

function defaultIcon() {
  return `
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  `;
}
