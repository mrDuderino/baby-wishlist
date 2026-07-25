import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  as?: "div" | "section" | "main";
};

export function Container({
  as: Component = "div",
  className,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn("mx-auto w-full max-w-[1200px] px-6 lg:px-8", className)}
      {...props}
    />
  );
}
