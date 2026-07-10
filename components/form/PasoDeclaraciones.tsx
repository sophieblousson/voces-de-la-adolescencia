"use client";

import { useState } from "react";
import type { WizardData } from "./FormWizard";
import styles from "./Form.module.css";

type PasoDeclaracionesProps = {
  data: WizardData;
  onChange: (patch: Partial<WizardData>) => void;
  onNext: () => void;
  onBack: () => void;
};

const DECLARACIONES: {
  key: keyof Pick<
    WizardData,
    | "declaration_original"
    | "declaration_no_ai"
    | "declaration_terms"
    | "declaration_evaluation"
    | "declaration_publication"
  >;
  label: string;
}[] = [
  {
    key: "declaration_original",
    label: "Declaro que la obra es original y de mi autoría.",
  },
  {
    key: "declaration_no_ai",
    label:
      "Declaro que la obra no fue generada total ni parcialmente con inteligencia artificial.",
  },
  {
    key: "declaration_terms",
    label: "Acepto las bases y condiciones del concurso.",
  },
  {
    key: "declaration_evaluation",
    label: "Autorizo la lectura y evaluación de la obra por parte del jurado.",
  },
  {
    key: "declaration_publication",
    label:
      "Autorizo la publicación de obras seleccionadas en la antología digital y materiales institucionales.",
  },
];

export default function PasoDeclaraciones({
  data,
  onChange,
  onNext,
  onBack,
}: PasoDeclaracionesProps) {
  const [showError, setShowError] = useState(false);

  const allChecked = DECLARACIONES.every((d) => data[d.key]);

  function handleNext() {
    if (!allChecked) {
      setShowError(true);
      return;
    }
    setShowError(false);
    onNext();
  }

  return (
    <div className={styles.step}>
      <h1 className={styles.stepTitle}>Declaraciones</h1>
      <p className={styles.stepDescription}>
        Las cinco son obligatorias para poder participar.
      </p>

      <fieldset className={styles.fieldset}>
        {DECLARACIONES.map((d) => (
          <label key={d.key} className={styles.checkboxRow}>
            <input
              type="checkbox"
              checked={data[d.key]}
              onChange={(e) => onChange({ [d.key]: e.target.checked })}
            />
            <span className={styles.checkboxLabel}>{d.label}</span>
          </label>
        ))}
      </fieldset>

      {showError && !allChecked && (
        <p className={styles.errorText} role="alert">
          Tenés que aceptar las 5 declaraciones para continuar.
        </p>
      )}

      <div className={styles.actions}>
        <button
          type="button"
          className={`${styles.button} ${styles.buttonSecondary}`}
          onClick={onBack}
        >
          Atrás
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.buttonPrimary}`}
          onClick={handleNext}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
