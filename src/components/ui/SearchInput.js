export function SearchInput({
  id          = 'search',
  placeholder = 'Search…',
  value       = '',
  disabled    = false,
  attrs       = '',
} = {}) {
  return `
    <div class="search-input" ${attrs}>
      <svg class="search-input__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
      <input
        class="field__input search-input__input"
        id="${id}"
        type="search"
        placeholder="${placeholder}"
        ${value ? `value="${value}"` : ''}
        ${disabled ? 'disabled' : ''}
        autocomplete="off"
        aria-label="${placeholder}"
      />
      <button class="search-input__clear" type="button" aria-label="Clear search" data-i18n-aria-label="search.clear" tabindex="-1">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <line x1="2" y1="2" x2="12" y2="12"/>
          <line x1="12" y1="2" x2="2" y2="12"/>
        </svg>
      </button>
    </div>
  `;
}
