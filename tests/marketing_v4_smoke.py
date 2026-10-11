"""Bounded marketing-page browser smoke. No external app actions or tracking.

Run with: python tests/marketing_v4_smoke.py
Requires Python Playwright and Chromium. Default: offline exact-asset rendering.
Set EVISOR_TEST_HTTP=1 for a real loopback HTTP server when your environment permits.
No signup, checkout, email, or other external request is allowed.
"""
from __future__ import annotations
import functools
import gzip
import hashlib
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
import os
from pathlib import Path
import shutil
import threading
from urllib.parse import urlsplit
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUT = Path(os.environ.get('EVISOR_TEST_OUTPUT', str(ROOT / 'test-output')))
OUT.mkdir(parents=True, exist_ok=True)

class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

USE_HTTP = os.environ.get('EVISOR_TEST_HTTP') == '1'
server = None
base = 'http://127.0.0.1:1/'
HTML = (ROOT/'index.html').read_text().replace('<link rel="stylesheet" href="marketing/v4.css">','<style>'+(ROOT/'marketing/v4.css').read_text()+'</style>').replace('<script src="marketing/v4.js" defer></script>','<script>'+(ROOT/'marketing/v4.js').read_text()+'</script>')
if USE_HTTP:
    handler = functools.partial(QuietHandler, directory=str(ROOT))
    server = ThreadingHTTPServer(('127.0.0.1', 0), handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    base = f'http://127.0.0.1:{server.server_port}/'
checks, errors, blocked, requests = [], [], [], []

def allow_local(route):
    url = route.request.url
    if url.startswith(base) or url.startswith(('data:', 'about:')):
        route.continue_()
    else:
        blocked.append(url)
        route.abort()

def new_context(browser, **kwargs):
    c = browser.new_context(**kwargs)
    c.route('**/*', allow_local)
    return c

def goto(page):
    if USE_HTTP:
        response = page.goto(base, wait_until='networkidle')
        assert response and response.status == 200
    else:
        page.set_content(HTML, wait_until='load')
    page.evaluate("window.scrollTo({top:0,behavior:'instant'})")

def record(test, **data):
    checks.append({'test': test, 'pass': True, **data})

try:
    with sync_playwright() as p:
        browser = p.chromium.launch(
            executable_path=os.environ.get('CHROMIUM_EXECUTABLE') or shutil.which('chromium'),
            headless=True, args=['--no-sandbox'])
        c = new_context(browser, viewport={'width': 1440, 'height': 1000}, device_scale_factor=1)
        page = c.new_page()
        page.on('pageerror', lambda e: errors.append(str(e)))
        page.on('request', lambda r: requests.append(r.url))
        for width, height in [(1440,1000),(1280,900),(1024,800),(900,900),(768,1024),(390,844),(375,812),(320,750)]:
            page.set_viewport_size({'width':width, 'height':height})
            goto(page)
            page.screenshot(path=str(OUT / f'page-{width}.png'), full_page=True)
            if width in (1440,390):
                page.screenshot(path=str(OUT / f'hero-{width}.png'))
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), width
            # No hidden overflow masking is applied to the page.
            assert page.locator('body').evaluate("e=>getComputedStyle(e).overflowX") != 'hidden'
            record('render-no-horizontal-overflow', width=width)
            for name in ['price','proposal','research']:
                page.locator('#tab-' + name).click()
                assert page.locator('#panel-' + name).is_visible()
                assert page.locator('#tab-' + name).get_attribute('aria-selected') == 'true'
                clipped = page.locator('#panel-' + name).evaluate('(e)=>e.getBoundingClientRect().bottom>e.parentElement.getBoundingClientRect().bottom+1')
                assert not clipped, (width,name)
                record('demo-panel', width=width, panel=name)
            page.locator('[data-billing=annual]').click()
            for key, val, total in [('starter','$19','$228'),('practice','$45','$540'),('firm','$113','$1,356')]:
                assert page.locator(f'[data-plan-price={key}]').inner_text() == val
                assert total + ' billed annually' in page.locator(f'[data-plan-detail={key}]').inner_text()
            assert page.locator('[data-equivalent]').first.is_visible()
            page.locator('[data-billing=monthly]').click()
            for key, val in [('starter','$25'),('practice','$59'),('firm','$149')]:
                assert page.locator(f'[data-plan-price={key}]').inner_text() == val
            assert not page.locator('[data-equivalent]').first.is_visible()
            if width <= 900:
                page.locator('.menu-toggle').click()
                assert page.locator('#mobile-nav').is_visible()
                page.keyboard.press('Escape')
                assert not page.locator('#mobile-nav').is_visible()
                assert page.locator('.menu-toggle').evaluate('(e)=>e===document.activeElement')
            opener = page.locator('.detail-copy [data-open-sample]')
            opener.click()
            assert page.locator('#sample-dialog').is_visible()
            page.keyboard.press('Escape')
            assert not page.locator('#sample-dialog').is_visible()
            assert opener.evaluate('(e)=>e===document.activeElement')
            page.locator('summary').first.click()
            assert page.locator('details').first.get_attribute('open') is not None
            record('pricing-menu-dialog-faq', width=width)
        page.set_viewport_size({'width':1440,'height':1000})
        goto(page)
        page.locator('#tab-research').focus()
        page.keyboard.press('ArrowRight')
        assert page.locator('#tab-price').get_attribute('aria-selected') == 'true'
        page.keyboard.press('End')
        assert page.locator('#tab-proposal').get_attribute('aria-selected') == 'true'
        page.keyboard.press('Home')
        assert page.locator('#tab-research').get_attribute('aria-selected') == 'true'
        record('keyboard-tabs')
        links = page.locator('a').evaluate_all('(els)=>els.map(e=>({text:e.innerText,href:e.getAttribute("href")}))')
        for a in links:
            assert a['href'], a
            if a['href'].startswith('#'):
                assert page.locator(a['href']).count() == 1, a
        record('internal-anchors', count=sum(a['href'].startswith('#') for a in links))
        assert page.locator('h1').count() == 1
        assert page.evaluate("(()=>{let a=[...document.querySelectorAll('[id]')].map(e=>e.id);return a.length===new Set(a).size})()")
        record('single-h1-unique-ids')
        if USE_HTTP:
            for path in ('index.html','marketing/v4.css','marketing/v4.js'):
                response = c.request.get(base + path)
                assert response.status == 200
                assert response.body() == (ROOT / path).read_bytes(), path
            record('served-source-byte-identity', files=3)
        c.close()
        c = new_context(browser, viewport={'width':390,'height':844}, reduced_motion='reduce')
        q = c.new_page(); goto(q)
        assert q.locator('.demo-panel').first.evaluate('e=>getComputedStyle(e).animationName') == 'none'
        record('reduced-motion');c.close()
        c = new_context(browser, viewport={'width':390,'height':844}, java_script_enabled=False)
        q = c.new_page(); goto(q)
        assert q.locator('h1').is_visible()
        assert q.locator('.hero a.btn').first.is_visible()
        q.locator('summary').first.click()
        assert q.locator('details').first.get_attribute('open') is not None
        record('no-js-core-copy-cta-faq');c.close()
        browser.close()
finally:
    if server:
        server.shutdown();server.server_close()

assets = {}
for path in ('index.html','marketing/v4.css','marketing/v4.js'):
    b=(ROOT/path).read_bytes()
    assets[path]={'bytes':len(b),'gzip_bytes':len(gzip.compress(b)),'sha256':hashlib.sha256(b).hexdigest(),
                  'git_blob_sha':hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()}
result = {
    'method':('Loopback HTTP' if USE_HTTP else 'Offline set_content of exact HTML/CSS/JS assets') + ', Chromium/Playwright, external traffic blocked',
    'checks':checks,'check_count':len(checks), 'browser_errors':errors,
    'blocked_external_requests':blocked,
    'unexpected_external_requests':[r for r in requests if not r.startswith((base,'data:','about:'))],
    'assets':assets,
    'limitations':['No live registration, login, checkout, OAuth, or email was submitted.',
                   'Local HTTP navigation was blocked by browser administrator policy here; offline checks do not qualify HTTP hosting.',
                   'No device/Comet/Safari validation or field conversion/retention evidence.',
                   'No automated axe audit in this smoke.',
                   'No field Core Web Vitals or statistically qualified performance claim.',
                   'Pricing is a repository snapshot, not a current provider quote.']
}
(OUT/'test-results.json').write_text(json.dumps(result,indent=2))
print(json.dumps({'checks':len(checks),'browser_errors':errors,'blocked_external_requests':blocked,'assets':assets},indent=2))
assert not errors,errors
assert not blocked,blocked
assert not result['unexpected_external_requests']
