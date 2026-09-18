export const site = {
  name: "Henry Hai Nguyen",
  // The canonical origin. Every absolute URL on the site is built off this, so
  // a custom domain later is a one line change here.
  url: "https://henryhai.vercel.app",
  role: "Software Engineer, AI Automation + Full-Stack",
  email: "hhnguy10@uci.edu",
  github: "https://github.com/henry-hai",
  linkedin: "https://www.linkedin.com/in/henryhai99",
  location: "Irvine & Milpitas, California",
  title: "Henry Hai Nguyen",
  description:
    "MSWE candidate at UC Irvine building agentic systems and full-stack applications. Selected work, with the code behind each one.",
} as const;

export const intro = [
  "I am an MSWE candidate at UC Irvine, graduating in December 2026. I build agentic systems and the production Python and TypeScript underneath them.",
  "Most of what I work on has a verification problem at the middle of it. An agent that answers from documents has to be checked against those documents. A booking that reaches a sheet has to be the same booking that reaches the client. The work below is mostly about closing those gaps and proving they are closed.",
] as const;

export const stack = [
  {
    label: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "Java", "PHP", "SQL"],
  },
  {
    label: "AI and ML",
    items: [
      "LangGraph",
      "LangChain",
      "MCP",
      "RAG pipelines",
      "scikit-learn",
      "PyTorch",
      "MediaPipe",
    ],
  },
  {
    label: "Web",
    items: ["Next.js", "React", "Node.js", "Express", "FastAPI", "Tailwind"],
  },
  {
    label: "Infrastructure",
    items: [
      "AWS",
      "GCP",
      "Docker",
      "GitHub Actions",
      "Vercel",
      "Render",
      "PostgreSQL",
    ],
  },
] as const;

export const background = {
  /*
    The two credentials lead, because a placing and a span of years are results
    and the paragraphs underneath are only context. The boxing line carries both
    the placing and the round: he was a semi-finalist and, after the third-place
    bout was conceded, officially 3rd in the country. Naming the round is what
    stops the placing reading as dressed up.
  */
  credentials: [
    {
      headline: "14 Years of Experience as a Barber",
      line: "My own barbering practice, and my own book the whole time. Pricing, scheduling, retention, the standard.",
    },
    {
      headline: "3rd in the Country",
      line: "Semi-finalist at the USIBA National Championships, boxing for UC Irvine.",
    },
  ],
  paragraphs: [
    "Both of those are the same habit. You get one attempt in front of someone who is paying attention, and the work either holds up or it does not. The booking platform above exists because I was the one answering the midnight texts, and because the thing I wanted did not exist at a price a single chair could justify.",
    "It is also most of what I know about shipping something people have to use every day. A booking form that loses a request is not a bug report, it is a client standing outside a locked shop.",
  ],
} as const;
