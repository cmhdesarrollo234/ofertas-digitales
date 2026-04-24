// ─────────────────────────────────────────────────────────────────────────────
// Netlify Function: get-oferta
// Devuelve los datos de una oferta dado su token de acceso.
//
// Requiere variables de entorno en Netlify:
//   SUPABASE_URL      → URL de tu proyecto Supabase
//   SUPABASE_ANON_KEY → Anon/public key de Supabase
// ─────────────────────────────────────────────────────────────────────────────

export const handler = async (event) => {
  const token = event.queryStringParameters?.token

  if (!token) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Token requerido' }) }
  }

  try {
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    )

    const ahora = new Date().toISOString()

    const { data: oferta, error } = await supabase
      .from('ofertas')
      .select('id, token, estado, fecha_expiracion, datos_json')
      .eq('token', token)
      .gt('fecha_expiracion', ahora) // Rechaza ofertas expiradas
      .neq('estado', 'borrador')     // No sirve borradores
      .single()

    if (error || !oferta) {
      return { statusCode: 404, body: JSON.stringify({ error: 'Oferta no encontrada o expirada' }) }
    }

    // Devolver los datos de la oferta (incluye el id para trazabilidad)
    const respuesta = { ...oferta.datos_json, id: oferta.id }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
      body: JSON.stringify(respuesta),
    }

  } catch (err) {
    console.error('[get-oferta] Error:', err)
    return { statusCode: 500, body: JSON.stringify({ error: 'Error interno' }) }
  }
}
