# Pattern Content Task

Version: 1.0

---

# Purpose

Use this prompt when adding or editing design-pattern content.

---

# Context to Read

Before starting, read:

* `docs/content/PATTERNS.md`
* `src/config/patterns.js`
* an existing pattern JSON in the same category

---

# Task

Author pattern content as JSON at
`src/data/patterns/<category>/<slug>.json`:

* fill every field defined by the schema;
* provide `en` and `ru` for all localized fields;
* provide implementation code for each supported language;
* add `visuals` definitions if a diagram is needed.

---

# Rules

* Content is data — never hardcode it in components.
* `slug` is kebab-case and matches the filename and route.
* Keep EN and RU in sync and equivalent in meaning.
* Follow the exact shape of existing patterns in the category.
* Keep code samples correct, idiomatic, and consistent across languages.

---

# Definition of Done

* Pattern renders at `#/patterns/<category>/<slug>`.
* All fields present in both languages.
* Code samples verified.
* Follow `prompts/99-development-workflow.md` for review and reporting.
