import Link from "next/link";
import Logo from "./Logo";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.brandLine} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.brandRow}>
          <Logo />
          <div>
            <p className={styles.kicker}>Active Learning</p>
            <p className={styles.brand}>Voces de la Adolescencia 2026</p>
            <p className={styles.tagline}>Expresá tu voz. Contá tu historia.</p>
          </div>
        </div>

        <nav className={styles.links} aria-label="Navegación secundaria">
          <Link href="/">Inicio</Link>
          <Link href="/bases">Bases</Link>
          <Link href="/participar">Participar</Link>
        </nav>

        <div className={styles.info}>
          <p>
            Un concurso literario institucional de Active Learning, para
            estudiantes de 7N a 12N.
          </p>
          <p className={styles.copy}>© 2026 Active Learning.</p>
        </div>
      </div>
    </footer>
  );
}
