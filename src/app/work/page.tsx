import { ExperimentsAccordion } from "@/components/experiments-accordion";
import { JsonLd } from "@/components/json-ld";
import { MarketingShell } from "@/components/marketing-shell";
import { ProjectGrid } from "@/components/project-card";
import { Container, PageIntro, Section } from "@/components/ui/section";
import { getListedProjects } from "@/lib/projects";
import {
  createItemListStructuredData,
  createMarketingMetadata,
  createSoftwareApplicationStructuredData,
  createWebPageStructuredData,
} from "@/lib/seo";

export const metadata = createMarketingMetadata("work");

export default function WorkPage() {
  const listed = getListedProjects();
  const primary = listed.filter((p) => !p.experiment);
  const experiments = listed.filter((p) => p.experiment);
  const softwareApps = listed.map(createSoftwareApplicationStructuredData).filter(
    (item): item is NonNullable<typeof item> => item !== null,
  );

  return (
    <MarketingShell currentPath="/work">
      <JsonLd
        data={[
          createWebPageStructuredData("work"),
          createItemListStructuredData(),
          ...softwareApps,
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
