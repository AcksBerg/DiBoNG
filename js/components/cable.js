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

  connectTo(endPin) {
    this.endPin = endPin;
    this.startPin.connect(this.endPin);
    this.endPin.connect(this.startPin);
  }
}
