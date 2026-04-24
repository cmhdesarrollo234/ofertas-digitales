import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import OfertaPage from './pages/OfertaPage.jsx'
import Admin      from './pages/Admin.jsx'

// ─────────────────────────────────────────────────────────────────────────────
// Rutas:
//   /o/:token  → Oferta del cliente (lee de Supabase por token)
//   /o/demo    → Demo con datos mock (para desarrollo y pruebas)
//   /admin     → Panel interno para crear ofertas
//   /          → Redirige a /admin
// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/o/:token" element={<OfertaPage />} />
        <Route path="/admin"   element={<Admin />} />
        <Route path="/"        element={<Navigate to="/admin" replace />} />
        <Route path="*"        element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
