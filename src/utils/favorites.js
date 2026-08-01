const FAVORITES_STORAGE_KEY = 'dpa-favorites';

export function getFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function isFavorite(slug) {
  return getFavorites().includes(slug);
}

export function toggleFavorite(slug) {
  const favorites = getFavorites();
  const index     = favorites.indexOf(slug);
  const next      = index === -1
    ? [...favorites, slug]
    : favorites.filter(s => s !== slug);

  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(next));
  document.dispatchEvent(new CustomEvent('dpa:favorites-changed', { detail: { slug, favorited: index === -1 } }));
  return index === -1;
}
