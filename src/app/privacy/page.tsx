import { JsonLd } from "@/components/json-ld";
import { MarketingShell } from "@/components/marketing-shell";
import { Container, PageIntro, Section } from "@/components/ui/section";
import { SITE_NAME, SUPPORT_EMAIL } from "@/lib/config";
import {
  createMarketingMetadata,
  createWebPageStructuredData,
} from "@/lib/seo";
import { textLinkClass } from "@/lib/utils";

export const metadata = createMarketingMetadata("privacy");

export default function PrivacyPage() {
  return (
    <MarketingShell currentPath="/privacy">
      <JsonLd data={createWebPageStructuredData("privacy")} />

      <Section>
        <Container>
          <PageIntro
            eyebrow="Legal"
            title="Privacy Policy"
            description="Last updated: 17 July 2026"
          />

          <div className="max-w-3xl space-y-6 text-ink-muted">
            <p>
              {SITE_NAME} (“we”, “us”) operates https://seallabs.io. This policy
              explains what information we collect on this marketing site and how
              we use it.
            </p>
            <h2 className="font-display text-2xl font-extrabold text-ink">
              Information we collect
            </h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Contact form submissions (name, email, optional company, message).
              </li>
              <li>
                Basic technical logs (IP address, user agent) when you submit forms
                or when our hosts record access logs.
              </li>
              <li>
                Optional analytics events if Umami or Google Analytics is enabled
                via environment configuration.
              </li>
            </ul>
            <h2 className="font-display text-2xl font-extrabold text-ink">
              How we use information
            </h2>
            <p>
              We use contact details to respond to enquiries. We do not sell
              personal information. Analytics, when enabled, helps us understand
              aggregate traffic.
            </p>
            <h2 className="font-display text-2xl font-extrabold text-ink">
              Retention
            </h2>
            <p>
              Enquiry emails are retained as needed to manage the conversation and
              for ordinary business records. Server logs are retained according to
              our hosting provider’s defaults unless shortened by us.
            </p>
            <h2 className="font-display text-2xl font-extrabold text-ink">
              Contact
            </h2>
            <p>
              Privacy questions:{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`} className={textLinkClass}>
                {SUPPORT_EMAIL}
              </a>
            </p>
          </div>
        </Container>
      </Section>
    </MarketingShell>
  );
}
