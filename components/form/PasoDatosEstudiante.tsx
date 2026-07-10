"use client";

import { useState } from "react";
import { studentSchema } from "@/lib/validations/submission.schema";
import type { WizardData } from "./FormWizard";
import styles from "./Form.module.css";

type PasoDatosEstudianteProps = {
  data: WizardData;
  onChange: (patch: Partial<WizardData>) => void;
  onNext: () => void;
};

type Errors = Partial<Record<keyof WizardData, string>>;

export default function PasoDatosEstudiante({
  data,
  onChange,
  onNext,
}: PasoDatosEstudianteProps) {
  const [errors, setErrors] = useState<Errors>({});

  function handleNext() {
    const result = studentSchema.safeParse({
      student_name: data.student_name,
      student_email: data.student_email,
      student_age: data.student_age,
      student_grade: data.student_grade,
      school: data.school,
      teacher_name: data.teacher_name,
      responsible_adult_name: data.responsible_adult_name,
      responsible_adult_email: data.responsible_adult_email,
    });

    if (!result.success) {
      const nextErrors: Errors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof WizardData;
        if (!nextErrors[field]) nextErrors[field] = issue.message;
      }
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    onNext();
  }

  return (
    <div className={styles.step}>
      <h1 className={styles.stepTitle}>Tus datos</h1>
      <p className={styles.stepDescription}>
        Estos datos quedan solo en el formulario de inscripción, nunca dentro
        del archivo de la obra.
      </p>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="student_name">
          Nombre y apellido
        </label>
        <input
          id="student_name"
          className={`${styles.input} ${errors.student_name ? styles.inputError : ""}`}
          value={data.student_name}
          onChange={(e) => onChange({ student_name: e.target.value })}
        />
        {errors.student_name && <p className={styles.errorText}>{errors.student_name}</p>}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="student_email">
            Email
          </label>
          <input
            id="student_email"
            type="email"
            className={`${styles.input} ${errors.student_email ? styles.inputError : ""}`}
            value={data.student_email}
            onChange={(e) => onChange({ student_email: e.target.value })}
          />
          {errors.student_email && <p className={styles.errorText}>{errors.student_email}</p>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="student_age">
            Edad
          </label>
          <input
            id="student_age"
            type="number"
            inputMode="numeric"
            className={`${styles.input} ${errors.student_age ? styles.inputError : ""}`}
            value={data.student_age}
            onChange={(e) => onChange({ student_age: e.target.value })}
          />
          {errors.student_age && <p className={styles.errorText}>{errors.student_age}</p>}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="student_grade">
            Curso / año
          </label>
          <input
            id="student_grade"
            className={`${styles.input} ${errors.student_grade ? styles.inputError : ""}`}
            placeholder="Ej: 9N"
            value={data.student_grade}
            onChange={(e) => onChange({ student_grade: e.target.value })}
          />
          {errors.student_grade && <p className={styles.errorText}>{errors.student_grade}</p>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="school">
            Colegio
          </label>
          <input
            id="school"
            className={`${styles.input} ${errors.school ? styles.inputError : ""}`}
            value={data.school}
            onChange={(e) => onChange({ school: e.target.value })}
          />
          {errors.school && <p className={styles.errorText}>{errors.school}</p>}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="teacher_name">
          Docente referente <span className={styles.optional}>(opcional)</span>
        </label>
        <input
          id="teacher_name"
          className={styles.input}
          value={data.teacher_name}
          onChange={(e) => onChange({ teacher_name: e.target.value })}
        />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="responsible_adult_name">
            Adulto responsable <span className={styles.optional}>(si corresponde)</span>
          </label>
          <input
            id="responsible_adult_name"
            className={styles.input}
            value={data.responsible_adult_name}
            onChange={(e) => onChange({ responsible_adult_name: e.target.value })}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="responsible_adult_email">
            Email del adulto responsable <span className={styles.optional}>(si corresponde)</span>
          </label>
          <input
            id="responsible_adult_email"
            type="email"
            className={`${styles.input} ${errors.responsible_adult_email ? styles.inputError : ""}`}
            value={data.responsible_adult_email}
            onChange={(e) => onChange({ responsible_adult_email: e.target.value })}
          />
          {errors.responsible_adult_email && (
            <p className={styles.errorText}>{errors.responsible_adult_email}</p>
          )}
        </div>
      </div>

      <div className={`${styles.actions} ${styles.actionsEnd}`}>
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
