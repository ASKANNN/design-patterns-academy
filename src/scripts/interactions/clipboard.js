import { t }        from '../../utils/i18n.js';
import { announce } from './announce.js';

export async function handleCopy(btn) {
  const target = btn.closest('.code-block')?.querySelector('.code-block__code')?.textContent;

  if (!target) return;

  try {
    await navigator.clipboard.writeText(target);
    const label = btn.querySelector('.copy-btn__label');
    const icon  = btn.querySelector('.copy-btn__icon');

    btn.classList.add('is-copied');
    if (label) label.textContent = t('actions.copied');
    if (icon) icon.innerHTML = `
      <polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="2" fill="none"/>
    `;

    setTimeout(() => {
      btn.classList.remove('is-copied');
      if (label) label.textContent = t('actions.copy');
      if (icon) icon.innerHTML = `
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
      `;
    }, 2000);
  } catch {
    const label = btn.querySelector('.copy-btn__label');

    btn.classList.add('is-copy-error');
    if (label) label.textContent = t('actions.copy_failed');
    announce(t('actions.copy_failed'));

    setTimeout(() => {
      btn.classList.remove('is-copy-error');
      if (label) label.textContent = t('actions.copy');
    }, 2000);
  }
}
