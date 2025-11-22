document.addEventListener("DOMContentLoaded", () => {

    function openTab(tabId, evt) {
        const tabs = document.querySelectorAll(".tab-content");
        tabs.forEach(t => t.style.display = "none");

        const buttons = document.querySelectorAll(".tab-button");
        buttons.forEach(b => b.classList.remove("active"));

        document.getElementById(tabId).style.display = "block";
        if (evt) evt.currentTarget.classList.add("active");
    }

    window.openTab = openTab;

    // Lance les modules au chargement
    if (window.initMesures) window.initMesures();
    if (window.initOffsetForm) window.initOffsetForm();
});
