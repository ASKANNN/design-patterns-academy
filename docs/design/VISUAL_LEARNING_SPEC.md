# Visual Learning — Design Specification

Version: 1.0
Phase: 12 — Visual Learning
Status: Approved standard (architecture & design only)

> This document is a **specification**, not an implementation.
> It defines the single, reusable standard for all visual learning content
> across every GoF Design Pattern. No diagrams, SVG assets, or UI changes
> are produced here.
>
> The repository is the single source of truth. This specification follows
> the existing architecture and reuses the existing design system
> (`src/styles/base/tokens.css`) without introducing new tokens, folders,
> or alternative architectures.

---

## 1. Purpose

### Why visual learning is being added

GoF Design Patterns are inherently **structural and behavioral**: they
describe relationships between objects, the direction of collaboration,
and how control flows over time. Text and code alone force the learner to
reconstruct these relationships mentally. Visual learning externalizes
that mental model so a pattern's shape can be understood at a glance,
before the code is read.

### Educational goals

- Make the **structure** of a pattern (who owns whom, who talks to whom) immediately legible.
- Make the **behavior** of a pattern (order of calls, state changes, delegation) observable.
- Reduce cognitive load by pairing each written concept with a canonical diagram.
- Reinforce the **Gold Standard** consistency already established by Singleton: every pattern is learned the same way.

### Learning philosophy

- **Quality before quantity** — one correct, consistent visual language reused everywhere, never bespoke art per pattern.
- **Progressive disclosure** — the diagram communicates the essence first; detail is revealed on interaction, never dumped at once.
- **Diagram supports text, never replaces it** — visuals are a second channel for the same truth, so the platform stays fully usable without them (progressive enhancement).
- **One standard, 23 patterns** — the same visual grammar must express the simplest (Singleton) and the most complex (Visitor, Mediator) pattern without redesign.

---

## 2. Supported Visual Types

The following visual types form the **closed catalog**. A pattern selects
from this catalog; it never invents a new visual type. This guarantees
that all 23 patterns are expressible with a fixed, reusable vocabulary.

| # | Visual Type | Answers the question | Primary use (examples) |
|---|-------------|----------------------|------------------------|
| 1 | **UML Class Diagram** | What are the participants and how are they related? | All patterns (baseline structure) |
| 2 | **Object Relationship Diagram** | How do concrete instances reference each other at runtime? | Composite, Decorator, Proxy, Bridge |
| 3 | **Sequence Diagram** | In what order do objects exchange messages over time? | Observer, Command, Mediator |
| 4 | **Object Lifecycle** | How is an object created, reused, and destroyed? | Singleton, Prototype, Object Pool concerns |
| 5 | **Flow Diagram** | What is the decision/branching logic? | Factory Method, Abstract Factory, Builder |
| 6 | **Call Flow** | How does a single call propagate through the participants? | Facade, Adapter, Template Method |
| 7 | **Responsibility Chain** | How is a request passed until handled? | Chain of Responsibility |
| 8 | **State Transition** | Which states exist and what triggers a transition? | State, Memento |
| 9 | **Component Relationship** | How do abstraction and implementation vary independently? | Bridge, Strategy, Abstract Factory |
| 10 | **Pattern Comparison** | How does this pattern differ from a related one? | Strategy vs State, Adapter vs Facade, Proxy vs Decorator |

### Mapping rules

- Every pattern page has **exactly one** primary visual: the **UML Class Diagram** (type 1). This is the mandatory baseline.
- A pattern **may** add one or more secondary visuals from types 2–10 when they add genuine understanding.
- The relationship set is fixed. Extending the catalog is an **architecture change** and requires explicit owner approval.

---

## 3. Visual Style Guide

All visuals **must** consume existing design tokens from
`src/styles/base/tokens.css`. No new colors, fonts, or spacing values are
introduced. Values below are referenced by token name so both themes and
future token changes propagate automatically.

### Spacing

- Node internal padding: `--space-3` / `--space-4`.
- Gap between sibling nodes: `--space-8` (desktop), `--space-6` (tablet), `--space-4` (mobile).
- Diagram outer padding: `--space-6`.
- Grid rhythm: all coordinates snap to the `--space-*` scale (multiples of 4px). No arbitrary pixel values.

### Colors

| Element | Token |
|---------|-------|
| Diagram background | `--color-bg-surface` |
| Node background | `--color-bg-elevated` |
| Node border | `--color-border` |
| Emphasized / focused node border | `--color-border-accent` |
| Node title text | `--color-text-primary` |
| Node member / secondary text | `--color-text-secondary` |
| Connector line | `--color-border-strong` |
| Active / highlighted connector | `--color-accent` |
| Creational participants (accent hue) | `--palette-category-creational` |
| Structural participants (accent hue) | `--palette-category-structural` |
| Behavioral participants (accent hue) | `--palette-category-behavioral` |

Category hues are used **only** as a thin accent (title bar strip or left border), never as a node fill, to preserve contrast and theme parity.

### Typography

- Node titles: `--font-sans`, `--font-weight-semibold`, `--text-sm`.
- Members / methods / labels: `--font-mono`, `--font-weight-regular`, `--text-xs` (code-like elements use the monospace family for consistency with `CodeBlock`).
- Edge labels: `--font-sans`, `--text-xs`, `--color-text-tertiary`.
- Tracking for uppercase category labels: `--tracking-wide`.

### Borders

- Node border width: `1px`, color `--color-border`.
- Node radius: `--radius-lg`.
- Abstract/interface participants: **dashed** border to convey abstraction; concrete participants: **solid**.
- Diagram container radius: `--radius-xl`.

### Shadows

- Resting node: `--shadow-xs`.
- Hovered / focused node: `--shadow-md`.
- Diagram container: `--shadow-sm`.
- Shadows are theme-aware (dark theme overrides already exist in tokens).

### Node style

- Rectangular card with title region and an optional member list, mirroring the visual weight of the existing `Card` component.
- Three semantic variants: **concrete** (solid border), **abstract/interface** (dashed border), **client/actor** (subtle background `--color-bg-subtle`).
- Minimum touch/interaction target: 44×44px.

### Connector style

- Straight or orthogonal (right-angle) lines only — no freehand curves — for predictability across sizes.
- Line weight `1.5px`, color `--color-border-strong`.
- UML relationship notation is standardized:
  - **Inheritance / implements** → hollow triangle arrowhead.
  - **Association / uses** → open (line) arrowhead.
  - **Aggregation** → hollow diamond.
  - **Composition** → filled diamond.
- Active-path highlighting uses `--color-accent` with weight `2px`.

### Icons

- Reuse the platform's existing icon set and `--icon-*` size tokens; default `--icon-sm` inside nodes.
- Icons are decorative reinforcement only and are marked `aria-hidden`; meaning never depends on an icon alone.

### Dark theme

- No separate diagram palette. All colors resolve through tokens, so `[data-theme="dark"]` overrides in `tokens.css` recolor every diagram automatically.
- Connectors rely on `--color-border-strong`, which already carries sufficient contrast in both themes.

### Light theme

- The default (`:root`) token set applies. Diagrams inherit the same surface/border/text relationships as the rest of the UI, guaranteeing visual coherence with existing pages.

---

## 4. Accessibility

Target: **WCAG 2.1 AA**, consistent with the platform baseline.

### Keyboard navigation

- Every interactive diagram is reachable in tab order.
- Nodes form a single logical traversal order (`Tab` / `Shift+Tab`); `Arrow` keys move between connected nodes where interaction exists.
- `Enter` / `Space` activates a node's detail (progressive disclosure); `Esc` collapses it.
- A visible focus ring uses the existing `--shadow-accent` token.

### Screen readers

- Each diagram exposes a text alternative describing participants and relationships (e.g. via `role="img"` + `aria-label`, or an adjacent visually-hidden structured description).
- The **written pattern content remains the authoritative source**; the diagram never carries information absent from text — so a non-visual user loses nothing.
- Decorative connectors and icons are `aria-hidden`.

### Color contrast

- Text vs node background meets **≥ 4.5:1**; large text and UI borders meet **≥ 3:1**.
- Meaning is never encoded by color alone — border style (solid/dashed), arrowhead shape, and labels carry the semantics; category hue is redundant reinforcement.

### Reduced motion

- Respect `prefers-reduced-motion: reduce` (already globally handled in `tokens.css`). Under reduced motion, path animations and transitions resolve instantly to their end state; no looping or auto-playing motion.

### Zoom support

- Layout remains usable at **200% browser zoom** and reflows without horizontal scroll traps.
- Diagrams scale with the container and honor text zoom; no fixed pixel font sizes that resist user scaling.

---

## 5. Responsive Rules

Breakpoints reference existing `--bp-*` tokens.

### Desktop (≥ `--bp-lg`, 1024px)

- Full two-dimensional layout; participants arranged horizontally/hierarchically as authored.
- Full spacing (`--space-8` sibling gap), hover interactions enabled.

### Tablet (≥ `--bp-md`, 768px to < `--bp-lg`)

- Reduced spacing (`--space-6`); layout may collapse from multi-column to a denser arrangement.
- Optional pan within a bounded, scroll-contained viewport for wide diagrams (e.g. large class diagrams like Visitor).

### Mobile (< `--bp-md`, 768px)

- Diagrams reflow to a **single-column vertical stack**; connectors re-route to top→bottom flow.
- Spacing `--space-4`; touch targets ≥ 44px; hover-only affordances have tap equivalents.
- If a diagram cannot reflow meaningfully, it degrades to a horizontally scrollable region with a visible scroll affordance, and the text alternative remains fully available.

### Universal rules

- No diagram may cause page-level horizontal overflow.
- The diagram container is fluid (`max-width: 100%`); intrinsic diagram dimensions are expressed relatively so scaling is lossless.

---

## 6. Implementation Strategy

### Brief comparison

| Approach | Strengths | Weaknesses for this use |
|----------|-----------|-------------------------|
| **SVG** | Vector = crisp at any zoom/DPI; each node/edge is a real DOM element (focusable, ARIA-labelable, CSS-token styleable); animatable via CSS; diffable in git | Verbose markup; manual layout math |
| **Canvas** | High performance for thousands of elements; pixel effects | Not DOM — no native focus, no semantics, no screen-reader access, no CSS tokens; accessibility must be rebuilt from scratch; raster blurs on zoom |
| **HTML/CSS** | Reuses existing component styling; easy text/a11y | Drawing connectors/arrowheads between arbitrary nodes is fragile and hard to keep consistent |

### Chosen approach: **SVG (with HTML/CSS for text-heavy node content where helpful)**

### Justification

- **Accessibility first** — SVG elements are real DOM nodes, so keyboard focus, ARIA labeling, and screen-reader descriptions (Section 4) are achievable natively. Canvas would require reimplementing all of this and still fail zoom clarity.
- **Design-system reuse** — SVG is styleable with the exact CSS custom properties in `tokens.css`; `fill`/`stroke` bind directly to `--color-*` tokens, so **light/dark theming and future token changes propagate for free** with zero diagram-specific color logic.
- **Zoom & DPI** — vector rendering satisfies the 200% zoom and retina requirements without raster blur (Section 4, Section 5).
- **Zero dependencies** — SVG is native to the browser and preserves the project's zero-runtime-dependency, Vanilla-JS constraint.
- **Connector fidelity** — arrowheads, dashed abstractions, and orthogonal routing (Section 3) are precisely expressible in SVG and impractical in pure HTML/CSS.
- Canvas is explicitly **rejected** because it is non-semantic and inaccessible; pure HTML/CSS is rejected as the primary approach because reliable connectors between arbitrary nodes are not maintainable at 23-pattern scale.

> This choice is a recommendation at the specification level. Implementation belongs to a later Phase 12 task and is out of scope here.

---

## 7. Reusability

The core principle: **one visualization architecture, reused by every pattern.** Individual patterns supply *data*, never new *mechanisms*.

### The reuse contract

1. **Fixed visual catalog** — a pattern chooses from the ten types in Section 2. It cannot introduce a new type without owner approval.
2. **Data-driven, not asset-driven** — a diagram is described by a declarative model (participants, relationships, optional sequence/states), not by a hand-drawn file. The same renderer consumes every pattern's model.
3. **Token-bound styling** — no diagram carries its own colors, fonts, or spacing; all styling resolves through `tokens.css`, so themes and restyles apply globally.
4. **Gold Standard alignment** — visual content is authored to the same reference bar as Singleton. The first implemented pattern's diagram becomes the concrete template every later pattern mirrors.
5. **Localization parity** — all diagram labels and text alternatives flow through the existing i18n system (EN/RU), exactly like current content. No text is hard-coded in the visual layer.
6. **Placement consistency** — the visual section occupies the same position and interaction model on every pattern detail page, so learners build one habit that transfers across all 23 patterns.

### Why this scales to all 23 GoF patterns

- Simple patterns (Singleton, Prototype) use only the mandatory UML Class Diagram.
- Complex patterns (Visitor, Mediator, Chain of Responsibility) compose additional catalog types (sequence, responsibility chain, state transition) — but still from the same fixed vocabulary and the same renderer.
- Because structure is expressed as data + shared renderer + shared tokens, adding a pattern's visuals never touches architecture, routing, components, or the design system — satisfying the "expand without redesign" mandate.

---

## Validation Checklist

- [x] Follows the existing, locked architecture (no new folders beyond `docs/design/`, no structural changes).
- [x] Reuses the existing design system (`tokens.css`) exclusively; introduces no new tokens.
- [x] Reusable across all patterns via a fixed catalog + data-driven, token-bound model.
- [x] Implementation-agnostic at the level that matters (declarative model), with a justified technology recommendation.
- [x] Expressive enough to support all 23 GoF patterns without redesign.
- [x] Accessible (WCAG 2.1 AA), responsive (desktop/tablet/mobile), and theme-aware (light/dark).
