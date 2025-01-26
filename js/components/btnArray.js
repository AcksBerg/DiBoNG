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
    // Die Transformation von zoom und translate zurückrechnen
    let worldMouseX = (mouseX - cam.x) / zoom;
    let worldMouseY = (mouseY - cam.y) / zoom;

    if (
      worldMouseX > this.pos.x &&
      worldMouseX < this.pos.x + sizes.btnArray.size * 3 &&
      worldMouseY > this.pos.y &&
      worldMouseY < this.pos.y + sizes.btnArray.size * 6
    ) {
      this.buttons.forEach((button) => {
        button.update();
      });
    }
  }
  show() {
    noStroke();
    fill(colors.btnInactive);
    rect(this.pos.x, this.pos.y, sizes.btnArray.size * 3, sizes.btnArray.size * 6);
    this.buttons.forEach((button) => {
      button.show();
    });
  }
}
