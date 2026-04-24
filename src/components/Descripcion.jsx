export default function Descripcion({ producto }) {
  return (
    <div className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-6">

        {/* Encabezado de sección */}
        <p className="seccion-label">El producto</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4">
          Descripción general
        </h2>
        <p className="text-gray-600 text-lg max-w-3xl leading-relaxed mb-12">
          {producto.descripcion_corta}
        </p>

        <div className="grid md:grid-cols-2 gap-12">

          {/* Especificaciones técnicas */}
          <div>
            <h3 className="text-lg font-bold text-navy mb-5 flex items-center gap-2">
              <span className="w-8 h-8 bg-azul-light rounded-lg flex items-center justify-center text-azul">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </span>
              Especificaciones técnicas
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {producto.especificaciones.map((spec, i) => (
                <div key={i} className="spec-card">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                    {spec.label}
                  </p>
                  <p className="text-navy font-bold text-lg">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Aplicaciones */}
          <div>
            <h3 className="text-lg font-bold text-navy mb-5 flex items-center gap-2">
              <span className="w-8 h-8 bg-azul-light rounded-lg flex items-center justify-center text-azul">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </span>
              Aplicaciones principales
            </h3>

            <div className="space-y-3">
              {producto.aplicaciones.map((app, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-azul-light transition-colors">
                  <span className="w-2 h-2 bg-naranja rounded-full flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{app}</span>
                </div>
              ))}
            </div>

            {/* Enlace a planos si existe */}
            {producto.planos_pdf_url && (
              <a
                href={producto.planos_pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-azul hover:text-navy font-semibold
                           border-2 border-azul hover:border-navy rounded-lg px-5 py-3 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Descargar planos 2D (PDF)
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
