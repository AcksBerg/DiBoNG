/**
 * Die Klasse IC beinhaltet sich selbst und die Verbundenen Pins vom Type Plug.
 */


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
    this.socket = null;
    this.connectorsPlugInvisible= [];

    // Die Plugs werden immer im wechsel Links Rechts hinzugefügt
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
      // jeder ic hat 100 unsichtbare pins für interne verschaltungen
      for (let index = 0; index < 100; index++) {
        this.connectorsPlugInvisible.push(new Pin())
        
      }


      // TODO für debug zwecke, schleift die signale von horizontal durch. Später entfernen
      // this.connectorsPlug.at(-1).connect(this.connectorsPlug.at(-2));
      // this.connectorsPlug.at(-2).connect(this.connectorsPlug.at(-1));
    }
  }

  /**
  *Hinzufügen von Gates zum IC.
  1. Parameter ist das hinzuzufügende Gate,
  2. Parameter sind die Pins auf dem IC an denen das Gate angeschlossen ist. letzter Pin des Arrays ist Output,
  Bsp: ic.addGate(new And,[ICPIN0,ICPIN1,ICPIN3])
  */
  addGate(gate, pins) {
    // input pins verbinden
    for (let index = 0; index < pins.length - 1; index++) {
      pins[index].connect(gate.inputs[index]);
    }
    // output pin verbinden
    gate.output.connect(
      pins[pins.length - 1]
    );
    this.gates.push(gate);
  }

  /**
   * Simuliert alle gates auf einem IC durch. 
   * Muss aufgerufen werden, damit Gates schalten.
   */
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

  /**
   * Zeichnet den IC und dessen Plugs welche das IC umfassen.
   */
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

  /**
   * Prüft, ob die Maus über dem IC liegt und falls ja, ob es mit einem Sockel verbunden ist der geöffnet oder geschlossen ist.
   * @returns bool - true = das IC wurde angeklickt und kann bewegt werden. false = das IC wurde verfehlt oder kann nicht bewegt werden.
   */
  isClicked() {
    // Ist die Maus über dem IC
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

    // Steckt das IC grade in einem Sockel und falls ja ist der Sockel geöffnet.
    return !this.socket || !this.socket.closed;
  }

  /**
   * Methode zum bewegen des IC
   * @param {*} offset Der Abstand zur Maus über dem IC, damit sich das Bewegen natürlicher anfühlt und nicht immer von der oberen Linken Ecke aus durchgeführt wird.
   * @param {*} socket? Wenn ein Sockel angegeben ist, wird der IC auf diesem Ordentlich ausgerichtet.
   */
  move(offset, socket) {
    // 
    if (socket !== undefined) {
      this.pos = createVector(socket.pos.x, socket.pos.y).add(
        createVector(sizes.pin.rect / 2, -sizes.pin.plug_breite / 2)
      );
    } else {
      this.pos = getWorldMousePos().sub(offset);
    }

    // Die Pins zum IC bewegen.
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

  /**
   * Den IC mit dem Sockel Verbinden
   * @param {*} socket Der Sockel mit dem der IC verbunden werden soll
   * @param {*} at Ab dem wievielten Pin des Sockels der IC Verbunden werden soll
   * @returns bool - true = IC wurde erfolgreich verbunden. false = IC konnte nicht verbunden werden.
   */
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

    // Verbinde den IC
    this.move(createVector(0, 0), socket.connectorsRect.at(at));
    for (let k = 0; k < this.connectorsPlug.length; k++) {
      this.connectorsPlug.at(k).connect(socket.connectorsRect.at(at + k));
      socket.connectorsRect.at(at + k).connect(this.connectorsPlug.at(k));
    }
    this.socket = socket;
    return true;
  }

  /**
   * Löst den IC von dem Sockel
   * @returns bool - true = IC wurde erfolgreich gelöst. false = IC konnte nicht gelöst werden.
   */
  disconnectFromSocket() {
    // Check ob die Pins überhaupt eine Verbindung haben
    if (
      this.connectorsPlug.filter((plug) =>
        plug.connected.filter((pin) => pin.type === "rect")
      ).length === 0
    ) {
      return false;
    }
    this.connectorsPlug.forEach((plug) => {
      plug.connected
        .filter((pin) => pin.type === "rect")
        .forEach((pin_rect) => {
          plug.disconnect(pin_rect);
          pin_rect.disconnect(plug);
        });
    });
    this.socket = null;
    return true;
  }

  update() {}
  
}

function simulate_ics(){
  /**
   * Lässt bei Aufruf alle ICs rechnen, damit die gates aktualisiert werden
   */
  ics.forEach(ic => {
    ic.simulate();
  });
}