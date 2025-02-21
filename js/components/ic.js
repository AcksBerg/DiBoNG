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
    this.gates = [];
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
      // TODO für debug zwecke, schleift die signale von horizontal durch.
      this.connectorsPlug.at(-1).connect(this.connectorsPlug.at(-2));
      this.connectorsPlug.at(-2).connect(this.connectorsPlug.at(-1));
    }
  }

  addGate(gate, pin_indexes) {
    // input pins verbinden
    for (let index = 0; index < pin_indexes.length - 1; index++) {
      this.connectorsPlug[pin_indexes[index]].connect(gate.inputs[index]);
    }
    // output pin verbinden
    gate.output.connect(
      this.connectorsPlug[pin_indexes[pin_indexes.length - 1]]
    );
    this.gates.push(gate);
  }

  simulate() {
    this.gates.forEach((gate) => {
      gate.compute();
    });
    this.gates.forEach((gate) => {
      gate.output.connected.forEach((connectedPin) => {
        connectedPin.active = gate.output.active;
      });
    });
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
    return true;
  }

  move(offset, target) {
    if (target !== undefined) {
      this.pos = createVector(target.pos.x, target.pos.y).add(
        createVector(sizes.pin.rect / 2, -sizes.pin.plug_breite / 2)
      );
    } else {
      this.pos = getWorldMousePos().sub(offset);
    }
    this.movePins();
  }

  movePins() {
    for (let i = 0; i < this.connectorsPlug.length; i += 2) {
      this.connectorsPlug.at(i).pos = createVector(
        this.pos.x,
        this.pos.y +
          sizes.socket.border / 2 +
          sizes.pin.rect_versatz +
          ((sizes.socket.yVersatz / 2) * i) / 2
      );
      this.connectorsPlug.at(i + 1).pos = createVector(
        this.pos.x + sizes.socket.xVersatz,
        this.pos.y +
          sizes.socket.border / 2 +
          sizes.pin.rect_versatz +
          ((sizes.socket.yVersatz / 2) * i) / 2
      );
    }
  }
  
  connectWithSocketAtPin(socket, at) {
    // Falls einer der Pins schon eine Verbindung mit einem Plug hat kann er nicht Verbunden werden.
    if (
      socket.connectorsRect
        .slice(at, at + this.connectorsPlug.length)
        .filter(
          (pin) =>
            pin.connected.filter((con) => con.type === "plug").length === 0
        ).length !== this.connectorsPlug.length
    ) {
      return false;
    }
    this.move(createVector(0, 0).add(), socket.connectorsRect.at(at));
    for (let k = 0; k < this.connectorsPlug.length; k++) {
      this.connectorsPlug.at(k).connect(socket.connectorsRect.at(at + k));
      socket.connectorsRect.at(at + k).connect(this.connectorsPlug.at(k));
    }
    return true;
  }
  update() {}
}
