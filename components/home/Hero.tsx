import Link from "next/link";
import Logo from "@/components/layout/Logo";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.marginalia} aria-hidden="true">
        ¡anotá la fecha!
        <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
          <path
            d="M2 2C20 20 30 30 55 35"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M46 30 L55 35 L48 38"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      <div className={styles.wrap}>
        <Logo variant="white" size="md" className={styles.heroLogo} />

        <span className={styles.eyebrow}>
          Active Learning · Concurso literario 2026
        </span>

        <h1 className={styles.title}>
          Contá tu historia
          <span>alzá la voz</span>
        </h1>

        <p className={styles.lead}>
          Voces de la Adolescencia invita a estudiantes de 7N a 12N a contar su
          historia en poesía, cuento breve o ensayo personal. Participación
          gratuita e individual.
        </p>

        <div className={styles.ctaRow}>
          <Link href="/participar" className={styles.btnPrimary}>
            Quiero participar →
          </Link>
          <Link href="/bases" className={styles.btnSecondary}>
            Leer las bases
          </Link>
        </div>

        <div className={styles.heroMeta}>
          <div>
            <strong>1 sep — 30 oct</strong>
            <span>Recepción de obras</span>
          </div>
          <div>
            <strong>Compu / E-reader</strong>
            <span>Premios 1° y 2° puesto</span>
          </div>
          <div>
            <strong>7N a 12N</strong>
            <span>Quiénes pueden participar</span>
          </div>
        </div>
      </div>
    </section>
  );
}
