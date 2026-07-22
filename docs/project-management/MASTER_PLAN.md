DESIGN PATTERNS ACADEMY
MASTER IMPLEMENTATION PLAN

============================================================
PROJECT VISION
============================================================

Design Patterns Academy is not a collection of static UML diagrams.

It is an interactive educational system for learning all 23 classic GoF Design Patterns.

The primary goal is:

A beginner should understand the CORE IDEA of a pattern visually within approximately 5 seconds.

Every pattern must answer visually:

1. What problem exists?
2. Why does this pattern exist?
3. Who are the important participants?
4. How does control/data/request/state move?
5. What is the key moment that makes this pattern different from another pattern?
6. What should the learner remember after the animation ends?

The visualization must teach the pattern.

It must NOT merely display its class structure.

============================================================
CURRENT PROJECT STATUS  (re-audited directly against the code, 2026-07-22 —
the previous version of this section was stale/inaccurate; see note below)
============================================================

Legend:

BESPOKE   = has its own semantic Diagram.js layout (own `style` value),
            matches the VISUAL UNIQUENESS RULE, considered DONE.
GENERIC   = has a `visuals` block, but it renders through the generic
            `style: "concept"` fallback (Client -> Box -> Box -> Box).
            This is explicitly the thing PHASE 3 says not to default to.
            interactives.js already has a full timeline for every one
            of these — only the bespoke layout + matching node data
            is missing.
MISSING   = no `visuals` block in the JSON at all. PatternDetailPage.js
            renders nothing for Structure/Interactive on that page.
            interactives.js ALSO already has a full timeline written
            for every one of these (pre-written ahead of data, contrary
            to the "one pattern at a time" rule below — already done,
            not worth discarding, but do not repeat this pattern).

CREATIONAL — 1 BESPOKE / 4 GENERIC

Singleton            BESPOKE (`singleton`) — committed (client stack ->
                     shared instance card; ghost-duplicate visual was
                     tried and removed after review; light-theme
                     viewport background strengthened; a CSS
                     specificity bug that silently blocked the
                     glow-on-pulse animation was found and fixed here
                     first, 2026-07-21)
Factory Method       GENERIC
Abstract Factory     GENERIC
Builder              GENERIC (Director node + optional-invokes edge
                     added so the diagram matches the real pattern's
                     roles; oversized "Product" card text centered,
                     2026-07-22 — still GENERIC layout, not bespoke)
Prototype            GENERIC


STRUCTURAL — 4 BESPOKE / 3 GENERIC

Adapter              GENERIC
Bridge               GENERIC (oversized "Implementation" card text
                     centered, 2026-07-22 — still GENERIC layout)
Composite            GENERIC (oversized "Composite" card text
                     centered, 2026-07-22 — still GENERIC layout)
Decorator            BESPOKE (`nested`) — quality reference, committed
                     (core-rail packet-occlusion fix applied earlier;
                     2026-07-21: its continuous "core-breathe" idle
                     animation was found to block the glow-on-pulse
                     animation independent of CSS specificity — now
                     paused while the pulse is active)

Facade               BESPOKE (`facade`) — committed
Flyweight            BESPOKE (`pool`) — committed
Proxy                BESPOKE (`gateway`) — committed
                     (row-centering fix applied earlier)


BEHAVIORAL — 8 BESPOKE / 1 GENERIC

Chain of Responsibility  BESPOKE (`chain`) — committed
Command                  BESPOKE (`command`) — committed
                         (row-centering + socket packet-occlusion
                         fixes applied earlier)
Interpreter              BESPOKE (`expression`) — committed
                         (entry-edge label + final "= 13" result
                         badge on the Client card, intent copy
                         rewritten to lead with the worked example)
Iterator                 BESPOKE (`cursor`) — committed
                         (fixed an entrance-animation `fill-mode: both`
                         bug that pinned cell/card opacity at 1 and
                         silently broke the dim/active/passed states —
                         same class of bug as the gateway fix, now
                         also patched for `.diagram--cursor`)
Mediator                 BESPOKE (`hub`) — committed
                         (hub-and-spoke: mediator card centered, N
                         colleague cards ringed around it, spokes
                         computed via rectangle-edge intersection so
                         it works for any colleague count; a dashed
                         "blocked ring" with no-entry badges between
                         adjacent colleagues makes the forbidden
                         direct-communication path visible — reuses
                         the Proxy gateway's no-entry visual grammar)
Memento                  BESPOKE (`memento`) — committed
                         (Editor/History card text centered, 2026-07-22)
Observer                 BESPOKE (`broadcast`) — committed
State                    BESPOKE (`state`) — committed
Strategy                 BESPOKE (`slot`) — committed (client -> context
                         -> interface card -> vertically-racked concrete
                         strategy cards inside a labeled dashed region;
                         2026-07-22: fixed a missing `glow` action that
                         left the selected strategy card lit but not
                         glowing)
Template Method          BESPOKE (`skeleton`) — implemented (client ->
                         fixed-order ReportGenerator spine with
                         header()/body()/footer() rows, body() marked
                         required — fans out to a vertically-stacked,
                         non-overlapping pair of concrete report cards
                         off a single hook "port"; 2026-07-22: first
                         layout attempt stacked the concrete cards as
                         an overlapping "deck" for a same-slot-swap
                         metaphor, but that collided with the shared
                         `[data-viz-state='dim'] { opacity: 0.32 }`
                         rule — dimmed opaque card backgrounds turned
                         translucent and let the covered card's text
                         bleed through; replaced with a plain
                         non-overlapping stack, which reads fine with
                         the `swap` primitive's fade/slide transition)
Visitor                  GENERIC


> **2026-07-21 systemic fix:** every BESPOKE diagram whose emphasis
> card used a two-class `.diagram--X .diagram__card--emphasis { filter }`
> override had a CSS specificity bug — that override always beat
> `[data-viz-glow='true']` (lower specificity), so the animated
> "pulse glow" action never visibly rendered on the emphasis card no
> matter which timeline triggered it. Found via a user bug report on
> Singleton, confirmed systemic across nested/facade/pool/gateway/
> command/expression/cursor/hub, and fixed in all of them (Decorator's
> continuous `core-breathe` idle animation needed a separate fix — it
> overrides `filter` regardless of specificity while it's running, so
> it's now paused specifically while `data-viz-glow='true'`). Keep this
> in mind when designing new bespoke diagrams: never give an
> `.diagram--X .diagram__card--emphasis` rule higher specificity than
> a single class/attribute selector, and never run a continuous
> filter-animation on a node that VisualEngine's `glow()` action can
> also target.


TOTALS

BESPOKE (truly done):  15 / 23  (Singleton, Decorator, Facade,
                        Flyweight, Proxy, Chain, Command, Interpreter,
                        Iterator, Mediator, Memento, Observer, State,
                        Strategy, Template Method — push status not
                        tracked here, confirm with `git log` /
                        `git status`)
GENERIC (needs rework):  8 / 23  (Factory Method, Abstract Factory,
                        Builder, Prototype, Adapter, Bridge, Composite,
                        Visitor)
MISSING (needs data):    0 / 23


STRICT IMPLEMENTATION ORDER (updated 2026-07-21):

Facade      → QA → commit → push      DONE
Flyweight   → QA → commit → push      DONE
Proxy       → QA → commit → push      DONE
Command     → QA → commit → push      DONE
Interpreter → QA → commit → push      DONE
Iterator    → QA → commit → push      DONE
Mediator    → QA → commit → push      DONE
Memento     → QA → commit                DONE
Observer    → QA → commit                DONE
State       → QA → commit                DONE
Singleton   → QA → commit                DONE (upgraded from the
                                          Gold Standard's GENERIC
                                          diagram to `singleton`)
Strategy    → QA → commit                DONE (upgraded to `slot`)
Template Method → QA                     DONE (upgraded to `skeleton`;
                                          implemented + visually QA'd
                                          light/dark x EN/RU + full
                                          animation timeline, not yet
                                          committed)

NEXT, in this exact order (unchanged from the original plan):

Visitor →
Factory Method → Abstract Factory → Builder → Prototype →
Adapter → Bridge → Composite

(All 8 of these still render the GENERIC placeholder today — when
each one's turn comes, treat it the same as a MISSING pattern used to
be treated: design a real bespoke composition, do not consider it
pre-done just because a `visuals` block exists. One pattern at a time,
never a batch.)

DECISION (resolved 2026-07-22): upgrade ALL remaining GENERIC diagrams
to bespoke layouts. GENERIC is not an accepted permanent state for any
pattern — every one of the 23 must get its own `style` and its own
Diagram.js layout function, matching the VISUAL UNIQUENESS RULE. The
project is not considered visually finished at 11/11 Behavioral
BESPOKE; it is finished at 23/23. Builder/Bridge/Composite's 2026-07-22
touch-ups (Director node, centered card text) were minimal fixes to
their current GENERIC layout only — they still need a full bespoke
redesign like Strategy/Memento got, not just patched.

Never implement multiple unfinished patterns in one batch.

============================================================
CORE DEVELOPMENT PRINCIPLE
============================================================

ONE PATTERN AT A TIME.

Never implement all remaining patterns simultaneously.

Never generate visuals for 5, 10, or 11 patterns in one task.

Every pattern must individually pass:

DESIGN
→ STORYBOARD
→ IMPLEMENTATION
→ VISUAL QA
→ ANIMATION QA
→ ARCHITECTURE QA
→ COMMIT

before starting the next pattern.

============================================================
MANDATORY WORKFLOW FOR EVERY PATTERN
============================================================

PHASE 1 — READ THE EXISTING PROJECT

Before writing code:

Inspect the actual current implementation.

Understand:

- project architecture
- renderer
- VisualEngine
- AnimationEngine
- layout system
- reusable primitives
- theme system
- localization system
- existing pattern JSON schema
- current interactive mounting system
- existing completed patterns

Decorator is a QUALITY REFERENCE.

It is NOT a layout template.

Do not copy Decorator geometry into another pattern.

Do not assume the architecture.

Read the actual current code first.

============================================================
PHASE 2 — UNDERSTAND THE PATTERN
============================================================

Before implementation, formulate ONE sentence:

"What must a beginner understand within 5 seconds?"

Then determine:

- the problem before the pattern exists
- why the pattern was invented
- the educational protagonist
- the key interaction
- the dramatic/climax moment
- the final takeaway

If these cannot be explained clearly, do not code yet.

============================================================
PHASE 3 — DESIGN THE VISUAL METAPHOR
============================================================

Every pattern must have a composition that follows its own semantics.

DO NOT default to:

Client → Box → Box → Box

DO NOT force every pattern into left-to-right flow.

Direction and geometry must follow meaning.

Possible spatial grammars include:

- top → down
- bottom → up
- radial
- fan-out
- fan-in
- tree
- hierarchy
- cycle
- nested layers
- hub-and-spoke
- branching
- convergence
- split paths
- timeline
- stack
- cursor traversal
- state machine
- replaceable slot
- boundary/container
- bidirectional flow

Choose geometry because it explains the pattern.

Not because another pattern already uses it.

============================================================
VISUAL UNIQUENESS RULE
============================================================

Each pattern must have its own recognizable visual identity.

If two patterns look almost identical when labels are hidden,
the design must be reconsidered.

Examples of distinct semantic grammars:

Decorator
= nested wrappers

Composite
= recursive tree

Bridge
= two independent dimensions connected

Facade
= simple public boundary hiding internal complexity

Flyweight
= many instances converging onto shared state

Proxy
= controlled gateway / alternate access path

Chain of Responsibility
= request travels until somebody handles it

Observer
= broadcast / fan-out

Mediator
= communication through central hub

Iterator
= moving cursor across collection

Memento
= snapshots / history / restore

State
= state transition machine

Strategy
= replaceable algorithm

Template Method
= fixed skeleton + replaceable hooks

Visitor
= double dispatch

Command
= action represented as object / execution / undo

Interpreter
= expression tree evaluation

These are semantic references.

Do not blindly copy literal layouts.

============================================================
PHASE 4 — STORYBOARD BEFORE CODE
============================================================

Before implementation, mentally or explicitly define the animation timeline.

Example structure:

FRAME 1
Initial state.

FRAME 2
Source/client initiates action.

FRAME 3
Impulse begins movement.

FRAME 4
Impulse arrives.

FRAME 5
Target activates.

FRAME 6
Pattern-specific key mechanism occurs.

FRAME 7
Result propagates or returns if required.

FRAME 8
Final educational state.

The storyboard must explain the pattern without relying on long text.

============================================================
CRITICAL ANIMATION LAW
============================================================

ARRIVAL-GATED ACTIVATION.

This rule is mandatory.

Correct:

SOURCE activates
→ impulse starts
→ impulse travels
→ impulse reaches TARGET
→ TARGET activates

Incorrect:

TARGET activates
→ impulse is still traveling
→ impulse arrives later

A target must NEVER glow before the visual signal reaches it,
unless the semantics of that exact pattern explicitly require pre-existing activity.

============================================================
IMPULSE / PACKET RULES
============================================================

Every animated impulse must have:

- a logical origin
- a logical destination
- a visible path
- correct direction
- correct timing
- correct arrival

Never:

- spawn packets randomly
- spawn packets at the receiver
- let packets appear from nowhere
- let packets bypass required participants
- let packets pass visibly through unrelated cards
- let packets float over text unnecessarily
- let packets become visible through opaque nodes
- let packets disappear before reaching their target
- activate a target before arrival
- use meaningless decorative particles

If a request moves:

Client → Facade

the packet originates at Client.

If Facade then coordinates subsystems:

new internal movements originate from Facade only after Facade receives the request.

============================================================
OCCLUSION RULE
============================================================

Packets traveling behind or through opaque visual objects must not remain visibly drawn over the foreground.

Use proper:

- clipping
- masking
- layering
- z-order
- path routing

The learner must never see an impulse visually "cut through" a card unless that is intentionally part of the metaphor.

============================================================
ACTIVE STATE RULE
============================================================

Glow must communicate meaning.

Do not glow everything.

Do not use decorative glow.

Normally:

- source activates when initiating
- target activates after arrival
- previous actor dims when its role is complete
- protagonist may remain emphasized when educationally necessary

Parallel activation is allowed ONLY when the pattern semantics require parallel/fan-out behavior.

Example:

Observer broadcast may activate multiple subscribers after their respective arrivals.

============================================================
TEXT RULES
============================================================

All visualization text must be:

- short
- educational
- meaningful
- readable
- localized correctly

Support:

RU
EN

Do not use awkward literal machine-like translations.

Russian text must sound natural in Russian.

English text must sound natural in English.

Do not write long explanatory paragraphs inside nodes.

Cards should communicate:

ROLE
+
SHORT PURPOSE

Example:

Facade
Coordinates the home theater

not:

"The facade is an object that provides a simplified interface..."

Long explanations belong outside the diagram.

============================================================
NO TEXT OVERFLOW
============================================================

Mandatory in:

- English
- Russian
- light theme
- dark theme
- supported viewport sizes

Never allow:

- text outside cards
- text touching borders
- labels colliding with nodes
- labels colliding with other labels
- text under another card
- words compressed unnaturally
- unreadably small fonts

DO NOT solve overflow by aggressively shrinking typography.

Prefer:

- better wording
- larger cards
- better geometry
- responsive layout
- controlled wrapping where appropriate

============================================================
THEME SUPPORT
============================================================

Every interactive must work correctly in:

LIGHT THEME
DARK THEME

Check:

- text contrast
- edge visibility
- packet visibility
- active glow
- dimmed state
- card boundaries
- labels
- transient feedback
- final state

Do not hardcode colors that work only in one theme.

Use existing theme tokens / architecture.

============================================================
RESPONSIVE BEHAVIOR
============================================================

Visualizations must remain readable at supported sizes.

Do not blindly hardcode desktop-only coordinates.

Prefer semantic layout calculations.

However:

Do NOT create unnecessary architecture just to avoid every coordinate.

A specialized composition may require calculated geometry.

The important rule is:

geometry must remain maintainable and responsive.

============================================================
ARCHITECTURAL PRINCIPLES
============================================================

Follow the engineering principles already established by the project:

DRY
KISS
SOLID
Separation of Concerns
Single Source of Truth
Maintainability
Extensibility

But understand DRY correctly:

DRY DOES NOT MEAN:

"All pattern visualizations should look the same."

DRY MEANS:

"The same technical mechanism should not be implemented repeatedly."

Shared mechanics may include:

- movement
- glow
- pulse
- dim
- highlight
- fan-out
- return
- transition
- creation
- reuse
- swap
- reset
- replay

Pattern-specific educational compositions remain unique.

============================================================
NO PATTERN-SPECIFIC ENGINE HACKS WITHOUT REVIEW
============================================================

Do not immediately modify shared infrastructure for one pattern.

Before changing:

- VisualEngine
- Diagram renderer
- AnimationEngine
- shared CSS
- theme system
- routing
- localization architecture

first determine:

Can the pattern be implemented using existing capabilities?

If not:

Is the missing capability reusable by future patterns?

Only then extend shared infrastructure.

Never add a one-off engine feature solely because it is convenient for one diagram if the same result can be achieved cleanly with existing primitives.

============================================================
INTERACTIVES ARCHITECTURE
============================================================

Do not allow interactives.js to become an uncontrolled dumping ground.

Watch for:

- duplicated timelines
- duplicated mounting logic
- duplicated reset logic
- repeated event handling
- repeated animation boilerplate
- magic numbers
- giant pattern-specific functions

When genuine repeated mechanics emerge, extract reusable abstractions.

But do not perform a massive blind refactor while implementing one pattern.

Refactor only with:

- clear reason
- understood dependencies
- regression checks

============================================================
QUALITY GATE FOR EVERY PATTERN
============================================================

Before calling a pattern complete, verify:

EDUCATIONAL

[ ] Core idea understandable within ~5 seconds
[ ] Visualization explains WHY pattern exists
[ ] Protagonist is obvious
[ ] Key interaction is obvious
[ ] Pattern is distinguishable from other patterns

VISUAL

[ ] Unique semantic composition
[ ] No unnecessary visual noise
[ ] No overlaps
[ ] No clipped text
[ ] No awkward labels
[ ] Good hierarchy
[ ] Balanced spacing
[ ] Professional visual quality

ANIMATION

[ ] Impulses originate logically
[ ] Direction is correct
[ ] No random packet spawning
[ ] No packet visible through opaque cards
[ ] Target activates AFTER arrival
[ ] No premature glow
[ ] Previous states reset correctly
[ ] Replay works
[ ] Final state communicates takeaway

LOCALIZATION

[ ] English works
[ ] Russian works
[ ] Natural translations
[ ] No overflow in either language

THEMES

[ ] Light theme
[ ] Dark theme
[ ] Contrast correct
[ ] Animation visible in both

ARCHITECTURE

[ ] No unnecessary duplication
[ ] No unrelated files modified
[ ] No regression to completed patterns
[ ] Shared architecture respected
[ ] Build passes
[ ] Console has no new errors

Only after all checks pass:

COMMIT.

Then move to the next pattern.

============================================================
STRUCTURAL IMPLEMENTATION PLAN
============================================================

BESPOKE AND COMMITTED:

Decorator
Facade
Flyweight
Proxy

STILL GENERIC (own placeholder, not yet redesigned — see OPEN DECISION
above for when to schedule this):

Adapter
Bridge
Composite

NEXT (no visuals data yet):

------------------------------------------------------------
FACADE  (kept below for reference — already implemented and committed)
------------------------------------------------------------

Core idea:

ONE SIMPLE ENTRY POINT
→
HIDDEN COMPLEX SUBSYSTEM

Educational protagonist:

Facade.

The learner must understand:

"I call one thing.
It coordinates everything else."

The visualization must distinguish:

PUBLIC SIMPLE SIDE

from

INTERNAL COMPLEX SIDE.

Client must never bypass Facade.

No direct Client → subsystem communication.

Animation:

Client initiates one request.

Impulse originates from Client.

Impulse reaches Facade.

ONLY THEN Facade activates.

Facade coordinates internal subsystem operations.

Subsystem activation follows the actual internal signal arrivals.

Final state keeps Facade as conceptual protagonist.

------------------------------------------------------------
FLYWEIGHT  (kept below for reference — already implemented and committed,
           style: "pool" in Diagram.js)
------------------------------------------------------------

Core idea:

MANY OBJECTS
→
SHARE THE SAME INTRINSIC STATE

Must clearly distinguish:

EXTRINSIC STATE
unique per instance

from

INTRINSIC STATE
shared

The dramatic moment:

second object requests an already existing flyweight

→ cache/factory HIT

→ SAME OBJECT reused

→ no duplicate created.

The learner must visually see sharing.

Not just read the word "shared".

------------------------------------------------------------
PROXY  — IMPLEMENTED (style: "gateway" in Diagram.js), QA passed
         (EN/RU, light/dark, clean build), not yet committed
------------------------------------------------------------

Core idea:

CLIENT
→
STAND-IN / CONTROL POINT
→
REAL OBJECT

Proxy must visibly control access.

If using caching proxy:

FIRST REQUEST:

Client
→ Proxy
→ MISS
→ Real Service
→ result stored

SECOND REQUEST:

Client
→ Proxy
→ HIT
→ result returned

Real Service is NOT contacted.

The two paths must be visually distinct.

------------------------------------------------------------
COMMAND — BESPOKE, committed and pushed (style: "command" in
          Diagram.js)
------------------------------------------------------------

Core idea:

INVOKER
→
SWAPPABLE CAPSULE (the command)
→
RECEIVER

The invoker never talks to the receiver directly — it only ever
holds a socket, and whatever capsule is currently plugged into
that socket decides what happens next.

The command capsule is drawn as a stadium shape that visibly
plugs into a socket cut into the invoker's own edge, so the two
interlock instead of merely standing in a row (the opposite
silhouette of Proxy's bare 3-in-a-row gateway).

The capsule carries a permanent "↺" badge as static scenery,
marking it as self-reversible — this is why the interactive
timeline's `undo` step replays the SAME invoker→command hop
instead of drawing a new edge from receiver back to command.

------------------------------------------------------------
INTERPRETER — BESPOKE, committed and pushed (style: "expression" in
              Diagram.js)
------------------------------------------------------------

Core idea:

SENTENCE IN A TINY LANGUAGE
→
TREE OF OBJECTS, ONE CLASS PER GRAMMAR RULE
→
TREE EVALUATES ITSELF

Worked example carried through problem/solution/structure/diagram/
code: the expression `x + 5 - 2` with `x = 10`, evaluating to `13`.

The tree is drawn top-down, root at the top: Subtract (root) over
Add (its branch) and Number `2` (root's other child); Add's own
children, Variable `x` and Number `5`, sit on the bottom row. This
is the same shape a beginner would draw by hand for this expression
— not a generic left-to-right Client → Box → Box chain.

The entry edge (Client → root) carries a real rendered label
(`interpret(context)`) via `DiagramEdge`, the same mechanism
Decorator's entry edge uses — every other edge inside the tree
remains an unlabeled call/return arrow, since the recursive
`interpret()` call is the one mechanic worth naming and repeating it
on every edge would just be noise.

Client displays the final "= 13" result as a badge that appears
only once the root's `interpret()` call has returned in the
animation (`return` step) and stays visible afterward — the
takeaway a learner is left with is the concrete number, not just
"it recursively evaluates".

------------------------------------------------------------
ITERATOR — BESPOKE, implemented + QA'd + committed (style:
           "cursor" in Diagram.js)
------------------------------------------------------------

Core idea:

CLIENT
→
ITERATOR (persistent, owns the cursor)
→
ONE ELEMENT AT A TIME, IN ORDER

Client, Iterator, and a "Song" collection of four ordered parts
(Intro, Verse, Chorus, Outro) drawn as a single dashed shelf of
square cells — deliberately not a rail/chevron row (Chain of
Responsibility's signature) and not scattered circular tokens
(Flyweight's pool).

The Iterator card is the visual protagonist (emphasis styling,
persistent glow) and never gets replaced — every `next()` call
reuses the same card via the `reuse` primitive, teaching that one
iterator instance tracks its own cursor across repeated calls.
Only one cell is ever "active" at a time, strictly left to right,
with visited cells settling into a dimmed `passed` state so a
"reading trail" is visible mid-playback and the final frame
communicates "all consumed, iterator still alive."

A small triangular caret beneath the active cell (opacity/animation
driven by `data-viz-state='active'`) is the pattern's unique visual
signature — it only appears once the request packet has arrived
(arrival-gated), never while the packet is still in flight.

Bug found and fixed during QA: the entrance stagger animation
(`fade-in-up ... both`) on `.diagram__cell` and the client/iterator
`.diagram__card` used fill-mode `both`, which — per the CSS cascade
— permanently pins `opacity: 1` after the animation ends, silently
overriding every `data-viz-state` opacity rule (`dim`: 0.32,
`passed`: 0.6) for the rest of the page's life. This is the exact
same bug class already fixed for `.diagram--gateway` (Proxy) via
`animation-fill-mode: none`; applied the identical fix to
`.diagram--cursor .diagram__nodes > .diagram__card` and
`.diagram--cursor .diagram__cell`. Caught only by inspecting
`getComputedStyle(...).opacity` mid-timeline via Playwright — the
static end-state screenshots alone did not reveal it.

Mediator QA: verified the `dim` → `active` transition on the mediator
card itself via mid-timeline `getComputedStyle(...).opacity` samples
(0.32 at `scene`, transitioning through ~0.79–0.98 during `connect`,
settling at 1 by `alice-sends`) in both themes — no stuck-opacity
regression. Also verified both themes × both locales (EN/RU) render
without clipping or overlap; RU labels (Алиса/Боб/Чарли/Диана/Чат)
fit the existing card width unchanged.

Unrelated bug found and fixed along the way: `reloadRoute()` in
`src/scripts/router.js` called `_setPageMeta(...)` (undefined) instead
of the exported `setPageMeta`, throwing an uncaught ReferenceError on
every language toggle site-wide and silently skipping the
`refreshAnimations()` call after it. Fixed the typo; unrelated to the
Mediator diagram itself but was blocking RU-locale QA.

============================================================
BEHAVIORAL IMPLEMENTATION PLAN
============================================================

Start only after all Structural patterns pass QA.

Order:

1. Chain of Responsibility — DONE
2. Command — DONE
3. Interpreter — DONE
4. Iterator — DONE
5. Mediator — DONE
6. Memento
7. Observer
8. State
9. Strategy
10. Template Method
11. Visitor

Each pattern must receive its own design review and semantic visual composition.

Do NOT pre-generate all behavioral implementations.

============================================================
FINAL PROJECT QA
============================================================

After all 23 patterns are complete:

Perform full project audit.

FUNCTIONAL QA

- all routes
- navigation
- Play
- Replay
- reset
- locale switching
- theme switching
- no console errors

VISUAL QA

- all 23 patterns
- EN
- RU
- light
- dark
- supported viewport sizes
- no overlap
- no clipping

ANIMATION QA

For every animated interaction:

SOURCE
→ MOVEMENT
→ ARRIVAL
→ TARGET ACTIVATION

Verify no timing violations.

EDUCATIONAL QA

For every pattern:

Problem
Solution
Diagram
Animation
Code

must communicate the same concept.

ARCHITECTURE QA

Audit:

- duplication
- dead code
- giant functions
- magic values
- unnecessary special cases
- repeated mount logic
- repeated timeline logic
- unused abstractions
- violations of DRY/KISS/SOLID

Refactor only after understanding dependencies and protecting existing behavior.

============================================================
FINAL TARGET
============================================================

CREATIONAL       5 / 5
STRUCTURAL       7 / 7
BEHAVIORAL      11 / 11

TOTAL           23 / 23

The final academy must feel like one coherent product,

but every pattern must have its own visual identity.

CONSISTENT DESIGN LANGUAGE

does NOT mean

IDENTICAL DIAGRAMS.

The final quality standard:

"If the pattern title disappeared,
could a beginner still infer the main idea
from the visual structure and animation?"

If NO:

the pattern is not finished.
