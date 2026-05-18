// ─────────────────────────────────────────────────────────────────────────────
// Netlify Function: track-event
// Registra eventos de comportamiento del cliente en la oferta.
// Persiste en Supabase tabla eventos_trazabilidad.
// ─────────────────────────────────────────────────────────────────────────────

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const body = JSON.parse(event.body || '{}')
    const { oferta_id, tipo_evento, datos_adicionales } = body

    if (!oferta_id || !tipo_evento) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Faltan campos obligatorios' }) }
    }

    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    )

    await supabase.from('eventos_trazabilidad').insert({
      oferta_id,
      tipo_evento,
      datos_adicionales_json: datos_adicionales || {},
      timestamp:              new Date().toISOString(),
      ip_hash:                hashIP(event.headers['x-forwarded-for'] || ''),
      user_agent_resumen:     (event.headers['user-agent'] || '').substring(0, 100),
    })

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: true }),
    }

  } catch (err) {
    // No devolver 500 al cliente para no interrumpir su experiencia
    console.error('[track-event] Error:', err)
    return {
      statusCode: 200,
      body: JSON.stringify({ ok: false }),
    }
  }
}

function hashIP(ip) {
  return ip ? btoa(ip).slice(0, 16) : 'unknown'
}
