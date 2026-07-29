import { Button }    from '../components/ui/Button.js';
import { Breadcrumb } from '../components/ui/Breadcrumb.js';
import { Tooltip }    from '../components/ui/Tooltip.js';
import { t }          from '../utils/i18n.js';

export async function AboutPage() {
  return `
    <div class="container">
      ${Breadcrumb({ items: [
        { label: t('breadcrumbs.home'), href: '#/' },
        { label: t('breadcrumbs.about') },
      ]})}

      <header class="about-page__hero">
        <h1 class="about-page__title">${t('home.section_about')}</h1>
        <p class="about-page__lead">${t('about.lead')}</p>
      </header>

      <!-- The Project -->
      <section class="about-section" aria-labelledby="about-project">
        <h2 class="about-section__title" id="about-project">${t('about.section_project')}</h2>
        <p>${t('about.project_p1')}</p>
        <p>${t('about.project_p2')}</p>
        <p>${t('about.project_p3')}</p>
      </section>

      <!-- Design Philosophy -->
      <section class="about-section" aria-labelledby="about-philosophy">
        <h2 class="about-section__title" id="about-philosophy">${t('about.section_philosophy')}</h2>
        <p>${t('about.philosophy_p1')}</p>
        <div class="principles-grid" role="list" style="margin-top:var(--space-5)">
          ${[
            { name: 'SOLID', key: 'about.tooltip_solid' },
            { name: 'DRY', key: 'about.tooltip_dry' },
            { name: 'KISS', key: 'about.tooltip_kiss' },
            { name: 'YAGNI', key: 'about.tooltip_yagni' },
            { name: 'Semantic HTML', key: 'about.tooltip_semantic_html' },
            { name: 'Accessibility First', key: 'about.tooltip_accessibility' },
            { name: 'Performance Budget', key: 'about.tooltip_performance' },
            { name: 'Mobile First', key: 'about.tooltip_mobile_first' },
          ].map(p => `
            <div class="principle-item" role="listitem" tabindex="0">
              ${Tooltip({
                position: 'bottom',
                label: t(p.key),
                attrs: `data-tooltip-info aria-label="${p.name}: ${t(p.key)}"`,
                content: `
                  <svg class="principle-item__icon" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <polyline points="2 8 6 12 14 4"/>
                  </svg>
                  ${p.name}
                `,
              })}
            </div>
          `).join('')}
        </div>


      </section>

      <!-- Tech Stack -->
      <section class="about-section" aria-labelledby="about-stack">
        <h2 class="about-section__title" id="about-stack">${t('about.section_stack')}</h2>
        <p>${t('about.stack_intro')}</p>
        <table class="tech-table" style="margin-top:var(--space-5)">
          <thead>
            <tr>
              <th scope="col">${t('about.stack_col_tech')}</th>
              <th scope="col">${t('about.stack_col_purpose')}</th>
              <th scope="col">${t('about.stack_col_why')}</th>
            </tr>
          </thead>
          <tbody>
            ${[
              ['HTML5', t('about.tech_markup'), t('about.tech_why_html')],
              ['CSS3 + Custom Properties', t('about.tech_styling'), t('about.tech_why_css')],
              ['ES Modules (Vanilla JS)', t('about.tech_logic'), t('about.tech_why_js')],
              ['Vite 8', t('about.tech_bundler'), t('about.tech_why_vite')],
              ['JSON', t('about.tech_data'), t('about.tech_why_json')],
            ].map(([tech, purpose, why]) => `
              <tr>
                <td>${tech}</td>
                <td>${purpose}</td>
                <td style="color:var(--color-text-secondary)">${why}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </section>

      <!-- Future Roadmap -->
      <section class="about-section" aria-labelledby="about-roadmap">
        <h2 class="about-section__title" id="about-roadmap">${t('about.section_roadmap')}</h2>
        <p>${t('about.roadmap_intro')}</p>
        <ul class="detail-list" style="margin-top:var(--space-4)">
          ${[t('about.roadmap_algorithms'), t('about.roadmap_data_structures'), t('about.roadmap_architecture'), t('about.roadmap_databases'), t('about.roadmap_networking'), t('about.roadmap_devops')].map(m => `
            <li class="detail-list__item">${m}</li>
          `).join('')}
        </ul>
      </section>

      <!-- CTA -->
      <div class="about-cta" role="complementary" aria-label="${t('about.section_contribute')}">
        <h2 class="about-cta__title">${t('about.section_contribute')}</h2>
        <p class="about-cta__desc">${t('about.contribute_desc')}</p>
        <div style="display:flex;gap:var(--space-3);flex-wrap:wrap;justify-content:center">
          ${Button({
            label: t('about.btn_open_issue'),
            variant: 'primary',
            href: 'https://github.com/ASKANNN/design-patterns-academy/issues',
            attrs: 'target="_blank" rel="noopener noreferrer"',
          })}
          ${Button({
            label: t('about.btn_contributing'),
            variant: 'secondary',
            href: 'https://github.com/ASKANNN/design-patterns-academy/blob/main/docs/community/CONTRIBUTING.md',
            attrs: 'target="_blank" rel="noopener noreferrer"',
          })}
        </div>
      </div>

    </div>
  `;
}
