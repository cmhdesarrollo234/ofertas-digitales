import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { mockOferta } from '../data/mockOferta.js'

import NavBar            from '../components/NavBar.jsx'
import Encabezado        from '../components/Encabezado.jsx'
import Descripcion       from '../components/Descripcion.jsx'
import VideoYoutube      from '../components/VideoYoutube.jsx'
import Modelo3D          from '../components/Modelo3D.jsx'
import TablaAccesorios   from '../components/TablaAccesorios.jsx'
import SolucionesCalidad from '../components/SolucionesCalidad.jsx'
import ResumenEconomico  from '../components/ResumenEconomico.jsx'
import Condiciones       from '../components/Condiciones.jsx'
import AccionesFinales   from '../components/AccionesFinales.jsx'
import ContactoFlotante  from '../components/ContactoFlotante.jsx'

// ─────────────────────────────────────────────────────────────────────────────
// Página de oferta — Lee datos desde Supabase usando el token de la URL.
// URL: /o/:token
//
// MODO DEMO: si el token es "demo", carga mockOferta.js en lugar de Supabase.
// ─────────────────────────────────────────────────────────────────────────────

export default function OfertaPage() {
  const { token } = useParams()
  const [oferta, setOferta] = useState(null)
  const [estado, setEstado] = useState('cargando') // cargando | ok | error | expirada

  useEffect(() => {
    if (!token) { setEstado('error'); return }

    // Modo demo: carga datos mock
    if (token === 'demo') {
      setOferta(mockOferta)
      setEstado('ok')
      return
    }

    // Modo real: llama al backend
    fetch(`/api/get-oferta?token=${token}`)
      .then(res => {
        if (res.status === 404) { setEstado('expirada'); return null }
        if (!res.ok) throw new Error('Error del servidor')
        return res.json()
      })
      .then(data => {
        if (data) { setOferta(data); setEstado('ok') }
      })
      .catch(() => setEstado('error'))
  }, [token])

  // ── Registrar apertura ───────────────────────────────────────────────────
  useEffect(() => {
    if (estado !== 'ok' || !oferta) return
    fetch('/api/track-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ oferta_id: oferta.id || token, tipo_evento: 'oferta_abierta' }),
    }).catch(() => {}) // Silenciar errores de tracking
  }, [estado, oferta, token])

  // ── Estados de carga ─────────────────────────────────────────────────────
  if (estado === 'cargando') {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60 text-sm">Cargando oferta...</p>
        </div>
      </div>
    )
  }

  if (estado === 'expirada') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-10 max-w-md text-center shadow-sm border border-gray-200">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <span className="text-3xl">⏰</span>
          </div>
          <h2 className="text-2xl font-extrabold text-navy mb-3">Esta oferta ha expirado</h2>
          <p className="text-gray-500 mb-6">
            El período de validez de esta oferta ha finalizado. Contacta con nosotros para solicitar una actualización.
          </p>
          <a href="mailto:comercial@vuempresa.com"
             className="inline-block bg-navy text-white font-bold py-3 px-8 rounded-xl hover:bg-navy-dark transition-colors">
            Solicitar nueva oferta
          </a>
        </div>
      </div>
    )
  }

  if (estado === 'error' || !oferta) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-10 max-w-md text-center shadow-sm border border-gray-200">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <span className="text-3xl">🔗</span>
          </div>
          <h2 className="text-2xl font-extrabold text-navy mb-3">Enlace no válido</h2>
          <p className="text-gray-500">
            Este enlace no existe o ya no está disponible. Contacta con tu comercial para obtener el enlace correcto.
          </p>
        </div>
      </div>
    )
  }

  // ── Oferta cargada: mismo render que App.jsx ─────────────────────────────
  return (
    <div className="min-h-screen bg-white">
      <NavBar oferta={oferta} />
      <main>
        <section id="inicio"><Encabezado oferta={oferta} /></section>
        <section id="descripcion"><Descripcion producto={oferta.producto} /></section>
        {oferta.producto?.video_youtube_id && oferta.producto.video_youtube_id !== 'SUSTITUIR_ID_YOUTUBE' && (
          <section id="video">
            <VideoYoutube videoId={oferta.producto.video_youtube_id} />
          </section>
        )}
        {oferta.producto?.modelo_glb_path && (
          <section id="modelo3d">
            <Modelo3D glbPath={oferta.producto.modelo_glb_path} nombre={oferta.producto.nombre} />
          </section>
        )}
        <section id="accesorios">
          <TablaAccesorios
            imprescindibles={oferta.accesorios_imprescindibles}
            opcionales={oferta.accesorios_opcionales}
          />
        </section>
        <section id="soluciones">
          <SolucionesCalidad soluciones={oferta.soluciones_calidad} />
        </section>
        <section id="resumen">
          <ResumenEconomico
            accesorios_imprescindibles={oferta.accesorios_imprescindibles}
            accesorios_opcionales={oferta.accesorios_opcionales}
            condiciones={oferta.condiciones}
          />
        </section>
        <section id="condiciones">
          <Condiciones condiciones={oferta.condiciones} validez={oferta.fecha_expiracion} />
        </section>
        <section id="accion">
          <AccionesFinales comercial={oferta.comercial} ofertaId={oferta.id || token} />
        </section>
      </main>
      <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm">
        <p className="font-semibold text-white mb-1">{oferta.empresa?.nombre}</p>
        <p>{oferta.empresa?.web}</p>
        <p className="mt-3 text-xs text-gray-600">
          Oferta {oferta.numero_oferta} · Documento confidencial · Válido hasta {oferta.fecha_expiracion}
        </p>
      </footer>
      <ContactoFlotante comercial={oferta.comercial} />
    </div>
  )
}
