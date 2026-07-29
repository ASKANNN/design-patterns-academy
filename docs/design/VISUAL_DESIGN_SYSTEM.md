# Visual Design System — Design Patterns Academy

Version: 1.0
Phase: 12 — Visual Learning
Status: Proposed standard (design language only — no implementation)

> This document defines the **official Design Language** for the entire
> Visual Learning System. It is the permanent standard for every future
> educational illustration in the academy — the 23 GoF patterns first, and
> every later Software Engineering module after that.
>
> This is **specification only**. It creates no SVG, no JSON, no components,
> and changes no existing file. It sits alongside the already-approved
> [`VISUAL_LEARNING_SPEC.md`](./VISUAL_LEARNING_SPEC.md) (the *what* — visual
> types & accessibility), [`VISUAL_DATA_MODEL.md`](./VISUAL_DATA_MODEL.md)
> (the *data shape*), and [`PATTERN_VISUAL_INTEGRATION.md`](./PATTERN_VISUAL_INTEGRATION.md)
> (the *pipeline*). This document adds the missing layer: the *feel*.
>
> **Everything here resolves through existing tokens in
> `src/styles/base/tokens.css`.** No new colors, fonts, spacing, radii, or
> easings are introduced. Where a value is named, it is named by its
> existing token so both themes and future token changes propagate for free.

---

## 0. Why this document exists

The infrastructure is complete and correct. The engine renders, the data
model is sound, localization and accessibility are approved. But the
current output still *reads as an engineering artifact* — boxes, arrows,
a flat fill, a static frame. It teaches the structure but not the feeling,
and it does not reach the premium bar the project set for itself.

The gap is not technical. It is the absence of a shared **design language**:
a fixed grammar of composition, hierarchy, color, motion, and storytelling
that every diagram obeys. Once defined, that grammar makes every future
visualization consistent, memorable, and premium *by construction* — not by
per-diagram heroics.

This document defines that grammar.

---

## 1. Visual Philosophy

### The one-sentence standard

> **Every diagram is a calm product scene with a single glowing
> protagonist, where motion exists only to teach one idea.**

### What we are (inspiration)

| Reference | What we borrow |
|-----------|----------------|
| **Apple Developer** | Restraint, generous negative space, one confident subject per frame |
| **Stripe** | Layered surfaces, soft depth, a single accent used with discipline |
| **Linear** | Luminous dark theme, crisp typography, purposeful micro-motion |
| **Figma / Framer** | Objects that feel physical — light, elevation, material |
| **Raycast** | A hero object that glows; everything else recedes |
| **React.dev** | Illustrations that *explain a concept*, friendly but not childish |

### What we are NOT

- Not UML software (PlantUML, Mermaid, draw.io).
- Not a wireframe: no grey placeholder pills, no hairline-only rectangles.
- Not decoration: no motion that does not carry meaning.
- Not bespoke art: no unique illustration per pattern. **One grammar, 23 patterns.**

### The five governing principles

1. **One protagonist.** Each frame has exactly one focal object. If the eye
   cannot find it in under one second, the frame has failed.
2. **Depth over outline.** Objects have material — light from the top-left,
   soft elevation, a luminous accent. Never a flat fill pretending to be a shape.
3. **Motion is pedagogy.** Animation shows *what happens first, what changes,
   and what stays constant.* If an animation can be removed without losing
   meaning, remove it.
4. **Calm density.** Negative space is composed, not leftover. Fewer nodes,
   larger, better spaced. When in doubt, remove a node.
5. **The same way, every time.** Consistency is the feature. A learner who
   understands one diagram already understands how to read all 23.

---

## 2. Visual Hierarchy

Every diagram assigns each element to exactly **one of three tiers**. The
tiers are expressed through *size, elevation, color saturation, and motion* —
in that priority order.

| Tier | Role | Treatment | Motion |
|------|------|-----------|--------|
| **Primary** — the protagonist | The object the pattern is *about* (the Singleton instance, the Mediator, the Subject) | Largest (~2–2.5× a secondary). Accent gradient material. Rim light + ambient glow. Owns the optical center. | Appears **first**. Pulses/glows. Is the target or source of the key action. |
| **Secondary** — the actors | Who calls, observes, or collaborates (clients, observers, handlers) | Neutral elevated surface (`--color-bg-elevated`), quiet single icon, `--shadow-md`. ~40% of the primary's visual weight. | Appears **second**, staggered. Static once settled. |
| **Supporting** — the connective tissue | Connectors, labels, badges, captions | Thin, low-contrast, `--color-text-tertiary`. Never competes. | Appears **last**. Only the *active* connector animates. |

### How the eye travels

The intended scan path is **always the same three beats**:

1. **Land on the protagonist** (center, glowing) — *"this is the thing."*
2. **Sweep out to the actors** (the ring/column of secondaries) — *"these use it."*
3. **Return along the active connector** to the protagonist — *"this is how,
   and it always comes back to the one."*

Attention is controlled by **contrast of saturation and light**, never by
color count. The protagonist is the only saturated, glowing element; the
loop of motion keeps pulling the eye back to it. Everything else is quiet on
purpose.

### Anti-patterns (forbidden)

- Two elements of equal maximum weight (no co-stars).
- All connectors terminating on the same point (reads as a funnel, hides order).
- Enumerated `① ② ③` labels used to *substitute* for showing order in motion.
- Monospace method signatures stamped on every node (drags the frame back to "API doc").

---

## 3. Composition System

A diagram never invents a layout. It selects **one** of the ten canonical
compositions below. Each maps to a shape of understanding, so choosing the
composition is choosing what the learner will *feel*.

> Composition is chosen by **concept**, not by category. Two creational
> patterns can use different compositions if they teach different shapes.

| # | Composition | The shape of the idea | Use when the pattern is about… | Primary example patterns |
|---|-------------|-----------------------|--------------------------------|--------------------------|
| 1 | **Hub** | Many → one center | one shared/coordinating object | Singleton, Mediator, Facade |
| 2 | **Flow** | Left → right stages | a directional request/response path | Adapter, Proxy, Template Method |
| 3 | **Timeline** | Ordered beats over time | *order* of messages mattering | Observer, Command, Memento |
| 4 | **Cycle** | Closed loop | repetition / iteration / return-to-start | Iterator, State (looping) |
| 5 | **Layered** | Concentric / stacked wrapping | wrapping & delegation outward-in | Decorator, Proxy, Bridge |
| 6 | **Comparison** | Two mirrored halves | contrasting two related ideas | Strategy vs State, Adapter vs Facade |
| 7 | **Tree** | Root → branches → leaves | recursive part–whole hierarchy | Composite, Interpreter |
| 8 | **Pipeline** | Sequential build stations | incremental construction | Builder, Abstract Factory |
| 9 | **State Machine** | Nodes + labeled transitions | discrete states & triggers | State, Memento |
| 10 | **Network / Traversal** | Nodes + a moving visitor | a mobile agent walking a structure | Visitor, Chain of Responsibility |

### Composition rules

- **One primary composition per visual.** Secondary visuals (allowed by
  `VISUAL_LEARNING_SPEC` §2) may use a second composition when it adds real
  understanding.
- **Center of gravity.** Hub/Cycle/Tree are radial and centered. Flow/Pipeline/
  Timeline read left→right. Layered is concentric. Comparison is split.
- **Node budget.** Aim for **3–5 secondary nodes**. Above 6, abstract the rest
  into a single "…and N more" token rather than drawing them all.
- **Breathing room.** Minimum gutter between any two nodes ≥ `--space-8`;
  outer padding of the scene ≥ `--space-8` (`--space-5` on mobile). Whitespace
  frames the protagonist.

---

## 4. Visual Identity

All values below map to existing tokens. This is the material vocabulary
shared by every diagram.

### Scene container

| Property | Token | Notes |
|----------|-------|-------|
| Surface | `--color-bg-surface` → subtle wash to `--color-bg-subtle` | Composed field, not a flat block |
| Border | `1px solid --color-border` | Quiet frame |
| Radius | `--radius-xl` (16px) | Matches card language |
| Padding | `--space-8` (desktop) / `--space-5` (mobile) | Generous margins |
| Elevation | `--shadow-sm` | The scene itself sits calmly; drama lives inside |

### Secondary card (actors)

| Property | Token |
|----------|-------|
| Fill | `--color-bg-elevated` |
| Border | `1px solid --color-border` (→ `--color-border-strong` on hover) |
| Radius | `--radius-lg` (12px) |
| Elevation | `--shadow-md` |
| Inner padding | `--space-4` |
| Icon ↔ label gap | `--space-3` |

### Primary object (protagonist)

| Property | Token / rule |
|----------|--------------|
| Fill | Accent gradient (see §6) built from category accent |
| Border | none — replaced by a **rim light** (1px inner `--color-accent` at low opacity) |
| Radius | `--radius-2xl` (24px) — softer, more physical than actors |
| Ambient glow | Colored soft shadow from the category accent (see §6 glow rules) |
| Text on accent | `--color-accent-text` (never a raw hex) |
| Size | ~2–2.5× a secondary card |

### Icon containers

- **Actor icons:** inline glyph on the card, tinted `--diagram-accent`, no container.
- **Emphasis / process icons:** seated in a **rounded-square chip** — fill
  `--color-accent-subtle`, radius `--radius-md`, icon in `--color-accent`.
- **On-accent icons** (inside the protagonist): `--color-accent-text`, no chip.

### Labels, badges, captions

| Element | Font | Size token | Weight | Color |
|---------|------|-----------|--------|-------|
| Node title | `--font-sans` | `--text-sm`…`--text-base` | `--font-weight-semibold` | `--color-text-primary` |
| Node kicker (optional, uppercase) | `--font-sans` | `--text-xs`, `--tracking-wider` | `--font-weight-medium` | `--color-text-tertiary` |
| Connector label | `--font-sans` | `--text-xs` | `--font-weight-medium` | `--color-text-secondary`, haloed with `--color-bg-surface` |
| Badge (count/marker) | `--font-sans` | `--text-sm` | `--font-weight-bold` | on `--color-accent-subtle` chip, text `--color-accent` |
| Caption | `--font-sans` | `--text-sm` | `--font-weight-regular` | `--color-text-tertiary`, centered |

**Method signatures** (`getInstance()`, `notify()`) belong in the caption or
appear on interaction — **never** stamped in monospace on every node.

### Spacing & elevation ladder

- Spacing steps come only from the `--space-*` scale.
- Elevation ladder (low→high): scene `--shadow-sm` < actor `--shadow-md` <
  protagonist ambient glow. Elevation encodes hierarchy — the most important
  object is the most elevated.

---

## 5. Iconography

Icons are not decoration — they are **vocabulary**. A learner must be able to
recognize "this is storage," "this is a request," "this is an event" across
all 23 patterns without a legend.

### Icon philosophy

- **One coherent family.** Uniform optical size, rounded joins/caps, 2px
  stroke on a 24px grid, drawn on the same visual weight.
- **Two-tone allowed for the protagonist only** (fill + stroke) so it reads as
  material; all others are single-stroke `currentColor`.
- **Meaningful, not literal.** An icon encodes a *role in the pattern*, not a
  real-world object.
- **Always `aria-hidden`** — icons are a second channel; the accessible name
  lives in the node label (per the approved accessibility spec).

### The canonical icon roles

| Role | Meaning in the language | Visual idea |
|------|-------------------------|-------------|
| **Category — Creational** | "something is being made" | forming cube / spark of creation |
| **Category — Structural** | "things are composed" | interlocking blocks |
| **Category — Behavioral** | "things collaborate over time" | linked arrows / pulse |
| **Object / Instance** | the protagonist object | solid rounded chip with rim light |
| **Client / Actor** | an external caller | small person / cursor dot |
| **Process / Operation** | work happening | gear / running arrow |
| **Storage / Cache** | a held, reused value | database drum / vault |
| **Event / Notification** | a broadcast signal | radiating waves |
| **Request** | an inbound ask | arrow into a target |
| **Response** | a returned value | arrow out, with a token |
| **State** | a discrete mode | labeled node / status dot |
| **Guard / Condition** | a branch/decision | diamond / fork |

> These roles are **fixed vocabulary**. New patterns reuse them; they do not
> invent new glyphs. Extending this set is a design-system change requiring
> owner approval — the same discipline as extending the visual-type catalog.

---

## 6. Color System

Color models **light and material**, and encodes **category** — never
decoration. One saturated accent per frame, everything else neutral.

### Neutral surfaces (the field)

| Use | Light | Dark |
|-----|-------|------|
| Scene base | `--color-bg-surface` | `--color-bg-surface` (#111318) |
| Scene wash | `--color-bg-subtle` | `--color-bg-subtle` (#0F1117) |
| Actor fill | `--color-bg-elevated` | `--color-bg-elevated` (#1A1D24) |
| Text | `--color-text-primary / -secondary / -tertiary` | same tokens |

### Category accents (the protagonist's hue)

Driven by a single local var `--diagram-accent`, resolved per category:

| Category | Token |
|----------|-------|
| Creational | `--palette-category-creational` (#8B5CF6) |
| Structural | `--palette-category-structural` (#06B6D4) |
| Behavioral | `--palette-category-behavioral` (#F59E0B) |
| Neutral / cross-category | `--color-accent` (indigo) |

### Gradients (material, not label)

A protagonist gradient is a **tri-stop accent ramp**, not the same hue at two
opacities:

- Stop 0 — `--diagram-accent` at full (the lit face, top-left).
- Stop 1 — `--diagram-accent` mixed toward its darker step (the shaded face).
- Optional highlight — a soft near-white sheen at the top edge for glassiness.

Direction is a consistent top-left → bottom-right light source across all
diagrams (one imaginary sun).

### Glow rules

- **Glow belongs to the protagonist only.** It is a soft, colored ambient
  shadow (`--diagram-accent` at low opacity) *plus* a 1px inner rim light.
- **Light theme:** glow is a gentle colored halo — subtle, never neon.
- **Dark theme:** glow is stronger and does the work `--shadow-*` cannot —
  dark scenes get depth from **colored ambient light and rim, not black drop
  shadows.** Dark must look *better* than light, not inverted.
- Secondary/supporting elements **never** glow.

### Semantic colors (used sparingly, by meaning)

| Meaning | Token | Example use |
|---------|-------|-------------|
| Success / created / committed | `--color-success` | "instance created", "state saved" |
| Warning / mutation / caution | `--color-warning` | "state changed", "side effect" |
| Attention / error / rejected | `--color-error` | "request unhandled", "invalid transition" |
| Info / passive data | `--color-info` | neutral data packets |

Semantic colors are **accents on motion tokens** (a packet, a pulse) — they
never repaint whole surfaces, and never compete with the protagonist.

---

## 7. Motion Language *(the most important section)*

> **Motion must teach. If it only decorates, delete it.**

Motion is the one channel a static book diagram lacks — so it must carry the
part of the lesson that is *temporal*: what happens first, what changes, what
stays constant. Every animation below answers a specific pattern question.

### Timing & easing (tokens only)

- Entrances: `--duration-slow` with `--ease-out`.
- Emphasis pulses/glows: `--duration-slower`, `--ease-in-out`, looped gently.
- Traveling packets: `--duration-crawl`, `--ease-smooth`.
- Springy "settle" for a newly created object: `--ease-spring`.
- **`prefers-reduced-motion`:** every diagram must resolve to a **single
  composed still frame** that carries the full lesson with zero animation
  (already enforced globally in `tokens.css`).

### The reusable motion primitives

Each primitive is a named, reusable behavior — the animation equivalent of the
icon vocabulary. Patterns compose these; they do not invent new motion.

| Primitive | What the learner sees | Concept it teaches |
|-----------|-----------------------|--------------------|
| **Request packet** | A dot travels *along a connector into* a target | "a call is being made" |
| **Response packet** | A token travels *back out* to the caller | "a value is returned" |
| **Object creation** | Target blooms/scales-in with a spring + bright ring | "created — for the first time" |
| **Object reuse** | Target does **not** re-bloom; the same token returns; count badge pulses | "reused — still only one" |
| **Broadcast / notify** | Concentric waves radiate from a source to all listeners at once | Observer notification |
| **Swap** | One object slides out, another slides into the *same slot* | Strategy replacement |
| **Execute / enqueue** | A packet lands in a queue slot, later fires | Command execution |
| **State transition** | Active-state highlight moves along a labeled edge to a new node | State change |
| **Traversal** | A "visitor" token walks node→node, each lighting as visited | Visitor / iteration |
| **Propagation** | A request hops handler→handler until one lights "handled" | Chain of Responsibility |
| **Wrap** | Layers animate on *around* a core, outermost last | Decorator wrapping |

### Motion choreography (the fixed three-act structure)

1. **Act I — Establish (0–500ms):** protagonist appears first (creation/scale +
   glow). The thesis of the frame is on screen alone.
2. **Act II — Populate (500–1000ms):** secondaries stagger in around it; the
   scene is now complete but *static*.
3. **Act III — Demonstrate (1000ms+):** the teaching loop runs — the pattern's
   signature primitive(s) play, slowly, and **loop**. The protagonist pulses/
   glows on each beat so the eye keeps returning to it.

What **moves**: packets, the active connector, a transitioning highlight.
What **pulses**: the protagonist, the count/marker badge.
What **glows**: the protagonist rim + ambient — always, gently.
What stays **absolutely static**: the layout, the frame, and any quantity that
the pattern promises is constant (e.g. the Singleton instance count). *That
stillness is itself the lesson.*

---

## 8. Educational Storytelling

Every visualization is a **three-beat story**, mapped onto the motion acts:

| Beat | The learner's question | How the frame answers |
|------|------------------------|-----------------------|
| **Setup** | "What is the important thing here?" | Protagonist appears first, alone, glowing. |
| **Action** | "What happens, and in what order?" | Secondaries populate, then the signature motion plays. |
| **Resolution** | "What changed? What stayed the same?" | The loop resolves to a stable state; a caption names the takeaway. |

Every diagram must make these five things unambiguous:

1. **What happens first** — the protagonist's entrance.
2. **What happens second** — the first primitive (e.g. first request → creation).
3. **What changes** — shown in motion + a semantic color beat.
4. **What stays constant** — the static element / unchanging badge.
5. **What to remember** — the caption: one plain sentence, the single takeaway.

> The caption is the story's moral. It must be understandable *without reading
> the surrounding article* — the diagram + caption alone should convey the
> pattern's essence.

---

## 9. Premium Quality Checklist

No visualization ships until it answers **yes** to every question. This is the
review gate for all 23 patterns and every future module.

**Focus & hierarchy**
- [ ] Can you identify the single focal object in under 1 second?
- [ ] Is the protagonist clearly ~2× the weight of any other element?
- [ ] Is there exactly one saturated/glowing element?

**Clarity & teaching**
- [ ] Does the animation *explain* the pattern (not merely decorate)?
- [ ] Is the order of events unmistakable from motion alone?
- [ ] Is it clear what changes and what stays constant?
- [ ] Can a learner grasp the idea from the diagram + caption, without paragraphs?

**Craft & premium feel**
- [ ] Does the protagonist have real material (light, depth, glow) — not a flat fill?
- [ ] Is negative space composed, with no dead gaps or crowding?
- [ ] Does dark theme look *luminous* (colored glow/rim), not inverted-with-black-shadows?
- [ ] Does it look like Stripe/Linear/Raycast documentation — not UML software?

**Consistency & durability**
- [ ] Does it use only the canonical compositions, icons, colors, and motion primitives?
- [ ] Does every value resolve through an existing design token (no arbitrary hex/px)?
- [ ] Would it still look impressive **printed in a book** (static frame holds up)?
- [ ] Is it **memorable** — would a learner recognize the pattern from this image a week later?

**Accessibility & robustness** (already-approved constraints — re-verified here)
- [ ] Fully usable and meaningful with `prefers-reduced-motion`.
- [ ] Accessible names present; icons `aria-hidden`; keyboard-reachable focal nodes.
- [ ] Legible and balanced at mobile width.

---

## 10. Pattern → Composition Mapping

The recommended **primary composition** and **signature motion** for all 23
GoF patterns. This is guidance for the per-pattern work; a pattern may add a
secondary visual when it earns real understanding.

### Creational (accent: `--palette-category-creational`)

| Pattern | Composition | Protagonist | Signature motion / story |
|---------|-------------|-------------|--------------------------|
| **Singleton** | **Hub** | The single instance | Request → **creation** once → **reuse** (count stays 1) |
| **Factory Method** | **Flow** | The factory operation | Request → factory decides → correct product emerges |
| **Abstract Factory** | **Pipeline** | The factory family | One family selected → matching products produced together |
| **Builder** | **Pipeline** | The product under construction | Stations add parts step-by-step → `build()` yields the result |
| **Prototype** | **Hub** (clone burst) | The prototype | `clone()` → a copy buds off, original stays constant |

### Structural (accent: `--palette-category-structural`)

| Pattern | Composition | Protagonist | Signature motion / story |
|---------|-------------|-------------|--------------------------|
| **Adapter** | **Flow** | The adapter | Incompatible request enters → adapter translates → target understands |
| **Bridge** | **Comparison / Layered** | The abstraction↔implementation link | Abstraction and implementation vary independently on two axes |
| **Composite** | **Tree** | The root composite | Traversal recurses into branches → uniform treatment of part & whole |
| **Decorator** | **Layered** | The wrapped core | Layers **wrap** on outward-in → each adds behavior, core unchanged |
| **Facade** | **Hub** | The facade | One simple call fans out to many subsystems behind it |
| **Flyweight** | **Hub** | The shared flyweight | Many contexts point at one shared intrinsic object |
| **Proxy** | **Flow / Layered** | The proxy | Request hits proxy first → guarded/deferred → forwarded to real subject |

### Behavioral (accent: `--palette-category-behavioral`)

| Pattern | Composition | Protagonist | Signature motion / story |
|---------|-------------|-------------|--------------------------|
| **Chain of Responsibility** | **Network / Traversal** | The traveling request | Request **propagates** handler→handler until one handles it |
| **Command** | **Timeline / Pipeline** | The command object | Command **enqueued** → later **executed** (invoke/undo) |
| **Interpreter** | **Tree** | The expression tree | Traversal evaluates leaves→root into a result |
| **Iterator** | **Cycle** | The cursor | the editor **traverses** elements one at a time, looping to end |
| **Mediator** | **Hub** | The mediator | Colleagues talk only *through* the center — no direct links |
| **Memento** | **Timeline / State Machine** | The saved snapshot | State **saved** → mutated → **restored** to the snapshot |
| **Observer** | **Timeline (Broadcast)** | The subject | Subject changes → **notify** waves reach all observers at once |
| **State** | **State Machine** | The active state | Trigger → active highlight **transitions** to a new state |
| **Strategy** | **Comparison (Swap)** | The strategy slot | One strategy **swaps** out for another in the same slot |
| **Template Method** | **Flow** | The template skeleton | Fixed steps run in order; hook steps light up as overridable |
| **Visitor** | **Network / Traversal** | The visitor | Visitor **walks** the structure, each node lighting as visited |

> Compositions repeat on purpose (Hub appears for Singleton, Facade, Flyweight,
> Mediator). That repetition **is** the consistency payoff: a learner who reads
> one Hub reads them all.

---

## 11. Why this scales to future modules

This document is written as a **module-agnostic grammar**, not a
patterns-specific style sheet — which is exactly why it will carry the whole
academy, not just the GoF module.

1. **It is vocabulary, not artwork.** Ten compositions, a fixed icon-role set,
   one color/light model, eleven motion primitives. Any future topic
   (Algorithms, System Design, Databases, DevOps) expresses its ideas by
   *selecting* from this vocabulary — a sorting algorithm is a **Timeline**, a
   load balancer is a **Hub**, a request lifecycle is a **Flow**. No redesign.

2. **It is 100% token-driven.** Every surface, accent, radius, shadow, and
   easing resolves through `tokens.css`. A future module adds one category
   accent token and inherits the entire language — themes, dark mode, and
   accessibility included, for free.

3. **It enforces consistency by construction.** Because diagrams may only use
   canonical compositions/icons/motion, quality does not depend on the
   individual author. The quality checklist (§9) is the same gate for pattern
   #1 and module #7.

4. **It protects the approved architecture.** This is design language layered
   *on top of* the already-approved engine, data model, and pipeline. It asks
   for no engine rewrite, no routing change, no new folders — so adopting it
   never threatens the locked architecture.

5. **It optimizes for memory and reuse.** The whole system is tuned so a
   learner remembers the *shape* of an idea and recognizes it again elsewhere.
   That transfer is precisely what a long-term, multi-module education platform
   is for.

---

## 12. Relationship to existing documents

| Document | Owns | This document adds |
|----------|------|--------------------|
| `VISUAL_LEARNING_SPEC.md` | Visual **types**, accessibility, mapping rules | The **feel** for those types |
| `VISUAL_DATA_MODEL.md` | The declarative **data shape** | What the data should *render as* |
| `PATTERN_VISUAL_INTEGRATION.md` | The **pipeline** (data → engine → page) | The design standard the pipeline must meet |
| **`VISUAL_DESIGN_SYSTEM.md`** *(this)* | Philosophy, hierarchy, composition, identity, icons, color, motion, storytelling, quality gate, mapping | — |

No existing document is modified. This one is additive and sits beside them in
`docs/design/`.

---

*End of specification. Design language only — no implementation is authorized
by this document. Await review before any diagram work proceeds.*
