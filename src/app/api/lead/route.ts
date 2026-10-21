import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data: unknown = await request.json();
    if (!data || typeof data !== 'object') {
      return NextResponse.json({ success: false, message: "Solicitud inválida" }, { status: 400 });
    }
    const { name, message } = data as { name?: unknown; message?: unknown };

    // Validate payload size (e.g. roughly less than 10KB to avoid abuse)
    const jsonString = JSON.stringify({ name, message });
    if (jsonString.length > 10000) {
      return NextResponse.json({ success: false, message: "Payload too large" }, { status: 413 });
    }

    if (!name || typeof name !== 'string' || name.length > 100) {
      return NextResponse.json({ success: false, message: "Invalid name" }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || message.length > 2000) {
      return NextResponse.json({ success: false, message: "Invalid message" }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Mensaje validado. Continúa en WhatsApp para enviarlo." });
  } catch {
    return NextResponse.json({ success: false, message: "No fue posible validar el mensaje" }, { status: 500 });
  }
}

