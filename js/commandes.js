window.ledState = false;

window.toggleLED = function () {
    window.ledState = !window.ledState;

    // Pour ESP32 :
    // fetch('/toggleLED', { method: 'POST' });

    document.getElementById("ledState").innerText = window.ledState ? "ON" : "OFF";
};
