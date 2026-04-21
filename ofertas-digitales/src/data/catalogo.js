// ─────────────────────────────────────────────────────────────────────────────
// CATÁLOGO DE PRODUCTOS
// Añade aquí cada producto con sus accesorios y soluciones predefinidos.
// La comercial selecciona el producto desde el panel y estos datos
// se insertan automáticamente en la oferta.
// ─────────────────────────────────────────────────────────────────────────────

export const CATALOGO = [
  {
    id: "PMS-200T",
    nombre: "Prensa Mecánica Excéntrica PMS-200T",
    codigo_referencia: "PMS-200T",
    descripcion_corta:
      "Prensa de alta precisión diseñada para operaciones de estampado, embutición y punzonado en producción continua de media y alta cadencia.",

    // 👇 Actualizar cuando estén disponibles
    video_youtube_id: null,
    modelo_glb_path: null,
    imagen_portada: null,
    planos_pdf_url: null,

    especificaciones: [
      { label: "Tonelaje nominal",   value: "200 T" },
      { label: "Potencia del motor", value: "22 kW" },
      { label: "Ciclos por minuto",  value: "40 – 80 cpm" },
      { label: "Carrera del émbolo", value: "160 mm" },
      { label: "Superficie de mesa", value: "900 × 600 mm" },
      { label: "Paso entre guías",   value: "460 mm" },
      { label: "Altura de trabajo",  value: "280 mm" },
      { label: "Peso aproximado",    value: "8.500 kg" },
    ],

    aplicaciones: [
      "Estampado en frío",
      "Embutición profunda",
      "Punzonado y corte",
      "Doblado y conformado",
      "Acuñado y calibrado",
    ],

    // Accesorios que vienen siempre con este producto
    accesorios_imprescindibles: [
      {
        codigo: "ACC-101",
        nombre: "Sistema de mando bimanual",
        descripcion: "Control de seguridad con doble accionamiento simultáneo. Certificado CE Cat. 4 / PLe.",
        precio: 1200,
      },
      {
        codigo: "ACC-102",
        nombre: "Protección delantera AISI 304",
        descripcion: "Pantalla de protección delantera en acero inoxidable con apertura telescópica.",
        precio: 850,
      },
      {
        codigo: "ACC-103",
        nombre: "Lubricación automática centralizada",
        descripcion: "Sistema de lubricación automática para todos los puntos críticos del mecanismo.",
        precio: 980,
      },
      {
        codigo: "ACC-104",
        nombre: "Cuadro eléctrico con PLC Siemens",
        descripcion: "Cuadro eléctrico principal con PLC S7-1200 y pantalla táctil HMI de 7\".",
        precio: 3400,
      },
    ],

    // Accesorios opcionales disponibles para este producto
    accesorios_opcionales: [
      {
        codigo: "ACC-201",
        nombre: "Alimentador automático de banda",
        descripcion: "Alimentador neumático de paso regulable para procesado continuo de chapa en bobina.",
        precio: 4500,
      },
      {
        codigo: "ACC-202",
        nombre: "Contador de golpes con preset",
        descripcion: "Contador digital programable con función de parada automática al alcanzar el preset.",
        precio: 380,
      },
      {
        codigo: "ACC-203",
        nombre: "Detector electrónico de fallos en matriz",
        descripcion: "Sistema de detección de pieza incorrecta o fallo de expulsión.",
        precio: 1200,
      },
      {
        codigo: "ACC-204",
        nombre: "Mesa de rodillos de entrada/salida",
        descripcion: "Extensión de mesa con rodillos de bola para soporte de materiales largos.",
        precio: 650,
      },
      {
        codigo: "ACC-205",
        nombre: "Eyector neumático de piezas",
        descripcion: "Sistema de expulsión neumática de piezas hacia cinta transportadora.",
        precio: 720,
      },
    ],

    soluciones_calidad: [
      {
        nombre: "Control de Paralelismo por Láser",
        descripcion:
          "Sistema de medición y control de paralelismo del émbolo mediante sensores láser. Garantiza tolerancias de ±0,01 mm.",
        precio: 3200,
        video_youtube_id: null,
      },
      {
        nombre: "Monitorización de Fuerza en Tiempo Real",
        descripcion:
          "Célula de carga con display táctil para visualización y registro de la fuerza aplicada en cada golpe. Histórico exportable.",
        precio: 2800,
        video_youtube_id: null,
      },
      {
        nombre: "Sistema de Visión Artificial",
        descripcion:
          "Cámara industrial con software de visión artificial para detección de defectos al 100%. Rechazo automático de piezas no conformes.",
        precio: 6500,
        video_youtube_id: null,
      },
    ],
  },

  // ── Añadir más productos aquí con la misma estructura ────────────────────
  // {
  //   id: "PMS-400T",
  //   nombre: "Prensa Mecánica PMS-400T",
  //   ...
  // },
]

// Plantillas de condiciones comerciales reutilizables
export const CONDICIONES_PLANTILLAS = [
  {
    id: "estandar-es",
    nombre: "Estándar España",
    validez_dias: 30,
    portes: "Porte pagado hasta planta cliente en Península Ibérica. Islas bajo consulta.",
    plazo_entrega_semanas: 16,
    garantia_meses: 24,
    condiciones_pago: "40% con confirmación de pedido · 60% contra entrega en fábrica.",
    notas: "Precios en euros sin IVA. Configuración final sujeta a confirmación técnica.",
  },
  {
    id: "exportacion-ue",
    nombre: "Exportación UE",
    validez_dias: 45,
    portes: "FCA fábrica. Portes a cargo del cliente.",
    plazo_entrega_semanas: 20,
    garantia_meses: 24,
    condiciones_pago: "50% con pedido · 50% antes de expedición.",
    notas: "Precios en euros sin impuestos locales. Documentación de exportación incluida.",
  },
]

// Datos de la empresa (comunes a todas las ofertas)
export const EMPRESA = {
  nombre: "Nombre de tu Empresa S.A.",
  web: "https://www.vuempresa.com",
  logo_path: "/logo.png",
}

// Datos del comercial responsable
export const COMERCIAL = {
  nombre: "Nombre Apellidos",
  cargo: "Director Comercial",
  email: "comercial@vuempresa.com",
  telefono: "+34 900 000 000",
  whatsapp: "+34 600 000 000",
  calendly_url: "https://calendly.com/tu-usuario/consulta-30min",
}
