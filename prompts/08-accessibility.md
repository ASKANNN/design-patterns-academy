# Accessibility Task

Version: 1.0

---

# Purpose

Use this prompt when auditing or improving accessibility.

---

# Context to Read

Before starting, read:

* `docs/quality/ACCESSIBILITY.md`
* the target component or page and its markup

---

# Task

Improve accessibility toward WCAG 2.1 AA:

* semantic HTML, correct roles, and accessible names;
* full keyboard operability and visible focus;
* correct `aria-*` usage and live regions where needed.

---

# Rules

* Prefer semantic HTML before ARIA.
* Every interactive element is keyboard reachable and usable.
* Icon-only controls get localized `aria-label` (`data-i18n-aria-label`).
* Respect `prefers-reduced-motion`.
* Verify contrast in light and dark themes.
* Never rely on color alone to convey meaning.

---

# Definition of Done

* Keyboard-only flow works (tab order, Enter/Escape, focus trap where needed).
* Screen-reader tested on the primary flow.
* Contrast passes in both themes.
* Follow `prompts/99-development-workflow.md` for review and reporting.
