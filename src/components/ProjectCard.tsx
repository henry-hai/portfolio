import Link from "next/link";
import type { Project } from "@/content/projects";
import { Shots } from "./Shots";
import { Tag } from "./Tag";

const linkClass =
  "font-mono text-[11px] tracking-wide text-muted underline decoration-rule underline-offset-4 transition hover:text-accent hover:decoration-accent";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className="group grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 border-t border-rule py-8 first:border-t-0 first:pt-0 sm:gap-x-8">
      <span
        aria-hidden="true"
        className="pt-1.5 font-mono text-[11px] text-muted transition group-hover:text-accent"
      >
        {number}
      </span>

      {/* min-w-0 so the screenshot strip scrolls inside this column instead of
          stretching it, which would put a horizontal scrollbar on the page. */}
      <div className="min-w-0">
        <h3 className="font-display text-2xl leading-tight sm:text-3xl">
          {project.name}
        </h3>

        <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-foreground/90">
          {project.line}
        </p>

        {project.note ? (
          <p className="mt-3 max-w-[62ch] border-l-2 border-rule pl-3 text-[13px] leading-relaxed text-muted">
            {project.note}
          </p>
        ) : null}

        <Shots shots={project.shots} label={project.name} />

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
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
    </article>
  );
}
