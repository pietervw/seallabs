import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type MarketingShellProps = {
  children: React.ReactNode;
  currentPath?: string;
};

export function MarketingShell({
  children,
  currentPath = "/",
}: MarketingShellProps) {
  return (
    <>
      <SiteHeader currentPath={currentPath} />
      <main id="main" className="site-main">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
