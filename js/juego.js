// OPCIONES DEL JUEGO
const turnos = 5;
const mins = 2;
const segs = 30;
// ------------------

const pixelesGuillo = 300 / (mins * 60 + segs);
var timer; // = setInterval(temporizador, 1000);
var gano;
var acerto;
var letrasElegidas;
var valorY;
var pista;

function iniciaJuego() {
    clearInterval(timer);
    timer = setInterval(temporizador, 1000);
    btnAgregar.disabled = true;
    pista = false;
    valorY = 0;
    minutos = mins;
    segundos = segs;
    console.log(minutos);
    console.log(segundos);
    acertadas = 0;
    intentos = 0;
    letrasElegidas = [];
    dibujaTablero();
    infoErrores();
    temporizador();

    // SORTEA PALABRA
    categoriaElegida = seleccionaCategoria();
    palabraElegida = seleccionaPalabra(categoriaElegida).toUpperCase();
    tamanioPalabra = cuentaLetras(palabraElegida); // mide el tamanio de la palabra
    coordenadas = dibujaGuiones(palabraElegida); // guarda las coordenadas x de cada letra
    letras = Array.from(palabraElegida);

    // ESCUCHA TECLADO
    teclado = document.querySelector("body");
    teclado.addEventListener("keypress", presionaTecla, false);
}


function dibujaLetras(index) {
    tab.beginPath();
    tab.font = "Bold 30pt Arial";
    tab.textAlign = "center";
    tab.fillStyle = "white";
    tab.fillText(letras[index], coordenadas[index] + 16, 760);
}

// DIBUJA TODOS LOS GUIONES DE LA PALABRA ELEGIDA
// Y DEVUELVE LAS COORDENADAS DE X
function dibujaGuiones(palabra) {
    var coordenadas = [];
    tab.beginPath();
    for (let i = 0; i < tamanioPalabra; i++) {
        tab.lineWidth = 8;
        tab.strokeStyle = "white";
        let x = 50 + i * 48;
        tab.moveTo(x, 770);
        coordenadas.push(x);
        tab.lineTo(86 + i * 48, 770);
        tab.stroke();
    }
    return coordenadas;
}

function limpiaDisplay(color) {
    tab.beginPath();
    tab.fillStyle = color;
    tab.lineWidth = 1;
    tab.fillRect(20, 700, 1160, 99);
    tab.strokeRect(20, 700, 1160, 99);
}

function presionaTecla(event) {
    let hayconcidencia = false;
    let key = event.keyCode || event.which; // codigo de tecla
    let keychar = String.fromCharCode(key).toUpperCase();  // tecla
    // VERIFICAMOS F1
    if (keychar == "0") {
        console.log("0");
        mostrarPista();
        pista = true;
    }
    // VERIFICAMOS QUE LA TECLA PRESIONADA SEA UNA LETRA
    let testRegex = /[a-zA-Z]/;
    if (testRegex.test(keychar)) {
        //VERIFICAMOS QUE NO SEA UNA LETRA REPETIDA
        if (!letrasElegidas.includes(keychar)) {
            // CHEQUEAMOS TODA LA PALABRA
            for (let i = 0; i < tamanioPalabra; i++) {
                if (letras[i] == keychar) {
                    dibujaLetras(i);
                    hayconcidencia = true;
                    acertadas++;
                    if (acertadas == tamanioPalabra) {
                        gana();
                    }
                }
            }
            if (!hayconcidencia) {
                intentos++;
                dibujaLetrasFalladas(keychar, intentos);
                infoErrores();
                //PENALIZACION DE TIEMPO 20s
                segundos = segundos - 20;
                valorY = valorY + (20 * pixelesGuillo);
                dibujaCuchilla(valorY);

                if (segundos < 0 && minutos >= 1) {
                    segundos = segundos + 60;
                    minutos--;
                }
                if (segundos < 0 && minutos == 0) {
                    pierde();
                }
            }
            if (intentos == turnos) {
                pierde();
            }
        }
        letrasElegidas.push(keychar);

    }
}
// DIBUJA LAS LETRAS FALLADAS
function dibujaLetrasFalladas(letra, intentos) {
    let espaciox = intentos * 120;
    let espacioy = 0;
    if (intentos > 5) {
        espacioy = 120;
        espaciox = espaciox - 600;
    }
    tab.beginPath();
    tab.strokeStyle = "#252525"; // GRIS BORDES
    tab.fillStyle = "red";
    tab.strokeRect(400 + espaciox, 320 + espacioy, 100, 100); //INFO ERROR
    tab.fillRect(400 + espaciox, 320 + espacioy, 100, 100); //INFO ERROR
    tab.font = "Bold 30pt Arial";
    tab.textAlign = "center";
    tab.fillStyle = "white";
    tab.fillText(letra, 450 + espaciox, 385 + espacioy);
}

// INFO ERRORES
function infoErrores() {
    tab.beginPath();
    tab.lineWidth = 5;
    tab.strokeStyle = "#252525"; // GRIS BORDES
    tab.fillStyle = "green";
    if (intentos == turnos) {
        tab.fillStyle = "red";
    }
    tab.textAlign = "center";
    tab.strokeRect(500, 150, 280, 100);
    tab.fillRect(500, 150, 280, 100);
    tab.font = "Bold 40pt Segoe UI";
    tab.fillStyle = "white";
    let errores = rellenaceros(intentos) + " de " + rellenaceros(turnos);
    tab.fillText(errores, 635, 220);
}


// TEMPORIZADOR
function temporizador() {
    tab.beginPath();
    tab.fillStyle = "green";
    tab.lineWidth = 5;
    tab.strokeStyle = "#252525"; // GRIS BORDES
    tab.strokeRect(830, 150, 280, 100);
    tab.fillRect(830, 150, 280, 100);
    // DIBUJAMOS CUCHILLA
    tab.beginPath();
    valorY = valorY + pixelesGuillo;
    dibujaCuchilla(valorY);
    // DIBUJAMOS DISPLAY
    tab.beginPath();
    tiempoDisplay = rellenaceros(minutos) + " : " + rellenaceros(segundos);
    tab.textAlign = "center";
    tab.font = "Bold 40pt Segoe UI";
    tab.fillStyle = "white";
    tab.fillText(tiempoDisplay, 972, 220);
    if (segundos == 0 && minutos == 0) {
        tab.fillStyle = "red";
        tab.fillRect(830, 150, 280, 100);
        tab.fillStyle = "white";
        tab.fillText(tiempoDisplay, 972, 220);
        pierde();
    } else {
        if (segundos == 0) {
            segundos = 60;
            minutos--
        }
    }
    segundos--;
}

// PARA DARLE FORMATO DE DOS DIGITOS 
function rellenaceros(numero) {
    if (numero < 10) {
        numero = "0" + numero;
    }
    return numero;
}


function finJuego() {
    btnAgregar.disabled = false;
    teclado.removeEventListener("keypress", presionaTecla);
    clearInterval(timer);
    // DIBUJA CARTEL RESULTADO DEL JUEGO
    tab.beginPath();
    tab.font = "Bold 40pt Consolas";
    tab.textAlign = "center";
    tab.fillStyle = "black";
    tab.fillRect(300, 150, 600, 400);
    tab.lineWidth = 5;
    tab.strokeRect(300, 150, 600, 400);
    if (acerto) {
        tab.fillStyle = "white";
        tab.fillText("¡GANASTE!", 600, 200);
    } else {
        tab.fillStyle = "white";
        tab.fillText("¡PERDISTE!", 600, 200);
    }

    // MOSTRAMOS EL PUNTAJE
    tab.beginPath();
    pts = puntaje();
    tab.font = "Bold 25pt Consolas";
    tab.fillText("Palabra Descubierta: " + pts.palabra + " pts", 600, 280);
    tab.fillText("Uso pista: " + pts.pista + " pts", 600, 320);
    tab.fillText("Tiempo Restante: " + pts.tiempo + " pts", 600, 360);
    tab.fillText("Intentos Restantes: " + pts.vidas + " pts", 600, 400);
    tab.fillText("Letras Acertadas: " + pts.aciertos + " pts", 600, 440);
    tab.font = "Bold 35pt Consolas";
    tab.fillText("Puntaje Total: " + pts.total + " pts", 600, 500);
}

function gana() {
    acerto = true;
    finJuego();
    // REIMPRIME PALABRA
    tab.beginPath();
    limpiaDisplay("green");
    for (let i = 0; i < tamanioPalabra; i++) {
        dibujaLetras(i);
    }
}

function pierde() {
    dibujaCuchilla(400);
    acerto = false;
    finJuego();
    dibujaCabeza(true);
    // REVELAR PALABRA
    tab.beginPath();
    limpiaDisplay("red");
    for (let i = 0; i < tamanioPalabra; i++) {
        dibujaLetras(i);
    }
}

// CALCULA PUNTAJES DE LA PARTIDA
function puntaje() {
    var descPalabra = 0;
    var puntosPista = 0;
    if (acerto) {
        descPalabra = 1000;
    }
    if (pista) {
        puntosPista = -500;
    }
    var puntos = {
        palabra: descPalabra,
        pista: puntosPista,
        vidas: (turnos - intentos) * 200,
        tiempo: (minutos * 60 + segundos) * 10,
        aciertos: acertadas * 20,
        total: descPalabra + puntosPista + (turnos - intentos) * 200 + (minutos * 60 + segundos) * 10 + acertadas * 20
    }
    return puntos;
}


// boton agregar palabras
var regex = /[A-Za-z]/g;
var btnAgregar = document.querySelector("#btnAgregar");
btnAgregar.addEventListener("click", function () {
    var nuevaPalabra = document.querySelector("#nuevaPalabra"); //input
    // VALIDAMOS LA PALABRA INGRESADA
    nuevaPalabra1 = nuevaPalabra.value.match(regex);
    console.log(nuevaPalabra1);
    if (nuevaPalabra1) {
        palabrasUsuario.push(nuevaPalabra1.join(""));
        alert("PALABRA AGREGADA CORRECTAMENTE");
        nuevaPalabra.value = "";
    } else {
        alert("ERROR, NO ES UNA PALABRA VALIDA");
    }
})

// BOSTON START
var btnInicio = document.querySelector("#btnInicio");
btnInicio.addEventListener("click", function () {
    // window.open("tablero.html", "_self")
    iniciaJuego();
})

// BOTON SALIR
var btnInicio = document.querySelector("#btnSalir");
btnSalir.addEventListener("click", function () {
    window.open("index.html", "_self")
})

//MOSTRAR PISTA
function mostrarPista() {
    tab.beginPath();
    tab.lineWidth = 5;
    tab.strokeStyle = "#252525"; // GRIS BORDES
    //   tab.fillStyle = "green";
    tab.font = "Bold 18Pt Segoe UI";
    tab.fillStyle = "black";
    tab.textAlign = "left";
    tab.fillText("Pista:", 500, 640);
    tab.fillText(categoriaElegida[0], 620, 640);
}