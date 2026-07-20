# Design System — Design Patterns Academy

> Single source of truth for all visual and interaction decisions.
> All values are implemented as CSS custom properties in `src/styles/base/tokens.css`.

---

## Table of Contents

1. [Color Palette](#1-color-palette)
2. [CSS Variables](#2-css-variables)
3. [Typography](#3-typography)
4. [Font Scale](#4-font-scale)
5. [Spacing System](#5-spacing-system)
6. [Border Radius](#6-border-radius)
7. [Shadows](#7-shadows)
8. [Breakpoints](#8-breakpoints)
9. [Container Widths](#9-container-widths)
10. [Grid System](#10-grid-system)
11. [Z-Index Scale](#11-z-index-scale)
12. [Motion Guidelines](#12-motion-guidelines)
13. [Animation Timing](#13-animation-timing)
14. [Light Theme](#14-light-theme)
15. [Dark Theme](#15-dark-theme)
16. [Button Variants](#16-button-variants)
17. [Card Variants](#17-card-variants)
18. [Icon Rules](#18-icon-rules)
19. [Code Block Style](#19-code-block-style)

---

## 1. Color Palette

### Accent — Indigo

The primary brand color. Used for CTAs, links, highlights, and interactive elements.

| Token | Hex | Usage |
|-------|-----|-------|
| `--palette-accent-50` | `#EEF2FF` | Accent tint backgrounds |
| `--palette-accent-100` | `#E0E7FF` | Hover tint |
| `--palette-accent-200` | `#C7D2FE` | Active tint |
| `--palette-accent-300` | `#A5B4FC` | Disabled accent |
| `--palette-accent-400` | `#818CF8` | Soft accent |
| `--palette-accent-500` | `#6366F1` | **Primary accent** |
| `--palette-accent-600` | `#4F46E5` | Accent hover |
| `--palette-accent-700` | `#4338CA` | Accent pressed |
| `--palette-accent-800` | `#3730A3` | Dark accent |
| `--palette-accent-900` | `#312E81` | Darkest accent |

### Neutral — Gray

Used for all text, backgrounds, borders, and surfaces.

| Token | Hex | Usage |
|-------|-----|-------|
| `--palette-gray-0` | `#FFFFFF` | Pure white |
| `--palette-gray-50` | `#F9FAFB` | Page background (light) |
| `--palette-gray-100` | `#F3F4F6` | Secondary surface |
| `--palette-gray-200` | `#E5E7EB` | Borders, dividers |
| `--palette-gray-300` | `#D1D5DB` | Subtle borders |
| `--palette-gray-400` | `#9CA3AF` | Placeholder, disabled |
| `--palette-gray-500` | `#6B7280` | Tertiary text |
| `--palette-gray-600` | `#4B5563` | Secondary text |
| `--palette-gray-700` | `#374151` | Primary text (light) |
| `--palette-gray-800` | `#1F2937` | Strong text |
| `--palette-gray-900` | `#111827` | Near-black |
| `--palette-gray-950` | `#0A0C10` | Page background (dark) |

### Semantic — Status Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--palette-green-500` | `#22C55E` | Success |
| `--palette-yellow-500` | `#EAB308` | Warning |
| `--palette-red-500` | `#EF4444` | Error / Danger |
| `--palette-blue-500` | `#3B82F6` | Info |

### Pattern Categories

| Category | Token | Hex |
|----------|-------|-----|
| Creational | `--palette-category-creational` | `#8B5CF6` |
| Structural | `--palette-category-structural` | `#06B6D4` |
| Behavioral | `--palette-category-behavioral` | `#F59E0B` |

---

## 2. CSS Variables

All semantic tokens are defined in `src/styles/base/tokens.css`.
Semantic tokens reference palette tokens and switch between themes.

### Naming Convention

```
--color-{role}-{variant}
--space-{n}
--radius-{size}
--shadow-{level}
--z-{layer}
--duration-{speed}
--ease-{curve}
--font-{property}
```

### Core Semantic Tokens

```css
/* Backgrounds */
--color-bg-base          /* Page background */
--color-bg-surface       /* Cards, panels */
--color-bg-elevated      /* Modals, dropdowns */
--color-bg-subtle        /* Inset sections, code blocks */
--color-bg-inverse       /* Inverted backgrounds */

/* Text */
--color-text-primary     /* Body text */
--color-text-secondary   /* Supporting text */
--color-text-tertiary    /* Captions, timestamps */
--color-text-disabled    /* Disabled states */
--color-text-inverse     /* Text on dark/accent bg */
--color-text-link        /* Hyperlinks */
--color-text-link-hover  /* Link hover */

/* Borders */
--color-border           /* Default border */
--color-border-subtle    /* Dividers */
--color-border-strong    /* Emphasis borders */
--color-border-accent    /* Accent-colored border */

/* Accent */
--color-accent           /* Primary CTA, highlights */
--color-accent-hover     /* Hover state */
--color-accent-pressed   /* Active/pressed */
--color-accent-subtle    /* Tint background */
--color-accent-text      /* Text on accent background */

/* Status */
--color-success
--color-warning
--color-error
--color-info
```

---

## 3. Typography

### Font Families

```css
--font-sans:  'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono:  'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
--font-serif: 'Georgia', serif; /* decorative only */
```

**Inter** — primary UI font. Highly legible at small sizes, professional and neutral.
**JetBrains Mono** — code blocks and inline code. Ligature support.

### Font Weights

| Token | Value | Usage |
|-------|-------|-------|
| `--font-weight-regular` | `400` | Body text |
| `--font-weight-medium` | `500` | Labels, nav items |
| `--font-weight-semibold` | `600` | Headings h4–h6, buttons |
| `--font-weight-bold` | `700` | Headings h1–h3 |

### Line Heights

| Token | Value | Usage |
|-------|-------|-------|
| `--line-height-tight` | `1.2` | Display headings |
| `--line-height-snug` | `1.35` | Card titles |
| `--line-height-normal` | `1.5` | Body text |
| `--line-height-relaxed` | `1.7` | Long-form reading |
| `--line-height-code` | `1.6` | Code blocks |

### Letter Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--tracking-tight` | `-0.02em` | Large display headings |
| `--tracking-normal` | `0` | Body text |
| `--tracking-wide` | `0.04em` | Uppercase labels, badges |
| `--tracking-wider` | `0.08em` | Caps, overlines |

---

## 4. Font Scale

Based on a **Major Third (1.250)** modular scale, base 16px.

| Token | Size | rem | Usage |
|-------|------|-----|-------|
| `--text-xs` | 12px | 0.75rem | Captions, timestamps, labels |
| `--text-sm` | 14px | 0.875rem | Secondary UI text, code annotations |
| `--text-base` | 16px | 1rem | Body text, default |
| `--text-lg` | 18px | 1.125rem | Lead paragraphs |
| `--text-xl` | 20px | 1.25rem | Card titles, h6 |
| `--text-2xl` | 24px | 1.5rem | Section titles, h5 |
| `--text-3xl` | 30px | 1.875rem | h4 |
| `--text-4xl` | 36px | 2.25rem | h3 |
| `--text-5xl` | 48px | 3rem | h2 |
| `--text-6xl` | 60px | 3.75rem | h1 |
| `--text-7xl` | 72px | 4.5rem | Hero display |

---

## 5. Spacing System

Base unit: **4px**. All spacing values are multiples of the base unit.

| Token | px | rem | Usage |
|-------|----|-----|-------|
| `--space-1` | 4px | 0.25rem | Inline gaps, icon padding |
| `--space-2` | 8px | 0.5rem | Tight component spacing |
| `--space-3` | 12px | 0.75rem | Input inner padding |
| `--space-4` | 16px | 1rem | Default component padding |
| `--space-5` | 20px | 1.25rem | Medium gaps |
| `--space-6` | 24px | 1.5rem | Card padding, section gaps |
| `--space-8` | 32px | 2rem | Section internal spacing |
| `--space-10` | 40px | 2.5rem | Component separation |
| `--space-12` | 48px | 3rem | Large section padding |
| `--space-16` | 64px | 4rem | Section vertical rhythm |
| `--space-20` | 80px | 5rem | Page section gaps |
| `--space-24` | 96px | 6rem | Hero spacing |
| `--space-32` | 128px | 8rem | Large layout spacing |

---

## 6. Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-none` | `0` | Sharp edges, tables |
| `--radius-sm` | `4px` | Badges, tags, inputs |
| `--radius-md` | `8px` | Buttons, small cards |
| `--radius-lg` | `12px` | Cards, panels |
| `--radius-xl` | `16px` | Large cards, modals |
| `--radius-2xl` | `24px` | Feature sections |
| `--radius-full` | `9999px` | Pills, avatars, toggles |

---

## 7. Shadows

All shadows use `--color-shadow-rgb` for theme-aware opacity.

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-none` | `none` | Flat elements |
| `--shadow-xs` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.06)` | Cards (default) |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)` | Hover cards |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.10), 0 4px 6px rgba(0,0,0,0.05)` | Dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.10), 0 10px 10px rgba(0,0,0,0.04)` | Modals |
| `--shadow-2xl` | `0 25px 50px rgba(0,0,0,0.25)` | Overlays |
| `--shadow-accent` | `0 0 0 3px rgba(99,102,241,0.35)` | Focus rings, accent glows |
| `--shadow-inset` | `inset 0 2px 4px rgba(0,0,0,0.06)` | Inputs, pressed states |

---

## 8. Breakpoints

Mobile-first approach. All media queries use `min-width`.

| Token | Value | Device |
|-------|-------|--------|
| `--bp-xs` | `375px` | Small phones |
| `--bp-sm` | `640px` | Large phones |
| `--bp-md` | `768px` | Tablets |
| `--bp-lg` | `1024px` | Small laptops |
| `--bp-xl` | `1280px` | Desktops |
| `--bp-2xl` | `1536px` | Large displays |

```css
/* Usage in media queries */
@media (min-width: 768px) { ... }
@media (min-width: 1024px) { ... }
```

---

## 9. Container Widths

| Token | Value | Usage |
|-------|-------|-------|
| `--container-xs` | `480px` | Narrow modals, forms |
| `--container-sm` | `640px` | Reading width, articles |
| `--container-md` | `768px` | Content panels |
| `--container-lg` | `1024px` | Default page container |
| `--container-xl` | `1280px` | Wide layouts |
| `--container-full` | `100%` | Full-width sections |
| `--container-prose` | `65ch` | Optimal reading line length |

All containers include `padding-inline: var(--space-4)` on mobile,
scaling to `padding-inline: var(--space-8)` on `md+`.

---

## 10. Grid System

12-column grid system using CSS Grid.

```css
--grid-columns: 12;
--grid-gap: var(--space-6);       /* 24px default */
--grid-gap-sm: var(--space-4);    /* 16px compact */
--grid-gap-lg: var(--space-8);    /* 32px spacious */
```

### Common Layouts

| Layout | Columns |
|--------|---------|
| Full width | `1 / -1` |
| Main content | `span 8` |
| Sidebar | `span 4` |
| Half | `span 6` |
| Third | `span 4` |
| Quarter | `span 3` |

On `< md`: All columns collapse to `span 12` (single column).

---

## 11. Z-Index Scale

| Token | Value | Layer |
|-------|-------|-------|
| `--z-below` | `-1` | Background elements |
| `--z-base` | `0` | Default document flow |
| `--z-raised` | `10` | Cards, hover effects |
| `--z-dropdown` | `100` | Dropdowns, menus |
| `--z-sticky` | `200` | Sticky header |
| `--z-overlay` | `300` | Backdrop overlays |
| `--z-modal` | `400` | Modal dialogs |
| `--z-toast` | `500` | Toast notifications |
| `--z-tooltip` | `600` | Tooltips |

---

## 12. Motion Guidelines

### Principles

- **Purposeful** — every animation serves a function (guide attention, show state change, provide feedback)
- **Subtle** — prefer understatement; animations enhance, not distract
- **Consistent** — same element type = same animation behavior everywhere
- **Accessible** — all non-essential animations respect `prefers-reduced-motion: reduce`

### Motion Roles

| Role | Description | Example |
|------|-------------|---------|
| **Feedback** | Confirm user action | Button press scale |
| **Transition** | Move between states/views | Page fade, card expand |
| **Reveal** | Bring content into view | Scroll-triggered entrance |
| **Emphasis** | Draw attention | Pulse on new content |

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 13. Animation Timing

### Durations

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-instant` | `50ms` | Hover color fills |
| `--duration-fast` | `100ms` | Hover icon scale, color swap |
| `--duration-normal` | `200ms` | Buttons, toggles, focus rings |
| `--duration-moderate` | `300ms` | Dropdowns, tooltips, cards |
| `--duration-slow` | `500ms` | Page transitions, modals |
| `--duration-slower` | `700ms` | Entrance animations |
| `--duration-crawl` | `1000ms` | Loaders, skeleton pulses |

### Easing Curves

| Token | Value | Usage |
|-------|-------|-------|
| `--ease-linear` | `linear` | Progress bars, loaders |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Elements leaving screen |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering screen |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | State changes, toggles |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful interactions |
| `--ease-smooth` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | General transitions |

### Standard Transitions

```css
--transition-colors:    color var(--duration-normal) var(--ease-in-out),
                        background-color var(--duration-normal) var(--ease-in-out),
                        border-color var(--duration-normal) var(--ease-in-out);

--transition-transform: transform var(--duration-normal) var(--ease-out);

--transition-opacity:   opacity var(--duration-moderate) var(--ease-in-out);

--transition-shadow:    box-shadow var(--duration-normal) var(--ease-in-out);

--transition-all:       all var(--duration-normal) var(--ease-in-out);
```

---

## 14. Light Theme

Light theme is the **default** (`:root`).

| Role | Token | Value |
|------|-------|-------|
| Page background | `--color-bg-base` | `#F9FAFB` |
| Card / Surface | `--color-bg-surface` | `#FFFFFF` |
| Elevated (modal) | `--color-bg-elevated` | `#FFFFFF` |
| Subtle inset | `--color-bg-subtle` | `#F3F4F6` |
| Primary text | `--color-text-primary` | `#111827` |
| Secondary text | `--color-text-secondary` | `#374151` |
| Tertiary text | `--color-text-tertiary` | `#6B7280` |
| Disabled text | `--color-text-disabled` | `#9CA3AF` |
| Link | `--color-text-link` | `#4F46E5` |
| Link hover | `--color-text-link-hover` | `#4338CA` |
| Default border | `--color-border` | `#E5E7EB` |
| Subtle border | `--color-border-subtle` | `#F3F4F6` |
| Strong border | `--color-border-strong` | `#D1D5DB` |
| Accent | `--color-accent` | `#6366F1` |
| Accent hover | `--color-accent-hover` | `#4F46E5` |
| Accent pressed | `--color-accent-pressed` | `#4338CA` |
| Accent subtle bg | `--color-accent-subtle` | `#EEF2FF` |
| Text on accent | `--color-accent-text` | `#FFFFFF` |

---

## 15. Dark Theme

Applied via `[data-theme="dark"]` on `<html>`.

| Role | Token | Value |
|------|-------|-------|
| Page background | `--color-bg-base` | `#0A0C10` |
| Card / Surface | `--color-bg-surface` | `#111318` |
| Elevated (modal) | `--color-bg-elevated` | `#1A1D24` |
| Subtle inset | `--color-bg-subtle` | `#0F1117` |
| Primary text | `--color-text-primary` | `#F9FAFB` |
| Secondary text | `--color-text-secondary` | `#E5E7EB` |
| Tertiary text | `--color-text-tertiary` | `#9CA3AF` |
| Disabled text | `--color-text-disabled` | `#4B5563` |
| Link | `--color-text-link` | `#818CF8` |
| Link hover | `--color-text-link-hover` | `#A5B4FC` |
| Default border | `--color-border` | `#1F2937` |
| Subtle border | `--color-border-subtle` | `#111827` |
| Strong border | `--color-border-strong` | `#374151` |
| Accent | `--color-accent` | `#6366F1` |
| Accent hover | `--color-accent-hover` | `#818CF8` |
| Accent pressed | `--color-accent-pressed` | `#A5B4FC` |
| Accent subtle bg | `--color-accent-subtle` | `rgba(99,102,241,0.12)` |
| Text on accent | `--color-accent-text` | `#FFFFFF` |

### Dark Theme Surface Elevation System

Dark theme uses opacity layering (not lightness) for depth.

| Level | bg-color opacity | Usage |
|-------|-----------------|-------|
| 0 (base) | `#0A0C10` | Page |
| 1 (surface) | `#111318` | Cards |
| 2 (elevated) | `#1A1D24` | Modals |
| 3 (overlay) | `#21252E` | Dropdowns, tooltips |

---

## 16. Button Variants

### Primary
- Background: `--color-accent`
- Text: `--color-accent-text`
- Hover: `--color-accent-hover` + `--shadow-md`
- Active: `--color-accent-pressed` + `scale(0.98)`
- Border: none
- Radius: `--radius-md`

### Secondary
- Background: `--color-bg-surface`
- Text: `--color-text-primary`
- Border: `1px solid --color-border`
- Hover: `--color-bg-subtle` + `--shadow-sm`
- Active: background darkens slightly

### Ghost
- Background: transparent
- Text: `--color-text-primary`
- Border: none
- Hover: `--color-bg-subtle`
- Active: `--color-bg-subtle` darkened

### Danger
- Background: `--palette-red-500`
- Text: `#FFFFFF`
- Hover: `#DC2626`
- Usage: destructive actions only

### Sizes

| Size | Height | Padding | Font |
|------|--------|---------|------|
| `sm` | 32px | `--space-2 --space-3` | `--text-sm` |
| `md` | 40px | `--space-2 --space-4` | `--text-base` |
| `lg` | 48px | `--space-3 --space-6` | `--text-lg` |

### States (all variants)
- `focus-visible`: `--shadow-accent` (keyboard nav ring)
- `disabled`: opacity `0.45`, `cursor: not-allowed`
- `loading`: spinner icon replaces label, pointer-events disabled

---

## 17. Card Variants

### Default Card
- Background: `--color-bg-surface`
- Border: `1px solid --color-border`
- Radius: `--radius-lg`
- Shadow: `--shadow-sm`
- Padding: `--space-6`
- Hover: `--shadow-md` + `translateY(-2px)`

### Pattern Card (catalog grid)
- Extends Default Card
- Contains: category badge, pattern name, one-line intent, arrow icon
- Hover: accent border top `3px solid --color-accent` + lift

### Feature Card (homepage)
- Larger padding: `--space-8`
- Radius: `--radius-xl`
- May include gradient background overlay
- No hover lift — static showcase element

### Code Card (pattern detail)
- Background: `--color-bg-subtle`
- Font: `--font-mono`
- Border: `1px solid --color-border-subtle`
- Radius: `--radius-md`
- No box shadow

### Stat Card
- Minimal, text-focused
- Large metric in `--text-5xl --font-weight-bold`
- Label in `--text-sm --color-text-tertiary`
- Border-left accent: `3px solid --color-accent`

---

## 18. Icon Rules

### Library
- Source: [Lucide Icons](https://lucide.dev) — MIT licensed, consistent stroke style
- Format: inline SVG (no icon font, no external sprite for critical icons)
- Sprite: `public/icons.svg` for non-critical decorative icons

### Sizing

| Size token | px | Usage |
|------------|----|-------|
| `--icon-xs` | 12px | Inline text decorations |
| `--icon-sm` | 16px | Buttons, labels, inputs |
| `--icon-md` | 20px | Default UI icons |
| `--icon-lg` | 24px | Navigation, headings |
| `--icon-xl` | 32px | Feature icons, empty states |
| `--icon-2xl` | 48px | Hero decorative icons |

### Rules
- `stroke-width` always `1.5` for Lucide icons
- Color inherits `currentColor` — never hardcoded
- All icons that convey meaning must have `aria-label` or `title`
- Decorative icons: `aria-hidden="true"`
- Never scale icons with `font-size` — use explicit `width` / `height`

---

## 19. Code Block Style

### Design

- Background: `--color-bg-subtle` (light) / `#0D1117` (dark, GitHub-style)
- Font: `--font-mono`, `--text-sm` (14px)
- Line height: `--line-height-code` (1.6)
- Padding: `--space-6`
- Border-radius: `--radius-md`
- Border: `1px solid --color-border-subtle`
- Tab size: 2 spaces

### Header Bar (language + copy button)
- Height: 40px
- Background: slightly darker than code block bg
- Language label: `--text-xs --tracking-wider` uppercase, `--color-text-tertiary`
- Copy button: Ghost variant `sm` size, right-aligned

### Syntax Highlighting Palette

Used for both themes (dark bg variant preferred for code blocks in both light and dark mode for consistency).

| Role | Token | Color |
|------|-------|-------|
| Background | `--code-bg` | `#0D1117` |
| Default text | `--code-text` | `#E6EDF3` |
| Keyword | `--code-keyword` | `#FF7B72` |
| String | `--code-string` | `#A5D6FF` |
| Number | `--code-number` | `#79C0FF` |
| Comment | `--code-comment` | `#8B949E` |
| Function | `--code-function` | `#D2A8FF` |
| Class | `--code-class` | `#FFA657` |
| Variable | `--code-variable` | `#E6EDF3` |
| Operator | `--code-operator` | `#FF7B72` |
| Punctuation | `--code-punctuation` | `#8B949E` |

Palette is GitHub Dark-inspired for developer familiarity.

### Inline Code

- Font: `--font-mono`, `0.875em` relative to parent
- Background: `--color-bg-subtle`
- Border: `1px solid --color-border`
- Radius: `--radius-sm`
- Padding: `2px 6px`
- Color: `--palette-accent-500` (light) / `--palette-accent-300` (dark)

---

*Last updated: Phase 2 — Design System*
