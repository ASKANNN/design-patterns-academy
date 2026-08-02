export function toggleAccordion(trigger) {
  const item    = trigger.closest('.accordion__item');
  const panel   = item?.querySelector('.accordion__panel');
  if (!item || !panel) return;

  const isOpen  = item.classList.contains('is-open');
  trigger.setAttribute('aria-expanded', String(!isOpen));

  panel.removeEventListener('transitionend', panel._onAccordionTransitionEnd || (() => {}));

  if (isOpen) {
    panel.style.maxHeight = `${panel.scrollHeight}px`;
    requestAnimationFrame(() => {
      item.classList.remove('is-open');
      panel.style.maxHeight = '0px';
    });
    panel._onAccordionTransitionEnd = (e) => {
      if (e.propertyName === 'max-height' && !item.classList.contains('is-open')) {
        panel.setAttribute('hidden', '');
      }
    };
    panel.addEventListener('transitionend', panel._onAccordionTransitionEnd, { once: true });
  } else {
    panel.removeAttribute('hidden');
    panel.style.maxHeight = '0px';
    requestAnimationFrame(() => {
      item.classList.add('is-open');
      panel.style.maxHeight = `${panel.scrollHeight}px`;
    });
    panel._onAccordionTransitionEnd = (e) => {
      if (e.propertyName === 'max-height' && item.classList.contains('is-open')) {
        panel.style.maxHeight = 'none';
      }
    };
    panel.addEventListener('transitionend', panel._onAccordionTransitionEnd, { once: true });
  }
}

export function navigateAccordion(trigger, key) {
  const accordion = trigger.closest('.accordion');
  const triggers  = [...accordion.querySelectorAll('.accordion__trigger')];
  const idx       = triggers.indexOf(trigger);
  const next      = key === 'ArrowDown' ? triggers[idx + 1] : triggers[idx - 1];
  next?.focus();
}
