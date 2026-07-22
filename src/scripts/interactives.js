import { createVisualEngine } from '../components/visual/VisualEngine.js';

const _SINGLETON_STEPS = [
  { id: 'scene',    duration: 700,
    actions: [{ set: { id: 'instance', state: 'dim' } }] },

  { id: 'focus-a',  duration: 500,
    actions: [
      { set: { id: 'clientB', state: 'dim' } },
      { set: { id: 'clientC', state: 'dim' } },
    ] },

  { id: 'req-a',    duration: 1600,
    actions: [{ do: 'request', index: 0 }] },

  { id: 'creation', duration: 2400,
    actions: [
      { set: { id: 'instance', state: 'active' } },
      { glow: 'instance' },
      { do: 'creation', node: 'instance' },
    ] },

  { id: 'focus-b',  duration: 500,
    actions: [
      { set: { id: 'clientA', state: 'dim'    } },
      { set: { id: 'clientB', state: 'active' } },
    ] },

  { id: 'req-b',    duration: 1600,
    actions: [{ do: 'request', index: 1 }] },

  { id: 'reuse-b',  duration: 1800,
    actions: [{ do: 'reuse', node: 'instance' }] },

  { id: 'focus-c',  duration: 500,
    actions: [
      { set: { id: 'clientB', state: 'dim'    } },
      { set: { id: 'clientC', state: 'active' } },
    ] },

  { id: 'req-c',    duration: 1600,
    actions: [{ do: 'request', index: 2 }] },

  { id: 'reuse-c',  duration: 1600,
    actions: [{ do: 'reuse', node: 'instance' }] },

  { id: 'final',    duration: 5000,
    actions: [
      { set: { id: 'clientA', state: 'active' } },
      { set: { id: 'clientB', state: 'active' } },
      { glow: 'instance' },
      { do: 'pulse', node: 'instance' },
    ] },
];

const _ANIM_CLASSES = [
  'viz-anim--creation', 'viz-anim--reuse',  'viz-anim--pulse',
  'viz-anim--reveal',   'viz-anim--highlight', 'viz-anim--focus',
  'viz-anim--wrap',     'viz-anim--expansion', 'viz-anim--collapse',
  'viz-anim--swap-out', 'viz-anim--swap-in',   'viz-anim--transition',
];

const _FACTORY_METHOD_STEPS = [
  { id: 'scene',         duration: 500,
    actions: [{ set: { id: 'product', state: 'dim' } }] },

  { id: 'request',       duration: 1400,
    actions: [
      { glow: 'client' },
      { do: 'request', index: 0 },
    ] },

  { id: 'factory-invoke', duration: 600,
    actions: [
      { set: { id: 'client', state: 'dim' } },
      { glow: 'creator' },
      { do: 'highlight', node: 'creator' },
    ] },

  { id: 'creation',      duration: 1800,
    actions: [
      { set: { id: 'product', state: 'active' } },
      { glow: 'product' },
      { do: 'request',  index: 1 },
      { do: 'creation', node: 'product' },
    ] },

  { id: 'return',        duration: 1400,
    actions: [
      { set: { id: 'client', state: 'active' } },
      { do: 'response', index: 0 },
    ] },

  { id: 'final',         duration: 3200,
    actions: [
      { set: { id: 'client',  state: 'active' } },
      { set: { id: 'creator', state: 'active' } },
      { set: { id: 'product', state: 'active' } },
      { glow: 'product' },
      { do: 'pulse', node: 'product' },
    ] },
];

const _ABSTRACT_FACTORY_STEPS = [
  { id: 'scene',           duration: 400,
    actions: [
      { set: { id: 'button',   state: 'dim' } },
      { set: { id: 'checkbox', state: 'dim' } },
    ] },

  { id: 'request',         duration: 1400,
    actions: [
      { glow: 'client' },
      { do: 'request', index: 0 },
    ] },

  { id: 'factory-select',  duration: 600,
    actions: [
      { set: { id: 'client',  state: 'dim'    } },
      { set: { id: 'factory', state: 'active' } },
      { glow: 'factory' },
      { do: 'highlight', node: 'factory' },
    ] },

  { id: 'create-button',   duration: 1600,
    actions: [
      { set: { id: 'button', state: 'active' } },
      { glow: 'button' },
      { do: 'request',  index: 1 },
      { do: 'creation', node: 'button' },
    ] },

  { id: 'create-checkbox', duration: 1600,
    actions: [
      { set: { id: 'checkbox', state: 'active' } },
      { glow: 'checkbox' },
      { do: 'request',  index: 2 },
      { do: 'creation', node: 'checkbox' },
    ] },

  { id: 'family',          duration: 1400,
    actions: [
      { highlight: 'button'   },
      { highlight: 'checkbox' },
      { do: 'reveal', node: 'button'   },
      { do: 'focus',  node: 'checkbox' },
    ] },

  { id: 'final',            duration: 2000,
    actions: [
      { set: { id: 'client',   state: 'active' } },
      { set: { id: 'factory',  state: 'active' } },
      { set: { id: 'button',   state: 'active' } },
      { set: { id: 'checkbox', state: 'active' } },
      { glow: 'factory' },
      { do: 'pulse', node: 'factory' },
    ] },
];

const _BUILDER_STEPS = [
  { id: 'scene',          duration: 500,
    actions: [
      { set: { id: 'partA',    state: 'dim' } },
      { set: { id: 'partB',    state: 'dim' } },
      { set: { id: 'partC',    state: 'dim' } },
      { set: { id: 'product',  state: 'dim' } },
      { set: { id: 'director', state: 'dim' } },
    ] },

  { id: 'request',        duration: 1400,
    actions: [
      { glow: 'client' },
      { do: 'request', index: 0 },
    ] },

  { id: 'builder-active', duration: 600,
    actions: [
      { set: { id: 'client',  state: 'dim'    } },
      { set: { id: 'builder', state: 'active' } },
      { glow: 'builder' },
      { do: 'highlight', node: 'builder' },
    ] },

  { id: 'build-a',        duration: 1600,
    actions: [
      { set: { id: 'partA', state: 'active' } },
      { glow: 'partA' },
      { do: 'request',  index: 1 },
      { do: 'creation', node: 'partA' },
    ] },

  { id: 'build-b',        duration: 1600,
    actions: [
      { set: { id: 'partB', state: 'active' } },
      { glow: 'partB' },
      { do: 'request',  index: 2 },
      { do: 'creation', node: 'partB' },
    ] },

  { id: 'build-c',        duration: 1600,
    actions: [
      { set: { id: 'partC', state: 'active' } },
      { glow: 'partC' },
      { do: 'request',  index: 3 },
      { do: 'creation', node: 'partC' },
    ] },

  { id: 'assemble',       duration: 1800,
    actions: [
      { set: { id: 'product', state: 'active' } },
      { glow: 'product' },
      { do: 'request',  index: 4 },
      { do: 'creation', node: 'product' },
    ] },

  { id: 'final',          duration: 3000,
    actions: [
      { set: { id: 'client',  state: 'active' } },
      { set: { id: 'builder', state: 'active' } },
      { set: { id: 'partA',   state: 'active' } },
      { set: { id: 'partB',   state: 'active' } },
      { set: { id: 'partC',   state: 'active' } },
      { set: { id: 'product', state: 'active' } },
      { glow: 'product' },
      { do: 'pulse', node: 'product' },
    ] },
];

const _PROTOTYPE_STEPS = [
  { id: 'scene',         duration: 500,
    actions: [{ set: { id: 'clone', state: 'dim' } }] },

  { id: 'request',       duration: 1400,
    actions: [
      { glow: 'client' },
      { do: 'request', index: 0 },
    ] },

  { id: 'clone-invoke',  duration: 600,
    actions: [
      { set: { id: 'client',   state: 'dim'    } },
      { set: { id: 'original', state: 'active' } },
      { glow: 'original' },
      { do: 'highlight', node: 'original' },
    ] },

  { id: 'creation',      duration: 1800,
    actions: [
      { set: { id: 'clone', state: 'active' } },
      { glow: 'clone' },
      { do: 'request',  index: 1 },
      { do: 'creation', node: 'clone' },
    ] },

  { id: 'independence',  duration: 1400,
    actions: [
      { set: { id: 'client', state: 'active' } },
      { do: 'reveal', node: 'original' },
      { do: 'focus',  node: 'clone'    },
    ] },

  { id: 'final',         duration: 3000,
    actions: [
      { set: { id: 'client',   state: 'active' } },
      { set: { id: 'original', state: 'active' } },
      { set: { id: 'clone',    state: 'active' } },
      { glow: 'clone' },
      { do: 'pulse', node: 'clone' },
    ] },
];

const _ADAPTER_STEPS = [
  { id: 'scene',           duration: 500,
    actions: [
      { set: { id: 'legacy',  state: 'dim' } },
      { set: { id: 'modern',  state: 'dim' } },
    ] },

  { id: 'request',         duration: 1400,
    actions: [
      { glow: 'client' },
      { do: 'request', index: 0 },
    ] },

  { id: 'adapter-active',  duration: 800,
    actions: [
      { set: { id: 'client',  state: 'dim'    } },
      { set: { id: 'adapter', state: 'active' } },
      { glow: 'adapter' },
      { do: 'highlight', node: 'adapter' },
    ] },

  { id: 'legacy-call',     duration: 1600,
    actions: [
      { set: { id: 'legacy', state: 'active' } },
      { glow: 'legacy' },
      { do: 'request', index: 1 },
      { do: 'reveal',  node: 'legacy' },
    ] },

  { id: 'adapt',           duration: 1600,
    actions: [
      { set: { id: 'modern', state: 'active' } },
      { glow: 'modern' },
      { do: 'request',  index: 2 },
      { do: 'creation', node: 'modern' },
    ] },

  { id: 'connected',       duration: 1200,
    actions: [
      { highlight: 'legacy' },
      { highlight: 'modern' },
      { do: 'focus', node: 'modern' },
    ] },

  { id: 'response',        duration: 1400,
    actions: [
      { set: { id: 'client', state: 'active' } },
      { do: 'response', index: 0 },
    ] },

  { id: 'final',           duration: 3200,
    actions: [
      { set: { id: 'client',  state: 'active' } },
      { set: { id: 'legacy',  state: 'active' } },
      { set: { id: 'adapter', state: 'active' } },
      { set: { id: 'modern',  state: 'active' } },
      { glow: 'adapter' },
      { do: 'pulse', node: 'adapter' },
    ] },
];

const _BRIDGE_STEPS = [
  { id: 'scene',         duration: 400,
    actions: [
      { set: { id: 'refined',   state: 'dim' } },
      { set: { id: 'impl',      state: 'dim' } },
      { set: { id: 'concreteA', state: 'dim' } },
      { set: { id: 'concreteB', state: 'dim' } },
    ] },

  { id: 'bridge-fire',   duration: 1200,
    actions: [
      { glow: 'abstraction' },
      { do: 'request', index: 1 },
    ] },

  { id: 'impl-active',   duration: 700,
    actions: [
      { set: { id: 'abstraction', state: 'dim'    } },
      { set: { id: 'impl',        state: 'active' } },
      { glow: 'impl' },
      { do: 'highlight', node: 'impl' },
    ] },

  { id: 'create-tv',     duration: 1400,
    actions: [
      { set: { id: 'concreteA', state: 'active' } },
      { glow: 'concreteA' },
      { do: 'request',  index: 2 },
      { do: 'creation', node: 'concreteA' },
    ] },

  { id: 'swap-signal',   duration: 700,
    actions: [
      { set: { id: 'concreteA', state: 'dim' } },
      { glow: 'impl' },
    ] },

  { id: 'create-radio',  duration: 1400,
    actions: [
      { set: { id: 'concreteB', state: 'active' } },
      { glow: 'concreteB' },
      { do: 'request',  index: 3 },
      { do: 'creation', node: 'concreteB' },
    ] },

  { id: 'show-refined',  duration: 1200,
    actions: [
      { set: { id: 'abstraction', state: 'active' } },
      { set: { id: 'refined',     state: 'active' } },
      { glow: 'refined' },
      { do: 'request',  index: 0 },
      { do: 'creation', node: 'refined' },
    ] },

  { id: 'final',         duration: 3000,
    actions: [
      { set: { id: 'abstraction', state: 'active' } },
      { set: { id: 'impl',        state: 'active' } },
      { set: { id: 'concreteA',   state: 'active' } },
      { set: { id: 'concreteB',   state: 'active' } },
      { set: { id: 'refined',     state: 'active' } },
      { glow: 'abstraction' },
      { do: 'pulse', node: 'abstraction' },
    ] },
];

const _COMPOSITE_STEPS = [
  { id: 'scene',          duration: 400,
    actions: [
      { set: { id: 'composite', state: 'dim' } },
      { set: { id: 'leafA',     state: 'dim' } },
      { set: { id: 'leafB',     state: 'dim' } },
      { set: { id: 'leafC',     state: 'dim' } },
    ] },

  { id: 'request',         duration: 1400,
    actions: [
      { glow: 'client' },
      { do: 'request', index: 0 },
    ] },

  { id: 'route-composite', duration: 800,
    actions: [
      { set: { id: 'client',    state: 'dim'    } },
      { set: { id: 'composite', state: 'active' } },
      { glow: 'component' },
      { do: 'request',   index: 1       },
      { do: 'highlight', node: 'composite' },
    ] },

  { id: 'delegate-a',      duration: 1200,
    actions: [
      { set: { id: 'leafA', state: 'active' } },
      { glow: 'leafA' },
      { do: 'request',  index: 2      },
      { do: 'creation', node: 'leafA' },
    ] },

  { id: 'delegate-b',      duration: 1000,
    actions: [
      { set: { id: 'leafB', state: 'active' } },
      { glow: 'leafB' },
      { do: 'request',  index: 3      },
      { do: 'creation', node: 'leafB' },
    ] },

  { id: 'delegate-c',      duration: 1000,
    actions: [
      { set: { id: 'leafC', state: 'active' } },
      { glow: 'leafC' },
      { do: 'request',  index: 4      },
      { do: 'creation', node: 'leafC' },
    ] },

  { id: 'reveal',          duration: 600,
    actions: [
      { do: 'reveal', node: 'leafA' },
      { do: 'focus',  node: 'leafB' },
      { do: 'reveal', node: 'leafC' },
    ] },

  { id: 'final',           duration: 2800,
    actions: [
      { set: { id: 'client',    state: 'active' } },
      { set: { id: 'component', state: 'active' } },
      { set: { id: 'composite', state: 'active' } },
      { set: { id: 'leafA',     state: 'active' } },
      { set: { id: 'leafB',     state: 'active' } },
      { set: { id: 'leafC',     state: 'active' } },
      { glow: 'component' },
      { do: 'pulse', node: 'component' },
    ] },
];

const _DECORATOR_STEPS = [
  { id: 'scene',          duration: 400,
    actions: [
      { set: { id: 'slackDec',      state: 'dim' } },
      { set: { id: 'smsDec',        state: 'dim' } },
      { set: { id: 'emailNotifier', state: 'dim' } },
    ] },

  { id: 'enter-slack',    duration: 1500,
    actions: [
      { glow: 'client' },
      { do: 'request', index: 0 },
      { set: { id: 'slackDec', state: 'active' } },
      { glow: 'slackDec' },
      { do: 'wrap',      node: 'slackDec' },
    ] },

  { id: 'slack-holds',    duration: 1100,
    actions: [
      { set: { id: 'client',   state: 'dim'    } },
      { set: { id: 'slackDec', state: 'active' } },
      { glow: 'slackDec' },
    ] },

  { id: 'enter-sms',      duration: 1500,
    actions: [
      { set: { id: 'slackDec', state: 'active' } },
      { glow: 'slackDec' },
      { do: 'request', index: 1 },
      { set: { id: 'smsDec', state: 'active' } },
      { glow: 'smsDec' },
      { do: 'wrap',      node: 'smsDec' },
    ] },

  { id: 'sms-holds',      duration: 1000,
    actions: [
      { set: { id: 'smsDec', state: 'active' } },
      { glow: 'smsDec' },
    ] },

  { id: 'reach-core',     duration: 1600,
    actions: [
      { set: { id: 'smsDec', state: 'active' } },
      { do: 'request', index: 2 },
      { set: { id: 'emailNotifier', state: 'active' } },
      { glow: 'emailNotifier' },
      { do: 'focus',     node: 'emailNotifier' },
      { do: 'highlight', node: 'emailNotifier' },
    ] },

  { id: 'core-fires',     duration: 1300,
    actions: [
      { set: { id: 'emailNotifier', state: 'active' } },
      { glow: 'emailNotifier' },
      { do: 'focus',     node: 'emailNotifier' },
      { do: 'highlight', node: 'emailNotifier' },
    ] },

  { id: 'sms-fires',      duration: 1100,
    actions: [
      { set: { id: 'emailNotifier', state: 'active' } },
      { set: { id: 'smsDec',        state: 'active' } },
      { glow: 'smsDec' },
      { do: 'highlight', node: 'smsDec' },
    ] },

  { id: 'slack-fires',    duration: 1100,
    actions: [
      { set: { id: 'smsDec',   state: 'active' } },
      { set: { id: 'slackDec', state: 'active' } },
      { glow: 'slackDec' },
      { do: 'highlight', node: 'slackDec' },
    ] },

  { id: 'final',          duration: 3200,
    actions: [
      { set: { id: 'client',        state: 'active' } },
      { set: { id: 'slackDec',      state: 'active' } },
      { set: { id: 'smsDec',        state: 'active' } },
      { set: { id: 'emailNotifier', state: 'active' } },
      { glow: 'slackDec' },
      { do: 'pulse', node: 'slackDec' },
    ] },
];

const _CHAIN_STEPS = [
  { id: 'scene',            duration: 500,
    actions: [
      { set: { id: 'teamLead', state: 'idle' } },
      { set: { id: 'manager',  state: 'idle' } },
      { set: { id: 'director', state: 'idle' } },
      { set: { id: 'ceo',      state: 'idle' } },
    ] },

  { id: 'submit',           duration: 1400,
    actions: [
      { do: 'request', index: 0 },
      { do: 'highlight', node: 'teamLead' },
      { set: { id: 'teamLead', state: 'active' } },
    ] },

  { id: 'pass-to-manager',  duration: 1400,
    actions: [
      { set: { id: 'client',   state: 'dim'    } },
      { set: { id: 'teamLead', state: 'passed' } },
      { do: 'request', index: 1 },
      { do: 'highlight', node: 'manager' },
      { set: { id: 'manager', state: 'active' } },
    ] },

  { id: 'pass-to-director', duration: 1400,
    actions: [
      { set: { id: 'manager', state: 'passed' } },
      { do: 'request', index: 2 },
      { do: 'highlight', node: 'director' },
      { set: { id: 'director', state: 'active' } },
    ] },

  { id: 'handle-and-stop',  duration: 1800,
    actions: [
      { set: { id: 'director', state: 'active' } },
      { glow: 'director' },
      { do: 'highlight', node: 'director' },
      { set: { id: 'ceo', state: 'dim' } },
    ] },

  { id: 'final',            duration: 3200,
    actions: [
      { set: { id: 'client',   state: 'active' } },
      { set: { id: 'teamLead', state: 'passed' } },
      { set: { id: 'manager',  state: 'passed' } },
      { set: { id: 'director', state: 'active' } },
      { set: { id: 'ceo',      state: 'dim'    } },
      { glow: 'director' },
      { do: 'pulse', node: 'director' },
    ] },
];

const _COMMAND_STEPS = [
  { id: 'scene',       duration: 400,
    actions: [
      { set: { id: 'command',  state: 'dim' } },
      { set: { id: 'receiver', state: 'dim' } },
    ] },
  { id: 'setup',       duration: 1400,
    actions: [
      { glow: 'client' },
      { do: 'request', index: 0 },
    ] },
  { id: 'execute',     duration: 1600,
    actions: [
      { set: { id: 'client',  state: 'dim'    } },
      { set: { id: 'invoker', state: 'active' } },
      { set: { id: 'command', state: 'active' } },
      { glow: 'invoker' },
      { glow: 'command' },
      { do: 'request',  index: 1 },
      { do: 'creation', node: 'command' },
    ] },
  { id: 'run',         duration: 1400,
    actions: [
      { set: { id: 'receiver', state: 'active' } },
      { glow: 'receiver' },
      { do: 'request',  index: 2 },
      { do: 'creation', node: 'receiver' },
    ] },
  { id: 'undo',        duration: 1600,
    actions: [
      { glow: 'invoker' },
      { do: 'request', index: 1 },
      { do: 'reuse',   node: 'command' },
      { do: 'reuse',   node: 'receiver' },
    ] },
  { id: 'final',       duration: 3200,
    actions: [
      { set: { id: 'client',   state: 'active' } },
      { set: { id: 'invoker',  state: 'active' } },
      { set: { id: 'command',  state: 'active' } },
      { set: { id: 'receiver', state: 'active' } },
      { glow: 'receiver' },
      { do: 'pulse', node: 'receiver' },
    ] },
];

const _INTERPRETER_STEPS = [
  { id: 'scene',    duration: 400,
    actions: [
      { set: { id: 'root',  state: 'dim' } },
      { set: { id: 'sum',   state: 'dim' } },
      { set: { id: 'two',   state: 'dim' } },
      { set: { id: 'varX',  state: 'dim' } },
      { set: { id: 'five',  state: 'dim' } },
    ] },
  { id: 'submit',   duration: 1400,
    actions: [
      { glow: 'client' },
      { do: 'request', index: 0 },
      { set: { id: 'root', state: 'active' } },
      { do: 'creation', node: 'root' },
    ] },
  { id: 'delegate', duration: 1500,
    actions: [
      { set: { id: 'client', state: 'dim' } },
      { glow: 'root' },
      { do: 'request', index: 1 },
      { do: 'request', index: 2 },
      { set: { id: 'sum', state: 'active' } },
      { do: 'creation', node: 'sum' },
      { set: { id: 'two', state: 'active' } },
      { do: 'creation', node: 'two' },
    ] },
  { id: 'leaf-return', duration: 1400,
    actions: [
      { do: 'response', index: 2 },
      { glow: 'sum' },
      { do: 'request', index: 3 },
      { do: 'request', index: 4 },
      { set: { id: 'varX', state: 'active' } },
      { do: 'creation', node: 'varX' },
      { set: { id: 'five', state: 'active' } },
      { do: 'creation', node: 'five' },
    ] },
  { id: 'branch-return', duration: 1400,
    actions: [
      { do: 'response', index: 3 },
      { do: 'response', index: 4 },
      { do: 'highlight', node: 'sum' },
    ] },
  { id: 'combine',  duration: 1300,
    actions: [
      { do: 'response', index: 1 },
      { do: 'highlight', node: 'root' },
    ] },
  { id: 'return',   duration: 1400,
    actions: [
      { do: 'response', index: 0 },
      { set: { id: 'client', state: 'active' } },
      { do: 'highlight', node: 'client' },
      { do: 'creation', node: 'result' },
    ] },
  { id: 'final',    duration: 3200,
    actions: [
      { set: { id: 'client', state: 'active' } },
      { set: { id: 'root',   state: 'active' } },
      { set: { id: 'sum',    state: 'active' } },
      { set: { id: 'two',    state: 'active' } },
      { set: { id: 'varX',   state: 'active' } },
      { set: { id: 'five',   state: 'active' } },
      { glow: 'root' },
      { do: 'pulse', node: 'root' },
    ] },
];

const _ITERATOR_STEPS = [
  { id: 'scene',    duration: 400,
    actions: [
      { set: { id: 'iterator', state: 'dim' } },
      { set: { id: 'elem0',    state: 'dim' } },
      { set: { id: 'elem1',    state: 'dim' } },
      { set: { id: 'elem2',    state: 'dim' } },
      { set: { id: 'elem3',    state: 'dim' } },
    ] },
  { id: 'ask-0',    duration: 1200,
    actions: [
      { glow: 'client' },
      { set: { id: 'iterator', state: 'active' } },
      { do: 'request',  index: 0 },
      { do: 'creation', node: 'iterator' },
    ] },
  { id: 'read-0',   duration: 1200,
    actions: [
      { set: { id: 'client', state: 'dim' } },
      { glow: 'iterator' },
      { do: 'request',   index: 1 },
      { do: 'highlight', node: 'elem0' },
      { set: { id: 'elem0', state: 'active' } },
    ] },
  { id: 'ask-1',    duration: 1000,
    actions: [
      { set: { id: 'elem0', state: 'passed' } },
      { set: { id: 'client', state: 'active' } },
      { glow: 'client' },
      { do: 'request', index: 0 },
      { do: 'reuse',   node: 'iterator' },
    ] },
  { id: 'read-1',   duration: 1000,
    actions: [
      { set: { id: 'client', state: 'dim' } },
      { glow: 'iterator' },
      { do: 'request',   index: 2 },
      { do: 'highlight', node: 'elem1' },
      { set: { id: 'elem1', state: 'active' } },
    ] },
  { id: 'ask-2',    duration: 1000,
    actions: [
      { set: { id: 'elem1', state: 'passed' } },
      { set: { id: 'client', state: 'active' } },
      { glow: 'client' },
      { do: 'request', index: 0 },
      { do: 'reuse',   node: 'iterator' },
    ] },
  { id: 'read-2',   duration: 1000,
    actions: [
      { set: { id: 'client', state: 'dim' } },
      { glow: 'iterator' },
      { do: 'request',   index: 3 },
      { do: 'highlight', node: 'elem2' },
      { set: { id: 'elem2', state: 'active' } },
    ] },
  { id: 'ask-3',    duration: 1000,
    actions: [
      { set: { id: 'elem2', state: 'passed' } },
      { set: { id: 'client', state: 'active' } },
      { glow: 'client' },
      { do: 'request', index: 0 },
      { do: 'reuse',   node: 'iterator' },
    ] },
  { id: 'read-3',   duration: 1000,
    actions: [
      { set: { id: 'client', state: 'dim' } },
      { glow: 'iterator' },
      { do: 'request',   index: 4 },
      { do: 'highlight', node: 'elem3' },
      { set: { id: 'elem3', state: 'active' } },
    ] },
  { id: 'final',    duration: 3200,
    actions: [
      { set: { id: 'elem3',    state: 'passed' } },
      { set: { id: 'client',   state: 'active' } },
      { set: { id: 'iterator', state: 'active' } },
      { glow: 'iterator' },
      { do: 'pulse', node: 'iterator' },
    ] },
];

const _MEDIATOR_STEPS = [
  { id: 'scene',     duration: 400,
    actions: [
      { set: { id: 'mediator', state: 'dim' } },
      { set: { id: 'userA',    state: 'dim' } },
      { set: { id: 'userB',    state: 'dim' } },
      { set: { id: 'userC',    state: 'dim' } },
      { set: { id: 'userD',    state: 'dim' } },
    ] },
  { id: 'connect',   duration: 1000,
    actions: [
      { set: { id: 'userA', state: 'active' } },
      { set: { id: 'userB', state: 'active' } },
      { set: { id: 'userC', state: 'active' } },
      { set: { id: 'userD', state: 'active' } },
      { do: 'creation', node: 'userA' },
      { do: 'creation', node: 'userB' },
      { do: 'creation', node: 'userC' },
      { do: 'creation', node: 'userD' },
    ] },
  { id: 'alice-sends', duration: 1400,
    actions: [
      { glow: 'userA' },
      { set: { id: 'mediator', state: 'active' } },
      { do: 'request', index: 0 },
    ] },
  { id: 'route',       duration: 2000,
    actions: [
      { glow: 'mediator' },
      { do: 'highlight', node: 'mediator' },
      { do: 'creation',  node: 'mediator' },
      { do: 'request',   index: 1 },
      { do: 'request',   index: 2 },
      { do: 'request',   index: 3 },
      { do: 'highlight', node: 'userB' },
      { do: 'highlight', node: 'userC' },
      { do: 'highlight', node: 'userD' },
      { glow: 'userB' },
      { glow: 'userC' },
      { glow: 'userD' },
    ] },
  { id: 'final',       duration: 3200,
    actions: [
      { set: { id: 'mediator', state: 'active' } },
      { set: { id: 'userA',    state: 'active' } },
      { set: { id: 'userB',    state: 'active' } },
      { set: { id: 'userC',    state: 'active' } },
      { set: { id: 'userD',    state: 'active' } },
      { glow: 'mediator' },
      { do: 'pulse', node: 'mediator' },
    ] },
];

const _MEMENTO_STEPS = [
  { id: 'scene',     duration: 400,
    actions: [
      { set: { id: 'memento',   state: 'dim' } },
      { set: { id: 'caretaker', state: 'dim' } },
    ] },
  { id: 'save-1',    duration: 1400,
    actions: [
      { glow: 'originator' },
      { set: { id: 'memento', state: 'active' } },
      { do: 'request',  index: 0 },
      { do: 'creation', node: 'memento' },
    ] },
  { id: 'push-1',    duration: 1200,
    actions: [
      { set: { id: 'caretaker', state: 'active' } },
      { glow: 'memento' },
      { do: 'request',  index: 1 },
      { do: 'creation', node: 'caretaker' },
    ] },
  { id: 'save-2',    duration: 1400,
    actions: [
      { glow: 'originator' },
      { do: 'request', index: 0 },
      { do: 'reuse',   node: 'memento' },
    ] },
  { id: 'push-2',    duration: 1000,
    actions: [
      { glow: 'memento' },
      { do: 'request', index: 1 },
      { do: 'reuse',   node: 'caretaker' },
    ] },
  { id: 'undo',      duration: 1600,
    actions: [
      { glow: 'caretaker' },
      { do: 'request', index: 2 },
      { do: 'reuse',   node: 'originator' },
    ] },
  { id: 'final',     duration: 3200,
    actions: [
      { set: { id: 'originator', state: 'active' } },
      { set: { id: 'memento',    state: 'active' } },
      { set: { id: 'caretaker',  state: 'active' } },
      { glow: 'memento' },
      { do: 'pulse', node: 'memento' },
    ] },
];

const _OBSERVER_STEPS = [
  { id: 'scene',      duration: 400,
    actions: [
      { set: { id: 'subA', state: 'dim' } },
      { set: { id: 'subB', state: 'dim' } },
      { set: { id: 'subC', state: 'dim' } },
    ] },
  { id: 'change-1',   duration: 800,
    actions: [
      { glow: 'publisher' },
      { do: 'highlight', node: 'publisher' },
    ] },
  { id: 'broadcast-1', duration: 2000,
    actions: [
      { set: { id: 'subA', state: 'active' } },
      { set: { id: 'subB', state: 'active' } },
      { set: { id: 'subC', state: 'active' } },
      { do: 'request',  index: 0 },
      { do: 'request',  index: 1 },
      { do: 'request',  index: 2 },
      { do: 'creation', node: 'subA' },
      { do: 'creation', node: 'subB' },
      { do: 'creation', node: 'subC' },
      { glow: 'subA' },
      { glow: 'subB' },
      { glow: 'subC' },
    ] },
  { id: 'change-2',    duration: 800,
    actions: [
      { glow: 'publisher' },
      { do: 'highlight', node: 'publisher' },
    ] },
  { id: 'broadcast-2', duration: 1800,
    actions: [
      { do: 'request', index: 0 },
      { do: 'request', index: 1 },
      { do: 'request', index: 2 },
      { do: 'reuse',   node: 'subA' },
      { do: 'reuse',   node: 'subB' },
      { do: 'reuse',   node: 'subC' },
    ] },
  { id: 'final',       duration: 3200,
    actions: [
      { set: { id: 'publisher', state: 'active' } },
      { set: { id: 'subA',      state: 'active' } },
      { set: { id: 'subB',      state: 'active' } },
      { set: { id: 'subC',      state: 'active' } },
      { glow: 'publisher' },
      { glow: 'subA' },
      { glow: 'subB' },
      { glow: 'subC' },
      { do: 'pulse', node: 'publisher' },
    ] },
];

const _STATE_STEPS = [
  { id: 'scene',      duration: 400,
    actions: [
      { set: { id: 'stateRed',    state: 'dim' } },
      { set: { id: 'stateYellow', state: 'dim' } },
      { set: { id: 'stateGreen',  state: 'dim' } },
    ] },
  { id: 'request',    duration: 1400,
    actions: [
      { glow: 'client' },
      { do: 'request', index: 0 },
    ] },
  { id: 'ctx-active', duration: 800,
    actions: [
      { set: { id: 'client',  state: 'dim'    } },
      { set: { id: 'context', state: 'active' } },
      { glow: 'context' },
      { do: 'highlight', node: 'context' },
    ] },
  { id: 'red',        duration: 1400,
    actions: [
      { set: { id: 'stateRed', state: 'active' } },
      { glow: 'stateRed' },
      { do: 'request',  index: 1 },
      { do: 'creation', node: 'stateRed' },
    ] },
  { id: 'yellow',     duration: 1200,
    actions: [
      { set: { id: 'stateRed',    state: 'dim'    } },
      { set: { id: 'stateYellow', state: 'active' } },
      { glow: 'stateYellow' },
      { do: 'request',  index: 2 },
      { do: 'creation', node: 'stateYellow' },
    ] },
  { id: 'green',      duration: 1200,
    actions: [
      { set: { id: 'stateYellow', state: 'dim'    } },
      { set: { id: 'stateGreen',  state: 'active' } },
      { glow: 'stateGreen' },
      { do: 'request',  index: 3 },
      { do: 'creation', node: 'stateGreen' },
    ] },
  { id: 'cycle',      duration: 1400,
    actions: [
      { set: { id: 'stateGreen', state: 'dim'    } },
      { set: { id: 'stateRed',   state: 'active' } },
      { glow: 'stateRed' },
      { do: 'request',  index: 4 },
    ] },
  { id: 'final',      duration: 3200,
    actions: [
      { set: { id: 'client',      state: 'active' } },
      { set: { id: 'context',     state: 'active' } },
      { set: { id: 'stateRed',    state: 'active' } },
      { set: { id: 'stateYellow', state: 'active' } },
      { set: { id: 'stateGreen',  state: 'active' } },
      { glow: 'context' },
      { do: 'pulse', node: 'context' },
    ] },
];

const _STRATEGY_STEPS = [
  { id: 'scene',       duration: 400,
    actions: [
      { set: { id: 'strategy', state: 'dim' } },
      { set: { id: 'ground',   state: 'dim' } },
      { set: { id: 'air',      state: 'dim' } },
    ] },
  { id: 'set-ground',  duration: 1400,
    actions: [
      { glow: 'client' },
      { do: 'request', index: 0 },
    ] },
  { id: 'ctx-runs',    duration: 1000,
    actions: [
      { set: { id: 'client',   state: 'dim'    } },
      { set: { id: 'context',  state: 'active' } },
      { set: { id: 'strategy', state: 'active' } },
      { glow: 'context' },
      { do: 'request', index: 1 },
    ] },
  { id: 'use-ground',  duration: 1400,
    actions: [
      { set: { id: 'ground', state: 'active' } },
      { glow: 'strategy' },
      { glow: 'ground' },
      { do: 'request',  index: 2 },
      { do: 'creation', node: 'ground' },
    ] },
  { id: 'swap-air',    duration: 1600,
    actions: [
      { set: { id: 'client', state: 'active' } },
      { set: { id: 'ground', state: 'dim'    } },
      { set: { id: 'air',    state: 'active' } },
      { glow: 'strategy' },
      { glow: 'air' },
      { do: 'request',  index: 3 },
      { do: 'swap', node: 'air' },
    ] },
  { id: 'final',       duration: 3200,
    actions: [
      { set: { id: 'client',   state: 'active' } },
      { set: { id: 'context',  state: 'active' } },
      { set: { id: 'strategy', state: 'active' } },
      { set: { id: 'ground',   state: 'active' } },
      { set: { id: 'air',      state: 'active' } },
      { glow: 'strategy' },
      { glow: 'air' },
      { do: 'pulse', node: 'strategy' },
    ] },
];

const _TEMPLATE_METHOD_STEPS = [
  { id: 'scene',     duration: 400,
    actions: [
      { set: { id: 'concreteA', state: 'dim' } },
      { set: { id: 'concreteB', state: 'dim' } },
    ] },
  { id: 'call',      duration: 1400,
    actions: [
      { glow: 'client' },
      { do: 'request', index: 0 },
    ] },
  { id: 'skeleton',  duration: 1200,
    actions: [
      { set: { id: 'client',   state: 'dim'    } },
      { set: { id: 'abstract', state: 'active' } },
      { glow: 'abstract' },
      { do: 'highlight', node: 'abstract' },
      { do: 'creation',  node: 'abstract' },
    ] },
  { id: 'use-csv',   duration: 1400,
    actions: [
      { set: { id: 'concreteA', state: 'active' } },
      { do: 'request',  index: 1 },
      { do: 'creation', node: 'concreteA' },
    ] },
  { id: 'swap-xml',  duration: 1600,
    actions: [
      { set: { id: 'concreteA', state: 'dim'    } },
      { set: { id: 'concreteB', state: 'active' } },
      { glow: 'abstract' },
      { do: 'request',  index: 2 },
      { do: 'swap', node: 'concreteB' },
    ] },
  { id: 'final',     duration: 3200,
    actions: [
      { set: { id: 'client',    state: 'active' } },
      { set: { id: 'abstract',  state: 'active' } },
      { set: { id: 'concreteA', state: 'active' } },
      { set: { id: 'concreteB', state: 'active' } },
      { glow: 'abstract' },
      { do: 'pulse', node: 'abstract' },
    ] },
];

const _VISITOR_STEPS = [
  { id: 'scene',           duration: 400,
    actions: [
      { set: { id: 'visitor', state: 'dim' } },
      { set: { id: 'circle',  state: 'dim' } },
      { set: { id: 'rect',    state: 'dim' } },
    ] },

  { id: 'accept-circle',   duration: 1400,
    actions: [
      { glow: 'client' },
      { set: { id: 'circle', state: 'active' } },
      { do: 'request',  index: 0 },
      { do: 'creation', node: 'circle' },
    ] },

  { id: 'dispatch-circle', duration: 1400,
    actions: [
      { set: { id: 'client',  state: 'dim'    } },
      { set: { id: 'visitor', state: 'active' } },
      { glow: 'circle' },
      { do: 'request',  index: 2 },
      { do: 'creation', node: 'visitor' },
    ] },

  { id: 'accept-rect',     duration: 1400,
    actions: [
      { set: { id: 'client', state: 'active' } },
      { set: { id: 'rect',   state: 'active' } },
      { glow: 'client' },
      { do: 'request',  index: 1 },
      { do: 'creation', node: 'rect' },
    ] },

  { id: 'dispatch-rect',   duration: 1400,
    actions: [
      { set: { id: 'client', state: 'dim' } },
      { glow: 'rect' },
      { do: 'request', index: 3 },
      { do: 'reuse',   node: 'visitor' },
    ] },

  { id: 'final',           duration: 3200,
    actions: [
      { set: { id: 'client',  state: 'active' } },
      { set: { id: 'visitor', state: 'active' } },
      { set: { id: 'circle',  state: 'active' } },
      { set: { id: 'rect',    state: 'active' } },
      { glow: 'visitor' },
      { do: 'pulse', node: 'visitor' },
    ] },
];

const _FLYWEIGHT_STEPS = [
  { id: 'scene',         duration: 400,
    actions: [
      { set: { id: 'factory', state: 'dim' } },
      { set: { id: 'oakFW',   state: 'dim' } },
      { set: { id: 'pineFW',  state: 'dim' } },
    ] },

  { id: 'request-oak',   duration: 1400,
    actions: [
      { glow: 'client' },
      { do: 'request', index: 0 },
    ] },

  { id: 'create-oak',    duration: 1600,
    actions: [
      { set: { id: 'client',  state: 'dim'    } },
      { set: { id: 'factory', state: 'active' } },
      { set: { id: 'oakFW',   state: 'active' } },
      { glow: 'factory' },
      { do: 'highlight', node: 'factory' },
      { do: 'request',   index: 1 },
      { do: 'creation',  node: 'oakFW' },
    ] },

  { id: 'request-oak-2', duration: 1400,
    actions: [
      { set: { id: 'client', state: 'active' } },
      { glow: 'client' },
      { do: 'request', index: 0 },
    ] },

  { id: 'reuse-oak',     duration: 1800,
    actions: [
      { set: { id: 'client', state: 'dim' } },
      { glow: 'factory' },
      { do: 'request', index: 1 },
      { do: 'reuse',   node: 'oakFW' },
    ] },

  { id: 'request-pine',  duration: 1400,
    actions: [
      { set: { id: 'client', state: 'active' } },
      { glow: 'client' },
      { do: 'request', index: 0 },
    ] },

  { id: 'create-pine',   duration: 1600,
    actions: [
      { set: { id: 'client',  state: 'dim'    } },
      { set: { id: 'pineFW',  state: 'active' } },
      { glow: 'factory' },
      { do: 'request',  index: 2 },
      { do: 'creation', node: 'pineFW' },
    ] },

  { id: 'final',         duration: 3200,
    actions: [
      { set: { id: 'client',  state: 'active' } },
      { set: { id: 'factory', state: 'active' } },
      { set: { id: 'oakFW',   state: 'active' } },
      { set: { id: 'pineFW',  state: 'active' } },
      { glow: 'factory' },
      { do: 'pulse', node: 'factory' },
    ] },
];

const _PROXY_STEPS = [
  { id: 'scene',        duration: 400,
    actions: [
      { set: { id: 'proxy',   state: 'dim' } },
      { set: { id: 'service', state: 'dim' } },
    ] },

  { id: 'request-1',   duration: 1400,
    actions: [
      { glow: 'client' },
      { do: 'request', index: 0 },
    ] },

  { id: 'proxy-miss',  duration: 1000,
    actions: [
      { set: { id: 'client', state: 'dim'    } },
      { set: { id: 'proxy',  state: 'active' } },
      { glow: 'proxy' },
      { do: 'highlight', node: 'proxy' },
    ] },

  { id: 'delegate',    duration: 1600,
    actions: [
      { set: { id: 'service', state: 'active' } },
      { glow: 'service' },
      { do: 'request',  index: 1 },
      { do: 'creation', node: 'service' },
    ] },

  { id: 'cache-store', duration: 1000,
    actions: [
      { set: { id: 'service', state: 'dim' } },
      { glow: 'proxy' },
      { do: 'highlight', node: 'proxy' },
      { do: 'focus',     node: 'proxy' },
    ] },

  { id: 'request-2',  duration: 1400,
    actions: [
      { set: { id: 'client', state: 'active' } },
      { glow: 'client' },
      { do: 'request', index: 0 },
    ] },

  { id: 'cache-hit',  duration: 2000,
    actions: [
      { set: { id: 'client', state: 'dim'    } },
      { set: { id: 'proxy',  state: 'active' } },
      { glow: 'proxy' },
      { do: 'reuse', node: 'proxy' },
    ] },

  { id: 'final',      duration: 3200,
    actions: [
      { set: { id: 'client',  state: 'active' } },
      { set: { id: 'proxy',   state: 'active' } },
      { set: { id: 'service', state: 'active' } },
      { glow: 'proxy' },
      { do: 'pulse', node: 'proxy' },
    ] },
];

const _FACADE_STEPS = [
  { id: 'scene',         duration: 400,
    actions: [
      { set: { id: 'facade',    state: 'dim' } },
      { set: { id: 'amplifier', state: 'dim' } },
      { set: { id: 'projector', state: 'dim' } },
      { set: { id: 'dvdPlayer', state: 'dim' } },
      { set: { id: 'lights',    state: 'dim' } },
    ] },

  { id: 'client-action', duration: 800,
    actions: [
      { glow: 'client' },
      { do: 'highlight', node: 'client' },
    ] },

  { id: 'request',       duration: 1600,
    actions: [
      { do: 'request', index: 0 },
      { set: { id: 'facade', state: 'active' } },
      { glow: 'facade' },
      { do: 'creation', node: 'facade' },
    ] },

  { id: 'facade-holds',  duration: 900,
    actions: [
      { set: { id: 'client', state: 'dim'    } },
      { set: { id: 'facade', state: 'active' } },
      { glow: 'facade' },
      { do: 'highlight', node: 'facade' },
    ] },

  { id: 'coord-amp',     duration: 1000,
    actions: [
      { glow: 'facade' },
      { do: 'request', index: 1 },
      { set: { id: 'amplifier', state: 'active' } },
      { do: 'creation', node: 'amplifier' },
    ] },

  { id: 'coord-proj',    duration: 1000,
    actions: [
      { glow: 'facade' },
      { do: 'request', index: 2 },
      { set: { id: 'projector', state: 'active' } },
      { do: 'creation', node: 'projector' },
    ] },

  { id: 'coord-dvd',     duration: 1000,
    actions: [
      { glow: 'facade' },
      { do: 'request', index: 3 },
      { set: { id: 'dvdPlayer', state: 'active' } },
      { do: 'creation', node: 'dvdPlayer' },
    ] },

  { id: 'coord-lights',  duration: 1000,
    actions: [
      { glow: 'facade' },
      { do: 'request', index: 4 },
      { set: { id: 'lights', state: 'active' } },
      { do: 'creation', node: 'lights' },
    ] },

  { id: 'final',         duration: 3600,
    actions: [
      { set: { id: 'client',    state: 'active' } },
      { set: { id: 'facade',    state: 'active' } },
      { set: { id: 'amplifier', state: 'active' } },
      { set: { id: 'projector', state: 'active' } },
      { set: { id: 'dvdPlayer', state: 'active' } },
      { set: { id: 'lights',    state: 'active' } },
      { glow: 'facade' },
      { do: 'pulse', node: 'facade' },
    ] },
];

const _mounted = new WeakMap();

const _INTERACTIVE_STEPS = {
  'singleton':               _SINGLETON_STEPS,
  'factory-method':          _FACTORY_METHOD_STEPS,
  'abstract-factory':        _ABSTRACT_FACTORY_STEPS,
  'builder':                 _BUILDER_STEPS,
  'prototype':               _PROTOTYPE_STEPS,
  'adapter':                 _ADAPTER_STEPS,
  'bridge':                  _BRIDGE_STEPS,
  'composite':               _COMPOSITE_STEPS,
  'decorator':               _DECORATOR_STEPS,
  'facade':                  _FACADE_STEPS,
  'flyweight':               _FLYWEIGHT_STEPS,
  'proxy':                   _PROXY_STEPS,
  'chain-of-responsibility': _CHAIN_STEPS,
  'command':                 _COMMAND_STEPS,
  'interpreter':             _INTERPRETER_STEPS,
  'iterator':                _ITERATOR_STEPS,
  'mediator':                _MEDIATOR_STEPS,
  'memento':                 _MEMENTO_STEPS,
  'observer':                _OBSERVER_STEPS,
  'state':                   _STATE_STEPS,
  'strategy':                _STRATEGY_STEPS,
  'template-method':         _TEMPLATE_METHOD_STEPS,
  'visitor':                 _VISITOR_STEPS,
};

export function mountInteractives(root) {
  if (!root) return;

  for (const [slug, steps] of Object.entries(_INTERACTIVE_STEPS)) {
    const el = root.querySelector(`[data-interactive-pattern="${slug}"]`);
    if (el) _mount(el, steps);
  }
}

function _totalMs(steps) {
  return steps.reduce((sum, step) => sum + (step.duration || 1400), 0);
}

function _mount(container, steps) {
  const prev = _mounted.get(container);
  if (prev) {
    prev.observer?.disconnect();
    prev.engine?.destroy();
    prev.replayBtn?.remove();
    _mounted.delete(container);
  }

  const engine = createVisualEngine(container, {
    timeline: { steps },
    autoplay: false,
    loop: false,
    keyboard: true,
  });
  if (!engine) return;

  if (engine.reducedMotion) {
    _mounted.set(container, { engine, observer: null, replayBtn: null });
    return;
  }

  const replayBtn = _createReplayBtn();
  container.appendChild(replayBtn);

  function _showReplayBtn() {
    setTimeout(() => {
      if (engine.timeline?.status === 'ended') {
        replayBtn.classList.add('viz-replay--visible');
      }
    }, _totalMs(steps) + 400);
  }

  function _startPlay() {
    engine.play();
    _showReplayBtn();
  }

  replayBtn.addEventListener('click', () => {
    replayBtn.classList.remove('viz-replay--visible');
    container.querySelectorAll('[data-node-id]').forEach(el => {
      el.classList.remove(..._ANIM_CLASSES);
    });
    engine.restart();
    _startPlay();
  });

  const diagram = container.querySelector('.diagram');
  let played = false;

  const observer = diagram
    ? new IntersectionObserver(
        (entries) => {
          if (!played && entries.some(e => e.isIntersecting)) {
            played = true;
            observer.disconnect();
            _startPlay();
          }
        },
        { threshold: 0.15 },
      )
    : null;

  if (observer) observer.observe(diagram);

  _mounted.set(container, { engine, observer, replayBtn });
}

function _createReplayBtn() {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'viz-replay';
  btn.setAttribute('aria-label', 'Replay animation');
  btn.innerHTML = `
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2.3"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M3 12a9 9 0 1 0 9-9 9.4 9.4 0 0 0-4.5 1.15"/>
      <polyline points="3 3 3 8 8 8"/>
    </svg>
    Replay`;
  return btn;
}
