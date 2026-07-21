
const cache = new Map();

export async function loadPatternIndex() {
  return _cached('index', () => import('../data/patterns/index.json'));
}

export async function loadPattern(category, slug) {
  const key = `${category}/${slug}`;
  return _cached(key, async () => {
    try {
      return await import(`../data/patterns/${category}/${slug}.json`);
    } catch {
      console.warn(`[data-loader] Pattern not found: ${key}`);
      return { default: null };
    }
  });
}

export async function loadAllPatterns() {
  const index = await loadPatternIndex();
  const available = index.patterns.filter(p => p.status === 'available');

  const results = await Promise.allSettled(
    available.map(p => loadPattern(p.category, p.slug))
  );

  return results
    .filter(r => r.status === 'fulfilled' && r.value !== null)
    .map(r => r.value);
}

export async function getPatternsByCategory(category) {
  const index = await loadPatternIndex();
  return index.patterns.filter(p => p.category === category);
}

export async function getPatternMeta(slug) {
  const index = await loadPatternIndex();
  return index.patterns.find(p => p.slug === slug) ?? null;
}

async function _cached(key, loader) {
  if (cache.has(key)) return cache.get(key);
  const mod  = await loader();
  const data = mod.default ?? mod;
  cache.set(key, data);
  return data;
}
