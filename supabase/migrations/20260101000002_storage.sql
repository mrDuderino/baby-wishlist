-- Storage bucket for wishlist media

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'wishlist',
  'wishlist',
  TRUE,
  10485760,
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif']
)
ON CONFLICT (id) DO UPDATE
SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

CREATE POLICY "Public read wishlist images"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'wishlist');

CREATE POLICY "Admins upload wishlist images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'wishlist'
  AND public.is_admin()
);

CREATE POLICY "Admins update wishlist images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'wishlist'
  AND public.is_admin()
)
WITH CHECK (
  bucket_id = 'wishlist'
  AND public.is_admin()
);

CREATE POLICY "Admins delete wishlist images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'wishlist'
  AND public.is_admin()
);
