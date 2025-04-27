// TODO Kommentare und Docstring hinzufügen
class Gate {
  constructor(input1 = null, input2 = null) {
    this.inputs = [new Pin(0, 0, "any"), new Pin(0, 0, "any")];
    this.output = new Pin(0, 0, "any");
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
  constructor(input1, input2) {
    super(input1, input2);
  }

  compute() {
    this.output.active = !this.inputs[0].active;
    this.output.update(new Signal(this.output.active));
  }
}

class Or extends Gate {
  constructor(input1, input2) {
    super(input1, input2);
  }

  compute() {
    this.output.active = this.inputs[0].active || this.inputs[1].active;
    this.output.update(new Signal(this.output.active));
  }
}

class And extends Gate {
  constructor(input1, input2) {
    super(input1, input2);
  }

  compute() {
    this.output.active = this.inputs[0].active && this.inputs[1].active;
    this.output.update(new Signal(this.output.active));
  }
}
class Xor extends Gate {
  constructor(input1, input2) {
    super(input1, input2);
  }

  compute() {
    this.output.active =
      (this.inputs[0].active && !this.inputs[1].active) ||
      (this.inputs[1].active && !this.inputs[0].active);
    this.output.update(new Signal(this.output.active));
  }
}
