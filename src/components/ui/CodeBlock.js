import { t } from '../../utils/i18n.js';

export function CodeBlock({
  code      = '',
  language  = 'js',
  filename  = '',
  showDots  = true,
  numbered  = false,
  attrs     = '',
} = {}) {
  const label = filename || language.toUpperCase();

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
        <pre class="code-block__pre"><code class="code-block__code language-${language}">${highlight(code, language)}</code></pre>
      </div>
    </div>
  `;
}

const _KW = {
  javascript: new Set(['break','case','catch','class','const','constructor','continue','debugger','default','delete','do','else','export','extends','false','finally','for','from','function','if','import','in','instanceof','let','new','null','of','return','static','super','switch','this','throw','true','try','typeof','undefined','var','void','while','yield','async','await']),
  typescript: new Set(['break','case','catch','class','const','constructor','continue','default','delete','do','else','enum','export','extends','false','finally','for','from','function','if','implements','import','in','instanceof','interface','let','new','null','of','private','protected','public','readonly','return','static','super','switch','this','throw','true','try','type','typeof','undefined','var','void','while','abstract','async','await','declare','namespace','override']),
  java:       new Set(['abstract','assert','boolean','break','byte','case','catch','char','class','continue','default','do','double','else','enum','extends','false','final','finally','float','for','if','implements','import','instanceof','int','interface','long','native','new','null','package','private','protected','public','return','short','static','strictfp','super','switch','synchronized','this','throw','throws','transient','true','try','var','void','volatile','while']),
  python:     new Set(['and','as','assert','async','await','break','class','continue','def','del','elif','else','except','finally','false','for','from','global','if','import','in','is','lambda','none','nonlocal','not','or','pass','raise','return','true','try','while','with','yield','self','super','print']),
  csharp:     new Set(['abstract','as','base','bool','break','byte','case','catch','char','class','const','continue','decimal','default','delegate','do','double','else','enum','event','explicit','extern','false','finally','fixed','float','for','foreach','goto','if','implicit','in','int','interface','internal','is','lock','long','namespace','new','null','object','operator','out','override','params','private','protected','public','readonly','ref','return','sbyte','sealed','short','sizeof','stackalloc','static','string','struct','switch','this','throw','true','try','typeof','uint','ulong','unchecked','unsafe','ushort','using','var','virtual','void','volatile','while']),
};

function highlight(code, lang) {
  const keywords = _KW[lang] || _KW.javascript;
  const isPython = lang === 'python';
  const out = [];
  let i = 0;
  const n = code.length;

  while (i < n) {
    if (
      (code[i] === '/' && code[i + 1] === '/') ||
      (isPython && code[i] === '#')
    ) {
      const end = code.indexOf('\n', i);
      const tok = end === -1 ? code.slice(i) : code.slice(i, end);
      out.push(`<span class="token-comment">${_esc(tok)}</span>`);
      i += tok.length;
      continue;
    }

    if (code[i] === '/' && code[i + 1] === '*') {
      const end = code.indexOf('*/', i + 2);
      const tok = end === -1 ? code.slice(i) : code.slice(i, end + 2);
      out.push(`<span class="token-comment">${_esc(tok)}</span>`);
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
      out.push(`<span class="token-string">${_esc(code.slice(i, j))}</span>`);
      i = j;
      continue;
    }

    if (code[i] >= '0' && code[i] <= '9') {
      let j = i + 1;
      while (j < n && (code[j] >= '0' && code[j] <= '9' || code[j] === '.' || code[j] === '_')) j++;
      out.push(`<span class="token-number">${_esc(code.slice(i, j))}</span>`);
      i = j;
      continue;
    }

    if (/[a-zA-Z_$@]/.test(code[i])) {
      if (code[i] === '@') {
        out.push(`<span class="token-punctuation">@</span>`);
        i++;
        continue;
      }

      let j = i + 1;
      while (j < n && /[a-zA-Z0-9_$]/.test(code[j])) j++;
      const word = code.slice(i, j);

      if (keywords.has(word.toLowerCase()) && keywords.has(word)) {
        out.push(`<span class="token-keyword">${_esc(word)}</span>`);
      } else if (/^[A-Z]/.test(word)) {
        out.push(`<span class="token-class">${_esc(word)}</span>`);
      } else {
        let k = j;
        while (k < n && (code[k] === ' ' || code[k] === '\t')) k++;
        if (code[k] === '(') {
          out.push(`<span class="token-function">${_esc(word)}</span>`);
        } else {
          out.push(_esc(word));
        }
      }
      i = j;
      continue;
    }

    if ('{}[]();,.<>!&|+-*/%^~=:?'.includes(code[i])) {
      out.push(`<span class="token-punctuation">${_esc(code[i])}</span>`);
      i++;
      continue;
    }

    out.push(_esc(code[i]));
    i++;
  }

  return out.join('');
}

function _esc(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
