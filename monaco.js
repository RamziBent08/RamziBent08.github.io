
let x = 0;
let y = 0;
let dentro = 0;        // conta quanti punti sono dentro il cerchio
let spari = 100000;   // numero totale di punti da generare
let radius = 500;     
let pi = 0;           

// Canvas e contesto grafico
const canvas = document.getElementById("turtle");
const ctx = canvas.getContext("2d");

// Oggetto "tartaruga" per disegnare (stile turtle graphics)
const turtle = {
    x: 0,              // posizione X corrente
    y: 0,              // posizione Y corrente
    angle: 0,          // angolo di direzione (in gradi)
    pendown: true,     // se true disegna mentre si muove
    color: "lightblue",
    name: "tartaruga",

    // Ruota la tartaruga di un certo angolo
    turn: (a) => {
        turtle.angle += a;
    },

    // Muove la tartaruga in avanti di p pixel
    forward: (p) => {
        ctx.moveTo(turtle.x, turtle.y);

        // calcolo nuova posizione con trigonometria
        var x2 = turtle.x + p * Math.cos(turtle.angle * (Math.PI / 180));
        var y2 = turtle.y + p * Math.sin(turtle.angle * (Math.PI / 180));

        // se penna giù disegna linea
        if (turtle.pendown === true) {
            ctx.lineTo(x2, y2);
            ctx.stroke();
        } else {
            ctx.moveTo(x2, y2);
        }

        // aggiorna posizione
        turtle.x = x2;
        turtle.y = y2;
    },

    // Sposta la tartaruga senza usare angolo (movimento diretto)
    move: (x, y) => {
        this.x = this.x + x;
        this.y = this.y + y;
        ctx.moveTo(this.x, this.y);
    }
}

// Disegna un quadrato usando la tartaruga
let square = function () {
    turtle.turn(90);
    turtle.forward(1000);
    turtle.turn(-90);
    turtle.forward(1000);
    turtle.turn(-90);
    turtle.forward(1000);
    turtle.turn(-90);
    turtle.forward(1000);
}

// Disegna un punto sul canvas
// nero se dentro il cerchio, giallo se fuori
let drawPoint = function (x, y, isInside) {
    ctx.fillStyle = isInside ? "black" : "yellow";
    ctx.fillRect(x, y, 1, 1);
}

// Disegna un cerchio dato centro e raggio
let circle = function (x2, y2, radios) {
    ctx.beginPath();
    ctx.arc(x2, y2, radios, 0, 2 * Math.PI);
    ctx.stroke();
}

// Funzione principale: stima π con il metodo Monte Carlo
let stima = function (spari) {
    let batchSize = 1000;   // quanti punti disegnare per frame
    let currentPoint = 0;   // contatore punti generati

    // funzione interna che disegna a blocchi (per animazione fluida)
    function drawBatch() {
        for (let i = 0; i < batchSize && currentPoint < spari; i++, currentPoint++) {

            // genera punto casuale nel quadrato 1000x1000
            x = Math.random() * 1000;
            y = Math.random() * 1000;

            // distanza dal centro (500,500)
            let dx = x - 500;
            let dy = y - 500;
            let distance = Math.sqrt(dx * dx + dy * dy);

            // verifica se il punto è dentro il cerchio
            if (distance <= radius) {
                dentro++;
                drawPoint(x, y, true);
            } else {
                drawPoint(x, y, false);
            }
        }

        // formula Monte Carlo per π
        pi = 4 * (dentro / currentPoint);

        // continua finché non finisce
        if (currentPoint < spari) {
            requestAnimationFrame(drawBatch);
        } else {
            // stampa risultato finale
            console.log("Stima finale di π:", pi);
            console.log("Errore:", Math.abs(pi - Math.PI));
        }
    }

    // avvia animazione
    drawBatch();
}

// Esecuzione del programma
square();                  // disegna il quadrato
circle(500, 500, radius); // disegna il cerchio
stima(spari);             // avvia simulazione Monte Carlo
