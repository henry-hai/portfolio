import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

/*
  Static export, so this runs at build time and lands as /sitemap.xml. Only the
  projects that have their own case study page get a row, because the rest are
  cards on the home page and are already covered by it.
*/
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: `${site.url}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects
      .filter((project) => project.caseStudy)
      .map((project) => ({
        // trailingSlash is on, so the canonical form of every route ends in one.
        url: `${site.url}${project.caseStudy}/`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
  ];
}
