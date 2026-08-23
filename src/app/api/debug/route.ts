import { NextResponse } from 'next/server';
export async function GET() {
  return NextResponse.json({ botToken: !!process.env.TELEGRAM_BOT_TOKEN, adminId: process.env.TELEGRAM_ADMIN_ID, secretToken: process.env.TELEGRAM_SECRET_TOKEN, gemini: !!process.env.GEMINI_API_KEY });
}