import { JsonLd } from "@/components/json-ld";
import { MarketingShell } from "@/components/marketing-shell";
import { Button } from "@/components/ui/button";
import { Container, PageIntro, Section } from "@/components/ui/section";
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
    title: "Systems integration",
    body: "Use of APIs and webhooks to configure systems integration",
  },
  {
    title: "Field ops",
    body: "QR codes, custom workflows, evidence capture and audit trails",
  },
  {
    title: "AI and Automation",
    body: "Implement AI in your business, with custom built automations to suit your needs",
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

      <Section>
        <Container>
          <PageIntro
            title="Services"
            description="Build, deploy, and operate production systems — without the slide deck theatre."
          />

          <div className="grid gap-6 sm:grid-cols-2">
            {SERVICES.map((service) => (
              <article
                key={service.title}
                className="rounded-2xl border-2 border-ink bg-paper p-6 shadow-brutal"
              >
                <h2 className="font-display text-xl font-extrabold text-ink">
                  {service.title}
                </h2>
                <p className="mt-3 text-ink-muted">{service.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/contact" size="lg">
              Contact
            </Button>
            <Button href="/work" variant="secondary" size="lg">
              View work
            </Button>
          </div>
        </Container>
      </Section>
    </MarketingShell>
  );
}
