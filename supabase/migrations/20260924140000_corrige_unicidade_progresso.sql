-- Correção: o índice único parcial criado na migração anterior não serve para
-- o upsert.
--
-- O Postgres só infere um índice parcial num ON CONFLICT se a instrução repetir
-- a mesma cláusula WHERE, e o PostgREST não a envia quando se usa onConflict.
-- Resultado: a gravação do progresso era rejeitada.
--
-- Uma UNIQUE constraint normal resolve. As linhas antigas, sem offer_id, não
-- colidem entre si porque em UNIQUE os nulos contam como distintos.

DROP INDEX IF EXISTS public.saved_opportunities_user_offer;

ALTER TABLE public.saved_opportunities
  DROP CONSTRAINT IF EXISTS saved_opportunities_user_offer_key,
  ADD CONSTRAINT saved_opportunities_user_offer_key UNIQUE (user_id, offer_id);
