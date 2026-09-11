import type { Shot } from "@/content/projects";

/*
  A horizontal strip rather than a grid. The shots are in order, so a strip reads
  as a walk through the thing, and it costs one row of vertical space on the page
  no matter how many there are. Each one opens full size in a new tab.
*/
export function Shots({ shots, label }: { shots: Shot[]; label: string }) {
  if (shots.length === 0) return null;

  return (
    <div
      role="region"
      aria-label={`Screenshots of ${label}`}
      tabIndex={0}
      className="shot-strip -mx-1 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-3"
    >
      {shots.map((shot) => (
        <a
          key={shot.src}
          href={shot.src}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 snap-start overflow-hidden rounded-md border border-rule bg-surface transition hover:border-accent"
        >
          {/* Plain img on purpose. The site is a static export, so next/image
              optimization does not run and would only add a wrapper. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={shot.src}
            alt={shot.alt}
            width={shot.w}
            height={shot.h}
            decoding="async"
            fetchPriority="low"
            className="h-40 w-auto max-w-none sm:h-48"
          />
        </a>
      ))}
    </div>
  );
}
