import { ExperimentsAccordion } from "@/components/experiments-accordion";
import { JsonLd } from "@/components/json-ld";
import { MarketingShell } from "@/components/marketing-shell";
import { ProjectGrid } from "@/components/project-card";
import { Container, PageIntro, Section } from "@/components/ui/section";
import { getExperimentProjects, getPrimaryProjects } from "@/lib/projects";
import {
  createItemListStructuredData,
  createMarketingMetadata,
  createWebPageStructuredData,
} from "@/lib/seo";

export const metadata = createMarketingMetadata("work");

export default function WorkPage() {
  const primary = getPrimaryProjects();
  const experiments = getExperimentProjects();

  return (
    <MarketingShell currentPath="/work">
      <JsonLd
        data={[
          createWebPageStructuredData("work"),
          createItemListStructuredData(),
        ]}
      />

      <Section>
        <Container>
          <PageIntro
            title="Work"
            description="Live links where public. WIP marked where still shipping."
          />
          <ProjectGrid projects={primary} />
          <ExperimentsAccordion projects={experiments} />
        </Container>
      </Section>
    </MarketingShell>
  );
}
