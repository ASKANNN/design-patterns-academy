import { t } from '../../utils/i18n.js';

export function CodeBlock({
  code        = '',
  language    = 'js',
  filename    = '',
  showDots    = true,
  numbered    = false,
  activeLines = null,
  attrs       = '',
  lazy        = false,
} = {}) {
  const label = filename || language.toUpperCase();
  const lazyAttrs = lazy ? ` data-lazy-code data-lazy-lines="${activeLines ? activeLines.join(',') : ''}"` : '';
  const body = lazy ? _esc(code) : highlight(code, language, activeLines);

  return `
    <div class="code-block${numbered ? ' code-block--numbered' : ''}" ${attrs}>
      <div class="code-block__header">
        <div class="code-block__left">
          ${showDots ? `
            <div class="code-block__dots" aria-hidden="true">
              <span class="code-block__dot code-block__dot--red"></span>
              <span class="code-block__dot code-block__dot--yellow"></span>
              <span class="code-block__dot code-block__dot--green"></span>
            </div>
          ` : ''}
          <span class="code-block__lang">${label}</span>
        </div>
        <button class="copy-btn" type="button" aria-label="${t('patterns.code.copy')}" data-copy-target>
          <svg class="copy-btn__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          <span class="copy-btn__label">${t('actions.copy')}</span>
        </button>
      </div>
      <div class="code-block__body">
        <pre class="code-block__pre"><code class="code-block__code language-${language}"${lazyAttrs}>${body}</code></pre>
      </div>
    </div>
  `;
}

export function hydrateLazyCodeBlock(codeEl) {
  if (!codeEl.hasAttribute('data-lazy-code')) return;
  const language    = [...codeEl.classList].find(c => c.startsWith('language-'))?.slice(9) || 'javascript';
  const linesAttr   = codeEl.dataset.lazyLines;
  const activeLines = linesAttr ? linesAttr.split(',').map(Number) : null;
  codeEl.innerHTML = highlight(codeEl.textContent, language, activeLines);
  codeEl.removeAttribute('data-lazy-code');
  codeEl.removeAttribute('data-lazy-lines');
}

const _KW = {
  javascript: new Set(['break','case','catch','class','const','constructor','continue','debugger','default','delete','do','else','export','extends','false','finally','for','from','function','if','import','in','instanceof','let','new','null','of','return','static','super','switch','this','throw','true','try','typeof','undefined','var','void','while','yield','async','await']),
  typescript: new Set(['break','case','catch','class','const','constructor','continue','default','delete','do','else','enum','export','extends','false','finally','for','from','function','if','implements','import','in','instanceof','interface','let','new','null','of','private','protected','public','readonly','return','static','super','switch','this','throw','true','try','type','typeof','undefined','var','void','while','abstract','async','await','declare','namespace','override']),
  java:       new Set(['abstract','assert','boolean','break','byte','case','catch','char','class','continue','default','do','double','else','enum','extends','false','final','finally','float','for','if','implements','import','instanceof','int','interface','long','native','new','null','package','private','protected','public','return','short','static','strictfp','super','switch','synchronized','this','throw','throws','transient','true','try','var','void','volatile','while']),
  python:     new Set(['and','as','assert','async','await','break','class','continue','def','del','elif','else','except','finally','false','for','from','global','if','import','in','is','lambda','none','nonlocal','not','or','pass','raise','return','true','try','while','with','yield','self','super','print']),
  csharp:     new Set(['abstract','as','base','bool','break','byte','case','catch','char','class','const','continue','decimal','default','delegate','do','double','else','enum','event','explicit','extern','false','finally','fixed','float','for','foreach','goto','if','implicit','in','int','interface','internal','is','lock','long','namespace','new','null','object','operator','out','override','params','private','protected','public','readonly','ref','return','sbyte','sealed','short','sizeof','stackalloc','static','string','struct','switch','this','throw','true','try','typeof','uint','ulong','unchecked','unsafe','ushort','using','var','virtual','void','volatile','while']),
};

function highlight(code, lang, activeLines) {
  const keywords = _KW[lang] || _KW.javascript;
  const isPython = lang === 'python';
  const lines = [''];
  let i = 0;
  const n = code.length;

  const out = (html) => {
    const parts = html.split('\n');
    lines[lines.length - 1] += parts[0];
    for (let k = 1; k < parts.length; k++) lines.push(parts[k]);
  };

  while (i < n) {
    if (
      (code[i] === '/' && code[i + 1] === '/') ||
      (isPython && code[i] === '#')
    ) {
      const end = code.indexOf('\n', i);
      const tok = end === -1 ? code.slice(i) : code.slice(i, end);
      out(`<span class="token-comment">${_esc(tok)}</span>`);
      i += tok.length;
      continue;
    }

    if (code[i] === '/' && code[i + 1] === '*') {
      const end = code.indexOf('*/', i + 2);
      const tok = end === -1 ? code.slice(i) : code.slice(i, end + 2);
      out(`<span class="token-comment">${_esc(tok)}</span>`);
      i += tok.length;
      continue;
    }

    if (code[i] === '"' || code[i] === "'" || code[i] === '`') {
      const q = code[i];
      let j = i + 1;
      while (j < n) {
        if (code[j] === '\\') { j += 2; continue; }
        if (code[j] === q)    { j++;    break; }
        j++;
      }
      out(`<span class="token-string">${_esc(code.slice(i, j))}</span>`);
      i = j;
      continue;
    }

    if (code[i] >= '0' && code[i] <= '9') {
      let j = i + 1;
      while (j < n && (code[j] >= '0' && code[j] <= '9' || code[j] === '.' || code[j] === '_')) j++;
      out(`<span class="token-number">${_esc(code.slice(i, j))}</span>`);
      i = j;
      continue;
    }

    if (/[a-zA-Z_$@]/.test(code[i])) {
      if (code[i] === '@') {
        out(`<span class="token-punctuation">@</span>`);
        i++;
        continue;
      }

      let j = i + 1;
      while (j < n && /[a-zA-Z0-9_$]/.test(code[j])) j++;
      const word = code.slice(i, j);

      if (keywords.has(word.toLowerCase()) && keywords.has(word)) {
        out(`<span class="token-keyword">${_esc(word)}</span>`);
      } else if (/^[A-Z]/.test(word)) {
        out(`<span class="token-class">${_esc(word)}</span>`);
      } else {
        let k = j;
        while (k < n && (code[k] === ' ' || code[k] === '\t')) k++;
        if (code[k] === '(') {
          out(`<span class="token-function">${_esc(word)}</span>`);
        } else {
          out(_esc(word));
        }
      }
      i = j;
      continue;
    }

    if ('{}[]();,.<>!&|+-*/%^~=:?'.includes(code[i])) {
      out(`<span class="token-punctuation">${_esc(code[i])}</span>`);
      i++;
      continue;
    }

    out(_esc(code[i]));
    i++;
  }

  return lines.map((html, idx) => {
    const lineNo = idx + 1;
    const isActive = Array.isArray(activeLines) && lineNo >= activeLines[0] && lineNo <= activeLines[1];
    return `<span class="code-block__line${isActive ? ' is-active-line' : ''}" data-line="${lineNo}">${html}</span>`;
  }).join('\n');
}

function _esc(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
