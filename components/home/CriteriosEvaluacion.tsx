import Section from "@/components/ui/Section";
import homeStyles from "./home.module.css";
import styles from "./CriteriosEvaluacion.module.css";

const CRITERIOS = [
  { titulo: "Voz propia", texto: "Una perspectiva personal y reconocible detrás del texto." },
  { titulo: "Construcción del texto", texto: "Estructura, coherencia y organización de la obra." },
  { titulo: "Uso del lenguaje", texto: "Precisión, riqueza expresiva y recursos propios de la categoría." },
  { titulo: "Profundidad / impacto", texto: "Qué tan lejos llega la reflexión o la experiencia narrada." },
  { titulo: "Adecuación a la categoría", texto: "Que la obra responda a lo esperado en poesía, cuento o ensayo." },
];

export default function CriteriosEvaluacion() {
  return (
    <Section id="evaluacion" variant="alt">
      <p className={homeStyles.eyebrow}>Criterios de evaluación</p>
      <h2 className={homeStyles.heading}>Cómo se lee cada obra</h2>
      <p className={homeStyles.lead}>
        Un jurado designado por la organización evalúa los textos con una
        rúbrica común de cinco dimensiones. La ortografía se tiene en cuenta,
        pero nunca pesa más que la potencia literaria, reflexiva y expresiva
        del texto.
      </p>

      <div className={styles.grid}>
        {CRITERIOS.map((c, i) => (
          <div key={c.titulo} className={styles.item}>
            <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
            <p className={styles.itemTitle}>{c.titulo}</p>
            <p className={styles.itemText}>{c.texto}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
