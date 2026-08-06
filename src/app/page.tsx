import { BrandMark } from "@/components/brand-mark";
import { JsonLd } from "@/components/json-ld";
import { MarketingShell } from "@/components/marketing-shell";
import { FeaturedWorkTeaser } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { getFeaturedProjects } from "@/lib/projects";
import {
  createMarketingMetadata,
  createOrganizationStructuredData,
  createProfessionalServiceStructuredData,
  createWebPageStructuredData,
  createWebSiteStructuredData,
} from "@/lib/seo";

export const metadata = createMarketingMetadata("home");

const capabilities = [
  "Fully customised software",
  "Software as a Service (SaaS) with auth, billing and integrated systems",
  "AI, automation, APIs and systems integration",
] as const;

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

      <section className="relative overflow-hidden border-b-2 border-ink bg-grid">
        <div
          className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-brand/30"
          aria-hidden="true"
        />
        <Container className="relative grid gap-12 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <BrandMark size="hero" className="mb-6" showMascot={false} />
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink md:text-5xl">
              We ship software that{" "}
              <span className="underline decoration-brand decoration-4 underline-offset-4">
                works
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink-muted md:text-xl">
              We build custom software solutions that drives business value.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/work" size="lg">
                View work
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Contact
              </Button>
            </div>
          </div>

          <aside
            className="rounded-2xl border-2 border-ink bg-paper p-6 shadow-brutal-lg"
            aria-label="Capabilities"
          >
            <h2 className="font-display text-xl font-extrabold text-ink">
              What we build
            </h2>
            <ul className="mt-5 space-y-4">
              {capabilities.map((item) => (
                <li
                  key={item}
                  className="border-l-4 border-brand pl-5 text-ink-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </Container>
      </section>

      <FeaturedWorkTeaser projects={featured} />
    </MarketingShell>
  );
}
