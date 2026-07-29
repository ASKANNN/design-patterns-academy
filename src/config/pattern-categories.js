import { t } from '../utils/i18n.js';

export const PATTERNS_CATEGORIES = [
  { id: 'all',        label: () => t('patterns.categories.all') },
  { id: 'creational', label: () => t('patterns.categories.creational') },
  { id: 'structural', label: () => t('patterns.categories.structural') },
  { id: 'behavioral', label: () => t('patterns.categories.behavioral') },
];

export function patternsBreadcrumbItems(active) {
  const category = PATTERNS_CATEGORIES.find(c => c.id === active);
  return [
    { label: t('breadcrumbs.home'), href: '#/' },
    ...(active !== 'all'
      ? [
          { label: t('breadcrumbs.patterns'), href: '#/patterns' },
          { label: category?.label() ?? active },
        ]
      : [{ label: t('breadcrumbs.patterns') }]),
  ];
}
