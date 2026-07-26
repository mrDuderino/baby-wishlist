import { Badge } from "@/components/ui/badge";
import type { ReservationStatus } from "@/types/database";

const labels: Record<ReservationStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  cancelled: "Cancelled",
  purchased: "Purchased",
};

const variants: Record<
  ReservationStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  pending: "secondary",
  confirmed: "default",
  cancelled: "destructive",
  purchased: "outline",
};

export function ReservationStatusBadge({
  status,
}: {
  status: ReservationStatus;
}) {
  return <Badge variant={variants[status]}>{labels[status]}</Badge>;
}
