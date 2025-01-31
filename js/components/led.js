/**
 * Die Klasse für die LED, benötigt eine Objekt mit "on"/"off" als Keys und farben als Values um den An/Aus Zustand anzuzeigen.
 */
class Led {
  constructor(
    pos,
    size = sizes.led.circle,
    color = colors.ledRed
  ) {
    this.pos = pos;
    this.size = size;
    this.color = color;
    this.active = false;
  }

  /**
   * Zeichnet die LED abhängig von ihrem Zustand
   */
  show() {
    noStroke();
    fill(this.active ? this.color : setHSLALightAndTrans({color:this.color,lightness:colors.ledOff}));
    circle(this.pos.x, this.pos.y, this.size);
  }

  /**
   * Verarbeitet das ankommende Signal
   * @param {Signal} signal
   */
  update(signal) {
    signal.visit(this);
  }
}
