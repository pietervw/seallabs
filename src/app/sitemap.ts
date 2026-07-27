import type { MetadataRoute } from "next";

import { MARKETING_PAGES, SITEMAP_PAGE_KEYS, getCanonicalUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return SITEMAP_PAGE_KEYS.map((key) => {
    const page = MARKETING_PAGES[key];
    return {
      url: getCanonicalUrl(page.path),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    };
  });
}
