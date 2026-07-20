# Phase Workflow

Version: 1.0

---

# Purpose

This document defines the standard development workflow for every contributor working on this repository.

Its purpose is to ensure that all work follows the same engineering process regardless of the tool or environment being used.

---

# General Rule

One task.

One scope.

One review.

One completion.

Stop.

Never continue automatically.

---

# Standard Workflow

Every task must follow this exact sequence.

## Step 1 — Read the Project State

Before doing anything:

* Read `README.md`
* Read `ROADMAP.md`
* Read `docs/project-management/PROJECT_STATE.md`
* Read `docs/project-management/ENGINEERING_GUIDE.md`
* Read `docs/project-management/OWNER_GUIDE.md`

Understand:

* current phase;
* project status;
* approved architecture;
* existing workflow.

---

## Step 2 — Understand the Task

Do not start coding immediately.

Determine:

* what the user requested;
* which files are affected;
* whether the request belongs to the current roadmap phase.

If the request is ambiguous, ask for clarification before implementation.

---

## Step 3 — Define the Scope

Modify only what is required.

Never:

* redesign unrelated code;
* rename files without approval;
* reorganize folders;
* implement future roadmap items.

Keep the scope as small as possible.

---

## Step 4 — Implement

While implementing:

* follow SOLID;
* follow DRY;
* follow KISS;
* follow YAGNI;
* write production-quality code;
* reuse existing components;
* maintain consistency.

Do not introduce unnecessary complexity.

---

## Step 5 — Self Review

Before considering the task complete, verify:

* code is consistent;
* no unrelated files were modified;
* naming conventions remain consistent;
* architecture has not been changed;
* implementation matches the requested scope.

---

## Step 6 — Report

When implementation is complete:

Provide a concise summary including:

* files created;
* files modified;
* major changes;
* anything requiring attention.

Do not include unnecessary explanations.

---

## Step 7 — Stop

After reporting:

STOP.

Do not continue.

Wait for the owner's approval.

Never begin the next task automatically.

---

# Documentation Rules

Update documentation only if the completed task requires it.

Examples:

* update `PROJECT_STATE.md` after completing a roadmap phase;
* update `CHANGELOG.md` when preparing a release;
* update component documentation only if components changed.

Never update unrelated documentation.

---

# Git Rules

Do not perform Git operations unless explicitly requested.

If requested:

1. Verify the task is complete.
2. Verify the repository is in a consistent state.
3. Stage only the required files.
4. Create one logical commit.
5. Push only after approval when requested.

---

# Review Workflow

If reviewing existing work:

1. Read the current phase.
2. Compare implementation with roadmap goals.
3. Report only real issues.
4. Do not request unrelated improvements.
5. Approve if the phase objectives are satisfied.

---

# Handling New Ideas

If a better idea is discovered during implementation:

Do not implement it immediately.

Instead:

* mention it separately;
* explain why it may be useful;
* wait for approval.

Never expand the scope without permission.

---

# Error Handling

If required information is missing:

Stop.

Explain what is missing.

Request only the minimum clarification required.

Never guess repository structure or architectural decisions.

---

# Success Criteria

A task is considered complete when:

* requested functionality is implemented;
* architecture is preserved;
* scope is respected;
* documentation is updated only if necessary;
* no unrelated files were changed;
* implementation is ready for review.

Completion is defined by correctness and consistency, not by the amount of generated code.

---

# Final Rule

Respect the repository.

Respect previous decisions.

Respect the current phase.

Deliver only what was requested.

Then stop and wait.
