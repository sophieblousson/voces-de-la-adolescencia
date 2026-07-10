import Button from "@/components/ui/Button";
import Countdown from "./Countdown";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.emblem} aria-hidden="true">
            <span>“</span>
          </div>

          <p className={styles.kicker}>
            Active Learning · Concurso literario institucional 2026
          </p>

          <h1 className={styles.title}>Voces de la Adolescencia</h1>

          <p className={styles.lema}>Expresá tu voz. Contá tu historia.</p>

          <p className={styles.lead}>
            Una invitación para que estudiantes de 7N a 12N escriban, compartan
            su mirada y participen con una producción literaria propia en poesía,
            cuento breve o ensayo personal.
          </p>

          <div className={styles.ctas}>
            <Button href="/participar" variant="primary">
              Quiero participar
            </Button>
            <Button href="/bases" variant="outline">
              Leer bases
            </Button>
          </div>

          <div className={styles.meta}>
            <span>Participación gratuita</span>
            <span>Producción individual</span>
            <span>Obra original</span>
          </div>
        </div>

        <aside className={styles.countdownBox} aria-label="Cuenta regresiva">
          <p className={styles.countdownKicker}>Recepción de obras</p>
          <p className={styles.countdownDate}>1 SEP · 30 OCT</p>
          <p className={styles.countdownLabel}>Faltan</p>
          <Countdown />
        </aside>
      </div>
    </section>
  );
}
