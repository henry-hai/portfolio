import type { Metadata } from "next";
import Link from "next/link";
import { CaseStudyNav, type NavItem } from "@/components/CaseStudyNav";
import { PipelineDiagram } from "@/components/PipelineDiagram";
import { Shots } from "@/components/Shots";
import { Footer } from "@/components/Footer";
import { projects } from "@/content/projects";

const project = projects.find((item) => item.slug === "sentryquery")!;

export const metadata: Metadata = {
  title: "SentryQuery",
  description:
    "A case study on SentryQuery, an agentic RAG system where a second agent verifies every claim against the exact chunks the first one retrieved.",
};

const sections: NavItem[] = [
  { id: "problem", label: "Problem" },
  { id: "approach", label: "Approach" },
  { id: "what-broke", label: "What broke" },
  { id: "what-it-cost", label: "What it cost" },
  { id: "where-it-stands", label: "Where it stands" },
];

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="mt-16 mb-5 font-display text-3xl leading-tight sm:text-4xl"
    >
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-5 max-w-[62ch] text-[15px] leading-relaxed">{children}</p>
  );
}

const linkClass =
  "underline decoration-rule underline-offset-4 transition hover:text-accent hover:decoration-accent";

export default function SentryQueryCaseStudy() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 sm:px-8">
      <div className="pt-10 sm:pt-14">
        <Link
          href="/"
          className="font-mono text-[11px] tracking-wide text-muted underline decoration-rule underline-offset-4 transition hover:text-accent"
        >
          Back to the work
        </Link>
      </div>

      <header className="pt-8 pb-10 sm:pt-10">
        <h1 className="font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
          SentryQuery
        </h1>
        <p className="mt-5 max-w-[58ch] text-[15px] leading-relaxed text-muted">
          Agentic RAG over indexed documents, where a second agent checks every
          claim against the exact chunks the first one retrieved.
        </p>
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] tracking-wide text-muted">
          <a href={project.repo} className={linkClass}>
            Source on GitHub
          </a>
          <span>Python, LangGraph, Pinecone, GPT-4o</span>
        </div>
      </header>

      <CaseStudyNav items={sections} />

      <main id="main" className="pb-10">
        <H2 id="problem">Problem</H2>
        <P>
          Retrieval-augmented generation is usually sold as the fix for a model
          making things up. It is not. Retrieval changes what the model is
          looking at, and nothing in the standard pipeline checks whether the
          answer that comes out is actually supported by what came back. The
          model is free to summarise past the evidence, blend two documents
          into a claim neither one makes, or answer a question the corpus does
          not cover, and the output looks exactly the same either way.
        </P>
        <P>
          The usual answer is to catch this offline, in an eval, on a fixed set
          of questions. That tells you how a system behaved on the questions you
          thought of. It does nothing for the question a user asks tomorrow. I
          wanted the check to run at request time, on the real answer, before it
          reaches anyone.
        </P>

        <H2 id="approach">Approach</H2>
        <P>
          Two agents wired as two distinct nodes of an explicit LangGraph
          StateGraph. A Researcher retrieves and drafts, and a Critic decides
          whether the draft is supported. The verification is a node in the
          graph rather than a wrapper around it, which is what makes the loop
          back to the Researcher possible.
        </P>
        <Shots shots={project.shots} label="SentryQuery" />
        <PipelineDiagram />
        <P>
          The load-bearing detail is that the Critic reads the chunks that were
          captured in graph state, and never issues its own query. Re-fetching
          fresh text would quietly defeat the whole check, because the Critic
          would then be grading the answer against a different set of documents
          than the one the answer was written from. It would still return a
          verdict. The verdict would just be meaningless.
        </P>
        <P>
          The same groundedness check is graded offline by an eval harness in{" "}
          <code className="font-mono text-[13px] text-accent">evals/</code>, so
          the Critic enforces at request time what the harness verifies between
          runs. The harness also runs two direct Critic checks: an ungrounded
          answer has to come back REVISE and a grounded one APPROVE. That REVISE
          case is the one that fails without the Critic and passes with it,
          which is the whole argument for the second agent in a single test.
        </P>
        <P>
          The answering pipeline is also exposed over the Model Context
          Protocol, so any MCP client can query the corpus as a tool. The tool
          returns the full structured result rather than bare text, verdict
          included, so a client can see the groundedness ruling and not just the
          answer.
        </P>

        <H2 id="what-broke">What broke</H2>
        <P>
          <strong className="font-semibold">
            Structured output ate the agent.
          </strong>{" "}
          Binding the Pydantic answer schema to the agent itself gives you a
          clean object and takes the tool-calling loop with it. The agent stops
          reasoning about whether to retrieve and starts filling in a form. The
          fix is that the schema is applied at a dedicated synthesis step and
          nowhere else, so the agent stays an agent and the contract still
          holds at the boundary.
        </P>
        <P>
          <strong className="font-semibold">
            A revision loop is a loop.
          </strong>{" "}
          A Critic that can send an answer back is a Critic that can send it
          back forever, on a question the corpus cannot support at any length.
          Revisions are capped by{" "}
          <code className="font-mono text-[13px] text-accent">
            MAX_REVISIONS
          </code>
          , default one pass, and the amber badge in the interface names what
          was still unsupported when the cap was hit. An honest unresolved
          answer beats a loop.
        </P>
        <P>
          <strong className="font-semibold">
            An MCP server is meant to be left running.
          </strong>{" "}
          Every uncached query costs a paid embedding and a Pinecone query, and
          a server sitting in a client config gets called in ways a web app does
          not. Two ceilings went in: an in-process answer cache keyed on the
          normalised question, so the same question asked twice is one paid run,
          and a rate limit of ten calls per rolling minute that rejects over the
          limit before any paid call is made. Both are in-process and reset with
          the server, which is the right scope for a local single-user tool and
          is not a distributed quota system.
        </P>
        <P>
          <strong className="font-semibold">
            A copied virtual environment installs somewhere else.
          </strong>{" "}
          The project folder syncs, and a{" "}
          <code className="font-mono text-[13px] text-accent">pip</code> script
          left behind by a venv that was copied or moved still points at the
          interpreter it was built for. Installs succeeded and imports failed.
          The setup steps use{" "}
          <code className="font-mono text-[13px] text-accent">python -m pip</code>{" "}
          for that reason, and there is a one-line import check in the README to
          confirm the environment before going further.
        </P>

        <H2 id="what-it-cost">What it cost</H2>
        <P>
          Verification is a second model call on every answer. That is latency
          and money on every query, not on the ones that turn out to be wrong.
          The Critic runs on gpt-4o-mini rather than the Researcher&apos;s
          GPT-4o, because checking whether a claim is supported by a passage in
          front of it is a much narrower task than writing the claim, and it
          runs at temperature 0 so the verdicts are reproducible.
        </P>
        <P>
          Continuous integration cannot cover the part that matters most. The
          Critic&apos;s judgment is a live model call, so it needs real keys and
          stays in the local eval run. CI runs the deterministic pieces: the
          schema contracts, the citation helpers, the eval grading logic, the
          Critic&apos;s evidence wiring, and the MCP layer with the pipeline
          stubbed. It verifies that the Critic is handed the exact retrieved
          chunks and returns the structured verdict faithfully. It does not
          verify the verdict.
        </P>
        <P>
          Docker is deliberately out of the workflow for the same kind of
          reason. A cold build on a fresh runner has no layer cache and would
          reinstall the whole runtime stack, which costs minutes and gives no
          signal the offline tests do not already give.
        </P>

        <H2 id="where-it-stands">Where it stands</H2>
        <P>
          The eval harness passed 7 of 7 as a single-agent baseline, on keyword
          and tool-use checks, and passes 9 of 9 now that schema validation, the
          Critic verdict and the two direct Critic checks are in it. Those extra
          points are new correctness dimensions the original code could not
          satisfy, not a change in answer accuracy. It is a test pass count and
          it is the only performance number I claim here.
        </P>
        <P>
          Nothing is deployed. There is no hosted instance, no users, and no
          latency or accuracy figure to quote. It runs locally against your own
          Pinecone index and your own keys, in a virtual environment or in the
          container, and the container is a run mode rather than a deployment.
          The corpus indexed for the demo is three public annual filings from
          different sectors, and no document or company name is hard-coded
          anywhere.
        </P>
        <P>
          <a href={project.repo} className={linkClass}>
            The code is on GitHub
          </a>
          , including the graph, the eval harness and the MCP server.
        </P>
      </main>

      <Footer />
    </div>
  );
}
