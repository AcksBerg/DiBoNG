// Die Aktionen der Menüleiste
// Namensconverntion btn_reiter_aktion
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
  console.log("Hilfe Fenster Aufrufen");
  e.stopPropagation();
});
