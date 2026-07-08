import styles from "./Bases.module.css";

type SeccionBasesProps = {
  id: string;
  titulo: string;
  children: React.ReactNode;
};

export default function SeccionBases({ id, titulo, children }: SeccionBasesProps) {
  return (
    <div id={id} className={styles.seccion}>
      <h2 className={styles.seccionTitle}>{titulo}</h2>
      <div className={styles.seccionBody}>{children}</div>
    </div>
  );
}
