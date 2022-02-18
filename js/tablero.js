// DIBUJA TABLERO CON LA GUILLOTINA 1200*800
function dibujaTablero() {
    var lienzo = document.querySelector("#tablero");
    if (lienzo && lienzo.getContext) { // si existe el canvas y si tiene el método getContext
        tab = lienzo.getContext("2d"); // uso el método getContext para recuperar el contexto del canvas
        if (tab) { // si tenemos contexto dibujamos
            tab.clearRect(0, 0, 1200, 800);
            tab.beginPath();
            tab.fillStyle = "white"; //azul claro
            tab.fillRect(0, 0, 1200, 800);
            // TITULO
            tab.beginPath();
            //tab.moveTo(610, 65);
            tab.textAlign = "left";
            tab.font = "Bold 50pt Segoe UI";
            tab.fillStyle = "black";
            tab.fillText("Guillotinado", 610, 65);
            // PALO IZQUIERDO
            tab.lineWidth = 1;
            tab.strokeStyle = "#252525"; // GRIS BORDES
            tab.fillStyle = "#943a26"; //marron oscuro
            tab.fillRect(60, 60, 50, 620);
            tab.strokeRect(60, 60, 50, 620);
            // PALO DERECHO
            tab.fillRect(360, 60, 50, 620);
            tab.strokeRect(360, 60, 50, 620);
            // PALO ARRIBA GRANDE
            tab.fillRect(20, 10, 430, 60);
            tab.strokeRect(20, 10, 430, 60);
            // PALO ABAJO GRANDE
            tab.fillRect(20, 700, 1160, 99);
            tab.strokeRect(20, 700, 1160, 99);
            // PALO ARRIBA CHICO
            tab.fillStyle = "#bf4928"; //marron claro
            tab.fillRect(45, 70, 380, 20);
            tab.strokeRect(45, 70, 380, 20);
            // PALO ABAJO CHICO
            tab.fillRect(45, 680, 380, 20);
            tab.strokeRect(45, 680, 380, 20);
            // GRILLETES
            dibujaGrilletes();
            // GANCHO IZQUIERDO
            tab.beginPath();
            tab.lineWidth = 11;
            tab.strokeStyle = "#cdcdcd"; //gris oscuro
            tab.arc(57, 590, 17, 1.4, 4.9);
            tab.stroke();
            // SOGA ATADA
            tab.beginPath();
            tab.strokeStyle = "#efa92a"; //amarillo
            tab.moveTo(30, 71);
            tab.lineTo(50, 600);
            tab.lineTo(28, 598);
            tab.moveTo(55, 590);
            tab.lineTo(28, 589);
            tab.moveTo(55, 576);
            tab.lineTo(28, 580);
            tab.lineTo(5, 620);
            tab.lineWidth = 8;
            tab.stroke();
            // INFO ERRORES
            tab.beginPath();
            tab.lineWidth = 5;
            tab.strokeStyle = "#252525"; // GRIS BORDES
            tab.fillStyle = "green";
            tab.font = "Bold 18pt Segoe UI";
            tab.fillStyle = "black";
            tab.fillText("Errores:", 500, 140);
            tab.fillText("Tiempo:", 830, 140);
            // LETRAS FALLADAS
            tab.fillText("Letras falladas:", 500, 300);
            // CUCHILLA
            dibujaCuchilla(0);
        }
    }
}

function dibujaCuchilla(valorY) {
    if (valorY !== 0) {
        tab.beginPath();
        tab.fillStyle = "white";
        tab.fillRect(110, 90, 250, 100 + valorY);
    }
    // CUCHILLA
    tab.beginPath();
    tab.lineWidth = 1;
    tab.fillStyle = "#bf4928"; //marron claro
    tab.fillRect(110, 130 + valorY, 250, 50);
    tab.strokeRect(110, 130 + valorY, 250, 50);
    tab.moveTo(115, 181 + valorY);
    tab.lineTo(355, 181 + valorY);
    tab.lineTo(355, 215 + valorY);
    tab.lineTo(115, 245 + valorY);
    tab.fillStyle = "#cdcdcd"; //gris oscuro
    tab.fill();
    tab.beginPath();
    tab.moveTo(115, 245 + valorY);
    tab.lineTo(355, 215 + valorY);
    tab.lineTo(355, 225 + valorY);
    tab.lineTo(115, 255 + valorY);
    tab.fillStyle = "#e8e8e8"; //gris claro
    tab.fill();
    // CUCHILLA-TORNILLOS
    tab.beginPath();
    tab.arc(135, 170 + valorY, 5, 0, 2 * 3.14);
    tab.arc(200, 170 + valorY, 5, 0, 2 * 3.14);
    tab.arc(265, 170 + valorY, 5, 0, 2 * 3.14);
    tab.arc(335, 170 + valorY, 5, 0, 2 * 3.14);
    tab.fill();
    // CUCHILLA - GANCHO
    tab.beginPath();
    tab.lineWidth = 11;
    tab.strokeStyle = "#cdcdcd"; //gris oscuro
    tab.arc(232, 130 + valorY, 17, 3.2, 6.3);
    tab.stroke();
    // CUCHILLA - SOGA
    tab.beginPath();
    tab.strokeStyle = "#efa92a"; //amarillo
    tab.moveTo(232, 91);
    tab.lineTo(232, 120 + valorY);
    tab.lineWidth = 8;
    tab.stroke();
    // CABEZA
    dibujaGrilletes();
    dibujaCabeza();
}

function dibujaCabeza(muerto) {

    if (!muerto) {
        // VIVO
        tab.beginPath();
        tab.arc(235, 615, 40, 0, 2 * 3.14);
        tab.lineWidth = 5;
        tab.stroke();
        tab.fillStyle = "white";
        tab.fill();
        tab.beginPath();
        tab.fillStyle = "black";
        tab.arc(220, 612, 5, 0, 2 * 3.14);
        tab.fill();
        tab.beginPath();
        tab.arc(250, 612, 5, 0, 2 * 3.14);
        tab.fill();
        tab.beginPath();
        tab.moveTo(220, 635);
        tab.lineTo(250, 635);
        tab.stroke();
    } else {
        // MUERTO
        tab.beginPath();
        tab.fillStyle = "#cdcdcd"; //gris oscuro 
        tab.fillRect(111, 611, 246, 8);
        tab.fill();
        dibujaGrilletes();
        tab.beginPath();
        tab.fillStyle = "#cdcdcd"; //gris oscuro    
        tab.strokeStyle = "black";
        tab.lineWidth = 2;
        tab.arc(235, 615, 35, 0, 2 * 3.14);
        tab.fill();
        tab.stroke();
        tab.beginPath();
        tab.fillStyle = "#cdcdcd"; //gris oscuro 
        tab.fillRect(180, 611, 110, 8);
        tab.fill();
        //CABEZA CORTADA
        tab.beginPath();
        tab.fillStyle = "white";
        tab.rotate(0.20);
        tab.arc(235 + 120, 615, 40, 0, 2 * 3.14);
        tab.fill();
        tab.lineWidth = 4;
        tab.stroke();        
        tab.beginPath();
        tab.font = "Bold 14pt Arial";
        tab.fillStyle = "black";
        tab.fillText("X", 220 + 120, 612);
        tab.fillText("X", 250 + 120, 612);
        tab.beginPath();
        tab.moveTo(220 + 120, 635);
        tab.lineTo(250 + 120, 635);
        tab.stroke();
        tab.rotate(-0.20);
    }
}
function dibujaGrilletes() {
    // GRILLETES
    tab.lineWidth = 1;
    tab.strokeStyle = "#252525"; // GRIS BORDES
    tab.fillStyle = "#943a26"; //marron oscuro
    tab.beginPath();
    tab.fillStyle = "#bf4928"; //marron claro
    tab.fillRect(110, 560, 250, 50);
    tab.strokeRect(110, 560, 250, 50);
    tab.fillRect(110, 620, 250, 50);
    tab.strokeRect(110, 620, 250, 50);
    // MANOS
    tab.beginPath();
    tab.fillStyle = "white";
    tab.lineWidth = 5;
    tab.arc(155, 615, 15, 0, 2 * 3.14);
    tab.stroke();
    tab.fill();
    tab.beginPath();
    tab.arc(315, 615, 15, 0, 2 * 3.14);
    tab.stroke();
    tab.fill();
}