"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

import { ProjectCardBody } from "@/components/project-card-body";
import type { PortfolioProject, ProjectTenant } from "@/lib/projects";
import { useOverlayLock } from "@/lib/use-overlay-lock";

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
    <div className="tenant-modal" role="presentation">
      <button
        type="button"
        className="tenant-modal__backdrop"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        className="tenant-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="tenant-modal__head">
          <h2 id={titleId}>{projectName} — tenants</h2>
          <button
            ref={closeRef}
            type="button"
            className="tenant-modal__close"
            onClick={onClose}
          >
            close
          </button>
        </div>
        <p className="tenant-modal__lede">
          Curriculum-aligned report comment sites. Open a region:
        </p>
        <ul className="tenant-modal__list">
          {tenants.map((tenant) => (
            <li key={tenant.domain}>
              <a
                href={tenant.url}
                target="_blank"
                rel="noopener noreferrer"
                className="tenant-modal__link"
              >
                <span className="tenant-modal__name">{tenant.name}</span>
                <span className="tenant-modal__meta">
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
        className="project-card project-card--link project-card--button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <ProjectCardBody project={project} />
        <span className="project-card__cta">view tenants →</span>
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
