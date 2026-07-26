"use client";

import { motion } from "framer-motion";

import { Section } from "@/components/shared/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqItem } from "@/lib/content/landing";

type FaqSectionProps = {
  items: FaqItem[];
};

export function FaqSection({ items }: FaqSectionProps) {
  return (
    <Section
      id="faq"
      eyebrow="FAQ"
      title="Частые вопросы"
      description="Коротко ответили на то, что чаще всего спрашивают друзья и близкие."
      className="bg-muted/20"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <Accordion className="rounded-card border-border/80 bg-card shadow-soft border px-6">
          {items.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger className="font-heading py-5 text-lg hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 text-base leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </Section>
  );
}
