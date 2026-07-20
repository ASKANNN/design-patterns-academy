/* ============================================================
   PATTERNS CONFIG — Design Patterns Academy
   Category and metadata definitions for GoF patterns.
   Pure config — no data fetching.
   ============================================================ */

export const CATEGORIES = ['creational', 'structural', 'behavioral'];

export const COMPLEXITY_LABELS = {
  en: { 1: 'Simple', 2: 'Medium', 3: 'Complex' },
  ru: { 1: 'Простой', 2: 'Средний', 3: 'Сложный' },
};

export const POPULARITY_LABELS = {
  en: { 1: 'Low',   2: 'Medium',  3: 'High'   },
  ru: { 1: 'Низкая', 2: 'Средняя', 3: 'Высокая' },
};

/* Supported implementation languages */
export const CODE_LANGS = [
  { id: 'javascript', label: 'JavaScript' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'python',     label: 'Python'     },
  { id: 'java',       label: 'Java'       },
  { id: 'csharp',     label: 'C#'         },
];

/* Ordered list of all 23 GoF patterns (slug → category mapping) */
export const PATTERN_SLUGS = {
  creational: [
    'abstract-factory',
    'builder',
    'factory-method',
    'prototype',
    'singleton',
  ],
  structural: [
    'adapter',
    'bridge',
    'composite',
    'decorator',
    'facade',
    'flyweight',
    'proxy',
  ],
  behavioral: [
    'chain-of-responsibility',
    'command',
    'interpreter',
    'iterator',
    'mediator',
    'memento',
    'observer',
    'state',
    'strategy',
    'template-method',
    'visitor',
  ],
};

export const isValidCategory = (cat) => CATEGORIES.includes(cat);
export const isValidSlug     = (slug) =>
  Object.values(PATTERN_SLUGS).flat().includes(slug);
