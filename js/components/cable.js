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
      (!this.endPin && this.startPin.pos.dist(pos) < sizes.cable.minAbstand) ||
      this.links.filter((e) => e.dist(pos) < sizes.cable.minAbstand).length > 0
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
      this.startPin.pos.dist(pos) < sizes.cable.minAbstand ||
      this.links.filter((e) => e.dist(pos) < sizes.cable.minAbstand).length > 0
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
            this.links.at(i).x - sizes.cable.link_rect / 1.5,
            this.links.at(i).y - sizes.cable.link_rect / 1.5
          ),
          createVector(sizes.cable.link_rect * 1.5, sizes.cable.link_rect * 1.5)
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
   * Kontrolliert ob auf ein Kabel-Segment geklickt worden ist.
   * @returns {boolean} True - Wenn auf das kabel geklickt worden ist; False - Wenn nicht auf das Kabel geklickt worden ist.
   */
  onCable() {
    /**
     * Gibt die Bounding Box um zwei Punkte zurück.
     * @param {p5.Vector} punkt1 Punkt1
     * @param {p5.Vector} punkt2 Punkt2
     * @returns {obj} Objekt mit pos (p5.Vector), angle(Degrees), w(idth), h(eight)
     */
    function createBoundingBox(punkt1, punkt2) {
      // Auf ein p5.Vector Objekt die Rechnungen ausführen, damit die Ursprungswerte nicht verändert werden.
      const dir = p5.Vector.sub(punkt2, punkt1);

      return {
        pos: p5.Vector.add(punkt1, punkt2).div(2),
        angle: atan2(dir.y, dir.x),
        w: dir.mag() + sizes.pin.circle * 2,
        h: sizes.pin.circle * 2,
      };
    }

    /**
     * Prüft ob die Maus-Position innerhalb der BoundingBox ist.
     * @param {object} boundingBox Ein Objekt welches dem Muster pos(p5.Vector) an der Center-Position, angle(degrees) als Ausrichtung, w(idth), h(eight) entsprechen muss.
     * @returns {boolean} True - Wenn sich Maus innerhalb der BoundingBox befindet; False - Wenn sich die Maus ausserhalb der BoundingBox befindet.
     */
    function inBoundingBox(boundingBox) {
      // Punkt ins Rechteck-Koordinatensystem verschieben
      let translated = p5.Vector.sub(getWorldMousePos(), boundingBox.pos);

      // Punkt umgekehrt rotieren (also den Punkt wie das Rechteck Rotieren)
      let unrotated = createVector(
        translated.x * cos(-boundingBox.angle) -
          translated.y * sin(-boundingBox.angle),
        translated.x * sin(-boundingBox.angle) +
          translated.y * cos(-boundingBox.angle)
      );

      // Prüfen ob der Rotierte Punkt in der BoundingBox liegt.
      return (
        abs(unrotated.x) <= boundingBox.w / 2 &&
        abs(unrotated.y) <= boundingBox.h / 2
      );
    }

    let lastPos = this.startPin.pos;
    for (const link of this.links) {
      if (inBoundingBox(createBoundingBox(lastPos, link))) {
        return true;
      }
      lastPos = link;
    }
    return inBoundingBox(createBoundingBox(lastPos, this.endPin.pos));
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
