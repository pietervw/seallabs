"use client";

import { useId, useState } from "react";

import { ProjectGrid } from "@/components/project-card";
import type { PortfolioProject } from "@/lib/projects";
import { cn } from "@/lib/utils";

type ExperimentsAccordionProps = {
  projects: PortfolioProject[];
};

export function ExperimentsAccordion({ projects }: ExperimentsAccordionProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  if (projects.length === 0) return null;

  return (
    <div className="mt-14 border-t-2 border-ink pt-10">
      <button
        type="button"
        className="group flex w-full items-center justify-between gap-4 text-left"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <h2 className="font-display text-2xl font-extrabold text-ink md:text-3xl">
          Experiments and community projects
        </h2>
        <span
          className={cn(
            "inline-flex size-10 shrink-0 items-center justify-center rounded-lg border-2 border-ink bg-paper font-display text-xl font-bold transition-transform",
            open && "rotate-45",
          )}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      <div id={panelId} hidden={!open} className="mt-8">
        <ProjectGrid projects={projects} />
      </div>
    </div>
  );
}
