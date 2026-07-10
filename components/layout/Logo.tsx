"use client";

import { useState } from "react";
import styles from "./Logo.module.css";

/**
 * Logo de Active Learning.
 *
 * Coloca el archivo real en:
 *   /public/logo-active-learning.svg   (preferido)
 *   /public/logo-active-learning.png   (alternativa)
 *
 * Mientras el archivo no exista, este componente muestra un placeholder
 * "AL" con un borde punteado, para que el layout de Header/Footer no se
 * rompa y quede claro dónde falta cargar el asset real.
 *
 * No se recrea el logo: se carga tal cual se provea, sin deformar
 * (height fijo, width automático para mantener proporción).
 */
const SOURCES = ["/logo-active-learning.svg", "/logo-active-learning.png"];

type LogoProps = {
  size?: "sm" | "md";
};

export default function Logo({ size = "md" }: LogoProps) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className={`${styles.placeholder} ${size === "sm" ? styles.sm : ""}`}
        title=logo-active-learning.svg
      >
        AL
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={SOURCES[sourceIndex]}
      alt="Active Learning"
      className={`${styles.logo} ${size === "sm" ? styles.sm : ""}`}
      onError={() => {
        if (sourceIndex < SOURCES.length - 1) {
          setSourceIndex(sourceIndex + 1);
        } else {
          setFailed(true);
        }
      }}
    />
  );
}
