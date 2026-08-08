export type ProjectType = "landing" | "catalogo" | "erp";

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
  { id: "landing", label: "Landing Page", desc: "Tu sitio web de alto rendimiento. Incluye diseño persuasivo, carga instantánea para no perder visitas y optimización para captar clientes.", minPrice: 150000, maxPrice: 300000 },
  { id: "catalogo", label: "Tienda / Catálogo", desc: "Digitaliza tu negocio. Incluye catálogo de productos, gestión de inventario básica y un panel administrador para que controles todo fácilmente.", minPrice: 400000, maxPrice: 600000 },
  { id: "erp", label: "Sistema a Medida (ERP)", desc: "Automatiza tu empresa. Incluye bases de datos seguras, control de empleados y la lógica exacta para eliminar tus cuellos de botella diarios.", minPrice: 660000, maxPrice: 1100000 },
];

export const commonExtras: QuestionData[] = [
  { id: "extra_paginas", type: "counter", title: "Contenido", label: "¿Cuántas páginas extra necesitas?", desc: "Páginas adicionales como 'Quiénes Somos', 'Servicios' o 'Contacto'.", minPrice: 60000, maxPrice: 60000 },
  { id: "extra_funciones", type: "toggle", title: "Interacción", label: "¿Botones de WhatsApp y Chat?", desc: "Burbujas flotantes para que tus clientes te hablen al instante.", minPrice: 50000, maxPrice: 90000 }
];

export const questionBanks: Record<ProjectType, QuestionData[]> = {
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
    { id: "deploy_analytics", type: "toggle", title: "Estadísticas", label: "¿Saber cuántos te visitan?", desc: "Conexión oculta para ver de dónde vienen tus clientes y qué miran más.", minPrice: 80000, maxPrice: 120000 },
    ...commonExtras
  ],
  erp: [
    { id: "erp_inventario", type: "toggle", title: "Control", label: "¿Manejo de inventario automático?", desc: "El sistema restará productos solos al vender y te avisará si algo se agota.", minPrice: 400000, maxPrice: 600000 },
    { id: "erp_facturacion", type: "toggle", title: "Contabilidad", label: "¿Generar facturas electrónicas?", desc: "Creación de facturas válidas, generación de PDFs y envío automático por correo.", minPrice: 600000, maxPrice: 900000 },
    { id: "erp_roles", type: "toggle", title: "Seguridad", label: "¿Cuentas para tus empleados?", desc: "Permisos separados: el vendedor solo vende, tú como dueño ves todo el dinero.", minPrice: 300000, maxPrice: 500000 },
    { id: "erp_reportes", type: "toggle", title: "Métricas", label: "¿Dashboard de Analítica Avanzada?", desc: "Gráficos interactivos de ventas, proyecciones de ganancias y reportes exportables.", minPrice: 350000, maxPrice: 600000 },
    { id: "erp_crm", type: "toggle", title: "Clientes", label: "¿Módulo CRM Integrado?", desc: "Seguimiento de clientes, historial de compras y embudos de venta personalizados.", minPrice: 400000, maxPrice: 700000 },
    { id: "erp_nomina", type: "toggle", title: "Personal", label: "¿Gestión de Nómina y Comisiones?", desc: "Control de asistencias, cálculo de comisiones por ventas y desprendibles de pago.", minPrice: 450000, maxPrice: 800000 },
    ...commonExtras
  ]
};

export const formatCurrency = (val: number, currency: 'COP' | 'USD' = 'COP') => {
  if (currency === 'USD') {
    const usdVal = val / 4000; // Tipo de cambio fijo aproximado
    return `$${usdVal.toFixed(0)}`;
  }
  
  if (val >= 1000000) {
    return `$${(val / 1000000).toFixed(1)}M`;
  }
  return `$${(val / 1000).toFixed(0)}k`;
};
