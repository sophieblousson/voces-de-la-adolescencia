import Link from "next/link";
import styles from "@/components/bases/Bases.module.css";

export const metadata = {
  title: "Bases y condiciones | Voces de la Adolescencia 2026",
};

export default function BasesPage() {
  return (
    <>
      <section className={styles.pageHead}>
        <div className={styles.wrap}>
          <span className={styles.eyebrow}>
            Active Learning · Concurso literario 2026
          </span>

          <h1>Bases y condiciones</h1>

          <p>
            Todo lo que necesitás saber antes de escribir: para qué existe el
            concurso, cómo se evalúa y qué pasos seguir para enviar tu obra.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionEyebrow}>Por qué existe</p>
          <h2>Sentido de la propuesta</h2>

          <div className={styles.purposeList}>
            <div className={styles.purposeItem}>
              <span className={styles.purposeDot} />
              <p>
                Promover la escritura literaria y personal como experiencia de
                identidad, pensamiento crítico y comunicación.
              </p>
            </div>

            <div className={styles.purposeItem}>
              <span className={styles.purposeDot} />
              <p>
                Fortalecer el vínculo entre lectura, escritura, revisión y
                publicación dentro de las escuelas secundarias.
              </p>
            </div>

            <div className={styles.purposeItem}>
              <span className={styles.purposeDot} />
              <p>
                Reconocer la voz de los adolescentes como una producción
                cultural valiosa dentro de la comunidad educativa.
              </p>
            </div>

            <div className={styles.purposeItem}>
              <span className={styles.purposeDot} />
              <p>
                Generar una antología digital que reúna textos significativos de
                distintas instituciones.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.alt}`}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionEyebrow}>Categorías</p>
          <h2>Qué se espera en cada una</h2>

          <div className={styles.catTable}>
            <div className={`${styles.catRow} ${styles.head}`}>
              <div>Categoría</div>
              <div>Qué se espera</div>
              <div>Observaciones</div>
            </div>

            <div className={styles.catRow}>
              <div>Poesía</div>
              <div>
                Uso expresivo del lenguaje, imágenes poéticas, ritmo, voz y
                sensibilidad.
              </div>
              <div>
                Puede incluir poemas breves, series poéticas o poemas visuales.
              </div>
            </div>

            <div className={styles.catRow}>
              <div>Cuento breve</div>
              <div>
                Construcción narrativa, conflicto, personajes, atmósfera y
                cierre significativo.
              </div>
              <div>
                No se aceptan fragmentos de novelas ni textos incompletos.
              </div>
            </div>

            <div className={styles.catRow}>
              <div>Ensayo personal</div>
              <div>
                Mirada propia sobre una experiencia, pregunta, problema o tema
                que interpela al autor.
              </div>
              <div>Debe combinar reflexión, argumentación y estilo personal.</div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionEyebrow}>Tema 2026</p>
          <h2>Sobre qué escribir</h2>

          <div className={styles.temaQuote}>
            <span>“Expresá tu voz. Contá tu historia.”</span>
            <p>
              Cada estudiante puede abordarlo desde la ficción, la poesía, la
              experiencia personal o la reflexión. No hay una única forma
              correcta: lo que se evalúa es la voz propia detrás del texto, no
              un formato predefinido.
            </p>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.alt}`}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionEyebrow}>
            Originalidad e inteligencia artificial
          </p>
          <h2>La obra tiene que ser tuya</h2>

          <div className={styles.checklist}>
            <div className={styles.checkItem}>
              <span className={styles.checkIcon}>✓</span>
              Las obras deben ser originales y de autoría propia.
            </div>

            <div className={styles.checkItem}>
              <span className={styles.checkIcon}>✓</span>
              Se permite el corrector ortográfico o edición formal, siempre que
              no reemplace tu producción propia.
            </div>

            <div className={`${styles.checkItem} ${styles.warning}`}>
              <span className={styles.warningIcon}>×</span>
              No se aceptan textos generados total o parcialmente con
              inteligencia artificial. La detección de plagio puede implicar la
              descalificación.
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionEyebrow}>Formato de entrega</p>
          <h2>Cómo tiene que llegar tu archivo</h2>

          <div className={styles.checklist}>
            <div className={styles.checkItem}>
              <span className={styles.checkIcon}>✓</span>
              Archivo Word (.doc / .docx) o PDF editable, escrito en español.
            </div>

            <div className={styles.checkItem}>
              <span className={styles.checkIcon}>✓</span>
              Tipografía legible, tamaño 11 o 12, interlineado simple o 1,15.
            </div>

            <div className={styles.checkItem}>
              <span className={styles.checkIcon}>✓</span>
              Título de la obra y seudónimo en la primera página.
            </div>

            <div className={styles.checkItem}>
              <span className={styles.checkIcon}>✓</span>
              Datos personales y colegio solo en el formulario, nunca dentro del
              texto.
            </div>

            <div className={styles.checkItem}>
              <span className={styles.checkIcon}>✓</span>
              Las ilustraciones son opcionales.
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.alt}`}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionEyebrow}>Plazos 2026</p>
          <h2>El camino hasta la antología</h2>

          <div className={styles.timeline}>
            <div className={styles.tlItem}>
              <div className={styles.tlDate}>Primera semana de agosto</div>
              <p>Lanzamiento institucional de la propuesta</p>
            </div>

            <div className={`${styles.tlItem} ${styles.current}`}>
              <div className={styles.tlDate}>
                1 de septiembre — 30 de octubre
              </div>
              <p>Recepción de obras</p>
            </div>

            <div className={styles.tlItem}>
              <div className={styles.tlDate}>2 al 13 de noviembre</div>
              <p>Lectura y evaluación del jurado</p>
            </div>

            <div className={styles.tlItem}>
              <div className={styles.tlDate}>16 de noviembre</div>
              <p>Anuncio de ganadores</p>
              <p className={styles.youtubeNote}>
                En vivo por el canal de YouTube de Active Learning
              </p>
            </div>

            <div className={styles.tlItem}>
              <div className={styles.tlDate}>Diciembre</div>
              <p>Publicación de la antología digital</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionEyebrow}>Evaluación</p>
          <h2>Cómo se lee cada obra</h2>

          <p className={styles.intro}>
            Un jurado designado por la organización evalúa los textos con una
            rúbrica común de cinco dimensiones. La ortografía se tiene en
            cuenta, pero nunca pesa más que la potencia literaria, reflexiva y
            expresiva del texto.
          </p>

          <div className={styles.evalGrid}>
            <div className={styles.evalItem}>
              <span>01</span>
              <div>
                <h3>Voz propia</h3>
                <p>Una perspectiva personal y reconocible detrás del texto.</p>
              </div>
            </div>

            <div className={styles.evalItem}>
              <span>02</span>
              <div>
                <h3>Construcción del texto</h3>
                <p>Estructura, coherencia y organización de la obra.</p>
              </div>
            </div>

            <div className={styles.evalItem}>
              <span>03</span>
              <div>
                <h3>Uso del lenguaje</h3>
                <p>
                  Precisión, riqueza expresiva y recursos propios de la
                  categoría.
                </p>
              </div>
            </div>

            <div className={styles.evalItem}>
              <span>04</span>
              <div>
                <h3>Profundidad / impacto</h3>
                <p>Qué tan lejos llega la reflexión o la experiencia narrada.</p>
              </div>
            </div>

            <div className={`${styles.evalItem} ${styles.full}`}>
              <span>05</span>
              <div>
                <h3>Adecuación a la categoría</h3>
                <p>
                  Que la obra responda a lo esperado en poesía, cuento o ensayo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.prizes}`}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionEyebrow}>Reconocimientos y premios</p>
          <h2>Vale la pena animarse</h2>

          <p className={styles.prizeText}>
            Primer y segundo puesto por categoría, más menciones especiales para
            quienes se destaquen en otros aspectos de su escritura.
          </p>

          <div className={styles.mentions}>
            <span>Voz emergente</span>
            <span>Potencia poética</span>
            <span>Mirada crítica</span>
            <span>Originalidad narrativa</span>
            <span>Impacto emocional</span>
          </div>

          <div className={styles.instNote}>
            Además, la institución con mayor participación significativa recibe
            un reconocimiento a elección dentro de un listado. Todos los textos
            seleccionados se publican en la antología digital institucional.
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionEyebrow}>Derechos de publicación</p>
          <h2>Qué autorizás al participar</h2>

          <div className={styles.rightsBox}>
            La participación implica la aceptación de estas bases y la
            autorización no exclusiva para que Active Learning publique y
            difunda las obras seleccionadas en la antología digital, encuentros
            institucionales, redes sociales o materiales culturales vinculados
            al concurso. La autoría siempre será reconocida. Para estudiantes
            menores de edad, la institución podrá solicitar autorización familiar
            según los circuitos internos de comunicación.
          </div>

          <Link href="/participar" className={styles.finalButton}>
            Quiero participar →
          </Link>
        </div>
      </section>
    </>
  );
}
