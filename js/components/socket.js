class Socket {
  constructor(pos, pinCount = 24, doubleH = true) {
    if (pinCount % 2 !== 0) {
      throw new Error("Die Pin-Anzahl des Sockels muss durch 2 Teilbar sein!");
    }
    this.pos = pos;
    this.doubleH = doubleH;
    this.closed = true;
    this.connectorsCircle = [];
    this.connectorsRect = [];
    this.pinCount = pinCount;
    for (let i = 0; i < this.pinCount / 2; i++) {
      this.connectorsCircle.push(
        new Pin(
          createVector(this.pos.x, this.pos.y + sizes.socket.yVersatz * i)
        )
      );
      this.connectorsRect.push(
        new Pin(
          createVector(
            this.pos.x + sizes.socket.xVersatz,
            this.pos.y +
              (sizes.socket.yVersatz / 2) * i +
              ((sizes.socket.yVersatz / 2) * (this.pinCount / 2 - 1)) / 2
          ),
          "rect"
        )
      );
      // TODO Simulation so umsetzen das keine Schleifen entstehen siehe TODO Signal, wenn das implementiert ist sollte es keine schleifen geben können
      this.connectorsCircle.at(-1).connect(this.connectorsRect.at(-1));
      this.connectorsRect.at(-1).connect(this.connectorsCircle.at(-1));
      this.connectorsCircle.push(
        new Pin(
          createVector(
            this.pos.x + sizes.socket.xVersatz * 3 + sizes.pin.rect,
            this.pos.y + sizes.socket.yVersatz * i
          )
        )
      );
      this.connectorsRect.push(
        new Pin(
          createVector(
            this.pos.x + sizes.socket.xVersatz * 2,
            this.pos.y +
              (sizes.socket.yVersatz / 2) * i +
              ((sizes.socket.yVersatz / 2) * (this.pinCount / 2 - 1)) / 2
          ),
          "rect"
        )
      );
      // TODO Simulation so umsetzen das keine Schleifen entstehen siehe TODO Signal, wenn das implementiert ist sollte es keine schleifen geben können
      this.connectorsCircle.at(-1).connect(this.connectorsRect.at(-1));
      this.connectorsRect.at(-1).connect(this.connectorsCircle.at(-1));
    }
  }

  show() {
    // In dem Kontext prüfen ob sich die Connectoren verändern wenn man den Hebel umlegt
    noFill();
    strokeWeight(strokeWeights.small);
    stroke(colors.outline);
    for (let i = 0; i < this.pinCount; i++) {
      let l1 = this.connectorsCircle.at(i).pos;
      let l2 = this.connectorsRect.at(i).pos;
      if (l1.x < l2.x) {
        line(l1.x, l1.y, l1.x + sizes.socket.xVersatz / 3, l1.y);
        line(
          l1.x + sizes.socket.xVersatz / 3,
          l1.y,
          l2.x - sizes.socket.xVersatz / 3,
          l2.y + sizes.pin.rect_versatz
        );
        line(
          l2.x - sizes.socket.xVersatz / 3,
          l2.y + sizes.pin.rect_versatz,
          l2.x,
          l2.y + sizes.pin.rect_versatz
        );
      } else {
        line(l1.x, l1.y, l1.x - sizes.socket.xVersatz / 3, l1.y);
        line(
          l1.x - sizes.socket.xVersatz / 3,
          l1.y,
          l2.x + sizes.socket.xVersatz / 3 + sizes.pin.rect,
          l2.y + sizes.pin.rect_versatz
        );
        line(
          l2.x + sizes.pin.rect,
          l2.y + sizes.pin.rect_versatz,
          l2.x + sizes.socket.xVersatz / 3 + sizes.pin.rect,
          l2.y + sizes.pin.rect_versatz
        );
      }
    }
    noStroke();
    fill(colors.btnInactive);
    // TODO Die X-Größe vom Rect anpassen damit, damit verbunden ist allerdings das erstellen des gesamten sockels
    rect(
      this.connectorsRect.at(0).pos.x - sizes.socket.border,
      this.connectorsRect.at(0).pos.y - sizes.socket.border,
      29,
      ((sizes.socket.yVersatz / 2) * this.pinCount) / 2 + sizes.socket.border
    );
    fill(colors.silver);
    stroke(colors.silver);
    if (this.closed) {
      rect(
        this.connectorsRect.at(0).pos.x - 2,
        this.connectorsRect.at(0).pos.y - 15,
        3,
        13
      );
      quad(
        this.connectorsRect.at(0).pos.x - 2,
        this.connectorsRect.at(0).pos.y - 15,
        this.connectorsRect.at(0).pos.x + 1,
        this.connectorsRect.at(0).pos.y - 15,
        this.connectorsRect.at(0).pos.x + 2,
        this.connectorsRect.at(0).pos.y - 18,
        this.connectorsRect.at(0).pos.x - 3,
        this.connectorsRect.at(0).pos.y - 18
      );
      arc(
        this.connectorsRect.at(0).pos.x - 0.5,
        this.connectorsRect.at(0).pos.y - 18,
        5,
        5,
        PI,
        0
      );
    } else {
      circle(
        this.connectorsRect.at(0).pos.x - 1,
        this.connectorsRect.at(0).pos.y - 3,
        5
      );
    }
    [...this.connectorsCircle, ...this.connectorsRect].forEach((pin) => {
      pin.show();
    });
  }

  update() {
    // TODO Hebel Mechanismus klickbar machen,
  }
}
