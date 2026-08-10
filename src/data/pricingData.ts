export type ProjectType = "linktree" | "landing" | "catalogo" | "erp";

export interface ProjectTypeData {
  id: ProjectType;
  label: string;
  desc: string;
  minPrice: number;
  maxPrice: number;
}

export interface QuestionData {
  id: string;
  type: "toggle" | "counter";
  title: string;
  label: string;
  desc: string;
  minPrice: number;
  maxPrice: number;
}

export const projectTypes: ProjectTypeData[] = [
  { id: "linktree", label: "Linktree Premium", desc: "Plan Básico: Tu ecosistema de enlaces. Hasta 3 enlaces, fondo a medida y logo de empresa. Ideal para presencia mínima rápida.", minPrice: 80000, maxPrice: 80000 },
  { id: "landing", label: "Landing Page", desc: "Tu sitio web de alto rendimiento. Incluye diseño persuasivo, carga instantánea y optimización para captar clientes.", minPrice: 150000, maxPrice: 300000 },
  { id: "catalogo", label: "Tienda / Catálogo", desc: "Digitaliza tu negocio. Incluye catálogo de productos, gestión de inventario básica y un panel administrador para que controles todo fácilmente.", minPrice: 400000, maxPrice: 600000 },
  { id: "erp", label: "Sistema de Gestión Empresarial", desc: "Control de inventario, registro de ventas, caja diaria y perfiles para tus empleados. Organiza toda la operación de tu negocio en un solo lugar de forma automática.", minPrice: 2000000, maxPrice: 3000000 },
];

export const commonExtras: QuestionData[] = [
  { id: "extra_paginas", type: "counter", title: "Contenido", label: "¿Cuántas páginas extra necesitas?", desc: "Páginas adicionales como 'Quiénes Somos', 'Servicios' o 'Contacto'.", minPrice: 60000, maxPrice: 60000 },
  { id: "extra_funciones", type: "toggle", title: "Interacción", label: "¿Botones de WhatsApp y Chat?", desc: "Burbujas flotantes para que tus clientes te hablen al instante.", minPrice: 50000, maxPrice: 90000 },
  { id: "extra_dominio", type: "toggle", title: "Dominio y Marca", label: "¿Dominio personalizado (.com)?", desc: "Tu página tendrá un nombre profesional (como tunegocio.com). Incluye el registro por un año y el 'candadito' de seguridad para que tus clientes compren con confianza.", minPrice: 150000, maxPrice: 200000 }
];

export const questionBanks: Record<ProjectType, QuestionData[]> = {
  linktree: [
    { id: "link_pro", type: "toggle", title: "Nivel Profesional", label: "¿Expandir hasta 7 enlaces y Animaciones?", desc: "Diseño adaptado a tu marca, botones con tus colores y enlaces directos a WhatsApp con mensajes predeterminados.", minPrice: 50000, maxPrice: 70000 },
    { id: "link_premium", type: "toggle", title: "Diseño a Medida", label: "¿Incrustar PDF o Videos?", desc: "Incrustación de un menú o catálogo PDF, videos cortos y diseño gráfico 100% exclusivo.", minPrice: 70000, maxPrice: 100000 },
    { id: "extra_dominio", type: "toggle", title: "Dominio y Marca", label: "¿Dominio personalizado (.com)?", desc: "Tu página tendrá un nombre profesional (como tunegocio.com). Incluye el registro por un año y el 'candadito' de seguridad para que tus clientes compren con confianza.", minPrice: 150000, maxPrice: 200000 }
  ],
  landing: [
    { id: "ui_avanzado", type: "toggle", title: "Diseño Premium", label: "¿Diseño animado y llamativo?", desc: "Efectos visuales modernos que hacen que la página se mueva suavemente al bajar.", minPrice: 150000, maxPrice: 300000 },
    { id: "ui_darkmode", type: "toggle", title: "Estilo", label: "¿Modo Oscuro Automático?", desc: "La página se adapta sola si el celular del cliente está en modo oscuro.", minPrice: 100000, maxPrice: 150000 },
    { id: "deploy_seo", type: "toggle", title: "Visibilidad", label: "¿Aparecer mejor en Google?", desc: "Configuraciones para que tu enlace se vea profesional al enviarlo por WhatsApp.", minPrice: 100000, maxPrice: 150000 },
    ...commonExtras
  ],
  catalogo: [
    { id: "cat_filtros", type: "toggle", title: "Navegación", label: "¿Búsqueda rápida y filtros?", desc: "Tus clientes podrán buscar productos por categoría o precio al instante.", minPrice: 150000, maxPrice: 250000 },
    { id: "cat_pagos", type: "toggle", title: "Ventas", label: "¿Recibir pagos por internet?", desc: "Conexión para cobrar con tarjeta, Nequi o PSE directamente en tu página.", minPrice: 300000, maxPrice: 500000 },
    { id: "cat_envios", type: "toggle", title: "Logística", label: "¿Cálculo automático de envíos?", desc: "Integración con transportadoras para calcular el costo de envío según la ciudad.", minPrice: 200000, maxPrice: 350000 },
    { id: "deploy_analytics", type: "toggle", title: "Estadísticas", label: "¿Saber cuántos te visitan?", desc: "Herramientas de medición integradas para saber exactamente de dónde vienen tus clientes y qué productos les interesan más.", minPrice: 80000, maxPrice: 120000 },
    ...commonExtras
  ],
  erp: [
    { id: "erp_nivel2", type: "toggle", title: "Nivel 2", label: "¿Gestión Financiera Avanzada?", desc: "Cuentas por cobrar/pagar, cierres automatizados, reportes P&G y control multibodega.", minPrice: 2500000, maxPrice: 3500000 },
    { id: "erp_nivel3", type: "toggle", title: "Nivel 3", label: "¿ERP Contable Empresarial?", desc: "Integración de facturación electrónica, asientos contables, cálculo de impuestos, nómina y comisiones.", minPrice: 3500000, maxPrice: 5000000 },
    { id: "erp_crm", type: "toggle", title: "Clientes", label: "¿Sistema de Seguimiento de Clientes?", desc: "Seguimiento de clientes, historial de compras y embudos de venta personalizados.", minPrice: 600000, maxPrice: 1000000 }
  ]
};

export const formatCurrency = (val: number, currency: 'COP' | 'USD' = 'COP') => {
  if (currency === 'USD') {
    const usdVal = val / 3500;
    return `$${usdVal.toFixed(0)}`;
  }
  
  if (val >= 1000000) {
    return `$${(val / 1000000).toFixed(1)}M`;
  }
  return `$${(val / 1000).toFixed(0)}k`;
};
