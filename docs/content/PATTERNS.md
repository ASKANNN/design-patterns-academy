# PATTERNS

Version: 1.0

---

# Purpose

This document describes how design-pattern content is authored and structured.

Each of the 23 Gang of Four patterns is a single JSON file. Content is data —
never hardcoded in components.

---

# File Location

```
src/data/patterns/
  ├─ creational/<slug>.json
  ├─ structural/<slug>.json
  └─ behavioral/<slug>.json
```

- `<slug>` is kebab-case and matches the route: `#/patterns/<category>/<slug>`.
- The three categories are fixed (`src/config/patterns.js`):
  `creational`, `structural`, `behavioral`.

---

# JSON Schema

| Field                 | Type          | Notes                                                     |
| --------------------- | ------------- | --------------------------------------------------------- |
| `slug`                | string        | Kebab-case id, must match the filename                    |
| `name`                | string        | Display name, e.g. `Chain of Responsibility`              |
| `category`            | string        | `creational` \| `structural` \| `behavioral`             |
| `complexity`          | int (1–3)     | Maps to Simple / Medium / Complex labels                  |
| `popularity`          | int (1–3)     | Maps to Low / Medium / High labels                        |
| `also_known_as`       | string[]      | Alternate names                                           |
| `tags`                | string[]      | Search / filter keywords                                  |
| `intent`              | `{en, ru}`    | One-line intent                                           |
| `problem`             | `{en, ru}`    | The problem the pattern solves                            |
| `solution`            | `{en, ru}`    | How the pattern solves it                                 |
| `structure`           | object        | `{ description: {en,ru}, participants: [...] }`           |
| `implementation`      | object        | Code strings keyed by language (see below)                |
| `pros`                | `{en,ru}[]`   | Benefits                                                  |
| `cons`                | `{en,ru}[]`   | Trade-offs                                                |
| `when_to_use`         | `{en,ru}[]`   | Applicability bullets                                     |
| `real_world_examples` | `{en,ru}[]`   | Markdown-flavored examples                                |
| `related_patterns`    | string[]      | Slugs of related patterns                                 |
| `visuals`             | object[]      | Diagram / timeline definitions (see below)                |

---

# Localized Fields

Any human-readable text is an object with `en` and `ru` keys:

```json
"intent": {
  "en": "Pass requests along a chain of handlers.",
  "ru": "Передавайте запрос по цепочке обработчиков."
}
```

**Both languages are required.** Keep them in sync when editing — see
[LOCALIZATION.md](../development/LOCALIZATION.md).

---

# Implementation Code

`implementation` holds ready-to-display source per language. Current languages:

```json
"implementation": {
  "javascript": "…",
  "typescript": "…",
  "java": "…",
  "csharp": "…",
  "python": "…"
}
```

Supported languages are declared in `src/config/patterns.js` (`CODE_LANGS`).
Code is stored as a raw string and rendered through the `CodeBlock` component.

---

# Visuals

`visuals` is an array of diagram definitions consumed by the visual engine
(`src/components/visual/`). Each item includes:

`id`, `type` (e.g. `chain`, `nested`), `style`, `category`, `width`, `height`,
`title`, `description`, `caption`, and `nodes`.

See the data-driven layout notes for `chain` and `nested` layouts before adding
a new visualization.

---

# Adding a New Pattern

1. Create `src/data/patterns/<category>/<slug>.json`.
2. Copy the shape of an existing pattern in the same category.
3. Fill every localized field in both `en` and `ru`.
4. Provide implementation code for each supported language.
5. Run `npm run dev` and open `#/patterns/<category>/<slug>` to verify rendering.

---

# Related Documents

- [Localization](../development/LOCALIZATION.md)
- [Components](../development/COMPONENTS.md)
- [Architecture](../development/ARCHITECTURE.md)
