'use client';

import { useEffect, useState } from 'react';
import { getAllProjects } from '@/services/projectService';
import { Briefcase, CreditCard, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

type ProjectStats = {
  totalRevenue: number;
  totalPending: number;
  activeProjects: number;
  completedProjects: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<ProjectStats>({
    totalRevenue: 0,
    totalPending: 0,
    activeProjects: 0,
    completedProjects: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getAllProjects();

        if (data) {
          let revenue = 0;
          let pending = 0;
          let active = 0;
          let completed = 0;

          data.forEach(project => {
            revenue += Number(project.amount_paid || 0);
            pending += (Number(project.total_value || 0) - Number(project.amount_paid || 0));
            
            if (project.status === 'entregado' || project.status === 'archivado') {
              completed += 1;
            } else {
              active += 1;
            }
          });

          setStats({ totalRevenue: revenue, totalPending: pending, activeProjects: active, completedProjects: completed });
        }
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(amount);
  };

  if (loading) {
    return <div className="animate-pulse flex space-x-4"><div className="flex-1 space-y-6 py-1"><div className="h-4 bg-white/10 rounded w-1/4"></div><div className="space-y-3"><div className="h-20 bg-white/10 rounded"></div></div></div></div>;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-[family-name:var(--font-die-grotesk-b)] mb-2">Resumen Financiero</h1>
          <p className="text-slate text-sm">Vista general del rendimiento de tu negocio freelance.</p>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-[#141210] border border-white/5 rounded-2xl p-4 sm:p-5 md:p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs text-slate uppercase tracking-widest">Ingresos Totales</h3>
            <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400"><CreditCard size={16} /></div>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl sm:text-3xl md:text-4xl font-light text-bone font-[family-name:var(--font-die-grotesk-b)] truncate w-full">
              {formatCurrency(stats.totalRevenue)}
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-[#141210] border border-white/5 rounded-2xl p-4 sm:p-5 md:p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs text-slate uppercase tracking-widest">Por Cobrar</h3>
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400"><Clock size={16} /></div>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl sm:text-3xl md:text-4xl font-light text-orange-400 font-[family-name:var(--font-die-grotesk-b)] truncate w-full">
              {formatCurrency(stats.totalPending)}
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-[#141210] border border-white/5 rounded-2xl p-4 sm:p-5 md:p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs text-slate uppercase tracking-widest">Proyectos Activos</h3>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400"><Briefcase size={16} /></div>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl sm:text-3xl md:text-4xl font-light text-bone font-[family-name:var(--font-die-grotesk-b)]">
              {stats.activeProjects}
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="bg-[#141210] border border-white/5 rounded-2xl p-4 sm:p-5 md:p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs text-slate uppercase tracking-widest">Entregados</h3>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400"><CheckCircle size={16} /></div>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl sm:text-3xl md:text-4xl font-light text-bone font-[family-name:var(--font-die-grotesk-b)] truncate w-full">
              {stats.completedProjects}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
