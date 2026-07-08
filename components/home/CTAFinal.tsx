import Button from "@/components/ui/Button";
import styles from "./CTAFinal.module.css";

export default function CTAFinal() {
  return (
    <section className={styles.cta}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Tu historia merece ser leída</h2>
        <p className={styles.text}>
          La recepción de obras abre el 1 de septiembre y cierra el 30 de
          octubre de 2026. Revisá las bases y empezá a escribir cuando
          quieras.
        </p>
        <div className={styles.ctas}>
          <Button href="/participar" variant="primary">
            Quiero participar
          </Button>
          <Button href="/bases" variant="outline">
            Ver bases y condiciones
          </Button>
        </div>
      </div>
    </section>
  );
}
