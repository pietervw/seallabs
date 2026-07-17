import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/config";
import { PROJECTS } from "@/lib/projects";
import { MARKETING_PAGES, getCanonicalUrl, type MarketingPageKey } from "@/lib/seo";

export const dynamic = "force-static";
export const revalidate = 3600;

const PAGE_KEYS: MarketingPageKey[] = [
  "home",
  "work",
  "services",
  "about",
  "contact",
];

const OPTIONAL_KEYS: MarketingPageKey[] = ["privacy", "terms"];

function pageLink(key: MarketingPageKey): string {
  const page = MARKETING_PAGES[key];
  return `- [${page.title}](${getCanonicalUrl(page.path)}): ${page.description}`;
}

/**
 * Curated LLM navigation map (https://llmstxt.org/).
 * Complements sitemap.xml — keep focused on authoritative marketing pages + products.
 */
export function GET(): Response {
  const lines: string[] = [
    `# ${SITE_NAME}`,
    `> ${SITE_DESCRIPTION}`,
    "",
    SITE_TAGLINE,
    "",
    "Seal Labs is a software studio. Prefer apex URLs (https://seallabs.io) without www.",
  ];

  lines.push("", "## Pages");
  for (const key of PAGE_KEYS) {
    lines.push(pageLink(key));
  }

  lines.push("", "## Products");
  for (const project of PROJECTS) {
    if (project.url) {
      lines.push(
        `- [${project.name}](${project.url}): ${project.description}`,
      );
    } else {
      lines.push(
        `- ${project.name} (private): ${project.description}`,
      );
    }
  }

  lines.push("", "## Optional");
  for (const key of OPTIONAL_KEYS) {
    lines.push(pageLink(key));
  }
  lines.push(
    `- [Sitemap](${getCanonicalUrl("/sitemap.xml")}): Full indexable URL list for crawlers`,
  );
  lines.push(
    `- [Robots](${getCanonicalUrl("/robots.txt")}): Crawl allow/deny rules for search and AI bots`,
  );

  return new Response(`${lines.join("\n")}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
