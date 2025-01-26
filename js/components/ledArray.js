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
        new Pin(
          createVector(this.pos.x, this.pos.y + sizes.ledArray.yVersatz * i)
        )
      );
      this.connectors.at(-1).connect(this.leds.at(-1));
    }
  }

  show() {
    strokeWeight(strokeWeights.medium);
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
    if (
      !inRect(
        createVector(
          this.pos.x - sizes.pin.circle / 2,
          this.pos.y - sizes.pin.circle / 2
        ),
        createVector(
          sizes.pin.circle,
          sizes.ledArray.yVersatz * (this.connectors.length - 1) +
            sizes.pin.circle
        )
      )
    ) {
      return;
    }
    for (let i = 0; i < this.connectors.length; i++) {
      if (this.connectors.at(i).isClicked()) {
        // TODO Was passiert wenn man auf den Connector clickt
        return;
      }
    }
  }
}
