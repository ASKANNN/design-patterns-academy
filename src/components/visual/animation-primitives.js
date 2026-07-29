

export const PRIMITIVES = Object.freeze({
  request:   { kind: 'packet', css: '',                  teaches: 'a call is being made' },
  response:  { kind: 'packet', css: 'viz-packet--response', teaches: 'a value is returned' },
  broadcast: { kind: 'wave',   css: '',                  teaches: 'one source notifies many listeners at once' },
  traversal: { kind: 'packet', css: '',                  teaches: 'a visitor walks the structure node by node' },

  creation:  { kind: 'node', css: 'viz-anim--creation',  teaches: 'created for the first time' },
  reuse:     { kind: 'node', css: 'viz-anim--reuse',     teaches: 'reused — still only one' },

  wrap:      { kind: 'node', css: 'viz-anim--wrap',      teaches: 'a layer wraps around the core' },
  expansion: { kind: 'node', css: 'viz-anim--expansion', teaches: 'a container opens to reveal its parts' },
  collapse:  { kind: 'node', css: 'viz-anim--collapse',  teaches: 'a container folds its parts away' },

  transition:{ kind: 'state', css: 'viz-anim--transition', teaches: 'the active state moves to a new node' },
  swap:      { kind: 'node',  css: 'viz-anim--swap-in',    teaches: 'one part replaces another in the same slot' },

  highlight: { kind: 'node', css: 'viz-anim--highlight', teaches: 'look here now' },
  pulse:     { kind: 'node', css: 'viz-anim--pulse', loop: true, teaches: 'this is the constant protagonist' },
  focus:     { kind: 'node', css: 'viz-anim--focus',     teaches: 'this element comes forward' },
  reveal:    { kind: 'node', css: 'viz-anim--reveal',    teaches: 'this actor enters the scene' },
});

export const PRIMITIVE_NAMES = Object.freeze(Object.keys(PRIMITIVES));

export function getPrimitive(name) {
  return Object.prototype.hasOwnProperty.call(PRIMITIVES, name)
    ? PRIMITIVES[name]
    : null;
}

export function isPrimitive(name) {
  return Object.prototype.hasOwnProperty.call(PRIMITIVES, name);
}
