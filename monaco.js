let x =0;
let y =0;
let dentro = 0;
let spari=100000;
let radius = 500;
let pi=0;
const canvas = document.getElementById("turtle");
const ctx = canvas.getContext("2d");
const turtle = {
    x:0,
    y: 0,
    angle: 0,
    pendown: true,
    color: "lightblue",
    name: "tartaruga",
    turn:(a)=>{
        turtle.angle+=a;
    },
    forward:(p)=>{
        ctx.moveTo(turtle.x,turtle.y);
        var x2 = turtle.x + p * Math.cos(turtle.angle*(Math.PI/180));
        var y2 = turtle.y + p * Math.sin(turtle.angle*(Math.PI/180));
        
        if(turtle.pendown === true){
            ctx.lineTo(x2,y2);
            ctx.stroke();
        }else{
            ctx.moveTo(x2,y2);
        }
        turtle.x=x2;
        turtle.y=y2;
    } , 
    move:(x,y)=>{
        this.x = this.x+x;
        this.y = this.y+y;
        ctx.moveTo(this.x,this.y);

    }
}

let square = function(){
    turtle.turn(90);
    turtle.forward(1000);
    turtle.turn(-90);
    turtle.forward(1000);
    turtle.turn(-90);
    turtle.forward(1000);
    turtle.turn(-90);
    turtle.forward(1000);

}

let drawPoint = function(x, y, isInside) {
    ctx.fillStyle = isInside ? "black" :"yellow" ;
    ctx.fillRect(x, y, 1, 1);
}
let circle = function(x2, y2, radios) {
    ctx.beginPath();
    ctx.arc(x2, y2, radios, 0, 2 * Math.PI);
    ctx.stroke();
}


let stima = function(spari) {
    let batchSize = 1000;
    let currentPoint = 0;
    
    function drawBatch() {
        for (let i = 0; i < batchSize && currentPoint < spari; i++, currentPoint++) {
            x = Math.random() * 1000;
            y = Math.random() * 1000;
            
           
            let dx = x - 500;
            let dy = y - 500;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance <= radius) {
                dentro++;
                drawPoint(x, y, true);
            } else {
                drawPoint(x, y, false);
            }
        }
        pi = 4 * (dentro / currentPoint);
        if (currentPoint < spari) {
            requestAnimationFrame(drawBatch);
        } else {
            console.log("Stima finale di π:", pi);
            console.log("Errore:", Math.abs(pi - Math.PI));
        }

    }
    
    drawBatch();
}

    


square();
circle(500,500,radius);
stima(spari);
