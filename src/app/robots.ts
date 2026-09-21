import type { MetadataRoute } from "next";

import { getCanonicalUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: ["*", "GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"],
      allow: "/",
      disallow: "/api",
    },
    sitemap: getCanonicalUrl("/sitemap.xml"),
  };
}
