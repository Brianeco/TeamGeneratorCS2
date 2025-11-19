document.addEventListener('DOMContentLoaded', () => {
    const pixel = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    // Array con las rutas a los avatares de los jugadores
    const avataresDisponibles = [
        'avatars/01.png', 'avatars/02.png', 'avatars/03.png',
        'avatars/04.png', 'avatars/05.png', 'avatars/06.png',
        'avatars/07.png', 'avatars/08.png', 'avatars/09.png',
        'avatars/10.png', 'avatars/11.png', 'avatars/12.png',
        'avatars/13.png', 'avatars/14.png', 'avatars/15.png'
    ].map(ruta => IMAGENES_DATA[ruta]);
    const rangosInfo = [
        { min: 0, max: 4999, color: '#bac8d3', imagen: 'bac8d3ff.png' },
        { min: 5000, max: 9999, color: '#8cbbe5', imagen: '8cbbe5ff.png' },
        { min: 10000, max: 14999, color: '#6b7ee9', imagen: '6b7ee9ff.png' },
        { min: 15000, max: 19999, color: '#bb6dfb', imagen: 'bb6dfbff.png' },
        { min: 20000, max: 24999, color: '#e017ef', imagen: 'e017efff.png' },
        { min: 25000, max: 29999, color: '#e84a4b', imagen: 'e84a4bff.png' },
        { min: 30000, max: 45000, color: '#fed607', imagen: 'fed607ff.png' }
    ].map(rango => ({
        ...rango, // 1. Copia todas las propiedades existentes (min, max, color, imagen)
        // 2. Sobrescribe la propiedad 'imagen' con el Data URI completo
        imagen: IMAGENES_DATA['rank/' + rango.imagen]
    }));

    // =================================================================================
    // INICIO --- CONSTANTES GLOBALES Y REFERENCIAS AL DOM
    // =================================================================================
    // ¡¡¡AÑADIR ESTAS 3 LÍNEAS AQUÍ!!!
    document.getElementById('agent-ct-img').src = IMAGENES_DATA['agents/ct.png'];
    document.getElementById('agent-tt-img').src = IMAGENES_DATA['agents/tt.png'];
    document.getElementById('icon-team-ct').src = IMAGENES_DATA['agents/ct2.png'];
    document.getElementById('icon-team-tt').src = IMAGENES_DATA['agents/tt2.png'];
    /* ICONOS DE MAPAS SELECCIONABLES */
    document.getElementById('dust').src = IMAGENES_DATA['icons/dust.png'];
    document.getElementById('mirage').src = IMAGENES_DATA['icons/mirage.png'];
    document.getElementById('inferno').src = IMAGENES_DATA['icons/inferno.png'];
    document.getElementById('train').src = IMAGENES_DATA['icons/train.png'];
    document.getElementById('ancient').src = IMAGENES_DATA['icons/ancient.png'];
    document.getElementById('overpass').src = IMAGENES_DATA['icons/overpass.png'];
    document.getElementById('nuke').src = IMAGENES_DATA['icons/nuke.png'];
    document.getElementById('anubis').src = IMAGENES_DATA['icons/anubis.png'];
    document.getElementById('vertigo').src = IMAGENES_DATA['icons/vertigo.png'];
    document.getElementById('agency').src = IMAGENES_DATA['icons/agency.png'];
    document.getElementById('office').src = IMAGENES_DATA['icons/office.png'];
    document.getElementById('italy').src = IMAGENES_DATA['icons/italy.png'];
    document.getElementById('palacio').src = IMAGENES_DATA['icons/palacio.png'];
    document.getElementById('golden').src = IMAGENES_DATA['icons/golden.png'];
    document.getElementById('rooftop').src = IMAGENES_DATA['icons/rooftop.png'];
    document.getElementById('cache').src = IMAGENES_DATA['icons/cache.png'];
    document.getElementById('cobble').src = IMAGENES_DATA['icons/cobble.png'];
    document.getElementById('tuscan').src = IMAGENES_DATA['icons/tuscan.png'];

    const infoContainer = document.getElementById('info-container');// La referencia a 'result' ya deberías tenerla. Si no, añádela:


    const nombresText = document.getElementById('nombres');
    const resultadoContainer = document.getElementById('result');
    const mensajeError = document.getElementById('mensaje');

    // --- Contenedores de Resultado ---
    const mapaBackgroundImg = document.getElementById('mapa-background-img');
    // ...
    const mapaCarruselContenedor = document.getElementById('mapa-carrusel-contenedor'); // ya lo tienes
    const resultadoTarjetaContenedor = document.getElementById('resultado-tarjeta-contenedor'); // ¡NUEVO!
    const mapaTarjetaImg = document.getElementById('mapa-tarjeta-img'); // ¡NUEVO!
    // ...


    const mapaCarruselTira = document.getElementById('mapa-carrusel-tira');
    const mapaIconImg = document.getElementById('mapa-icon-img');
    const agentCTContenedor = document.getElementById('agent-ct-contenedor');
    const agentTTContenedor = document.getElementById('agent-tt-contenedor');
    const teamCTContenedor = document.getElementById('team-ct-contenedor'); // ID de tu HTML para el icono
    const teamTTContenedor = document.getElementById('team-tt-contenedor'); // ID de tu HTML para el icono
    const equipoCT = document.getElementById('equipo-ct');
    const equipoTT = document.getElementById('equipo-tt');

    // --- Imágenes dentro de los contenedores ---
    const agentCtImg = document.getElementById('agent-ct-img');
    const agentTtImg = document.getElementById('agent-tt-img');
    const iconTeamCt = document.getElementById('icon-team-ct');
    const iconTeamTt = document.getElementById('icon-team-tt');
    // ... (otras constantes como iconTeamTt)
    const imgLi = document.getElementById('img-li');
    const imgLd = document.getElementById('img-ld');
    if (imgLi) {
        imgLi.src = IMAGENES_DATA['avatars/li.png'];
    }
    if (imgLd) {
        imgLd.src = IMAGENES_DATA['avatars/ld.png'];
    }
    // En tu archivo script.js, dentro de document.addEventListener('DOMContentLoaded', ...)

    // --- CÓDIGO MEJORADO PARA MOSTRAR LA VERSIÓN DE LA APP ---
    const versionSpan = document.getElementById('app-version');// Primero, comprobamos si estamos dentro de la app de Android.
    // El objeto "Android" solo existe si el WebView lo ha inyectado.
    if (typeof Android !== 'undefined' && typeof Android.getAppVersionName === 'function') {
        // ESTAMOS EN ANDROID
        // Llamamos a la función de Kotlin para obtener la versión nativa.
        const nativeVersion = Android.getAppVersionName();
        versionSpan.textContent = nativeVersion;
        console.log("Entorno detectado: Android. Versión:", nativeVersion);

    } else if (typeof WEB_APP_VERSION !== 'undefined') {
        // NO ESTAMOS EN ANDROID, PERO TENEMOS LA VERSIÓN WEB
        // Usamos la variable global de nuestro archivo version-data.js.
        versionSpan.textContent = WEB_APP_VERSION;
        console.log("Entorno detectado: Web. Versión:", WEB_APP_VERSION);

    } else {
        // CASO DE RESPALDO (si algo falla o el archivo no carga)
        versionSpan.textContent = 'N/A';
        console.warn("No se pudo determinar la versión de la aplicación.");
    }
    // --- FIN DEL CÓDIGO DE VERSIÓN ---

    let equiposFinales = { ct: [], tt: [] };

    const btnDiscord = document.getElementById('discord-link');
    btnDiscord.addEventListener('click', () => {
        window.open('https://discord.gg/Rj8bN9SjAw', '_blank');
    });

    // =================================================================================
    // FIN --- CONSTANTES GLOBALES Y REFERENCIAS AL DOM
    // =================================================================================

    // =================================================================================
    // INICIO --- FUNCIONES DE TRADUCCIÓN (i18n)
    // =================================================================================

    // Funciones que manejan la lógica de traducción
    function getBrowserLanguage() {
        const fullLanguage = navigator.language || navigator.userLanguage;
        const languageCode = fullLanguage.split('-')[0]; // "en-US" -> "en"
        return translations[languageCode] ? languageCode : 'en'; // Fallback to English
    }


    // =================================================================================
    // FIN --- FUNCIONES DE TRADUCCIÓN (i18n)
    // =================================================================================

    const categoriasMapas = {
        all: ['dust', 'mirage', 'inferno', 'train', 'ancient', 'overpass', 'nuke', 'anubis', 'vertigo', 'agency', 'office', 'italy', 'palacio', 'golden', 'rooftop', 'cache', 'cobble', 'tuscan'],
        premier: ['ancient', 'dust', 'inferno', 'mirage', 'nuke', 'overpass', 'train'],
        cp: ['dust', 'mirage', 'inferno', 'ancient', 'nuke', 'train', 'overpass', 'anubis', 'vertigo', 'palacio', 'golden', 'agency', 'office', 'italy'],
        com: ['golden', 'palacio', 'cache', 'cobble', 'tuscan'],
        reh: ['italy', 'office', 'agency'],
        win: ['inferno', 'nuke', 'overpass', 'vertigo', 'rooftop']
    };
    const playerColors = ['#ec822b', '#bd2f9c', '#84ccf2', '#009d7c', '#e9e441'];

    const todosLosMapas = document.querySelectorAll('.selectable');
    const botonesCategoria = document.querySelectorAll('.category-btn');

    // =================================================================================
    // INICIO --- ESTRUCTURA DE DATOS Y FUNCIONES PARA LOS RANGOS
    // =================================================================================



    function generarRangoAleatorio() {
        if (Math.random() < 0.15) { // 15% de probabilidad de tener un rango bajo
            return Math.floor(Math.random() * 1000); // Devuelve un número entre 0 y 999
        }
        // Si no, genera un número entre 1000 y 33,999 para asegurar 4+ dígitos
        return Math.floor(Math.random() * 39001) + 1000;
    }

    function obtenerInfoRango(numeroRango) {
        const rango = rangosInfo.find(r => numeroRango >= r.min && numeroRango <= r.max);
        return rango || rangosInfo[0]; // Devuelve el encontrado o el primero por seguridad
    }
    // =================================================================================
    // FIN --- ESTRUCTURA DE DATOS Y FUNCIONES PARA LOS RANGOS
    // =================================================================================


    // ---------------------------------------------------------------------------------
    // FUNCIÓN: seleccionarCategoria
    // ---------------------------------------------------------------------------------
    function seleccionarCategoria(categoria) {
        const mapasParaSeleccionar = categoriasMapas[categoria];
        if (!mapasParaSeleccionar) return;

        mapasParaSeleccionar.forEach(nombreMapa => {
            const imgDelMapa = document.querySelector(`.selectable[alt="${nombreMapa}"]`);
            if (imgDelMapa) {
                imgDelMapa.classList.add('selected');
            }
        });
    }
    // ---------------------------------------------------------------------------------
    // FIN DE LA FUNCIÓN: seleccionarCategoria
    // ---------------------------------------------------------------------------------


    // ---------------------------------------------------------------------------------
    // FUNCIÓN: deseleccionarTodosLosMapas
    // ---------------------------------------------------------------------------------
    function deseleccionarTodosLosMapas() {
        todosLosMapas.forEach(mapa => mapa.classList.remove('selected'));
    }
    // ---------------------------------------------------------------------------------
    // FIN DE LA FUNCIÓN: deseleccionarTodosLosMapas
    // ---------------------------------------------------------------------------------


    // ---------------------------------------------------------------------------------
    // FUNCIÓN: actualizarEstadoBotones
    // ---------------------------------------------------------------------------------
    function actualizarEstadoBotones() {
        const mapasSeleccionados = new Set(
            Array.from(document.querySelectorAll('.selectable.selected')).map(img => img.alt)
        );

        botonesCategoria.forEach(btn => btn.classList.remove('active'));

        for (const categoria in categoriasMapas) {
            const mapasDeLaCategoria = new Set(categoriasMapas[categoria]);
            const botonCategoria = document.querySelector(`.category-btn[data-category="${categoria}"]`);

            if (botonCategoria && mapasDeLaCategoria.size === mapasSeleccionados.size &&
                [...mapasDeLaCategoria].every(mapa => mapasSeleccionados.has(mapa))) {
                botonCategoria.classList.add('active');
            }
        }
    }
    // ---------------------------------------------------------------------------------
    // FIN DE LA FUNCIÓN: actualizarEstadoBotones
    // ---------------------------------------------------------------------------------
    // =================================================================================
    // INICIO --- FUNCIÓN AUXILIAR PARA AVATARES
    // =================================================================================

    // Usaremos esta variable para asegurarnos de no repetir avatares en la misma generación.
    let avataresParaAsignar = [];

    // Esta función nos da un avatar aleatorio y único de la lista disponible.
    function obtenerAvatarAleatorio() {
        // Si la lista de avatares para asignar está vacía, la rellenamos de nuevo.
        if (avataresParaAsignar.length === 0) {
            avataresParaAsignar = [...avataresDisponibles]; // Copia el array original.
        }
        // Elige un índice aleatorio.
        const indice = Math.floor(Math.random() * avataresParaAsignar.length);
        // Saca el avatar del array para no volver a usarlo en esta tanda y lo devuelve.
        const avatarSeleccionado = avataresParaAsignar.splice(indice, 1)[0];
        return avatarSeleccionado;
    }
    // =================================================================================
    // FIN --- FUNCIÓN AUXILIAR PARA AVATARES
    // =================================================================================


    //================================================================================
    // INICIO --- FUNCIÓN PARA PRE-CARGAR IMÁGENES ANTES DE LA RULETA
    //================================================================================
    function precargarImagenesRuleta(urls, callback) {
        let imagenesCargadas = 0;
        const totalImagenes = urls.length;

        // Si no hay imágenes que cargar, ejecuta el callback inmediatamente.
        if (totalImagenes === 0) {
            callback();
            return;
        }

        urls.forEach(url => {
            const img = new Image();
            img.src = url;

            // Cuando la imagen se carga (o da error, para no bloquear todo)
            img.onload = img.onerror = () => {
                imagenesCargadas++;
                // Si ya se cargaron todas, llamamos a la función que inicia la animación.
                if (imagenesCargadas === totalImagenes) {
                    callback();
                }
            };
        });
    }
    //================================================================================
    // FIN --- FUNCIÓN DE PRE-CARGA
    //================================================================================



    //================================================================================
    // INICIO --- VERSIÓN FINAL: RULETA HORIZONTAL + TICKER DE SONIDO INTELIGENTE
    //================================================================================
    function animateMapShuffle(mapas, onComplete) {
        // 1. Elegir el mapa ganador en secreto al inicio.
        const mapaGanador = mapas[Math.floor(Math.random() * mapas.length)];

        // 2. Construir la lista de imágenes para el carrusel.
        const numeroItemsRuleta = 50;
        let urlsParaPrecargar = [];
        let tiraDeImagenes = [];

        for (let i = 0; i < numeroItemsRuleta; i++) {
            const esItemGanador = (i === numeroItemsRuleta - 4);
            let mapaElegido = esItemGanador ? mapaGanador : mapas[Math.floor(Math.random() * mapas.length)];
            const urlImagen = IMAGENES_DATA[`cards/${mapaElegido}.jpg`];
            urlsParaPrecargar.push(urlImagen);
            tiraDeImagenes.push(`<img src="${urlImagen}">`);
        }
        // 3. Pre-cargamos las imágenes.
        precargarImagenesRuleta(urlsParaPrecargar, () => {
            // ----> Código post-carga <----
            // Reseteamos la posición de la ruleta.
            mapaCarruselTira.style.transition = 'none';
            mapaCarruselTira.style.transform = 'translateX(0px)';
            mapaCarruselTira.innerHTML = tiraDeImagenes.join('');
            mapaCarruselContenedor.classList.add('tira-aparecer');

            setTimeout(() => {
                const duracionPrueba = 4;
                // 5. Calculamos las variables de la animación visual.
                const anchoItem = 150;
                const gap = 10;
                const anchoTotalItem = anchoItem + gap;
                const anchoContenedor = mapaCarruselTira.parentElement.offsetWidth;
                const posicionDelItemGanador = (numeroItemsRuleta - 4) * anchoTotalItem;
                const posicionFinalExacta = -(posicionDelItemGanador - (anchoContenedor / 2) + (anchoItem / 2));

                // 6. Aplicamos la animación visual de la ruleta.
                mapaCarruselTira.style.transition = 'transform 7s cubic-bezier(0.15, 0.4, 0.3, 1)';
                mapaCarruselTira.style.transform = `translateX(${posicionFinalExacta}px)`;

                // ========================================================================
                // ====> LÓGICA DE SONIDO "TICKER INTELIGENTE" <====
                // ========================================================================
                let ultimoIndiceSonido = -1; // Guardará el índice de la última imagen que sonó

                const tickerSonido = setInterval(() => {
                    // Obtenemos la posición X actual de la tira de imágenes
                    const matrizTransform = new DOMMatrix(window.getComputedStyle(mapaCarruselTira).transform);
                    const posicionActualX = matrizTransform.m41;

                    // Calculamos qué imagen está en el centro del contenedor
                    const posicionCentro = Math.abs(posicionActualX) + (anchoContenedor / 2);
                    const indiceActual = Math.floor(posicionCentro / anchoTotalItem);

                    // Si el índice en el centro es NUEVO (diferente al último que sonó)...
                    if (indiceActual !== ultimoIndiceSonido && indiceActual < numeroItemsRuleta) {
                        // ...lo guardamos para no volver a sonar para esta misma imagen.
                        ultimoIndiceSonido = indiceActual;

                        // Calculamos el progreso general de la animación (de 0.0 a 1.0)
                        const progreso = Math.min(Math.abs(posicionActualX / posicionFinalExacta), 1);

                        // Calculamos la velocidad del sonido basándonos en el progreso
                        let velocidadPlayback = (1 - progreso) * 2.5 + 0.8;
                        if (velocidadPlayback > 3) velocidadPlayback = 3;

                        // ¡Reproducimos el sonido UNA SOLA VEZ para esta imagen!
                        playSound('shuffle', 0.4, velocidadPlayback);
                    }
                }, 20); // Intervalo muy corto para un "sensor" preciso

                // Detenemos el "ticker" justo cuando la animación termina.
                setTimeout(() => clearInterval(tickerSonido), 7000);
                // ========================================================================
                /*
                // 7. Programamos la revelación final.
                setTimeout(() => {
                    playSound('audio-reveal');
                    mapaCarruselContenedor.classList.remove('mapa-carrusel-aparecer');
                    mapaCarruselContenedor.classList.add('mapa-carrusel-desaparecer');

                    setTimeout(() => {
                        resultadoTarjetaContenedor.classList.remove('invisible');
                        mapaTarjetaImg.src = IMAGENES_DATA[`cards/${mapaGanador}.png`];
                        mapaTarjetaImg.classList.add('mapa-ganador-zoom');
                        onComplete(mapaGanador);
                    }, 200);
                }, 7000); // Sincronizado con la duración de la animación
                */
                mapaCarruselTira.addEventListener('transitionend', () => {
                    // Ahora que la animación TERMINÓ DE VERDAD, ejecutamos toda la lógica final.
                    console.log(`Transition de ${duracionPrueba}s finalizada. Intentando reproducir audio.`);
                    playSound('reveal');

                    mapaCarruselContenedor.classList.remove('mapa-carrusel-aparecer');
                    mapaCarruselContenedor.classList.add('mapa-carrusel-desaparecer');

                    setTimeout(() => {
                        resultadoTarjetaContenedor.classList.remove('invisible');
                        mapaTarjetaImg.src = IMAGENES_DATA[`cards/${mapaGanador}.png`];
                        mapaTarjetaImg.classList.add('mapa-ganador-zoom');
                        onComplete(mapaGanador);
                    }, 200); // Este pequeño setTimeout interno está bien.

                }, { once: true }); // { once: true } asegura que esto solo se ejecute una vez.

            }, 50);
        });
    }
    //================================================================================
    // FIN --- VERSIÓN FINAL
    //================================================================================







    // =================================================================================
    // INICIO --- FUNCIÓN AUXILIAR PARA MOSTRAR JUGADORES
    // =================================================================================

    function mostrarJugadores(contenedorLista, jugadores, colores, avatarSrc) {
        contenedorLista.innerHTML = '';

        jugadores.forEach((nombre, index) => {
            const fila = document.createElement('li');
            fila.className = 'fila-jugador';


            // --- 1. Creación del Avatar ---
            const avatarDiv = document.createElement('div');
            avatarDiv.className = 'jugador-avatar';
            avatarDiv.style.backgroundColor = colores[index];
            const avatarImg = document.createElement('img');

            // -- 2. Llamamos a nuestra nueva función para obtener un avatar único
            avatarImg.src = obtenerAvatarAleatorio();

            avatarImg.className = 'jugador-avatar-img';
            avatarDiv.appendChild(avatarImg);

            // --- Creación del Rango Compuesto ---
            const numeroRango = generarRangoAleatorio();
            const infoRango = obtenerInfoRango(numeroRango);

            // Contenedor principal del rango, con la imagen de fondo
            const rangoContenedor = document.createElement('div');
            rangoContenedor.className = 'jugador-rango-contenedor';
            rangoContenedor.style.backgroundImage = `url(${infoRango.imagen})`;

            // Texto del rango que va dentro del contenedor
            const rangoTexto = document.createElement('span');
            rangoTexto.className = 'jugador-rango-texto';
            rangoTexto.style.color = infoRango.color;

            if (numeroRango < 1000) {
                rangoTexto.textContent = '---';
            } else {
                const numeroFormateado = numeroRango.toLocaleString('en-US');
                const partes = numeroFormateado.split(',');

                // Creamos el span para la parte principal (antes de la coma)
                const spanPrincipal = document.createElement('span');
                spanPrincipal.textContent = partes[0];

                // Lo añadimos al contenedor de texto del rango
                rangoTexto.appendChild(spanPrincipal);

                // Si hay una parte decimal (después de la coma), la creamos y estilizamos
                if (partes.length > 1) {
                    // Añadimos primero la coma como texto simple
                    rangoTexto.appendChild(document.createTextNode(','));

                    // Creamos el span para los "decimales"
                    const spanDecimales = document.createElement('span');
                    spanDecimales.className = 'rango-decimales'; // Nueva clase para estilizar
                    spanDecimales.textContent = partes[1];

                    // Lo añadimos después de la coma
                    rangoTexto.appendChild(spanDecimales);
                }
            }

            rangoContenedor.appendChild(rangoTexto);

            // --- 3. Creación del Nombre ---
            const nombreSpan = document.createElement('span');
            nombreSpan.className = 'jugador-nombre';
            nombreSpan.textContent = nombre;

            // --- 4. Añadimos todos los elementos a la fila en el orden deseado ---
            fila.appendChild(avatarDiv);
            fila.appendChild(rangoContenedor);
            fila.appendChild(nombreSpan);

            contenedorLista.appendChild(fila);
        });
    }

    // ---------------------------------------------------------------------------------
    // FIN DE LA FUNCIÓN: mostrarJugadores
    // ---------------------------------------------------------------------------------


    // =================================================================================
    // ====> NUEVO: FUNCIÓN PARA INICIAR LA RULETA DE JUGADORES <====
    // =================================================================================
    let intervalosRuleta = []; // Guardaremos los intervalos para poder detenerlos luego

    function iniciarRuletaJugadores(contenedorLista, nombres) {
        contenedorLista.innerHTML = ''; // Limpiamos la lista
        // Creamos 5 filas vacías para cada equipo
        for (let i = 0; i < 5; i++) {
            const fila = document.createElement('li');
            fila.className = 'fila-jugador';
            // --- 1. Creación del Avatar (con placeholders) ---
            const avatarDiv = document.createElement('div');
            avatarDiv.className = 'jugador-avatar';
            const avatarImg = document.createElement('img');
            avatarImg.className = 'jugador-avatar-img';
            avatarDiv.appendChild(avatarImg);
            // --- 2. Creación del Rango (con placeholders) ---
            const rangoContenedor = document.createElement('div');
            rangoContenedor.className = 'jugador-rango-contenedor';
            const rangoTexto = document.createElement('span');
            rangoTexto.className = 'jugador-rango-texto';
            const spanPrincipal = document.createElement('span');
            const spanDecimales = document.createElement('span');
            spanDecimales.className = 'rango-decimales';
            rangoTexto.appendChild(spanPrincipal);
            rangoTexto.appendChild(spanDecimales);
            rangoContenedor.appendChild(rangoTexto);
            const nombreSpan = document.createElement('span');
            nombreSpan.className = 'jugador-nombre';
            // --- 4. Añadimos todos los elementos a la fila ---
            fila.appendChild(avatarDiv);
            fila.appendChild(rangoContenedor);
            fila.appendChild(nombreSpan);
            contenedorLista.appendChild(fila);

            // --- 5. INICIO DE LA ANIMACIÓN PARA ESTA FILA ---
            const intervalo = setInterval(() => {
                // Cambiar Avatar y Color
                const avatarRandom = avataresDisponibles[Math.floor(Math.random() * avataresDisponibles.length)];
                avatarImg.src = avatarRandom;
                avatarDiv.style.backgroundColor = playerColors[Math.floor(Math.random() * playerColors.length)];
                nombreSpan.textContent = nombres[Math.floor(Math.random() * nombres.length)];
                const numeroRangoRandom = generarRangoAleatorio();
                const infoRangoRandom = obtenerInfoRango(numeroRangoRandom);
                rangoContenedor.style.backgroundImage = `url(${infoRangoRandom.imagen})`;
                rangoTexto.style.color = infoRangoRandom.color;

                if (numeroRangoRandom < 1000) {
                    spanPrincipal.textContent = '---';
                    spanDecimales.textContent = '';
                } else {
                    const numeroFormateado = numeroRangoRandom.toLocaleString('en-US');
                    const partes = numeroFormateado.split(',');
                    spanPrincipal.textContent = partes[0];
                    if (partes.length > 1) {
                        spanDecimales.textContent = ',' + partes[1];
                    } else {
                        spanDecimales.textContent = '';
                    }
                }
            }, 75); // Cambia cada 75ms para un efecto rápido

            intervalosRuleta.push(intervalo); // Guardamos el ID del intervalo para detenerlo
        }
    }

    function detenerRuletaJugadores() {
        intervalosRuleta.forEach(intervalo => clearInterval(intervalo));
        intervalosRuleta = []; // Limpiamos el array
    }
    // =================================================================================
    // FIN DE LA NUEVA FUNCIÓN
    // =================================================================================
    // =================================================================================
    // INICIO --- FUNCIÓN AUXILIAR PARA CREAR Y MEZCLAR JUGADORES
    // =================================================================================
    function crearJugadoresMezclados(nombres) {
        return nombres
            .map((nombre, index) => {
                const numeroRango = generarRangoAleatorio();
                const infoRango = obtenerInfoRango(numeroRango);

                return {
                    nombre: nombre,
                    color: playerColors[index % playerColors.length],
                    avatar: obtenerAvatarAleatorio(),
                    rango: {
                        numero: numeroRango,
                        info: infoRango
                    }
                };
            })
            .sort(() => Math.random() - 0.5);
    }
    // =================================================================================
    // FIN --- FUNCIÓN AUXILIAR PARA CREAR Y MEZCLAR JUGADORES
    // =================================================================================


    // ---------------------------------------------------------------------------------
    // INICIO DE LA FUNCIÓN: generarEquipos
    // ---------------------------------------------------------------------------------

    function generarEquipos() {
        // =====================================================================
        // ====> FASE 0.1: BLOQUEO Y RESETEO INICIAL ROBUSTO
        // =====================================================================

        const idiomaActual = document.documentElement.lang || 'en';
        const diccionario = translations[idiomaActual];
        let errores = [];
        btnGenerar.disabled = true;
        btnLimpiar.disabled = true;
        detenerRuletaJugadores();
        // NO reseteamos animaciones aquí para permitir la animación de salida

        mensajeError.classList.add('invisible');

        // =========================================================================
        // ====> FASE 0.2: VALIDACIÓN DE DATOS (Tu código, intacto)
        // =========================================================================
        const jugadoresSimples = procesarJugadoresDesdeTextarea(diccionario, errores); // 1. Obtenemos {name, skill} a partir del input

        // 2. DECIDIMOS LA ESTRATEGIA BASÁNDONOS EN EL INPUT ORIGINAL
        const necesitaBalanceo = jugadoresSimples.some(jugador => jugador.skill > 0);

        // 3. AHORA SÍ, ENRIQUECEMOS Y DECORAMOS LOS OBJETOS PARA LA VISUALIZACIÓN
        const jugadores = jugadoresSimples.map((jugadorSimple, index) => {

            let skillFinal = jugadorSimple.skill;

            // Si NO se necesita balanceo Y el skill es 0, le damos uno aleatorio para la parte divertida.
            if (!necesitaBalanceo && skillFinal === 0) {
                const numeroDeRangos = rangosInfo.length;
                // 2. Generamos un índice aleatorio, desde 0 ("Sin Rango") hasta el último rango disponible.
                const indiceRangoAleatorio = Math.floor(Math.random() * numeroDeRangos);
                // 3. Obtenemos la información del rango elegido.
                const rangoElegido = rangosInfo[indiceRangoAleatorio];
                // 4. Si el rango elegido NO es el "Sin Rango", le asignamos un skill aleatorio
                // que esté DENTRO de los límites (min/max) que tú definiste.
                if (rangoElegido.min > 0) {
                    skillFinal = Math.floor(Math.random() * (rangoElegido.max - rangoElegido.min + 1)) + rangoElegido.min;
                }
            }

            const infoRango = obtenerInfoRango(skillFinal);

            return {
                name: jugadorSimple.name,
                skill: skillFinal,
                nombre: jugadorSimple.name,
                avatar: obtenerAvatarAleatorio(),
                color: playerColors[index % playerColors.length],
                rango: {
                    numero: skillFinal,
                    info: infoRango
                }
            };
        });

        // El resto del código de validación (de 10 jugadores, duplicados, etc.) sigue aquí debajo...
        // const idiomaActual = ...



        const nombresArray = jugadores.map(j => j.name);
        const numeroNombres = nombresArray.length;

        if (numeroNombres !== 10) {
            let mensajeErrorNombres;
            if (numeroNombres < 10) {
                playSound('error');
                mensajeErrorNombres = diccionario.error_add_players.replaceAll('{actual}', numeroNombres).replaceAll('{faltantes}', 10 - numeroNombres);
            } else {
                playSound('error');
                mensajeErrorNombres = diccionario.error_remove_players.replaceAll('{actual}', numeroNombres).replaceAll('{sobrantes}', numeroNombres - 10);
            }
            errores.push(mensajeErrorNombres);
        }

        const nombresEnMinusculas = nombresArray.map(n => n.toLowerCase());
        const nombresUnicos = new Set(nombresEnMinusculas);
        if (nombresUnicos.size !== nombresArray.length) {
            playSound('error');
            errores.push(diccionario.error_duplicates);
        }

        const mapasSeleccionados = document.querySelectorAll('.selectable.selected');
        if (mapasSeleccionados.length === 0) {
            playSound('error');
            errores.push(diccionario.error_maps);
        }

        // =========================================================================
        // ====> FASE 0.3: MANEJO DEL RESULTADO DE LA VALIDACIÓN (Tu código, intacto)
        // =========================================================================
        if (errores.length > 0) {
            infoContainer.style.display = 'block';
            resultadoContainer.classList.add('no-mostrar');
            mensajeError.innerHTML = errores.join('<br>');
            mensajeError.classList.remove('invisible');
            btnGenerar.disabled = false;
            btnLimpiar.disabled = false;
            return;
        }

        // =========================================================================
        // ====> INICIO DE LA LÓGICA DE RE-GENERACIÓN (LA PARTE NUEVA)
        // =========================================================================

        // 1. Comprobamos si es una re-generación (si el resultado ya se está mostrando)
        const esRegeneracion = !resultadoContainer.classList.contains('no-mostrar');

        // 2. Creamos la función que contiene el resto del proceso de generación
        const iniciarGeneracion = () => {
            // AHORA SÍ, reseteamos las animaciones del ciclo anterior
            resetearAnimaciones();

            // ====> FASE 1: PREPARACIÓN SI NO HAY ERRORES
            playSound('generate');
            infoContainer.style.display = 'none';
            resultadoContainer.classList.remove('no-mostrar');

            btnCompartir.classList.add('no-mostrar');
            mapaBackgroundImg.src = pixel
            mapaTarjetaImg.src = pixel
            mapaIconImg.src = pixel
            equipoCT.innerHTML = '';
            equipoTT.innerHTML = '';
            agentCtImg.src = IMAGENES_DATA['agents/ct.png'];
            agentTtImg.src = IMAGENES_DATA['agents/tt.png'];

            mapaCarruselContenedor.classList.remove('mapa-carrusel-desaparecer', 'mapa-carrusel-aparecer');
            mapaTarjetaImg.classList.remove('mapa-ganador-zoom');
            resultadoTarjetaContenedor.classList.add('invisible');
            mapaCarruselContenedor.classList.add('mapa-carrusel-aparecer');
            mapaCarruselContenedor.classList.remove('invisible');

            avataresParaAsignar = [...avataresDisponibles];
            // CÓDIGO DE REEMPLAZO DENTRO DE iniciarGeneracion()
            if (necesitaBalanceo) {
                console.log("[Balanceador] Estrategia: BALANCEO POR HABILIDAD");
                const equiposBalanceados = balancearEquipos(jugadores);
                equiposFinales.ct = equiposBalanceados.equipo1; // Directamente, sin .map ni .find
                equiposFinales.tt = equiposBalanceados.equipo2; // Directamente, sin .map ni .find
            } else {
                console.log("[Balanceador] Estrategia: SORTEO ALEATORIO");
                const jugadoresMezclados = shuffle(jugadores);
                // Tu lógica original de 5 y 5 para el sorteo aleatorio
                equiposFinales.ct = jugadoresMezclados.slice(0, 5);
                equiposFinales.tt = jugadoresMezclados.slice(5, 10);
            }



            iniciarRuletaJugadores(equipoCT, nombresArray);
            iniciarRuletaJugadores(equipoTT, nombresArray);
            equipoCT.style.opacity = '1';
            equipoTT.style.opacity = '1';

            const nombresMapasSeleccionados = Array.from(mapasSeleccionados).map(mapa => mapa.alt);

            // ====> FASE 2: ANIMACIÓN DE RULETA Y REVELACIÓN FINAL (Tu código, intacto)
            animateMapShuffle(nombresMapasSeleccionados, (nombreMapaElegido) => {
                const crearHtmlJugadorFinal = (jugador) => {
                    let textoRangoHtml;
                    if (jugador.rango.numero < 1000) {
                        textoRangoHtml = '---';
                    } else {
                        const numeroFormateado = jugador.rango.numero.toLocaleString('de-DE');
                        textoRangoHtml = numeroFormateado.replaceAll('.', ',<span class="rango-decimales">') + '</span>';
                    }
                    textoRangoHtml = textoRangoHtml.replaceAll(',<span class="rango-decimales"></span>', '');
                    return `<li class="fila-jugador"><div class="jugador-avatar" style="background-color: ${jugador.color};"><img src="${jugador.avatar}" class="jugador-avatar-img"></div><div class="jugador-rango-contenedor" style="background-image: url(${jugador.rango.info.imagen});"><span class="jugador-rango-texto" style="color: ${jugador.rango.info.color};">${textoRangoHtml}</span></div><span class="jugador-nombre">${jugador.nombre}</span></li>`;
                };

                mapaTarjetaImg.src = IMAGENES_DATA[`cards/${nombreMapaElegido}.jpg`];
                mapaTarjetaImg.classList.add('mapa-ganador-zoom');

                setTimeout(() => {
                    mapaIconImg.src = IMAGENES_DATA[`icons/${nombreMapaElegido}.png`];
                    mapaIconImg.classList.add('icono-mapa-aparecer');
                }, 600);

                setTimeout(() => {
                    mapaTarjetaImg.classList.remove('mapa-ganador-zoom');
                    mapaBackgroundImg.src = IMAGENES_DATA[`backgrounds/${nombreMapaElegido}.png`];
                    mapaBackgroundImg.classList.add('fondo-mapa-aparecer');

                    setTimeout(() => {
                        detenerRuletaJugadores();
                        equipoCT.innerHTML = equiposFinales.ct.map(crearHtmlJugadorFinal).join('');
                        equipoTT.innerHTML = equiposFinales.tt.map(crearHtmlJugadorFinal).join('');

                        agentCTContenedor.classList.add('agente-aparecer');
                        agentTTContenedor.classList.add('agente-aparecer');

                        setTimeout(() => {
                            teamCTContenedor.classList.add('team-icon-aparecer');
                            teamTTContenedor.classList.add('team-icon-aparecer');
                            btnCompartir.classList.remove('no-mostrar');
                            btnLimpiar.disabled = false;
                            btnGenerar.disabled = false;
                        }, 500);
                    }, 50);
                }, 1200);
            });
        }; // <-- FIN DE LA FUNCIÓN iniciarGeneracion

        // 3. Decisión final: ¿Animación de salida o inicio directo?
        if (esRegeneracion) {
            // Si es una re-generación, primero animamos la salida de los agentes
            agentCTContenedor.classList.add('agente-desaparecer');
            agentTTContenedor.classList.add('agente-desaparecer');
            resultadoTarjetaContenedor.classList.add('invisible');
            mapaBackgroundImg.classList.remove('fondo-mapa-aparecer');
            mapaIconImg.classList.remove('icono-mapa-aparecer');
            teamCTContenedor.classList.remove('team-icon-aparecer');
            teamTTContenedor.classList.remove('team-icon-aparecer');

            // Y ESPERAMOS 400ms (la duración de la animación) para iniciar la nueva generación
            setTimeout(iniciarGeneracion, 400);
        } else {
            // Si es la primera vez, iniciamos inmediatamente
            iniciarGeneracion();
        }
        // =========================================================================
        // ====> FIN DE LA LÓGICA DE RE-GENERACIÓN
        // =========================================================================
    }

    function shuffle(array) {
        let newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
    // ---------------------------------------------------------------------------------
    // FIN DE LA FUNCIÓN: generarEquipos
    // ---------------------------------------------------------------------------------


    // ---------------------------------------------------------------------------------
    // INICIO DE LA FUNCIÓN: iniciarFase3
    // ---------------------------------------------------------------------------------

    // ---------------------------------------------------------------------------------
    // FUNCIÓN: resetearAnimaciones (NUEVA)
    // ---------------------------------------------------------------------------------
    function resetearAnimaciones() {
        // Resetea clases de animación de todos los elementos
        mapaBackgroundImg.classList.remove('fondo-mapa-aparecer');
        //mapaTarjetaImg.classList.remove('mapa-ganador-zoom');
        mapaIconImg.classList.remove('icono-mapa-aparecer');
        agentCTContenedor.classList.remove('agente-aparecer', 'agente-desaparecer');
        agentTTContenedor.classList.remove('agente-aparecer', 'agente-desaparecer');
        teamCTContenedor.classList.remove('team-icon-aparecer');
        teamTTContenedor.classList.remove('team-icon-aparecer');
    }


    // ---------------------------------------------------------------------------------
    // INICIO DE LA FUNCIÓN: limpiarResultados
    // ---------------------------------------------------------------------------------
    function limpiarResultados() {
        resultadoContainer.classList.add('no-mostrar');
        btnCompartir.classList.add('no-mostrar');
        detenerRuletaJugadores();
        playSound('clear');
        infoContainer.style.display = 'block';

        // --- LÓGICA DE LIMPIEZA AÑADIDA ---
        if (mapaCarruselContenedor) {
            // Ocultamos el carrusel y, lo más importante, removemos CUALQUIER clase de animación activa.
            mapaCarruselContenedor.classList.add('invisible');
            mapaCarruselContenedor.classList.remove('mapa-carrusel-desaparecer');
            mapaCarruselContenedor.classList.remove('mapa-carrusel-aparecer');
        }
        if(resultadoTarjetaContenedor) resultadoTarjetaContenedor.classList.add('invisible');
        if(mapaTarjetaImg) mapaTarjetaImg.classList.remove('mapa-ganador-zoom');
        // --- FIN LÓGICA DE LIMPIEZA ---

        // limpiar mensajes de error ***
        mensajeError.classList.add('invisible');
        mensajeError.textContent = '';

        resetearAnimaciones();
        btnLimpiar.disabled = true;
        btnGenerar.disabled = false;

        // limpiar el src de las imágenes
        mapaBackgroundImg.src = pixel
        mapaTarjetaImg.src = pixel
        mapaIconImg.src = pixel

        // Limpiamos el contenido de las listas IMAGENES_DATA[]
        equipoCT.innerHTML = '';
        equipoTT.innerHTML = '';
    }


    // ---------------------------------------------------------------------------------
    // FIN DE LA FUNCIÓN: limpiarResultados
    // ---------------------------------------------------------------------------------

    // =======================================================
    // INICIO --- SISTEMA DE AUDIO HÍBRIDO (Android/Web)
    // =======================================================

    // Objeto para mantener una referencia a nuestros elementos de audio para la versión web
    const elementosDeAudioWeb = {};
    let isAudioWebInitialized = false;

    /**
     * Crea los elementos <audio> necesarios para la versión web y los añade al documento.
     * Solo se ejecuta si no estamos en la app de Android.
     */
    function inicializarAudioWeb() {
        // Evita la inicialización múltiple
        if (isAudioWebInitialized) return;

        console.log("[JS-Web] Inicializando sistema de audio para el navegador.");

        // Lista de sonidos con sus nombres (ID) y rutas de archivo
        const sonidos = {
            click: 'sounds/audio_click.mp3',
            shuffle: 'sounds/audio_shuffle.mp3',
            reveal: 'sounds/audio_reveal.mp3',
            clear: 'sounds/audio_clear.mp3',
            share: 'sounds/audio_share.mp3',
            error: 'sounds/audio_error.mp3',
            generate: 'sounds/audio_generate.mp3',
            language: 'sounds/audio_generate.mp3'
        };

        const fragmentoAudio = document.createDocumentFragment();
        for (const nombre in sonidos) {
            const audioEl = document.createElement('audio');
            audioEl.id = `audio-${nombre}`;
            audioEl.src = sonidos[nombre];
            audioEl.preload = 'auto'; // Le dice al navegador que puede empezar a descargar
            fragmentoAudio.appendChild(audioEl);
            elementosDeAudioWeb[nombre] = audioEl;
        }
        document.body.appendChild(fragmentoAudio);

        isAudioWebInitialized = true;
    }

    /**
     * Reproduce un sonido utilizando el método nativo en Android
     * o los elementos <audio> en un navegador web.
     * @param {string} nombreSonido - El identificador simple del sonido (ej: "click", "reveal").
     */
    function playSound(nombreSonido) {
        // ----> Prioridad 1: Vía Nativa de Android
        if (window.Android && typeof window.Android.reproducirSonidoNativo === 'function') {
            console.log(`[JS-Nativo] Enviando llamada nativa para el sonido: "${nombreSonido}"`);
            window.Android.reproducirSonidoNativo(nombreSonido);
            return; // Salimos de la función
        }

        // ----> Prioridad 2: Vía Web (si la nativa no existe)
        const audioEl = elementosDeAudioWeb[nombreSonido];
        if (audioEl) {
            console.log(`[JS-Web] Reproduciendo sonido web: "${nombreSonido}"`);
            audioEl.currentTime = 0; // Reinicia el sonido para poder llamarlo rápidamente (como el shuffle)
            audioEl.play().catch(error => {
                // Este error es común y esperado si el usuario aún no ha hecho clic en la página.
                // La reproducción se desbloqueará con la primera interacción.
                console.warn(`No se pudo reproducir '${nombreSonido}' automáticamente: ${error.message}`);
            });
        } else {
            // Este mensaje solo debería aparecer si el audio web no se inicializó o falta un sonido
            console.log(`[JS-SIMULADO] Sonido no encontrado en el sistema web: ${nombreSonido}`);
        }
    }

    // =======================================================
    // FIN --- SISTEMA DE AUDIO HÍBRIDO
    // =======================================================




    // ---------------------------------------------------------------------------------
    // FUNCIÓN: handleClicBotonCategoria
    // ---------------------------------------------------------------------------------
    function handleClicBotonCategoria(evento) {
        playSound('click');
        const botonPulsado = evento.currentTarget;
        const categoria = botonPulsado.dataset.category;
        const yaEstaActivo = botonPulsado.classList.contains('active');

        deseleccionarTodosLosMapas();

        if (!yaEstaActivo) {
            seleccionarCategoria(categoria);
        }

        actualizarEstadoBotones();
    }
    // ---------------------------------------------------------------------------------
    // FIN DE LA FUNCIÓN: handleClicBotonCategoria
    // ---------------------------------------------------------------------------------


    // ---------------------------------------------------------------------------------
    // FUNCIÓN: handleClicMapa
    // ---------------------------------------------------------------------------------
    function handleClicMapa(evento) {
        playSound('click');
        evento.currentTarget.classList.toggle('selected');
        actualizarEstadoBotones();
    }
    // ---------------------------------------------------------------------------------
    // FIN DE LA FUNCIÓN: handleClicMapa
    // ---------------------------------------------------------------------------------





    // =========================================================================
    // INICIO --- NUEVA LÓGICA DE BALANCEO DE EQUIPOS
    // =========================================================================

    /**
     * Procesa el contenido del textarea y añade errores al array si los encuentra.
     * @param {object} diccionario - El objeto de traducciones para el idioma actual.
     * @param {Array<string>} errores - El array donde se añadirán los mensajes de error.
     * @returns {Array<{name: string, skill: number}>} Un array de jugadores.
     */
    function procesarJugadoresDesdeTextarea(diccionario, errores) {
        const nombresTextarea = document.getElementById('nombres');
        const textoCompleto = nombresTextarea.value.trim();
        const jugadores = [];

        if (!textoCompleto) {
            return [];
        }

        const partesCrudas = textoCompleto.split(',');
        const jugadoresPotenciales = [];
        let i = 0;

        while (i < partesCrudas.length) {
            let parteActual = partesCrudas[i].trim();
            if (i + 1 < partesCrudas.length && /^\d+$/.test(partesCrudas[i + 1].trim())) {
                 parteActual += "," + partesCrudas[i + 1].trim();
                 i++;
            }
            jugadoresPotenciales.push(parteActual);
            i++;
        }

        jugadoresPotenciales.forEach(lineaLimpia => {
            if (lineaLimpia === '') return;

            let nombre = lineaLimpia;
            let skill = 0;

            const separadorIndex = lineaLimpia.search(/[:;]/);

            if (separadorIndex !== -1) {
                nombre = lineaLimpia.substring(0, separadorIndex).trim();
                let rangoStr = lineaLimpia.substring(separadorIndex + 1).trim();

                if (nombre && rangoStr) {
                    const soloDigitos = rangoStr.replace(/\D/g, '');
                    if (soloDigitos.length > 0) {
                        const rangoNumValidacion = parseInt(soloDigitos, 10);
                        if (rangoNumValidacion > 40) {
                            const mensaje = diccionario.error_rank_too_high.replace('{nombre}', `'${nombre}'`);
                            if (!errores.includes(mensaje)) {
                                errores.push(mensaje); // Añadimos el error al array que nos pasaron
                            }
                        }
                        const rangoFinalStr = soloDigitos.substring(0, 2);
                        const rangoFinalNum = parseInt(rangoFinalStr, 10);
                        if (rangoFinalNum === 40) {
                            skill = 40000;
                        } else {
                            const minSkill = rangoFinalNum * 1000;
                            const maxSkill = minSkill + 999;
                            skill = Math.floor(Math.random() * (maxSkill - minSkill + 1)) + minSkill;
                        }
                    }
                }
            }

            // Verificación de duplicados
            const nombreEnMinusculas = nombre.toLowerCase();
            if (jugadores.some(j => j.name.toLowerCase() === nombreEnMinusculas)) {
                 if (!errores.includes(diccionario.error_duplicates)) {
                    errores.push(diccionario.error_duplicates);
                 }
            }

            jugadores.push({ name: nombre, skill: skill });
        });

        console.log("[Balanceador] Jugadores procesados:", jugadores);
        return jugadores;
    }





    // =========================================================================
    // FIN --- NUEVA LÓGICA DE BALANCEO DE EQUIPOS
    // =========================================================================


    // ... aquí está la función procesarJugadoresDesdeTextarea() que ya tienes ...

    /**
     * Algoritmo de balanceo de equipos.
     * Ordena a los jugadores por habilidad y los distribuye uno a uno* en el equipo con la menor suma de habilidad total.
     * @param {Array<{name: string, skill: number}>} jugadores - El array de objetos de jugador.
     * @returns {{equipo1: Array<string>, equipo2: Array<string>}} Objeto con los dos equipos balanceados.
     */
    // =========================================================================
    // ====> FUNCIÓN balancearEquipos (VERSIÓN FINAL Y CORRECTA)
    // =========================================================================
    function balancearEquipos(jugadores) {
        // 1. Creamos una COPIA y la ordenamos de MAYOR a MENOR habilidad.
        const jugadoresOrdenados = [...jugadores].sort((a, b) => b.skill - a.skill);

        const equipo1 = [];
        const equipo2 = [];

        // 2. Distribuimos usando el patrón "ABBA" para garantizar 5 vs 5
        // Este patrón asegura un balance excelente y siempre el mismo número de jugadores.
        // A, B, B, A, A, B, B, A, A, B
        // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 (índices del array ordenado)
        equipo1.push(jugadoresOrdenados[0]); // A
        equipo2.push(jugadoresOrdenados[1]); // B
        equipo2.push(jugadoresOrdenados[2]); // B
        equipo1.push(jugadoresOrdenados[3]); // A
        equipo1.push(jugadoresOrdenados[4]); // A
        equipo2.push(jugadoresOrdenados[5]); // B
        equipo2.push(jugadoresOrdenados[6]); // B
        equipo1.push(jugadoresOrdenados[7]); // A
        equipo1.push(jugadoresOrdenados[8]); // A
        equipo2.push(jugadoresOrdenados[9]); // B

        // Opcional: Para verificar los skill totales en consola.
        const skillEquipo1 = equipo1.reduce((total, p) => total + p.skill, 0);
        const skillEquipo2 = equipo2.reduce((total, p) => total + p.skill, 0);
        console.log(`[Balanceador ABBA] Equipos balanceados. Skill T1: ${skillEquipo1}, Skill T2: ${skillEquipo2}`);

        return { equipo1, equipo2 };
    }



    // =========================================================================
    // FIN --- NUEVA LÓGICA DE BALANCEO DE EQUIPOS
    // =========================================================================



    // =================================================================================
    // ASIGNACIÓN DE EVENT LISTENERS Y EJECUCIÓN INICIAL
    // =================================================================================
    // Este bloque se ejecuta una vez que todo el HTML está cargado y listo.

    // --- Declaraciones de constantes ÚNICAS para todo este bloque ---
    const btnGenerar = document.getElementById('btnGenerar');
    const btnLimpiar = document.getElementById('btnLimpiar');
    const btnCompartir = document.getElementById('btnCompartir');
    const btnChangeLanguage = document.getElementById('btnChangeLanguage');
    const esAppAndroid = (window.Android && typeof window.Android.capturarYCompartirDiv === 'function') || window.location.href.startsWith('file:///android_asset/');

    // =======================================================
    // INICIO --- INICIALIZACIÓN DE ANALÍTICA HÍBRIDA (POSTHOG)
    // =======================================================

    const esEntornoAndroidApp = /AndroidApp/i.test(navigator.userAgent);

    // --- Lógica para el entorno de la App Android ---
    if (esEntornoAndroidApp) {
        function esperarInterfazDeAnalitica(intentos = 0) {
            if (window.Android && typeof window.Android.iniciarAnaliticaDesdeKotlin === 'function') {
                console.log("[JS-Analytics] Entorno Android. Pidiendo a Kotlin que inicie PostHog.");
                window.Android.iniciarAnaliticaDesdeKotlin();
                return;
            }
            if (intentos >= 10) {
                console.error("[JS-Analytics] La interfaz `iniciarAnaliticaDesdeKotlin` no fue detectada.");
                return;
            }
            setTimeout(() => esperarInterfazDeAnalitica(intentos + 1), 100);
        }
        esperarInterfazDeAnalitica();

    // --- Lógica para el entorno Web (GitHub Pages, etc.) ---
    } else {
        console.log("[JS-Analytics] Entorno Web detectado. Gestionando Client ID para PostHog.");
        let webClientId = localStorage.getItem('posthog_web_client_id');

        if (!webClientId) {
            // Si no hay ID, creamos uno nuevo y lo guardamos
            webClientId = 'web-' + Date.now() + '-' + Math.random().toString(36).substring(2, 11);
            localStorage.setItem('posthog_web_client_id', webClientId);
            console.log("[JS-Analytics] Nuevo Client ID web creado y guardado:", webClientId);
        } else {
            // Si ya existía un ID, lo reutilizamos
            console.log("[JS-Analytics] Client ID web recuperado:", webClientId);
        }

        // Iniciamos la analítica con el ID (nuevo o recuperado)
        iniciarAnalitica(webClientId, true);
    }

    // =======================================================
    // FIN --- INICIALIZACIÓN DE ANALÍTICA HÍBRIDA
    // =======================================================


    const languageOrder = ['en', 'es', 'pt-BR', 'pt-PT', 'de', 'fr', 'it', 'pl', 'ru', 'zh-CN', 'ko', 'ja', 'tr']; // Define el orden del ciclo de idiomas

    // !--- NUEVA LÓGICA DE INICIALIZACIÓN DE AUDIO ---!
    // Si NO es la app de Android, preparamos el audio para la web.
    if (!esAppAndroid) {
        inicializarAudioWeb();
    }
    // !---------------------------------------------!

    // --- Asignación de Listeners a los botones y elementos interactivos ---
    todosLosMapas.forEach(mapa => mapa.addEventListener('click', handleClicMapa));
    botonesCategoria.forEach(boton => boton.addEventListener('click', handleClicBotonCategoria));
    btnGenerar.addEventListener('click', () => { generarEquipos(); });
    btnLimpiar.addEventListener('click', () => { limpiarResultados(); });

    // --- Lógica del botón Compartir (Híbrida: Android/Web) ---
    btnCompartir.addEventListener('click', () => {
        playSound('share');
        const elementoACapturar = document.getElementById('result');
        if (elementoACapturar.classList.contains('invisible')) {
            // 1. Obtén el idioma actual de la página
            const idiomaActual = document.documentElement.lang || 'en';
            // 2. Busca la traducción correspondiente en tu objeto de traducciones
            const mensajeAlerta = translations[idiomaActual].alert_generate_first;
            // 3. Muestra el alert con el mensaje traducido
            alert(mensajeAlerta); playSound('error');
            return;
        }
        const idiomaActual = document.documentElement.lang || 'en';
        btnCompartir.textContent = translations[idiomaActual].generating;
        btnCompartir.disabled = true;

        if (esAppAndroid) {
            console.log("Entorno Android detectado. Usando captura nativa.");
            elementoACapturar.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(() => {
                window.Android.capturarYCompartirDiv();
            }, 300);
        } else {
            console.log("Entorno Web detectado. Usando html2canvas.");
            elementoACapturar.scrollIntoView({ block: 'start' });
            setTimeout(() => {
                html2canvas(elementoACapturar, {
                    scale: 2,
                    backgroundColor: '#1E2328',
                    onclone: (clonedDoc) => new Promise(resolve => setTimeout(resolve, 50))
                }).then(canvas => {
                    canvas.toBlob(function(blob) {
                        const archivo = new File([blob], "resultado_equipos.png", { type: "image/png" });
                        const datosCompartir = {
                            title: 'Equipos Generados - CS2',
                            text: '¡Mira los equipos que generé para la partida!',
                            files: [archivo]
                        };
                        if (navigator.canShare && navigator.canShare({ files: [archivo] })) {
                            navigator.share(datosCompartir).catch(console.error);
                        } else {
                            const link = document.createElement('a');
                            link.download = 'resultado_equipos.png';
                            link.href = URL.createObjectURL(blob);
                            link.click();
                            URL.revokeObjectURL(link.href);
                        }
                    }, 'image/png');
                }).finally(() => {
                    restaurarBotonCompartir();
                });
            }, 300);
        }
    });

    // --- Lógica de carga inicial y del botón de idioma ---
    if (!esAppAndroid) {
        // Esta lógica solo se ejecuta en la versión WEB

        // 1. Mostrar y configurar el botón de cambio de idioma
        btnChangeLanguage.classList.remove('invisible');
        btnChangeLanguage.addEventListener('click', () => {
            playSound('language');
            const currentLang = document.documentElement.lang || 'en';
            const currentIndex = languageOrder.indexOf(currentLang);
            const nextIndex = (currentIndex + 1) % languageOrder.length;
            const nextLang = languageOrder[nextIndex];
            changeLanguage(nextLang);
        });

        // 2. Determinar el idioma inicial para la web
        const preferredLanguage = localStorage.getItem('preferredLanguage');
        const fullBrowserLang = navigator.language; // ej: 'pt-BR', 'es-ES'
        const prefixBrowserLang = fullBrowserLang.split('-')[0]; // ej: 'pt', 'es'
        let initialLanguage = 'en'; // Fallback por defecto

        if (preferredLanguage && translations[preferredLanguage]) {
            initialLanguage = preferredLanguage;
        } else if (translations[fullBrowserLang]) { // Prioridad 1: Comprobar código completo (pt-BR)
            initialLanguage = fullBrowserLang;
        } else if (translations[prefixBrowserLang]) { // Prioridad 2: Comprobar prefijo (es, fr, de...)
            initialLanguage = prefixBrowserLang;
        }
        // Aplica el idioma solo en la web; en Android, la app lo hará explícitamente.
        changeLanguage(initialLanguage);

    }

    // --- Inicialización final de la UI ---
    seleccionarCategoria('premier');
    actualizarEstadoBotones();

    const idiomaInicial = localStorage.getItem('preferredLanguage') || 'en';
    console.log(`[JS] Aplicando traducción inicial para el idioma: ${idiomaInicial}`);
    changeLanguage(idiomaInicial);

}); // <-- AQUÍ TERMINA EL DOMCONTENTLOADED


// =========================================================================
// INICIO --- FUNCIONES GLOBALES (Accesibles desde cualquier parte, incluido Android)
// =========================================================================

function restaurarBotonCompartir() {
    const btnCompartir = document.getElementById('btnCompartir');
    if (btnCompartir) {
        const idiomaActual = document.documentElement.lang || 'en';
        btnCompartir.innerHTML = translations[idiomaActual].share;
        btnCompartir.disabled = false;
    }
}

function changeLanguage(languageCode) {
    if (!translations[languageCode]) return;

    const dictionary = translations[languageCode];
    const metaDescription = document.querySelector('meta[name="description"]');
    document.documentElement.lang = languageCode;
    if (metaDescription) {
        metaDescription.setAttribute('content', dictionary.meta_description);
    }

    const btnChangeLanguage = document.getElementById('btnChangeLanguage');
    if (btnChangeLanguage) {
        btnChangeLanguage.textContent = languageCode.toUpperCase();
    }

    // Traduce todos los elementos que lo requieran
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (dictionary[key]) {
            el.innerHTML = dictionary[key];
        }
    });
    document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
        const key = el.getAttribute('data-translate-placeholder');
        if (dictionary[key]) {
            el.placeholder = dictionary[key];
        }
    });

    // Traduce el info-container
    document.getElementById('info_subtitle').innerHTML = dictionary.info_subtitle;
    document.getElementById('info_how_it_works_title').innerHTML = dictionary.info_how_it_works_title;
    document.getElementById('info_instruction_1').innerHTML = dictionary.info_instruction_1;
    document.getElementById('info_instruction_2').innerHTML = dictionary.info_instruction_2;
    document.getElementById('info_instruction_3').innerHTML = dictionary.info_instruction_3;
    document.getElementById('info_instruction_4').innerHTML = dictionary.info_instruction_4;
    document.getElementById('info_instruction_5').innerHTML = dictionary.info_instruction_5;
    document.getElementById('info_instruction_6').innerHTML = dictionary.info_instruction_6;

    // Guarda la preferencia para futuras visitas (SOLO SI NO ES ANDROID)
    const esAppAndroid = window.Android && typeof window.Android.capturarYCompartirDiv === 'function';
    if (!esAppAndroid) {
        localStorage.setItem('preferredLanguage', languageCode); // <-- LLAMADA PROTEGIDA
    }

    // Actualiza el texto del botón compartir si ya es visible.
    const btnCompartir = document.getElementById('btnCompartir');
    if (!btnCompartir.classList.contains('invisible') && !btnCompartir.disabled) {
        btnCompartir.innerHTML = dictionary.share;
    }
    const btnDiscord = document.getElementById('discord-link');
    if (btnDiscord) {
        const langPrefix = languageCode.split('-')[0];
        // Mostramos el botón de Discord si el idioma es español, inglés o portugués
        if (languageCode === 'es' || languageCode === 'en' || languageCode.toLowerCase() === 'pt-br') {
            btnDiscord.classList.remove('no-mostrar');
        } else {
            btnDiscord.classList.add('no-mostrar');
        }
    }
}
