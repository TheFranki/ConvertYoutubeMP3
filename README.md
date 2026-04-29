# YouTube to MP3 Converter (Web App)
Este es un convertidor de audio de YouTube a MP3 basado en **Node.js**. Permite descargar música directamente desde el navegador de tu celular o PC mediante un servidor local o un túnel.

# Requisitos Previos
Antes de comenzar, asegúrate de tener instalado lo siguiente en tu PC:
1. https://nodejs.org/ (Versión v18 o superior recomendada).
2. https://www.gyan.dev/ffmpeg/builds/ (Esencial para la conversión de audio)(Extraer el .exe que se encuentra en bin).
3. https://github.com/yt-dlp/yt-dlp/releases (Descargar la versión .exe)(El motor que descarga los videos).

# Instalación en una nueva PC
Sigue estos pasos si estás clonando el proyecto en una computadora nueva:

# 1. Preparar la carpeta del proyecto
Crea una carpeta para el proyecto y coloca los archivos esenciales:
* `public/` (carpeta que contiene `index.html`, `app.js`, `style.css`)
* `yt-dlp.exe` (Colocar en la raíz del proyecto)
* `ffmpeg.exe` (Colocar en la raíz del proyecto)
* `server.js` (Colocar en la raíz del proyecto)

# 2. Instalar dependencias de Node.js
Abre una terminal en la carpeta del proyecto y ejecuta:
npm install express /
npm install express helmet express-rate-limit /
npm init -y

# 3. Ejecutar estando todo instalado
node server.js
