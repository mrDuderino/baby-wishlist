"use client";

import { motion } from "framer-motion";

import { AnimatedCounter } from "@/components/shared/animated-counter";
import { Section } from "@/components/shared/section";
import { useWishlist } from "@/components/providers/wishlist-provider";
import { formatCountdownDays } from "@/lib/helpers/format";
import { cn } from "@/lib/utils";

type StatisticsSectionProps = {
  countdownDate: string;
};

function StatCard({
  label,
  value,
  delay,
}: {
  label: string;
  value: number;
  delay: number;
}) {
  return (
    <motion.div
      className="rounded-card border-border/80 bg-card shadow-soft border p-6"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay }}
    >
      <p className="font-heading text-foreground text-4xl font-medium">
        <AnimatedCounter value={value} />
      </p>
      <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
        {label}
      </p>
    </motion.div>
  );
}

export function StatisticsSection({ countdownDate }: StatisticsSectionProps) {
  const { stats } = useWishlist();
  const gifted = stats.reserved + stats.purchased;
  const progress =
    stats.total > 0 ? Math.round((gifted / stats.total) * 100) : 0;
  const daysLeft = formatCountdownDays(countdownDate);

  return (
    <Section
      id="statistics"
      eyebrow="Статистика"
      title="Наш путь к встрече"
      description="Небольшая статистика, чтобы было видно, как продвигается подготовка."
      className="bg-muted/30"
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="подарков уже нашли своих дарителей"
          value={gifted}
          delay={0}
        />
        <StatCard label="подарка всего" value={stats.total} delay={0.1} />
        <StatCard label="ещё доступны" value={stats.available} delay={0.2} />
        <motion.div
          className="rounded-card border-border/80 bg-card shadow-soft border p-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-muted-foreground text-sm">До встречи осталось</p>
          <p className="font-heading text-foreground mt-2 text-4xl font-medium">
            <AnimatedCounter value={daysLeft} />{" "}
            <span className="text-2xl">дней</span>
          </p>
        </motion.div>
      </div>

      <motion.div
        className="mt-10 space-y-3"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.35 }}
      >
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Прогресс вишлиста</span>
          <span className="font-medium">{progress}%</span>
        </div>
        <div className="bg-muted h-2 overflow-hidden rounded-full">
          <motion.div
            className={cn("bg-primary h-full rounded-full")}
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          />
        </div>
      </motion.div>
    </Section>
  );
}
