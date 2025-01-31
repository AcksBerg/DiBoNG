/**
 * Die Klasse LedArray welche 4x Pins beinhaltet, welche mit 4x LEDs verbunden sind.
 */
class LedArray {
  constructor(pos, color = colors.ledRed) {
    this.pos = pos;
    this.color = color;
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
          this.color
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


  /**
   * Zeichnet die Connectoren und LEDs
   */
  show() {
    strokeWeight(strokeWeights.medium);
    for (let i = 0; i < this.leds.length; i++) {
      // Linie zwischen Led und Connector
      stroke(colors.outline);
      line(
        this.connectors[i].pos.x,
        this.connectors[i].pos.y,
        this.leds[i].pos.x,
        this.leds[i].pos.y
      );
      // Die Nummerierung
      fill(colors.outline);
      noStroke();
      textSize(textSizes.small);
      text(
        i + 1,
        this.connectors[i].pos.x +
          (this.leds[i].pos.x - this.connectors[i].pos.x) / 2,
        this.connectors[i].pos.y - 5
      );
      this.leds.at(i).show();
      this.connectors.at(i).show();
    }
  }

  /**
   * Kontrolliert ob ein Connector angeklickt worden ist, prüft auch nur im Bereich der Connectoren auf den Click.
   * @returns {boolean} true = Ein Element welches eine Funktion auslöst wurde geklickt, false = das Element wurde verfehlt oder nichts von relevanz angeklickt.
   */
  isClicked(){
    // Return in Statement damit es direkt gecancelt wird nachdem etwas getroffen worden ist. Man kann ja nur ein Element pro click auswählen
    if (
      !inRect(
        createVector(
          this.pos.x - sizes.pin.circle,
          this.pos.y - sizes.pin.circle
        ),
        createVector(
          sizes.pin.circle + sizes.pin.circle,
          sizes.ledArray.yVersatz * (this.connectors.length - 1) +
            sizes.pin.circle * 2
        )
      )
    ) {
      return false;
    }
    for (let i = 0; i < this.connectors.length; i++) {
      if (this.connectors.at(i).isClicked()) {
        return true;
      }
    }
    return false;
  }

  update() {
  }
}
