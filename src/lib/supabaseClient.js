// ─────────────────────────────────────────────────────────────────────────────
// Cliente Supabase para uso en el FRONTEND (browser)
// Usa las claves VITE_ expuestas a Vite — NO son secretas (publishable key).
// Para el backend (Netlify Functions) se usa el service key directamente.
// ─────────────────────────────────────────────────────────────────────────────
import { createClient } from '@supabase/supabase-js'

const supabaseUrl     = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[supabaseClient] Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY. ' +
    'Añádelas en Netlify env vars o en .env.local para desarrollo.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
