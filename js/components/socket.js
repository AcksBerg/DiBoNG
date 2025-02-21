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
    // Hintergrund malen
    fill(colors.panel);
    rect(
      this.pos.x + sizes.socket.xVersatz - sizes.socket.border,
      this.connectorsRect.at(0).pos.y - sizes.socket.border,
      sizes.socket.xVersatz + sizes.pin.rect + sizes.socket.border * 2,
      ((sizes.socket.yVersatz / 2) * this.pinCount) / 2 + sizes.socket.border
    );
    // Den Hebel malen
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

  isClicked(ic) {
    // Prüfen ob überhaupt der Sockel geklickt worden ist. Falls nicht update verlassen
    if (
      !inRect(
        createVector(
          this.pos.x - sizes.pin.circle,
          this.pos.y - sizes.pin.circle
        ),
        createVector(
          sizes.socket.xVersatz * 3 + sizes.pin.rect + sizes.pin.circle * 2,
          (sizes.socket.yVersatz * (this.pinCount - 2)) / 2 +
            sizes.pin.circle * 2
        )
      )
    ) {
      return false;
    }
    // Wird aktuell ein IC gezogen/Übergeben?
    if (ic !== undefined) {
      // Ist der IC mit allen Konnectoren über den Konnektoren vom Sockel und ist der Hebel geöffnet?
      // In Rect kann nicht genutzt werden, weil es nur die Maus-Koordinaten vergleicht, hier sind aber zwei Rechtecke zu vergleichen.
      return (
        !this.closed &&
        ic.connectorsPlug.at(0).pos.x >= this.connectorsRect.at(0).pos.x &&
        ic.connectorsPlug.at(1).pos.x <=
          this.connectorsRect.at(1).pos.x + sizes.pin.rect &&
        ic.connectorsPlug.at(0).pos.y >= this.connectorsRect.at(0).pos.y &&
        ic.connectorsPlug.at(-1).pos.y <=
          this.connectorsRect.at(-1).pos.y + sizes.pin.rect_versatz * 2
      );
    }
    // Return nach jedem treffer da mit einem klick nur ein Element getroffen werden kann.
    // Prüfen ob der Hebel getroffen worden ist.
    if (
      (this.closed &&
        inRect(
          createVector(
            this.connectorsRect.at(0).pos.x - sizes.socket.border,
            this.connectorsRect.at(0).pos.y -
              sizes.socket.hebelLange -
              sizes.socket.hebelBreite * 1.5
          ),
          createVector(
            sizes.socket.hebelBreite * 3,
            sizes.socket.hebelLange + sizes.socket.hebelBreite
          )
        )) ||
      (!this.closed &&
        inCircle(
          createVector(
            this.connectorsRect.at(0).pos.x -
              sizes.socket.border +
              sizes.socket.hebelBreite * 1.5,
            this.connectorsRect.at(0).pos.y - sizes.socket.border / 2
          ),
          sizes.socket.hebelBreite * 2,
          0
        ))
    ) {
      this.closed = !this.closed;
      return true;
    }

    // Prüfen ob die Rect Connectors getroffen worden sind, aber nur die auf der Linken Seite
    // und auch nur wenn der Hebel nicht geschlossen ist.
    // Die letzte reihe ist ebenfalls ausgeschlossen da der kleinste IC eine Größe von 4 hat (NOT).
    for (let i = 0; i < this.pinCount - 2 && !this.closed; i = i + 2) {
      if (this.connectorsRect.at(i).isClicked()) {
        // TODO Click auf den RectConnector weiter verarbeiten.
        console.log(this.connectorsRect.at(i));
        return true;
      }
    }

    // Prüfen ob die Circle Connectors getroffen worden sind.
    for (let i = 0; i < this.pinCount; i++) {
      if (this.connectorsCircle.at(i).isClicked()) {
        console.log(this.connectorsCircle.at(i).pos);
        return true;
      }
    }
    return false;
  }

  update() {}
}
