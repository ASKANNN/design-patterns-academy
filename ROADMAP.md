# Roadmap

See [CHANGELOG.md](docs/git-and-releases/CHANGELOG.md) for what shipped and
why. This file tracks phase-level status only.

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
- [x] Badge
- [x] CodeBlock (syntax highlighted)
- [x] Tabs
- [x] Tooltip
- [x] Search
- [x] Theme toggle
- [x] Language switcher

Build only what a page actually uses — several speculative kit primitives
built here were later removed as dead code (see CHANGELOG).

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

## Phase 9 — Deployment ✅

- [x] GitHub Actions CI/CD pipeline (build + Playwright prerender on
      Actions, prebuilt output deployed to Vercel via CLI)
- [x] sitemap.xml / robots.txt / PWA manifest / Open Graph meta tags
- [x] Verified live production deployment
      (`https://askan-de-pa-ac.vercel.app`)
- [x] History API routing, per-route meta, prerendering, JSON-LD, Google
      Search Console — see CHANGELOG for the SEO migration details

No custom-domain migration is planned — see Phase 14.

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

**Infrastructure Stabilization** — run whenever critical infrastructure
bugs surface during active development (routing, navigation, search,
localization, SPA behavior, accessibility, browser QA). No new features
during this sprint, bug fixing only.

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
- [x] Remaining GoF visual diagrams (23/23 bespoke)
- [x] Remaining GoF interactive learning scenes (23/23)

> **Deferred idea — per-pattern illustrations.** Conflicts with the
> approved `docs/design/VISUAL_DESIGN_SYSTEM.md` ("no unique illustration
> per pattern"). Only revisit with an explicit amendment to that document.

---

## Phase 13 — Interactive Learning ✅

- [x] Quizzes — 23/23 patterns
- [x] Interactive code walkthroughs (JS + Python) — 23/23 patterns
- [x] Pattern playgrounds (JS/TS sandboxed execution) — 23/23 patterns

> **Deferred — Practical exercises.** No agreed spec (task format,
> auto-check behavior, scoring). Picking it up later needs its own scope
> discussion first.

---

## Phase 14 — Platform Improvements ✅

- [x] Custom domain — **decided against (2026-08-13):** not worth the
      ongoing cost. Discovery/navigation into this project is handled by
      an external hub site ("Академия HB") that links into this app.
- [x] Advanced search (alias matching)
- [x] Favorites
- [x] Progress tracking
- [x] Learning roadmap (`/roadmap`)
- [x] User experience improvements (a11y, focus handling, sound effects,
      dockable accessibility widget)

> **Deferred idea — per-pattern illustrations.** Same status as the note
> under Phase 12.

---

## Phase 15 — Software Engineering Platform

**Out of scope for this repository (2026-08-13, owner decision).** The
multi-module vision (parent portal, module navigation, additional academies
beyond GoF patterns) is realized one level up, on an external hub site
("Академия HB") that provides the parent portal / cross-module navigation
and links into this app as one module. This repository stays scoped to the
Design Patterns module.
