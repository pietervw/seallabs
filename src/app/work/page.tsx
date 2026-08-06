import { JsonLd } from "@/components/json-ld";
import { MarketingShell } from "@/components/marketing-shell";
import { ProjectGrid } from "@/components/project-card";
import { Container, PageIntro, Section } from "@/components/ui/section";
import { PROJECTS } from "@/lib/projects";
import {
  createItemListStructuredData,
  createMarketingMetadata,
  createSoftwareApplicationStructuredData,
  createWebPageStructuredData,
} from "@/lib/seo";

export const metadata = createMarketingMetadata("work");

export default function WorkPage() {
  const softwareApps = PROJECTS.map(createSoftwareApplicationStructuredData).filter(
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
            description="Live links where public. Private where noted."
          />
          <ProjectGrid projects={PROJECTS} />
        </Container>
      </Section>
    </MarketingShell>
  );
}
