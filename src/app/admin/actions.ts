'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(prevState: any, formData: FormData) {
  const password = formData.get('password');
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (password === adminPassword) {
    // Set a secure cookie for the session
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
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
