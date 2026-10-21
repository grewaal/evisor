/* Evisor landing v2 — behaviour. No dependencies. Everything reads from
   window.EVISOR_CONFIG (assets/v2/config.js); the HTML already carries the
   same defaults, so the page is complete without this file. */
(function () {
  'use strict';

  var C = window.EVISOR_CONFIG || {};
  var LINKS = C.links || {};
  var doc = document;
  var root = doc.documentElement;
  var params = new URLSearchParams(location.search);
  var reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches;
  var hasIO = 'IntersectionObserver' in window;

  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function money(n) { return (C.currency && C.currency.symbol || '$') + Number(n).toLocaleString('en-US'); }
  function once(fn) { var done = false; return function () { if (!done) { done = true; fn.apply(this, arguments); } }; }
  function store(key, val) { try { if (val === undefined) return localStorage.getItem(key); localStorage.setItem(key, val); } catch (e) { return null; } }

  /* ------------------------------------------------------------------
     Experiments (A/B). Off unless enabled in config or forced by ?hero=
     ------------------------------------------------------------------ */
  var heroVariant = null;
  (function () {
    var exp = C.experiments && C.experiments.hero;
    if (!exp || !exp.variants) return;
    var forced = (params.get('hero') || '').toLowerCase();
    var keys = Object.keys(exp.variants);
    if (forced && exp.variants[forced]) heroVariant = forced;
    else if (exp.enabled) {
      heroVariant = store('evisor_exp_hero');
      if (!heroVariant || !exp.variants[heroVariant]) {
        heroVariant = keys[Math.floor(Math.random() * keys.length)];
        store('evisor_exp_hero', heroVariant);
      }
    }
    if (!heroVariant || heroVariant === 'a') return;
    var v = exp.variants[heroVariant];
    var h1 = $('[data-hero-h1]'), sub = $('[data-hero-sub]');
    if (h1 && v.h1) h1.innerHTML = v.h1;
    if (sub && v.sub) sub.textContent = v.sub;
  })();

  /* ------------------------------------------------------------------
     Analytics: GA4 only, only after consent (behaviour kept from v1, F-14)
     ------------------------------------------------------------------ */
  var GA_ID = (C.analytics && C.analytics.gaId) || 'G-B4347EDBV9';
  var CONSENT_KEY = (C.analytics && C.analytics.consentKey) || 'evisor_analytics_consent';
  var gaLoaded = false;

  function loadGA() {
    if (gaLoaded) return;
    gaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
    var s = doc.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    doc.head.appendChild(s);
    if (heroVariant) track('experiment_exposure', { experiment: 'hero', variant: heroVariant });
  }
  function clearGACookies() {
    var names = ['_ga', '_ga_' + GA_ID.replace(/^G-/, ''), '_gid', '_gat', '_gat_gtag_' + GA_ID.replace(/-/g, '_')];
    var host = location.hostname;
    ['', ';domain=' + host, ';domain=.' + host, ';domain=.evisor.app'].forEach(function (d) {
      names.forEach(function (n) { doc.cookie = n + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/' + d; });
    });
  }
  /** Sends an event only when the visitor has accepted analytics. */
  function track(name, data) {
    if (!gaLoaded || typeof window.gtag !== 'function') return;
    var payload = Object.assign({}, data || {});
    if (heroVariant) payload.hero_variant = heroVariant;
    window.gtag('event', name, payload);
  }

  var banner = null, lastFocus = null;
  function buildBanner() {
    if (banner) return banner;
    banner = doc.getElementById('cookie-consent');
    if (!banner) {
      banner = doc.createElement('div');
      banner.id = 'cookie-consent';
      banner.setAttribute('role', 'dialog');
      banner.setAttribute('aria-modal', 'false');
      banner.setAttribute('aria-labelledby', 'cc-title');
      banner.setAttribute('aria-describedby', 'cc-desc');
      banner.hidden = true;
      banner.innerHTML =
        '<p><strong id="cc-title">Analytics cookies</strong><span id="cc-desc">We use Google Analytics to understand how visitors use this site. It only loads if you accept. Necessary cookies for the site to work are always on. See our <a href="' + (LINKS.cookies || 'https://my.evisor.app/cookie-policy') + '" target="_blank" rel="noopener noreferrer">Cookie Policy</a>.</span></p>' +
        '<div class="cc-actions"><button type="button" class="cc-reject" data-choice="denied">Reject analytics</button><button type="button" class="cc-accept" data-choice="granted">Accept analytics</button></div>';
      doc.body.appendChild(banner);
    }
    banner.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-choice]');
      if (b) choose(b.getAttribute('data-choice'));
    });
    return banner;
  }
  function showBanner(focusIt) {
    buildBanner();
    lastFocus = doc.activeElement;
    banner.hidden = false;
    root.classList.add('cc-open');
    if (focusIt) { var b = banner.querySelector('button'); if (b) b.focus(); }
  }
  function hideBanner() {
    if (!banner) return;
    banner.hidden = true;
    root.classList.remove('cc-open');
    if (lastFocus && lastFocus.focus && lastFocus !== doc.body) { try { lastFocus.focus(); } catch (e) {} }
  }
  function choose(v) {
    store(CONSENT_KEY, v);
    if (v === 'granted') loadGA(); else clearGACookies();
    hideBanner();
  }
  window.EvisorConsent = { get: function () { return store(CONSENT_KEY); }, openSettings: function () { showBanner(true); } };
  (function () {
    var stored = store(CONSENT_KEY);
    buildBanner();
    if (stored === 'granted') loadGA();
    else { clearGACookies(); if (stored !== 'denied') showBanner(false); }
  })();
  $$('[data-cookie-settings]').forEach(function (b) { b.addEventListener('click', function () { showBanner(true); }); });

  /* ------------------------------------------------------------------
     Links: signup URLs carry plan, billing and any utm_* from this visit
     ------------------------------------------------------------------ */
  var REGISTER = LINKS.register || 'https://my.evisor.app/register';
  var billing = (C.defaultBilling === 'monthly') ? 'monthly' : 'annual';
  var utm = [];
  params.forEach(function (v, k) { if (/^utm_/i.test(k) && v) utm.push([k, v]); });

  function registerUrl(plan) {
    var u = new URL(REGISTER);
    if (plan) { u.searchParams.set('plan', plan); u.searchParams.set('billing', billing); }
    utm.forEach(function (p) { u.searchParams.set(p[0], p[1]); });
    return u.toString();
  }
  function syncCtaLinks() {
    $$('a[data-cta]').forEach(function (a) {
      if (a.getAttribute('href').indexOf('my.evisor.app/register') === -1) return;
      a.href = registerUrl(a.getAttribute('data-plan') || null);
    });
  }
  $$('a[data-link]').forEach(function (a) { var k = a.getAttribute('data-link'); if (LINKS[k]) a.href = LINKS[k]; });

  doc.addEventListener('click', function (e) {
    var a = e.target.closest('a[data-cta]');
    if (!a) return;
    track('cta_click', { cta_id: a.getAttribute('data-cta'), plan: a.getAttribute('data-plan') || '', billing: a.getAttribute('data-plan') ? billing : '', link_url: a.href });
  });

  /* ------------------------------------------------------------------
     Config-driven copy (coverage, prices, build, promise, proof)
     ------------------------------------------------------------------ */
  var coverage = (C.coverage && C.coverage.live) || [];
  function listNames(items) {
    var n = items.map(function (x) { return x.name; });
    if (n.length < 2) return n.join('');
    return n.slice(0, -1).join(', ') + ' and ' + n[n.length - 1];
  }
  if (coverage.length) $$('[data-coverage-list]').forEach(function (el) { el.textContent = listNames(coverage); });

  var plans = C.plans || [];
  function plan(key) { for (var i = 0; i < plans.length; i++) if (plans[i].key === key) return plans[i]; return null; }
  var paid = plans.filter(function (p) { return p.price && p.price.monthly > 0; });
  var fromPrice = paid.length ? Math.min.apply(null, paid.map(function (p) { return p.price.annualMonthly; })) : null;
  if (fromPrice !== null) $$('[data-from-price]').forEach(function (el) { el.textContent = money(fromPrice); });
  var maxSave = 0;
  paid.forEach(function (p) { var s = 1 - p.price.annualTotal / (p.price.monthly * 12); if (s > maxSave) maxSave = s; });
  $$('[data-save-label]').forEach(function (el) { el.textContent = maxSave ? 'Save up to ' + Math.round(maxSave * 100) + '%' : (C.annualSavingLabel || ''); });

  var pb = C.practiceBuild;
  var buildEl = $('[data-build]');
  if (buildEl) {
    if (pb && pb.enabled === false) buildEl.hidden = true;
    else if (pb) {
      var inc = plan(pb.includesPlan);
      var priceEl = $('[data-build-price]', buildEl);
      if (priceEl) priceEl.textContent = money(pb.price);
      var incEl = $('[data-build-includes]', buildEl);
      if (incEl && inc) incEl.textContent = 'Includes ' + pb.includesMonths + ' months of ' + inc.name + ' (' + money(Math.round(inc.price.annualTotal * pb.includesMonths / 12)) + ' of it). Nothing to pay on top.';
      var capEl = $('[data-build-capacity]', buildEl);
      if (capEl && pb.capacityNote) capEl.textContent = pb.capacityNote;
    }
  }
  if (C.promise && C.promise.enabled === false) $$('[data-promise]').forEach(function (el) { el.hidden = true; });

  (function proof() {
    var P = C.proof || {};
    var f = P.founder || {};
    if (f.name) { var n = $('[data-founder-name]'); if (n) n.textContent = f.name; }
    if (f.role) { var r = $('[data-founder-role]'); if (r) r.textContent = f.role; }
    if (f.photo) { var av = $('[data-founder-avatar]'); if (av) av.innerHTML = '<img src="' + f.photo + '" alt="" width="46" height="46" loading="lazy">'; }

    var real = P.testimonials || [];
    var placeholder = !real.length && (C.PROOF_PLACEHOLDER === true || params.get('proof') === 'placeholder');
    var list = real.length ? real : (placeholder ? (P.placeholderTestimonials || []) : []);
    var box = $('[data-proof]');
    if (!box || !list.length) return;
    var grid = $('[data-proof-grid]', box);
    grid.innerHTML = list.map(function (t) {
      var esc = function (s) { return String(s || '').replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
      return '<figure class="tcard' + (placeholder ? ' is-placeholder' : '') + '"><blockquote>“' + esc(t.quote) + '”</blockquote>' +
        '<figcaption class="tc-person"><span class="tc-avatar">' + (t.photo ? '<img src="' + esc(t.photo) + '" alt="" width="42" height="42" loading="lazy">' : '') + '</span>' +
        '<span><span class="tc-name">' + esc(t.name) + '</span><br><span class="tc-meta">' + esc(t.practice) + ' · ' + esc(t.location) + '</span></span></figcaption></figure>';
    }).join('');
    var flag = $('[data-proof-flag]', box);
    if (flag) flag.hidden = !placeholder;
    box.hidden = false;
  })();

  /* ------------------------------------------------------------------
     Pricing: render plans, billing toggle, finder, one-client maths
     ------------------------------------------------------------------ */
  var plansEl = $('[data-plans]');
  var CHECK = '<svg aria-hidden="true"><use href="#i-check"/></svg>';
  var CROSS = '<svg aria-hidden="true"><use href="#i-x"/></svg>';
  function renderPlans() {
    if (!plansEl || !plans.length) return;
    plansEl.innerHTML = plans.map(function (p) {
      var isFree = !p.price || p.price.monthly === 0;
      var btnClass = p.recommended ? 'btn btn-primary btn-plain' : 'btn btn-secondary btn-plain';
      return '<article class="plan' + (p.recommended ? ' is-rec' : '') + '" id="plan-' + p.key + '" data-plan-card="' + p.key + '">' +
        (p.badge ? '<span class="plan-badge">' + p.badge + '</span>' : '') +
        '<h3 class="plan-name">' + p.name + '</h3>' +
        '<p class="plan-tag">' + p.tagline + '</p>' +
        '<div class="plan-price"><span class="plan-amt" data-amt>' + money(isFree ? 0 : p.price.annualMonthly) + '</span><span class="plan-per">' + (isFree ? '' : '/mo') + '</span></div>' +
        '<p class="plan-billed" data-billed>' + (isFree ? (p.priceNote || '') : '') + '</p>' +
        '<a class="' + btnClass + '" href="' + REGISTER + '" data-cta="plan_' + p.key + '"' + (p.ctaPlanParam ? ' data-plan="' + p.ctaPlanParam + '"' : '') + '>' + p.cta + '</a>' +
        '<ul class="plan-feat">' + p.features.map(function (f) { return '<li' + (f.off ? ' class="is-off"' : '') + '>' + (f.off ? CROSS : CHECK) + '<span>' + f.text + '</span></li>'; }).join('') + '</ul>' +
        (p.footnote ? '<p class="plan-foot">' + p.footnote + '</p>' : '') +
        '</article>';
    }).join('');
    applyBilling(false);
  }
  function applyBilling(animate) {
    if (!plansEl) return;
    plans.forEach(function (p) {
      var card = $('[data-plan-card="' + p.key + '"]', plansEl);
      if (!card || !p.price || p.price.monthly === 0) return;
      var amt = $('[data-amt]', card), billed = $('[data-billed]', card);
      var save = p.price.monthly * 12 - p.price.annualTotal;
      amt.textContent = money(billing === 'annual' ? p.price.annualMonthly : p.price.monthly);
      billed.textContent = billing === 'annual'
        ? 'Billed ' + money(p.price.annualTotal) + ' a year · you save ' + money(save)
        : 'Billed monthly · ' + money(p.price.annualMonthly) + '/mo if paid yearly';
      if (animate && !reduceMotion) { amt.classList.remove('is-swap'); void amt.offsetWidth; amt.classList.add('is-swap'); }
    });
    syncCtaLinks();
  }
  renderPlans();
  syncCtaLinks();

  var toggle = $('[data-billing]');
  function placeThumb() {
    if (!toggle) return;
    var on = $('[aria-checked="true"]', toggle);
    if (!on) return;
    toggle.style.setProperty('--tw', on.offsetWidth + 'px');
    toggle.style.setProperty('--tx', on.offsetLeft + 'px');
  }
  if (toggle) {
    var opts = $$('[data-billing-opt]', toggle);
    var setBilling = function (val, focus) {
      billing = val;
      opts.forEach(function (b) {
        var on = b.getAttribute('data-billing-opt') === val;
        b.setAttribute('aria-checked', on ? 'true' : 'false');
        b.tabIndex = on ? 0 : -1;
        if (on && focus) b.focus();
      });
      requestAnimationFrame(placeThumb);
      applyBilling(true);
    };
    opts.forEach(function (b) {
      b.addEventListener('click', function () { var v = b.getAttribute('data-billing-opt'); if (v !== billing) { setBilling(v); track('billing_toggle', { billing: v }); } });
      b.addEventListener('keydown', function (e) {
        if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].indexOf(e.key) === -1) return;
        e.preventDefault();
        var next = billing === 'annual' ? 'monthly' : 'annual';
        setBilling(next, true); track('billing_toggle', { billing: next });
      });
    });
    setBilling(billing);
    window.addEventListener('resize', function () { requestAnimationFrame(placeThumb); });
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(placeThumb);
  }

  $$('[data-finder-pick]').forEach(function (b, _, all) {
    b.addEventListener('click', function () {
      var key = b.getAttribute('data-finder-pick');
      all.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      $$('.plan').forEach(function (c) { c.classList.toggle('is-picked', c.getAttribute('data-plan-card') === key); });
      var card = $('#plan-' + key);
      if (card) card.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
      track('plan_finder', { answer: key });
    });
  });

  (function roi() {
    var input = $('[data-roi-input]');
    if (!input) return;
    var practice = plan('practice');
    var feeOut = $('[data-roi-fee]'), out = $('[data-roi-out]');
    var report = once(function (band) { track('roi_calculator', { fee_band: band }); });
    var update = function (fromUser) {
      var fee = Number(input.value);
      var min = Number(input.min), max = Number(input.max);
      input.style.setProperty('--pct', ((fee - min) / (max - min) * 100) + '%');
      feeOut.textContent = money(fee);
      if (practice) {
        var yearly = fee * 12, cost = practice.price.annualTotal;
        var bc = $('[data-roi-bar-client]'), bk = $('[data-roi-bar-cost]');
        if (bc && bk) {
          var top = Math.max(yearly, cost);
          bc.style.setProperty('--w', (yearly / top * 100).toFixed(1) + '%');
          bk.style.setProperty('--w', (cost / top * 100).toFixed(1) + '%');
          $('[data-roi-v-client]').textContent = money(yearly);
          $('[data-roi-v-cost]').textContent = money(cost);
        }
        var times = yearly / cost;
        out.innerHTML = money(fee) + ' a month is <b class="tnum">' + money(yearly) + '</b> a year. ' + practice.name + ', billed annually, is <b class="tnum">' + money(cost) + '</b> a year. <span class="roi-x">One client covers it <b class="tnum">' + times.toFixed(1) + '×</b> over.</span>';
      }
      if (fromUser) report(fee < 300 ? 'under_300' : fee < 600 ? '300_599' : fee < 1000 ? '600_999' : '1000_plus');
    };
    input.addEventListener('input', function () { update(true); });
    update(false);
  })();

  /* ------------------------------------------------------------------
     Mock canvases: fixed-size designs zoomed to fit their frame
     ------------------------------------------------------------------ */
  (function zoomCanvases() {
    var canvases = $$('[data-mk-canvas]');
    if (!canvases.length) return;
    var apply = function (cv, avail) {
      var w = Number(getComputedStyle(cv).getPropertyValue('--mk-w')) || 600;
      if (avail) cv.style.setProperty('--mk-z', Math.min(avail / w, 1.3).toFixed(4));
    };
    if ('ResizeObserver' in window) {
      var ro = new ResizeObserver(function (entries) {
        entries.forEach(function (en) { var cv = en.target.querySelector('[data-mk-canvas]'); if (cv) apply(cv, en.contentRect.width); });
      });
      canvases.forEach(function (cv) { ro.observe(cv.parentElement); });
    } else {
      var all = function () { canvases.forEach(function (cv) { apply(cv, cv.parentElement.clientWidth); }); };
      all(); window.addEventListener('resize', all);
    }
  })();

  /* ------------------------------------------------------------------
     Hero: the Find Clients workbench, clickable
     ------------------------------------------------------------------ */
  (function heroMock() {
    var app = $('[data-hero-mock]');
    if (!app) return;
    var rows = [
      { masked: 'Ce ••••••••', name: 'Cedar Ridge Auto Care', lane: 'In your area · contactable', place: 'Lakewood · 80226',
        why: 'Matches your selected area and has a published contact route. No industry or size preference was applied — add one in Filters to narrow this list.',
        bullets: ['Within your selected geography', 'An approved contact route is published'],
        routes: 'email, phone, website', contact: [['i-mail', 'info@cedarridge.example'], ['i-phone', '+1 303 555 0142'], ['i-globe', 'cedarridge.example']] },
      { masked: 'Ha ••••••••', name: 'Harbor Lane Dental Studio', lane: 'Strong fit · contactable', place: 'Beaverton · 97005',
        why: 'Every evaluable criterion matches and an approved contact route is published; no timing evidence is required.',
        bullets: ['Within your selected geography', 'Matches an industry you prefer', 'An approved contact route is published'],
        routes: 'phone, website', contact: [['i-phone', '+1 503 555 0118'], ['i-globe', 'harborlane.example']] },
      { masked: 'Bl ••••••••', name: 'Bluestone Hair Collective', lane: 'Potential fit · important unknowns', place: 'Brooklyn · 11215',
        why: 'At least one important criterion is unknown (maturity). No established criterion mismatches, so the business is a potential match that needs confirmation.',
        bullets: ['Within your selected geography', 'An approved contact route is published'],
        routes: 'email, phone', contact: [['i-mail', 'hello@bluestone.example'], ['i-phone', '+1 718 555 0190']] },
      { masked: 'Pi ••••••••', name: 'Pinecrest Landscaping Co.', lane: 'Strong fit · research required', place: 'Fort Collins · 80521',
        why: 'Every evaluable criterion matches, but no approved contact route is published in the selected scope, so research is required.',
        bullets: ['Within your selected geography', 'Matches an industry you prefer'],
        routes: '', contact: [] }
    ];
    var revealed = {};
    var current = 1;
    var unlocks = 62;
    var els = {
      name: $('[data-d-name]', app), meta: $('[data-d-meta]', app), why: $('[data-d-why]', app), bullets: $('[data-d-bullets]', app),
      reachH: $('[data-d-reach-h]', app), reach: $('[data-d-reach]', app), action: $('[data-d-action]', app), note: $('[data-d-note]', app),
      reveal: $('[data-d-reveal]', app), detail: $('[data-mk-detail]', app), toast: $('[data-mk-toast]', app), unlocks: $('[data-mk-unlocks]', app)
    };
    var toastTimer = null;
    function icon(id) { return '<svg><use href="#' + id + '"/></svg>'; }
    function paint(i, animate) {
      var r = rows[i], isRev = revealed[i];
      els.name.textContent = isRev === 'ok' ? r.name : r.masked;
      els.meta.textContent = r.lane + ' · ' + r.place + ' · Lead Foundry';
      els.why.textContent = r.why;
      els.bullets.innerHTML = r.bullets.map(function (b) { return '<li>' + b + '</li>'; }).join('');
      els.action.classList.remove('is-done', 'is-returned');
      els.reveal.hidden = false;
      if (isRev === 'ok') {
        els.action.classList.add('is-done');
        els.note.textContent = 'Revealed — contact details are shown below.';
        els.reveal.hidden = true;
        els.reachH.textContent = 'Contact details';
        els.reach.innerHTML = r.contact.map(function (c) { return '<p class="mk-kv">' + icon(c[0]) + c[1] + '</p>'; }).join('');
      } else if (isRev === 'returned') {
        els.action.classList.add('is-returned');
        els.note.textContent = 'No contact route was delivered — your unlock was returned.';
        els.reveal.hidden = true;
        els.reachH.textContent = 'How to reach them';
        els.reach.innerHTML = '<p>No contact route reported. Research is required before outreach.</p>';
      } else {
        els.note.textContent = 'Uses 1 unlock. If a promised contact route fails its evidence check, that unlock is returned.';
        els.reachH.textContent = 'How to reach them';
        els.reach.innerHTML = r.routes
          ? '<p>Reported routes: ' + r.routes + '. The values are shown after you reveal.</p>'
          : '<p>No contact route reported.</p>';
      }
      $$('.mk-row', app).forEach(function (row) {
        var on = Number(row.getAttribute('data-row')) === i;
        row.classList.toggle('is-sel', on);
        $('em', row).textContent = on ? 'Selected' : (revealed[row.getAttribute('data-row')] === 'ok' ? 'Revealed' : 'Review');
      });
      if (animate && !reduceMotion) { els.detail.classList.remove('is-swap'); void els.detail.offsetWidth; els.detail.classList.add('is-swap'); }
    }
    function toast(msg) {
      $('span', els.toast).textContent = msg;
      els.toast.classList.add('is-on');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function () { els.toast.classList.remove('is-on'); }, 2600);
    }
    function resolveName(i, done) {
      var target = rows[i].name;
      if (reduceMotion) { done(); return; }
      var glyphs = 'abcdefghijklmnopqrstuvwxyz';
      var frame = 0, total = 14;
      els.name.classList.add('is-resolving');
      (function step() {
        frame++;
        var k = Math.floor(target.length * frame / total);
        var s = target.slice(0, k);
        for (var j = k; j < target.length; j++) s += target[j] === ' ' ? ' ' : glyphs[(j * 7 + frame * 3) % 26];
        els.name.textContent = s;
        if (frame < total) requestAnimationFrame(function () { setTimeout(step, 28); });
        else { els.name.classList.remove('is-resolving'); done(); }
      })();
    }
    function doReveal(i, auto) {
      if (revealed[i]) return;
      var r = rows[i];
      els.reveal.classList.add('is-press');
      setTimeout(function () { els.reveal.classList.remove('is-press'); }, 160);
      if (!r.contact.length) {
        revealed[i] = 'returned';
        paint(i, true);
        toast('No route delivered — unlock returned.');
        return;
      }
      revealed[i] = 'ok';
      unlocks -= 1;
      els.unlocks.textContent = unlocks;
      els.unlocks.classList.remove('is-tick'); void els.unlocks.offsetWidth; els.unlocks.classList.add('is-tick');
      resolveName(i, function () { paint(i, false); toast('Revealed — contact details below.'); });
      if (!auto) track('demo_interaction', { demo: 'hero', action: 'reveal' });
    }
    var userTouched = false;
    app.addEventListener('click', function (e) {
      var row = e.target.closest('.mk-row');
      if (row) { userTouched = true; current = Number(row.getAttribute('data-row')); paint(current, true); track('demo_interaction', { demo: 'hero', action: 'select' }); return; }
      if (e.target.closest('[data-d-reveal]')) { userTouched = true; doReveal(current, false); }
    });
    paint(current, false);
    if (!reduceMotion) setTimeout(function () { if (!userTouched) doReveal(current, true); }, 1700);
  })();

  /* ------------------------------------------------------------------
     Evidence annotations ↔ panel spotlight
     ------------------------------------------------------------------ */
  (function annotations() {
    var list = $('[data-anno]'), panel = $('[data-anno-panel]');
    if (!list || !panel) return;
    var buttons = $$('[data-anno-key]', list);
    var pinned = null, tour = null;
    function light(key) {
      panel.classList.toggle('has-focus', !!key);
      $$('[data-anno-target]', panel).forEach(function (b) { b.classList.toggle('is-lit', b.getAttribute('data-anno-target') === key); });
      buttons.forEach(function (b) { b.classList.toggle('is-on', b.getAttribute('data-anno-key') === key); });
    }
    function stopTour() { if (tour) { clearInterval(tour); tour = null; } }
    buttons.forEach(function (b) {
      var key = b.getAttribute('data-anno-key');
      b.addEventListener('mouseenter', function () { stopTour(); light(key); });
      b.addEventListener('focus', function () { stopTour(); light(key); });
      b.addEventListener('click', function () { stopTour(); pinned = pinned === key ? null : key; light(pinned || key); track('evidence_annotation', { key: key }); });
    });
    list.addEventListener('mouseleave', function () { light(pinned); });
    list.addEventListener('focusout', function (e) { if (!list.contains(e.relatedTarget)) light(pinned); });
    if (reduceMotion || !hasIO) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.disconnect();
        var keys = buttons.map(function (b) { return b.getAttribute('data-anno-key'); });
        var i = 0;
        tour = setInterval(function () {
          if (i >= keys.length) { stopTour(); light(pinned); return; }
          light(keys[i++]);
        }, 1500);
      });
    }, { threshold: 0.55 });
    io.observe(panel);
  })();

  /* ------------------------------------------------------------------
     Coverage checker
     ------------------------------------------------------------------ */
  (function coverageChecker() {
    var form = $('[data-coverage-form]'), select = $('[data-coverage-select]'), out = $('[data-coverage-result]');
    if (!form || !select || !out) return;
    var states = [['AL', 'Alabama'], ['AK', 'Alaska'], ['AZ', 'Arizona'], ['AR', 'Arkansas'], ['CA', 'California'], ['CO', 'Colorado'], ['CT', 'Connecticut'], ['DE', 'Delaware'], ['DC', 'District of Columbia'], ['FL', 'Florida'], ['GA', 'Georgia'], ['HI', 'Hawaii'], ['ID', 'Idaho'], ['IL', 'Illinois'], ['IN', 'Indiana'], ['IA', 'Iowa'], ['KS', 'Kansas'], ['KY', 'Kentucky'], ['LA', 'Louisiana'], ['ME', 'Maine'], ['MD', 'Maryland'], ['MA', 'Massachusetts'], ['MI', 'Michigan'], ['MN', 'Minnesota'], ['MS', 'Mississippi'], ['MO', 'Missouri'], ['MT', 'Montana'], ['NE', 'Nebraska'], ['NV', 'Nevada'], ['NH', 'New Hampshire'], ['NJ', 'New Jersey'], ['NM', 'New Mexico'], ['NY', 'New York'], ['NC', 'North Carolina'], ['ND', 'North Dakota'], ['OH', 'Ohio'], ['OK', 'Oklahoma'], ['OR', 'Oregon'], ['PA', 'Pennsylvania'], ['RI', 'Rhode Island'], ['SC', 'South Carolina'], ['SD', 'South Dakota'], ['TN', 'Tennessee'], ['TX', 'Texas'], ['UT', 'Utah'], ['VT', 'Vermont'], ['VA', 'Virginia'], ['WA', 'Washington'], ['WV', 'West Virginia'], ['WI', 'Wisconsin'], ['WY', 'Wyoming']];
    var countries = [['GB', 'United Kingdom'], ['IE', 'Ireland'], ['AU', 'Australia'], ['CA', 'Canada'], ['NZ', 'New Zealand'], ['OTHER', 'Somewhere else']];
    var usGroup = doc.createElement('optgroup'); usGroup.label = 'United States';
    states.forEach(function (s) { var o = doc.createElement('option'); o.value = 'US-' + s[0]; o.textContent = s[1]; usGroup.appendChild(o); });
    var cGroup = doc.createElement('optgroup'); cGroup.label = 'Other countries';
    countries.forEach(function (s) { var o = doc.createElement('option'); o.value = s[0]; o.textContent = s[1]; cGroup.appendChild(o); });
    select.appendChild(usGroup); select.appendChild(cGroup);
    var liveCodes = coverage.map(function (c) { return c.code; });
    function show() {
      var code = select.value;
      if (!code) { out.innerHTML = ''; out.className = 'coverage-result'; return; }
      var name = select.options[select.selectedIndex].textContent;
      var live = liveCodes.indexOf(code) !== -1;
      var where = code === 'OTHER' ? 'your area' : name;
      out.className = 'coverage-result ' + (live ? 'is-live' : 'is-not');
      out.innerHTML = live
        ? '<p class="cov-status">Live</p><p>Yes — Find Clients is live in ' + where + '. Start free to browse the businesses near you; names stay masked until you reveal one.</p><a class="btn btn-primary" href="' + registerUrl(null) + '" data-cta="coverage_live">Start free<span class="btn-key" aria-hidden="true"><svg><use href="#i-arrow"/></svg></span></a>'
        : '<p class="cov-status">Not yet</p><p>Not yet in ' + where + '. Find Clients is live in ' + listNames(coverage) + ', opening area by area. Everything else in Evisor works where you are today — pricing, proposals, engagement letters, e-signature, onboarding and renewals. Start free, then turn on <em>Notify me</em> in Find Clients to hear the day it opens.</p><a class="btn btn-primary" href="' + registerUrl(null) + '" data-cta="coverage_not_yet">Start free — everything else works<span class="btn-key" aria-hidden="true"><svg><use href="#i-arrow"/></svg></span></a>';
      track('coverage_check', { area: code, status: live ? 'live' : 'not_yet' });
    }
    form.addEventListener('submit', function (e) { e.preventDefault(); show(); });
    select.addEventListener('change', show);
  })();

  /* ------------------------------------------------------------------
     Journey: scroll-driven on desktop, tabbed on smaller screens
     ------------------------------------------------------------------ */
  (function journey() {
    var wrap = $('[data-journey]');
    if (!wrap) return;
    var steps = $$('.jstep', wrap), tabs = $$('[data-step-tab]', wrap), panes = $$('.pane', wrap);
    var url = $('[data-stage-url]', wrap), prog = $('[data-stage-progress]', wrap);
    var active = -1;
    var seen = {};
    var desktop = window.matchMedia('(min-width: 1024px)');
    function play(pane) {
      var i = Number(pane.getAttribute('data-pane'));
      if (i === 2) { // proposal: client accepts
        var acc = $('[data-accept]', pane), card = $('[data-accepted]', pane);
        card.classList.remove('is-on');
        if (reduceMotion) { card.classList.add('is-on'); return; }
        setTimeout(function () { acc.classList.add('is-press'); }, 900);
        setTimeout(function () { acc.classList.remove('is-press'); card.classList.add('is-on'); }, 1080);
      }
      if (i === 4) { // onboarding: the client ticks one more item
        var items = $$('[data-onb-list] li', pane), count = $('[data-onb-count]', pane), bar = $('[data-onb-bar]', pane), next = $('[data-onb-next]', pane);
        items[2].classList.remove('is-done'); count.textContent = '2 of 5 done'; bar.style.setProperty('--w', '40%');
        next.textContent = 'Next: Provide prior-year financial statements or tax return';
        var finish = function () { items[2].classList.add('is-done'); $('em', items[2]).textContent = 'Done · just now'; count.textContent = '3 of 5 done'; bar.style.setProperty('--w', '60%'); next.textContent = 'Next: Confirm services, pricing and billing details'; };
        if (reduceMotion) finish(); else setTimeout(finish, 900);
      }
      if (i === 3) { // signing: restart the stroke
        var path = $('.sg-ink path', pane);
        if (path && !reduceMotion) { pane.classList.remove('is-on'); void pane.offsetWidth; pane.classList.add('is-on'); }
      }
    }
    function setStep(i, method) {
      if (i === active || i < 0 || i >= panes.length) return;
      active = i;
      steps.forEach(function (s, k) { s.classList.toggle('is-on', k === i); });
      tabs.forEach(function (t, k) { t.setAttribute('aria-selected', k === i ? 'true' : 'false'); t.tabIndex = k === i ? 0 : -1; });
      panes.forEach(function (p, k) { p.classList.toggle('is-on', k === i); });
      if (url) url.textContent = panes[i].getAttribute('data-url');
      if (prog) prog.style.setProperty('--p', ((i + 1) / panes.length).toFixed(3));
      play(panes[i]);
      if (!seen[i]) { seen[i] = true; track('journey_step', { step: i + 1, method: method || 'scroll' }); }
    }
    tabs.forEach(function (t, k) {
      t.addEventListener('click', function () { setStep(k, 'click'); });
      t.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        var n = (active + d + tabs.length) % tabs.length;
        setStep(n, 'click'); tabs[n].focus();
      });
    });
    steps.forEach(function (s, k) {
      s.addEventListener('click', function () {
        if (!desktop.matches) return;
        s.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
        setStep(k, 'click');
      });
    });
    setStep(0, 'initial');
    if (!hasIO) return;
    var io = new IntersectionObserver(function (entries) {
      if (!desktop.matches) return;
      entries.forEach(function (en) { if (en.isIntersecting) setStep(steps.indexOf(en.target), 'scroll'); });
    }, { rootMargin: '-42% 0px -48% 0px' });
    steps.forEach(function (s) { io.observe(s); });
  })();

  /* ------------------------------------------------------------------
     Reveal on scroll, timeline, section views, scroll depth
     ------------------------------------------------------------------ */
  (function revealAndMeasure() {
    var reveals = $$('.reveal');
    // stagger siblings that enter together
    reveals.forEach(function (el) {
      var sibs = Array.prototype.filter.call(el.parentElement.children, function (c) { return c.classList.contains('reveal'); });
      var idx = sibs.indexOf(el);
      if (idx > 0) el.style.setProperty('--d', String(Math.min(idx, 6)));
    });
    var timeline = $('[data-timeline]');
    if (!hasIO) { reveals.forEach(function (el) { el.classList.add('is-in'); }); if (timeline) timeline.classList.add('is-in'); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
    if (timeline) {
      var tio = new IntersectionObserver(function (entries) { entries.forEach(function (en) { if (en.isIntersecting) { timeline.classList.add('is-in'); $$('.tl', timeline).forEach(function (t) { t.classList.add('is-in'); }); tio.disconnect(); } }); }, { threshold: 0.3 });
      tio.observe(timeline);
    }
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { track('section_view', { section: en.target.getAttribute('data-section') }); sio.unobserve(en.target); } });
    }, { threshold: 0.35 });
    $$('[data-section]').forEach(function (s) { sio.observe(s); });

    var marks = [25, 50, 75, 100], hit = {}, ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        var max = root.scrollHeight - innerHeight;
        var pct = max > 0 ? (scrollY / max) * 100 : 100;
        marks.forEach(function (m) { if (!hit[m] && pct >= m - 1) { hit[m] = true; track('scroll_depth', { percent: m }); } });
      });
    }, { passive: true });
  })();

  /* ------------------------------------------------------------------
     Nav: condensed bar after the top, active section, mobile menu
     ------------------------------------------------------------------ */
  (function nav() {
    var navEl = $('[data-nav]');
    if (!navEl) return;
    var pending = false;
    var set = function () { pending = false; navEl.classList.toggle('is-scrolled', window.pageYOffset > 24); };
    requestAnimationFrame(set);
    window.addEventListener('scroll', function () { if (!pending) { pending = true; requestAnimationFrame(set); } }, { passive: true });

    if (hasIO) {
      var darkOn = new Set();
      var dio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) darkOn.add(en.target); else darkOn.delete(en.target); });
        navEl.classList.toggle('is-dark', darkOn.size > 0);
      }, { rootMargin: '0px 0px -' + Math.max(0, innerHeight - 60) + 'px 0px' });
      $$('.lp-ink').forEach(function (s) { if (s.tagName === 'SECTION') dio.observe(s); });
    }

    var links = $$('[data-nav-link]');
    if (hasIO && links.length) {
      var map = {};
      links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
      var aio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          var a = map[en.target.id];
          if (!a) return;
          if (en.isIntersecting) { links.forEach(function (l) { l.removeAttribute('aria-current'); }); a.setAttribute('aria-current', 'true'); }
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      Object.keys(map).forEach(function (id) { var s = doc.getElementById(id); if (s) aio.observe(s); });
    }

    var btn = $('[data-menu-toggle]'), menu = $('[data-menu]');
    if (!btn || !menu) return;
    function open(state) {
      btn.setAttribute('aria-expanded', state ? 'true' : 'false');
      if (state) {
        menu.hidden = false;
        requestAnimationFrame(function () { menu.classList.add('is-open'); });
        doc.body.style.overflow = 'hidden';
        var first = $('a', menu); if (first) setTimeout(function () { first.focus(); }, 60);
      } else {
        menu.classList.remove('is-open');
        menu.hidden = true;
        doc.body.style.overflow = '';
      }
    }
    btn.addEventListener('click', function () { open(btn.getAttribute('aria-expanded') !== 'true'); });
    $$('[data-menu-link]', menu).forEach(function (a) { a.addEventListener('click', function () { open(false); }); });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') { open(false); btn.focus(); } });
    window.matchMedia('(min-width: 900px)').addEventListener('change', function (m) { if (m.matches) open(false); });
  })();

  /* ------------------------------------------------------------------
     Floating CTA dock: after the hero, away from pricing and final CTA
     ------------------------------------------------------------------ */
  (function dock() {
    var el = $('[data-dock]');
    if (!el || !hasIO) return;
    var link = $('a', el);
    // Appears once the visitor has seen the product story (past the journey),
    // and steps aside wherever the page already shows its own CTA.
    var state = { past: false, pricing: false, final: false, contact: false };
    var update = function () {
      var on = state.past && !state.pricing && !state.final && !state.contact;
      el.classList.toggle('is-on', on);
      el.setAttribute('aria-hidden', on ? 'false' : 'true');
      if (link) link.tabIndex = on ? 0 : -1;
    };
    var watch = function (sel, key) {
      var t = $(sel); if (!t) return;
      new IntersectionObserver(function (entries) { entries.forEach(function (en) { state[key] = en.isIntersecting; update(); }); }).observe(t);
    };
    var journeyEl = $('#journey');
    if (journeyEl) new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { state.past = !en.isIntersecting && en.boundingClientRect.top < 0; update(); });
    }).observe(journeyEl);
    watch('#pricing', 'pricing'); watch('#start-now', 'final'); watch('#contact', 'contact');
  })();

  /* ------------------------------------------------------------------
     FAQ, contact form, small pointer touches
     ------------------------------------------------------------------ */
  $$('details[data-faq-id]').forEach(function (d) {
    d.addEventListener('toggle', function () { if (d.open) track('faq_open', { faq_id: d.getAttribute('data-faq-id') }); });
  });

  (function contact() {
    var form = $('[data-contact-form]');
    if (!form) return;
    var status = $('[data-contact-status]', form), btn = $('[data-contact-submit]', form);
    var prefills = {
      build: "I'd like to apply for Practice Build. Where my practice is right now: ",
      firm: "We're a team of [how many?] and would like a Firm plan. What we need: "
    };
    doc.addEventListener('click', function (e) {
      var a = e.target.closest('[data-prefill]');
      if (!a) return;
      var msg = $('#cf-message');
      if (msg && !msg.value.trim()) msg.value = prefills[a.getAttribute('data-prefill')] || '';
      setTimeout(function () { var n = $('#cf-name'); if (n) n.focus({ preventScroll: true }); }, reduceMotion ? 0 : 650);
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fields = { name: $('#cf-name'), email: $('#cf-email'), message: $('#cf-message') };
      var bad = null;
      Object.keys(fields).forEach(function (k) {
        var f = fields[k];
        var ok = f.value.trim() && (k !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value.trim()));
        f.setAttribute('aria-invalid', ok ? 'false' : 'true');
        if (!ok && !bad) bad = f;
      });
      if (bad) { status.className = 'form-status is-err'; status.textContent = 'Please add your name, a valid email and a message.'; bad.focus(); return; }
      btn.disabled = true; btn.textContent = 'Sending…'; status.className = 'form-status'; status.textContent = '';
      var topic = /practice build/i.test(fields.message.value) ? 'practice_build' : /firm/i.test(fields.message.value) ? 'firm' : 'general';
      fetch(LINKS.contactEndpoint || 'https://formsubmit.co/ajax/hello@evisor.app', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: fields.name.value.trim(), email: fields.email.value.trim(), message: fields.message.value.trim(), _subject: '[landingpage] Message from ' + fields.name.value.trim(), _template: 'table', _captcha: 'false' })
      }).then(function (r) { return r.json(); }).then(function (j) {
        if (!(j && (j.success === true || j.success === 'true'))) throw new Error('fail');
        status.className = 'form-status is-ok'; status.textContent = 'Sent. We’ll reply by email.';
        form.reset(); track('contact_submit', { topic: topic, status: 'ok' });
      }).catch(function () {
        status.className = 'form-status is-err'; status.textContent = 'That didn’t send. Please email ' + (LINKS.email || 'hello@evisor.app') + '.';
        track('contact_submit', { topic: topic, status: 'error' });
      }).then(function () { btn.disabled = false; btn.textContent = 'Send message'; });
    });
  })();

  (function swatches() {
    var page = $('[data-brand-page]');
    var btns = $$('[data-swatch]');
    if (!page || !btns.length) return;
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        btns.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        page.style.setProperty('--firm', b.getAttribute('data-swatch'));
      });
    });
  })();

  if (finePointer && !reduceMotion) {
    $$('[data-spot]').forEach(function (t) {
      t.addEventListener('pointermove', function (e) {
        var r = t.getBoundingClientRect();
        t.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        t.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
    $$('[data-magnetic]').forEach(function (b) {
      b.addEventListener('pointermove', function (e) {
        var r = b.getBoundingClientRect();
        var x = ((e.clientX - r.left) / r.width - 0.5) * 6, y = ((e.clientY - r.top) / r.height - 0.5) * 6;
        b.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
      });
      b.addEventListener('pointerleave', function () { b.style.transform = ''; });
    });
  }
})();
