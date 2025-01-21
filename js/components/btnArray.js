class BtnArray {
  constructor(pos, size = 20) {
    this.pos = pos;
    this.size = size;
    this.buttons = [
      new TwoBtnToggle(this.pos, this.size),
      new TwoBtnToggle(createVector(this.pos.x, this.pos.y + 30), this.size),
      new TwoBtnToggle(createVector(this.pos.x, this.pos.y + 60), this.size),
      new TwoBtnToggle(createVector(this.pos.x, this.pos.y + 90), this.size),
    ];
  }
  update() {
    // Die Transformation von zoom und translate zurückrechnen
    let worldMouseX = (mouseX - cam.x) / zoom;
    let worldMouseY = (mouseY - cam.y) / zoom;

    if (
      worldMouseX > this.pos.x &&
      worldMouseX < this.pos.x + this.size * 3 &&
      worldMouseY > this.pos.y &&
      worldMouseY < this.pos.y + this.size * 6
    ) {
      this.buttons.forEach((button) => {
        button.update();
      });
    }
  }
  show() {
    noStroke();
    fill(colors.btnInactive);
    rect(this.pos.x - 5, this.pos.y - 5, this.size * 3, this.size * 6);
    this.buttons.forEach((button) => {
      button.show();
    });
  }
}
