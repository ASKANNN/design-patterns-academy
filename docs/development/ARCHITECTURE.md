# ARCHITECTURE

Version: 1.0

---

# Purpose

This document describes the runtime architecture of Design Patterns Academy.

The project is a **client-side SPA** built with vanilla ES modules and bundled
with Vite. There is no framework and no backend — all content ships as static
JSON and is rendered in the browser.

---

# High-Level Overview

```
index.html
  └─ src/scripts/main.js        ← entry point (bootstraps the app)
       ├─ config/i18n.js         ← locale loading & translation engine
       ├─ scripts/router.js      ← hash-based SPA router
       ├─ layouts/AppLayout.js   ← header + outlet + footer shell
       └─ pages/*.js             ← one render function per route
```

The application mounts into `<div id="app">` and never performs a full page
reload after boot.

---

# Directory Layout

| Path                 | Responsibility                                            |
| -------------------- | -------------------------------------------------------- |
| `src/scripts/`       | App bootstrap, router, UI behaviors, animations          |
| `src/pages/`         | Route-level views — each exports an async render function |
| `src/layouts/`       | Persistent shell (`AppLayout`) around the routed outlet   |
| `src/components/`    | Reusable render functions (`ui`, `layout`, `patterns`, `visual`) |
| `src/config/`        | Pure configuration (i18n, patterns, modules)             |
| `src/utils/`         | Cross-cutting helpers (`i18n`, `data-loader`)            |
| `src/data/patterns/` | Pattern content as JSON, grouped by category             |
| `src/data/locales/`  | UI + pattern translation strings (`en`, `ru`)            |
| `src/styles/`        | CSS split into `base`, `components`, `themes`            |

---

# Rendering Model

Components and pages are **plain functions that return HTML strings**. There is
no virtual DOM.

- A page function receives route `params` and returns a template string.
- The router injects the returned HTML into the outlet element.
- After injection, translations, active-link marking, page meta, and entrance
  animations are applied.

This keeps the mental model simple: `data → string → innerHTML`.

---

# Routing

Routing is hash-based (`#/patterns/:category/:slug`) so it works on any static
host without server rewrites. See `src/scripts/router.js`:

- `defineRoute(pattern, handler)` — register a route.
- `initRouter(outlet)` — resolve the current hash and listen for `hashchange`.
- `navigate(path)`, `getCurrentPath()`, `getQueryParam(key)` — navigation helpers.
- `reloadRoute()` — re-render the current route in place (used after a language
  change).

A `*` route acts as the 404 fallback.

---

# Data Flow

1. Pattern JSON lives in `src/data/patterns/<category>/<slug>.json`.
2. `src/utils/data-loader.js` loads and caches pattern data on demand.
3. Pages request data, then render it to HTML strings.
4. Localized UI strings come from the i18n engine, not from the pattern data.

---

# Design Principles

- **No framework** — vanilla ES modules keep the bundle small and dependency-free.
- **Config over code** — categories, languages, and modules are declared in
  `src/config/`.
- **Static-first** — everything can be served from a CDN / GitHub Pages / Vercel.
- **SOLID / DRY / KISS / YAGNI** — see `docs/development/MODULE_GUIDE.md`.

---

# Related Documents

- [Module Guide](MODULE_GUIDE.md)
- [Components](COMPONENTS.md)
- [Design System](DESIGN_SYSTEM.md)
- [Localization](LOCALIZATION.md)
