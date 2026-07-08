import styles from "./Section.module.css";

type SectionProps = {
  id?: string;
  variant?: "white" | "alt";
  className?: string;
  children: React.ReactNode;
};

/**
 * Wrapper de sección. Centraliza el fondo (blanco o gris muy claro) y el
 * ancho máximo del contenido para que las 10+ secciones de la landing
 * y de /bases mantengan el mismo ritmo vertical sin repetir CSS.
 */
export default function Section({
  id,
  variant = "white",
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={[styles.section, variant === "alt" ? styles.alt : "", className]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.container}>{children}</div>
    </section>
  );
}
