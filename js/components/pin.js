/**
 * Ein Pin der als Circle(für Normale Verbinder auf dem DigiBoard)/Rect(Für Verbinder auf einem Sockel)/Plug(Für Verbinder an einem IC) dagestellt werden kann, aber immer die gleiche funktion beinhaltet.
 * Die Klasse dient immer als Connector für Kabel und um Signale weiterzuleiten.
 */

class Pin {
  constructor(pos, type = "circle", gesperrt = false) {
    this.id = pin_id;
    pin_id++;
    this.pos = pos;
    this.connected = [];
    this.active = false;
    this.type = type;
    this.gesperrt = gesperrt;
    id_obj.push([this, this.id]);
  }

  /**
   * Show zeichnet die verschiedenen Pin-Typen.
   */
  show() {
    noStroke();
    if (this.type == "circle") {
      fill(colors.pin);
      circle(this.pos.x, this.pos.y, sizes.pin.circle);
      if (showMoreInfo) {
        fill(this.active ? colors.activeSignal : colors.deactiveSignal);
        circle(this.pos.x, this.pos.y, sizes.pin.circle / 2);
      }
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
      if (showMoreInfo) {
        fill(this.active ? colors.activeSignal : colors.deactiveSignal);
        rect(
          this.pos.x + sizes.pin.rect * 0.165,
          this.pos.y + sizes.pin.rect_versatz / 2,
          sizes.pin.rect * 0.66,
          sizes.pin.rect_versatz
        );
      }
    } else if (this.type == "plug") {
      fill(colors.silver);
      rect(
        this.pos.x - sizes.pin.rect_versatz * 1.5,
        this.pos.y - sizes.pin.rect_versatz * 1.5,
        sizes.pin.plug_breite,
        sizes.pin.plug_breite,
        sizes.pin.plug_rundung
      );
      if (showMoreInfo) {
        fill(this.active ? colors.activeSignal : colors.deactiveSignal);
        rect(
          this.pos.x - sizes.pin.rect_versatz * 1.5,
          this.pos.y - sizes.pin.rect_versatz,
          sizes.pin.plug_breite,
          sizes.pin.plug_breite * 0.66,
          sizes.pin.plug_rundung
        );
      }
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
  isClicked({ click_type = "click" } = {}) {
    const clicked =
      (this.type === "circle" && inCircle(this.pos, sizes.pin.circle, 0)) ||
      (this.type === "rect" &&
        inRect(
          this.pos,
          createVector(sizes.pin.rect, sizes.pin.rect_versatz * 2)
        ));

    if (clicked && this.type === "circle") {
      if (currentCable === null) {
        currentCable = new Cable(this, [], null, cableColor);
      } else {
        if (currentCable.connectTo(this)) {
          cables.push(currentCable);
          currentCable = null;
        }
      }
    }

    return clicked;
  }

  /**
   * Update wird aufgerufen wenn das Signal den Pin erreicht.
   * @param {Signal} signal Ein Objekt zur Signalverarbeitung
   */
  update(signal, entsperren = false) {
    // TODO Handling vom Loop hinzufügen siehe Signal TODO
    // Compute erzeugt neues Siganal am output pin
    // TODO Update vom IC wird aufgerufen vom Pin update
    signal.visit(this, entsperren);
    this.connected
      .filter((obj) => !signal.visited.includes(obj) && !obj.gesperrt)
      .forEach((obj) => {
        obj.update(signal);
      });
  }
}
