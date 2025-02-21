/**
 * Die Klasse für den PowerButton, abhängig davon, ob er aktiviert oder deaktiviert
 * ist geben die Signale den gewünschten Status weiter oder ein False.
 */
class PowerButton {
  constructor(pos) {
    this.pos = pos;
    this.active = true;
  }

  /**
   * Show zeichnet den PowerButton abhängig vom Zustand.
   */
  show() {
    // Zeichnen des Schriftzug
    noStroke();
    fill(colors.outline);
    const textWidth = findFontSize("MAINS", sizes.powerButton.width);
    textSize(textWidth);
    text("MAINS", this.pos.x, this.pos.y);
    // Die Umrandung
    fill(colors.panel);
    rect(
      this.pos.x,
      this.pos.y + sizes.powerButton.mainsDisplacement,
      sizes.powerButton.width,
      sizes.powerButton.height
    );
    // Der Schalter
    fill(colors.ic);
    rect(
      this.pos.x + sizes.powerButton.border,
      this.pos.y +
        sizes.powerButton.mainsDisplacement +
        sizes.powerButton.border,
      sizes.powerButton.width - sizes.powerButton.border * 2,
      sizes.powerButton.height - sizes.powerButton.border * 2,
      2
    );
    // Die Status LED
    fill(
      setHSLALightAndTrans({
        color: colors.ledGreen,
        lightness: this.active ? colors.ledOn : colors.ledOff,
      })
    );
    rect(
      this.pos.x + sizes.powerButton.border * 2,
      this.pos.y +
        sizes.powerButton.mainsDisplacement +
        sizes.powerButton.border * 2,
      sizes.powerButton.width - sizes.powerButton.border * 4,
      sizes.powerButton.width - sizes.powerButton.border * 6,
      2
    );
    // Die 0
    strokeWeight(strokeWeights.small);
    stroke(colors.outline);
    noFill();
    circle(
      this.pos.x + sizes.powerButton.width / 2,
      this.pos.y +
        sizes.powerButton.mainsDisplacement +
        sizes.powerButton.height -
        sizes.powerButton.border * 4,
      sizes.powerButton.circle
    );
  }

  /**
   * Aufzurufen wenn ein Click ausgeführt worden ist und geprüft werden soll on der PowerButton getroffen worden ist.
   * @returns {boolean} true = wenn es angeclickt worden ist, false = wenn es nicht angeklickt worden ist.
   */
  isClicked() {
    if (
      inRect(
        createVector(
          this.pos.x + sizes.powerButton.border,
          this.pos.y +
            sizes.powerButton.border +
            sizes.powerButton.mainsDisplacement
        ),
        createVector(
          sizes.powerButton.width - sizes.powerButton.border * 2,
          sizes.powerButton.height - sizes.powerButton.border * 2
        )
      )
    ) {
      this.update();
      return true;
    }
    return false;
  }

  update() {
    // TODO Alle Eingabegeräte müssen ihr update ausführen wenn der Powerbutton auf ein oder aus
    // oder die anderen Buttons sind nur klickbar wenn der Schalter an ist.
    this.active = !this.active;
  }
}
