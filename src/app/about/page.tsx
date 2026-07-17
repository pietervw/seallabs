import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { MarketingShell } from "@/components/marketing-shell";
import {
  createMarketingMetadata,
  createOrganizationStructuredData,
  createWebPageStructuredData,
} from "@/lib/seo";

export const metadata = createMarketingMetadata("about");

export default function AboutPage() {
  return (
    <MarketingShell currentPath="/about">
      <JsonLd
        data={[
          createWebPageStructuredData("about"),
          createOrganizationStructuredData(),
        ]}
      />

      <section className="section">
        <div className="shell">
          <div className="section__intro">
            <p className="eyebrow">About</p>
            <h1>A studio for durable software</h1>
            <p className="lede">
              Seal Labs builds products that need to earn trust — in schools,
              hiring teams, clinics, field crews, and people checking an ID on
              their phone.
            </p>
          </div>

          <div className="prose">
            <p>
              We care about calm interfaces, honest marketing, and engineering
              that survives contact with production: auth, billing, observability,
              SEO foundations, and the unglamorous reliability work in between.
            </p>
            <p>
              Our portfolio spans education SaaS across Australia and New Zealand,
              identity tools in Southern Africa, applicant tracking, QR audit
              workflows, wellness utilities, advocacy sites, and healthcare APIs.
            </p>
            <p>
              Prefer the apex domain{" "}
              <a href="https://seallabs.io">https://seallabs.io</a> (without www).
              That same origin is the canonical home for Seal Labs across our
              product footers.
            </p>
          </div>

          <div className="btn-row">
            <Link href="/work" className="btn btn--primary">
              Browse the work
            </Link>
            <Link href="/contact" className="btn btn--ghost">
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
