let grid_size = 50;
let num_dots = 250;
let infection_chance = 0.5;
let recovery_time = 200;
let infection_distance = 15;
let frame_rate = 30;
let mortality_rate = 0.2;
let inoculation_rate = 0.1;
let inoculation_efficacy = 0.5;

let dots = [];
let infected = [];
let inoculated = [];
let immune = [];
let recovered = [];
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
    inoculated = [];
    immune = [];
    recovered = [];
    dead = [];
    infection_timers = [];
    
    initializeSimulation();
    frameRate(frame_rate);
}

function initializeSimulation() {
    for (let i = 0; i < num_dots; i++) {
        dead.push(false);  

        if (i == 0) {
            inoculated.push(false);
        } else {
            inoculated.push(random() < inoculation_rate);
        }

        if (inoculated[i]) {
            immune.push(random() < inoculation_efficacy);
        } else {
            immune.push(false);
        }

        if (i == 0) {
            color = 'red';
        } else {
            color = inoculated[i] ? 'blue' : 'black';
        }

        let position = createVector(random(width), random(height));
        dots.push({ position: position, color: color });
        if (i == 0) {
            infected.push(true);
            infection_timers.push(recovery_time);
        } else {
            infected.push(false);
            infection_timers.push(0);
        }
    }
}

function updateCounters() {
    let healthyInoculatedCount = 0;
    let healthyNotInoculatedCount = 0;
    let infectedCount = 0;
    for (let i = 0; i < infected.length; i++) {
        if (infected[i] && !dead[i]) {
            infectedCount++;
        }
    }
    let recoveredCount = recovered.filter(rec => rec).length;
    let deadCount = dead.filter(d => d).length;

    for (let i = 0; i < dots.length; i++) {
        if (!infected[i] && !recovered[i] && !dead[i]) {
            if (inoculated[i]) {
                healthyInoculatedCount++;
            } else {
                healthyNotInoculatedCount++;
            }
        }
    }

    document.getElementById('healthy-inoculated-counter').innerText = healthyInoculatedCount;
    document.getElementById('healthy-not-inoculated-counter').innerText = healthyNotInoculatedCount;
    document.getElementById('infected-counter').innerText = infectedCount;
    document.getElementById('recovered-counter').innerText = recoveredCount;
    document.getElementById('dead-counter').innerText = deadCount;
}



function draw() {
    background(220);
    updateCounters();

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
                    dots[i].color = 'gray';
                } else {
                    infected[i] = false;
                    recovered[i] = true;
                    immune[i] = true;
                    dots[i].color = 'green';
                }
            }
        }

        if (!infected[i] && !immune[i] && !dead[i] && !recovered[i]) {
            for (let j = 0; j < dots.length; j++) {
                if (infected[j] && !dead[j] && dist(dots[i].position.x, dots[i].position.y, dots[j].position.x, dots[j].position.y) < infection_distance) {
                    if (random() < infection_chance) {
                        infected[i] = true;
                        dots[i].color = 'red';
                        infection_timers[i] = recovery_time;
                        break;
                    }
                }
            }
        }
    }
}

