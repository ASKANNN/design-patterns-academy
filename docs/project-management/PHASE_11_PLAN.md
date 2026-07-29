# Phase 11 — GoF Pattern Expansion: Implementation Plan

Version: 1.0
Last Updated: 2026-07-10

---

## Context

Phase 10 is complete.

Singleton is the approved Gold Standard reference implementation.
Observer is also complete and follows the same schema.

Status: COMPLETED

Historical document.

Phase 11 successfully completed.

See PROJECT_STATE.md for the current project state.

The implementation strategy below is designed to complete all 21 patterns consistently, one batch at a time, without modifying the architecture.

---

## 1. Recommended Implementation Order

Priority rules:
1. Complete one category before moving to the next (reduces context-switching).
2. Within a category: simple patterns first, complex patterns last.
3. Within equal complexity: high-popularity patterns first (maximum user value early).

### Creational (4 remaining)

| # | Pattern          | Complexity | Popularity |
|---|-----------------|------------|------------|
| 1 | Factory Method   | 1          | 3          |
| 2 | Prototype        | 1          | 2          |
| 3 | Builder          | 2          | 3          |
| 4 | Abstract Factory | 2          | 3          |

### Structural (7 remaining)

| # | Pattern    | Complexity | Popularity |
|---|-----------|------------|------------|
| 5 | Adapter    | 1          | 3          |
| 6 | Facade     | 1          | 3          |
| 7 | Decorator  | 2          | 3          |
| 8 | Composite  | 2          | 2          |
| 9 | Proxy      | 2          | 1          |
|10 | Bridge     | 3          | 1          |
|11 | Flyweight  | 3          | 1          |

### Behavioral (10 remaining)

| # | Pattern                   | Complexity | Popularity |
|---|--------------------------|------------|------------|
|12 | Strategy                  | 1          | 3          |
|13 | Command                   | 1          | 3          |
|14 | Iterator                  | 1          | 3          |
|15 | State                     | 1          | 2          |
|16 | Template Method           | 1          | 2          |
|17 | Chain of Responsibility   | 2          | 2          |
|18 | Mediator                  | 2          | 2          |
|19 | Memento                   | 2          | 1          |
|20 | Visitor                   | 3          | 1          |
|21 | Interpreter               | 3          | 1          |

---

## 2. Pattern Categories

GoF defines 3 categories. All patterns belong to exactly one.

| Category   | Total | Done | Remaining |
|-----------|-------|------|-----------|
| Creational | 5     | 1    | 4         |
| Structural | 7     | 0    | 7         |
| Behavioral | 11    | 2    | 10        |
| **Total**  | **23**| **3**| **21**    |

> Note: Observer is complete (status: available in index.json and behavioral/observer.json exists), but it was not part of the Gold Standard review in Phase 10. It should be validated against the Gold Standard checklist before Phase 11 is closed.

---

## 3. Estimated Work Batches

Each batch contains 2–4 patterns of similar complexity and the same category. Batches are reviewed and approved before the next batch begins.

| Batch | Patterns                                      | Category   | Size |
|-------|----------------------------------------------|------------|------|
| B1    | Factory Method, Prototype                     | Creational | 2    |
| B2    | Builder, Abstract Factory                     | Creational | 2    |
| B3    | Adapter, Facade                               | Structural | 2    |
| B4    | Decorator, Composite, Proxy                   | Structural | 3    |
| B5    | Bridge, Flyweight                             | Structural | 2    |
| B6    | Strategy, Command, Iterator                   | Behavioral | 3    |
| B7    | State, Template Method                        | Behavioral | 2    |
| B8    | Chain of Responsibility, Mediator, Memento    | Behavioral | 3    |
| B9    | Visitor, Interpreter                          | Behavioral | 2    |

**Total: 9 batches, 21 patterns.**

Each batch follows the full workflow: implement → self-review → report → wait for approval.

---

## 4. Validation Checklist (per pattern)

Run before reporting a pattern as complete.

### JSON Structure

- [ ] File exists at the correct path: `src/data/patterns/{category}/{slug}.json`
- [ ] JSON is valid (no parse errors)
- [ ] `slug` matches the slug in `index.json`
- [ ] `category` matches the category in `index.json`
- [ ] All required top-level fields present: `slug`, `name`, `category`, `complexity`, `popularity`, `also_known_as`, `tags`, `intent`, `problem`, `solution`, `structure`, `implementation`, `pros`, `cons`, `when_to_use`, `real_world_examples`, `related_patterns`

### Bilingual Content

- [ ] Every bilingual field contains both `"en"` and `"ru"` keys
- [ ] `intent` — both languages complete
- [ ] `problem` — both languages complete
- [ ] `solution` — both languages complete
- [ ] `structure.description` — both languages complete
- [ ] Each `structure.participants[].role` — both languages complete
- [ ] Each `pros[]` item — both languages complete
- [ ] Each `cons[]` item — both languages complete
- [ ] Each `when_to_use[]` item — both languages complete
- [ ] Each `real_world_examples[]` item — both languages complete

### Code Examples

- [ ] `implementation.javascript` present
- [ ] `implementation.typescript` present
- [ ] At least one additional language present (Java, C#, or Python)
- [ ] All code examples are valid, runnable, and demonstrate the pattern
- [ ] Code examples use modern idiomatic syntax for each language

### Cross-References

- [ ] All slugs in `related_patterns[]` exist in `index.json`
- [ ] `related_patterns[]` contains 2–5 entries (not empty, not exhaustive)

### Index Update

- [ ] `src/data/patterns/index.json` updated: pattern status changed from `"coming-soon"` to `"available"`

### Rendered Page

- [ ] Pattern detail page loads without JavaScript errors
- [ ] All 8 content sections render: Intent, Problem, Solution, Structure, Implementation, Pros & Cons, When to Use, Real-World Examples
- [ ] Language switcher toggles EN ↔ RU for all sections
- [ ] Code block language tabs function correctly
- [ ] Related patterns links resolve to valid pages
- [ ] "Back to catalog" navigation works

### Responsive

- [ ] Mobile (375px): no overflow, no broken layout
- [ ] Tablet (768px): layout correct
- [ ] Desktop (1280px): layout correct

### Accessibility

- [ ] No accessibility violations at AA level
- [ ] Code blocks have correct ARIA labels
- [ ] Headings hierarchy is correct

---

## 5. Definition of Done (per pattern)

A pattern is Done when all of the following are true:

1. **JSON file** created at `src/data/patterns/{category}/{slug}.json`
2. **All required fields** present and correctly structured
3. **Both languages** complete — no `en` or `ru` field is empty or placeholder
4. **Code examples** in JavaScript + TypeScript + at least one more language
5. **Related patterns** reference valid slugs only
6. **index.json** updated to `"status": "available"`
7. **Pattern detail page** renders all sections without errors
8. **Language switch** works correctly for all text sections
9. **Responsive** layout verified at mobile, tablet, desktop
10. **Accessibility** verified — no AA violations
11. **Reviewed and approved** by the project owner

A pattern is not Done if any item above is incomplete, even if the JSON file exists.

---

## 6. Required Files (per pattern)

Each pattern requires changes to exactly **2 files**.

### File 1 — Pattern data file (NEW)

```
src/data/patterns/{category}/{slug}.json
```

Schema mirrors the Gold Standard (`singleton.json`):

```
slug
name
category
complexity
popularity
also_known_as       []
tags                []
intent              { en, ru }
problem             { en, ru }
solution            { en, ru }
structure           { description: { en, ru }, participants: [{ name, role: { en, ru } }] }
implementation      { javascript, typescript, java?, csharp?, python? }
pros                [{ en, ru }]
cons                [{ en, ru }]
when_to_use         [{ en, ru }]
real_world_examples [{ en, ru }]
related_patterns    []
```

### File 2 — Pattern index (MODIFIED)

```
src/data/patterns/index.json
```

Change the target pattern's status:
```json
"status": "coming-soon"  →  "status": "available"
```

Additional files may be modified only when they are directly required to implement or fix the current roadmap phase. No unrelated files may be changed.

---

## 7. Expected Review Workflow

Each batch follows the same review sequence.

```
1. Implement batch
   └─ Create all JSON files for the batch
   └─ Update index.json for all patterns in the batch

2. Self-review
   └─ Run validation checklist for every pattern in the batch
   └─ Verify rendered pages in browser

3. Report
   └─ List files created
   └─ List patterns completed
   └─ Flag any issues or ambiguities

4. STOP — wait for owner review

5. Owner reviews
   └─ Verify JSON schema
   └─ Verify content quality (EN + RU)
   └─ Verify rendered pages
   └─ Verify accessibility and responsive

6. APPROVED or FIX REQUESTED
   └─ If fix: apply fix, re-report, wait again
   └─ If approved: proceed to commit step

7. Commit (on owner request)
   └─ One commit per batch
   └─ Follow commit convention

8. Push (on owner request)

9. Next batch begins
```

---

## 8. Expected Git Workflow

### Branch

All Phase 11 work continues on the current branch:

```
feature/phase-11-gof-expansion
```

Do not create sub-branches per pattern or per batch unless the owner requests it.

### Commit Convention

One commit per approved batch. Commit message format:

```
feat(content): add {Pattern Names} pattern(s)

- src/data/patterns/{category}/{slug}.json
- src/data/patterns/index.json
```

Examples:

```
feat(content): add Factory Method and Prototype patterns
feat(content): add Adapter and Facade patterns
feat(content): add Strategy, Command, and Iterator patterns
```

### Commit Timing

Commits are created **only after** owner approval of a batch.

No speculative commits. No commits for partial work.

### Push

Push is performed **only when explicitly requested** by the owner.

### Tag / Release

When all 23 patterns are complete and approved, the owner will determine the release process. Do not tag or release automatically.

---

## Implementation Notes

- Strictly follow the Gold Standard schema from `singleton.json`
- Observer (`observer.json`) is a confirmed second reference — check it for style consistency on behavioral patterns
- `also_known_as` may be an empty array `[]` if the pattern has no common aliases
- `implementation` must always include `javascript` and `typescript` at minimum
- `related_patterns` must only reference slugs that exist in `index.json`
- Russian content must be natural — not a literal machine translation
- Code examples must demonstrate the pattern directly, not just define classes
- `real_world_examples` should reference technologies developers know (browser APIs, popular frameworks, standard libraries)

---

## Phase 11 Completion Criteria

Phase 11 is complete when:

- All 23 patterns have `"status": "available"` in `index.json`
- All 21 pattern JSON files exist and pass the validation checklist
- All patterns have been reviewed and approved
- `PROJECT_STATE.md` is updated to reflect Phase 11 as complete
- Version is incremented to `v1.1.0` (stable)
