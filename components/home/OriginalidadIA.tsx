import Section from "@/components/ui/Section";
import styles from "./home.module.css";

export default function OriginalidadIA() {
  return (
    <Section id="originalidad" variant="white">
      <p className={styles.eyebrow}>Originalidad e inteligencia artificial</p>
      <h2 className={styles.heading}>La obra tiene que ser tuya</h2>

      <div className={styles.grid}>
        <p className={styles.lead}>
          Las obras deben ser originales y de autoría propia. Sí se permite
          usar herramientas digitales de corrección ortográfica o edición
          formal, siempre que no reemplacen la producción propia del
          estudiante.
        </p>

        <div className={styles.calloutBox}>
          <p>
            <strong>No se aceptan textos generados total o parcialmente con
            herramientas de inteligencia artificial.</strong> La detección de
            plagio, copia o autoría no propia puede implicar la
            descalificación de la obra.
          </p>
        </div>
      </div>
    </Section>
  );
}
