import { useState } from 'react'
import { CATALOGO, CONDICIONES_PLANTILLAS, EMPRESA, COMERCIAL } from '../data/catalogo.js'
import { supabase } from '../lib/supabaseClient.js'
import AdminDashboard from '../components/AdminDashboard.jsx'

// ─────────────────────────────────────────────────────────────────────────────
// PANEL DE ADMINISTRACIÓN — Crear nueva oferta
// Accesible en /admin — solo uso interno de la comercial
// ─────────────────────────────────────────────────────────────────────────────

const PASOS = ['Cliente', 'Producto', 'Condiciones', 'Revisión']

function generarNumeroOferta() {
  const año = new Date().getFullYear()
  const rand = Math.floor(Math.random() * 900) + 100
  return `${año}-${rand}-A`
}

function calcularFechaExpiracion(dias) {
  const d = new Date()
  d.setDate(d.getDate() + dias)
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function Admin() {
  const [vista, setVista] = useState('nueva') // 'nueva' | 'dashboard'
  const [paso, setPaso] = useState(0)
  const [cargando, setCargando] = useState(false)
  const [urlGenerada, setUrlGenerada] = useState(null)
  const [error, setError] = useState(null)

  // Datos del formulario
  const [cliente, setCliente] = useState({
    nombre_empresa: '',
    nombre_contacto: '',
    cargo: '',
    email: '',
  })
  const [productoId, setProductoId] = useState(CATALOGO[0]?.id || '')
  const [descripcionPersonalizada, setDescripcionPersonalizada] = useState('')
  const [condicionesId, setCondicionesId] = useState(CONDICIONES_PLANTILLAS[0]?.id || '')

  // PDF adjunto (opcional)
  const [pdfFile, setPdfFile]       = useState(null)
  const [pdfUrl, setPdfUrl]         = useState(null)
  const [subiendoPdf, setSubiendoPdf] = useState(false)
  const [errorPdf, setErrorPdf]     = useState(null)

  const producto = CATALOGO.find(p => p.id === productoId)
  const condiciones = CONDICIONES_PLANTILLAS.find(c => c.id === condicionesId)

  // ── Validaciones por paso ────────────────────────────────────────────────
  const pasoValido = [
    cliente.nombre_empresa.trim() && cliente.nombre_contacto.trim() && cliente.email.trim(),
    !!productoId,
    !!condicionesId,
    true,
  ]

  // ── Subir PDF a Supabase Storage ─────────────────────────────────────────
  async function handleSubirPdf(file) {
    if (!file) return
    setPdfFile(file)
    setSubiendoPdf(true)
    setErrorPdf(null)
    try {
      const ext = file.name.split('.').pop()
      const nombreArchivo = `ofertas/${Date.now()}-${Math.random().toString(36).substr(2, 6)}.${ext}`

      const { data, error: uploadError } = await supabase.storage
        .from('ofertas-pdf')
        .upload(nombreArchivo, file, { contentType: 'application/pdf', upsert: false })

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('ofertas-pdf')
        .getPublicUrl(data.path)

      setPdfUrl(publicUrl)
    } catch (err) {
      console.error('[Admin] Error subiendo PDF:', err)
      setErrorPdf('No se pudo subir el PDF. Comprueba la conexión e inténtalo de nuevo.')
      setPdfFile(null)
    } finally {
      setSubiendoPdf(false)
    }
  }

  // ── Construir el objeto oferta ───────────────────────────────────────────
  function construirOferta() {
    const numero = generarNumeroOferta()
    const hoy = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
    return {
      numero_oferta: numero,
      fecha_creacion: hoy,
      fecha_expiracion: calcularFechaExpiracion(condiciones.validez_dias),
      estado: 'enviada',
      cliente,
      producto: {
        ...producto,
        descripcion_personalizada: descripcionPersonalizada,
      },
      accesorios_imprescindibles: producto.accesorios_imprescindibles,
      accesorios_opcionales: producto.accesorios_opcionales,
      soluciones_calidad: producto.soluciones_calidad,
      condiciones,
      comercial: COMERCIAL,
      empresa: EMPRESA,
      pdf_url: pdfUrl || null,
    }
  }

  // ── Generar y guardar oferta ─────────────────────────────────────────────
  async function handleGenerar() {
    setCargando(true)
    setError(null)
    try {
      const ofertaData = construirOferta()
      const res = await fetch('/api/crear-oferta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ofertaData),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Error desconocido')
      setUrlGenerada(`${window.location.origin}/o/${json.token}`)
    } catch (err) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }

  // ── URL generada con éxito ───────────────────────────────────────────────
  if (urlGenerada) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10 max-w-lg w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold text-navy mb-2">¡Oferta creada!</h2>
          <p className="text-gray-500 mb-6">Copia este enlace y envíalo al cliente por correo.</p>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-4">
            <p className="font-mono text-sm text-navy break-all">{urlGenerada}</p>
          </div>

          <button
            onClick={() => { navigator.clipboard.writeText(urlGenerada) }}
            className="w-full bg-navy hover:bg-navy-dark text-white font-bold py-3 px-6 rounded-xl
                       transition-colors flex items-center justify-center gap-2 mb-3"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copiar enlace
          </button>

          <a href={urlGenerada} target="_blank" rel="noopener noreferrer"
             className="block w-full border-2 border-navy text-navy font-semibold py-3 px-6 rounded-xl
                        hover:bg-azul-light transition-colors mb-4">
            Vista previa de la oferta →
          </a>

          {pdfUrl && (
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer"
               className="block w-full border border-gray-200 text-gray-500 text-sm py-2.5 px-6 rounded-xl
                          hover:bg-gray-50 transition-colors mb-4 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Verificar PDF adjunto
            </a>
          )}

          <button
            onClick={() => {
              setUrlGenerada(null)
              setPaso(0)
              setCliente({ nombre_empresa: '', nombre_contacto: '', cargo: '', email: '' })
              setDescripcionPersonalizada('')
              setPdfFile(null)
              setPdfUrl(null)
            }}
            className="text-gray-400 hover:text-gray-600 text-sm underline underline-offset-4"
          >
            Crear otra oferta
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-navy text-white px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-white/60 text-xs uppercase tracking-widest">Panel interno</p>
          <h1 className="font-bold text-lg">
            {vista === 'nueva' ? 'Nueva oferta comercial' : 'Seguimiento de ofertas'}
          </h1>
        </div>
        <span className="text-white/60 text-sm">{EMPRESA.nombre}</span>
      </div>

      {/* Tabs de navegación */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="max-w-4xl mx-auto flex gap-0">
          <button
            onClick={() => setVista('nueva')}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${
              vista === 'nueva'
                ? 'border-navy text-navy'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            + Nueva oferta
          </button>
          <button
            onClick={() => setVista('dashboard')}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${
              vista === 'dashboard'
                ? 'border-navy text-navy'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            📊 Seguimiento
          </button>
        </div>
      </div>

      {/* Vista: Dashboard */}
      {vista === 'dashboard' && <AdminDashboard />}

      {/* Vista: Nueva oferta — barra de pasos + formulario */}
      {vista === 'nueva' && <><div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-2">
          {PASOS.map((nombre, i) => (
            <div key={i} className="flex items-center gap-2 flex-1">
              <button
                onClick={() => i < paso && setPaso(i)}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  i === paso ? 'text-navy' :
                  i < paso  ? 'text-green-600 cursor-pointer' :
                  'text-gray-300 cursor-default'
                }`}
              >
                <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0 ${
                  i < paso  ? 'bg-green-600 text-white' :
                  i === paso ? 'bg-navy text-white' :
                  'bg-gray-200 text-gray-400'
                }`}>
                  {i < paso ? '✓' : i + 1}
                </span>
                <span className="hidden sm:inline">{nombre}</span>
              </button>
              {i < PASOS.length - 1 && (
                <div className={`flex-1 h-0.5 ${i < paso ? 'bg-green-300' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contenido del paso */}
      <div className="max-w-2xl mx-auto px-6 py-10">

        {/* ── PASO 0: DATOS DEL CLIENTE ─────────────────────────────────── */}
        {paso === 0 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-navy mb-1">Datos del cliente</h2>
              <p className="text-gray-500 text-sm">Información de la empresa y persona de contacto.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 space-y-4">
              <Field label="Empresa *" required>
                <input
                  type="text"
                  placeholder="Nombre de la empresa"
                  value={cliente.nombre_empresa}
                  onChange={e => setCliente({ ...cliente, nombre_empresa: e.target.value })}
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Nombre de contacto *" required>
                  <input
                    type="text"
                    placeholder="Nombre y apellidos"
                    value={cliente.nombre_contacto}
                    onChange={e => setCliente({ ...cliente, nombre_contacto: e.target.value })}
                  />
                </Field>
                <Field label="Cargo">
                  <input
                    type="text"
                    placeholder="Director de Producción"
                    value={cliente.cargo}
                    onChange={e => setCliente({ ...cliente, cargo: e.target.value })}
                  />
                </Field>
              </div>
              <Field label="Email *" required>
                <input
                  type="email"
                  placeholder="contacto@empresa.com"
                  value={cliente.email}
                  onChange={e => setCliente({ ...cliente, email: e.target.value })}
                />
              </Field>
            </div>
          </div>
        )}

        {/* ── PASO 1: PRODUCTO ──────────────────────────────────────────── */}
        {paso === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-navy mb-1">Selección de producto</h2>
              <p className="text-gray-500 text-sm">El producto define los accesorios y soluciones disponibles.</p>
            </div>

            <div className="space-y-3">
              {CATALOGO.map(p => (
                <label key={p.id}
                  className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-colors ${
                    productoId === p.id
                      ? 'border-navy bg-azul-light'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}>
                  <input
                    type="radio"
                    name="producto"
                    value={p.id}
                    checked={productoId === p.id}
                    onChange={() => setProductoId(p.id)}
                    className="mt-1"
                  />
                  <div>
                    <p className="font-bold text-navy">{p.nombre}</p>
                    <p className="text-xs font-mono text-gray-400 mb-1">{p.codigo_referencia}</p>
                    <p className="text-sm text-gray-600">{p.descripcion_corta}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                        {p.accesorios_imprescindibles.length} accesorios incluidos
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {p.accesorios_opcionales.length} opcionales
                      </span>
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                        {p.soluciones_calidad.length} soluciones de calidad
                      </span>
                    </div>
                  </div>
                </label>
              ))}
            </div>

            {/* Texto personalizado opcional */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <label className="block text-sm font-semibold text-navy mb-2">
                Texto introductorio personalizado
                <span className="font-normal text-gray-400 ml-2">(opcional)</span>
              </label>
              <textarea
                placeholder="Estimado cliente, hemos preparado esta propuesta específicamente para sus necesidades..."
                value={descripcionPersonalizada}
                onChange={e => setDescripcionPersonalizada(e.target.value)}
                className="w-full border border-gray-200 rounded-xl p-4 text-sm text-gray-700
                           focus:outline-none focus:border-azul resize-none"
                rows={4}
              />
              <p className="text-xs text-gray-400 mt-2">
                Si lo dejas vacío, se mostrará la descripción estándar del producto.
              </p>
            </div>
          </div>
        )}

        {/* ── PASO 2: CONDICIONES ───────────────────────────────────────── */}
        {paso === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-navy mb-1">Condiciones comerciales</h2>
              <p className="text-gray-500 text-sm">Selecciona la plantilla de condiciones aplicable.</p>
            </div>

            <div className="space-y-3">
              {CONDICIONES_PLANTILLAS.map(c => (
                <label key={c.id}
                  className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-colors ${
                    condicionesId === c.id
                      ? 'border-navy bg-azul-light'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}>
                  <input
                    type="radio"
                    name="condiciones"
                    value={c.id}
                    checked={condicionesId === c.id}
                    onChange={() => setCondicionesId(c.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-navy mb-3">{c.nombre}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        ['Validez', `${c.validez_dias} días`],
                        ['Plazo entrega', `${c.plazo_entrega_semanas} semanas`],
                        ['Garantía', `${c.garantia_meses} meses`],
                        ['Pago', c.condiciones_pago],
                      ].map(([k, v]) => (
                        <div key={k}>
                          <p className="text-xs text-gray-400">{k}</p>
                          <p className="text-sm font-medium text-gray-700">{v}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* ── PASO 3: REVISIÓN ─────────────────────────────────────────── */}
        {paso === 3 && producto && condiciones && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-navy mb-1">Revisión final</h2>
              <p className="text-gray-500 text-sm">Comprueba los datos y adjunta el PDF antes de generar el enlace.</p>
            </div>

            {[
              {
                titulo: 'Cliente',
                items: [
                  ['Empresa', cliente.nombre_empresa],
                  ['Contacto', `${cliente.nombre_contacto}${cliente.cargo ? ` — ${cliente.cargo}` : ''}`],
                  ['Email', cliente.email],
                ],
              },
              {
                titulo: 'Producto',
                items: [
                  ['Referencia', producto.codigo_referencia],
                  ['Nombre', producto.nombre],
                  ['Accesorios incluidos', producto.accesorios_imprescindibles.length.toString()],
                  ['Opcionales disponibles', producto.accesorios_opcionales.length.toString()],
                ],
              },
              {
                titulo: 'Condiciones',
                items: [
                  ['Plantilla', condiciones.nombre],
                  ['Validez', `${condiciones.validez_dias} días`],
                  ['Plazo de entrega', `${condiciones.plazo_entrega_semanas} semanas`],
                  ['Pago', condiciones.condiciones_pago],
                ],
              },
            ].map(bloque => (
              <div key={bloque.titulo} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-5 py-3 border-b border-gray-100">
                  <p className="font-bold text-navy text-sm">{bloque.titulo}</p>
                </div>
                <div className="divide-y divide-gray-50">
                  {bloque.items.map(([k, v]) => (
                    <div key={k} className="flex justify-between px-5 py-3 text-sm">
                      <span className="text-gray-400">{k}</span>
                      <span className="font-medium text-navy text-right max-w-xs">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* ── PDF adjunto (opcional) ─────────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <p className="font-bold text-navy text-sm">PDF de la oferta</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    El cliente verá un botón de descarga destacado al abrir la oferta
                  </p>
                </div>
                <span className="text-xs bg-gray-100 text-gray-400 px-2 py-1 rounded-full">Opcional</span>
              </div>

              <div className="p-5">
                {!pdfUrl ? (
                  <div>
                    <label className="block cursor-pointer group">
                      <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors
                        ${subiendoPdf
                          ? 'border-navy/30 bg-azul-light/50'
                          : 'border-gray-200 hover:border-navy/30 hover:bg-gray-50'
                        }`}>
                        {subiendoPdf ? (
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-8 h-8 border-2 border-navy/20 border-t-navy rounded-full animate-spin" />
                            <p className="text-sm text-gray-500">Subiendo PDF...</p>
                          </div>
                        ) : (
                          <>
                            <svg className="w-10 h-10 text-gray-300 mx-auto mb-3 group-hover:text-navy/40 transition-colors"
                              fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                d="M12 16v-6m0 0l-3 3m3-3l3 3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                            </svg>
                            <p className="text-sm font-medium text-gray-600">Haz clic para adjuntar el PDF</p>
                            <p className="text-xs text-gray-400 mt-1">La oferta clásica que ya tenías en Word/PDF</p>
                          </>
                        )}
                      </div>
                      <input
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={e => handleSubirPdf(e.target.files[0])}
                        disabled={subiendoPdf}
                      />
                    </label>

                    {errorPdf && (
                      <div className="mt-3 flex items-center gap-2 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {errorPdf}
                      </div>
                    )}
                  </div>
                ) : (
                  /* PDF subido con éxito */
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-navy">PDF adjuntado correctamente</p>
                      <p className="text-xs text-gray-400 truncate mt-0.5">{pdfFile?.name}</p>
                    </div>
                    <button
                      onClick={() => { setPdfUrl(null); setPdfFile(null) }}
                      className="flex-shrink-0 text-gray-300 hover:text-red-400 transition-colors p-1"
                      title="Quitar PDF"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
                Error al generar la oferta: {error}
              </div>
            )}
          </div>
        )}

        {/* ── BOTONES DE NAVEGACIÓN ─────────────────────────────────────── */}
        <div className="flex gap-3 mt-8">
          {paso > 0 && (
            <button
              onClick={() => setPaso(paso - 1)}
              className="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-600
                         hover:border-gray-300 font-semibold transition-colors"
            >
              ← Atrás
            </button>
          )}

          {paso < PASOS.length - 1 ? (
            <button
              onClick={() => setPaso(paso + 1)}
              disabled={!pasoValido[paso]}
              className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm transition-colors ${
                pasoValido[paso]
                  ? 'bg-navy hover:bg-navy-dark text-white'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Continuar →
            </button>
          ) : (
            <button
              onClick={handleGenerar}
              disabled={cargando || subiendoPdf}
              className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm transition-colors
                          flex items-center justify-center gap-2 ${
                subiendoPdf
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {cargando ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generando...
                </>
              ) : subiendoPdf ? (
                <>
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-500 rounded-full animate-spin" />
                  Esperando subida del PDF...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  Generar enlace de oferta
                </>
              )}
            </button>
          )}
        </div>
      </div>
      </>}
    </div>
  )
}

// ── Componente auxiliar Field ────────────────────────────────────────────────
function Field({ label, children, required }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-navy mb-1.5">
        {label}
      </label>
      <div className="[&>input]:w-full [&>input]:border [&>input]:border-gray-200 [&>input]:rounded-xl
                      [&>input]:px-4 [&>input]:py-2.5 [&>input]:text-sm [&>input]:text-gray-700
                      [&>input]:focus:outline-none [&>input]:focus:border-azul [&>input]:transition-colors">
        {children}
      </div>
    </div>
  )
}
