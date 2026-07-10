/**
 * Lectura y validación de las variables de entorno de Supabase.
 *
 * Existe porque un error típico (pegar la URL del dashboard, o dejar una
 * barra/ruta de más en NEXT_PUBLIC_SUPABASE_URL) no falla acá con un
 * mensaje claro, sino más adelante como un error críptico del gateway de
 * Supabase (algo como "Invalid path specified in request URL"). Validar
 * el formato acá, antes de crear el cliente, ahorra ese viaje de ida y
 * vuelta a un error que no dice cuál es la causa real.
 */

const SUPABASE_URL_PATTERN = /^https:\/\/[a-z0-9-]+\.supabase\.co$/i;

export function getSupabaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!raw) {
    throw new Error("Falta NEXT_PUBLIC_SUPABASE_URL en las variables de entorno.");
  }

  // Dos errores comunes al copiar la URL desde Supabase:
  // 1) pegar el endpoint del REST API completo (.../rest/v1/) en vez de
  //    la Project URL — Supabase la muestra así en algunas pantallas.
  // 2) dejar una barra final de más.
  // Los normalizamos acá en vez de solo rechazarlos, porque el valor
  // correcto es 100% recuperable sin ambigüedad.
  const url = raw
    .trim()
    .replace(/\/rest\/v1\/?$/i, "")
    .replace(/\/+$/, "");

  if (!SUPABASE_URL_PATTERN.test(url)) {
    throw new Error(
      `NEXT_PUBLIC_SUPABASE_URL tiene un formato inválido: "${raw}". ` +
        "Tiene que ser la URL del API de tu proyecto, con esta forma exacta: " +
        "https://xxxxxxxxxxxx.supabase.co (sin /rest/v1, sin /dashboard, sin " +
        "barra final, sin comillas). La encontrás en Supabase → Project Settings → API → Project URL."
    );
  }

  return url;
}

export function getSupabaseAnonKey(): string {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!key) {
    throw new Error("Falta NEXT_PUBLIC_SUPABASE_ANON_KEY en las variables de entorno.");
  }
  return key.trim();
}

export function getSupabaseServiceRoleKey(): string {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) {
    throw new Error("Falta SUPABASE_SERVICE_ROLE_KEY en las variables de entorno.");
  }
  return key.trim();
}
