'use client';

import { useEffect, useState } from 'react';
import { FileText, Download, ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { getAllProjects, updateProjectStatus, updateProject, createProject, removeProject, type Project } from '@/services/projectService';

export default function DocumentosPage() {
  const [step, setStep] = useState(1);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form State
  const [docType, setDocType] = useState('cotizacion');
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [clientName, setClientName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectValue, setProjectValue] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [currency, setCurrency] = useState<'COP' | 'USD'>('COP');

  // Additional Fields
  const [problemText, setProblemText] = useState('Actualmente el proceso de ventas es manual, se pierde tiempo respondiendo mensajes y no hay un sistema centralizado.');
  const [solutionText, setSolutionText] = useState('Una infraestructura digital de alto rendimiento diseñada para automatizar ventas 24/7 y centralizar la administración.');
  const [deliverablesText, setDeliverablesText] = useState('Diseño UI de alto impacto.\nDesarrollo frontend ultrarrápido.\nEnlace directo con WhatsApp.\nPanel administrativo básico.');
  const [optionalModulesText, setOptionalModulesText] = useState('Dominio y Hosting anual: $ 150.000\nMantenimiento mensual: $ 80.000');
  const [timelineText, setTimelineText] = useState('Fase 1 (Diseño): 3-5 días.\nFase 2 (Programación): 7-10 días.\nFase 3 (Lanzamiento): 2-3 días.');
  const [validityDays, setValidityDays] = useState('15');

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getAllProjects();
        setProjects(data);
      } catch (error) {
        toast.error('Error al cargar proyectos');
      } finally {
        setIsLoading(false);
      }
    }
    loadProjects();
  }, []);

  const handleProjectSelect = (id: string) => {
    setSelectedProjectId(id);
    if (!id) {
      setClientName('');
      setProjectName('');
      setProjectValue('');
      setAmountPaid('');
      return;
    }
    const p = projects.find(proj => proj.id === id);
    if (p) {
      setClientName(p.client_name);
      setProjectName(p.project_name);
      setProjectValue(p.total_value.toString());
      setAmountPaid(p.amount_paid.toString());
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const formatCurrency = (amount: string | number) => {
    return new Intl.NumberFormat(currency === 'COP' ? 'es-CO' : 'en-US', { 
      style: 'currency', 
      currency: currency, 
      maximumFractionDigits: currency === 'COP' ? 0 : 2 
    }).format(Number(amount) || 0);
  };

  const halfValue = formatCurrency((Number(projectValue) / 2));
  const pendingBalance = formatCurrency(Number(projectValue) - Number(amountPaid));

  return (
    <div className="flex flex-col gap-6 h-full p-4 md:p-8 w-full max-w-4xl mx-auto">
      <style type="text/css" media="print">
        {`
          @page { margin: 0; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        `}
      </style>

      {/* WIZARD UI (HIDDEN ON PRINT) */}
      <div className="print:hidden w-full bg-[#141210] border border-white/5 rounded-2xl p-6 flex flex-col gap-6 shadow-xl">
        
        {/* PROGRESS INDICATOR */}
        <div className="flex items-center justify-between mb-4 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -z-10 -translate-y-1/2"></div>
          
          {[1, 2, 3].map((num) => (
            <div key={num} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= num ? 'bg-green-500 text-black' : 'bg-obsidian text-slate border border-white/10'}`}>
              {step > num ? <CheckCircle2 size={16} /> : num}
            </div>
          ))}
        </div>

        {/* STEP 1: ELEGIR PROYECTO */}
        {step === 1 && (
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4">
            <div>
              <h2 className="text-xl font-[family-name:var(--font-die-grotesk-b)] mb-1">Paso 1: Configuración Inicial</h2>
              <p className="text-sm text-slate">Selecciona el tipo de documento y vincúlalo a un proyecto existente si lo deseas.</p>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs text-slate uppercase tracking-widest text-green-400">Tipo de Documento</label>
                <select value={docType} onChange={e => setDocType(e.target.value)} className="bg-obsidian border border-white/10 rounded-lg p-3 text-bone focus:outline-none focus:border-green-500/50">
                  <option value="cotizacion">Propuesta Comercial</option>
                  <option value="contrato">Contrato de Servicios</option>
                  <option value="factura">Factura / Recibo</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs text-slate uppercase tracking-widest text-green-400">Vincular Proyecto</label>
                <select 
                  value={selectedProjectId} 
                  onChange={e => handleProjectSelect(e.target.value)} 
                  disabled={isLoading}
                  className="bg-obsidian border border-white/10 rounded-lg p-3 text-bone focus:outline-none focus:border-green-500/50"
                >
                  <option value="">-- Escribir manualmente --</option>
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.client_name} - {p.project_name}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs text-slate uppercase tracking-widest">Moneda</label>
                <select value={currency} onChange={e => setCurrency(e.target.value as 'COP' | 'USD')} className="bg-obsidian border border-white/10 rounded-lg p-3 text-bone">
                  <option value="COP">COP ($)</option>
                  <option value="USD">USD (US$)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button onClick={() => setStep(2)} className="bg-bone text-obsidian px-6 py-3 rounded-xl font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-white transition-colors">
                Siguiente <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: INGRESAR VALORES Y FECHAS */}
        {step === 2 && (
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4">
             <div>
              <h2 className="text-xl font-[family-name:var(--font-die-grotesk-b)] mb-1">Paso 2: Datos del Documento</h2>
              <p className="text-sm text-slate">Verifica o edita la información que aparecerá en el PDF.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-xs text-slate uppercase tracking-widest">Cliente / Empresa</label>
                <input type="text" value={clientName} onChange={e => setClientName(e.target.value)} className="bg-obsidian border border-white/10 rounded-lg p-3 text-bone" placeholder="Nombre del cliente" />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-xs text-slate uppercase tracking-widest">Servicio Base</label>
                <input type="text" value={projectName} onChange={e => setProjectName(e.target.value)} className="bg-obsidian border border-white/10 rounded-lg p-3 text-bone" placeholder="Ej: E-commerce Nivel 2" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs text-slate uppercase tracking-widest">Valor Base</label>
                <input type="number" value={projectValue} onChange={e => setProjectValue(e.target.value)} className="bg-obsidian border border-white/10 rounded-lg p-3 text-bone" placeholder="0" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs text-slate uppercase tracking-widest">Valor Abonado</label>
                <input type="number" value={amountPaid} onChange={e => setAmountPaid(e.target.value)} className="bg-obsidian border border-white/10 rounded-lg p-3 text-bone" placeholder="0" />
              </div>
            </div>

            {docType === 'cotizacion' && (
              <div className="flex flex-col gap-4 mt-4 pt-4 border-t border-white/10">
                <h3 className="text-sm font-bold text-green-400">Textos de la Propuesta</h3>
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-slate uppercase">Diagnóstico / Problema</label>
                  <textarea value={problemText} onChange={e => setProblemText(e.target.value)} className="bg-obsidian border border-white/10 rounded-lg p-3 text-bone text-sm h-20" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-slate uppercase">Solución</label>
                  <textarea value={solutionText} onChange={e => setSolutionText(e.target.value)} className="bg-obsidian border border-white/10 rounded-lg p-3 text-bone text-sm h-20" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-slate uppercase">Entregables (Uno por línea)</label>
                  <textarea value={deliverablesText} onChange={e => setDeliverablesText(e.target.value)} className="bg-obsidian border border-white/10 rounded-lg p-3 text-bone text-sm h-24" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-slate uppercase">Cronograma</label>
                  <textarea value={timelineText} onChange={e => setTimelineText(e.target.value)} className="bg-obsidian border border-white/10 rounded-lg p-3 text-bone text-sm h-20" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-slate uppercase">Validez (días)</label>
                  <input type="number" value={validityDays} onChange={e => setValidityDays(e.target.value)} className="bg-obsidian border border-white/10 rounded-lg p-3 text-bone" />
                </div>
              </div>
            )}

            <div className="flex justify-between mt-4">
              <button onClick={() => setStep(1)} className="text-slate px-4 py-3 rounded-xl font-bold tracking-widest flex items-center gap-2 hover:bg-white/5 transition-colors">
                <ChevronLeft size={18} /> Atrás
              </button>
              <button onClick={() => setStep(3)} className="bg-bone text-obsidian px-6 py-3 rounded-xl font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-white transition-colors">
                Finalizar <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: DESCARGAR PDF */}
        {step === 3 && (
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4">
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText size={40} />
              </div>
              <h2 className="text-2xl font-[family-name:var(--font-die-grotesk-b)] mb-2">¡Documento Listo!</h2>
              <p className="text-slate mb-8 max-w-md mx-auto">Revisa que la información sea correcta. Haz clic en "Descargar PDF" para abrir la ventana de impresión (asegúrate de guardar como PDF).</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => setStep(2)} className="text-slate border border-white/10 px-6 py-3 rounded-xl font-bold tracking-widest flex justify-center items-center gap-2 hover:bg-white/5 transition-colors">
                  <ChevronLeft size={18} /> Editar Datos
                </button>
                <button onClick={handlePrint} className="bg-green-500 text-black px-8 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-green-400 transition-colors flex justify-center items-center gap-2">
                  <Download size={18} /> Descargar PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* PRINT AREA: The actual Document - hidden on UI, flex on print */}
      <div className="hidden print:flex bg-white text-black p-10 font-[family-name:var(--font-ibm-plex-mono)] mx-auto w-full min-h-[297mm] flex-col justify-between">
        
        <div className="w-full">
          {/* HEADER COMPARTIDO */}
          <div className="flex justify-between items-end border-b-2 border-black pb-6 mb-10">
            <div>
              <img src="/icon.png" alt="Miguel Albornoz" className="h-16 w-auto object-contain grayscale" />
              <p className="tracking-widest text-[10px] font-bold mt-2 uppercase">Software Engineer & CRM Expert</p>
            </div>
            <div className="text-right text-xs">
              <p>Fecha: <span>{new Date().toLocaleDateString('es-CO')}</span></p>
              <p>Cliente: <strong>{clientName || '_______________'}</strong></p>
              {docType === 'factura' && <p>Recibo No. {Math.floor(Math.random() * 90000) + 10000}</p>}
            </div>
          </div>

          {/* CONTENIDO CONDICIONAL: COTIZACIÓN */}
          {docType === 'cotizacion' && (
            <div className="flex flex-col gap-8 text-sm">
              <h2 className="text-2xl font-black font-[family-name:var(--font-die-grotesk-b)] uppercase text-center mb-4">Propuesta Comercial Formal</h2>
              
              <div>
                <h3 className="font-bold border-b border-gray-300 mb-2 pb-1">1. DIAGNÓSTICO Y SOLUCIÓN</h3>
                <p className="mb-2 text-gray-700 italic">"{problemText}"</p>
                <p>Desarrollaremos un <strong>{projectName || 'Servicio'}</strong>. {solutionText}</p>
              </div>

              <div>
                <h3 className="font-bold border-b border-gray-300 mb-2 pb-1">2. ALCANCE TÉCNICO Y ENTREGABLES</h3>
                <ul className="list-disc pl-5 flex flex-col gap-2">
                  {deliverablesText.split('\\n').map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold border-b border-gray-300 mb-2 pb-1">3. CRONOGRAMA DE EJECUCIÓN</h3>
                <p className="mb-2">El tiempo comienza a correr tras la entrega total de insumos y el pago del anticipo.</p>
                <ul className="list-disc pl-5 flex flex-col gap-1">
                  {timelineText.split('\\n').map((item, index) => (
                    <li key={index}><strong>{item.split(':')[0]}:</strong> {item.split(':')[1] || ''}</li>
                  ))}
                </ul>
              </div>

              <div className="break-inside-avoid">
                <h3 className="font-bold border-b border-gray-300 mb-2 pb-1">4. INVERSIÓN TÉCNICA</h3>
                <table className="w-full text-left border-collapse mt-4">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 border border-gray-300">Descripción del Servicio</th>
                      <th className="p-3 border border-gray-300 w-1/3">Valor ({currency})</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border border-gray-300 font-bold">{projectName || 'Servicio Base'}</td>
                      <td className="p-3 border border-gray-300 font-bold text-lg">{formatCurrency(projectValue)}</td>
                    </tr>
                    {optionalModulesText.trim() !== '' && optionalModulesText.split('\\n').map((item, index) => (
                      <tr key={index} className="text-gray-500 text-xs">
                        <td className="p-3 border border-gray-300 italic">+ Opcional: {item.split(':')[0]}</td>
                        <td className="p-3 border border-gray-300">{item.split(':')[1] || ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 p-6 bg-gray-50 border border-gray-200 break-inside-avoid">
                <h3 className="font-bold text-lg mb-2">CONDICIONES Y SIGUIENTES PASOS</h3>
                <p>Para agendar el espacio en el calendario de desarrollo, requerimos la aprobación de esta propuesta y el pago del <strong>50% de anticipo ({halfValue})</strong>. El 50% restante se abona contra entrega final.</p>
                <p className="text-xs text-gray-500 mt-2">* Esta propuesta tiene una validez técnica y comercial de <strong>{validityDays} días calendario</strong>.</p>
              </div>
            </div>
          )}

          {/* CONTENIDO CONDICIONAL: CONTRATO */}
          {docType === 'contrato' && (
            <div className="flex flex-col gap-6 text-xs text-justify">
              <h2 className="text-xl font-black font-[family-name:var(--font-die-grotesk-b)] uppercase text-center mb-2">Contrato de Desarrollo de Software</h2>
              
              <p>Entre los suscritos, por una parte, <strong>MIGUEL ALBORNOZ</strong>, en adelante EL CONTRATISTA, y por la otra <strong>{clientName || 'EL CLIENTE'}</strong>, en adelante EL CLIENTE, hemos convenido celebrar el presente contrato:</p>

              <p><strong>PRIMERA - OBJETO:</strong> EL CONTRATISTA se compromete a desarrollar y entregar un <strong>{projectName || 'Software'}</strong> con las especificaciones detalladas en la Propuesta Comercial previamente enviada.</p>

              <p><strong>SEGUNDA - LÍMITES:</strong> Cualquier módulo extra, página adicional o integración de pasarela de pagos que no esté expresamente descrita en la cotización inicial, será considerada fuera de alcance, cotizada y facturada de manera independiente.</p>

              <p><strong>TERCERA - OBLIGACIONES:</strong> EL CLIENTE se compromete a entregar todos los insumos necesarios en los tiempos estipulados. Los retrasos mayores a 3 días hábiles en la entrega de material pausarán el cronograma de desarrollo. Si EL CLIENTE suspende la comunicación por 30 días, el proyecto se considerará abandonado sin devolución del anticipo (Cláusula de Abandono).</p>

              <p><strong>CUARTA - FORMA DE PAGO:</strong> El valor total del proyecto es de <strong>{formatCurrency(projectValue)}</strong>. Se pagará 50% (<strong>{halfValue}</strong>) como anticipo no reembolsable. El 50% restante (<strong>{halfValue}</strong>) se pagará contra entrega en entorno de pruebas y <strong>estrictamente antes</strong> de la migración al dominio final o entrega del código fuente.</p>

              <p><strong>QUINTA - PROPIEDAD Y GARANTÍA:</strong> Tras el pago del 100%, los derechos de uso comercial pasarán a EL CLIENTE. Se ofrece garantía de 15 días para la corrección de errores de código (bugs). La garantía se anula si terceros alteran el código.</p>

              <p><strong>SEXTA - EXHIBICIÓN EN PORTAFOLIO:</strong> EL CLIENTE marca con una "X" si autoriza a EL CONTRATISTA a exhibir piezas gráficas y mención del proyecto en su portafolio público con fines demostrativos:</p>
              
              <p className="pl-4">
                (&nbsp;&nbsp;&nbsp;) <strong>SÍ</strong>, autorizo la exhibición. <br/>
                (&nbsp;&nbsp;&nbsp;) <strong>NO</strong>, requiero total privacidad.
              </p>

              <div className="flex justify-between mt-20 pt-4 border-t border-gray-300">
                <div className="w-[45%] text-center">
                  <div className="border-b border-black w-full mb-2"></div>
                  <strong>MIGUEL ALBORNOZ</strong><br/>EL CONTRATISTA
                </div>
                <div className="w-[45%] text-center">
                  <div className="border-b border-black w-full mb-2"></div>
                  <strong>{clientName || 'EL CLIENTE'}</strong><br/>EL CLIENTE
                </div>
              </div>
            </div>
          )}

          {/* CONTENIDO CONDICIONAL: FACTURA */}
          {docType === 'factura' && (
            <div className="flex flex-col gap-8 text-sm">
              <h2 className="text-2xl font-black font-[family-name:var(--font-die-grotesk-b)] uppercase text-center mb-8">Recibo de Pago / Factura</h2>
              
              <div className="flex flex-col gap-4 mb-8">
                <p><strong>Cliente / Entidad:</strong> {clientName}</p>
                <p><strong>Concepto del Servicio:</strong> Diseño y Desarrollo de {projectName}</p>
              </div>

              <table className="w-full text-left border-collapse mt-4">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-4 border border-gray-300">Descripción</th>
                    <th className="p-4 border border-gray-300 text-right w-1/3">Importe ({currency})</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4 border border-gray-300">Valor Total del Proyecto</td>
                    <td className="p-4 border border-gray-300 text-right">{formatCurrency(projectValue)}</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="p-4 border border-gray-300 font-bold text-green-800">TOTAL ABONADO / RECIBIDO</td>
                    <td className="p-4 border border-gray-300 text-right font-bold text-green-800">{formatCurrency(amountPaid)}</td>
                  </tr>
                  <tr className="bg-red-50">
                    <td className="p-4 border border-gray-300 font-bold text-red-800">SALDO PENDIENTE POR COBRAR</td>
                    <td className="p-4 border border-gray-300 text-right font-bold text-red-800">{pendingBalance}</td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-12 text-center text-xs text-gray-500">
                <p>Este documento certifica la recepción de los fondos estipulados en la fila "Total Abonado".</p>
                <p>Las obligaciones sobre el saldo pendiente se rigen bajo el Contrato de Desarrollo previamente firmado.</p>
              </div>
            </div>
          )}
        </div>

        {/* FIRMA AL FINAL DE LA PÁGINA (SOLO FACTURAS) */}
        {docType === 'factura' && (
          <div className="mt-20 pt-4 border-t border-gray-300 w-1/2 mx-auto text-center text-xs">
            <strong>MIGUEL ALBORNOZ</strong><br/>
            Software Engineer<br/>
            Firma de Recibido Conforme
          </div>
        )}
      </div>
    </div>
  );
}
