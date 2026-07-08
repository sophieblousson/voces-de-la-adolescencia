import Section from "@/components/ui/Section";
import IndiceBases from "@/components/bases/IndiceBases";
import SeccionBases from "@/components/bases/SeccionBases";
import styles from "@/components/bases/Bases.module.css";

export const metadata = {
  title: "Bases y condiciones | Voces de la Adolescencia 2026",
};

export default function BasesPage() {
  return (
    <Section variant="white">
      <p className={styles.pageKicker}>Voces de la Adolescencia 2026</p>
      <h1 className={styles.pageTitle}>Bases y condiciones</h1>

      <div className={styles.resumen}>
        <p className={styles.resumenTitle}>Resumen rápido</p>
        <ul className={styles.resumenList}>
          <li>Estudiantes de 12 a 18 años, de 7N a 12N.</li>
          <li>Participación gratuita, voluntaria e individual.</li>
          <li>Categorías: poesía, cuento breve y ensayo personal.</li>
          <li>Recepción de obras: 1 de septiembre al 30 de octubre de 2026.</li>
          <li>Archivo en Word (.doc/.docx) o PDF editable, sin datos personales.</li>
          <li>No se aceptan obras generadas total o parcialmente con IA.</li>
        </ul>
      </div>

      <IndiceBases />

      <SeccionBases id="sentido" titulo="Sentido de la propuesta">
        <p>
          Voces de la Adolescencia busca promover la escritura literaria y
          personal como experiencia de identidad, pensamiento crítico y
          comunicación, y fortalecer el vínculo entre lectura, escritura,
          revisión y publicación dentro de las escuelas secundarias.
        </p>
        <p>
          También busca reconocer la voz de los adolescentes como una
          producción cultural valiosa dentro de la comunidad educativa, y
          generar una antología digital que reúna textos significativos de
          distintas instituciones.
        </p>
      </SeccionBases>

      <SeccionBases id="categorias" titulo="Categorías">
        <p>
          <strong>Poesía.</strong> Se espera uso expresivo del lenguaje,
          imágenes poéticas, ritmo, voz y sensibilidad. Puede incluir poemas
          breves, series poéticas o poemas visuales.
        </p>
        <p>
          <strong>Cuento breve.</strong> Se espera construcción narrativa,
          conflicto, personajes, atmósfera y cierre significativo. No se
          aceptan fragmentos de novelas ni textos incompletos.
        </p>
        <p>
          <strong>Ensayo personal.</strong> Se espera una mirada propia sobre
          una experiencia, pregunta, problema o tema que interpele al autor.
          Debe combinar reflexión, argumentación y estilo personal.
        </p>
      </SeccionBases>

      <SeccionBases id="tema" titulo="Tema 2026">
        <p>
          “Expresá tu voz. Contá tu historia.” Cada estudiante puede
          abordarlo desde la ficción, la poesía, la experiencia personal o
          la reflexión.
        </p>
      </SeccionBases>

      <SeccionBases id="originalidad" titulo="Originalidad, autoría e IA">
        <ul>
          <li>Las obras deben ser originales y de autoría propia.</li>
          <li>
            No se aceptan textos generados total o parcialmente por
            herramientas de inteligencia artificial.
          </li>
          <li>
            Sí se permite el uso de herramientas digitales de corrección
            ortográfica o edición formal, siempre que no reemplacen la
            producción propia del estudiante.
          </li>
          <li>
            La detección de plagio, copia o autoría no propia podrá implicar
            la descalificación de la obra.
          </li>
        </ul>
      </SeccionBases>

      <SeccionBases id="formato" titulo="Formato de entrega">
        <ul>
          <li>Archivo Word (.doc o .docx) o PDF editable, escrito en español.</li>
          <li>Tipografía legible, tamaño 11 o 12, interlineado simple o 1,15.</li>
          <li>Título de la obra y seudónimo en la primera página.</li>
          <li>
            Datos personales y colegio solo en el formulario de inscripción,
            no dentro del texto, para favorecer una lectura más imparcial.
          </li>
          <li>Las ilustraciones son opcionales.</li>
        </ul>
      </SeccionBases>

      <SeccionBases id="plazos" titulo="Plazos">
        <ul>
          <li>Lanzamiento institucional: primera semana de agosto.</li>
          <li>Inicio de recepción de obras: 1 de septiembre de 2026.</li>
          <li>Cierre de recepción: 30 de octubre de 2026.</li>
          <li>Lectura y evaluación del jurado: 2 al 13 de noviembre de 2026.</li>
          <li>Anuncio de ganadores: lunes 16 de noviembre de 2026.</li>
          <li>Publicación de antología digital: diciembre 2026.</li>
        </ul>
      </SeccionBases>

      <SeccionBases id="evaluacion" titulo="Evaluación">
        <p>
          Los textos serán evaluados por un jurado designado por la
          organización, con una rúbrica común de cinco dimensiones: voz
          propia, construcción del texto, uso del lenguaje, profundidad e
          impacto, y adecuación a la categoría.
        </p>
        <p>
          La ortografía será considerada, pero no podrá pesar más que la
          potencia literaria, reflexiva y expresiva del texto.
        </p>
      </SeccionBases>

      <SeccionBases id="reconocimientos" titulo="Reconocimientos">
        <ul>
          <li>Primer y segundo puesto por categoría.</li>
          <li>
            Menciones especiales: voz emergente, potencia poética, mirada
            crítica, originalidad narrativa e impacto emocional.
          </li>
          <li>Reconocimiento a la institución con mayor participación significativa.</li>
          <li>Publicación de textos seleccionados en una antología digital institucional.</li>
        </ul>
      </SeccionBases>

      <SeccionBases id="derechos" titulo="Derechos de publicación y autorización">
        <p>
          La participación implica la aceptación de las bases y la
          autorización no exclusiva para que Active Learning publique y
          difunda las obras seleccionadas en la antología digital, encuentros
          institucionales, redes sociales o materiales culturales vinculados
          al concurso. La autoría siempre será reconocida.
        </p>
      </SeccionBases>
    </Section>
  );
}
