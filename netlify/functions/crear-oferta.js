// ─────────────────────────────────────────────────────────────────────────────
// Netlify Function: crear-oferta
// Guarda una nueva oferta en Supabase y devuelve el token de acceso.
//
// Requiere variables de entorno en Netlify:
//   SUPABASE_URL          → URL de tu proyecto Supabase
//   SUPABASE_SERVICE_KEY  → Service role key (NO la anon key)
// ─────────────────────────────────────────────────────────────────────────────

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const ofertaData = JSON.parse(event.body || '{}')

    // Validación mínima
    if (!ofertaData.cliente?.nombre_empresa || !ofertaData.producto?.id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Datos de oferta incompletos' }),
      }
    }

    // ── Generar token único ──────────────────────────────────────────────
    const token = crypto.randomUUID()

    // ── Calcular fecha de expiración ─────────────────────────────────────
    const diasValidez = ofertaData.condiciones?.validez_dias || 30
    const expiracion  = new Date()
    expiracion.setDate(expiracion.getDate() + diasValidez)

    // ── Guardar en Supabase ──────────────────────────────────────────────
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    )

    const { data, error } = await supabase
      .from('ofertas')
      .insert({
        token,
        numero_oferta:    ofertaData.numero_oferta,
        estado:           'enviada',
        fecha_expiracion: expiracion.toISOString(),
        datos_json:       ofertaData,
      })
      .select('id, token')
      .single()

    if (error) {
      console.error('[crear-oferta] Supabase error:', error)
      throw new Error(error.message)
    }

    console.log('[crear-oferta] Oferta creada:', data.token)

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: true, token: data.token }),
    }

  } catch (err) {
    console.error('[crear-oferta] Error:', err)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || 'Error interno' }),
    }
  }
}
