import { useState, useEffect } from 'react'

function diasRestantes(fechaStr) {
  // fechaStr esperado en formato "DD de mes de AAAA"
  // Para el cálculo simple usamos la fecha de expiración en texto
  return null // Se puede mejorar con una fecha real en ISO
}

export default function Encabezado({ oferta }) {
  const { cliente, producto, empresa, numero_oferta, fecha_creacion, fecha_expiracion } = oferta

  return (
    <div className="pt-14"> {/* padding-top para compensar el navbar fijo */}

      {/* Hero: fondo navy oscuro */}
      <div className="bg-navy text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">

          {/* Cabecera superior: logo + referencia */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div className="flex items-center gap-4">
              {empresa.logo_path && (
                <img src={empresa.logo_path} alt={empresa.nombre} className="h-12 w-auto object-contain" />
              )}
              {!empresa.logo_path && (
                <span className="text-white font-bold text-xl">{empresa.nombre}</span>
              )}
            </div>
            <div className="text-right">
              <p className="text-white/60 text-xs uppercase tracking-widest">Nº Oferta</p>
              <p className="text-white font-mono font-bold text-lg">{numero_oferta}</p>
              <p className="text-white/60 text-xs mt-1">{fecha_creacion}</p>
            </div>
          </div>

          {/* Separador */}
          <div className="w-16 h-1 bg-naranja rounded mb-8" />

          {/* Título principal */}
          <p className="text-azul-light text-sm font-semibold uppercase tracking-widest mb-3">
            Oferta preparada para
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-2">
            {cliente.nombre_empresa}
          </h1>
          <p className="text-white/70 text-lg mb-8">
            A la atención de {cliente.nombre_contacto}
            {cliente.cargo ? `, ${cliente.cargo}` : ''}
          </p>

          {/* Nombre del producto */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 inline-block">
            <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Producto ofertado</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{producto.nombre}</h2>
            <p className="text-white/70 font-mono text-sm mt-1">Ref. {producto.codigo_referencia}</p>
          </div>

          {/* Validez de la oferta */}
          <div className="mt-8 flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            <p className="text-white/80 text-sm">
              Oferta válida hasta el <span className="text-white font-semibold">{fecha_expiracion}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Imagen de portada del producto */}
      {producto.imagen_portada ? (
        <div className="w-full h-72 md:h-96 overflow-hidden">
          <img
            src={producto.imagen_portada}
            alt={producto.nombre}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        /* Placeholder hasta que haya imagen real */
        <div className="w-full h-48 md:h-64 bg-gradient-to-r from-gray-100 to-azul-light flex items-center justify-center">
          <div className="text-center text-gray-400">
            <svg className="w-16 h-16 mx-auto mb-2 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">Imagen del producto — añadir en mockOferta.js</p>
          </div>
        </div>
      )}
    </div>
  )
}

