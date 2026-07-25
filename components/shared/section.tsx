import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { Container } from "@/components/shared/container";
import { Eyebrow, Heading, MutedText } from "@/components/shared/typography";
import { cn } from "@/lib/utils";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  eyebrow?: string;
  title?: string;
  description?: string;
  action?: ReactNode;
};

export function Section({
  eyebrow,
  title,
  description,
  action,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn("py-16 md:py-24", className)} {...props}>
      <Container className="space-y-10">
        {(eyebrow || title || description || action) && (
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-4">
              {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
              {title ? <Heading level="h2">{title}</Heading> : null}
              {description ? <MutedText>{description}</MutedText> : null}
            </div>
            {action ? <div className="shrink-0">{action}</div> : null}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
