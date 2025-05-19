// TODO Docstring und Kommentare
// TODO der Sketchname muss mitgespeichert werden bzw. aus dem Dateinamen ausgelesen werden.
class Save {
  constructor() {
    this.cableinfo = [];
    this.icinfo = [];
    this.save_cables();
    this.save_ics();
    this.infoall = [
      this.cableinfo,
      this.icinfo,
      document.querySelector("#sketch_name").value,
    ];
  }
  downloadJSON(filename = "data.json") {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(
      new Blob([JSON.stringify(this.infoall)], { type: "application/json" })
    );
    a.download = filename;
    a.click();
  }
  save_cables() {
    cables.forEach((cable) => {
      this.cableinfo.push([
        cable.startPin.id,
        cable.links,
        cable.endPin.id,
        cable.color,
      ]);
    });
  }
  save_ics() {
    ics.forEach((ic) => {
      if (ic.socket === null) {
        this.id = null;
      } else {
        this.id = ic.socket.id;
      }
      this.icinfo.push([this.id, ic.socket_at, ic.name]);
    });
  }
}
