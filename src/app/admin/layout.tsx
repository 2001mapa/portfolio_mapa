'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { LayoutDashboard, FileText, Kanban, CircleDollarSign, LogOut, Menu, X, Plus } from 'lucide-react';
import { logoutAction } from './actions';
import { getAllProjects, updateProjectStatus, updateProject, createProject, removeProject } from '@/services/projectService';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Quick Add State
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [quickAddName, setQuickAddName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuickAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickAddName.trim()) return;
    
    setIsSubmitting(true);
    try {
      await createProject({
        client_name: quickAddName,
        project_name: "Por definir",
        status: "cotizando",
        total_value: 0,
        amount_paid: 0
      });
      setIsQuickAddOpen(false);
      setQuickAddName('');
      // Optionally reload the page or trigger a store update so kanban reloads if user is there
      if (pathname === '/admin/kanban') {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error creating project:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // If we are on the login page, don't show the sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen print:h-auto print:block bg-obsidian text-bone font-[family-name:var(--font-ibm-plex-mono)] overflow-hidden">
      
      {/* Mobile Topbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#141210] border-b border-white/5 flex items-center justify-between px-4 z-40 print:hidden">
        <h2 className="text-xl font-[family-name:var(--font-die-grotesk-b)] tracking-tight">MAPA ADMIN</h2>
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate hover:text-white">
          <Menu size={24} />
        </button>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 md:relative md:translate-x-0 border-r border-white/5 bg-[#141210] flex flex-col justify-between print:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div>
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-[family-name:var(--font-die-grotesk-b)] tracking-tight">MAPA ADMIN</h2>
              <p className="text-xs text-slate mt-1">V1.0.0 // CRM SYSTEM</p>
            </div>
            <button className="md:hidden text-slate hover:text-white" onClick={() => setIsSidebarOpen(false)}>
              <X size={24} />
            </button>
          </div>
          
          <nav className="p-4 flex flex-col gap-2">
            <Link 
              href="/admin"
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname === '/admin' ? 'bg-bone text-obsidian' : 'text-slate hover:bg-white/5 hover:text-bone'}`}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </Link>
            <Link 
              href="/admin/kanban"
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname === '/admin/kanban' ? 'bg-bone text-obsidian' : 'text-slate hover:bg-white/5 hover:text-bone'}`}
            >
              <Kanban size={18} />
              <span>Proyectos</span>
            </Link>
            <Link 
              href="/admin/documentos"
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname === '/admin/documentos' ? 'bg-bone text-obsidian' : 'text-slate hover:bg-white/5 hover:text-bone'}`}
            >
              <FileText size={18} />
              <span>Plantillas PDF</span>
            </Link>
            <Link 
              href="/admin/finanzas"
              onClick={() => setIsSidebarOpen(false)}
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
      <main className="flex-1 overflow-y-auto bg-obsidian relative print:overflow-visible print:bg-white pt-16 md:pt-0">
        <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto print:p-0 print:m-0 print:max-w-none">
          {children}
        </div>
      </main>

      {/* Global Quick Add FAB */}
      <button
        onClick={() => setIsQuickAddOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-bone text-obsidian rounded-full shadow-lg hover:scale-105 transition-transform print:hidden"
        title="Quick Add"
      >
        <Plus size={24} />
      </button>

      {/* Global Quick Add Modal */}
      {isQuickAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm print:hidden">
          <div className="bg-[#141210] border border-white/10 rounded-xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-[family-name:var(--font-die-grotesk-b)] text-bone">Añadir rápido</h3>
              <button onClick={() => setIsQuickAddOpen(false)} className="text-slate hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleQuickAdd}>
              <div className="mb-6">
                <label htmlFor="quickAddName" className="block text-sm text-slate mb-2">Nombre del cliente o proyecto</label>
                <input
                  type="text"
                  id="quickAddName"
                  value={quickAddName}
                  onChange={(e) => setQuickAddName(e.target.value)}
                  placeholder="Ej. Juan Pérez"
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-bone focus:outline-none focus:border-white/30 transition-colors"
                  autoFocus
                  required
                />
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsQuickAddOpen(false)}
                  className="px-4 py-2 text-slate hover:text-bone transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !quickAddName.trim()}
                  className="px-6 py-2 bg-bone text-obsidian rounded-lg font-medium hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Creando...' : 'Crear lead'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
