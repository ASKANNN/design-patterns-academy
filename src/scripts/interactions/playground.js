import { t }          from '../../utils/i18n.js';
import { stripTypes } from '../../utils/strip-types.js';

export function handlePlaygroundRun(btn) {
  const root      = btn.closest('[data-playground]');
  const textarea  = root?.querySelector('[data-playground-textarea]');
  const consoleEl = root?.querySelector('[data-playground-console]');
  const iframe    = root?.querySelector('[data-playground-sandbox]');
  if (!root || !textarea || !consoleEl || !iframe) return;

  const lang = root.dataset.playgroundLang;
  const code = lang === 'typescript' ? stripTypes(textarea.value) : textarea.value;

  consoleEl.innerHTML = '';
  iframe.srcdoc = _playgroundSandboxDoc(code);
}

export function handlePlaygroundReset(btn) {
  const root     = btn.closest('[data-playground]');
  const textarea = root?.querySelector('[data-playground-textarea]');
  if (!textarea) return;
  textarea.value = JSON.parse(textarea.dataset.playgroundOriginal);
}

export function handlePlaygroundClear(btn) {
  const root      = btn.closest('[data-playground]');
  const consoleEl = root?.querySelector('[data-playground-console]');
  if (!consoleEl) return;
  consoleEl.innerHTML = `<p class="playground__console-hint">${t('patterns.playground.run_hint')}</p>`;
}

export function handlePlaygroundMessage(e) {
  if (!e.data || e.data.__playground !== true) return;

  const iframe = [...document.querySelectorAll('[data-playground-sandbox]')]
    .find(f => f.contentWindow === e.source);
  const consoleEl = iframe?.closest('[data-playground]')?.querySelector('[data-playground-console]');
  if (!consoleEl) return;

  const hint = consoleEl.querySelector('[data-playground-hint]');
  if (hint) hint.remove();

  const line = document.createElement('p');
  line.className = `playground__console-line${e.data.type !== 'log' && e.data.type !== 'info' ? ` playground__console-line--${e.data.type}` : ''}`;
  line.textContent = e.data.text;
  consoleEl.appendChild(line);
  line.scrollIntoView({ block: 'nearest' });
}

function _playgroundSandboxDoc(code) {
  const escaped = code.replace(/<\/script>/g, '<\\/script>');
  const disabledMsgs = ['print', 'alert', 'confirm', 'prompt', 'open'].reduce((acc, fn) => {
    acc[fn] = t('patterns.playground.sandbox_disabled', { fn: `window.${fn}()` });
    return acc;
  }, {});
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body><script>
(function () {
  function send(type, args) {
    try {
      parent.postMessage({ __playground: true, type, text: args.map(stringify).join(' ') }, '*');
    } catch (_) {}
  }
  function stringify(v) {
    if (typeof v === 'string') return v;
    if (v instanceof Error) return v.message;
    try { return JSON.stringify(v); } catch (_) { return String(v); }
  }
  ['log', 'info', 'warn', 'error'].forEach(function (m) {
    console[m] = function () { send(m, Array.prototype.slice.call(arguments)); };
  });
  var disabledMsgs = ${JSON.stringify(disabledMsgs)};
  Object.keys(disabledMsgs).forEach(function (m) {
    window[m] = function () { send('warn', [disabledMsgs[m]]); };
  });
  window.onerror = function (msg) { send('error', [String(msg)]); return true; };
  try {
    ${escaped}
  } catch (err) {
    send('error', [err && err.message ? err.message : String(err)]);
  }
})();
</script></body></html>`;
}
