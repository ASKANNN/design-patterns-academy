export function searchPatterns(patterns, query) {
  const lower = query.trim().toLowerCase();
  if (!lower) return [];

  return patterns.filter(p => {
    const fields = [
      p.name,
      p.category,
      p.summary?.en ?? '',
      p.summary?.ru ?? '',
      ...(p.tags ?? []),
      ...(p.also_known_as ?? []),
    ];
    return fields.some(f => f.toLowerCase().includes(lower));
  });
}
