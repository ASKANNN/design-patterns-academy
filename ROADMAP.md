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
- [x] Badge
- [x] CodeBlock (syntax highlighted)
- [x] Tabs
- [x] Tooltip
- [x] Search
- [x] Theme toggle
- [x] Language switcher

Note (2026-07-31): Card, Modal, Pagination, and other kit primitives built
speculatively in this phase were never wired into any page and were removed
as dead code during a codebase audit. Build only what a page actually uses.

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

- [x] GitHub Actions CI/CD pipeline
- [x] Vercel deployment configuration (prebuilt output deployed via CLI,
      build itself runs on GitHub Actions — Vercel's own build container
      lacks the shared libraries Playwright's Chromium needs)
- [x] sitemap.xml
- [x] robots.txt
- [x] PWA manifest
- [x] Open Graph meta tags
- [x] Verified live production deployment
      (`https://askan-de-pa-ac.vercel.app`)

### Search Engine Indexability (2026-08-01) — done

Hash routing (`#/catalog`, one static `<title>`/`description`/OG block,
fully client-rendered `<div id="app">`) collapsed every page into one URL
with identical metadata, and `sitemap.xml` listed hash URLs Google would
not treat as distinct pages — this blocked any real SEO ranking regardless
of content quality.

- [x] Migrate from hash routing to History API routing (`/patterns/adapter`, no `#`)
- [x] Per-route dynamic `<title>`, `meta description`, canonical, `og:*`/Twitter tags
- [x] Prerender via Playwright (`scripts/prerender.mjs`) so crawlers see real
      HTML content, not an empty shell — built on GitHub Actions (Ubuntu),
      deployed prebuilt to Vercel
- [x] JSON-LD structured data per pattern (`TechArticle` / `BreadcrumbList`)
- [x] Unique `<h1>` per page (not just the global site title)
- [x] Updated `lastmod` dates in `sitemap.xml` to real values
- [x] Registered site + submitted sitemap in Google Search Console
      (ownership verified via `public/google27f15fcbbc0bee4a.html`)

**Known gap:** indexing is a waiting game (days to a few weeks) and the
domain has no backlink authority yet — see Phase 14 for the custom-domain
follow-up, which will need a redirect from the `vercel.app` address and
re-verification in Search Console once it lands.

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

## Phase 13 — Interactive Learning ✅

> **Sequencing decision (2026-07-28, agreed with owner):** build order is
> **Quizzes → Code walkthroughs → Pattern playgrounds**, not the order
> listed below (that order is the target-state checklist, not the build
> order). Quizzes go first because they need no sandboxing/execution
> architecture and can be shipped across all 23 patterns fastest. Each
> sub-feature starts with Singleton only (the existing Gold Standard
> pattern), stops for owner review, and only then rolls out to the
> remaining 22 — same process used for the Phase 12 Diagram Engine.

- [x] Quizzes — reusable `Quiz` UI component (`src/components/ui/Quiz.js`)
      + a `quiz` array field on the pattern JSON (`question`/`hint`/`options`/
      `correct`/`explanation`, all bilingual). **Content scope decision
      (2026-07-28, revised 2026-08-02):** 10 questions per pattern, drawn
      only from facts already stated elsewhere in that pattern's own JSON
      (intent/cons/implementation) — no new claims introduced by a quiz.
      Shipped for **all 23 patterns**. The engine also
      Fisher–Yates-shuffles question order and option order on every
      render, so the correct answer never sits in a fixed slot and the
      first question isn't reliably answerable from the hero paragraph
      alone (fixed 2026-07-28 after an owner review caught both issues).
      Results screen shows three tiers by score ratio: a celebratory pass
      message (>=70% correct, with a distinct "perfect score" variant), an
      encouraging "getting there" warn message (40-69%), or a professional
      encouraging retry message on fail (<40%) — added 2026-08-02 after an
      owner review flagged bland pass/fail feedback and overly obvious/vague
      hints in the shipped question bank, with the warn tier added the same
      day to soften the binary pass/fail jump.
- [x] Interactive code walkthroughs — step-by-step line highlighting +
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
      TypeScript/Java/C# walkthroughs. **Rollout complete (2026-07-31):**
      Creational (Abstract Factory, Builder, Factory Method, Prototype
      alongside the Singleton pilot, 5/23), Structural (Adapter, Bridge,
      Composite, Decorator, Facade, Flyweight, Proxy, 12/23), and
      Behavioral (Chain of Responsibility, Command, Interpreter, Iterator,
      Mediator, Memento, Observer, State, Strategy, Template Method,
      Visitor, 23/23) all done. Every category was verified with a headless
      Playwright script (Implementation tab opens, JS+Python badges present
      with no TypeScript leakage, "Next step" changes the highlighted
      range, zero console errors) and owner-reviewed by eye in the browser.
- [x] Pattern playgrounds — **scope decision (2026-07-28):** executable
      only for JavaScript/TypeScript, via a sandboxed iframe +
      `Function()` (no real TS type-checking, just transpile-free
      execution). Java/C#/Python stay read-only `CodeBlock` display,
      unchanged — no step-through mode for them at launch. A heavier
      WASM runtime for other languages was considered and rejected as
      disproportionate to this project's zero-runtime-deps principle;
      revisit only if explicitly requested later. **Pilot shipped on
      Singleton (2026-07-31):** new `src/components/ui/Playground.js`
      (editor + console panes, Run/Reset/Clear) rendered in a new
      "Playground" tab on `PatternDetailPage`, reusing `implementation.
      javascript`/`typescript` as starter code — no new JSON field.
      Execution runs in an `iframe` with `sandbox="allow-scripts"` (no
      `allow-same-origin`, so the sandboxed code cannot reach the app's
      DOM, cookies, or storage); `console.log/info/warn/error` and thrown
      errors are relayed to the parent via `postMessage` and rendered as
      console lines. TypeScript is run through a small regex-based
      `stripTypes()` (`src/utils/strip-types.js`) that removes access
      modifiers and type annotations before execution — works for the
      simple class-based samples in this project, not a general TS
      parser. Verified with a headless Playwright script (run, edit +
      re-run, reset restores the original byte-for-byte, thrown errors
      render in red, TypeScript sample runs after stripping, zero console
      errors) and owner-reviewed in the browser. **Rollout complete
      (2026-07-31):** a headless Playwright sweep across all 23 patterns'
      JS+TS tabs surfaced real gaps in `stripTypes()` that Singleton's
      simple sample never exercised — missing `interface`/`abstract`/
      `implements` handling, unstripped generic type args (`new
      Map<string, T>()`), and (most notably) TS constructor
      parameter-property shorthand (`constructor(private x: number)`)
      silently dropping its implicit `this.x = x` assignment. All fixed
      in `strip-types.js` only, with zero console errors across all 23
      patterns afterward. Manual owner testing also caught two UX gaps
      fixed the same session: `print()`/`alert()`/`confirm()`/`prompt()`/
      `window.open()` inside the sandbox were silently swallowed (no
      `allow-modals`) — now relay a localized warning to the console pane
      instead; and code-surface text selection was nearly invisible in
      both themes — added a dedicated `--code-selection-bg` token and a
      `::selection` rule scoped to `.code-block`/`.playground__textarea`.
      **Owner visual-review fixes (2026-07-31):** disabled the
      `.playground__textarea` resize handle (`resize: none`) — the drag
      cursor appeared but did nothing useful, clipped by the pane's
      `overflow: hidden`. Walkthrough step cards no longer jump in height
      between steps (`.walkthrough__steps` uses CSS grid stacking so the
      container's height tracks the tallest step, all hidden via
      `visibility: hidden` not `display: none`). The active code range in
      the Implementation tab walkthrough now auto-scrolls to stay
      vertically centered on every step, scoped strictly to the
      `.code-block__body` scroll container (`getBoundingClientRect()` +
      `scrollTo`, not `scrollIntoView`, which was found to scroll the
      whole page/header out of view). Also fixed the light/dark theme
      toggle transition: crossfading `color` alongside `background-color`
      produced an unreadable muddy-gray midpoint, so `color` now swaps
      instantly while background/border still transition smoothly.
> **Deferred (2026-07-31, agreed with owner):** "Practical exercises" has
> no agreed spec (task format, auto-check behavior, scoring — none of it
> was ever defined), unlike quizzes/walkthroughs/playgrounds which each
> started with an explicit scope decision before build. Owner confirmed
> quizzes, walkthroughs, and playgrounds are manually tested and approved
> across all 23 patterns. **Phase 13 is closed on that basis** — practical
> exercises is deferred, not discarded; picking it up later requires its
> own scope discussion first, same handling as the deferred per-pattern
> illustrations idea under Phase 14.

---

## Phase 14 — Platform Improvements

- [ ] Custom domain (buy + connect in Vercel, update `SITE_URL` in
      `src/config/site.js` and every place that references the domain,
      301-redirect the old `vercel.app` address, re-verify in Google Search
      Console and resubmit `sitemap.xml` under the new domain). **Deferred
      to the end of Phase 14 (2026-08-01, owner decision)** — no domain
      purchased yet; the other Phase 14 items don't depend on it.
- [x] Advanced search — search previously matched only `name`/`category`/
      `summary`/`tags` from `index.json`, so alias queries like "Wrapper"
      (Adapter, Decorator) or "Kit" (Abstract Factory) returned nothing.
      Added `also_known_as` to every entry in `index.json` (mirrored from
      each pattern's own JSON) and included it in the match fields. Also
      deduped the filter logic itself: `SearchPage.js` and `ui.js`'s
      live-typing handler each had their own copy of the same filter
      function; both now call a single `src/utils/search.js`
      (`searchPatterns(patterns, query)`), following the pure-function,
      no-DOM shape of `src/utils/roadmap.js`. **Scope decision
      (2026-08-01, owner-picked over adding category/complexity filter
      chips):** text-matching improvements only, no new filter UI — kept
      for a possible later iteration if requested. Verified with
      Playwright: alias queries resolve on both the `/search?q=` and
      live-typing paths, zero console errors.
- [x] Favorites — localStorage-backed (`src/utils/favorites.js`,
      key `dpa-favorites`), toggled via a star button added to every
      `PatternCard` (works everywhere the card is reused: catalog,
      search, roadmap, favorites itself). New `/favorites` page
      (`src/pages/FavoritesPage.js`) lists saved patterns; unfavoriting
      a card on that page removes it in place and falls back to an
      empty state once the list is empty, without a full re-render.
      Added the "Favorites" nav entry (desktop + mobile), breadcrumbs,
      router page-meta, and bilingual EN/RU strings. **Deliberately
      left out of `scripts/prerender.mjs` and `public/sitemap.xml`**
      (unlike `/roadmap` and `/search`) — the page has no content that
      is the same for two visitors, so there is nothing canonical for a
      crawler to index. Verified with Playwright: add/remove favorite,
      persistence, live list update, empty state, and confirmed the
      star button does not trigger the card's own navigation.
      **Incidental fix found while building the empty state:** `.btn`
      requires a size modifier (`btn--sm`/`btn--md`/`btn--lg`) for
      height/padding — `SearchPage.js` and `PatternDetailPage.js` used
      bare `btn btn--primary`, which collapsed the button to hug its
      text with no padding. Fixed in all four call sites.
- [x] Progress tracking — localStorage-backed (`src/utils/progress.js`,
      key `dpa-progress`, same shape as `favorites.js`). **Scope decision
      (2026-08-01, owner-picked):** completion is a manual, explicit
      action (a "Mark as completed" toggle on `PatternDetailPage`, in the
      stats row) rather than inferred from page visits or quiz/playground
      activity — same reasoning as the Favorites star: predictable and
      simple over a heuristic that could feel wrong to the learner.
      Toggling fires `dpa:progress-changed` and updates the button's
      label/`aria-pressed` in place. Completed patterns get a green
      checkmark badge (`pattern-card__completed-badge`, `data-progress-
      indicator`) on `PatternCard`, visible wherever cards are reused
      (catalog, search, favorites, roadmap). `/roadmap` gained a
      `X of 23 patterns completed` counter with a bar, reusing the
      existing unused `.progress`/`.progress-wrap` CSS component from
      `feedback.css` instead of inventing new markup. No new page and no
      prerender/sitemap changes — the same reasoning as Favorites applies
      (nothing canonical to index; the roadmap route itself was already
      prerendered). Bilingual EN/RU strings added under a new `progress`
      namespace in `ui.json`. Verified with a headless Playwright script
      across light/dark and EN/RU: toggle on the detail page, badge
      appears on catalog and roadmap cards, roadmap counter/bar update
      and reset correctly, zero console errors.
- [x] Learning roadmap — new `/roadmap` page (`src/pages/RoadmapPage.js`).
      **Scope decision (2026-08-01, owner-picked over the alternatives):**
      one fixed recommended path for all 23 patterns, no personalization
      (that's deferred to Progress tracking, which may build a personal
      variant on top later). Order is fully data-driven off existing
      `index.json` fields (`src/utils/roadmap.js`) — grouped by category
      in GoF book order (creational → structural → behavioral), then
      sorted ascending by `complexity` and descending by `popularity`
      within each group; no new hand-picked ordering field was added.
      Steps are numbered continuously 1-23 across all three sections.
      Reuses the existing `PatternCard` component wrapped in a numbered
      timeline (`page-roadmap.css`) rather than inventing new card markup.
      Added to desktop + mobile nav, breadcrumbs, router page-meta,
      `scripts/prerender.mjs`, and `public/sitemap.xml`; bilingual
      EN/RU strings added to `ui.json`. Verified with Playwright across
      desktop/mobile/dark-mode/RU — zero console errors, all 23 pattern
      links resolve, step numbering confirmed continuous.
- [x] User experience improvements — **scope decision (2026-08-01, owner
      said "do what's needed, do it right"):** ran a research-only UX
      survey of the shipped app (accessibility, empty/loading states,
      mobile responsiveness, navigation polish, small friction points).
      Existing a11y for quiz/tabs/accordion/tooltips was already solid
      (`aria-expanded`/`aria-selected`/`aria-pressed`, `focus-visible`,
      `prefers-reduced-motion`); fixed the 5 concrete gaps found:
      (1) focus wasn't moved to `#main-content` on route change even
      though the markup already had `tabindex="-1"` waiting for it
      (`router.js`); (2) Roadmap page had no completion state for
      finishing all 23 patterns, unlike Favorites/Search
      (`RoadmapPage.js`, new `roadmap.complete_title`/`complete_desc`
      keys); (3) favoriting/marking-complete only flipped `aria-pressed`
      with no screen-reader confirmation — added a shared `#live-region`
      (`AppLayout.js`) and an `announce()` helper (`ui.js`) used by both
      toggles, matching the pattern Quiz already used; (4) copy-to-code
      button silently swallowed clipboard failures — now shows an error
      state + announces it; (5) bumped the search-as-you-type debounce
      from 150ms to 250ms. Deferred as lower-confidence/visual-only:
      Playground/Walkthrough's single 860px breakpoint and a Playground
      "running…" affordance — revisit only if an owner review flags them
      on a real tablet viewport. Verified with a Playwright script:
      focus lands on `#main-content` after navigation, live-region text
      updates on favorite/progress toggle, roadmap completion banner
      renders at 23/23 — zero console errors.
      **Follow-up (2026-08-01):** added an optional click sound when
      navigating to a pattern detail page (short synthesized tone via
      Web Audio API, `src/utils/sound.js` — no external audio asset).
      Discovered mid-conversation that a floating accessibility-settings
      widget already existed (`AccessibilityWidget.js`, corner button
      with font-size/contrast/monochrome/readable-font/underline-links
      toggles, `dpa-a11y` in localStorage) — the new `soundEffects`
      toggle (default **on**) was added as another switch row inside
      that existing panel instead of a new standalone control, for
      consistency. The single global link-click interceptor in
      `router.js` triggers the sound for any click on a
      `/patterns/:category/:slug` link, so it works from every pattern
      card site-wide with no per-component wiring. Verified with a
      Playwright script that stubs `AudioContext`: sound fires on by
      default, the panel switch reflects and toggles state, disabling it
      silences clicks, the choice persists across reload, and clicking
      non-pattern links never triggers it — zero console errors.
      **Follow-up (2026-08-02):** expanded the sound system beyond pattern
      links — general internal navigation (navbar, "Browse all patterns",
      etc.) now plays a soft filtered click (`playClickTick`), opening a
      pattern card plays a deeper "locks into place" click
      (`playSelectClick`, noise-burst + low tone), and the quiz now plays a
      three-note success chime on a correct answer vs. a muted double-thud
      on an incorrect one (`playSuccessChime` / `playErrorTone`,
      `scripts/interactions/quiz.js`). All tones were iterated for a
      softer, more muted character per owner listening feedback (lower
      gain peaks, lower lowpass cutoffs) — same `soundEffects` toggle
      gates all of them. Also fixed an unrelated bug found while reviewing
      the walkthrough code panel: the global inline `code {}` rule
      (border + padding + border-radius, meant for `` `inline code` ``)
      was leaking onto `.code-block__code`, shrinking the highlighted
      walkthrough line background by 7px on each side and showing as a
      stray vertical line/box on mobile — reset those properties on
      `.code-block__code` specifically (`code-block.css`).

**Follow-up (2026-08-01) — dockable accessibility button.** Scoped to the
accessibility widget trigger only ("back to top" was left untouched). On
page load the circular trigger is fully visible, then after ~1.4s slides
almost entirely off-screen to the right, leaving only a small angular
purple arrow tab (`.a11y-dock__tab`) poking out at the bottom-right edge.
Hovering the dock (desktop) or tapping the tab peeks the full circle back
into view via a pure-CSS `:hover`/`:focus-within` rule — the docked state
itself never changes on hover, only the trigger's visual position, so the
tab never vanishes out from under the cursor mid-click. The tab stays
visible and clickable in both states and toggles docking manually in
either direction (its chevron flips 180° to hint direction); scrolling
docks immediately; opening the accessibility panel force-undocks and
suspends auto-redock until the panel closes; real keyboard `Tab` focus
(tracked via explicit `keydown`/`pointerdown` modality, not the unreliable
`:focus-visible`) also undocks it. Implementation lives entirely in
`AccessibilityWidget.js` + `accessibility-widget.css` — no shared/generic
module, since only one consumer needed this behavior. Verified with a
Playwright script covering desktop (load-reveal, idle-dock, hover-peek
without undocking, manual tab-toggle both directions, panel-open
suspends redock, real keyboard-focus undock) and mobile (tap-to-reveal,
tap-to-activate) — zero console errors.

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
