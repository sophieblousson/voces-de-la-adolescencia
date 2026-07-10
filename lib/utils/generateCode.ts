import type { SupabaseClient } from "@supabase/supabase-js";
import { CODE_PREFIX, CODE_RANDOM_LENGTH } from "@/lib/constants";
import type { Database } from "@/types/database.types";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sin 0/O/1/I, para que sea legible al dictarlo

function randomSegment(length: number): string {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return result;
}

/**
 * Genera un código de participación único (VA26-XXXXXX), verificando
 * contra la tabla `submissions` que no exista ya. Reintenta unas pocas
 * veces ante una colisión (extremadamente improbable con este alfabeto
 * y longitud, pero el constraint UNIQUE de la base es la garantía real).
 */
export async function generateUniqueCode(
  supabase: SupabaseClient<Database>,
  maxAttempts = 5
): Promise<string> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const candidate = `${CODE_PREFIX}${randomSegment(CODE_RANDOM_LENGTH)}`;

    const { data, error } = await supabase
      .from("submissions")
      .select("id")
      .eq("code", candidate)
      .maybeSingle();

    if (error) {
      throw new Error(`No se pudo verificar la unicidad del código: ${error.message}`);
    }

    if (!data) {
      return candidate;
    }
  }

  throw new Error("No se pudo generar un código de participación único. Intentá de nuevo.");
}
