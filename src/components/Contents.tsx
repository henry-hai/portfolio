import { projects } from "@/content/projects";

/*
  The whole of the work section in five lines, before anyone has scrolled. A
  reader who only wants to know what is here gets it without paying for the
  scroll, and a reader who wants one of them can jump straight to it.
*/
export function Contents() {
  return (
    <nav aria-label="Selected work" className="mt-14 border-t border-rule">
      {projects.map((project, index) => (
        <a
          key={project.slug}
          href={`#${project.slug}`}
          className="flex items-baseline gap-4 border-b border-rule py-3.5 transition hover:pl-2.5"
        >
          <span className="w-6 font-mono text-[10.5px] text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-display text-xl">{project.name}</span>
          <span
            aria-hidden="true"
            className="min-w-6 flex-1 -translate-y-1.5 border-b border-dotted border-rule"
          />
          <span className="shrink-0 font-mono text-[9.5px] tracking-[0.18em] text-muted uppercase">
            {project.status}
          </span>
        </a>
      ))}
    </nav>
  );
}
