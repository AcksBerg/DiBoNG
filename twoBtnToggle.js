class TwoBtnToggle {
  constructor(pos, size = 20) {
    this.pos = pos;
    this.active = false;
    this.size = size;
    this.spacing = 5;
    this.connected = [
      new Led(
        createVector(
          this.pos.x + (this.spacing * 3 + this.size * 2) * 1.25,
          this.pos.y + this.size * 0.25
        ),
        4
      ),
      new Pin(
        createVector(
          this.pos.x + (this.spacing * 3 + this.size * 2) * 1.5,
          this.pos.y + this.size * 0.25
        )
      ),
      new Pin(
        createVector(
          this.pos.x + (this.spacing * 3 + this.size * 2) * 1.5,
          this.pos.y + this.size * 0.75
        )
      ),
    ];
    // Den Negierten Ausgang !Q initialisieren.
   this.connected[2].update(new Signal(!this.active));
  }
  update() {
    // Die Transformation von zoom und translate zurückrechnen
    let worldMouseX = (mouseX - cam.x) / zoom;
    let worldMouseY = (mouseY - cam.y) / zoom;
    // Versatz der Aktiviert wird wenn der Button aktiv ist.
    // Dadurch muss die Abfrage welcher der Beiden Button gedrückt wird nur einmal geschrieben werden.
    let versatz = this.active ? 0 : this.spacing + this.size;
    if (
      worldMouseX > this.pos.x + versatz &&
      worldMouseX < this.pos.x + this.size + versatz &&
      worldMouseY > this.pos.y &&
      worldMouseY < this.pos.y + this.size
    ) {
      this.active = !this.active;
      // Die Angeschlossenen Elemente Aktuallisieren um Stromdurchfluss zu Simulieren
      // LED
      this.connected[0].update(new Signal(this.active));
      // Oberer Connector
      this.connected[1].update(new Signal(this.active));
      // Unterer Connector
      this.connected[2].update(new Signal(!this.active));
    }
  }
  show() {
    // Rechtecke
    stroke(colors.outline);
    fill(colors.btnActive);
    // Rect links
    rect(this.pos.x, this.pos.y, this.size, this.size, 5);
    // Rect Rects
    rect(
      this.pos.x + this.spacing + this.size,
      this.pos.y,
      this.size,
      this.size,
      5
    );
    // Kabel
    noFill();
    // Kabel Oben
    line(
      this.pos.x + this.spacing * 3 + this.size * 2,
      this.pos.y + this.size * 0.25,
      this.pos.x + (this.spacing * 3 + this.size * 2) * 1.5,
      this.pos.y + this.size * 0.25
    );
    // Kabel Unten
    line(
      this.pos.x + this.spacing * 3 + this.size * 2,
      this.pos.y + this.size * 0.75,
      this.pos.x + (this.spacing * 3 + this.size * 2) * 1.5,
      this.pos.y + this.size * 0.75
    );
    // Kabel(Anschlüsse) Enden und LED
    this.connected.forEach((obj) => {
      obj.show();
    });
    // Text
    fill(colors.outline);
    // Text größe Speichern um diese wieder zurücksetzten zu können.
    textSize(textSizes.medium);
    textAlign(CENTER, CENTER);
    text("L", this.pos.x + this.size / 2, this.pos.y + this.size / 2);
    text(
      "H",
      this.pos.x + this.spacing + this.size * 1.5,
      this.pos.y + this.size / 2
    );
    textSize(textSizes.small);
    text(
      "Q",
      this.pos.x + this.spacing * 2 + this.size * 2,
      this.pos.y + this.size * 0.25
    );
    text(
      "Ǭ",
      this.pos.x + this.spacing * 2 + this.size * 2,
      this.pos.y + this.size * 0.75
    );
  }
}
