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
  ).innerHTML += `<div class="auswahl weiss" data-id="${id}" data-name="${icInfos[id].name}" data-schaltung="${icInfos[id].schaltung}" data-pins="${icInfos[id].pins}">${id}</div>`;
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
  <small>Pins: ${elem.dataset.pins}</small><br>
  <small>Schaltung: <br>${elem.dataset.schaltung.replaceAll(
    ";",
    "<br>"
  )}</small>
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
    const info = icInfos[elem.dataset.id];
    // pins / 2 da ics rows wollen und keine pin anzahl
    const neuerIc = new Ic(
      p5.Vector.add(
        getScreenCenter(),
        p5.Vector.mult(p5.Vector.random2D(), map(zoom, 1, 10, 20, 10))
      ),
      info.pins / 2,
      info.name
    );
    ics.push(neuerIc);
    info.gates?.forEach((gate) => {
      const gateObj =
        gate.type === "AND"
          ? new And()
          : gate.type === "XOR"
          ? new Xor()
          : gate.type === "OR"
          ? new Or()
          : gate.type === "NOT"
          ? new Not()
          : null;
      if (!gateObj) return;

      // Mappe Pin-Referenzen zu den richtigen Connectors
      const connectorObjs = gate.connectors.map((idx) => {
        if (typeof idx === "string" && idx.startsWith("i")) {
          const i = parseInt(idx.slice(1));
          return neuerIc.connectorsPlugInvisible[i];
        } else {
          return neuerIc.connectorsPlug[idx];
        }
      });

      neuerIc.addGate(gateObj, connectorObjs);
    });
  });
});
