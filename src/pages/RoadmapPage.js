import { loadPatternIndex }        from '../utils/data-loader.js';
import { buildRoadmap }            from '../utils/roadmap.js';
import { PatternCard }             from '../components/patterns/PatternCard.js';
import { Breadcrumb }              from '../components/ui/Breadcrumb.js';
import { t }                       from '../utils/i18n.js';
import { jsonLdScriptTag, breadcrumbListJsonLd } from '../utils/json-ld.js';

const CATEGORY_ORDER = ['creational', 'structural', 'behavioral'];

export async function RoadmapPage() {
  const index    = await loadPatternIndex();
  const roadmap  = buildRoadmap(index.patterns);
  const total    = roadmap.length;

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
              <div class="roadmap-step__card">${PatternCard(p, { showSummary: false })}</div>
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
      </header>

      <div class="roadmap-page__body">
        ${sections}
      </div>
    </div>
  `;
}
