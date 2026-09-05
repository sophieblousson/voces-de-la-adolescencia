import Link from "next/link";
import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.wrap}>
        <div className={styles.bannerWrap}>
          <Image
            src="/voces-banner.png"
            alt="Voces 2026 · Tercera edición"
            width={520}
            height={260}
            className={styles.banner}
            priority
          />
        </div>

        <span className={styles.eyebrow}>
          Active Learning · Concurso literario 2026
        </span>

        <h1 className={styles.title}>
          Contá tu historia
          <span>alzá la voz</span>
        </h1>

        <p className={styles.lead}>
          Voces de la Adolescencia invita a estudiantes de 7N a 12N a contar
          su historia en poesía, cuento breve o ensayo personal. Participación
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
            <strong>1 SEP — 30 OCT</strong>
            <span>Recepción de obras</span>
          </div>

          <div>
            <strong>7N A 12N</strong>
            <span>Quiénes pueden participar</span>
          </div>
        </div>
      </div>

      <div className={styles.sideNote}>
        <p className={styles.sideNoteText}>¡anotá la fecha!</p>
        <span className={styles.arrow} aria-hidden="true">
          ↘
        </span>
      </div>
    </section>
  );
}
