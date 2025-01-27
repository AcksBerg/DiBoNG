class Ic {
  constructor(pos, rowCount) {
    if (rowCount <= 1) {
      throw new Error("Die Zeilen-Anzahl des Sockels muss größer 1 sein!");
    }
    this.pos = pos;
    this.rowCount = rowCount;
    this.text = "IC4903";
    this.textSize = findFontSize(this.text, sizes.socket.xVersatz,0.5);
    console.log(textWidth(this.text), sizes.socket.xVersatz, map(this.textSize, 1,40,1,sizes.socket.xVersatz, true));
  }
  show() {
    noStroke();
    fill(colors.btnActive);
    rect(
      this.pos.x,
      this.pos.y,
      sizes.socket.xVersatz,
      sizes.socket.border +
        (sizes.socket.yVersatz / 2) * (this.rowCount - 1) +
        sizes.pin.rect_versatz * 2
    );
    fill(colors.btnInactive);
    arc(
      this.pos.x + sizes.socket.xVersatz / 2,
      this.pos.y,
      sizes.led.btn,
      sizes.led.btn,
      0,
      180
    );
    textSize(this.textSize);
    push();
    
    pop();
    if(this.rowCount<3){
      textAlign(LEFT,TOP);
      text(this.text, this.pos.x,this.pos.y+sizes.led.btn)
    }
  }

  update() {}
}
