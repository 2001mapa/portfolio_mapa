import Link from "next/link";

type CaseStudyBriefProps = {
  problem: string;
  solution: string;
  outcome: string;
  accent?: string;
};

export function CaseStudyBrief({ problem, solution, outcome, accent = "#ff4c24" }: CaseStudyBriefProps) {
  return (
    <section className="relative z-30 border-y border-white/10 bg-black/20 px-6 py-8 backdrop-blur-sm md:py-10">
      <div className="mx-auto grid max-w-[1200px] gap-7 md:grid-cols-[0.7fr_1fr_1fr_1fr] md:gap-8">
        <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: accent }}>
          El caso en una mirada
        </p>
        <BriefItem label="Problema" text={problem} />
        <BriefItem label="Solución" text={solution} />
        <div>
          <BriefItem label="Qué aporta" text={outcome} />
          <Link href="/#contact" className="mt-5 inline-flex items-center gap-2 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:text-white/65">
            ¿Tienes algo parecido? <span style={{ color: accent }}>↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function BriefItem({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] font-semibold uppercase tracking-[0.12em] text-white/45">{label}</p>
      <p className="mt-3 text-sm leading-relaxed text-white/80">{text}</p>
    </div>
  );
}
