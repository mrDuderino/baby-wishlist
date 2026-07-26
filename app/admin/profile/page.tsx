import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ProfileForm } from "@/components/admin/profile-form";
import { Card, CardContent } from "@/components/ui/card";
import { requireAdminSession } from "@/lib/admin/session";

export default async function AdminProfilePage() {
  const session = await requireAdminSession();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Profile"
        description="Manage your admin account details."
      />

      <Card>
        <CardContent className="pt-6">
          <ProfileForm
            name={session.profile.name ?? ""}
            email={session.profile.email}
          />
        </CardContent>
      </Card>
    </div>
  );
}
