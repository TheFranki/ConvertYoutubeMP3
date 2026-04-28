# YouTube to MP3 Converter (Web App)
Este es un convertidor de audio de YouTube a MP3 basado en **Node.js**. Permite descargar música directamente desde el navegador de tu celular o PC mediante un servidor local o un túnel.

# Requisitos Previos
Antes de comenzar, asegúrate de tener instalado lo siguiente en tu PC:
1. [Node.js](https://nodejs.org/) (Versión v18 o superior recomendada).
2. [FFmpeg](https://ffmpeg.org/download.html) (Esencial para la conversión de audio).
3. [yt-dlp](https://github.com/yt-dlp/yt-dlp) (El motor que descarga los videos).

# Instalación en una nueva PC
Sigue estos pasos si estás clonando el proyecto en una computadora nueva:

# 1. Preparar la carpeta del proyecto
Crea una carpeta para el proyecto y coloca los archivos esenciales:
* `server.js`
* `public/` (carpeta que contiene `index.html`, `app.js`, `style.css`)
* `yt-dlp.exe` (Colocar en la raíz del proyecto)
* `ffmpeg.exe` (Colocar en la raíz del proyecto)

# 2. Instalar dependencias de Node.js
Abre una terminal en la carpeta del proyecto y ejecuta:
npm init -y
npm install express helmet express-rate-limit

# Para que funcione correctamente debe quedar de esta manera la Estructura
├── node_modules         # Librerías instaladas
├── public/              # Archivos del Frontend
│   ├── app.js           # Lógica del cliente
│   ├── index.html       # Interfaz visual
│   └── style.css        # Diseño
├── ffmpeg.exe           # Ejecutable de conversión
├── package-lock.json    # Lista de librerías
├── package.json         # Dependencias
├── server.js            # Servidor Backend (Node.js)
├── yt-dlp.exe           # Ejecutable de descarga
└── README.md            # Este documento

# Nota
Cada 10 minutos se elimina la música almacenada
