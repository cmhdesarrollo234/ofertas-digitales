// ─────────────────────────────────────────────────────────────────────────────
// DATOS DE PRUEBA — Oferta Comercial Prensa Manual de Cremallera EMG 2HR
// Datos extraídos de la oferta original 2HR (ver docs/referencia-oferta-original/)
// ─────────────────────────────────────────────────────────────────────────────

export const mockOferta = {
  // ── Metadatos de la oferta ──────────────────────────────────────────────
  id:               "DEMO-001",
  numero_oferta:    "2026-001-A",
  fecha_creacion:   "15 de marzo de 2026",
  fecha_expiracion: "15 de junio de 2026",   // 3 meses según oferta original
  estado:           "enviada",

  // ── Cliente ────────────────────────────────────────────────────────────
  cliente: {
    nombre_empresa:  "Industrias Ejemplo S.L.",
    nombre_contacto: "Carlos Martínez",
    cargo:           "Director de Producción",
  },

  // ── Producto ───────────────────────────────────────────────────────────
  producto: {
    nombre:             "Prensa Manual de Cremallera EMG 2HR",
    codigo_referencia:  "2HR",
    descripcion_corta:
      "Prensa manual de cremallera con potencia de 200 Kg en toda la carrera. " +
      "Corredera bloqueada en rotación y guiada en acero sobre hierro fundido, con retorno " +
      "automático por resorte. Cabezal guiado sobre el bastidor y corredera alineada con el " +
      "eje de la mesa. Ajuste de altura libre por desplazamiento manual del cabezal y tope " +
      "mecánico para garantizar la repetibilidad del ciclo. Base y cabezal en hierro fundido " +
      "para máxima resistencia y rigidez.",

    // 👇 Placeholder — sustituir por el vídeo del 2HR cuando exista
    video_youtube_id: "UOP6Ip2okiw",

    // 👇 Placeholder — sustituir por el .glb del 2HR cuando se exporte de CAD
    modelo_glb_path: "/models/EJEjemploPRENSA3D.glb",

    // 👇 Foto extraída de la oferta original 2HR
    imagen_portada: "/images/2HR-foto.png",

    // 👇 Plano técnico (PNG por ahora; sustituir por PDF oficial cuando esté disponible)
    planos_pdf_url: "/images/2HR-plano.png",

    especificaciones: [
      { label: "Potencia",                value: "200 Kg en toda la carrera" },
      { label: "Carrera ajustable",       value: "0 a 50 mm (19 mm para 90°)" },
      { label: "Cuello de cisne",         value: "72 mm de profundidad" },
      { label: "Altura libre",            value: "54 a 200 mm" },
      { label: "Mesa",                    value: "100 × 70 mm con 4 taladros M6" },
      { label: "Agujero corredera",       value: "Ø 10 H7 × 24 mm" },
      { label: "Eje de la mesa",          value: "Ø 14 H7" },
      { label: "Pintura bastidor",        value: "RAL 5015 Azul claro" },
      { label: "Pintura cabezal",         value: "RAL 7036 Gris platino" },
      { label: "Material base y cabezal", value: "Hierro fundido" },
      { label: "Peso",                    value: "8 Kg" },
    ],

    aplicaciones: [
      "Inserción de casquillos y rodamientos",
      "Marcado y acuñado de piezas pequeñas",
      "Operaciones de prensado manual de baja serie",
      "Trabajos de banco en taller y mantenimiento",
      "Pruebas y prototipado",
    ],
  },

  // ── Accesorios imprescindibles (siempre incluidos en la oferta) ─────────
  // La prensa 2HR estándar no incluye accesorios imprescindibles adicionales.
  accesorios_imprescindibles: [],

  // ── Accesorios opcionales ───────────────────────────────────────────────
  accesorios_opcionales: [
    {
      codigo:      "OPT-AMB",
      nombre:      "Tratamiento ambiente limpio",
      descripcion:
        "Cincado en piezas de acero y niquelado en piezas de fundición. " +
        "Indicado para entornos con exigencia de limpieza (alimentación, farma, salas blancas).",
      precio:      1_190,
    },
  ],

  // ── Soluciones de calidad (Soluciones de Control) ───────────────────────
  soluciones_calidad: [
    {
      nombre:      "Solución 1 · Fuerza + umbrales mín/máx",
      descripcion:
        "Evalúa la fuerza de prensado de forma instantánea o fijando previamente un esfuerzo " +
        "mínimo y máximo. Una carita sonriente verde/roja, un gráfico de barras y un zumbador " +
        "indican que el ciclo se está realizando correctamente. Registra valores máximos.",
      precio:      2_980,
      video_youtube_id: null,
    },
    {
      nombre:      "Solución 2 · Fuerza + desplazamiento + umbrales",
      descripcion:
        "Evalúa fuerza y desplazamiento de forma instantánea o ajustando previamente fuerza " +
        "y recorrido mínimos y máximos. Carita sonriente verde/roja, gráfico de barras y " +
        "zumbador indican el resultado del ciclo. Registra valores máximos.",
      precio:      4_180,
      video_youtube_id: null,
    },
    {
      nombre:      "Solución 3 · Fuerza + desplazamiento + curvas",
      descripcion:
        "Evalúa fuerza y desplazamiento estableciendo umbrales, horquillas o curvas envolventes. " +
        "La curva de evaluación se visualiza al instante en pantalla. Carita sonriente verde/roja " +
        "y zumbador indican que el ciclo se realiza correctamente. Disponible desde 09/2026.",
      precio:      4_780,
      video_youtube_id: null,
    },
  ],

  // ── Condiciones comerciales ─────────────────────────────────────────────
  condiciones: {
    validez_dias:          90,    // 3 meses (oferta original)
    portes:                "70 € sin IVA. Tiempo de tránsito según destino.",
    plazo_entrega_semanas: 2,     // ~10 días naturales según oferta original
    garantia_meses:        12,    // 1 año, piezas y mano de obra
    condiciones_pago:
      "Primera operación: contado. Siguientes pedidos: 30 % con la firma del pedido y resto " +
      "según condiciones pactadas (sujeto a cobertura por nuestra compañía CECSE).",
    notas:
      "Precios unitarios, impuestos no incluidos. La configuración final puede variar en " +
      "función de la visita técnica previa. Esta oferta cubre la prensa estándar 2HR sin " +
      "opciones; tratamientos especiales y soluciones de control se cotizan adicionalmente.",
  },

  // ── Datos del comercial responsable ────────────────────────────────────
  comercial: {
    nombre:       "Juliana Zapata Montoya",
    cargo:        "Comercial",
    email:        "comercial@emg-prensas.es",
    telefono:     "+34 964 18 35 75",
    whatsapp:     "+34 964 18 35 75",
    calendly_url: "https://calendly.com/demo",
  },

  // ── PDF adjunto ────────────────────────────────────────────────────────
  // null = sin PDF (demo). En ofertas reales, Supabase Storage URL.
  pdf_url: null,

  // ── Identidad de la empresa ─────────────────────────────────────────────
  empresa: {
    nombre_comercial: "EMG Prensas",
    razon_social:     "CMH Automación S.L.",
    web:        "https://cmhautomacion.com/",
    logo_path:    "/logo-emg-claro.png",   // default, fondos claros
    logo_claro:   "/logo-emg-claro.png",   // EMG en negro, para fondos blancos/claros
    logo_oscuro:  "/logo-emg-oscuro.png",  // EMG en blanco, para fondos oscuros (NavBar, hero)
  },
}