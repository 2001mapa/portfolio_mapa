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

export const projectService = {
  async getAll(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
    return data || [];
  },

  async updateStatus(id: string, newStatus: string): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .update({ status: newStatus })
      .eq('id', id);
      
    if (error) {
      console.error('Error updating status:', error);
      throw error;
    }
  },

  async update(id: string, updates: Partial<Project>): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id);
      
    if (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  async create(projectData: Omit<Project, 'id' | 'created_at'>): Promise<Project> {
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
  },

  async remove(id: string): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  },
  
  // Method meant to be used by the Telegram bot webhook (to be exposed via an API route later)
  async handleBotCommand(command: string, args: string[]): Promise<string> {
    // Basic scaffolding for the bot processing logic
    if (command === '/lead') {
      const clientName = args.join(' ');
      await this.create({
        client_name: clientName,
        project_name: 'Por definir',
        status: 'cotizando',
        total_value: 0,
        amount_paid: 0
      });
      return `✅ Lead creado: ${clientName}`;
    }
    
    return `Comando no reconocido: ${command}`;
  }
};
