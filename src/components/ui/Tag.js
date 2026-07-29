export function Tag({
  label         = '',
  variant       = '',
  removable     = false,
  onRemoveLabel = 'Remove tag',
  attrs         = '',
} = {}) {
  const cls = ['tag', variant ? `tag--${variant}` : ''].filter(Boolean).join(' ');

  return `
    <span class="${cls}" ${attrs}>
      ${label}
      ${removable ? `
        <button class="tag__remove" type="button" aria-label="${onRemoveLabel}" data-tag-remove>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <line x1="1" y1="1" x2="9" y2="9"/>
            <line x1="9" y1="1" x2="1" y2="9"/>
          </svg>
        </button>
      ` : ''}
    </span>
  `;
}
