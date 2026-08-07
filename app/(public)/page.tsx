import Hero from "@/components/home/Hero";
import ColegiosParticipantes from "@/components/home/ColegiosParticipantes";
import Categorias from "@/components/home/Categorias";
import ComoParticipar from "@/components/home/ComoParticipar";
import Premios from "@/components/home/Premios";
import TemasPorCategoria from "@/components/home/TemasPorCategoria";
import CTAFinal from "@/components/home/CTAFinal";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ColegiosParticipantes />
      <Categorias />
      <ComoParticipar />
      <Premios />
      <TemasPorCategoria />
      <CTAFinal />
    </>
  );
}
