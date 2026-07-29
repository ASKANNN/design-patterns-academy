export function ProgressBar({
  value         = 0,
  max           = 100,
  variant       = '',
  size          = '',
  label         = '',
  showLabel     = false,
  indeterminate = false,
  attrs         = '',
} = {}) {
  const pct     = indeterminate ? 0 : Math.min(100, Math.max(0, (value / max) * 100));
  const cls     = [
    'progress',
    variant       ? `progress--${variant}` : '',
    size          ? `progress--${size}`    : '',
    indeterminate ? 'progress--indeterminate' : '',
  ].filter(Boolean).join(' ');

  const bar = `
    <div
      class="${cls}"
      role="progressbar"
      aria-valuenow="${indeterminate ? undefined : value}"
      aria-valuemin="0"
      aria-valuemax="${max}"
      ${label ? `aria-label="${label}"` : ''}
      ${attrs}
    >
      <div class="progress__bar" style="width:${pct}%"></div>
    </div>
  `;

  if (!showLabel) return bar;

  return `
    <div class="progress-wrap">
      <div class="progress-wrap__header">
        ${label ? `<span class="progress-wrap__label">${label}</span>` : ''}
        <span class="progress-wrap__value">${Math.round(pct)}%</span>
      </div>
      ${bar}
    </div>
  `;
}
