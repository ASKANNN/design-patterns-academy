# Contributing to Design Patterns Academy

Thanks for your interest in improving **Design Patterns Academy** — a premium
educational SPA about the GoF design patterns. This guide explains how to set up
the project locally, how we work, and where to find the detailed conventions.

---

## Getting Started

Requirements:

- Node.js `>= 18`
- npm

Setup:

```bash
git clone https://github.com/ASKANNN/design-patterns-academy.git
cd design-patterns-academy
npm install
```

Common scripts:

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite dev server            |
| `npm run build`   | Build the production bundle to `dist`|
| `npm run preview` | Preview the production build locally |

---

## How to Contribute

1. **Open an issue first** for bugs or feature ideas, so we can align before you
   invest time: https://github.com/ASKANNN/design-patterns-academy/issues
2. **Create a branch** from `main` following the naming rules in
   [BRANCHING.md](../git-and-releases/BRANCHING.md).
3. **Make focused commits** — one logical change per commit, using the
   [Commit Convention](../git-and-releases/COMMIT_CONVENTION.md).
4. **Keep the build green** — run `npm run build` before pushing.
5. **Update the changelog** under `[Unreleased]` in
   [CHANGELOG.md](../git-and-releases/CHANGELOG.md) when your change is
   user-facing.
6. **Open a Pull Request** against `main` with a clear description of what and why.

---

## Project Conventions

Before writing code, please skim the relevant documents:

- [Architecture](../development/ARCHITECTURE.md) — how the SPA is structured
- [Module Guide](../development/MODULE_GUIDE.md) — how modules are organized
- [Components](../development/COMPONENTS.md) — component patterns and structure
- [Design System](../development/DESIGN_SYSTEM.md) — tokens, spacing, theming
- [Localization](../development/LOCALIZATION.md) — adding RU/EN strings

---

## Adding or Editing a Pattern

Pattern content lives in `src/data/patterns/<category>/<slug>.json`
(`creational`, `structural`, `behavioral`). When adding a pattern:

- Follow the JSON shape used by existing patterns in the same category.
- Provide both `ru` and `en` copy where the schema expects localized text.
- Verify the page renders via `npm run dev` before opening a PR.

---

## Code Style

- The project uses vanilla ES modules (`"type": "module"`) with Vite — no framework.
- Match the style of the surrounding code: naming, formatting, and comment density.
- Respect the settings in `.editorconfig`.

---

## Questions

Open a [discussion or issue](https://github.com/ASKANNN/design-patterns-academy/issues)
— we're happy to help.
