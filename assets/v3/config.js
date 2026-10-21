/* ==========================================================================
   Evisor landing v3 — the one place to change prices, plans, coverage
   and proof. landing.js renders from this object; the HTML carries
   matching defaults so the page reads correctly without JS.
   Ad-angle hero variants (?angle=) live in the inline script in index.html.
   See docs/landing-v3-handoff.md before editing.
   ========================================================================== */
window.EVISOR_CONFIG = {

  /* Show placeholder proof (testimonials etc.) so the layout can be reviewed.
     MUST stay false in production until real, permissioned proof is in `proof`.
     Preview without editing: add ?proof=placeholder to the URL. */
  PROOF_PLACEHOLDER: false,

  links: {
    app: 'https://my.evisor.app',
    register: 'https://my.evisor.app/register',
    signIn: 'https://my.evisor.app/login',
    choosePlan: 'https://my.evisor.app/choose-plan',
    trust: 'https://my.evisor.app/trust',
    dpa: 'https://my.evisor.app/dpa',
    subprocessors: 'https://my.evisor.app/subprocessors',
    esignDisclosure: 'https://my.evisor.app/electronic-signature-disclosure',
    privacy: 'https://my.evisor.app/privacy',
    terms: 'https://my.evisor.app/terms',
    cookies: 'https://my.evisor.app/cookie-policy',
    refunds: 'https://my.evisor.app/refund-policy',
    acceptableUse: 'https://my.evisor.app/acceptable-use',
    email: 'hello@evisor.app',
    contactEndpoint: 'https://formsubmit.co/ajax/hello@evisor.app'
  },

  /* Prices in USD, exactly as on the live site (founder decision, 21 Oct 2026).
     NOTE: the app's plans.json (revision 2026_08) and checkout charge Practice
     at $59 monthly / $45 per month billed annually ($540). To match the app,
     change practice.price to { monthly: 59, annualMonthly: 45, annualTotal: 540 }. */
  currency: { code: 'USD', symbol: '$' },
  annualSavingLabel: 'Save 24%',
  defaultBilling: 'annual',

  plans: [
    {
      key: 'free',
      name: 'Free',
      tagline: 'Send your first signed document — free',
      price: { monthly: 0, annualMonthly: 0, annualTotal: 0 },
      priceNote: 'No card. No time limit.',
      cta: 'Start free',
      ctaPlanParam: null,
      features: [
        { text: '<strong>Find Clients preview</strong> — businesses near you, names masked (covered areas)' },
        { text: 'Pricing calculator with your floor check' },
        { text: '3 clients' },
        { text: '3 proposals and 3 engagement letters' },
        { text: 'E-signature on letters, with co-signers' },
        { text: 'Revealing businesses starts on Starter', off: true }
      ],
      footnote: 'Client documents carry a small “Prepared with Evisor” line.'
    },
    {
      key: 'starter',
      name: 'Starter',
      tagline: 'Look professional and get paid',
      price: { monthly: 25, annualMonthly: 19, annualTotal: 228 },
      cta: 'Start with Starter',
      ctaPlanParam: 'starter',
      features: [
        { text: '<strong>75 business reveals a month</strong> in Find Clients' },
        { text: '10 clients' },
        { text: '30 proposals + 30 letters a month' },
        { text: 'Your branding — Evisor footer removed' },
        { text: 'Know when clients open documents' },
        { text: 'Payment links on documents, 0% to Evisor' },
        { text: 'Client-ready quote PDF, and “Use in proposal” from any estimate' }
      ],
      footnote: 'Everything in Free, under your own name.'
    },
    {
      key: 'practice',
      name: 'Practice',
      tagline: 'Find them, price them, sign them',
      price: { monthly: 79, annualMonthly: 69, annualTotal: 828 },
      recommended: true,
      badge: 'Recommended',
      cta: 'Start with Practice',
      ctaPlanParam: 'practice',
      features: [
        { text: '<strong>250 reveals a month</strong> in Find Clients' },
        { text: '40 clients' },
        { text: '120 proposals + 120 letters a month' },
        { text: '<strong>The letter fills itself</strong> from the accepted proposal' },
        { text: 'Renewals & book review — fee changes in one pass' },
        { text: 'Scheduled follow-ups and quick charges' },
        { text: 'Premium templates and practice analytics' },
        { text: 'Defend-the-price notes and lead CSV export' }
      ],
      footnote: 'Everything in Starter, for running the whole book.'
    },
    {
      key: 'firm',
      name: 'Firm',
      tagline: 'Three seats, one shared client book',
      price: { monthly: 149, annualMonthly: 113, annualTotal: 1356 },
      cta: 'Start with Firm',
      ctaPlanParam: 'firm',
      features: [
        { text: '<strong>3 team seats</strong> included' },
        { text: 'Unlimited clients and documents' },
        { text: '300 reveals per seat a month, shared' },
        { text: 'One shared client book' },
        { text: 'Roles, and optional approval before members send' },
        { text: 'Firm dashboard and shared templates' },
        { text: 'Lock branding and price floors firm-wide' }
      ],
      footnote: 'More than 3 seats? <a href="#contact" data-prefill="firm">Talk to us</a>.'
    }
  ],

  /* Done-with-you service, as offered on the live site. Set enabled:false to hide. */
  practiceBuild: {
    enabled: true,
    price: 1500,
    includesPlan: 'practice',
    includesMonths: 12,
    capacityNote: 'We take four practices a month.'
  },

  /* Founder commitment carried over from v1. Set enabled:false to hide. */
  promise: { enabled: true },

  /* Find Clients coverage. `live` drives the coverage checker and every
     "Colorado, New York and Oregon" list on the page. Add an area here when it
     opens, AND add it to data-live on the hero's [data-cov-note] in index.html
     (that copy runs before first paint, without this file). */
  coverage: {
    live: [
      { code: 'US-CO', name: 'Colorado' },
      { code: 'US-NY', name: 'New York' },
      { code: 'US-OR', name: 'Oregon' }
    ],
    sourceNote: 'Built on open business-listing data from the Overture Maps Foundation.'
  },

  /* Real proof only. Each testimonial needs written permission.
     { quote, name, practice, location, photo (path), clients (optional) } */
  proof: {
    founder: { name: null, role: null, photo: null },
    testimonials: [],
    placeholderTestimonials: [
      { quote: 'Placeholder — a real bookkeeper’s words go here. Ideally it starts with a doubt (“I expected another junk list…”) and ends with what changed.', name: 'Bookkeeper name', practice: 'Practice name', location: 'City, State' },
      { quote: 'Placeholder — a specific, checkable result (“Signed two new clients in my first month from businesses within 10 miles.”) with permission to publish.', name: 'Bookkeeper name', practice: 'Practice name', location: 'City, State' },
      { quote: 'Placeholder — a quote about pricing or signing (“I stopped guessing my fee.”) from a named, photographed customer.', name: 'Bookkeeper name', practice: 'Practice name', location: 'City, State' }
    ]
  },

  analytics: { gaId: 'G-B4347EDBV9', consentKey: 'evisor_analytics_consent' }
};
