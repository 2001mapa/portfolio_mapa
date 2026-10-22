type ProjectHeroGlowProps = {
  color: string;
};

export function ProjectHeroGlow({ color }: ProjectHeroGlowProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-0 top-0 z-[1] h-[min(78vw,38rem)] w-[min(95vw,58rem)] opacity-90"
      style={{
        background: `radial-gradient(ellipse at top right, rgba(${color}, 0.34) 0%, rgba(${color}, 0.12) 28%, transparent 68%)`,
      }}
    />
  );
}
