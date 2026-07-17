import Link from "next/link";

import { SITE_NAME, SITE_URL, SUPPORT_EMAIL } from "@/lib/config";

const FOOTER_NAV = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <div className="site-footer__brand">
          <Link href="/" className="brand-mark brand-mark--footer">
            <span className="brand-mark__seal" aria-hidden="true" />
            <span className="brand-mark__text">{SITE_NAME}</span>
          </Link>
          <p className="site-footer__tagline">
            Calm craft. Production software. Products that earn trust.
          </p>
        </div>

        <nav className="site-footer__nav" aria-label="Footer">
          {FOOTER_NAV.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-footer__meta">
          <p>
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
          </p>
          <p>
            <a href={SITE_URL}>{SITE_URL.replace(/^https?:\/\//, "")}</a>
          </p>
          <p className="site-footer__copy">
            © {year} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
