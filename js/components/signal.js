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
        if(this.visited.includes(obj)){
            return false;
        }else{
            obj.active = this.value;
            this.visited.push(obj);
            return true;
        }
    }


}