# Performance Task

Version: 1.0

---

# Purpose

Use this prompt when optimizing load or runtime performance.

---

# Context to Read

Before starting, read:

* `docs/quality/PERFORMANCE.md`
* `src/scripts/main.js`, `src/config/routes.js`, `src/utils/data-loader.js`
* `vite.config.js`

---

# Task

Improve performance without changing behavior:

* reduce bundle size and keep dependencies out of the client;
* keep data and locales lazily loaded;
* eliminate layout shift and unnecessary work on the main thread.

---

# Rules

* No runtime framework or heavy dependencies.
* Preserve per-route code splitting (lazy `import()` in the route table).
* Reserve space for async content (skeletons / fixed dimensions).
* Prefer inline SVG over raster; compress any images.
* Measure before and after; do not guess.

---

# Definition of Done

* `npm run build` shows no unexpected large chunks.
* Lighthouse (mobile) meets or beats the target.
* Behavior unchanged; no layout shift.
* Follow `prompts/99-development-workflow.md` for review and reporting.
