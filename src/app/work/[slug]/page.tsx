import { OrbitKanbanDetail } from "@/components/projects/OrbitKanbanDetail";
import { DocuMindDetail } from "@/components/projects/DocuMindDetail";
import { LinktreeDetail } from "@/components/projects/LinktreeDetail";
import { LandingPageDetail } from "@/components/projects/LandingPageDetail";
import { CatalogoDetail } from "@/components/projects/CatalogoDetail";
import { EcommerceDetail } from "@/components/projects/EcommerceDetail";

import { ClientProjectDetail } from "./ClientProjectDetail"; // Fallback if needed

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const titles: Record<string, string> = {
    'docu-mind': 'DocuMind AI — Consulta documentos con IA | Miguel Albornoz',
    'orbit-kanban': 'Orbit Kanban — Organiza el trabajo en equipo | Miguel Albornoz',
    'linktree': 'Páginas de enlaces para marcas | Miguel Albornoz',
    'landing-page': 'Café Origen — Una web que presenta la marca | Miguel Albornoz',
    'catalogo': 'Catálogo digital para ventas mayoristas | Miguel Albornoz',
    'ecommerce-erp': 'Doha — Tienda virtual y control del negocio | Miguel Albornoz',
  };
  const descriptions: Record<string, string> = {
    'docu-mind': 'Un asistente que encuentra respuestas en tus documentos y muestra sus fuentes.',
    'orbit-kanban': 'Un tablero compartido para organizar tareas y ver los cambios del equipo al momento.',
    'linktree': 'Páginas que reúnen catálogo, redes y contacto de una marca en un solo enlace.',
    'landing-page': 'Una web para mostrar la personalidad de Café Origen y facilitar que las personas lo conozcan.',
    'catalogo': 'Un catálogo fácil de explorar que prepara los productos elegidos para pedirlos por WhatsApp.',
    'ecommerce-erp': 'Conoce la tienda virtual de Doha: catálogo, carrito y pagos en línea con Wompi, conectados con un panel para gestionar pedidos e inventario.',
  };
  const title = titles[slug] ?? 'Proyecto | Miguel Albornoz';
  const description = descriptions[slug] ?? 'Conoce el problema, la solución y cómo funciona este proyecto de Miguel Albornoz.';
  return {
    title,
    description,
    openGraph: { title, description, url: `https://miguelalbornozdev.vercel.app/work/${slug}` },
    twitter: { title, description },
  };
}

export default async function WorkDetail(props: Props) {
  const params = await props.params;
  const { slug } = params;

  switch (slug) {
    case "orbit-kanban":
      return <OrbitKanbanDetail />;
    case "docu-mind":
      return <DocuMindDetail />;
    case "linktree":
      return <LinktreeDetail />;
    case "landing-page":
      return <LandingPageDetail />;
    case "catalogo":
      return <CatalogoDetail />;
    case "ecommerce-erp":
      return <EcommerceDetail />;
    default:
      return <ClientProjectDetail slug={slug} />;
  }
}
