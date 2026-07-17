import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { MarketingShell } from "@/components/marketing-shell";
import {
  createMarketingMetadata,
  createProfessionalServiceStructuredData,
  createWebPageStructuredData,
} from "@/lib/seo";

export const metadata = createMarketingMetadata("services");

const SERVICES = [
  {
    title: "Product & SaaS engineering",
    body: "End-to-end design and build of web products — authentication, billing, multi-tenancy, dashboards, and the operational details that keep them running.",
  },
  {
    title: "Identity & verification systems",
    body: "ID validation products, API access tiers, freemium funnels, and compliance-minded UX for markets that need trustworthy checks.",
  },
  {
    title: "Field & operations platforms",
    body: "QR workflows, audit trails, evidence capture, and tools that hold up when the work happens on phones in the field.",
  },
  {
    title: "Education & vertical SaaS",
    body: "Curriculum-aligned tools, multi-tenant state sites, and teacher-facing products with careful copy and reliable delivery.",
  },
  {
    title: "APIs & integrations",
    body: "Provider lookup APIs, webhook pipelines, and SDK-friendly surfaces that other systems can depend on.",
  },
  {
    title: "SEO, SSR & launch readiness",
    body: "Canonical URLs, schema.org, sitemaps, llms.txt, and marketing pages that render without relying on client JavaScript for content.",
  },
] as const;

export default function ServicesPage() {
  return (
    <MarketingShell currentPath="/services">
      <JsonLd
        data={[
          createWebPageStructuredData("services"),
          createProfessionalServiceStructuredData(),
        ]}
      />

      <section className="section">
        <div className="shell">
          <div className="section__intro">
            <p className="eyebrow">Services</p>
            <h1>How we help</h1>
            <p className="lede">
              Focused engagements around shipping and operating software —
              not endless decks. We prefer clear scope, calm delivery, and
              measurable outcomes.
            </p>
          </div>

          <div className="service-grid">
            {SERVICES.map((service) => (
              <article key={service.title} className="service-item">
                <h2>{service.title}</h2>
                <p>{service.body}</p>
              </article>
            ))}
          </div>

          <div className="btn-row">
            <Link href="/contact" className="btn btn--primary">
              Discuss a project
            </Link>
            <Link href="/work" className="btn btn--ghost">
              See related work
            </Link>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
