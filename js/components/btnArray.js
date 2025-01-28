class BtnArray {
  constructor(pos) {
    this.pos = pos;
    this.buttons = [];
    for (let i = 0; i < 4; i++) {
      this.buttons.push(
        new TwoBtnToggle(
          createVector(
            this.pos.x + sizes.btnArray.size / 4,
            this.pos.y + sizes.btnArray.size / 4 + sizes.btnArray.size * 1.5 * i
          )
        )
      );
    }
  }
  update() {
    if (
      !inRect(
        this.pos,
        createVector(
          ((sizes.btnArray.size / 4) * 3 + sizes.btnArray.size * 2) * 1.5 +
            sizes.btnArray.size / 4 +
            sizes.pin.circle,
          sizes.btnArray.size * 1.5 * this.buttons.length
        )
      )
    ) {
      return;
    }
    for(let i=0; i<this.buttons.length; i++){
      this.buttons.at(i).update();
    }
  }
  show() {
    noStroke();
    fill(colors.panel);
    rect(
      this.pos.x,
      this.pos.y,
      sizes.btnArray.size * 3,
      sizes.btnArray.size * 6
    );
    this.buttons.forEach((button) => {
      button.show();
    });
  }
}
