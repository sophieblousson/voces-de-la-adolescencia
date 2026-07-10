"use client";

import { useState } from "react";
import { studentSchema } from "@/lib/validations/submission.schema";
import { GRADOS } from "@/lib/constants";
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
      student_grade: data.student_grade,
      school: data.school,
      teacher_name: data.teacher_name,
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

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="student_grade">
            Curso / año
          </label>
          <select
            id="student_grade"
            className={`${styles.select} ${errors.student_grade ? styles.inputError : ""}`}
            value={data.student_grade}
            onChange={(e) => onChange({ student_grade: e.target.value })}
          >
            <option value="">Elegí tu curso</option>
            {GRADOS.map((grado) => (
              <option key={grado} value={grado}>
                {grado}
              </option>
            ))}
          </select>
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
