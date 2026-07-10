"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import styles from "./AdminNav.module.css";

type AdminNavProps = {
  userEmail: string;
};

export default function AdminNav({ userEmail }: AdminNavProps) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/admin/obras" className={styles.brand}>
          Voces de la Adolescencia · Admin
        </Link>

        <div className={styles.right}>
          <span className={styles.email}>{userEmail}</span>
          <button
            type="button"
            className={styles.logoutButton}
            onClick={handleLogout}
            disabled={loggingOut}
          >
            {loggingOut ? "Saliendo…" : "Cerrar sesión"}
          </button>
        </div>
      </div>
    </header>
  );
}
