// ─────────────────────────────────────────────────────────────────────────────
// DATOS DE PRUEBA — Oferta Comercial Prensa Mecánica
// Reemplazar por datos reales cuando estén disponibles.
// ─────────────────────────────────────────────────────────────────────────────

export const mockOferta = {
  // ── Metadatos de la oferta ──────────────────────────────────────────────
  id:               "DEMO-001",
  numero_oferta:    "2026-001-A",
  fecha_creacion:   "15 de marzo de 2026",
  fecha_expiracion: "14 de abril de 2026",
  estado:           "enviada",

  // ── Cliente ────────────────────────────────────────────────────────────
  cliente: {
    nombre_empresa:  "Industrias Ejemplo S.L.",
    nombre_contacto: "Carlos Martínez",
    cargo:           "Director de Producción",
  },

  // ── Producto ───────────────────────────────────────────────────────────
  producto: {
    nombre:             "Prensa Mecánica Excéntrica PMS-200T",
    codigo_referencia:  "PMS-200T",
    descripcion_corta:
      "Prensa de alta precisión diseñada para operaciones de estampado, embutición y punzonado en producción continua de media y alta cadencia.",

    // 👇 Sustituir por el ID real del vídeo de YouTube
    // Ejemplo: si la URL es https://www.youtube.com/watch?v=ABC123xyz, el ID es ABC123xyz
    video_youtube_id: "UOP6Ip2okiw",

    // 👇 Sustituir por la ruta al archivo .glb una vez disponible
    // En desarrollo: colocar el archivo en /public/models/ y poner aquí "/models/nombre.glb"
    modelo_glb_path: "/models/EJEjemploPRENSA3D.glb",

    // 👇 Sustituir por la URL de la imagen de portada del producto
    imagen_portada: null,

    // 👇 Enlace al PDF de planos (puede ser una URL de Google Drive, servidor, etc.)
    planos_pdf_url: null,

    especificaciones: [
      { label: "Tonelaje nominal",      value: "200 T" },
      { label: "Potencia del motor",    value: "22 kW" },
      { label: "Ciclos por minuto",     value: "40 – 80 cpm" },
      { label: "Carrera del émbolo",    value: "160 mm" },
      { label: "Superficie de mesa",    value: "900 × 600 mm" },
      { label: "Paso entre guías",      value: "460 mm" },
      { label: "Altura de trabajo",     value: "280 mm" },
      { label: "Peso aproximado",       value: "8.500 kg" },
    ],

    aplicaciones: [
      "Estampado en frío",
      "Embutición profunda",
      "Punzonado y corte",
      "Doblado y conformado",
      "Acuñado y calibrado",
    ],
  },

  // ── Accesorios imprescindibles (siempre incluidos en la oferta) ─────────
  accesorios_imprescindibles: [
    {
      codigo:      "ACC-101",
      nombre:      "Sistema de mando bimanual",
      descripcion: "Control de seguridad con doble accionamiento simultáneo. Certificado CE Cat. 4 / PLe.",
      precio:      1_200,
    },
    {
      codigo:      "ACC-102",
      nombre:      "Protección delantera AISI 304",
      descripcion: "Pantalla de protección delantera en acero inoxidable con apertura telescópica.",
      precio:      850,
    },
    {
      codigo:      "ACC-103",
      nombre:      "Lubricación automática centralizada",
      descripcion: "Sistema de lubricación automática para todos los puntos críticos del mecanismo.",
      precio:      980,
    },
    {
      codigo:      "ACC-104",
      nombre:      "Cuadro eléctrico con PLC Siemens",
      descripcion: "Cuadro eléctrico principal con PLC S7-1200 y pantalla táctil HMI de 7\".",
      precio:      3_400,
    },
  ],

  // ── Accesorios opcionales ───────────────────────────────────────────────
  accesorios_opcionales: [
    {
      codigo:      "ACC-201",
      nombre:      "Alimentador automático de banda",
      descripcion: "Alimentador neumático de paso regulable para procesado continuo de chapa en bobina.",
      precio:      4_500,
    },
    {
      codigo:      "ACC-202",
      nombre:      "Contador de golpes con preset",
      descripcion: "Contador digital programable con función de parada automática al alcanzar el preset.",
      precio:      380,
    },
    {
      codigo:      "ACC-203",
      nombre:      "Detector electrónico de fallos en matriz",
      descripcion: "Sistema de detección de pieza incorrecta o fallo de expulsión. Parada de emergencia automática.",
      precio:      1_200,
    },
    {
      codigo:      "ACC-204",
      nombre:      "Mesa de rodillos de entrada/salida",
      descripcion: "Extensión de mesa con rodillos de bola para soporte de materiales largos o pesados.",
      precio:      650,
    },
    {
      codigo:      "ACC-205",
      nombre:      "Eyector neumático de piezas",
      descripcion: "Sistema de expulsión neumática de piezas hacia cinta transportadora o contenedor.",
      precio:      720,
    },
  ],

  // ── Soluciones de calidad ───────────────────────────────────────────────
  soluciones_calidad: [
    {
      nombre:      "Control de Paralelismo por Láser",
      descripcion:
        "Sistema de medición y control de paralelismo del émbolo mediante sensores láser de alta precisión. " +
        "Garantiza tolerancias de ±0,01 mm en producciones de alta exigencia. " +
        "Datos exportables en tiempo real a sistema MES o SCADA.",
      precio:      3_200,
      video_youtube_id: null,
    },
    {
      nombre:      "Monitorización de Fuerza en Tiempo Real",
      descripcion:
        "Célula de carga integrada en la bancada con display táctil para visualización y registro de la fuerza " +
        "real aplicada en cada golpe. Generación automática de histórico exportable a Excel o PDF. " +
        "Ideal para trazabilidad de proceso en sector automotriz.",
      precio:      2_800,
      video_youtube_id: null,
    },
    {
      nombre:      "Sistema de Visión Artificial",
      descripcion:
        "Cámara industrial con software de visión artificial para detección de defectos en piezas al 100%. " +
        "Conectado al PLC para rechazo automático de piezas no conformes. " +
        "Reduce rechazos en cliente final y elimina inspección manual.",
      precio:      6_500,
      video_youtube_id: null,
    },
  ],

  // ── Condiciones comerciales ─────────────────────────────────────────────
  condiciones: {
    validez_dias:          30,
    portes:                "Porte pagado hasta planta cliente en Península Ibérica. Islas y exportación bajo consulta.",
    plazo_entrega_semanas: 16,
    garantia_meses:        24,
    condiciones_pago:      "40% con confirmación de pedido · 60% contra entrega en fábrica.",
    notas:
      "Precios expresados en euros, sin IVA. La configuración final puede variar en función de la visita técnica previa. " +
      "Esta oferta no incluye obra civil, instalación eléctrica de planta ni utillajes.",
  },

  // ── Datos del comercial responsable ────────────────────────────────────
  comercial: {
    nombre:       "Juliana Zapata Montoya",
    cargo:        "Comercial",
    email:        "comercial@emg-prensas.es",
    telefono:     "+34 964 18 35 75",
    whatsapp:     "+34 964 18 35 75",  // fijo con WhatsApp Business activo
    calendly_url: "https://calendly.com/demo",   // ← añadir cuando esté disponible
  },

  // ── Identidad de la empresa ─────────────────────────────────────────────
  empresa: {
    nombre_comercial: "EMG Prensas",        // visible al cliente
    razon_social:     "CMH Automación S.L.", // legal, footer/condiciones
    web:        "https://cmhautomacion.com/",
    logo_path:  "/logo.png",
  },
}
