import {
  ARCHIVO_MIME_PERMITIDOS,
  ARCHIVO_TAMANO_MAXIMO_BYTES,
  ARCHIVO_TAMANO_MAXIMO_MB,
  ARCHIVO_TIPOS_PERMITIDOS,
  type ArchivoTipo,
} from "@/lib/constants";

export type FileValidationResult =
  | { ok: true; tipo: ArchivoTipo }
  | { ok: false; error: string };

/**
 * Valida metadata de un archivo (nombre, tamaño, mime type) contra las
 * reglas del concurso. No depende de la clase `File` del browser para
 * poder reusarse tal cual en el cliente (antes de subir) y en el
 * servidor (con el `File` que devuelve `request.formData()`).
 */
export function validateFileMeta(meta: {
  name: string;
  size: number;
  type: string;
}): FileValidationResult {
  const extension = meta.name.split(".").pop()?.toLowerCase() ?? "";

  const tipo = ARCHIVO_TIPOS_PERMITIDOS.find((t) => t === extension) as
    | ArchivoTipo
    | undefined;

  if (!tipo) {
    return {
      ok: false,
      error: "El archivo debe ser Word (.doc, .docx) o PDF (.pdf).",
    };
  }

  const mimesEsperados = ARCHIVO_MIME_PERMITIDOS[tipo];
  // Algunos navegadores mandan el mime type vacío para .doc; si eso pasa,
  // confiamos en la extensión (ya validada arriba) en vez de rechazar
  // un archivo legítimo por un detalle del browser del estudiante.
  if (meta.type && !mimesEsperados.includes(meta.type)) {
    return {
      ok: false,
      error: "El archivo debe ser Word (.doc, .docx) o PDF (.pdf).",
    };
  }

  if (meta.size <= 0) {
    return { ok: false, error: "El archivo está vacío." };
  }

  if (meta.size > ARCHIVO_TAMANO_MAXIMO_BYTES) {
    return {
      ok: false,
      error: `El archivo supera el tamaño máximo permitido (${ARCHIVO_TAMANO_MAXIMO_MB}MB).`,
    };
  }

  return { ok: true, tipo };
}
