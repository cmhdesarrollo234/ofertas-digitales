import { useState } from 'react'

function formatEur(n) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(n)
}

function CardSolucion({ sol, index }) {
  const [videoAbierto, setVideoAbierto] = useState(false)

  const colores = [
    { bg: 'bg-blue-50',   borde: 'border-blue-200',  num: 'bg-navy text-white' },
    { bg: 'bg-orange-50', borde: 'border-orange-200', num: 'bg-naranja text-white' },
    { bg: 'bg-green-50',  borde: 'border-green-200',  num: 'bg-green-700 text-white' },
  ]
  const c = colores[index % colores.length]

  return (
    <div className={`rounded-2xl border-2 ${c.borde} ${c.bg} p-6 flex flex-col gap-4`}>
      {/* Número de solución */}
      <div className="flex items-start justify-between">
        <span className={`w-9 h-9 rounded-xl ${c.num} flex items-center justify-center font-bold text-sm flex-shrink-0`}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="text-right font-bold text-lg text-navy">
          {formatEur(sol.precio)}
          <span className="block text-xs text-gray-400 font-normal">sin IVA</span>
        </span>
      </div>

      {/* Nombre */}
      <h3 className="font-extrabold text-navy text-xl leading-tight">
        {sol.nombre}
      </h3>

      {/* Descripción */}
      <p className="text-gray-600 text-sm leading-relaxed flex-1">
        {sol.descripcion}
      </p>

      {/* Vídeo si existe */}
      {sol.video_youtube_id && (
        <>
          <button
            onClick={() => setVideoAbierto(!videoAbierto)}
            className="flex items-center gap-2 text-azul hover:text-navy text-sm font-semibold transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            {videoAbierto ? 'Ocultar vídeo' : 'Ver demostración'}
          </button>

          {videoAbierto && (
            <div className="relative w-full rounded-xl overflow-hidden" style={{ paddingBottom: '56.25%', height: 0 }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${sol.video_youtube_id}?autoplay=1&rel=0`}
                title={`Vídeo: ${sol.nombre}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default function SolucionesCalidad({ soluciones }) {
  if (!soluciones || soluciones.length === 0) return null

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">

        <p className="seccion-label">Control y trazabilidad</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4">
          Soluciones de calidad
        </h2>
        <p className="text-gray-600 text-lg mb-10">
          Opciones de control de proceso y calidad compatibles con esta máquina, para garantizar
          la trazabilidad y reducir el rechazo en su línea de producción.
        </p>

        <div className={`grid gap-6 ${
          soluciones.length === 1 ? 'md:grid-cols-1 max-w-lg' :
          soluciones.length === 2 ? 'md:grid-cols-2' :
          'md:grid-cols-3'
        }`}>
          {soluciones.map((sol, i) => (
            <CardSolucion key={i} sol={sol} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
