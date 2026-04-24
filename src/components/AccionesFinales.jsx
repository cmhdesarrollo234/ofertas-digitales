import { useState } from 'react'

const MOTIVOS_RECHAZO = [
  'El precio está fuera de presupuesto',
  'Los plazos de entrega no se ajustan a mi necesidad',
  'Estamos evaluando otras opciones',
  'El proyecto se ha pospuesto internamente',
  'Las especificaciones técnicas no se ajustan',
  'Otro motivo',
]

export default function AccionesFinales({ comercial, ofertaId }) {
  const [estado, setEstado] = useState('inicial') // inicial | aceptada | rechazo_form | rechazada
  const [motivoSeleccionado, setMotivoSeleccionado] = useState('')
  const [comentarioLibre, setComentarioLibre] = useState('')

  const abrirCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: comercial.calendly_url })
    } else {
      window.open(comercial.calendly_url, '_blank')
    }
    // TODO Fase 2: registrar evento btn_agendar
  }

  const handleAceptar = () => {
    setEstado('aceptada')
    // TODO Fase 2: fetch('/api/track-event', { tipo: 'oferta_aceptada' })
  }

  const handleEnviarRechazo = () => {
    if (!motivoSeleccionado) return
    setEstado('rechazada')
    // TODO Fase 2: fetch('/api/track-event', { tipo: 'oferta_rechazada', motivo: motivoSeleccionado, comentario: comentarioLibre })
  }

  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-3xl mx-auto px-6">

        <p className="seccion-label text-center">Siguiente paso</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4 text-center">
          ¿Cómo desea proceder?
        </h2>
        <p className="text-gray-600 text-lg mb-12 text-center">
          Estamos a su disposición para cualquier consulta antes de tomar una decisión.
        </p>

        {/* ── ESTADO INICIAL ─────────────────────────────────────────────── */}
        {estado === 'inicial' && (
          <>
            {/* Comercial */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8 flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-navy flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                {comercial.nombre.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-bold text-navy text-lg">{comercial.nombre}</p>
                <p className="text-gray-500 text-sm">{comercial.cargo}</p>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <a href={`tel:${comercial.telefono}`}
                   className="flex items-center gap-2 text-azul hover:text-navy font-medium">
                  <span>📞</span> {comercial.telefono}
                </a>
                <a href={`mailto:${comercial.email}`}
                   className="flex items-center gap-2 text-azul hover:text-navy font-medium">
                  <span>✉️</span> {comercial.email}
                </a>
              </div>
            </div>

            {/* Tres botones de acción */}
            <div className="space-y-4">

              {/* ACEPTAR */}
              <button onClick={handleAceptar} className="btn-aceptar">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                    d="M5 13l4 4L19 7" />
                </svg>
                Aceptar esta oferta
              </button>

              {/* AGENDAR */}
              <button onClick={abrirCalendly} className="btn-agendar">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Agendar consulta con el comercial
              </button>

              {/* CONTACTAR */}
              <div className="grid grid-cols-2 gap-3">
                <a href={`https://wa.me/${comercial.whatsapp.replace(/\D/g, '')}`}
                   target="_blank" rel="noopener noreferrer"
                   className="btn-contactar">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M11.999 2C6.477 2 2 6.477 2 12c0 1.989.586 3.841 1.592 5.391L2.046 22l4.737-1.521A9.97 9.97 0 0011.999 22C17.522 22 22 17.523 22 12S17.522 2 11.999 2zm0 18c-1.707 0-3.317-.49-4.673-1.341l-3.274 1.05 1.07-3.186A7.937 7.937 0 014 12c0-4.411 3.588-8 7.999-8 4.412 0 8.001 3.589 8.001 8 0 4.41-3.589 8-8.001 8z"/>
                  </svg>
                  WhatsApp
                </a>
                <a href={`mailto:${comercial.email}`}
                   className="btn-contactar">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </a>
              </div>

              {/* Rechazar discreto */}
              <div className="text-center pt-4">
                <button
                  onClick={() => setEstado('rechazo_form')}
                  className="text-gray-400 hover:text-gray-600 text-sm underline underline-offset-4 transition-colors"
                >
                  Esta oferta no me interesa
                </button>
              </div>
            </div>
          </>
        )}

        {/* ── OFERTA ACEPTADA ────────────────────────────────────────────── */}
        {estado === 'aceptada' && (
          <div className="text-center py-10 fade-in-up">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-extrabold text-navy mb-3">¡Gracias por su confianza!</h3>
            <p className="text-gray-600 text-lg mb-6">
              Hemos registrado su aceptación. {comercial.nombre} se pondrá en contacto con usted
              en las próximas horas para confirmar los detalles del pedido.
            </p>
            <p className="text-gray-400 text-sm">
              Si necesita cualquier cosa antes, puede escribirnos a{' '}
              <a href={`mailto:${comercial.email}`} className="text-azul underline">{comercial.email}</a>
            </p>
          </div>
        )}

        {/* ── FORMULARIO DE RECHAZO ──────────────────────────────────────── */}
        {estado === 'rechazo_form' && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 fade-in-up">
            <h3 className="text-xl font-bold text-navy mb-2">Nos gustaría entender el motivo</h3>
            <p className="text-gray-500 text-sm mb-6">
              Su opinión es importante para mejorar nuestras propuestas futuras.
            </p>

            <div className="space-y-3 mb-6">
              {MOTIVOS_RECHAZO.map(motivo => (
                <label key={motivo}
                       className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                         motivoSeleccionado === motivo
                           ? 'border-navy bg-azul-light'
                           : 'border-gray-200 hover:border-gray-300'
                       }`}>
                  <input
                    type="radio"
                    name="motivo"
                    value={motivo}
                    checked={motivoSeleccionado === motivo}
                    onChange={() => setMotivoSeleccionado(motivo)}
                    className="text-navy"
                  />
                  <span className="text-sm text-gray-700">{motivo}</span>
                </label>
              ))}
            </div>

            <textarea
              placeholder="Comentario adicional (opcional)..."
              value={comentarioLibre}
              onChange={e => setComentarioLibre(e.target.value)}
              className="w-full border border-gray-200 rounded-xl p-4 text-sm text-gray-700
                         focus:outline-none focus:border-azul resize-none mb-4"
              rows={3}
            />

            <div className="flex gap-3">
              <button
                onClick={handleEnviarRechazo}
                disabled={!motivoSeleccionado}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold text-sm transition-colors ${
                  motivoSeleccionado
                    ? 'bg-navy text-white hover:bg-navy-dark'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                Enviar y cerrar
              </button>
              <button
                onClick={() => setEstado('inicial')}
                className="py-3 px-6 rounded-xl text-sm text-gray-500 hover:text-gray-700 border border-gray-200"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* ── RECHAZO ENVIADO ────────────────────────────────────────────── */}
        {estado === 'rechazada' && (
          <div className="text-center py-10 fade-in-up">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-extrabold text-navy mb-3">Gracias por su respuesta</h3>
            <p className="text-gray-600 text-lg">
              Hemos registrado sus comentarios. Si en el futuro su situación cambia o necesita
              una nueva propuesta, no dude en contactarnos.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
