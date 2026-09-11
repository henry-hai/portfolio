"use client";

import { useEffect, useState } from "react";

export type NavItem = { id: string; label: string };

// Distance below the top of the viewport at which a heading counts as reached.
// It clears the sticky bar itself.
const TRIGGER = 96;

export function CaseStudyNav({ items }: { items: NavItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    let frame = 0;

    function update() {
      frame = 0;
      const reached = items.filter((item) => {
        const element = document.getElementById(item.id);
        return element ? element.getBoundingClientRect().top <= TRIGGER : false;
      });
      // The last heading scrolled past, rather than whichever one happens to be
      // on screen. An IntersectionObserver band gets skipped whole by a single
      // wheel tick, and then the nav is quietly pointing at the wrong section.
      setActive(reached.length > 0 ? reached[reached.length - 1].id : items[0].id);
    }

    function onScroll() {
      if (frame === 0) frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame !== 0) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  return (
    <nav
      aria-label="Sections"
      className="sticky top-0 z-30 -mx-6 hidden border-b border-rule bg-background/85 px-6 backdrop-blur sm:-mx-8 sm:block sm:px-8"
    >
      <ul className="flex gap-6 py-3 font-mono text-[11px] tracking-wide">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "true" : undefined}
              className={
                active === item.id
                  ? "text-accent"
                  : "text-muted transition hover:text-foreground"
              }
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
