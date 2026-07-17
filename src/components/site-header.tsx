import Link from "next/link";

import { SITE_NAME } from "@/lib/config";

const NAV = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

type SiteHeaderProps = {
  currentPath?: string;
};

export function SiteHeader({ currentPath = "/" }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <Link href="/" className="brand-mark" aria-label={`${SITE_NAME} home`}>
          <span className="brand-mark__seal" aria-hidden="true" />
          <span className="brand-mark__text">{SITE_NAME}</span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          {NAV.map((item) => {
            const active =
              currentPath === item.href || currentPath.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "site-nav__link is-active" : "site-nav__link"}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link href="/contact" className="btn btn--primary site-header__cta">
          Start a conversation
        </Link>
      </div>
    </header>
  );
}
