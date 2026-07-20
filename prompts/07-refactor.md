# Refactor Task

Version: 1.0

---

# Purpose

Use this prompt when improving existing code without changing behavior.

---

# Context to Read

Before starting, read:

* `docs/development/ARCHITECTURE.md`
* the files in the target area and their direct dependents

---

# Task

Refactor within a defined scope:

* remove duplication, clarify naming, extract shared config/helpers;
* preserve external behavior exactly;
* keep the change reviewable and minimal.

---

# Rules

* Behavior must not change — no new features in a refactor.
* Follow SOLID / DRY / KISS / YAGNI.
* Do not rename files, move folders, or restructure without approval.
* Update imports and references touched by the change.
* Keep the diff focused; do not reformat unrelated code.

---

# Definition of Done

* `npm run build` passes.
* Behavior verified unchanged.
* Duplication reduced, readability improved.
* No unrelated files changed.
* Follow `prompts/99-development-workflow.md` for review and reporting.
