# Evisor marketing v4 — review candidate

**Status: built for review; not approved for live publication.** This branch is deliberately `noindex,nofollow`. Do not merge it directly into the serving branch. The existing homepage, domain configuration, and standalone pages are preserved on `main`.

## Source and scope

- Marketing repository: `grewaal/evisor`.
- Preserved base commit: `5280507695d7f2b0b25748078ab72b2ee0984ea7`.
- Base tree: `fbf7e410ea8c2ffeab964b1a7425ec3440c6a41b`.
- Changes: replacement homepage on this review branch, local CSS/JavaScript, and review/release documentation/tests. No application, backend, legal-page, CNAME, DNS, payment-product, or Foundry changes.
- `practice-plus.html`, `thank-you.html`, `privacy.html`, `terms.html`, and existing image/favicon assets are intentionally preserved. Existing standalone commercial offers require their own review; preserving a page is not endorsing every claim on it.

## Refined mandate

Help an appropriate bookkeeping practitioner understand the product, recognize a useful starting point, see an honest example, and choose to create an account. The objective is qualified activation and retained paid use, not clicks obtained through stronger promises. No measured conversion improvement is claimed.

## Positioning and structure

**You know the books. Now win the work.**

The supporting sentence defines the category immediately: research potential clients, price services, and prepare proposals and engagement letters. The page then answers three customer questions: who is worth contacting, what should I charge, and what happens when someone is interested?

1. Hero with Start free and an ungated interactive illustrative workflow.
2. Three practical customer questions, expressed in practitioner language.
3. A compact six-step continuity strip: Research, Connect, Price, Propose, Sign, Keep moving.
4. Professional client-document illustration and a working sample dialog.
5. Two starting paths: seeking a client versus preparing work for an existing prospect/client.
6. Clear Free option and three paid-plan cards with monthly/annual billing.
7. Trust through control, readable scope, and accurate decision boundaries.
8. Eight practical FAQs, closing CTA, and honest email contact.

The navy/ink/white visual system aligns with the redesigned application. No stock portraits, invented customer logos, fake testimonials, autoplay carousel, animated revenue counter, or runtime component CDN is used.

## What changed from the old marketing approach

- Removed unsupported urgency, untouched-prospect implications, permanently available document-access promises, unverified popularity badges, and unsupported competitor comparisons from the new homepage.
- Removed the competing high-touch Practice Build pitch from this homepage. Its standalone/legacy material is not deleted.
- Replaced the scripted chat intake that acknowledged messages without confirmed transport with a real email link and copy-email affordance. This preview does not collect or submit visitor data.
- Replaced runtime Tailwind CDN and external font loading with local CSS and a system-font stack.
- Kept product demonstrations explicitly illustrative. Cedar & Coil Services and the $950 fee are fictional examples, not a customer, testimonial, generated lead, price recommendation, legal template, or live account screenshot.
- Kept claims about research separate from actual bookkeeping demand and client acquisition outcomes.

## Pricing snapshot: must reconcile before publication

Reviewed source: `grewaal/evisorapp`, `backend/config/plans.json`, commit `11737d21c32810450bdf2818c04f36eb8c75ec14`, active pricing/limits revision `2026_08`.

| Plan | Monthly USD | Annual monthly equivalent | Annual total USD |
|---|---:|---:|---:|
| Free | 0 | 0 | 0 |
| Starter | 25 | 19 | 228 |
| Practice | 59 | 45 | 540 |
| Firm | 149 | 113 | 1356 |

This is a reviewed repository snapshot, not a live-provider quote. The application is being hardened separately and may have newer local contracts. Verify prices, allowances, send-count semantics, included seats, availability, tax wording, and terms with that owner before publication. Do not change subscriptions or entitlements to match the marketing page.

The HTML baseline and JavaScript toggle currently contain the same bounded snapshot. Before launch, generate both from one approved public plan projection and add a drift check. Do not publish private configuration from the application repository. No unsupported founding-rate strikethrough or rounded-up free-month claim remains.

## Interaction and privacy behavior

- Primary signup links use the existing `https://my.evisor.app/register` route.
- Paid comparison links use existing `https://my.evisor.app/choose-plan`. This route was protected in the inspected app; anonymous-to-signup-to-plan continuity MUST be verified before release. Do not claim the chosen plan or workflow is preserved until tested.
- `data-cta` identifiers are inert hooks, not working analytics. The preview runs no analytics, cookie storage, fingerprinting, third-party form transport, or automatic product mutations.
- Keep tracking absent unless a consent-aware integration is approved. If introduced, test denied/unset/accepted/withdrawn consent, avoid duplicate pageviews, and never collect sensitive document, token, payment, or prospect content.
- Native FAQs remain useful without JavaScript. Signup links and core copy remain available. Interactive-only controls are hidden in no-JavaScript mode.

## Verification already performed

Offline Chromium, using local markup/assets: **45 check records across eight widths: 1440, 1280, 1024, 900, 768, 390, 375, 320px**. Checks include horizontal bounds, all three demo states, billing toggle arithmetic/display, mobile navigation, dialog dismissal/focus return, keyboard tab navigation, native FAQ behavior, reduced motion, no-JavaScript content, unique IDs/one H1, and 16 internal anchor targets. Zero observed JavaScript errors and zero external network requests in those tests.

The standalone preview is approximately 58.7 KB raw / 15.0 KB gzip. This is a file-size measurement, NOT a Lighthouse score or field loading-time result.

**Not verified here:** live app registration/checkout/OAuth; live pricing/provider parity; automated axe audit; actual Comet/Safari/mobile-device behavior; 200%/400% browser zoom; deployed security headers/cache/CDN; field Core Web Vitals; conversion or retention uplift. Review those before publication.

The distributable smoke test uses offline `set_content` because a localhost server was unavailable to the test browser. It is not evidence that HTTP hosting or app redirects work.

## Release gates

Read `MARKETING_RELEASE_PROMPT.md`. Keep the current website intact until all publication conditions are met and the founder approves the rendered candidate. Do not replace the application or alter the independent release-hardening/template/Foundry programs.

## Research/reference basis

These sources informed interface clarity and craft, not a quantitative conversion promise:

- GOV.UK: writing for user interfaces — https://www.gov.uk/service-manual/design/writing-for-user-interfaces
- GOV.UK: user needs — https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs
- Impeccable published skill guidance — https://github.com/pbakaus/impeccable
- Emil Kowalski, Agents with Taste — https://emilkowal.ski/ui/agents-with-taste
- Actual marketing source and linked application plan/routing source at the revisions above.

Private customer correspondence is not included in this public repository and is not being used as a testimonial.
