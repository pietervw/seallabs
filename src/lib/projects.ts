export type ProjectStatus = "live" | "private" | "beta";

export type PortfolioProject = {
  id: string;
  name: string;
  /** Live product URL. Omit when no public link. */
  url?: string;
  domain: string;
  description: string;
  status: ProjectStatus;
  category: string;
  region: string;
  stack: string[];
  featured?: boolean;
};

/**
 * Seal Labs portfolio — products linked from the agency homepage.
 */
export const PROJECTS: PortfolioProject[] = [
  {
    id: "sealaudit",
    name: "SealAudit",
    url: "https://sealaudit.com",
    domain: "sealaudit.com",
    description:
      "Custom QR workflows for field teams with a complete audit trail — capture timestamped evidence and exportable records for audits and handovers.",
    status: "live",
    category: "Field operations",
    region: "Global",
    stack: ["Next.js", "PostgreSQL", "Clerk", "Stripe", "Cloudflare R2"],
    featured: true,
  },
  {
    id: "seal-ats",
    name: "Seal ATS",
    url: "https://sealats.com",
    domain: "sealats.com",
    description:
      "Multi-tenant applicant tracking for small and medium hiring teams — job boards, candidate pipelines, and organisation workspaces.",
    status: "live",
    category: "Hiring",
    region: "AU / NZ",
    stack: [".NET", "React", "PostgreSQL", "Clerk", "Stripe"],
    featured: true,
  },
  {
    id: "schoolreports-multi",
    name: "School Reports",
    url: "https://nswschoolreports.com.au",
    domain: "nswschoolreports.com.au",
    description:
      "Multi-tenant AI report-comment SaaS for teachers — curriculum-aligned wording across Australian states and New Zealand, with teacher review before paste into school systems.",
    status: "live",
    category: "Education",
    region: "AU / NZ",
    stack: ["Next.js", "Prisma", "Clerk", "Stripe", "OpenAI"],
    featured: true,
  },
  {
    id: "checkid",
    name: "CheckID",
    url: "https://checkid.co.za",
    domain: "checkid.co.za",
    description:
      "South African ID number validator — format, checksum, age, gender, and citizenship checks with freemium tiers and API access for teams.",
    status: "live",
    category: "Identity",
    region: "South Africa",
    stack: ["Next.js", "Prisma", "Clerk", "Stripe"],
    featured: true,
  },
  {
    id: "trueid-zim",
    name: "TrueID Zim",
    url: "https://trueidzim.com",
    domain: "trueidzim.com",
    description:
      "Zimbabwe national ID validator — structure checks, mod-23 check letter, and district lookup with freemium and API-style access.",
    status: "live",
    category: "Identity",
    region: "Zimbabwe",
    stack: ["Next.js", "Clerk", "Stripe"],
  },
  {
    id: "npi-api",
    name: "Health Provider API",
    url: "https://healthproviderapi.com",
    domain: "healthproviderapi.com",
    description:
      "Programmatic US NPPES / NPI lookup, provider search, and bulk lookup for onboarding, credentialing, billing, and directory integrations.",
    status: "live",
    category: "Healthcare API",
    region: "United States",
    stack: ["API", "TypeScript", "Python", "C#"],
  },
  {
    id: "indiedevtest",
    name: "IndieDevTest",
    url: "https://indiedevtest.com",
    domain: "indiedevtest.com",
    description:
      "Reciprocal testing community for indie Android and iOS developers — match peers, exchange builds, and meet store tester requirements.",
    status: "live",
    category: "Community",
    region: "Global",
    stack: ["Next.js", "SendGrid", "Turnstile"],
  },
  {
    id: "ibreatheonline",
    name: "iBreathe Online",
    url: "https://ibreatheonline.com",
    domain: "ibreatheonline.com",
    description:
      "Free browser-based guided breathing exercises (box breathing and 4-7-8) for focus, stress relief, and wind-down — no sign-up required.",
    status: "live",
    category: "Wellness",
    region: "Global",
    stack: ["Next.js", "Tailwind"],
  },
  {
    id: "beyondstgeorges",
    name: "Beyond St Georges",
    url: "https://beyondstgeorges.com",
    domain: "beyondstgeorges.com",
    description:
      "Perth work-from-home advocacy — evidence-based case for flexible and hybrid work, with guides, calculators, and policy templates.",
    status: "live",
    category: "Advocacy",
    region: "Perth, Australia",
    stack: ["Next.js", "Umami"],
  },
  {
    id: "engineering-comments-register",
    name: "Engineering Comments Register",
    domain: "Private",
    description:
      "Internal PM toolkit that replaces spreadsheet comment registers with a searchable Bluebeam PDF/CSV comments register, inline editing, and optional desktop app.",
    status: "private",
    category: "Engineering tools",
    region: "Internal",
    stack: ["Next.js", "Prisma", "Electron"],
  },
];

export function getFeaturedProjects(): PortfolioProject[] {
  return PROJECTS.filter((p) => p.featured);
}
