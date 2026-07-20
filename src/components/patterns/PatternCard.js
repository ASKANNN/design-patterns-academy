import { localise, t } from '../../utils/i18n.js';
import { PatternIcon } from '../visual/PatternIcon.js';

export function PatternCard(pattern, { showSummary = true, hidden = false } = {}) {
  const { slug, name, category, complexity, summary, status } = pattern;
  const isAvailable = status === 'available';
  const href        = `#/patterns/${category}/${slug}`;

  const pips = (n) => Array.from({ length: 3 }, (_, i) =>
    `<span class="pip${i < n ? ' is-filled' : ''}" aria-hidden="true"></span>`
  ).join('');

  const summaryText    = localise(summary);
  const complexityLabel = t('patterns.complexity.label');
  const categoryLabel   = t(`patterns.categories.${category}`);
  const soonLabel       = t('patterns.badge_soon');

  return `
    <a
      href="${isAvailable ? href : 'javascript:void(0)'}"
      class="pattern-card pattern-card--${category}${!isAvailable ? ' pattern-card--coming-soon' : ''}${hidden ? ' is-filtered-out' : ''}"
      data-filter-item
      data-filter-category="${category}"
      aria-label="${name}${!isAvailable ? ' — ' + soonLabel : ''}"
      ${hidden ? 'aria-hidden="true"' : ''}
      ${!isAvailable ? 'aria-disabled="true" tabindex="-1"' : ''}
    >
      <div class="pattern-card__top">
        <span class="badge badge--${category}" aria-label="${t('patterns.category_label')}: ${categoryLabel}">${categoryLabel}</span>
        ${!isAvailable ? `<span class="badge badge--default badge--sm">${soonLabel}</span>` : ''}
      </div>

      <h3 class="pattern-card__name">${PatternIcon({ pattern: slug, category, size: 'md' })}<span class="pattern-card__name-text">${name}</span></h3>

      ${showSummary && summaryText
        ? `<p class="pattern-card__summary">${summaryText}</p>`
        : ''}

      <div class="pattern-card__footer">
        <div class="pattern-card__complexity" aria-label="${t('patterns.stat_aria', { label: complexityLabel, n: complexity })}">
          <span class="pattern-stat__label">${complexityLabel}</span>
          <div class="pattern-stat__pips">${pips(complexity)}</div>
        </div>
        <svg class="pattern-card__arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <polyline points="6 4 10 8 6 12"/>
        </svg>
      </div>
    </a>
  `;
}
