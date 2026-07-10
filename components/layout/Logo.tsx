"use client";

import { useState } from "react";

type LogoProps = {
  size?: "sm" | "md";
};

export default function Logo({ size = "md" }: LogoProps) {
  const [hasError, setHasError] = useState(false);

  const dimension = size === "sm" ? 42 : 56;

  if (hasError) {
    return (
      <span
        title="Active Learning"
        aria-label="Active Learning"
        style={{
          width: dimension,
          height: dimension,
          minWidth: dimension,
          borderRadius: 16,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #39a9dc, #97bf0d)",
          color: "#ffffff",
          fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
          fontWeight: 800,
          fontSize: size === "sm" ? 13 : 16,
          letterSpacing: "-0.04em",
          boxShadow: "0 8px 24px rgba(26, 23, 27, 0.1)",
        }}
      >
        AL
      </span>
    );
  }

  return (
    <img
      src="/logo-active-learning.svg"
      alt="Active Learning"
      title="logo-active-learning.svg"
      width={dimension}
      height={dimension}
      onError={() => setHasError(true)}
      style={{
        width: dimension,
        height: dimension,
        objectFit: "contain",
        display: "block",
      }}
    />
  );
}
