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

const DECLARACIONES: Array<{
  key: keyof Pick<
    WizardData,
    | "declaration_original"
    | "declaration_no_ai"
    | "declaration_terms"
    | "declaration_evaluation"
    | "declaration_publication"
  >;
  title: string;
  description: string;
}> = [
  {
    key: "declaration_original",
    title: "Originalidad",
    description: "Declaro que la obra es original y de mi autoría.",
  },
  {
    key: "declaration_no_ai",
    title: "Inteligencia artificial",
    description:
      "Declaro que la obra no fue generada total ni parcialmente con inteligencia artificial.",
  },
  {
    key: "declaration_terms",
    title: "Bases y condiciones",
    description: "Acepto las bases y condiciones del concurso.",
  },
  {
    key: "declaration_evaluation",
    title: "Lectura del jurado",
    description:
      "Autorizo la lectura y evaluación de la obra por parte del jurado.",
  },
  {
    key: "declaration_publication",
    title: "Publicación institucional",
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

  const allChecked = DECLARACIONES.every((item) => data[item.key]);

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
      <div className={styles.stepHeadingRow}>
        <span className={styles.stepNumberBig}>04</span>

        <div>
          <h2 className={styles.stepTitle}>Declaraciones</h2>
          <p className={styles.stepDescription}>
            Son obligatorias para poder participar.
          </p>
        </div>
      </div>

      <div className={styles.declarationList}>
        {DECLARACIONES.map((item) => {
          const checked = data[item.key];

          return (
            <label
              key={item.key}
              className={`${styles.declarationCard} ${
                checked ? styles.declarationCardChecked : ""
              }`}
            >
              <input
                type="checkbox"
                className={styles.declarationInput}
                checked={checked}
                onChange={(e) =>
                  onChange({
                    [item.key]: e.target.checked,
                  } as Partial<WizardData>)
                }
              />

              <span
                className={`${styles.declarationCheckbox} ${
                  checked ? styles.declarationCheckboxChecked : ""
                }`}
                aria-hidden="true"
              >
                {checked ? "✓" : ""}
              </span>

              <span className={styles.declarationContent}>
                <span className={styles.declarationTitle}>{item.title}</span>
                <span className={styles.declarationText}>
                  {item.description}
                </span>
              </span>
            </label>
          );
        })}
      </div>

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
          Siguiente →
        </button>
      </div>
    </div>
  );
}
