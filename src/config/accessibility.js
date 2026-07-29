// Хранилище и применение настроек виджета доступности.
// Все опции живут в одном объекте в localStorage и применяются как классы на <body>.

export const STORAGE_KEY = 'dpa-a11y';

export const FONT_SIZES     = ['normal', 'large', 'xlarge'];
export const CONTRAST_MODES = ['normal', 'high', 'invert'];

const DEFAULTS = {
  fontSize:       'normal',
  contrast:       'normal',
  monochrome:     false,
  readableFont:   false,
  underlineLinks: false,
};

let _state = { ...DEFAULTS };

export function getA11yState() {
  return { ..._state };
}

// Вызывается один раз при старте приложения — читает сохранённые настройки и применяет их.
export function restoreA11y() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      _state = { ...DEFAULTS, ...JSON.parse(saved) };
    } catch {
      _state = { ...DEFAULTS };
    }
  }
  _apply();
}

export function setA11y(patch) {
  _state = { ..._state, ...patch };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(_state));
  _apply();
}

export function resetA11y() {
  _state = { ...DEFAULTS };
  localStorage.removeItem(STORAGE_KEY);
  _apply();
}

function _apply() {
  const body = document.body;

  FONT_SIZES.forEach(size => body.classList.remove(`a11y-font-${size}`));
  if (_state.fontSize !== 'normal') body.classList.add(`a11y-font-${_state.fontSize}`);

  CONTRAST_MODES.forEach(mode => body.classList.remove(`a11y-contrast-${mode}`));
  if (_state.contrast !== 'normal') body.classList.add(`a11y-contrast-${_state.contrast}`);

  body.classList.toggle('a11y-monochrome',      _state.monochrome);
  body.classList.toggle('a11y-readable-font',   _state.readableFont);
  body.classList.toggle('a11y-underline-links', _state.underlineLinks);
}
