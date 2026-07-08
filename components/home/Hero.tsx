import Button from "@/components/ui/Button";
import Countdown from "./Countdown";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.kicker}>Active Learning · Concurso literario 2026</p>
          <h1 className={styles.title}>Voces de la Adolescencia</h1>
          <p className={styles.lema}>“Expresá tu voz. Contá tu historia.”</p>
          <p className={styles.lead}>
            Un concurso literario institucional para estudiantes de 12 a 18
            años, de 7N a 12N. Participación gratuita, voluntaria e
            individual, en tres categorías: poesía, cuento breve y ensayo
            personal.
          </p>

          <div className={styles.ctas}>
            <Button href="/participar" variant="primary">
              Quiero participar
            </Button>
            <Button href="/bases" variant="outline">
              Leer las bases
            </Button>
          </div>

          <svg
            className={styles.waveform}
            viewBox="0 0 240 32"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 16 L2 16 M20 10 L20 22 M38 4 L38 28 M56 12 L56 20 M74 2 L74 30 M92 14 L92 18 M110 6 L110 26 M128 16 L128 16 M146 8 L146 24 M164 12 L164 20 M182 4 L182 28 M200 14 L200 18 M218 10 L218 22 M236 16 L236 16"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className={styles.countdownBox}>
          <p className={styles.countdownLabel}>Faltan</p>
          <Countdown />
        </div>
      </div>
    </section>
  );
}
