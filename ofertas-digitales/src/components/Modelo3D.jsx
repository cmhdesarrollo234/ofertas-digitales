import { useEffect, useRef } from 'react'

export default function Modelo3D({ glbPath, nombre }) {
  if (!glbPath) return null

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">

        <p className="seccion-label">Exploración interactiva</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4">
          Modelo 3D interactivo
        </h2>
        <p className="text-gray-600 text-lg mb-3">
          Explora cada detalle de la máquina desde cualquier ángulo.
        </p>

        {/* Instrucciones */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { icon: '🖱️', text: 'Arrastra para rotar' },
            { icon: '🔍', text: 'Scroll para zoom' },
            { icon: '📱', text: 'Pellizca en móvil' },
            { icon: '⛶',  text: 'Doble clic: pantalla completa' },
          ].map(({ icon, text }) => (
            <span key={text} className="inline-flex items-center gap-2 bg-white border border-gray-200
                                        rounded-full px-4 py-1.5 text-sm text-gray-600 shadow-sm">
              <span>{icon}</span> {text}
            </span>
          ))}
        </div>

        {/* Visor model-viewer */}
        <div className="w-full rounded-2xl overflow-hidden shadow-xl border border-gray-200"
             style={{ height: '600px' }}>
          {/*
            model-viewer se carga como Web Component desde el script en index.html.
            No necesita importación de React.
          */}
          <model-viewer
            src={glbPath}
            alt={`Modelo 3D de ${nombre}`}
            camera-controls
            auto-rotate
            auto-rotate-delay="3000"
            rotation-per-second="30deg"
            environment-image="neutral"
            shadow-intensity="1"
            exposure="0.8"
            style={{ width: '100%', height: '100%' }}
            ar
            ar-modes="webxr scene-viewer quick-look"
          >
            {/* Slot de carga */}
            <div slot="progress-bar" className="hidden" />
            <div slot="poster" className="flex items-center justify-center h-full bg-gray-100">
              <div className="text-center text-gray-400">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-azul mx-auto mb-3" />
                <p className="text-sm">Cargando modelo 3D...</p>
              </div>
            </div>
          </model-viewer>
        </div>

        <p className="mt-4 text-xs text-gray-400 text-center">
          El modelo 3D es representativo. La configuración final puede variar.
        </p>
      </div>
    </div>
  )
}
