// ─────────────────────────────────────────────────────────────────────────────
// Utilidad de tracking — centraliza todas las llamadas a /api/track-event
// No lanza errores: si el tracking falla, la experiencia del cliente no se ve
// afectada. El modo demo (token === 'demo' o id === 'DEMO-001') nunca trackea.
// ─────────────────────────────────────────────────────────────────────────────

function esDemo(ofertaId) {
  if (!ofertaId) return true
  const id = String(ofertaId)
  return id === 'demo' || id.startsWith('DEMO')
}

// Llamada estándar (fetch) — para la mayoría de eventos
export function trackEvent(ofertaId, tipoEvento, datosAdicionales = {}) {
  if (esDemo(ofertaId)) return
  fetch('/api/track-event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      oferta_id: ofertaId,
      tipo_evento: tipoEvento,
      datos_adicionales: datosAdicionales,
    }),
  }).catch(() => {})
}

// Llamada con sendBeacon — para eventos de cierre de página (beforeunload)
// sendBeacon garantiza el envío incluso cuando el usuario navega fuera.
export function trackBeacon(ofertaId, tipoEvento, datosAdicionales = {}) {
  if (esDemo(ofertaId)) return
  if (!navigator.sendBeacon) {
    trackEvent(ofertaId, tipoEvento, datosAdicionales)
    return
  }
  const blob = new Blob(
    [JSON.stringify({ oferta_id: ofertaId, tipo_evento: tipoEvento, datos_adicionales: datosAdicionales })],
    { type: 'application/json' }
  )
  navigator.sendBeacon('/api/track-event', blob)
}
