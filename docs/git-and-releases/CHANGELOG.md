# Changelog

All notable changes to Design Patterns Academy are documented in this file.

## [Unreleased]

### Added

- Migrated from hash routing to History API routing (`/patterns/adapter`, no
  `#`): per-route dynamic `<title>`/meta description/canonical/OG/Twitter
  tags, Playwright-based prerendering (`scripts/prerender.mjs`, built on
  GitHub Actions since Vercel's own build containers lack the shared
  libraries Playwright's Chromium needs) so crawlers see real HTML instead
  of an empty shell, JSON-LD structured data per pattern, updated
  `sitemap.xml`/`robots.txt`, and Google Search Console verification —
  hash routing previously collapsed every page into one URL with identical
  metadata, blocking real SEO regardless of content quality
- Quizzes — reusable `Quiz` component (`src/components/ui/Quiz.js`), 10
  bilingual questions per pattern drawn only from facts already stated
  elsewhere in that pattern's own JSON, Fisher–Yates-shuffled question and
  option order every render, tiered pass/warn/fail results screen — shipped
  for all 23 patterns
- Interactive code walkthroughs — step-by-step line highlighting layered
  over `CodeBlock` (`src/components/ui/Walkthrough.js`), JavaScript +
  Python, side-by-side sticky layout that collapses to a stacked column
  under 860px — shipped for all 23 patterns
- Pattern playgrounds — sandboxed `iframe` + `Function()` execution for
  JavaScript/TypeScript (`src/components/ui/Playground.js`, editor +
  console panes, Run/Reset/Clear), TypeScript stripped via a small
  regex-based `strip-types.js`; Java/C#/Python stay read-only — shipped
  for all 23 patterns
- Advanced search — matches pattern aliases via `also_known_as` (e.g.
  "Wrapper" now finds Adapter/Decorator), filter logic deduped into a
  single `src/utils/search.js` shared by the search page and live-typing
- Favorites — localStorage-backed star toggle on every `PatternCard`, new
  `/favorites` page
- Progress tracking — localStorage-backed, manual "Mark as completed"
  toggle on the pattern detail page, checkmark badge on cards everywhere
  they're reused, completion counter/bar on `/roadmap`
- Learning Roadmap — new `/roadmap` page, one fixed recommended path
  across all 23 patterns ordered by category → complexity → popularity
- Sound effects — synthesized Web Audio tones for navigation clicks and
  quiz correct/incorrect answers, toggle inside the existing accessibility
  widget (`soundEffects`, default on, no external audio assets)
- Dockable accessibility-widget trigger — slides mostly off-screen after
  page load, peeks back on hover/tap, undocks on real keyboard focus or
  while its own panel is open
- Screen-reader live region + `announce()` helper confirming
  favorite/progress toggles out loud
- Dark theme as the default (was light)
- Previous/next pattern navigation on the pattern detail page, rendered below
  Related Patterns; computed from list order in `src/data/patterns/index.json`,
  hides gracefully at the first/last pattern, full ru/en i18n
- Completed all 23 GoF pattern content pages (Creational 5/5, Structural 7/7,
  Behavioral 11/11), English and Russian
- Phase 12 Visual Learning infrastructure: Diagram Engine, Timeline Engine,
  Visual Engine, Pattern Icon System, Animation Primitives
- Bespoke pattern visualizations (own semantic layout, not the generic
  fallback): Decorator (`nested`), Facade (`facade`), Flyweight (`pool`),
  Proxy (`gateway`), Chain of Responsibility (`chain`), Command (`command`),
  Interpreter (`expression`), Iterator (`cursor`), Mediator (`hub`),
  Memento (`memento`), Observer (`broadcast`), State (`state`),
  Strategy (`slot`), Template Method (`skeleton`), Visitor (`dispatch`),
  Factory Method (`override`), Abstract Factory (`family`),
  Builder (`assembly`), Prototype (`mirror`), Adapter (`translate`),
  Bridge (`span`), Composite (`tree`) — 23/23 patterns now bespoke; no
  patterns render the generic fallback layout
- Redesigned favicon to reuse the header's hex/blueprint brand mark (replacing
  the unrelated "D" monogram)
- Enhanced route transition with a subtle dissolve (blur + scale) effect
- Scroll-to-top button that appears near the footer
- Accessibility widget with font size, contrast, monochrome, and link controls

### Fixed

- Stabilized the GitHub Actions → Vercel deploy pipeline: build+prerender
  now run on GitHub Actions, fixed prerender navigation timeouts/hangs with
  a watchdog, pinned the Node engine to match Vercel's project settings,
  launched Chromium with `--no-sandbox` for CI containers, replaced a flaky
  stdout text-match with HTTP polling for server readiness, corrected
  `VERCEL_TOKEN` scope, and regenerated `package-lock.json` to fix `npm ci`
  mismatches
- Safari/touch tab bar: fixed horizontal overflow (missing `min-width: 0`
  on the tab list), restricted touch-panning gestures to the tab bar, and
  moved `touch-action` onto the tab buttons themselves (not just the list)
- Mobile: strengthened diagram glow on WebKit, stacked the pattern-group
  list, aligned filter chips
- Accessibility widget: fixed a WebKit double-tap bug and restored touch
  docking; kept the trigger reachable on touch devices
- The global inline `code {}` rule (border/padding/radius meant for
  `` `inline code` ``) was leaking onto `.code-block__code`, shrinking the
  highlighted walkthrough line and showing a stray box on mobile
- Pattern detail: separated the "in the diagram" note from participant
  role text; stopped the progress badge dot from misaligning language tabs
- Mobile nav burger menu now closes on link click; router gates the app's
  first paint on the first route render instead of flashing unstyled
  content
- Previous/next pattern navigation now follows Learning Roadmap order when
  arriving from that page
- Canonical/OG/sitemap/robots repointed at the live Vercel URL after a
  domain change
- Fixed `diagram.css`'s always-on ambient glow on the emphasis/dispatch card
  (`.diagram__card--emphasis`, `.diagram__dispatch`, `core-breathe` keyframes)
  being nearly invisible on phones: `drop-shadow` blur on SVG children scales
  with the viewBox, not real screen pixels, so the same px values that read
  fine on desktop shrank to a third of their size at phone viewBox scale;
  added a `max-width: 640px` override with blur increased to compensate,
  for both light and dark themes
- Fixed arrival-gated glow in `VisualEngine` relying on a single
  last-created packet dot: in timeline steps that fan out several impulses
  at once (Observer's broadcast to subscribers, Mediator's route to
  connected colleagues), every target card now waits for its *own*
  branch's packet to actually arrive instead of being gated by whichever
  dot happened to be created last; falls back to waiting for all packets
  in the step when packet/target counts don't line up 1:1
- Rewrote English pattern content in original wording
- Fixed Russian-language calques (literal English-to-Russian translations)
  across all 23 pattern JSON files
- Fixed packet/impulse occlusion and row-centering issues in Command,
  Decorator, and Proxy diagrams
- Flyweight: removed a duplicate reuse impulse and a dangling client
  request so the pool animation fires exactly two client requests and two
  factory→flyweight impulses (Oak create, Pine create); fanned out the
  Factory→Oak/Pine flow paths so they no longer visually overlap; the
  Factory card now lights up immediately on request arrival instead of
  after a delay
- Restored a corrupted "Cursor" identifier in Iterator/Memento pattern data
- Darkened the light-theme diagram viewport background so node cards no
  longer blend into it (`--color-bg-surface` and `--color-bg-elevated`
  were identical in the light palette)
- Interpreter: rendered the entry-edge label (`interpret(context)`) and
  added a final "= 13" result badge on the Client card, and rewrote the
  `intent` copy to lead with the worked example instead of abstract phrasing
- Content-consistency audit across all 23 patterns: reconciled cases where a
  pattern's `problem`/`solution`/`structure.participants`/`implementation`/
  diagram described different worked examples instead of one coherent
  example (Factory Method, Builder, Prototype, Adapter, Bridge, Composite,
  Facade, Chain of Responsibility, Iterator, State, Abstract Factory,
  Mediator, Strategy, Observer — see MASTER_PLAN.md for the per-pattern
  breakdown)
- Fixed stale/incorrect content found in a deeper translation-parity and
  code-correctness pass: Interpreter's stale `intent.ru`, an invalid C#
  `sealed` modifier in Template Method, Facade's mismatched `problem` text,
  and stale diagram labels in Adapter, Composite, Bridge, and Visitor

### Changed

- Split the `ui.js` "god module" into focused modules under
  `src/scripts/interactions/`; converted CSS to mobile-first
- Replaced the accordion's CSS `max-height` toggle with a JS-driven
  animated collapse
- Lazy-render off-screen code panels on tab switch (performance)
- Stripped narrative/redundant comments across `src/` in favor of
  self-documenting code
- Stripped all code comments from every pattern's `implementation` code
  samples (all 5 languages × 23 patterns) — teaching-code samples on the
  Implementation tab are now comment-free, matching the project's minimal-
  comments standard already applied to app source

### Removed

- Dead toggle CSS left over after closing Phase 13
- 17 unused UI-kit primitives from Phase 4 that were never wired into any
  page: `Card`, `Checkbox`, `Chip`, `CopyButton`, `Divider`, `Input`,
  `Modal`, `Pagination`, `ProgressBar`, `Radio`, `Select`, `Skeleton`,
  `Spinner`, `Tag`, `TextArea`, `TextField`, `Toggle`
- Dead handlers in `src/scripts/ui.js` that only existed to support the
  removed `Modal`/`Tag`/`CopyButton` components (modal open/close/focus
  trap, tag-remove, the unused `data-copy` branch of the copy handler)

See [MASTER_PLAN.md](../project-management/MASTER_PLAN.md) for the current
per-pattern visual coverage status.
