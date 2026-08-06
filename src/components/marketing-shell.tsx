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
    <div className="flex min-h-full flex-1 flex-col">
      <SiteHeader currentPath={currentPath} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
