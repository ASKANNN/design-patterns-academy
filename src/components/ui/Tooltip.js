export function Tooltip({
  content  = '',
  label    = '',
  position = 'top',
  attrs    = '',
} = {}) {
  return `
    <span class="tooltip-wrap" data-tooltip="${label}" data-tooltip-pos="${position}" ${attrs}>
      ${content}
    </span>
  `;
}
