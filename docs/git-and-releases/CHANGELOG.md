# Changelog

All notable changes to Design Patterns Academy are documented in this file.

## [Unreleased]

### Added

- Completed all 23 GoF pattern content pages (Creational 5/5, Structural 7/7,
  Behavioral 11/11), English and Russian
- Phase 12 Visual Learning infrastructure: Diagram Engine, Timeline Engine,
  Visual Engine, Pattern Icon System, Animation Primitives
- Bespoke pattern visualizations (own semantic layout, not the generic
  fallback): Decorator (`nested`), Facade (`facade`), Flyweight (`pool`),
  Proxy (`gateway`), Chain of Responsibility (`chain`), Command (`command`),
  Interpreter (`expression`)
- Redesigned favicon to reuse the header's hex/blueprint brand mark (replacing
  the unrelated "D" monogram)
- Enhanced route transition with a subtle dissolve (blur + scale) effect

### Fixed

- Rewrote English pattern content to remove third-party copyrighted material
- Fixed Russian-language calques (literal English-to-Russian translations)
  across all 23 pattern JSON files
- Fixed packet/impulse occlusion and row-centering issues in Command,
  Decorator, and Proxy diagrams
- Restored a corrupted "Cursor" identifier in Iterator/Memento pattern data
- Darkened the light-theme diagram viewport background so node cards no
  longer blend into it (`--color-bg-surface` and `--color-bg-elevated`
  were identical in the light palette)
- Interpreter: rendered the entry-edge label (`interpret(context)`) and
  added a final "= 13" result badge on the Client card, and rewrote the
  `intent` copy to lead with the worked example instead of abstract phrasing

### Changed

- Stripped narrative/redundant comments across `src/` in favor of
  self-documenting code

See [MASTER_PLAN.md](../project-management/MASTER_PLAN.md) for the current
per-pattern visual coverage status.
