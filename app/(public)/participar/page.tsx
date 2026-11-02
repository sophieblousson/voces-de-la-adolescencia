import Link from "next/link";
import styles from "@/components/form/ParticiparPage.module.css";

export const metadata = {
  title: "Convocatoria finalizada | Voces de la Adolescencia 2026",
};

export default function ParticiparPage() {
  return (
    <section className={styles.closedPage}>
      <div className={styles.closedInner}>
        <p className={styles.closedKicker}>Voces de la Adolescencia 2026</p>

        <h1 className={styles.closedTitle}>La convocatoria finalizó</h1>

        <p className={styles.closedLead}>
          ¡Gracias por ser parte de esta tercera edición!
        </p>

        <p className={styles.closedText}>
          La recepción de producciones ya se encuentra cerrada. Durante las
          próximas semanas, el jurado estará realizando la lectura y evaluación
          de las obras recibidas.
        </p>

        <div className={styles.announcement}>
          <p className={styles.announcementLabel}>
            Anuncio de ganadores y producciones destacadas
          </p>

          <p className={styles.announcementDate}>16 de noviembre · 13 h</p>

          <p className={styles.announcementText}>
            Realizaremos una transmisión en vivo a través del canal de YouTube
            de Active Learning.
          </p>

          <a
            href="https://www.youtube.com/@ACTIVELEARNING23"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.youtubeButton}
          >
            Ir al canal de YouTube →
          </a>
        </div>

        <p className={styles.thanks}>
          Gracias a todos los estudiantes, docentes y colegios que participaron
          y compartieron su voz.
        </p>

        <Link href="/" className={styles.backLink}>
          ← Volver al inicio
        </Link>
      </div>
    </section>
  );
}
