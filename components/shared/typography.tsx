import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/utils";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";

const headingStyles: Record<HeadingLevel, string> = {
  h1: "text-4xl sm:text-5xl lg:text-6xl leading-tight",
  h2: "text-3xl sm:text-4xl leading-tight",
  h3: "text-2xl sm:text-3xl leading-snug",
  h4: "text-xl sm:text-2xl leading-snug",
};

type HeadingProps<T extends ElementType> = {
  as?: T;
  level?: HeadingLevel;
} & ComponentPropsWithoutRef<T>;

export function Heading<T extends ElementType = "h2">({
  as,
  level = "h2",
  className,
  ...props
}: HeadingProps<T>) {
  const Component = as ?? level;

  return (
    <Component
      className={cn(
        "font-heading text-foreground font-medium tracking-wide",
        headingStyles[level],
        className,
      )}
      {...props}
    />
  );
}

export function Eyebrow({
  className,
  ...props
}: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn(
        "text-primary text-sm font-medium tracking-[0.2em] uppercase",
        className,
      )}
      {...props}
    />
  );
}

export function Text({ className, ...props }: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn("text-foreground text-base leading-relaxed", className)}
      {...props}
    />
  );
}

export function MutedText({
  className,
  ...props
}: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn("text-muted-foreground text-sm leading-relaxed", className)}
      {...props}
    />
  );
}
