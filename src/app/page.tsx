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
          className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-brand/30 md:size-96"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-16 size-56 rounded-full bg-brand/20 md:size-72"
          aria-hidden="true"
        />
        <Container className="relative py-16 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <BrandMark
              size="hero"
              className="mb-6 justify-center"
              showMascot={false}
              linked={false}
            />
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl md:text-5xl">
              We ship software that{" "}
              <span className="underline decoration-brand decoration-4 underline-offset-4">
                works
              </span>
            </h1>
            <p className="mt-5 text-lg text-ink-muted md:text-xl">
              Custom software for businesses that have outgrown off-the-shelf
              tools.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
              <Button href="/work" size="lg" className="w-full sm:w-auto">
                View work
              </Button>
              <Button
                href="/contact"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                Contact
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <FeaturedWorkTeaser projects={featured} />

      <section
        id="about"
        className="scroll-mt-20 border-t-2 border-ink bg-paper py-16 md:py-24"
        aria-labelledby="about-heading"
      >
        <Container>
          <h2
            id="about-heading"
            className="font-display text-3xl font-extrabold text-ink md:text-5xl"
          >
            About
          </h2>
          <div className="mt-6 max-w-3xl space-y-5 text-lg text-ink-muted md:text-xl">
            <p>
              Seal Labs is an independent software studio operating from Perth,
              Australia. Established by a senior software developer with 15+
              years of experience building and operating production systems.
            </p>
            <p>
              With the ability to reduce complex concepts into simple,
              understandable parts, we produce durable and usable software.
            </p>
          </div>
        </Container>
      </section>
    </MarketingShell>
  );
}
