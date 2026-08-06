import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { Container } from "@/components/ui/section";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/config";
import { CTA_NAV, LEGAL_NAV, PRIMARY_NAV } from "@/lib/nav";
import { textLinkClass } from "@/lib/utils";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t-2 border-ink bg-paper-muted">
      <Container className="flex flex-col gap-10 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <BrandMark />
          <p className="mt-3 text-sm text-ink-muted">{SITE_TAGLINE}</p>
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Footer">
          {[...PRIMARY_NAV, CTA_NAV, ...LEGAL_NAV].map((item) => (
            <Link key={item.href} href={item.href} className={textLinkClass}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="space-y-1 text-sm text-ink-muted">
          <p>
            <a href={SITE_URL} className={textLinkClass}>
              {SITE_URL.replace(/^https?:\/\//, "")}
            </a>
          </p>
          <p className="pt-2">
            © {year} {SITE_NAME}
          </p>
        </div>
      </Container>
    </footer>
  );
}
