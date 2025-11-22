window.initMesures = function () {

    let temperature = 25.0;
    let humidity = 50.0;
    let ledState = false;

    function updateData() {
        temperature += Math.random() * 0.2 - 0.1;
        humidity += Math.random() * 0.3 - 0.15;

        document.getElementById("temp").innerText = temperature.toFixed(1);
        document.getElementById("hum").innerText = humidity.toFixed(1);
        document.getElementById("timestamp").innerText = new Date().toLocaleTimeString();
        document.getElementById("ledState").innerText = window.ledState ? "ON" : "OFF";
    }

    setInterval(updateData, 1000);
    updateData();
};
