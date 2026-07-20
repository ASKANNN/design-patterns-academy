# Design System Task

Version: 1.0

---

# Purpose

Use this prompt when working on design tokens, theming, or global visual
foundations.

---

# Context to Read

Before starting, read:

* `docs/development/DESIGN_SYSTEM.md`
* `src/styles/base/tokens.css`
* `src/styles/themes/`
* `src/config/theme.js`

---

# Task

Implement or adjust design-system foundations only:

* color, spacing, typography, radius, shadow, and motion tokens;
* light and dark theme values (`data-theme` on `<html>`);
* shared base styles.

Describe exactly what you will change before editing.

---

# Rules

* Change tokens, never hardcode raw values in components.
* Keep light and dark themes in parity.
* Do not restyle individual components in this task — that belongs to the
  component task.
* Preserve existing token names unless renaming is explicitly requested.
* Verify contrast meets WCAG AA in both themes.

---

# Definition of Done

* Tokens defined once and reused.
* Both themes render correctly.
* No unrelated files changed.
* Follow `prompts/99-development-workflow.md` for review and reporting.
