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
      fill(colors.pin);
      circle(this.pos.x, this.pos.y, sizes.pin.circle);
    } else if (this.type == "rect") {
      fill(colors.pin);
      rect(this.pos.x, this.pos.y, sizes.pin.rect, sizes.pin.rect_versatz);
      fill(colors.silver);
      rect(
        this.pos.x,
        this.pos.y + sizes.pin.rect_versatz,
        sizes.pin.rect,
        sizes.pin.rect_versatz
      );
    } else if (this.type == "plug") {
      fill(colors.silver);
      rect(
        this.pos.x - sizes.pin.rect_versatz * 1.5,
        this.pos.y - sizes.pin.rect_versatz * 1.5,
        sizes.pin.rect_versatz * 3,
        sizes.pin.rect_versatz * 3,
        1
      );
    }
  }

  /**
   * Verbinde ein Objekt mit einem Connector und Sende das entsprechende Signal an das neu Angeschlossene Objekt
   * @param {object} obj Das Objekt welches angeschlossen werden soll
   */
  connect(obj) {
    this.connected.push(obj);
    this.update(new Signal(this));
  }

  /**
   * Entfernt die Verbindung zu einem Objekt und sendet ein False Signal um es auf Aus zu stellen.
   * @param {Object} obj Das Objekt welches von dem Connector entfernt werden soll.
   */
  disconnect(obj) {
    this.connected = this.connected.filter((item) => item !== obj);
    obj.update(new Signal(false));
  }

  /**
   * Aufzurufen wenn ein Click ausgeführt worden ist und geprüft werden soll on der Connector getroffen worden ist.
   * @returns {boolean} true = wenn es angeclickt worden ist, false = wenn es nicht angeklickt worden ist.
   */
  isClicked() {
    const clicked =
      (this.type === "circle" && inCircle(this.pos, sizes.pin.circle, 0)) ||
      (this.type === "rect" &&
        inRect(
          this.pos,
          createVector(sizes.pin.rect, sizes.pin.rect_versatz * 2)
        ));
    
    if (clicked && this.type==="circle") {
      // TODO überprüfen ob das wirklich die beste methode ist den letzten geklickten pin zu bekommen
      // TODO prüfen ob der start und der Endpin unterschiedliche pins sind.
      pinClickedThisFrame = this;
      if (currentCable === null) {
        currentCable = new Cable(this);
      } else {
        currentCable.connectTo(this);
        cables.push(currentCable);
        currentCable = null;
      }
    }

    return clicked;
  }

  update(signal) {
    // TODO Handling vom Loop hinzufügen siehe Signal TODO
    signal.visit(this);
    this.connected
      .filter((item) => !signal.visited.includes(item))
      .forEach((obj) => {
        obj.update(signal);
      });
  }
}
