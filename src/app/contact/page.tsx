import { ContactForm } from "@/components/contact-form";
import { JsonLd } from "@/components/json-ld";
import { MarketingShell } from "@/components/marketing-shell";
import { SUPPORT_EMAIL } from "@/lib/config";
import {
  createMarketingMetadata,
  createWebPageStructuredData,
} from "@/lib/seo";

export const metadata = createMarketingMetadata("contact");

export default function ContactPage() {
  return (
    <MarketingShell currentPath="/contact">
      <JsonLd data={createWebPageStructuredData("contact")} />

      <section className="section">
        <div className="shell contact-layout">
          <div>
            <p className="eyebrow">Contact</p>
            <h1>Let’s talk</h1>
            <p className="lede">
              Tell us about the product, problem, or partnership you have in
              mind. We typically reply within one business day.
            </p>
            <div className="prose" style={{ marginTop: "1.5rem" }}>
              <p>
                Prefer email?{" "}
                <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
              </p>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </MarketingShell>
  );
}
