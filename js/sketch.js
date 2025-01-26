let cam; // Kamera-Position
let camBounds;
let prevMouse; // Vorherige Mausposition
let zoom = 2; // Zoom-Faktor
let debug;
let platinElements;

/**
 * Bestimmt ob die Maus in einem gegebenen Rechteck ist.
 * @param {Vector} pos Ein Vector mit der X und Y Koordinaten der zu prüfenden Position
 * @param {Vector} size Ein Vector mit der X und Y Größe der zu prüfenden Position
 * @returns {bool} true = im Rechteck, false = außerhalb des Rechtecks
 */
const inRect = (pos, size) => {
  const worldMouse = getWorldMousePos();
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
  return dist(pos.x, pos.y, worldMouse.x, worldMouse.y) < (diameter * (1 + offset/100))/2;
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
  setFrameRate(5);
  textFont("Consolas");
  createCanvas(windowWidth, windowHeight, P2D);
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
  // TODO Anders Elemente Speichern
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
  ];
  // TODO nur für debuging/tests
  platinElements[0].buttons[0].connected[1].connect(platinElements[2].connectors[0]);
  platinElements[0].buttons[0].connected[2].connect(platinElements[2].connectors[1]);
  platinElements[0].buttons[1].connected[1].connect(platinElements[2].connectors[2]);
  platinElements[0].buttons[1].connected[2].connect(platinElements[2].connectors[3]);
  platinElements[0].buttons[2].connected[1].connect(platinElements[3].connectors[0]);
  platinElements[0].buttons[2].connected[2].connect(platinElements[3].connectors[1]);
  platinElements[0].buttons[3].connected[1].connect(platinElements[3].connectors[2]);
  platinElements[0].buttons[3].connected[2].connect(platinElements[3].connectors[3]);
  platinElements[1].buttons[0].connected[1].connect(platinElements[4].connectors[0]);
  platinElements[1].buttons[0].connected[2].connect(platinElements[4].connectors[1]);
  platinElements[1].buttons[1].connected[1].connect(platinElements[4].connectors[2]);
  platinElements[1].buttons[1].connected[2].connect(platinElements[4].connectors[3]);
}

function draw() {
  background(colors.background);
  prevMouse.set(mouseX, mouseY);
  // Alles zwischen push und pop ist die szene und wie sie in der Kamera dagestellt wird.
  push();
  translate(cam.x, cam.y);
  scale(zoom);
  fill(255, 1, 1);
  noStroke();
  circle(50, 50, 50);
  platinElements.forEach((button) => {
    button.show();
  });
  if (debug) {
    noFill();
    stroke(255);
    rect(
      camBounds.min_x,
      camBounds.min_y,
      abs(camBounds.min_x) + abs(camBounds.max_x),
      abs(camBounds.min_y) + abs(camBounds.max_y)
    );
    rect(camBounds.min_x, camBounds.min_y, 20);
  }
  pop();
}

mouseClicked = () => {
  // Platinen Elemente werden geprüft, sub elemente wie connectoren werden in den jeweiligen update methoden weiterverarbeitet.
  if (mouseButton == LEFT) {
    platinElements.forEach((button) => {
      button.update();
    });
  }
};

mouseDragged = () => {
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

windowResized = () => {
  // Canvas Größe anpassen, wenn das Fenster verändert wird
  resizeCanvas(windowWidth, windowHeight);
};

// Mausrad-Zoom
mouseWheel = (event) => {
  // Berechnet die Weltkoordinaten der Maus mit der Transformation durch Kamera-Bewegung und Zoom.
  let worldMouseX = (mouseX - cam.x) / zoom;
  let worldMouseY = (mouseY - cam.y) / zoom;
  let zoomFactor = 1.05;
  if (event.delta > 0) {
    zoom /= zoomFactor;
  } else {
    zoom *= zoomFactor;
  }
  // Den Zoom zwischen 0 und 3 begrenzen
  zoom = constrain(zoom, 0.5, 10);
  // Verschieben der Kamera, dadurch zoomt man auf den Mauszeiger zu.
  cam.x = mouseX - worldMouseX * zoom;
  cam.y = mouseY - worldMouseY * zoom;

  // Verhindern, dass p5 das Standard-Scrolling ausführt
  return false;
};
