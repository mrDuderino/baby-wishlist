import Link from "next/link";

import { Container } from "@/components/shared/container";
import type { FooterContent, SocialLinks } from "@/lib/content/landing";
import { siteConfig } from "@/lib/site-config";

type SiteFooterProps = {
  content: FooterContent;
  social: SocialLinks;
};

export function SiteFooter({ content, social }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border/80 border-t py-20 md:py-28">
      <Container className="space-y-10 text-center">
        <div className="mx-auto max-w-2xl space-y-4">
          <p className="font-heading text-foreground text-2xl leading-relaxed font-medium sm:text-3xl">
            {content.text}
          </p>
          <p className="text-muted-foreground text-base">
            {content.thankYouText}
          </p>
        </div>

        {(social.telegram || social.whatsapp) && (
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            {social.telegram ? (
              <Link
                href={social.telegram}
                className="text-primary hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Telegram
              </Link>
            ) : null}
            {social.whatsapp ? (
              <Link
                href={social.whatsapp}
                className="text-primary hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </Link>
            ) : null}
          </div>
        )}

        <div className="text-muted-foreground space-y-2 text-sm">
          <p>Made with ❤️</p>
          <p>
            © {year} {siteConfig.name}
          </p>
        </div>
      </Container>
    </footer>
  );
}
