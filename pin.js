class Pin {
  constructor(pos, type = "circle") {
    this.pos = pos;
    this.connected = [];
    this.active = false;
    this.type = type;
  }

  show() {
    // TODO: types Circle(Normales Board), Rect(Auf dem Sockel), Plug(An dem IC), PlugNoGUI(In dem IC)
    // TODO: Update vom IC wird aufgerufen vom Pin update
    // Compute erzeugt neues Siganal am output pin 
    noStroke();
    if (this.type == "circle") {
      fill(colors.connectorPin);
      circle(this.pos.x, this.pos.y, 4);
    } else {
      const versatz = 1;
      fill(colors.btnActive);
      rect(this.pos.x, this.pos.y, 8, versatz);
      fill(colors.outline);
      rect(this.pos.x, this.pos.y + versatz, 8, versatz);
    }
  }

  connect(obj) {
    this.connected.push(obj);
    this.update(new Signal(this.active));
  }

  disconnect(obj) {
    this.connected = this.connected.filter((item) => item !== obj);
    obj.update(new Signal(false));
  }

  update(signal) {
    // TODO Click hinzufügen
    this.active = signal.value;
    signal.visited.push(this);
    this.connected.filter((item) => !signal.visited.includes(item)).forEach((obj) => {      
      obj.update(signal);
    });
  }
}
