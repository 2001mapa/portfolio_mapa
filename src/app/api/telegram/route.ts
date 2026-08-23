import { NextResponse } from 'next/server';
import { projectService } from '@/services/projectService';
import { jsPDF } from 'jspdf';

// Reemplaza con tu Telegram Chat ID para que el bot solo te escuche a ti
const MY_TELEGRAM_ID = process.env.TELEGRAM_ADMIN_ID;
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

async function sendMessage(chatId: number, text: string) {
  if (!BOT_TOKEN) return;
  
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: 'HTML'
    })
  });
}

async function sendDocument(chatId: number, pdfBuffer: ArrayBuffer, filename: string, caption: string) {
  if (!BOT_TOKEN) return;
  
  const formData = new FormData();
  formData.append('chat_id', chatId.toString());
  formData.append('caption', caption);
  formData.append('document', new Blob([pdfBuffer], { type: 'application/pdf' }), filename);
  
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
    method: 'POST',
    body: formData
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // El webhook de Telegram puede enviar "message" (texto) o "callback_query" (botones)
    const message = body.message;
    if (!message || !message.text) {
      return NextResponse.json({ ok: true });
    }

    const chatId = message.chat.id;
    const fromId = message.from.id.toString();
    const text = message.text.trim();

    if (MY_TELEGRAM_ID && fromId !== MY_TELEGRAM_ID) {
      await sendMessage(chatId, "⛔ Acceso denegado. No eres Miguel.");
      return NextResponse.json({ ok: true });
    }

    const args = text.split(' ');
    const command = args[0].toLowerCase();

    switch (command) {
      case '/start':
      case '/help':
        const helpMsg = `👋 <b>Modo Dios Activado.</b>\n\nComandos:\n<code>/lead [Nombre]</code> - Crear nuevo cliente\n<code>/listar</code> - Ver IDs de proyectos activos\n<code>/pago [ID] [Monto]</code> - Sumar abono a un proyecto\n<code>/estado [ID] [Fase]</code> - Mover en el Kanban\n<code>/contrato [ID]</code> - Generar PDF legal\n<code>/borrar [ID]</code> - Eliminar proyecto`;
        await sendMessage(chatId, helpMsg);
        break;

      case '/lead':
        const clientName = args.slice(1).join(' ');
        if (!clientName) {
          await sendMessage(chatId, "⚠️ Falta el nombre. Ej: <code>/lead Empresa S.A.</code>");
          break;
        }
        const newProj = await projectService.create({
          client_name: clientName,
          project_name: 'Por definir',
          status: 'cotizando',
          total_value: 0,
          amount_paid: 0
        });
        const shortIdNew = newProj.id.substring(0, 4);
        await sendMessage(chatId, `✅ <b>Lead Creado</b>\nCliente: ${clientName}\nID: <code>${shortIdNew}</code>`);
        break;

      case '/listar':
        const allProjects = await projectService.getAll();
        const activeProjects = allProjects.filter(p => p.status !== 'archivado');
        if (activeProjects.length === 0) {
          await sendMessage(chatId, "No hay proyectos activos.");
          break;
        }
        let listMsg = `📋 <b>Proyectos Activos</b>\n\n`;
        activeProjects.forEach(p => {
          listMsg += `ID: <code>${p.id.substring(0,4)}</code> | ${p.client_name}\nFase: ${p.status.toUpperCase()} | Deuda: $${(p.total_value - p.amount_paid).toLocaleString()}\n\n`;
        });
        await sendMessage(chatId, listMsg);
        break;

      case '/pago':
        if (args.length < 3) {
          await sendMessage(chatId, "⚠️ Formato: <code>/pago [ID] [Monto]</code>");
          break;
        }
        const pIdPago = args[1];
        const monto = parseInt(args[2].replace(/\D/g, ''));
        const projsPago = await projectService.getAll();
        const targetPago = projsPago.find(p => p.id.startsWith(pIdPago));
        if (!targetPago) {
          await sendMessage(chatId, "❌ Proyecto no encontrado.");
          break;
        }
        const nuevoAbono = targetPago.amount_paid + monto;
        await projectService.update(targetPago.id, { amount_paid: nuevoAbono });
        await sendMessage(chatId, `💰 <b>Pago Registrado</b>\nCliente: ${targetPago.client_name}\nNuevo Abono Total: $${nuevoAbono.toLocaleString()}\nSaldo Restante: $${(targetPago.total_value - nuevoAbono).toLocaleString()}`);
        break;

      case '/estado':
        if (args.length < 3) {
          await sendMessage(chatId, "⚠️ Formato: <code>/estado [ID] [fase]</code>\nFases: cotizando, desarrollo, revision, entregado");
          break;
        }
        const pIdEst = args[1];
        const fase = args[2].toLowerCase();
        const projsEst = await projectService.getAll();
        const targetEst = projsEst.find(p => p.id.startsWith(pIdEst));
        if (!targetEst) {
          await sendMessage(chatId, "❌ Proyecto no encontrado.");
          break;
        }
        await projectService.updateStatus(targetEst.id, fase);
        await sendMessage(chatId, `🔄 <b>Estado Actualizado</b>\n${targetEst.client_name} se movió a: ${fase.toUpperCase()}`);
        break;

      case '/borrar':
        if (args.length < 2) {
          await sendMessage(chatId, "⚠️ Formato: <code>/borrar [ID]</code>");
          break;
        }
        const pIdDel = args[1];
        const projsDel = await projectService.getAll();
        const targetDel = projsDel.find(p => p.id.startsWith(pIdDel));
        if (!targetDel) {
          await sendMessage(chatId, "❌ Proyecto no encontrado.");
          break;
        }
        await projectService.remove(targetDel.id);
        await sendMessage(chatId, `🗑️ Proyecto de ${targetDel.client_name} eliminado.`);
        break;

      case '/contrato':
        if (args.length < 2) {
          await sendMessage(chatId, "⚠️ Formato: <code>/contrato [ID]</code>");
          break;
        }
        const pIdDoc = args[1];
        const projsDoc = await projectService.getAll();
        const targetDoc = projsDoc.find(p => p.id.startsWith(pIdDoc));
        if (!targetDoc) {
          await sendMessage(chatId, "❌ Proyecto no encontrado.");
          break;
        }
        
        await sendMessage(chatId, "⏳ Generando documento PDF legal...");
        
        // Generar PDF básico en el backend
        const doc = new jsPDF();
        doc.setFontSize(22);
        doc.text("CONTRATO DE DESARROLLO DE SOFTWARE", 20, 30);
        
        doc.setFontSize(12);
        doc.text(`Fecha: ${new Date().toLocaleDateString('es-CO')}`, 20, 50);
        doc.text(`Cliente: ${targetDoc.client_name}`, 20, 60);
        doc.text(`Proyecto: ${targetDoc.project_name || 'Servicios Digitales'}`, 20, 70);
        
        doc.text("1. CONDICIONES FINANCIERAS:", 20, 90);
        doc.text(`El costo total del proyecto es de $${targetDoc.total_value.toLocaleString('es-CO')}.`, 20, 100);
        doc.text(`Abono registrado a la fecha: $${targetDoc.amount_paid.toLocaleString('es-CO')}.`, 20, 110);
        doc.text(`Saldo pendiente: $${(targetDoc.total_value - targetDoc.amount_paid).toLocaleString('es-CO')}.`, 20, 120);
        
        doc.text("2. TÉRMINOS LEGALES:", 20, 140);
        const terminos = doc.splitTextToSize("El desarrollador (Miguel Albornoz) se compromete a entregar los servicios detallados según los alcances acordados. El cliente se compromete a cumplir con los pagos en las fechas estipuladas. Todo el código fuente es propiedad intelectual hasta su liquidación total.", 170);
        doc.text(terminos, 20, 150);
        
        doc.text("Firma Desarrollador:", 20, 220);
        doc.text("Firma Cliente:", 120, 220);
        doc.text("__________________________", 20, 240);
        doc.text("__________________________", 120, 240);
        doc.text("Miguel Albornoz", 20, 250);
        doc.text(targetDoc.client_name, 120, 250);
        
        const pdfArrayBuffer = doc.output('arraybuffer');
        await sendDocument(chatId, pdfArrayBuffer, `Contrato_${targetDoc.client_name.replace(/\s+/g, '_')}.pdf`, `📄 Aquí tienes el contrato para ${targetDoc.client_name}`);
        break;

      default:
        await sendMessage(chatId, "🤖 Comando desconocido. Usa /help");
        break;
    }

    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error('Error in Telegram Webhook:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
