import styles from "./ProgressBar.module.css";

const PASOS = ["Tus datos", "Tu obra", "Declaraciones", "Revisión"];

type ProgressBarProps = {
  currentStep: number; // 1-indexed
};

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  return (
    <ol className={styles.list} aria-label="Progreso del formulario">
      {PASOS.map((label, index) => {
        const stepNumber = index + 1;
        const isDone = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;

        return (
          <li key={label} className={styles.item}>
            <span
              className={`${styles.dot} ${isDone ? styles.dotDone : ""} ${
                isCurrent ? styles.dotCurrent : ""
              }`}
              aria-current={isCurrent ? "step" : undefined}
            >
              {isDone ? "✓" : stepNumber}
            </span>
            <span className={`${styles.label} ${isCurrent ? styles.labelCurrent : ""}`}>
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
