# Proyecto: Sistema de Ofertas Digitales Interactivas
## CMH Automación — Andreu

---

## Qué es este proyecto
Aplicación web que reemplaza los PDFs de ofertas comerciales por páginas web interactivas
personalizadas por cliente. Cada oferta tiene una URL única con token. Incluye vídeo YouTube
embebido, visor 3D (.glb), tabla de accesorios con lógica de negocio, soluciones de calidad,
condiciones comerciales y acciones finales (aceptar / agendar Calendly / rechazar).

## Stack
- **Frontend:** React + Vite + Tailwind CSS
- **Routing:** React Router v6
- **Backend:** Netlify Functions (serverless)
- **Base de datos:** Supabase (PostgreSQL) — pendiente de configurar
- **Visor 3D:** @google/model-viewer
- **Despliegue:** Netlify + GitHub

## URLs
- **Demo actual:** https://kaleidoscopic-yeot-c67072.netlify.app/o/demo
- **Panel admin:** https://kaleidoscopic-yeot-c67072.netlify.app/admin
- **Repositorio:** GitHub (cuenta anterior informático — andcommar tiene acceso total)

## Cómo arrancar en local
```bash
npm install
npm run dev
# Oferta demo:  http://localhost:5173/o/demo
# Panel admin:  http://localhost:5173/admin
```

## Variables de entorno necesarias (ver .env.example)
```
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_KEY
```
Configurar en: Netlify → Site configuration → Environment variables

## Estado actual del proyecto

### ✅ Completado
- Plantilla completa de oferta interactiva (todos los componentes)
- Navegación por secciones (NavBar sticky)
- Encabezado personalizado por cliente
- Descripción + especificaciones técnicas
- Vídeo YouTube embebido (funciona con ID real)
- Visor 3D model-viewer para .glb (funciona, pendiente optimizar peso del modelo)
- Tabla de accesorios imprescindibles/opcionales con subtotales
- Soluciones de calidad en cards con vídeo expandible
- Resumen económico
- Condiciones comerciales con acordeón
- Acciones finales: Aceptar / Agendar (Calendly) / Contactar / Rechazar con formulario
- Botón flotante de contacto
- Panel de administración de 4 pasos para crear ofertas
- Catálogo de productos en src/data/catalogo.js
- Netlify Functions: get-oferta, crear-oferta, track-event
- Rutas: /o/:token (oferta), /admin (panel), /o/demo (demo con mock data)
- Desplegado en Netlify y funcionando

### ⏳ Pendiente
- Configurar Supabase (tabla ofertas + eventos_trazabilidad)
  → SQL listo en supabase-setup.sql
  → Pendiente decisión: cuenta personal nueva vs cuenta empresa CMH Automación
- Añadir variables de entorno en Netlify (depende de Supabase)
- Poblar catálogo con productos reales (src/data/catalogo.js)
- Añadir vídeos YouTube reales (IDs en catalogo.js)
- Optimizar archivo .glb (actual ~47MB, objetivo <10MB)
- Logo de empresa en /public/logo.png
- Renombrar subdominio Netlify (actualmente: kaleidoscopic-yeot-c67072)

### 🔮 Fase 2 (futuro)
- Dashboard de trazabilidad (quién abrió qué, cuándo, qué vio)
- Historial de ofertas en el panel admin
- Gestión de versiones de oferta
- Envío de email automatizado desde el panel

## Estructura de ficheros clave
```
src/
  data/
    catalogo.js      ← Productos, accesorios, soluciones, condiciones (EDITAR AQUÍ)
    mockOferta.js    ← Datos demo (no tocar)
  pages/
    Admin.jsx        ← Panel interno para crear ofertas
    OfertaPage.jsx   ← Página de oferta del cliente (lee de Supabase por token)
  components/        ← Componentes visuales (no tocar salvo para cambios de diseño)
netlify/functions/
  crear-oferta.js    ← Guarda oferta en Supabase, devuelve token
  get-oferta.js      ← Lee oferta de Supabase por token
  track-event.js     ← Registra eventos de comportamiento del cliente
supabase-setup.sql   ← SQL para crear tablas en Supabase (ejecutar una vez)
```

## Notas importantes
- El modelo .glb actual pesa ~47MB. Necesita optimización antes de producción real.
  Herramienta recomendada: https://gltf.report o Blender con exportación optimizada.
- La ruta /admin no tiene autenticación en Fase 1. Mantener la URL discreta.
- Los componentes visuales reciben datos por props: no necesitan modificarse
  al cambiar la fuente de datos (mock → Supabase). Arquitectura desacoplada.
- react-scroll fue eliminado en v2. No reinstalar.