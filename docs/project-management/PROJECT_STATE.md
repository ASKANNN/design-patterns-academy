# Project State

Last Updated: 2026-07-31

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

**Status:** Completed (2026-07-28)

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
- 23 of 23 patterns upgraded to bespoke Diagram Engine layouts (Singleton,
  Decorator, Facade, Flyweight, Proxy, Chain of Responsibility, Command,
  Interpreter, Iterator, Mediator, Memento, Observer, State, Strategy,
  Template Method, Visitor, Factory Method, Abstract Factory, Builder,
  Prototype, Adapter, Bridge, Composite)
- 23 of 23 patterns wired to an animated interactive scene (`src/scripts/
  interactives.js` step timelines, mounted via `mountInteractives()`) —
  this was previously mistracked as "remaining" in this file; verified
  against the code on 2026-07-28 and confirmed complete for every pattern
  in `_INTERACTIVE_STEPS`.

> **Correction (2026-07-28):** this phase previously listed "Remaining GoF
> interactive learning scenes" as outstanding. That was stale — the
> per-pattern animated timelines were already built alongside the Diagram
> Engine sweep. Do not confuse this with Phase 13's "Interactive Learning"
> (code walkthroughs, playgrounds, quizzes), which is a distinct, unstarted
> body of work.

See [MASTER_PLAN.md](MASTER_PLAN.md) for the authoritative, continuously
updated per-pattern visual status — this file gives the phase-level summary
only and may lag between updates.

> **Removed from scope (2026-07-18):** "Premium pattern illustrations" was
> dropped from this phase — it conflicts with the approved
> `docs/design/VISUAL_DESIGN_SYSTEM.md` philosophy ("no unique illustration
> per pattern — one grammar, 23 patterns"). Not discarded, only deferred —
> see **Future Development** below.

## Phase 13 — Interactive Learning

**Status:** Quizzes shipped for all 23 patterns; code walkthroughs shipped for all 23 patterns (Creational, Structural, Behavioral); playgrounds piloted on Singleton (1/23), rollout to the rest not started

- [x] Interactive code walkthroughs — all 23 patterns done, see below
- Pattern playgrounds — Singleton pilot shipped 2026-07-31, see below
- [x] Quizzes — all 23 patterns done (5 questions each, verified via
      Playwright end to end for representative patterns from each
      category; dark-theme visual review passed). The `Quiz` engine
      (`src/components/ui/Quiz.js`) shuffles question order and option
      order on every render, so the correct answer's position and the
      first question shown are never predictable.
- Practical exercises

> **Code walkthroughs pilot (Singleton, 2026-07-31):** a new `walkthrough`
> field on the pattern JSON, keyed per language
> (`{javascript: [...], python: [...]}`, each step
> `{lines:[start,end], title:{en,ru}, explanation:{en,ru}}`). New
> `src/components/ui/Walkthrough.js` step-navigator component; `CodeBlock.js`
> extended to wrap output in per-line spans and highlight an active line
> range. Layout is a side-by-side sticky panel (code left with its own
> scroll region, step panel right, pinned under the header) that collapses
> to a single stacked column under 860px. Language-select tabs show a small
> accent-dot badge on any language that has walkthrough content (currently
> JavaScript and Python only). Verified via Playwright across desktop/
> mobile viewports and both themes, zero console errors. **Language scope
> decision (2026-07-31):** JS+Python is the confirmed standard for every
> pattern — no TypeScript/Java/C# walkthroughs. **Rollout (2026-07-31):**
> Creational category complete (Abstract Factory, Builder, Factory Method,
> Prototype added alongside the Singleton pilot, 5/23), each step's
> explanation grounded in that pattern's own `implementation` code,
> verified via Playwright screenshots (line highlighting, per-step
> content, autoscroll). **Structural category complete (2026-07-31):**
> Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy (12/23
> total), same grounding rule, verified via a headless Playwright script
> (Implementation tab opens the panel, exactly 2 language badges per
> pattern, 0 leakage into TypeScript, "Next step" changes the highlighted
> range, 0 console errors) and confirmed working by the owner directly in
> the browser. **Behavioral category complete (2026-07-31):** Chain of
> Responsibility, Command, Interpreter, Iterator, Mediator, Memento,
> Observer, State, Strategy, Template Method, Visitor (23/23 total, all
> patterns), same grounding rule and same Playwright verification, owner
> confirmed working in the browser. Code walkthroughs are now complete for
> every GoF pattern.

> **Pattern playgrounds pilot (Singleton, 2026-07-31):** new
> `src/components/ui/Playground.js` (editor pane + console pane,
> Run/Reset/Clear) shown in a new "Playground" tab on
> `PatternDetailPage`, with a JS/TS language toggle reusing the existing
> `lang-select` styling. No new JSON field — starter code is simply
> `implementation.javascript`/`implementation.typescript`. Execution
> happens in an `iframe` with `sandbox="allow-scripts"` and no
> `allow-same-origin`, so sandboxed code gets an opaque origin and cannot
> reach the app's DOM, cookies, localStorage, or navigate the top-level
> page; a fresh `srcdoc` is assigned per run, so no state leaks between
> runs. `console.log/info/warn/error` and thrown errors are captured
> inside the sandbox and relayed to the parent via `postMessage`
> (correlated by `e.source === iframe.contentWindow`, no id plumbing
> needed), then rendered as console lines (errors in red). TypeScript
> code is passed through `stripTypes()` (`src/utils/strip-types.js`), a
> small regex-based stripper (removes `public`/`private`/`protected`/
> `readonly` modifiers and `: Type` annotations) before execution — this
> is deliberately not a real parser, matches the "no real TS
> type-checking" scope decision, and is only verified to work for the
> simple class-based samples used in this project. Verified via a
> headless Playwright script: Run executes and prints console output,
> editing the textarea and re-running reflects the new code, Reset
> restores the original code byte-for-byte, thrown errors render with the
> error style, the TypeScript sample runs correctly after stripping, and
> there are zero browser console errors throughout. Owner reviewed in the
> browser and approved. Rollout to the remaining 22 patterns (creational →
> structural → behavioral) has not started.

> **Build order and scope (agreed with owner, 2026-07-28):** the checklist
> above is the target state, not the build order. Actual sequencing is
> **Quizzes → Code walkthroughs → Pattern playgrounds**:
> - Quizzes first — simple per-pattern JSON (question/options/answer) +
>   one display/check component, no scoring or progress tracking at
>   launch. No sandboxing risk, so it's the fastest to ship across all 23
>   patterns.
> - Code walkthroughs next — line-highlighting + step explanations layered
>   over the existing `CodeBlock` component (`src/components/ui/
>   CodeBlock.js`); step data stored as a new field on the pattern JSON
>   (not a separate file), one engine reused across all patterns and
>   languages.
> - Pattern playgrounds last, and narrower in scope than the checklist
>   name implies: **executable only for JavaScript/TypeScript**, run in a
>   sandboxed iframe via `Function()` (no real TS type-checking). Java,
>   C#, and Python stay read-only `CodeBlock` — no execution, no
>   step-through mode for them at launch. A WASM runtime for the other
>   four languages was considered and rejected as disproportionate to the
>   project's zero-runtime-deps principle; only revisit if explicitly
>   requested.
> - Each sub-feature ships **Singleton-only first**, stops for owner
>   review, then rolls out to the remaining 22 patterns — the same
>   gold-standard-first process used for the Phase 12 Diagram Engine.
>
> **Quiz content scope (agreed with owner, 2026-07-28):** 5 questions per
> pattern. Every question/explanation must be traceable to a fact already
> stated elsewhere in that same pattern's JSON (intent, cons, or
> implementation code) — a quiz explains existing content, it doesn't
> introduce new claims. Singleton's 5 questions were verified against its
> own `intent`/`cons`/`implementation.javascript` fields before rollout
> begins on the rest.
>
> **Quiz engine fix (2026-07-28):** an owner review of the shipped
> Adapter quiz found the first question was always answerable straight
> from the hero-paragraph intent text above the tabs, and the correct
> option always rendered in the same slot. Fixed at the engine level in
> `Quiz.js` (Fisher–Yates shuffle of question order and option order per
> render) rather than by rewriting per-pattern JSON — applies to all 23
> patterns automatically.

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
- Scroll-to-top button added near the footer.
- Accessibility widget added (font size, contrast, monochrome, and link controls).
- Content-consistency audit across all 23 pattern JSON files: reconciled
  cases where a pattern's `problem`/`solution`/`structure.participants`/
  `implementation`/diagram described different worked examples instead of
  a single coherent one, plus translation-parity and code-correctness fixes
  (see CHANGELOG.md and MASTER_PLAN.md for the per-pattern breakdown).
- All code comments stripped from every pattern's `implementation` code
  samples (23 patterns × 5 languages) to match the project's minimal-
  comments standard.
- Previous/next pattern navigation added to the pattern detail page
  (`src/pages/PatternDetailPage.js`), shown below Related Patterns,
  computed from list order in `src/data/patterns/index.json`, hides
  gracefully at the first/last pattern, fully localized (EN/RU), styled
  in `src/styles/components/page-pattern-detail.css`.

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

Current focus: Phase 13 — Interactive Learning (Phase 12 closed 2026-07-28; all 23 patterns have bespoke diagrams and animated interactive scenes).

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
