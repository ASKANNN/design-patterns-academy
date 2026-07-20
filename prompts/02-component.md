# Component Task

Version: 1.0

---

# Purpose

Use this prompt when creating or modifying a reusable component.

---

# Context to Read

Before starting, read:

* `docs/development/COMPONENTS.md`
* `docs/development/DESIGN_SYSTEM.md`
* existing components in `src/components/ui/` for the established style

---

# Task

Create or edit a single component:

* a pure function that takes a props object and returns an HTML string;
* named after its file (PascalCase export);
* styled via a matching stylesheet in `src/styles/components/`;
* behavior (if any) wired in `src/scripts/ui.js`, not inline.

---

# Rules

* One component per file. Props object with sensible defaults.
* Reuse existing primitives before creating new ones (DRY).
* No hardcoded copy — use `data-i18n` / `t()` (see localization task).
* Accessibility is built in: roles, labels, keyboard support.
* Style with design tokens, never raw values.

---

# Definition of Done

* Component renders and is reusable.
* Accessible and localizable.
* Consistent with existing components.
* Follow `prompts/99-development-workflow.md` for review and reporting.
