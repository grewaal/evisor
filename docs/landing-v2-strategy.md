# Evisor landing page v2 — strategy

_Written 21 Oct 2026 for the v2 rebuild of evisor.app. Companion files: `docs/landing-v2-copy.md` (the copy deck) and `docs/landing-v2-handoff.md` (how to edit and ship)._

> **Read first — three facts that shaped everything below.**
>
> 1. **Find Clients covers Colorado, New York and Oregon today.** The registry feeds for the UK, Ireland, Australia, Canada, Connecticut and Pennsylvania were retired on 15 Oct 2026. Leads now come from open business-listing data (Overture Maps). They are existing local businesses, not new registrations. The founder confirmed this coverage for the page. Coverage lives in one config entry (`coverage` in `assets/v2/config.js`), so adding a market is a one-line change.
> 2. **Practice is shown at $79/mo, or $69/mo billed annually**, as on the live site (founder's decision, 21 Oct). The app's active plan file and checkout quote **$59 / $45**. A visitor who clicks through will see the lower number. One config edit aligns them; see Risks.
> 3. **There is no customer proof yet.** No testimonials, logos, ratings or usage counts were found that could be published. The page earns trust through product truth, specificity and transparency instead. Proof components exist behind `PROOF_PLACEHOLDER` for when real proof arrives.

---

## 1. Research summary

### 1.1 What moves visitor-to-signup conversion (evidence-graded)

| Lever | What the evidence says | Strength | Used on the page as |
|---|---|---|---|
| 10-second clarity | Visitors decide to stay or leave in about 10 s. The value proposition must land in that window. [NN/g](https://www.nngroup.com/articles/how-long-do-users-stay-on-web-pages/) | Strong | H1 = outcome + mechanism, under 10 words. Audience in the eyebrow. |
| The fold still matters | 57% of viewing time is above the fold and 74% in the first two screens. [NN/g 2018](https://www.nngroup.com/articles/scrolling-and-attention/) | Strong | Real product UI, CTA and coverage truth all in the first screen. |
| Plain language | Copy at a 5th–7th grade reading level converted at 12.9% vs 2.1% for professional-level copy (correlational). [Unbounce 2024](https://unbounce.com/conversion-benchmark-report/saas-conversion-rate/) | Medium | Short words, short sentences, bookkeepers' own phrasing. |
| Low complexity + prototypicality | First impressions form in 17–50 ms. Simple pages that look like their category are rated most appealing. [Tuch et al., Google 2012](https://research.google/pubs/the-role-of-visual-complexity-and-prototypicality-regarding-first-impression-of-websites-working-towards-understanding-aesthetic-judgments/) | Strong (lab) | Light "accounting software" canvas, one accent, calm motion. Dark used only as two deliberate bands. |
| Show the price | B2B buyers rank pricing as the most-needed information and leave when it is hidden. [NN/g](https://www.nngroup.com/articles/show-price/) | Strong | Full pricing on the page, and "from $19/mo" near the top. |
| Recommended plan | Highlighting a plan draws attention to it. [CXL](https://cxl.com/research-study/pricing-page-study-highlight/) | Medium | Practice highlighted. A "Which one is you?" finder routes people to the right plan. |
| Form friction | Number of fields matters more than number of steps. Phone fields and text areas hurt most. [Baymard](https://baymard.com/research-articles/checkout-flow-average-form-fields), [HubSpot](https://blog.hubspot.com/blog/tabid/6307/bid/6746/which-types-of-form-fields-lower-landing-page-conversions.aspx) | Strong | The CTA goes straight to the app's 2-field signup (or Google). The plan is carried through in the URL. |
| Photo testimonials | Testimonials with photos hold attention and are remembered; logo walls are not. Testimonials that start sceptical persuade best. [CXL](https://cxl.com/research-study/social-proof/), [NN/g](https://www.nngroup.com/articles/trustworthy-design/) | Strong | Placeholder component built to that spec, hidden until real. |
| Speed | 0.1 s faster mobile load went with about +8% conversion. Rakuten's A/B test gave +33%. [web.dev](https://web.dev/case-studies/vitals-business-impact) | Strong | No CDN scripts, self-hosted font, about 1 request per asset type, no layout shift. |
| No auto-rotating carousels | They hide content and get mistaken for ads. [NN/g](https://www.nngroup.com/articles/auto-forwarding/) | Strong | The journey demo is driven by scroll or clicks, never on a timer. |
| Interactive tours | Interactive demos correlate with higher demo-to-opportunity rates. [Navattic 2025](https://navattic.com/report/state-of-the-interactive-product-demo-2025) | Weak (vendor) | A scroll-driven product walkthrough you can also click through. |
| Guarantees | Mixed. One field experiment found no overall sales lift (Barach et al., *Management Science* 2020). Some practitioner tests show lifts. | Mixed | No guarantee exists anyway. Risk reversal comes from the free plan with no time limit, plus the founder's first-week promise. |

**Myths deliberately not followed:** button colour (contrast matters, hue does not); "one CTA only" (the page uses one primary action plus one quiet secondary); "the fold doesn't matter"; "logos are the best proof"; "a perfect 5.0 rating is best".

### 1.2 Competitor teardown (condensed)

| Product | Hero formula | Entry price (public, Oct 2026) | Starts at… |
|---|---|---|---|
| Ignition | Outcome + mechanism ("Price smarter and win clients faster…") | $39/mo Solo (annual) | the proposal |
| Karbon | Category label ("Practice Management Software for Accounting Firms") | $59/user/mo | the job |
| Financial Cents | Category label + "One Platform. Total Control." | $19/mo Solo | the job |
| TaxDome | Category label ("…connects your firm, your team, and your clients") | ~$58/user/mo, annual only | the job |
| Uku | Category + quality claim ("…done right") | $19/member | the job |
| Anchor | Outcome ("Get Paid on Autopilot") | $0 + $5/payment | the agreement |
| GoProposal (Sage) | — | ~£60+/mo | the proposal |
| Lead marketplaces (Bark, BookkeepingLeads, Booked By Friday) | — | $50–60 per shared lead; vendors admit 10–30% convert | a shared enquiry |
| Registry list tools (Company Reach, Leadistry) | Timing ("New UK companies, the moment they incorporate") | credits / £10+ | a raw list |

Premium references (Linear, Stripe, Ramp, Attio, Pilot) informed craft rather than copy:
- Real product UI at hero scale.
- One job per section.
- Specific numbers only when they are true.
- "Living" data cards that make a mechanism tangible (Attio).
- Transparent pricing as a trust signal (Pilot).

What we avoided: dark-mode-everything (wrong for this audience), "magic"/AI language, and unverifiable counters.

_Note: the research agent could not open live pages (network policy). Hero wording comes from search-indexed text and should be spot-checked before any comparison claim is published. The page therefore compares **categories**, not named competitors or their prices._

### 1.3 How bookkeepers talk about the problem

These come from public forums and reviews, plus two pseudonymised founding users in internal notes. The exact wording was confirmed where marked **[V]**.

- "**10 strong, believable leads over 100 random.**" (founding user, US)
- Cold calls were a "**waste of time**". "Bookkeeping is a trust purchase; strangers calling out of the blue are not trusted." (founding user, US)
- "**I am not a sales person at all** and just need some ideas" (Quora) [V]
- "**I had 5 months of no work** … then over the next three months it all rolled in and I could have been working 24 hours a day." (Mumsnet, UK) [V]
- "**Actually the bookkeeping part is the easy bit.**" (Mumsnet, UK) [V]
- "Word of mouth is a supplement, not a system." (UK Bookkeepers Alliance) [V]
- "Easy lead gen and direct contacts, but **too many spam leads and costly credits**." (G2 review of Bark) [V]
- "have since gotten **zero leads** through the Find a ProAdvisor site" (QuickBooks community) [V]
- "**Help! How much do you charge for bookkeeping?**" (AAT forum) [V]
- "I quoted 5 hours bookkeeping a quarter … The bookkeeping actually took 16 hours" (AccountingWEB) [V]
- "you're selling right up until the engagement letter is signed and the first payment arrives" (Bookkeeping Side Hustle) [V]

### 1.4 Market awareness (Schwartz)

- **Problem-aware, intensely.** "Getting more clients" is the top challenge for solo and virtual bookkeepers. Referrals dominate how small businesses find a bookkeeper: about 58% in one vendor survey.
- **Solution-aware and burned.** They have tried flyers, Facebook groups, directories, Upwork, Bark and bought lists. "Leads" now reads as junk, shared and spammy.
- **Practice tools: Stage 4–5, saturated.** "All-in-one", "save hours", "AI-powered" and "win clients faster" are invisible now.
- **Software that helps a bookkeeper *find* clients: Stage 1–2, nearly empty.** Lead buying sits next to it at Stage 4+ and carries a stigma.
- **The prescribed move: name a new mechanism, not a bigger promise.** Not "more leads" but **evidence on every business, honesty about what's unknown, and one thread from first look to signed letter.**

---

## 2. ICP and the segment this page is built for

| Segment | Pain with finding clients | Can they convert a lead? | Role on this page |
|---|---|---|---|
| **EXP**: skilled, under-booked independent bookkeeper (0–15 clients, often newly self-employed) | High ("25 years' experience, zero clients") | High | **Primary.** Every headline is written for them. |
| **GROW**: referral-dependent solo (10–30 clients, feast-or-famine) | Medium-high, episodic | High | Secondary. Same promise, with "stop waiting on referrals" as the challenger hero. |
| **NEW**: brand-new solo (0–3 clients) | Highest and loudest | Low (they also need pricing confidence and credibility) | Served by "Your first twenty minutes", the pricing calculator and templates. Not the headline. |
| **PRAC**: 2–5+ person practice | Lower. Their pain is capacity, consistency and approvals | High | Firm plan card and team controls. |

**Geography.** Optimise for the US now, because that is where Find Clients is live. Every other part of Evisor works anywhere, including jurisdiction-aware letters for the US, UK, Australia, Canada and New Zealand. Visitors outside covered areas get an honest answer from the coverage checker and a reason to start anyway.

---

## 3. Promise and positioning

**Single core promise:** _Find your next clients — with the evidence on every business — and sign them in the same place._

**Positioning statement.** For independent bookkeepers who are good at the work but short on clients, Evisor is where you find, price and sign new clients. It shows real local businesses with the case for each one, including what isn't known. When one says yes, it carries them through pricing, proposal, engagement letter, e-signature, onboarding and renewal. Lead lists hand you names with no reason, and marketplaces sell the same enquiry to five firms. Proposal tools start once you already have a client. Evisor starts at "who should I talk to?"

**The differentiator in one word: _evidence_.** It fits the product, because the Find Clients panel literally says "Why it is here", "What we don't know" and "Check before outreach". It also fits the audience: bookkeepers reconcile, tick, document and show their work.

**Why now:** referrals plateau, lead marketplaces have burned trust, and the competing tools all start too late. The page frames it as a cost of waiting ("five months of no work"), never as fake urgency.

---

## 4. Message hierarchy

1. **Who it's for, and the outcome:** independent bookkeepers; find your next clients.
2. **The mechanism:** evidence on every business, gaps included. You review before you spend anything.
3. **The system:** one thread from find → price → propose → sign → onboard → renew.
4. **Safety:** Evisor never contacts anyone for you; signed letters can't be altered; your clients pay you directly, at 0% to Evisor.
5. **Low risk:** free plan, no card, no time limit; paid from $19/mo; one client covers years of it.

---

## 5. Objections and how the page answers them

| # | Objection, in their words | Answer, all verified | Where |
|---|---|---|---|
| 1 | "Will these be junk? Are they even real?" | Every business shows why it's there, which contact routes are on record, and what isn't known. Evisor won't pad a quiet area with weaker records or quietly widen your search. If a promised contact route fails its check, the unlock comes back. You can browse names-masked for free first. | Hero mock, Evidence section, FAQ |
| 2 | "I'm not a salesperson / I hate cold calling." | Evisor never contacts anyone on your behalf. You decide who's worth a conversation and how you start it. Reviewing never commits you to anything. | Evidence rules, FAQ |
| 3 | "Is this the same lead sold to five bookkeepers?" | It isn't a marketplace: no credits, no pay-per-lead, no bidding on someone's quote request. (We do **not** claim exclusivity.) | Comparison, FAQ |
| 4 | "Is this spammy or legal?" | You are the sender and stay in control. Evisor shows published business contact routes and reminds you to verify before reaching out. You follow your local rules (CAN-SPAM and so on), and we say that plainly. | FAQ |
| 5 | "Another subscription before I have clients?" | Free plan, no card, no time limit. The one-client calculator uses your own fee. Paid plans from $19/mo. | Pricing |
| 6 | "Will it work where I am?" | The coverage checker gives an honest yes or not-yet, and tells you what still works where you are. | Evidence section, FAQ |
| 7 | "I'm too new. What do I charge?" | The pricing calculator sets your target and floor rates, then builds a suggested fee and three options to present. It warns before you quote below your floor. Free on every plan. | Journey step 2, First twenty minutes |
| 8 | "Setup will be overwhelming." | Sign up with Google or two fields. Then a first-run choice of where to start, and a 4-step first session. The founder promises a first proposal in week one, or a call to build it with you. | First twenty minutes, Promise |
| 9 | "Are e-signatures valid?" | A simple electronic signature with a versioned disclosure (ESIGN / UK ECA 2000 / eIDAS SES), a server-checked record of what was read, a SHA-256 fingerprint, IP and UTC time. Signed letters can't be altered afterwards. The page notes plainly when a wet or notarised signature is still needed. | Trust section, FAQ |
| 10 | "Is my data safe?" | Signatures and signed or accepted PDFs are encrypted; every firm's data is isolated; optional two-factor; export any time. No certification claims. | Trust section |
| 11 | "Can I cancel?" | Yes, any time. Your plan runs to the end of the period you've paid for. Fees aren't refunded once a period starts, which is exactly why Free has no time limit. | Pricing, FAQ |
| 12 | "How is this different from Ignition / a lead list?" | A category comparison table, honest about what Evisor isn't (not a practice-management or workflow tool). | Comparison |

---

## 6. Page architecture — every section has a job

| # | Section | Job in the persuasion sequence |
|---|---|---|
| 0 | Adaptive nav + sign in | Orientation; a CTA always reachable. Condenses into a floating bar on scroll. |
| 1 | **Hero** — "Find your next clients. See the evidence first." + live product mock + coverage truth | Passes the 5-second test (who, what, why believe, what next). Shows the real product, not a picture of one. |
| 2 | **"The bookkeeping part is the easy bit."** A reconciliation: what it feels like ↔ what changes | Makes them feel understood in their own words. Honest, brief agitation, each pain matched to a fix. |
| 3 | **Evidence, not a list** (ink band) — annotated evidence panel, three rules, coverage checker | Introduces the mechanism and defuses the #1 objection (junk). Sets coverage expectations honestly. |
| 4 | **The journey** — six chapters, scroll-driven with a sticky product frame (click-through on any device) | Shows that it's one connected system, not a feature list. The differentiator made tangible. |
| 5 | **Everything else in one place** — bento | Replaces the patchwork (spreadsheet + calculator + Canva + Word + signing tool). |
| 6 | **Your first twenty minutes** | Kills setup anxiety; serves the NEW segment; commitment ladder. |
| 7 | **Where Evisor fits** — category comparison | Positions against the alternatives they already know. Honesty about what Evisor isn't. |
| 8 | **Built to be trusted with signatures** | Security, e-signature evidence and payments, accurately. |
| 9 | **A note from the team + our promise** (proof slot) | Authority and accountability without fake proof. Swaps to real testimonials when supplied. |
| 10 | **Pricing** — finder, one-client calculator, toggle, 4 plans, Practice Build | Anchoring and value framing, recommended plan, risk framing, plan carried into signup. |
| 11 | **FAQ** | Remaining objections, near the decision. |
| 12 | **Final CTA** (ink band) | One last, calm push. |
| 13 | **Ask a person** + footer | Human fallback (Firm / Practice Build enquiries), legal links, cookie settings. |
| — | Floating CTA bar | Appears after the hero; hides while pricing or the final CTA is on screen. |

**Removed from v1:**
- The "Eva" chat. It was a contact form styled as a chatbot, which reads as fake to sceptics. It is replaced by a plain "Ask a person" form on the same endpoint.
- "Founding rate — first 50 practices". Its conditions aren't documented anywhere, and the app hides it.
- Unverifiable or now-false claims: "918,390 businesses", newly registered businesses, UK/IE/AU/CA lead coverage, the 48-hour first look, peer fee benchmarks, reminder sequences, "pause any month", "same-day answers".

---

## 7. CTA strategy

- **Primary: "Start free"**, with a trailing key arrow. It goes to `https://my.evisor.app/register`. Microcopy underneath: "Free plan · No card · Google or email".
  - Repeated in: the hero, after the Evidence section, end of the journey, First twenty minutes, pricing, final CTA, nav and floating bar.
  - Always the same words, so it never competes with itself.
- **Plan CTAs** carry intent: `register?plan=practice&billing=annual` (the app reads both, shows the plan, and charges nothing until confirmed).
  - The billing toggle updates every plan link live.
- **Secondary (quiet): "See how it works"**. It scrolls to the journey, for visitors not ready to commit.
- **Contextual: "Check your area"** in the coverage checker. A covered result leads to Start free. An uncovered result leads to "Start free — everything else works here" plus "We'll tell you when it opens", which is the app's built-in "Notify me" for uncovered places.
- **UTM pass-through.** `utm_*` parameters on the landing URL are appended to signup links. The app doesn't store them yet (see Risks), but they now arrive.

---

## 8. Proof strategy

**Real proof the page uses now:**
- The product itself, with real UI strings and real behaviour.
- The named data source (Overture Maps Foundation, with attribution).
- Specific signing evidence.
- Firm branding on client pages.
- 0% on client payments.
- A free plan with no time limit.
- A human contact.
- The founder's first-week promise (already on the live site; needs confirming).

**To collect, in order of value:**
1. 3–5 named bookkeeper testimonials with photo, practice name, city and state. Ideally ones that start sceptical ("I expected another junk list…"). Capture permission in writing.
2. One mini case study: area, niche, number of businesses reviewed → conversations → proposals → signed. Real numbers only.
3. A third-party review profile (Capterra/G2) once there are 5+ reviews. A 4.6 beats a fake 5.0.
4. The founder's name and photo on the note. A real person beats "the team" for a new brand.
5. Coverage numbers per area (businesses currently listed), once published and dated.

All proof slots read from `config.proof`. Nothing renders unless `PROOF_PLACEHOLDER` is true (a preview of the layout, clearly labelled) or real entries are supplied.

---

## 9. Measurement plan

GA4 (`G-B4347EDBV9`) only, and only after the visitor accepts analytics. Same consent key as v1, so existing choices carry over. No new trackers.

| Event | Parameters | Question it answers |
|---|---|---|
| `cta_click` | `cta_id`, `location`, `plan`, `billing`, `hero_variant` | Which placement drives signups? |
| `coverage_check` | `area`, `status` (`live`/`not_yet`) | Demand by area. **This is the market-expansion priority list.** |
| `journey_step` | `step`, `method` (`scroll`/`click`) | How far the product story is followed. |
| `billing_toggle` | `billing` | Annual vs monthly preference. |
| `plan_finder` | `answer` | Who is arriving: client count. |
| `roi_calculator` | `fee_band` | The fee level they think in. |
| `faq_open` | `faq_id` | The objections that still need answering higher up. |
| `section_view` | `section` | Scroll reach by section (fires once). |
| `scroll_depth` | `percent` (25/50/75/100) | Overall engagement. |
| `contact_submit` | `topic`, `status` | Human-assist demand (Firm, Practice Build). |
| `experiment_exposure` | `experiment`, `variant` | A/B attribution. |

**Primary KPI:** landing → `/register` click-through. **True north:** signups and paid plans, which need app-side work (Risks §11.3).

---

## 10. A/B test backlog (prioritised)

Traffic is likely too low for statistically clean A/B tests: at a few thousand visits a month, each variant needs roughly 500+ conversions. So **run a 15-person ICP message test (Wynter-style) on the hero before building traffic tests.** The page ships with variant plumbing (`config.experiments`, off by default; force a variant with `?hero=b`).

| Priority | Test | Hypothesis | Variants |
|---|---|---|---|
| 1 | **Hero headline** | Naming the mechanism ("evidence") beats a pain hook for EXP; the pain hook may win for GROW traffic | **A** "Find your next clients. See the evidence first." · **B** "Stop waiting on referrals. Start with businesses worth a conversation." · **C** "From 'who do I even contact?' to a signed engagement letter." |
| 2 | **Hero visual** | The evidence panel (mechanism) beats the full journey visual (breadth) | Evidence workbench vs proposal-to-signature stack |
| 3 | **Primary CTA wording** | Value-first wording lifts clicks | "Start free" vs "See businesses near you" vs "Find my first clients" |
| 4 | **Coverage chip in the hero** | Showing coverage early lowers bounce for visitors who aren't covered and raises qualified signups | Chip vs no chip (keep the checker in both) |
| 5 | **Pricing default** | Annual default lifts annual mix without hurting click-through | Annual vs monthly default |
| 6 | **Recommended plan** | Highlighting Starter (lower step) beats Practice for EXP | Practice vs Starter highlighted |
| 7 | **One-client calculator position** | Showing the maths before the cards anchors value | Before vs after the plan cards |
| 8 | **Proof** (once real) | Photo testimonials directly under the hero lift click-through | Proof under hero vs only near pricing |

---

## 11. Risks and open questions for the founder

1. **Practice price mismatch (high).** The page shows $79/$69 (as instructed). Checkout and the app show $59/$45 ($540/yr). Clicking "Get Practice" lands on a review that quotes $45/mo. Either update the app or edit one line in `assets/v2/config.js` (`plans.practice.price`). The Practice Build "includes 12 months of Practice" value is computed from the same config.
2. **Find Clients depth (high).**
   - Today's leads are area-matched local businesses. In the 15 Oct quality sample:
     - most rows matched on area only
     - about 90% of email domains resolved
     - about 74% of websites were reachable
   - In-app intro drafting, pipeline save and "Create client & price" currently work only for the retired registry leads, so the page does not claim them.
   - Several in-app strings still mention registries. The Privacy text also needs a legal review now that reveals include emails and phones.
   - Fixing these makes the page's promise stronger.
3. **Attribution gap (medium).** The app doesn't read UTMs or link the landing's GA4 to its PostHog. The landing now forwards `utm_*` and `plan`. Capturing them at signup is a small app change.
4. **Founder promises to confirm (medium):** "first client-ready proposal in your first week, or we'll build it with you on a call" (carried over from v1), and Practice Build ($1,500, "four practices a month"). Both are toggles in config.
5. **USD only.** UK/IE/AU visitors see USD with tax added at checkout. Consider localised display later; the app deliberately refuses to show USD under a £ symbol.
6. **No trial and no refunds.** The page leans on "Free, no time limit" as the honest risk reversal. If you ever add a trial or guarantee, the config has slots for it.
7. **Public repo.** This doc and the handoff live in a public repository. `_config.yml` keeps `docs/` off the published site, but they are readable on GitHub. Move them to a private repo if that matters.
8. **Open question:** do you want a "Notify me when my area opens" capture on the landing itself (email to `hello@`), or only the in-app notify after free signup (current build)?
