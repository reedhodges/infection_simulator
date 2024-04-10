// parameters adjustable by user
let grid_size = 50;
let num_dots = 250;
let infection_chance = 0.5;
let recovery_time = 200;
let infection_distance = 15;
let frame_rate = 30;
let mortality_rate = 0.2;
let inoculation_rate = 0.1;
let inoculation_efficacy = 0.5;

// class to represent each dot
class Dot {
    constructor(index) {
        this.dead = false;
        this.inoculated = index !== 0 && random() < inoculation_rate;
        this.immune = this.inoculated && random() < inoculation_efficacy;
        this.infected = index === 0;
        this.recovered = false;
        this.color = this.getColor();
        this.position = createVector(random(width), random(height));
        this.infectionTimer = this.infected ? recovery_time : 0;
    }

    getColor() {
        if (this.dead) return 'gray';
        if (this.recovered) return 'green';
        if (this.infected) return 'red';
        return this.inoculated ? 'blue' : 'black';
    }

    updatePosition() {
        if (!this.dead) {
            let movement = createVector(random(-1, 1), random(-1, 1));
            this.position.add(movement);
            this.position.x = constrain(this.position.x, 0, width);
            this.position.y = constrain(this.position.y, 0, height);
        }
    }

    checkInfection(dots) {
        if (this.infected && this.infectionTimer > 0) {
            this.infectionTimer--;
            if (this.infectionTimer === 0) {
                if (random() < mortality_rate) {
                    this.dead = true;
                } else {
                    this.infected = false;
                    this.recovered = true;
                    this.immune = true;
                }
                this.color = this.getColor();
            }
        } else if (!this.infected && !this.immune && !this.dead && !this.recovered) {
            dots.forEach(dot => {
                if (dot.infected && !dot.dead && this.position.dist(dot.position) < infection_distance) {
                    if (random() < infection_chance) {
                        this.infected = true;
                        this.infectionTimer = recovery_time;
                        this.color = 'red';
                        return;
                    }
                }
            });
        }
    }

    draw() {
        fill(this.color);
        noStroke();
        ellipse(this.position.x, this.position.y, 10, 10);
    }
}

let dots = [];
let canvas;

function setup() {
    canvas = createCanvas(400, 400);
    background(220);
    dots = [];
    for (let i = 0; i < num_dots; i++) {
        dots.push(new Dot(i));
    }
    frameRate(frame_rate);
}

function draw() {
    background(220);
    dots.forEach(dot => {
        dot.updatePosition();
        dot.checkInfection(dots);
        dot.draw();
    });
    updateCounters();
}

// helper function to update the counters in the HTML
function updateCounters() {
    let healthyInoculatedCount = 0;
    let healthyNotInoculatedCount = 0;
    let infectedCount = 0;
    let recoveredCount = 0;
    let deadCount = 0;

    dots.forEach(dot => {
        if (!dot.infected && !dot.recovered && !dot.dead) {
            if (dot.inoculated) {
                healthyInoculatedCount++;
            } else {
                healthyNotInoculatedCount++;
            }
        }
        if (dot.infected && !dot.dead) infectedCount++;
        if (dot.recovered) recoveredCount++;
        if (dot.dead) deadCount++;
    });

    document.getElementById('healthy-inoculated-counter').innerText = healthyInoculatedCount;
    document.getElementById('healthy-not-inoculated-counter').innerText = healthyNotInoculatedCount;
    document.getElementById('infected-counter').innerText = infectedCount;
    document.getElementById('recovered-counter').innerText = recoveredCount;
    document.getElementById('dead-counter').innerText = deadCount;
}