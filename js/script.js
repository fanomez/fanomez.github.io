document.addEventListener("DOMContentLoaded", function() {
// Document Object Model ( DOM ) : Tree of object

// document represent your webpage

    // ---------------------------------------------------------------------------------------------------
    // Fonction permettant la gestion des onglets
    // ---------------------------------------------------------------------------------------------------
    function openTab45(tabId, evt) {

        // Tab content défini dans html 
        const tabs = document.getElementsByClassName('tab-content');
        for (let t of tabs) t.style.display = 'none';

        const buttons = document.getElementsByClassName('tab-button');
        for (let b of buttons) b.classList.remove('active');

        document.getElementById(tabId).style.display = 'block';
        if(evt) evt.currentTarget.classList.add('active');
    }

    window.openTab = openTab45; // Permet de rendre la fonction "open tab" accessible depuis HTMLs



    // --------------------------------------------------------------------------------------------------
    // Création dynamique du formulaire Offset
    // --------------------------------------------------------------------------------------------------
    
    const mesuresForm = document.getElementById('mesuresForm');

    // Création du tableau une seule fois
    let html = `
    <table class="mesure-table">
        <tr>
            <th>Mesure</th>
            <th>Gain</th>
            <th>Offset</th>
        </tr>
    `;
    
    for (let i = 1; i <= 6; i++) {
        html += `
        <tr>
            <td>Analogique ${i}</td>
            <td><input id="MESURE_${i}_gain" type="number" value="1"></td>
            <td><input id="MESURE_${i}_offset" type="number" value="1"></td>
        </tr>
        `;
    }
    
    // Fermeture du tableau
    
    html += `</table>`;
    
    // html += `<p>Statut envoi : </p>`;

    // Ajout dans la page
    mesuresForm.innerHTML = html;
    
    

    

    // ------------------------------------------------------------------------------------------------------
    // Données simulées
    // ------------------------------------------------------------------------------------------------------
    let temperature = 25.0;
    let humidity = 50.0;
    let ledState = false;

    let I_eff = 12;
    // ------------------------------------------------------------------------------------------------------
    // Fonction de mise à jour dynamique des données
    // ------------------------------------------------------------------------------------------------------
    function updateData() {
        // Simulation de mesures
        temperature += Math.random()*0.2 - 0.1;
        humidity += Math.random()*0.3 - 0.15;

        // Mise à jour de l'onglet mesures 
        document.getElementById('temp').innerText = temperature.toFixed(1);
        document.getElementById('hum').innerText = humidity.toFixed(1);
        document.getElementById('ledState').innerText = ledState ? "ON" : "OFF";
        document.getElementById('timestamp').innerText = new Date().toLocaleTimeString();

        // Mise à jour des mesures : 
        I_eff += Math.random()*0.3 - 0.15;
        document.getElementById('I_eff').innerText = I_eff.toFixed(1);

    }

    setInterval(updateData, 1000);
    updateData();

   
        

    // --------------------------------------------------------------------------------------------------
    // Contrôle LED
    // --------------------------------------------------------------------------------------------------
    window.toggleLED = function() {
        ledState = !ledState;
        // Si ESP32 : fetch('/toggleLED', {method:'POST'}).then(()=>updateData());
    }

    // --------------------------------------------------------------------------------------------------
    // Soumission du formulaire Offset
    // --------------------------------------------------------------------------------------------------
    window.submitOffsets = function() {
        const payload = {};
   
        // Préparation du paylod
        for(let i=1;i<=6;i++){
            payload[`Mesure_${i}`] = {
                Gain: parseFloat(document.getElementById(`MESURE_${i}_gain`).value),
                Offset: parseFloat(document.getElementById(`MESURE_${i}_offset`).value),
                
            };
        }

          fetch('/set_bit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if(response.ok){
                alert("Offsets envoyés avec succès !");
            } else {
                alert("Erreur lors de l\'envoi!");
            }
        })
        .catch(err => {
            alert("Erreur de communication : ' + err");
        });
    }

    // --------------------------------------------------------------------------------------------------
    // Soumission du formulaire Offset
    // --------------------------------------------------------------------------------------------------
 
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        
        // Collaps or expand
        var card = this.nextElementSibling;
        if (card.style.display === "block") {
        card.style.display = "none";
        } else {
            card.style.display = "block";
        }
    });
    }
    // --------------------------------------------------------------------------------------------------

});
