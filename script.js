// get access to full canvas functionality
const canvas = document.getElementById('canvas33');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particles = [];
let hue = 0;

// event listener for canvas to cover all browser sizes
window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

// create custom object ffor desired x & y coordinates
let mouse = {
    x: undefined,
    y: undefined
}

// add event listeners to perform required actions 
canvas.addEventListener('click', function(e){
    mouse.x = e.x;
    mouse.y = e.y;
    for(let i = 0; i < 6; i++){
        particles.push(new Particle())
    }
})

canvas.addEventListener('mousemove', function(e){
    mouse.x = e.x;
    mouse.y = e.y;
    for(let i = 0; i < 9; i++){
        particles.push(new Particle())
    }
})


// create a blueprint class object to be copied and updated
class Particle{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        // this.x = Math.random()* canvas.width;
        // this.y = Math.random()* canvas.height;
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl(' + hue  + ', 100%, 50%)';
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size > 0.2){this.size -= 0.1}
    }

    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
    }
}

// loop thru this particle array to display and update them
// function init(){
//     for(let i = 0; i < 100; i++){
//         particles.push(new Particle())
//         if(particles[i].size <= 0.3){
//             particles.splice(i, 1)
//             i--;
//         }
//         console.log(particles.length)
//     }
// }
// init();

function randomParticles(){
    for(let i = 0; i < particles.length; i++){ 
        particles[i].update();
        particles[i].draw();

        for(let j = i; j < particles.length; j++){
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy)
            if(distance < 100){
                ctx.beginPath();
                ctx.strokeStyle = particles[i].color;
                ctx.lineWidth =  0.2;
                ctx.moveTo( particles[i].x,  particles[i].y);
                ctx.lineTo( particles[j].x,  particles[j].y);
                ctx.stroke();
                ctx.closePath()
            }
        }   

        //   if(particles[i].size <= 0.3){
        //     particles.splice(i, 1)
        //     i--;
        // }
    }
}

// build the animate function which would draw and clear our particles   
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = 'rgba(0,0,0,0.02';
    // ctx.fillRect(0, 0, canvas.width, canvas.height)
    randomParticles();
    requestAnimationFrame(animate);
    hue+=3;
}

animate();