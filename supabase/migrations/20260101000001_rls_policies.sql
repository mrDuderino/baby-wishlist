-- Row Level Security policies

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- profiles
CREATE POLICY "Admins can read own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (id = auth.uid());

CREATE POLICY "Admins can update own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- categories
CREATE POLICY "Public can read visible categories"
ON public.categories
FOR SELECT
TO anon, authenticated
USING (visible = TRUE OR public.is_admin());

CREATE POLICY "Admins manage categories"
ON public.categories
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- products
CREATE POLICY "Public can read visible products"
ON public.products
FOR SELECT
TO anon, authenticated
USING (
  (visible = TRUE AND status <> 'hidden')
  OR public.is_admin()
);

CREATE POLICY "Admins manage products"
ON public.products
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- reservations
CREATE POLICY "Guests can create reservations via RPC only"
ON public.reservations
FOR INSERT
TO anon, authenticated
WITH CHECK (FALSE);

CREATE POLICY "Admins manage reservations"
ON public.reservations
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- settings
CREATE POLICY "Public can read public settings"
ON public.settings
FOR SELECT
TO anon, authenticated
USING (is_public = TRUE OR public.is_admin());

CREATE POLICY "Admins manage settings"
ON public.settings
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- audit_logs
CREATE POLICY "Admins can read audit logs"
ON public.audit_logs
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admins can insert audit logs"
ON public.audit_logs
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());
