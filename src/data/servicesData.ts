export interface HabilidadData {
  title: string;
  desc: string;
  benefits: string;
  color: string;
  hex: string;
}

export const habilidades: HabilidadData[] = [
  {
    title: "AI & LLM Orchestration",
    desc: "Integración de Inteligencia Artificial Generativa en flujos de trabajo reales.",
    benefits: "Desarrollo agentes autónomos, RAG systems y automatizaciones usando APIs de Google Gemini y OpenAI. Sé cómo crear prompts estructurados (JSON mode), mantener memoria de contexto y conectar LLMs a bases de datos para reemplazar tareas manuales complejas.",
    color: "bg-blue-500", // Océano
    hex: "rgba(59, 130, 246, 0.4)"
  },
  {
    title: "Full-Stack Serverless",
    desc: "Arquitecturas escalables sin mantenimiento de servidores.",
    benefits: "Construyo aplicaciones usando Next.js App Router, Edge Functions y Webhooks. Puedo diseñar sistemas completos desde el frontend hasta APIs robustas que escalan automáticamente en Vercel con latencia mínima y cero mantenimiento de infraestructura.",
    color: "bg-cyan-400", // Turquesa
    hex: "rgba(34, 211, 238, 0.4)"
  },
  {
    title: "Frontend & UI/UX Engineering",
    desc: "Interfaces ultra rápidas, accesibles y con físicas avanzadas.",
    benefits: "Domino React, Tailwind CSS y Framer Motion. Construyo componentes altamente interactivos con físicas fluidas a 60fps, optimizados para SEO y Mobile-First. Me aseguro de que el código sea modular, limpio y reutilizable en toda la aplicación.",
    color: "bg-emerald-400", // Esmeralda
    hex: "rgba(52, 211, 153, 0.4)"
  },
  {
    title: "Databases & Data Modeling",
    desc: "Diseño e implementación de bases de datos relacionales en la nube.",
    benefits: "Integro PostgreSQL usando Supabase. Sé cómo estructurar esquemas, manejar relaciones, configurar Row Level Security (RLS) y escribir consultas asíncronas seguras para sistemas como CRMs, ERPs o plataformas E-commerce.",
    color: "bg-purple-500", // Amatista
    hex: "rgba(168, 85, 247, 0.4)"
  },
  {
    title: "Integraciones de Terceros",
    desc: "Conexión de APIs de pago, mensajería y servicios externos.",
    benefits: "Experiencia conectando APIs complejas como pasarelas de pago (Stripe, Wompi), webhooks de Telegram para chatbots transaccionales y otras herramientas de software, asegurando manejo de errores y webhooks seguros.",
    color: "bg-amber-500", // Ámbar
    hex: "rgba(245, 158, 11, 0.4)"
  }
];
