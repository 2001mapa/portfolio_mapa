import Link from "next/link";

export function GlobalNav() {
  return (
    <nav className="absolute top-0 w-full flex justify-between items-center px-6 py-4 z-50 text-caption leading-caption tracking-caption text-bone print:hidden">
      <Link href="/" className="font-medium uppercase truncate max-w-[150px] md:max-w-none">Miguel Albornoz<span className="text-ember">.</span></Link>
      <div className="flex gap-4 md:gap-6 items-center">
        <Link href="/#process" className="hidden md:block font-medium uppercase hover:text-fog transition-colors">Enfoque</Link>
        <Link href="/#work" className="hidden md:block font-medium uppercase hover:text-fog transition-colors">Proyectos</Link>
        <Link href="/#services" className="hidden md:block font-medium uppercase hover:text-fog transition-colors">Servicios</Link>
        <Link
          href="/#contact"
          className="font-medium uppercase border border-bone/30 px-5 md:px-6 py-3 md:py-2 rounded-full active:bg-bone/20 md:hover:bg-bone active:text-white md:hover:text-obsidian transition-colors duration-300 text-xs md:text-caption"
        >
          Contacto
        </Link>
      </div>
    </nav>
  );
}

