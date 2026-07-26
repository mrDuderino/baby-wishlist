import type { LandingContent } from "@/lib/content/landing";
import type { Category, Product } from "@/types/database";
import { AboutSection } from "@/components/widgets/about-section";
import { FaqSection } from "@/components/widgets/faq-section";
import { HeroSection } from "@/components/widgets/hero-section";
import { SiteFooter } from "@/components/widgets/site-footer";
import { SiteHeader } from "@/components/widgets/site-header";
import { StatisticsSection } from "@/components/widgets/statistics-section";

type LandingPageProps = {
  content: LandingContent;
  categories: Category[];
  products: Product[];
};

export function LandingPage({ content }: LandingPageProps) {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <HeroSection content={content.hero} />
        <AboutSection content={content.about} />
        <StatisticsSection countdownDate={content.countdownDate} />
        <FaqSection items={content.faq} />
      </main>
      <SiteFooter content={content.footer} social={content.social} />
    </>
  );
}
