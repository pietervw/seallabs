import type { Metadata } from "next";

import { MarketingShell } from "@/components/marketing-shell";
import { Button } from "@/components/ui/button";
import { Container, PageIntro, Section } from "@/components/ui/section";

const title = "Page not found";
const description = "This page does not exist.";

export const metadata: Metadata = {
  title,
  description,
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  openGraph: {
    title,
    description,
  },
  twitter: {
    title,
    description,
  },
};

export default function NotFound() {
  return (
    <MarketingShell currentPath="/404">
      <Section>
        <Container>
          <PageIntro
            eyebrow="404"
            title={title}
            description="That URL is not a page on this site."
          />
          <div className="flex flex-wrap gap-3">
            <Button href="/">Home</Button>
            <Button href="/work" variant="secondary">
              Work
            </Button>
            <Button href="/contact" variant="secondary">
              Contact
            </Button>
          </div>
        </Container>
      </Section>
    </MarketingShell>
  );
}
