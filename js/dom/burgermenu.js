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

// Die Eventhandler für die Farbauswahl erstellen
Array.from(burger.querySelectorAll(".farben>.auswahl")).forEach((elem) => {
  elem.addEventListener("click", (e) => {
    // Man kann die Farbe nicht auswählen wenn man aktuell ein Kabel erstellt
    if (currentCable) {
      return;
    }
    burger.querySelector(".ausgewaehlt")?.classList.toggle("ausgewaehlt");
    e.target.classList.toggle("ausgewaehlt");
    cableColor = getCssColorVariable(e.target.dataset.color);
  });
});

// Die IC Buttons im Burger Menü erstellen
burger.querySelector(".ics").innerHTML = "";
Object.keys(icInfos).forEach((id) => {
  burger.querySelector(
    ".ics"
  ).innerHTML += `<div class="auswahl weiss" data-name="${icInfos[id].name}" data-description="${icInfos[id].description}" data-pins="${icInfos[id].pins}">${id}</div>`;
});

// Die Schriftgröße der ICs anpassen jenachdem wie lang der Text ist.
Array.from(burger.querySelectorAll(".ics>.auswahl")).forEach((elem) => {
  let fontSize = 18;
  elem.style.fontSize = fontSize + "px";

  while (elem.scrollWidth > elem.clientWidth && fontSize > 5) {
    fontSize--;
    elem.style.fontSize = fontSize + "px";
  }
});

// Den verschiedenen IC Buttons Eventhandler hinzufügen damit diese das IC-Tooltip angezeigt bekommen wenn man drüber hovert
const tooltip = document.getElementById("ic-tooltip");

burger.querySelectorAll(".ics>.auswahl").forEach((elem) => {
  elem.addEventListener("mouseover", (e) => {
    const elem = e.currentTarget;

    tooltip.innerHTML = `
        <strong>${elem.dataset.name}</strong><br>
        <hr>
        ${elem.dataset.description}<br>
        Pins: ${elem.dataset.pins}
      `;
    tooltip.style.display = "block";
  });

  elem.addEventListener("mousemove", (e) => {
    tooltip.style.left = e.pageX + 10 + "px";
    tooltip.style.top = e.pageY + 10 + "px";
  });

  elem.addEventListener("mouseout", () => {
    tooltip.style.display = "none";
  });

  elem.addEventListener("click", (evt) => {
    // Wenn noch kein Element ausgewählt ist
    if (currentElement) {
      return;
    }
    // Erstelle im Mittleren Bereich des Viewports ein IC mit den Daten des Ausgewählten ICs
    const elem = evt.currentTarget;
    // pins / 2 da ics rows wollen und keine pin anzahl
    ics.push(new Ic(createVector(300, 400), elem.dataset.pins/2, elem.dataset.name));
    console.log("Weiter");
  });
});
