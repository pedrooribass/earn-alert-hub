ALTER TABLE public.opportunities
  ADD COLUMN IF NOT EXISTS category_key text NOT NULL DEFAULT 'conta',
  ADD COLUMN IF NOT EXISTS offer_status text NOT NULL DEFAULT 'nova';

ALTER TABLE public.opportunities
  ADD CONSTRAINT opportunities_category_key_values CHECK (category_key IN ('deposito', 'cashback', 'conta', 'crypto', 'questionario')),
  ADD CONSTRAINT opportunities_offer_status_values CHECK (offer_status IN ('nova', 'guardada', 'a_decorrer', 'em_validacao', 'paga', 'expirada'));