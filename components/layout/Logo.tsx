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
  const src =
    variant === "white"
      ? "/logo-active-learning-white.svg"
      : "/logo-active-learning.svg";

  if (failed) {
    return (
      <span
        className={className}
        aria-label="Active Learning"
        title="Active Learning"
        style={{
          height,
          minWidth: 112,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          color: variant === "white" ? "#ffffff" : "#152548",
          fontFamily: "var(--font-principal)",
          fontWeight: 700,
          fontSize: 14,
          letterSpacing: "0.02em",
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
      }}
    />
  );
}
