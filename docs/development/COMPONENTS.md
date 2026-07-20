# COMPONENTS

Version: 1.0

---

# Purpose

This document describes the component system of Design Patterns Academy and how
to add or reuse components.

---

# What Is a Component?

A component is a **pure function that returns an HTML string**. It takes a single
props object and never touches the DOM directly.

```js
// src/components/ui/Button.js
export function Button({ label, variant = 'primary', href = null, attrs = '' }) {
  const tag = href ? 'a' : 'button';
  ...
  return `<${tag} class="btn btn--${variant}" ...>${label}</${tag}>`;
}
```

Interactive behavior (event listeners, focus traps, etc.) is attached separately
in `src/scripts/ui.js` after the markup is in the DOM.

---

# Component Categories

| Folder                       | Purpose                                                  |
| ---------------------------- | -------------------------------------------------------- |
| `src/components/ui/`         | Generic, reusable primitives                              |
| `src/components/layout/`     | App chrome — `Header`, `Footer`, `Nav`                    |
| `src/components/patterns/`   | Pattern-specific pieces — e.g. `PatternCard`             |
| `src/components/visual/`     | Diagrams, timelines, icons, and the visual engine        |

## UI Primitives (`ui/`)

`Accordion`, `Alert`, `Badge`, `Breadcrumb`, `Button`, `Card`, `Checkbox`,
`Chip`, `CodeBlock`, `CopyButton`, `Divider`, `EmptyState`, `IconButton`,
`Input`, `Modal`, `Pagination`, `ProgressBar`, `Radio`, `SearchInput`, `Select`,
`Skeleton`, `Spinner`, `Tabs`, `Tag`, `TextArea`, `TextField`, `Toggle`,
`Tooltip`.

## Visual (`visual/`)

`Diagram`, `DiagramNode`, `DiagramEdge`, `Timeline`, `PatternIcon`,
`VisualEngine`, plus low-level helpers `svg-utils.js` and
`animation-primitives.js`.

---

# Conventions

- **One component per file**, named after the file (PascalCase export).
- **Props object, not positional args** — always destructure with defaults.
- **Return strings, never DOM nodes.** Rendering is `data → string → innerHTML`.
- **No inline event handlers in markup.** Wire behavior in `src/scripts/ui.js`.
- **Localize via `data-i18n` attributes**, not hardcoded copy — see
  [LOCALIZATION.md](LOCALIZATION.md).
- **Style with BEM-style classes** that map to `src/styles/components/`.
- **Accessibility is part of the component** — labels, roles, and `aria-*`
  attributes belong in the returned markup. See
  [ACCESSIBILITY.md](../quality/ACCESSIBILITY.md).

---

# Adding a New Component

1. Create `src/components/<category>/<Name>.js` exporting a single function.
2. Accept a props object with sensible defaults.
3. Return an accessible, localizable HTML string.
4. Add a matching stylesheet under `src/styles/components/` if needed.
5. If it needs interactivity, add the wiring in `src/scripts/ui.js`.
6. Reuse existing primitives before creating new ones (DRY).

---

# Related Documents

- [Architecture](ARCHITECTURE.md)
- [Design System](DESIGN_SYSTEM.md)
- [Localization](LOCALIZATION.md)
