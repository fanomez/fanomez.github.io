window.initOffsetForm = function () {

    const mesuresForm = document.getElementById("mesuresForm");

    for (let i = 1; i <= 6; i++) {
        const div = document.createElement("div");
        div.innerHTML = `
            <h4>Mesure ${i}</h4>
            <label>Gain: <input id="MESURE_${i}_gain" type="number" value="1"></label><br>
            <label>Offset: <input id="MESURE_${i}_offset" type="number" value="0"></label><br>
            <label>Type: <input id="MESURE_${i}_dyn" type="text" value="normal"></label><br><br>
        `;
        mesuresForm.appendChild(div);
    }
};

window.submitOffsets = function () {

    const payload = {};

    for (let i = 1; i <= 6; i++) {
        payload[`Mesure_${i}`] = {
            Gain: parseFloat(document.getElementById(`MESURE_${i}_gain`).value),
            Offset: parseFloat(document.getElementById(`MESURE_${i}_offset`).value),
            Type: document.getElementById(`MESURE_${i}_dyn`).value,
        };
    }

    fetch("/set_bit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    })
        .then((res) => {
            document.getElementById("offsetMessage").innerText =
                res.ok ? "Offsets envoyés !" : "Erreur lors de l'envoi.";
        })
        .catch((err) => {
            document.getElementById("offsetMessage").innerText =
                "Erreur réseau : " + err;
        });
};
