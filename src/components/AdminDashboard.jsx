import { useEffect, useState } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// Dashboard de seguimiento de ofertas — para uso interno (Maxime / Juliana)
// ─────────────────────────────────────────────────────────────────────────────

// ── Helpers de presentación ──────────────────────────────────────────────────

function tiempoLegible(segundos) {
  if (!segundos || segundos < 5) return null
  if (segundos < 60) return `${segundos}s`
  const min = Math.floor(segundos / 60)
  const sec = segundos % 60
  return sec > 0 ? `~${min} min ${sec}s` : `~${min} min`
}

function fechaRelativa(isoString) {
  if (!isoString) return '—'
  const diff = Date.now() - new Date(isoString).getTime()
  const min  = Math.floor(diff / 60000)
  if (min < 2)   return 'hace un momento'
  if (min < 60)  return `hace ${min} min`
  const h = Math.floor(min / 60)
  if (h < 24)    return `hace ${h}h`
  const d = Math.floor(h / 24)
  if (d === 1)   return 'ayer'
  if (d < 7)     return `hace ${d} días`
  return new Date(isoString).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
}

function fechaCorta(isoString) {
  if (!isoString) return '—'
  return new Date(isoString).toLocaleString('es-ES', {
    day: '2-digit', month: '2-digit', year: '2-digit',
    hour: '2-digit', minute: '2-digit',
  })
}

const LABEL_SECCION = {
  inicio:      'Portada',
  descripcion: 'Descripción',
  video:       'Vídeo',
  modelo3d:    'Visor 3D',
  accesorios:  'Accesorios',
  soluciones:  'Soluciones',
  resumen:     'Resumen €',
  condiciones: 'Condiciones',
  accion:      'Acciones finales',
}

const LABEL_EVENTO = {
  oferta_abierta:    'Abrió la oferta',
  pdf_descargado:    'Descargó el PDF',
  btn_agendar:       'Clic en "Agendar consulta"',
  btn_whatsapp:      'Contactó por WhatsApp',
  btn_email:         'Contactó por email',
  oferta_aceptada:   'Aceptó la oferta',
  oferta_rechazada:  'Rechazó la oferta',
  solucion_expandida:'Expandió vídeo de solución',
  seccion_vista:     'Sección visitada',
  tiempo_total:      'Tiempo en la oferta',
}

// ── Procesado de datos ────────────────────────────────────────────────────────

function procesarOferta(oferta) {
  const ev = oferta.eventos || []

  const aperturas    = ev.filter(e => e.tipo_evento === 'oferta_abierta')
  const tiempoEvs    = ev.filter(e => e.tipo_evento === 'tiempo_total')
  const tiempoTotal  = tiempoEvs.reduce((s, e) => s + (e.datos_adicionales_json?.segundos || 0), 0)

  const seccionesVistas = [...new Set(
    ev.filter(e => e.tipo_evento === 'seccion_vista')
      .map(e => e.datos_adicionales_json?.seccion)
      .filter(Boolean)
  )]

  const accionAceptar  = ev.find(e => e.tipo_evento === 'oferta_aceptada')
  const accionRechazar = ev.find(e => e.tipo_evento === 'oferta_rechazada')
  const accionFinal    = accionAceptar ? 'aceptada' : accionRechazar ? 'rechazada' : null

  const expirada = new Date(oferta.fecha_expiracion) < new Date()

  return {
    ...oferta,
    resumen: {
      vecesAbierta:    aperturas.length,
      primeraApertura: aperturas[0]?.timestamp || null,
      ultimaApertura:  aperturas[aperturas.length - 1]?.timestamp || null,
      tiempoTotal,
      seccionesVistas,
      pdfDescargado:   ev.some(e => e.tipo_evento === 'pdf_descargado'),
      agendoReunion:   ev.some(e => e.tipo_evento === 'btn_agendar'),
      contactoWA:      ev.some(e => e.tipo_evento === 'btn_whatsapp'),
      contactoEmail:   ev.some(e => e.tipo_evento === 'btn_email'),
      accionFinal,
      motivoRechazo:   accionRechazar?.datos_adicionales_json?.motivo || null,
      comentarioRechazo: accionRechazar?.datos_adicionales_json?.comentario || null,
      expirada,
    },
  }
}

// ── Componente principal ──────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [ofertas, setOfertas]           = useState([])
  const [cargando, setCargando]         = useState(true)
  const [error, setError]               = useState(null)
  const [expandida, setExpandida]       = useState(null)
  const [eliminando, setEliminando]     = useState(null) // token en proceso
  const [confirmando, setConfirmando]   = useState(null) // token pendiente de confirmar

  async function handleEliminar(token) {
    setEliminando(token)
    setConfirmando(null)
    try {
      const res = await fetch('/api/eliminar-oferta', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
      if (!res.ok) throw new Error('Error del servidor')
      setOfertas(prev => prev.filter(o => o.token !== token))
    } catch (err) {
      alert('No se pudo eliminar la oferta. Inténtalo de nuevo.')
    } finally {
      setEliminando(null)
    }
  }

  useEffect(() => {
    fetch('/api/get-ofertas')
      .then(r => {
        if (!r.ok) throw new Error('Error del servidor')
        return r.json()
      })
      .then(data => {
        setOfertas(data.map(procesarOferta))
        setCargando(false)
      })
      .catch(err => {
        setError('No se pudieron cargar las ofertas. ¿Estás en el deploy de Netlify?')
        setCargando(false)
      })
  }, [])

  // ── Estadísticas globales ──────────────────────────────────────────────────
  const stats = {
    total:     ofertas.length,
    abiertas:  ofertas.filter(o => o.resumen.vecesAbierta > 0).length,
    aceptadas: ofertas.filter(o => o.resumen.accionFinal === 'aceptada').length,
    rechazadas:ofertas.filter(o => o.resumen.accionFinal === 'rechazada').length,
  }

  // ── Loading ────────────────────────────────────────────────────────────────
  if (cargando) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-navy rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400 text-sm">Cargando datos de seguimiento...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
          <p className="text-red-700 font-semibold mb-2">Error al cargar</p>
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">

      {/* ── Estadísticas globales ─────────────────────────────────────────── */}
      <div>
        <h2 className="text-2xl font-extrabold text-navy mb-1">Seguimiento de ofertas</h2>
        <p className="text-gray-500 text-sm mb-6">Comportamiento de los clientes en tiempo real.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Enviadas',   value: stats.total,     color: 'text-navy' },
            { label: 'Abiertas',   value: stats.abiertas,  color: 'text-blue-600' },
            { label: 'Aceptadas',  value: stats.aceptadas, color: 'text-green-600' },
            { label: 'Rechazadas', value: stats.rechazadas,color: 'text-red-500' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-200 p-5 text-center">
              <p className={`text-3xl font-extrabold ${s.color}`}>{s.value}</p>
              <p className="text-gray-400 text-xs mt-1 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Lista de ofertas ──────────────────────────────────────────────── */}
      {ofertas.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <p className="text-gray-400">Todavía no hay ofertas enviadas.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {ofertas.map(oferta => (
            <OfertaCard
              key={oferta.id}
              oferta={oferta}
              expandida={expandida === oferta.id}
              onToggle={() => setExpandida(expandida === oferta.id ? null : oferta.id)}
              confirmando={confirmando === oferta.token}
              eliminando={eliminando === oferta.token}
              onPedirConfirmacion={() => setConfirmando(oferta.token)}
              onCancelarConfirmacion={() => setConfirmando(null)}
              onConfirmarEliminar={() => handleEliminar(oferta.token)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Tarjeta de oferta ─────────────────────────────────────────────────────────

function OfertaCard({ oferta, expandida, onToggle, confirmando, eliminando, onPedirConfirmacion, onCancelarConfirmacion, onConfirmarEliminar }) {
  const { resumen } = oferta

  const badgeEstado = resumen.accionFinal === 'aceptada'  ? { text: 'Aceptada',  cls: 'bg-green-100 text-green-700' }
    : resumen.accionFinal === 'rechazada' ? { text: 'Rechazada', cls: 'bg-red-100   text-red-600'  }
    : resumen.expirada                   ? { text: 'Expirada',  cls: 'bg-gray-100  text-gray-500' }
    :                                      { text: 'Pendiente', cls: 'bg-blue-50   text-blue-600' }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

      {/* ── Cabecera de la tarjeta ─────────────────────────────────────── */}
      <button
        onClick={onToggle}
        className="w-full text-left p-5 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-start justify-between gap-4">

          {/* Info principal */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <p className="font-bold text-navy text-base">{oferta.cliente.nombre_empresa}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badgeEstado.cls}`}>
                {badgeEstado.text}
              </span>
            </div>
            <p className="text-gray-500 text-sm">
              {oferta.cliente.nombre_contacto}
              {oferta.cliente.cargo ? ` · ${oferta.cliente.cargo}` : ''}
            </p>
            <p className="text-gray-400 text-xs mt-1 font-mono">
              {oferta.producto.nombre} · {oferta.numero_oferta}
            </p>
          </div>

          {/* Fecha + expand */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <p className="text-gray-400 text-xs text-right">
              {resumen.ultimaApertura
                ? <>Última visita<br /><span className="font-medium text-gray-600">{fechaRelativa(resumen.ultimaApertura)}</span></>
                : <span className="text-gray-300 italic">Sin abrir</span>
              }
            </p>
            <svg
              className={`w-5 h-5 text-gray-300 transition-transform flex-shrink-0 ${expandida ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* ── Indicadores rápidos ──────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mt-3">
          {/* Aperturas */}
          {resumen.vecesAbierta > 0 ? (
            <Chip icon="👁" text={`Abierta ${resumen.vecesAbierta}×`} color="blue" />
          ) : (
            <Chip icon="📭" text="Sin abrir" color="gray" />
          )}

          {/* Tiempo */}
          {tiempoLegible(resumen.tiempoTotal) && (
            <Chip icon="⏱" text={tiempoLegible(resumen.tiempoTotal)} color="gray" />
          )}

          {/* PDF */}
          {resumen.pdfDescargado && <Chip icon="📄" text="PDF descargado" color="navy" />}

          {/* Contactos */}
          {resumen.agendoReunion  && <Chip icon="📅" text="Agendó reunión"  color="purple" />}
          {resumen.contactoWA     && <Chip icon="💬" text="WhatsApp"        color="green"  />}
          {resumen.contactoEmail  && <Chip icon="✉️" text="Email"           color="gray"   />}

          {/* Motivo rechazo */}
          {resumen.motivoRechazo && (
            <Chip icon="❌" text={resumen.motivoRechazo} color="red" />
          )}
        </div>

        {/* Secciones visitadas */}
        {resumen.seccionesVistas.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            <span className="text-xs text-gray-400 mr-1">Vio:</span>
            {resumen.seccionesVistas.map(s => (
              <span key={s} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                {LABEL_SECCION[s] || s}
              </span>
            ))}
          </div>
        )}
      </button>

      {/* ── Timeline expandido ────────────────────────────────────────── */}
      {expandida && (
        <div className="border-t border-gray-100 bg-gray-50 px-5 py-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Timeline completo · {oferta.eventos.length} eventos
          </p>

          {oferta.eventos.length === 0 ? (
            <p className="text-sm text-gray-400 italic">Sin eventos registrados todavía.</p>
          ) : (
            <div className="space-y-1.5">
              {oferta.eventos.map((ev, i) => (
                <EventoFila key={i} ev={ev} />
              ))}
            </div>
          )}

          {/* Enlace a la oferta + eliminar */}
          <div className="mt-4 pt-3 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <a
                href={`/o/${oferta.token}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-navy hover:underline font-medium"
              >
                Abrir oferta →
              </a>
              {oferta.pdf_url && (
                <a
                  href={oferta.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-400 hover:underline"
                >
                  Ver PDF adjunto
                </a>
              )}
              <span className="text-xs text-gray-300 ml-auto">
                Expira: {new Date(oferta.fecha_expiracion).toLocaleDateString('es-ES')}
              </span>
              {!confirmando && (
                <button
                  onClick={onPedirConfirmacion}
                  className="text-gray-300 hover:text-red-400 transition-colors ml-2"
                  title="Eliminar oferta"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </div>

            {/* Confirmación de borrado */}
            {confirmando && (
              <div className="mt-3 flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs text-red-700 flex-1">
                  ¿Eliminar esta oferta y todos sus eventos? Esta acción no se puede deshacer.
                </p>
                <button
                  onClick={onConfirmarEliminar}
                  disabled={eliminando}
                  className="text-xs bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                >
                  {eliminando ? 'Eliminando...' : 'Sí, eliminar'}
                </button>
                <button
                  onClick={onCancelarConfirmacion}
                  className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1.5"
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Fila de evento en el timeline ────────────────────────────────────────────

function EventoFila({ ev }) {
  const tipo  = ev.tipo_evento
  const datos = ev.datos_adicionales_json || {}

  const iconos = {
    oferta_abierta:    '👁',
    pdf_descargado:    '📄',
    btn_agendar:       '📅',
    btn_whatsapp:      '💬',
    btn_email:         '✉️',
    oferta_aceptada:   '✅',
    oferta_rechazada:  '❌',
    solucion_expandida:'▶️',
    seccion_vista:     '→',
    tiempo_total:      '⏱',
  }

  let descripcion = LABEL_EVENTO[tipo] || tipo
  if (tipo === 'seccion_vista')      descripcion = `Visitó: ${LABEL_SECCION[datos.seccion] || datos.seccion}`
  if (tipo === 'solucion_expandida') descripcion = `Abrió vídeo de solución: ${datos.nombre || ''}`
  if (tipo === 'tiempo_total')       descripcion = `Tiempo en la oferta: ${tiempoLegible(datos.segundos) || datos.segundos + 's'}`
  if (tipo === 'oferta_rechazada' && datos.motivo) descripcion = `Rechazó — ${datos.motivo}`

  const esAccion = ['oferta_aceptada', 'oferta_rechazada', 'btn_agendar', 'btn_whatsapp', 'btn_email', 'pdf_descargado'].includes(tipo)

  return (
    <div className={`flex items-start gap-2 text-sm ${esAccion ? 'font-medium' : ''}`}>
      <span className="w-5 text-center flex-shrink-0 text-xs">{iconos[tipo] || '·'}</span>
      <span className={`flex-1 ${
        tipo === 'oferta_aceptada'  ? 'text-green-700' :
        tipo === 'oferta_rechazada' ? 'text-red-600'   :
        esAccion                    ? 'text-navy'       :
        'text-gray-500'
      }`}>
        {descripcion}
      </span>
      <span className="text-gray-300 text-xs flex-shrink-0 ml-2">
        {fechaCorta(ev.timestamp)}
      </span>
    </div>
  )
}

// ── Chip de indicador ─────────────────────────────────────────────────────────

function Chip({ icon, text, color }) {
  const colors = {
    blue:   'bg-blue-50   text-blue-600',
    green:  'bg-green-50  text-green-600',
    red:    'bg-red-50    text-red-500',
    gray:   'bg-gray-100  text-gray-500',
    navy:   'bg-azul-light text-navy',
    purple: 'bg-purple-50 text-purple-600',
  }
  return (
    <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${colors[color] || colors.gray}`}>
      <span>{icon}</span>
      <span>{text}</span>
    </span>
  )
}
