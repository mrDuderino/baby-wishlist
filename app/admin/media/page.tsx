import Image from "next/image";
import { ImageIcon } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { MediaUploadForm } from "@/components/admin/media-upload-form";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  listMediaFiles,
  deleteMediaFormAction,
} from "@/lib/admin/actions/media";

export default async function AdminMediaPage() {
  const files = await listMediaFiles();

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Media Library"
        description="Upload images to Supabase Storage and reuse their URLs in products."
      />

      <Card>
        <CardHeader>
          <CardTitle>Upload</CardTitle>
        </CardHeader>
        <CardContent>
          <MediaUploadForm />
        </CardContent>
      </Card>

      {files.length === 0 ? (
        <EmptyState
          title="Media library is empty"
          description="Upload the first image to start building your gallery."
          icon={<ImageIcon className="size-5" aria-hidden="true" />}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {files.map((file) => (
            <Card key={file.path} className="overflow-hidden">
              <div className="bg-muted relative aspect-[4/3]">
                <Image
                  src={file.url}
                  alt={file.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  unoptimized
                />
              </div>
              <CardContent className="space-y-3 pt-4">
                <p className="truncate text-sm font-medium">{file.name}</p>
                <p className="text-muted-foreground text-xs break-all">
                  {file.url}
                </p>
                <form action={deleteMediaFormAction.bind(null, file.path)}>
                  <Button type="submit" size="sm" variant="destructive">
                    Delete
                  </Button>
                </form>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
