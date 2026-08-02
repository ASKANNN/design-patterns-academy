import { t }              from '../../utils/i18n.js';
import { toggleFavorite } from '../../utils/favorites.js';
import { toggleCompleted } from '../../utils/progress.js';
import { EmptyState }     from '../../components/ui/EmptyState.js';
import { announce }       from './announce.js';

export function handleFavoriteToggle(btn) {
  const slug      = btn.dataset.favoriteToggle;
  const favorited = toggleFavorite(slug);

  document.querySelectorAll(`[data-favorite-toggle="${slug}"]`).forEach(el => {
    el.classList.toggle('is-active', favorited);
    el.setAttribute('aria-pressed', String(favorited));
  });

  announce(favorited ? t('favorites.added_announcement') : t('favorites.removed_announcement'));

  if (favorited) return;

  const resultsEl = document.querySelector('[data-favorites-results]');
  if (!resultsEl) return;

  const card = resultsEl.querySelector(`[data-favorite-toggle="${slug}"]`)?.closest('[data-filter-item]');
  card?.remove();

  if (!resultsEl.querySelector('[data-filter-item]')) {
    resultsEl.innerHTML = EmptyState({
      title:       t('favorites.empty_title'),
      description: t('favorites.empty_desc'),
      actions:     `<a href="/patterns" class="btn btn--primary btn--md">${t('search.browse_all')}</a>`,
    });
  }
}

export function handleProgressToggle(btn) {
  const slug      = btn.dataset.progressToggle;
  const completed = toggleCompleted(slug);

  btn.classList.toggle('is-active', completed);
  btn.setAttribute('aria-pressed', String(completed));
  btn.querySelector('.progress-toggle-btn__label').textContent = completed
    ? t('progress.completed')
    : t('progress.mark_completed');

  announce(completed ? t('progress.completed_announcement') : t('progress.incomplete_announcement'));
}
