(() => {
 document.querySelectorAll('[data-guide-explorer]').forEach(root => {
  const tabs = [...root.querySelectorAll('[data-explorer-tab]')];
  const panels = [...root.querySelectorAll('[data-explorer-panel]')];
  const tablist = root.querySelector('[data-explorer-tabs]');
  const byId = new Map(panels.map(panel => [panel.id, panel]));
  const idOf = tab => tab.getAttribute('href').slice(1);
  if (!tablist || !tabs.length || tabs.some(tab => !byId.has(idOf(tab)))) return;

  tablist.setAttribute('role', 'tablist');
  tabs.forEach(tab => {
   tab.setAttribute('role', 'tab');
   tab.setAttribute('aria-controls', idOf(tab));
   const panel = byId.get(idOf(tab));
   panel.setAttribute('role', 'tabpanel');
   panel.setAttribute('aria-labelledby', tab.id);
   panel.tabIndex = 0;
  });

  function select(id, { focus = false, updateUrl = false } = {}) {
   if (!byId.has(id)) return;
   tabs.forEach(tab => {
    const selected = idOf(tab) === id;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    byId.get(idOf(tab)).hidden = !selected;
    if (selected && focus) tab.focus({ preventScroll: true });
   });
   if (updateUrl && location.hash !== '#' + id) {
    const oldURL = location.href;
    // Do not clone the reader's history-entry key into a new selection.
    // The reader owns its scroll restoration; we only restore the active tab.
    history.pushState(null, '', '#' + id);
    window.dispatchEvent(new HashChangeEvent('hashchange', { oldURL, newURL: location.href }));
   }
   window.guideSyncLanguage?.();
  }

  function fromHash() {
   let id = '';
   try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
   if (byId.has(id)) select(id);
   else if (!id) select(root.dataset.explorerDefault);
  }

  tabs.forEach((tab, index) => {
   tab.addEventListener('click', event => {
    if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    select(idOf(tab), { updateUrl: true });
    // On narrow screens the grouped map can fill the viewport. Bring the
    // selected summary into view when its heading would otherwise be missed.
    // Arrow-key navigation keeps the map and keyboard focus in place.
    const panel = byId.get(idOf(tab));
    if (matchMedia('(max-width: 620px)').matches && panel.getBoundingClientRect().top > innerHeight - 120) {
     panel.scrollIntoView({
      block: 'start',
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
     });
    }
   });
   tab.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    let next;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else if (event.key === ' ') next = index;
    else return;
    event.preventDefault();
    select(idOf(tabs[next]), { focus: true, updateUrl: true });
   });
  });

  root.classList.add('is-enhanced');
  select(root.dataset.explorerDefault);
  fromHash();
  window.addEventListener('hashchange', fromHash);
  window.addEventListener('popstate', fromHash);
 });
})();
