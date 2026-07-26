import type { LandingContent } from "@/lib/content/landing";
import type { Category, Product } from "@/types/database";
import { WishlistProvider } from "@/components/providers/wishlist-provider";
import { AboutSection } from "@/components/widgets/about-section";
import { FaqSection } from "@/components/widgets/faq-section";
import { HeroSection } from "@/components/widgets/hero-section";
import { SiteFooter } from "@/components/widgets/site-footer";
import { SiteHeader } from "@/components/widgets/site-header";
import { StatisticsSection } from "@/components/widgets/statistics-section";
import { WishlistSection } from "@/components/widgets/wishlist-section";

type LandingPageProps = {
  content: LandingContent;
  categories: Category[];
  products: Product[];
};

export function LandingPage({
  content,
  categories,
  products,
}: LandingPageProps) {
  return (
    <>
      <SiteHeader />
      <WishlistProvider
        initialCategories={categories}
        initialProducts={products}
      >
        <main id="main-content">
          <HeroSection content={content.hero} />
          <AboutSection content={content.about} />
          <StatisticsSection countdownDate={content.countdownDate} />
          <WishlistSection />
          <FaqSection items={content.faq} />
        </main>
      </WishlistProvider>
      <SiteFooter content={content.footer} social={content.social} />
    </>
  );
}
