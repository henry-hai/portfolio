"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const listeners = new Set<() => void>();

// Light unless the reader has chosen otherwise. The stylesheet makes the same
// call, so the two cannot disagree and show a glyph for the wrong theme.
function resolveTheme(): Theme {
  const chosen = document.documentElement.getAttribute("data-theme");
  return chosen === "dark" ? "dark" : "light";
}

/*
  The theme lives on the root element, set before the first paint by the inline
  script in the document head, so the DOM is the source of truth and React reads
  it rather than owning it.
*/
function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

// Light on the server, which is what the stylesheet renders for a reader who
// has chosen nothing, so the first paint and the glyph agree.
function serverSnapshot(): Theme {
  return "light";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, resolveTheme, serverSnapshot);

  function toggle() {
    const next: Theme = resolveTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // A browser with storage blocked still gets the theme for this page view.
    }
    listeners.forEach((notify) => notify());
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to the ${theme === "dark" ? "light" : "dark"} theme`}
      className="fixed top-4 right-4 z-40 flex h-9 w-9 items-center justify-center rounded-full border border-rule bg-surface/80 text-muted backdrop-blur transition hover:text-foreground sm:top-6 sm:right-6"
    >
      <span aria-hidden="true" className="text-[13px] leading-none">
        {theme === "dark" ? "☾" : "☀"}
      </span>
    </button>
  );
}
