# COMMIT CONVENTION

Version: 1.0

---

# Purpose

This document defines the commit message convention for this repository.

A commit history should tell the story of the project.

Every commit must be understandable without opening the changed files.

The goal is to create a clean, readable, and maintainable Git history.

---

# General Principles

A commit should represent one logical unit of work.

Do not mix unrelated changes in the same commit.

Commit only completed work.

Never commit broken code intentionally.

---

# Commit Message Style

Format (Conventional Commits):

```text
<type>(<scope>): <description>
```

`<scope>` is optional but preferred whenever the change is localized to one
area. Lowercase, imperative mood, no trailing period.

Examples (real commits from this repository's history):

```text
feat(visual): add gateway layout for Proxy pattern diagram

feat(diagram): add chain layout for Chain of Responsibility pattern

fix(visual): stop Decorator's core rail landing mid-card

fix(links): point GitHub links to the real repository

docs(ru): fix translation calques in pattern data across all 23 GoF patterns

docs(plan): fill MASTER_PLAN.md with implementation plan content

refactor(config): make routes.js and theme.js real config and wire them in

chore: strip narrative/redundant comments across src
```

---

# Writing Rules

Use English.

Capitalize the first word.

Keep messages concise.

Describe the result, not the implementation.

Good:

```text
feat(components): add Accordion
```

Bad:

```text
Accordion updated
```

Good:

```text
fix(search): pattern search filtering
```

Bad:

```text
fixed search
```

---

# Recommended Types

```text
feat
fix
docs
refactor
chore
style
perf
test
```

# Recommended Scopes

Use one of the following scopes whenever it applies. Omit the scope only
when the change is repo-wide (e.g. `chore: strip narrative comments`).

```text
visual
diagram
patterns
components
layout
styles
config
build
i18n / ru / en
search
animation
performance
a11y
seo
links
plan
```

Avoid inventing new scopes unless necessary.

---

# Commit Frequency

Create commits when:

* a roadmap phase is completed;
* a feature is completed;
* a bug is fixed;
* documentation is updated significantly;
* a release is prepared.

Avoid committing after every small edit.

---

# What Should Not Be Committed

Do not commit:

* incomplete work;
* temporary debugging code;
* commented-out code;
* experimental changes;
* generated files that should be ignored;
* unrelated formatting-only changes mixed with features.

---

# Before Every Commit

Verify:

* project builds successfully;
* requested task is complete;
* unrelated files are untouched;
* documentation is updated if required;
* commit message follows this convention.

---

# Examples

Good history:

```text
feat(patterns): add Singleton content

feat(patterns): add Strategy, Command and Iterator patterns

feat(visual): add pool layout for Flyweight pattern diagram

feat(components): add Timeline

docs: update PROJECT_STATE
```

Poor history:

```text
update

fix

changes

new

test

asd

final

really final

last update
```

---

# Release Commits

Major milestones should have descriptive commit messages.

Examples:

```text
chore(release): version 1.0.0

chore(release): design patterns module completed
```

---

# Final Rule

A developer should understand the purpose of every commit by reading only the Git history.

If a commit message is unclear, rewrite it before committing.
