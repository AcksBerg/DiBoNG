/**
 * Die Klasse TwoBtnToggle beihnaltet zwei Buttons zum umschalten zwischen High & Low,
 * eine Status LED und 2 Connectoren die das Signal in Negiert bzw. normal weitergeben.
 */
class TwoBtnToggle {
  constructor(pos) {
    this.pos = pos;
    this.active = false;
    this.connected = [
      new Led(
        createVector(
          this.pos.x +
            ((sizes.btnArray.size / 4) * 3 + sizes.btnArray.size * 2) * 1.25,
          this.pos.y + sizes.btnArray.size * 0.25
        ),
        sizes.led.btn
      ),
      new Pin(
        createVector(
          this.pos.x +
            ((sizes.btnArray.size / 4) * 3 + sizes.btnArray.size * 2) * 1.5,
          this.pos.y + sizes.btnArray.size * 0.25
        ),
        "circle",
        true
      ),
      new Pin(
        createVector(
          this.pos.x +
            ((sizes.btnArray.size / 4) * 3 + sizes.btnArray.size * 2) * 1.5,
          this.pos.y + sizes.btnArray.size * 0.75
        ),
        "circle",
        true
      ),
    ];
    // Den Negierten Ausgang !Q initialisieren.
    this.connected[2].update(new Signal(!this.active), true);
  }

  /**
   * Zeichnet das twoBtnToggle Element
   */
  show() {
    // Buttons
    strokeWeight(strokeWeights.medium);
    stroke(colors.outline);
    fill(colors.button);
    // Button links
    rect(this.pos.x, this.pos.y, sizes.btnArray.size, sizes.btnArray.size, 5);
    // Button Rechts
    rect(
      this.pos.x + sizes.btnArray.size / 4 + sizes.btnArray.size,
      this.pos.y,
      sizes.btnArray.size,
      sizes.btnArray.size,
      5
    );
    // Kabel zwischen den Buttons und den Connectoren
    noFill();
    // Kabel Oben
    line(
      this.pos.x + (sizes.btnArray.size / 4) * 3 + sizes.btnArray.size * 2,
      this.pos.y + sizes.btnArray.size * 0.25,
      this.pos.x +
        ((sizes.btnArray.size / 4) * 3 + sizes.btnArray.size * 2) * 1.5,
      this.pos.y + sizes.btnArray.size * 0.25
    );
    // Kabel Unten
    line(
      this.pos.x + (sizes.btnArray.size / 4) * 3 + sizes.btnArray.size * 2,
      this.pos.y + sizes.btnArray.size * 0.75,
      this.pos.x +
        ((sizes.btnArray.size / 4) * 3 + sizes.btnArray.size * 2) * 1.5,
      this.pos.y + sizes.btnArray.size * 0.75
    );
    // Kabel(Anschlüsse) Enden und LED
    this.connected.forEach((obj) => {
      obj.show();
    });
    // Text
    fill(colors.outline);
    // Text größe Speichern um diese wieder zurücksetzten zu können.
    textSize(textSizes.medium);
    textAlign(CENTER, CENTER);
    // Text Button links
    text(
      "L",
      this.pos.x + sizes.btnArray.size / 2,
      this.pos.y + sizes.btnArray.size / 2
    );
    // Text Button rechts
    text(
      "H",
      this.pos.x + sizes.btnArray.size / 4 + sizes.btnArray.size * 1.5,
      this.pos.y + sizes.btnArray.size / 2
    );
    textSize(textSizes.small);
    // Text Kabel Oben
    text(
      "Q",
      this.pos.x + (sizes.btnArray.size / 4) * 2 + sizes.btnArray.size * 2,
      this.pos.y + sizes.btnArray.size * 0.25
    );
    // Text Kabel Unten
    text(
      "Ǭ",
      this.pos.x + (sizes.btnArray.size / 4) * 2 + sizes.btnArray.size * 2,
      this.pos.y + sizes.btnArray.size * 0.75
    );
  }

  /**
   * Kontrolliert ob ein Button oder Connector angeklickt worden ist.
   * @returns {boolean} true = Ein Element welches eine Funktion auslöst wurde geklickt, false = das Element wurde verfehlt oder nichts von relevanz angeklickt.
   */
  isClicked({ click_type = "click" } = {}) {
    // Versatz der Aktiviert wird wenn der Button aktiv ist.
    // Dadurch muss die Abfrage welcher der Beiden Button gedrückt wird nur einmal geschrieben werden.
    let versatz = this.active
      ? 0
      : sizes.btnArray.size / 4 + sizes.btnArray.size;
    if (
      click_type === "click" &&
      inRect(
        createVector(this.pos.x + versatz, this.pos.y),
        createVector(sizes.btnArray.size, sizes.btnArray.size)
      )
    ) {
      // Einer der Button wurde angeklickt
      this.update();
      return true;
    }
    if (this.connected[1].isClicked()) {
      console.log("Oben geclicked");
      return true;
    }
    if (this.connected[2].isClicked()) {
      console.log("unten gelicked");
      return true;
    }
    return false;
  }

  update() {
    this.active = !this.active;
    // Die Angeschlossenen Elemente Aktuallisieren um Stromdurchfluss zu Simulieren
    // LED
    this.connected[0].update(new Signal(this.active));
    // Oberer Connector
    this.connected[1].update(new Signal(this.active), true);
    // Unterer Connector
    this.connected[2].update(new Signal(!this.active), true);
  }
}
