const steps = [
  {
    title: "Question",
    body: "A single user question, routed by the agent rather than by a fixed pipeline.",
  },
  {
    title: "Researcher, GPT-4o at temperature 0",
    body: "Decides whether and how to call the Pinecone retriever, and can re-query with a refined search. Reaches for Tavily instead when the answer is not in the corpus. The exact chunks it retrieved are captured in graph state.",
    aside: "Pinecone retriever, Tavily web search",
  },
  {
    title: "Synthesis step",
    body: "The draft is packaged into a Pydantic AnswerSchema here and only here. Applying the schema to the agent itself would take its tool-calling loop with it.",
  },
  {
    title: "Critic, gpt-4o-mini at temperature 0",
    body: "Reads the answer against the chunks held in state, never a fresh query, and returns APPROVE or REVISE with the unsupported claim named. On REVISE the graph loops back to the Researcher, capped at MAX_REVISIONS.",
    aside: "Loops back on REVISE",
  },
  {
    title: "Answer, verdict, sources",
    body: "The interface shows the verdict, the model's confidence, and the exact chunks the agent consulted, expanded by document and page.",
  },
];

export function PipelineDiagram() {
  return (
    <figure className="my-10 rounded-lg border border-rule bg-surface/60 p-5 sm:p-7">
      <ol className="space-y-0">
        {steps.map((step, index) => (
          <li key={step.title} className="relative pb-7 pl-7 last:pb-0">
            {index < steps.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute top-2 left-[5px] h-full w-px bg-foreground/15"
              />
            ) : null}
            <span
              aria-hidden="true"
              className="absolute top-1.5 left-0 h-[11px] w-[11px] rounded-full border border-accent bg-background"
            />
            <h3 className="font-mono text-[12px] tracking-wide text-foreground">
              {step.title}
            </h3>
            <p className="mt-1.5 max-w-[58ch] text-[13px] leading-relaxed text-muted">
              {step.body}
            </p>
            {step.aside ? (
              <p className="mt-1.5 font-mono text-[11px] text-accent">
                {step.aside}
              </p>
            ) : null}
          </li>
        ))}
      </ol>
      <figcaption className="mt-5 border-t border-rule pt-4 font-mono text-[11px] leading-relaxed text-muted">
        One query through the graph. Indexing happens once, separately, and is
        not on this path.
      </figcaption>
    </figure>
  );
}
