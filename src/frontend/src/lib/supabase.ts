import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://tqbwxzfladjhnqiwrwpo.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_rpIuTeI25kiX-zlkr4NPFw_OFeUtipd";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
