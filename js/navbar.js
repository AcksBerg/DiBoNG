// Die Aktionen der Menüleiste
// Namensconverntion btn_reiter_aktion
// Click auf Navbar unterbinden damit man nicht hinter das HTML Element Clicken kann
document.querySelector("nav").addEventListener("click", (e) => {
  console.log("Navbar click");
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
document.querySelector("#btn_hilfe").addEventListener("click", (e) => {
  document.querySelector("#help").style.display = "block";
  e.stopPropagation();
});

document.querySelector("#help").addEventListener("click", (e) => {
  e.stopPropagation();
});

document.querySelector("#help button").addEventListener("click", (e) => {
  document.querySelector("#help").style.display = "none";
  e.stopPropagation();
});
