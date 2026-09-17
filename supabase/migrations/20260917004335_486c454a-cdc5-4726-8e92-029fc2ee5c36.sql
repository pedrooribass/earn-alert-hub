CREATE TYPE public.opportunity_category AS ENUM ('crypto','bancos','investimentos','cashback','ia','compras','telecom','gaming');
CREATE TYPE public.opportunity_status AS ENUM ('published','expired','draft');
CREATE TYPE public.app_role AS ENUM ('admin','moderator','user');

CREATE TABLE public.opportunities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  brand text NOT NULL,
  title text NOT NULL,
  summary text NOT NULL,
  category public.opportunity_category NOT NULL,
  reward_min integer NOT NULL DEFAULT 0,
  reward_max integer NOT NULL,
  time_minutes integer NOT NULL,
  difficulty text NOT NULL CHECK (difficulty IN ('Muito fácil','Fácil','Média')),
  expires_at timestamptz,
  is_featured boolean NOT NULL DEFAULT false,
  is_new boolean NOT NULL DEFAULT true,
  previous_reward integer,
  status public.opportunity_status NOT NULL DEFAULT 'published',
  steps jsonb NOT NULL DEFAULT '[]'::jsonb,
  external_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.opportunities TO anon, authenticated;
GRANT ALL ON public.opportunities TO service_role;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published opportunities are public" ON public.opportunities FOR SELECT TO anon, authenticated USING (status = 'published');

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY,
  display_name text,
  onboarding_complete boolean NOT NULL DEFAULT false,
  install_prompt_seen boolean NOT NULL DEFAULT false,
  notifications_enabled boolean NOT NULL DEFAULT false,
  preferred_categories public.opportunity_category[] NOT NULL DEFAULT '{}',
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own profile" ON public.profiles FOR ALL TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE TABLE public.saved_opportunities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  opportunity_id uuid NOT NULL REFERENCES public.opportunities(id) ON DELETE CASCADE,
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, opportunity_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.saved_opportunities TO authenticated;
GRANT ALL ON public.saved_opportunities TO service_role;
ALTER TABLE public.saved_opportunities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own saved opportunities" ON public.saved_opportunities FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER opportunities_updated_at BEFORE UPDATE ON public.opportunities FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.opportunities (slug, brand, title, summary, category, reward_min, reward_max, time_minutes, difficulty, expires_at, is_featured, is_new, previous_reward, steps, external_url) VALUES
('trading-212-fracao', 'Trading 212', 'Recebe uma ação fracionada', 'Abre uma conta, valida a identidade e recebe uma ação escolhida aleatoriamente.', 'investimentos', 10, 100, 5, 'Fácil', now() + interval '2 days', true, true, NULL, '["Criar a conta através da campanha", "Validar a identidade", "Fazer um depósito mínimo de 1€", "Receber a ação em até 3 dias úteis"]', 'https://www.trading212.com/'),
('bybit-bonus-50', 'Bybit', 'Bónus de boas-vindas aumentado', 'O valor subiu hoje. Consulta as condições antes de aderir.', 'crypto', 20, 50, 8, 'Média', now() + interval '5 days', true, true, 20, '["Criar conta", "Completar a verificação", "Consultar os requisitos de depósito", "Ativar a recompensa"]', 'https://www.bybit.com/'),
('moey-conta', 'moey!', 'Bónus por abrir conta', 'Conta portuguesa sem mensalidade, com adesão totalmente digital.', 'bancos', 10, 20, 6, 'Muito fácil', now() + interval '9 days', true, true, NULL, '["Instalar a aplicação moey!", "Abrir conta", "Validar os dados", "Cumprir as condições da campanha"]', 'https://moey.pt/'),
('beruby-cashback', 'Beruby', 'Cashback reforçado em compras', 'Recebe parte do valor de volta em lojas selecionadas.', 'cashback', 5, 35, 3, 'Muito fácil', now() + interval '1 day', false, false, NULL, '["Abrir a loja através da campanha", "Concluir a compra na mesma sessão", "Aguardar a validação do cashback"]', 'https://pt.beruby.com/'),
('perplexity-pro', 'Perplexity', 'Acesso Pro em campanha', 'Experimenta ferramentas avançadas de pesquisa com uma campanha limitada.', 'ia', 20, 40, 4, 'Fácil', now() + interval '4 days', false, true, NULL, '["Abrir a campanha", "Criar ou ligar uma conta", "Confirmar a elegibilidade", "Ativar o período promocional"]', 'https://www.perplexity.ai/'),
('woo-dados', 'WOO', 'Dados móveis extra', 'Campanha temporária para novos tarifários digitais.', 'telecom', 10, 25, 5, 'Fácil', now() + interval '3 days', false, false, NULL, '["Escolher o tarifário elegível", "Pedir o cartão ou eSIM", "Ativar dentro do prazo"]', 'https://www.woo.pt/'),
('xbox-game-pass', 'Xbox', 'Primeiro mês com desconto', 'Acesso ao catálogo Game Pass por um preço reduzido.', 'gaming', 8, 12, 2, 'Muito fácil', now() + interval '6 days', false, true, NULL, '["Entrar na conta Microsoft", "Confirmar elegibilidade", "Ativar a campanha"]', 'https://www.xbox.com/pt-PT/xbox-game-pass'),
('vinted-portes', 'Vinted', 'Envios selecionados com desconto', 'Poupa nos portes em compras elegíveis durante este fim de semana.', 'compras', 3, 5, 2, 'Muito fácil', now() + interval '18 hours', false, true, NULL, '["Encontrar um artigo elegível", "Confirmar o desconto no checkout", "Concluir a compra antes do fim"]', 'https://www.vinted.pt/');