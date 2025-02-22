// TODO Docstring und Kommentare @Morris
class Save {
  constructor() {
    this.cableinfo = [];
    cables.forEach((cable) => {
      this.cableinfo.push([
        cable.startPin.id,
        cable.links,
        cable.endPin.id,
        cable.color,
      ]);
    });
  }
  downloadJSON(filename = "data.json") {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(
      new Blob([JSON.stringify(this.cableinfo)], { type: "application/json" })
    );
    a.download = filename;
    a.click();
  }
}
