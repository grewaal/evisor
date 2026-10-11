# Marketing v4 verification receipt

Status: REVIEW CANDIDATE — NOT LIVE.

## Exact tested product assets

| File | Git blob SHA | Bytes |
|---|---|---:|
| index.html | d25d89548de5f750636f78bd2c368ebeb2b44e4c | 28,805 |
| marketing/v4.css | 4002b55f9607729d9799bbe5646cc14c5a60f7cb | 25,821 |
| marketing/v4.js | 3239aadc372cca9fd9d024131f3de75c1df81c45 | 4,170 |

Product asset total: 58,796 bytes; approximately 15.3 KB summed gzip size. This is source/transfer-size arithmetic, NOT a measured page-load or conversion result.

## Executed browser checks

`python tests/marketing_v4_smoke.py`

Chromium/Playwright, offline rendering of the exact inlined HTML/CSS/JS above. All external traffic blocked.

- 45 recorded check groups passed.
- Eight viewports: 1440x1000, 1280x900, 1024x800, 900x900, 768x1024, 390x844, 375x812, 320x750.
- No page horizontal overflow, and body overflow-x is not hidden to mask it.
- All three interactive workflow panels render without clipping at each width.
- Monthly and annual prices/annual totals were checked for all three paid plans.
- Mobile menu opening/Escape/focus return checked at the applicable widths.
- Sample dialog opening/Escape/focus return checked.
- Native FAQ opening checked.
- Arrow/Home/End tab keyboard interaction checked.
- All internal anchor destinations exist; one H1; no duplicate IDs.
- Reduced-motion panel animation is disabled.
- No-JavaScript core copy, signup CTA and native FAQs remain usable.
- Zero observed JavaScript errors; zero attempted external network requests in this smoke.
- Desktop hero, full-page composition, and mobile hero captures visually inspected.

## Explicit limitations

A real localhost HTTP attempt returned `ERR_BLOCKED_BY_ADMINISTRATOR` in the available browser. The environment policy was not bypassed. Offline rendering proves these UI interactions, not HTTP hosting, relative asset serving or live redirects. The included test supports `EVISOR_TEST_HTTP=1` in a permitted local environment; run that during release validation.

No live account was created; no login/OAuth/checkout was completed; no message/payment/signature was submitted. No production product was mutated. Automated axe, 200%/400% zoom, Safari/Comet/real devices, real hosting headers/caching, field Core Web Vitals and conversion/retention results remain unverified here.

## Release conditions

1. Confirm current source/hosting and preserve main plus ancillary pages.
2. Confirm prices, limits, availability, tax and policy copy with the active application release owner.
3. Generate price markup and toggle data from one approved public catalog projection; add a drift check.
4. Verify anonymous and returning signup/plan/legal destinations and intent continuity. The inspected /choose-plan route required authentication.
5. Run HTTP/browser/accessibility/performance checks and a fresh visual review.
6. Decide whether to retain the no-tracking page or integrate approved consent-aware analytics. data-cta attributes alone are not analytics.
7. Add a current approved social-preview asset and verify canonical/metadata behavior.
8. Remove preview noindex only from the founder-approved production artifact during the separately authorized marketing release.

No live publication or main-branch replacement is authorized by this receipt. Use MARKETING_RELEASE_PROMPT.md for the finishing run.
