import { createClient } from "@/lib/supabase/server";
import type { AuditLog } from "@/types/database";

export type AuditLogWithAdmin = AuditLog & {
  admin: {
    id: string;
    name: string | null;
    email: string;
  } | null;
};

export async function getAdminAuditLogs(
  limit = 100,
): Promise<AuditLogWithAdmin[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("audit_logs")
    .select(
      `
      *,
      admin:profiles (
        id,
        name,
        email
      )
    `,
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error("Failed to load audit logs.");
  }

  return (data ?? []) as AuditLogWithAdmin[];
}
