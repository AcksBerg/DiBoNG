


// TODO: signal implementiern



// ic schaltet. pins der output gates funktionieren auch




class IntegratedCircuit {
    constructor(name, numPins) {
        this.name = name;
        this.numPins = numPins;
        this.pins = []; 
        this.gates = [];

        for (let i = 0; i < numPins; i++) {

            this.pins.push(new Pin(0,0, "any"));
        }
    }
//indexes der pins alle bis auf den letzten sind input pins.
// so kann die logik beliebig viele inputs der gates verarbeiten
    addGate(gate, pin_indexes) {
        // input pins verbinden
        for (let index = 0; index < pin_indexes.length-1; index++) {
            ic.pins[pin_indexes[index]].connect(gate.inputs[index])        
        }
        // output pin verbinden
       gate.output.connect(ic.pins[pin_indexes[pin_indexes.length-1]]);
       console.log(ic.pins,pin_indexes[pin_indexes.length-1])
        this.gates.push(gate);

    }


    simulate() {
        this.gates.forEach((gate) => {
            gate.compute();
        });
        this.gates.forEach((gate) => {
            gate.output.connected.forEach((connectedPin) => {
                connectedPin.active = gate.output.active;
            });
        });

    }

}
const ic = new IntegratedCircuit("MyIC", 6);
const andGate = new And(null, null);


ic.addGate(andGate,[0,1,2]);


ic.simulate();

