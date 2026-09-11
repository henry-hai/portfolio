export type Project = {
  slug: string;
  name: string;
  line: string;
  stack: string[];
  repo: string;
  live?: string;
  caseStudy?: string;
  // Short statement of what the project is not, shown on the card. Every one of
  // these exists because the claim next to it is easy to read as more than it is.
  note?: string;
};

export const projects: Project[] = [
  {
    slug: "sentryquery",
    name: "SentryQuery",
    line: "Agentic RAG over indexed PDFs where a second agent checks every claim against the exact chunks the first one retrieved, so an answer that overreaches gets sent back before it reaches you.",
    stack: ["Python", "LangGraph", "LangChain", "Pinecone", "GPT-4o", "MCP", "Streamlit"],
    repo: "https://github.com/henry-hai/SentryQuery-AI",
    caseStudy: "/work/sentryquery",
    note: "Runs locally against your own index. Nothing is hosted.",
  },
  {
    slug: "barber-booking",
    name: "Barber Booking",
    line: "The booking platform for my own barbering practice, a static Next.js site on Vercel calling a TypeScript Express API on Render, with the sheet layout pinned by a test that writes a booking and reads it back.",
    stack: ["TypeScript", "Next.js", "React", "Express", "Google Sheets API", "MCP", "Playwright"],
    repo: "https://github.com/henry-hai/barber-booking",
    live: "https://henryhaistudio.com",
    note: "No payments, no calendar sync, no user accounts. Bookings are requests, not a confirmed calendar.",
  },
  {
    slug: "arthouse-ops",
    name: "arthouse-ops",
    line: "A Python service on scheduled GitHub Actions that unifies a nonprofit's WordPress form entries into one Google Sheet and classifies inbound messages with Claude, rewritten from the workflow-tool version so the guarantees became code you can test.",
    stack: ["Python", "Claude API", "GitHub Actions", "Google Sheets API", "PHP", "pytest"],
    repo: "https://github.com/henry-hai/arthouse-ops",
    note: "117 tests in the suite, 107 of them in CI. The 10 that stay out read recorded payloads that are never committed.",
  },
  {
    slug: "ai-hairstyler",
    name: "AI Hairstyler",
    line: "MediaPipe reads nine geometric ratios off a face photo and a trained RandomForest predicts the shape, deterministic rules pick the cuts, and GPT-4o only writes the explanation.",
    stack: ["Python", "scikit-learn", "PyTorch", "MediaPipe", "FastAPI", "React"],
    repo: "https://github.com/henry-hai/AI-Hairstyle-Recommender",
    note: "The confidence number is the forest's own probability. Calibration was tried and rejected because it zeroed the smallest class.",
  },
  {
    slug: "grantsmith",
    name: "GrantSmith",
    line: "A terminal tool that drafts a funder proposal section by section, retrieving from a nonprofit's past proposals for voice and from the sponsor's own pages for tailoring.",
    stack: ["Python", "RAG", "OpenAI", "Anthropic", "numpy", "python-docx"],
    repo: "https://github.com/henry-hai/grantsmith",
    note: "Provider agnostic. The model id and the provider are two environment variables, not a code change.",
  },
];
