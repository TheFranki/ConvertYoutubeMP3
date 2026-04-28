const btnConvertir = document.getElementById('btnConvertir');
const urlInput = document.getElementById('urlInput');
const mensajeEstado = document.getElementById('mensajeEstado');
const reproductor = document.getElementById('reproductor');
const contenedorCarga = document.getElementById('contenedor-carga');
const barraRelleno = document.getElementById('barra-progreso-relleno');
const porcentajeTexto = document.getElementById('porcentaje');
const btnGuardar = document.getElementById('btnGuardar');
const btnNuevo = document.getElementById('btnNuevo');
const infoVideo = document.getElementById('info-video');
const txtTitulo = document.getElementById('txtTitulo');
const txtCanal = document.getElementById('txtCanal');

btnConvertir.addEventListener('click', async () => {
    const url = urlInput.value.trim();
    if (!url) return;
    urlInput.readOnly = true; 
    btnConvertir.style.display = "none";
    contenedorCarga.style.display = "block";

    let progreso = 0;
    const intervalo = setInterval(() => {
        if (progreso < 90) {
            progreso += 5;
            barraRelleno.style.width = progreso + "%";
            porcentajeTexto.textContent = progreso + "%";
        }
    }, 400);

    try {
        const respuesta = await fetch('/api/descargar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });
        
        const datos = await respuesta.json();

        if (datos.success) {
            clearInterval(intervalo);
            barraRelleno.style.width = "100%";
            porcentajeTexto.textContent = "100%";
            
            setTimeout(() => {
                contenedorCarga.style.display = "none";
                txtTitulo.textContent = datos.title;
                txtCanal.textContent = datos.channel;
                infoVideo.style.display = "block";
                btnGuardar.style.display = "block";
                
                btnGuardar.onclick = () => {
                    const downloadUrl = `/api/download-file?name=${encodeURIComponent(datos.archive)}`;
                    window.location.href = downloadUrl; 
                };

                btnNuevo.style.display = "inline-block";
            }, 600);
    }
    } catch (e) {
        clearInterval(intervalo);
        console.error(e);
        alert("Error. Intenta con otro enlace.");
        resetPagina();
    }
});

btnNuevo.onclick = () => resetPagina();

function resetPagina() {
    urlInput.readOnly = false;
    urlInput.value = "";
    btnConvertir.style.display = "inline-block";
    btnNuevo.style.display = "none";
    btnGuardar.style.display = "none";
    //reproductor.style.display = "none";
    //reproductor.pause();
    mensajeEstado.textContent = "";
    barraRelleno.style.width = "0%";
    contenedorCarga.style.display = "none";
    infoVideo.style.display = "none";
}