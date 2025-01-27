let cam; // Kamera-Position
let camBounds;
let prevMouse; // Vorherige Mausposition
let zoom = 2; // Zoom-Faktor
let debug;
let platinElements;
let currentCable;
let cables;

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
const inCircle = (pos, diameter, offset) => {
  const worldMouse = getWorldMousePos();
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
  cables = [];
  currentCable = null;
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
  debug = true;
  platinElements = [
    new BtnArray(createVector(100, 200)),
    new BtnArray(createVector(100, 330)),
    new LedArray(createVector(200, 200)),
    new LedArray(createVector(200, 260), {
      on: colors.ledYellowOn,
      off: colors.ledYellowOff,
    }),
    new LedArray(createVector(200, 320), {
      on: colors.ledGreenOn,
      off: colors.ledGreenOff,
    }),
    new Socket(createVector(250, 200), 24),
    new Ic(
      createVector(
        250 + sizes.socket.xVersatz + sizes.pin.rect / 2,
        224.5 + sizes.socket.border / 2
      ),
      12,
      "IC9503"
    ),
  ];
  // TODO nur für debuging/tests
  // platinElements[0].buttons[0].connected[1].connect(
  //   platinElements[2].connectors[0]
  // );
  // platinElements[0].buttons[0].connected[2].connect(
  //   platinElements[2].connectors[1]
  // );
  // platinElements[0].buttons[1].connected[1].connect(
  //   platinElements[2].connectors[2]
  // );
  // platinElements[0].buttons[1].connected[2].connect(
  //   platinElements[2].connectors[3]
  // );
  // platinElements[0].buttons[2].connected[1].connect(
  //   platinElements[3].connectors[0]
  // );
  // platinElements[0].buttons[2].connected[2].connect(
  //   platinElements[3].connectors[1]
  // );
  // platinElements[0].buttons[3].connected[1].connect(
  //   platinElements[3].connectors[2]
  // );
  // platinElements[0].buttons[3].connected[2].connect(
  //   platinElements[3].connectors[3]
  // );
  // platinElements[1].buttons[0].connected[1].connect(
  //   platinElements[4].connectors[0]
  // );
  // platinElements[1].buttons[0].connected[2].connect(
  //   platinElements[4].connectors[1]
  // );
  // platinElements[1].buttons[1].connected[1].connect(
  //   platinElements[4].connectors[2]
  // );
  // platinElements[1].buttons[1].connected[2].connect(
  //   platinElements[4].connectors[3]
  // );
}

function draw() {
  background(colors.background);
  prevMouse.set(mouseX, mouseY);
  // Alles zwischen push und pop ist die szene und wie sie in der Kamera dagestellt wird.
  push();
  translate(cam.x, cam.y);
  scale(zoom);
  platinElements.forEach((elem) => {
    elem.show();
  });

  [...cables, currentCable]
    .filter((e) => e !== null)
    .forEach((cable) => {
      cable.show();
    });

  pop();
}

function mouseClicked(){
  // Platinen Elemente werden geprüft, sub elemente wie connectoren werden in den jeweiligen update methoden weiterverarbeitet.
  if (mouseButton === LEFT) {
    console.log("Bei dem Rechtsklick");
    platinElements.forEach((elem) => {
      elem.update();
    });
  }
  
};

function keyPressed(){
  // Das Kabelziehen abbrechen
  if(keyCode === 17 && currentCable){
    currentCable = null;
  }
}

function mouseDragged(){
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
};

function windowResized(){
  // Canvas Größe anpassen, wenn das Fenster verändert wird
  resizeCanvas(windowWidth, windowHeight);
};

// Mausrad-Zoom
function mouseWheel(event){
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
};
