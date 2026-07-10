import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import styles from "./confirmacion.module.css";

export const metadata = {
  title: "Confirmación | Voces de la Adolescencia 2026",
};

type ConfirmacionPageProps = {
  searchParams: { code?: string };
};

export default function ConfirmacionPage({ searchParams }: ConfirmacionPageProps) {
  const code = searchParams.code?.trim();

  if (!code) {
    return (
      <Section variant="white">
        <div className={styles.wrapper}>
          <h1 className={styles.title}>No encontramos tu código</h1>
          <p className={styles.text}>
            Si ya enviaste tu obra, revisá el email con el que te
            registraste o volvé a intentar el envío. Si el problema
            persiste, contactá al equipo organizador.
          </p>
          <div className={styles.ctas}>
            <Button href="/participar" variant="primary">
              Ir al formulario
            </Button>
            <Button href="/" variant="outline">
              Volver al inicio
            </Button>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section variant="white">
      <div className={styles.wrapper}>
        <p className={styles.eyebrow}>¡Listo!</p>
        <h1 className={styles.title}>Tu obra fue enviada</h1>
        <p className={styles.text}>
          Guardá este código: lo vas a necesitar para cualquier consulta
          sobre tu participación.
        </p>

        <div className={styles.codeBox}>
          <p className={styles.codeLabel}>Código de participación</p>
          <p className={styles.code}>{code}</p>
        </div>

        <p className={styles.reminder}>
          Recomendamos hacer una captura de pantalla o anotarlo en un lugar
          seguro. No lo vamos a reenviar por otro medio.
        </p>

        <div className={styles.ctas}>
          <Button href="/" variant="primary">
            Volver al inicio
          </Button>
          <Button href="/participar" variant="outline">
            Enviar otra obra
          </Button>
        </div>
      </div>
    </Section>
  );
}
