import styles from "./Bases.module.css";

const ITEMS = [
  { href: "#sentido", label: "Sentido de la propuesta" },
  { href: "#categorias", label: "Categorías" },
  { href: "#tema", label: "Tema 2026" },
  { href: "#originalidad", label: "Originalidad, autoría e IA" },
  { href: "#formato", label: "Formato de entrega" },
  { href: "#plazos", label: "Plazos" },
  { href: "#evaluacion", label: "Evaluación" },
  { href: "#reconocimientos", label: "Reconocimientos" },
  { href: "#derechos", label: "Derechos de publicación" },
];

export default function IndiceBases() {
  return (
    <nav className={styles.indice} aria-label="Índice de bases y condiciones">
      <p className={styles.indiceTitle}>Índice</p>
      <ul className={styles.indiceList}>
        {ITEMS.map((item) => (
          <li key={item.href}>
            <a className={styles.indiceLink} href={item.href}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
