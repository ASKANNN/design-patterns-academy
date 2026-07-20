# BRANCHING

Version: 1.0

---

# Purpose

This document defines the Git branching strategy used by this repository.

The workflow is intentionally simple during the early stages of the project.

As the project grows, the branching strategy can evolve without changing the development philosophy.

---

# Current Workflow

Current Team Size:

* One Product Owner / maintainer

Current Branch Strategy:

```text
main
feature/<name>
fix/<name>
```

Each unit of work (a pattern visual, a bug fix, a content audit) is done on a
short-lived `feature/*` or `fix/*` branch, then merged into `main` with a
merge commit once it passes QA. Branches are deleted after merge.

There is no `develop` branch and no Pull Request step — merges happen
locally (`git merge --no-ff`) and are pushed to `origin/main` directly by the
Product Owner. `gh` / GitHub PRs are not part of the current workflow.

---

# Current Development Process

Every completed task follows the same sequence.

```text
Task

↓

Branch (feature/* or fix/*)

↓

Implementation

↓

Review

↓

Approval

↓

Commit

↓

Merge into main

↓

Push

↓

Next Task
```

Only approved work is committed.

Never commit unfinished work intentionally.

---

# Why Feature/Fix Branches Instead of Main-Only?

At this stage:

* only one developer exists, so there is no coordination overhead to a
  short-lived branch;
* isolating one pattern/fix per branch keeps `main` always in a working
  state while a multi-commit unit of work is still being iterated on;
* squash/merge history makes it easy to see which branch introduced which
  pattern's visual (e.g. `feature/flyweight-visual`, `fix/proxy-diagram-centering`).

Full Git Flow (`develop`, `release/*`) is still not adopted — see below.

---

# Branch Responsibilities

## main

Stable, deployable code. Every commit on `main` is the result of a completed
and reviewed merge.

## feature/*

Development of one isolated feature or pattern visual.

Examples (real branches used in this repository):

* `feature/phase-11-gof-expansion`
* `feature/flyweight-visual`
* `feature/favicon-and-transition-polish`

## fix/*

A scoped bug fix or content correction.

Examples (real branches used in this repository):

* `fix/proxy-diagram-centering`
* `fix/ru-translation-calques`

---

# Future Workflow

If the project grows to multiple contributors, migrate to the following
branch model.

```text
main

develop

feature/<feature-name>

release/<version>

hotfix/<issue>
```

At that point, Pull Requests become mandatory for every `feature/*` and
`hotfix/*` merge, and should include:

* purpose;
* summary;
* affected modules;
* testing status.

---

# Merge Rules

Never merge:

* broken code;
* incomplete features;
* experimental implementations.

Merge only reviewed and approved work.

---

# Branch Naming

Use lowercase.

Separate words with hyphens.

Examples:

```text
feature/flyweight-visual

feature/favicon-and-transition-polish

fix/proxy-diagram-centering

fix/ru-translation-calques
```

Avoid:

```text
feature/NewFeature

Feature

branch1

test

final
```

---

# Long-Term Goal

The branching strategy should remain as simple as possible.

Complex workflows should be introduced only when they solve a real problem.

The project should never adopt Git practices that create unnecessary maintenance overhead.

---

# Final Rule

Today:

One short-lived `feature/*` or `fix/*` branch per unit of work, merged into
`main` when done.

Tomorrow:

Scale to `develop` + Pull Requests only when multiple contributors require it.

Keep Git simple.
