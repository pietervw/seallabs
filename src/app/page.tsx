import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { MarketingShell } from "@/components/marketing-shell";
import { FeaturedWorkTeaser } from "@/components/project-card";
import { TypeLine } from "@/components/type-line";
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
            <p className="eyebrow">root@seallabs</p>
            <h1 className="hero__brand">Seal Labs</h1>
            <TypeLine
              className="hero__headline"
              text="./build --target production --no-slop"
            />
            <p className="hero__support">
              We ship SaaS that runs in the wild — identity, hiring, field ops,
              and education platforms.
            </p>
            <div className="btn-row">
              <Link href="/work" className="btn btn--primary">
                ./work
              </Link>
              <Link href="/contact" className="btn btn--ghost">
                ./contact
              </Link>
            </div>
          </div>

          <aside className="hero__panel" aria-label="Capabilities">
            <h2>capabilities.exe</h2>
            <ul className="hero__list">
              <li>Multi-tenant SaaS — auth, billing, ops</li>
              <li>Identity verification products</li>
              <li>Field workflows with audit trails</li>
              <li>APIs other systems can trust</li>
            </ul>
          </aside>
        </div>
      </section>

      <div className="status-bar">
        <div className="shell status-bar__inner">
          <span>
            <strong>status</strong> online
          </span>
          <span>
            <strong>host</strong> seallabs.io
          </span>
          <span>
            <strong>mode</strong> production
          </span>
        </div>
      </div>

      <FeaturedWorkTeaser projects={featured} />
    </MarketingShell>
  );
}
