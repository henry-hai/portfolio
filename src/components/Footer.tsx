import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-rule py-10 font-mono text-[11px] leading-relaxed text-muted">
      <p>
        Built with Next.js and Tailwind, exported static, hosted on Vercel. The
        source is{" "}
        <a
          href="https://github.com/henry-hai/portfolio"
          className="underline decoration-rule underline-offset-4 transition hover:text-accent"
        >
          on GitHub
        </a>
        .
      </p>
      <p className="mt-2">{site.location}</p>
    </footer>
  );
}
