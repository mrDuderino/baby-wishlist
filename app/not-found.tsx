import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-muted-foreground text-sm tracking-[0.2em] uppercase">
        404
      </p>
      <h1 className="font-heading text-foreground text-4xl font-medium">
        Страница не найдена
      </h1>
      <p className="text-muted-foreground text-sm leading-relaxed">
        Кажется, этой страницы нет. Вернитесь на главную и продолжите с
        вишлиста.
      </p>
      <Link href="/" className={cn(buttonVariants({ size: "lg" }))}>
        На главную
      </Link>
    </main>
  );
}
