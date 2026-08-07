import { z } from "zod";
import { CATEGORIAS, GRADOS } from "@/lib/constants";

/**
 * Un único set de reglas, usado tanto en el cliente como en
 * POST /api/submissions.
 *
 * El archivo no se valida acá: File se valida aparte en
 * lib/validations/file.schema.ts.
 */

// ---------- Paso 1: datos del estudiante ----------

export const studentSchema = z.object({
  student_name: z.string().trim().min(2, "Ingresá tu nombre y apellido."),

  student_email: z.string().trim().email("Ingresá un email válido."),

  student_grade: z.enum(GRADOS, {
    errorMap: () => ({ message: "Elegí tu curso / año." }),
  }),

  school: z.string().trim().min(2, "Indicá tu colegio."),

  teacher_name: z.string().trim().optional().or(z.literal("")),
});

export type StudentData = z.infer<typeof studentSchema>;

// ---------- Paso 2: datos de la obra ----------

export const obraSchema = z.object({
  category: z.enum(CATEGORIAS, {
    errorMap: () => ({ message: "Elegí una categoría." }),
  }),

  subcategory: z
    .string()
    .trim()
    .min(1, "Elegí el tema específico de tu obra."),

  title: z.string().trim().min(1, "Ingresá el título de la obra."),

  pseudonym: z.string().trim().min(1, "Elegí un seudónimo."),
});

export type ObraData = z.infer<typeof obraSchema>;

// ---------- Paso 3: declaraciones obligatorias ----------

const declaracionRequerida = z.literal(true, {
  errorMap: () => ({
    message: "Tenés que aceptar esta declaración para participar.",
  }),
});

export const declaracionesSchema = z.object({
  declaration_original: declaracionRequerida,
  declaration_no_ai: declaracionRequerida,
  declaration_terms: declaracionRequerida,
  declaration_evaluation: declaracionRequerida,
  declaration_publication: declaracionRequerida,
});

export type DeclaracionesData = z.infer<typeof declaracionesSchema>;

// ---------- Schema completo servidor ----------

export const submissionServerSchema = studentSchema
  .merge(obraSchema)
  .merge(declaracionesSchema);

export type SubmissionServerData = z.infer<typeof submissionServerSchema>;
