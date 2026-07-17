"use client";

import Link from "next/link";
import { useCallback, useId, useState } from "react";

import { SITE_NAME } from "@/lib/config";
import { PRIMARY_NAV } from "@/lib/nav";
import { useOverlayLock } from "@/lib/use-overlay-lock";

type SiteHeaderProps = {
  currentPath?: string;
};

function isActive(currentPath: string, href: string): boolean {
  return currentPath === href || currentPath.startsWith(`${href}/`);
}

export function SiteHeader({ currentPath = "/" }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const onClose = useCallback(() => setOpen(false), []);

  useOverlayLock(open, onClose, "nav-open");

  return (
    <header className={`site-header${open ? " is-open" : ""}`}>
      <div className="shell site-header__inner">
        <Link
          href="/"
          className="brand-mark"
          aria-label={`${SITE_NAME} home`}
          onClick={onClose}
        >
          <span className="brand-mark__seal" aria-hidden="true" />
          <span className="brand-mark__text">{SITE_NAME}</span>
        </Link>

        <nav className="site-nav site-nav--desktop" aria-label="Primary">
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                isActive(currentPath, item.href)
                  ? "site-nav__link is-active"
                  : "site-nav__link"
              }
            >
              ./{item.label}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className="btn btn--primary site-header__cta">
          ./connect
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="menu-toggle__bars" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      {open ? (
        <button
          type="button"
          className="mobile-menu__backdrop"
          aria-label="Close menu"
          onClick={onClose}
        />
      ) : null}

      <div
        id={menuId}
        className={`mobile-menu${open ? " is-open" : ""}`}
        hidden={!open}
      >
        <div className="shell mobile-menu__inner">
          <p className="mobile-menu__prompt" aria-hidden="true">
            {">_"} nav --list
          </p>
          <nav className="mobile-menu__nav" aria-label="Mobile">
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isActive(currentPath, item.href)
                    ? "mobile-menu__link is-active"
                    : "mobile-menu__link"
                }
                onClick={onClose}
              >
                ./{item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/contact"
            className="btn btn--primary mobile-menu__cta"
            onClick={onClose}
          >
            ./connect
          </Link>
        </div>
      </div>
    </header>
  );
}
