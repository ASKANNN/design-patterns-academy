import { loadPattern, loadPatternIndex, getPatternMeta } from '../utils/data-loader.js';
import { localise, getLang, t }                          from '../utils/i18n.js';
import { CodeBlock }                                     from '../components/ui/CodeBlock.js';
import { Badge }                                         from '../components/ui/Badge.js';
import { Tabs }                                          from '../components/ui/Tabs.js';
import { Breadcrumb }                                    from '../components/ui/Breadcrumb.js';
import { Alert }                                         from '../components/ui/Alert.js';
import { PatternCard }                                   from '../components/patterns/PatternCard.js';
import { Diagram }                                       from '../components/visual/Diagram.js';
import { PatternIcon }                                   from '../components/visual/PatternIcon.js';

export async function PatternDetailPage({ category, slug } = {}) {
  if (!category || !slug) return _notFoundPage();

  const [pattern, meta, index] = await Promise.all([
    loadPattern(category, slug),
    getPatternMeta(slug),
    loadPatternIndex(),
  ]);

  if (!pattern && meta) return _comingSoonPage(meta);
  if (!pattern)         return _notFoundPage();

  const lang = getLang();

  const breadcrumbs = [
    { label: t('breadcrumbs.home'),     href: '#/'                  },
    { label: t('breadcrumbs.patterns'), href: '#/patterns'           },
    { label: t(`patterns.categories.${category}`), href: `#/patterns/${category}` },
    { label: pattern.name, icon: PatternIcon({ pattern: slug, category, size: 'sm' }) },
  ];

  const relatedPatterns = (pattern.related_patterns ?? [])
    .map(s => index.patterns.find(p => p.slug === s))
    .filter(Boolean);

  return `
    <div class="pattern-detail">
      <div class="container">

        ${Breadcrumb({ items: breadcrumbs })}

        <!-- Header -->
        <header class="pattern-detail__header">
          <div class="pattern-detail__meta">
            ${Badge({ label: t(`patterns.categories.${category}`), variant: category, attrs: `aria-label="${t('patterns.category_label')}: ${t(`patterns.categories.${category}`)}"` })}
            ${(pattern.also_known_as ?? []).map(a =>
              Badge({ label: a, variant: 'default', size: 'sm' })
            ).join('')}
          </div>

          <h1 class="pattern-detail__title">${PatternIcon({ pattern: slug, category, size: 'lg' })}<span class="pattern-detail__title-text">${pattern.name}</span></h1>

          <p class="pattern-detail__intent">
            ${localise(pattern.intent, lang)}
          </p>

          <div class="pattern-detail__stats">
            ${_statPips(t('patterns.complexity.label'), pattern.complexity)}
            ${_statPips(t('patterns.popularity.label'), pattern.popularity)}
          </div>
        </header>

        <!-- Tabs -->
        ${Tabs({
          id: 'pattern-tabs',
          label: t('patterns.tabs_aria'),
          tabs: [
            { label: t('patterns.sections.intent'),        panel: _intentPanel(pattern, lang) },
            { label: t('patterns.sections.structure'),     panel: _structurePanel(pattern, lang) },
            { label: t('patterns.sections.implementation'), panel: _implementationPanel(pattern) },
            { label: t('patterns.sections.pros_cons'),     panel: _prosConsPanel(pattern, lang) },
          ],
        })}

        <!-- Related Patterns -->
        ${relatedPatterns.length ? `
          <div class="related-patterns">
            <h2 class="related-patterns__title">${t('patterns.related_patterns')}</h2>
            <div class="related-grid">
              ${relatedPatterns.map(rp => _relatedCard(rp)).join('')}
            </div>
          </div>
        ` : ''}

      </div>
    </div>
  `;
}

function _intentPanel(p, lang) {
  return `
    <div class="detail-section">
      <div>
        <h3 class="detail-section__title">${t('patterns.sections.problem')}</h3>
        ${_mdToHtml(localise(p.problem, lang))}
      </div>
      <div>
        <h3 class="detail-section__title">${t('patterns.sections.solution')}</h3>
        ${_mdToHtml(localise(p.solution, lang))}
      </div>

      ${p.when_to_use?.length ? `
        <div>
          <h3 class="detail-section__title">${t('patterns.sections.when_to_use')}</h3>
          <ul class="detail-list">
            ${p.when_to_use.map(item =>
              `<li class="detail-list__item">${localise(item, lang)}</li>`
            ).join('')}
          </ul>
        </div>
      ` : ''}

      ${p.real_world_examples?.length ? `
        <div>
          <h3 class="detail-section__title">${t('patterns.sections.real_world')}</h3>
          <ul class="detail-list">
            ${p.real_world_examples.map(ex =>
              `<li class="detail-list__item">${localise(ex, lang)}</li>`
            ).join('')}
          </ul>
        </div>
      ` : ''}
    </div>
  `;
}

function _structurePanel(p, lang) {
  const struct = p.structure ?? {};
  return `
    <div class="detail-section">
      ${struct.description ? `
        <div>
          <h3 class="detail-section__title">${t('patterns.sections.structure')}</h3>
          <p>${localise(struct.description, lang)}</p>
        </div>
      ` : ''}

      ${_visualsSection(p, lang)}

      ${struct.participants?.length ? `
        <div>
          <h3 class="detail-section__title">${t('patterns.sections.participants')}</h3>
          <div class="participants-list" role="list">
            ${struct.participants.map(part => `
              <div class="participant" role="listitem">
                <span class="participant__name">${part.name}</span>
                <p class="participant__role">${localise(part.role, lang)}</p>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

function _implementationPanel(p) {
  const impl  = p.implementation ?? {};
  const langs = Object.keys(impl);
  if (!langs.length) {
    return `<p style="color:var(--color-text-tertiary)">${t('patterns.impl_coming_soon')}</p>`;
  }

  const langLabels = { javascript: 'JavaScript', typescript: 'TypeScript', python: 'Python', java: 'Java', csharp: 'C#' };

  const buttons = langs.map((l, i) =>
    `<button class="lang-btn${i === 0 ? ' is-active' : ''}" type="button" data-lang-btn="${l}">${langLabels[l] ?? l}</button>`
  ).join('');

  const panels = langs.map((l, i) =>
    `<div class="lang-panel${i === 0 ? ' is-visible' : ''}" data-lang-panel="${l}">
      ${CodeBlock({ code: impl[l], language: l })}
    </div>`
  ).join('');

  return `
    <div class="detail-section">
      <div class="lang-select" role="group" aria-label="${t('patterns.select_language')}">
        ${buttons}
      </div>
      ${panels}
    </div>
  `;
}

function _prosConsPanel(p, lang) {
  const pros = p.pros ?? [];
  const cons = p.cons ?? [];

  return `
    <div class="detail-section">
      <div class="pros-cons">
        <div class="pros-cons__col pros-cons__col--pros">
          <h3 class="pros-cons__title pros-cons__title--pros">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <polyline points="2 8 6 12 14 4"/>
            </svg>
            ${t('patterns.sections.advantages')}
          </h3>
          <ul class="pros-cons__list">
            ${pros.map(item =>
              `<li class="pros-cons__item">${localise(item, lang)}</li>`
            ).join('')}
          </ul>
        </div>
        <div class="pros-cons__col pros-cons__col--cons">
          <h3 class="pros-cons__title pros-cons__title--cons">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <line x1="3" y1="3" x2="13" y2="13"/><line x1="13" y1="3" x2="3" y2="13"/>
            </svg>
            ${t('patterns.sections.disadvantages')}
          </h3>
          <ul class="pros-cons__list">
            ${cons.map(item =>
              `<li class="pros-cons__item">${localise(item, lang)}</li>`
            ).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;
}

const _REL_TO_PRIMITIVE = {
  inheritance:   'inheritance',
  implementation:'inheritance',
  association:   'association',
  delegation:    'association',
  command:       'association',
  flow:          'association',
  transition:    'association',
  message:       'association',
  dependency:    'dependency',
  notification:  'dependency',
  aggregation:   'aggregation',
  composition:   'composition',
};

function _kindToVariant(kind) {
  if (kind === 'interface' || kind === 'abstract') return 'abstract';
  if (kind === 'actor') return 'client';
  return 'concrete';
}

function _resolveLocalised(value, lang) {
  if (Array.isArray(value)) return value.map(v => _resolveLocalised(v, lang));
  if (value && typeof value === 'object') {
    if ('en' in value || 'ru' in value) return localise(value, lang);
    const out = {};
    for (const key of Object.keys(value)) out[key] = _resolveLocalised(value[key], lang);
    return out;
  }
  return value;
}

function _toEngineModel(model) {
  return {
    ...model,
    nodes: (model.nodes ?? []).map(({ position = {}, kind, variant, ...rest }) => ({
      ...rest,
      variant: variant ?? _kindToVariant(kind),
      x: position.x,
      y: position.y,
      w: position.w,
      h: position.h,
    })),
    edges: (model.edges ?? []).map(({ source, target, relationship, ...rest }) => ({
      ...rest,
      from: source,
      to: target,
      type: _REL_TO_PRIMITIVE[relationship] ?? 'association',
    })),
  };
}

function _visualsSection(p, lang) {
  const visuals = p.visuals;
  if (!Array.isArray(visuals) || visuals.length === 0) return '';
  const diagrams = visuals
    .map(v => Diagram(_toEngineModel(_resolveLocalised(v, lang))))
    .join('');
  return `<div data-interactive-pattern="${p.slug}">${diagrams}</div>`;
}

function _relatedCard(p) {
  const icon = PatternIcon({ pattern: p.slug, category: p.category, size: 'sm' });
  return `
    <a href="#/patterns/${p.category}/${p.slug}" class="related-card">
      ${icon || `<span class="pip is-filled" aria-hidden="true" style="background:var(--palette-category-${p.category})"></span>`}
      ${p.name}
    </a>
  `;
}

function _comingSoonPage(meta) {
  const categoryLabel = t(`patterns.categories.${meta.category}`);
  return `
    <div class="container">
      <div class="coming-soon-page">
        <span class="badge badge--${meta.category} badge--lg" style="margin-bottom:var(--space-4)">${categoryLabel}</span>
        <h1 style="font-size:var(--text-4xl);font-weight:var(--font-weight-bold);color:var(--color-text-primary);margin-bottom:var(--space-4)">${meta.name}</h1>
        ${Alert({ variant: 'info', title: t('patterns.coming_soon_title'), message: t('patterns.coming_soon_message') })}
        <div style="margin-top:var(--space-6);display:flex;gap:var(--space-3);justify-content:center">
          <a href="#/patterns/${meta.category}" class="btn btn--primary">${t('patterns.back_to_category', { category: categoryLabel })}</a>
          <a href="#/patterns" class="btn btn--secondary">${t('patterns.categories.all')}</a>
        </div>
      </div>
    </div>
  `;
}

function _notFoundPage() {
  return `
    <div class="container">
      <div class="error-page">
        <div class="error-page__code" aria-hidden="true">404</div>
        <h1 class="error-page__title">${t('errors.pattern_not_found')}</h1>
        <p class="error-page__desc">${t('errors.pattern_not_found_desc')}</p>
        <div class="error-page__actions">
          <a href="#/patterns" class="btn btn--primary">${t('errors.browse_all_patterns')}</a>
          <a href="#/" class="btn btn--secondary">${t('errors.go_home')}</a>
        </div>
      </div>
    </div>
  `;
}

function _statPips(label, n) {
  const pips = Array.from({ length: 3 }, (_, i) =>
    `<span class="pip${i < n ? ' is-filled' : ''}"></span>`
  ).join('');
  return `
    <div class="pattern-stat">
      <span class="pattern-stat__label">${label}</span>
      <div class="pattern-stat__pips" aria-label="${t('patterns.stat_aria', { label, n })}">${pips}</div>
    </div>
  `;
}

function _mdToHtml(text = '') {
  return text
    .split('\n\n')
    .map(para => {
      const trimmed = para.trim();
      if (!trimmed) return '';
      const formatted = trimmed.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      return `<p>${formatted}</p>`;
    })
    .join('');
}

function _titleCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
