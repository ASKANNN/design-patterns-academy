export function switchTab(tab) {
  const tablist = tab.closest('[role="tablist"]');
  if (!tablist) return;

  const tabs    = [...tablist.querySelectorAll('[role="tab"]')];
  const panels  = tabs.map(t => document.getElementById(t.getAttribute('aria-controls')));

  tabs.forEach((t, i) => {
    const isActive = t === tab;
    t.setAttribute('aria-selected', String(isActive));
    t.setAttribute('tabindex', isActive ? '0' : '-1');
    if (panels[i]) panels[i].hidden = !isActive;
  });

  tab.focus();
}

export function navigateTabs(tab, key) {
  const tablist = tab.closest('[role="tablist"]');
  const tabs    = [...tablist.querySelectorAll('[role="tab"]')];
  const idx     = tabs.indexOf(tab);
  const next    = key === 'ArrowRight'
    ? tabs[(idx + 1) % tabs.length]
    : tabs[(idx - 1 + tabs.length) % tabs.length];
  if (next) switchTab(next);
}
