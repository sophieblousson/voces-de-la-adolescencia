import Section from "@/components/ui/Section";
import homeStyles from "./home.module.css";
import styles from "./FechasImportantes.module.css";

const FECHAS = [
  { fecha: "Primera semana de agosto", evento: "Lanzamiento institucional" },
  { fecha: "1 de septiembre de 2026", evento: "Inicio de recepción de obras" },
  { fecha: "30 de octubre de 2026", evento: "Cierre de recepción" },
  { fecha: "2 al 13 de noviembre de 2026", evento: "Lectura y evaluación del jurado" },
  { fecha: "16 de noviembre de 2026", evento: "Anuncio de ganadores" },
  { fecha: "Diciembre de 2026", evento: "Publicación de la antología digital" },
];

export default function FechasImportantes() {
  return (
    <Section id="fechas" variant="white">
      <p className={homeStyles.eyebrow}>Fechas importantes</p>
      <h2 className={homeStyles.heading}>El camino hasta la antología</h2>

      <ol className={styles.timeline}>
        {FECHAS.map((item) => (
          <li key={item.evento} className={styles.item}>
            <span className={styles.dot} aria-hidden="true" />
            <div>
              <p className={styles.fecha}>{item.fecha}</p>
              <p className={styles.evento}>{item.evento}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
