import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/supabase/requireAdmin";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { STORAGE_BUCKET_OBRAS } from "@/lib/constants";

// Vigencia corta a propósito: es para que el admin dispare la descarga
// en el momento, no para compartir el link.
const SIGNED_URL_EXPIRES_IN_SECONDS = 120;

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const auth = await requireAdminSession();
  if (!auth.ok) return auth.response;

  const supabase = createAdminSupabaseClient();

  const { data: submission, error: fetchError } = await supabase
    .from("submissions")
    .select("file_path")
    .eq("id", params.id)
    .maybeSingle();

  if (fetchError || !submission?.file_path) {
    return NextResponse.json({ error: "Esta obra no tiene un archivo asociado." }, { status: 404 });
  }

  const { data: signed, error: signError } = await supabase.storage
    .from(STORAGE_BUCKET_OBRAS)
    .createSignedUrl(submission.file_path, SIGNED_URL_EXPIRES_IN_SECONDS);

  if (signError || !signed) {
    return NextResponse.json(
      { error: "No se pudo generar el link de descarga." },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: signed.signedUrl });
}
