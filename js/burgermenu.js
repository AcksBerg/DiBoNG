/**
 * Alle Funktionen und Events die das Burgermenü betreffen.
 */

const burger = document.querySelector("#burgermenu");
burger.querySelector("svg").addEventListener("click", (e) => {
  e.stopPropagation();
  if (currentCable) {
    return;
  }
  burger.classList.toggle("rotated");
});

burger.addEventListener("click", (e) => {
  e.stopPropagation();
});

burger.addEventListener("mousedown", (e) => {
  e.stopPropagation();
});

// TODO Denk dir eine bessere Methode aus :D
Array.from(burger.querySelectorAll(".auswahl")).forEach((elem) => {
  elem.addEventListener("click", (e) => {
    if (currentCable) {
      return;
    }
    burger.querySelector(".ausgewaehlt")?.classList.toggle("ausgewaehlt");
    e.target.classList.toggle("ausgewaehlt");
    switch (e.target.classList[1]) {
      case "blau":
        cableColor = getCssColorVariable("--cableBlue");
        break;
      case "rot":
        cableColor = getCssColorVariable("--cableRed");
        break;
      case "gelb":
        cableColor = getCssColorVariable("--cableYellow");
        break;
      case "braun":
        cableColor = getCssColorVariable("--cableBrown");
        break;
      case "weiss":
        cableColor = getCssColorVariable("--cableWhite");
        break;
      case "gruen":
        cableColor = getCssColorVariable("--cableGreen");
        break;
    }
  });
});
