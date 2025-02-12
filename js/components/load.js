
class Load {
  constructor() {
    this.fileInput = createFileInput(this.handleFile.bind(this));
    this.fileInput.hide(); // damit kein element auf website angezeigt wird
    this.fileInput.elt.addEventListener("click", function (e) {
      // verhindert, dass der click weitergericht wird und dann wieder mit der aktuellen maus position den click auf die sladen schaltfläche machjt
      e.stopPropagation();
    });
  }

  triggerFileDialog() {
    this.fileInput.elt.click();

    console.log("!");
  }

  handleFile(file) {
    console.log(file.data);
    this.data = file.data;
    console.log(this.data);
    this.create_cables();
  }

  create_cables() {
    this.data.forEach((element) => {
      this.links = element[1];
      this.color = element[3];
      id_obj.forEach((id_obj) => {
        if (id_obj[1] == element[0]) {
          this.start_pin = id_obj[0];
        }
        if (id_obj[1] == element[2]) {
          this.end_pin = id_obj[0];
        }
      });
      console.log(this.start_pin, this.links, this.end_pin, this.color);
      cables.push(
        new Cable(this.start_pin, this.links, this.end_pin, this.color));
        this.start_pin.connect(this.end_pin);
        this.end_pin.connect(this.start_pin);
    });
  }
}
