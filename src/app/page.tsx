import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { MarketingShell } from "@/components/marketing-shell";
import { FeaturedWorkTeaser } from "@/components/project-card";
import { getFeaturedProjects } from "@/lib/projects";
import {
  createMarketingMetadata,
  createOrganizationStructuredData,
  createProfessionalServiceStructuredData,
  createWebPageStructuredData,
  createWebSiteStructuredData,
} from "@/lib/seo";

export const metadata = createMarketingMetadata("home");

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <MarketingShell currentPath="/">
      <JsonLd
        data={[
          createOrganizationStructuredData(),
          createWebSiteStructuredData(),
          createWebPageStructuredData("home"),
          createProfessionalServiceStructuredData(),
        ]}
      />

      <section className="hero">
        <div className="shell hero__grid">
          <div>
            <p className="eyebrow">Software studio</p>
            <h1 className="hero__brand">Seal Labs</h1>
            <p className="hero__headline">
              Trustworthy SaaS, built with calm craft.
            </p>
            <p className="hero__support">
              We design and ship production platforms — education tools, identity
              verification, hiring systems, and field audit workflows — with
              clear UX, solid engineering, and SEO-ready foundations.
            </p>
            <div className="btn-row">
              <Link href="/work" className="btn btn--primary">
                See our work
              </Link>
              <Link href="/contact" className="btn btn--ghost">
                Talk to us
              </Link>
            </div>
          </div>

          <aside className="hero__panel" aria-label="What we focus on">
            <h2>What we ship</h2>
            <ul className="hero__list">
              <li>Multi-tenant SaaS with billing, auth, and observability</li>
              <li>Identity and verification products people actually use</li>
              <li>Field and operations tools with durable audit trails</li>
              <li>APIs and integrations that stay maintainable</li>
            </ul>
          </aside>
        </div>
      </section>

      <FeaturedWorkTeaser projects={featured} />

      <section className="section section--tight">
        <div className="shell">
          <div className="section__intro">
            <p className="eyebrow">Engagements</p>
            <h2>From idea to operated product</h2>
            <p className="lede">
              Whether you need a new SaaS MVP or a hardened multi-tenant
              platform, we stay close to the craft — architecture, delivery, and
              the details that make software feel trustworthy.
            </p>
          </div>
          <div className="btn-row">
            <Link href="/services" className="btn btn--ghost">
              Explore services
            </Link>
            <Link href="/about" className="btn btn--ghost">
              About Seal Labs
            </Link>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
