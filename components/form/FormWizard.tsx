"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "./ProgressBar";
import PasoDatosEstudiante from "./PasoDatosEstudiante";
import PasoDatosObra from "./PasoDatosObra";
import PasoDeclaraciones from "./PasoDeclaraciones";
import PasoRevision from "./PasoRevision";

export type WizardData = {
  // Paso 1
  student_name: string;
  student_email: string;
  student_grade: string;
  school: string;
  teacher_name: string;
  // Paso 2
  category: string;
  title: string;
  pseudonym: string;
  file: File | null;
  // Paso 3
  declaration_original: boolean;
  declaration_no_ai: boolean;
  declaration_terms: boolean;
  declaration_evaluation: boolean;
  declaration_publication: boolean;
};

const INITIAL_DATA: WizardData = {
  student_name: "",
  student_email: "",
  student_grade: "",
  school: "",
  teacher_name: "",
  category: "",
  title: "",
  pseudonym: "",
  file: null,
  declaration_original: false,
  declaration_no_ai: false,
  declaration_terms: false,
  declaration_evaluation: false,
  declaration_publication: false,
};

export default function FormWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WizardData>(INITIAL_DATA);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function updateData(patch: Partial<WizardData>) {
    setData((prev) => ({ ...prev, ...patch }));
  }

  function goTo(targetStep: number) {
    setSubmitError(null);
    setStep(targetStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError(null);

    try {
      const formData = new FormData();

      formData.append("student_name", data.student_name);
      formData.append("student_email", data.student_email);
      formData.append("student_grade", data.student_grade);
      formData.append("school", data.school);
      formData.append("teacher_name", data.teacher_name);
      formData.append("category", data.category);
      formData.append("title", data.title);
      formData.append("pseudonym", data.pseudonym);
      formData.append("declaration_original", String(data.declaration_original));
      formData.append("declaration_no_ai", String(data.declaration_no_ai));
      formData.append("declaration_terms", String(data.declaration_terms));
      formData.append("declaration_evaluation", String(data.declaration_evaluation));
      formData.append("declaration_publication", String(data.declaration_publication));

      if (data.file) {
        formData.append("file", data.file, data.file.name);
      }

      const response = await fetch("/api/submissions", {
        method: "POST",
        body: formData,
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        setSubmitError(
          result?.error ?? "No pudimos procesar tu inscripción. Probá de nuevo."
        );
        setSubmitting(false);
        return;
      }

      router.push(`/confirmacion?code=${encodeURIComponent(result.code)}`);
    } catch {
      setSubmitError(
        "No pudimos conectar con el servidor. Revisá tu conexión y probá de nuevo."
      );
      setSubmitting(false);
    }
  }

  return (
    <div>
      <ProgressBar currentStep={step} />

      {step === 1 && (
        <PasoDatosEstudiante
          data={data}
          onChange={updateData}
          onNext={() => goTo(2)}
        />
      )}

      {step === 2 && (
        <PasoDatosObra
          data={data}
          onChange={updateData}
          onNext={() => goTo(3)}
          onBack={() => goTo(1)}
        />
      )}

      {step === 3 && (
        <PasoDeclaraciones
          data={data}
          onChange={updateData}
          onNext={() => goTo(4)}
          onBack={() => goTo(2)}
        />
      )}

      {step === 4 && (
        <PasoRevision
          data={data}
          onEditStep={goTo}
          onSubmit={handleSubmit}
          onBack={() => goTo(3)}
          submitting={submitting}
          submitError={submitError}
        />
      )}
    </div>
  );
}
