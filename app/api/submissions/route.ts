import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      error:
        "La convocatoria de Voces de la Adolescencia 2026 ya finalizó y no recibe nuevas producciones.",
    },
    { status: 410 }
  );
}
