export function handleLangSelect(btn) {
  const lang      = btn.dataset.langBtn;
  const container = btn.closest('.detail-section');
  if (!container) return;

  container.querySelectorAll('[data-lang-btn]').forEach(b => {
    b.classList.toggle('is-active', b === btn);
  });

  container.querySelectorAll('[data-lang-panel]').forEach(panel => {
    panel.classList.toggle('is-visible', panel.dataset.langPanel === lang);
  });
}
