-- Progresso das ofertas por utilizador.
--
-- O offer_status vivia na tabela global das oportunidades, o que estava errado:
-- "a decorrer" ou "paga" é estado de uma pessoa, não da campanha. Passa para
-- saved_opportunities, onde a RLS já garante que cada utilizador só vê o seu.
--
-- O catálogo continua em TypeScript, por isso o vínculo é feito pelo offer_id
-- textual ("coinbase-recompensa"). O opportunity_id fica opcional para quando o
-- catálogo migrar para a base de dados.

ALTER TABLE public.opportunities
  DROP CONSTRAINT IF EXISTS opportunities_offer_status_values,
  DROP COLUMN IF EXISTS offer_status;

ALTER TABLE public.saved_opportunities
  ADD COLUMN IF NOT EXISTS offer_id text,
  ADD COLUMN IF NOT EXISTS steps integer[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS claimed_at timestamptz,
  ADD COLUMN IF NOT EXISTS paid_at timestamptz,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

ALTER TABLE public.saved_opportunities
  ALTER COLUMN opportunity_id DROP NOT NULL;

-- Uma linha por oferta e por pessoa: é o que permite gravar com upsert.
CREATE UNIQUE INDEX IF NOT EXISTS saved_opportunities_user_offer
  ON public.saved_opportunities (user_id, offer_id)
  WHERE offer_id IS NOT NULL;

-- Sem uma das duas referências a linha não diz a que oferta pertence.
ALTER TABLE public.saved_opportunities
  DROP CONSTRAINT IF EXISTS saved_opportunities_has_reference,
  ADD CONSTRAINT saved_opportunities_has_reference
    CHECK (offer_id IS NOT NULL OR opportunity_id IS NOT NULL);

-- Os passos são índices não negativos e sem repetições.
CREATE OR REPLACE FUNCTION public.steps_are_valid(_steps integer[])
RETURNS boolean LANGUAGE sql IMMUTABLE SET search_path = public AS $$
  SELECT _steps IS NOT NULL
     AND array_position(_steps, NULL) IS NULL
     AND NOT EXISTS (SELECT 1 FROM unnest(_steps) AS s WHERE s < 0)
     AND cardinality(_steps) = (SELECT count(DISTINCT s) FROM unnest(_steps) AS s)
$$;

ALTER TABLE public.saved_opportunities
  DROP CONSTRAINT IF EXISTS saved_opportunities_steps_shape,
  ADD CONSTRAINT saved_opportunities_steps_shape CHECK (public.steps_are_valid(steps));

DROP TRIGGER IF EXISTS saved_opportunities_updated_at ON public.saved_opportunities;
CREATE TRIGGER saved_opportunities_updated_at
  BEFORE UPDATE ON public.saved_opportunities
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
