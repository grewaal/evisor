from pathlib import Path
from playwright.sync_api import sync_playwright
import json, hashlib, gzip, re, os, shutil
ROOT=Path(__file__).resolve().parents[1]
OUT=Path(os.environ.get('EVISOR_TEST_OUTPUT',str(ROOT/'test-output')));OUT.mkdir(parents=True,exist_ok=True)
# Load the exact repository assets without network access. This is a component
# smoke, not a substitute for HTTP hosting and live redirect qualification.
HTML=(ROOT/'index.html').read_text().replace('<link rel="stylesheet" href="marketing/v4.css">','<style>'+(ROOT/'marketing/v4.css').read_text()+'</style>').replace('<script src="marketing/v4.js" defer></script>','<script>'+(ROOT/'marketing/v4.js').read_text()+'</script>')
checks=[]; errors=[]; requests=[]
with sync_playwright() as p:
 b=p.chromium.launch(executable_path=os.environ.get('CHROMIUM_EXECUTABLE') or shutil.which('chromium'),headless=True,args=['--no-sandbox'])
 context=b.new_context(viewport={'width':1440,'height':1000},device_scale_factor=1)
 context.route('**/*',lambda r:r.abort())
 page=context.new_page();page.on('pageerror',lambda e:errors.append(str(e)));page.on('request',lambda r:requests.append(r.url))
 for width,height in [(1440,1000),(1280,900),(1024,800),(900,900),(768,1024),(390,844),(375,812),(320,750)]:
  page.set_viewport_size({'width':width,'height':height});page.set_content(HTML,wait_until='load');page.evaluate("window.scrollTo({top:0,behavior:'instant'})")
  page.screenshot(path=str(OUT/f'desktop-{width}.png'),full_page=True)
  if width==1440:page.screenshot(path=str(OUT/'hero-desktop.png'),full_page=False)
  if width==390:page.screenshot(path=str(OUT/'hero-mobile.png'),full_page=False)
  overflow=page.evaluate('document.documentElement.scrollWidth>innerWidth')
  bad=page.evaluate("""[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();const s=getComputedStyle(e);return r.width>0&&r.height>0&&s.position!=='fixed'&&!e.closest('dialog')&&!e.classList.contains('sr-only')&&(r.right>innerWidth+1||r.left< -1)}).map(e=>({tag:e.tagName,class:e.className,width:e.getBoundingClientRect().width}))""")
  checks.append({'test':'viewport','width':width,'horizontal_overflow':overflow,'out_of_bounds':bad})
  assert not overflow,(width,bad)
  for name in ['price','proposal','research']:
   page.locator('#tab-'+name).click()
   assert page.locator('#panel-'+name).is_visible()
   assert page.locator('#tab-'+name).get_attribute('aria-selected')=='true'
   panel_clipped=page.locator('#panel-'+name).evaluate('(el)=>el.getBoundingClientRect().bottom>el.parentElement.getBoundingClientRect().bottom+1')
   checks.append({'test':'demo-panel','width':width,'panel':name,'clipped':panel_clipped});assert not panel_clipped,(width,name)
  page.locator('[data-billing=annual]').click()
  assert page.locator('[data-plan-price=practice]').inner_text()=='$45'
  assert '$540 billed annually' in page.locator('[data-plan-detail=practice]').inner_text()
  page.locator('[data-billing=monthly]').click()
  assert page.locator('[data-plan-price=practice]').inner_text()=='$59'
  if width<=900:
   page.locator('.menu-toggle').click();assert page.locator('#mobile-nav').is_visible()
   page.keyboard.press('Escape');assert not page.locator('#mobile-nav').is_visible()
   assert page.locator('.menu-toggle').evaluate('(e)=>e===document.activeElement')
  page.locator('.detail-copy [data-open-sample]').click();assert page.locator('#sample-dialog').is_visible()
  page.keyboard.press('Escape');assert not page.locator('#sample-dialog').is_visible()
  assert page.locator('.detail-copy [data-open-sample]').evaluate('(e)=>e===document.activeElement')
  page.locator('summary').first.click();assert page.locator('details').first.get_attribute('open') is not None
  checks.append({'test':'interactions','width':width,'pass':True})
 # Keyboard tabs Home/End/left/right.
 page.set_viewport_size({'width':1440,'height':1000});page.set_content(HTML,wait_until='load');page.evaluate("window.scrollTo({top:0,behavior:'instant'})")
 page.locator('#tab-research').focus();page.keyboard.press('ArrowRight');assert page.locator('#tab-price').get_attribute('aria-selected')=='true'
 page.keyboard.press('End');assert page.locator('#tab-proposal').get_attribute('aria-selected')=='true'
 page.keyboard.press('Home');assert page.locator('#tab-research').get_attribute('aria-selected')=='true'
 checks.append({'test':'tab-keyboard','pass':True})
 # All anchor targets valid; no placeholder navigation.
 links=page.locator('a').evaluate_all('(els)=>els.map(e=>({text:e.innerText,href:e.getAttribute("href")}))')
 for link in links:
  if link['href'].startswith('#'):assert page.locator(link['href']).count()==1,link
 checks.append({'test':'anchor-targets','pass':True,'count':sum(l['href'].startswith('#') for l in links)})
 assert page.locator('h1').count()==1
 duplicate_ids=page.evaluate("""(()=>{let ids=[...document.querySelectorAll('[id]')].map(e=>e.id);return ids.filter((x,i)=>ids.indexOf(x)!==i)})()""")
 assert not duplicate_ids
 checks.append({'test':'single-h1-unique-ids','pass':True})
 context.close()
 # Reduced motion + no javascript progressive fallback.
 c=b.new_context(viewport={'width':390,'height':844},reduced_motion='reduce');q=c.new_page();q.set_content(HTML,wait_until='load');
 assert q.locator('.demo-panel').first.evaluate('e=>getComputedStyle(e).animationName')=='none'
 c.close(); checks.append({'test':'reduced-motion','pass':True})
 c=b.new_context(viewport={'width':390,'height':844},java_script_enabled=False);q=c.new_page();q.set_content(HTML,wait_until='load')
 assert q.locator('h1').is_visible();assert q.locator('.hero a.btn').first.is_visible();q.locator('summary').first.click();assert q.locator('details').first.get_attribute('open') is not None
 checks.append({'test':'no-js-core-content-cta-faq','pass':True}); c.close();b.close()
content=HTML.encode()
result={'checks':checks,'browser_errors':errors,'external_network_requests':[r for r in requests if not r.startswith(('data:','about:'))],'bytes':len(content),'gzip_bytes':len(gzip.compress(content)),'sha256':hashlib.sha256(content).hexdigest(),'limitations':['No product login/signup/checkout was submitted','No production/browser field Core Web Vitals measured','No automated axe audit performed yet','Pricing is a reviewed catalog snapshot and needs live parity check before deployment']}
(OUT/'test-results.json').write_text(json.dumps(result,indent=2))
print(json.dumps(result,indent=2))
assert not errors

assert not result["external_network_requests"]
