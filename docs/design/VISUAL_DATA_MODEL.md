# Visual Data Model — Schema Specification

Version: 1.0
Phase: 12 — Visual Learning
Status: Approved standard (architecture & schema only)

> This document defines the **contract** between Pattern JSON and the approved
> Diagram Engine (`src/components/visual/`). It specifies the declarative data
> model that every future diagram supplies; it does **not** implement any
> pattern diagram, SVG, JSON, page, or engine change.
>
> It is grounded in the already-approved engine so no engine redesign is
> required, and it is forward-compatible so all ten visual types from
> `VISUAL_LEARNING_SPEC.md` can be expressed without breaking the contract.
>
> The repository is the single source of truth.

---

## 0. Design Principles

1. **One model, ten visual types.** A single schema shape expresses UML,
   Sequence, State, Flow, Comparison, Lifecycle, and the rest. The `type`
   field selects meaning; the `nodes` + `edges` structure is universal.
2. **Grounded in the existing engine.** Fields consumed by the engine today
   are marked **`[engine]`**. Fields reserved for future visual types are
   marked **`[reserved]`** — they are valid in the model, ignored by the
   current renderer, and require no engine redesign to introduce.
3. **Semantics over rendering.** Authors describe *what a relationship means*
   (e.g. `implementation`, `delegation`). The schema maps every semantic
   relationship onto one of the engine's five rendering primitives, so rich
   vocabulary needs zero new engine code.
4. **Text is never hardcoded.** Every human-readable string is either an i18n
   key or caller-provided localized text. The model carries no language.
5. **Implementation-independent.** The model is plain data (JSON-serializable).
   It assumes nothing about SVG, the DOM, or any specific technology.

Legend for field tables:

| Mark | Meaning |
|------|---------|
| **`[engine]`** | Consumed by the current Diagram Engine |
| **`[reserved]`** | Valid, forward-compatible, ignored today |
| **R** | Required |
| **O** | Optional |

---

## 1. Diagram Model (top level)

A diagram is a single object. A pattern may hold an array of these (one per
visual). Each object is self-contained.

| Field | Req | Type | Mark | Description |
|-------|-----|------|------|-------------|
| `id` | R | string | `[engine]` | Unique identifier within the page. Namespaces internal marker ids to avoid collisions. Pattern: `[a-zA-Z0-9_-]+`. |
| `type` | R | enum | `[reserved]` | The visual type (see §5). Default interpretation is `class` (UML class diagram). Selects how nodes/edges are read. |
| `title` | R | string (key\|text) | `[engine]` | Accessible name of the diagram (`<title>`). Localized. |
| `description` | O | string (key\|text) | `[engine]` | Extended accessible description (`<desc>`). Localized. |
| `category` | O | enum | `[engine]` | `creational` \| `structural` \| `behavioral` \| `""`. Drives the accent hue via `--diagram-accent`. |
| `width` | O | number | `[engine]` | viewBox width in user units. Default `640`. |
| `height` | O | number | `[engine]` | viewBox height in user units. Default `400`. |
| `nodes` | R | Node[] | `[engine]` | Participants. Must contain ≥ 1 node. See §2. |
| `edges` | O | Edge[] | `[engine]` | Relationships between nodes. See §3. |
| `caption` | O | string (key\|text) | `[engine]` | Visible `<figcaption>`. Localized. |
| `legend` | O | LegendItem[] | `[reserved]` | Optional key explaining colors/line styles used. See §1.1. |
| `layout` | O | enum | `[reserved]` | Hint for future auto-layout (`manual` \| `horizontal` \| `vertical` \| `grid`). Default `manual` (author supplies coordinates). |
| `meta` | O | object | `[reserved]` | Free-form authoring metadata (source, version, notes). Never rendered. |

### 1.1 LegendItem `[reserved]`

| Field | Req | Type | Description |
|-------|-----|------|-------------|
| `label` | R | string (key\|text) | Localized legend entry text. |
| `swatch` | O | enum | `relationship` value or a `variant` name whose visual style is being explained. |

---

## 2. Node Schema

A node is a participant. In non-UML types it represents the type's unit
(a lifeline in Sequence, a state in State, a step in Flow).

| Field | Req | Type | Mark | Description |
|-------|-----|------|------|-------------|
| `id` | R | string | `[engine]` | Unique within the diagram. Referenced by edges. |
| `label` | R | string (key\|text) | `[engine]` | Primary display name. Localized. |
| `kind` | O | enum | `[reserved]` | Semantic role: `class` \| `interface` \| `abstract` \| `actor` \| `object` \| `state` \| `step` \| `lifeline` \| `group`. Informs `variant` mapping (§2.1). |
| `variant` | O | enum | `[engine]` | Rendering style: `concrete` (solid) \| `abstract` (dashed) \| `client` (subtle bg). Default `concrete`. |
| `members` | O | string[] (key\|text)[] | `[engine]` | Ordered list of member lines (fields/methods/notes). Localized. |
| `position` | O | object | `[engine]*` | `{ x, y, w, h }` in user units. See §2.2. |
| `metadata` | O | object | `[reserved]` | Type-specific extension bag (e.g. `{ stereotype, order, isInitial, isFinal }`). Ignored by class rendering. |
| `ariaLabel` | O | string (key\|text) | `[engine]` | Explicit accessible label. Falls back to `label` + members when omitted. Localized. |
| `focusable` | O | boolean | `[engine]` | Whether the node is keyboard-focusable. Default `true`. |
| `describedBy` | O | string | `[reserved]` | Id of a longer description node/text for richer screen-reader context. |

> `[engine]*` — the engine currently reads geometry as the flat fields `x`, `y`,
> `w`, `h` on the node. The canonical schema groups them under `position`; a
> thin adapter (or a future engine minor version) may flatten `position`
> into those fields. Documented here as the authoring shape; see §7.3.

### 2.1 `kind` → `variant` mapping (no engine change)

| `kind` | Default `variant` |
|--------|-------------------|
| `class`, `object`, `step`, `state` | `concrete` |
| `interface`, `abstract` | `abstract` |
| `actor` | `client` |

An explicit `variant` always overrides the derived value.

### 2.2 `position` object

| Field | Req | Type | Description |
|-------|-----|------|-------------|
| `x` | R | number | Left, user units. |
| `y` | R | number | Top, user units. |
| `w` | O | number | Width. Default `160`. |
| `h` | O | number | Height. Default `64`. |

Coordinates snap to the spacing scale (multiples of 4) per `VISUAL_LEARNING_SPEC §3`.

---

## 3. Edge Schema

An edge connects two nodes. The engine routes it border-to-border
automatically; authors never supply pixel paths.

| Field | Req | Type | Mark | Description |
|-------|-----|------|------|-------------|
| `source` | R | string | `[engine]*` | `id` of the origin node. |
| `target` | R | string | `[engine]*` | `id` of the destination node. |
| `relationship` | R | enum | `[engine]*` | Semantic relationship (see §4). Maps to a rendering primitive. |
| `direction` | O | enum | `[reserved]` | `forward` (source→target, default) \| `backward` \| `both` \| `none`. Controls arrowhead placement. |
| `label` | O | string (key\|text) | `[engine]` | Edge caption at midpoint. Localized. |
| `style` | O | enum | `[reserved]` | Line style override: `solid` \| `dashed` \| `dotted`. Usually derived from `relationship`; explicit value wins. |
| `order` | O | number | `[reserved]` | Sequence step index (used by Sequence/Flow types to order messages). |
| `metadata` | O | object | `[reserved]` | Type-specific extension (e.g. `{ guard, trigger }` for State transitions). |

> `[engine]*` — the engine currently reads `from`, `to`, and `type`. The
> canonical schema uses the clearer `source`/`target`/`relationship`; the
> mapping is 1:1 and handled by a thin adapter or a future engine minor
> version (§7.3). No behavioral redesign is required.

---

## 4. Relationship Types

Authors express **semantic** relationships. Each maps to exactly one of the
engine's five **rendering primitives** (UML notation), so the vocabulary can
grow without new engine code.

| Semantic `relationship` | Rendering primitive | Line | Arrow/end marker | Typical use |
|-------------------------|---------------------|------|------------------|-------------|
| `inheritance` | inheritance | solid | hollow triangle | class extends class |
| `implementation` | inheritance | solid | hollow triangle | class implements interface |
| `association` | association | solid | open arrow | uses / references |
| `dependency` | dependency | dashed | open arrow | transient use / creates |
| `delegation` | association | solid | open arrow | forwards work to |
| `aggregation` | aggregation | solid | hollow diamond | has-a (shared) |
| `composition` | composition | solid | filled diamond | owns (exclusive) |
| `notification` | dependency | dashed | open arrow | observer notify / event |
| `command` | association | solid | open arrow | command execution / invoke |
| `flow` | association | solid | open arrow | control/data flow (Flow, Call Flow) |
| `transition` | association | solid | open arrow | state transition (State) |
| `message` | association | solid | open arrow | sequence message |

**Rule:** the five primitives (`inheritance`, `association`, `dependency`,
`aggregation`, `composition`) are the closed set the engine renders. Any new
semantic name must map to one of them. Adding a *primitive* is an engine change
and requires owner approval; adding a *semantic alias* is a schema-only change.

---

## 5. Visual Types & Future Extensibility

`type` selects how the universal `nodes`/`edges` structure is interpreted. All
ten types from `VISUAL_LEARNING_SPEC §2` reuse the same schema — no redesign.

| `type` | Nodes represent | Edges represent | Extra fields used |
|--------|-----------------|-----------------|-------------------|
| `class` *(default)* | classes/interfaces | UML relationships | `members`, `variant` |
| `object` | runtime instances | references | `metadata.stereotype` |
| `sequence` | lifelines/actors | messages | `edge.order`, `metadata` |
| `state` | states | transitions | `metadata.isInitial/isFinal`, `edge.metadata.trigger` |
| `flow` | steps/decisions | control flow | `edge.order`, `direction` |
| `callflow` | participants | call propagation | `edge.order` |
| `chain` | handlers | pass-along links | `edge.order` |
| `lifecycle` | phases | transitions | `metadata`, `edge.label` |
| `component` | components | provided/required | `variant` |
| `comparison` | two grouped diagrams | per-side edges | `legend`, `node.metadata.group` |

**Why no redesign is ever needed:**

- New visual types are added by defining a `type` value and (if needed)
  reading already-`[reserved]` fields (`order`, `metadata`, `direction`).
- The engine's core loop — *place nodes, route edges between them* — is
  invariant across every type.
- Type-specific richness lives in `metadata`/`order`, which are opaque to the
  base renderer and consumed only by the specialized view when built.

---

## 6. Localization Strategy

- **No language in the model.** Every human-readable field (`title`,
  `description`, `caption`, `label`, `members[]`, `ariaLabel`, `legend.label`,
  `edge.label`) holds **either** an i18n key **or** caller-provided localized
  text — never a hardcoded literal baked into the schema.
- **Resolution happens before render.** Text is resolved through the existing
  i18n system (EN/RU) at the call site; the engine receives final strings and
  escapes them. This matches the platform's current content pipeline.
- **Structure is language-neutral.** `id`, `type`, `kind`, `variant`,
  `relationship`, `direction`, coordinates, and geometry are stable across all
  locales, so one diagram model serves every language without duplication.
- **Convention:** when a field holds a key, use the diagram's namespace, e.g.
  `patterns.<slug>.diagram.<node>.label`. Keys and literal text must not be
  mixed within a single authored diagram.

---

## 7. Validation Rules

### 7.1 Required vs optional

**Diagram (top level)** — required: `id`, `type`, `title`, `nodes` (≥ 1).
Optional: everything else (`description`, `category`, `width`, `height`,
`edges`, `caption`, `legend`, `layout`, `meta`).

**Node** — required: `id`, `label`. Optional: all others (`position` is
required only for `layout: "manual"`, which is the default).

**Edge** — required: `source`, `target`, `relationship`. Optional: all others.

### 7.2 Constraints

- `id` (diagram & node) must be unique within its scope; node `id` matches
  `[a-zA-Z0-9_-]+`.
- `edge.source` and `edge.target` must each reference an existing node `id`.
- `edge.relationship` must be a defined semantic name (§4) that maps to a
  known primitive.
- `category` ∈ { `creational`, `structural`, `behavioral`, `""` }.
- `variant` ∈ { `concrete`, `abstract`, `client` }.
- `type` ∈ the set in §5.
- `width`/`height` and all `position` numbers are non-negative.
- Self-edges (`source === target`) are permitted (e.g. reflexive state
  transition, recursive composition).
- An empty `edges` array is valid (a diagram may show only participants).
- Text fields never contain markup; the engine escapes all supplied text.

### 7.3 Compatibility contract

- Fields marked **`[reserved]`** MUST be ignored by any consumer that does not
  understand them (forward compatibility). Producing them is always safe.
- The canonical authoring names (`position`, `source`, `target`,
  `relationship`) map 1:1 to the engine's current fields (`x/y/w/h`, `from`,
  `to`, `type`). This mapping is the responsibility of a thin adapter layer or
  a future **non-breaking** engine minor version — it changes no engine
  *behavior*, only field aliases.
- Unknown top-level fields MUST be ignored, never rejected.

---

## 8. Validation Checklist

- [x] Supports every GoF pattern — universal `nodes`/`edges` + ten `type`
      interpretations cover the simplest (Singleton, one node) to the most
      complex (Visitor/Mediator, many participants and relationships).
- [x] Requires no engine redesign — engine-consumed fields are marked
      `[engine]`; everything else is `[reserved]` and safely ignored.
- [x] Matches the approved `VISUAL_LEARNING_SPEC.md` — same visual catalog,
      variants, relationship notation, categories, and accessibility model.
- [x] Implementation-independent — plain, JSON-serializable data; no SVG/DOM
      assumptions.
- [x] Fully localizable — no language stored; keys or caller-provided text only.
