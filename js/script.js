document.addEventListener("DOMContentLoaded", function() {

    // -----------------------------
    // Gestion des onglets
    // -----------------------------
    function openTab(tabId, evt) {
        const tabs = document.getElementsByClassName('tab-content');
        for (let t of tabs) t.style.display = 'none';

        const buttons = document.getElementsByClassName('tab-button');
        for (let b of buttons) b.classList.remove('active');

        document.getElementById(tabId).style.display = 'block';
        if(evt) evt.currentTarget.classList.add('active');
    }

    window.openTab = openTab; // Rendre la fonction accessible depuis HTML

    // -----------------------------
    // Création dynamique du formulaire Offset
    // -----------------------------
    const mesuresForm = document.getElementById('mesuresForm');
    for(let i=1;i<=6;i++){
        const div = document.createElement('div');
        div.innerHTML = `
            <h4>Mesure ${i}</h4>
            <label>Gain: <input id="MESURE_${i}_gain" type="number" value="1"></label><br>
            <label>Offset: <input id="MESURE_${i}_offset" type="number" value="0"></label><br>
            <label>Type: <input id="MESURE_${i}_dyn" type="text" value="normal"></label><br><br>
        `;
        mesuresForm.appendChild(div);
    }

    // -----------------------------
    // Données simulées
    // -----------------------------
    let temperature = 25.0;
    let humidity = 50.0;
    let ledState = false;
    let offset = 0;

    function updateData() {
        // Simulation de mesures
        temperature += Math.random()*0.2 - 0.1;
        humidity += Math.random()*0.3 - 0.15;

        // Mise à jour du DOM
        document.getElementById('temp').innerText = temperature.toFixed(1);
        document.getElementById('hum').innerText = humidity.toFixed(1);
        document.getElementById('ledState').innerText = ledState ? "ON" : "OFF";
        document.getElementById('offset').innerText = offset;
        document.getElementById('timestamp').innerText = new Date().toLocaleTimeString();
    }

    setInterval(updateData, 1000);
    updateData();

    // -----------------------------
    // Contrôle LED
    // -----------------------------
    window.toggleLED = function() {
        ledState = !ledState;
        // Si ESP32 : fetch('/toggleLED', {method:'POST'}).then(()=>updateData());
    }

    // -----------------------------
    // Offset (incrément / décrément)
    // -----------------------------
    window.increaseOffset = function() { offset++; }
    window.decreaseOffset = function() { offset--; }

    // -----------------------------
    // Soumission du formulaire Offset
    // -----------------------------
    window.submitOffsets = function() {
        const payload = {};
        for(let i=1;i<=6;i++){
            payload[`Mesure_${i}`] = {
                Gain: parseFloat(document.getElementById(`MESURE_${i}_gain`).value),
                Offset: parseFloat(document.getElementById(`MESURE_${i}_offset`).value),
                type: document.getElementById(`MESURE_${i}_dyn`).value
            };
        }

        fetch('/set_bit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if(response.ok){
                document.getElementById('offsetMessage').innerText = 'Offsets envoyés avec succès !';
            } else {
                document.getElementById('offsetMessage').innerText = 'Erreur lors de l\'envoi';
            }
        })
        .catch(err => {
            document.getElementById('offsetMessage').innerText = 'Erreur de communication : ' + err;
        });
    }

});
