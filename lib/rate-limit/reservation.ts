import { getServerEnv } from "@/lib/env";
import { createAdminClient } from "@/lib/supabase/admin";

const MAX_RESERVATIONS_PER_HOUR = 5;
const WINDOW_MS = 60 * 60 * 1000;

function canUseAdminClient() {
  return Boolean(getServerEnv().SUPABASE_SERVICE_ROLE_KEY);
}

export async function isReservationRateLimited(
  ipAddress: string,
): Promise<boolean> {
  if (ipAddress === "unknown" || !canUseAdminClient()) {
    return false;
  }

  const since = new Date(Date.now() - WINDOW_MS).toISOString();

  try {
    const admin = createAdminClient();
    const { count, error } = await admin
      .from("reservations")
      .select("*", { count: "exact", head: true })
      .eq("ip_address", ipAddress)
      .gte("created_at", since);

    if (error) {
      return false;
    }

    return (count ?? 0) >= MAX_RESERVATIONS_PER_HOUR;
  } catch {
    return false;
  }
}
