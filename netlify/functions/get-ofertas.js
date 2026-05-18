// ─────────────────────────────────────────────────────────────────────────────
// Netlify Function: get-ofertas
// Devuelve todas las ofertas con sus eventos de trazabilidad.
// Solo para uso interno del panel /admin.
// ─────────────────────────────────────────────────────────────────────────────

export const handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    )

    // ── Todas las ofertas ────────────────────────────────────────────────────
    const { data: ofertas, error: errorOfertas } = await supabase
      .from('ofertas')
      .select('id, token, numero_oferta, estado, fecha_expiracion, datos_json, created_at')
      .order('created_at', { ascending: false })

    if (errorOfertas) throw errorOfertas

    // ── Todos los eventos (solo de las ofertas encontradas) ──────────────────
    const ids = (ofertas || []).map(o => o.id)
    let eventos = []

    if (ids.length > 0) {
      const { data: eventosData, error: errorEventos } = await supabase
        .from('eventos_trazabilidad')
        .select('oferta_id, tipo_evento, datos_adicionales_json, timestamp')
        .in('oferta_id', ids)
        .order('timestamp', { ascending: true })

      if (!errorEventos) eventos = eventosData || []
    }

    // ── Agrupar eventos por oferta ───────────────────────────────────────────
    const eventosMap = {}
    eventos.forEach(e => {
      if (!eventosMap[e.oferta_id]) eventosMap[e.oferta_id] = []
      eventosMap[e.oferta_id].push(e)
    })

    const resultado = (ofertas || []).map(o => ({
      id:               o.id,
      token:            o.token,
      numero_oferta:    o.numero_oferta,
      estado:           o.estado,
      fecha_expiracion: o.fecha_expiracion,
      created_at:       o.created_at,
      cliente: {
        nombre_empresa:  o.datos_json?.cliente?.nombre_empresa  || '',
        nombre_contacto: o.datos_json?.cliente?.nombre_contacto || '',
        cargo:           o.datos_json?.cliente?.cargo           || '',
        email:           o.datos_json?.cliente?.email           || '',
      },
      producto: {
        nombre:            o.datos_json?.producto?.nombre            || '',
        codigo_referencia: o.datos_json?.producto?.codigo_referencia || '',
      },
      pdf_url:  o.datos_json?.pdf_url || null,
      eventos:  eventosMap[o.id] || [],
    }))

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      body: JSON.stringify(resultado),
    }

  } catch (err) {
    console.error('[get-ofertas] Error:', err)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || 'Error interno' }),
    }
  }
}
