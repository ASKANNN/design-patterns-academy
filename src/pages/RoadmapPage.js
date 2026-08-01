import { loadPatternIndex }        from '../utils/data-loader.js';
import { buildRoadmap }            from '../utils/roadmap.js';
import { getCompleted }            from '../utils/progress.js';
import { PatternCard }             from '../components/patterns/PatternCard.js';
import { Breadcrumb }              from '../components/ui/Breadcrumb.js';
import { EmptyState }              from '../components/ui/EmptyState.js';
import { t }                       from '../utils/i18n.js';
import { jsonLdScriptTag, breadcrumbListJsonLd } from '../utils/json-ld.js';

const CHECK_ICON = `
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
`;

const CATEGORY_ORDER = ['creational', 'structural', 'behavioral'];

export async function RoadmapPage() {
  const index    = await loadPatternIndex();
  const roadmap  = buildRoadmap(index.patterns);
  const total    = roadmap.length;
  const completed = getCompleted();
  const done       = roadmap.filter(p => completed.includes(p.slug)).length;
  const percent    = total > 0 ? Math.round((done / total) * 100) : 0;

  const breadcrumbItems = [
    { label: t('breadcrumbs.home'), href: '/' },
    { label: t('breadcrumbs.roadmap') },
  ];

  const sections = CATEGORY_ORDER.map(category => {
    const items = roadmap.filter(p => p.category === category);
    if (!items.length) return '';

    return `
      <section class="roadmap-section">
        <h2 class="roadmap-section__title">
          <span class="roadmap-section__dot roadmap-section__dot--${category}" aria-hidden="true"></span>
          ${t(`patterns.categories.${category}`)}
        </h2>
        <ol class="roadmap-list" role="list">
          ${items.map(p => `
            <li class="roadmap-step" aria-label="${t('roadmap.step_label', { step: p.step, total })}">
              <span class="roadmap-step__marker" aria-hidden="true">${p.step}</span>
              <div class="roadmap-step__card">${PatternCard(p, { showSummary: false, query: 'path=roadmap' })}</div>
            </li>
          `).join('')}
        </ol>
      </section>
    `;
  }).join('');

  return `
    <div class="container">
      ${jsonLdScriptTag(breadcrumbListJsonLd(breadcrumbItems))}
      ${Breadcrumb({ items: breadcrumbItems })}

      <header class="roadmap-page__header">
        <h1 class="roadmap-page__title">${t('roadmap.title')}</h1>
        <p class="roadmap-page__subtitle">${t('roadmap.subtitle', { total })}</p>

        <div class="progress-wrap roadmap-page__progress">
          <div class="progress-wrap__header">
            <span class="progress-wrap__label">${t('roadmap.progress_label', { done, total })}</span>
            <span class="progress-wrap__value">${percent}%</span>
          </div>
          <div class="progress progress--success" role="progressbar" aria-valuenow="${done}" aria-valuemin="0" aria-valuemax="${total}" aria-label="${t('roadmap.progress_label', { done, total })}">
            <div class="progress__bar" style="width:${percent}%"></div>
          </div>
        </div>
      </header>

      ${total > 0 && done === total ? EmptyState({
        icon:        CHECK_ICON,
        title:       t('roadmap.complete_title', { total }),
        description: t('roadmap.complete_desc'),
        attrs:       'role="status"',
      }) : ''}

      <div class="roadmap-page__body">
        ${sections}
      </div>
    </div>
  `;
}
