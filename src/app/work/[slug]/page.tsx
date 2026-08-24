import { DocuMindDetail } from "@/components/projects/DocuMindDetail";
import { AICRMDetail } from "@/components/projects/AICRMDetail";
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
    case "docu-mind":
      return <DocuMindDetail />;
    case "ai-crm":
      return <AICRMDetail />;
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
