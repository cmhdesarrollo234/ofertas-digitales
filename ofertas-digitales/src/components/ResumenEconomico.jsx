function formatEur(n) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(n)
}

export default function ResumenEconomico({ accesorios_imprescindibles, accesorios_opcionales, condiciones }) {
  const totalImprescindibles = accesorios_imprescindibles.reduce((s, a) => s + a.precio, 0)
  const totalOpcionales      = accesorios_opcionales.reduce((s, a) => s + a.precio, 0)

  const filas = [
    { label: 'Máquina base', sublabel: 'Según configuración técnica', valor: null, nota: 'A consultar' },
    { label: 'Equipamiento incluido', sublabel: `${accesorios_imprescindibles.length} elementos`, valor: totalImprescindibles },
    { label: 'Opciones disponibles', sublabel: `${accesorios_opcionales.length} elementos opcionales`, valor: totalOpcionales, esOpcional: true },
  ]

  return (
    <div className="bg-navy py-16">
      <div className="max-w-4xl mx-auto px-6">

        <p className="text-azul-light text-xs font-bold uppercase tracking-widest mb-2">Inversión</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          Resumen económico
        </h2>
        <p className="text-white/60 text-lg mb-10">
          {condiciones.notas}
        </p>

        <div className="bg-white/10 backdrop-blur rounded-2xl overflow-hidden border border-white/20">
          {filas.map((fila, i) => (
            <div key={i}
                 className={`flex items-center justify-between px-6 py-5 border-b border-white/10
                             ${fila.esOpcional ? 'opacity-70' : ''}`}>
              <div>
                <p className={`font-semibold ${fila.esOpcional ? 'text-white/70' : 'text-white'}`}>
                  {fila.label}
                  {fila.esOpcional && <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">opcional</span>}
                </p>
                <p className="text-white/50 text-xs mt-0.5">{fila.sublabel}</p>
              </div>
              <div className="text-right">
                {fila.nota ? (
                  <span className="text-white/50 text-sm italic">{fila.nota}</span>
                ) : (
                  <span className={`font-bold text-lg ${fila.esOpcional ? 'text-white/70' : 'text-white'}`}>
                    {fila.esOpcional ? '+ ' : ''}{formatEur(fila.valor)}
                  </span>
                )}
              </div>
            </div>
          ))}

          {/* Total */}
          <div className="flex items-center justify-between px-6 py-6 bg-white/10">
            <div>
              <p className="font-extrabold text-white text-xl">Total estimado</p>
              <p className="text-white/50 text-xs mt-0.5">Sin IVA · Equipamiento incluido, sin opcionales</p>
            </div>
            <div className="text-right">
              <p className="font-extrabold text-naranja text-3xl">
                {formatEur(totalImprescindibles)}
              </p>
              <p className="text-white/50 text-xs mt-1">+ máquina base (a consultar)</p>
            </div>
          </div>
        </div>

        <p className="text-white/40 text-xs text-center mt-4">
          El presupuesto definitivo se confirma tras visita técnica y especificación final del pedido.
        </p>
      </div>
    </div>
  )
}
