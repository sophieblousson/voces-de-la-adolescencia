import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import type { Database } from "@/types/database.types";

type CookieToSet = {
  name: string;
  value: string;
  options: CookieOptions;
};

/**
 * Cliente de Supabase para Server Components y Route Handlers que necesitan
 * leer la SESIÓN del admin logueado (no para escribir en `submissions`
 * con privilegios elevados — para eso está lib/supabase/admin.ts).
 *
 * Usa la anon key + cookies de sesión, respetando las políticas RLS.
 * Se usa en: app/admin/layout.tsx (guard de sesión) y en los Route Handlers
 * de /api/submissions/[id] y /api/export para confirmar que quien llama
 * es un admin autenticado antes de usar el cliente con service_role.
 */
export async function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY en las variables de entorno."
    );
  }

  const cookieStore = await cookies();

  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: CookieToSet[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Se puede ignorar si se llama desde un Server Component puro
          // (sin posibilidad de escribir cookies); el middleware/route handler
          // que sí puede escribir se encarga de refrescar la sesión.
        }
      },
    },
  });
}
