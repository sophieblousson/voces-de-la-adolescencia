import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export type AdminSessionResult =
  | {
      ok: true;
      userId: string;
      email: string | null;
      role: "admin";
    }
  | {
      ok: false;
      status: 401 | 403;
      message: string;
    };

export async function requireAdminSession(): Promise<AdminSessionResult> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return {
      ok: false,
      status: 401,
      message: "Faltan variables de entorno de Supabase.",
    };
  }

  const cookieStore = cookies();

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch {
          // Puede fallar en contextos server-only de solo lectura.
        }
      },
      remove(name: string, options) {
        try {
          cookieStore.set({ name, value: "", ...options });
        } catch {
          // Puede fallar en contextos server-only de solo lectura.
        }
      },
    },
  });

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      ok: false,
      status: 401,
      message: "No hay una sesión válida.",
    };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, email, role")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    return {
      ok: false,
      status: 403,
      message: "Tu usuario no tiene perfil de acceso.",
    };
  }

  if (profile.role !== "admin") {
    return {
      ok: false,
      status: 403,
      message: "Tu usuario no tiene permisos de administrador.",
    };
  }

  return {
    ok: true,
    userId: user.id,
    email: user.email ?? null,
    role: "admin",
  };
}
