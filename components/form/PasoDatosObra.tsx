"use client";

import { useState } from "react";
import { obraSchema } from "@/lib/validations/submission.schema";
import { CATEGORIAS, CATEGORIA_LABELS, OBSERVATIONS_MAX_LENGTH } from "@/lib/constants";
import FileUpload from "./FileUpload";
import type { WizardData } from "./FormWizard";
import styles from "./Form.module.css";

type PasoDatosObraProps = {
  data: WizardData;
  onChange: (patch: Partial<WizardData>) => void;
  onNext: () => void;
  onBack: () => void;
};

type Errors = Partial<Record<keyof WizardData, string>>;

export default function PasoDatosObra({ data, onChange, onNext, onBack }: PasoDatosObraProps) {
  const [errors, setErrors] = useState<Errors>({});
  const [fileError, setFileError] = useState<string | undefined>(undefined);

  function handleNext() {
    const result = obraSchema.safeParse({
      category: data.category,
      title: data.title,
      pseudonym: data.pseudonym,
      word_count: data.word_count,
      observations: data.observations,
    });

    const nextErrors: Errors = {};

    if (!result.success) {
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof WizardData;
        if (!nextErrors[field]) nextErrors[field] = issue.message;
      }
    }

    if (!data.file) {
      setFileError("El archivo con tu obra es obligatorio.");
    } else {
      setFileError(undefined);
    }

    if (Object.keys(nextErrors).length > 0 || !data.file) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    onNext();
  }

  return (
    <div className={styles.step}>
      <h1 className={styles.stepTitle}>Tu obra</h1>
      <p className={styles.stepDescription}>
        La entrega principal es el archivo. Los campos de acá son para
        identificar la obra, no para escribirla.
      </p>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="category">
          Categoría
        </label>
        <select
          id="category"
          className={`${styles.select} ${errors.category ? styles.inputError : ""}`}
          value={data.category}
          onChange={(e) => onChange({ category: e.target.value })}
        >
          <option value="">Elegí una categoría</option>
          {CATEGORIAS.map((cat) => (
            <option key={cat} value={cat}>
              {CATEGORIA_LABELS[cat]}
            </option>
          ))}
        </select>
        {errors.category && <p className={styles.errorText}>{errors.category}</p>}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="title">
            Título de la obra
          </label>
          <input
            id="title"
            className={`${styles.input} ${errors.title ? styles.inputError : ""}`}
            value={data.title}
            onChange={(e) => onChange({ title: e.target.value })}
          />
          {errors.title && <p className={styles.errorText}>{errors.title}</p>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="pseudonym">
            Seudónimo
          </label>
          <input
            id="pseudonym"
            className={`${styles.input} ${errors.pseudonym ? styles.inputError : ""}`}
            value={data.pseudonym}
            onChange={(e) => onChange({ pseudonym: e.target.value })}
          />
          {errors.pseudonym && <p className={styles.errorText}>{errors.pseudonym}</p>}
          <p className={styles.hint}>Así vas a aparecer para el jurado.</p>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="word_count">
          Cantidad aproximada de palabras <span className={styles.optional}>(opcional)</span>
        </label>
        <input
          id="word_count"
          type="number"
          inputMode="numeric"
          className={`${styles.input} ${errors.word_count ? styles.inputError : ""}`}
          value={data.word_count}
          onChange={(e) => onChange({ word_count: e.target.value })}
        />
        {errors.word_count && <p className={styles.errorText}>{errors.word_count}</p>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="observations">
          Observaciones para la organización <span className={styles.optional}>(opcional)</span>
        </label>
        <textarea
          id="observations"
          className={`${styles.textarea} ${errors.observations ? styles.inputError : ""}`}
          value={data.observations}
          maxLength={OBSERVATIONS_MAX_LENGTH}
          onChange={(e) => onChange({ observations: e.target.value })}
          placeholder="Notas breves para el equipo organizador. No es el lugar para pegar tu obra."
        />
        {errors.observations && <p className={styles.errorText}>{errors.observations}</p>}
        <p className={styles.hint}>
          {data.observations.length}/{OBSERVATIONS_MAX_LENGTH} caracteres. Tu
          obra completa va en el archivo adjunto, no acá.
        </p>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Archivo de la obra</label>
        <FileUpload
          file={data.file}
          error={fileError}
          onChange={(file, error) => {
            onChange({ file });
            setFileError(error);
          }}
        />
        <div className={styles.calloutBox} style={{ marginTop: "var(--space-4)" }}>
          <p>
            El archivo va en Word (.doc/.docx) o PDF editable, e incluye
            título y seudónimo en la primera página. <strong>No</strong>{" "}
            incluyas tu nombre ni el colegio dentro del archivo: esos datos
            ya quedaron en el paso anterior.
          </p>
        </div>
      </div>

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
