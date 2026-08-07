"use client";

import { useState, type FormEvent } from "react";
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

type DeclarationKey =
  | "declaration_original"
  | "declaration_no_ai"
  | "declaration_terms"
  | "declaration_evaluation"
  | "declaration_publication";

const DECLARACIONES: {
  key: DeclarationKey;
  title: string;
  text: string;
}[] = [
  {
    key: "declaration_original",
    title: "Originalidad",
    text: "Declaro que la obra es original y de mi autoría.",
  },
  {
    key: "declaration_no_ai",
    title: "Inteligencia artificial",
    text: "Declaro que la obra no fue generada total ni parcialmente con inteligencia artificial.",
  },
  {
    key: "declaration_terms",
    title: "Bases y condiciones",
    text: "Acepto las bases y condiciones del concurso.",
  },
  {
    key: "declaration_evaluation",
    title: "Lectura del jurado",
    text: "Autorizo la lectura y evaluación de la obra por parte del jurado.",
  },
  {
    key: "declaration_publication",
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

  const declaracionesAceptadas = DECLARACIONES.every(
    (declaracion) => data[declaracion.key]
  );

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
      subcategory: data.subcategory,
      title: data.title,
      pseudonym: data.pseudonym,
    });

    if (!obraResult.success) {
      for (const issue of obraResult.error.issues) {
        const field = issue.path[0] as keyof WizardData;
        if (!nextErrors[field]) nextErrors[field] = issue.message;
      }
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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
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
              onChange={(event) =>
                updateData({ student_name: event.target.value })
              }
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
              onChange={(event) =>
                updateData({ student_email: event.target.value })
              }
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
              onChange={(event) =>
                updateData({ student_grade: event.target.value })
              }
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
              onChange={(event) => updateData({ school: event.target.value })}
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
              onChange={(event) =>
                updateData({ teacher_name: event.target.value })
              }
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
            <p>
              Seleccioná la categoría, el tema específico y los datos del texto.
            </p>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.field}>
            <label htmlFor="category">Categoría</label>

            <select
              id="category"
              value={data.category}
              onChange={(event) =>
                updateData({
                  category: event.target.value,
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
              onChange={(event) =>
                updateData({ subcategory: event.target.value })
              }
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
              onChange={(event) => updateData({ title: event.target.value })}
              placeholder="El nombre de tu texto"
              className={errors.title ? styles.inputError : ""}
            />

            {errors.title && (
              <p className={styles.errorText}>{errors.title}</p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="pseudonym">Seudónimo</label>

            <input
              id="pseudonym"
              value={data.pseudonym}
              onChange={(event) =>
                updateData({ pseudonym: event.target.value })
              }
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
            <h3>Originalidad y autorización</h3>
            <p>Una confirmación simple antes de enviar tu obra.</p>
          </div>
        </div>

        <div className={styles.consentBox}>
          <label className={styles.consentCheck}>
            <input
              type="checkbox"
              checked={declaracionesAceptadas}
              onChange={(event) => {
                const checked = event.target.checked;

                updateData({
                  declaration_original: checked,
                  declaration_no_ai: checked,
                  declaration_terms: checked,
                  declaration_evaluation: checked,
                  declaration_publication: checked,
                });
              }}
            />

            <span>
              Confirmo que esta obra es original, que no fue generada con
              inteligencia artificial y que acepto las bases del concurso.
            </span>
          </label>

          <p className={styles.consentText}>
            Al enviar la participación, autorizás la lectura de la obra por
            parte del jurado y, si resulta seleccionada, su publicación en la
            antología digital y materiales institucionales de Active Learning.
            La autoría siempre será reconocida.
          </p>
        </div>

        {DECLARACIONES.some((declaracion) => errors[declaracion.key]) && (
          <p className={styles.errorText}>
            Tenés que aceptar esta confirmación para enviar tu obra.
          </p>
        )}
      </section>

      <div className={styles.finalBox}>
        <div className={styles.finalContent}>
          <p className={styles.finalKicker}>Último paso</p>

          <h3 className={styles.finalTitle}>
            Revisá y enviá tu participación
          </h3>

          <p className={styles.finalText}>
            Antes de enviar, verificá que el archivo sea el correcto y que hayas
            elegido bien la categoría y el tema específico. Al finalizar, vas a
            recibir un código de confirmación.
          </p>

          <ul className={styles.finalChecklist}>
            <li>El archivo no incluye tu nombre ni el colegio.</li>
            <li>El título y el seudónimo están en la primera página.</li>
            <li>La confirmación de originalidad fue aceptada.</li>
          </ul>
        </div>

        <div className={styles.finalAction}>
          <button type="submit" disabled={submitting}>
            {submitting ? "Enviando…" : "Enviar participación →"}
          </button>

          <p>El envío puede tardar unos segundos.</p>
        </div>
      </div>
    </form>
  );
}
