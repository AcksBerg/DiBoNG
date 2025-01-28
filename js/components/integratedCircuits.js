class Gate {
    constructor(input1 = null, input2 = null) {
        this.inputs = [new Pin(0,0, "any"), new Pin(0,0, "any")];
        this.output = new Pin(0,0, "any");
    }

    update_inputs(input1 = null, input2 = null) {
        this.inputs = [input1, input2];
    }

    compute() {
        // default. wird von subklasse überschrieben
        throw new Error("Compute method must be implemented in subclass");

    }
}


class Not extends Gate {
    constructor(input1) {
        super(input1);
        this.inputs = [input1];
    }

    compute() {
        this.output.active = !this.inputs[0].active;
    }
}

class Or extends Gate {
    constructor(input1, input2) {
        super(input1, input2);
    }

    compute() {
        this.output = this.inputs[0].active || this.inputs[1].active;
    }
}

class And extends Gate {
    constructor(input1, input2) {
        super(input1, input2);
    }

    compute() {
        this.output.active = this.inputs[0].active && this.inputs[1].active;
    }
}



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

