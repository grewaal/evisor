# Evisor landing v3: strategy and copy deck

_21 Oct 2026. v3 replaces v2. v2 is archived at `/archive/landing-v2-2026-10/`. Every factual line was checked against the app (the v2 fact-check still holds), and every new line was added with a source. The word "independent" no longer appears anywhere._

---

## 1. Why v2 wasn't enough

v2 was accurate, fast and accessible. Its weaknesses were these:

| v2 weakness | What it cost | v3 fix |
|---|---|---|
| The hero was product-centric ("See the evidence first"). "Evidence" is our word, not theirs. | It took a beat to understand. There was no emotional hook in the first 5 seconds. | A three-beat outcome H1 in the visitor's own terms: **find / know your number / get it signed**. |
| The page explained features in the order the app is built. | Visitors had to assemble the story themselves. | The H1's three beats become the page's three chapters ("Note 1–3"). The promise *is* the table of contents. |
| It was long: 13 sections and 17 FAQs. | Cognitive load. The CTA was buried under facts. | 10 sections and 11 FAQs. Each chapter does one job. |
| The voice was defensive: lots of "won't", "unknown" and "not". | Honest, but it read as hedging. | Confident claims first. Honest limits sit next to the claim they limit, and the honesty is gathered in one "straight talk" section. |
| There was no proof that we understand their world. | Nothing made a bookkeeper think "this is me". | Real thread titles from public forums (verified), plus their questions opening every chapter. |
| One hero message for every ad. | Paid traffic lands on a message that doesn't match the ad. | `?angle=` message-match variants for each ad angle, plus `?area=` personalisation. |
| Nothing made the pricing pain *felt*. | "Floor check" was a feature, not a relief. | An underquote calculator that turns the visitor's own numbers into a yearly cost (loss aversion, honestly framed). |

## 2. Who we're talking to (unchanged ICP, sharper voice)

**Primary:** skilled US bookkeepers with 0–15 clients, often newly self-employed after years in a firm or in-house ("25 years' experience, zero clients").

**Secondary:**
- growing practices (10–40 clients) stuck in feast-or-famine on referrals
- brand-new bookkeepers, served by the `?angle=new` variant

What they feel, in order of intensity:

1. **I'm good at the work but I'm not a salesperson.** Finding clients feels like begging.
2. **Lead sites burned me.** Shared requests, junk contacts, per-lead fees, bidding wars.
3. **I freeze at "what do you charge?"** I underquote, then resent the client.
4. **Chasing the signature feels desperate.** Print, sign, scan, "just following up".
5. **Another subscription before I even have clients?**
6. **Will this even work where I am?**

**Words they use:** clients (not "leads"), word of mouth, referrals, "send me something", quote, fee, engagement letter, catch-up, the books, chasing.

## 3. Psychology map (every lever is honest)

| Lever | Where | How it stays honest |
|---|---|---|
| **Identity** ("this is for me") | Kicker: "For bookkeepers who love the books and dread the hunt" | Describes a feeling, not a credential. No "independent". |
| **Clarity beats cleverness** | H1: three short imperatives covering the whole promise | Each beat maps to a real feature chapter. |
| **Footnote device** (subject vernacular) | H1 beats carry note markers ¹ ² ³. Chapters are "Note 1–3". | Borrowed from notes to the financial statements: bookkeepers read it instantly. |
| **Problem social proof** ("I'm not alone") | Real forum thread titles | Verbatim titles, labelled as public posts by people who aren't Evisor users. No usernames, nothing invented. |
| **Reframe / blame shift** | "You were trained to do the books, not to win clients" | Reduces shame, which is the main reason people don't act. |
| **Specific mechanism** | Chapter 1: why each business is on your list, routes on record, gaps listed, unlock returned | All verified product behaviour. |
| **Loss aversion** | Chapter 2: underquote calculator ("$12,000 a year") | Plain arithmetic on the visitor's own inputs. The anecdote is sourced. |
| **Interactive micro-commitment** | Workbench reveal, coverage check, calculator, "tap to sign" | Each one shows the real product behaviour. |
| **Pratfall effect** | "Straight talk": who it's NOT for | Every "not for you" line is true today. |
| **Risk reversal** | Free plan, no card, no time limit; cancel any time; unlock returned; the promise | All existing terms. |
| **Anchoring** | One client a year vs the plan; Practice Build $1,500 beside Practice | Real prices from config. |
| **Future pacing** | Final CTA: "Picture next Monday." | Describes what the product does, not an outcome guarantee. |
| **Message match** | `?angle=` variants | Each variant restates verified claims only. |

**Not used, on purpose:**
- countdowns, fake scarcity, "only N spots"
- user counts, ratings, logos or testimonials (none exist yet)
- "AI-powered"
- guaranteed outcomes

## 4. Page architecture

| # | Section | Job |
|---|---|---|
| 1 | Hero (H1 + the "note chain" of three product cards) | Say the whole promise in 5 seconds; show it in 10. |
| 2 | "You're not the only one asking" (forum titles) | Make them feel understood; reframe. |
| 3 | Note 1, Find your next clients (workbench, rules, lead sites vs Evisor, coverage) | Main positioning. Kill the "junk leads" objection. |
| 4 | Note 2, Know your number (ink band, calculator, pricing screen) | Make the cost of guessing felt; show the floor check. |
| 5 | Note 3, Get it signed (proposal + tap-to-sign + signing record) | Show the client's side: ease, plus legal-grade records. |
| 6 | After the yes (onboarding, renewals, Today, payments, import, letters by country) | "I won't need five other tools for this part." |
| 7 | Straight talk (fit / not a fit, team note, promise) | Trust through candour; qualify. |
| 8 | Pricing | Clear choice, anchors, risk reversal. |
| 9 | FAQ (11) | Remaining objections. |
| 10 | Final CTA (future pacing + first twenty minutes) | Decision moment, with no start-up anxiety. |
| 11 | Ask a person | A human fallback. |

---

## 5. Copy

### Hero (default, `angle` absent or `find`)

- **Kicker:** For bookkeepers who love the books and dread the hunt
- **H1:** Find your next clients.¹ Know what to charge.² Get it signed.³ (The note numbers are footnote-style superscripts that link to Notes 1–3. They are drawn by CSS, so the H1 text stays clean for search and screen readers.)
- **Sub:** Evisor gives you real local businesses that fit, a fee checked against your own floor, and engagement letters clients sign on their phone.
- **CTA:** Start free · See how it works
- **Under the CTA:** Free plan with no time limit. No card. Sign up with Google or email.
- **Coverage note:** Find Clients is live in Colorado, New York and Oregon. Pricing, proposals and e-signature aren’t limited to these states. _Check your state_
- **Note chain** (illustrative, labelled as such). All three cards show at once; only the reveal, fee, floor check, signature and stamp animate (about 2.8 s, once).
  1. **Find:** Harbor Lane Dental Studio, Strong fit · contactable, Beaverton OR. Why it's here: in your area, an industry you said you want, and a published contact route. Phone, Website, **Revealed.**
  2. **Price:** Suggested monthly fee **$1,180**/mo. ✓ **Clears your floor.** Essential $890 · Standard $1,180 · Premium $1,540.
  3. **Sign:** Engagement letter, monthly bookkeeping. Maya Ortiz, Harbor Lane Dental, on a phone. ✓ **Signed**.
- **Caption:** One client, start to finish, with an illustrative business and figures.

### Hero angle variants (`?angle=`)

| angle | Kicker | H1 | Sub |
|---|---|---|---|
| `referrals` | For bookkeepers tired of waiting on word of mouth | Stop waiting on referrals. Start choosing your clients. | Evisor shows you real local businesses that fit the clients you want, and why each one is on your list. When one says yes, you price it, propose it and get the letter signed in the same place. |
| `pricing` | For bookkeepers who freeze at "what do you charge?" | Know what to charge before they ask. | Set your target and floor rates once. Describe the job and Evisor suggests a monthly fee with three options to present, and stops to check with you before you quote below your floor. Then the proposal and the letter go out from the same place. |
| `signing` | For bookkeepers done with print, sign and scan | Send it today. They sign it on their phone. | A proposal in your branding, then an engagement letter your client signs with a finger. No login, no app. Not signed after two days? Evisor sends the reminder, then one more. |
| `new` | For bookkeepers starting their own practice | Look established from your very first client. | Find real businesses near you, price the work from your own rates, and send a branded proposal and engagement letter your client signs on their phone. Free to start, no card. |
| `leads` | For bookkeepers burned by lead sites | No bidding wars. No per-lead fees. No guessing why. | Evisor shows you real local businesses that fit the clients you want, with the reasons and the gaps on every one. Reveals come with your plan, and if a promised contact route fails, the unlock comes back. |

### 2. You're not the only one asking

- **H2:** You're not the only one asking.
- **Lead:** You were trained to do the books, not to find clients, price them and get them to sign. Most bookkeepers learn that part the hard way, alone. These are real thread titles from public forums:

| Thread title (verbatim) | Forum |
|---|---|
| Getting first client | AccountingWEB |
| new bookkeeping business needs clients | Flying Solo |
| How to find clients for a new sole practice? | AccountingWEB, 2024 |
| How much does a bookkeeper charge? | AAT Discussion forum |
| Quote for bookkeeping was far too low | AccountingWEB, 2019 |
| Potential new client says I'm too expensive. Am I? | AccountingWEB |

- **Source note:** Thread titles from public accounting and bookkeeping forums, quoted as posted. The people who wrote them aren't Evisor users and haven't endorsed it.
- **Close:** None of that is a bookkeeping problem. It's the client side of your practice, and it's the only part Evisor does.

**Sources (verified by search on 21 Oct 2026):**
- accountingweb.co.uk/node/228449
- flyingsolo.com.au/forums/topic/new-bookkeeping-business-needs-clients/
- accountingweb.co.uk/any-answers/how-to-find-clients-for-a-new-sole-practice
- forums.aat.org.uk/Forum/discussion/comment/360866/
- accountingweb.co.uk/node/168074
- accountingweb.co.uk/any-answers/potential-new-client-says-im-too-expensive-am-i

### Note 1: Find your next clients

- **Their question:** "Where do I even find clients?"
- **H2:** Ten businesses worth a conversation beat a hundred cold names.
- **Lead:** Pick your area and the kinds of clients you want. Evisor shows the real local businesses that fit, why each one is on your list, how you could reach them, and what isn't known yet. You decide who's worth a conversation before you spend a thing.
- **Workbench:** interactive, from v2. "Click a business, then Reveal."
- **Three promises:**
  - **No recycled duplicates.** When an area is quiet, the list ends sooner. Evisor doesn't recycle duplicates to fill it.
  - **No bait-and-switch.** No silent jump to a bigger area, and no businesses swapped in from another state.
  - **Nothing sent in your name.** You decide who to contact and what to say. Evisor never contacts a business for you.
- **Lead sites vs Evisor:**

| | Lead sites | Evisor |
|---|---|---|
| How you pay | Per lead, even when it goes nowhere | Reveals come with your plan |
| Who else gets it | Often several firms, racing to reply | Nobody is bidding. You start the conversation. |
| What you see first | A name and a request | Why it fits, the routes on record, and what's unknown |
| When a contact route fails | Usually your loss | The unlock comes back |
| Has the business asked for help? | Yes, that's the point | No. Honest answer: you reach out first. |

- **Coverage checker:** as v2, with "Is Find Clients live in your state?" and the same Live / Not yet results.
- **Look before you pay:** On the free plan you can browse businesses near you with names masked. Reviewing never uses an unlock.

### Note 2: Know your number (ink band)

- **Their question:** "What do I even charge?"
- **H2:** The costliest mistake in your practice isn't in anyone's books.
- **Lead:** It's in your quote. A bookkeeper on AccountingWEB once quoted five hours a quarter. After a software migration, the work took sixteen. Others are quieter: $50 or $100 a month, repeated every month the client stays.
- **Calculator:**
  - Inputs: "Clients you'll price this year" (1–40, default 10) and "Underquoted by" ($50 / $100 / $200 a month).
  - **Output:** "**$12,000 a year**, gone. 10 clients, each $100 a month under."
- **Fix:**
  - **H3:** Evisor checks every fee against your floor before you send it.
  - Steps:
    - Set your target and floor rates once.
    - Describe the job: the state of the books, transactions, payroll, catch-up.
    - Get a suggested monthly fee, plus three options to present.
    - Quote below your floor, and Evisor stops to ask you first.
  - **Plan note:** The breakdown and floor check are free on every plan.
- **Screen:** the pricing pane from the app ($1,180/mo, Clears your floor, Essential/Standard/Premium).

### Note 3: Get it signed

- **Their question:** "Can you send me something?"
- **H2:** Send it today. They sign it on their phone.
- **Lead:** When a business says "send me something", you're ready the same day: a proposal in your branding, then an engagement letter they sign with a finger. No login, no app, no printing and scanning.
- **Demo:** a phone with the signing screen. The button "Tap to sign" draws the signature and shows "Signed".
- **Points:**
  - **They accept, then they sign.** The proposal is accepted with their name. On Practice, the letter fills itself from it.
  - **Evisor does the chasing.** Not signed after two days? A reminder goes out, then one more.
  - **Both partners can sign.** Co-signers on every plan.
  - **Know when they've looked.** Get notified when a client opens a proposal or letter.
- **Signing record** (certificate card): what was signed, by whom, when (UTC), from which IP, with which disclosure.
  - Each signature is stored with the disclosure shown, a SHA-256 fingerprint, the IP address and the UTC time.
  - Signed letters can't be edited afterwards; changes happen in a new draft.
  - A simple electronic signature recognised under the US ESIGN Act, the UK Electronic Communications Act 2000 and the EU eIDAS Regulation.

### After the yes

- **H2:** After they say yes, it's all still here.
- **Lead:** The proposal, the letter, the onboarding and next year's renewal stay on one client record. No spreadsheet, no Word template, no separate signing app.
- **Tiles:**
  - **One checklist link, not twelve emails.** Software access, statements, prior returns, a kickoff call. Your client ticks them off; you see the progress.
  - **Raise fees across your book in one pass.** Each letter comes up for review after twelve months. Choose a fee change, preview it, and prepare renewals as drafts you check first. _(Practice)_
  - **Today tells you what's next.** Who signed, who's stalling, what's due.
  - **Payment card** (a full-width white card at the same weight as the tiles; gain framing instead of "0%"):
    - Big number: **100%** of your fee stays yours.
    - Headline: Get paid directly. Evisor takes no cut.
    - Body: On paid plans, your own Stripe, PayPal or GoCardless link appears once a client accepts or signs. They pay you, not us, straight into your own account.
    - Fine print, kept on purpose so the 100% stays honest: Your payment provider's usual processing fees apply. Evisor never touches the money.
    - Flow: Your client signs → They pay through your link → It lands in your account (Evisor's cut: $0).
  - **Bring your current clients.** Import from a spreadsheet and paper them properly.
  - **Letters that know where you work.** Wording adapts for the US, UK, Australia, Canada and New Zealand.
- **Note:** Evisor doesn't do the books, tasks or time tracking. Keep QuickBooks or Xero and your practice tool. Evisor handles the client side.

### Straight talk

- **H2:** Straight talk, before you sign up.
- **A good fit if you:**
  - are good at the work and want more of the right clients
  - would rather start a conversation with a reason than make a hundred cold calls
  - want to quote with confidence, not guess and hope
  - want clients to sign on their phone, not print, sign and scan
- **Not a fit if you:**
  - want someone to do the outreach for you. Evisor never contacts a business in your name.
  - need Find Clients outside Colorado, New York or Oregon today. Everything else works wherever you are.
  - want a promised number of new clients. Nobody honest can promise that.
  - need tasks, time tracking or workflows. Keep your current tool.
- **Team note and promise:** as v2 (founder name pending).

### Pricing

- **H2:** One client pays for years of it.
- **Lead:** Start on Free with no card and no time limit. Upgrade the day a client says yes.
- **Risk reversal row:**
  - No card to start
  - Cancel any time
  - Unlock returned if a promised route fails
  - Export your data any time
- **Plans, toggle, finder, calculator, notes and Practice Build:** as v2.

### FAQ (11)

1. What do I get on the free plan?
2. Will these businesses actually become clients?
3. Isn't this just another lead list? (merges "open data" and "same businesses")
4. Which areas does Find Clients cover?
5. Does Evisor contact businesses, or write my outreach?
6. I'm brand new. Is this too much for me?
7. I already have clients and use QuickBooks or Xero. Does it fit?
8. Are the signatures legally valid?
9. Do my clients need an account or an app?
10. Can I cancel? Do you offer refunds?
11. How is Practice different from Starter? (Plus: why USD?)

### Final CTA

- **H2:** Picture next Monday.
- **Lines:**
  - A short list of local businesses worth a conversation, and the reason for each.
  - A fee you're sure of, checked against your floor.
  - An engagement letter out for signature, with the reminder already set.
- **CTA:** Start free (Free plan, no card)
- **Your first twenty minutes:**
  - **Minute 1:** Create your account.
  - **Minute 3:** See who's near you.
  - **Minute 8:** Set your rates.
  - **Minute 20:** Send your first letter.

### Footer

Where bookkeepers find, price and sign new clients.

---

## 6. Ad message-match kit (for acquisition)

Use one landing URL per ad angle so the first line the visitor reads repeats the ad's promise.

| Angle | Landing URL | Ad headline ideas | Best audience |
|---|---|---|---|
| Find (default) | `evisor.app/?angle=find&area=US-CO` | "Find bookkeeping clients near you" / "Real local businesses, and why each fits" | Geo-target CO, NY, OR only |
| Referrals | `evisor.app/?angle=referrals` | "Tired of waiting on referrals?" / "Stop waiting on word of mouth" | CO, NY, OR only (it sells Find Clients); add `&area=` |
| Pricing | `evisor.app/?angle=pricing` | "What should you charge for bookkeeping?" / "Stop guessing your bookkeeping fees" | Every state; high search intent |
| Signing | `evisor.app/?angle=signing` | "Engagement letters clients sign on their phone" | Every state |
| Book | `evisor.app/?angle=book` | "Raise your bookkeeping fees in one pass" | Practices with 10+ clients, every state |
| New | `evisor.app/?angle=new` | "Starting a bookkeeping business?" | Course grads, new LLCs; best in CO, NY, OR |
| Lead sites | `evisor.app/?angle=leads` | "Done paying for bookkeeping leads?" | Competitor-intent searches in CO, NY, OR |

`?area=US-XX` makes the coverage line local. For example, `area=US-CO` reads "Find Clients is live in Colorado." Add `utm_*` parameters as usual; they pass through to signup.

---

## 7. Review round (21 Oct): what changed after the fact-check and the critic

**Fact-check fixes (app source checked at `evisorapp@fe38545`):**
- The post-signing overlay now shows the client's real screen: "All parties have signed! Thank you, Maya Ortiz. A signed copy has been sent to…".
- "Unlock returned" now applies only when a *promised route isn't delivered*. It no longer covers any route that later fails.
- "Work everywhere" became "aren't limited to these states".
- The New Zealand line says pricing uses AU, UK, US or CA benchmarks.
- **UK and Ireland time-zone personalisation is removed.** The app's jurisdiction policy marks the UK and EEA as temporarily limited for country-specific promotion. Founder's call to restore it.
- `?angle=new` no longer implies branding on Free.
- The AccountingWEB anecdote matches the source: a migration, and no builder.
- The coverage waitlist is called "the coverage update list". Nothing promises an "it's open" email.
- "No padding" became "No recycled duplicates".
- Export and import limits are noted.
- The mock's market clock is removed.

**Critic fixes:**
- **Message match beyond the headline.** Each angle now also sets:
  - which chapter sits directly under the hero (the DOM moves, so tab order matches)
  - the secondary CTA target
  - the phone dock text
- **Visitors outside covered states** (`?area=US-XX` not live, or an AU, CA or NZ time zone) get the `elsewhere` hero. It leads with pricing and signing, and only falls back to that if the ad's angle depended on Find Clients:

  | Kicker | H1 |
  |---|---|
  | For bookkeepers who'd rather do the books than sell them | Know what to charge. Get it signed on their phone. |

- **New `book` angle** for practices with 10 or more clients: "Review your whole book. Raise fees in one pass." It leads with the renewals chapter.
- **"Know your number" became "Know what to charge".** "Know your number" read like the bookkeeper's cliché about clients' numbers.
- **Note device clarified:**
  - footnote-style superscripts that link to their notes
  - chapter labels read "Note 1", "Note 2" and "Note 3"
  - the step numbers in Note 2 are gone
- **New "Not sure what to say? Start like this."** An example first message with [brackets], clearly labelled as one to adapt; Evisor doesn't write or send it. It answers the fear of selling.
- **Pricing:** "Which one is you?" now sits above the plans, and the reveal cost is anchored ("from about 25¢ each on Starter").
- **New FAQ:** "I don't know what my rates should be yet". It covers the experience level and the published wage benchmark.
- **Layout bugs fixed:**
  - the sticky "asking" heading no longer overlaps the closing line
  - leftover v2 tile placement removed
  - no cursor glow
- **Above the fold:** tighter hero spacing, and the product chain shows on the first screen on desktop and phone.
- **Phones:**
  - only one "Start free" at a time (the nav button hides while the dock shows)
  - the dock hides at the footer
  - bigger mock text
  - "Look before you pay" merged into the coverage card
- **Not changed, and why:**
  - **The founder's name and photo** aren't known, and I won't invent them. This is the biggest open trust lever.
  - **US forum threads:** Reddit and Intuit's community were blocked or unconfirmable from this environment. The six titles shown are verified; swap in US ones once confirmed.
  - **"We take four practices a month"** is carried over from the live v1 site. Keep it only if the limit is real.
