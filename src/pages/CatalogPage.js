import { MODULES }    from '../config/modules.js';
import { Badge }      from '../components/ui/Badge.js';
import { Breadcrumb } from '../components/ui/Breadcrumb.js';
import { t, localise } from '../utils/i18n.js';

export async function CatalogPage() {
  const moduleCards = MODULES.map(mod => moduleCard(mod)).join('');

  return `
    <div class="container">
      ${Breadcrumb({ items: [
        { label: t('breadcrumbs.home'), href: '#/' },
        { label: t('breadcrumbs.catalog') },
      ]})}

      <header class="catalog-page__header">
        <h1 class="catalog-page__title">${t('patterns.title')}</h1>
        <p class="catalog-page__subtitle">${t('catalog.subtitle')}</p>
      </header>

      <div class="module-grid" role="list">
        ${moduleCards}
      </div>
    </div>
  `;
}

function moduleCard(mod) {
  const isActive  = mod.status === 'active';
  const href      = isActive ? `#/patterns` : 'javascript:void(0)';
  const tag       = isActive ? 'a' : 'div';
  const title     = localise(mod.title);
  const comingSoon = t('catalog.aria_coming_soon');

  return `
    <${tag}
      class="module-card${isActive ? ' module-card--active' : ' module-card--planned'}"
      ${isActive ? `href="${href}"` : ''}
      role="listitem"
      aria-label="${title}${!isActive ? comingSoon : ''}"
    >
      <div class="module-card__header">
        <div class="module-card__icon" aria-hidden="true">
          ${moduleIcon(mod.icon)}
        </div>
        ${Badge({
          label:   isActive ? t('catalog.badge_active') : t('catalog.badge_coming_soon'),
          variant: isActive ? 'success' : 'default',
          size:    'sm',
        })}
      </div>

      <div>
        <h2 class="module-card__title">${title}</h2>
      </div>

      <p class="module-card__desc">${localise(mod.description)}</p>

      ${isActive && mod.categories.length ? `
        <div class="module-card__footer">
          ${mod.categories.map(cat =>
            `<span class="badge badge--${cat.id} badge--sm">${localise(cat.title)} (${cat.count})</span>`
          ).join('')}
        </div>
      ` : ''}
    </${tag}>
  `;
}

function moduleIcon(id) {
  const icons = {
    hexagon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 22 7 22 17 12 22 2 17 2 7"/></svg>`,
    cpu:     `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`,
    layers:  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
    building:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>`,
    database:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg>`,
    wifi:    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>`,
    server:  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`,
    cloud:   `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`,
  };
  return icons[id] ?? icons.hexagon;
}
