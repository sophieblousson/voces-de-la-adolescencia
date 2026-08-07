import Hero from "@/components/home/Hero";
import Categorias from "@/components/home/Categorias";
import ComoParticipar from "@/components/home/ComoParticipar";
import Premios from "@/components/home/Premios";
import CTAFinal from "@/components/home/CTAFinal";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categorias />
      <ComoParticipar />
      <Premios />
      <CTAFinal />
    </>
  );
}
