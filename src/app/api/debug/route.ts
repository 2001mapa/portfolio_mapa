import { NextResponse } from 'next/server';
export async function GET() {
  return NextResponse.json({ 
    hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    hasAnonKey: !!process.env.SUPABASE_ANON_KEY
  });
}