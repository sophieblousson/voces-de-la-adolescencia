import Section from "@/components/ui/Section";
import styles from "./home.module.css";

const PASOS = [
  {
    numero: "1",
    titulo: "Leé las bases",
    texto: "Revisá categorías, formato de entrega y criterios de evaluación.",
  },
  {
    numero: "2",
    titulo: "Escribí tu obra",
    texto: "Elegí una categoría y trabajá tu texto en un archivo aparte.",
  },
  {
    numero: "3",
    titulo: "Completá el formulario",
    texto: "Tus datos y los de la obra van en el formulario, no en el archivo.",
  },
  {
    numero: "4",
    titulo: "Enviá tu obra",
    texto: "Subí el archivo y recibí un código de participación.",
  },
];

export default function ComoParticipar() {
  return (
    <Section id="como-participar" variant="alt">
      <p className={styles.eyebrow}>Cómo participar</p>
      <h2 className={styles.heading}>Cuatro pasos, sin vueltas</h2>

      <div className={styles.steps}>
        {PASOS.map((paso) => (
          <div key={paso.numero} className={styles.step}>
            <span className={styles.stepNumber}>{paso.numero}</span>
            <p className={styles.stepTitle}>{paso.titulo}</p>
            <p className={styles.stepText}>{paso.texto}</p>
          </div>
        ))}
      </div>

      <div className={styles.calloutBox}>
        <p>
          El archivo se entrega en Word (.doc o .docx) o PDF editable. Debe
          incluir título y seudónimo, pero <strong>no</strong> tus datos
          personales ni el nombre del colegio: esos van solo en el
          formulario, para que la lectura del jurado sea más imparcial.
        </p>
      </div>
    </Section>
  );
}
