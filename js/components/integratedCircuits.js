class Gate {
    constructor(input1 = null, input2 = null) {
        this.inputs = [new Pin, new Pin];
        this.output = new Pin;
    }

    update_inputs(input1 = null, input2 = null) {
        this.inputs = [input1, input2];
    }

    compute() {
        // Default compute logic (to be overridden by subclasses)
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
        this.output = this.inputs[0] || this.inputs[1];
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


// TODO: bug fixe, dass gate output wert nicht weitge gibt an ic pin 
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
    addGate(gate) {
        this.gates.push(gate);
    }


    simulate() {
        this.gates.forEach((gate) => gate.compute());
    }

}
const ic = new IntegratedCircuit("MyIC", 6);
const andGate = new And(null, null);


ic.addGate(andGate);

ic.simulate();

