# ACCESSIBILITY

Version: 1.0

---

# Purpose

This document defines the accessibility (a11y) standards for Design Patterns
Academy. The target is **WCAG 2.1 AA**.

Accessibility is not a final pass — it is authored into every component and page.

---

# Core Requirements

- **Semantic HTML first.** Use real `<a>`, `<button>`, `<nav>`, `<main>`,
  headings, and lists before reaching for ARIA.
- **Keyboard operable.** Every interactive element must be reachable and usable
  with the keyboard alone. Modals trap focus and restore it on close
  (`src/scripts/ui.js`).
- **Visible focus.** Never remove focus outlines without an equally clear
  replacement.
- **Skip link.** `index.html` provides a "Skip to content" link targeting
  `#main-content`.

---

# ARIA & Labels

- Icon-only controls carry an accessible name via `aria-label` (localized with
  `data-i18n-aria-label`).
- Live regions use `role="status"` / `aria-live` — e.g. the route loading
  spinner announces `a11y.loading`.
- The active navigation item is marked with `aria-current="page"`
  (`_markActiveLinks` in `src/scripts/router.js`).
- Decorative SVGs use `aria-hidden="true"`; meaningful ones get a label.

All a11y strings live under the `a11y.*` keys — see
[LOCALIZATION.md](../development/LOCALIZATION.md).

---

# Color & Contrast

- Text and essential UI must meet **4.5:1** contrast (3:1 for large text).
- Verify both **light and dark** themes (`data-theme` on `<html>`).
- Never rely on color alone to convey meaning — pair it with text or an icon.

---

# Motion

- Entrance and transition animations must respect
  `prefers-reduced-motion: reduce`.
- No essential information may depend on motion.

---

# Authoring Checklist

- [ ] Works with keyboard only (tab order, Enter/Escape, focus trap where needed)
- [ ] All controls have accessible names
- [ ] Headings form a logical outline (no skipped levels)
- [ ] Images/SVGs are labeled or hidden appropriately
- [ ] Contrast passes in light and dark themes
- [ ] Reduced-motion is honored
- [ ] Tested with a screen reader on the primary flow

---

# Related Documents

- [Components](../development/COMPONENTS.md)
- [Design System](../development/DESIGN_SYSTEM.md)
