"use client";

import { useState } from "react";

type LogoProps = {
  variant?: "color" | "white";
  size?: "sm" | "md";
  className?: string;
};

export default function Logo({
  variant = "color",
  size = "md",
  className,
}: LogoProps) {
  const [failed, setFailed] = useState(false);

  const height = size === "sm" ? 34 : 40;

  /**
   * El archivo real está en app/(public)/logoactivelearning.png.
   * Como está dentro de la carpeta app, Next no lo sirve como archivo público directo.
   * Por eso conviene moverlo a /public.
   */
  const src = "/logoactivelearning.png";

  if (failed) {
    return (
      <span
        className={className}
        aria-label="Active Learning"
        title="Active Learning"
        style={{
          display: "inline-flex",
          alignItems: "center",
          height,
          color: variant === "white" ? "#ffffff" : "#152548",
          fontFamily: "var(--font-source-sans-3), Helvetica, Arial, sans-serif",
          fontWeight: 700,
          fontSize: 14,
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        Active Learning
      </span>
    );
  }

  return (
    <img
      className={className}
      src={src}
      alt="Active Learning"
      title="Active Learning"
      height={height}
      onError={() => setFailed(true)}
      style={{
        height,
        width: "auto",
        objectFit: "contain",
        display: "block",
        filter: variant === "white" ? "brightness(0) invert(1)" : undefined,
      }}
    />
  );
}
