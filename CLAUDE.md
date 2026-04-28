# Proyecto: Sistema de Ofertas Digitales Interactivas
## CMH Automación / EMG Prensas — Andreu

---

## Qué es este proyecto
Aplicación web que reemplaza los PDFs de ofertas comerciales por páginas web interactivas
personalizadas por cliente. Cada oferta tiene una URL única con token. Incluye vídeo YouTube
embebido, visor 3D (.glb), tabla de accesorios con lógica de negocio, soluciones de calidad,
condiciones comerciales y acciones finales (aceptar / agendar Calendly / rechazar).

Las ofertas de prensas se gestionan bajo la marca **EMG Prensas** (sucursal de CMH Automación).
La comercial responsable es **Juliana Zapata Montoya** (comercial@emg-prensas.es).
El director es **Maxime Courtin** (también gestiona algunas ofertas).

## Stack
- **Frontend:** React + Vite + Tailwind CSS
- **Routing:** React Router v6
- **Backend:** Netlify Functions (serverless)
- **Base de datos:** Supabase (PostgreSQL) — ✅ CONFIGURADO
- **Visor 3D:** @google/model-viewer
- **Despliegue:** Netlify + GitHub

## URLs
- **Demo local:** http://localhost:5174/o/demo
- **Netlify:** https://kaleidoscopic-yeot-c67072.netlify.app/o/demo
- **Panel admin:** https://kaleidoscopic-yeot-c67072.netlify.app/admin
- **Repositorio GitHub:** https://github.com/cmhdesarrollo234/ofertas-digitales

## Cómo arrancar en local
```bash
npm install
npm run dev
# Oferta demo:  http://localhost:5174/o/demo
# Panel admin:  http://localhost:5174/admin
# NOTA: Las funciones /api/* solo funcionan en Netlify, no en local
```

## Variables de entorno
Configuradas en Netlify ✅ con las claves del nuevo formato Supabase (publishable / secret).
Las legacy JWT keys (anon / service_role) están deshabilitadas.
.env.local es opcional, solo necesario si se quiere usar `netlify dev` en local.
```
SUPABASE_URL=<ver Supabase dashboard / Netlify env vars>
SUPABASE_ANON_KEY=<sb_publishable_... — ver Supabase dashboard / Netlify env vars>
SUPABASE_SERVICE_KEY=<sb_secret_... — ver Supabase dashboard / Netlify env vars>
```

## Datos de empresa configurados
- **Marca comercial (visible al cliente):** EMG Prensas
- **Razón social (legal/footer):** CMH Automación S.L.
- **Web:** https://cmhautomacion.com/
- **Comercial principal:** Juliana Zapata Montoya
  - Email EMG: comercial@emg-prensas.es
  - Email CMH: juliana.zapata@cmhautomacion.com
  - Teléfono / WhatsApp Business: +34 964 18 35 75 ✅ (fijo con WhatsApp Business activo)
  - Calendly: pendiente
- **Director:** Maxime Courtin
- **Logo:** /public/logo.png ✅ (colocado por Andreu)

## Colores corporativos (tailwind.config.js)
```js
navy:          '#1A3365'   // Azul CMH (secundario corporativo)
navy-dark:     '#0F2040'
naranja:       '#E85A1F'   // Naranja EMG Prensas (principal)
naranja-dark:  '#B83F0E'   // Hover y acentos
naranja-light: '#FFE4D2'   // Fondos suaves, badges
```

## Estado actual del proyecto

### ✅ Completado
- Plantilla completa de oferta interactiva (todos los componentes)
- Navegación por secciones (NavBar sticky)
- Encabezado personalizado por cliente (sin filtro invert en logo)
- Vídeo YouTube embebido (ID: UOP6Ip2okiw en demo)
- Visor 3D conectado a /public/models/EJEjemploPRENSA3D.glb
- Tabla de accesorios imprescindibles/opcionales con subtotales
- Soluciones de calidad en cards con vídeo expandible
- Resumen económico
- Condiciones comerciales con acordeón
- Acciones finales: Aceptar / Agendar (Calendly) / Contactar / Rechazar con formulario
- Botón flotante de contacto
- Panel de administración de 4 pasos para crear ofertas
- Catálogo de productos en src/data/catalogo.js con datos CMH/EMG
- Netlify Functions: get-oferta, crear-oferta, track-event
- Rutas: /o/:token (oferta), /admin (panel), /o/demo (demo con mock data)
- Supabase configurado: tablas ofertas + eventos_trazabilidad creadas ✅
- Variables de entorno añadidas en Netlify ✅
- GitHub conectado a Netlify ✅
- Deploy Netlify estable ✅
- Marca comercial confirmada: EMG Prensas (visible al cliente) / CMH Automación S.L. (razón social) ✅
- Teléfono confirmado: +34 964 18 35 75 (fijo con WhatsApp Business) ✅
- Paleta naranja EMG actualizada en tailwind.config.js ✅
- Bundler de Netlify Functions configurado a esbuild (necesario por "type": "module" en package.json) ✅
- Claves Supabase rotadas al nuevo formato publishable / secret; legacy JWT keys deshabilitadas ✅
- **Flujo end-to-end probado en producción**: crear oferta en /admin → guardar en Supabase → abrir /o/<token> con datos personalizados ✅
- Trazabilidad de eventos funcionando (tabla eventos_trazabilidad recibiendo registros) ✅

### ⏳ Pendiente inmediato
- Añadir URL de Calendly de Juliana (la creará ella)
- Confirmar emails definitivos
- Logo EMG Prensas si difiere del actual /logo.png
- (Opcional) Crear .env.local + usar netlify dev para iterar funciones en local; mientras tanto se prueba directamente en el deploy de Netlify

### ⏳ Contenido pendiente (requiere información de la empresa)
- Poblar catálogo con productos reales (src/data/catalogo.js)
- Añadir vídeos YouTube reales
- Optimizar .glb (actual ~47MB, objetivo <10MB) — usar gltf.report o Blender
- Foto de portada de cada producto (imagen_portada en mockOferta/catalogo)
- Planos 2D por producto (planos_pdf_url) — decidir dónde alojarlos
- Logo EMG Prensas si se usa esa marca

### 🔮 Fase 2 (futuro)
- Dashboard de trazabilidad (quién abrió qué, cuándo, qué vio)
- Historial de ofertas en el panel admin
- Gestión de versiones de oferta
- Envío de email automatizado desde el panel
- Autenticación para /admin
- Soporte multiidioma (francés/inglés para exportación)

## Estructura de ficheros clave
```
src/
  data/
    catalogo.js      ← Productos, accesorios, soluciones, condiciones (EDITAR AQUÍ)
    mockOferta.js    ← Datos demo (no tocar salvo para actualizar demo)
  pages/
    Admin.jsx        ← Panel interno para crear ofertas
    OfertaPage.jsx   ← Página de oferta del cliente (lee de Supabase por token)
  components/        ← Componentes visuales
netlify/
  functions/
    crear-oferta.js  ← Guarda oferta en Supabase, devuelve token
    get-oferta.js    ← Lee oferta de Supabase por token
    track-event.js   ← Registra eventos de comportamiento del cliente
netlify.toml         ← Config build (npm install + npm run build) y bundler esbuild para funciones
supabase-setup.sql   ← SQL ya ejecutado en Supabase ✅
.env.local           ← Variables locales (NO commitear, opcional para netlify dev)
```

## Notas importantes
- El modelo .glb actual pesa ~47MB. Necesita optimización antes de producción real.
- La ruta /admin no tiene autenticación en Fase 1. Mantener la URL discreta.
- Los componentes visuales reciben datos por props — arquitectura desacoplada.
- react-scroll fue eliminado. No reinstalar.
- node_modules está en OneDrive (riesgo de rendimiento — mover fuera si hay problemas).
- Las funciones /api/* solo funcionan desplegadas en Netlify, no con npm run dev local.
  Para desarrollo local con funciones usar: netlify dev (requiere Netlify CLI).
- **Importante para Netlify Functions**: como package.json tiene "type": "module", es OBLIGATORIO
  mantener `[functions] node_bundler = "esbuild"` en netlify.toml. Sin esa línea las funciones
  fallan con "module is not defined in ES module scope".
- El catálogo objetivo es de hasta ~80 prensas con 10-15 opciones de accesorios cada una.
- Solo idioma español; sin i18n previsto.