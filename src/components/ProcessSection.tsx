const steps = [
  {
    number: "01",
    title: "Entendemos el cuello de botella",
    description: "Antes de diseñar una pantalla, identificamos dónde se pierde tiempo, se duplican datos o se escapan oportunidades.",
  },
  {
    number: "02",
    title: "Diseñamos un flujo simple",
    description: "Definimos una experiencia clara para cada persona: cliente, equipo operativo o administrador.",
  },
  {
    number: "03",
    title: "Construimos y conectamos",
    description: "Entrego una solución web lista para operar, integrada a los servicios que ya necesitas usar.",
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="bg-paper py-16 text-obsidian md:py-28">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid gap-8 border-b border-obsidian/15 pb-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] font-semibold uppercase tracking-[0.14em] text-ember">Más que una web</p>
          <div>
            <h2 className="max-w-3xl font-[family-name:var(--font-abc-gravity-variable)] text-4xl font-medium leading-[0.95] tracking-[-0.055em] md:text-6xl">Una solución debe aliviar trabajo, no agregar otra herramienta difícil de usar.</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate md:text-lg">Por eso cada proyecto parte de una operación real y termina en una interfaz clara, medible y lista para crecer.</p>
          </div>
        </div>

        <div className="mt-2 grid divide-y divide-obsidian/15 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {steps.map((step) => (
            <article
              key={step.number}
              className="group py-8 lg:px-8 lg:py-12 first:pl-0 last:pr-0"
            >
              <span className="font-[family-name:var(--font-ibm-plex-mono)] text-xs font-semibold tracking-[0.12em] text-ember">{step.number}</span>
              <h3 className="mt-12 max-w-xs text-2xl font-medium leading-tight tracking-[-0.04em] md:text-3xl">{step.title}</h3>
              <p className="mt-4 max-w-sm leading-relaxed text-slate">{step.description}</p>
              <div className="mt-8 h-px w-9 bg-ember transition-[width] duration-300 group-hover:w-16" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
