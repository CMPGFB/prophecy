import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function createMarket(question, creator, txId) {
  const { data, error } = await supabase
    .from('markets')
    .insert([{ 
      question, 
      creator, 
      yes_amount: 0, 
      no_amount: 0, 
      resolved: false,
      tx_id: txId,
      reward_claimed: false
    }])
    .select();
  
  if (error) throw error;
  return data[0];
}

export async function getMarkets() {
  const { data, error } = await supabase
    .from('markets')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function getMarket(id) {
  const { data, error } = await supabase
    .from('markets')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateMarket(id, updates) {
  const { data, error } = await supabase
    .from('markets')
    .update(updates)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0];
}

export async function getUserMarkets(userAddress) {
  const { data, error } = await supabase
    .from('markets')
    .select('*')
    .eq('creator', userAddress)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}