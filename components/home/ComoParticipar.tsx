import Section from "@/components/ui/Section";
import styles from "./home.module.css";

const PASOS = [
  {
    numero: "1",
    titulo: "Leé las bases",
    texto:
      "Revisá categorías, formato de entrega y criterios de evaluación antes de escribir.",
  },
  {
    numero: "2",
    titulo: "Escribí tu obra",
    texto:
      "Elegí una categoría y trabajá tu texto en un archivo aparte, sin tu nombre ni el del colegio.",
  },
  {
    numero: "3",
    titulo: "Completá tus datos",
    texto:
      "Tu nombre, curso, colegio y email institucional van en el formulario, no en el archivo.",
  },
  {
    numero: "4",
    titulo: "Enviá tu obra",
    texto:
      "Subí el archivo desde la web y recibí tu código de participación. Podés enviar más de una obra.",
  },
];

export default function ComoParticipar() {
  return (
    <Section id="como-participar" variant="white">
      <div className={styles.sectionInner}>
        <p className={styles.sectionEyebrow}>Sin vueltas</p>

        <h2 className={styles.sectionTitle}>Cómo participar</h2>

        <div className={styles.steps}>
          {PASOS.map((paso) => (
            <div key={paso.numero} className={styles.step}>
              <span className={styles.stepNumber}>{paso.numero}</span>

              <div>
                <h3 className={styles.stepTitle}>{paso.titulo}</h3>
                <p className={styles.stepText}>{paso.texto}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.calloutBox}>
          <p>
            El archivo se entrega en Word (.doc o .docx) o PDF editable. Debe
            incluir título y seudónimo, pero <strong>no</strong> tus datos
            personales ni el nombre del colegio: esos van solo en el formulario,
            para que la lectura del jurado sea más imparcial.
          </p>
        </div>
      </div>
    </Section>
  );
}
