class Button {
  x;
  y;
  buttonFunction;

  img;
  text;
  yOffSet;

  isLocked;

   // create a button at x,y and assign it a function
  constructor(x, y, buttonFunction) {
    this.x = x;
    this.y = y;
    this.buttonFunction = buttonFunction;

    this.img = buttonSprites[0];
    this.text = [];
    this.yOffSet = 0;

    this.isLocked = false;
    this.isPressed = false;
  }
  
  // calls the function and depresses the button provided it isn't locked
  press() {
    if (!this.isLocked) {
      this.buttonFunction();
      this.isPressed = true;
      this.img = buttonSprites[1];
      this.yOffSet = 8;
    }
  }

  // resets the button to the default state
  release() {
    this.isPressed = false;
    this.img = buttonSprites[0];
    this.yOffSet = 0;
  }

  // add a text element to the button with a size
  addText(message, x, y, size) {
    this.text.push([message, x, y, size]);
  }

  // change a text element's message, specified by an index
  updateText(index, message) {
    this.text[index][0] = message;
  }

  // display the button
  draw() {
    push()
    if (this.isLocked) tint(255 / 2);
    image(this.img, this.x, this.y);
    pop();
    this.#drawText();
  }

  // displays text with an offset depending on the button's state
  #drawText() {
    push();
    noStroke();
    if (this.isLocked) fill(255 / 2);
    else fill('white');

    for (let i = 0; i < this.text.length; i++) {
      textSize(this.text[i][3]);
      text(this.text[i][0], this.text[i][1], this.text[i][2] + this.yOffSet);
    }
    pop();
  }

  // uses the image dimensions to check if the cursor is over the button
  over() {
    let xRadius = this.img.width / 2;
    let yRadius = this.img.height / 2;

    if (mouseX > this.x - xRadius && 
        mouseX < this.x + xRadius && 
        mouseY > this.y - yRadius && 
        mouseY < this.y + yRadius) {
      return true;
    }
    else return false;
  }
}