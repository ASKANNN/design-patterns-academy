import { getPrimitive } from './animation-primitives.js';
import { Timeline } from './Timeline.js';

export function createVisualEngine(root, options = {}) {
  if (!root || typeof root.querySelector !== 'function') return null;
  const svg = root.matches?.('svg') ? root : root.querySelector('svg');
  if (!svg) return null;

  const reducedMotion =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const svgNS = 'http://www.w3.org/2000/svg';
  let overlay = null;
  let _pendingArrivals = [];
  let _onPacketCreated = null;

  const node = (id) => svg.querySelector(`[data-node-id="${cssEscape(id)}"]`);
  const focalNodes = () =>
    Array.from(svg.querySelectorAll('[data-node-id][tabindex]'));

  function getOverlay() {
    if (overlay && overlay.isConnected) return overlay;
    overlay = document.createElementNS(svgNS, 'g');
    overlay.setAttribute('class', 'viz-overlay');
    overlay.setAttribute('aria-hidden', 'true');
    svg.appendChild(overlay);
    return overlay;
  }

  function setState(id, state = 'idle') {
    const el = node(id);
    if (el) el.setAttribute('data-viz-state', state);
    return api;
  }
  function dim(id, on = true) { return setState(id, on ? 'dim' : 'idle'); }
  function highlight(id, on = true) {
    const el = node(id);
    if (el) el.setAttribute('data-viz-highlight', String(Boolean(on)));
    return api;
  }
  function glow(id, on = true) {
    const el = node(id);
    if (el) el.setAttribute('data-viz-glow', String(Boolean(on)));
    return api;
  }
  function focus(id, on = true) {
    const el = node(id);
    if (el) el.setAttribute('data-viz-focus', String(Boolean(on)));
    return api;
  }

  function _clearArrivals() {
    _pendingArrivals.forEach((id) => clearTimeout(id));
    _pendingArrivals = [];
  }

  function reset() {
    _clearArrivals();
    svg.querySelectorAll('[data-viz-state],[data-viz-highlight],[data-viz-glow],[data-viz-focus]')
      .forEach((el) => {
        el.removeAttribute('data-viz-state');
        el.removeAttribute('data-viz-highlight');
        el.removeAttribute('data-viz-glow');
        el.removeAttribute('data-viz-focus');
      });
    svg.querySelectorAll('[data-viz-active]')
      .forEach((el) => el.removeAttribute('data-viz-active'));
    if (overlay) overlay.replaceChildren();
    return api;
  }

  function run(name, spec = {}) {
    const p = getPrimitive(name);
    if (!p) return api;

    switch (p.kind) {
      case 'node':   return _runNode(p, spec, name);
      case 'packet': return _runPacket(p, spec);
      case 'wave':   return _runWave(p, spec);
      case 'state':  return _runState(p, spec);
      default:       return api;
    }
  }

  function _runNode(p, spec, name) {
    const el = node(spec.node);
    if (!el) return api;
    if (name === 'creation' || name === 'reveal') setState(spec.node, 'active');
    if (reducedMotion) return api;
    _restartAnimation(el, p.css);
    return api;
  }

  function _runPacket(p, spec) {
    const path = _resolvePath(spec);
    if (!path) return api;
    path.setAttribute('data-viz-active', 'true');
    if (reducedMotion) return api;

    const d = path.getAttribute('d');
    if (!d) return api;
    const dot = document.createElementNS(svgNS, 'circle');
    dot.setAttribute('r', String(spec.radius || 5));
    dot.setAttribute('class', `viz-packet ${p.css}${spec.loop ? ' viz-packet--loop' : ''}`.trim());
    dot.style.setProperty('--viz-path', `path('${d}')`);
    getOverlay().appendChild(dot);
    if (!spec.loop) {
      dot.addEventListener('animationend', () => dot.remove(), { once: true });
      if (_onPacketCreated) _onPacketCreated(dot);
    }
    return api;
  }

  function _runWave(p, spec) {
    const el = node(spec.node);
    if (reducedMotion || !el) return api;
    const box = _localBox(el);
    if (!box) return api;
    const rings = Math.max(1, spec.rings || 3);
    for (let i = 0; i < rings; i += 1) {
      const ring = document.createElementNS(svgNS, 'circle');
      ring.setAttribute('cx', String(box.cx));
      ring.setAttribute('cy', String(box.cy));
      ring.setAttribute('r', String(box.r));
      ring.setAttribute('class', `viz-wave${spec.loop ? ' viz-wave--loop' : ''}`);
      ring.style.animationDelay = `${i * 200}ms`;
      getOverlay().appendChild(ring);
      if (!spec.loop) {
        ring.addEventListener('animationend', () => ring.remove(), { once: true });
      }
    }
    return api;
  }

  function _runState(p, spec) {
    highlight(spec.from, false);
    setState(spec.from, 'idle');
    setState(spec.to, 'active');
    highlight(spec.to, true);
    if (reducedMotion) return api;
    const el = node(spec.to);
    if (el) _restartAnimation(el, p.css);
    return api;
  }

  let timeline = null;
  const timelineCall = (method) => (...args) => {
    if (timeline) timeline[method](...args);
    return api;
  };

  const api = {
    root, svg,
    reducedMotion,
    setState, dim, highlight, glow, focus, reset, run,
    play: timelineCall('play'),
    pause: timelineCall('pause'),
    toggle: timelineCall('toggle'),
    restart: timelineCall('restart'),
    stepForward: timelineCall('stepForward'),
    stepBack: timelineCall('stepBack'),
    seek: timelineCall('seek'),
    get timeline() { return timeline; },
    destroy() {
      if (keyboard) svg.removeEventListener('keydown', onKeydown);
      if (timeline) timeline.destroy();
      reset();
      if (overlay) { overlay.remove(); overlay = null; }
    },
  };

  const model = options.timeline;
  if (model && Array.isArray(model.steps)) {
    timeline = new Timeline({
      steps: model.steps,
      loop: Boolean(options.loop ?? model.loop),
      autoplay: Boolean(options.autoplay ?? model.autoplay),
      reducedMotion,
      render: (index) => _renderStep(model.steps, index),
    });
  }

  function _renderStep(steps, index) {
    reset();
    for (let i = 0; i <= index; i += 1) {
      const actions = Array.isArray(steps[i]?.actions) ? steps[i].actions : [];
      const isCurrent = i === index;
      if (isCurrent && !reducedMotion) {
        _applyWithArrival(actions);
      } else {
        actions.forEach((a) => _applyAction(a, isCurrent));
      }
    }
  }

  function _applyWithArrival(actions) {
    const hasPacket = actions.some((a) => {
      if (!a.do) return false;
      const p = getPrimitive(a.do);
      return p && p.kind === 'packet';
    });

    const arrivalIds = new Set();
    const arrivalOrder = [];
    if (hasPacket) {
      actions.forEach((a) => {
        if (!a.do || !a.node) return;
        const p = getPrimitive(a.do);
        if (p && (p.kind === 'node' || p.kind === 'state') && !arrivalIds.has(a.node)) {
          arrivalIds.add(a.node);
          arrivalOrder.push(a.node);
        }
      });
    }

    if (arrivalIds.size === 0) {
      actions.forEach((a) => _applyAction(a, true));
      return;
    }

    const immediate = [];
    const deferredByTarget = new Map(arrivalOrder.map((id) => [id, []]));
    actions.forEach((a) => {
      const targetId = _arrivalTargetId(a, arrivalIds);
      if (targetId) deferredByTarget.get(targetId).push(a);
      else immediate.push(a);
    });

    const packetDots = [];
    _onPacketCreated = (dot) => packetDots.push(dot);
    immediate.forEach((a) => _applyAction(a, true));
    _onPacketCreated = null;

    const delay = _arrivalDelay();

    // One packet per arrival target (the common case, incl. fan-out to several
    // branches in the same step): each card waits for its OWN branch's dot,
    // not for whichever dot happened to be created last.
    if (packetDots.length === arrivalOrder.length) {
      arrivalOrder.forEach((id, i) => {
        _scheduleArrival(packetDots[i], delay, () => {
          deferredByTarget.get(id).forEach((a) => _applyAction(a, true));
        });
      });
      return;
    }

    // Ambiguous pairing (packet count != target count) - fall back to waiting
    // for every dot to finish before lighting up any deferred card.
    const applyAllDeferred = () => arrivalOrder.forEach((id) =>
      deferredByTarget.get(id).forEach((a) => _applyAction(a, true)));
    if (packetDots.length === 0) {
      const tid = setTimeout(applyAllDeferred, delay);
      _pendingArrivals.push(tid);
      return;
    }
    let remaining = packetDots.length;
    const onOneDone = () => { remaining -= 1; if (remaining <= 0) applyAllDeferred(); };
    packetDots.forEach((dot) => _scheduleArrival(dot, delay, onOneDone));
  }

  function _scheduleArrival(dot, delay, applyFn) {
    if (dot) {
      let fired = false;
      const fire = () => {
        if (fired) return;
        fired = true;
        applyFn();
      };
      dot.addEventListener('animationend', fire, { once: true });
      const tid = setTimeout(fire, delay * 1.5);
      _pendingArrivals.push(tid);
    } else {
      const tid = setTimeout(applyFn, delay);
      _pendingArrivals.push(tid);
    }
  }

  function _arrivalTargetId(action, ids) {
    if (action.set && ids.has(action.set.id) && action.set.state !== 'dim') return action.set.id;
    if (action.glow && ids.has(action.glow)) return action.glow;
    if (action.highlight && ids.has(action.highlight)) return action.highlight;
    if (action.do  && action.node && ids.has(action.node)) return action.node;
    return null;
  }

  function _arrivalDelay() {
    try {
      const raw = getComputedStyle(svg).getPropertyValue('--duration-crawl').trim();
      return (parseFloat(raw) || 1000) * 0.75;
    } catch { return 750; }
  }

  function _applyAction(action, isCurrent) {
    if (!action || typeof action !== 'object') return;
    if (action.set) setState(action.set.id, action.set.state);
    if (action.glow) glow(action.glow, true);
    if (action.dim) dim(action.dim, true);
    if (action.highlight) highlight(action.highlight, true);
    if (action.do && isCurrent) run(action.do, action);
  }

  function onKeydown(event) {
    const nodes = focalNodes();
    if (nodes.length === 0) return;
    const current = document.activeElement;
    const i = nodes.indexOf(current);
    let next = -1;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = i < 0 ? 0 : (i + 1) % nodes.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = i < 0 ? 0 : (i - 1 + nodes.length) % nodes.length;
    else return;
    event.preventDefault();
    nodes[next].focus();
  }

  const keyboard = options.keyboard !== false;
  if (keyboard) svg.addEventListener('keydown', onKeydown);

  function _resolvePath(spec) {
    if (spec.path) return svg.querySelector(spec.path);
    if (spec.edge && typeof spec.edge === 'string') {
      const [from, to] = spec.edge.split('->').map((s) => s.trim());
      return svg.querySelector(
        `.diagram__flow[data-edge="${cssEscape(from)}-${cssEscape(to)}"]`,
      ) || _nthFlow(spec.index);
    }
    return _nthFlow(spec.index);
  }
  function _nthFlow(index) {
    const flows = svg.querySelectorAll('.diagram__flow, .diagram__edge');
    return flows[Number(index) || 0] || null;
  }
  function _localBox(el) {
    try {
      const b = el.getBBox();
      return { cx: b.x + b.width / 2, cy: b.y + b.height / 2, r: Math.max(b.width, b.height) / 2 };
    } catch {
      return null;
    }
  }

  return api;
}

function _restartAnimation(el, cls) {
  if (!cls) return;
  el.classList.remove(cls);
  void el.getBoundingClientRect();
  el.classList.add(cls);
}

function cssEscape(value) {
  const s = String(value ?? '');
  if (typeof CSS !== 'undefined' && typeof CSS.escape === 'function') return CSS.escape(s);
  return s.replace(/["\\\]]/g, '\\$&');
}

