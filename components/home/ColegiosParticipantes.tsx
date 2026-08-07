import styles from "./ColegiosParticipantes.module.css";

const COLEGIOS_PARTICIPANTES = [
  { nombre: "Gaudí", logo: "/colegios/gaudi.png" },
  { nombre: "Tolkien", logo: "/colegios/tolkien.png" },
  { nombre: "Tesla", logo: "/colegios/tesla.png" },
  { nombre: "Stevenson", logo: "/colegios/stevenson.png" },
  { nombre: "NSC", logo: "/colegios/nsc.png" },
  { nombre: "Molisano", logo: "/colegios/molisano.png" },
  { nombre: "Marie Curie", logo: "/colegios/marie-curie.png" },
  { nombre: "Ikastola", logo: "/colegios/ikastola.png" },
  { nombre: "Huerto", logo: "/colegios/huerto.png" },
  { nombre: "Dickens", logo: "/colegios/dickens.png" },
  { nombre: "Ameghino", logo: "/colegios/ameghino.png" },
  { nombre: "Amundsen", logo: "/colegios/amundsen.png" },
  { nombre: "Chesterton", logo: "/colegios/chesterton.png" },
  { nombre: "Biró", logo: "/colegios/biro.png" },
];

export default function ColegiosParticipantes() {
  return (
    <section
      className={styles.section}
      aria-labelledby="colegios-participantes"
    >
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.kicker}>Comunidad Active Learning</p>
          <h2 id="colegios-participantes">Colegios que participan</h2>
        </div>

        <div className={styles.logoGrid}>
          {COLEGIOS_PARTICIPANTES.map((colegio) => (
            <div className={styles.logoCard} key={colegio.nombre}>
              <img src={colegio.logo} alt={colegio.nombre} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
