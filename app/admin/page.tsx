import Link from "next/link";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ReservationStatusBadge } from "@/components/admin/reservation-status-badge";
import { StatCard } from "@/components/admin/stat-card";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getDashboardStats,
  getLatestReservations,
} from "@/lib/data/admin/dashboard";
import { formatCountdownDays, formatDateTime } from "@/lib/helpers/format";
import { landingDefaults } from "@/lib/content/landing";
import { cn } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const [stats, latestReservations] = await Promise.all([
    getDashboardStats(),
    getLatestReservations(),
  ]);

  const countdownDays = formatCountdownDays(landingDefaults.countdownDate);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Dashboard"
        description="Overview of products, reservations, and recent activity."
        actions={
          <>
            <Link href="/admin/products/new" className={cn(buttonVariants())}>
              Add Product
            </Link>
            <Link
              href="/"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Open Website
            </Link>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard title="Total Products" value={stats.totalProducts} />
        <StatCard title="Available" value={stats.availableProducts} />
        <StatCard title="Reserved" value={stats.reservedProducts} />
        <StatCard title="Purchased" value={stats.purchasedProducts} />
        <StatCard
          title="Pending Reservations"
          value={stats.pendingReservations}
        />
        <StatCard
          title="Countdown"
          value={`${countdownDays} days`}
          hint="Until due date"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Latest Reservations</CardTitle>
        </CardHeader>
        <CardContent>
          {latestReservations.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No reservations yet.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Guest</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {latestReservations.map((reservation) => (
                  <TableRow key={reservation.id}>
                    <TableCell>{reservation.guest_name}</TableCell>
                    <TableCell>
                      {reservation.product?.title ?? "Unknown product"}
                    </TableCell>
                    <TableCell>
                      <ReservationStatusBadge status={reservation.status} />
                    </TableCell>
                    <TableCell>
                      {formatDateTime(reservation.created_at)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
