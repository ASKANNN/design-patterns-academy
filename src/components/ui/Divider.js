export function Divider({
  label    = '',
  variant  = '',
  vertical = false,
  attrs    = '',
} = {}) {
  if (vertical) {
    return `<span class="divider divider--vertical" role="separator" aria-orientation="vertical" ${attrs}></span>`;
  }

  const cls = ['divider', variant ? `divider--${variant}` : ''].filter(Boolean).join(' ');

  return label
    ? `<div class="${cls}" role="separator" ${attrs}>${label}</div>`
    : `<hr class="${cls}" role="separator" ${attrs} />`;
}
