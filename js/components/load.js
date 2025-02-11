class Load{
    // beim laden muss man noch den json als string mitr angeben. 
    // TODO: load mit file implementieren
    constructor(cableinfo){
        this.cableinfo = JSON.parse(cableinfo)        
    }

    create_cables(){
        this.cableinfo.forEach(element => {
            this.links = element[1];
            this.color = element[3];
            id_obj.forEach(id_obj => {
                if(id_obj[1] == element[0]){
                    this.start_pin = id_obj[0]
                }
                if(id_obj[1] == element[2]){
                    this.end_pin = id_obj[0]
                }
            });
        console.log(this.start_pin,this.links,this.end_pin,this.color)
        cables.push(new Cable(this.start_pin,this.links,this.end_pin,this.color))
        });

        
    }
}

