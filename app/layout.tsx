import type { Metadata } from "next";
import { Anton, Caveat, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const caveat = Caveat({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

const sourceSans3 = Source_Sans_3({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-source-sans-3",
  display: "swap",
});

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
      <body
        className={`${anton.variable} ${caveat.variable} ${sourceSans3.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
