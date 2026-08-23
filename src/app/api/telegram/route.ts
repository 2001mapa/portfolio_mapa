import { NextResponse } from 'next/server';
import { projectService } from '@/services/projectService';

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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Telegram webhooks send the message object
    const message = body.message;
    if (!message || !message.text) {
      return NextResponse.json({ ok: true }); // Ignore non-text messages silently
    }

    const chatId = message.chat.id;
    const fromId = message.from.id.toString();
    const text = message.text.trim();

    // Security check: Only allow the admin
    if (MY_TELEGRAM_ID && fromId !== MY_TELEGRAM_ID) {
      await sendMessage(chatId, "⛔ Acceso denegado. No eres Miguel.");
      return NextResponse.json({ ok: true });
    }

    // Parse commands
    // Format: /lead Nombre del Cliente
    // Format: /status
    if (text.startsWith('/lead')) {
      const clientName = text.replace('/lead', '').trim();
      if (!clientName) {
        await sendMessage(chatId, "⚠️ Formato incorrecto. Usa: <code>/lead Nombre del Cliente</code>");
        return NextResponse.json({ ok: true });
      }

      await projectService.create({
        client_name: clientName,
        project_name: 'Por definir',
        status: 'cotizando',
        total_value: 0,
        amount_paid: 0
      });
      
      await sendMessage(chatId, `✅ <b>Lead Creado</b>\nCliente: ${clientName}\nEl proyecto ya aparece en tu Kanban.`);
      return NextResponse.json({ ok: true });
    }
    
    if (text.startsWith('/status')) {
      const projects = await projectService.getAll();
      const active = projects.filter(p => p.status !== 'archivado' && p.status !== 'entregado');
      const revenue = projects.reduce((sum, p) => sum + Number(p.amount_paid), 0);
      
      const statusMessage = `📊 <b>Estado del CRM</b>\nProyectos Activos: ${active.length}\nCaja Actual: $${revenue.toLocaleString('es-CO')}`;
      await sendMessage(chatId, statusMessage);
      return NextResponse.json({ ok: true });
    }

    if (text.startsWith('/start') || text.startsWith('/help')) {
      const helpMsg = `👋 <b>Hola Miguel, soy tu asistente CRM.</b>\n\nComandos disponibles:\n<code>/lead [Nombre]</code> - Crea un nuevo cliente en el Kanban\n<code>/status</code> - Resumen financiero y proyectos activos`;
      await sendMessage(chatId, helpMsg);
      return NextResponse.json({ ok: true });
    }

    // Default response
    await sendMessage(chatId, "No reconozco ese comando. Usa /help para ver mis opciones.");
    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error('Error in Telegram Webhook:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
