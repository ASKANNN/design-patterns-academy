# RELEASE CHECKLIST

Version: 1.0

---

# Purpose

This document defines the standard release process for the project.

Its purpose is to ensure that every public release meets the same quality standards.

A release should represent a stable milestone of the project.

---

# When to Create a Release

A release should be created only when a meaningful milestone has been completed.

Examples:

* MVP
* Design Patterns Module Completed
* Version 1.0.0
* Version 2.0.0
* Major Feature Release

Do not create releases for unfinished work.

---

# Pre-Release Checklist

Before creating a release, verify every item below.

## Repository

* [ ] Working tree is clean.
* [ ] No unfinished code remains.
* [ ] No temporary files are committed.
* [ ] No debug code exists.
* [ ] No commented-out code remains.

---

## Build

* [ ] Project builds successfully.
* [ ] Production build completes without errors.
* [ ] No build warnings require investigation.
* [ ] All assets are generated correctly.

---

## Application

* [ ] Application starts correctly.
* [ ] Navigation works.
* [ ] Routing works.
* [ ] Search works.
* [ ] Theme switching works.
* [ ] Language switching works.
* [ ] Responsive layout works.
* [ ] Mobile navigation works.

---

## UI

Verify:

* [ ] Layout consistency
* [ ] Typography
* [ ] Spacing
* [ ] Animations
* [ ] Icons
* [ ] Cards
* [ ] Buttons
* [ ] Forms
* [ ] Code blocks

---

## Accessibility

Verify:

* [ ] Keyboard navigation
* [ ] Visible focus states
* [ ] ARIA attributes
* [ ] Semantic HTML
* [ ] Color contrast
* [ ] Screen reader compatibility

Target:

WCAG 2.1 AA

---

## Performance

Verify:

* [ ] Lazy loading works.
* [ ] Images are optimized.
* [ ] Fonts load correctly.
* [ ] No unnecessary JavaScript.
* [ ] No duplicated assets.
* [ ] Lighthouse score meets project goals.

---

## Localization

Verify:

* [ ] English translations complete.
* [ ] Russian translations complete.
* [ ] No missing translation keys.
* [ ] No hardcoded user-facing strings.

---

## Documentation

Review:

* [ ] README.md
* [ ] ROADMAP.md
* [ ] PROJECT_STATE.md
* [ ] CHANGELOG.md

Update documentation only if required.

Documentation must match the released version.

---

## Git

Verify:

* [ ] All work is committed.
* [ ] Commit messages follow the project convention.
* [ ] Repository is synchronized with the remote.

Recommended sequence:

```text
git status

git add .

git commit -m "Release: Version x.y.z"

git push
```

---

## Versioning

Use Semantic Versioning.

Examples:

```text
v0.1.0

v0.5.0

v1.0.0

v1.1.0

v2.0.0
```

Version rules:

Major

Breaking changes.

Minor

New functionality without breaking compatibility.

Patch

Bug fixes.

---

## Creating a GitHub Release

After pushing the release:

* create a Git tag;
* create a GitHub Release;
* summarize major changes;
* attach release notes if appropriate.

---

## Post-Release Verification

After publishing:

Verify:

* [ ] Production deployment works.
* [ ] Website loads successfully.
* [ ] Assets are available.
* [ ] Routing functions correctly.
* [ ] No critical issues are detected.

---

# Emergency Fixes

If a critical issue is discovered after release:

1. Reproduce the issue.
2. Fix only the affected scope.
3. Review the fix.
4. Create a dedicated hotfix commit.
5. Publish a patch release.

Avoid mixing unrelated changes with emergency fixes.

---

# Release Philosophy

A release is a milestone.

Do not rush releases.

Do not publish unfinished work.

Every release should improve the project while preserving stability.

---

# Final Rule

Quality before speed.

Every release should leave the project in a better state than before.
