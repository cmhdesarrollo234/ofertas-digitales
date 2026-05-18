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
  - Calendly: pendiente (Juliana lo creará)
- **Director:** Maxime Courtin

## Logos ✅
- `public/logo-emg-claro.png` — 1024×1024 PNG transparente, EMG en negro. Para fondos claros.
- `public/logo-emg-oscuro.png` — 1024×1024 PNG transparente, EMG en blanco con contorno. Para fondos oscuros.
- Logos antiguos eliminados: `logo.png`, `logo-emg.png`, `logo-emg-transparente.png`
- **Uso en componentes:** `empresa.logo_oscuro` para fondos oscuros (hero/navbar sin scroll), `empresa.logo_claro` para fondos claros (navbar con scroll)

## Colores corporativos (tailwind.config.js) ✅
Rebrand completado. Los **nombres de las variables Tailwind conservan los nombres antiguos**
(`navy`, `naranja`, `azul`) por compatibilidad con todos los componentes.
Renombrarlos a `gris`/`rojo`/`plata` es tarea pendiente no urgente.

```js
// Gris grafito (variable: "navy" / "azul")
navy:         '#1F2937'   // Principal — fondos oscuros, hero, navbar
'navy-dark':  '#111827'
azul:         '#1F2937'   // Alias de navy
'azul-light': '#F3F4F6'   // Fondos suaves, secciones alternas

// Rojo EMG (variable: "naranja")
naranja:        '#C8202C'  // Color de marca — CTAs, acentos, separadores
'naranja-dark': '#9B1923'  // Hover y estados activos
'naranja-light':'#FCE4E6'  // Fondos suaves, badges

// Plateado/metálico
plata:        '#9CA3AF'
'plata-light':'#D1D5DB'
```

## Producto demo ✅
`src/data/mockOferta.js` muestra la **Prensa Manual de Cremallera EMG 2HR** (producto real):
- Precio base: 410 €
- Accesorios opcionales documentados
- Soluciones de control 1/2/3
- Condiciones: 3 meses validez / 1 año garantía / 10 días plazo
- Imágenes: `public/images/2HR-foto.png` y `public/images/2HR-plano.png`
- Material de referencia original en `docs/referencia-oferta-original/`

## Estado actual del proyecto

### ✅ Completado
- Plantilla completa de oferta interactiva (todos los componentes)
- Navegación por secciones (NavBar sticky)
- Encabezado con hero oscuro + imagen de producto (`object-contain`, fondo blanco)
- NavBar con logo dual: oscuro sobre fondo blanco (scroll), claro sobre fondo gris (top)
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
- Supabase configurado: tablas `ofertas` + `eventos_trazabilidad` creadas ✅
- Variables de entorno añadidas en Netlify ✅
- GitHub conectado a Netlify ✅
- Deploy Netlify estable ✅
- Bundler de Netlify Functions configurado a esbuild ✅
- Claves Supabase rotadas al nuevo formato publishable / secret ✅
- **Flujo end-to-end probado en producción**: /admin → Supabase → /o/<token> ✅
- Trazabilidad de eventos funcionando ✅
- **Rebrand visual completo**: paleta grafito/rojo/plata, logos dual, demo con producto real 2HR ✅

### ⏳ Pendiente (bloqueado por contenido externo)
- URL de Calendly de Juliana (la creará ella)
- Confirmar emails definitivos
- Excel del catálogo completo (~80 prensas) → migrar a `src/data/catalogo.js`
- Vídeos YouTube por producto
- Fotos de portada por producto (estilo `2HR-foto.png`)
- Planos 2D en PDF — decidir alojamiento (public/ vs Drive/externo)
- Modelos .glb por producto optimizados (<10 MB cada uno)

### ⏳ Features técnicas pendientes (sin dependencia externa)
- **Descarga PDF**: botón que genere PDF con producto + accesorios + totales + condiciones
- **Tabla de potencia en Descripcion**: tabla fuerza-palanca → fuerza-prensa (ya disponible en `docs/referencia-oferta-original/oferta-2HR.md`)
- **Selector de comercial en /admin**: Juliana o Maxime al crear oferta
- **Templates de condiciones**: "Exportación UE" y "Exportación fuera UE" además del "Estándar España"
- **Dashboard de trazabilidad**: historial de ofertas + comportamiento del cliente en /admin (Fase 2)
- **Autenticación en /admin** (Fase 2 — opcional mientras URL sea discreta)

### ⏳ Operacional / handoff
- Librería de prompts en `prompts/` para que Juliana/Maxime gestionen el catálogo sin dev
- Plantilla de email comercial (texto/HTML para enviar el link de la oferta al cliente)
- `CLAUDE.md` final con instrucciones de handoff completas
- Backup periódico de Supabase (tablas `ofertas` y `eventos_trazabilidad`)

### 🔮 Fase 2 (futuro)
- Dashboard de trazabilidad completo
- Historial y versiones de oferta en /admin
- Envío de email automatizado desde el panel
- Soporte multiidioma (francés/inglés para exportación)

## Orden recomendado de próximas sesiones
1. **Cuando llegue el Excel**: migración del catálogo (Bloque B, alto valor)
2. **Feature descarga PDF** (Bloque C — diferenciador comercial)
3. **Dashboard de trazabilidad** (Bloque C — lo pedirá Maxime)
4. **Librería de prompts + handoff** (Bloque D)

## Estructura de ficheros clave
```
src/
  data/
    catalogo.js            ← Productos, accesorios, soluciones, condiciones (EDITAR AQUÍ)
    mockOferta.js          ← Datos demo con producto real 2HR (actualizar si cambia el demo)
  pages/
    Admin.jsx              ← Panel interno para crear ofertas
    OfertaPage.jsx         ← Página de oferta del cliente (lee de Supabase por token)
  components/              ← Componentes visuales (reciben datos por props)
netlify/
  functions/
    crear-oferta.js        ← Guarda oferta en Supabase, devuelve token
    get-oferta.js          ← Lee oferta de Supabase por token
    track-event.js         ← Registra eventos de comportamiento del cliente
netlify.toml               ← Config build + esbuild para funciones (NO quitar esbuild)
supabase-setup.sql         ← SQL ya ejecutado en Supabase ✅
docs/
  referencia-oferta-original/
    oferta-2HR.md          ← Texto completo oferta 2HR original (plantilla para catálogo)
    01-foto-producto-2HR.png
    02-plano-2D-2HR.png
public/
  logo-emg-claro.png       ← Logo para fondos claros
  logo-emg-oscuro.png      ← Logo para fondos oscuros
  images/
    2HR-foto.png
    2HR-plano.png
  models/
    EJEjemploPRENSA3D.glb  ← ~47MB, necesita optimización antes de producción
```

## Notas importantes
- El modelo .glb actual pesa ~47MB. Necesita optimización antes de producción real (objetivo <10MB — usar gltf.report o Blender).
- La ruta /admin no tiene autenticación en Fase 1. Mantener la URL discreta.
- Los componentes visuales reciben datos por props — arquitectura desacoplada.
- react-scroll fue eliminado. No reinstalar.
- node_modules está en OneDrive (riesgo de rendimiento — mover fuera si hay problemas).
- Las funciones /api/* solo funcionan desplegadas en Netlify, no con `npm run dev`.
  Para desarrollo local con funciones usar: `netlify dev` (requiere Netlify CLI).
- **CRÍTICO para Netlify Functions**: como package.json tiene `"type": "module"`, es OBLIGATORIO
  mantener `[functions] node_bundler = "esbuild"` en netlify.toml. Sin esa línea las funciones
  fallan con "module is not defined in ES module scope".
- El catálogo objetivo es de hasta ~80 prensas con 10-15 opciones de accesorios cada una.
- Solo idioma español; sin i18n previsto.
- Variables Tailwind conservan nombres legacy (`navy`, `naranja`, `azul`) — renombrado pendiente no urgente.
