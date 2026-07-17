import type { StructuredData } from "@/lib/seo";

type JsonLdProps = {
  data: StructuredData | StructuredData[];
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
