# SEO

Version: 1.0

---

# Purpose

This document defines the SEO approach for Design Patterns Academy.

The app uses History API routing (real paths like `/patterns/adapter`, no
`#`). Every route is prerendered at build time (`scripts/prerender.mjs`) so
crawlers receive real HTML with the correct per-route metadata already
baked in, on top of the static defaults in `index.html`.

---

# Base Metadata

`index.html` ships the site-wide defaults:

- `<title>` and `<meta name="description">`
- Canonical link
- Open Graph tags (`og:type`, `og:site_name`, `og:url`, `og:title`,
  `og:description`)
- Twitter Card tags (`twitter:card`, `twitter:title`, `twitter:description`)
- `theme-color`, favicon, and web manifest

`public/robots.txt` and `public/sitemap.xml` are served at the domain root
and copied into `dist/` on build.

---

# Per-Route Metadata

On every navigation, `setPageMeta()` in `src/scripts/router.js` updates:

- `document.title`
- `meta[name="description"]`
- `link[rel="canonical"]` / `og:url`
- `og:title` / `og:description`
- `twitter:title` / `twitter:description`

Titles follow the pattern `"<Page> — Design Patterns Academy"`, and descriptions
are tailored per route (home, catalog, patterns, category, pattern detail, about,
search). The canonical domain lives in `src/config/site.js` (`SITE_URL`) —
don't hardcode the domain elsewhere.

Pages that render a breadcrumb trail also emit `BreadcrumbList` JSON-LD, and
`PatternDetailPage` additionally emits `TechArticle` JSON-LD, via
`src/utils/json-ld.js`.

**When you add a route or rename a pattern, update `setPageMeta()` so the new
page has an accurate title and description.**

---

# Content Guidelines

- One clear `<h1>` per page; logical heading hierarchy below it.
- Descriptive, unique link text (no bare "click here").
- Meaningful `alt` / labels for images and diagrams.
- Descriptions kept concise (~150–160 chars) and unique per route.

---

# Prerendering

`npm run build` runs `vite build && node scripts/prerender.mjs`. The
prerender script spins up a local preview server, visits every route in a
headless browser, waits for the `app:navigated` event the router dispatches
once rendering + `setPageMeta()` have finished, and writes the resulting
HTML to `dist/<route>/index.html`. This must run on an officially
Playwright-supported OS (Ubuntu) — see `.github/workflows/deploy.yml`, which
builds on GitHub Actions and deploys the prebuilt output to Vercel, since
Vercel's own build container lacks the shared libraries Playwright's
Chromium needs.

When adding a new route, add it to the route list in
`scripts/prerender.mjs` (`getRoutes()`) so it gets prerendered too.

---

# Checklist

- [ ] New route added to `setPageMeta()` with title + description
- [ ] Title and description are unique and accurate
- [ ] Single, descriptive `<h1>`
- [ ] Canonical / OG URL matches the deployed domain
- [ ] Social preview verified (OG / Twitter tags)

---

# Related Documents

- [Architecture](../development/ARCHITECTURE.md)
- [Performance](PERFORMANCE.md)
