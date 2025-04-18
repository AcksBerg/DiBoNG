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

Array.from(burger.querySelectorAll(".farben>.auswahl")).forEach((elem) => {
  elem.addEventListener("click", (e) => {
    if (currentCable) {
      return;
    }
    burger.querySelector(".ausgewaehlt")?.classList.toggle("ausgewaehlt");
    e.target.classList.toggle("ausgewaehlt");
    cableColor = getCssColorVariable(e.target.dataset.color);
  });
});

Array.from(burger.querySelectorAll(".ics>.auswahl")).forEach((elem) => {
  let fontSize = 18; 
  elem.style.fontSize = fontSize + "px";

  while (elem.scrollWidth > elem.clientWidth && fontSize > 5) {
    fontSize--;
    elem.style.fontSize = fontSize + "px";
  }
});
