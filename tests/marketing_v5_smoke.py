"""Offline component smoke, not an HTTP, provider, security or conversion audit.
Requires Python playwright and Chromium. Run from any directory.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json, os, hashlib, subprocess, sys, shutil
ROOT=Path(__file__).resolve().parents[1]
OUT=Path(os.environ.get('EVISOR_TEST_OUTPUT',str(ROOT/'test-output/v5')))
OUT.mkdir(parents=True,exist_ok=True)
subprocess.run([sys.executable,str(ROOT/'tools/sync_v5_plans.py'),'--check'],check=True)
html=(ROOT/'index.html').read_text().replace('<link rel="stylesheet" href="marketing/v5.css">','<style>'+(ROOT/'marketing/v5.css').read_text()+'</style>').replace('<script src="marketing/v5.js" defer></script>','<script>'+(ROOT/'marketing/v5.js').read_text()+'</script>')
checks=[];errors=[];requests=[]
WIDTHS=[(1440,1024),(1280,900),(1024,800),(900,1000),(768,1024),(390,844),(375,812),(320,750)]
def check(name, passed=True, **extra):
    checks.append(dict(test=name,passed=bool(passed),**extra))
    assert passed,(name,extra)
def in_bounds(page):
    return page.evaluate('document.documentElement.scrollWidth <= innerWidth')
with sync_playwright() as p:
    b=p.chromium.launch(executable_path=os.environ.get('CHROMIUM_EXECUTABLE') or shutil.which('chromium'),headless=True,args=['--no-sandbox'])
    c=b.new_context(device_scale_factor=1)
    c.route('**/*',lambda r:r.abort())
    page=c.new_page();page.on('pageerror',lambda e:errors.append(str(e)))
    page.on('request',lambda r:requests.append(r.url))
    for w,h in WIDTHS:
        page.set_viewport_size(dict(width=w,height=h));page.set_content(html,wait_until='load')
        page.evaluate('window.scrollTo({top:0,behavior:"instant"})')
        check('page-bounds',in_bounds(page),width=w)
        page.screenshot(path=str(OUT/f'full-{w}.png'),full_page=True)
        if w in [1440,390]:page.screenshot(path=str(OUT/f'hero-{w}.png'))
        for key in ['research','pricing','documents','ongoing']:
            page.locator('#journey-tab-'+key).click()
            check('journey',page.locator('#journey-'+key).is_visible() and page.locator('#journey-tab-'+key).get_attribute('aria-selected')=='true' and in_bounds(page),width=w,state=key)
        for key in ['new','prospect','existing']:
            page.locator('#start-tab-'+key).click()
            check('starting-situation',page.locator('#start-'+key).is_visible() and in_bounds(page),width=w,state=key)
        page.locator('[data-billing=annual]').click()
        for key,equiv,total in [('starter',19,228),('practice',45,540),('firm',113,1356)]:
            check('annual-price',page.locator('[data-price='+key+']').inner_text()==f'${equiv}' and f'${total:,} billed annually' in page.locator('[data-bill='+key+']').inner_text(),width=w,plan=key)
        check('annual-bounds',in_bounds(page),width=w)
        page.locator('[data-billing=monthly]').click()
        check('monthly-restore',page.locator('[data-price=practice]').inner_text()=='$59' and page.locator('[data-equivalent]:visible').count()==0,width=w)
        for summary in page.locator('.objection summary').all():
            if summary.locator('..').get_attribute('open') is None:summary.click()
        check('objections-open',page.locator('.objection[open]').count()==6 and in_bounds(page),width=w)
        page.locator('#concern-leads [data-jump]').click()
        check('objection-contextual-jump',page.locator('#journey-research').is_visible() and page.locator('#journey-tab-research').evaluate('e=>e===document.activeElement'),width=w)
        page.locator('.faq-item summary').first.click()
        check('native-faq',page.locator('.faq-item').first.get_attribute('open') is not None,width=w)
        if w<=900:
            page.locator('.menu-button').click();check('mobile-menu-open',page.locator('#mobile-nav').is_visible(),width=w)
            page.keyboard.press('Escape');check('menu-escape-focus',not page.locator('#mobile-nav').is_visible() and page.locator('.menu-button').evaluate('e=>e===document.activeElement'),width=w)
    page.set_viewport_size(dict(width=1440,height=1024));page.set_content(html)
    page.locator('#journey-tab-research').focus();page.keyboard.press('End')
    check('keyboard-end',page.locator('#journey-ongoing').is_visible())
    page.keyboard.press('Home');page.keyboard.press('ArrowRight')
    check('keyboard-arrow',page.locator('#journey-pricing').is_visible())
    page.locator('#start-tab-new').focus();page.keyboard.press('ArrowDown')
    check('keyboard-start-vertical',page.locator('#start-prospect').is_visible())
    for a in page.locator('a[href^="#"]').all():
        check('internal-anchor',page.locator(a.get_attribute('href')).count()==1,target=a.get_attribute('href'))
    check('one-h1',page.locator('h1').count()==1)
    check('unique-ids',page.evaluate('(()=>{const a=[...document.querySelectorAll("[id]")].map(e=>e.id);return a.length===new Set(a).size})()'))
    check('preview-noindex','noindex' in page.locator('meta[name=robots]').get_attribute('content'))
    check('no-forms-or-trackers',page.locator('form,iframe,script[src^="http"]').count()==0)
    c.close()
    c=b.new_context(viewport=dict(width=375,height=812),reduced_motion='reduce')
    q=c.new_page();q.set_content(html);check('reduced-motion',q.locator('#journey-research').evaluate('e=>getComputedStyle(e).animationName')=='none');c.close()
    c=b.new_context(viewport=dict(width=375,height=812),java_script_enabled=False)
    q=c.new_page();q.set_content(html)
    check('no-js-core-content',q.locator('h1').is_visible() and q.locator('.hero-actions a.primary').is_visible())
    check('no-js-all-starting-paths',q.locator('.start-panel:visible').count()==3)
    q.locator('.faq-item summary').first.click();check('no-js-native-faq',q.locator('.faq-item').first.get_attribute('open') is not None)
    check('no-js-bounds',in_bounds(q));c.close();b.close()
check('no-js-errors',not errors)
check('no-external-requests',not requests)
result={'status':'PASS','check_count':len(checks),'checks':checks,'browser_errors':errors,'network_requests':requests,'rendering':'Offline exact HTML/CSS/JS via Chromium set_content; external requests aborted','asset_sha256':{str(f.relative_to(ROOT)):hashlib.sha256(f.read_bytes()).hexdigest() for f in [ROOT/'index.html',ROOT/'marketing/v5.css',ROOT/'marketing/v5.js',ROOT/'marketing/v5-plans.json']},'limitations':['HTTP browser navigation blocked by administrator policy; hosting is NOT browser-qualified','No live signup/OAuth/checkout/provider tests','No axe library available in this runtime','No real Safari/Comet/device or browser-zoom qualification','No field Core Web Vitals or conversion/retention experiment']}
(OUT/'results.json').write_text(json.dumps(result,indent=2))
print(json.dumps({k:v for k,v in result.items() if k!='checks'},indent=2))
