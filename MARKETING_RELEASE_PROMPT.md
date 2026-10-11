# EVISOR — MARKETING V4 FINISHING AND RELEASE VALIDATION

You are the sole marketing implementation owner and integrator. Continue the existing built redesign; do not start a fifth homepage concept or restart the application redesign.

## Mandate and boundary

Use the marketing repository `grewaal/evisor`, review branch `design/marketing-v4-20261011`. Read `MARKETING_REDESIGN.md`, inspect actual current refs, and preserve newer work. The base is `5280507695d7f2b0b25748078ab72b2ee0984ea7`; the old homepage and standalone pages must remain recoverable.

This branch contains working HTML, CSS and JavaScript, not a mood board. Its main headline is “You know the books. Now win the work.” Preserve the product-specific direction unless a concrete founder finding justifies a bounded improvement.

The application release-hardening and template research are separate, active programs. Do not edit their worktrees, pricing authority, migrations, legal documents, database, infrastructure, or Foundry. Discover the active owner/checkpoint and send precise integration requests instead. Avoid shared ports and browser profiles. GitHub branch writes for this marketing work are permitted; live merge/deployment requires a separate founder approval after the checks below.

## Phase 1 — establish commercial and integration truth

1. Confirm the actual marketing repository, main/default branch, Pages or other hosting configuration, CNAME, current live source, existing deployment workflows and their triggers. Do not assume a feature-branch push is a live deployment. Never enable automatic merging.
2. Save a verified source archive/Git-history reference of the existing marketing release outside active worktrees. Do not include credentials or customer data. Do not delete older archives or rename/overwrite the app repository.
3. Coordinate read-only with the active application release owner. Identify the exact release that will serve signup, pricing, checkout, legal pages and public documents. The older application default branch may not be that release.
4. Reconcile the reviewed pricing snapshot against the CURRENT authoritative catalog, effective revisions, provider prices and approved terms. Verify client/document/send allowances, included seats, promotion eligibility, tax presentation and country/currency scope. Do not silently raise prices, activate promotions or change entitlements. Generate static pricing markup and toggle data from one approved public projection, with a drift test; never publish private application configuration.
5. Create a short claim ledger: claim, source/version, availability, approved wording, release gate. Remove or qualify anything not supported by the targeted live release. Do not assert genuine demand from registrations, guaranteed clients, worldwide legality, unqualified security certifications, permanent storage, guaranteed reply times, free upgrades or fabricated popularity. Omit unapproved Foundry functionality; if the research path is not available for launch, keep the document/pricing path useful and route the blocked item truthfully.
6. Verify signup/login/plan/legal destinations. `/choose-plan` was authenticated in the inspected app. Test anonymous and returning visitors, selected plan/billing period, registration/verification/OAuth where supported, checkout cancellation and safe return to the original task. Reuse existing approved intent contracts; do not invent query parameters or bypass redirect validation. Payment always requires the real explicit confirmation, and plan selection alone never grants entitlement. Report app-side changes to its owner rather than touching its files.

## Phase 2 — finish the actual page, not just the screenshots

Read locally installed instructions for relevant skills: impeccable (critique/clarify/polish), design-taste-frontend, high-end-visual-design, emil-design-eng, mobile-native, accessibility, browser testing and review-animations. Locate the actual UI resource router/context. Apply only relevant instructions, with one coherent navy/ink/neutral Evisor language. Do not install every library or run paid model APIs. Use one bounded read-only design reviewer if useful; do not spawn competing homepage editors.

Keep the compact header, readable hero, explicit product category, direct Start free CTA, ungated interactive illustration, practical question-led explanation, two entry paths, concise price comparison, FAQ and honest contact. No stock testimonial avatars or synthetic social proof. Keep illustrative examples clearly labeled; replace them with actual approved redacted captures only if available, never private client material or a screenshot that implies an unavailable feature.

Inspect visual craft at 1440, 1280, 1024, 768, 390, 375 and 320px, plus the founder's actual browser dimensions. Check heading wrapping, reading width, demo-height transitions, pricing alignment, annual equivalent wrapping, button reachability, native dialog scrolling, footer visibility, focus rings and mobile-menu behavior. Avoid bloated legal disclaimers in the hero, but keep material limitations beside the relevant claim. Do not mask clipping with global overflow-x:hidden.

Verify mobile menu, keyboard tabs (arrows/Home/End), sample dialog (Escape/backdrop/focus return), FAQs, pricing toggle, no-JavaScript core content and copy-email success/fallback. No “sent” confirmation without real transport. The current contact path is mailto plus copy; retain it or implement an explicitly authorized existing contact mechanism with honest failures and privacy disclosure. No fake chat.

The page deliberately has no analytics or consent storage. Decide explicitly whether to retain this or integrate the existing approved consent framework. Never silently add telemetry. If tracking is approved, reuse existing identifiers/taxonomy, measure CTA -> account -> meaningful first task -> confirmed paid activation, and exclude bots/internal preview. Test unset, denied, accepted and withdrawn consent; omit tokens, email addresses, message text, payment details and private prospects from events. Do not count a click as a subscription. With small cohorts, report counts and limitations rather than claiming statistical uplift.

Use the existing static architecture. Keep CSS/JS local, avoid runtime Tailwind/CDN/framework overhead and third-party fonts. A frontend bundle is not evidence of authentication, signup or checkout success.

## Phase 3 — qualify a launch candidate

Run the included smoke test and strengthen it where gaps are reproduced. Use a real local HTTP server in your environment for final hosting/path checks; the initial implementation was tested with offline set_content. Run Chrome/Comet plus available WebKit/Safari checks. Verify 200% text enlargement and representative 400% reflow, keyboard-only operation, reduced motion, accessible tab/dialog names, contrast and native details behavior. Run axe; manually adjudicate incompletes. Never call an automated pass complete certification.

Run meaningful repeated cold-load and interaction measurements on representative throttled mobile and desktop conditions, with the tested settings and sample sizes recorded. Check LCP, CLS and representative interactions; field INP cannot be certified from a few synthetic clicks. Do not confuse history-push timing, file size or localhost speed with real-user performance. Check asset caching/compression and avoid third-party requests before consent.

Preserve CNAME and all standalone pages/paths (`practice-plus.html`, `thank-you.html`, legal redirects, icons). Existing special-offer pages require separate factual review before implying that they are supported by this release. Maintain useful old anchors or documented redirects. Verify apex/www canonical behavior, status codes, favicon, social previews, metadata and legal links. Generate an appropriately licensed social-preview asset matching the new design; do not reuse stale screenshots or invent review ratings. Use structured data only for visible supported facts. Prepare sitemap/robots changes for approved public routes; never publish private app routes or bearer links.

Keep `noindex,nofollow` on review previews. Remove it only from the founder-approved production artifact during the authorized marketing release; a forgotten noindex is a launch blocker. Noindex is not access control.

Ask one fresh read-only reviewer to challenge the final rendered page, claims and purchase-entry paths before seeing your verdict. Fix reproducible material findings. Verify the final exact commit/build rather than inheriting old screenshots. Do not claim “10x conversions” or that every visitor will become a customer.

## Deliverable and stop condition

Return `READY_FOR_MARKETING_RELEASE_APPROVAL` or `BLOCKED`, with exact branch/commit/tree, old-release backup, changed files, before/after screenshots, measured results, accessibility findings, claim/catalog source versions, link/intent tests, analytics decision, and remaining integration/approval gaps. Leave the exact preview open locally in the founder's available browser and provide safe restart instructions. Update the draft PR but do not merge it or replace the live page automatically.

After the founder separately authorizes this MARKETING release: recheck main for concurrent changes; use the approved current artifact and hosting procedure; preserve rollback; verify the served files, canonical/TLS/status behavior, signup/plan/legal routes, robots/social metadata and consent; report observed deployment results. This never authorizes deploying the application, changing payment products, editing legal agreements or activating Foundry.

The goal is a finished, persuasive and truthful marketing journey connected to the correct application—not another large redesign program.
