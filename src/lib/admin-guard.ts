import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/**
 * Confirmação do papel de administrador, feita no servidor.
 *
 * A verificação tem de acontecer aqui e não no cliente: no cliente, qualquer
 * pessoa muda o resultado nas ferramentas de programador. Usa o cliente já
 * autenticado com o token de quem faz o pedido, e consulta user_roles através
 * da política existente, sem tocar em has_role, que continua reservada ao
 * service_role.
 */
export const checkAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();

    if (error) return { admin: false };
    return { admin: data !== null };
  });

/**
 * Devolve true só para administradores. Qualquer falha, incluindo não ter
 * sessão, conta como não autorizado: quem chama transforma isso em 404, para
 * a resposta não revelar que a rota existe.
 */
export async function isAdmin() {
  try {
    const result = await checkAdmin();
    return result.admin === true;
  } catch {
    return false;
  }
}