export function Card({
  variant = '',
  href    = null,
  header  = '',
  body    = '',
  footer  = '',
  attrs   = '',
} = {}) {
  const tag      = href ? 'a' : 'div';
  const hrefAttr = href ? `href="${href}"` : '';
  const cls      = ['card', variant ? `card--${variant}` : ''].filter(Boolean).join(' ');

  return `
    <${tag} class="${cls}" ${hrefAttr} ${attrs}>
      ${header ? `<div class="card__header">${header}</div>` : ''}
      ${body   ? `<div class="card__body">${body}</div>` : ''}
      ${footer ? `<div class="card__footer">${footer}</div>` : ''}
    </${tag}>
  `;
}
