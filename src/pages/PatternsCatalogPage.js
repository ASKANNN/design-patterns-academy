import { loadPatternIndex }        from '../utils/data-loader.js';
import { PatternCard }             from '../components/patterns/PatternCard.js';
import { Breadcrumb }              from '../components/ui/Breadcrumb.js';
import { EmptyState }              from '../components/ui/EmptyState.js';
import { Accordion }               from '../components/ui/Accordion.js';
import { t }                       from '../utils/i18n.js';
import { PATTERNS_CATEGORIES,
         patternsBreadcrumbItems } from '../config/pattern-categories.js';

export async function PatternsCatalogPage({ category = '' } = {}) {
  const index    = await loadPatternIndex();
  const patterns = index.patterns;

  const CATEGORIES = PATTERNS_CATEGORIES.map(cat => ({ id: cat.id, label: cat.label() }));

  const active = CATEGORIES.find(c => c.id === category) ? category : 'all';

  const breadcrumbItems = patternsBreadcrumbItems(active);

  const filterChips = CATEGORIES.map(cat => `
    <button
      class="filter-chip${active === cat.id ? ' is-active' : ''}"
      type="button"
      data-filter="${cat.id}"
      data-filter-target="patterns-grid"
      aria-pressed="${active === cat.id}"
    >
      ${cat.id !== 'all'
        ? `<span class="filter-chip__dot filter-chip__dot--${cat.id}" aria-hidden="true"></span>`
        : ''}
      ${cat.label}
    </button>
  `).join('');

  const filteredCount = active === 'all' ? patterns.length : patterns.filter(p => p.category === active).length;
  const cards = patterns
    .map(p => PatternCard(p, { hidden: active !== 'all' && p.category !== active }))
    .join('');

  const introGroups = CATEGORIES.filter(cat => cat.id !== 'all').map(cat => `
    <div class="patterns-intro__group">
      <p class="patterns-intro__group-title">
        <span class="patterns-intro__dot patterns-intro__dot--${cat.id}" aria-hidden="true"></span>
        ${cat.label}
      </p>
      <ul class="patterns-intro__list">
        ${patterns.filter(p => p.category === cat.id).map(p => `<li>${p.name}</li>`).join('')}
      </ul>
    </div>
  `).join('');

  return `
    <div class="container">
      ${Breadcrumb({ items: breadcrumbItems, attrs: 'data-patterns-breadcrumb' })}

      <header class="patterns-page__header">
        <h1 class="patterns-page__title">${t('patterns.title')}</h1>
        <p class="patterns-page__subtitle">${t('patterns.page_subtitle')}</p>
      </header>

      <div class="patterns-page__intro">
        ${Accordion({
          items: [{
            title: t('patterns.intro_trigger'),
            content: `
              <p>${t('patterns.intro_p1')}</p>
              <p>${t('patterns.intro_authors')}</p>
              <p>${t('patterns.intro_p2')}</p>
              <div class="patterns-intro__groups">${introGroups}</div>
              <p>${t('patterns.intro_p3')}</p>
            `,
          }],
        })}
      </div>

      <div class="filter-bar" role="group" aria-label="${t('patterns.filter.label')}" data-filter-container>
        ${filterChips}
        <span class="filter-bar__count" aria-live="polite" aria-atomic="true">
          <span data-filter-count>${active !== 'all' ? t('patterns.count', { count: filteredCount }) : ''}</span>
        </span>
      </div>

      <div class="patterns-grid" id="patterns-grid" aria-live="polite" aria-label="${t('patterns.title')}">
        ${filteredCount ? cards : EmptyState({
          title:       t('patterns.no_patterns_filter'),
          description: t('patterns.no_patterns_filter_desc'),
        })}
      </div>
    </div>
  `;
}
