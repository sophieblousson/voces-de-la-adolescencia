"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/bases", label: "Bases" },
  { href: "/participar", label: "Participar" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.topbar}>
      <div className={styles.wrap}>
        <Link
          href="/"
          className={styles.logoLink}
          aria-label="Ir al inicio"
          onClick={() => setOpen(false)}
        >
          <Logo size="sm" />
        </Link>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="nav-principal"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="nav-principal"
          className={`${styles.nav} ${open ? styles.navOpen : ""}`}
          aria-label="Navegación principal"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.navLink}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
