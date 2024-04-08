function updateSimulationParameters() {
    num_dots = parseInt(document.getElementById('num-dots').value, 10);
    infection_chance = parseFloat(document.getElementById('infection-rate').value);
    recovery_time = parseInt(document.getElementById('recovery-time').value, 10);
    infection_distance = parseFloat(document.getElementById('infection-distance').value);
    
    setup();
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

