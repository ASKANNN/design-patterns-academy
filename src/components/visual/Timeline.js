

const DEFAULT_STEP_DURATION = 1400;

export class Timeline {
  constructor({
    steps = [],
    render = () => {},
    onChange = () => {},
    autoplay = false,
    loop = false,
    reducedMotion = false,
    stepDuration = DEFAULT_STEP_DURATION,
  } = {}) {
    this._steps = Array.isArray(steps) ? steps : [];
    this._render = render;
    this._onChange = onChange;
    this._loop = Boolean(loop);
    this._reduced = Boolean(reducedMotion);
    this._stepDuration = Number(stepDuration) || DEFAULT_STEP_DURATION;

    this._index = 0;
    this._status = /** @type {TimelineStatus} */ ('idle');
    this._timer = null;

    if (this._reduced) {
      this._index = Math.max(0, this._steps.length - 1);
      this._paint();
      this._status = 'ended';
      this._emit();
    } else {
      this._paint();
      this._emit();
      if (autoplay) this.play();
    }
  }

  get index() { return this._index; }
  get length() { return this._steps.length; }
  get status() { return this._status; }
  get isPlaying() { return this._status === 'playing'; }

  play() {
    if (this._reduced || this._steps.length === 0) return this;
    if (this._status === 'ended') this._index = 0;
    this._setStatus('playing');
    this._paint();
    this._schedule();
    return this;
  }

  pause() {
    this._clear();
    if (this._status === 'playing') this._setStatus('paused');
    return this;
  }

  toggle() {
    return this.isPlaying ? this.pause() : this.play();
  }

  restart() {
    this._clear();
    this._index = 0;
    this._setStatus('idle');
    this._paint();
    return this;
  }

  stepForward() {
    this._clear();
    const last = this._steps.length - 1;
    if (this._index >= last) {
      if (!this._loop) { this._setStatus('ended'); return this; }
      this._index = 0;
    } else {
      this._index += 1;
    }
    this._setStatus('paused');
    this._paint();
    return this;
  }

  stepBack() {
    this._clear();
    this._index = Math.max(0, this._index - 1);
    this._setStatus('paused');
    this._paint();
    return this;
  }

  seek(index) {
    this._clear();
    const clamped = Math.min(Math.max(0, Math.floor(index) || 0), Math.max(0, this._steps.length - 1));
    this._index = clamped;
    this._setStatus('paused');
    this._paint();
    return this;
  }

  destroy() {
    this._clear();
    this._render = () => {};
    this._onChange = () => {};
    this._steps = [];
  }

  _schedule() {
    this._clear();
    const step = this._steps[this._index] || {};
    const ms = Number(step.duration) || this._stepDuration;
    this._timer = setTimeout(() => this._advance(), ms);
  }

  _advance() {
    const last = this._steps.length - 1;
    if (this._index >= last) {
      if (this._loop) {
        this._index = 0;
        this._paint();
        this._schedule();
      } else {
        this._setStatus('ended');
      }
      return;
    }
    this._index += 1;
    this._paint();
    this._schedule();
  }

  _paint() {
    const step = this._steps[this._index];
    if (step) this._render(this._index, step);
  }

  _setStatus(status) {
    if (this._status !== status) {
      this._status = status;
      this._emit();
    }
  }

  _emit() {
    this._onChange(this._index, this._status);
  }

  _clear() {
    if (this._timer != null) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  }
}
