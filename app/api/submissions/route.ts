import { NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { submissionServerSchema } from "@/lib/validations/submission.schema";
import { validateFileMeta } from "@/lib/validations/file.schema";
import { generateUniqueCode } from "@/lib/utils/generateCode";
import { sanitizeFileName } from "@/lib/utils/sanitizeFileName";
import { STORAGE_BUCKET_OBRAS, STORAGE_PATH_YEAR } from "@/lib/constants";

/**
 * POST /api/submissions
 *
 * Flujo:
 * 1. Parsear multipart/form-data.
 * 2. Validar campos de texto con Zod.
 * 3. Validar archivo.
 * 4. Generar código único.
 * 5. Insertar inscripción inicial.
 * 6. Subir archivo a Storage.
 * 7. Actualizar inscripción con datos del archivo.
 * 8. Responder { code }.
 */
export async function POST(request: Request) {
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "No pudimos leer los datos enviados. Probá de nuevo." },
      { status: 400 }
    );
  }

  const rawFields = {
    student_name: formData.get("student_name"),
    student_email: formData.get("student_email"),
    student_grade: formData.get("student_grade"),
    school: formData.get("school"),
    teacher_name: formData.get("teacher_name") ?? "",

    category: formData.get("category"),
    subcategory: formData.get("subcategory"),
    title: formData.get("title"),
    pseudonym: formData.get("pseudonym"),

    declaration_original: formData.get("declaration_original") === "true",
    declaration_no_ai: formData.get("declaration_no_ai") === "true",
    declaration_terms: formData.get("declaration_terms") === "true",
    declaration_evaluation: formData.get("declaration_evaluation") === "true",
    declaration_publication: formData.get("declaration_publication") === "true",
  };

  const parsed = submissionServerSchema.safeParse(rawFields);

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];

    return NextResponse.json(
      { error: firstIssue?.message ?? "Revisá los datos del formulario." },
      { status: 400 }
    );
  }

  const data = parsed.data;

  const fileEntry = formData.get("file");

  if (!(fileEntry instanceof File) || fileEntry.size === 0) {
    return NextResponse.json(
      { error: "El archivo con tu obra es obligatorio." },
      { status: 400 }
    );
  }

  const fileValidation = validateFileMeta({
    name: fileEntry.name,
    size: fileEntry.size,
    type: fileEntry.type,
  });

  if (!fileValidation.ok) {
    return NextResponse.json(
      { error: fileValidation.error },
      { status: 400 }
    );
  }

  let supabase: ReturnType<typeof createAdminSupabaseClient>;
  let code: string;

  try {
    supabase = createAdminSupabaseClient();
    code = await generateUniqueCode(supabase);
  } catch (err) {
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "No se pudo generar el código de participación.",
      },
      { status: 500 }
    );
  }

  const submissionInsert = {
    code,

    student_name: data.student_name,
    student_email: data.student_email,
    student_grade: data.student_grade,
    school: data.school,
    teacher_name: data.teacher_name || null,

    category: data.category,
    subcategory: data.subcategory,
    title: data.title,
    pseudonym: data.pseudonym,

    file_path: null,
    file_name: null,
    file_type: null,
    file_size: null,

    declaration_original: data.declaration_original,
    declaration_no_ai: data.declaration_no_ai,
    declaration_terms: data.declaration_terms,
    declaration_evaluation: data.declaration_evaluation,
    declaration_publication: data.declaration_publication,

    internal_notes: null,
  };

  const { data: inserted, error: insertError } = await supabase
    .from("submissions")
    .insert(submissionInsert as any)
    .select("id")
    .single();

  if (insertError || !inserted) {
    return NextResponse.json(
      {
        error:
          "No pudimos registrar tu inscripción. Probá de nuevo en unos minutos.",
      },
      { status: 500 }
    );
  }

  const submissionId = inserted.id;

  const cleanFileName = sanitizeFileName(fileEntry.name);
  const filePath = `${STORAGE_PATH_YEAR}/${code}/${cleanFileName}`;

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET_OBRAS)
    .upload(filePath, fileEntry, {
      contentType: fileEntry.type || undefined,
      upsert: false,
    });

  if (uploadError) {
    await supabase.from("submissions").delete().eq("id", submissionId);

    return NextResponse.json(
      { error: "No pudimos subir tu archivo. Probá de nuevo." },
      { status: 500 }
    );
  }

  const { error: updateError } = await supabase
    .from("submissions")
    .update({
      file_path: filePath,
      file_name: cleanFileName,
      file_type: fileValidation.tipo,
      file_size: fileEntry.size,
    })
    .eq("id", submissionId);

  if (updateError) {
    await supabase.storage.from(STORAGE_BUCKET_OBRAS).remove([filePath]);
    await supabase.from("submissions").delete().eq("id", submissionId);

    return NextResponse.json(
      { error: "No pudimos completar tu inscripción. Probá de nuevo." },
      { status: 500 }
    );
  }

  return NextResponse.json({ code }, { status: 200 });
}
