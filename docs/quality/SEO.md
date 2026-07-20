# SEO

Version: 1.0

---

# Purpose

This document defines the SEO approach for Design Patterns Academy.

The app is a hash-based SPA, so per-route metadata is managed in JavaScript on
top of the static defaults in `index.html`.

---

# Base Metadata

`index.html` ships the site-wide defaults:

- `<title>` and `<meta name="description">`
- Canonical link
- Open Graph tags (`og:type`, `og:site_name`, `og:url`, `og:title`,
  `og:description`)
- Twitter Card tags (`twitter:card`, `twitter:title`, `twitter:description`)
- `theme-color`, favicon, and web manifest

---

# Per-Route Metadata

On every navigation, `_setPageMeta()` in `src/scripts/router.js` updates:

- `document.title`
- `meta[name="description"]`
- `og:title` / `og:description`
- `twitter:title` / `twitter:description`

Titles follow the pattern `"<Page> — Design Patterns Academy"`, and descriptions
are tailored per route (home, catalog, patterns, category, pattern detail, about,
search).

**When you add a route or rename a pattern, update `_setPageMeta()` so the new
page has an accurate title and description.**

---

# Content Guidelines

- One clear `<h1>` per page; logical heading hierarchy below it.
- Descriptive, unique link text (no bare "click here").
- Meaningful `alt` / labels for images and diagrams.
- Descriptions kept concise (~150–160 chars) and unique per route.

---

# Hash Routing Note

Routes use `#/…` so the app deploys to any static host without server rewrites.
Because crawlers may not index hash fragments as separate URLs, keep the base
`index.html` metadata strong and descriptive, and ensure the canonical URL is
correct for the deployed domain.

---

# Checklist

- [ ] New route added to `_setPageMeta()` with title + description
- [ ] Title and description are unique and accurate
- [ ] Single, descriptive `<h1>`
- [ ] Canonical / OG URL matches the deployed domain
- [ ] Social preview verified (OG / Twitter tags)

---

# Related Documents

- [Architecture](../development/ARCHITECTURE.md)
- [Performance](PERFORMANCE.md)
