export interface HabilidadData {
  title: string;
  desc: string;
  benefits: string;
  color: string;
  hex: string;
}

export const habilidades: HabilidadData[] = [
  {
    title: "E-Commerce y Landings",
    desc: "Sitios web diseñados estratégicamente para convertir visitantes en clientes.",
    benefits: "Tu negocio no puede depender de plantillas genéricas que colapsan. Construyo la columna vertebral digital de tu empresa: desde landings que capturan clientes sin parar, hasta tiendas online (e-commerce) que automatizan tu inventario y facturación. Escalabilidad asegurada.",
    color: "bg-blue-500", // Océano
    hex: "rgba(59, 130, 246, 0.4)"
  },
  {
    title: "Velocidad Extrema",
    desc: "Interfaces ultra rápidas que retienen a tus usuarios y evitan abandonos.",
    benefits: "El diseño vende, pero la velocidad retiene. Uso herramientas de última generación para crear páginas que cargan al instante, evitando que tus clientes se desesperen y se vayan a la competencia. Tus clientes disfrutarán navegar, confiarán en tu marca y terminarán comprando sin frustraciones.",
    color: "bg-cyan-400", // Turquesa
    hex: "rgba(34, 211, 238, 0.4)"
  },
  {
    title: "Bases de Datos Seguras",
    desc: "Almacenamiento en tiempo real para tu información más valiosa.",
    benefits: "Los datos en Excel se pierden o desactualizan. Integro bases de datos en la nube ultraseguras que almacenan la información de tus ventas, clientes y productos, mostrándolos en paneles de control privados. Toma decisiones estratégicas basadas en números reales.",
    color: "bg-emerald-400", // Esmeralda
    hex: "rgba(52, 211, 153, 0.4)"
  },
  {
    title: "Siempre Abierto (24/7)",
    desc: "Tu página siempre en línea, a prueba de caídas y alto tráfico.",
    benefits: "Si tu web se cae durante una campaña, pierdes dinero. Alojamos tu tienda en plataformas de talla mundial para garantizar que soporte miles de visitas al mismo tiempo sin colapsar ni ponerse lenta. Garantizamos que tu negocio siempre esté disponible.",
    color: "bg-purple-500", // Amatista
    hex: "rgba(168, 85, 247, 0.4)"
  },
  {
    title: "Posicionamiento Google",
    desc: "Estrategias de código para que te encuentren primero en las búsquedas.",
    benefits: "De nada sirve el mejor producto del mundo si nadie lo encuentra. Aplico estrategias comprobadas para que Google destaque tu negocio. Así dominas los primeros resultados y atraes clientes que ya están listos para comprar.",
    color: "bg-amber-500", // Ámbar
    hex: "rgba(245, 158, 11, 0.4)"
  },
  {
    title: "Recuperación de Clientes",
    desc: "Rastreamos a los que se fueron para que vuelvan y compren.",
    benefits: "El 98% de los visitantes no compra la primera vez. Conectamos herramientas de Facebook y Google para identificar a los visitantes que no compraron, mostrándoles anuncios atractivos hasta que regresen. Multiplica tu retorno de inversión.",
    color: "bg-pink-500", // Magenta
    hex: "rgba(236, 72, 153, 0.4)"
  },
  {
    title: "Automatización Total",
    desc: "Sistemas que trabajan por ti las 24 horas del día, sin descanso.",
    benefits: "Tu tiempo vale más que hacer tareas repetitivas. Automatizo tu flujo de trabajo: que el inventario se descuente solo, que los correos de confirmación se envíen solos y que las facturas se generen sin tocar un botón. Ahorra cientos de horas de trabajo manual al mes.",
    color: "bg-yellow-400", // Oro
    hex: "rgba(250, 204, 21, 0.4)"
  }
];
