import { useState } from 'react'

function FilaCondicion({ icono, titulo, valor }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
      <span className="text-2xl flex-shrink-0 mt-0.5">{icono}</span>
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-0.5">{titulo}</p>
        <p className="text-navy font-semibold text-sm leading-relaxed">{valor}</p>
      </div>
    </div>
  )
}

export default function Condiciones({ condiciones, validez }) {
  const [expandido, setExpandido] = useState(false)

  const datos = [
    { icono: '📅', titulo: 'Validez de la oferta',   valor: `${condiciones.validez_dias} días desde la fecha de emisión. Vence el ${validez}.` },
    { icono: '🚚', titulo: 'Portes y entrega',        valor: condiciones.portes },
    { icono: '⏱️', titulo: 'Plazo de entrega',        valor: `${condiciones.plazo_entrega_semanas} semanas desde confirmación de pedido.` },
    { icono: '🛡️', titulo: 'Garantía',                valor: `${condiciones.garantia_meses} meses de garantía completa sobre partes mecánicas y eléctricas.` },
    { icono: '💳', titulo: 'Condiciones de pago',     valor: condiciones.condiciones_pago },
  ]

  return (
    <div className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-6">

        <p className="seccion-label">Lo que necesitas saber</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4">
          Condiciones comerciales
        </h2>
        <p className="text-gray-600 text-lg mb-10">
          Todos los términos de esta oferta, de forma clara y sin letra pequeña.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {datos.map((d, i) => (
            <FilaCondicion key={i} {...d} />
          ))}
        </div>

        {/* Nota adicional */}
        {condiciones.notas && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <span className="text-amber-500 text-xl flex-shrink-0">ℹ️</span>
              <p className="text-amber-800 text-sm leading-relaxed">{condiciones.notas}</p>
            </div>
          </div>
        )}

        {/* Condiciones generales colapsables */}
        <div className="mt-6 border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setExpandido(!expandido)}
            className="w-full flex items-center justify-between px-5 py-4 bg-gray-50
                       hover:bg-gray-100 transition-colors text-left"
          >
            <span className="font-semibold text-navy text-sm">Condiciones generales de venta</span>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${expandido ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandido && (
            <div className="px-5 py-5 text-sm text-gray-600 leading-relaxed border-t border-gray-200 space-y-3">
              <p>Los precios indicados en esta oferta son en euros sin IVA. El IVA aplicable será el vigente en la fecha de facturación.</p>
              <p>La aceptación de esta oferta implica la conformidad con las condiciones técnicas y comerciales descritas. Cualquier modificación posterior deberá formalizarse por escrito.</p>
              <p>La empresa se reserva el derecho de modificar especificaciones técnicas por razones de mejora del producto, siempre que no afecten negativamente a las prestaciones ofertadas.</p>
              <p>El plazo de entrega se computa desde la recepción del pago inicial y la confirmación por escrito del pedido con especificación técnica completa.</p>
              <p>La garantía no cubre daños por uso incorrecto, mantenimiento inadecuado, modificaciones no autorizadas o desgaste normal de consumibles.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
