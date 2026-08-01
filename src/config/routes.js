
export const ROUTES = [
  {
    pattern: '/',
    load: () => import('../pages/HomePage.js').then(m => m.HomePage()),
  },
  {
    pattern: '/catalog',
    load: () => import('../pages/CatalogPage.js').then(m => m.CatalogPage()),
  },
  {
    pattern: '/patterns',
    load: () => import('../pages/PatternsCatalogPage.js').then(m => m.PatternsCatalogPage()),
  },
  {
    pattern: '/patterns/:category',
    load: ({ category }) =>
      import('../pages/PatternsCatalogPage.js').then(m => m.PatternsCatalogPage({ category })),
  },
  {
    pattern: '/patterns/:category/:slug',
    load: (params) =>
      import('../pages/PatternDetailPage.js').then(m => m.PatternDetailPage(params)),
  },
  {
    pattern: '/roadmap',
    load: () => import('../pages/RoadmapPage.js').then(m => m.RoadmapPage()),
  },
  {
    pattern: '/favorites',
    load: () => import('../pages/FavoritesPage.js').then(m => m.FavoritesPage()),
  },
  {
    pattern: '/about',
    load: () => import('../pages/AboutPage.js').then(m => m.AboutPage()),
  },
  {
    pattern: '/search',
    load: () => import('../pages/SearchPage.js').then(m => m.SearchPage()),
  },
  {
    pattern: '*',
    load: () => import('../pages/NotFoundPage.js').then(m => m.NotFoundPage()),
  },
];
