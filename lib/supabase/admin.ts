import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

/**
 * Cliente de Supabase con SERVICE ROLE KEY.
 *
 * ⚠️ USO EXCLUSIVO dentro de Route Handlers (app/api/**\/route.ts).
 * Nunca importar este archivo desde un componente de cliente ni desde
 * un Server Component que renderiza HTML: la service_role key bypassea
 * RLS por completo.
 *
 * Se usa para:
 * - Insertar/actualizar filas en `submissions` desde POST /api/submissions.
 * - Subir archivos al bucket `obras` en Storage.
 * - Generar signed URLs de descarga para el admin.
 * - Actualizar `status` / `internal_notes` desde PATCH /api/submissions/[id]
 *   (después de validar la sesión del admin con server.ts).
 */
export function createAdminSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en las variables de entorno."
    );
  }

  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
