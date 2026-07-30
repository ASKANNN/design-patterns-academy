# Roadmap

## Phase 1 — Project Foundation ✅

- [x] Folder structure
- [x] `.editorconfig`
- [x] `.gitignore`
- [x] `package.json`
- [x] `vite.config.js`
- [x] `README.md`
- [x] `ROADMAP.md`
- [x] Documentation stubs (`docs/`)

---

## Phase 2 — Design System ✅

- [x] CSS design tokens (colors, typography, spacing, radius, shadows)
- [x] Light and Dark theme variables
- [x] Base reset and normalization
- [x] Typography scale
- [x] `src/config/theme.js`

---

## Phase 3 — Core Layout ✅

- [x] App shell (header, sidebar, main, footer)
- [x] Responsive grid system
- [x] Layout wrapper components
- [x] Navigation structure
- [x] `src/layouts/`

---

## Phase 4 — UI Components ✅

- [x] Button
- [x] Card
- [x] Badge / Tag
- [x] CodeBlock (syntax highlighted)
- [x] Tabs
- [x] Modal / Dialog
- [x] Tooltip
- [x] Search
- [x] Theme toggle
- [x] Language switcher

---

## Phase 5 — Data & i18n ✅

- [x] i18n engine (`src/config/i18n.js`)
- [x] English locale JSON files
- [x] Russian locale JSON files
- [x] All required pattern JSON infrastructure
- [x] Pattern category index

---

## Phase 6 — Pages ✅

- [x] Home (hero, featured patterns, categories)
- [x] Catalog (all patterns, filter by category)
- [x] Pattern Detail
- [x] About
- [x] 404

---

## Phase 7 — Animations ✅

- [x] Page transition system
- [x] Scroll-triggered entrance animations
- [x] Hover micro-interactions
- [x] Theme switch transition
- [x] Skeleton loaders

---

## Phase 8 — Performance Optimization ✅

- [x] Lazy loading for pattern content
- [x] Font loading optimization and preload
- [x] Image optimization
- [x] Vite build tuning
- [x] Lighthouse readiness (manual verification)

---

## Phase 9 — Deployment (in progress)

- [x] GitHub Actions CI/CD pipeline
- [x] GitHub Pages / Vercel deployment configuration
- [x] sitemap.xml
- [x] robots.txt
- [x] PWA manifest
- [x] Open Graph meta tags
- [ ] Verified live production deployment

### ⚠️ HIGH PRIORITY — Search Engine Indexability (2026-07-28)

Current setup (hash routing `#/catalog`, one static `<title>`/`description`/OG
block in `index.html`, fully client-rendered `<div id="app">`) means Google
cannot index individual pages — everything collapses into a single URL with
identical metadata. `sitemap.xml` already lists hash URLs
(`.../#/patterns/adapter`) that Google will not treat as distinct pages.
This blocks any real SEO ranking regardless of content quality.

- [ ] Migrate from hash routing to History API routing (`/patterns/adapter`, no `#`)
- [ ] Per-route dynamic `<title>`, `meta description`, `og:*`/Twitter tags
- [ ] Prerender or SSR so crawlers see real HTML content, not an empty shell
- [ ] JSON-LD structured data per pattern (`TechArticle` / `BreadcrumbList`)
- [ ] Unique `<h1>` per page (not just the global site title)
- [ ] Update `lastmod` dates in `sitemap.xml` to real values
- [ ] Register site + submit sitemap in Google Search Console

**When:** do this once the Phase 12 diagram/interactive-scene sweep across
the 23 patterns is finished, and before Phase 13 (Interactive Learning)
starts. Reason: routing migration touches the whole app shell, so it's
safer to land after the current pattern-by-pattern diagram work settles
rather than mid-sweep; and it should land *before* new interactive features
in Phase 13 so those are built on real routes from the start instead of
needing a second migration later.

---

## Phase 10 — Content Foundation ✅

- [x] Approve the educational standard for one GoF pattern
- [x] Finalize Singleton as the reference implementation
- [x] Validate JSON schema
- [x] Validate localization
- [x] Validate code examples
- [x] Validate navigation
- [x] Validate responsive layout
- [x] Validate accessibility
- [x] Approve Gold Standard

---

## Phase 11 — GoF Pattern Expansion ✅

- [x] Complete all 23 GoF patterns
- [x] English content
- [x] Russian content
- [x] Related patterns
- [x] Cross-linking
- [x] Final review

**Infrastructure Stabilization**

This sprint is executed whenever critical infrastructure bugs are discovered during active development.

Scope:

- Routing
- Navigation
- Search
- Localization
- SPA behavior
- Accessibility
- Browser QA

No new features are implemented during this sprint — only bug fixing and stabilization.

---

## Phase 12 — Visual Learning ✅

- [x] Visual Learning Specification
- [x] Visual Data Model
- [x] Pattern Visual Integration
- [x] Diagram Engine
- [x] Pattern Icon System
- [x] Visual Engine
- [x] Timeline Engine
- [x] Animation Primitives
- [x] Singleton Visual Gold Standard
- [x] Interactive Singleton Gold Standard

- [x] Remaining GoF visual diagrams
- [x] Remaining GoF interactive learning scenes (animated timelines in
      `src/scripts/interactives.js`, confirmed present for all 23 patterns
      on 2026-07-28 — previously mistracked as remaining; not to be
      confused with Phase 13's code walkthroughs/playgrounds/quizzes)

> **Removed from scope (2026-07-18):** "Premium pattern illustrations" was
> dropped — it conflicts with the approved `docs/design/VISUAL_DESIGN_SYSTEM.md`
> ("no unique illustration per pattern"). Deferred, not discarded — see the
> note under Phase 14 below.

---

## Phase 13 — Interactive Learning

> **Sequencing decision (2026-07-28, agreed with owner):** build order is
> **Quizzes → Code walkthroughs → Pattern playgrounds**, not the order
> listed below (that order is the target-state checklist, not the build
> order). Quizzes go first because they need no sandboxing/execution
> architecture and can be shipped across all 23 patterns fastest. Each
> sub-feature starts with Singleton only (the existing Gold Standard
> pattern), stops for owner review, and only then rolls out to the
> remaining 22 — same process used for the Phase 12 Diagram Engine.

- [x] Quizzes — reusable `Quiz` UI component (`src/components/ui/Quiz.js`)
      + a `quiz` array field on the pattern JSON (`question`/`options`/
      `correct`/`explanation`, all bilingual). **Content scope decision
      (2026-07-28):** 5 questions per pattern, drawn only from facts
      already stated elsewhere in that pattern's own JSON
      (intent/cons/implementation) — no new claims introduced by a quiz.
      Shipped for **all 23 patterns**. The engine also
      Fisher–Yates-shuffles question order and option order on every
      render, so the correct answer never sits in a fixed slot and the
      first question isn't reliably answerable from the hero paragraph
      alone (fixed 2026-07-28 after an owner review caught both issues).
- [ ] Interactive code walkthroughs — step-by-step line highlighting +
      explanation layered over the existing `CodeBlock` component; step
      data lives in a new `walkthrough` field on the pattern JSON, keyed
      per language (`{javascript: [...], python: [...]}`), not a separate
      file. **Pilot shipped on Singleton (2026-07-31, JavaScript +
      Python):** `src/components/ui/Walkthrough.js` (step navigator) +
      `CodeBlock.js` line-highlighting support + a side-by-side sticky
      layout (code left, step panel right, collapses to a stacked column
      under 860px) + language-tab badges marking which languages have a
      walkthrough. **Language scope decision (2026-07-31, agreed with
      owner):** JS+Python stays the standard for every pattern — no
      TypeScript/Java/C# walkthroughs. **Rollout progress:** Creational
      category done (2026-07-31) — Abstract Factory, Builder, Factory
      Method, Prototype added alongside the Singleton pilot (5/23).
      Structural (7) and Behavioral (11) categories remain, each
      stopping for an owner review after the category is written.
- [ ] Pattern playgrounds — **scope decision (2026-07-28):** executable
      only for JavaScript/TypeScript, via a sandboxed iframe +
      `Function()` (no real TS type-checking, just transpile-free
      execution). Java/C#/Python stay read-only `CodeBlock` display,
      unchanged — no step-through mode for them at launch. A heavier
      WASM runtime for other languages was considered and rejected as
      disproportionate to this project's zero-runtime-deps principle;
      revisit only if explicitly requested later.
- [ ] Practical exercises

---

## Phase 14 — Platform Improvements

- [ ] Advanced search
- [ ] Favorites
- [ ] Progress tracking
- [ ] Learning roadmap
- [ ] User experience improvements

> **Deferred idea — per-pattern illustrations.** Only revisit once all 23
> patterns reach bespoke Diagram Engine status (`MASTER_PLAN.md`). Requires
> a design review and an explicit amendment to
> `docs/design/VISUAL_DESIGN_SYSTEM.md` first — that document currently
> rules this out on purpose, so it isn't a default follow-up task.

---

## Phase 15 — Software Engineering Platform

- [ ] Parent portal
- [ ] Multi-module navigation
- [ ] Algorithms Academy
- [ ] Data Structures Academy
- [ ] Backend Academy
- [ ] DevOps Academy
- [ ] AI Academy
