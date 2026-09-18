ALTER TABLE public.opportunities
  ADD COLUMN IF NOT EXISTS brand_logo text,
  ADD COLUMN IF NOT EXISTS reward jsonb NOT NULL DEFAULT '{"min":0}'::jsonb,
  ADD COLUMN IF NOT EXISTS capital_required jsonb NOT NULL DEFAULT '{"kind":"unknown"}'::jsonb,
  ADD COLUMN IF NOT EXISTS payout jsonb NOT NULL DEFAULT '{"estimateDays":0,"conditions":"[PREENCHER: prazo em dias]"}'::jsonb,
  ADD COLUMN IF NOT EXISTS effort text NOT NULL DEFAULT 'facil',
  ADD COLUMN IF NOT EXISTS time_to_complete integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS eligibility jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS risks jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS verification jsonb,
  ADD COLUMN IF NOT EXISTS has_commission boolean NOT NULL DEFAULT false;

ALTER TABLE public.opportunities
  ADD CONSTRAINT opportunities_reward_shape CHECK (
    jsonb_typeof(reward) = 'object'
    AND reward ? 'min'
    AND jsonb_typeof(reward->'min') = 'number'
    AND (NOT reward ? 'max' OR jsonb_typeof(reward->'max') = 'number')
  ),
  ADD CONSTRAINT opportunities_capital_shape CHECK (
    jsonb_typeof(capital_required) = 'object'
    AND capital_required->>'kind' IN ('none', 'unknown', 'amount')
    AND (
      capital_required->>'kind' <> 'amount'
      OR (capital_required ? 'amount' AND jsonb_typeof(capital_required->'amount') = 'number' AND capital_required ? 'refundable')
    )
  ),
  ADD CONSTRAINT opportunities_payout_shape CHECK (
    jsonb_typeof(payout) = 'object'
    AND payout ? 'estimateDays'
    AND jsonb_typeof(payout->'estimateDays') = 'number'
    AND (payout->>'estimateDays')::integer >= 0
    AND payout ? 'conditions'
  ),
  ADD CONSTRAINT opportunities_effort_values CHECK (effort IN ('facil', 'medio', 'dificil')),
  ADD CONSTRAINT opportunities_time_to_complete_nonnegative CHECK (time_to_complete >= 0),
  ADD CONSTRAINT opportunities_eligibility_array CHECK (jsonb_typeof(eligibility) = 'array'),
  ADD CONSTRAINT opportunities_risks_array CHECK (jsonb_typeof(risks) = 'array'),
  ADD CONSTRAINT opportunities_verification_shape CHECK (
    verification IS NULL OR (
      jsonb_typeof(verification) = 'object'
      AND verification ? 'verifiedAt'
      AND verification ? 'method'
    )
  );