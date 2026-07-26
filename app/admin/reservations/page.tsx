import Link from "next/link";
import { ClipboardListIcon } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ReservationStatusBadge } from "@/components/admin/reservation-status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAdminReservations } from "@/lib/data/admin/reservations";
import { strings } from "@/lib/strings/ru";
import { formatDateTime } from "@/lib/helpers/format";
import { cn } from "@/lib/utils";

export default async function AdminReservationsPage() {
  const reservations = await getAdminReservations();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Reservations"
        description="Review guest reservations and update their status."
      />

      {reservations.length === 0 ? (
        <EmptyState
          title="Пока нет бронирований"
          description={strings.empty.reservations}
          actionLabel="Open Website"
          actionHref="/"
          icon={<ClipboardListIcon className="size-5" aria-hidden="true" />}
        />
      ) : (
        <div className="rounded-card border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Guest</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell className="font-medium">
                    {reservation.guest_name}
                  </TableCell>
                  <TableCell>
                    {reservation.telegram || reservation.phone || "—"}
                  </TableCell>
                  <TableCell>
                    {reservation.product?.title ?? "Unknown product"}
                  </TableCell>
                  <TableCell>
                    <ReservationStatusBadge status={reservation.status} />
                  </TableCell>
                  <TableCell>
                    {formatDateTime(reservation.created_at)}
                  </TableCell>
                  <TableCell>
                    {formatDateTime(reservation.expires_at)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link
                      href={`/admin/reservations/${reservation.id}`}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "sm" }),
                      )}
                    >
                      Open
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
