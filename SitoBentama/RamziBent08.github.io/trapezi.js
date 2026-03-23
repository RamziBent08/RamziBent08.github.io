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

let circle = function(x2, y2, radios) {
    ctx.beginPath();
    ctx.arc(x2, y2, radios, 0, 2 * Math.PI);
    ctx.stroke();
}

let trapezio = function(x){
    let r = 1;
    let n = x;
    let h = r / n;
    let area = 0;
    for (let i = 0; i < n ; i++) {
        let x0 =  i * h;
        let x1 = (i + 1) * h;
        let num = Math.sqrt(r * r - x0 * x0);
        let f1 = Math.sqrt(r * r - x1 * x1);
        area+= (num + f1) *h/2;

    }
    let pi = area*4;
    console.log(pi);
}
let disegnaTrapezi = function(cx, cy, radios, n) {
    let r = 1;
    let h = r / n;
    for (let i = 0; i < n; i++) {
        let x0 = i * h;
        let x1 = (i + 1) * h;
        let f0 = Math.sqrt(r * r - x0 * x0);
        let f1 = Math.sqrt(r * r - x1 * x1);

        let px0 = cx + x0 * radios;
        let px1 = cx + x1 * radios;
        let py0 = cy - f0 * radios;
        let py1 = cy - f1 * radios;
        let pyBase = cy;

        ctx.beginPath();
        ctx.moveTo(px0, pyBase);
        ctx.lineTo(px0, py0);
        ctx.lineTo(px1, py1);
        ctx.lineTo(px1, pyBase);
        ctx.closePath();
        ctx.fillStyle = "rgba(100, 150, 255, 0.3)";
        ctx.fill();
        ctx.strokeStyle = "rgba(100, 150, 255, 0.8)";
        ctx.stroke();
    }
}

trapezio(spari);
circle(500,500,500);
disegnaTrapezi(500, 500, radius, 20);
