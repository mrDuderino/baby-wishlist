import { notFound } from "next/navigation";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ReservationActions } from "@/components/admin/reservation-actions";
import { ReservationStatusBadge } from "@/components/admin/reservation-status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminReservation } from "@/lib/data/admin/reservations";
import { formatDateTime } from "@/lib/helpers/format";

type ReservationDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ReservationDetailPage({
  params,
}: ReservationDetailPageProps) {
  const { id } = await params;
  const reservation = await getAdminReservation(id);

  if (!reservation) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Reservation Details"
        description={reservation.product?.title ?? "Unknown product"}
        actions={
          <ReservationActions
            reservationId={reservation.id}
            status={reservation.status}
          />
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Guest</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>
              <span className="text-muted-foreground">Name:</span>{" "}
              {reservation.guest_name}
            </p>
            <p>
              <span className="text-muted-foreground">Telegram:</span>{" "}
              {reservation.telegram ?? "—"}
            </p>
            <p>
              <span className="text-muted-foreground">Phone:</span>{" "}
              {reservation.phone ?? "—"}
            </p>
            <p>
              <span className="text-muted-foreground">Comment:</span>{" "}
              {reservation.comment ?? "—"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reservation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="flex items-center gap-2">
              <span className="text-muted-foreground">Status:</span>
              <ReservationStatusBadge status={reservation.status} />
            </p>
            <p>
              <span className="text-muted-foreground">Created:</span>{" "}
              {formatDateTime(reservation.created_at)}
            </p>
            <p>
              <span className="text-muted-foreground">Expires:</span>{" "}
              {formatDateTime(reservation.expires_at)}
            </p>
            {reservation.ip_address ? (
              <p>
                <span className="text-muted-foreground">IP:</span>{" "}
                {reservation.ip_address}
              </p>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
