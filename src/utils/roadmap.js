const CATEGORY_ORDER = ['creational', 'structural', 'behavioral'];

export function buildRoadmap(patterns) {
  const available = patterns.filter(p => p.status === 'available');

  const ordered = CATEGORY_ORDER.flatMap(category =>
    available
      .filter(p => p.category === category)
      .sort((a, b) => a.complexity - b.complexity || b.popularity - a.popularity)
  );

  return ordered.map((pattern, i) => ({ ...pattern, step: i + 1 }));
}
