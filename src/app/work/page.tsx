import { JsonLd } from "@/components/json-ld";
import { MarketingShell } from "@/components/marketing-shell";
import { ProjectGrid } from "@/components/project-card";
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

      <section className="section">
        <div className="shell">
          <div className="section__intro">
            <p className="eyebrow">ls -la ./products</p>
            <h1>Work</h1>
            <p className="lede">Live links where public. Private where noted.</p>
          </div>
          <ProjectGrid projects={PROJECTS} />
        </div>
      </section>
    </MarketingShell>
  );
}
