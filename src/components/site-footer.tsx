import Link from "next/link";

import { SITE_NAME, SITE_URL, SUPPORT_EMAIL } from "@/lib/config";
import { LEGAL_NAV, PRIMARY_NAV } from "@/lib/nav";

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
          <p className="site-footer__tagline">exit 0 — systems that ship.</p>
        </div>

        <nav className="site-footer__nav" aria-label="Footer">
          {[...PRIMARY_NAV, ...LEGAL_NAV].map((item) => (
            <Link key={item.href} href={item.href}>
              ./{item.label}
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
            © {year} {SITE_NAME}
          </p>
        </div>
      </div>
    </footer>
  );
}
