/**
 * Constantes centrales del concurso.
 * Cambiar fechas, categorías o estados SIEMPRE desde acá, nunca hardcodeadas
 * en componentes o en el Route Handler.
 */

// ---------- Categorías ----------

export const CATEGORIAS = ["poesia", "cuento_breve", "ensayo_personal"] as const;

export type Categoria = (typeof CATEGORIAS)[number];

export const CATEGORIA_LABELS: Record<Categoria, string> = {
  poesia: "Poesía",
  cuento_breve: "Cuento breve",
  ensayo_personal: "Ensayo personal",
};

// ---------- Estados internos de una obra ----------

export const ESTADOS = [
  "recibido",
  "en_revision",
  "preseleccionado",
  "finalista",
  "ganador",
  "descartado",
] as const;

export type Estado = (typeof ESTADOS)[number];

export const ESTADO_LABELS: Record<Estado, string> = {
  recibido: "Recibido",
  en_revision: "En revisión",
  preseleccionado: "Preseleccionado",
  finalista: "Finalista",
  ganador: "Ganador",
  descartado: "Descartado",
};

export const ESTADO_INICIAL: Estado = "recibido";

// ---------- Fechas clave del concurso 2026 ----------
// Todas en hora local de Argentina, representadas en formato ISO (UTC-03:00).

export const FECHAS = {
  lanzamientoInstitucional: "2026-08-03", // primera semana de agosto (referencial)
  inicioRecepcion: "2026-09-01T00:00:00-03:00",
  cierreRecepcion: "2026-10-30T23:59:59-03:00",
  inicioEvaluacion: "2026-11-02",
  cierreEvaluacion: "2026-11-13",
  anuncioGanadores: "2026-11-16",
  publicacionAntologia: "2026-12-01", // referencial, "diciembre 2026"
} as const;

// Fecha objetivo del countdown de la home.
export const COUNTDOWN_TARGET = FECHAS.inicioRecepcion;

// Fecha de cierre de recepción, usada para deshabilitar el formulario
// una vez pasada (validación tanto en cliente como en el Route Handler).
export const FECHA_CIERRE_RECEPCION = FECHAS.cierreRecepcion;

// ---------- Archivo adjunto ----------

export const ARCHIVO_TIPOS_PERMITIDOS = ["doc", "docx", "pdf"] as const;

export type ArchivoTipo = (typeof ARCHIVO_TIPOS_PERMITIDOS)[number];

export const ARCHIVO_MIME_PERMITIDOS: Record<ArchivoTipo, string[]> = {
  doc: ["application/msword"],
  docx: [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  pdf: ["application/pdf"],
};

export const ARCHIVO_TAMANO_MAXIMO_MB = 10;
export const ARCHIVO_TAMANO_MAXIMO_BYTES = ARCHIVO_TAMANO_MAXIMO_MB * 1024 * 1024;

export const STORAGE_BUCKET_OBRAS = "obras";

// Edición del concurso (no el año calendario): se usa como primer segmento
// de la ruta dentro del bucket -> `${STORAGE_PATH_YEAR}/{code}/{file_name}`.
export const STORAGE_PATH_YEAR = "2026";

// ---------- Código de participación ----------

export const CODE_PREFIX = "VA26-";
export const CODE_RANDOM_LENGTH = 6;

// ---------- Curso / año ----------
// Select cerrado: el formulario ya no acepta texto libre para esto.

export const GRADOS = ["7N", "8N", "9N", "10N", "11N", "12N"] as const;

export type Grado = (typeof GRADOS)[number];
