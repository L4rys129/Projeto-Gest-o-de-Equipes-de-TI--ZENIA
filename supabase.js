// Configuração do Supabase
const SUPABASE_URL = 'https://uhtumganaeooximgbkjv.supabase.co'
const SUPABASE_KEY = 'sb_publishable_CinlAf3gm3clDcNpXRelGg_QQKylseJ'

// Inicializa o cliente
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)