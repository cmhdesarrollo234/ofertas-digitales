import { useMemo, useState } from 'react'

function extraerYoutubeId(valor) {
  if (!valor) return null

  if (/^[a-zA-Z0-9_-]{11}$/.test(valor)) {
    return valor
  }

  try {
    const url = new URL(valor)

    if (url.hostname.includes('youtube.com')) {
      if (url.pathname.startsWith('/watch')) {
        return url.searchParams.get('v')
      }

      if (url.pathname.startsWith('/shorts/')) {
        return url.pathname.split('/shorts/')[1]?.split('/')[0] || null
      }

      if (url.pathname.startsWith('/embed/')) {
        return url.pathname.split('/embed/')[1]?.split('/')[0] || null
      }
    }

    if (url.hostname.includes('youtu.be')) {
      return url.pathname.replace('/', '').split('/')[0] || null
    }
  } catch {
    return null
  }

  return null
}

export default function VideoYoutube({ videoId }) {
  const [cargado, setCargado] = useState(false)

  const idReal = useMemo(() => extraerYoutubeId(videoId), [videoId])

  if (!idReal || videoId === 'SUSTITUIR_ID_YOUTUBE') return null

  return (
    <div className="bg-gray-900 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <p className="seccion-label text-azul-light">El producto en acción</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          Ver la máquina funcionando
        </h2>
        <p className="text-white/60 text-lg mb-10">
          Observa el rendimiento real y las capacidades de la prensa en condiciones de producción.
        </p>

        <div
          className="relative w-full rounded-2xl overflow-hidden shadow-2xl"
          style={{ paddingBottom: '56.25%', height: 0 }}
        >
          {!cargado && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-white/20 border-t-white" />
            </div>
          )}

          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${idReal}?rel=0&modestbranding=1`}
            title="Vídeo del producto"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setCargado(true)}
          />
        </div>
      </div>
    </div>
  )
}