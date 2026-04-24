// ─────────────────────────────────────────────────────────────────────────────
// Netlify Function: track-event
// Registra eventos de comportamiento del cliente en la oferta.
//
// FASE 1: registra en console.log (visible en logs de Netlify).
// FASE 2: conectar a Supabase para persistir en tabla eventos_trazabilidad.
// ─────────────────────────────────────────────────────────────────────────────

export const handler = async (event) => {
  // Solo aceptar POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const body = JSON.parse(event.body || '{}')
    const { oferta_id, tipo_evento, datos_adicionales } = body

    if (!oferta_id || !tipo_evento) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Faltan campos obligatorios' }) }
    }

    // ── FASE 1: solo logging ──────────────────────────────────────────────
    console.log('[EVENTO]', {
      timestamp:         new Date().toISOString(),
      oferta_id,
      tipo_evento,
      datos_adicionales: datos_adicionales || {},
    })

    // ── FASE 2: persistir en Supabase (descomentar cuando esté configurado) ─
    /*
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    )

    await supabase.from('eventos_trazabilidad').insert({
      oferta_id,
      tipo_evento,
      datos_adicionales_json: datos_adicionales || {},
      timestamp: new Date().toISOString(),
      ip_hash: hashIP(event.headers['x-forwarded-for'] || ''),
      user_agent_resumen: event.headers['user-agent']?.substring(0, 100) || '',
    })
    */

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: true }),
    }

  } catch (err) {
    console.error('[track-event] Error:', err)
    return { statusCode: 500, body: JSON.stringify({ error: 'Error interno' }) }
  }
}

// Función auxiliar para hashear IP (privacidad GDPR)
function hashIP(ip) {
  // Implementación simple. En Fase 2 usar crypto.subtle o similar.
  return ip ? btoa(ip).slice(0, 16) : 'unknown'
}
