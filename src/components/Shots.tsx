"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Shot } from "@/content/projects";

/*
  A horizontal strip rather than a grid. The shots are in order, so a strip reads
  as a walk through the thing, and it costs one row of vertical space on the page
  no matter how many there are. Each one opens full size in a new tab.

  The bar above it carries the position and the caption of whatever is centred.
  That is what makes a strip legible: without it nobody knows how many shots
  there are or what they are looking at, and a scrollbar stub is not an answer.

  `bleed` runs the strip the full width of the viewport while the text around it
  stays in the reading column. The case study does not use it, because that page
  is a constrained document and a full-width strip would cut it in half.
*/
export function Shots({
  shots,
  label,
  bleed = false,
}: {
  shots: Shot[];
  label: string;
  bleed?: boolean;
}) {
  const strip = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Which shot is nearest the middle, which is the one a reader is actually
  // looking at once the strip snaps to centre.
  const sync = useCallback(() => {
    const el = strip.current;
    if (!el) return;
    const middle = el.scrollLeft + el.clientWidth / 2;
    let nearest = 0;
    let best = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const node = child as HTMLElement;
      const centre = node.offsetLeft - el.offsetLeft + node.offsetWidth / 2;
      const distance = Math.abs(centre - middle);
      if (distance < best) {
        best = distance;
        nearest = i;
      }
    });
    setIndex(nearest);
    setAtStart(el.scrollLeft < 4);
    setAtEnd(el.scrollLeft > el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  if (shots.length === 0) return null;

  function step(direction: 1 | -1) {
    const el = strip.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.7, behavior: "smooth" });
  }

  const arrowClass =
    "flex h-8 w-8 items-center justify-center rounded-full border border-rule text-muted transition hover:border-accent hover:text-accent disabled:opacity-30 disabled:hover:border-rule disabled:hover:text-muted";

  return (
    <div className={bleed ? "mt-10" : "mt-5"}>
      <div
        className={
          bleed
            ? "mx-auto flex w-full max-w-3xl items-center gap-4 px-6 pb-3 sm:px-8"
            : "flex items-center gap-4 pb-3"
        }
      >
        <span className="font-mono text-[10px] tracking-[0.2em] text-muted">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(shots.length).padStart(2, "0")}
        </span>
        <span className="min-w-0 flex-1 truncate text-[12.5px] text-muted">
          {shots[index]?.alt}
        </span>
        <span className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={atStart}
            aria-label={`Previous screenshot of ${label}`}
            className={arrowClass}
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={atEnd}
            aria-label={`Next screenshot of ${label}`}
            className={arrowClass}
          >
            <span aria-hidden="true">→</span>
          </button>
        </span>
      </div>

      <div
        ref={strip}
        onScroll={sync}
        role="region"
        aria-label={`Screenshots of ${label}`}
        tabIndex={0}
        className={`shot-strip flex snap-x snap-mandatory overflow-x-auto pb-1 ${
          bleed ? "shot-strip-bleed gap-5" : "-mx-1 gap-3 px-1"
        }`}
      >
        {shots.map((shot) => (
          <a
            key={shot.src}
            href={shot.src}
            target="_blank"
            rel="noreferrer"
            className={`shrink-0 overflow-hidden rounded-md border border-rule bg-surface transition hover:border-accent ${
              bleed ? "snap-center" : "snap-start"
            }`}
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
              onLoad={sync}
              className={
                bleed
                  ? "h-[min(52vh,400px)] w-auto max-w-none"
                  : "h-40 w-auto max-w-none sm:h-48"
              }
            />
          </a>
        ))}
      </div>
    </div>
  );
}
