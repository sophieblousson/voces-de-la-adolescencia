import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Voces de la Adolescencia 2026 | Active Learning",
  description:
    "Concurso literario institucional Voces de la Adolescencia 2026. Expresá tu voz. Contá tu historia.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
