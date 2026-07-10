import styles from "./Admin.module.css";

type FichaObraProps = {
  submission?: Record<string, unknown> | null;
  obra?: Record<string, unknown> | null;
  data?: Record<string, unknown> | null;
};

function getValue(
  source: Record<string, unknown> | null | undefined,
  key: string,
  fallback = "—"
) {
  const value = source?.[key];

  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  return String(value);
}

export default function FichaObra({ submission, obra, data }: FichaObraProps) {
  const item = submission ?? obra ?? data ?? null;

  if (!item) {
    return (
      <section className={styles.card}>
        <h2>Obra no encontrada</h2>
        <p>No pudimos cargar la información de esta participación.</p>
      </section>
    );
  }

  return (
    <section className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <p className={styles.kicker}>Detalle de obra</p>
          <h1>{getValue(item, "title", "Sin título")}</h1>
        </div>

        <span className={styles.badge}>
          {getValue(item, "status", "recibido")}
        </span>
      </div>

      <div className={styles.detailGrid}>
        <div>
          <h3>Datos de la obra</h3>

          <dl className={styles.detailList}>
            <div>
              <dt>Código</dt>
              <dd>{getValue(item, "code")}</dd>
            </div>

            <div>
              <dt>Categoría</dt>
              <dd>{getValue(item, "category")}</dd>
            </div>

            <div>
              <dt>Seudónimo</dt>
              <dd>{getValue(item, "pseudonym")}</dd>
            </div>

            <div>
              <dt>Archivo</dt>
              <dd>{getValue(item, "file_name", "Sin archivo")}</dd>
            </div>
          </dl>
        </div>

        <div>
          <h3>Datos del estudiante</h3>

          <dl className={styles.detailList}>
            <div>
              <dt>Nombre</dt>
              <dd>{getValue(item, "student_name")}</dd>
            </div>

            <div>
              <dt>Email</dt>
              <dd>{getValue(item, "student_email")}</dd>
            </div>

            <div>
              <dt>Curso</dt>
              <dd>{getValue(item, "student_grade")}</dd>
            </div>

            <div>
              <dt>Colegio</dt>
              <dd>{getValue(item, "school")}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className={styles.notice}>
        Esta es una vista inicial del detalle. La edición de estado, notas
        internas y descarga de archivo se completará en la etapa de admin.
      </div>
    </section>
  );
}
