import { JsonLd } from "@/components/json-ld";
import { MarketingShell } from "@/components/marketing-shell";
import { SITE_NAME, SUPPORT_EMAIL } from "@/lib/config";
import {
  createMarketingMetadata,
  createWebPageStructuredData,
} from "@/lib/seo";

export const metadata = createMarketingMetadata("terms");

export default function TermsPage() {
  return (
    <MarketingShell currentPath="/terms">
      <JsonLd data={createWebPageStructuredData("terms")} />

      <section className="section">
        <div className="shell">
          <div className="section__intro">
            <p className="eyebrow">Legal</p>
            <h1>Terms of Service</h1>
            <p className="lede">Last updated: 17 July 2026</p>
          </div>

          <div className="prose">
            <p>
              By using https://seallabs.io you agree to these terms. Individual
              Seal Labs products (for example SealAudit, CheckID, or School
              Reports) have their own terms where published on those domains.
            </p>
            <h2>Website use</h2>
            <p>
              Content on this site is provided for general information. We may
              update pages without notice. Do not attempt to disrupt the service
              or misuse the contact form.
            </p>
            <h2>Engagements</h2>
            <p>
              Project work is governed by a separate agreement. Nothing on this
              marketing site constitutes an offer of employment or a binding
              commercial contract.
            </p>
            <h2>Limitation</h2>
            <p>
              To the extent permitted by law, {SITE_NAME} is not liable for
              indirect or consequential loss arising from use of this website.
            </p>
            <h2>Contact</h2>
            <p>
              Questions:{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
            </p>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
