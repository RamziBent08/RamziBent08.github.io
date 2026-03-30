const canvas = document.getElementById("turtle");
const ctx = canvas.getContext("2d");

// Oggetto che gestisce lo stato e i movimenti della "tartaruga" sul canvas
const turtle = {
    x: 0,
    y: 0,
    angle: 0,
    pendown: true,
    color: "lightblue",
    name: "tartaruga",
    // Ruota la direzione della tartaruga di un angolo 'a'
    turn: (a) => {
        turtle.angle += a;
    },
    // Muove la tartaruga in avanti di 'p' pixel disegnando una linea se la penna è giù
    forward: (p) => {
        ctx.moveTo(turtle.x, turtle.y);
        let x2 = turtle.x + p * Math.cos(turtle.angle * (Math.PI / 180));
        let y2 = turtle.y + p * Math.sin(turtle.angle * (Math.PI / 180));

        if (turtle.pendown === true) {
            ctx.lineTo(x2, y2);
            ctx.stroke();
        } else {
            ctx.moveTo(x2, y2);
        }
        turtle.x = x2;
        turtle.y = y2;
    },
    // Sposta la posizione della tartaruga senza ruotarla
    move: (x, y) => {
        turtle.x = turtle.x + x;
        turtle.y = turtle.y + y;
        ctx.moveTo(turtle.x, turtle.y);
    }
}

// Recupera la stringa della funzione inserita dall'utente nell'input HTML
function recuperaValore() {
    return document.getElementById("funzione").value;
}

// Analizza la stringa del polinomio e calcola il valore di Y per una data X
function calcolaPolinomio(polinomioStr, x) {
    polinomioStr = polinomioStr.replace(/\s/g, '');
    if (polinomioStr[0] !== '+' && polinomioStr[0] !== '-') {
        polinomioStr = '+' + polinomioStr;
    }
    const termini = polinomioStr.match(/[+-][^+-]+/g);
    let risultato = 0;

    if (!termini) return 0;

    termini.forEach(termine => {
        let coefficiente = 1;
        let esponente = 0;

        if (termine.includes('x')) {
            const parti = termine.split('x');
            if (parti[0] === '+' || parti[0] === '') coefficiente = 1;
            else if (parti[0] === '-') coefficiente = -1;
            else coefficiente = parseFloat(parti[0]);

            if (parti[1] === '') esponente = 1;
            else esponente = parseInt(parti[1]);
        } else {
            coefficiente = parseFloat(termine);
            esponente = 0;
        }
        risultato += coefficiente * Math.pow(x, esponente);
    });
    return risultato;
}

// Genera un colore esadecimale casuale per ogni nuova funzione disegnata
function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Cicla sui punti del piano e disegna la funzione matematica sul canvas
function disegnafunzione() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scalaX = 100;
    const scalaY = 100;

    ctx.beginPath();
    ctx.strokeStyle = getRandomColor();
    ctx.lineWidth = 2;
    
    for (let i = -1000; i <= 1000; i++) {
        const y = calcolaPolinomio(recuperaValore(), i / scalaX);
        const canvasX = centerX + i;
        const canvasY = centerY - (y * scalaY);

        if (i === -1000) {
            ctx.moveTo(canvasX, canvasY);
        } else {
            ctx.lineTo(canvasX, canvasY);
        }
    }
    ctx.stroke();
}

// Disegna gli assi cartesiani (X e Y) centrali
function disegnaAssi() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    ctx.strokeStyle = "#999";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.stroke();
}

// Pulisce il canvas e ridisegna griglia ed assi
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    disegnagriglia();
    disegnaAssi();
}

// Crea la griglia di sfondo per facilitare la lettura del grafico
function disegnagriglia() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scalaX = 100;
    const scalaY = 100;
    ctx.strokeStyle = "#e0e0e0";
    ctx.lineWidth = 0.5;
    for (let i = -10; i <= 10; i++) {
        const canvasX = centerX + i * scalaX;
        const canvasY = centerY + i * scalaY;
        
        ctx.beginPath();
        ctx.moveTo(canvasX, 0);
        ctx.lineTo(canvasX, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, canvasY);
        ctx.lineTo(canvas.width, canvasY);
        ctx.stroke();
    }
}

// Inizializzazione automatica al caricamento
disegnagriglia();
disegnaAssi();
