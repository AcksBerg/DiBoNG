class Menu {
    constructor(pos) {
        this.pos = pos;
        this.size = createVector(sizes.menu.width, sizes.menu.height); // Burger icon size
        this.menuOpen = false;
        this.menuWidth = 10;
        this.menuHeight = 10;
        this.options = ["Speichern", "Laden"];
        this.clicked = false;
    }

    show() {
        // Draw burger menu icon
        this.drawBurgerMenu(this.pos.x, this.pos.y, this.size.x);

        // Draw menu if open
        if (this.menuOpen) {
            this.drawMenu();
        }
    }

    drawBurgerMenu(x, y, size) {
        stroke(0);
        strokeWeight(4);
        line(x, y, x + size, y);
        line(x, y + size / 2, x + size, y + size / 2);
        line(x, y + size, x + size, y + size);
    }

    drawMenu() {
        fill(255);
        stroke(0);
        // Draw the menu panel (its top is at this.pos.y + this.size.y + 5)
        rect(this.pos.x+sizes.menu.width, this.pos.y+sizes.menuheight ,sizes.menuWidth, sizes.menuHeight);
        
        fill(0);
        noStroke();
        textSize(20);
        for (let i = 0; i < this.options.length; i++) {
          // The text is drawn at this offset:
          text(this.options[i], this.pos.x + 10, this.pos.y + this.size.y + 30 + i * 30);
        }noFill();
        stroke(255, 0, 0, 150);
        for (let i = 0; i < this.options.length; i++) {
          let yStart = this.pos.y + this.size.y +   i * 30;
          rect(this.pos.x, yStart, 110, 30);
        }
      }
      

      isClicked() {
        // Check if the burger icon is clicked first.
        if (mouseX > this.pos.x && mouseX < this.pos.x + this.size.x &&
            mouseY > this.pos.y && mouseY < this.pos.y + this.size.y) {
          this.menuOpen = !this.menuOpen;
          return true;
        }

        // If the menu is open, check if one of its options is clicked.
        if (this.menuOpen && mouseX > this.pos.x && mouseX < this.pos.x + 110) {
          for (let i = 0; i < this.options.length; i++) {
    
            // Use the same offset as in drawMenu()
            let yStart = this.pos.y + this.size.y  + i * 30; // was 20, now changed to 30
            if (mouseY > yStart && mouseY < yStart + 30) {
                if(i === 0){
                console.log(`${this.options[0]} clicked!`);
                   new Save().downloadJSON()

                }
                if (i === 1){
                    let load = new Load()
                    load.triggerFileDialog()

                    console.log(`${this.options[1]} clicked!`);
                    return true;
                }

              return true;
            }
          }
        }
        return false;
      }}

