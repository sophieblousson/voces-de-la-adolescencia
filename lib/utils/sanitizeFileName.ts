/**
 * Limpia un nombre de archivo para usarlo como segmento de ruta en
 * Supabase Storage: sin espacios, sin acentos, sin caracteres que
 * puedan interpretarse como separadores de ruta.
 */
export function sanitizeFileName(originalName: string): string {
  const lastDot = originalName.lastIndexOf(".");
  const base = lastDot > 0 ? originalName.slice(0, lastDot) : originalName;
  const extension = lastDot > 0 ? originalName.slice(lastDot + 1) : "";

  const cleanBase = base
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // saca acentos
    .replace(/[^a-zA-Z0-9-_]+/g, "-") // todo lo que no sea alfanumérico -> guión
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

  const cleanExtension = extension.toLowerCase().replace(/[^a-z0-9]/g, "");

  const safeBase = cleanBase || "obra";

  return cleanExtension ? `${safeBase}.${cleanExtension}` : safeBase;
}
