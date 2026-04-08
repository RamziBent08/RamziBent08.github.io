
let x = 0;           
let y = 0;           
let dentro = 0;       
let spari = 100000;   
let radius = 500;     
let pi = 0;           


const canvas = document.getElementById("turtle");
const ctx = canvas.getContext("2d");


const turtle = {
    x: 0,            
    y: 0,             
    angle: 0,         
    pendown: true,    
    name: "tartaruga",

    
    turn: (a) => {
        turtle.angle += a;
    },

    
    forward: (p) => {
        ctx.moveTo(turtle.x, turtle.y);

        // Calcolo nuova posizione
        var x2 = turtle.x + p * Math.cos(turtle.angle * (Math.PI / 180));
        var y2 = turtle.y + p * Math.sin(turtle.angle * (Math.PI / 180));

        // Se la penna è giù disegna la linea
        if (turtle.pendown === true) {
            ctx.lineTo(x2, y2);
            ctx.stroke();
        } else {
            ctx.moveTo(x2, y2);
        }

        // Aggiorna posizione
        turtle.x = x2;
        turtle.y = y2;
    },

    // Sposta la tartaruga di un offset 
    
    move: (x, y) => {
        this.x = this.x + x;
        this.y = this.y + y;
        ctx.moveTo(this.x, this.y);
    }
};

// Funzione per disegnare un cerchio
let circle = function(x2, y2, radios) {
    ctx.beginPath();
    ctx.arc(x2, y2, radios, 0, 2 * Math.PI); // cerchio completo
    ctx.stroke();
}

// Metodo dei trapezi per approssimare π
let trapezio = function(x) {
    let r = 1;           
    let n = x;           // numero di trapezi
    let h = r / n;       // larghezza di ogni trapezio
    let area = 0;       

    for (let i = 0; i < n; i++) {
        let x0 = i * h;
        let x1 = (i + 1) * h;

        // funzione  semicerchio
        let num = Math.sqrt(r * r - x0 * x0);
        let f1 = Math.sqrt(r * r - x1 * x1);

        // area del trapezio
        area += (num + f1) * h / 2;
    }

    // area del cerchio = 4 * area del quarto di cerchio
    let pi = area * 4;
    console.log(pi); // stampa approssimazione di π
}
let disegnaTrapezi = function(cx, cy, radios, n) {
    let r = 1;
    let h = r / n;

    for (let i = 0; i < n; i++) {
        let x0 = i * h;
        let x1 = (i + 1) * h;

        let f0 = Math.sqrt(r * r - x0 * x0);
        let f1 = Math.sqrt(r * r - x1 * x1);

        // Conversione in coordinate canvas
        let px0 = cx + x0 * radios;
        let px1 = cx + x1 * radios;
        let py0 = cy - f0 * radios;
        let py1 = cy - f1 * radios;
        let pyBase = cy;

        // Disegna il trapezio
        ctx.beginPath();
        ctx.moveTo(px0, pyBase);
        ctx.lineTo(px0, py0);
        ctx.lineTo(px1, py1);
        ctx.lineTo(px1, pyBase);
        ctx.closePath();

        // Riempimento e bordo
        ctx.fillStyle = "rgba(100, 150, 255, 0.3)";
        ctx.fill();
        ctx.strokeStyle = "rgba(100, 150, 255, 0.8)";
        ctx.stroke();
    }
}

// Esecuzione delle funzioni
trapezio(spari);                 // calcola π con molti trapezi
circle(500, 500, 500);           // disegna il cerchio
disegnaTrapezi(500, 500, radius, 20); // disegna i trapezi (pochi per visualizzazione)
