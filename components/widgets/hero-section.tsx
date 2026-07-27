"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { ScrollIndicator } from "@/components/shared/scroll-indicator";
import { WarmImagePlaceholder } from "@/components/shared/warm-image-placeholder";
import { buttonVariants } from "@/components/ui/button";
import type { HeroContent } from "@/lib/content/landing";
import { landingImages } from "@/lib/content/landing";
import { cn } from "@/lib/utils";

type HeroSectionProps = {
  content: HeroContent;
};

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <motion.div
          className="relative h-full w-full"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
        >
          {landingImages.hero ? (
            <Image
              src={landingImages.hero}
              alt="Мы вместе — будущие родители"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          ) : (
            <WarmImagePlaceholder
              variant="hero"
              label="Уютная детская комната в тёплых тонах"
              className="absolute inset-0"
            />
          )}
        </motion.div>
        <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-28 text-center lg:px-8">
        <motion.p
          className="text-sm font-medium tracking-[0.24em] text-white/80 uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Baby Wishlist
        </motion.p>

        <motion.h1
          className="font-heading mt-6 text-4xl leading-tight font-medium tracking-wide text-white sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {content.title}
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          {content.subtitle}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Link
            href="#wishlist"
            className={cn(buttonVariants({ size: "lg" }), "min-w-[220px]")}
          >
            Посмотреть вишлист
          </Link>
          <Link
            href="#about"
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "min-w-[220px] border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white",
            )}
          >
            Узнать больше
          </Link>
        </motion.div>

        <motion.p
          className="mt-8 text-sm text-white/75"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
        >
          {content.thankYouText}
        </motion.p>
      </div>

      <ScrollIndicator />
    </section>
  );
}
