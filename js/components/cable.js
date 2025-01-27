class Cable {
  constructor(
    startPin,
    links = [],
    endPin = null,
    color = colors.ledRedOn
  ) {
    this.startPin = startPin;
    this.links = links;
    this.endPin = endPin;
    this.color = color;
  }

  show() {
    noFill();
    strokeWeight(strokeWeights.small);
    stroke(this.color);
    const endPos = this.endPin ? this.endPin.pos : getWorldMousePos();
    line(
      this.startPin.pos.x,
      this.startPin.pos.y,
      endPos.x,
      endPos.y
    );
  }

  connectTo(endPin) {
    this.endPin = endPin;
    this.startPin.connect(this.endPin);
    this.endPin.connect(this.startPin);
  }
}
