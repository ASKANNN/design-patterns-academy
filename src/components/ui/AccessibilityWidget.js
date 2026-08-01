import { getA11yState, setA11y, resetA11y } from '../../config/accessibility.js';

export function AccessibilityWidget() {
  return `
    <button
      type="button"
      class="a11y-widget__trigger"
      id="a11y-trigger"
      aria-haspopup="dialog"
      aria-expanded="false"
      aria-controls="a11y-panel"
      data-i18n-aria-label="a11y.open"
    >
      <svg class="a11y-widget__icon" width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="4" r="1.8" fill="currentColor"/>
        <path d="M4 8.5c2.5 1 5.2 1.5 8 1.5s5.5-.5 8-1.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M12 10v11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M8 21l2.5-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M16 21l-2.5-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      </svg>
    </button>

    <div
      class="a11y-widget__panel"
      id="a11y-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="a11y-panel-title"
      aria-hidden="true"
    >
      <div class="a11y-widget__header">
        <h2 class="a11y-widget__title" id="a11y-panel-title" data-i18n="a11y.title">Accessibility</h2>
        <button type="button" class="a11y-widget__close" id="a11y-close" data-i18n-aria-label="a11y.close">
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
            <line x1="3" y1="3" x2="15" y2="15"/>
            <line x1="15" y1="3" x2="3" y2="15"/>
          </svg>
        </button>
      </div>

      <div class="a11y-widget__body">

        ${_segmentGroup({
          name:  'fontSize',
          legendKey: 'a11y.font_size.label',
          options: [
            ['normal', 'a11y.font_size.normal'],
            ['large',  'a11y.font_size.large'],
            ['xlarge', 'a11y.font_size.xlarge'],
          ],
        })}

        ${_segmentGroup({
          name:  'contrast',
          legendKey: 'a11y.contrast.label',
          options: [
            ['normal', 'a11y.contrast.normal'],
            ['high',   'a11y.contrast.high'],
            ['invert', 'a11y.contrast.invert'],
          ],
        })}

        ${_switchRow('monochrome',     'a11y.monochrome')}
        ${_switchRow('readableFont',   'a11y.readable_font')}
        ${_switchRow('underlineLinks', 'a11y.underline_links')}

        <button type="button" class="a11y-widget__reset" id="a11y-reset" data-i18n="a11y.reset">
          Reset all
        </button>
      </div>
    </div>
  `;
}

function _segmentGroup({ name, legendKey, options }) {
  return `
    <fieldset class="a11y-widget__group">
      <legend class="a11y-widget__legend" data-i18n="${legendKey}"></legend>
      <div class="a11y-widget__segment" role="radiogroup" data-a11y-group="${name}">
        ${options.map(([value, i18nKey]) => `
          <button
            type="button"
            class="a11y-widget__segment-btn"
            role="radio"
            aria-checked="false"
            data-a11y-option="${name}:${value}"
            data-i18n="${i18nKey}"
          ></button>
        `).join('')}
      </div>
    </fieldset>
  `;
}

function _switchRow(key, i18nKey) {
  return `
    <label class="a11y-widget__switch-row" for="a11y-${key}">
      <span data-i18n="${i18nKey}"></span>
      <span class="a11y-widget__switch">
        <input type="checkbox" id="a11y-${key}" data-a11y-toggle="${key}" role="switch" />
        <span class="a11y-widget__switch-track" aria-hidden="true">
          <span class="a11y-widget__switch-thumb"></span>
        </span>
      </span>
    </label>
  `;
}

export function initAccessibilityWidget() {
  const trigger = document.getElementById('a11y-trigger');
  const panel   = document.getElementById('a11y-panel');
  const closeBtn = document.getElementById('a11y-close');
  const resetBtn = document.getElementById('a11y-reset');

  let lastFocused = null;

  function syncControls() {
    const state = getA11yState();

    panel.querySelectorAll('[data-a11y-option]').forEach(btn => {
      const [group, value] = btn.dataset.a11yOption.split(':');
      const isActive = String(state[group]) === value;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-checked', String(isActive));
    });

    panel.querySelectorAll('[data-a11y-toggle]').forEach(input => {
      input.checked = Boolean(state[input.dataset.a11yToggle]);
    });
  }

  function openPanel() {
    lastFocused = document.activeElement;
    panel.setAttribute('aria-hidden', 'false');
    panel.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
    syncControls();
    closeBtn.focus();
    document.addEventListener('keydown', onKeydown);
  }

  function closePanel() {
    panel.setAttribute('aria-hidden', 'true');
    panel.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
    document.removeEventListener('keydown', onKeydown);
    (lastFocused ?? trigger).focus();
  }

  function isOpen() {
    return panel.classList.contains('is-open');
  }

  function onKeydown(e) {
    if (e.key === 'Escape') {
      closePanel();
      return;
    }
    if (e.key !== 'Tab') return;

    const focusable = [...panel.querySelectorAll('button, input, [tabindex]:not([tabindex="-1"])')]
      .filter(el => !el.disabled);
    if (!focusable.length) return;

    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  trigger.addEventListener('click', () => (isOpen() ? closePanel() : openPanel()));
  closeBtn.addEventListener('click', closePanel);

  document.addEventListener('click', (e) => {
    if (isOpen() && !panel.contains(e.target) && !trigger.contains(e.target)) closePanel();
  });

  panel.querySelectorAll('[data-a11y-option]').forEach(btn => {
    btn.addEventListener('click', () => {
      const [group, value] = btn.dataset.a11yOption.split(':');
      setA11y({ [group]: value });
      syncControls();
    });
  });

  panel.querySelectorAll('[data-a11y-toggle]').forEach(input => {
    input.addEventListener('change', () => {
      setA11y({ [input.dataset.a11yToggle]: input.checked });
    });
  });

  resetBtn.addEventListener('click', () => {
    resetA11y();
    syncControls();
  });
}
