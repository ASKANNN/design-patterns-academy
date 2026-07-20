
import { t, getLang, setLanguage, SUPPORTED_LANGS } from '../config/i18n.js';

export { t, getLang, setLanguage, SUPPORTED_LANGS };

export function applyTranslations(root = document.body) {
  if (!root) return;

  root.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = t(key);
    if (val !== key) el.textContent = val;
  });

  root.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const val = t(el.dataset.i18nPlaceholder);
    if (val !== el.dataset.i18nPlaceholder) el.placeholder = val;
  });

  root.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
    const val = t(el.dataset.i18nAriaLabel);
    if (val !== el.dataset.i18nAriaLabel) el.setAttribute('aria-label', val);
  });

  root.querySelectorAll('[data-i18n-title]').forEach(el => {
    const val = t(el.dataset.i18nTitle);
    if (val !== el.dataset.i18nTitle) el.setAttribute('title', val);
  });

  root.querySelectorAll('[data-i18n-html]').forEach(el => {
    const val = t(el.dataset.i18nHtml);
    if (val !== el.dataset.i18nHtml) el.innerHTML = val;
  });
}

export function updateLangButtons(lang = getLang()) {
  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    const isActive = btn.dataset.langBtn === lang;
    btn.setAttribute('aria-pressed', String(isActive));
    btn.classList.toggle('is-active', isActive);
  });

  document.querySelectorAll('.header__lang-code').forEach(el => {
    el.textContent = lang.toUpperCase();
  });
}

export function onLangChange(callback) {
  document.addEventListener('dpa:lang-change', (e) => callback(e.detail.lang));
}

export function localise(obj, lang = getLang()) {
  return obj?.[lang] ?? obj?.en ?? '';
}
