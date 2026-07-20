# Pattern ↔ Visual Learning Integration

Version: 1.0
Phase: 12 — Visual Learning
Status: Approved standard (integration architecture only)

> This document is the **permanent contract** between educational content
> (Pattern JSON, Gold Standard) and the visual learning system (Diagram Engine
> + Visual Data Model). It defines *where* visual data lives, *how* multiple
> diagrams coexist, *how* future modules reuse the architecture, *how*
> localization integrates, and *how* migration stays non-breaking.
>
> It implements nothing. No diagram, engine, JSON, page, component, routing, or
> localization file is created or modified by this task.
>
> The repository is the single source of truth. This contract is **additive
> and fully optional**: every existing pattern JSON remains valid unchanged.

Related approved documents:
- `docs/design/VISUAL_LEARNING_SPEC.md` — visual catalog, style, a11y.
- `docs/design/VISUAL_DATA_MODEL.md` — the diagram data schema (§ referenced as *VDM*).

---

## 0. Grounding facts (existing Gold Standard)

Observed from the approved Singleton reference (`src/data/patterns/creational/singleton.json`):

- A pattern is a flat object with top-level fields: `slug`, `name`,
  `category`, `complexity`, `popularity`, `also_known_as`, `tags`, `intent`,
  `problem`, `solution`, `structure`, `implementation`, `pros`, `cons`,
  `when_to_use`, `real_world_examples`, `related_patterns`.
- **Localized text uses inline objects**: `{ "en": "…", "ru": "…" }`. The
  project does **not** use external i18n keys inside pattern JSON.
- `structure` already contains `description` (localized) and `participants[]`.

These facts drive every decision below so the contract matches reality and
requires no engine or schema redesign.

---

## 1. Where Visual Data Lives

### Decision: a new **optional top-level `visuals` array**.

```jsonc
{
  "slug": "singleton",
  "name": "Singleton",
  "category": "creational",
  // …all existing fields unchanged…
  "related_patterns": [ /* … */ ],

  "visuals": [ /* zero or more Diagram Models (VDM §1) */ ]
}
```

### Why top-level `visuals` (and not nested under `structure` / `learning`)

| Option | Verdict | Reason |
|--------|---------|--------|
| Nest under `structure` | ✗ | `structure` is scoped to the UML *class structure* (`description` + `participants`). Visuals also cover sequence, state, flow, lifecycle, comparison — broader than `structure`'s meaning. Overloading it would couple unrelated concerns. |
| New `learning` wrapper | ✗ | Introduces a second grouping concept for one feature; heavier than needed and changes the shape's mental model. |
| **New top-level `visuals[]`** | ✓ | Purely additive, sibling to existing fields, self-contained, and matches the flat top-level convention already used by every other field. Absent field = no visuals, zero effect. |

- `visuals` is an **array** so a pattern can carry several diagrams.
- Each array item is exactly one **Diagram Model** as defined by *VDM §1*
  (`id`, `type`, `title`, `nodes`, `edges`, …). Integration adds **no new
  fields** to the Visual Data Model — it only chooses its home.
- Order in the array is the intended display order.

---

## 2. Representing Multiple Diagrams

A pattern lists one Diagram Model per visual; the `type` field (VDM §5)
distinguishes them. The overall JSON structure never changes — only array
length grows.

```jsonc
"visuals": [
  { "id": "singleton-class",    "type": "class",      "title": { "en": "…", "ru": "…" }, "nodes": [ /* … */ ], "edges": [ /* … */ ] },
  { "id": "singleton-lifecycle","type": "lifecycle",  "title": { "en": "…", "ru": "…" }, "nodes": [ /* … */ ], "edges": [ /* … */ ] }
]
```

- **Baseline:** the first visual SHOULD be the mandatory UML **`class`**
  diagram (per `VISUAL_LEARNING_SPEC §2` — every pattern has one class diagram).
- **Additional visuals** are drawn from the fixed catalog (`sequence`, `state`,
  `flow`, `callflow`, `chain`, `lifecycle`, `component`, `comparison`, `object`).
- Simple patterns (Singleton, Prototype) may carry a single `class` visual;
  complex patterns (Visitor, Mediator, Chain of Responsibility) add more —
  **without any structural change**, because it is still just more array items.
- Each `visuals[].id` MUST be unique within the pattern (it namespaces engine
  marker ids). Convention: `<slug>-<type>` (e.g. `mediator-sequence`).

---

## 3. Reuse by Future Software Engineering Modules

The `visuals[]` contract is **module-agnostic**. It attaches to *content
objects*, not to "patterns" specifically. Any future module's content JSON
(Algorithms, Data Structures, Networking, System Design, DevOps, Cloud, …)
adopts the identical field with zero redesign:

```jsonc
// e.g. a future algorithms/quicksort.json
{
  "slug": "quicksort",
  "name": "Quicksort",
  // …module-specific fields…
  "visuals": [
    { "id": "quicksort-flow", "type": "flow", "title": { "en": "…", "ru": "…" }, "nodes": [], "edges": [] }
  ]
}
```

**Why this generalizes without redesign:**

- The Diagram Engine and Visual Data Model know nothing about GoF — they
  consume generic `nodes`/`edges`/`type`. Algorithms use `flow`/`sequence`,
  Data Structures use `object`/`component`, Networking uses `sequence`/`flow`,
  System Design uses `component`, etc. — all already in the catalog (VDM §5).
- The same rendering primitives and the same `visuals[]` location apply
  everywhere, so a new module reuses the *entire* visual stack by simply
  including a `visuals` array in its content records.
- This directly serves the platform mission: **expand the platform without
  redesigning the existing architecture**. Visual learning becomes a shared,
  cross-module capability, defined once here.

---

## 4. Localization Integration

Visual content follows the **existing Gold Standard convention**, not external
keys, so it is consistent with every other localized field in pattern JSON.

- Every human-readable field inside a visual — `title`, `description`,
  `caption`, each node `label`, each `members[]` entry, `ariaLabel`,
  `legend[].label`, each edge `label` — is an **inline localized object**:

  ```jsonc
  "label": { "en": "Singleton", "ru": "Одиночка" }
  ```

- **Non-text fields stay language-neutral**: `id`, `type`, `kind`, `variant`,
  `relationship`, `direction`, coordinates/geometry, `order`. One visual model
  therefore serves both locales — no per-language duplication of structure.
- **Resolution point:** the page composition layer resolves each `{en, ru}`
  object to the active language *before* passing the model to the engine (the
  engine receives final strings and escapes them, exactly as it does today for
  all other content). The engine remains language-unaware.
- This satisfies *VDM §6* ("no language stored in the engine; caller-provided
  localized text"): here the "caller-provided text" is supplied by the
  inline-`{en, ru}` convention already used across the project.
- **Reconciliation with VDM §6:** VDM permits *either* i18n keys *or* inline
  localized text. Pattern JSON standardizes on **inline `{en, ru}`** to match
  the Gold Standard. Future modules MAY choose keys if they adopt a key-based
  content pipeline; the engine supports both because it only ever sees resolved
  strings.

---

## 5. Migration Strategy

**Principle: additive-only, zero breaking changes.**

- `visuals` is **optional**. The current 23 pattern JSON files contain no
  `visuals` field and therefore **remain valid and unchanged**. No migration,
  rewrite, or regeneration of existing content is performed or required.
- **Absence = no visuals.** A pattern without `visuals` renders exactly as
  today; the visual section simply does not appear (visual learning is fully
  optional and progressively enhanced — `VISUAL_LEARNING_SPEC §1`).
- **Adoption is incremental and per-pattern.** Visuals are added one pattern at
  a time in later Phase-12 implementation tasks (starting from the Gold
  Standard reference), never in bulk, never touching unrelated files.
- **No schema versioning break.** Because the change is a new optional sibling
  field, existing consumers that ignore unknown fields keep working; the JSON
  "shape" is unchanged for every field they already read.
- **Rollback-safe.** Removing a `visuals` array returns a pattern to its exact
  prior behavior.

> This task itself modifies **no** JSON. It only defines where visuals will
> live when a future task adds them.

---

## 6. Validation Rules

### 6.1 Presence & shape
- `visuals` is OPTIONAL. When present it MUST be an array (may be empty; an
  empty array is treated identically to absence).
- Each array element MUST be a valid Diagram Model per *VDM §1* (required:
  `id`, `type`, `title`, `nodes` with ≥ 1 node).

### 6.2 Identity
- Every `visuals[].id` MUST be unique within the pattern.
- Recommended id convention: `<slug>-<type>`.
- Node/edge ids follow *VDM §7.2* (unique within a diagram; edges reference
  existing node ids).

### 6.3 Baseline & catalog
- If a pattern defines any visuals, the first SHOULD be `type: "class"`.
- `type` MUST belong to the fixed catalog (*VDM §5*); `relationship` values MUST
  map to the five engine primitives (*VDM §4*). No new visual type or primitive
  may be introduced here without owner approval.

### 6.4 Localization
- Every human-readable visual field MUST be an inline `{ "en": …, "ru": … }`
  object with both locales present (matching the Gold Standard requirement that
  content ships complete in EN and RU).
- Non-text fields MUST remain language-neutral.

### 6.5 Compatibility
- Unknown fields inside a visual MUST be ignored, never rejected (forward
  compatibility, *VDM §7.3*).
- Existing pattern JSON without `visuals` MUST validate unchanged.

---

## 7. Validation Checklist

- [x] **Gold Standard remains valid** — `visuals` is a new optional top-level
      sibling; Singleton and all existing fields are untouched and still valid.
- [x] **Existing JSON remains compatible** — the 23 current files need no edits;
      absence of `visuals` = current behavior.
- [x] **Future modules require no redesign** — the same `visuals[]` + Visual
      Data Model + engine serve Algorithms, Data Structures, Networking, System
      Design, DevOps, Cloud, etc.
- [x] **Visual learning remains fully optional** — no `visuals` ⇒ no visual
      section; progressive enhancement preserved.
- [x] **Matches approved specs** — reuses the Visual Data Model unchanged and
      the Diagram Engine unchanged; adds only a documented home and localization
      convention.
