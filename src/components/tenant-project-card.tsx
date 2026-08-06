"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

import {
  ProjectCardBody,
  projectCardClass,
} from "@/components/project-card-body";
import type { PortfolioProject, ProjectTenant } from "@/lib/projects";
import { useOverlayLock } from "@/lib/use-overlay-lock";
import { cn } from "@/lib/utils";

function TenantModal({
  projectName,
  tenants,
  open,
  onClose,
}: {
  projectName: string;
  tenants: ProjectTenant[];
  open: boolean;
  onClose: () => void;
}) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useOverlayLock(open, onClose, "modal-open");

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-ink/50"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        className="relative z-10 max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto rounded-2xl border-2 border-ink bg-paper p-6 shadow-brutal-lg"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2
            id={titleId}
            className="font-display text-xl font-extrabold text-ink"
          >
            {projectName} — tenants
          </h2>
          <button
            ref={closeRef}
            type="button"
            className="rounded-lg border-2 border-ink bg-paper px-3 py-1 font-display text-sm font-bold hover:bg-paper-muted"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <p className="mb-4 text-sm text-ink-muted">
          Curriculum-aligned report comment sites. Open a region:
        </p>
        <ul className="divide-y-2 divide-line overflow-hidden rounded-xl border-2 border-ink">
          {tenants.map((tenant) => (
            <li key={tenant.domain}>
              <a
                href={tenant.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-0.5 bg-paper px-4 py-3 transition-colors hover:bg-brand/30"
              >
                <span className="font-display font-bold text-ink">
                  {tenant.name}
                </span>
                <span className="text-sm text-ink-muted">
                  {tenant.region} · {tenant.domain}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function TenantProjectCard({ project }: { project: PortfolioProject }) {
  const [open, setOpen] = useState(false);
  const tenants = project.tenants ?? [];
  const onClose = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        type="button"
        className={cn(
          projectCardClass,
          "w-full hover:-translate-x-px hover:-translate-y-px hover:shadow-brutal-lg",
        )}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <ProjectCardBody project={project} />
        <span className="mt-auto pt-5 font-display text-sm font-bold text-ink">
          View tenants →
        </span>
      </button>
      <TenantModal
        projectName={project.name}
        tenants={tenants}
        open={open}
        onClose={onClose}
      />
      <nav className="sr-only" aria-label={`${project.name} regional sites`}>
        {tenants.map((tenant) => (
          <a key={tenant.domain} href={tenant.url}>
            {tenant.name} ({tenant.domain})
          </a>
        ))}
      </nav>
    </>
  );
}
