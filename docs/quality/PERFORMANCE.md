# PERFORMANCE

Version: 1.0

---

# Purpose

This document defines the performance standards and practices for Design
Patterns Academy.

The app is a static, dependency-light SPA — performance comes mainly from
shipping little code and loading data lazily.

---

# Budgets & Targets

- **Lighthouse Performance ≥ 90** on mobile.
- Core Web Vitals: good **LCP**, low **CLS**, low **INP**.
- No runtime framework — keep third-party dependencies out of the client bundle.

---

# Build

- Bundled and minified by **Vite** (`npm run build` → `dist/`).
- Preview a production build with `npm run preview` before shipping.
- ES modules only (`"type": "module"`); code is tree-shaken.

---

# Loading Strategy

- **Pattern data is loaded on demand** via `src/utils/data-loader.js` and cached,
  so the initial payload stays small.
- Locale files load per active language, not all at once.
- Fonts are requested with `preconnect` and `display=swap` (`index.html`) to
  avoid blocking render.

---

# Rendering

- Rendering is `data → string → innerHTML`; there is no virtual-DOM diffing cost.
- Reserve space for async content to avoid layout shift (skeletons / fixed
  dimensions) — see `Skeleton` / `Spinner`.
- Keep DOM writes batched; avoid layout thrashing in `src/scripts/`.

---

# Assets

- Prefer inline SVG for icons and diagrams over raster images.
- Compress any raster assets and serve appropriately sized versions.
- Avoid large blocking scripts; the only entry is `src/scripts/main.js` (module,
  non-blocking).

---

# Checklist

- [ ] `npm run build` produces no unexpected large chunks
- [ ] New dependencies justified and kept out of the client bundle where possible
- [ ] Data / locales loaded lazily, not eagerly
- [ ] No layout shift from late-loading content
- [ ] Verified with Lighthouse on mobile

---

# Related Documents

- [Architecture](../development/ARCHITECTURE.md)
- [SEO](SEO.md)
