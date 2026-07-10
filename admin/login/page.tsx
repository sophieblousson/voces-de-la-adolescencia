import LoginForm from "@/components/admin/LoginForm";
import styles from "./login.module.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Ingreso admin | Voces de la Adolescencia 2026",
};

type LoginPageProps = {
  searchParams: { error?: string };
};

export default function AdminLoginPage({ searchParams }: LoginPageProps) {
  const sinPermisos = searchParams.error === "sin-permisos";

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <p className={styles.kicker}>Active Learning</p>
        <h1 className={styles.title}>Panel del equipo organizador</h1>
        <p className={styles.subtitle}>
          Voces de la Adolescencia 2026 — acceso restringido.
        </p>

        {sinPermisos && (
          <p className={styles.warning} role="alert">
            Esa cuenta no tiene permisos de administrador en este proyecto.
          </p>
        )}

        <LoginForm />
      </div>
    </div>
  );
}
