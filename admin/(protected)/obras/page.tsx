import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  CATEGORIAS,
  CATEGORIA_LABELS,
  ESTADOS,
  ESTADO_LABELS,
  type Categoria,
  type Estado,
} from "@/lib/constants";
import FiltrosObras from "@/components/admin/FiltrosObras";
import TablaObras from "@/components/admin/TablaObras";
import styles from "@/components/admin/Admin.module.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Obras | Admin | Voces de la Adolescencia 2026",
};

type ObrasPageProps = {
  searchParams: {
    q?: string;
    categoria?: string;
    estado?: string;
    colegio?: string;
  };
};

// PostgREST usa "," para separar condiciones dentro de un .or(); si el
// texto de búsqueda trajera una coma (o paréntesis), rompería el filtro.
// Se limpia antes de armar la query.
function sanitizeForFilter(value: string): string {
  return value.replace(/[,()]/g, " ").trim();
}

export default async function ObrasPage({ searchParams }: ObrasPageProps) {
  const supabase = await createServerSupabaseClient();

  const q = searchParams.q?.trim() ?? "";
  const categoria = searchParams.categoria ?? "";
  const estado = searchParams.estado ?? "";
  const colegio = searchParams.colegio?.trim() ?? "";

  let query = supabase
    .from("submissions")
    .select(
      "id, code, created_at, student_name, school, category, title, pseudonym, status, file_path"
    );

  if (q) {
    const safeQ = sanitizeForFilter(q);
    query = query.or(
      `student_name.ilike.%${safeQ}%,title.ilike.%${safeQ}%,pseudonym.ilike.%${safeQ}%,code.ilike.%${safeQ}%`
    );
  }
  if (categoria && (CATEGORIAS as readonly string[]).includes(categoria)) {
    query = query.eq("category", categoria as Categoria);
  }
  if (estado && (ESTADOS as readonly string[]).includes(estado)) {
    query = query.eq("status", estado as Estado);
  }
  if (colegio) query = query.ilike("school", `%${sanitizeForFilter(colegio)}%`);

  const { data: obras, error } = await query.order("created_at", { ascending: false });

  // ---- Totales (sin filtros, sobre toda la tabla) ----
  const [{ count: totalObras }, { count: obrasConArchivo }, { data: schoolRows }, categoriaCounts] =
    await Promise.all([
      supabase.from("submissions").select("*", { count: "exact", head: true }),
      supabase
        .from("submissions")
        .select("*", { count: "exact", head: true })
        .not("file_path", "is", null),
      supabase.from("submissions").select("school"),
      Promise.all(
        CATEGORIAS.map((cat) =>
          supabase
            .from("submissions")
            .select("*", { count: "exact", head: true })
            .eq("category", cat)
            .then((r) => ({ categoria: cat, count: r.count ?? 0 }))
        )
      ),
    ]);

  const institucionesParticipantes = new Set((schoolRows ?? []).map((r) => r.school)).size;

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Obras recibidas</h1>
      </div>

      <div className={styles.totales}>
        <div className={styles.totalCard}>
          <p className={styles.totalNumber}>{totalObras ?? 0}</p>
          <p className={styles.totalLabel}>Total de obras</p>
        </div>
        <div className={styles.totalCard}>
          <p className={styles.totalNumber}>{institucionesParticipantes}</p>
          <p className={styles.totalLabel}>Instituciones participantes</p>
        </div>
        <div className={styles.totalCard}>
          <p className={styles.totalNumber}>{obrasConArchivo ?? 0}</p>
          <p className={styles.totalLabel}>Obras con archivo</p>
        </div>
        <div className={styles.totalCard}>
          <p className={styles.totalNumber}>
            {categoriaCounts.map((c) => c.count).reduce((a, b) => a + b, 0)}
          </p>
          <p className={styles.totalLabel}>
            {categoriaCounts.map((c) => `${CATEGORIA_LABELS[c.categoria]}: ${c.count}`).join(" · ")}
          </p>
        </div>
      </div>

      <FiltrosObras
        estados={ESTADOS.map((e) => ({ value: e, label: ESTADO_LABELS[e] }))}
        categorias={CATEGORIAS.map((c) => ({ value: c, label: CATEGORIA_LABELS[c] }))}
      />

      {error ? (
        <div className={styles.emptyState}>
          No pudimos cargar las obras. Probá recargar la página.
        </div>
      ) : (
        <TablaObras obras={obras ?? []} />
      )}
    </div>
  );
}
