import { loadPatternIndex } from '../../utils/data-loader.js';
import { PatternCard }      from '../../components/patterns/PatternCard.js';
import { EmptyState }       from '../../components/ui/EmptyState.js';
import { t }                from '../../utils/i18n.js';
import { searchPatterns }   from '../../utils/search.js';
import { navigate }         from '../router.js';

let _searchTimer = null;

export function handleSearchInput(e) {
  const input = e.target.closest('#search-page-input');
  if (!input) return;

  clearTimeout(_searchTimer);
  _searchTimer = setTimeout(async () => {
    const raw   = input.value;
    const lower = raw.trim().toLowerCase();

    const metaEl    = document.querySelector('[data-search-meta]');
    const resultsEl = document.querySelector('[data-search-results]');
    if (!metaEl || !resultsEl) return;

    history.replaceState(null, '', lower ? `/search?q=${encodeURIComponent(raw.trim())}` : '/search');

    const { patterns } = await loadPatternIndex();
    const results = searchPatterns(patterns, raw);

    if (!lower) {
      metaEl.textContent = t('search.enter_keyword');
    } else if (results.length > 0) {
      metaEl.innerHTML = t('search.result_count', {
        count: results.length,
        s:     results.length !== 1 ? 's' : '',
        query: _escHtml(raw.trim()),
      });
    } else {
      metaEl.innerHTML = t('search.no_match', { query: _escHtml(raw.trim()) });
    }

    if (results.length > 0) {
      resultsEl.innerHTML = `<div class="search-page__results" aria-label="${t('search.label')}">${results.map(p => PatternCard(p)).join('')}</div>`;
    } else if (lower) {
      resultsEl.innerHTML = EmptyState({
        title:       t('patterns.no_patterns_filter'),
        description: t('search.no_match_desc'),
        actions:     `<a href="/patterns" class="btn btn--primary btn--md">${t('search.browse_all')}</a>`,
      });
    } else {
      resultsEl.innerHTML = '';
    }
  }, 250);
}

function _escHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function triggerSearch() {
  navigate('/search');
  setTimeout(() => document.getElementById('search-page-input')?.focus(), 100);
}
