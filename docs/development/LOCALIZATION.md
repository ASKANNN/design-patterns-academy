# LOCALIZATION

Version: 1.0

---

# Purpose

This document describes how internationalization (i18n) works and how to add or
edit translations.

The platform ships in **English (`en`)** and **Russian (`ru`)**. English is the
default and the fallback.

---

# How It Works

The i18n engine lives in `src/config/i18n.js`; DOM helpers live in
`src/utils/i18n.js`.

- `SUPPORTED_LANGS = ['en', 'ru']`, `DEFAULT_LANG = 'en'`.
- On boot, `initI18n()` picks the language from `localStorage` (`dpa-lang`),
  then the browser language, then the default.
- `setLanguage(lang)` switches the active locale and persists the choice.
- `t(key, params)` resolves a dotted key (e.g. `nav.patterns`) to a string, and
  interpolates `params`. If a key is missing it returns the key itself, so
  untranslated strings are easy to spot.

---

# Translation Files

```
src/data/locales/
  ├─ en/
  │   ├─ ui.json        ← interface strings (nav, buttons, footer, a11y…)
  │   └─ patterns.json  ← shared pattern-related UI copy
  └─ ru/
      ├─ ui.json
      └─ patterns.json
```

Keys must be **identical across languages**. Every key present in `en` must
exist in `ru`.

---

# Using Translations

## In markup (preferred)

Mark elements with data attributes; `applyTranslations()` fills them after the
locale loads and after every language switch.

```html
<a href="#/patterns" data-i18n="nav.patterns">Patterns</a>
<input data-i18n-placeholder="search.placeholder" />
<button data-i18n-aria-label="a11y.close"></button>
```

Supported attributes: `data-i18n` (text), `data-i18n-placeholder`,
`data-i18n-aria-label`.

## In JavaScript

```js
import { t } from '../utils/i18n.js';

t('patterns.back_to_category', { category: 'Behavioral' });
```

---

# Adding or Editing Strings

1. Add the key to **both** `en/*.json` and `ru/*.json` with matching structure.
2. Reference it via `data-i18n` in markup or `t()` in code — never hardcode copy.
3. Switch languages in the UI and confirm nothing falls back to the raw key.

---

# Pattern Content

Pattern JSON under `src/data/patterns/` carries its own localized fields with
`en` / `ru` sub-objects (e.g. `intent`, `problem`, `solution`). Keep both
languages in sync when editing pattern content — see
[PATTERNS.md](../content/PATTERNS.md).

---

# Related Documents

- [Architecture](ARCHITECTURE.md)
- [Components](COMPONENTS.md)
- [Patterns Content](../content/PATTERNS.md)
