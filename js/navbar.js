/**
 * Alle Funktionen und Events welche die Navbar betreffen.
 */
// Namensconverntion btn_reiter_aktion
// Click auf Navbar unterbinden damit man nicht hinter das HTML Element Clicken kann
const nav = document.querySelector("nav");
nav.addEventListener("click", (e) => {
  e.stopPropagation();
});

nav.addEventListener("mousedown", (e) => {
  e.stopPropagation();
});

// Datei
document.querySelector("#btn_datei_laden").addEventListener("click", (e) => {
  new Load().triggerFileDialog();
  e.stopPropagation();
});

document
  .querySelector("#btn_datei_speichern")
  .addEventListener("click", (e) => {
    new Save().downloadJSON();
    e.stopPropagation();
  });

// Hilfe
const hilfe_popup = document.querySelector("#hilfe_popup");
const hilfe_popup_btn = document.querySelector("#hilfe_popup button");

document.querySelector("#btn_hilfe").addEventListener("click", (e) => {
  hilfe_popup.style.display = "block";
  e.stopPropagation();
});

hilfe_popup.addEventListener("click", (e) => {
  e.stopPropagation();
});

hilfe_popup.addEventListener("mousedown", (e) => {
  e.stopPropagation();
});

hilfe_popup_btn.addEventListener("click", (e) => {
  hilfe_popup.style.display = "none";
  e.stopPropagation();
});

hilfe_popup_btn.addEventListener("mousedown", (e) => {
  e.stopPropagation();
});
