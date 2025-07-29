// lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Present' : 'Missing');

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(`Supabase URL: ${supabaseUrl}, Anon Key: ${supabaseAnonKey ? 'Present' : 'Missing'}`);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getTickets({ status, priority, search }) {
  let query = supabase.from('mangelmanagement').select('*');
  if (status) query = query.eq('status', status);
  if (priority) query = query.eq('dringlichkeit', priority);
  if (search) query = query.ilike('titel', `%${search}%`);
  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

export async function getTicketById(id) {
  const { data, error } = await supabase.from('mangelmanagement').select('*').eq('id', id).single();
  if (error) throw new Error(error.message);

  // Fetch signed URLs from API route
  const res = await fetch(`/api/tickets/${id}/files`);
  const files = await res.json();

  return { ...data, files };
}

export async function updateTicketStatus(id, status) {
  const res = await fetch(`/api/tickets/${id}`, {
    method: 'POST',
    body: JSON.stringify({ status }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
}