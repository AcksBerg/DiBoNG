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
const speichern = (evt) => {
  if (currentCable) {
    return;
  }
  evt.stopPropagation();
  new Save().downloadJSON(
    document.querySelector("#sketch_name").value + ".json"
  );
};

const laden = (evt) => {
  if (currentCable) {
    return;
  }
  evt.stopPropagation();
  new Load().triggerFileDialog();
};
document
  .querySelector("#btn_datei_laden")
  .addEventListener("click", (e) => laden(e));

document
  .querySelector("#btn_datei_speichern")
  .addEventListener("click", (e) => speichern(e));

// Sketch Name
document.querySelector("#sketch_name").addEventListener("change", (ev) => {
  const element = ev.target;
  let text = element.value;

  // Nur Erlaubte Zeichen zulassen
  text = text.replace(/[^a-zA-ZäöüÄÖÜß0-9 ]+/g, "");
  // Zahlen dürfen nur in der Mitte oder am Ende stehen
  text = text.replace(/^[0-9]+/, "");
  // Leerzeichen am Anfang und Ende wegschneiden und Doppelte Leerzeichen verhindern
  text = text.trim().replace(/\s{2,}/g, " ");

  element.value = text.length !== 0 ? text : "Schaltung";
});

// Hilfe
const hilfe_popup = document.querySelector("#hilfe_popup");
const hilfe_popup_btn = document.querySelector("#hilfe_popup button");

// Hilfe-Fenster schließen wenn die Escape-Taste gedrückt worden ist.
// Und Abbrechen wenn grade ein Kabel gezogen wird.
document.addEventListener("keydown", (evt) => {
  if (
    (evt.code === "KeyS" || evt.code === "KeyO" || evt.code === "KeyP") &&
    evt.ctrlKey
  ) {
    evt.preventDefault();
  }
});
document.addEventListener("keyup", (evt) => {
  if (evt.key === "Escape") {
    if (hilfe_popup.style.display === "block") {
      hilfe_popup.style.display = "none";
    }
    if (currentCable) {
      currentCable = null;
    }
  } else if (evt.code === "KeyS" && evt.ctrlKey) {
    speichern(evt);
  } else if (evt.code === "KeyO" && evt.ctrlKey) {
    laden(evt);
  } else if (evt.code === "KeyP" && evt.ctrlKey) {
    powerButton.update();
  }
});

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
