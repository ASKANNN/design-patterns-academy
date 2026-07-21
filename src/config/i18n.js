
export const SUPPORTED_LANGS = ['en', 'ru'];
export const DEFAULT_LANG    = 'en';
export const STORAGE_KEY     = 'dpa-lang';

let _lang         = DEFAULT_LANG;
let _translations = {};

export async function initI18n() {
  const saved   = localStorage.getItem(STORAGE_KEY);
  const browser = navigator.language.split('-')[0];

  const lang = SUPPORTED_LANGS.includes(saved)   ? saved
             : SUPPORTED_LANGS.includes(browser)  ? browser
             : DEFAULT_LANG;

  await _load(lang);
}

export async function setLanguage(lang) {
  if (!SUPPORTED_LANGS.includes(lang) || lang === _lang) return;
  await _load(lang);
  localStorage.setItem(STORAGE_KEY, lang);
}

export function t(key, params = {}) {
  const value = key.split('.').reduce((obj, k) => obj?.[k], _translations);
  if (typeof value !== 'string') return key;
  return value.replace(/\{\{(\w+)\}\}/g, (_, k) => String(params[k] ?? `{{${k}}}`));
}

export const getLang = () => _lang;

async function _load(lang) {
  const [ui, patterns] = await Promise.all([
    import(`../data/locales/${lang}/ui.json`),
    import(`../data/locales/${lang}/patterns.json`),
  ]);

  _translations = _merge(ui.default, patterns.default);
  _lang = lang;

  document.documentElement.lang = lang;
  document.documentElement.setAttribute('data-lang', lang);

  document.dispatchEvent(
    new CustomEvent('dpa:lang-change', { detail: { lang }, bubbles: true })
  );
}

function _merge(target, source) {
  const out = { ...target };
  for (const key of Object.keys(source)) {
    out[key] =
      source[key] !== null &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key])
        ? _merge(target[key] ?? {}, source[key])
        : source[key];
  }
  return out;
}
