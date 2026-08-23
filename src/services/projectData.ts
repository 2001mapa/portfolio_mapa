import { supabase } from '@/lib/supabase';

export type Project = {
  id: string;
  client_name: string;
  project_name: string;
  status: string;
  total_value: number;
  amount_paid: number;
  created_at: string;
};

export async function dbGetAllProjects(): Promise<Project[]> {
  const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function dbUpdateProjectStatus(id: string, newStatus: string): Promise<void> {
  const { error } = await supabase.from('projects').update({ status: newStatus }).eq('id', id);
  if (error) throw error;
}

export async function dbUpdateProject(id: string, updates: Partial<Project>): Promise<void> {
  const { error } = await supabase.from('projects').update(updates).eq('id', id);
  if (error) throw error;
}

export async function dbCreateProject(projectData: Omit<Project, 'id' | 'created_at'>): Promise<Project> {
  const { data, error } = await supabase.from('projects').insert([projectData]).select().single();
  if (error) throw error;
  return data;
}

export async function dbRemoveProject(id: string): Promise<void> {
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw error;
}
