class Signal{
    constructor(value){
        this.visited = [];
        if(typeof(value)==="boolean"){
            this.value = value
        }else{
            this.value = value.active;
            this.visit(value);
        }
    }

    visit(obj) {
        // Die Logik wenn ein Signal ein objekt "besucht".
        // Returned es false wurde das objekt schon vorher von dem Element besucht und es muss ein Fehler ausgegeben werden
        // Returned es true wurde das Signal erfolgreich verarbeitet
        // TODO Möglichkeit hinzufügen um Signale zu kombinieren damit diese nach einem Gater noch immer eine Loop protection haben
        // TODO wenn der Hauptschalter (Ebenfalls noch TODO) auf aus geschaltet ist, soll das Signal immer auf False gesetzt werden.
        if(this.visited.includes(obj)){
            return false;
        }else{
            obj.active = this.value;
            this.visited.push(obj);
            return true;
        }
    }


}