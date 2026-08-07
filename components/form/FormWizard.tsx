"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { studentSchema, obraSchema } from "@/lib/validations/submission.schema";
import { CATEGORIAS, CATEGORIA_LABELS, GRADOS } from "@/lib/constants";
import FileUpload from "./FileUpload";
import styles from "./FormWizard.module.css";

export type WizardData = {
  student_name: string;
  student_email: string;
  student_grade: string;
  school: string;
  teacher_name: string;

  category: string;
  subcategory: string;
  title: string;
  pseudonym: string;
  file: File | null;

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
  subcategory: "",
  title: "",
  pseudonym: "",
  file: null,

  declaration_original: false,
  declaration_no_ai: false,
  declaration_terms: false,
  declaration_evaluation: false,
  declaration_publication: false,
};

type Errors = Partial<Record<keyof WizardData, string>>;

const DECLARACIONES = [
  {
    key: "declaration_original" as const,
    title: "Originalidad",
    text: "Declaro que la obra es original y de mi autoría.",
  },
  {
    key: "declaration_no_ai" as const,
    title: "Inteligencia artificial",
    text: "Declaro que la obra no fue generada total ni parcialmente con inteligencia artificial.",
  },
  {
    key: "declaration_terms" as const,
    title: "Bases y condiciones",
    text: "Acepto las bases y condiciones del concurso.",
  },
  {
    key: "declaration_evaluation" as const,
    title: "Lectura del jurado",
    text: "Autorizo la lectura y evaluación de la obra por parte del jurado.",
  },
  {
    key: "declaration_publication" as const,
    title: "Publicación institucional",
    text: "Autorizo la publicación de obras seleccionadas en la antología digital y materiales institucionales.",
  },
];

const SUBCATEGORIAS = {
  poesia: [
    "Personas y naturaleza",
    "Dolores y alegrías de la libertad personal",
    "El paso del tiempo y nuestra identidad",
  ],
  cuento: [
    "Un hecho histórico argentino contado en primera persona",
    "La verdad tenía otra versión",
    "Un encuentro imposible",
  ],
  ensayo: [
    "Logros y desafíos de la democracia argentina",
    "El impacto del avance tecnológico en la felicidad de las personas",
    "Desafíos de la educación del futuro",
  ],
};

function getCategoriaLabel(category: string) {
  return CATEGORIA_LABELS[category as keyof typeof CATEGORIA_LABELS] ?? "";
}

function getSubcategorias(category: string) {
  const label = getCategoriaLabel(category);

  if (label === "Poesía") return SUBCATEGORIAS.poesia;
  if (label === "Cuento breve") return SUBCATEGORIAS.cuento;
  if (label === "Ensayo personal") return SUBCATEGORIAS.ensayo;

  return [];
}

export default function FormWizard() {
  const router = useRouter();

  const [data, setData] = useState<WizardData>(INITIAL_DATA);
  const [errors, setErrors] = useState<Errors>({});
  const [fileError, setFileError] = useState<string | undefined>(undefined);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const subcategoriasDisponibles = getSubcategorias(data.category);

  function updateData(patch: Partial<WizardData>) {
    setData((prev) => ({ ...prev, ...patch }));
  }

  function validateForm() {
    const nextErrors: Errors = {};

    const studentResult = studentSchema.safeParse({
      student_name: data.student_name,
      student_email: data.student_email,
      student_grade: data.student_grade,
      school: data.school,
      teacher_name: data.teacher_name,
    });

    if (!studentResult.success) {
      for (const issue of studentResult.error.issues) {
        const field = issue.path[0] as keyof WizardData;
        if (!nextErrors[field]) nextErrors[field] = issue.message;
      }
    }

    const obraResult = obraSchema.safeParse({
      category: data.category,
      title: data.title,
      pseudonym: data.pseudonym,
    });

    if (!obraResult.success) {
      for (const issue of obraResult.error.issues) {
        const field = issue.path[0] as keyof WizardData;
        if (!nextErrors[field]) nextErrors[field] = issue.message;
      }
    }

    if (!data.subcategory) {
      nextErrors.subcategory = "Elegí el tema específico de tu obra.";
    }

    if (!data.file) {
      setFileError("El archivo con tu obra es obligatorio.");
    } else {
      setFileError(undefined);
    }

    for (const declaracion of DECLARACIONES) {
      if (!data[declaracion.key]) {
        nextErrors[declaracion.key] = "Esta declaración es obligatoria.";
      }
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0 && Boolean(data.file);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);

    const isValid = validateForm();

    if (!isValid) {
      setSubmitError(
        "Revisá los campos marcados antes de enviar tu participación."
      );
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();

      formData.append("student_name", data.student_name);
      formData.append("student_email", data.student_email);
      formData.append("student_grade", data.student_grade);
      formData.append("school", data.school);
      formData.append("teacher_name", data.teacher_name);
      formData.append("category", data.category);
      formData.append("subcategory", data.subcategory);
      formData.append("title", data.title);
      formData.append("pseudonym", data.pseudonym);
      formData.append("declaration_original", String(data.declaration_original));
      formData.append("declaration_no_ai", String(data.declaration_no_ai));
      formData.append("declaration_terms", String(data.declaration_terms));
      formData.append(
        "declaration_evaluation",
        String(data.declaration_evaluation)
      );
      formData.append(
        "declaration_publication",
        String(data.declaration_publication)
      );

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
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formIntro}>
        <p className={styles.script}>Un solo envío, una obra lista para leer.</p>
        <h2>Formulario de participación</h2>
        <p>
          Completá tus datos, identificá la obra y subí el archivo final. El
          jurado leerá el texto sin tu nombre ni el de tu colegio.
        </p>
      </div>

      {submitError && (
        <div className={styles.submitError} role="alert">
          {submitError}
        </div>
      )}

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <span className={styles.number}>01</span>
          <div>
            <h3>Tus datos</h3>
            <p>Quedan solo en el formulario de inscripción.</p>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.field}>
            <label htmlFor="student_name">Nombre y apellido</label>
            <input
              id="student_name"
              value={data.student_name}
              onChange={(e) => updateData({ student_name: e.target.value })}
              placeholder="Tu nombre completo"
              className={errors.student_name ? styles.inputError : ""}
            />
            {errors.student_name && (
              <p className={styles.errorText}>{errors.student_name}</p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="student_email">Email institucional</label>
            <input
              id="student_email"
              type="email"
              value={data.student_email}
              onChange={(e) => updateData({ student_email: e.target.value })}
              placeholder="nombre@colegio.edu.ar"
              className={errors.student_email ? styles.inputError : ""}
            />
            {errors.student_email && (
              <p className={styles.errorText}>{errors.student_email}</p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="student_grade">Curso</label>
            <select
              id="student_grade"
              value={data.student_grade}
              onChange={(e) => updateData({ student_grade: e.target.value })}
              className={errors.student_grade ? styles.inputError : ""}
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
            <label htmlFor="school">Colegio</label>
            <input
              id="school"
              value={data.school}
              onChange={(e) => updateData({ school: e.target.value })}
              placeholder="Nombre del colegio"
              className={errors.school ? styles.inputError : ""}
            />
            {errors.school && (
              <p className={styles.errorText}>{errors.school}</p>
            )}
          </div>

          <div className={`${styles.field} ${styles.full}`}>
            <label htmlFor="teacher_name">
              Docente referente <span>(opcional)</span>
            </label>
            <input
              id="teacher_name"
              value={data.teacher_name}
              onChange={(e) => updateData({ teacher_name: e.target.value })}
              placeholder="Nombre del docente que acompaña la participación"
            />
          </div>
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <span className={styles.number}>02</span>
          <div>
            <h3>Tu obra</h3>
            <p>Seleccioná la categoría, el tema específico y los datos del texto.</p>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.field}>
            <label htmlFor="category">Categoría</label>
            <select
              id="category"
              value={data.category}
              onChange={(e) =>
                updateData({
                  category: e.target.value,
                  subcategory: "",
                })
              }
              className={errors.category ? styles.inputError : ""}
            >
              <option value="">Elegí una categoría</option>
              {CATEGORIAS.map((cat) => (
                <option key={cat} value={cat}>
                  {CATEGORIA_LABELS[cat]}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className={styles.errorText}>{errors.category}</p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="subcategory">Tema específico</label>
            <select
              id="subcategory"
              value={data.subcategory}
              onChange={(e) => updateData({ subcategory: e.target.value })}
              disabled={!data.category}
              className={errors.subcategory ? styles.inputError : ""}
            >
              <option value="">
                {data.category
                  ? "Elegí el tema de tu obra"
                  : "Primero elegí una categoría"}
              </option>

              {subcategoriasDisponibles.map((tema) => (
                <option key={tema} value={tema}>
                  {tema}
                </option>
              ))}
            </select>
            {errors.subcategory && (
              <p className={styles.errorText}>{errors.subcategory}</p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="title">Título de la obra</label>
            <input
              id="title"
              value={data.title}
              onChange={(e) => updateData({ title: e.target.value })}
              placeholder="El nombre de tu texto"
              className={errors.title ? styles.inputError : ""}
            />
            {errors.title && <p className={styles.errorText}>{errors.title}</p>}
          </div>

          <div className={styles.field}>
            <label htmlFor="pseudonym">Seudónimo</label>
            <input
              id="pseudonym"
              value={data.pseudonym}
              onChange={(e) => updateData({ pseudonym: e.target.value })}
              placeholder="Con qué firmás tu obra"
              className={errors.pseudonym ? styles.inputError : ""}
            />
            {errors.pseudonym && (
              <p className={styles.errorText}>{errors.pseudonym}</p>
            )}
            <p className={styles.hint}>Así aparecerá tu obra ante el jurado.</p>
          </div>
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <span className={styles.number}>03</span>
          <div>
            <h3>Archivo</h3>
            <p>Subí el documento final de tu obra.</p>
          </div>
        </div>

        <FileUpload
          file={data.file}
          error={fileError}
          onChange={(file, error) => {
            updateData({ file });
            setFileError(error);
          }}
        />

        <div className={styles.notice}>
          El archivo debe incluir título y seudónimo en la primera página.
          <strong> No incluyas tu nombre ni el colegio dentro del texto.</strong>
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <span className={styles.number}>04</span>
          <div>
            <h3>Declaraciones</h3>
            <p>Son obligatorias para poder participar.</p>
          </div>
        </div>

        <div className={styles.declarations}>
          {DECLARACIONES.map((declaracion) => (
            <label key={declaracion.key} className={styles.declaration}>
              <input
                type="checkbox"
                checked={data[declaracion.key]}
                onChange={(e) =>
                  updateData({ [declaracion.key]: e.target.checked })
                }
              />

              <span>
                <strong>{declaracion.title}</strong>
                {declaracion.text}
              </span>
            </label>
          ))}
        </div>

        {DECLARACIONES.some((d) => errors[d.key]) && (
          <p className={styles.errorText}>
            Tenés que aceptar las 5 declaraciones para continuar.
          </p>
        )}
      </section>

      <div className={styles.finalBox}>
        <div>
          <p className={styles.finalTitle}>Antes de enviar</p>
          <p>
            Revisá que el archivo sea el correcto. Al enviar, vas a recibir un
            código de confirmación para identificar tu participación.
          </p>
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? "Enviando…" : "Enviar participación →"}
        </button>
      </div>
    </form>
  );
}
