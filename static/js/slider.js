// Hhlper function to read and parse values from input elements
function readValue(id, parseFunc = parseFloat) {
    return parseFunc(document.getElementById(id).value);
}

// attaches an oninput event listener to an element that updates the corresponding value display
function attachValueUpdater(inputId, displayId) {
    document.getElementById(inputId).oninput = function() {
        document.getElementById(displayId).textContent = this.value;
    };
}

function updateSimulationParameters() {
    num_dots = readValue('num-dots', parseInt);
    infection_chance = readValue('infection-rate');
    recovery_time = readValue('recovery-time', parseInt);
    infection_distance = readValue('infection-distance');
    frame_rate = readValue('frame-rate', parseInt);
    mortality_rate = readValue('mortality-rate');
    inoculation_rate = readValue('inoculation-rate');
    inoculation_efficacy = readValue('inoculation-efficacy');
    setup();
}

attachValueUpdater('inoculation-efficacy', 'inoculation-efficacy-value');
attachValueUpdater('inoculation-rate', 'inoculation-rate-value');
attachValueUpdater('mortality-rate', 'mortality-rate-value');
attachValueUpdater('frame-rate', 'frame-rate-value');
attachValueUpdater('num-dots', 'num-dots-value');
attachValueUpdater('infection-rate', 'infection-rate-value');
attachValueUpdater('recovery-time', 'recovery-time-value');
attachValueUpdater('infection-distance', 'infection-distance-value');