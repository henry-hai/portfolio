"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const listeners = new Set<() => void>();

function resolveTheme(): Theme {
  const chosen = document.documentElement.getAttribute("data-theme");
  if (chosen === "light" || chosen === "dark") return chosen;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/*
  The theme lives on the root element, set before the first paint by the inline
  script in the document head, so the DOM is the source of truth and React reads
  it rather than owning it. Subscribing also to the media query keeps a reader
  who has made no explicit choice in step with their system.
*/
function subscribe(onChange: () => void) {
  listeners.add(onChange);
  const query = window.matchMedia("(prefers-color-scheme: dark)");
  query.addEventListener("change", onChange);
  return () => {
    listeners.delete(onChange);
    query.removeEventListener("change", onChange);
  };
}

// Null on the server, because there is no way to know which theme this reader
// has. The button renders without a glyph until hydration fills it in.
function serverSnapshot(): Theme | null {
  return null;
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
      aria-label={
        theme === null
          ? "Switch theme"
          : `Switch to the ${theme === "dark" ? "light" : "dark"} theme`
      }
      className="fixed top-4 right-4 z-40 flex h-9 w-9 items-center justify-center rounded-full border border-rule bg-surface/80 text-muted backdrop-blur transition hover:text-foreground sm:top-6 sm:right-6"
    >
      <span aria-hidden="true" className="text-[13px] leading-none">
        {theme === null ? "" : theme === "dark" ? "☾" : "☀"}
      </span>
    </button>
  );
}
