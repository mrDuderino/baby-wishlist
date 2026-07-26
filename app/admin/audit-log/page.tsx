import { FolderOpenIcon } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { EmptyState } from "@/components/shared/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAdminAuditLogs } from "@/lib/data/admin/audit-log";
import { formatDateTime } from "@/lib/helpers/format";

export default async function AdminAuditLogPage() {
  const logs = await getAdminAuditLogs();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Audit Log"
        description="Track important admin actions across the system."
      />

      {logs.length === 0 ? (
        <EmptyState
          title="No activity yet"
          description="Admin actions will appear here as you manage the wishlist."
          icon={<FolderOpenIcon className="size-5" aria-hidden="true" />}
        />
      ) : (
        <div className="rounded-card border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Admin</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Entity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{formatDateTime(log.created_at)}</TableCell>
                  <TableCell>
                    {log.admin?.name ?? log.admin?.email ?? "System"}
                  </TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>
                    {log.entity}
                    {log.entity_id ? ` · ${log.entity_id.slice(0, 8)}…` : ""}
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
