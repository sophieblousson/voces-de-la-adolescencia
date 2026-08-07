import Link from "next/link";
import Logo from "./Logo";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Logo variant="white" size="md" className={styles.logo} />

        <nav className={styles.links} aria-label="Navegación secundaria">
          <Link href="/">Inicio</Link>
          <Link href="/bases">Bases</Link>
          <Link href="/participar">Participar</Link>
        </nav>

        <p className={styles.copy}>
          Voces de la Adolescencia 2026 · Un concurso literario institucional de
          Active Learning
        </p>
      </div>
    </footer>
  );
}
