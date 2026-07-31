# Changelog

All notable changes to Design Patterns Academy are documented in this file.

## [Unreleased]

### Added

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

- Stripped narrative/redundant comments across `src/` in favor of
  self-documenting code
- Stripped all code comments from every pattern's `implementation` code
  samples (all 5 languages × 23 patterns) — teaching-code samples on the
  Implementation tab are now comment-free, matching the project's minimal-
  comments standard already applied to app source

### Removed

- 17 unused UI-kit primitives from Phase 4 that were never wired into any
  page: `Card`, `Checkbox`, `Chip`, `CopyButton`, `Divider`, `Input`,
  `Modal`, `Pagination`, `ProgressBar`, `Radio`, `Select`, `Skeleton`,
  `Spinner`, `Tag`, `TextArea`, `TextField`, `Toggle`
- Dead handlers in `src/scripts/ui.js` that only existed to support the
  removed `Modal`/`Tag`/`CopyButton` components (modal open/close/focus
  trap, tag-remove, the unused `data-copy` branch of the copy handler)

See [MASTER_PLAN.md](../project-management/MASTER_PLAN.md) for the current
per-pattern visual coverage status.
