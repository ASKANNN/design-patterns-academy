import { ErrorPage } from '../components/ui/ErrorPage.js';
import { Button }    from '../components/ui/Button.js';
import { t }          from '../utils/i18n.js';

export async function NotFoundPage() {
  return ErrorPage({
    variant:     'not-found',
    code:        '404',
    title:       t('errors.not_found'),
    description: t('errors.not_found_desc'),
    actions: `
      ${Button({ label: t('errors.go_home'),        variant: 'primary',   href: '/' })}
      ${Button({ label: t('errors.browse_patterns'), variant: 'secondary', href: '/patterns' })}
    `,
  });
}
