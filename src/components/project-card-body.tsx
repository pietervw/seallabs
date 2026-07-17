import type { PortfolioProject } from "@/lib/projects";

export function ProjectCardBody({ project }: { project: PortfolioProject }) {
  return (
    <>
      <div className="project-card__meta">
        <span className="project-card__category">{project.category}</span>
        <span
          className={`project-card__status project-card__status--${project.status}`}
        >
          {project.status === "private" ? "private" : project.status}
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
}
