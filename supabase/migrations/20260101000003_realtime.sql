-- Realtime publication for live updates

ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
ALTER PUBLICATION supabase_realtime ADD TABLE public.reservations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.settings;
