# Engineering Guide

Version: 1.1

---

# Purpose

This document defines the rules every contributor follows when working on this repository.

It is the working agreement for the project. It has higher priority than any single conversation or note. If a discussion conflicts with this document, follow this document unless the maintainer explicitly overrides it.

---

# Project

Project Name:

Design Patterns Academy

This repository is a long-term educational platform about Software Engineering.

The first implemented knowledge module is:

* Design Patterns (GoF)

Future modules include, but are not limited to:

* Programming Languages
* Algorithms
* Data Structures
* Clean Code
* SOLID
* System Design
* Software Architecture
* Databases
* Networking
* Linux
* Git
* Docker
* Kubernetes
* DevOps
* Cloud
* Security

The architecture is intentionally designed to support future expansion.

---

# Source of Truth

The repository is the single source of truth.

Do not rely on undocumented decisions or informal notes.

Before performing any task, read:

1. README.md
2. ROADMAP.md
3. PROJECT_STATE.md
4. OWNER_GUIDE.md

Only then continue.

---

# Architecture Rules

The repository architecture is approved and stable.

Do not:

* rename folders;
* move folders;
* introduce alternative architectures;
* redesign the repository;
* replace the existing structure.

Architecture changes require explicit agreement from the maintainer.

---

# Development Principles

Always follow:

* SOLID
* DRY
* KISS
* YAGNI
* Clean Code
* Semantic HTML
* Accessibility
* Performance
* SEO
* Progressive Enhancement

---

# Scope Control

Implement only the requested task.

Never implement future roadmap phases.

Never anticipate future functionality.

Never write code outside the current scope.

When a task is complete, stop and wait for the next instruction.

---

# Change Discipline

Keep changes minimal and focused.

* Never regenerate approved files.
* Never rewrite unrelated files.
* Never modify files outside the requested scope.
* Prefer updating existing files over creating new ones.
* Avoid repeating explanations that are already documented.

---

# Documentation Rules

Documentation is part of the project.

It must stay synchronized with the implementation.

Update documentation only when required, and never rewrite it unnecessarily.

---

# Git Rules

Do not perform Git operations unless explicitly requested.

Do not create branches unless requested.

Do not rewrite Git history.

Do not rename commits.

Do not force push.

---

# Coding Standards

Produce production-quality code.

Avoid unnecessary abstractions.

Avoid premature optimization.

Keep components reusable.

Keep functions focused on a single responsibility.

Prefer readability over cleverness.

---

# Review Rules

Review only the requested scope.

Do not reject a task because of future roadmap items.

Do not request implementation outside the current phase.

Respect previously approved decisions.

---

# Communication Rules

Keep responses concise.

Explain only when necessary.

Do not repeat previously approved information.

If additional work is discovered, do not implement it automatically — report it and wait for approval.

---

# Decision Making

When multiple valid solutions exist, choose the one that:

* keeps the architecture consistent;
* minimizes complexity;
* minimizes maintenance cost;
* follows existing project conventions.

Never redesign the project for personal preference.

---

# Task Workflow

Every task follows the same workflow:

1. Read the required documentation.
2. Understand the current project state.
3. Confirm the task scope.
4. Implement only the requested scope.
5. Verify consistency.
6. Stop and wait for review.

---

# Forbidden Actions

Never:

* redesign the project;
* reorganize folders;
* rename files without approval;
* rewrite approved work;
* generate placeholder implementations without being asked;
* introduce unnecessary dependencies;
* modify unrelated modules.

---

# Approved UX Rules

Preserve the active content tab when switching application language.

UI-only interactions should preserve user context whenever possible.

Infrastructure bugfixes must follow:

1. Root Cause Analysis
2. Minimal Fix
3. Browser QA
4. Maintainer Review
5. Approval

---

# Long-Term Vision

This repository is intended to evolve over many years.

Every implementation decision should support long-term maintainability.

Favor stability over novelty. Favor consistency over experimentation.

The repository should remain understandable to any future contributor.

---

# Success Criteria

Work on this repository is successful when:

* it follows the architecture;
* it implements only the requested scope;
* it minimizes unnecessary changes;
* it keeps documentation synchronized;
* it preserves long-term maintainability.

The objective is not to produce the most code — it is to preserve the integrity of the project.

---

# Current Repository Status

Phase 11 is completed. All 23 GoF Design Patterns are implemented.

Future work focuses on platform quality and roadmap development (Visual and Interactive Learning).

Do not regenerate approved GoF content unless explicitly requested.
