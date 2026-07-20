import { loadPatternIndex }     from '../utils/data-loader.js';
import { getQueryParam }        from '../scripts/router.js';
import { PatternCard }          from '../components/patterns/PatternCard.js';
import { SearchInput }          from '../components/ui/SearchInput.js';
import { EmptyState }           from '../components/ui/EmptyState.js';
import { Breadcrumb }           from '../components/ui/Breadcrumb.js';
import { t }                    from '../utils/i18n.js';

export async function SearchPage() {
  const query   = getQueryParam('q').trim();
  const index   = await loadPatternIndex();
  const results = query ? _search(index.patterns, query) : [];

  const breadcrumbs = [
    { label: t('breadcrumbs.home'), href: '#/' },
    { label: query ? `${t('breadcrumbs.search')}: "${query}"` : t('breadcrumbs.search') },
  ];

  const resultMeta = query
    ? results.length > 0
      ? t('search.result_count', { count: results.length, s: results.length !== 1 ? 's' : '', query: _esc(query) })
      : t('search.no_match', { query: _esc(query) })
    : t('search.enter_keyword');

  return `
    <div class="search-page container">

      ${Breadcrumb({ items: breadcrumbs })}

      <div class="search-page__header">
        <div class="search-page__input-wrap">
          ${SearchInput({
            id:          'search-page-input',
            placeholder: t('search.placeholder'),
            value:       query,
          })}
        </div>

        <p class="search-page__meta" aria-live="polite" data-search-meta>${resultMeta}</p>
      </div>

      <div data-search-results>
        ${results.length > 0 ? `
          <div class="search-page__results" aria-label="${t('search.label')}">
            ${results.map(p => PatternCard(p)).join('')}
          </div>
        ` : query ? EmptyState({
          title:       t('patterns.no_patterns_filter'),
          description: t('search.no_match_desc'),
          actions:     `<a href="#/patterns" class="btn btn--primary">${t('search.browse_all')}</a>`,
        }) : ''}
      </div>

    </div>
  `;
}

function _search(patterns, q) {
  const lower = q.toLowerCase();

  return patterns.filter(p => {
    const fields = [
      p.name,
      p.category,
      p.summary?.en ?? '',
      p.summary?.ru ?? '',
      ...(p.tags ?? []),
    ];
    return fields.some(f => f.toLowerCase().includes(lower));
  });
}

function _esc(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
