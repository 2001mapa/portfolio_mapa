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
    'docu-mind': 'DocuMind AI — RAG SaaS para Gestión Documental | Miguel Albornoz',
    'orbit-kanban': 'Orbit Kanban — Plataforma Realtime con LexoRank | Miguel Albornoz',
    'ecommerce-erp': 'E-Commerce & ERP Architecture | Miguel Albornoz',
    'linktree': 'Linktree Clone de Alto Rendimiento | Miguel Albornoz',
    'landing-page': 'Landing Page con Lighthouse 100 | Miguel Albornoz',
    'catalogo': 'Catálogo Digital B2B | Miguel Albornoz',
  };
  return {
    title: titles[slug] ?? 'Proyecto | Miguel Albornoz',
    description: 'Caso de estudio técnico en el portafolio de Miguel Albornoz, Desarrollador Fullstack en Medellín.',
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
