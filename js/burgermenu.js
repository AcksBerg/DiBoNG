/**
 * Alle Funktionen und Events die das Burgermenü betreffen.
 */

const burger = document.querySelector("#burgermenu");
burger.addEventListener("click", (e) => {
  burger.classList.toggle("rotated");
  e.stopPropagation();
});

burger.addEventListener("mousedown", (e) => {
  e.stopPropagation();
});
