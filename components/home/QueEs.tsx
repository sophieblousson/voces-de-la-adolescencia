import Section from "@/components/ui/Section";
import styles from "./home.module.css";

export default function QueEs() {
  return (
    <Section id="que-es" variant="white">
      <p className={styles.eyebrow}>Qué es Voces de la Adolescencia</p>
      <h2 className={styles.heading}>
        Un espacio para que la voz adolescente se escuche
      </h2>
      <div className={styles.grid}>
        <p className={styles.lead}>
          Voces de la Adolescencia es el concurso literario institucional de
          Active Learning. Invita a estudiantes de 7N a 12N a escribir desde
          la ficción, la poesía, la experiencia personal o la reflexión, y
          busca reconocer esa producción como algo valioso dentro de la
          comunidad educativa.
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <span className={styles.bullet} aria-hidden="true" />
            <span>
              Promueve la escritura literaria y personal como experiencia de
              identidad, pensamiento crítico y comunicación.
            </span>
          </li>
          <li className={styles.listItem}>
            <span className={styles.bullet} aria-hidden="true" />
            <span>
              Fortalece el vínculo entre lectura, escritura, revisión y
              publicación dentro de las escuelas secundarias.
            </span>
          </li>
          <li className={styles.listItem}>
            <span className={styles.bullet} aria-hidden="true" />
            <span>
              Reúne los textos seleccionados en una antología digital de
              distintas instituciones.
            </span>
          </li>
        </ul>
      </div>
    </Section>
  );
}
