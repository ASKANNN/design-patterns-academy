import { getA11yState } from '../config/accessibility.js';

let _ctx = null;

function getContext() {
  if (_ctx) return _ctx;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  _ctx = new AudioCtx();
  return _ctx;
}

function _playTone(ctx, { start, end, duration, delay = 0, peak = 0.12, type = 'sine' }) {
  const now        = ctx.currentTime + delay;
  const oscillator = ctx.createOscillator();
  const gain        = ctx.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(start, now);
  oscillator.frequency.exponentialRampToValueAtTime(end, now + duration);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(peak, now + 0.002);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  oscillator.connect(gain).connect(ctx.destination);
  oscillator.start(now);
  oscillator.stop(now + duration);
}

function _play(tones) {
  if (!getA11yState().soundEffects) return;

  const ctx = getContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();

  tones.forEach(tone => _playTone(ctx, tone));
}

export function playClickTick() {
  _play([{ start: 1100, end: 700, duration: 0.018 }]);
}

export function playSuccessChime() {
  _play([
    { start: 880,  end: 880,  duration: 0.09, delay: 0,    peak: 0.11 },
    { start: 1320, end: 1320, duration: 0.14, delay: 0.09, peak: 0.13 },
  ]);
}

export function playErrorTone() {
  _play([{ start: 220, end: 150, duration: 0.16, peak: 0.12, type: 'triangle' }]);
}
