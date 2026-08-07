import Link from "next/link";
import styles from "./CTAFinal.module.css";

export default function CTAFinal() {
  return (
    <section className={styles.cta}>
      <div className={styles.inner}>
        <p className={styles.script}>
          ¡Animate a escribir eso que merece ser leído!
        </p>

        <Link href="/participar" className={styles.button}>
          Quiero participar →
        </Link>
      </div>
    </section>
  );
}
