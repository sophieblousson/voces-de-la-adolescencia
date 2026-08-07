"use client";

import { CATEGORIA_LABELS, type Categoria } from "@/lib/constants";
import type { WizardData } from "./FormWizard";
import styles from "./Form.module.css";

type PasoRevisionProps = {
  data: WizardData;
  onEditStep: (step: number) => void;
  onSubmit: () => void;
  onBack: () => void;
  submitting: boolean;
  submitError: string | null;
};

function formatSize(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function PasoRevision({
  data,
  onEditStep,
  onSubmit,
  onBack,
  submitting,
  submitError,
}: PasoRevisionProps) {
  return (
    <div className={styles.stepBlock}>
      <div className={styles.blockTitle}>
        <span className={styles.blockNumber}>5</span>

        <div>
          <h2>Revisá y enviá</h2>
          <p>
            Antes de enviar, confirmá que los datos sean correctos. Una vez
            enviada la participación, la inscripción no se puede editar.
          </p>
        </div>
      </div>

      {submitError && (
        <div className={styles.submitError} role="alert">
          <p>{submitError}</p>
        </div>
      )}

      <div className={styles.summaryBlock}>
        <div className={styles.summaryHeader}>
          <p className={styles.summaryHeading}>Tus datos</p>

          <button
            type="button"
            className={styles.editLink}
            onClick={() => onEditStep(1)}
          >
            Editar
          </button>
        </div>

        <div className={styles.summaryRow}>
          <span className={styles.summaryRowLabel}>Nombre</span>
          <span className={styles.summaryRowValue}>{data.student_name}</span>
        </div>

        <div className={styles.summaryRow}>
          <span className={styles.summaryRowLabel}>Email</span>
          <span className={styles.summaryRowValue}>{data.student_email}</span>
        </div>

        <div className={styles.summaryRow}>
          <span className={styles.summaryRowLabel}>Curso</span>
          <span className={styles.summaryRowValue}>{data.student_grade}</span>
        </div>

        <div className={styles.summaryRow}>
          <span className={styles.summaryRowLabel}>Colegio</span>
          <span className={styles.summaryRowValue}>{data.school}</span>
        </div>

        <div className={styles.summaryRow}>
          <span className={styles.summaryRowLabel}>Docente referente</span>
          <span className={styles.summaryRowValue}>
            {data.teacher_name || "—"}
          </span>
        </div>
      </div>

      <div className={styles.summaryBlock}>
        <div className={styles.summaryHeader}>
          <p className={styles.summaryHeading}>Tu obra</p>

          <button
            type="button"
            className={styles.editLink}
            onClick={() => onEditStep(2)}
          >
            Editar
          </button>
        </div>

        <div className={styles.summaryRow}>
          <span className={styles.summaryRowLabel}>Categoría</span>
          <span className={styles.summaryRowValue}>
            {data.category ? CATEGORIA_LABELS[data.category as Categoria] : "—"}
          </span>
        </div>

        <div className={styles.summaryRow}>
          <span className={styles.summaryRowLabel}>Título</span>
          <span className={styles.summaryRowValue}>{data.title}</span>
        </div>

        <div className={styles.summaryRow}>
          <span className={styles.summaryRowLabel}>Seudónimo</span>
          <span className={styles.summaryRowValue}>{data.pseudonym}</span>
        </div>

        <div className={styles.summaryRow}>
          <span className={styles.summaryRowLabel}>Archivo</span>
          <span className={styles.summaryRowValue}>
            {data.file
              ? `${data.file.name} (${formatSize(data.file.size)})`
              : "—"}
          </span>
        </div>
      </div>

      <div className={styles.summaryBlock}>
        <div className={styles.summaryHeader}>
          <p className={styles.summaryHeading}>Declaraciones</p>

          <button
            type="button"
            className={styles.editLink}
            onClick={() => onEditStep(3)}
          >
            Editar
          </button>
        </div>

        <div className={styles.summaryRow}>
          <span className={styles.summaryRowLabel}>Originalidad</span>
          <span className={styles.summaryRowValue}>Aceptada ✓</span>
        </div>

        <div className={styles.summaryRow}>
          <span className={styles.summaryRowLabel}>No uso de IA generativa</span>
          <span className={styles.summaryRowValue}>Aceptada ✓</span>
        </div>

        <div className={styles.summaryRow}>
          <span className={styles.summaryRowLabel}>Bases y publicación</span>
          <span className={styles.summaryRowValue}>Aceptadas ✓</span>
        </div>
      </div>

      <div className={styles.finalNotice}>
        <p>
          Al enviar, se registrará tu participación y recibirás un código de
          confirmación. Guardalo: es la referencia de tu obra dentro del
          concurso.
        </p>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={`${styles.button} ${styles.buttonSecondary}`}
          onClick={onBack}
          disabled={submitting}
        >
          Atrás
        </button>

        <button
          type="button"
          className={`${styles.button} ${styles.buttonPrimary}`}
          onClick={onSubmit}
          disabled={submitting}
        >
          {submitting ? "Enviando…" : "Enviar participación →"}
        </button>
      </div>
    </div>
  );
}
