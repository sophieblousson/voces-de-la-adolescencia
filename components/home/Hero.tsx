import Link from "next/link";
import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.wrap}>
        <Image
          src="/Landing_Vocesadolescencia2026_AL_1.png"
          alt="Voces de la Adolescencia 2026"
          width={1300}
          height={900}
          className={styles.banner}
          priority
        />

        <div className={styles.ctaRow}>
          <Link href="/participar" className={styles.btnPrimary}>
            Quiero participar →
          </Link>

          <Link href="/bases" className={styles.btnSecondary}>
            Leer las bases
          </Link>
        </div>
      </div>
    </section>
  );
}
