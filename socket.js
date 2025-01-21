class Socket {
    constructor(pos, pinCount = 24, doubleH = true) {
        if (pinCount % 2 !== 0) {
            throw new Error("Die Pin-Anzahl des Sockels muss durch 2 Teilbar sein!");
        }
        this.pos = pos;
        this.doubleH = doubleH;
        this.closed =true;
        this.connectorsCircle = [];
        this.connectorsRect = [];
        this.pinCount = pinCount
        this.versatz = 10;
        for (let i = 0; i < this.pinCount / 2; i++) {
            this.connectorsCircle.push(
                new Pin(createVector(this.pos.x, this.pos.y + this.versatz * i))
            );
            this.connectorsRect.push(
                new Pin(
                    createVector(this.pos.x + 15, this.pos.y + (this.versatz / 2) * i + (this.versatz / 2) * (this.pinCount / 2 - 1) / 2),
                    "rect"
                )
            );
            // TODO Simulation so umsetzen das keine Schleifen entstehen
              this.connectorsCircle
                .at(-1)
                .connect(this.connectorsRect.at(-1));
              this.connectorsRect
                .at(-1)
                .connect(this.connectorsCircle.at(-1));
            this.connectorsCircle.push(
                new Pin(createVector(this.pos.x + 53, this.pos.y + this.versatz * i))
            );
            this.connectorsRect.push(
                new Pin(
                    createVector(this.pos.x + 30, this.pos.y + (this.versatz / 2) * i + (this.versatz / 2) * (this.pinCount / 2 - 1) / 2),
                    "rect"
                )
            );
            // TODO Simulation so umsetzen das keine Schleifen entstehen
              this.connectorsCircle
                .at(-1)
                .connect(this.connectorsRect.at(-1));
              this.connectorsRect
                .at(-1)
                .connect(this.connectorsCircle.at(-1));
        }
    }

    show() {

        // TODO StrokeWeight auch an anderen Orten festlegen wo er benötigt wird um später Fehler zu vermeiden
        // TODO StrokeWeight auch in der setup definieren und später auslagern
        // In dem Kontext prüfen ob sich die Connectoren verändern wenn man den Hebel umlegt
        noFill();
        strokeWeight(0.5);
        stroke(colors.outline);
        for (let i = 0; i < this.pinCount; i++) {
            let l1 = this.connectorsCircle.at(i).pos;
            let l2 = this.connectorsRect.at(i).pos;
            if (l1.x < l2.x) {
                line(l1.x, l1.y, l1.x + 5, l1.y);
                line(l1.x + 5, l1.y, l2.x - 5, l2.y + 1);
                line(l2.x - 5, l2.y + 1, l2.x, l2.y + 1);

            } else {
                line(l1.x, l1.y, l1.x - 5, l1.y);
                line(l1.x - 5, l1.y, l2.x + 5 + 8, l2.y + 1);
                line(l2.x + 8, l2.y + 1, l2.x + 5 + 8, l2.y + 1);
            }
        }
        noStroke();
        fill(colors.btnInactive);
        rect(this.connectorsRect.at(0).pos.x - 3, this.connectorsRect.at(0).pos.y - 3, 29, (this.versatz / 2) * this.pinCount / 2 + 3);
        fill(colors.silver);
        stroke(colors.silver);
        if (this.closed) {
            rect(this.connectorsRect.at(0).pos.x - 2, this.connectorsRect.at(0).pos.y - 15, 3, 13);
            quad(this.connectorsRect.at(0).pos.x - 2, this.connectorsRect.at(0).pos.y - 15,
                this.connectorsRect.at(0).pos.x + 1, this.connectorsRect.at(0).pos.y - 15,
                this.connectorsRect.at(0).pos.x + 2, this.connectorsRect.at(0).pos.y - 18,
                this.connectorsRect.at(0).pos.x - 3, this.connectorsRect.at(0).pos.y - 18);
            arc(this.connectorsRect.at(0).pos.x - 0.5, this.connectorsRect.at(0).pos.y - 18,5,5,PI,0);
        } else {
            circle(this.connectorsRect.at(0).pos.x -1, this.connectorsRect.at(0).pos.y - 3,5)
        }
        [...this.connectorsCircle, ...this.connectorsRect].forEach((pin) => {
            pin.show();
        });
    }

    update() {
        // TODO Hebel Mechanismus klickbar machen, 
    }
}
