"use client";

import { useEffect, useState } from "react";
import { COUNTDOWN_TARGET } from "@/lib/constants";
import { getCountdownParts, type CountdownParts } from "@/lib/utils/countdown";
import styles from "./Countdown.module.css";

/**
 * Client component aislado a propósito: renderiza un placeholder neutro en
 * el primer paint (igual en build/SSG y en la hidratación del browser) y
 * recién calcula la cuenta real en useEffect, con el reloj del visitante.
 * Esto mantiene el resto de la home 100% estática.
 */
export default function Countdown() {
  const [parts, setParts] = useState<CountdownParts | null>(null);

  useEffect(() => {
    setParts(getCountdownParts(COUNTDOWN_TARGET));
    const interval = setInterval(() => {
      setParts(getCountdownParts(COUNTDOWN_TARGET));
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  if (!parts) {
    return (
      <div className={styles.countdown} aria-hidden="true">
        <div className={styles.unit}>
          <span className={styles.number}>—</span>
          <span className={styles.label}>meses</span>
        </div>
        <div className={styles.unit}>
          <span className={styles.number}>—</span>
          <span className={styles.label}>días</span>
        </div>
      </div>
    );
  }

  if (parts.isPast) {
    return (
      <p className={styles.abierto}>
        La recepción de obras ya está abierta.
      </p>
    );
  }

  return (
    <div>
      <div className={styles.countdown} role="timer" aria-live="polite">
        <div className={styles.unit}>
          <span className={styles.number}>{parts.months}</span>
          <span className={styles.label}>{parts.months === 1 ? "mes" : "meses"}</span>
        </div>
        <div className={styles.unit}>
          <span className={styles.number}>{parts.days}</span>
          <span className={styles.label}>{parts.days === 1 ? "día" : "días"}</span>
        </div>
      </div>
      <p className={styles.caption}>
        para el inicio de la recepción de obras — 1 de septiembre de 2026
      </p>
    </div>
  );
}
