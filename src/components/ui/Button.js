export function Button({
  label    = 'Button',
  variant  = 'primary',
  size     = 'md',
  disabled = false,
  loading  = false,
  href     = null,
  type     = 'button',
  attrs    = '',
} = {}) {
  const tag      = href ? 'a' : 'button';
  const hrefAttr = href ? `href="${href}"` : '';
  const typeAttr = !href ? `type="${type}"` : '';
  const dis      = disabled || loading;

  return `
    <${tag}
      class="btn btn--${variant} btn--${size}${loading ? ' btn--loading' : ''}"
      ${hrefAttr}
      ${typeAttr}
      ${dis && !href ? 'disabled' : ''}
      ${dis && href  ? 'aria-disabled="true"' : ''}
      ${attrs}
    >
      ${loading ? '<span class="btn__spinner" aria-hidden="true"></span>' : ''}
      <span class="btn__label">${label}</span>
    </${tag}>
  `;
}
