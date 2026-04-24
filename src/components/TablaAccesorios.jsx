function formatEur(n) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(n)
}

function FilaAccesorio({ acc, variante }) {
  const esBg = variante === 'imprescindible'
    ? 'bg-blue-50 hover:bg-blue-100'
    : 'bg-white hover:bg-gray-50'

  return (
    <tr className={`${esBg} transition-colors border-b border-gray-100`}>
      <td className="px-4 py-4 text-xs font-mono text-gray-500 whitespace-nowrap">{acc.codigo}</td>
      <td className="px-4 py-4">
        <p className="font-semibold text-navy text-sm">{acc.nombre}</p>
        <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{acc.descripcion}</p>
      </td>
      <td className="px-4 py-4 text-right font-bold text-navy whitespace-nowrap">
        {formatEur(acc.precio)}
      </td>
      <td className="px-4 py-4 text-center">
        {variante === 'imprescindible' ? (
          <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800
                           text-xs font-semibold px-2.5 py-1 rounded-full">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Incluido
          </span>
        ) : (
          <span className="inline-flex items-center bg-gray-100 text-gray-600
                           text-xs font-medium px-2.5 py-1 rounded-full">
            Opcional
          </span>
        )}
      </td>
    </tr>
  )
}

export default function TablaAccesorios({ imprescindibles, opcionales }) {
  const totalImprescindibles = imprescindibles.reduce((s, a) => s + a.precio, 0)
  const totalOpcionales      = opcionales.reduce((s, a) => s + a.precio, 0)

  const colHeaders = (
    <tr className="bg-navy text-white text-left text-xs uppercase tracking-wider">
      <th className="px-4 py-3 rounded-tl-lg">Ref.</th>
      <th className="px-4 py-3">Descripción</th>
      <th className="px-4 py-3 text-right">Precio</th>
      <th className="px-4 py-3 text-center rounded-tr-lg">Estado</th>
    </tr>
  )

  return (
    <div className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-6">

        <p className="seccion-label">Configuración</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4">
          Equipamiento y accesorios
        </h2>
        <p className="text-gray-600 text-lg mb-10">
          La oferta incluye el equipamiento estándar detallado a continuación, más las opciones recomendadas para su aplicación.
        </p>

        {/* Tabla imprescindibles */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-4 h-4 rounded-full bg-blue-500" />
            <h3 className="font-bold text-navy text-lg">Equipamiento incluido</h3>
            <span className="text-xs text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full font-medium">
              {imprescindibles.length} elementos
            </span>
          </div>
          <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200">
            <table className="w-full text-sm">
              <thead>{colHeaders}</thead>
              <tbody>
                {imprescindibles.map(acc => (
                  <FilaAccesorio key={acc.codigo} acc={acc} variante="imprescindible" />
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-blue-50 border-t-2 border-blue-200">
                  <td colSpan={2} className="px-4 py-3 text-sm font-bold text-navy">
                    Subtotal equipamiento incluido
                  </td>
                  <td className="px-4 py-3 text-right text-lg font-extrabold text-navy">
                    {formatEur(totalImprescindibles)}
                  </td>
                  <td />
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Tabla opcionales */}
        {opcionales.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-4 h-4 rounded-full bg-gray-400" />
              <h3 className="font-bold text-navy text-lg">Opciones disponibles</h3>
              <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full font-medium">
                {opcionales.length} elementos
              </span>
            </div>
            <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200">
              <table className="w-full text-sm">
                <thead>{colHeaders}</thead>
                <tbody>
                  {opcionales.map(acc => (
                    <FilaAccesorio key={acc.codigo} acc={acc} variante="opcional" />
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 border-t-2 border-gray-200">
                    <td colSpan={2} className="px-4 py-3 text-sm font-bold text-gray-600">
                      Total opcionales (si se incluyen todos)
                    </td>
                    <td className="px-4 py-3 text-right text-lg font-bold text-gray-600">
                      + {formatEur(totalOpcionales)}
                    </td>
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-right">
              * Los opcionales no están incluidos en el precio base. Consultar selección final con el comercial.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
