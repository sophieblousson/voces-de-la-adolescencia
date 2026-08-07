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
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Participación registrada</p>

        <h1 className={styles.title}>Tu obra fue enviada</h1>

        <p className={styles.lead}>
          Guardá este código: lo vas a necesitar para cualquier consulta
          sobre tu participación.
        </p>

        <div className={styles.codeCard}>
          <div className={styles.status}>✓ Envío exitoso</div>

          <p className={styles.codeLabel}>Código de participación</p>

          <p className={styles.codeValue}>{code || "VDA-2026-XXXXX"}</p>

          <p className={styles.codeHelp}>
            Recomendamos hacer una captura de pantalla o anotarlo en un
            lugar seguro.
          </p>
        </div>

        <div className={styles.infoGrid}>
          <div className={styles.infoBox}>
            <h2 className={styles.infoTitle}>¿Qué sigue ahora?</h2>
            <p>
              Tu obra ya quedó registrada correctamente. El jurado la leerá
              dentro de los plazos establecidos en las bases.
            </p>
          </div>

          <div className={styles.infoBox}>
            <h2 className={styles.infoTitle}>Importante</h2>
            <p>
              No vamos a reenviar este código por otro medio. Guardalo porque
              es la referencia de tu participación dentro del concurso.
            </p>
          </div>
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
