import Section from "@/components/ui/Section";
import homeStyles from "./home.module.css";
import styles from "./Categorias.module.css";

const CATEGORIAS = [
  {
    tag: "Poesía",
    nombre: "Poesía",
    descripcion:
      "Uso expresivo del lenguaje, imágenes poéticas, ritmo y sensibilidad. Admite poemas breves, series poéticas o poemas visuales.",
    variante: "sky",
  },
  {
    tag: "Hasta 2500 palabras",
    nombre: "Cuento breve",
    descripcion:
      "Construcción narrativa, conflicto, personajes y un cierre significativo. No se aceptan fragmentos de novelas.",
    variante: "marigold",
  },
  {
    tag: "Reflexión + estilo propio",
    nombre: "Ensayo personal",
    descripcion:
      "Una mirada propia sobre una experiencia o pregunta que te interpele, combinando reflexión y argumentación.",
    variante: "violet",
  },
];

export default function Categorias() {
  return (
    <Section id="categorias" variant="default">
      <div className={homeStyles.sectionInner}>
        <p className={homeStyles.sectionEyebrow}>
          Tres formas de contar tu historia
        </p>

        <h2 className={homeStyles.sectionTitle}>Elegí tu categoría</h2>

        <div className={styles.cards}>
          {CATEGORIAS.map((categoria) => (
            <article
              key={categoria.nombre}
              className={`${styles.card} ${styles[categoria.variante]}`}
            >
              <span className={styles.tag}>{categoria.tag}</span>
              <h3>{categoria.nombre}</h3>
              <p>{categoria.descripcion}</p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
