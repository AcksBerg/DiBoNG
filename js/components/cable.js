class Cable {
  constructor(
    startPin,
    links = [],
    endPin = null,
    color = { norm: colors.cableRed, trans: colors.cableRedTrans }
  ) {
    this.startPin = startPin;
    this.links = links;
    this.endPin = endPin;
    this.color = color;
  }

  show() {
    noFill();
    strokeWeight(strokeWeights.small);
    stroke(this.color.norm);

    let lastPos = this.startPin.pos;

    this.links.forEach((link) => {
      line(lastPos.x, lastPos.y, link.x, link.y);
      lastPos = link;
    });

    const pos = getWorldMousePos();
    const endPos = this.endPin ? this.endPin.pos : pos;
    // Falls die anderen Links nicht weit genug entfernt sind kann kein neuer Link hinzugefügt werden.
    // Als Nutzer Feedback wird das Kabel Transparent.
    if (
      !this.endPin &&
      this.links.filter(
        (e) => dist(e.x, e.y, pos.x, pos.y) < sizes.cable.minAbstand
      ).length > 0
    ) {
      stroke(this.color.trans);
    }
    line(lastPos.x, lastPos.y, endPos.x, endPos.y);
  }

  addLinks() {
    // TODO nur links hinzufügen die eine distanze von x von den anderen links entfernt sind.
    if (pinClickedThisFrame) {
      return;
    }
    const pos = getWorldMousePos();
    
    // Falls die anderen Links nicht weit genug entfernt sind kann kein neuer Link hinzugefügt werden.
    if (
      this.links.filter(
        (e) => dist(e.x, e.y, pos.x, pos.y) < sizes.cable.minAbstand
      ).length > 0
    ) {
      return;
    }
    this.links.push(pos);
  }

  removeLink() {
    if (this.links.length === 0) {
      currentCable = null;
      return;
    }

    this.links.pop();
  }

  nearCableLink() {
    // in der nähe vom StartPin
    if (inCircle(this.startPin.pos, sizes.cable.minAbstand)) {
      return this.startPin.pos;
    }

    // in der nähe von einem der Segmente
    for (let i = 0; i < this.links.length; i++) {
      if (inCircle(this.links.at(i), sizes.cable.minAbstand)) {
        return this.links.at(i);
      }
    }

    // in der nähe vom EndPin
    if (inCircle(this.endPin.pos, sizes.cable.minAbstand)) {
      return this.endPin.pos;
    }
    return null;
  }

  connectTo(endPin) {
    this.endPin = endPin;
    this.startPin.connect(this.endPin);
    this.endPin.connect(this.startPin);
  }
}
