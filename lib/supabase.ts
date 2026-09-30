import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Client Supabase pour une utilisation côté client (ou serveur avec anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
