class Led {
  constructor(
    pos,
    size = 6,
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
    // Check auf undefined, da sonst der foreach call beim mouseClick im mainSketch die LED zerschießt.
    if(signal.value == undefined){
      return
    }
    this.active = signal.value;
  }
}
