import { useState, useEffect } from 'react'

const secciones = [
  { id: 'descripcion', label: 'Descripción' },
  { id: 'video',       label: 'Vídeo' },
  { id: 'modelo3d',    label: 'Modelo 3D' },
  { id: 'accesorios',  label: 'Accesorios' },
  { id: 'soluciones',  label: 'Soluciones' },
  { id: 'condiciones', label: 'Condiciones' },
  { id: 'accion',      label: 'Decidir' },
]

export default function NavBar({ oferta }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md' : 'bg-navy'
    }`}>
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">

        {/* Logo / Nombre empresa */}
        <div className="flex items-center gap-3">
          {oferta.empresa.logo_path && (
            <img src={oferta.empresa.logo_path} alt="Logo" className="h-8 w-auto object-contain" />
          )}
          <span className={`font-bold text-sm hidden sm:block ${scrolled ? 'text-navy' : 'text-white'}`}>
            {oferta.numero_oferta}
          </span>
        </div>

        {/* Links desktop */}
        <div className="hidden md:flex items-center gap-1">
          {secciones.map(s => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                scrolled
                  ? 'text-gray-600 hover:text-navy hover:bg-azul-light'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Botón CTA */}
        <button
          onClick={() => scrollTo('accion')}
          className="hidden md:flex items-center gap-2 bg-green-600 hover:bg-green-700
                     text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          <span>Tomar decisión</span>
          <span>→</span>
        </button>

        {/* Menú hamburguesa (móvil) */}
        <button
          className={`md:hidden p-2 ${scrolled ? 'text-navy' : 'text-white'}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Menú móvil desplegable */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          {secciones.map(s => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-azul-light hover:text-navy border-b border-gray-50"
            >
              {s.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('accion')}
            className="w-full text-left px-6 py-4 text-sm font-bold text-green-700 bg-green-50"
          >
            ✓ Tomar decisión
          </button>
        </div>
      )}
    </nav>
  )
}
