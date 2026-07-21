/* ============================================================
   MODULE REGISTRY — Design Patterns Academy
   Multi-domain knowledge module definitions.
   Add new domains here without touching any other file.
   ============================================================ */

export const MODULES = [
  {
    id:       'design-patterns',
    status:   'active',
    icon:     'hexagon',
    dataPath: 'patterns',
    title: {
      en: 'Design Patterns',
      ru: 'Паттерны проектирования',
    },
    description: {
      en: '23 classic Gang of Four patterns for object-oriented design',
      ru: '23 классических паттерна Gang of Four для ООП',
    },
    categories: [
      {
        id: 'creational',
        title:       { en: 'Creational',  ru: 'Порождающие'  },
        description: { en: 'Deal with object creation mechanisms', ru: 'Механизмы создания объектов' },
        color: 'var(--palette-category-creational)',
        count: 5,
      },
      {
        id: 'structural',
        title:       { en: 'Structural',  ru: 'Структурные'  },
        description: { en: 'Deal with object composition and relationships', ru: 'Компоновка и отношения объектов' },
        color: 'var(--palette-category-structural)',
        count: 7,
      },
      {
        id: 'behavioral',
        title:       { en: 'Behavioral',  ru: 'Поведенческие' },
        description: { en: 'Deal with communication between objects', ru: 'Взаимодействие и обязанности объектов' },
        color: 'var(--palette-category-behavioral)',
        count: 11,
      },
    ],
  },

  {
    id:       'algorithms',
    status:   'planned',
    icon:     'cpu',
    dataPath: 'algorithms',
    title:       { en: 'Algorithms',       ru: 'Алгоритмы' },
    description: { en: 'Sorting, searching, graph algorithms and more', ru: 'Сортировка, поиск, графовые алгоритмы и другое' },
    categories: [],
  },

  {
    id:       'data-structures',
    status:   'planned',
    icon:     'layers',
    dataPath: 'data-structures',
    title:       { en: 'Data Structures',  ru: 'Структуры данных' },
    description: { en: 'Arrays, trees, graphs, heaps and beyond', ru: 'Массивы, деревья, графы, кучи и другое' },
    categories: [],
  },

  {
    id:       'software-architecture',
    status:   'planned',
    icon:     'building',
    dataPath: 'architecture',
    title:       { en: 'Software Architecture', ru: 'Архитектура ПО' },
    description: { en: 'MVC, CQRS, Event Sourcing, microservices and more', ru: 'MVC, CQRS, Event Sourcing, микросервисы и другое' },
    categories: [],
  },

  {
    id:       'databases',
    status:   'planned',
    icon:     'database',
    dataPath: 'databases',
    title:       { en: 'Databases',    ru: 'Базы данных' },
    description: { en: 'Relational, NoSQL, indexing, and query optimization', ru: 'Реляционные, NoSQL, индексы, оптимизация запросов' },
    categories: [],
  },

  {
    id:       'networking',
    status:   'planned',
    icon:     'wifi',
    dataPath: 'networking',
    title:       { en: 'Networking',   ru: 'Сети' },
    description: { en: 'Protocols, HTTP, REST, WebSockets and more', ru: 'Протоколы, HTTP, REST, WebSockets и другое' },
    categories: [],
  },

  {
    id:       'devops',
    status:   'planned',
    icon:     'server',
    dataPath: 'devops',
    title:       { en: 'DevOps',       ru: 'DevOps' },
    description: { en: 'CI/CD, Docker, Kubernetes, and infrastructure as code', ru: 'CI/CD, Docker, Kubernetes, инфраструктура как код' },
    categories: [],
  },

  {
    id:       'cloud',
    status:   'planned',
    icon:     'cloud',
    dataPath: 'cloud',
    title:       { en: 'Cloud',        ru: 'Облачные технологии' },
    description: { en: 'AWS, GCP, Azure patterns and best practices', ru: 'AWS, GCP, Azure паттерны и лучшие практики' },
    categories: [],
  },
];
