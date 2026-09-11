import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Nothing here is private, so everything is crawlable and the only real job is
// pointing at the sitemap.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
