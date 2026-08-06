import { Badge } from "@/components/ui/badge";
import type { PortfolioProject } from "@/lib/projects";

export const projectCardClass =
  "flex h-full flex-col rounded-2xl border-2 border-ink bg-paper p-6 text-left shadow-brutal transition-transform duration-150";

export function ProjectCardBody({ project }: { project: PortfolioProject }) {
  return (
    <>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Badge variant="muted">{project.category}</Badge>
        <Badge
          variant={project.status === "live" ? "brand" : "outline"}
          title={project.status === "wip" ? "work in progress" : undefined}
        >
          {project.status}
        </Badge>
      </div>
      <h3 className="font-display text-xl font-extrabold text-ink">
        {project.name}
      </h3>
      <p className="mt-1 text-sm font-semibold text-ink-muted">
        {project.domain}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted">
        {project.description}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
        {project.stack.map((item) => (
          <li key={item}>
            <Badge variant="muted">{item}</Badge>
          </li>
        ))}
      </ul>
    </>
  );
}
