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
  repo: string;
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
    slug: "sentryquery",
    name: "SentryQuery",
    status: "Live service",
    line: "A hallucination guardrail. Send it one claim and it answers PASS or FAIL against the source documents, with the exact passages it checked and a machine-readable reason when it refuses, so a program can branch on the verdict instead of a person reading a paragraph and hoping.",
    stack: ["Python", "LangGraph", "FastAPI", "Pinecone", "GPT-4o", "MCP", "Streamlit"],
    repo: "https://github.com/henry-hai/SentryQuery-AI",
    live: "https://sentryquery-verify.onrender.com",
    caseStudy: "/work/sentryquery",
    note: "The index holds three FY2025 annual filings, so it rules on claims about those documents rather than the whole market.",
    shots: [
      {
        src: "/shots/sentryquery/verify-page.jpg",
        alt: "The claim-check page, stating what you send and what comes back",
        w: 2360,
        h: 1180,
      },
      {
        src: "/shots/sentryquery/verify-pass.jpg",
        alt: "A PASS verdict beside the source passage it was checked against",
        w: 2360,
        h: 1116,
      },
      {
        src: "/shots/sentryquery/verify-api.jpg",
        alt: "The same check as one HTTP request, returning verdict, reason code and evidence as JSON",
        w: 2360,
        h: 1152,
      },
      {
        src: "/shots/sentryquery/verify-dark.jpg",
        alt: "The claim-check page in dark mode",
        w: 2360,
        h: 1180,
      },
      {
        src: "/shots/sentryquery/verify-fail.jpg",
        alt: "A FAIL verdict, with the Critic's reason and the passage that contradicts the claim",
        w: 2360,
        h: 1220,
      },
      {
        src: "/shots/sentryquery/rag-answer.jpg",
        alt: "A grounded answer with the Critic's verified badge",
        w: 1400,
        h: 1383,
      },
      {
        src: "/shots/sentryquery/rag-sources.jpg",
        alt: "The exact source chunks the agent consulted, by document and page",
        w: 1370,
        h: 1400,
      },
      {
        src: "/shots/sentryquery/critic-revision.jpg",
        alt: "The Critic flagging an unsupported claim and forcing a revision",
        w: 1400,
        h: 1393,
      },
      {
        src: "/shots/sentryquery/tavily-web-search.jpg",
        alt: "A live web search result, marked as not verified against the indexed documents",
        w: 1373,
        h: 1400,
      },
      {
        src: "/shots/sentryquery/guardrail-refusal.jpg",
        alt: "An off-topic question refused before any tool call is made",
        w: 1400,
        h: 797,
      },
      {
        src: "/shots/sentryquery/observability.jpg",
        alt: "Structured run logging with tool routing, verdict and revision count",
        w: 1400,
        h: 761,
      },
    ],
  },
  {
    slug: "barber-booking",
    name: "Barber Booking",
    status: "Live at henryhaistudio.com",
    line: "The booking platform for my own barbering practice, a static Next.js site on Vercel calling a TypeScript Express API on Render, with the sheet layout pinned by a test that writes a booking and reads it back.",
    stack: ["TypeScript", "Next.js", "React", "Express", "Google Sheets API", "MCP", "Playwright"],
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
  {
    slug: "ai-hairstyler",
    name: "AI Hairstyler",
    status: "Computer vision + ML",
    line: "MediaPipe reads nine geometric ratios off a face photo and a trained RandomForest predicts the shape, deterministic rules pick the cuts, and GPT-4o only writes the explanation.",
    stack: ["Python", "scikit-learn", "PyTorch", "MediaPipe", "FastAPI", "React"],
    repo: "https://github.com/henry-hai/AI-Hairstyle-Recommender",
    note: "The confidence number is the forest's own probability. Calibration was tried and rejected because it zeroed the smallest class.",
    shots: [],
  },
  {
    slug: "grantsmith",
    name: "GrantSmith",
    status: "RAG drafting engine",
    line: "An AI grant-writing assistant that drafts a funder proposal section by section in a specific nonprofit's voice, retrieving from its past proposals and from the sponsor's own stated priorities, and exporting a formatted .docx.",
    stack: ["Python", "RAG", "OpenAI", "Anthropic", "numpy", "python-docx"],
    repo: "https://github.com/henry-hai/grantsmith",
    note: "Provider agnostic. The model id and the provider are two environment variables, not a code change.",
    shots: [],
  },
];
