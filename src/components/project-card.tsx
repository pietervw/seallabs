import Link from "next/link";

import type { PortfolioProject } from "@/lib/projects";

type ProjectCardProps = {
  project: PortfolioProject;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const inner = (
    <>
      <div className="project-card__meta">
        <span className="project-card__category">{project.category}</span>
        <span
          className={`project-card__status project-card__status--${project.status}`}
        >
          {project.status === "private" ? "Private" : project.status}
        </span>
      </div>
      <h3 className="project-card__title">{project.name}</h3>
      <p className="project-card__domain">{project.domain}</p>
      <p className="project-card__description">{project.description}</p>
      <ul className="project-card__stack" aria-label="Tech stack">
        {project.stack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );

  if (project.url) {
    return (
      <a
        href={project.url}
        className="project-card project-card--link"
        target="_blank"
        rel="noopener noreferrer"
      >
        {inner}
        <span className="project-card__cta">Visit site →</span>
      </a>
    );
  }

  return (
    <article className="project-card">
      {inner}
      <span className="project-card__cta project-card__cta--muted">
        No public link
      </span>
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
          <p className="eyebrow">Selected work</p>
          <h2 id="featured-work-heading">Products in production</h2>
          <p className="lede">
            Live platforms across education, identity, hiring, and field
            operations — built to be operated, not just demoed.
          </p>
        </div>
        <ProjectGrid projects={projects} />
        <div className="section__action">
          <Link href="/work" className="btn btn--ghost">
            View all work
          </Link>
        </div>
      </div>
    </section>
  );
}
