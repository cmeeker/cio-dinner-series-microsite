import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Registration {
  id?: string;
  created_at?: string;
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  title: string;
  city_key: string;
  event_month: string;
}
