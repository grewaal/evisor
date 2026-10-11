# Evisor V5 — Build your client book. Not your to-do list.

**Status: implemented design-review candidate; not approved or deployed live.**

V5 is a separate alternative to V4, not an overwrite of its branch. Preserve `design/marketing-v4-20261011` at `6dd3c64467484f77459ae4e6c4433b11d0b973ca` and draft PR #8. The V5 branch is `design/marketing-v5-client-book`. The existing `main`, CNAME and standalone pages are not deployment targets in this task.

## What is different

An editorial serif/ink/paper direction replaces V4's mostly sans-serif product presentation. The navy product accent remains, with a restrained sage closing section. Typography uses browser-provided font stacks; no font files or external font requests are included. Appearance must also be reviewed on the founder's actual Mac/browser font stack.

The story moves from practitioner workload to a concrete client conversation, then lets the visitor explore the concern or starting situation relevant to them. The hero's fictional inquiry leads to a clear draft proposal. The four-stage interactive journey covers research, scope/pricing, proposal/signing and onboarding/renewal. A three-way starting-point selector serves new prospecting, an interested prospect and an existing client book. Six expandable objections link back to the relevant example. Pricing and six practical FAQs complete the decision.

The public page has no competitor attacks or invented social proof. `MARKETING_V5_RESEARCH.md` records balanced outside research and what it does and does not support.

## Product truth and commercial constraints

All businesses, messages, draft documents and fees in the demonstration are illustrative, not real data, customer endorsements or legal templates. No demo action sends, accepts, signs, looks up leads or charges anything.

Prices remain the reviewed `2026_08` snapshot from the older application catalog at `11737d21c32810450bdf2818c04f36eb8c75ec14`, not confirmed live-provider pricing. Monthly USD: Starter 25, Practice 59, Firm 149. Annual totals: 228, 540, 1356. The newer app hardening owner must reconcile prices, included seats, send-limit semantics, claims, tax wording and availability before publication.

`marketing/v5-plans.json` is a minimal public projection. `tools/sync_v5_plans.py --check` binds the initial price/billing text and embedded runtime projection. It does not certify feature entitlements or live provider parity. The JavaScript reads the embedded projection rather than maintaining another hard-coded price table. Detailed feature copy still needs its own contract review.

Signup links use the existing `/register`; plan links use `/choose-plan`. They do not secretly encode plan/intent values. The protected-route and registration/verification/checkout continuation must be tested with the targeted application before release. Do not claim cross-domain intent preservation is complete.

## Safety, progressive enhancement and privacy

The preview is `noindex,nofollow`, with no analytics, persistent storage, third-party embeds or form submissions. `data-cta` values are inert future instrumentation hooks. Native details work without JavaScript; primary content and signup links remain available. Interactive-only tabs/switches are hidden in no-script mode, and content panels remain readable. The six contextual objection buttons should receive an explicit no-script link fallback during final HTTP qualification; ordinary section links already remain available.

The application, its security/legal hardening, templates, Lead Lab and Foundry are not changed. No external messages, charges or customer records are involved. No live release, merge, DNS update or GitHub Pages configuration change is authorized.

## Actual verification

- 170 offline Chromium smoke assertions passed across 1440, 1280, 1024, 900, 768, 390, 375 and 320px.
- Checked page width, four journey states, three starting states, all three annual prices/totals, monthly restoration, objections, contextual jump/focus, mobile navigation/Escape, native FAQ, keyboard tabs, internal anchors, unique IDs, single H1, noindex, reduced motion and no-JavaScript core content.
- Zero observed page JavaScript errors and external requests in those runs.
- Custom computed-text contrast checks in 16 route-state/viewport combinations reported no remaining below-threshold direct-text findings after fixes. This is not axe, an independent accessibility audit, or certification.
- Desktop, mobile and full-page rendered captures were visually inspected. No independent human/user study or autonomous reviewer agent is claimed.

Browser navigation to loopback HTTP was blocked by the environment's administrator policy. Testing used the exact assets via `set_content`, with network requests blocked. It is NOT an HTTP-hosting or cross-site integration qualification. No axe library was available. Actual Comet/Safari/mobile-device behavior, 200%/400% zoom, live legal links, provider parity, real signup/checkout, field Core Web Vitals and conversion uplift remain unverified.

## Run locally

Serve this branch using your existing safe static server, for example `python3 -m http.server 8769 --bind 127.0.0.1`, after confirming that port is free. Open the returned local URL in Comet. Do not interrupt another app's port or browser profile.

Run `python3 tools/sync_v5_plans.py --check`. The optional smoke requires Playwright and Chromium; use the installed compatible environment and set `CHROMIUM_EXECUTABLE` when necessary. `python3 tests/marketing_v5_smoke.py` writes to ignored `test-output/v5` by default.

## Next

Read `MARKETING_V5_HANDOFF.md`; it is the V5-specific finishing contract. Older V4 documents remain as historical references. Do not use a V4 instruction to force this approved alternative back into V4's visual direction. Keep both available for founder comparison.
