import { getA11yState } from '../config/accessibility.js';

let _ctx = null;

function getContext() {
  if (_ctx) return _ctx;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  _ctx = new AudioCtx();
  return _ctx;
}

export function playClickTick() {
  if (!getA11yState().soundEffects) return;

  const ctx = getContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();

  const now         = ctx.currentTime;
  const duration    = 0.018;
  const oscillator  = ctx.createOscillator();
  const gain        = ctx.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(1100, now);
  oscillator.frequency.exponentialRampToValueAtTime(700, now + duration);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.12, now + 0.002);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  oscillator.connect(gain).connect(ctx.destination);
  oscillator.start(now);
  oscillator.stop(now + duration);
}
