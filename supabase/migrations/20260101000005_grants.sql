-- Table privileges for Supabase API roles (required alongside RLS policies)

GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

GRANT SELECT ON public.categories TO anon, authenticated;
GRANT SELECT ON public.products TO anon, authenticated;
GRANT SELECT ON public.settings TO anon, authenticated;

GRANT ALL ON public.categories TO authenticated;
GRANT ALL ON public.products TO authenticated;
GRANT ALL ON public.settings TO authenticated;
GRANT ALL ON public.reservations TO authenticated;
GRANT ALL ON public.audit_logs TO authenticated;
GRANT SELECT, UPDATE ON public.profiles TO authenticated;

GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT ALL ON TABLES TO service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT ALL ON SEQUENCES TO service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT ALL ON ROUTINES TO service_role;
