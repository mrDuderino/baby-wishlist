"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";

import { adminNavItems } from "@/lib/admin/navigation";
import { logoutAction } from "@/lib/admin/actions/auth";
import { SkipLink } from "@/components/shared/skip-link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { Profile } from "@/types/database";

type AdminShellProps = {
  profile: Profile;
  children: React.ReactNode;
};

function NavLinks({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="space-y-1">
      {adminNavItems.map((item) => {
        const isActive = item.exact
          ? pathname === item.href
          : pathname === item.href || pathname.startsWith(`${item.href}/`);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "rounded-input flex items-center gap-3 px-3 py-2.5 text-sm transition-colors",
              isActive
                ? "bg-primary/10 text-foreground font-medium"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon className="size-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminShell({ profile, children }: AdminShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="bg-background min-h-screen lg:flex">
      <SkipLink />
      <aside className="border-border/70 hidden w-64 shrink-0 border-r lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col">
        <div className="border-border/70 border-b px-6 py-5">
          <Link href="/admin" className="font-heading text-2xl font-medium">
            Admin
          </Link>
          <p className="text-muted-foreground mt-1 text-xs">Baby Wishlist</p>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <NavLinks pathname={pathname} />
        </div>

        <div className="border-border/70 space-y-3 border-t px-4 py-4">
          <div className="px-3">
            <p className="text-sm font-medium">{profile.name ?? "Admin"}</p>
            <p className="text-muted-foreground truncate text-xs">
              {profile.email}
            </p>
          </div>
          <form action={logoutAction}>
            <Button
              variant="ghost"
              className="w-full justify-start"
              type="submit"
            >
              Logout
            </Button>
          </form>
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "outline" }), "w-full")}
          >
            Open Website
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-border/70 flex items-center justify-between border-b px-4 py-4 lg:hidden">
          <div>
            <p className="font-heading text-xl font-medium">Admin</p>
            <p className="text-muted-foreground text-xs">{profile.email}</p>
          </div>
          <Button
            variant="outline"
            size="icon"
            aria-label="Open navigation"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="size-4" />
          </Button>
        </header>

        <main id="main-content" className="flex-1 px-4 py-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>

      <Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Navigation</DialogTitle>
          </DialogHeader>
          <NavLinks
            pathname={pathname}
            onNavigate={() => setMobileOpen(false)}
          />
          <form action={logoutAction}>
            <Button
              variant="ghost"
              className="w-full justify-start"
              type="submit"
            >
              Logout
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
