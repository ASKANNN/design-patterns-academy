import { loadPatternIndex }        from '../utils/data-loader.js';
import { getFavorites }            from '../utils/favorites.js';
import { PatternCard }             from '../components/patterns/PatternCard.js';
import { EmptyState }              from '../components/ui/EmptyState.js';
import { Breadcrumb }              from '../components/ui/Breadcrumb.js';
import { t }                       from '../utils/i18n.js';
import { jsonLdScriptTag, breadcrumbListJsonLd } from '../utils/json-ld.js';

export async function FavoritesPage() {
  const favorites = getFavorites();
  const index     = await loadPatternIndex();
  const results   = index.patterns.filter(p => favorites.includes(p.slug));

  const breadcrumbs = [
    { label: t('breadcrumbs.home'), href: '/' },
    { label: t('breadcrumbs.favorites') },
  ];

  return `
    <div class="favorites-page container">

      ${jsonLdScriptTag(breadcrumbListJsonLd(breadcrumbs))}
      ${Breadcrumb({ items: breadcrumbs })}

      <header class="favorites-page__header">
        <h1 class="favorites-page__title">${t('favorites.title')}</h1>
        <p class="favorites-page__subtitle">${t('favorites.subtitle')}</p>
      </header>

      <div data-favorites-results>
        ${results.length > 0 ? `
          <div class="favorites-page__results" aria-label="${t('favorites.title')}">
            ${results.map(p => PatternCard(p)).join('')}
          </div>
        ` : EmptyState({
          title:       t('favorites.empty_title'),
          description: t('favorites.empty_desc'),
          actions:     `<a href="/patterns" class="btn btn--primary btn--md">${t('search.browse_all')}</a>`,
        })}
      </div>

    </div>
  `;
}
