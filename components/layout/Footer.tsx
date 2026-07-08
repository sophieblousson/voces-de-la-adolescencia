import Link from "next/link";
import Logo from "./Logo";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandRow}>
          <Logo />
          <div>
            <p className={styles.brand}>Voces de la Adolescencia 2026</p>
            <p className={styles.tagline}>Expresá tu voz. Contá tu historia.</p>
          </div>
        </div>

        <nav className={styles.links}>
          <Link href="/">Inicio</Link>
          <Link href="/bases">Bases y condiciones</Link>
          <Link href="/participar">Participar</Link>
        </nav>

        <p className={styles.org}>
          Un concurso literario institucional de Active Learning, para
          estudiantes de 7N a 12N.
        </p>
      </div>
    </footer>
  );
}
