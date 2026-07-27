"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { Section } from "@/components/shared/section";
import { WarmImagePlaceholder } from "@/components/shared/warm-image-placeholder";
import type { AboutContent } from "@/lib/content/landing";
import { landingImages } from "@/lib/content/landing";

type AboutSectionProps = {
  content: AboutContent;
};

export function AboutSection({ content }: AboutSectionProps) {
  return (
    <Section id="about" title={content.title}>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          className="rounded-card shadow-soft relative aspect-[4/5] overflow-hidden"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          {landingImages.about ? (
            <Image
              src={landingImages.about}
              alt="Тёплые детали для будущей комнаты малышки"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <WarmImagePlaceholder
              variant="about"
              label="Тёплые детали для будущей комнаты малышки"
              className="absolute inset-0"
            />
          )}
        </motion.div>

        <motion.div
          className="space-y-5"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {content.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-muted-foreground text-base leading-relaxed sm:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
