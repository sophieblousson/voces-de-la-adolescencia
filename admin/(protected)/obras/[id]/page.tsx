import Link from "next/link";
import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import FichaObra from "@/components/admin/FichaObra";
import styles from "@/components/admin/Admin.module.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Detalle de obra | Admin | Voces de la Adolescencia 2026",
};

type ObraDetallePageProps = {
  params: { id: string };
};

export default async function ObraDetallePage({ params }: ObraDetallePageProps) {
  const supabase = await createServerSupabaseClient();

  const { data: obra, error } = await supabase
    .from("submissions")
    .select("*")
    .eq("id", params.id)
    .maybeSingle();

  if (error || !obra) {
    notFound();
  }

  return (
    <div>
      <Link href="/admin/obras" className={styles.backLink}>
        ← Volver al listado
      </Link>
      <FichaObra obra={obra} />
    </div>
  );
}
