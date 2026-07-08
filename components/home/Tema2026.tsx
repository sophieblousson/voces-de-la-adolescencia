import Section from "@/components/ui/Section";
import styles from "./home.module.css";

export default function Tema2026() {
  return (
    <Section id="tema-2026" variant="alt">
      <p className={styles.eyebrow}>Tema 2026</p>
      <h2 className={styles.heading}>“Expresá tu voz. Contá tu historia.”</h2>
      <p className={styles.lead}>
        Cada estudiante puede abordar el tema desde la ficción, la poesía, la
        experiencia personal o la reflexión. No hay una única forma correcta
        de contar una historia: lo que se evalúa es la voz propia detrás del
        texto, no un formato predefinido.
      </p>
    </Section>
  );
}
