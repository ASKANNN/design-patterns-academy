import { localise, t } from '../../utils/i18n.js';

export function Walkthrough({ id, steps = [], lang } = {}) {
  if (!steps.length) return '';

  const total = steps.length;

  const stepBlocks = steps.map((s, i) => `
    <div class="walkthrough__step" data-walkthrough-step data-walkthrough-lines="${s.lines[0]}-${s.lines[1]}" ${i === 0 ? '' : 'hidden'}>
      <p class="walkthrough__progress">${t('patterns.walkthrough.step_progress', { current: i + 1, total })}</p>
      <h4 class="walkthrough__title">${localise(s.title, lang)}</h4>
      <p class="walkthrough__explanation">${localise(s.explanation, lang)}</p>
    </div>
  `).join('');

  const dots = steps.map((_, i) =>
    `<span class="walkthrough__dot${i === 0 ? ' is-active' : ''}" data-walkthrough-dot></span>`
  ).join('');

  return `
    <div class="walkthrough" data-walkthrough="${id}" id="${id}">
      <div class="walkthrough__steps">
        ${stepBlocks}
      </div>
      <div class="walkthrough__nav">
        <button type="button" class="btn btn--secondary btn--sm walkthrough__prev" data-walkthrough-prev disabled>${t('patterns.walkthrough.prev')}</button>
        <span class="walkthrough__dots" data-walkthrough-dots aria-hidden="true">${dots}</span>
        <button type="button" class="btn btn--primary btn--sm walkthrough__next" data-walkthrough-next data-label-next="${t('patterns.walkthrough.next')}" data-label-restart="${t('patterns.walkthrough.restart')}">${t('patterns.walkthrough.next')}</button>
      </div>
    </div>
  `;
}
