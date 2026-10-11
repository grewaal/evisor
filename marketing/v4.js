'use strict';
// No analytics, external scripts, cookies, fingerprinting, form submissions,
// or product mutations. data-cta values are reserved for consent-aware integration.
(function(){
  const toggle=document.querySelector('.menu-toggle');
  const menu=document.getElementById('mobile-nav');
  function closeMenu(focus){menu.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');if(focus)toggle.focus();}
  toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';menu.hidden=!open;toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>closeMenu(false)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden)closeMenu(true);});
  window.matchMedia('(min-width:901px)').addEventListener('change',e=>{if(e.matches)closeMenu(false);});
  const tabs=[...document.querySelectorAll('.demo-tab')];
  function selectStep(key,focus){const active=document.getElementById('tab-'+key);if(!active)return;tabs.forEach(t=>{let selected=t===active;t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!selected;});if(focus)active.focus();}
  tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>selectStep(tab.id.replace('tab-',''),false));tab.addEventListener('keydown',e=>{let n;if(e.key==='ArrowRight')n=(i+1)%tabs.length;else if(e.key==='ArrowLeft')n=(i+tabs.length-1)%tabs.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=tabs.length-1;else return;e.preventDefault();selectStep(tabs[n].id.replace('tab-',''),true);});});
  document.querySelectorAll('[data-step]').forEach(b=>b.addEventListener('click',()=>selectStep(b.dataset.step,true)));
  const dialog=document.getElementById('sample-dialog');let previousFocus=null;
  document.querySelectorAll('[data-open-sample]').forEach(b=>b.addEventListener('click',()=>{previousFocus=b;dialog.showModal();}));
  dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  dialog.addEventListener('close',()=>{if(previousFocus&&document.contains(previousFocus))previousFocus.focus();});
  // Reviewed catalog snapshot; NOT billing authority. Confirm against the live
  // provider and current canonical catalog before publishing this review branch.
  const catalog={starter:{monthly:25,annual:19,total:228},practice:{monthly:59,annual:45,total:540},firm:{monthly:149,annual:113,total:1356}};
  const money=new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0});
  document.querySelectorAll('[data-billing]').forEach(b=>b.addEventListener('click',()=>{const annual=b.dataset.billing==='annual';document.querySelectorAll('[data-billing]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));for(const [key,v]of Object.entries(catalog)){document.querySelector('[data-plan-price="'+key+'"]').textContent=money.format(annual?v.annual:v.monthly);document.querySelector('[data-plan-detail="'+key+'"]').textContent=annual?money.format(v.total)+' billed annually. Save '+money.format(v.monthly*12-v.total)+' vs monthly billing.':money.format(v.monthly)+' billed monthly.';}document.querySelectorAll('[data-equivalent]').forEach(x=>x.hidden=!annual);document.getElementById('billing-status').textContent=annual?'Annual billing selected. Displayed monthly prices are equivalents; the annual total is charged.':'Monthly billing selected.';}));
  const copy=document.querySelector('.copy-email');copy.addEventListener('click',async()=>{const s=document.getElementById('copy-status');try{if(!navigator.clipboard)throw new Error('unavailable');await navigator.clipboard.writeText('hello@evisor.app');s.textContent='Email address copied.';}catch{s.textContent='Select and copy hello@evisor.app, or use the email link.'}});
})();
