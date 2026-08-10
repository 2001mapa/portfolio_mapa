'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Trash2, Edit2, Archive, ArchiveRestore } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

type Project = {
  id: string;
  client_name: string;
  project_name: string;
  status: string;
  total_value: number;
  amount_paid: number;
  created_at: string;
};

export default function KanbanPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  // Form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showArchived, setShowArchived] = useState(false);
  const [formData, setFormData] = useState({
    client_name: '',
    project_name: '',
    total_value: 0,
    amount_paid: 0,
    status: 'cotizando'
  });

  const columns = [
    { id: 'cotizando', title: 'Cotizando / Leads', color: 'border-blue-500/50', bg: 'bg-blue-500/10 text-blue-400' },
    { id: 'desarrollo', title: 'En Desarrollo', color: 'border-orange-500/50', bg: 'bg-orange-500/10 text-orange-400' },
    { id: 'revision', title: 'En Revisión', color: 'border-yellow-500/50', bg: 'bg-yellow-500/10 text-yellow-400' },
    { id: 'entregado', title: 'Entregado', color: 'border-green-500/50', bg: 'bg-green-500/10 text-green-400' },
  ];

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      setProjects(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleStatusChange = async (projectId: string, newStatus: string) => {
    // Optimistic UI update
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, status: newStatus } : p));
    const { error } = await supabase.from('projects').update({ status: newStatus }).eq('id', projectId);
    if (error) {
      fetchProjects(); // Revert on error
    }
  };

  const handleArchive = async (projectId: string) => {
    toast('¿Archivar este proyecto?', {
      description: 'Desaparecerá del Kanban pero seguirá en tus Finanzas.',
      action: {
        label: 'Archivar',
        onClick: () => handleStatusChange(projectId, 'archivado')
      },
      cancel: { label: 'Cancelar', onClick: () => {} }
    });
  };

  const handleDelete = async (projectId: string) => {
    toast.error('¿Eliminar permanentemente?', {
      description: 'Esta acción no se puede deshacer.',
      action: {
        label: 'Eliminar',
        onClick: async () => {
          const { error } = await supabase.from('projects').delete().eq('id', projectId);
          if (!error) fetchProjects();
        }
      },
      cancel: { label: 'Cancelar', onClick: () => {} }
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      const { error } = await supabase.from('projects').update(formData).eq('id', editingId);
      if (!error) {
        setIsModalOpen(false);
        setEditingId(null);
        setFormData({ client_name: '', project_name: '', total_value: 0, amount_paid: 0, status: 'cotizando' });
        fetchProjects();
      }
    } else {
      const { error } = await supabase.from('projects').insert([formData]);
      if (!error) {
        setIsModalOpen(false);
        setFormData({ client_name: '', project_name: '', total_value: 0, amount_paid: 0, status: 'cotizando' });
        fetchProjects();
      }
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(amount);
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.setData('projectId', id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, statusId: string) => {
    e.preventDefault();
    const projectId = e.dataTransfer.getData('projectId');
    if (projectId && projectId !== '') {
      handleStatusChange(projectId, statusId);
      setDraggedId(null);
    }
  };

  return (
    <div className="flex flex-col gap-8 h-full">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-[family-name:var(--font-die-grotesk-b)] mb-2">Gestor de Proyectos</h1>
          <p className="text-slate text-sm">Arrastra o mueve los clientes según su fase de desarrollo.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setShowArchived(true)}
            className={`px-4 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors uppercase tracking-widest text-sm border border-white/10 text-slate hover:text-white`}
          >
            <Archive size={18} /> Ver Archivados ({projects.filter(p => p.status === 'archivado').length})
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-bone text-obsidian px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-white transition-colors uppercase tracking-widest text-sm"
          >
            <Plus size={18} /> Nuevo Proyecto
          </button>
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4 h-full scrollbar-hide snap-x snap-mandatory">
        {columns.map(col => (
          <div 
            key={col.id} 
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, col.id)}
            className="flex-1 min-w-[280px] md:min-w-[320px] snap-center flex flex-col gap-4"
          >
            <div className={`p-3 rounded-lg border border-white/5 bg-[#141210] flex justify-between items-center`}>
              <h3 className="font-bold tracking-tight uppercase text-sm text-slate">{col.title}</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${col.bg}`}>
                {projects.filter(p => p.status === col.id).length}
              </span>
            </div>

            <div className="flex flex-col gap-4 h-full">
              {loading ? (
                <div className="animate-pulse h-24 bg-white/5 rounded-xl"></div>
              ) : (
                projects.filter(p => p.status === col.id).map(project => (
                  <motion.div 
                    draggable
                    onDragStart={(e: any) => handleDragStart(e, project.id)}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    key={project.id} 
                    className={`bg-[#1c1a17] border-l-4 ${col.color} border-y border-r border-y-white/5 border-r-white/5 rounded-r-xl p-5 shadow-lg group cursor-grab active:cursor-grabbing hover:bg-[#25221e] transition-colors ${draggedId === project.id ? 'opacity-50' : 'opacity-100'}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold font-[family-name:var(--font-die-grotesk-b)] text-lg text-bone leading-tight">
                        {project.project_name}
                      </h4>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            setFormData({
                              client_name: project.client_name,
                              project_name: project.project_name,
                              total_value: project.total_value,
                              amount_paid: project.amount_paid,
                              status: project.status
                            });
                            setEditingId(project.id);
                            setIsModalOpen(true);
                          }} 
                          className="text-slate hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleArchive(project.id)} className="text-slate hover:text-green-400 opacity-0 group-hover:opacity-100 transition-opacity" title="Archivar Proyecto">
                          <Archive size={16} />
                        </button>
                        <button onClick={() => handleDelete(project.id)} className="text-slate hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity" title="Eliminar Permanentemente">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-slate mb-4 font-[family-name:var(--font-ibm-plex-mono)]">{project.client_name}</p>
                    
                    <div className="flex justify-between text-xs text-slate border-t border-white/5 pt-4">
                      <div className="flex flex-col gap-1">
                        <span className="uppercase text-[10px] tracking-widest opacity-50">Total</span>
                        <span className="font-bold">{formatCurrency(project.total_value)}</span>
                      </div>
                      <div className="flex flex-col gap-1 text-right">
                        <span className="uppercase text-[10px] tracking-widest opacity-50">Pagado</span>
                        <span className="font-bold text-green-400">{formatCurrency(project.amount_paid)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Creación / Edición */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#141210] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h2 className="text-2xl font-[family-name:var(--font-die-grotesk-b)] mb-6">{editingId ? 'Editar Proyecto' : 'Nuevo Proyecto'}</h2>
            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-slate uppercase tracking-widest block mb-2">Cliente / Empresa</label>
                <input required type="text" value={formData.client_name} onChange={e => setFormData({...formData, client_name: e.target.value})} className="w-full bg-obsidian border border-white/10 rounded-lg p-3 text-bone focus:border-bone" />
              </div>
              <div>
                <label className="text-xs text-slate uppercase tracking-widest block mb-2">Nombre del Proyecto</label>
                <input required type="text" value={formData.project_name} onChange={e => setFormData({...formData, project_name: e.target.value})} className="w-full bg-obsidian border border-white/10 rounded-lg p-3 text-bone focus:border-bone" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-xs text-slate uppercase tracking-widest block mb-2">Valor Total</label>
                  <input required type="number" value={formData.total_value} onChange={e => setFormData({...formData, total_value: Number(e.target.value)})} className="w-full bg-obsidian border border-white/10 rounded-lg p-3 text-bone focus:border-bone" />
                </div>
                <div className="flex flex-col gap-2">
                <label className="text-xs text-slate uppercase tracking-widest">Valor Pagado (Anticipos)</label>
                <input 
                  type="number" 
                  value={formData.amount_paid} 
                  onChange={e => setFormData({...formData, amount_paid: Number(e.target.value)})}
                  className="bg-obsidian border border-white/10 rounded-lg p-3 text-bone focus:border-bone"
                />
              </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs text-slate uppercase tracking-widest text-blue-400">Estado del Proyecto</label>
                <select 
                  value={formData.status} 
                  onChange={e => setFormData({...formData, status: e.target.value})}
                  className="bg-obsidian border border-white/10 rounded-lg p-3 text-bone focus:border-bone"
                >
                  <option value="cotizando" className="text-black">Cotizando / Leads</option>
                  <option value="desarrollo" className="text-black">En Desarrollo</option>
                  <option value="revision" className="text-black">En Revisión</option>
                  <option value="entregado" className="text-black">Entregado</option>
                </select>
              </div>

              <div className="flex justify-end gap-4 mt-4">
                <button type="button" onClick={() => { setIsModalOpen(false); setEditingId(null); setFormData({ client_name: '', project_name: '', total_value: 0, amount_paid: 0, status: 'cotizando' }); }} className="px-6 py-3 rounded-xl text-slate hover:text-white">Cancelar</button>
                <button type="submit" className="bg-bone text-obsidian px-6 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-white transition-colors">{editingId ? 'Guardar Cambios' : 'Crear'}</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Modal Archivados */}
      {showArchived && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#141210] border border-white/10 rounded-2xl p-8 max-w-2xl w-full shadow-2xl flex flex-col h-[80vh]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-[family-name:var(--font-die-grotesk-b)] flex items-center gap-2">
                <Archive size={24} className="text-slate" /> 
                Proyectos Archivados
              </h2>
              <button onClick={() => setShowArchived(false)} className="text-slate hover:text-white uppercase tracking-widest text-xs font-bold px-4 py-2 bg-white/5 rounded-lg">Cerrar</button>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide flex flex-col gap-4">
              {projects.filter(p => p.status === 'archivado').length === 0 ? (
                <div className="text-slate text-center py-20 opacity-50 flex flex-col items-center gap-4">
                  <Archive size={48} />
                  <p>No tienes proyectos archivados todavía.</p>
                </div>
              ) : (
                projects.filter(p => p.status === 'archivado').map(project => (
                  <div key={project.id} className="bg-[#1c1a17] border border-white/5 rounded-xl p-5 flex justify-between items-center group">
                    <div>
                      <h4 className="font-bold font-[family-name:var(--font-die-grotesk-b)] text-lg text-bone leading-tight">
                        {project.project_name}
                      </h4>
                      <p className="text-sm text-slate mb-1 font-[family-name:var(--font-ibm-plex-mono)]">{project.client_name}</p>
                      <span className="text-xs text-green-400 font-bold">{formatCurrency(project.amount_paid)} cobrado</span>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          toast('¿Restaurar este proyecto?', {
                            description: 'Volverá a aparecer en tu tablero Kanban en la columna Entregado.',
                            action: {
                              label: 'Restaurar',
                              onClick: () => handleStatusChange(project.id, 'entregado')
                            },
                            cancel: { label: 'Cancelar', onClick: () => {} }
                          });
                        }} 
                        className="text-slate hover:text-green-400 p-2 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" title="Restaurar al Kanban"
                      >
                        <ArchiveRestore size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(project.id)} 
                        className="text-slate hover:text-red-400 p-2 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" title="Eliminar Permanentemente"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
