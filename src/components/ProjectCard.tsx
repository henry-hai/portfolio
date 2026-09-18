import Link from "next/link";
import type { Project } from "@/content/projects";
import { Shots } from "./Shots";

const linkClass =
  "font-mono text-[11px] tracking-wide text-muted underline decoration-rule underline-offset-4 transition hover:text-accent hover:decoration-accent";

/*
  The text stays in the reading column and the screenshots run the full width of
  the viewport underneath it, which is why this returns a section rather than
  sitting inside one container. The work is the thing worth the width.

  The stack used to be a row of pills. It is a line of monospace now, because
  pills are the house style of every bootcamp portfolio and they were the loudest
  thing on a card whose loudest thing should be the name.
*/
export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article id={project.slug} className="scroll-mt-20 pt-24 first:pt-12">
      <div className="mx-auto w-full max-w-3xl px-6 sm:px-8">
        <div className="flex items-baseline gap-4">
          <span aria-hidden="true" className="font-mono text-[11px] text-muted">
            {number}
          </span>
          <h3 className="font-display text-3xl leading-none tracking-tight sm:text-4xl">
            {project.name}
          </h3>
          <span className="ml-auto shrink-0 font-mono text-[9.5px] tracking-[0.2em] text-accent uppercase">
            {project.status}
          </span>
        </div>

        <p className="mt-6 text-[17px] leading-relaxed">{project.line}</p>

        {project.note ? (
          <p className="mt-5 border-l-2 border-rule pl-4 text-[14.5px] leading-relaxed text-muted">
            {project.note}
          </p>
        ) : null}

        <p className="mt-6 font-mono text-[11px] leading-relaxed text-muted">
          <span className="mr-3 text-[9.5px] tracking-[0.2em] text-muted/60 uppercase">
            Built with
          </span>
          {project.stack.join(", ")}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
          {project.caseStudy ? (
            <Link
              href={project.caseStudy}
              className="font-mono text-[11px] tracking-wide text-accent underline decoration-accent/40 underline-offset-4 transition hover:decoration-accent"
            >
              Read the case study
            </Link>
          ) : null}
          <a href={project.repo} className={linkClass}>
            Source
          </a>
          {project.live ? (
            <a href={project.live} className={linkClass}>
              Live site
            </a>
          ) : null}
        </div>
      </div>

      <Shots shots={project.shots} label={project.name} bleed />

      <div className="mx-auto w-full max-w-3xl px-6 sm:px-8">
        <div className="mt-24 border-t border-rule" />
      </div>
    </article>
  );
}
