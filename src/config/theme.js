
export const THEMES            = ['light', 'dark'];
export const DEFAULT_THEME     = 'light';
export const THEME_STORAGE_KEY = 'dpa-theme';
export const THEME_ATTR        = 'data-theme';

export function getStoredTheme() {
  return localStorage.getItem(THEME_STORAGE_KEY);
}

export function getActiveTheme() {
  return document.documentElement.getAttribute(THEME_ATTR) ?? DEFAULT_THEME;
}

export function applyTheme(theme) {
  if (!THEMES.includes(theme)) theme = DEFAULT_THEME;
  document.documentElement.setAttribute(THEME_ATTR, theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export function restoreTheme() {
  const saved = getStoredTheme();
  if (saved && THEMES.includes(saved)) {
    document.documentElement.setAttribute(THEME_ATTR, saved);
  }
}

export function nextTheme(current = getActiveTheme()) {
  const i = THEMES.indexOf(current);
  return THEMES[(i + 1) % THEMES.length];
}
