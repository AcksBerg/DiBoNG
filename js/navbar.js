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
  e.stopPropagation();
  if (currentCable) {
    return;
  }
  new Load().triggerFileDialog();
});

document
  .querySelector("#btn_datei_speichern")
  .addEventListener("click", (e) => {
    if (currentCable) {
      return;
    }
    e.stopPropagation();
    new Save().downloadJSON();
  });

// Hilfe
const hilfe_popup = document.querySelector("#hilfe_popup");
const hilfe_popup_btn = document.querySelector("#hilfe_popup button");

document.querySelector("#btn_hilfe").addEventListener("click", (e) => {
  e.stopPropagation();
  if (currentCable) {
    return;
  }
  hilfe_popup.style.display = "block";
});

hilfe_popup.addEventListener("click", (e) => {
  e.stopPropagation();
});

hilfe_popup.addEventListener("mousedown", (e) => {
  e.stopPropagation();
});

hilfe_popup_btn.addEventListener("click", (e) => {
  if (currentCable) {
    return;
  }
  e.stopPropagation();
  hilfe_popup.style.display = "none";
});

hilfe_popup_btn.addEventListener("mousedown", (e) => {
  e.stopPropagation();
});
