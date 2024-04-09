let grid_size = 50;
let num_dots = 250;
let infection_chance = 0.5;
let recovery_time = 300;
let infection_distance = 15;
let frame_rate = 30;
let mortality_rate = 0.2;

let dots = [];
let infected = [];
let immune = [];
let dead = [];
let infection_timers = [];

let canvas;

function setup() {
    if (canvas) {
        clear();
    } else {
        canvas = createCanvas(400, 400);
    }
    background(220);

    dots = [];
    infected = [];
    infection_timers = [];
    
    initializeSimulation();
    frameRate(frame_rate);
}

function initializeSimulation() {
    for (let i = 0; i < num_dots; i++) {
        let color = i == 0 ? 'red' : 'blue';
        let position = createVector(random(width), random(height));
        dots.push({ position: position, color: color });
        if (i == 0) {
            infected.push(true);
            infection_timers.push(recovery_time);
        } else {
            infected.push(false);
            infection_timers.push(0);
        }
        if (i == 0) {
            immune.push(false);
            dead.push(false);
        } else {
            immune.push(false);
            dead.push(false);
        }
    }
}

function draw() {
    background(220);
    for (let i = 0; i < dots.length; i++) {
        if (!dead[i]) {
            let movement = createVector(random(-1, 1), random(-1, 1));
            dots[i].position.add(movement);

            dots[i].position.x = constrain(dots[i].position.x, 0, width);
            dots[i].position.y = constrain(dots[i].position.y, 0, height);
        }

        fill(dots[i].color);
        noStroke();
        ellipse(dots[i].position.x, dots[i].position.y, 10, 10);
        
        if (infected[i] && infection_timers[i] > 0) {
            infection_timers[i]--;
            if (infection_timers[i] == 0) {
                if (random() < mortality_rate) {
                    dead[i] = true;
                    dots[i].color = 'black';
                } else {
                    infected[i] = false;
                    immune[i] = true;
                    dots[i].color = 'green';
                }
            }
        }

        if (infected[i] && !dead[i]) {
            for (let j = 0; j < dots.length; j++) {
                if (!infected[j] && !immune[j] && !dead[j] && dist(dots[i].position.x, dots[i].position.y, dots[j].position.x, dots[j].position.y) < infection_distance) {
                    if (random() < infection_chance) {
                        infected[j] = true;
                        dots[j].color = 'red';
                        infection_timers[j] = recovery_time;
                    }
                }
            }
        }
    }
}
