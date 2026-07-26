import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { SiteSettingsForm } from "@/components/admin/site-settings-form";
import { Card, CardContent } from "@/components/ui/card";
import { getAdminSettings } from "@/lib/data/admin/settings";
import type { SiteSettingsFormValues } from "@/lib/validation/admin";

function parseSettings(settings: Awaited<ReturnType<typeof getAdminSettings>>) {
  const map = new Map(settings.map((item) => [item.key, item.value]));

  const hero = map.get("hero") as
    { title?: string; subtitle?: string } | undefined;
  const about = map.get("about") as { text?: string } | undefined;
  const footer = map.get("footer") as { text?: string } | undefined;
  const countdown = map.get("countdown") as { date?: string } | undefined;
  const social = map.get("social") as
    { telegram?: string; whatsapp?: string } | undefined;

  return {
    heroTitle: hero?.title ?? "",
    heroSubtitle: hero?.subtitle ?? "",
    aboutText: about?.text ?? "",
    footerText: footer?.text ?? "",
    countdownDate: countdown?.date ?? "",
    telegramUrl: social?.telegram ?? "",
    whatsappUrl: social?.whatsapp ?? "",
  } satisfies SiteSettingsFormValues;
}

export default async function AdminSettingsPage() {
  const settings = await getAdminSettings();
  const values = parseSettings(settings);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Site Settings"
        description="Edit landing page content and social links."
      />

      <Card>
        <CardContent className="pt-6">
          <SiteSettingsForm values={values} />
        </CardContent>
      </Card>
    </div>
  );
}
