import { getA11yState } from '../config/accessibility.js';

let _ctx = null;

function getContext() {
  if (_ctx) return _ctx;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  _ctx = new AudioCtx();
  return _ctx;
}

function _withContext(fn) {
  if (!getA11yState().soundEffects) return;

  const ctx = getContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();

  fn(ctx, ctx.currentTime);
}

function _tone(ctx, now, { freq, endFreq, duration, delay = 0, peak = 0.08, type = 'sine', filterStart, filterEnd, q = 0.6 }) {
  const start       = now + delay;
  const oscillator  = ctx.createOscillator();
  const gain        = ctx.createGain();
  let   node        = oscillator;

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(freq, start);
  oscillator.frequency.exponentialRampToValueAtTime(endFreq ?? freq, start + duration);

  if (filterStart) {
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.Q.value = q;
    filter.frequency.setValueAtTime(filterStart, start);
    filter.frequency.exponentialRampToValueAtTime(filterEnd ?? filterStart, start + duration);
    node.connect(filter);
    node = filter;
  }

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(peak, start + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  node.connect(gain).connect(ctx.destination);
  oscillator.start(start);
  oscillator.stop(start + duration);
}

function _noiseBurst(ctx, now, { duration = 0.012, delay = 0, peak = 0.05, freq = 900, q = 3 }) {
  const start   = now + delay;
  const buffer  = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * duration), ctx.sampleRate);
  const data    = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

  const noise  = ctx.createBufferSource();
  noise.buffer = buffer;

  const bandpass = ctx.createBiquadFilter();
  bandpass.type            = 'bandpass';
  bandpass.frequency.value = freq;
  bandpass.Q.value         = q;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(peak, start + 0.002);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  noise.connect(bandpass).connect(gain).connect(ctx.destination);
  noise.start(start);
  noise.stop(start + duration);
}

export function playClickTick() {
  _withContext((ctx, now) => {
    _tone(ctx, now, { freq: 900, endFreq: 600, duration: 0.035, peak: 0.032, filterStart: 1800, filterEnd: 800, q: 0.5 });
  });
}

export function playSelectClick() {
  _withContext((ctx, now) => {
    _noiseBurst(ctx, now, { duration: 0.01, peak: 0.045, freq: 850, q: 3.5 });
    _tone(ctx, now, { freq: 260, endFreq: 140, duration: 0.09, peak: 0.09, filterStart: 1800, filterEnd: 400, q: 0.7 });
  });
}

export function playSuccessChime() {
  _withContext((ctx, now) => {
    _tone(ctx, now, { freq: 523.25, duration: 0.11, delay: 0,    peak: 0.055, filterStart: 2200, filterEnd: 1400 });
    _tone(ctx, now, { freq: 659.25, duration: 0.13, delay: 0.08, peak: 0.06,  filterStart: 2200, filterEnd: 1400 });
    _tone(ctx, now, { freq: 784,    duration: 0.2,  delay: 0.16, peak: 0.065, filterStart: 2200, filterEnd: 1100 });
  });
}

export function playErrorTone() {
  _withContext((ctx, now) => {
    _tone(ctx, now, { freq: 190, endFreq: 160, duration: 0.11, delay: 0,    peak: 0.08, filterStart: 900, filterEnd: 300 });
    _tone(ctx, now, { freq: 170, endFreq: 140, duration: 0.14, delay: 0.13, peak: 0.07, filterStart: 900, filterEnd: 250 });
  });
}
