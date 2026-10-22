"use client";

import { motion } from "framer-motion";

const services = [
  {
    label: "01 · Operación",
    title: "Sistemas internos que ordenan el trabajo",
    description: "Inventario, pedidos, clientes, tableros y paneles que reemplazan hojas de cálculo, chats dispersos y pasos manuales.",
    result: "Resultado: un equipo con contexto y procesos visibles.",
  },
  {
    label: "02 · Crecimiento",
    title: "Experiencias web que ayudan a vender",
    description: "Sitios, catálogos y plataformas de cliente diseñados para explicar mejor tu oferta, captar solicitudes y reducir fricción.",
    result: "Resultado: una presencia digital que trabaja contigo.",
  },
  {
    label: "03 · Automatización",
    title: "Flujos conectados con IA cuando aporta valor",
    description: "Integro formularios, bases de datos, notificaciones y asistentes para quitar tareas repetitivas sin perder control humano.",
    result: "Resultado: más tiempo para las decisiones que importan.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="relative overflow-hidden bg-[#111110] py-16 text-bone md:py-28">
      <div className="pointer-events-none absolute right-[-16rem] top-20 h-[35rem] w-[35rem] rounded-full bg-[radial-gradient(circle,rgba(255,76,36,0.14),transparent_67%)]" />
      <div className="relative mx-auto max-w-[1280px] px-6">
        <div className="grid gap-7 border-b border-white/15 pb-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] font-semibold uppercase tracking-[0.14em] text-ember">Lo que puedo construir</p>
          <div>
            <h2 className="font-[family-name:var(--font-abc-gravity-variable)] text-4xl font-medium leading-[0.95] tracking-[-0.055em] text-fog md:text-6xl">No vendo pantallas. Diseño herramientas que hacen avanzar una operación.</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ash md:text-lg">Cada servicio se adapta al problema. Podemos empezar pequeño, validar el flujo y evolucionar con datos reales.</p>
          </div>
        </div>

        <div className="mt-3 divide-y divide-white/15">
          {services.map((service, index) => (
            <motion.article
              key={service.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="grid gap-5 py-9 md:grid-cols-[120px_1fr_auto] md:items-start md:gap-8 md:py-11"
            >
              <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] font-semibold uppercase tracking-[0.12em] text-ember">{service.label}</p>
              <div>
                <h3 className="max-w-2xl text-2xl font-medium leading-tight tracking-[-0.04em] text-fog md:text-4xl">{service.title}</h3>
                <p className="mt-4 max-w-2xl leading-relaxed text-ash">{service.description}</p>
              </div>
              <p className="max-w-52 border-l border-ember pl-4 text-sm leading-relaxed text-mist md:mt-1">{service.result}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
