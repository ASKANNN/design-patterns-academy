import { hydrateLazyCodeBlock } from '../../components/ui/CodeBlock.js';

export function handleLangSelect(btn) {
  const lang      = btn.dataset.langBtn;
  const container = btn.closest('.detail-section');
  if (!container) return;

  container.querySelectorAll('[data-lang-btn]').forEach(b => {
    b.classList.toggle('is-active', b === btn);
  });

  container.querySelectorAll('[data-lang-panel]').forEach(panel => {
    const isTarget = panel.dataset.langPanel === lang;
    if (isTarget) {
      panel.querySelectorAll('[data-lazy-code]').forEach(hydrateLazyCodeBlock);
    }
    panel.classList.toggle('is-visible', isTarget);
  });
}
