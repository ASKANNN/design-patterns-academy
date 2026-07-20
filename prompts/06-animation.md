# Animation Task

Version: 1.0

---

# Purpose

Use this prompt when working on animations, transitions, or interactive visuals.

---

# Context to Read

Before starting, read:

* `src/scripts/animations.js`
* `src/components/visual/animation-primitives.js`
* `src/styles/base/animations.css`
* existing interactives in `src/scripts/interactives.js`

---

# Task

Implement or adjust motion:

* page transitions, entrance animations, or diagram/timeline interactivity;
* reuse existing primitives and timing helpers;
* keep animation logic out of markup.

---

# Rules

* Honor `prefers-reduced-motion: reduce` — no essential info depends on motion.
* Reuse shared timing so animations stay synchronized.
* Keep transforms/opacity-based animations for performance; avoid layout thrash.
* Do not introduce animation libraries.
* Keep effects subtle and purposeful, matching the premium tone.

---

# Definition of Done

* Animation is smooth and reduced-motion safe.
* No dropped frames or layout shift.
* Reuses existing primitives.
* Follow `prompts/99-development-workflow.md` for review and reporting.
