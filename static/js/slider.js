function updateSimulationParameters() {
    num_dots = parseInt(document.getElementById('num-dots').value, 10);
    infection_chance = parseFloat(document.getElementById('infection-rate').value);
    recovery_time = parseInt(document.getElementById('recovery-time').value, 10);
    infection_distance = parseFloat(document.getElementById('infection-distance').value);
    frame_rate = parseInt(document.getElementById('frame-rate').value, 10);
    mortality_rate = parseFloat(document.getElementById('mortality-rate').value);
    inoculation_rate = parseFloat(document.getElementById('inoculation-rate').value);
    inoculation_efficacy = parseFloat(document.getElementById('inoculation-efficacy').value);
    resetSimulationState();
    setup();
}

function resetSimulationState() {
    dots = [];
    infected = [];
    inoculated = [];
    immune = [];
    dead = [];
    infection_timers = [];
}

document.getElementById('inoculation-efficacy').oninput = function() {
    document.getElementById('inoculation-efficacy-value').textContent = this.value;
}

document.getElementById('inoculation-rate').oninput = function() {
    document.getElementById('inoculation-rate-value').textContent = this.value;
}

document.getElementById('mortality-rate').oninput = function() {
    document.getElementById('mortality-rate-value').textContent = this.value;
}

document.getElementById('frame-rate').oninput = function() {
    document.getElementById('frame-rate-value').textContent = this.value;
}

document.getElementById('num-dots').oninput = function() {
    document.getElementById('num-dots-value').textContent = this.value;
}

document.getElementById('infection-rate').oninput = function() {
    document.getElementById('infection-rate-value').textContent = this.value;
}


document.getElementById('recovery-time').oninput = function() {
    document.getElementById('recovery-time-value').textContent = this.value;
}

document.getElementById('infection-distance').oninput = function() {
    document.getElementById('infection-distance-value').textContent = this.value;
}

