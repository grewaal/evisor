# Evisor landing v2 — handoff

_Live on evisor.app since 21 Oct 2026, 07:59 UTC: `main` was fast-forwarded from `5280507` (v1) to `eb7dda8` (v2) at the founder's request, and the GitHub Pages build and deploy succeeded. Working branch: `claude/affectionate-mendel-7acz8b`._

## Roll back (if ever needed)

- **Safest:** `git revert --no-edit 5280507..main && git push origin main`. This restores v1 with a new commit and keeps history intact.
- **The old page is always available** at `/archive/landing-v1-2026-10/`.

## Preview locally

```bash
git fetch origin claude/affectionate-mendel-7acz8b
git checkout claude/affectionate-mendel-7acz8b
python3 -m http.server 8080        # from the repo root
```

| URL | What it shows |
|---|---|
| http://localhost:8080/ | the new page |
| http://localhost:8080/archive/landing-v1-2026-10/ | the old page, for side-by-side comparison (needs internet: it loads Tailwind from a CDN) |
| http://localhost:8080/?hero=b | hero variant B (also `?hero=c`) |
| http://localhost:8080/?proof=placeholder | the testimonial layout with clearly marked placeholders |

Any static server works. Paths are root-relative (`/assets/...`), so serve from the repo root rather than opening the file directly.

## What's where

| File | Purpose |
|---|---|
| `index.html` | All page copy and markup. Static, readable without JS (good for SEO and no-JS visitors). |
| `assets/v2/config.js` | **The one place for prices, plan cards, coverage, proof, promise, Practice Build, experiments and links.** |
| `assets/v2/landing.css` | Design tokens (mirrored from the app) and all styles. |
| `assets/v2/landing.js` | Behaviour: consent-gated GA4, pricing render, signup links, hero demo, coverage checker, journey, calculator, dock, contact form, A/B. No dependencies. |
| `assets/fonts/` | DM Sans Variable (OFL), the same version the app pins. Self-hosted, so there is no Google Fonts request. |
| `assets/v2/og.png` | Social share image (1200×630). |
| `archive/landing-v1-2026-10/` | The previous page, untouched apart from `noindex`. |
| `docs/landing-v2-strategy.md` | Research, positioning, architecture, measurement and A/B backlog. |
| `docs/landing-v2-copy.md` | The copy deck and hero variants. |
| `_config.yml` | Keeps `docs/` off the published site. |
| `robots.txt`, `sitemap.xml` | New. |

## How to edit

### Prices and plans
Edit `plans` in `assets/v2/config.js`. These all update automatically from it:
- each card's price
- the "billed … a year · you save …" line
- the "Save up to N%" badge (computed)
- "from $19/mo" in the comparison table
- the one-client calculator, which uses Practice's annual total
- the Practice Build "includes 12 months of Practice ($X of it)" line
- every plan CTA's `?plan=&billing=` link

Also update the static `<noscript>` summary in `index.html` (search "plans-fallback") and the FAQ answer "How is Practice different from Starter?" if limits change.

> **Practice price check.** The page shows **$79 monthly / $69 per month billed annually ($828)**, as decided. The app's `plans.json` (revision 2026_08) and checkout charge **$59 / $45 ($540)**. To match the app, set `price: { monthly: 59, annualMonthly: 45, annualTotal: 540 }` on the Practice plan.

### Find Clients coverage
Edit `coverage.live` in `config.js`. Add `{ code: 'US-TX', name: 'Texas' }` (US states use `US-XX`; countries use `GB`, `IE`, `AU`, `CA`, `NZ`). This updates:
- the hero chip
- the coverage checker
- "Live today …"
- the FAQ answer

Also update the static text in `index.html`, which has the same default, so search for "Colorado, New York and Oregon". And update the JSON-LD FAQ answer in `<head>`.

### Copy
Edit `index.html` directly; each section is labelled with a comment banner. Hero variants live in `config.experiments.hero.variants`. Variant A must stay identical to the static H1 and subhead in the HTML.

### Proof (testimonials, founder)
- **Testimonials.** Add real, permissioned entries to `proof.testimonials` (`quote`, `name`, `practice`, `location`, `photo`). They render under "From the people building Evisor" automatically.
- **Founder.** Set `proof.founder` (`name`, `role`, `photo`) to put a real person on the team note.
- **Placeholder flag.** Keep `PROOF_PLACEHOLDER: false` in production. It only exists so the layout can be reviewed (`?proof=placeholder` does the same without editing).

### Promise and Practice Build
- `promise.enabled` shows or hides "Our promise".
- `practiceBuild.enabled` shows or hides Practice Build. Its `price`, `includesMonths` and `capacityNote` are also in config.

### Design tokens
The `:root` block at the top of `landing.css` mirrors the app's `frontend/src/index.css` (UI V3).
- If the app's tokens change, copy the new RGB triplets across.
- `--lp-*` tokens are landing-only and derived from them:
  - the ink bands
  - shadows
  - motion
  - layout

## Placeholders and decisions that need you

| # | Item | Where | Default today |
|---|---|---|---|
| 1 | Testimonials (3–5, named, photo, permission) | `config.proof.testimonials` | Hidden; honest "no logos here yet" note shown instead |
| 2 | Founder name and photo on the team note | `config.proof.founder` | "The Evisor team" |
| 3 | Practice price: page shows $79/$69, app charges $59/$45 | `config.plans[practice].price` | $79 / $69 (your decision) |
| 4 | "Our promise" (first proposal in week one, or a call) | `config.promise.enabled` | Shown, carried over from v1. Confirm you still offer it. |
| 5 | Practice Build ($1,500, 12 months of Practice included, "four practices a month") | `config.practiceBuild` | Shown, carried over from v1. Confirm price, inclusions and capacity. The "first prospects" deliverable is now scoped to covered areas. |
| 6 | Coverage list | `config.coverage.live` | Colorado, New York, Oregon |
| 7 | Hero mock, journey screens and certificate data | `index.html` / `landing.js` | Illustrative names, `.example` domains, 555 phone numbers, documentation-range IP 203.0.113.24. Labelled "illustrative" on the page. |

## Analytics events (GA4, only after the visitor accepts analytics)

| Event | Parameters |
|---|---|
| `cta_click` | `cta_id` (hero_primary, hero_secondary, hero_coverage, nav, mobile_menu, evidence_free, coverage_live, coverage_not_yet, journey, first_twenty, plan_free, plan_starter, plan_practice, plan_firm, practice_build, final_primary, final_pricing, dock, footer), `plan`, `billing`, `link_url` |
| `coverage_check` | `area` (e.g. `US-TX`, `GB`), `status` (`live` / `not_yet`) |
| `journey_step` | `step` (1–6), `method` (`scroll` / `click`) |
| `demo_interaction` | `demo` (`hero`), `action` (`select` / `reveal`) |
| `evidence_annotation` | `key` |
| `billing_toggle` | `billing` |
| `plan_finder` | `answer` (`starter` / `practice` / `firm`) |
| `roi_calculator` | `fee_band` |
| `faq_open` | `faq_id` |
| `section_view` | `section` |
| `scroll_depth` | `percent` (25/50/75/100) |
| `contact_submit` | `topic`, `status` |
| `experiment_exposure` | `experiment`, `variant` |

Every event also carries `hero_variant` when an experiment is running.

**Attribution:**
- The consent key and behaviour are unchanged from v1 (`evisor_analytics_consent`), so returning visitors keep their choice.
- Signup links forward any `utm_*` parameters to `my.evisor.app/register`. The app doesn't store them yet; that is a small app-side change.
- There is no cross-domain link between landing GA4 and app PostHog.

## A/B testing
- Set `experiments.hero.enabled: true` to split visitors evenly across variants A/B/C. The choice is stored per browser, and the variant is attached to every event.
- At current traffic, run a 15-person ICP message test first (see the strategy doc §10).

## Verified (21 Oct 2026, on this branch)
- **Lighthouse** (served with gzip, as GitHub Pages does):
  - mobile: Performance 100, Accessibility 100, Best Practices 100, SEO 100. LCP 1.7 s, TBT 50 ms, CLS 0.
  - desktop: 100 / 100 / 100 / 100.
- **axe-core** WCAG 2.0/2.1/2.2 A+AA plus best practice: 0 violations at 390, 768 and 1440 px.
- **Keyboard:** logical tab order with a visible focus ring everywhere. The billing toggle works with arrow keys, journey tabs on small screens work with arrows, Escape closes the mobile menu.
- **Reduced motion:** all content visible, no auto-animation, and the hero demo waits for a click.
- **No horizontal overflow** at 360–1920 px. Mocks switch to the app's own one-column layout below 760 px and drop the rail below 1024 px.

## Known limitations
- **No build step.** CSS (≈19 KB gz) and JS (≈14 KB gz) ship unminified. That is fine at these sizes; a minifier can be added later.
- **GitHub Pages cache.** Pages sets a 10-minute cache, which Lighthouse flags. Assets are versioned with `?v=` query strings; bump them when you change CSS/JS.
- **Contact form.** It uses the same formsubmit.co endpoint as v1. The v1 "Eva" chat widget was removed: it was a form styled as a chatbot, which reads as fake to sceptical visitors.
- **The Practice Build and Firm "Talk to us" links** prefill the contact form; they don't open a scheduler.
- **No live data.** The page never calls the app or the lead engine, so the coverage checker reads only `config.coverage`.
- **Favicon.** The favicon is still the teal glyph, the same one the app uses today. Updating both to ink-blue is a separate app change.
