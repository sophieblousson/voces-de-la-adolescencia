import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/supabase/requireAdmin";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { ESTADOS } from "@/lib/constants";

/**
 * PATCH /api/submissions/[id]
 *
 * Único camino para que el admin cambie el estado o agregue notas
 * internas de una obra (ver decisión documentada en la Etapa 2: la UI
 * nunca actualiza `submissions` directo desde el cliente).
 *
 * Limita explícitamente qué columnas se pueden tocar — nunca datos del
 * estudiante ni de la obra, aunque el cliente mande otros campos en el
 * body, se ignoran.
 */
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const auth = await requireAdminSession();
  if (!auth.ok) return auth.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "No pudimos leer los datos enviados." }, { status: 400 });
  }

  const { status, internal_notes } = (body ?? {}) as {
    status?: unknown;
    internal_notes?: unknown;
  };

  const updates: { status?: (typeof ESTADOS)[number]; internal_notes?: string | null } = {};

  if (status !== undefined) {
    if (typeof status !== "string" || !(ESTADOS as readonly string[]).includes(status)) {
      return NextResponse.json({ error: "Estado inválido." }, { status: 400 });
    }
    updates.status = status as (typeof ESTADOS)[number];
  }

  if (internal_notes !== undefined) {
    if (typeof internal_notes !== "string") {
      return NextResponse.json({ error: "Notas inválidas." }, { status: 400 });
    }
    updates.internal_notes = internal_notes.trim() || null;
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "No hay nada para actualizar." }, { status: 400 });
  }

  const supabase = createAdminSupabaseClient();
  const { error } = await supabase.from("submissions").update(updates).eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: "No se pudo guardar el cambio." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
