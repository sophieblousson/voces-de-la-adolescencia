import styles from "./Admin.module.css";

export default function FiltrosObras(_props: Record<string, unknown>) {
  return (
    <section className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <p className={styles.kicker}>Filtros</p>
          <h2>Buscar obras</h2>
        </div>
      </div>

      <form className={styles.filters} method="GET">
        <label>
          <span>Buscar</span>
          <input
            type="search"
            name="q"
            placeholder="Código, título, estudiante o colegio"
          />
        </label>

        <label>
          <span>Categoría</span>
          <select name="categoria" defaultValue="">
            <option value="">Todas</option>
            <option value="poesia">Poesía</option>
            <option value="cuento_breve">Cuento breve</option>
            <option value="ensayo_personal">Ensayo personal</option>
          </select>
        </label>

        <label>
          <span>Estado</span>
          <select name="estado" defaultValue="">
            <option value="">Todos</option>
            <option value="recibido">Recibido</option>
            <option value="en_revision">En revisión</option>
            <option value="preseleccionado">Preseleccionado</option>
            <option value="finalista">Finalista</option>
            <option value="ganador">Ganador</option>
            <option value="descartado">Descartado</option>
          </select>
        </label>

        <button type="submit">Aplicar filtros</button>
      </form>
    </section>
  );
}
