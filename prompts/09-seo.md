# SEO Task

Version: 1.0

---

# Purpose

Use this prompt when working on metadata and discoverability.

---

# Context to Read

Before starting, read:

* `docs/quality/SEO.md`
* `index.html` (base metadata)
* `_setPageMeta()` in `src/scripts/router.js`

---

# Task

Improve SEO metadata:

* keep base tags in `index.html` accurate (title, description, canonical, OG,
  Twitter);
* ensure each route sets a unique title and description in `_setPageMeta()`.

---

# Rules

* Every route has a unique, accurate title and description.
* Descriptions ~150–160 chars.
* One descriptive `<h1>` per page; logical heading order.
* Canonical / OG URL matches the deployed domain.
* Use meaningful link text and image/diagram labels.

---

# Definition of Done

* New/edited routes reflected in `_setPageMeta()`.
* Social preview (OG / Twitter) verified.
* Titles and descriptions unique.
* Follow `prompts/99-development-workflow.md` for review and reporting.
