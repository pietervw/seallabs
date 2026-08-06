export type ProjectStatus = "live" | "private" | "beta" | "wip";

export type ProjectTenant = {
  name: string;
  url: string;
  domain: string;
  region: string;
};

export type PortfolioProject = {
  id: string;
  name: string;
  /** Live product URL. Omit when no public link or when tenants[] is used. */
  url?: string;
  domain: string;
  description: string;
  status: ProjectStatus;
  category: string;
  region: string;
  stack: string[];
  featured?: boolean;
  /** Multi-tenant products: card opens a modal listing these for SEO click-through. */
  tenants?: ProjectTenant[];
};

export const SCHOOL_REPORT_TENANTS: ProjectTenant[] = [
  {
    name: "NSW School Reports",
    url: "https://nswschoolreports.com.au",
    domain: "nswschoolreports.com.au",
    region: "New South Wales",
  },
  {
    name: "VIC School Reports",
    url: "https://vicschoolreports.com.au",
    domain: "vicschoolreports.com.au",
    region: "Victoria",
  },
  {
    name: "QLD School Reports",
    url: "https://qldschoolreports.com.au",
    domain: "qldschoolreports.com.au",
    region: "Queensland",
  },
  {
    name: "SA School Reports",
    url: "https://saschoolreports.com.au",
    domain: "saschoolreports.com.au",
    region: "South Australia",
  },
  {
    name: "WA School Reports",
    url: "https://waschoolreports.com.au",
    domain: "waschoolreports.com.au",
    region: "Western Australia",
  },
  {
    name: "NT School Reports",
    url: "https://ntschoolreports.com.au",
    domain: "ntschoolreports.com.au",
    region: "Northern Territory",
  },
  {
    name: "ACT School Reports",
    url: "https://actschoolreports.com.au",
    domain: "actschoolreports.com.au",
    region: "Australian Capital Territory",
  },
  {
    name: "NZ School Reports",
    url: "https://schoolreports.nz",
    domain: "schoolreports.nz",
    region: "New Zealand",
  },
];

/**
 * Seal Labs portfolio — products linked from the agency homepage.
 */
export const PROJECTS: PortfolioProject[] = [
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
    stack: ["Next.js", "Prisma", "Clerk", "Stripe", "microservices", ".NET", "API"],
    featured: true,
  },
  {
    id: "schoolreports-multi",
    name: "School Reports",
    domain: "multi-tenanted codebase",
    description:
      "AI report-comment generator for teachers. AI trained and curriculum-aligned for each Australian state and New Zealand.",
    status: "live",
    category: "Education",
    region: "AU / NZ",
    stack: ["Next.js", "Prisma", "Clerk", "Stripe", "OpenAI"],
    featured: true,
    tenants: SCHOOL_REPORT_TENANTS,
  },
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
      "Multi-tenant applicant tracking for SME's. Simplify hiring with job boards, candidate pipelines and onboarding.",
    status: "wip",
    category: "Hiring",
    region: "AU / NZ",
    stack: [".NET", "React", "PostgreSQL", "Clerk", "Stripe"],
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
    name: "US Health Provider API",
    url: "https://healthproviderapi.com",
    domain: "healthproviderapi.com",
    description:
      "Programmatic US NPPES / NPI lookup, provider search, and bulk lookup for onboarding, credentialing, billing, and directory integrations.",
    status: "live",
    category: "Healthcare API",
    region: "United States",
    stack: ["API", "TypeScript", ".NET", "C#"],
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
    stack: ["Next.js", "SendGrid", "Cloudflare R2"],
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
    id: "engineering-comments-register",
    name: "Engineering Comments Register",
    domain: "Private",
    description:
      "Internal PM toolkit that replaces spreadsheet comment registers with a searchable Bluebeam PDF/CSV comments register, inline editing, and optional desktop app.",
    status: "wip",
    category: "Engineering tools",
    region: "Internal",
    stack: ["Next.js", "Prisma", "Electron"],
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
    stack: ["Next.js"],
  },
];

export function getFeaturedProjects(): PortfolioProject[] {
  return PROJECTS.filter((p) => p.featured);
}

export type PublicProductEntry = {
  name: string;
  url: string;
  description: string;
  region?: string;
};

/** Flatten projects + tenants into public crawlable entries (excludes private). */
export function getPublicProductEntries(): PublicProductEntry[] {
  const entries: PublicProductEntry[] = [];
  for (const project of PROJECTS) {
    if (project.tenants?.length) {
      for (const tenant of project.tenants) {
        entries.push({
          name: tenant.name,
          url: tenant.url,
          description: `${project.description} (${tenant.region})`,
          region: tenant.region,
        });
      }
      continue;
    }
    if (project.url) {
      entries.push({
        name: project.name,
        url: project.url,
        description: project.description,
      });
    }
  }
  return entries;
}
