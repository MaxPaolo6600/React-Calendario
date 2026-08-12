import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://onqxlbdwarrsxnbhmwys.supabase.co"
const SUPABASE_ANON_KEY = "sb_publishable_zwfSTF274bCqXyP395tIDw_ujjFWqU_"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

