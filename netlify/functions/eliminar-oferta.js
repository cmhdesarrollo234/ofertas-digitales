// ─────────────────────────────────────────────────────────────────────────────
// Netlify Function: eliminar-oferta
// Borra una oferta y todos sus eventos de trazabilidad dado su token.
// Solo para uso interno del panel /admin.
// ─────────────────────────────────────────────────────────────────────────────

export const handler = async (event) => {
  if (event.httpMethod !== 'DELETE') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const { token } = JSON.parse(event.body || '{}')
    if (!token) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Token requerido' }) }
    }

    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    )

    // Obtener el id de la oferta para borrar sus eventos
    const { data: oferta, error: errorBuscar } = await supabase
      .from('ofertas')
      .select('id')
      .eq('token', token)
      .single()

    if (errorBuscar || !oferta) {
      return { statusCode: 404, body: JSON.stringify({ error: 'Oferta no encontrada' }) }
    }

    // Borrar eventos primero (FK constraint)
    await supabase
      .from('eventos_trazabilidad')
      .delete()
      .eq('oferta_id', oferta.id)

    // Borrar la oferta
    const { error: errorBorrar } = await supabase
      .from('ofertas')
      .delete()
      .eq('token', token)

    if (errorBorrar) throw errorBorrar

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: true }),
    }

  } catch (err) {
    console.error('[eliminar-oferta] Error:', err)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || 'Error interno' }),
    }
  }
}
