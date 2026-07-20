# Localization Task

Version: 1.0

---

# Purpose

Use this prompt when adding or editing translations.

---

# Context to Read

Before starting, read:

* `docs/development/LOCALIZATION.md`
* `src/config/i18n.js` and `src/utils/i18n.js`
* `src/data/locales/en/` and `src/data/locales/ru/`

---

# Task

Add or update UI strings:

* add the key to **both** `en/*.json` and `ru/*.json`;
* reference it via `data-i18n` in markup or `t()` in code;
* use the correct file (`ui.json` for interface, `patterns.json` for pattern UI).

---

# Rules

* Keys must be identical across languages — no orphans.
* Never hardcode user-facing copy.
* Keep key names dotted and descriptive (e.g. `nav.patterns`, `a11y.close`).
* Use `data-i18n-placeholder` and `data-i18n-aria-label` where appropriate.
* Translations must be natural, not literal.

---

# Definition of Done

* New keys present and matched in EN and RU.
* Switching language shows no raw keys.
* Follow `prompts/99-development-workflow.md` for review and reporting.
