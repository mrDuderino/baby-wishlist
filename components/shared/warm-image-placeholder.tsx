import { cn } from "@/lib/utils";

type WarmImagePlaceholderProps = {
  variant?: "hero" | "about" | "product";
  label?: string;
  className?: string;
};

const variantStyles = {
  hero: "from-[#E8DDD1] via-[#D4C4B5] to-[#B79E8B]",
  about: "from-[#D9CFC3] via-[#C8B6A6] to-[#A9B7A2]",
  product: "from-[#EDE6DE] via-[#E0D5CA] to-[#D4C4B5]",
} as const;

export function WarmImagePlaceholder({
  variant = "product",
  label,
  className,
}: WarmImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-br",
        variantStyles[variant],
        className,
      )}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(250,248,245,0.55),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(169,183,162,0.25),transparent_45%)]" />
      <div className="absolute top-[18%] left-[12%] size-24 rounded-full bg-white/15 blur-2xl" />
      <div className="absolute right-[10%] bottom-[16%] size-32 rounded-full bg-[#B79E8B]/20 blur-3xl" />

      {variant === "product" ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl opacity-35 select-none" aria-hidden="true">
            🎁
          </span>
        </div>
      ) : null}
    </div>
  );
}
