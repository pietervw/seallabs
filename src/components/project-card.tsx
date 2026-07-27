import Link from "next/link";

import { ProjectCardBody } from "@/components/project-card-body";
import { TenantProjectCard } from "@/components/tenant-project-card";
import type { PortfolioProject } from "@/lib/projects";

type ProjectCardProps = {
  project: PortfolioProject;
};

export function ProjectCard({ project }: ProjectCardProps) {
  if (project.tenants && project.tenants.length > 0) {
    return <TenantProjectCard project={project} />;
  }

  const cta = project.url ? (
    <span className="project-card__cta">open →</span>
  ) : (
    <span className="project-card__cta project-card__cta--muted">
      no public link
    </span>
  );

  if (project.url) {
    return (
      <a
        href={project.url}
        className="project-card project-card--link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ProjectCardBody project={project} />
        {cta}
      </a>
    );
  }

  return (
    <article className="project-card">
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
    <div className="project-grid">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

export function FeaturedWorkTeaser({ projects }: ProjectGridProps) {
  if (projects.length === 0) return null;

  return (
    <section className="section" aria-labelledby="featured-work-heading">
      <div className="shell">
        <div className="section__intro">
          <p className="eyebrow">ls ./work</p>
          <h2 id="featured-work-heading">Featured</h2>
          <p className="lede">Portfolio of work</p>
        </div>
        <ProjectGrid projects={projects} />
        <div className="section__action">
          <Link href="/work" className="btn btn--ghost">
            ./work --all
          </Link>
        </div>
      </div>
    </section>
  );
}
