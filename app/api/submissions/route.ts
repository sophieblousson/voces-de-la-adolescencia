import { NextResponse } from "next/server";
import { submissionServerSchema } from "@/lib/validations/submission.schema";
import { validateFileMeta } from "@/lib/validations/file.schema";

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

  const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;

  if (!googleScriptUrl) {
    return NextResponse.json(
      { error: "Falta configurar GOOGLE_SCRIPT_URL en Vercel." },
      { status: 500 }
    );
  }

  const arrayBuffer = await fileEntry.arrayBuffer();
  const fileBase64 = Buffer.from(arrayBuffer).toString("base64");

  const payload = {
    ...parsed.data,
    file_name: fileEntry.name,
    file_type: fileEntry.type || "application/octet-stream",
    file_size: fileEntry.size,
    file_base64: fileBase64,
  };

  try {
    const response = await fetch(googleScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json().catch(() => null);

    if (!response.ok || !result?.ok) {
      return NextResponse.json(
        {
          error:
            result?.error ??
            "No pudimos registrar tu participación. Probá de nuevo.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ code: result.code }, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        error:
          "No pudimos conectar con el registro de participaciones. Probá de nuevo.",
      },
      { status: 500 }
    );
  }
}
