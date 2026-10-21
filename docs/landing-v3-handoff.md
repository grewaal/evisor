# Evisor landing v3: handoff

_v3 replaced v2 on evisor.app on 21 Oct 2026. Working branch: `claude/affectionate-mendel-7acz8b`. Strategy and copy are in `docs/landing-v3-copy.md`._

## Roll back (if ever needed)

- **Back to v2:** `git revert --no-edit <v2-head>..main && git push origin main`. `<v2-head>` is `7ed622d`, the commit that was live before v3. This adds new commits and keeps history intact.
- **Older versions stay online, unlinked and `noindex`:**
  - v2 at `/archive/landing-v2-2026-10/`. It still loads `/assets/v2/*`, so never delete that folder.
  - v1 at `/archive/landing-v1-2026-10/`.

## Preview locally

```bash
git fetch origin claude/affectionate-mendel-7acz8b
git checkout claude/affectionate-mendel-7acz8b
python3 -m http.server 8080        # from the repo root
```

| URL | What it shows |
|---|---|
| http://localhost:8080/ | v3, the default hero |
| http://localhost:8080/?angle=referrals | Ad variant. The others are `pricing`, `signing`, `new` and `leads`. |
| http://localhost:8080/?area=US-CO | Coverage line for a live state ("Find Clients is live in Colorado.") |
| http://localhost:8080/?area=US-TX | Coverage line for a state that isn't live yet |
| http://localhost:8080/?area=GB | Coverage line for a non-US visitor. `AU`, `CA`, `NZ` and `IE` work too. Without `?area`, the visitor's time zone picks this. |
| http://localhost:8080/?proof=placeholder | The testimonial layout with clearly marked placeholders (only works on localhost) |
| http://localhost:8080/archive/landing-v2-2026-10/ | v2, for comparison |

## The idea, in one paragraph

The headline makes three claims: **Find your next clients. Know your number. Get it signed.** Each claim carries a note marker (1, 2, 3), the way a set of accounts points to its notes. The page then backs each claim with the real product:

| Note | Section | What it shows |
|---|---|---|
| 1 | `#find` | Find Clients workbench, coverage checker |
| 2 | `#quote` | Underquote calculator, pricing screen |
| 3 | `#sign` | Tap-to-sign demo, signing record |

Every chapter opens with the question bookkeepers actually ask. Under the hero, a short list of real forum thread titles shows the visitor they're not alone. The page ends with a future-paced close ("Picture next Monday") and the first twenty minutes.

## Ads: message match (use this for acquisition)

Send each ad to the URL whose first line repeats the ad's promise. The swap happens before first paint, so there is no flicker. Every analytics event then carries `angle`.

| Angle | URL | Headline the visitor sees | Use it for |
|---|---|---|---|
| default | `evisor.app/` | Find your next clients. Know your number. Get it signed. | Brand and general traffic |
| `referrals` | `evisor.app/?angle=referrals` | Stop waiting on referrals. Start choosing your clients. | "Tired of waiting on referrals?" ads |
| `pricing` | `evisor.app/?angle=pricing` | Know what to charge before they ask. | "What should I charge for bookkeeping?" searches. Works in every state. |
| `signing` | `evisor.app/?angle=signing` | Send it today. They sign it on their phone. | Engagement-letter and e-signature searches. Works in every state. |
| `new` | `evisor.app/?angle=new` | Look established from your very first client. | New bookkeepers and course graduates |
| `leads` | `evisor.app/?angle=leads` | No bidding wars. No per-lead fees. No guessing why. | People searching for lead sites or their alternatives |

**Rules of thumb:**
- Geo-target Find Clients ads ("find bookkeeping clients near you") to Colorado, New York and Oregon only, and add `&area=US-CO` (or `US-NY`, `US-OR`) so the coverage line names their state.
- Everywhere else, lead with `pricing` or `signing`. Those work in every state today, and the page tells non-covered visitors plainly that Find Clients isn't there yet.
- Keep `utm_*` on every ad URL. Signup links forward them to `my.evisor.app/register`.

**To edit an angle:** change the inline script directly after the hero in `index.html` (search for `referrals:`). Each entry is `[kicker, [headline lines], subhead]`. Keep every claim to what the product does today.

## What's where

| File | Purpose |
|---|---|
| `index.html` | All copy and markup, plus two small inline scripts: ad angle and coverage before first paint, and arming the hero animation. Readable without JS. |
| `assets/v3/config.js` | Prices, plan cards, coverage list, proof, promise, Practice Build, links |
| `assets/v3/landing.css` | App tokens (UI V3) and all styles |
| `assets/v3/landing.js` | Behaviour (no dependencies). See the list below. |
| `assets/v3/og.png` | Social share image (1200×630) |
| `assets/v2/*` | Kept only because the archived v2 page uses it |
| `docs/landing-v3-copy.md` | Strategy, psychology map, copy, forum-title sources, ad kit |

`landing.js` handles:
- consent-gated GA4
- pricing render
- signup links with UTM pass-through
- the hero chain animation
- the Find Clients workbench
- the coverage checker
- the underquote calculator
- the sign demo
- the nav
- the mobile dock
- FAQ tracking
- the contact form

## How to edit

### Prices and plans
- Edit `plans` in `assets/v3/config.js`. The plan cards, savings, CTA links, the one-client calculator and the Practice Build line all follow from it.
- Also update the static `<noscript>` summary in `index.html` (search "plans-fallback"), plus the FAQ "How is Practice different from Starter?".

> **Practice price check.** The page shows **$79 monthly / $69 per month billed annually ($828)**, as decided. The app's `plans.json` (2026_08) and checkout charge **$59 / $45 ($540)**. To match the app, set `price: { monthly: 59, annualMonthly: 45, annualTotal: 540 }` on Practice.

### Find Clients coverage (three places)
1. `coverage.live` in `config.js`. This drives the checker and every "Colorado, New York and Oregon" list.
2. `data-live` on the hero's `[data-cov-note]` in `index.html`, in the form `US-CO:Colorado,US-NY:New York,US-OR:Oregon`. That copy runs before first paint, without `config.js`.
3. The static text "Colorado, New York and Oregon" in `index.html` and in the JSON-LD FAQ in `<head>`.

### Forum thread titles
- They are verbatim public thread titles; sources are listed in `docs/landing-v3-copy.md`.
- Only add a title you have opened and confirmed yourself.
- Never add usernames, and never present a forum post as an Evisor testimonial.

### Proof (testimonials, founder)
- **Testimonials.** Add real, permissioned entries to `proof.testimonials`. They render in "Straight talk", under the team note.
- **Founder.** Set `proof.founder` (`name`, `role`, `photo`) to sign the team note as a person. This is the single biggest trust upgrade available.
- **Placeholder flag.** Keep `PROOF_PLACEHOLDER: false` in production.

### Design tokens
- The `:root` block in `landing.css` mirrors the app's `frontend/src/index.css`. `--lp-*` tokens are landing-only and derived from it.
- Green (`--ev-positive`) is reserved for two moments: a fee that clears the floor, and a signature.

## Placeholders and decisions that need you

| # | Item | Where | Default today |
|---|---|---|---|
| 1 | Testimonials (3–5, named, photo, permission) | `config.proof.testimonials` | Hidden. An honest "no logos here yet" note is shown instead. |
| 2 | Founder name and photo | `config.proof.founder` | "The Evisor team" |
| 3 | Practice price (page $79/$69, app $59/$45) | `config.plans[practice].price` | $79 / $69 (your decision) |
| 4 | "Our promise" (first proposal in week one, or a call) | `config.promise.enabled` | Shown. Confirm you still offer it. |
| 5 | Practice Build ($1,500, 12 months of Practice, four a month) | `config.practiceBuild` | Shown. Confirm price, inclusions and capacity. |
| 6 | Coverage list | three places, see above | Colorado, New York, Oregon |
| 7 | Illustrative product data | `index.html` / `landing.js` | Labelled "illustrative". Uses fictional names, `.example` domains, 555 numbers and the documentation IP 203.0.113.24. |

## Analytics events (GA4, only after the visitor accepts analytics)

Every event carries `angle` when the visitor arrived on an ad variant.

| Event | Parameters |
|---|---|
| `landing_context` | `angle`, `area`. Sent once on load, when either is set. |
| `cta_click` | `cta_id` (see below), `plan`, `billing`, `link_url` |
| `coverage_check` | `area`, `status` (`live` / `not_yet`) |
| `demo_interaction` | `demo` (`find`), `action` (`select` / `reveal`) |
| `underquote_calculator` | `clients_band`, `gap`. Sent on first use. |
| `sign_demo` | `action` (`sign` / `replay`) |
| `billing_toggle` | `billing` |
| `plan_finder` | `answer` |
| `roi_calculator` | `fee_band` |
| `faq_open` | `faq_id` |
| `section_view` | `section` (hero, asking, find, quote, sign, after, straight, pricing, faq, final_cta, contact) |
| `scroll_depth` | `percent` |
| `contact_submit` | `topic`, `status` |

`cta_id` values: hero_primary, hero_secondary, hero_coverage, nav, mobile_menu, find_free, coverage_live, coverage_not_yet, quote, plan_*, practice_build, final_primary, final_pricing, dock, footer.

**Worth watching first:**
- `cta_click` by `angle`
- the share of visitors who use the sign demo or the underquote calculator, and their signup rate
- `coverage_check` areas: these tell you which state to open next

## Known limitations

- **No build step.** CSS (≈19 KB gz) and JS (≈14 KB gz) ship unminified.
- **Cache-busting.** Pages caches for 10 minutes. Bump the `?v=` on the CSS and JS links when you change them.
- **Contact form.** Uses the same formsubmit.co endpoint as before.
- **"Talk to us" and Practice Build** prefill the contact form; there is no scheduler.
- **No live data.** The page never calls the app or the lead engine.
- **Favicon.** Still the teal glyph the app uses.
