var img;
var initials ='sn'; // your initials
var choice = '1'; // starting choice, so it is not empty
var screenbg = 255; // white background
var lastscreenshot=61; // last screenshot never taken

function setup() {
  var cnv = createCanvas(800, 800);
  centerCanvas(cnv);
  background(screenbg);   // use our background screen color
  
  rectMode(CORNERS);
  ellipseMode(CORNERS);
  
  stroke(0);
  strokeWeight(1);
  fill(0, 0);
}

function centerCanvas(cnv) {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function draw() {
  if (keyIsPressed) {
    choice = key; // set choice to the key that was pressed
    clear_print(); // check to see if it is clear screen or save image
  }
  if (mouseIsPressed) {
    newkeyChoice(choice);  // if the mouse is pressed call newkeyChoice
  }
}

function newkeyChoice(toolChoice) { //toolchoice is the key that was pressed
  // the key mapping if statements that you can change to do anything you want.
  // just make sure each key option has the a stroke or fill and then what type of 
  // graphic function

  if (toolChoice == '1') { // reflect across x
    line(mouseX, mouseY, pmouseX, pmouseY);
    line(mouseX, height - mouseY, pmouseX, height - pmouseY);
    
  } else if (toolChoice == '2') { // reflfect across y
    line(mouseX, mouseY, pmouseX, pmouseY);
    line(width - mouseX, mouseY, width - pmouseX, pmouseY);
  
  } else if (toolChoice == '3' ) { // rotate 180
    line(mouseX, mouseY, pmouseX, pmouseY);
    line(width - mouseX, height - mouseY, width - pmouseX, height - pmouseY);
    
  } else if (toolChoice == '4') { // rotate 90
    let originX = width / 2;
    let originY = height / 2;
    let x = mouseX - originX;
    let y = mouseY - originY;
    let px = pmouseX - originX;
    let py = pmouseY - originY;
    line(originX + x, originY + y, originX + px, originY + py);
    line(originY - y, originX + x, originY - py, originX + px);
    line(originX - x, originY - y, originX - px, originY - py);
    line(originY + y, originX - x, originY + py, originX - px);
    
  } else if (toolChoice == '5') { // rotate 180 line to origin
    let originX = width / 2;
    let originY = height / 2;
    line(mouseX, mouseY, originX, originY);
    line(width - mouseX, height - mouseY, originX, originY);
  
  } else if (toolChoice == '6') { // rotate 90 line to origin
    let originX = width / 2;
    let originY = height / 2;
    let x = mouseX - originX;
    let y = mouseY - originY;
    let px = pmouseX - originX;
    let py = pmouseY - originY;
    line(originX + x, originY + y, originX, originY);
    line(originY - y, originX + x, originX, originY);
    line(originX - x, originY - y, originX, originY);
    line(originY + y, originX - x, originX, originY);
  
  } else if (key == '7') { // horizontal lines
    let originX = width / 2;
    let x = mouseX - originX;
    let px = pmouseX - originX;
    line(originX - x, mouseY, originX + x, mouseY);
    line(originX - px, pmouseY, originX + px, pmouseY);
  
  } else if (key == '8') { // vertical lines
    let originY = height / 2;
    let y = mouseY - originY;
    let py = pmouseY - originY;
    line(mouseX, originY - y, mouseX, originY + y);
    line(pmouseX, originY - py, pmouseX, originY + py);
  
  } else if (toolChoice == '9') { // ellipse
    let originX = width / 2;
    let originY = height / 2;
    let x = mouseX - originX;
    let y = mouseY - originY;
    ellipse(originX - x, originY + y, originX + x, originY - y);
  
  } else if (toolChoice == '0') { // rect
    let originX = width / 2;
    let originY = height / 2;
    let x = mouseX - originX;
    let y = mouseY - originY;
    rect(originX - x, originY + y, originX + x, originY - y);
  }
}

function clear_print() {
// this will do one of two things, x clears the screen by resetting the background
// p calls the routine saveme, which saves a copy of the screen
  if (key == 'x' || key == 'X') {
    background(screenbg); // set the screen back to the background color
  } else if (key == 'p' || key == 'P') {
     saveme();  // call saveme which saves an image of the screen
  }
}

function saveme(){
    //this will save the name as the intials, date, time and a millis counting number.
    // it will always be larger in value then the last one.
  filename=initials+day() + hour() + minute() +second();
  if (second()!=lastscreenshot) { // don't take a screenshot if you just took one
    saveCanvas(filename, 'jpg');
  }
  lastscreenshot=second(); // set this to the current second so no more than one per second
  
}
