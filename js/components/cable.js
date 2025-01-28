class Cable {
  constructor(startPin, links = [], endPin = null, color = colors.ledRedOn) {
    this.startPin = startPin;
    this.links = links;
    this.endPin = endPin;
    this.color = color;
  }

  show() {
    noFill();
    strokeWeight(strokeWeights.small);
    stroke(this.color);

    let lastPos = this.startPin.pos;

    this.links.forEach((link) => {
      line(lastPos.x, lastPos.y, link.x, link.y);
      lastPos = link;
    });

    const endPos = this.endPin ? this.endPin.pos : getWorldMousePos();

    line(lastPos.x, lastPos.y, endPos.x, endPos.y);
  }

  addLinks() {
    // TODO nur links hinzufügen die eine distanze von x von den anderen links entfernt sind.
    if (pinClickedThisFrame) {
      return;
    }
    this.links.push(getWorldMousePos());
  }

  removeLink() {
    if (this.links.length === 0) {
      currentCable = null;
      return;
    }

    this.links.pop();
  }

  nearCableLink() {
    const offset = 100;
    // in der nähe vom StartPin
    if (inCircle(this.startPin.pos, sizes.pin.circle, offset)) {
      return this.startPin.pos;
    }

    // in der nähe von einem der Segmente
    for (let i = 0; i < this.links.length; i++) {
      if (inCircle(this.links.at(i), sizes.pin.circle, offset)) {
        return this.links.at(i);
      }
    }

    // in der nähe vom EndPin
    if (inCircle(this.endPin.pos, sizes.pin.circle, offset)) {
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
