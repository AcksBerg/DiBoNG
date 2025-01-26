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
    // TODO In dem Kontext prüfen ob sich die Connectoren verändern wenn man den Hebel umlegt
    noFill();
    strokeWeight(strokeWeights.small);
    stroke(colors.outline);
    for (let i = 0; i < this.pinCount; i++) {
      let l1 = this.connectorsCircle.at(i).pos;
      let l2 = this.connectorsRect.at(i).pos;
      if (l1.x < l2.x) {
        // Horizontale Linie vom Linken Connector(Circle) nach Rechts
        line(l1.x, l1.y, l1.x + sizes.socket.xVersatz / 3, l1.y);
        // Diagonale Linie vom Linken Connector(Circle)
        line(
          l1.x + sizes.socket.xVersatz / 3,
          l1.y,
          l2.x - sizes.socket.xVersatz / 3,
          l2.y + sizes.pin.rect_versatz
        );
        // Horizontale Linie von der Diagonalen Linie zum Rechten Connector(Rect)
        line(
          l2.x - sizes.socket.xVersatz / 3,
          l2.y + sizes.pin.rect_versatz,
          l2.x,
          l2.y + sizes.pin.rect_versatz
        );
      } else {
        // Horizontale Linie vom Rechten Connector(Circle) nach Links
        line(l1.x, l1.y, l1.x - sizes.socket.xVersatz / 3, l1.y);
        // Diagonale Linie vom Rechten Connector(Circle)
        line(
          l1.x - sizes.socket.xVersatz / 3,
          l1.y,
          l2.x + sizes.socket.xVersatz / 3 + sizes.pin.rect,
          l2.y + sizes.pin.rect_versatz
        );
        // Horizontale Linie von der Diagonalen Linie zum Linken Connector(Rect)
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
    rect(
      this.pos.x + sizes.socket.xVersatz - sizes.socket.border,
      this.connectorsRect.at(0).pos.y - sizes.socket.border,
      sizes.socket.xVersatz + sizes.pin.rect + sizes.socket.border * 2,
      ((sizes.socket.yVersatz / 2) * this.pinCount) / 2 + sizes.socket.border
    );
    fill(colors.silver);
    stroke(colors.silver);
    if (this.closed) {
      rect(
        this.connectorsRect.at(0).pos.x -
          sizes.socket.border +
          sizes.socket.hebelBreite,
        this.connectorsRect.at(0).pos.y - sizes.socket.hebelLange,
        sizes.socket.hebelBreite,
        sizes.socket.hebelLange - sizes.socket.border / 2
      );
      circle(
        this.connectorsRect.at(0).pos.x -
          sizes.socket.border +
          sizes.socket.hebelBreite * 1.5,
        this.connectorsRect.at(0).pos.y - sizes.socket.hebelLange,
        sizes.socket.hebelBreite * 2
      );
    } else {
      circle(
        this.connectorsRect.at(0).pos.x -
          sizes.socket.border +
          sizes.socket.hebelBreite * 1.5,
        this.connectorsRect.at(0).pos.y - sizes.socket.border / 2,
        sizes.socket.hebelBreite * 2
      );
    }
    [...this.connectorsCircle, ...this.connectorsRect].forEach((pin) => {
      pin.show();
    });
  }

  update() {
    // TODO Hebel Mechanismus klickbar machen, Aufruf der Pin updates abhängig vom Hebel
  }
}
