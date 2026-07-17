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
            <p className="eyebrow">whoami</p>
            <h1>About</h1>
            <p className="lede">
              Seal Labs builds production software — education, identity, hiring,
              field ops, APIs.
            </p>
          </div>

          <div className="prose">
            <p>
              Stack preference: Next.js, typed backends, Postgres, real billing,
              real auth. Apex domain only:{" "}
              <a href="https://seallabs.io">seallabs.io</a>.
            </p>
          </div>

          <div className="btn-row">
            <Link href="/work" className="btn btn--primary">
              ./work
            </Link>
            <Link href="/contact" className="btn btn--ghost">
              ./contact
            </Link>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
