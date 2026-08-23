'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { LayoutDashboard, FileText, Kanban, CircleDollarSign, LogOut, Menu, X, Plus, Lock } from 'lucide-react';
import { getAllProjects, updateProjectStatus, updateProject, createProject, removeProject } from '@/services/projectService';
import { toast } from 'sonner';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Quick Add State
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [quickAddName, setQuickAddName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Change PIN State
  const [isChangePinOpen, setIsChangePinOpen] = useState(false);
  const [newPinValue, setNewPinValue] = useState('');
  const [isSubmittingPin, setIsSubmittingPin] = useState(false);

  const handleChangePin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPinValue.length !== 4) return;
    
    setIsSubmittingPin(true);
    try {
      const res = await fetch('/api/change-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPin: newPinValue }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        toast.error(data.error || 'Error al cambiar PIN');
      } else {
        toast.success('PIN actualizado exitosamente');
        setIsChangePinOpen(false);
        setNewPinValue('');
      }
    } catch (error) {
      toast.error('Error de conexión');
    } finally {
      setIsSubmittingPin(false);
    }
  };

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
  if (pathname === '/admin/login' || pathname === '/admin/enter') {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen print:h-auto print:block bg-obsidian text-bone font-[family-name:var(--font-ibm-plex-mono)] overflow-hidden">
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-4 pb-4 pt-[calc(1rem+env(safe-area-inset-top))] border-b border-white/5 bg-obsidian/90 backdrop-blur-md fixed top-0 w-full z-40 transition-all">
        <h1 className="font-[family-name:var(--font-die-grotesk-b)] text-bone text-lg">MAPA Admin</h1>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="text-bone p-2 hover:bg-white/5 rounded-full transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#141210] border-r border-white/5 flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:translate-x-0 ${isSidebarOpen ? 'translate-x-0 rounded-r-2xl shadow-2xl pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] md:rounded-none md:shadow-none md:pt-0 md:pb-0' : '-translate-x-full'} md:static`}
      >
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
          <button 
            onClick={() => setIsChangePinOpen(true)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-slate hover:bg-white/5 hover:text-bone transition-colors mb-2"
          >
            <Lock size={18} />
            <span>Cambiar PIN</span>
          </button>
          <button 
            onClick={async () => {
              await fetch('/api/logout', { method: 'POST' });
              window.location.href = '/admin/enter';
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-red-400 hover:bg-red-400/10 transition-colors"
          >
            <LogOut size={18} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-obsidian relative print:overflow-visible print:bg-white pt-[calc(3rem+env(safe-area-inset-top))] md:pt-0">
        <div className="p-4 pb-[calc(5rem+env(safe-area-inset-bottom))] md:p-8 md:pb-8 lg:p-12 max-w-7xl mx-auto print:p-0 print:m-0 print:max-w-none">
          {children}
        </div>
      </main>

      {/* Global Quick Add FAB */}
      <button
        onClick={() => setIsQuickAddOpen(true)}
        className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-4 md:bottom-6 md:right-6 z-40 flex items-center justify-center w-14 h-14 bg-bone text-obsidian rounded-full shadow-[0_4px_20px_rgba(234,229,217,0.3)] hover:scale-105 hover:bg-white transition-all print:hidden"
        title="Quick Add"
      >
        <Plus size={24} />
      </button>

      {/* Change PIN Modal */}
      {isChangePinOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-md print:hidden">
          <div className="bg-[#141210] border border-white/10 rounded-t-3xl sm:rounded-2xl p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:pb-6 w-full max-w-md shadow-2xl transition-all">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-[family-name:var(--font-die-grotesk-b)] text-bone">Cambiar PIN</h3>
              <button onClick={() => setIsChangePinOpen(false)} className="text-slate hover:text-white transition-colors bg-white/5 rounded-full p-2">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleChangePin}>
              <div className="mb-6">
                <label htmlFor="newPin" className="block text-sm text-slate mb-2">Nuevo PIN (4 dígitos)</label>
                <input
                  type="password"
                  id="newPin"
                  value={newPinValue}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    if (val.length <= 4) setNewPinValue(val);
                  }}
                  placeholder="Ej. 1234"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-bone focus:outline-none focus:border-white/30 transition-colors tracking-[0.5em] font-bold text-center text-2xl"
                  autoFocus
                  required
                />
                <p className="text-xs text-slate mt-3 text-center">Debe configurar SUPABASE_SERVICE_ROLE_KEY en Vercel para que funcione.</p>
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsChangePinOpen(false)}
                  className="px-4 py-3 text-slate hover:text-bone transition-colors font-medium w-full sm:w-auto"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingPin || newPinValue.length !== 4}
                  className="px-6 py-3 bg-bone text-obsidian rounded-xl font-medium hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex gap-2 items-center justify-center w-full sm:w-auto shadow-lg"
                >
                  {isSubmittingPin ? 'Guardando...' : 'Guardar PIN'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Global Quick Add Modal */}
      {isQuickAddOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-md print:hidden">
          <div className="bg-[#141210] border border-white/10 rounded-t-3xl sm:rounded-2xl p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:pb-6 w-full max-w-md shadow-2xl transition-all">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-[family-name:var(--font-die-grotesk-b)] text-bone">Añadir Rápido</h3>
              <button onClick={() => setIsQuickAddOpen(false)} className="text-slate hover:text-white transition-colors bg-white/5 rounded-full p-2">
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
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-bone focus:outline-none focus:border-white/30 transition-colors"
                  autoFocus
                  required
                />
              </div>
              
              <div className="flex justify-end gap-3 flex-col-reverse sm:flex-row">
                <button
                  type="button"
                  onClick={() => setIsQuickAddOpen(false)}
                  className="px-4 py-3 text-slate hover:text-bone transition-colors font-medium w-full sm:w-auto"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !quickAddName.trim()}
                  className="px-6 py-3 bg-bone text-obsidian rounded-xl font-medium hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto shadow-lg"
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
