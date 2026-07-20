import { Button } from '../components/ui/Button.js';
import { t }      from '../utils/i18n.js';

export async function NotFoundPage() {
  return `
    <div class="container">
      <div class="error-page" aria-labelledby="error-title">
        <div class="error-page__code" aria-hidden="true">404</div>
        <h1 class="error-page__title" id="error-title">
          ${t('errors.not_found')}
        </h1>
        <p class="error-page__desc">
          ${t('errors.not_found_desc')}
        </p>
        <div class="error-page__actions">
          ${Button({ label: t('errors.go_home'),        variant: 'primary',   href: '#/' })}
          ${Button({ label: t('errors.browse_patterns'), variant: 'secondary', href: '#/patterns' })}
        </div>
      </div>
    </div>
  `;
}
