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
    <div className={styles.stepBlock}>
      <div className={styles.blockTitle}>
        <span className={styles.blockNumber}>1</span>

        <div>
          <h2>Tus datos</h2>
          <p>
            Solo los ve la organización, nunca el jurado. Sirven para
            contactarte si tu obra es seleccionada.
          </p>
        </div>
      </div>

      <div className={styles.grid2}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="student_name">
            Nombre y apellido
          </label>

          <input
            id="student_name"
            className={`${styles.input} ${
              errors.student_name ? styles.inputError : ""
            }`}
            value={data.student_name}
            onChange={(e) => onChange({ student_name: e.target.value })}
            placeholder="Tu nombre completo"
          />

          {errors.student_name && (
            <p className={styles.errorText}>{errors.student_name}</p>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="student_email">
            Email institucional
          </label>

          <input
            id="student_email"
            type="email"
            className={`${styles.input} ${
              errors.student_email ? styles.inputError : ""
            }`}
            value={data.student_email}
            onChange={(e) => onChange({ student_email: e.target.value })}
            placeholder="nombre@colegio.edu.ar"
          />

          {errors.student_email && (
            <p className={styles.errorText}>{errors.student_email}</p>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="student_grade">
            Curso
          </label>

          <select
            id="student_grade"
            className={`${styles.select} ${
              errors.student_grade ? styles.inputError : ""
            }`}
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

          {errors.student_grade && (
            <p className={styles.errorText}>{errors.student_grade}</p>
          )}
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
            placeholder="Nombre del colegio"
          />

          {errors.school && <p className={styles.errorText}>{errors.school}</p>}
        </div>

        <div className={`${styles.field} ${styles.full}`}>
          <label className={styles.label} htmlFor="teacher_name">
            Docente referente{" "}
            <span className={styles.optional}>(opcional)</span>
          </label>

          <input
            id="teacher_name"
            className={styles.input}
            value={data.teacher_name}
            onChange={(e) => onChange({ teacher_name: e.target.value })}
            placeholder="Nombre del docente que acompaña la participación"
          />
        </div>
      </div>

      <div className={`${styles.actions} ${styles.actionsEnd}`}>
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
