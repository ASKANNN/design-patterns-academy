
import { SITE_URL } from '../config/site.js';

export function jsonLdScriptTag(obj) {
  return `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;
}

export function breadcrumbListJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type':  'ListItem',
      position: i + 1,
      name:     item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };
}

export function techArticleJsonLd(pattern, category, slug) {
  const url = `${SITE_URL}/patterns/${category}/${slug}`;
  return {
    '@context':       'https://schema.org',
    '@type':          'TechArticle',
    headline:         `${pattern.name} Pattern`,
    description:      pattern.intent?.en ?? pattern.summary?.en ?? '',
    articleSection:   category,
    keywords:         (pattern.tags ?? []).join(', '),
    url,
    mainEntityOfPage: url,
  };
}
