import FormWizard from "@/components/form/FormWizard";
import styles from "@/components/form/ParticiparPage.module.css";

export const metadata = {
  title: "Participar | Voces de la Adolescencia 2026",
};

export default function ParticiparPage() {
  return (
    <>
      <section className={styles.pageHead}>
        <div className={styles.wrap}>
          <span className={styles.eyebrow}>
            Active Learning · Concurso literario 2026
          </span>

          <h1>Enviá tu obra</h1>

          <p>
            Completá el formulario, subí tu archivo y listo: no necesitás nada
            más. Revisá que el archivo no tenga tu nombre ni el de tu colegio;
            esos datos van solo en el formulario.
          </p>
        </div>
      </section>

      <section className={styles.formSection}>
        <div className={styles.formShell}>
          <div className={styles.formCard}>
            <FormWizard />
          </div>

          <aside className={styles.sidebar}>
            <div className={`${styles.sideCard} ${styles.dates}`}>
              <h2>Recepción de obras</h2>
              <p>
                <strong>1 sep — 30 oct 2026</strong>
                Después de esta fecha el formulario se cierra automáticamente.
              </p>
            </div>

            <div className={styles.sideCard}>
              <h2>Antes de enviar</h2>
              <ul>
                <li>Podés participar las veces que quieras, con obras distintas.</li>
                <li>Título y seudónimo en la primera página del archivo.</li>
                <li>Sin nombre propio ni del colegio en el texto.</li>
                <li>Tipografía legible, tamaño 11 o 12.</li>
              </ul>
            </div>

            <div className={styles.sideCard}>
              <h2>¿Dudas?</h2>
              <ul>
                <li>Revisá las bases completas.</li>
                <li>Consultá con tu docente de Lengua.</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
