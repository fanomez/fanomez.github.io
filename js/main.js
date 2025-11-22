document.addEventListener("DOMContentLoaded", () => {

    function openTab(tabId) {
        // Masquer tous les onglets
        document.querySelectorAll(".tab-content")
            .forEach(t => t.style.display = "none");

        // Désactiver tous les boutons
        document.querySelectorAll(".tab-button")
            .forEach(b => b.classList.remove("active"));

        // Afficher l'onglet demandé
        document.getElementById(tabId).style.display = "block";

        // Activer le bouton correspondant
        document.querySelector(`.tab-button[data-tab="${tabId}"]`)
            .classList.add("active");
    }

    // Rendre accessible si tu veux encore l'appeler ailleurs
    window.openTab = openTab;

    // Ajouter l'écouteur sur tous les boutons
    document.querySelectorAll(".tab-button").forEach(button => {
        button.addEventListener("click", () => {
            openTab(button.dataset.tab);
        });
    });

    // Onglet par défaut
    openTab("mesures");

    // Modules
    if (window.initMesures) window.initMesures();
    if (window.initOffsetForm) window.initOffsetForm();
});
