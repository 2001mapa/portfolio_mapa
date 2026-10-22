import Link from "next/link";

export function GlobalNav() {
  return (
    <nav className="absolute top-0 z-50 flex w-full items-center justify-between gap-3 px-4 py-4 text-caption leading-caption tracking-caption text-bone print:hidden sm:px-6">
      <Link href="/" className="min-w-0 max-w-[142px] truncate font-medium uppercase md:max-w-none">Miguel Albornoz<span className="text-ember">.</span></Link>
      <div className="flex shrink-0 items-center gap-2 md:gap-6">
        <Link href="/#process" className="hidden md:block font-medium uppercase hover:text-fog transition-colors">Enfoque</Link>
        <Link href="/#work" className="hidden md:block font-medium uppercase hover:text-fog transition-colors">Proyectos</Link>
        <Link href="/#services" className="hidden md:block font-medium uppercase hover:text-fog transition-colors">Servicios</Link>
        <Link
          href="/#contact"
          className="min-h-10 whitespace-nowrap rounded-full border border-bone/30 px-4 py-2.5 text-xs font-medium uppercase transition-colors duration-300 active:bg-bone/20 active:text-white md:px-6 md:py-2 md:text-caption md:hover:bg-bone md:hover:text-obsidian"
        >
          Contacto
        </Link>
      </div>
    </nav>
  );
}

