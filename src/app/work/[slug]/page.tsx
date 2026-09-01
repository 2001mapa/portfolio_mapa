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
