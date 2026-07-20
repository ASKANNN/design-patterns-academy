export function Skeleton({
  variant = 'text',
  width   = '',
  height  = '',
  rows    = 1,
  attrs   = '',
} = {}) {
  const style = [
    width  ? `width:${width}`   : '',
    height ? `height:${height}` : '',
  ].filter(Boolean).join(';');

  if (variant === 'card') {
    return `
      <div class="skeleton skeleton--card" ${attrs}>
        <div class="skeleton skeleton--avatar" style="width:48px;height:48px"></div>
        <div style="display:flex;flex-direction:column;gap:8px;flex:1">
          <div class="skeleton skeleton--text" style="width:60%"></div>
          <div class="skeleton skeleton--text" style="width:80%"></div>
          <div class="skeleton skeleton--text" style="width:45%"></div>
        </div>
      </div>
    `;
  }

  if (rows > 1) {
    return Array.from({ length: rows }, (_, i) =>
      `<div class="skeleton skeleton--${variant}" style="${i === rows - 1 ? 'width:70%' : ''}" ${attrs}></div>`
    ).join('\n');
  }

  return `<div class="skeleton skeleton--${variant}" style="${style}" ${attrs}></div>`;
}
