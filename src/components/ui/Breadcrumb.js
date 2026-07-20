import { t } from '../../utils/i18n.js';

export function BreadcrumbItems(items = []) {
  return items.map((item, i) => {
    const isCurrent = i === items.length - 1;

    return `
      <li class="breadcrumb__item">
        ${isCurrent
          ? `<span class="breadcrumb__current" aria-current="page">${item.icon ?? ''}${item.label}</span>`
          : `<a class="breadcrumb__link" href="${item.href ?? '#'}">${item.label}</a>`
        }
      </li>
    `;
  }).join('');
}

export function Breadcrumb({
  items = [],
  attrs = '',
} = {}) {
  return `
    <nav class="breadcrumb" aria-label="${t('a11y.breadcrumb')}" ${attrs}>
      <ol class="breadcrumb__list" role="list">
        ${BreadcrumbItems(items)}
      </ol>
    </nav>
  `;
}
