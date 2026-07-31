import { t } from '../../utils/i18n.js';

export function Playground({ id, code = '', language = 'javascript' } = {}) {
  return `
    <div class="playground" data-playground data-playground-lang="${language}" id="${id}">
      <div class="playground__pane playground__pane--editor">
        <div class="playground__pane-header">
          <span class="playground__pane-label">${t('patterns.playground.editor')}</span>
          <div class="playground__actions">
            <button type="button" class="btn btn--secondary btn--sm" data-playground-reset>${t('patterns.playground.reset')}</button>
            <button type="button" class="btn btn--primary btn--sm" data-playground-run>${t('patterns.playground.run')}</button>
          </div>
        </div>
        <textarea
          class="playground__textarea"
          data-playground-textarea
          data-playground-original="${_escAttr(JSON.stringify(code))}"
          spellcheck="false"
          autocapitalize="off"
          autocomplete="off"
          aria-label="${t('patterns.playground.editor')}"
        >${_escHtml(code)}</textarea>
      </div>
      <div class="playground__pane playground__pane--console">
        <div class="playground__pane-header">
          <span class="playground__pane-label">${t('patterns.playground.console')}</span>
          <button type="button" class="btn btn--ghost btn--sm" data-playground-clear>${t('patterns.playground.clear')}</button>
        </div>
        <div class="playground__console" data-playground-console role="log" aria-live="polite">
          <p class="playground__console-hint" data-playground-hint>${t('patterns.playground.run_hint')}</p>
        </div>
      </div>
      <iframe class="playground__sandbox" data-playground-sandbox sandbox="allow-scripts" title="playground sandbox" hidden aria-hidden="true"></iframe>
    </div>
  `;
}

function _escHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function _escAttr(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;');
}
