'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Kanban, CircleDollarSign, LogOut } from 'lucide-react';
import { logoutAction } from './actions';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // If we are on the login page, don't show the sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-obsidian text-bone font-[family-name:var(--font-ibm-plex-mono)]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#141210] flex flex-col justify-between">
        <div>
          <div className="p-6 border-b border-white/5">
            <h2 className="text-xl font-[family-name:var(--font-die-grotesk-b)] tracking-tight">MAPA ADMIN</h2>
            <p className="text-xs text-slate mt-1">V1.0.0 // CRM SYSTEM</p>
          </div>
          
          <nav className="p-4 flex flex-col gap-2">
            <Link 
              href="/admin"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname === '/admin' ? 'bg-bone text-obsidian' : 'text-slate hover:bg-white/5 hover:text-bone'}`}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </Link>
            <Link 
              href="/admin/kanban"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname === '/admin/kanban' ? 'bg-bone text-obsidian' : 'text-slate hover:bg-white/5 hover:text-bone'}`}
            >
              <Kanban size={18} />
              <span>Proyectos</span>
            </Link>
            <Link 
              href="/admin/documentos"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname === '/admin/documentos' ? 'bg-bone text-obsidian' : 'text-slate hover:bg-white/5 hover:text-bone'}`}
            >
              <FileText size={18} />
              <span>Plantillas PDF</span>
            </Link>
            <Link 
              href="/admin/finanzas"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname === '/admin/finanzas' ? 'bg-bone text-obsidian' : 'text-slate hover:bg-white/5 hover:text-bone'}`}
            >
              <CircleDollarSign size={18} />
              <span>Finanzas</span>
            </Link>
          </nav>
        </div>

        <div className="p-4 border-t border-white/5">
          <form action={logoutAction}>
            <button type="submit" className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-red-400 hover:bg-red-400/10 transition-colors">
              <LogOut size={18} />
              <span>Cerrar Sesión</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-obsidian relative">
        <div className="p-8 lg:p-12 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
