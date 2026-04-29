const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const port = 3000;

app.set('trust proxy', 1); 

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https://*.ytimg.com"],
            connectSrc: ["'self'", "https://*.googlevideo.com"],
        },
    },
}));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 15,
    message: { error: "Demasiadas peticiones. Intenta más tarde." }
});
app.use('/api/', limiter);

app.disable('x-powered-by');
app.use(express.static('public'));
app.use(express.json());

app.get('/api/download-file', (req, res) => {
    const fileName = req.query.name;
    const filePath = path.join(__dirname, 'public', fileName);

    if (fs.existsSync(filePath)) {
        res.download(filePath, fileName, (err) => {
            if (err) console.error("Error al descargar:", err);
        });
    } else {
        res.status(404).send('El archivo ya no existe en el servidor.');
    }
});

app.post('/api/descargar', (req, res) => {
    const url = req.body.url;
    const youtubeRegex = /^(https?:\/\/)?(www\.|music\.)?(youtube\.com|youtu\.be)\/.+$/;
    if (!youtubeRegex.test(url)) {
        return res.status(400).json({ success: false, error: "URL no válida" });
    }

    console.log(`\n[1] Petición recibida: ${url}`);

    const getInfoCmd = `.\\yt-dlp.exe --get-title --get-filename -o "%(uploader)s" --no-playlist "${url}"`;

    exec(getInfoCmd, (tError, stdout) => {
        const info = stdout.split('\n');
        const title = info[0]?.trim() || "Audio";
        const channelName = info[1]?.trim() || "Canal desconocido";

        const safeTitle = title.replace(/[^a-z0-9]/gi, '_').substring(0, 50);
        const fileName = `${safeTitle}.mp3`;
        const fileExit = path.join(__dirname, 'public', fileName);

        console.log(`[2] Título procesado: ${safeTitle}`);
        console.log(`[3] Iniciando descarga y conversión...`);

        const command = `.\\yt-dlp.exe -N 5 -x --audio-format mp3 --audio-quality 0 --ffmpeg-location .\\ffmpeg.exe --no-playlist -o "${fileExit}" "${url}"`;

        exec(command, (error) => {
            if (error) {
                console.error(`[ERROR FATAL]:`, error.message);
                return res.status(500).json({ success: false });
            }
            
            console.log(`[4] Música lista.`);
            res.json({ 
                success: true, 
                archive: fileName, 
                title: title,
                channel: channelName
            });

            setTimeout(() => {
                if (fs.existsSync(fileExit)) {
                    fs.unlinkSync(fileExit);
                    console.log(`[5] Limpieza: ${fileName} borrado.`);
                }
            }, 600000);
        });
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor activo en: http://localhost:${port}`);
});
