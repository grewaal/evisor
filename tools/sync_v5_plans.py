"""Sync/check the approved public pricing projection; never alter app billing.
Usage: python tools/sync_v5_plans.py [--check]
"""
from pathlib import Path
import json, re, sys
ROOT = Path(__file__).resolve().parents[1]
path = ROOT / 'index.html'
raw = path.read_text()
catalog = json.loads((ROOT / 'marketing/v5-plans.json').read_text())
assert catalog['currency'] == 'USD'
assert [x['id'] for x in catalog['plans']] == ['starter','practice','firm']
expected = raw
for plan in catalog['plans']:
    assert isinstance(plan['monthly'], int) and plan['monthly'] > 0
    assert isinstance(plan['annual_total'], int) and plan['annual_total'] > 0
    assert plan['annual_total'] % 12 == 0
    key = re.escape(plan['id'])
    expected, n = re.subn(r'(<span data-price="'+key+r'">)[^<]*(</span>)', lambda m:m[1]+f"${plan['monthly']}"+m[2], expected)
    assert n == 1
    expected, n = re.subn(r'(<p class="billing-detail" data-bill="'+key+r'">)[^<]*(</p>)', lambda m:m[1]+f"${plan['monthly']} billed monthly."+m[2], expected)
    assert n == 1
expected, n = re.subn(r'(<script id="public-plan-data" type="application/json">).*?(</script>)', lambda m:m[1]+json.dumps(catalog,separators=(',',':'))+m[2], expected, flags=re.S)
assert n == 1
if '--check' in sys.argv:
    if expected != raw:
        raise SystemExit('Pricing projection drift. Review the public catalog and regenerate.')
    print('PASS: static prices and embedded toggle data match the public projection.')
else:
    path.write_text(expected)
    print('Synchronized reviewed public projection. Live provider parity is a separate release gate.')
