export function Badge({
  label   = '',
  variant = 'default',
  size    = '',
  dot     = false,
  attrs   = '',
} = {}) {
  const cls = ['badge', `badge--${variant}`, size ? `badge--${size}` : ''].filter(Boolean).join(' ');

  return `
    <span class="${cls}" ${attrs}>
      ${dot ? '<span class="badge__dot" aria-hidden="true"></span>' : ''}
      ${label}
    </span>
  `;
}
