
class Load {
  /**
   * Klasse zum Laden der Kabel und ICs
   */
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
    /**
     * Verarbeitung der hochgeladenen Datei.
     * this.cabledata behinhaltet alle informationen zu den kabeln
     * this.icdata beinhaltet die position von gesteckten ics in dem SOckel
     */
    console.log(file.data);
    this.data = file.data;
    this.cabledata = this.data[0];
    this.icdata = this.data[1];
    console.log(this.data);
    this.create_cables();
    this.create_ic();
  }

  create_cables() {
    this.cabledata.forEach((element) => {
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
  create_ic() {
    /**
     * Hier werden die ICS mit den Sockeln verbunden
     * schleife über alle ics im array ics.
     * schleife über alle sockel wenn ic name im load gefunden
     * wenn sockel id passt, dann wird der ic in den sockel gesetzt
     */
    this.icdata.forEach(element => {
      this.socket_id_load = element[0]
      this.socket_at_load = element[1]
      this.ic_name_load = element[2]
      ics.forEach(ic =>
        {
          if (ic.name === this.ic_name_load)
    
            {
              platinElementsSocket.forEach(socket => 
                {
                if(socket.id === this.socket_id_load)
                  {
                    console.log(ic,socket)
                    console.log("gefunden")
                    ic.connectWithSocketAtPin(socket,this.socket_at_load)
                  }
                })
            }        
      });
    });
  }
}
