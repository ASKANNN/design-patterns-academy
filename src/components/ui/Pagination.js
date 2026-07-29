export function Pagination({
  current  = 1,
  total    = 1,
  siblings = 1,
  baseHref = '#',
  attrs    = '',
} = {}) {
  if (total <= 1) return '';

  const pages = buildPageRange(current, total, siblings);

  const pageButtons = pages.map(page => {
    if (page === '…') {
      return `<span class="pagination__ellipsis" aria-hidden="true">…</span>`;
    }
    const isActive = page === current;
    return `
      <a
        class="pagination__btn${isActive ? ' pagination__btn--active' : ''}"
        href="${baseHref}?page=${page}"
        aria-label="Page ${page}"
        ${isActive ? 'aria-current="page"' : ''}
      >${page}</a>
    `;
  }).join('');

  return `
    <nav class="pagination" aria-label="Pagination" ${attrs}>
      <a
        class="pagination__btn pagination__btn--prev"
        href="${baseHref}?page=${current - 1}"
        aria-label="Previous page"
        ${current <= 1 ? 'aria-disabled="true" tabindex="-1"' : ''}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <polyline points="10 4 6 8 10 12"/>
        </svg>
        Prev
      </a>

      ${pageButtons}

      <a
        class="pagination__btn pagination__btn--next"
        href="${baseHref}?page=${current + 1}"
        aria-label="Next page"
        ${current >= total ? 'aria-disabled="true" tabindex="-1"' : ''}
      >
        Next
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <polyline points="6 4 10 8 6 12"/>
        </svg>
      </a>
    </nav>
  `;
}

function buildPageRange(current, total, siblings) {
  const pages = [];
  const left  = Math.max(2, current - siblings);
  const right = Math.min(total - 1, current + siblings);

  pages.push(1);
  if (left > 2) pages.push('…');
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push('…');
  if (total > 1) pages.push(total);

  return pages;
}
