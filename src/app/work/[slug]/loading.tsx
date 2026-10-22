export default function WorkLoading() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-obsidian px-6 text-bone">
      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-[70vw] w-[90vw] bg-[radial-gradient(ellipse_at_top_right,rgba(255,76,36,0.2),transparent_66%)]" />
      <div className="relative flex w-full max-w-sm flex-col gap-6">
        <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] font-semibold uppercase tracking-[0.18em] text-ember">
          Abriendo caso de estudio
        </p>
        <div className="flex flex-col gap-3" aria-label="Cargando proyecto">
          {[0, 1, 2].map((item) => (
            <span
              key={item}
              className="project-loader-bar h-px w-full origin-left bg-gradient-to-r from-ember via-white/70 to-white/10"
              style={{ animationDelay: `${item * 150}ms` }}
            />
          ))}
        </div>
        <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.14em] text-white/45">
          Preparando la experiencia
        </span>
      </div>
    </main>
  );
}
