import { useState } from 'react'

export default function ContactoFlotante({ comercial }) {
  const [abierto, setAbierto] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* Panel de opciones */}
      {abierto && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 w-64 fade-in-up">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
            Hablar con {comercial.nombre.split(' ')[0]}
          </p>

          <div className="space-y-2">
            <a href={`tel:${comercial.telefono}`}
               className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
              <span className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">📞</span>
              {comercial.telefono}
            </a>

            <a href={`https://wa.me/${comercial.whatsapp.replace(/\D/g, '')}`}
               target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
              <span className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M11.999 2C6.477 2 2 6.477 2 12c0 1.989.586 3.841 1.592 5.391L2.046 22l4.737-1.521A9.97 9.97 0 0011.999 22C17.522 22 22 17.523 22 12S17.522 2 11.999 2zm0 18c-1.707 0-3.317-.49-4.673-1.341l-3.274 1.05 1.07-3.186A7.937 7.937 0 014 12c0-4.411 3.588-8 7.999-8 4.412 0 8.001 3.589 8.001 8 0 4.41-3.589 8-8.001 8z"/>
                </svg>
              </span>
              WhatsApp
            </a>

            <a href={`mailto:${comercial.email}`}
               className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
              <span className="w-9 h-9 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">✉️</span>
              {comercial.email}
            </a>
          </div>
        </div>
      )}

      {/* Botón flotante principal */}
      <button
        onClick={() => setAbierto(!abierto)}
        className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center
                   transition-all duration-300 ${
                     abierto
                       ? 'bg-gray-700 hover:bg-gray-900 rotate-45'
                       : 'bg-navy hover:bg-navy-dark'
                   }`}
        aria-label="Contactar comercial"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {abierto
            ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          }
        </svg>
      </button>
    </div>
  )
}
