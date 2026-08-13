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

CREATIONAL — 4 BESPOKE / 1 GENERIC

Singleton            BESPOKE (`singleton`) — committed (client stack ->
                     shared instance card; ghost-duplicate visual was
                     tried and removed after review; light-theme
                     viewport background strengthened; a CSS
                     specificity bug that silently blocked the
                     glow-on-pulse animation was found and fixed here
                     first, 2026-07-21)
Factory Method       BESPOKE (`override`) — committed (Client ->
                     Creator "override" card -> Product; Creator is
                     drawn as an abstract dashed frame (factoryMethod()
                     hook) with one solid docked plate showing the
                     ConcreteCreator currently plugged in
                     (RoadLogistics), and a flat, textless 2-layer
                     "ghost stack" behind the card hints that other
                     ConcreteCreators from the same family could be
                     plugged in instead, each returning a different
                     Product — reuses the fixed `client`/`creator`/
                     `product` node-id timeline that already existed
                     in interactives.js from the GENERIC era rather
                     than rewriting it; distinct from the planned
                     Abstract Factory layout (which will show one
                     factory producing several DIFFERENT product
                     types/families) by showing one product type with
                     swappable single-method overrides instead; QA'd
                     light/dark x EN/RU + full animation timeline via
                     Playwright on `npm run dev`, zero console errors,
                     2026-07-25; 2026-07-25 follow-up: card labels
                     originally showed the worked-example class names
                     (Logistics/RoadLogistics/Transport) which had no
                     textual overlap with the generic Participants
                     table (Creator/ConcreteCreator/Product/
                     ConcreteProduct) — user flagged the diagram and
                     Participants list as looking unrelated. Fixed by
                     relabeling the primary card titles to the generic
                     role names (Creator, Product) and adding a small
                     uppercase "ConcreteCreator" kicker above the
                     RoadLogistics docked-plate name, so every generic
                     term in Participants now appears verbatim
                     somewhere in the diagram; concrete names
                     (RoadLogistics, Truck) kept as secondary/flavor
                     text. Note: the same example-name-vs-generic-role
                     divergence exists in Visitor (Circle/Rectangle/
                     XMLExporter vs Visitor/ConcreteVisitor/Element/
                     ConcreteElement) and Template Method
                     (ReportGenerator/HtmlReport/MarkdownReport vs
                     AbstractClass/ConcreteClass), but via a different
                     mechanism than Factory Method's kicker: both
                     patterns' `structure.participants[].role` text
                     already carries an explicit bold "In the diagram: X"
                     callout for every ConcreteX row, bridging the
                     generic name to the concrete diagram label from the
                     Participants side instead of the diagram side.
                     Re-verified live in the browser 2026-08-13 — reads
                     clearly, no fix needed.)
Abstract Factory     BESPOKE (`family`) — committed and pushed
                     (Client -> Abstract
                     Factory card branching down into a dashed "same
                     family" boundary that encloses two AbstractProduct
                     cards (Button, Checkbox); Factory card shows a
                     small docked "ConcreteFactory / MacFactory" plate,
                     each product card shows its own docked
                     "ConcreteProduct / MacButton" / "MacCheckbox"
                     plate — every generic Participants term
                     (AbstractFactory, ConcreteFactory, AbstractProduct,
                     ConcreteProduct, Client) appears verbatim on the
                     diagram from the first draft, learning directly
                     from the Factory Method naming bug above; visually
                     distinct from Factory Method's single-product
                     "override card + ghost stack" grammar by using a
                     horizontal intake (client -> factory) that then
                     branches vertically into a multi-product family
                     tree — the branch/boundary composition is the
                     semantic core: ONE factory producing SEVERAL
                     DIFFERENT product types at once, not one product
                     with swappable creators; reused the pre-existing
                     fixed `client`/`factory`/`button`/`checkbox`
                     node-id timeline from interactives.js without
                     renaming; QA'd light/dark x EN/RU + full animation
                     timeline (scene dim-in, arrival-gated glow/active
                     per node, packet travel on both factory->product
                     edges, final full-family pulse-glow) via Playwright
                     on `npm run dev`, zero console errors across all 4
                     combinations, no text overflow/clipping in either
                     language, 2026-07-25; 2026-07-25 follow-up: user
                     spotted that the "Participants" table showed
                     createChair()/createSofa() (a leftover furniture
                     worked example) while the new diagram, and the
                     existing `problem`/`solution` prose, both used a
                     UI-widgets worked example (Button/Checkbox/
                     WindowsFactory/MacFactory) — the JSON had two
                     different worked examples living side by side.
                     Standardized the whole pattern on the UI-widgets
                     example: rewrote `structure.participants` text and
                     all 5 `implementation` code blocks (JS/TS/Java/C#/
                     Python, previously Chair/Sofa/ModernFurnitureFactory/
                     VictorianFurnitureFactory) to use Button/Checkbox/
                     WindowsFactory/MacFactory, matching the diagram and
                     problem/solution. Root cause of a related authoring
                     slip during the same fix: a first pass wrote the
                     new participants list to a stray top-level
                     `participants` key instead of the actual
                     `structure.participants` field the page reads —
                     caught by re-checking the rendered page after the
                     "fix" still showed old text, corrected immediately.
                     Re-verified via Playwright: Participants section
                     now matches the diagram and code samples in both
                     EN and RU, zero console errors)
Builder              BESPOKE (`assembly`) — committed and pushed
                     (Client -> Builder card with a docked
                     "ConcreteBuilder / HouseBuilder" plate, an optional
                     Director above connected by a dashed "invokes
                     steps" dependency edge that never counts as an
                     indexed packet edge, fanning out to three part
                     slots — Walls/Doors/Windows — and a dashed
                     "Product" boundary frame that turns solid on the
                     assemble step; semantic core is ONE builder
                     assembling SEVERAL parts step-by-step into a
                     single enclosed product, visually distinct from
                     Abstract Factory's multi-product family tree and
                     Factory Method's single-product override card;
                     reused the pre-existing fixed `client`/`builder`/
                     `partA`/`partB`/`partC`/`product`/`director`
                     node-id timeline from interactives.js unchanged,
                     with the dep-path edge on its own CSS class so the
                     5 indexed request/creation steps still line up
                     0..4 against entry/build-a/build-b/build-c/
                     assemble; standardized JSON on the House worked
                     example (Walls/Doors/Windows/HouseBuilder/House)
                     matching problem/solution/implementation. QA'd
                     light/dark x EN/RU + full animation timeline via
                     Playwright on `npm run dev`, zero console errors
                     across all 4 combinations, no text overflow in
                     either language. Found and fixed one real bug
                     during animation QA: the frame's active-state
                     background mixed with an opaque
                     `--color-bg-elevated` instead of `transparent`,
                     so once solid it visually painted over the
                     Walls/Doors/Windows slot cards stacked beneath it
                     in DOM paint order (Windows/Doors/Walls briefly
                     "disappeared" on the assemble step) — fixed by
                     mixing with `transparent` like every other region/
                     frame background in this file, 2026-07-26)
Prototype            BESPOKE (`mirror`) — committed and pushed
                     (Client -> "Prototype" card docked with a
                     "ConcretePrototype / Circle" plate, flanked across a
                     dashed vertical axis by an identical mirrored twin
                     card — same title and same docked plate, differing
                     only by subtitle ("clone()" vs "independent copy")
                     — to visually teach that a clone is structurally
                     the SAME concrete type as the original, just an
                     independent instance; semantic core is a symmetric
                     mirror-image pair around an axis, visually distinct
                     from every other bespoke composition (chain,
                     nested, facade, pool, gateway, command, expression,
                     cursor, hub, broadcast, state, memento, singleton,
                     slot, skeleton, dispatch, override, family,
                     assembly); reused the pre-existing fixed
                     `client`/`original`/`clone` node-id timeline from
                     interactives.js unchanged. Standardized JSON on the
                     Shape/Circle worked example matching
                     problem/solution/implementation. QA'd light/dark x
                     EN/RU + full animation timeline via Playwright on
                     `npm run dev`, zero console errors across all 4
                     combinations, no text overflow in either language,
                     arrival-gated dim->active->glow transitions verified
                     against `_PROTOTYPE_STEPS`, diagram<->Participants
                     terms (Prototype, ConcretePrototype, Client)
                     verified matching in both languages, 2026-07-26)


STRUCTURAL — 7 BESPOKE / 0 GENERIC

Adapter              BESPOKE (`translate`) — committed and pushed
                     (Client -> "Adapter" card docked with a
                     "Concrete class / PaymentAdapter" plate, sitting
                     between a "Target" card docked with "Implemented
                     as / PaymentProcessor" above and an "Adaptee" card
                     docked with "Existing class / NewProviderSDK" to
                     its right; round ports on the Client/Target-facing
                     sides of the Adapter vs. diamond ports on its
                     Adaptee-facing side (mirrored on the Adaptee's own
                     left edge) to visually teach that one Adapter
                     "speaks two shapes" — Target's shape on one side,
                     Adaptee's incompatible shape on the other; the
                     third edge (Adapter -> Target) is reframed as
                     "shapes the result for Target" (dashed, thinner
                     stroke, distinct from the two solid "call"/
                     "forward" edges) rather than a runtime call, since
                     Target is a static interface Adapter implements,
                     not something it invokes; semantic core is a
                     shape-matching translator sitting between two
                     fixed interfaces, visually distinct from every
                     other bespoke composition (chain, nested, facade,
                     pool, gateway, command, expression, cursor, hub,
                     broadcast, state, memento, singleton, slot,
                     skeleton, dispatch, override, family, assembly,
                     mirror); reused the pre-existing fixed
                     `client`/`adapter`/`legacy`/`modern` node-id and
                     0/1/2 edge-index timeline from interactives.js
                     unchanged. Standardized JSON on the
                     PaymentProcessor/NewProviderSDK/PaymentAdapter
                     worked example matching problem/solution/
                     implementation; also fixed a cosmetic JSON/JS
                     mismatch where `edges[1].variant` said
                     `"translate"` while the JS emitted class
                     `diagram__flow--translate-forward` — aligned to
                     `"forward"`. diagram<->Participants terms (Client,
                     Target, Adaptee, Adapter, plus concrete names
                     PaymentProcessor/NewProviderSDK/PaymentAdapter)
                     verified matching in both languages against
                     `structure.participants` and `structure.
                     description`. Verified: `node --check` on
                     Diagram.js, JSON validity, dev server serves the
                     route with zero build/console errors, and the
                     `_ADAPTER_STEPS` timeline (node ids + edge order
                     0/1/2) matches the new layout exactly. Shipped
                     without a real-browser Playwright pass (the tool
                     was believed unavailable at the time); 2026-07-26
                     work on Bridge confirmed Playwright (`^1.61.1`) is
                     in fact installed and usable in this environment —
                     if a full light/dark x EN/RU visual regression pass
                     on Adapter specifically is wanted, it can be run the
                     same way used for Bridge below.)
Bridge               BESPOKE (`span`) — committed and pushed (Abstraction
                     "tower" card, emphasis, docked with concrete
                     RemoteControl subtitle, on the left; a horizontal
                     "bridge deck" flow (thick double-rail stroke with
                     perpendicular tie-marks) crosses to an
                     Implementation "tower" card on the right, docked
                     with "Device interface" subtitle; Refined
                     Abstraction hangs below Abstraction on a plain
                     dashed extends-edge; two Concrete Implementation
                     cards (TV, Radio) fan out below Implementation on
                     dashed realize-edges — reads as two independent
                     class hierarchies (left tower/right tower) joined
                     by one literal bridge, so a change on either side
                     never touches the other; semantic core (a fixed
                     structural bridge crossing between two separately-
                     varying hierarchies) is visually distinct from
                     every other bespoke composition (chain, nested,
                     facade, pool, gateway, command, expression, cursor,
                     hub, broadcast, state, memento, singleton, slot,
                     skeleton, dispatch, override, family, assembly,
                     mirror, translate). Fixed a JSON inconsistency
                     found during the pre-diagram audit: `structure.
                     participants` said "Extended Abstraction" while the
                     diagram/GoF canon use "Refined Abstraction" —
                     renamed to the canonical term. Reused the
                     pre-existing fixed `abstraction`/`refined`/`impl`/
                     `concreteA`/`concreteB` node-id and 0/1/2/3 edge-
                     index timeline from interactives.js (`_BRIDGE_
                     STEPS`) unchanged. diagram<->Participants terms
                     (Abstraction, Refined Abstraction, Implementation,
                     Concrete Implementation) verified matching in both
                     languages against `structure.participants` and
                     `structure.description`. Verified via Playwright in
                     a real headless browser (light/dark x EN/RU): zero
                     console errors, no text clipping/overflow in either
                     language (including longer RU strings "Уточнённая
                     абстракция" / "Конкретная реализация"), and the
                     arrival-gated packet/glow timeline (scene dim-in ->
                     bridge-deck flow fires -> Implementation active ->
                     Concrete/TV created -> swap-signal -> Concrete/
                     Radio created -> Refined Abstraction revealed ->
                     final pulse on Abstraction) matches `_BRIDGE_STEPS`
                     exactly. `npx vite build` succeeds with no errors.
                     2026-07-26 follow-up fixes after user visual review:
                     (1) the Abstraction emphasis-card box height (110px)
                     was shorter than its own content's required height
                     (~113px chip+title+subtitle group), so the icon chip
                     poked past the top edge and the subtitle sat on/past
                     the bottom edge — gave the card an emphasis-specific
                     height (172px, matching the Mediator/Command
                     emphasis-card convention) and re-centered the
                     Abstraction/Implementation row so the bridge deck
                     stays level; (2) `_BRIDGE_STEPS`' `show-refined` step
                     only re-played the extends pulse (Refined
                     Abstraction -> Abstraction, edge index 0) but never
                     replayed the bridge-crossing pulse (Abstraction ->
                     Implementation, edge index 1), so Implementation and
                     Refined Abstraction appeared to light up in the
                     final step with no visible causal link between them
                     — added one new step, `refined-bridges` (duration
                     900ms, re-fires `{ do: 'request', index: 1 }` +
                     `{ glow: 'impl' }`), between `show-refined` and
                     `final` so a viewer sees Refined Abstraction's call
                     visibly cross the same bridge to Implementation.
                     This is the only edit made to interactives.js for
                     Bridge — purely additive (one new step object,
                     reusing the existing edge-index-1 path), does not
                     touch any other pattern's `_STEPS` array or change
                     any existing Bridge step/node id, order, or edge
                     index. Re-verified via Playwright after both fixes:
                     zero console errors, Abstraction card renders with
                     full padding in light/dark, and the new pulse is
                     visibly captured mid-animation (Refined Abstraction
                     + Implementation glowing together, TV/Radio
                     correctly still dimmed).
Composite            BESPOKE (`tree`) — Client card calls into a
                     centered emphasis "Component" card (uniform
                     interface); Component fans down to a "Composite"
                     card (generic label, docked "Directory" concrete
                     subtitle) which itself fans out to three "Leaf"
                     cards (docked "File A/B/C" subtitles); a dashed,
                     unfilled "recursion echo" rectangle sits behind
                     the Composite card only, reusing Factory Method's
                     ghost-stack idiom reinterpreted as a depth cue
                     rather than a swappable-sibling cue; semantic core
                     (one interface, recursively fanning into either a
                     container or a terminal leaf) is visually distinct
                     from every other bespoke composition (chain,
                     nested, facade, pool, gateway, command, expression,
                     cursor, hub, broadcast, state, memento, singleton,
                     slot, skeleton, dispatch, override, family,
                     assembly, mirror, translate, span). Fixed a real
                     diagram<->Participants bug found during the
                     pre-diagram audit: the prior GENERIC diagram never
                     showed the literal terms "Composite"/"Leaf"
                     anywhere, only concrete names ("Directory"/"File
                     A/B/C") — adopted the generic-title +
                     concrete-subtitle convention (same as Bridge/
                     Prototype/Factory Method) so Client, Component,
                     Composite, and Leaf all appear on the diagram and
                     match `structure.participants` in both languages.
                     Reused the pre-existing fixed `client`/`component`/
                     `composite`/`leafA`/`leafB`/`leafC` node-id and
                     0-4 edge-index timeline from interactives.js
                     (`_COMPOSITE_STEPS`) unchanged — no interactives.js
                     edits were needed. Did not add a
                     `.diagram--tree .diagram__card--emphasis { filter }`
                     override on the Component emphasis card, per the
                     2026-07-21 systemic CSS-specificity fix below.
                     Verified via Playwright in a real headless browser
                     (light/dark x EN/RU): zero console errors, correct
                     6-node count and labels in both languages, no text
                     clipping/overflow, and the arrival-gated packet/
                     glow timeline (Client -> Component -> Composite ->
                     Leaf A/B/C, each activating only after its edge
                     fires) matches `_COMPOSITE_STEPS` exactly.
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


BEHAVIORAL — 9 BESPOKE / 0 GENERIC

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
                         the Proxy gateway's no-entry visual grammar;
                         2026-07-25 content-consistency audit: `problem`,
                         `solution` and all 5 `implementation` languages
                         described a "settings dialog" example while the
                         diagram/timeline already used a "group chat"
                         example (Chat Room/Alice/Bob/Charlie/Diana) —
                         diagram+`interactives.js` timeline left
                         untouched (cheaper/lower-risk side to change),
                         `problem`/`solution`/`implementation` rewritten
                         to the ChatMediator/ChatRoom/User example to
                         match; QA'd light/dark x EN/RU, zero console
                         errors)
Memento                  BESPOKE (`memento`) — committed
                         (Editor/History card text centered, 2026-07-22)
Observer                 BESPOKE (`broadcast`) — committed
                         (2026-07-25 content-consistency audit: `problem`
                         /`solution`/`structure.participants`/diagram all
                         already used the WeatherStation/PhoneApp/
                         DesktopWidget/LoggingService example, but all 5
                         `implementation` languages used an unrelated
                         EventEmitter/Store/stock example — implementation
                         only was rewritten to WeatherStation/Subscriber/
                         PhoneApp/DesktopWidget/LoggingService to match;
                         QA'd light/dark x EN/RU, zero console errors)
State                    BESPOKE (`state`) — committed
Strategy                 BESPOKE (`slot`) — committed (client -> context
                         -> interface card -> vertically-racked concrete
                         strategy cards inside a labeled dashed region;
                         2026-07-22: fixed a missing `glow` action that
                         left the selected strategy card lit but not
                         glowing; 2026-07-25 content-consistency audit:
                         `problem`/`solution`/all 5 `implementation`
                         languages described an "e-commerce shipping"
                         example (standard/express/overnight, `Order`)
                         while the diagram/timeline already used a
                         "navigation app" example (Navigator/
                         WalkingRoute/RoadRoute) — diagram+timeline left
                         untouched, `problem`/`solution`/`implementation`
                         rewritten to RouteStrategy/WalkingRoute/
                         RoadRoute/Navigator to match; QA'd light/dark x
                         EN/RU, zero console errors)
Template Method          BESPOKE (`skeleton`) — committed (client ->
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
Visitor                  BESPOKE (`dispatch`) — committed (Client
                         fans out accept(v) calls to Circle and
                         Rectangle element cards; each element routes
                         back into a single Visitor "routing table"
                         card via visitCircle()/visitRect(), rendered
                         as two labeled/ported rows aligned to each
                         element's row — fan-in into Visitor, the
                         mirror of Template Method's fan-out; new
                         operations only ever touch this one card,
                         the element cards never change; 2026-07-25:
                         QA'd light/dark x EN/RU + full 6-step/9.2s
                         animation timeline, zero console errors; a
                         header-height bug (`HEAD_H`) let the card's
                         subtitle text overlap the first dispatch row
                         — fixed by giving the chip/title/subtitle
                         stack enough vertical room before the
                         divider)


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


> **2026-07-25 content-consistency audit:** user reported that in many
> patterns the "Participants" table (and sometimes `implementation`
> code) describes a different worked example than the one shown in the
> diagram/`problem`/`solution`. Root cause pattern: when a pattern's
> diagram was redesigned to a bespoke worked example (e.g. Abstract
> Factory's UI-widgets Button/Checkbox example), the `structure
> .participants` and/or `implementation` blocks were sometimes left
> behind on an older, unrelated worked example. Fixed so far: Abstract
> Factory (`participants`+`implementation` were "furniture", diagram/
> problem/solution were "UI widgets" — brought participants+impl in
> line with UI widgets), Mediator (`problem`/`solution`/`implementation`
> were "settings dialog", diagram was "group chat" — brought text/impl
> in line with the diagram), Strategy (`problem`/`solution`/
> `implementation` were "e-commerce shipping", diagram was "navigation
> app" — brought text/impl in line with the diagram), Observer
> (`implementation` only was "EventEmitter/stock", everything else was
> already "WeatherStation" — brought impl in line). Decision rule used:
> whichever side is cheaper/lower-risk to change wins — a diagram whose
> `interactives.js` timeline encodes example-specific animation steps
> tied to fixed node ids is left alone, and prose/code is rewritten to
> match it, rather than risk breaking a QA'd timeline. Interpreter was
> checked and found to be a false positive (diagram uses shortened
> labels of the same class names, e.g. "Add" vs. "AddExpression" —
> `structure.participants` explicitly cross-references the diagram).
>
> **2026-07-26 — remaining 18 patterns audited and fixed.** Automated
> scan + manual read of every pattern not yet covered above. Result: 8
> were already consistent (Singleton, Decorator, Flyweight, Proxy,
> Command, Memento, Template Method, Visitor — no changes needed). 10
> had real mismatches and were fixed, all QA'd light/dark x EN/RU via
> Playwright with zero console errors:
> - **Factory Method** — `problem`/`solution` described a
>   NotificationService/Email/SMS example; diagram+`implementation`
>   already agreed on Logistics/RoadLogistics/SeaLogistics/Truck/Ship.
>   Rewrote `problem`/`solution` to match; diagram+impl untouched.
> - **Builder** — `problem`/`solution` described a Pizza example;
>   `implementation` already built a House (`HouseBuilder`,
>   `buildWalls`/`buildDoors`/`buildWindows`). Diagram is generic.
>   Rewrote `problem`/`solution` to the House example.
> - **Prototype** — `problem`/`solution` described a game Enemy/Unit
>   cloning example; `implementation` already used Shape/Circle/
>   Rectangle `clone()`. Diagram is generic. Rewrote `problem`/
>   `solution` to the Shape example.
> - **Adapter** — three-way mismatch: diagram generic, `problem`/
>   `solution` already a well-developed payment-SDK narrative,
>   `implementation` an unrelated abstract Target/Adaptee reversed-
>   string demo. Rewrote `implementation` (all 5 languages) to a
>   `PaymentProcessor`/`NewProviderSDK`/`PaymentAdapter` example using
>   the exact method names (`charge`, `submitTransaction`) `problem`/
>   `solution` already established.
> - **Bridge** — `problem`/`solution` described an unrelated
>   notification-channel example; diagram+`implementation` already
>   agreed on TV/Radio/RemoteControl/AdvancedRemote. Rewrote `problem`/
>   `solution` to match.
> - **Composite** — `problem`/`solution` described an e-commerce
>   bundle/pricing example; `implementation` already used a filesystem
>   File/Directory `getSize()` example. Diagram is generic. Rewrote
>   `problem`/`solution` to the File/Directory example.
> - **Facade** — diagram+`problem`/`solution` already agreed on a Home
>   Theater example (Amplifier/Projector/DVDPlayer/`watchMovie()`);
>   `implementation` was an unrelated computer-boot example (CPU/
>   Memory/HardDrive). Rewrote `implementation` (all 5 languages) to
>   Home Theater, adding a `Lights` subsystem to match the diagram's
>   4 nodes and a `watchMovie()`/`endMovie()` facade.
> - **Chain of Responsibility** — diagram shows 4 tiers (Team Lead,
>   Manager, Director, CEO); `implementation` only had 3 handler
>   classes, missing CEO. Added a `Ceo` handler (unbounded limit,
>   matching the diagram's "any amount" subtitle) to all 5 languages'
>   chains and usage examples.
> - **Iterator** — diagram+`problem`/`solution` already agreed on a
>   media-playlist example (Song titles Intro/Verse/Chorus/Outro);
>   `implementation` was a generic numeric `Range` iterator, unrelated
>   domain. Rewrote `implementation` (all 5 languages) to `Song`/
>   `Playlist`/iterator-protocol classes using the same song titles.
> - **State** — three-way mismatch: `problem`/`solution` described a
>   vending machine; diagram (bespoke, timeline-coupled `state` style)
>   already showed a Traffic Light (Red/Yellow/Green State); `imple-
>   mentation` was an unrelated MediaPlayer example. Diagram left
>   untouched (timeline-coupled, highest cost to change); rewrote both
>   `problem`/`solution` and `implementation` (all 5 languages) to a
>   `TrafficLight`/`RedState`/`YellowState`/`GreenState`/`tick()`
>   example matching the diagram's node ids and edge labels exactly.
>
> All 10 fixes are JSON-validated and QA'd. Committed in `87dfe0c`
> (feat(abstract-factory): add bespoke family diagram + fix content
> consistency across all 23 patterns).
>
> **2026-07-26 — deeper audit: translation parity, code correctness,
> and diagram/label drift across all 23 patterns.** User asked for a
> stricter pass beyond worked-example naming: EN/RU translation
> completeness, actual code correctness (not just naming), and logical
> soundness of problem→solution→participants→diagram chains, re-
> checking all patterns including the 14 files already touched above.
> 5 parallel audits found 7 concrete issues, all fixed and re-verified
> (JSON-validated, Playwright QA EN+RU zero console errors, diagrams
> spot-checked visually):
> - **Interpreter** — `intent.ru` was stale, still the old generic
>   phrasing with no mention of the `x + 5 - 2` worked example that
>   `intent.en` already used. Rewrote `intent.ru` as a faithful
>   translation matching `intent.en`.
> - **Template Method** — `implementation.csharp` had an invalid
>   `sealed` modifier on a non-virtual, non-`override` method
>   (`public sealed string Generate(...)`) — would fail to compile
>   with CS0238. Removed `sealed` and its misleading comment; other
>   languages untouched.
> - **Facade** — `problem` (en+ru) still described an unrelated video-
>   export scenario while `solution`/`implementation`/`visuals` already
>   used Home Theater (from the prior round's fix). Rewrote `problem`
>   to set up the Home Theater pain point (Amplifier/Projector/
>   DVDPlayer/Lights orchestration) so problem→solution reads
>   coherently.
> - **Adapter** — `visuals[0]` diagram (generic `concept` style, not
>   timeline-coupled) still labeled nodes "Legacy Service"/"Modern
>   Service" instead of the `PaymentProcessor`/`NewProviderSDK`/
>   `PaymentAdapter` names used everywhere else after the prior round's
>   `implementation` rewrite. Updated node labels/subtitles/edge
>   labels/description/caption; node ids and layout untouched.
> - **Composite** — `visuals[0]` diagram (generic style) still used
>   placeholder "Composite"/"Leaf A/B/C"/`operation()` text instead of
>   `Directory`/`File A/B/C`/`getSize()`. Updated node labels/
>   description/caption/edge label to match; node ids/layout untouched.
> - **Bridge** — `pros[0]` (en+ru) still referenced an old message-
>   priority/delivery-channel example instead of the TV/Radio/
>   RemoteControl/AdvancedRemote example used everywhere else after the
>   prior round's fix. Rewrote `pros[0]` to make the same point (the
>   two hierarchies grow independently) using the current example.
> - **Visitor** — `visuals[0]` diagram (bespoke, timeline-coupled
>   `dispatch` style) used `visitRect()`/`XMLExporter` in node
>   dispatch/label/edge-label/description text, while all 5
>   `implementation` languages use `visitRectangle()`/
>   `XmlExportVisitor`. Edited only the text content (dispatch labels,
>   edge label, description, visitor node label) to match; node ids
>   and `interactives.js` timeline left untouched (confirmed via diff).
>
> All 7 fixes are JSON-validated and QA'd (zero console errors across
> EN/RU, diagrams for Adapter/Composite/Visitor visually confirmed
> correct). Committed in `87dfe0c` together with the batch above.
>
> **2026-07-26 — all code comments stripped from every pattern's
> `implementation` field.** User strong reaction: comments in the
> teaching-code samples (shown on every pattern's Implementation tab)
> look unprofessional and shouldn't be there at all — the project's
> existing "minimal comments" bar (previously applied to app source
> like `interactives.js`/`Diagram.js`) now explicitly extends to the
> 23 pattern JSON files' `implementation.{javascript,typescript,java,
> csharp,python}` code strings. Stripped every `//`, `/* */`, `#`, and
> Python docstring-style comment from all 5 language samples across
> all 23 patterns (115 code blocks total) — section-marker comments
> ("// Usage", "// Component interface", etc.), inline comments, and
> trailing "expected output" comments (e.g. `// true`, `# red`) were
> all removed; if removing a comment left an empty line, the line was
> deleted rather than left blank. No code logic, identifiers, or
> indentation changed. Care was taken not to touch legitimate `#`/`//`
> occurring in private-field syntax (`#history`, `#instance`) or
> mid-string. All 23 files re-validated as parseable JSON and re-QA'd
> via Playwright across every pattern × every language tab — zero
> console errors. Committed in `87dfe0c` together with the two batches
> above.

TOTALS

BESPOKE (truly done):  23 / 23  (Singleton, Decorator, Facade,
                        Flyweight, Proxy, Chain, Command, Interpreter,
                        Iterator, Mediator, Memento, Observer, State,
                        Strategy, Template Method, Visitor,
                        Factory Method, Abstract Factory, Builder,
                        Prototype, Adapter, Bridge, Composite)
GENERIC (needs rework):  0 / 23
MISSING (needs data):    0 / 23

INTERACTIVE TIMELINE (src/scripts/interactives.js): 23 / 23 — confirmed
2026-07-28 by reading `_INTERACTIVE_STEPS` directly; every pattern slug has
a step timeline wired via `mountInteractives()`. `PROJECT_STATE.md` and
`ROADMAP.md` previously (incorrectly) listed this as outstanding — Phase 12
is now closed. Do not confuse this per-diagram animated timeline with
Phase 13 "Interactive Learning" (code walkthroughs, playgrounds, quizzes),
which is unstarted.


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
Template Method → QA → commit             DONE (upgraded to `skeleton`)
Visitor         → QA → commit             DONE (upgraded to `dispatch`)
Factory Method  → QA → commit             DONE (upgraded to `override`;
                                          includes a 2026-07-25 follow-up
                                          fix reconciling diagram card
                                          labels with the generic
                                          Participants table — see the
                                          CREATIONAL section above)
Abstract Factory → QA → commit → push     DONE (upgraded to `family`;
                                          see the CREATIONAL section
                                          above)
Builder          → QA → commit → push     DONE (upgraded to `assembly`;
                                          see the CREATIONAL section
                                          above)
Prototype        → QA → commit → push     DONE (upgraded to `mirror`;
                                          see the CREATIONAL section
                                          above)
Adapter          → QA → commit → push     DONE (upgraded to `translate`;
                                          see the STRUCTURAL section
                                          above)
Bridge           → QA → commit → push     DONE (upgraded to `span`; see
                                          the STRUCTURAL section above)
Composite        → QA → commit            DONE (upgraded to `tree`; see
                                          the STRUCTURAL section above)

ALL 23 PATTERNS NOW BESPOKE. Nothing left in this order-of-
implementation list.

DONE (2026-07-27) — full diagram<->Participants re-QA sweep across all
23 patterns. Before starting, the user was asked to resolve one scope
ambiguity: about half the patterns (Adapter, Bridge, Composite,
Abstract Factory, Builder, Factory Method, Prototype, Strategy,
Template Method) already use a "generic role label + docked concrete-
name plate" convention that gives every Participants row literal
matching text on the diagram; the other half, shipped earlier (Chain
of Responsibility, Command, Mediator, Memento, Observer, State,
Singleton, Decorator, Facade, Flyweight, Proxy, Visitor, Iterator),
show only concrete/worked-example names on cards (e.g. Mediator's hub
card just says "Chat Room", never the literal word "Mediator") with no
invented or misattributed vocabulary, just no on-card literal text for
some Participants rows. User chose "bug-hunt only" — flag/fix real
errors (invented terms not in Participants, misattributed behavior/
edges, a Participants row with zero conceptual representation), not a
strict retrofit that would redesign ~12 already-shipped, already-QA'd
diagrams just to add literal labels for every abstract role.

Method: extracted every node label/subtitle/`concrete` plate/edge
label (EN) from all 23 patterns' `visuals` and diffed against
`structure.participants` names, then read `structure.description` for
each pattern to check prose ties generic roles to concrete instances
coherently. Checked directionality of every labeled edge for
misattributed behavior (the exact bug class Builder had: a node
subtitle or edge claiming another participant's method).

Result: no new bugs found. The one open asymmetry noted during the
audit — Factory Method's `product` node shows only a plain `subtitle`
("Truck") for its ConcreteProduct flavor while the `creator` node in
the same diagram uses the structured `concrete: {role, label}` docked-
plate treatment for ConcreteCreator — was evaluated against the
"Composite Leaf nodes use docked subtitle too" precedent and judged
NOT a bug: Truck is still a real, non-invented conceptual
representation of ConcreteProduct, just styled with plain `subtitle`
instead of the two-line plate; no misattribution and no missing
concept, so it wasn't touched. Also spot-checked: Abstract Factory's
`visuals[0]` node `label`/`concrete.role`/`concrete.label` fields for
factory/button/checkbox are plain JS strings instead of the
`{en, ru}` object format used elsewhere (e.g. Adapter) — confirmed via
`_resolveLocalised` in PatternDetailPage.js that plain strings pass
through unchanged regardless of locale, so this renders identical
English text in both EN and RU. Judged NOT a functional bug: canonical
GoF class-role names (AbstractFactory/ConcreteFactory/AbstractProduct/
ConcreteProduct) are conventionally left untranslated in Russian
technical writing anyway (same convention `structure.participants[].name`
already follows project-wide — every pattern's participant `name`
field is a plain untranslated string, confirmed for Bridge/Adapter),
so the end result a RU reader sees would be identical even if the
JSON used `{en, ru}` objects with matching values. Left as a minor
formatting inconsistency, not fixed.

All other 21 patterns' diagram vocabulary matches `structure.participants`
with no invented terms and no misattributed behavior. No JSON edits
were made as a result of this sweep — every prior-audit fix (2026-07-25
and 2026-07-26 rounds, see above) had already caught the real instances
of this bug class.

DECISION (resolved 2026-07-22): upgrade ALL remaining GENERIC diagrams
to bespoke layouts. GENERIC is not an accepted permanent state for any
pattern — every one of the 23 must get its own `style` and its own
Diagram.js layout function, matching the VISUAL UNIQUENESS RULE. The
project is not considered visually finished at 11/11 Behavioral
BESPOKE; it is finished at 23/23.

RESOLVED (2026-07-27): the project has reached 23/23 BESPOKE with
Composite's `tree` layout. No GENERIC diagrams remain.

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
[ ] Every generic term shown on the diagram (node labels, docked
    "concrete" plates, edge labels) has a matching row in
    Structure > Participants, in both EN and RU — no diagram term
    invents vocabulary the Participants table doesn't have, and no
    Participants row is missing from the diagram (see the Builder
    2026-07-26 fix: a node subtitle claimed another participant's
    method, and a dead "concrete" field invented a term not in the
    pattern's canonical participant list — caught only by reading
    Participants text against rendered diagram text side by side)
[ ] MANDATORY, before touching the diagram at all (added 2026-07-26):
    read intent/problem/solution/structure.description/participants/
    implementation for the pattern end-to-end and verify the logic
    lines up across ALL of them, not just diagram-vs-participants:
      - problem and solution use the same worked example (same class/
        entity names) with no contradiction between them
      - structure.description describes the same mechanism as
        problem/solution, not a generic restatement that quietly
        diverges
      - every Participants row is actually named and used, under the
        same name/role, in problem/solution AND in the implementation
        code (all 5 languages) — no participant that exists only in
        one place
      - the implementation code enacts the scenario problem/solution
        describes, not a different example copied from another
        pattern by mistake
    Only once these check out does the diagram get built to match —
    fix contradictions in the JSON first; never bend the diagram to
    match a bug instead of fixing the bug.

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
Adapter
Bridge
Composite

STILL GENERIC: none — all 7 structural patterns are now BESPOKE.

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
         (EN/RU, light/dark, clean build), committed and pushed
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
