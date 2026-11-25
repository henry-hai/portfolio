export type Shot = {
  src: string;
  alt: string;
  // Intrinsic pixel size. It reserves the right box before the file arrives, so
  // nothing jumps as the strip fills in, and a lazy image with no known width is
  // one the browser will happily never get around to loading.
  w: number;
  h: number;
};

export type Project = {
  slug: string;
  name: string;
  line: string;
  // The chip beside the name. It states what the thing is, never what it lacks.
  // "Deployed, free tier" and "Prototype" were both here once and both read as
  // an apology on a page whose whole job is the opposite.
  status: string;
  stack: string[];
  // Optional because a team project can live in a private repo.
  repo?: string;
  live?: string;
  caseStudy?: string;
  // Short statement of what the project is not, shown on the card. Every one of
  // these exists because the claim next to it is easy to read as more than it is.
  note?: string;
  // Ordered, so the strip reads as a walk through the thing rather than a pile
  // of pictures. Empty where the repo has no screenshots to show.
  shots: Shot[];
};

export const projects: Project[] = [
  {
    slug: "barber-booking",
    name: "Barber Booking",
    status: "Live at henryhaistudio.com",
    line: "The booking platform for my own barbering practice. The booking API runs on AWS serverless, API Gateway in front of Python Lambdas that block duplicate bookings with a DynamoDB conditional write and send the confirmation emails, which cut the first booking after idle from 51 s to 2.2 s, with 131 pytest tests against mocked AWS.",
    stack: ["TypeScript", "Next.js", "React", "Python", "AWS Lambda", "API Gateway", "DynamoDB", "CloudFront", "pytest"],
    repo: "https://github.com/henry-hai/barber-booking",
    live: "https://henryhaistudio.com",
    note: "Bookings arrive as requests and I confirm each one myself, which is how a single chair actually runs.",
    shots: [
      {
        src: "/shots/barber-booking/01-hero.jpg",
        alt: "Landing page with the triptych hero and the numbered navigation",
        w: 1903,
        h: 802,
      },
      {
        src: "/shots/barber-booking/02-about.jpg",
        alt: "About section",
        w: 1904,
        h: 447,
      },
      {
        src: "/shots/barber-booking/03-services.jpg",
        alt: "Services and pricing",
        w: 1905,
        h: 917,
      },
      {
        src: "/shots/barber-booking/04-gallery.jpg",
        alt: "Tabbed gallery of work",
        w: 1905,
        h: 918,
      },
      {
        src: "/shots/barber-booking/05-locations.jpg",
        alt: "Locations section",
        w: 1904,
        h: 520,
      },
      {
        src: "/shots/barber-booking/06-booking-form.jpg",
        alt: "Appointment request form with three preferred slots",
        w: 1905,
        h: 918,
      },
      {
        src: "/shots/barber-booking/07-booking-form-footer.jpg",
        alt: "Booking policies and submit",
        w: 1905,
        h: 918,
      },
      {
        src: "/shots/barber-booking/08-confirmation.jpg",
        alt: "Confirmation shown after a booking is accepted",
        w: 708,
        h: 260,
      },
      {
        src: "/shots/barber-booking/dashboard.jpg",
        alt: "The appointments dashboard, with client details redacted",
        w: 1400,
        h: 761,
      },
      {
        src: "/shots/barber-booking/09-mobile-hero.jpg",
        alt: "The hero on a phone, a single frame rather than the desktop triptych",
        w: 456,
        h: 731,
      },
      {
        src: "/shots/barber-booking/10-mobile-menu.jpg",
        alt: "Full-screen navigation menu on a phone",
        w: 456,
        h: 692,
      },
    ],
  },
  {
    slug: "trauma-copilot",
    name: "Trauma Guidelines Co-Pilot",
    status: "MSWE capstone, UCI Health",
    line: "A clinical RAG assistant for a UCI Health trauma surgeon, built by a 4-person team. I built the React and TypeScript clinician UI, whose inline citations open the cited guideline and page, and turned a teammate's prototype into the FastAPI answer service, with a Claude Sonnet grounding verifier that withholds any answer it cannot support.",
    stack: ["React", "TypeScript", "Vite", "FastAPI", "LlamaCloud", "Claude", "Vitest"],
    note: "The verifier was chosen from a live test of four model pairings, and both models route through UCI's ZotGPT gateway for UCI IT governance.",
    shots: [
      {
        src: "/shots/trauma-copilot/answer.jpg",
        alt: "A guideline answer with numbered citations beside the EAST sources it cites, by guideline and page",
        w: 1440,
        h: 1267,
      },
    ],
  },
  {
    slug: "fairmark",
    name: "Fairmark",
    status: "Live demo",
    line: "A Python pricing engine for a CFTC-regulated prediction exchange. It compares Kalshi prices to no-vig Pinnacle fair value after fees and runs Monte Carlo simulation, with shared legs sampled once, to estimate each set's chance to finish positive.",
    stack: ["Python", "Monte Carlo", "Kalshi API", "Cloudflare Pages", "Workers KV", "pytest"],
    repo: "https://github.com/henry-hai/fairmark",
    live: "https://fairmark-app.pages.dev",
    note: "The public site reads demo data only, through an endpoint that cannot reach anything else. A Python poller feeds it with batched, rate-limit-aware calls and 129 tests behind it.",
    // Only the pricing table. The other captures show stakes and results,
    // which is not what this card is about.
    shots: [
      {
        src: "/shots/fairmark/price-vs-fair.jpg",
        alt: "Each market's Kalshi price beside the sportsbook price and the no-vig fair value, with the fee and the edge after fees",
        w: 1440,
        h: 1744,
      },
    ],
  },
  {
    slug: "arthouse-ops",
    name: "arthouse-ops",
    status: "Live dashboard",
    line: "A live lead-triage dashboard for a nonprofit, on a Python service that unifies their WordPress form entries into one Google Sheet and classifies roughly 18,000 inbound messages with Claude, surfacing the 145 that a person should actually answer.",
    stack: ["Python", "Claude API", "GitHub Actions", "Google Sheets API", "PHP", "pytest"],
    repo: "https://github.com/henry-hai/arthouse-ops",
    note: "Rewritten from a 21-node low-code workflow into Python, so retries, idempotency and resumability became code with 117 tests behind them.",
    shots: [
      {
        src: "/shots/arthouse-ops/1-dashboard.jpg",
        alt: "The lead triage dashboard, showing the messages that still need a person. Contact details and figures redacted.",
        w: 1400,
        h: 763,
      },
      {
        src: "/shots/arthouse-ops/2-charts.jpg",
        alt: "Message volume by category and quarterly figures on a dual axis, redacted.",
        w: 1400,
        h: 765,
      },
    ],
  },
];
