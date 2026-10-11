'use strict';
// Review candidate. No analytics, cookies, account creation, message delivery,
// payment, signing, live lookup or form submission occurs in this illustration.
(function () {
  const menuButton = document.querySelector('.menu-button');
  const menu = document.getElementById('mobile-nav');
  function closeMenu(returnFocus) {
    menu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    if (returnFocus) menuButton.focus();
  }
  menuButton.addEventListener('click', function () {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menu.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => closeMenu(false)));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !menu.hidden) closeMenu(true);
  });
  const desktop = window.matchMedia('(min-width: 901px)');
  const syncMenu = e => { if (e.matches) closeMenu(false); };
  if (desktop.addEventListener) desktop.addEventListener('change', syncMenu);

  function makeTabs(selector) {
    const tabs = [...document.querySelectorAll(selector)];
    function select(tab, moveFocus) {
      if (!tabs.includes(tab)) return;
      tabs.forEach(item => {
        const selected = item === tab;
        item.setAttribute('aria-selected', String(selected));
        item.tabIndex = selected ? 0 : -1;
        document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
      });
      if (moveFocus) tab.focus({ preventScroll: true });
    }
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(tab, false));
      tab.addEventListener('keydown', e => {
        let next;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % tabs.length;
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i + tabs.length - 1) % tabs.length;
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = tabs.length - 1;
        else return;
        e.preventDefault(); select(tabs[next], true);
      });
    });
    return select;
  }
  const selectJourney = makeTabs('.journey-tab');
  makeTabs('.start-tab');
  function goJourney(key, scroll) {
    const tab = document.getElementById('journey-tab-' + key);
    if (!tab) return;
    selectJourney(tab, true);
    if (scroll) document.getElementById('workflow').scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
  document.querySelectorAll('[data-journey]').forEach(b => b.addEventListener('click', () => goJourney(b.dataset.journey, false)));
  document.querySelectorAll('[data-open-journey]').forEach(a => a.addEventListener('click', () => goJourney(a.dataset.openJourney, false)));
  document.querySelectorAll('[data-jump]').forEach(b => b.addEventListener('click', () => {
    const key = b.dataset.jump;
    if (['research', 'pricing', 'documents', 'ongoing'].includes(key)) goJourney(key, true);
    else {
      const target = document.getElementById(key);
      if (target) {
        target.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
        const heading = target.querySelector('h2');
        if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
      }
    }
  }));
  // One public, reviewed plan projection is embedded at build time. It is NOT
  // backend billing authority or proof that current provider prices match it.
  try {
    const catalog = JSON.parse(document.getElementById('public-plan-data').textContent);
    const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: catalog.currency, maximumFractionDigits: 0 });
    document.querySelectorAll('[data-billing]').forEach(button => button.addEventListener('click', () => {
      const annual = button.dataset.billing === 'annual';
      document.querySelectorAll('[data-billing]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      catalog.plans.forEach(plan => {
        document.querySelector('[data-price="' + plan.id + '"]').textContent = money.format(annual ? plan.annual_total / 12 : plan.monthly);
        document.querySelector('[data-bill="' + plan.id + '"]').textContent = annual
          ? money.format(plan.annual_total) + ' billed annually. Save ' + money.format(plan.monthly * 12 - plan.annual_total) + ' vs monthly billing.'
          : money.format(plan.monthly) + ' billed monthly.';
      });
      document.querySelectorAll('[data-equivalent]').forEach(e => { e.hidden = !annual; });
      document.getElementById('billing-status').textContent = annual
        ? 'Annual billing selected. Monthly equivalents and full annual totals are displayed.'
        : 'Monthly billing selected. Monthly totals are displayed.';
    }));
  } catch (_) {
    // Fail to the already-rendered, readable monthly snapshot, never to a
    // partially updated price or a broken purchase action.
    document.querySelector('.billing-switch').hidden = true;
  }
})();
