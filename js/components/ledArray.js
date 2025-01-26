class LedArray {
  constructor(pos, colorSet = { on: colors.ledRedOn, off: colors.ledRedOff }) {
    this.pos = pos;
    this.colorSet = colorSet;
    this.leds = [];
    this.connectors = [];
    for (let i = 0; i < 4; i++) {
      this.leds.push(
        new Led(
          createVector(
            this.pos.x + sizes.ledArray.ledVersatz,
            this.pos.y + sizes.ledArray.yVersatz * i
          ),
          sizes.led.ledArray,
          this.colorSet
        )
      );
      this.connectors.push(
        new Pin(createVector(this.pos.x, this.pos.y + sizes.ledArray.yVersatz * i))
      );
      this.connectors.at(-1).connect(this.leds.at(-1));
    }
  }

  show() {
    for (let i = 0; i < 4; i++) {
      stroke(colors.outline);
      line(
        this.connectors[i].pos.x,
        this.connectors[i].pos.y,
        this.leds[i].pos.x,
        this.leds[i].pos.y
      );
      fill(colors.outline);
      noStroke();
      textSize(textSizes.small);
      text(
        i + 1,
        this.connectors[i].pos.x +
          (this.leds[i].pos.x - this.connectors[i].pos.x) / 2,
        this.connectors[i].pos.y - 5
      );
      this.leds[i].show();
      this.connectors[i].show();
    }
    this.connectors.forEach((pin) => {
      pin.show();
    });
    this.leds.forEach((led) => {
      led.show();
    });
  }

  update() {
    // TODO click
  }
}
