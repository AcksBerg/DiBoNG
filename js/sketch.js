let cam; // Kamera-Position
let camBounds;
let prevMouse; // Vorherige Mausposition
let zoom = 2; // Zoom-Faktor
let debug;
let buttons;

// TODO inRect funktion schreiben worauf alle weiteren Elemente zugreifen können.
const inRect = (obj, height = -1, width = -1) => {
  if (height == -1) {
    height = obj.size;
    width = obj.size;
  }
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
  buttons = [
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
  buttons[0].buttons[0].connected[1].connect(buttons[2].connectors[0]);
  buttons[0].buttons[0].connected[2].connect(buttons[2].connectors[1]);
  buttons[0].buttons[1].connected[1].connect(buttons[2].connectors[2]);
  buttons[0].buttons[1].connected[2].connect(buttons[2].connectors[3]);
  buttons[0].buttons[2].connected[1].connect(buttons[3].connectors[0]);
  buttons[0].buttons[2].connected[2].connect(buttons[3].connectors[1]);
  buttons[0].buttons[3].connected[1].connect(buttons[3].connectors[2]);
  buttons[0].buttons[3].connected[2].connect(buttons[3].connectors[3]);
  buttons[1].buttons[0].connected[1].connect(buttons[4].connectors[0]);
  buttons[1].buttons[0].connected[2].connect(buttons[4].connectors[1]);
  buttons[1].buttons[1].connected[1].connect(buttons[4].connectors[2]);
  buttons[1].buttons[1].connected[2].connect(buttons[4].connectors[3]);
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
  buttons.forEach((button) => {
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
  // TODO auf unterschiedliche elemente Kontrollieren damit Elemente wie LED nicht zerstört werden.
  if (mouseButton == LEFT) {
    buttons.forEach((button) => {
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
  zoom = constrain(zoom, 0.5, 5);
  // Verschieben der Kamera, dadurch zoomt man auf den Mauszeiger zu.
  cam.x = mouseX - worldMouseX * zoom;
  cam.y = mouseY - worldMouseY * zoom;

  // Verhindern, dass p5 das Standard-Scrolling ausführt
  return false;
};
