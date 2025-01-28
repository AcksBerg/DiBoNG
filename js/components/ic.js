class Ic {
  constructor(pos, rowCount, name) {
    if (rowCount <= 1) {
      throw new Error("Die Zeilen-Anzahl des Sockels muss größer 1 sein!");
    }
    this.pos = pos;
    this.rowCount = rowCount;
    this.name = name;
    this.textSize = findFontSize(this.name, sizes.socket.xVersatz, 0.1);
    this.connectorsPlug = [];
    for (let i = 0; i < this.rowCount; i++) {
      this.connectorsPlug.push(
        new Pin(
          createVector(
            this.pos.x,
            this.pos.y +
              sizes.socket.border / 2 +
              sizes.pin.rect_versatz +
              (sizes.socket.yVersatz / 2) * i
          ),
          "plug"
        )
      );
      this.connectorsPlug.push(
        new Pin(
          createVector(
            this.pos.x + sizes.socket.xVersatz,
            this.pos.y +
              sizes.socket.border / 2 +
              sizes.pin.rect_versatz +
              (sizes.socket.yVersatz / 2) * i
          ),
          "plug"
        )
      );
    }
  }
  show() {
    for (let i = 0; i < this.connectorsPlug.length; i++) {
      this.connectorsPlug.at(i).show();
    }
    noStroke();
    fill(colors.ic);
    rect(
      this.pos.x,
      this.pos.y,
      sizes.socket.xVersatz,
      sizes.socket.border +
        (sizes.socket.yVersatz / 2) * (this.rowCount - 1) +
        sizes.pin.rect_versatz * 2
    );
    fill(colors.panel);
    arc(
      this.pos.x + sizes.socket.xVersatz / 2,
      this.pos.y,
      sizes.led.btn,
      sizes.led.btn,
      0,
      180
    );
    textSize(this.textSize);
    fill(colors.silver);
    if (this.rowCount < 4) {
      textAlign(LEFT, TOP);
      text(this.name, this.pos.x, this.pos.y + sizes.led.btn);
    } else {
      push();
      translate(this.pos.x, this.pos.y);
      rotate(90);
      textAlign(LEFT, BOTTOM);
      text(this.name, sizes.led.btn, 0);
      pop();
    }
  }

  isClicked() {
    if (
      !inRect(
        this.pos,
        createVector(
          sizes.socket.xVersatz,
          sizes.socket.border +
            (sizes.socket.yVersatz / 2) * (this.rowCount - 1) +
            sizes.pin.rect_versatz * 2
        )
      )
    ) {
      return false;
    }
    // TODO was passiert wenn man ein IC angeklickt hat.
    console.log("IC wurde angeklickt");
    return true;
  }

  update() {
  }
}
