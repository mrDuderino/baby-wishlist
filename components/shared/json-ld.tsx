import { siteConfig } from "@/lib/site-config";

type JsonLdProps = {
  url: string;
};

export function LandingJsonLd({ url }: JsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        name: siteConfig.name,
        url,
        description: siteConfig.description,
        inLanguage: "ru-RU",
      },
      {
        "@type": "WebPage",
        "@id": `${url}/#webpage`,
        url,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: "ru-RU",
        isPartOf: { "@id": `${url}/#website` },
        about: {
          "@type": "Thing",
          name: "Baby Wishlist",
          description: siteConfig.description,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
