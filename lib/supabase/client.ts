import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";
import { getSupabaseAnonKey, getSupabaseUrl } from "./env";

/**
 * Cliente de Supabase para componentes de cliente ("use client").
 * Usa la anon key: nunca debe usarse para escribir en `submissions`
 * (eso siempre pasa por el Route Handler con service_role).
 * Su uso principal en el MVP es leer la sesión del admin en el browser
 * si hace falta (por ejemplo, para mostrar el email logueado en el navbar).
 */
export function createBrowserClient() {
  const supabaseUrl = getSupabaseUrl();
  const supabaseAnonKey = getSupabaseAnonKey();

  return createClient<Database>(supabaseUrl, supabaseAnonKey);
}
