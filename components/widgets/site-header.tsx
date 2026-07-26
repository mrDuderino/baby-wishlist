"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { navigationItems } from "@/lib/content/landing";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "border-border/80 bg-background/90 shadow-soft backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6 lg:h-20 lg:px-8">
        <Link
          href="#home"
          className={cn(
            "font-heading text-xl font-medium tracking-wide transition-colors md:text-2xl",
            isScrolled ? "text-foreground" : "text-white",
          )}
        >
          {siteConfig.name}
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Основная навигация"
        >
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:opacity-80",
                isScrolled ? "text-foreground" : "text-white/90",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className={cn(
            "inline-flex size-10 items-center justify-center rounded-full border md:hidden",
            isScrolled
              ? "border-border text-foreground"
              : "border-white/30 text-white",
          )}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="sr-only">Меню</span>
          <span className="flex flex-col gap-1.5">
            <span
              className={cn(
                "block h-0.5 w-5 transition-transform",
                isScrolled ? "bg-foreground" : "bg-white",
                isMenuOpen && "translate-y-2 rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-5 transition-opacity",
                isScrolled ? "bg-foreground" : "bg-white",
                isMenuOpen && "opacity-0",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-5 transition-transform",
                isScrolled ? "bg-foreground" : "bg-white",
                isMenuOpen && "-translate-y-2 -rotate-45",
              )}
            />
          </span>
        </button>
      </div>

      {isMenuOpen ? (
        <nav
          id="mobile-navigation"
          className="border-border/80 bg-background/95 border-t backdrop-blur-md md:hidden"
          aria-label="Мобильная навигация"
        >
          <div className="mx-auto flex max-w-[1200px] flex-col gap-1 px-6 py-4">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-input hover:bg-muted px-3 py-3 text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
