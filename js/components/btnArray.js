/**
 * Die Klasse BtnArray beinhaltet 4x Elemente der Klasse TwoBtnToggle und zeigt diese Untereinander.
 */
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

  /**
   * Zeichnet die twoBtnToggle Elemente und das Rechteck welches diese umfasst.
   */
  show() {
    // Das umfassende Rechteck
    noStroke();
    fill(colors.panel);
    rect(
      this.pos.x,
      this.pos.y,
      sizes.btnArray.size * 3,
      sizes.btnArray.size * 6
    );
    // TwoBtnToggle Elemente
    this.buttons.forEach((button) => {
      button.show();
    });
  }


  /**
   * Kontrolliert ob der Klick in seiner näheren Umgebung ausgeführt worden ist, falls ja werden die TwoBtnToggle Elemente geprüft.
   * @returns {boolean} true = Ein Element welches eine Funktion auslöst wurde geklickt, false = das Element wurde verfehlt oder nichts von relevanz angeklickt.
   */
  isClicked({ click_type = "click" } = {}){
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
      return false;
    }
    for (let i = 0; i < this.buttons.length; i++) {
      if(this.buttons.at(i).isClicked()){
        return true;
      };
    }
    return false;
  }

  
  update() {
  }
}
