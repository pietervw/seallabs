import {
  ProjectCardBody,
  projectCardClass,
} from "@/components/project-card-body";
import { TenantProjectCard } from "@/components/tenant-project-card";
import { Button } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import type { PortfolioProject } from "@/lib/projects";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: PortfolioProject;
};

export function ProjectCard({ project }: ProjectCardProps) {
  if (project.tenants && project.tenants.length > 0) {
    return <TenantProjectCard project={project} />;
  }

  const cta = project.url ? (
    <span className="mt-auto pt-5 font-display text-sm font-bold text-ink">
      Open →
    </span>
  ) : (
    <span className="mt-auto pt-5 font-display text-sm font-bold text-ink-muted">
      No public link
    </span>
  );

  if (project.url) {
    return (
      <a
        href={project.url}
        className={cn(
          projectCardClass,
          "hover:-translate-x-px hover:-translate-y-px hover:shadow-brutal-lg",
        )}
        target="_blank"
        rel="noopener noreferrer"
      >
        <ProjectCardBody project={project} />
        {cta}
      </a>
    );
  }

  return (
    <article className={projectCardClass}>
      <ProjectCardBody project={project} />
      {cta}
    </article>
  );
}

type ProjectGridProps = {
  projects: PortfolioProject[];
};

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

export function FeaturedWorkTeaser({ projects }: ProjectGridProps) {
  if (projects.length === 0) return null;

  return (
    <Section
      className="border-t-2 border-ink bg-paper-muted"
      aria-labelledby="featured-work-heading"
    >
      <Container>
        <SectionHeading
          id="featured-work-heading"
          title="Featured work"
          description="A selection of Seal Labs products in production."
        />
        <ProjectGrid projects={projects} />
        <div className="mt-10 flex justify-center">
          <Button href="/work" variant="secondary">
            See all work
          </Button>
        </div>
      </Container>
    </Section>
  );
}
