import Image from "next/image";

import { ContactForm } from "@/components/contact-form";
import { JsonLd } from "@/components/json-ld";
import { MarketingShell } from "@/components/marketing-shell";
import { Container, PageIntro, Section } from "@/components/ui/section";
import { SUPPORT_EMAIL } from "@/lib/config";
import {
  createMarketingMetadata,
  createWebPageStructuredData,
} from "@/lib/seo";
import { textLinkClass } from "@/lib/utils";
import sealBox from "../../../public/seallabs-box.png";

export const metadata = createMarketingMetadata("contact");

export default function ContactPage() {
  return (
    <MarketingShell currentPath="/contact">
      <JsonLd data={createWebPageStructuredData("contact")} />

      <Section>
        <Container className="grid gap-10 md:grid-cols-2 md:items-start">
          <div>
            <PageIntro
              className="mb-0"
              title="Contact"
              description="Brief beats long. We reply within one business day."
            />
            <p className="mt-6">
              <a href={`mailto:${SUPPORT_EMAIL}`} className={textLinkClass}>
                {SUPPORT_EMAIL}
              </a>
            </p>
            <div className="mt-8 flex justify-center md:justify-start">
              <Image
                src={sealBox}
                alt="Seal Labs mascot"
                className="h-auto w-[75%] max-w-[15rem] object-contain sm:max-w-[18rem] md:max-w-[75%]"
                sizes="(max-width: 640px) 240px, (max-width: 768px) 288px, (max-width: 1024px) 315px, 360px"
                priority
              />
            </div>
          </div>

          <ContactForm />
        </Container>
      </Section>
    </MarketingShell>
  );
}
