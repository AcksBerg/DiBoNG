/**
 * Die Klasse Kabel arbeitet zusammen mit den globalen Variablen currentCable und cables und ermöglicht das Zeichnen von Kabeln
 */
class Cable {
  constructor(startPin, links = [], endPin = null, color = colors.cableRed) {
    this.startPin = startPin;
    this.links = links;
    this.endPin = endPin;
    this.color = color;
  }

  /**
   * Das Kabel zeichnen
   */
  show() {
    strokeWeight(strokeWeights.medium);
    stroke(this.color);
    fill(this.color);

    let lastPos = this.startPin.pos;
    this.links.forEach((link) => {
      line(lastPos.x, lastPos.y, link.x, link.y);
      rect(
        link.x - sizes.cable.link_rect / 2,
        link.y - sizes.cable.link_rect / 2,
        sizes.cable.link_rect
      );
      lastPos = link;
    });

    const pos = getWorldMousePos();
    const endPos = this.endPin ? this.endPin.pos : pos;
    // Falls die anderen Links nicht weit genug entfernt sind kann kein neuer Link hinzugefügt werden.
    // Als Nutzer Feedback wird das Kabel Transparent.
    if (
      !this.endPin &&
      (dist(this.startPin.pos.x, this.startPin.pos.y, pos.x, pos.y) <
        sizes.cable.minAbstand ||
        this.links.filter(
          (e) => dist(e.x, e.y, pos.x, pos.y) < sizes.cable.minAbstand
        ).length > 0)
    ) {
      stroke(
        setHSLALightAndTrans({ color: this.color, trans: colors.cableTrans })
      );
    }
    line(lastPos.x, lastPos.y, endPos.x, endPos.y);
  }

  /**
   * Neue Segmente dem Kabel hinzufügen
   * @returns Ist nur dafür da um die Funktion frühzeitig zu beenden. Gibt None zurück.
   */
  addLinks() {
    const pos = getWorldMousePos();

    // Falls die anderen Links nicht weit genug entfernt sind kann kein neuer Link hinzugefügt werden.
    if (
      dist(this.startPin.pos.x, this.startPin.pos.y, pos.x, pos.y) <
        sizes.cable.minAbstand ||
      this.links.filter(
        (e) => dist(e.x, e.y, pos.x, pos.y) < sizes.cable.minAbstand
      ).length > 0
    ) {
      return;
    }
    this.links.push(pos);
  }

  /**
   * Entfernt das letzte Element von dem Kabel
   * @returns Ist nur dafür da um die Funktion frühzeitig zu beenden. Gibt None zurück.
   */
  removeLink() {
    if (this.links.length === 0) {
      currentCable = null;
      return;
    }

    this.links.pop();
  }

  /**
   * Kontrolliert ob in der nähe von der Maus eine Kabel-"Ecke" ist.
   * @returns {Vector} Liefert einen Vector mit dem Element zurück welches angeklickt worden ist.
   */
  nearCableLink() {
    // in der nähe vom StartPin
    if (inCircle(this.startPin.pos, sizes.pin.circle, 100)) {
      return this.startPin.pos;
    }

    // in der nähe von einem der Segmente
    for (let i = 0; i < this.links.length; i++) {
      if (
        inRect(
          createVector(
            this.links.at(i).x - sizes.cable.link_rect/1.5,
            this.links.at(i).y - sizes.cable.link_rect/1.5
          ),
          createVector(sizes.cable.link_rect*1.5, sizes.cable.link_rect*1.5)
        )
      ) {
        return this.links.at(i);
      }
    }

    // in der nähe vom EndPin
    if (inCircle(this.startPin.pos, sizes.pin.circle, 100)) {
      return this.endPin.pos;
    }
    return null;
  }

  /**
   * Verbindet ein Kabel mit seinem Start und EndPin.
   * @returns bool - true, Verbindung wurde hergestellt. false, Verbindung wurde nicht hergestellt.
   */
  connectTo(endPin) {
    if (endPin === this.startPin) {
      return false;
    }
    this.endPin = endPin;
    this.startPin.connect(this.endPin);
    this.endPin.connect(this.startPin);
    return true;
  }
}
