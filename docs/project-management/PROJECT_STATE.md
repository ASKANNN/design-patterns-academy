# Project State

Last Updated: 2026-07-20

---

# Project

**Design Patterns Academy**

A long-term educational platform about Software Engineering.

The platform is designed to grow into a complete knowledge base covering software development topics.

The first implemented knowledge module is:

- Design Patterns (GoF)

Future modules may include:

- Programming Languages
- Algorithms
- Data Structures
- Software Architecture
- System Design
- Clean Code
- SOLID
- Databases
- Networking
- Operating Systems
- Linux
- Git
- Docker
- Kubernetes
- DevOps
- Cloud
- Security
- AI Engineering
- Machine Learning
- Interview Preparation
- Interactive Playgrounds
- Quizzes

---

# Architecture Status

Architecture is **approved** and **stable**.

- Do not change the project structure without discussion.
- Do not rename or move folders without discussion.
- Do not introduce alternative architectures.
- Any architectural change requires explicit agreement.
- The repository is the single source of truth.

---

# Development Workflow

Development is phase-based.

Only one phase is implemented at a time. After every phase:

1. Review
2. Approve or fix
3. Continue

Rules:

- Never skip phases.
- Never implement future phases ahead of time.
- Never anticipate future functionality.

---

# Coding Rules

Always follow:

- SOLID
- DRY
- KISS
- YAGNI
- Clean Code
- Semantic HTML
- Accessibility
- Performance
- SEO

---

# Change Discipline

- Never regenerate approved files.
- Never rewrite unrelated files.
- Never modify the architecture without agreement.
- Touch only the files required for the current task.
- Stop after every completed phase and wait for review.

---

# Progress

## Phase 1 — Project Foundation

**Status:** Completed

- Vite
- Project structure
- Configuration files
- README
- ROADMAP
- Initial documentation

## Phase 2 — Design System

**Status:** Completed

- CSS design tokens
- Typography
- Themes
- Responsive rules

## Phase 3 — Application Layout

**Status:** Completed

- Header
- Footer
- Navigation
- Layout structure

## Phase 4 — UI Components

**Status:** Completed

Reusable UI component library.

## Phase 5 — Data Layer

**Status:** Completed

- Localization system
- JSON infrastructure
- Module registry

> **Note:** Phase 5 intentionally contains only infrastructure. Full GoF pattern content was added gradually in later phases.

## Phase 6 — Application Pages

**Status:** Completed

- Home
- Knowledge Catalog
- Design Patterns Catalog
- Pattern Details
- About
- Search
- 404

Features: responsive, localized, dynamic routing.

## Phase 7 — Animation System

**Status:** Completed

- Route transitions
- Scroll reveal
- Hero animations
- Theme transitions
- Language transitions
- Micro interactions
- Accessibility support

## Phase 8 — Performance Optimization

**Status:** Completed

- Route-based code splitting
- Lazy loading for pages, pattern content, and localization
- Vite build optimization
- Font loading optimization
- Image asset verification
- Favicon implementation
- Performance readiness verification

## Phase 9 — Deployment & Production Readiness

**Status:** In Progress

Completed:

- GitHub Actions CI/CD workflow (`.github/workflows/deploy.yml`)
- GitHub Pages / Vercel deployment configuration
- robots.txt
- sitemap.xml
- PWA manifest
- Canonical URLs
- Open Graph metadata
- Twitter Cards
- Dynamic SEO metadata

Remaining:

- Verified live production deployment (deploy config exists but no confirmed
  live URL — do not mark this phase complete until a real deployment is
  checked and reachable)

## Phase 10 — Content Foundation

**Status:** Completed

- Singleton reviewed
- Educational structure finalized
- JSON schema validated
- Localization verified
- Code examples reviewed
- Accessibility verified
- Responsive behavior verified
- SEO verified
- Singleton approved as the Gold Standard reference implementation for all GoF pattern pages

## Phase 11 — GoF Pattern Expansion

**Status:** Completed

- All 23 GoF patterns implemented (Creational 5/5, Structural 7/7, Behavioral 11/11)
- English and Russian content
- Related patterns and cross-linking
- Final review

## Phase 12 — Visual Learning

**Status:** In progress

Completed:

- Visual Learning Specification
- Visual Data Model
- Pattern Visual Integration
- Diagram Engine
- Pattern Icon System
- Visual Engine
- Timeline Engine
- Animation Primitives
- Singleton Visual Gold Standard

Remaining:

- Remaining GoF visual diagrams
- Remaining GoF interactive learning scenes

> **Removed from scope (2026-07-18):** "Premium pattern illustrations" was
> dropped from this phase — it conflicts with the approved
> `docs/design/VISUAL_DESIGN_SYSTEM.md` philosophy ("no unique illustration
> per pattern — one grammar, 23 patterns"). Not discarded, only deferred —
> see **Future Development** below.

## Phase 13 — Interactive Learning

**Status:** Not started

- Interactive code walkthroughs
- Pattern playgrounds
- Quizzes
- Practical exercises

---

# Infrastructure Improvements (Completed)

- Category filtering fixed.
- Live search improved.
- Footer navigation fixed.
- Active implementation language highlighting improved.
- Active content tab preserved during language switching.
- Design Philosophy interactive information chips completed.
- Tooltip infrastructure finalized.
- Tooltip fully localized (EN/RU).
- Tooltip supports keyboard navigation.
- Tooltip supports viewport-aware placement.
- Favicon aligned with the header's brand mark (hex/blueprint glyph, replacing the unrelated monogram).
- Route transition enhanced with a dissolve (blur + scale) effect.
- Patterns catalog category filter chips switched to client-side DOM filtering (no full-page re-render); URL, page meta, and breadcrumb stay in sync via `history.replaceState`.
- Breadcrumb updates on filter change patch only the `<ol>` contents, preserving the `<nav>` node instead of replacing it.
- "What are design patterns?" accordion on the Patterns catalog enriched with the GoF authors and a per-category list of all 23 patterns.
- Mobile nav language/theme toggle buttons gained visible feedback (live lang code, sun/moon icon swap, accent hover state) and a less bland light-theme background.

---

# Approved Decisions

- Architecture is stable.
- Roadmap is approved.
- Folder structure is approved.
- Development is incremental.
- Infrastructure is built before content.
- Content is added gradually.
- New knowledge modules must be added without changing the existing architecture.
- Singleton is the approved Gold Standard reference implementation for all GoF pattern pages.

---

# Current Version

Version: **v1.1.0**

Status: In active development

Current focus: Phase 12 — Visual Learning (expanding the approved visual standard to the remaining GoF patterns).

---

# Review Rules

Review each phase only against the goals of that phase.

- Do not reject a phase because of features planned for later.
- Do not request implementation outside the current phase.

---

# Future Development

Continue strictly according to **ROADMAP.md**.

Rules:

- Do not redesign.
- Do not restart.
- Do not change architecture.
- Build one phase at a time.

The MVP is feature-complete. Future development should focus on:

- Platform quality improvements
- Testing and Quality Assurance
- Interactive learning
- New Software Engineering modules

**Deferred idea — per-pattern illustrations.** Floated during Phase 12 and
removed from that phase's scope because it currently conflicts with the
approved `docs/design/VISUAL_DESIGN_SYSTEM.md` ("no unique illustration per
pattern"). Do not schedule this until all 23 patterns reach bespoke Diagram
Engine status (tracked in `docs/project-management/MASTER_PLAN.md`). If
revisited then, it requires its own design review and an explicit amendment
to `VISUAL_DESIGN_SYSTEM.md` before implementation starts — not a silent
reversal of an approved decision.

---

# Project Mission

Design Patterns Academy is intended to become a long-term educational platform for Software Engineering.

The architecture serves as the foundation for future knowledge modules. Future development should expand the platform without redesigning the existing architecture.
