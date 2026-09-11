import { ProjectCard } from "@/components/ProjectCard";
import { Section } from "@/components/Section";
import { Footer } from "@/components/Footer";
import { projects } from "@/content/projects";
import { beforeThis, intro, site, stack } from "@/content/site";

const headerLinkClass =
  "underline decoration-rule underline-offset-4 transition hover:text-accent hover:decoration-accent";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 sm:px-8">
      <header className="pt-20 pb-14 sm:pt-28 sm:pb-20">
        {/* Plain img on purpose, same reason as the screenshot strips. The site
            is a static export, so next/image optimization never runs. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/henry.jpg"
          alt=""
          width={400}
          height={400}
          decoding="async"
          className="mb-7 h-16 w-16 rounded-full border border-rule object-cover sm:h-20 sm:w-20"
        />
        <h1 className="font-display text-5xl leading-[1.05] tracking-tight sm:text-7xl">
          {site.name}
        </h1>
        <p className="mt-5 max-w-[48ch] text-[15px] text-muted">{site.role}</p>
        <nav
          aria-label="Elsewhere"
          className="mt-7 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] tracking-wide text-muted"
        >
          <a href={`mailto:${site.email}`} className={headerLinkClass}>
            {site.email}
          </a>
          <a href={site.github} className={headerLinkClass}>
            GitHub
          </a>
          <a href={site.linkedin} className={headerLinkClass}>
            LinkedIn
          </a>
        </nav>
      </header>

      <main id="main">
        <section className="pb-14 sm:pb-20">
          {intro.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-5 max-w-[62ch] text-[15px] leading-relaxed first:mt-0"
            >
              {paragraph}
            </p>
          ))}
        </section>

        <Section id="work" label="Selected work">
          <div>
            {projects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
              />
            ))}
          </div>
        </Section>

        <Section id="stack" label="Stack">
          <dl className="grid gap-6 sm:grid-cols-2">
            {stack.map((group) => (
              <div key={group.label}>
                <dt className="font-mono text-[11px] tracking-wide text-muted">
                  {group.label}
                </dt>
                <dd className="mt-2 text-[15px] leading-relaxed">
                  {group.items.join(", ")}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="before" label="Before this">
          {beforeThis.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-5 max-w-[62ch] text-[15px] leading-relaxed first:mt-0"
            >
              {paragraph}
            </p>
          ))}
        </Section>

        <Section id="contact" label="Contact">
          <p className="max-w-[62ch] text-[15px] leading-relaxed">
            The fastest way to reach me is email. I am open to fall 2026
            internships and to full-time roles from December 2026, in AI
            automation, agentic systems and full-stack engineering. US citizen,
            no sponsorship needed.
          </p>
          <p className="mt-6">
            <a
              href={`mailto:${site.email}`}
              className="font-display text-2xl text-accent underline decoration-accent/30 underline-offset-[6px] transition hover:decoration-accent sm:text-3xl"
            >
              {site.email}
            </a>
          </p>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
