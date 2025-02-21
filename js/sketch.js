let cam; // Kamera-Position
let camBounds;
let prevMouse; // Vorherige Mausposition
let zoom = 2; // Zoom-Faktor
let debug = true;
let platinElements = [];
let platinElementsInput = [];
let platinElementsOutput = [];
let platinElementsSocket = [];
let currentCable = null;
let currentElement = null;
let cables = [];
let elements = [];
let powerButton;

/**
 * Verändert die Lightness und Transparent werte einer HSLA-Farbe.
 * @param {*} Objekt die parameter als Objekt übergeben im Format {color:dieFarbe, lightness:dieLightness, trans:dieTrans} dabei sind Lightness und Transparence Optional.
 * @returns
 */
function setHSLALightAndTrans({ color, lightness = -1, trans = -1 }) {
  return color
    .replace(
      new RegExp(/(\d|0\.\d)(?=\))/),
      trans !== -1 ? trans : color.match(new RegExp(/(\d|0\.\d)(?=\))/))[0]
    )
    .replace(
      new RegExp(/(?<=%, )\d+(?=%,)/),
      lightness !== -1
        ? lightness
        : color.match(new RegExp(/(?<=%, )\d+(?=%,)/))
    );
}

/**
 * Findet die passende Schriftgröße für den gegebenen Bereich
 * @param {String} text Der Text welcher in den Bereich passen muss.
 * @param {number} maxWidth Die größe des Bereiches
 * @returns
 */
function findFontSize(text, maxWidth, steps = 1) {
  // Start größe
  let fontSize = steps;
  // Schriftgröße setzen
  textSize(fontSize);

  // Solange die Schrift in den Bereich passt.
  // Am Ende reduzieren wir um eins wegen der Kopfgesteuerten Schleife
  while (textWidth(text) <= maxWidth) {
    fontSize += steps;
    textSize(fontSize);
  }
  return fontSize - steps;
}

/**
 * Bestimmt ob die Maus in einem gegebenen Rechteck ist.
 * @param {Vector} pos Ein Vector mit der X und Y Koordinaten der zu prüfenden Position
 * @param {Vector} size Ein Vector mit der X und Y Größe der zu prüfenden Position
 * @returns {bool} true = im Rechteck, false = außerhalb des Rechtecks
 */
const inRect = (pos, size) => {
  const worldMouse = getWorldMousePos();
  if (debug) {
    noFill();
    stroke(colors.outline);
    push();
    translate(cam.x, cam.y);
    scale(zoom);
    rect(pos.x, pos.y, size.x, size.y);
    pop();
  }
  return (
    worldMouse.x > pos.x &&
    worldMouse.x < pos.x + size.x &&
    worldMouse.y > pos.y &&
    worldMouse.y < pos.y + size.y
  );
};

/**
 * Bestimmt ob die Maus in einem gegebenen Kreis ist.
 * @param {Vector} pos Ein Vector mit der X und Y Koordinaten der zu prüfenden Position
 * @param {number} diameter Der Durchmesser um die Position.
 * @param {number} offset Der Offset in Prozent, 10 => der Durchmesser wird um 10% vergrößert.
 * @returns {bool} true = im Kreis, false = außerhalb des Kreises
 */
const inCircle = (pos, diameter, offset = 0) => {
  const worldMouse = getWorldMousePos();
  if (debug) {
    noFill();
    stroke(colors.outline);
    push();
    translate(cam.x, cam.y);
    scale(zoom);
    circle(pos.x, pos.y, diameter * (1 + offset / 100));
    pop();
  }
  return (
    dist(pos.x, pos.y, worldMouse.x, worldMouse.y) <
    (diameter * (1 + offset / 100)) / 2
  );
};

/**
 * Errechnet aus der derzeitigen Position der Maus über dem Canvas die Position
 * in der Szene indem es die angewandten Transformationen (Move und Zoom)
 * auf die Maus anwendet.
 * @returns {Vector} Der Vector mit x und y Position der Maus in der Szene
 */
const getWorldMousePos = () => {
  return createVector((mouseX - cam.x) / zoom, (mouseY - cam.y) / zoom);
};

function setup() {
  // Framerate reduziert um meinen Akku nicht ganz so schnell zu leeren.
  setFrameRate(30);
  angleMode("degrees");
  textFont("Consolas");
  createCanvas(windowWidth, windowHeight, P2D);
  powerButton = new PowerButton(createVector(400, 400));
  // TODO camBounds auslagern, dazu muss ein weg gefunden werden das nicht windowsWidth und windowHeight genutzt werden muss da diese nicht in helpers.js existieren.
  // In welchem Gebiet sich die Kamera bewegen kann.
  // Muss später an die Szene angepasst werden.
  camBounds = {
    min_x: -400,
    min_y: -400,
    max_x: windowWidth - 100,
    max_y: windowHeight - 100,
  };
  cam = createVector(-170, -317);
  prevMouse = createVector(0, 0);
  platinElementsInput = [
    new BtnArray(createVector(100, 200)),
    new BtnArray(createVector(100, 330)),
    new LedArray(createVector(330, 200)),
  ];
  platinElementsOutput = [
    new LedArray(createVector(330, 260), colors.ledYellow),
    new LedArray(createVector(330, 320), colors.ledGreen),
  ];
  platinElementsSocket = [new Socket(createVector(240, 260), 24)];
  platinElements = [
    ...platinElementsInput,
    ...platinElementsOutput,
    ...platinElementsSocket,
  ];
  elements = [
    new Ic(createVector(360, 250), 12, "IC1234"),
    new Ic(createVector(380, 250), 4, "IC4321"),
    new Ic(createVector(380, 275), 7, "IC4444"),
  ];
}

/**
 * Zuständig um das Canvas zu zeichnen.
 */
function draw() {
  background(colors.background);
  prevMouse.set(mouseX, mouseY);
  // Alles zwischen push und pop ist die szene und wie sie in der Kamera dagestellt wird.
  push();
  translate(cam.x, cam.y);
  scale(zoom);

  [powerButton, ...platinElements, ...elements, ...cables, currentCable]
    .filter((elem) => elem !== null)
    .forEach((elem) => {
      elem.show();
    });

  pop();
}

/**
 * Wird ausgelöst, wenn eine Taste auf der Tastatur nach unten gedrückt wird.
 */
function keyPressed() {
  // Das Kabelziehen abbrechen bzw. Kabel-Links entfernen mit STRG(keyCode 17)
  if (keyCode === 17 && currentCable) {
    currentCable.removeLink();
  }
}

// ********************************
// Mausevents nach der Auslösungsreihenfolge sortiert.
// ********************************

/**
 * Wird ausgelöst, wenn ein Maus Button nach unten gedrückt wird
 */
function mousePressed() {
  console.log("MousePressed");
  for (let i = 0; i < elements.length && !currentElement; i++) {
    // TODO Verbindung mit dem Sockel Lösen wenn eine bestanden hat.
    // TODO Nur Lösen wenn der Sockel den Hebel oben hat.
    if (elements.at(i).isClicked()) {
      currentElement = { elem: elements.at(i) };
      currentElement = {
        ...currentElement,
        offset: getWorldMousePos().sub(
          currentElement.elem.connectorsPlug.at(0).pos
        ),
      };
    }
  }
}

/**
 * Wird ausgelöst, wenn ein Maus Button gedrückt gehalten wird und die Maus dann bewegt.
 */
function mouseDragged() {
  console.log("MouseDragged");
  if (mouseButton === CENTER) {
    const dx = mouseX - prevMouse.x;
    const dy = mouseY - prevMouse.y;

    // Dividiert durch die zoom Stufe um die Bewegung langsamer zu machen wenn man näher drangezoomt ist.
    cam.add(dx / zoom, dy / zoom);
    // Kontrollieren ob sich die Kamera auch wirklich in den Bounds bewegt und wenn nicht in den Bereich setzten.
    // TODO Begrenzung auf das schaltbrett neu machen.
    // cam.x = constrain(cam.x, camBounds.min_x, camBounds.max_x);
    // cam.y = constrain(cam.y, camBounds.min_y, camBounds.max_y);
  }
  if (mouseButton === LEFT && currentElement) {
    currentElement.elem.move(currentElement.offset);
  }
}

function mouseReleased() {
  console.log("MouseReleased");
  if (currentElement) {
    for (let i = 0; i < platinElementsSocket.length; i++) {
      // Wurde der IC über Sockel-Konntektoren (Rect) losgelassen, falls ja, prüfe ob die Pins überlappen.
      if (platinElementsSocket.at(i).isClicked(currentElement.elem)) {
        for (
          let j = 0;
          j < platinElementsSocket.at(i).connectorsRect.length;
          j += 2
        ) {
          if (
            platinElementsSocket.at(i).connectorsRect.at(j).pos.x -
              sizes.pin.plug_breite <
              currentElement.elem.connectorsPlug.at(0).pos.x &&
            currentElement.elem.connectorsPlug.at(0).pos.x <
              platinElementsSocket.at(i).connectorsRect.at(j).pos.x +
                sizes.pin.rect &&
            platinElementsSocket.at(i).connectorsRect.at(j).pos.y -
              sizes.pin.plug_breite <
              currentElement.elem.connectorsPlug.at(0).pos.y &&
            currentElement.elem.connectorsPlug.at(0).pos.y <
              platinElementsSocket.at(i).connectorsRect.at(j).pos.y +
                sizes.pin.rect_versatz * 2
          ) {
            // Den IC Ausrichten und mit dem Sockel verbinden
            // TODO kontrollieren ob einer der Sockel-Pins schon eine Verbindung hat.
            currentElement.elem.move(
              createVector(0, 0).add(),
              platinElementsSocket.at(i).connectorsRect.at(j)
            );
            for(let k=0; k<currentElement.elem.connectorsPlug.length;k++){
              currentElement.elem.connectorsPlug.at(k).connect(platinElementsSocket.at(i).connectorsRect.at(j+k));
              platinElementsSocket.at(i).connectorsRect.at(j+k).connect(currentElement.elem.connectorsPlug.at(k));
            }
            break;
          }
        }
      }
    }
    currentElement = null;
  }
}

/**
 * Wird ausgelöst, wenn das Mausrad gedreht wird, drücken zählt nicht.
 * @param {*} event
 * @returns false - damit nicht die Standard Scrolling funktionen ausgeführt werden
 */
function mouseWheel(event) {
  console.log("mouseWheel");
  // Berechnet die Weltkoordinaten der Maus mit der Transformation durch Kamera-Bewegung und Zoom.
  let worldMouseX = (mouseX - cam.x) / zoom;
  let worldMouseY = (mouseY - cam.y) / zoom;
  let zoomFactor = 1.05;
  if (event.delta > 0) {
    zoom /= zoomFactor;
  } else {
    zoom *= zoomFactor;
  }
  // Den Zoom zwischen 1 und 10 begrenzen
  zoom = constrain(zoom, 1, 10);
  // Verschieben der Kamera, dadurch zoomt man auf den Mauszeiger zu.
  cam.x = mouseX - worldMouseX * zoom;
  cam.y = mouseY - worldMouseY * zoom;

  // Verhindern, dass p5 das Standard-Scrolling ausführt
  return false;
}

/**
 * Wird ausgeführt, wenn ein Vollständiger Maus Click ausgeführt worden ist(MousePressed -> MouseReleased -> MouseClicked)
 * @returns None - Existiert nur um die Funktion frühzeitig abbrechen zu lassen
 */
function mouseClicked() {
  console.log("MouseClicked");
  if (mouseButton === LEFT) {
    // Zuerst kontrollieren ob der PowerButton angeklickt worden ist.
    if (powerButton.isClicked()) {
      return;
    }

    // Dann kontrollieren ob ein oben liegendes Element angeklickt worden ist.
    for (let i = 0; i < elements.length && !currentCable; i++) {
      if (elements.at(i).isClicked()) {
        return;
      }
    }

    // Dann die Platinen-Elemente
    // Platinen Elemente werden geprüft, sub elemente wie connectoren werden in den jeweiligen update methoden weiterverarbeitet.
    // Hier darf nicht auf !currentCable geprüft werden, da sonst die Prüfung der Pins nicht funktioniert(Diese sind Bestandteil der größeren Elemente).
    for (let i = 0; i < platinElements.length; i++) {
      if (platinElements.at(i).isClicked()) {
        return;
      }
    }

    // weitere Segmente dem Kabel hinzufügen
    if (currentCable) {
      currentCable.addLinks();
    }

    // Zum Schluss ob man versucht ein Kabel anzuklicken. Dies ist die Aufwendigste Berechnung.
    // Schauen ob man grade versucht ein Kabel anzuklicken, diese sind nur an den "Ecken" zu packen.
    // Dies wird nicht getan wenn man aktuell ein Kabel malt.
    for (let i = 0; i < cables.length && !currentCable; i++) {
      let cableLink = cables.at(i).nearCableLink();
      if (cableLink) {
        //TODO was soll mit dem Kabel geschehen wenn es ausgewählt worden ist.
        console.log(cableLink);
        return;
      }
    }
  }
}

/**
 * Wird ausgelöst, wenn das Fenster seine größe verändert, also auch wenn die Dev-Konsole aufgeht oder der Nutzer in den Vollbildmodus wechselt.
 */
function windowResized() {
  // Canvas Größe anpassen, wenn das Fenster verändert wird
  resizeCanvas(windowWidth, windowHeight);
}
