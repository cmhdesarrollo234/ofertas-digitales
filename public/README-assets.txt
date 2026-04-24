CARPETA /public — Recursos estáticos de la oferta
===================================================

Coloca aquí los siguientes archivos:

  logo.png              → Logo de la empresa (preferiblemente fondo transparente, altura ~80px)
  models/               → Archivos .glb de los modelos 3D
    ejemplo: models/prensa-pms200.glb

Los archivos de esta carpeta son accesibles directamente desde la URL raíz:
  /logo.png
  /models/prensa-pms200.glb

Una vez colocados, actualiza las rutas en src/data/mockOferta.js:
  empresa.logo_path:       "/logo.png"
  producto.modelo_glb_path: "/models/prensa-pms200.glb"
  producto.imagen_portada:  "/images/prensa-pms200.jpg"  (si añades una carpeta images/)
