# Design Patterns Academy

> A premium open-source educational platform for learning GoF Design Patterns.

---

## Overview

Design Patterns Academy is a modern open-source educational platform dedicated exclusively to the Gang of Four (GoF)
Design Patterns.

Built with HTML5, CSS3, and Vanilla JavaScript (ES Modules), the project focuses on providing a clean, professional,
accessible, and high-performance learning experience.

The long-term vision is to make Design Patterns Academy the first completed academy within a broader Software
Engineering ecosystem. This repository, however, is dedicated solely to Design Patterns.

Inspired by the design language of Apple, Linear, and Stripe.

---

## Features

- Complete library of all 23 GoF Design Patterns
- Structured pattern pages: intent, problem, solution, structure, code, pros & cons
- Interactive diagrams and animated visualizations, expanding across all 23 patterns (bespoke visuals shipped pattern by pattern — see [MASTER_PLAN.md](docs/project-management/MASTER_PLAN.md) for current coverage)
- English and Russian localization
- Light and Dark themes with smooth transitions
- Accessibility-focused (targets WCAG 2.1 AA)
- No runtime dependencies — pure HTML, CSS, and JS (Vite is used only for the build)
- Performance-focused, static-first architecture

---

## Tech Stack

| Layer   | Technology                       |
|---------|----------------------------------|
| Markup  | HTML5, Semantic HTML             |
| Styles  | CSS3, CSS Variables, CSS Modules |
| Logic   | Vanilla JS, ES Modules           |
| Bundler | Vite 8                           |
| Hosting | GitHub Pages / Vercel            |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Requires Node.js ≥ 18.

---

## Project Structure

```
src/
├── assets/       Static assets (fonts, icons, images)
├── components/   Reusable UI components
├── config/       App configuration (routes, theme, i18n)
├── data/         Pattern content and localization JSON
├── layouts/      Page layout wrappers
├── pages/        Individual page modules
├── scripts/      App entry and initialization
├── styles/       Global styles, themes, design tokens
└── utils/        Pure utility functions
```

---

## Documentation

| Document                                                   | Description                       |
|------------------------------------------------------------|-----------------------------------|
| [ROADMAP.md](./ROADMAP.md)                                          | Development phases and status     |
| [docs/development/ARCHITECTURE.md](docs/development/ARCHITECTURE.md) | Architecture decisions            |
| [docs/development/DESIGN_SYSTEM.md](docs/development/DESIGN_SYSTEM.md) | Design tokens and visual language |
| [docs/development/COMPONENTS.md](docs/development/COMPONENTS.md)     | Component catalog                 |
| [docs/community/CONTRIBUTING.md](docs/community/CONTRIBUTING.md)     | How to contribute                 |

---

## License

MIT © Design Patterns Academy
