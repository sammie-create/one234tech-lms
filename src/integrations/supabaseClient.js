import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client with environment variables
// The Supabase URL and Anon Key are expected to be set in the environment variables

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
