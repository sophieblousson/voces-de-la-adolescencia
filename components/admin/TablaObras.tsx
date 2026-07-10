import Link from "next/link";
import styles from "./Admin.module.css";

type AnyRecord = Record<string, unknown>;

function getText(item: AnyRecord, key: string, fallback = "—") {
  const value = item[key];

  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  return String(value);
}

function getItems(props: AnyRecord): AnyRecord[] {
  const possibleKeys = ["items", "obras", "submissions", "data"];

  for (const key of possibleKeys) {
    const value = props[key];

    if (Array.isArray(value)) {
      return value.filter(
        (item): item is AnyRecord =>
          typeof item === "object" && item !== null && !Array.isArray(item)
      );
    }
  }

  return [];
}

export default function TablaObras(props: AnyRecord) {
  const items = getItems(props);

  if (items.length === 0) {
    return (
      <section className={styles.card}>
        <div className={styles.emptyState}>
          <h2>No hay obras cargadas todavía.</h2>
          <p>
            Cuando los estudiantes envíen sus participaciones, van a aparecer en
            este listado.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <p className={styles.kicker}>Listado</p>
          <h2>Obras recibidas</h2>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Código</th>
              <th>Título</th>
              <th>Categoría</th>
              <th>Estudiante</th>
              <th>Colegio</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => {
              const id = getText(item, "id", "");
              const href = id ? `/admin/obras/${id}` : "/admin/obras";

              return (
                <tr key={id || index}>
                  <td>{getText(item, "code")}</td>
                  <td>{getText(item, "title")}</td>
                  <td>{getText(item, "category")}</td>
                  <td>{getText(item, "student_name")}</td>
                  <td>{getText(item, "school")}</td>
                  <td>{getText(item, "status", "recibido")}</td>
                  <td>
                    <Link href={href}>Ver</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
