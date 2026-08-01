const PROGRESS_STORAGE_KEY = 'dpa-progress';

export function getCompleted() {
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function isCompleted(slug) {
  return getCompleted().includes(slug);
}

export function toggleCompleted(slug) {
  const completed = getCompleted();
  const index      = completed.indexOf(slug);
  const next       = index === -1
    ? [...completed, slug]
    : completed.filter(s => s !== slug);

  localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(next));
  document.dispatchEvent(new CustomEvent('dpa:progress-changed', { detail: { slug, completed: index === -1 } }));
  return index === -1;
}
