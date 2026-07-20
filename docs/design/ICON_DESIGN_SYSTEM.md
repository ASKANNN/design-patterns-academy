# Icon Design System

Design Patterns Academy — official SVG icon language (Phase 12 — Visual Learning).

This document is the **single source of truth** for every pattern icon in the
platform. It defines the rules; individual glyphs are implementations of these
rules. No icon may ship that violates this specification.

The four reference icons — **Singleton, Factory Method, Adapter, Observer** — are
the approved **Gold Standard**. All remaining GoF icons must be built to match
them exactly.

---

## 1. Principles

- **One unified language.** Every icon shares the same grid, stroke, rhythm and
  two-layer composition. They must look like one family, drawn by one hand.
- **Minimalistic.** The fewest strokes that still carry the idea. If an element
  teaches nothing, it is removed.
- **Instantly recognizable.** The silhouette communicates the pattern before any
  label is read.
- **Educational.** The accent layer always encodes the *essence* of the pattern
  (the one instance, the produced product, the bridge, the broadcast).
- **SVG only.** Inline, generated markup. No raster, no external assets, no icon
  fonts, no dependencies.
- **Theme-aware & token-driven.** Structure inherits `currentColor`; the accent
  resolves through design tokens. Light/Dark adapt automatically.
- **Scalable & accessible.** One vector renders crisply from 16 px to 48 px+ and
  exposes a correct accessibility surface.

---

## 2. Grid & Construction

| Property        | Value                                              |
|-----------------|----------------------------------------------------|
| Canvas          | `viewBox="0 0 24 24"`                               |
| Live area       | 20 × 20 (keyline inset **2 px** on every edge)     |
| Optical centre  | `12, 12`                                            |
| Alignment       | Snap key vertices to the integer/half grid         |

- All geometry lives inside the **2 px safe padding**. Nothing touches the edge.
- Compose on the keyline shapes: **square** (4–20), **circle** (r ≤ 8 from centre)
  and the horizontal/vertical centre axes. Balance mass around `12,12`.
- Prefer optical balance over mathematical centring — a bottom-heavy glyph is
  nudged up by ~0.5 px.

---

## 3. Stroke, Radius & Rhythm

| Property         | Value                                                   |
|------------------|---------------------------------------------------------|
| Stroke width     | **1.5** (on the 24 grid), scales with the icon          |
| Line caps        | `round`                                                 |
| Line joins       | `round`                                                 |
| Corner radius    | `2`–`4` grid units for containers; never sharp corners  |
| Min optical line | ≥ 1.25 px rendered — do not use icons below 16 px       |

- Stroke is uniform. Never mix weights inside one icon.
- Filled elements (the "single instance" dot, a solid product) are used **only**
  to mark the semantic focal point — at most **one** filled shape per icon.

---

## 4. Two-Layer Composition (mandatory)

Every icon is exactly two semantic layers:

1. **Base layer** — `.pattern-icon__base`
   Structural geometry. Stroke = `currentColor` (adapts to theme text colour).
   This is the neutral "container / participants" of the pattern.

2. **Accent layer** — `.pattern-icon__accent`
   The one element that carries the pattern's meaning. Stroke/fill =
   `var(--icon-accent)` (the category colour). Add `--fill` for a solid focal
   mark. There is **one** accent idea per icon — never decorate with colour.

> Rule: if you cannot state, in one sentence, what the accent layer *teaches*,
> the icon is wrong.

---

## 5. Category Accents

The accent colour is driven entirely by the pattern's category, via tokens:

| Category    | Token                            | Modifier class                |
|-------------|----------------------------------|-------------------------------|
| Creational  | `--palette-category-creational`  | `.pattern-icon--creational`   |
| Structural  | `--palette-category-structural`  | `.pattern-icon--structural`   |
| Behavioral  | `--palette-category-behavioral`  | `.pattern-icon--behavioral`   |
| (fallback)  | `--color-accent`                 | none                          |

Icons never hard-code a colour. Base = `currentColor`, accent = `--icon-accent`.

---

## 6. Gradient & Glow

- **Default: none.** Flat, single-tone strokes are the baseline everywhere
  (catalog, breadcrumbs, search, inline).
- **Emphasis only** (`.pattern-icon--emphasis`): a hero context (pattern page
  hero, featured card, diagram focal node) may add a soft accent glow via
  `drop-shadow` using the category accent. No hard shadows, no bevels.
- Gradients are reserved for large hero/diagram usage and, when used, must reuse
  the diagram accent gradient stops. Never gradient-fill a small (≤ 24 px) icon.

---

## 7. Animation

- **Motion must teach or acknowledge** — never decorate.
- Trigger on **hover/focus only**, on `@media (hover: hover)`. Icons are static
  at rest.
- Only the **accent layer** animates (e.g. a subtle scale/pulse of the focal
  mark). The base structure never moves.
- Duration ≤ `--duration-normal`, easing `--ease-out`, `transform` only.
- `transform-box: fill-box; transform-origin: center;` for correct pivots.
- **`prefers-reduced-motion: reduce` disables all icon motion.** The static icon
  must be fully complete on its own.

---

## 8. Composition Rules (checklist)

An icon is **approved** only if all hold:

- [ ] `viewBox="0 0 24 24"`, all geometry inside the 2 px keyline.
- [ ] Exactly two layers: `__base` (currentColor) + `__accent` (`--icon-accent`).
- [ ] Uniform 1.5 stroke, round caps/joins.
- [ ] At most one filled focal mark.
- [ ] Accent encodes the pattern's essence (state it in one sentence).
- [ ] No hard-coded colours, no inline sizes on the glyph.
- [ ] Reads correctly at 16 px and at 48 px, in Light and Dark.
- [ ] Decorative by default (`aria-hidden`); labelled only when standalone.
- [ ] Silhouette is distinct from every sibling icon.

---

## 9. Accessibility

- **Decorative** (accompanied by a visible label — catalog card, breadcrumb):
  `aria-hidden="true"`, no title.
- **Standalone** (icon is the only content — icon-only control): pass a `title`;
  the component emits `role="img"` + `<title>` and drops `aria-hidden`.
- Meaning is never carried by colour alone — the silhouette already differs, so
  colour-blind and monochrome rendering remain unambiguous.

---

## 10. Usage Surfaces

One glyph, many contexts — driven by the size scale only:

| Surface            | Size            | Emphasis |
|--------------------|-----------------|----------|
| Catalog card       | `md` (24)       | no       |
| Pattern page hero  | `xl` (48)       | optional |
| Breadcrumb         | `sm` (16)       | no       |
| Search result      | `sm` (16)       | no       |
| Visual diagram     | `lg`/`xl`       | focal only |

Sizes map to icon tokens: `sm=--icon-sm`, `md=--icon-lg`, `lg=--icon-xl`,
`xl=--icon-2xl`.

---

## 11. Implementation

- Component: `src/components/visual/PatternIcon.js`
  - `PATTERN_GLYPHS` — registry keyed by pattern slug (add new patterns here).
  - `PatternIcon(props)` — renders the themed, accessible `<svg>` wrapper.
- Styles: `src/styles/components/pattern-icon.css` (tokens only).

Adding a future icon = add one entry to `PATTERN_GLYPHS` following §8. No engine,
CSS or spec changes are required. That is the test of this system.

---

## 12. Reference Icons (Gold Standard)

| Pattern        | Category    | Base (structure)          | Accent (essence)                         |
|----------------|-------------|---------------------------|------------------------------------------|
| Singleton      | Creational  | One container             | The single filled instance dot — "one"   |
| Factory Method | Creational  | The creator body          | The produced product emerging from it    |
| Adapter        | Structural  | Two incompatible shapes   | The bridge that connects them            |
| Observer       | Behavioral  | The subject               | Broadcast waves — notify many observers  |

These four define the family. Every remaining GoF icon must feel like it belongs
beside them.
