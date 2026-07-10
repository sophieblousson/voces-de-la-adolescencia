import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import AdminNav from "@/components/layout/AdminNav";

export const dynamic = "force-dynamic";

/**
 * Guard de sesión del panel admin. Sin middleware a propósito (decisión
 * técnica del proyecto: evitar complejidad de infraestructura mientras no
 * sea indispensable) — el guard vive acá, en un layout de server component.
 *
 * Vive en el route group `(protected)` a propósito: un layout en
 * app/admin/layout.tsx envolvería TODO lo que cuelga de /admin/*,
 * incluida /admin/login, y un guard ahí generaría un loop de redirect
 * (sin sesión -> redirige a /admin/login -> el mismo guard vuelve a
 * correr sobre esa página -> sigue sin sesión -> redirige de nuevo).
 * `(protected)` no agrega segmento a la URL, así que /admin/obras sigue
 * siendo /admin/obras, pero /admin/login queda afuera de este layout.
 */
export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Sin sesión -> a login. No distinguimos "nunca logueado" de "sesión
  // vencida": el mensaje en /admin/login es el mismo para los dos casos.
  if (!user) {
    redirect("/admin/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  // Logueado pero sin perfil admin (usuario de Auth sin fila en profiles,
  // o con role = 'jurado' en el futuro): tampoco entra al panel admin.
  if (profile?.role !== "admin") {
    redirect("/admin/login?error=sin-permisos");
  }

  return (
    <div>
      <AdminNav userEmail={user.email ?? ""} />
      <main
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          padding: "var(--space-8) var(--space-4)",
        }}
      >
        {children}
      </main>
    </div>
  );
}
