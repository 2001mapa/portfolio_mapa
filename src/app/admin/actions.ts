'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { SignJWT } from 'jose';

export async function loginAction(prevState: any, formData: FormData) {
  const password = formData.get('password');
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (password === adminPassword) {
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is missing");
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    
    // Sign a JWT token
    const token = await new SignJWT({ role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1w')
      .sign(secret);

    // Set a secure cookie for the session
    const cookieStore = await cookies();
    cookieStore.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
      sameSite: 'strict'
    });

    redirect('/admin');
  } else {
    return { error: 'Contraseña incorrecta' };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/admin/login');
}
