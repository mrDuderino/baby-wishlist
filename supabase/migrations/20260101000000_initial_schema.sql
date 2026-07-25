-- Initial schema for Baby Wishlist

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------

CREATE TYPE product_status AS ENUM ('available', 'reserved', 'purchased', 'hidden');
CREATE TYPE reservation_status AS ENUM ('pending', 'confirmed', 'cancelled', 'purchased');

-- ---------------------------------------------------------------------------
-- Utility functions
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- ---------------------------------------------------------------------------
-- profiles (admin users)
-- ---------------------------------------------------------------------------

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid()
  );
$$;

-- ---------------------------------------------------------------------------
-- categories
-- ---------------------------------------------------------------------------

CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  emoji TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  visible BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX categories_sort_order_idx ON public.categories (sort_order);
CREATE INDEX categories_visible_idx ON public.categories (visible);

CREATE TRIGGER categories_updated_at
BEFORE UPDATE ON public.categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- ---------------------------------------------------------------------------
-- reservations
-- ---------------------------------------------------------------------------

CREATE TABLE public.reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL,
  guest_name TEXT NOT NULL,
  telegram TEXT,
  phone TEXT,
  comment TEXT,
  status reservation_status NOT NULL DEFAULT 'pending',
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '72 hours'),
  confirmed_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  purchased_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT,
  CONSTRAINT reservations_guest_name_not_blank CHECK (char_length(trim(guest_name)) > 0),
  CONSTRAINT reservations_contact_required CHECK (
    (telegram IS NOT NULL AND char_length(trim(telegram)) > 0)
    OR (phone IS NOT NULL AND char_length(trim(phone)) > 0)
  ),
  CONSTRAINT reservations_comment_length CHECK (
    comment IS NULL OR char_length(comment) <= 500
  )
);

CREATE INDEX reservations_product_id_idx ON public.reservations (product_id);
CREATE INDEX reservations_status_idx ON public.reservations (status);
CREATE INDEX reservations_expires_at_idx ON public.reservations (expires_at);
CREATE INDEX reservations_created_at_idx ON public.reservations (created_at DESC);

CREATE TRIGGER reservations_updated_at
BEFORE UPDATE ON public.reservations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- ---------------------------------------------------------------------------
-- products
-- ---------------------------------------------------------------------------

CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES public.categories (id) ON DELETE RESTRICT,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  reason_selected TEXT NOT NULL DEFAULT '',
  price NUMERIC(12, 2),
  currency TEXT NOT NULL DEFAULT 'RUB',
  status product_status NOT NULL DEFAULT 'available',
  priority INTEGER NOT NULL DEFAULT 0,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  visible BOOLEAN NOT NULL DEFAULT TRUE,
  cover_image TEXT,
  gallery JSONB NOT NULL DEFAULT '[]'::JSONB,
  marketplace_links JSONB NOT NULL DEFAULT '[]'::JSONB,
  reservation_id UUID REFERENCES public.reservations (id) ON DELETE SET NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT products_title_not_blank CHECK (char_length(trim(title)) > 0),
  CONSTRAINT products_slug_not_blank CHECK (char_length(trim(slug)) > 0)
);

ALTER TABLE public.reservations
ADD CONSTRAINT reservations_product_id_fkey
FOREIGN KEY (product_id) REFERENCES public.products (id) ON DELETE CASCADE;

CREATE INDEX products_category_id_idx ON public.products (category_id);
CREATE INDEX products_status_idx ON public.products (status);
CREATE INDEX products_visible_idx ON public.products (visible);
CREATE INDEX products_sort_order_idx ON public.products (sort_order);
CREATE INDEX products_featured_idx ON public.products (featured);
CREATE INDEX products_slug_idx ON public.products (slug);

CREATE TRIGGER products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- ---------------------------------------------------------------------------
-- settings
-- ---------------------------------------------------------------------------

CREATE TABLE public.settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}'::JSONB,
  is_public BOOLEAN NOT NULL DEFAULT FALSE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER settings_updated_at
BEFORE UPDATE ON public.settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- ---------------------------------------------------------------------------
-- audit_logs
-- ---------------------------------------------------------------------------

CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES public.profiles (id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity TEXT NOT NULL,
  entity_id UUID,
  old_value JSONB,
  new_value JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX audit_logs_admin_id_idx ON public.audit_logs (admin_id);
CREATE INDEX audit_logs_entity_idx ON public.audit_logs (entity, entity_id);
CREATE INDEX audit_logs_created_at_idx ON public.audit_logs (created_at DESC);

-- ---------------------------------------------------------------------------
-- Reservation workflow functions
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.create_reservation(
  p_product_id UUID,
  p_guest_name TEXT,
  p_telegram TEXT DEFAULT NULL,
  p_phone TEXT DEFAULT NULL,
  p_comment TEXT DEFAULT NULL,
  p_ip_address TEXT DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_product public.products%ROWTYPE;
  v_reservation_id UUID;
BEGIN
  SELECT *
  INTO v_product
  FROM public.products
  WHERE id = p_product_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'PRODUCT_NOT_FOUND'
      USING ERRCODE = 'P0002';
  END IF;

  IF v_product.status <> 'available' OR v_product.visible IS NOT TRUE THEN
    RAISE EXCEPTION 'PRODUCT_NOT_AVAILABLE'
      USING ERRCODE = 'P0001';
  END IF;

  IF char_length(trim(p_guest_name)) = 0 THEN
    RAISE EXCEPTION 'GUEST_NAME_REQUIRED'
      USING ERRCODE = 'P0001';
  END IF;

  IF (
    p_telegram IS NULL OR char_length(trim(p_telegram)) = 0
  ) AND (
    p_phone IS NULL OR char_length(trim(p_phone)) = 0
  ) THEN
    RAISE EXCEPTION 'CONTACT_REQUIRED'
      USING ERRCODE = 'P0001';
  END IF;

  IF p_comment IS NOT NULL AND char_length(p_comment) > 500 THEN
    RAISE EXCEPTION 'COMMENT_TOO_LONG'
      USING ERRCODE = 'P0001';
  END IF;

  INSERT INTO public.reservations (
    product_id,
    guest_name,
    telegram,
    phone,
    comment,
    status,
    expires_at,
    ip_address,
    user_agent
  )
  VALUES (
    p_product_id,
    trim(p_guest_name),
    NULLIF(trim(p_telegram), ''),
    NULLIF(trim(p_phone), ''),
    NULLIF(trim(p_comment), ''),
    'pending',
    NOW() + INTERVAL '72 hours',
    p_ip_address,
    p_user_agent
  )
  RETURNING id INTO v_reservation_id;

  UPDATE public.products
  SET
    status = 'reserved',
    reservation_id = v_reservation_id
  WHERE id = p_product_id;

  RETURN v_reservation_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.expire_pending_reservations()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_expired RECORD;
  v_count INTEGER := 0;
BEGIN
  FOR v_expired IN
    SELECT id, product_id
    FROM public.reservations
    WHERE status = 'pending'
      AND expires_at < NOW()
    FOR UPDATE
  LOOP
    UPDATE public.reservations
    SET
      status = 'cancelled',
      cancelled_at = NOW()
    WHERE id = v_expired.id;

    UPDATE public.products
    SET
      status = 'available',
      reservation_id = NULL
    WHERE id = v_expired.product_id
      AND reservation_id = v_expired.id;

    v_count := v_count + 1;
  END LOOP;

  RETURN v_count;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'name', NEW.email),
    NEW.raw_user_meta_data ->> 'avatar_url'
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    name = EXCLUDED.name,
    avatar_url = EXCLUDED.avatar_url;

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

GRANT EXECUTE ON FUNCTION public.create_reservation(
  UUID, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT
) TO anon, authenticated;

GRANT EXECUTE ON FUNCTION public.expire_pending_reservations() TO service_role;
