import Section from "@/components/ui/Section";
import homeStyles from "./home.module.css";
import styles from "./Categorias.module.css";

const CATEGORIAS = [
  {
    nombre: "Poesía",
    descripcion:
      "Uso expresivo del lenguaje, imágenes poéticas, ritmo y sensibilidad. Admite poemas breves, series poéticas o poemas visuales.",
    color: "var(--color-celeste)",
  },
  {
    nombre: "Cuento breve",
    descripcion:
      "Construcción narrativa, conflicto, personajes, atmósfera y un cierre significativo. No se aceptan fragmentos de novelas ni textos incompletos.",
    color: "var(--color-verde)",
  },
  {
    nombre: "Ensayo personal",
    descripcion:
      "Una mirada propia sobre una experiencia, pregunta o tema que interpele al autor, combinando reflexión, argumentación y estilo personal.",
    color: "var(--color-amarillo)",
  },
];

export default function Categorias() {
  return (
    <Section id="categorias" variant="white">
      <p className={homeStyles.eyebrow}>Categorías</p>
      <h2 className={homeStyles.heading}>Tres formas de contar tu historia</h2>

      <div className={styles.cards}>
        {CATEGORIAS.map((cat) => (
          <article key={cat.nombre} className={styles.card}>
            <span
              className={styles.cardBar}
              style={{ backgroundColor: cat.color }}
              aria-hidden="true"
            />
            <h3 className={styles.cardTitle}>{cat.nombre}</h3>
            <p className={styles.cardText}>{cat.descripcion}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
