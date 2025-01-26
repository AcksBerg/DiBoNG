class Led {
  constructor(
    pos,
    size = sizes.led.circle,
    colorSet = { on: colors.ledRedOn, off: colors.ledRedOff }
  ) {
    this.pos = pos;
    this.size = size;
    this.colorSet = colorSet;
    this.active = false;
  }

  show() {
    noStroke();
    fill(this.active ? this.colorSet.on : this.colorSet.off);
    circle(this.pos.x, this.pos.y, this.size);
  };

  update(signal) {
    signal.visit(this);
  }
}
