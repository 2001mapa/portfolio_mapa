'use client';

import { useEffect, useState } from 'react';
import { projectService, Project } from '@/services/projectService';
import { CircleDollarSign, ArrowUpRight, Activity, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FinanzasPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFinances() {
      try {
        const data = await projectService.getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching finances:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFinances();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(amount);
  };

  const handleRegistrarPago = (project: Project) => {
    alert(`Simulación: Registrar pago para ${project.client_name} - ${project.project_name}`);
  };

  const totalRevenue = projects.reduce((sum, p) => sum + Number(p.amount_paid || 0), 0);
  const totalPending = projects.reduce((sum, p) => sum + (Number(p.total_value || 0) - Number(p.amount_paid || 0)), 0);

  return (
    <div className="flex flex-col gap-8 h-full">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-[family-name:var(--font-die-grotesk-b)] mb-2">Control Financiero</h1>
          <p className="text-slate text-sm">Registro detallado de pagos, cobros y flujos de caja.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#1c1a17] p-6 rounded-2xl border border-white/5">
          <div className="flex items-center gap-3 mb-2 opacity-70">
            <CircleDollarSign className="text-green-400" size={20} />
            <h3 className="text-sm font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-wider">Caja Actual (Pagado)</h3>
          </div>
          <p className="text-3xl font-[family-name:var(--font-die-grotesk-b)] text-green-400">{formatCurrency(totalRevenue)}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="bg-[#1c1a17] p-6 rounded-2xl border border-white/5">
          <div className="flex items-center gap-3 mb-2 opacity-70">
            <Activity className="text-orange-400" size={20} />
            <h3 className="text-sm font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-wider">Deuda Viva (Por Cobrar)</h3>
          </div>
          <p className="text-3xl font-[family-name:var(--font-die-grotesk-b)] text-orange-400">{formatCurrency(totalPending)}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="bg-[#1c1a17] p-6 rounded-2xl border border-white/5">
          <div className="flex items-center gap-3 mb-2 opacity-70">
            <ArrowUpRight className="text-blue-400" size={20} />
            <h3 className="text-sm font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-wider">Valor Proyectado Total</h3>
          </div>
          <p className="text-3xl font-[family-name:var(--font-die-grotesk-b)] text-blue-400">{formatCurrency(totalRevenue + totalPending)}</p>
        </motion.div>
      </div>

      <div className="mt-4">
        {loading ? (
          <div className="p-8 text-center text-slate animate-pulse bg-[#141210] border border-white/5 rounded-2xl">
            Cargando libros contables...
          </div>
        ) : projects.length === 0 ? (
          <div className="p-8 text-center text-slate bg-[#141210] border border-white/5 rounded-2xl">
            No hay registros financieros todavía. Crea tu primer proyecto en el Kanban.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {projects.map((project) => {
              const pending = Number(project.total_value) - Number(project.amount_paid);
              const progress = Number(project.total_value) > 0 ? (Number(project.amount_paid) / Number(project.total_value)) * 100 : 0;
              
              return (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  key={project.id} 
                  className="bg-[#1c1a17] border border-white/5 rounded-2xl p-5 flex flex-col gap-4 hover:border-white/10 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-bone text-lg leading-tight">{project.client_name}</h3>
                      <p className="text-sm text-slate">{project.project_name}</p>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full border border-white/10 bg-white/5 text-slate shrink-0">
                      {project.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 bg-[#141210] p-4 rounded-xl border border-white/5">
                    <div>
                      <p className="text-xs text-slate mb-1 font-[family-name:var(--font-ibm-plex-mono)] uppercase">Valor Total</p>
                      <p className="font-[family-name:var(--font-ibm-plex-mono)] text-sm">{formatCurrency(project.total_value)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate mb-1 font-[family-name:var(--font-ibm-plex-mono)] uppercase">Abonado</p>
                      <p className="font-[family-name:var(--font-ibm-plex-mono)] text-sm text-green-400">{formatCurrency(project.amount_paid)}</p>
                    </div>
                    <div className="col-span-2 border-t border-white/5 pt-3 mt-1">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-xs text-slate font-[family-name:var(--font-ibm-plex-mono)] uppercase">Saldo Pendiente</p>
                        <p className="font-[family-name:var(--font-ibm-plex-mono)] text-sm text-orange-400">{formatCurrency(pending)}</p>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="w-full bg-white/10 rounded-full h-1.5">
                          <div className="bg-green-400 h-1.5 rounded-full" style={{ width: `${Math.min(progress, 100)}%` }}></div>
                        </div>
                        <span className="text-[10px] text-slate w-8 text-right font-[family-name:var(--font-ibm-plex-mono)]">{Math.round(progress)}%</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleRegistrarPago(project)}
                    className="mt-auto w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-sm font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus size={16} />
                    Registrar Pago
                  </button>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  );
}
