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

## Phase 12 — Visual Learning (in progress)

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

Remaining:

- [ ] Remaining GoF visual diagrams
- [ ] Remaining GoF interactive learning scenes

> **Removed from scope (2026-07-18):** "Premium pattern illustrations" was
> dropped — it conflicts with the approved `docs/design/VISUAL_DESIGN_SYSTEM.md`
> ("no unique illustration per pattern"). Deferred, not discarded — see the
> note under Phase 14 below.

---

## Phase 13 — Interactive Learning

- [ ] Interactive code walkthroughs
- [ ] Pattern playgrounds
- [ ] Quizzes
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
