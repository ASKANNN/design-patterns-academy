import { t }                       from '../../utils/i18n.js';
import { BreadcrumbItems }         from '../../components/ui/Breadcrumb.js';
import { patternsBreadcrumbItems } from '../../config/pattern-categories.js';
import { setPageMeta }             from '../router.js';
import { animateFilterIn }         from '../animations.js';

export function handleFilter(chip) {
  const filter    = chip.dataset.filter;
  const container = chip.closest('[data-filter-container]');
  const target    = document.getElementById(chip.dataset.filterTarget ?? '');
  if (!container || !target) return;

  container.querySelectorAll('.filter-chip').forEach(c => {
    const isActive = c === chip;
    c.classList.toggle('is-active', isActive);
    c.setAttribute('aria-pressed', String(isActive));
  });

  let visibleCount = 0;
  const enteringItems = [];
  target.querySelectorAll('[data-filter-item]').forEach(item => {
    const matches = filter === 'all' || item.dataset.filterCategory === filter;
    item.classList.toggle('is-filtered-out', !matches);
    item.toggleAttribute('aria-hidden', !matches);
    if (matches) {
      visibleCount++;
      enteringItems.push(item);
    }
  });
  animateFilterIn(enteringItems);

  const countEl = container.querySelector('[data-filter-count]');
  if (countEl) countEl.textContent = filter === 'all' ? '' : t('patterns.count', { count: visibleCount });

  const breadcrumbList = document.querySelector('[data-patterns-breadcrumb] .breadcrumb__list');
  if (breadcrumbList) breadcrumbList.innerHTML = BreadcrumbItems(patternsBreadcrumbItems(filter));

  const path = filter === 'all' ? '/patterns' : `/patterns/${filter}`;
  history.replaceState(null, '', path);
  setPageMeta(path, filter === 'all' ? {} : { category: filter });
}
