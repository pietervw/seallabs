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
    title: "SaaS build",
    body: "Auth, billing, multi-tenancy, dashboards. Ship it. Run it.",
  },
  {
    title: "Identity systems",
    body: "ID checks, API tiers, freemium funnels for markets that need verification.",
  },
  {
    title: "Field ops",
    body: "QR workflows, evidence capture, audit trails that survive the field.",
  },
  {
    title: "APIs",
    body: "Lookup APIs, webhooks, SDKs other systems can depend on.",
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
            <p className="eyebrow">man seallabs</p>
            <h1>Services</h1>
            <p className="lede">Build. Deploy. Operate. No deck theatre.</p>
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
              ./contact
            </Link>
            <Link href="/work" className="btn btn--ghost">
              ./work
            </Link>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
