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

type DeclarationKey = keyof Pick<
  WizardData,
  | "declaration_original"
  | "declaration_no_ai"
  | "declaration_terms"
  | "declaration_evaluation"
  | "declaration_publication"
>;

const DECLARACIONES: {
  key: DeclarationKey;
  label: string;
  description: string;
}[] = [
  {
    key: "declaration_original",
    label: "Originalidad",
    description: "Declaro que la obra es original y de mi autoría.",
  },
  {
    key: "declaration_no_ai",
    label: "Inteligencia artificial",
    description:
      "Declaro que la obra no fue generada total ni parcialmente con inteligencia artificial.",
  },
  {
    key: "declaration_terms",
    label: "Bases y condiciones",
    description: "Acepto las bases y condiciones del concurso.",
  },
  {
    key: "declaration_evaluation",
    label: "Lectura del jurado",
    description:
      "Autorizo la lectura y evaluación de la obra por parte del jurado.",
  },
  {
    key: "declaration_publication",
    label: "Publicación institucional",
    description:
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

  const allChecked = DECLARACIONES.every((declaracion) => data[declaracion.key]);

  function handleNext() {
    if (!allChecked) {
      setShowError(true);
      return;
    }

    setShowError(false);
    onNext();
  }

  return (
    <div className={styles.stepBlock}>
      <div className={styles.blockTitle}>
        <span className={styles.blockNumber}>4</span>

        <div>
          <h2>Declaraciones</h2>
          <p>
            Estas confirmaciones son obligatorias para poder participar. Protegen
            la autoría de tu obra y ordenan la evaluación.
          </p>
        </div>
      </div>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Confirmaciones obligatorias</legend>

        {DECLARACIONES.map((declaracion) => (
          <label key={declaracion.key} className={styles.checkboxRow}>
            <input
              type="checkbox"
              checked={data[declaracion.key]}
              onChange={(e) =>
                onChange({ [declaracion.key]: e.target.checked })
              }
            />

            <span className={styles.checkboxText}>
              <strong>{declaracion.label}</strong>
              <span>{declaracion.description}</span>
            </span>
          </label>
        ))}
      </fieldset>

      {showError && !allChecked && (
        <div className={styles.submitError} role="alert">
          <p>Tenés que aceptar las 5 declaraciones para continuar.</p>
        </div>
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
          Siguiente →
        </button>
      </div>
    </div>
  );
}
