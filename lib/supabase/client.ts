import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

/**
 * Cliente de Supabase para componentes de cliente ("use client").
 * Usa la anon key: nunca debe usarse para escribir en `submissions`
 * (eso siempre pasa por el Route Handler con service_role).
 * Su uso principal en el MVP es leer la sesión del admin en el browser
 * si hace falta (por ejemplo, para mostrar el email logueado en el navbar).
 */
export function createBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY en las variables de entorno."
    );
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey);
}
