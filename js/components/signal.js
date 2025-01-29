/**
 * Die Klasse Signal verarbeitet wie sich das Signal in der Simulation ausbreitet.
 */
class Signal {
  constructor(value) {
    this.visited = [];
    if (typeof value === "boolean") {
      this.value = value;
    } else {
      this.value = value.active;
      this.visit(value);
    }
  }

  /**
   * Regelt wie sich das Signal in der Simulation ausbreitet, es "besucht" die übergebenen Objekte.
   * @param {*} obj - Ein Objekt, welches von dem Signal besucht werden soll, das Objekt bekommt dann seinen Aktiv Status mitgeteilt.
   * @returns true = Das Signal wurde erfolgreich verarbeitet, false = Das Signal konnte sich nicht weiter ausbreiten.
   */
  visit(obj) {
    // Die Logik wenn ein Signal ein objekt "besucht".
    // Returned es false wurde das objekt schon vorher von dem Element besucht und es muss ein Fehler ausgegeben werden
    // Returned es true wurde das Signal erfolgreich verarbeitet
    // TODO Möglichkeit hinzufügen um Signale zu kombinieren damit diese nach einem Gater noch immer eine Loop protection haben
    // TODO wenn der Hauptschalter (Ebenfalls noch TODO) auf aus geschaltet ist, soll das Signal immer auf False gesetzt werden.
    if (this.visited.includes(obj)) {
      return false;
    } else {
      obj.active = this.value;
      this.visited.push(obj);
      return true;
    }
  }
}
