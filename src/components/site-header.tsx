"use client";

import Link from "next/link";
import { useCallback, useId, useState } from "react";

import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { CTA_NAV, PRIMARY_NAV } from "@/lib/nav";
import { useOverlayLock } from "@/lib/use-overlay-lock";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  currentPath?: string;
};

function isActive(currentPath: string, href: string): boolean {
  if (href === "/") return currentPath === "/";
  return currentPath === href || currentPath.startsWith(`${href}/`);
}

export function SiteHeader({ currentPath = "/" }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const onClose = useCallback(() => setOpen(false), []);

  useOverlayLock(open, onClose, "nav-open");

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper">
      <Container className="flex h-16 items-center gap-4">
        <BrandMark onClick={onClose} className="shrink-0" priority />

        <nav
          className="ml-auto hidden items-center gap-6 md:flex"
          aria-label="Primary"
        >
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-semibold transition-colors",
                isActive(currentPath, item.href)
                  ? "text-ink"
                  : "text-ink-muted hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Button
          href={CTA_NAV.href}
          size="sm"
          className="ml-auto hidden md:ml-0 md:inline-flex"
        >
          {CTA_NAV.label}
        </Button>

        <button
          type="button"
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-lg border-2 border-ink bg-paper md:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="flex w-5 flex-col gap-1" aria-hidden="true">
            <span
              className={cn(
                "block h-0.5 w-full bg-ink transition-transform",
                open && "translate-y-[6px] rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-full bg-ink transition-opacity",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-full bg-ink transition-transform",
                open && "-translate-y-[6px] -rotate-45",
              )}
            />
          </span>
        </button>
      </Container>

      {open ? (
        <div
          className="fixed inset-0 z-40 bg-ink/40 md:hidden"
          aria-hidden="true"
          onClick={onClose}
        />
      ) : null}

      <div
        id={menuId}
        className="absolute inset-x-0 top-full z-50 border-b-2 border-ink bg-paper md:hidden"
        hidden={!open}
      >
        <Container className="flex flex-col gap-4 py-6">
          <nav className="flex flex-col gap-2" aria-label="Mobile">
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-xl border-2 px-4 py-3 font-display text-lg font-bold",
                  isActive(currentPath, item.href)
                    ? "border-ink bg-brand text-ink"
                    : "border-transparent text-ink hover:border-ink hover:bg-paper-muted",
                )}
                onClick={onClose}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Button href={CTA_NAV.href} onClick={onClose} className="w-full">
            {CTA_NAV.label}
          </Button>
        </Container>
      </div>
    </header>
  );
}
