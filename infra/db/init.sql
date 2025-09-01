CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE SCHEMA IF NOT EXISTS public;

CREATE TABLE IF NOT EXISTS public.products (
  id SERIAL PRIMARY KEY,
  article TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price INT NOT NULL,
  discounted_price INT,
  photo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO public.products (article, name, price, discounted_price, description) VALUES
  ('SKU-001', 'Green Tea 100g', 400, 390, 'Cool Green Tea'),
  ('SKU-002', 'Black Tea 100g', 400, 390, 'Cool Black Tea'),
  ('SKU-003', 'Yellow Tea 100g', 400, 390, 'Cool Yellow Tea'),
  ('SKU-004', 'White Tea 100g', 400, 390, 'Cool White Tea'),
  ('SKU-005', 'Red Tea 100g', 400, 390, 'Cool Red Tea'),
  ('SKU-006', 'Blue Tea 100g', 400, 390, 'Cool Blue Tea')
ON CONFLICT (article) DO NOTHING;