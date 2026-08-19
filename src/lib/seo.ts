import type { Metadata, MetadataRoute } from "next";

import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SUPPORT_EMAIL,
  absoluteUrl,
  getSocialSameAs,
} from "@/lib/config";
import { getPublicProductEntries } from "@/lib/projects";

export type StructuredData = Record<string, unknown>;

export type MarketingPageKey =
  | "home"
  | "work"
  | "services"
  | "contact"
  | "privacy"
  | "terms";

type MarketingPageSeo = {
  path: string;
  title: string;
  description: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

export const MARKETING_PAGES: Record<MarketingPageKey, MarketingPageSeo> = {
  home: {
    path: "/",
    title: "Custom Software & SaaS Development | Seal Labs",
    description: SITE_DESCRIPTION,
    changeFrequency: "weekly",
    priority: 1,
  },
  work: {
    path: "/work",
    title: "Software Products & Case Studies | Seal Labs",
    description:
      "Explore production SaaS, identity verification, field operations, education, and API products built and operated by Seal Labs.",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  services: {
    path: "/services",
    title: "Custom Software Development Services | Seal Labs",
    description:
      "Custom SaaS development, APIs, multi-tenant platforms, identity systems, and field operations software from a Perth-based studio.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  contact: {
    path: "/contact",
    title: "Contact | Seal Labs",
    description:
      "Talk to Seal Labs about custom software, SaaS, APIs, or modernising an operational workflow.",
    changeFrequency: "yearly",
    priority: 0.6,
  },
  privacy: {
    path: "/privacy",
    title: "Privacy Policy | Seal Labs",
    description: "Seal Labs privacy policy.",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  terms: {
    path: "/terms",
    title: "Terms of Service | Seal Labs",
    description: "Seal Labs terms of service.",
    changeFrequency: "yearly",
    priority: 0.3,
  },
};

export const SITEMAP_PAGE_KEYS: MarketingPageKey[] = [
  "home",
  "work",
  "services",
  "contact",
  "privacy",
  "terms",
];

export function getCanonicalUrl(path: string): string {
  return absoluteUrl(path);
}

export function createMarketingMetadata(pageKey: MarketingPageKey): Metadata {
  const page = MARKETING_PAGES[pageKey];
  const canonicalUrl = getCanonicalUrl(page.path);
  const ogImage = getCanonicalUrl("/opengraph-image");

  return {
    title: {
      absolute: page.title,
    },
    description: page.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_AU",
      siteName: SITE_NAME,
      title: page.title,
      description: page.description,
      url: canonicalUrl,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — software studio`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [ogImage],
    },
  };
}

export function createOrganizationStructuredData(): StructuredData {
  const siteUrl = getCanonicalUrl("/");
  const sameAs = getSocialSameAs();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}#organization`,
    name: SITE_NAME,
    url: siteUrl,
    email: SUPPORT_EMAIL,
    description: SITE_DESCRIPTION,
    logo: {
      "@type": "ImageObject",
      url: getCanonicalUrl("/icon.png"),
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function createWebSiteStructuredData(): StructuredData {
  const siteUrl = getCanonicalUrl("/");

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}#website`,
    name: SITE_NAME,
    url: siteUrl,
    description: SITE_DESCRIPTION,
    publisher: {
      "@id": `${siteUrl}#organization`,
    },
    inLanguage: "en-AU",
  };
}

export function createWebPageStructuredData(pageKey: MarketingPageKey): StructuredData {
  const page = MARKETING_PAGES[pageKey];
  const canonicalUrl = getCanonicalUrl(page.path);
  const siteUrl = getCanonicalUrl("/");

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: page.title,
    description: page.description,
    inLanguage: "en-AU",
    isPartOf: {
      "@id": `${siteUrl}#website`,
    },
    publisher: {
      "@id": `${siteUrl}#organization`,
    },
  };
}

export function createProfessionalServiceStructuredData(): StructuredData {
  const siteUrl = getCanonicalUrl("/");

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}#service`,
    name: SITE_NAME,
    url: siteUrl,
    description: SITE_DESCRIPTION,
    email: SUPPORT_EMAIL,
    areaServed: ["AU", "NZ", "ZA", "ZW", "US", "Global"],
    serviceType: [
      "Software development",
      "SaaS product engineering",
      "Multi-tenant platforms",
      "Identity verification systems",
    ],
    provider: {
      "@id": `${siteUrl}#organization`,
    },
  };
}

export function createItemListStructuredData(): StructuredData {
  const items = getPublicProductEntries();

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Seal Labs products",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
      description: item.description,
    })),
  };
}
