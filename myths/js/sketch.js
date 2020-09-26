let Y_AXIS = 1;
let X_AXIS = 2;
let w1, w2, c1, c2;
let stars = [];
let wisps = [];

class Star {
    constructor(x, y) {
        this.x = Math.random() * window.innerWidth; //randomly position x within window
        this.y = Math.random() * window.innerHeight; //randomly position y within window
        this.radius = Math.random() * 3.0;
    }
}

//populate star array with star positions in sky
for (let i = 0; i < 600; i += 40) {
    for (let j = 0; j < 600; j += 40) {
        let t = new Star(i, j);
        stars.push(t);
    }
}

//initialize canvas
function setup() {
    let myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent('#sketch');
    noStroke();

    c1 = color('#010326');
    c2 = color('#000064');

    fog1 = color(('rgba(189, 237, 255, 0.0)'));
    fog2 = color(('rgba(189, 237, 255, 0.9)'));

    w1 = color('#06c9f9');
    w2 = color('#0071f1');

    wisp = new Wisp(random(width), -40);

}

//dynamically update scene
function draw() {
    //Background
    //background(c1); //set just basic color no gradient
    setGradient(0,0, width, height, c1, c2, Y_AXIS);

    noStroke();

    //draw stars
    fill(255); //white

    for (star of stars) {
        ellipse(star.x, star.y, star.radius, star.radius);
    }


    /* First attempt at filling array, created WAY too many
    for (let i = 0; i < 10; i++) {
        wisps[i] = wisps.push(new Wisp(random(width), random(height), random(20,50)));
    }
    */

    //create wisps in array from random grab
    if (random(1) < 0.08) {
        wisps.push(new Wisp(random(width), random(height), random(20,50))); //x position, y position, scaling factor
    }

    //draw wisps -- copy from back to front
    for (let i = wisps.length - 1; i >= 0; i--) {
        wisps[i].update();
        wisps[i].show();

        // if dead then remove from wisp array
        if (wisps[i].done()) {
            wisps.splice(i, 1);
        }
    }

    //draw foreground foggy element
    setGradient(0, innerHeight/2, width, height / 1.75, fog1, fog2, Y_AXIS);
}

function setGradient(x, y, w, h, c1, c2, axis) {
    //from p5 js demo on linear gradients
    noFill();

    if (axis === Y_AXIS) {
        // Top to bottom gradient
        for (let i = y; i <= y + h; i++) {
            let inter = map(i, y, y + h, 0, 1);
            let c = lerpColor(c1, c2, inter);
            stroke(c);
            line(x, i, x + w, i);
        }
    } else if (axis === X_AXIS) {
        // Left to right gradient
        for (let i = x; i <= x + w; i++) {
            let inter = map(i, x, x + w, 0, 1);
            let c = lerpColor(c1, c2, inter);
            stroke(c);
            line(i, y, i, y + h);
        }
    }
}

function Wisp(x, y, factor) { //x position, y position, scaling factor
    //todo add brownian motion to these! randomized acceleration on each step, add or subtract a little from the velocity at each step also
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(0.25, 0.25)); //randomize velocity
    this.acc = createVector(0, 0); //do not accelerate
    this.lifespan = height * 1.5; //set lifespan of wisp

    this.update = function () {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.lifespan--;
    }

    this.show = function () {

        //halo
        fill(color('rgba(47, 169, 233, 0.5)'));
        ellipse(this.pos.x, this.pos.y + 4, factor * 1.75, factor * 1.75);
        //filter(BLUR, 7);


        //body
        fill(color('rgba(1, 116, 228, 0.7)'));
        ellipse(this.pos.x, this.pos.y + 27, (factor / 6 * 2), (factor / 6 * 3) + 3);

        //head flame
        fill(color('rgba(1, 116, 228, 0.5)'));
        ellipse(this.pos.x, this.pos.y, (factor / 3 * 2), (factor / 2 * 2) + 9);
        fill(color('rgba(4, 175, 248, 0.62)'));
        ellipse(this.pos.x, this.pos.y + 13, (factor / 6 * 3), (factor / 6 * 3) + 3);
        fill(color('rgba(1, 116, 228, 0.8)'));
        ellipse(this.pos.x, this.pos.y + 20, (factor / 3), (factor / 8 * 3));

        //eyes
        fill(color('rgba(47, 169, 233, 0.9)'));
        ellipse(this.pos.x - 5, this.pos.y + 20, 4 , 4);
        fill(color('rgba(47, 169, 233, 0.9)'));
        ellipse(this.pos.x + 5, this.pos.y + 20, 4 , 4);
    }

    // is it dead?
    this.done = function () {
        if (this.lifespan < 0) {
            return true;
        } else {
            return false;
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}




