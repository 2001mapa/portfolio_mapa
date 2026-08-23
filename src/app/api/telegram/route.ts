import { NextResponse } from 'next/server';
import { dbGetAllProjects, dbUpdateProjectStatus, dbUpdateProject, dbCreateProject, dbRemoveProject } from '@/services/projectData';
import { jsPDF } from 'jspdf';

const MY_TELEGRAM_ID = process.env.TELEGRAM_ADMIN_ID;
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

async function sendMessage(chatId: number, text: string) {
  if (!BOT_TOKEN) return;
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: text, parse_mode: 'HTML' })
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

async function askGemini(prompt: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return 'Falta configurar GEMINI_API_KEY en Vercel.';

  try {
    const projs = await dbGetAllProjects();
    const systemInstruction = `Eres EGO, el asistente de CRM personal de Miguel Albornoz. Tu tono es natural, conversacional, como un asistente humano muy eficiente, profesional y de "modo Dios".
    
Tienes acceso a esta base de datos de sus proyectos: ${JSON.stringify(projs)}. 

El usuario te hablará de forma natural (ej. "registra un lead", "cuánto me debe Carlos", "mueve el proyecto de Tesla a entregado"). 

IMPORTANTE: Si necesitas ejecutar una acción en la base de datos, DEBES responder ÚNICAMENTE con un bloque JSON estricto. NO agregues comillas invertidas ni texto adicional si envías JSON.
Si te falta información clave para crear o modificar algo, pregúntasela al usuario con texto natural (por ejemplo: "¿Cuál es el monto del lead?").

Acciones permitidas (formato JSON exacto):
1. Crear cliente: {"action": "create_lead", "clientName": "...", "projectName": "...", "totalValue": 1000} (si no sabes el valor, pon 0, si no sabes el nombre del proyecto pon "Por definir")
2. Listar proyectos: {"action": "list_projects"}
3. Registrar abono: {"action": "register_payment", "projectId": "EL_ID_DEL_PROYECTO", "amount": 1000} (projectId debe ser el ID real de la base de datos)
4. Cambiar estado: {"action": "update_status", "projectId": "EL_ID", "status": "cotizando|desarrollo|revision|entregado"}
5. Borrar proyecto: {"action": "delete_project", "projectId": "EL_ID"}
6. Generar contrato: {"action": "generate_contract", "projectId": "EL_ID"}

Si vas a hablar normal (responder preguntas, confirmar cosas, etc), simplemente envía el texto natural.`;

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=' + apiKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        systemInstruction: { role: 'user', parts: [{ text: systemInstruction }] }
      })
    });
    
    const data = await response.json();
    return data.candidates[0].content.parts[0].text.trim();
  } catch (e) {
    console.error('Gemini error:', e);
    return 'Mi mente está nublada por un error interno.';
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = body.message;
    if (!message || !message.text) return NextResponse.json({ ok: true });

    const chatId = message.chat.id;
    const fromId = message.from.id.toString();
    const text = message.text.trim();

    if (request.headers.get('X-Telegram-Bot-Api-Secret-Token') !== process.env.TELEGRAM_SECRET_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (MY_TELEGRAM_ID && fromId !== MY_TELEGRAM_ID) {
      await sendMessage(chatId, "🚫 Acceso denegado. No eres Miguel.");
      return NextResponse.json({ ok: true });
    }

    const aiResponse = await askGemini(text);
    
    // Clean potential markdown from JSON
    let cleanResponse = aiResponse.trim();
    if (cleanResponse.startsWith('```json')) {
      cleanResponse = cleanResponse.replace(/^```json/, '').replace(/```$/, '').trim();
    } else if (cleanResponse.startsWith('```')) {
      cleanResponse = cleanResponse.replace(/^```/, '').replace(/```$/, '').trim();
    }

    // Intentar parsear como JSON (Ejecutar acción)
    if (cleanResponse.startsWith('{') && cleanResponse.endsWith('}')) {
      try {
        const cmd = JSON.parse(cleanResponse);
        
        switch (cmd.action) {
          case 'create_lead':
            const newProj = await dbCreateProject({
              client_name: cmd.clientName,
              project_name: cmd.projectName || 'Por definir',
              status: 'cotizando',
              total_value: cmd.totalValue || 0,
              amount_paid: 0
            });
            await sendMessage(chatId, `✅ <b>Lead Creado Exitosamente</b>\nCliente: ${cmd.clientName}\nProyecto: ${cmd.projectName || 'Por definir'}\nValor: $${(cmd.totalValue||0).toLocaleString('es-CO')}`);
            break;
            
          case 'list_projects':
            const allP = await dbGetAllProjects();
            const actP = allP.filter(p => p.status !== 'archivado');
            if (actP.length === 0) {
              await sendMessage(chatId, "No tienes proyectos activos en este momento.");
            } else {
              let listMsg = `📊 <b>Proyectos Activos</b>\n\n`;
              actP.forEach(p => {
                listMsg += `• <b>${p.client_name}</b> (${p.status.toUpperCase()})\nDeuda: $${(p.total_value - p.amount_paid).toLocaleString()}\n\n`;
              });
              await sendMessage(chatId, listMsg);
            }
            break;

          case 'register_payment':
            const projsPago = await dbGetAllProjects();
            const targetPago = projsPago.find(p => p.id === cmd.projectId);
            if (!targetPago) {
              await sendMessage(chatId, "❌ No pude encontrar el proyecto en la base de datos.");
              break;
            }
            const nuevoAbono = targetPago.amount_paid + Number(cmd.amount);
            await dbUpdateProject(targetPago.id, { amount_paid: nuevoAbono });
            await sendMessage(chatId, `💰 <b>Pago Registrado</b>\nCliente: ${targetPago.client_name}\nAbono agregado: $${Number(cmd.amount).toLocaleString()}\nSaldo Restante: $${(targetPago.total_value - nuevoAbono).toLocaleString()}`);
            break;

          case 'update_status':
            const projsEst = await dbGetAllProjects();
            const targetEst = projsEst.find(p => p.id === cmd.projectId);
            if (!targetEst) {
              await sendMessage(chatId, "❌ No encontré el proyecto para actualizar el estado.");
              break;
            }
            await dbUpdateProjectStatus(targetEst.id, cmd.status);
            await sendMessage(chatId, `🔄 <b>Estado Actualizado</b>\n${targetEst.client_name} se movió a: ${cmd.status.toUpperCase()}`);
            break;

          case 'delete_project':
            await dbRemoveProject(cmd.projectId);
            await sendMessage(chatId, `🗑️ Proyecto eliminado correctamente de la base de datos.`);
            break;

          case 'generate_contract':
            const projsDoc = await dbGetAllProjects();
            const targetDoc = projsDoc.find(p => p.id === cmd.projectId);
            if (!targetDoc) {
              await sendMessage(chatId, "❌ Proyecto no encontrado para generar contrato.");
              break;
            }
            
            await sendMessage(chatId, "⏳ Generando contrato PDF legal...");
            
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
            await sendDocument(chatId, pdfArrayBuffer, `Contrato_${targetDoc.client_name.replace(/\s+/g, '_')}.pdf`, `📄 Aquí tienes el contrato legal para ${targetDoc.client_name}`);
            break;
            
          default:
            await sendMessage(chatId, "⚠️ EGO generó una acción no reconocida.");
        }
      } catch (parseError) {
        // Fallback si el JSON falla
        await sendMessage(chatId, cleanResponse);
      }
    } else {
      // Es una respuesta natural de texto, no un comando
      await sendMessage(chatId, cleanResponse);
    }

    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error('Error in Telegram Webhook:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
