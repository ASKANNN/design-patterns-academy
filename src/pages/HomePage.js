import { loadPatternIndex } from '../utils/data-loader.js';
import { PatternCard }      from '../components/patterns/PatternCard.js';
import { Button }           from '../components/ui/Button.js';
import { Badge }            from '../components/ui/Badge.js';
import { t }                from '../utils/i18n.js';

const FEATURED_SLUGS = ['observer', 'singleton', 'strategy', 'decorator', 'factory-method', 'facade'];

export async function HomePage() {
  const index    = await loadPatternIndex();
  const featured = FEATURED_SLUGS
    .map(s => index.patterns.find(p => p.slug === s))
    .filter(Boolean);

  return `
    <div class="page-home">

      <!-- Hero -->
      <section class="hero" aria-labelledby="hero-title">
        <div class="container">
          <div class="hero__inner">
            ${Badge({ label: t('home.hero_badge'), variant: 'accent', size: 'sm' })}
            <h1 class="hero__title" id="hero-title" data-i18n="home.hero_title">
              ${t('home.hero_title')}
            </h1>
            <p class="hero__subtitle" data-i18n="home.hero_subtitle">
              ${t('home.hero_subtitle')}
            </p>
            <div class="hero__actions">
              ${Button({ label: t('home.hero_cta_primary'), variant: 'primary', size: 'lg', href: '#/patterns' })}
              <a href="https://github.com/ASKANNN/design-patterns-academy"
                 class="btn btn--secondary btn--lg"
                 target="_blank" rel="noopener noreferrer"
                 aria-label="${t('home.hero_cta_secondary')} — ${t('a11y.external_link')}">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
                ${t('home.hero_cta_secondary')}
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats -->
      <section class="stats" aria-label="${t('a11y.platform_stats')}">
        <div class="container">
          <div class="stats__grid">
            <div class="stat">
              <span class="stat__number">23</span>
              <span class="stat__label">${t('home.stats_patterns')}</span>
            </div>
            <div class="stat">
              <span class="stat__number">3</span>
              <span class="stat__label">${t('home.stats_categories')}</span>
            </div>
            <div class="stat">
              <span class="stat__number">5</span>
              <span class="stat__label">${t('home.stats_code_langs')}</span>
            </div>
            <div class="stat">
              <span class="stat__number">2</span>
              <span class="stat__label">${t('home.stats_ui_langs')}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Categories -->
      <section class="section" aria-labelledby="categories-title">
        <div class="container">
          <div class="section__header">
            <div>
              <h2 class="section__title" id="categories-title">
                ${t('home.section_categories')}
              </h2>
            </div>
          </div>
          <div class="category-cards" role="list">
            ${categoryCard({
              id: 'creational',
              name: t('patterns.categories.creational'),
              desc: t('home.category_creational_desc'),
              count: 5,
            })}
            ${categoryCard({
              id: 'structural',
              name: t('patterns.categories.structural'),
              desc: t('home.category_structural_desc'),
              count: 7,
            })}
            ${categoryCard({
              id: 'behavioral',
              name: t('patterns.categories.behavioral'),
              desc: t('home.category_behavioral_desc'),
              count: 11,
            })}
          </div>
        </div>
      </section>

      <!-- Featured Patterns -->
      <section class="section" style="background:var(--color-bg-subtle); padding-block:var(--space-12);" aria-labelledby="featured-title">
        <div class="container">
          <div class="section__header">
            <div>
              <h2 class="section__title" id="featured-title">${t('home.section_featured')}</h2>
              <p class="section__subtitle">${t('home.section_featured_sub')}</p>
            </div>
            ${Button({ label: t('home.view_all_patterns'), variant: 'ghost', size: 'sm', href: '#/patterns' })}
          </div>
          <div class="patterns-grid">
            ${featured.map(p => PatternCard(p)).join('')}
          </div>
        </div>
      </section>

      <!-- Open Source CTA -->
      <section class="section" aria-labelledby="oss-title">
        <div class="container">
          <div class="about-cta">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style="color:var(--color-accent)">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            <h2 class="about-cta__title" id="oss-title">${t('home.oss_title')}</h2>
            <p class="about-cta__desc">${t('home.oss_desc')}</p>
            <div style="display:flex;gap:var(--space-3);flex-wrap:wrap;justify-content:center">
              ${Button({ label: t('home.btn_contribute'), variant: 'primary', href: 'https://github.com/ASKANNN/design-patterns-academy', attrs: 'target="_blank" rel="noopener noreferrer"' })}
              ${Button({ label: t('home.btn_about'), variant: 'secondary', href: '#/about' })}
            </div>
          </div>
        </div>
      </section>

    </div>
  `;
}

function categoryCard({ id, name, desc, count }) {
  const countLabel = t('home.category_count', { count });
  return `
    <a href="#/patterns/${id}" class="category-card category-card--${id}" role="listitem"
       aria-label="${name} — ${countLabel}">
      <div class="category-card__icon" aria-hidden="true">${_categoryIcon(id)}</div>
      <div class="category-card__name">${name}</div>
      <p class="category-card__desc">${desc}</p>
      <span class="category-card__count">${countLabel}</span>
    </a>
  `;
}

function _categoryIcon(id) {
  const icons = {
    creational: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
    structural: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,
    behavioral: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="6" cy="12" r="3"/><circle cx="18" cy="5" r="3"/><circle cx="18" cy="19" r="3"/><path d="M9 11l6-5M9 13l6 5"/></svg>`,
  };
  return icons[id] ?? '';
}
