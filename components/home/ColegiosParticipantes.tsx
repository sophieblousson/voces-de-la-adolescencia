import styles from "./ColegiosParticipantes.module.css";

const COLEGIOS_PARTICIPANTES = [
  { nombre: "Gaudí", logo: "/logos/colegios/gaudi.png" },
  { nombre: "Tolkien", logo: "/logos/colegios/tolkien.png" },
  { nombre: "Tesla", logo: "/logos/colegios/tesla.png" },
  { nombre: "Stevenson", logo: "/logos/colegios/stevenson.png" },
  { nombre: "NSC", logo: "/logos/colegios/nsc.png" },
  { nombre: "Molisano", logo: "/logos/colegios/molisano.png" },
  { nombre: "Marie Curie", logo: "/logos/colegios/marie-curie.png" },
  { nombre: "Ikastola", logo: "/logos/colegios/ikastola.png" },
  { nombre: "Huerto", logo: "/logos/colegios/huerto.png" },
  { nombre: "Dickens", logo: "/logos/colegios/dickens.png" },
  { nombre: "Ameghino", logo: "/logos/colegios/ameghino.png" },
  { nombre: "Amundsen", logo: "/logos/colegios/amundsen.png" },
  { nombre: "Chesterton", logo: "/logos/colegios/chesterton.png" },
  { nombre: "Biró", logo: "/logos/colegios/biro.png" },
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
              <img src={colegio.logo} alt={`Logo ${colegio.nombre}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
