import Link from "next/link";
import styles from "./confirmacion.module.css";

export const metadata = {
  title: "Confirmación | Voces de la Adolescencia 2026",
};

type ConfirmacionPageProps = {
  searchParams?: {
    code?: string | string[];
  };
};

export default function ConfirmacionPage({
  searchParams,
}: ConfirmacionPageProps) {
  const rawCode = searchParams?.code;
  const code = Array.isArray(rawCode) ? rawCode[0] : rawCode;

  return (
    <section className={styles.page}>
      <div className={styles.wrap}>
        <p className={styles.eyebrow}>Participación registrada</p>

        <h1>Tu obra fue enviada</h1>

        <p className={styles.lead}>
          Guardá este código: es la referencia de tu participación dentro del
          concurso.
        </p>

        <div className={styles.codeCard}>
          <div className={styles.status}>✓ Envío exitoso</div>

          <p className={styles.codeLabel}>Código de participación</p>

          <p className={styles.codeValue}>{code || "VDA-2026-XXXXX"}</p>

          <p className={styles.codeHelp}>
            Hacé una captura de pantalla o anotalo en un lugar seguro.
          </p>
        </div>

        <div className={styles.infoGrid}>
          <article className={styles.infoBox}>
            <p className={styles.infoNumber}>01</p>
            <h2>Qué sigue ahora</h2>
            <p>
              Tu obra ya quedó registrada correctamente. El jurado la leerá
              dentro de los plazos establecidos en las bases.
            </p>
          </article>

          <article className={styles.infoBox}>
            <p className={styles.infoNumber}>02</p>
            <h2>Importante</h2>
            <p>
              No vamos a reenviar este código por otro medio. Guardalo porque
              identifica tu participación.
            </p>
          </article>
        </div>

        <div className={styles.actions}>
          <Link href="/" className={styles.primaryButton}>
            Volver al inicio
          </Link>

          <Link href="/participar" className={styles.secondaryButton}>
            Enviar otra obra
          </Link>
        </div>
      </div>
    </section>
  );
}
