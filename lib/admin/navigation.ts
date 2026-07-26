import {
  ClipboardList,
  FolderOpen,
  ImageIcon,
  LayoutDashboard,
  Package,
  Settings,
  Shapes,
  UserRound,
  type LucideIcon,
} from "lucide-react";

export type AdminNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
};

export const adminNavItems: AdminNavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: Shapes },
  { href: "/admin/reservations", label: "Reservations", icon: ClipboardList },
  { href: "/admin/media", label: "Media Library", icon: ImageIcon },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
  { href: "/admin/audit-log", label: "Audit Log", icon: FolderOpen },
  { href: "/admin/profile", label: "Profile", icon: UserRound },
];
