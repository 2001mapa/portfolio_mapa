import type { MetadataRoute } from "next";

const siteUrl = "https://miguel-albornoz.vercel.app";
const publicRoutes = ["", "/work/docu-mind", "/work/orbit-kanban", "/work/linktree", "/work/landing-page", "/work/catalogo", "/work/laboratorio"];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route ? "monthly" : "weekly",
    priority: route ? 0.7 : 1,
  }));
}
