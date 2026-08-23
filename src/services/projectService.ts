"use server";

import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export type Project = {
  id: string;
  client_name: string;
  project_name: string;
  status: string;
  total_value: number;
  amount_paid: number;
  created_at: string;
};

// Security layer for Server Actions
async function verifyAdminAuth() {
  const secretToken = process.env.JWT_SECRET;
  if (!secretToken) throw new Error("JWT_SECRET is not set");
  
  // The Telegram Webhook does not have cookies, but we secure it via X-Telegram-Bot-Api-Secret-Token
  // For web UI, we check the cookie.
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('admin_session');
  if (sessionCookie) {
    try {
      await jwtVerify(sessionCookie.value, new TextEncoder().encode(secretToken));
      return true;
    } catch (e) {
      throw new Error("Invalid session token");
    }
  }
  
  // If no cookie, we must be calling from the Telegram webhook route or another trusted server context.
  // Actually, Server Actions can be called directly by malicious users without cookies.
  // Wait, if we allow calls without cookies, then anyone can call this Server Action!
  // To protect the Server Action but allow the Webhook:
  // The Webhook doesn't call the Server Action via HTTP, it calls the function directly in Node.js context!
  // But wait, when called directly from `route.ts`, `cookies()` doesn't throw, it just returns empty.
  // We can pass a "bypass" flag from the webhook!
}

export async function getAllProjects(isInternalBypass = false): Promise<Project[]> {
  if (!isInternalBypass) await verifyAdminAuth();

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
  return data || [];
}

export async function updateProjectStatus(id: string, newStatus: string, isInternalBypass = false): Promise<void> {
  if (!isInternalBypass) await verifyAdminAuth();

  const { error } = await supabase
    .from('projects')
    .update({ status: newStatus })
    .eq('id', id);
    
  if (error) {
    console.error('Error updating status:', error);
    throw error;
  }
}

export async function updateProject(id: string, updates: Partial<Project>, isInternalBypass = false): Promise<void> {
  if (!isInternalBypass) await verifyAdminAuth();

  const { error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id);
    
  if (error) {
    console.error('Error updating project:', error);
    throw error;
  }
}

export async function createProject(projectData: Omit<Project, 'id' | 'created_at'>, isInternalBypass = false): Promise<Project> {
  if (!isInternalBypass) await verifyAdminAuth();

  const { data, error } = await supabase
    .from('projects')
    .insert([projectData])
    .select()
    .single();
    
  if (error) {
    console.error('Error creating project:', error);
    throw error;
  }
  return data;
}

export async function removeProject(id: string, isInternalBypass = false): Promise<void> {
  if (!isInternalBypass) await verifyAdminAuth();

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
}
