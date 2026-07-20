# Page Task

Version: 1.0

---

# Purpose

Use this prompt when creating or modifying a route-level page.

---

# Context to Read

Before starting, read:

* `docs/development/ARCHITECTURE.md`
* `src/scripts/router.js` and `src/config/routes.js`
* existing pages in `src/pages/`

---

# Task

Create or edit a page:

* export an async render function returning an HTML string;
* compose it from existing components, not ad-hoc markup;
* register the route in `src/config/routes.js` (lazy `import()` for splitting);
* add per-route metadata in `_setPageMeta()` (`src/scripts/router.js`).

---

# Rules

* Pages orchestrate components — keep presentation logic in components.
* Load pattern data via `src/utils/data-loader.js`, never inline it.
* All copy localized; provide EN and RU.
* One clear `<h1>`; logical heading order.
* Reserve space for async content to avoid layout shift.

---

# Definition of Done

* Route resolves and renders.
* Title and description set for the route.
* Accessible, localized, no layout shift.
* Follow `prompts/99-development-workflow.md` for review and reporting.
