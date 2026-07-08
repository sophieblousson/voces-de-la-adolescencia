"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/bases", label: "Bases y condiciones" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} onClick={() => setOpen(false)}>
          <Logo size="sm" />
          <span className={styles.brandText}>
            <span className={styles.brandKicker}>Active Learning</span>
            <span className={styles.brandName}>Voces de la Adolescencia</span>
          </span>
        </Link>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="nav-principal"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`${styles.toggleBar} ${open ? styles.toggleBarOpenTop : ""}`} />
          <span className={`${styles.toggleBar} ${open ? styles.toggleBarOpenHide : ""}`} />
          <span className={`${styles.toggleBar} ${open ? styles.toggleBarOpenBottom : ""}`} />
        </button>

        <nav
          id="nav-principal"
          className={`${styles.nav} ${open ? styles.navOpen : ""}`}
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
          <Link
            href="/participar"
            className={styles.navCta}
            onClick={() => setOpen(false)}
          >
            Participar
          </Link>
        </nav>
      </div>
    </header>
  );
}
