let centerX;
let centerY;

let pixelFont;
let planetSprite;

let planetRadius = 132;
let asteroidRadius = 32;

let population = 7946363125;
let populationRate = 0;
let time = 0;

let bits = 0;

let cursorSprites = [];
let mouseDown = false;

let miners = [];
let minerSprites = [];
let pollutionSprites = [];
let minerCost = 0;
let minerCostIncrease = 5;
let minerPopulationImpact = 150000;
let minerCooldown = 60; // interval between adding bits
let pollutionRate = 420; // time it takes for pollution state to update


let asteroidSprites = [];
let asteroids = [];
let initialAsteroidSpawnRate = .02;
let asteroidSpawnRateMultiplier = .00075;
let asteroidSpeed = 1;
let asteroidOrbitSpeed = 0.1;
let asteroidOrbitSpeedVariance = .025;
let impactAmplitude = 0;

let explosionSprites = [];
let explosions = [];

let rocketSprite;
let rockets = [];
let rocketCost = 0;
let rocketCostIncrease = 20;
let defaultRocketDist = -planetRadius - 25;
let rocketRecoil = 100;
let rocketCooldown = 60;


let buttonSprites = [];
let buyMinerButton;
let buyRocketButton;

function preload() { // PRELOAD FUNCTION
  pixelFont = loadFont('assets/pixelfont.ttf');
  planetSprite = loadImage('assets/planet.png');
  backgroundImage = loadImage('assets/space.png');
  
  // load cursor sprites
  cursorSprites.push(loadImage('assets/cursor.png'));
  cursorSprites.push(loadImage('assets/click.png'));

  // load miner sprites
  minerSprites.push(loadImage('assets/miner1.png'));
  minerSprites.push(loadImage('assets/miner2.png'));
  minerSprites.push(loadImage('assets/miner3.png'));

  // load pollution sprites
  pollutionSprites.push(loadImage('assets/empty.png'));
  pollutionSprites.push(loadImage('assets/pollution1.png'));
  pollutionSprites.push(loadImage('assets/pollution2.png'));
  pollutionSprites.push(loadImage('assets/pollution3.png'));
  pollutionSprites.push(loadImage('assets/pollution4.png'));
  pollutionSprites.push(loadImage('assets/pollution5.png'));

  // load asteroid sprites
  asteroidSprites.push(loadImage('assets/asteroid1.png'));
  asteroidSprites.push(loadImage('assets/asteroid2.png'));
  asteroidSprites.push(loadImage('assets/asteroid3.png'));

  //load explosion sprites
  explosionSprites.push(loadImage('assets/explosion1.png'));
  explosionSprites.push(loadImage('assets/explosion2.png'));
  explosionSprites.push(loadImage('assets/explosion3.png'));

  rocketSprite = loadImage('assets/rocket.png');

  // load button sprites
  buttonSprites.push(loadImage('assets/button.png'));
  buttonSprites.push(loadImage('assets/pressedbutton.png'));
}

function setup() { // SETUP FUNCTION
  // p5.js settings
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  ellipseMode(RADIUS);
  angleMode(DEGREES);
  imageMode(CENTER);
  textAlign(CENTER);
  textFont(pixelFont);

  // set default cursor
  cursor('assets/cursor.png');

  // assign center variables
  centerX = width / 2;
  centerY = height / 2;

  // create buttons
  createBuyMinerButton();
  createBuyRocketButton();
}

function draw() { // DRAW FUNCTION
  // background updates
  incrementTime();
  addAsteroids();
  updatePopulation();

  // visual updates
  drawSpace();
  drawPlanet();
  updateAsteroids();
  drawHUD();
  // drawDebug();
}

function drawDebug() {
  // show planet radius
  push();
  stroke('white');
  noFill();
  ellipse(centerX, centerY, planetRadius);
  pop();
}

function drawSpace() {
  push();
  imageMode(CENTER);
  image(backgroundImage, centerX, centerY);
  pop();
}

function drawPlanet() {
  // calculate asteroid impact rumble
  if (impactAmplitude > 0) impactAmplitude -= 0.1;
  let rumbleOffset = impactAmplitude * sin(frameCount * 50);

  push();
  // rotate about the center
  imageMode(CENTER);
  translate(centerX + rumbleOffset, centerY);
  rotate(frameCount / 20);

  updateRockets();
  image(planetSprite, 0, 0); // draw planet
  updatePollution();
  updateMiners();
  
  pop();
}

function drawHUD() {
  drawTime();
  drawBits();
  drawPopulation();
  drawBuyMinerButton();
  drawBuyRocketButton();
}

// MOUSE FUNCTIONS

function mousePressed() {
  // update cursor
  cursor('assets/click.png');
  
  if (buyMinerButton.over()) buyMinerButton.press();
  if (buyRocketButton.over()) buyRocketButton.press();
}

function mouseReleased() {
  // revert cursor to default
  cursor('assets/cursor.png');

  buyMinerButton.release();
  buyRocketButton.release();
}

// TIMER FUNCTIONS

function incrementTime() {
  if (frameCount % 60 == 0) {
    time += 1;
  }
}

function drawTime() {
  let minutes = floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) { // convert seconds to 00 format
    seconds = '0' + seconds;
  }

  push();
  textAlign(LEFT);
  noStroke();
  fill('white');
  textSize(40);
  text(minutes + ':' + seconds, 30, 65);
  pop();
}

// POPULATION FUNCTIONS

function updatePopulation() {
  population += populationRate;
  if (population <= 0) noLoop();
}

function drawPopulation() {
  push();
  noStroke();
  fill('white');
  textSize(20);
  text('Population:', centerX, 80);
  textSize(25);
  if (population > 0) text(round(population / 1000000000, 2) + " billion", centerX, 120);
  else text(0, centerX, 110);
  pop();
}

// BIT FUNCTIONS

function drawBits() {
  push();
  noStroke();
  fill('white');
  textSize(25);
  text('Bits: ' + bits, centerX, height - 115);
  pop();
}

// MINER FUNCTIONS

function buyMiner() {
  if (bits >= minerCost) {
    bits -= minerCost;
    minerCost += minerCostIncrease;
    populationRate -= minerPopulationImpact;

    miners.push(new Miner());
  }
}

function updatePollution() {
  // for each miner in the miner array, update pollution and draw the pollution
  for (let i = 0; i < miners.length; i++) {
    let miner = miners[i];
    miner.pollute();
    miner.drawPollution();
  }
}

function updateMiners() {
  // for each miner in the miner array, mine bits and draw the miner
  for (let i = 0; i < miners.length; i++) {
    let miner = miners[i];
    miner.mine();
    miner.drawMiner();
  }
}

// ASTEROID FUNCTIONS

function addAsteroids() {
  let willSpawn = random() < initialAsteroidSpawnRate + (time * asteroidSpawnRateMultiplier);
  if (willSpawn) asteroids.push(new Asteroid());
}

function updateAsteroids() {
  asteroids.forEach(element => element.draw());
  explosions.forEach(element => element.draw());
  Asteroid.removeAllExploded();
}

// ROCKET FUNCTIONS

function buyRocket() {
  if (bits >= rocketCost) {
    bits -= rocketCost;
    rocketCost += rocketCostIncrease;
    rockets.push(new Rocket());
  }
  // rockets.push(new Rocket());
}

function updateRockets() {
  // for each rocket in the rockets array, fire rockets and draw the sprite
  for (let i = 0; i < rockets.length; i++) {
    rockets[i].fire();
    rockets[i].draw();
  }
}

// BUTTON FUNCTIONS

function createBuyMinerButton() {
  buyMinerButton = new Button(centerX - 90, height - 60, buyMiner);
  buyMinerButton.addText("Buy Miner", buyMinerButton.x, buyMinerButton.y - 9, 18);
  buyMinerButton.addText("(Free)", buyMinerButton.x, buyMinerButton.y + 10, 13);
}

function createBuyRocketButton() {
  buyRocketButton = new Button(centerX + 90, height - 60, buyRocket);
  buyRocketButton.addText("Buy Rocket", buyRocketButton.x, buyRocketButton.y - 9, 18);
  buyRocketButton.addText("(Free)", buyRocketButton.x, buyRocketButton.y + 10, 13);
}

function drawBuyMinerButton() {
  let cost = minerCost;
  if (cost == 0) cost = 'FREE';
  else cost = cost + ' Bits';

  if (bits < minerCost) buyMinerButton.isLocked = true;
  else buyMinerButton.isLocked = false;

  buyMinerButton.updateText(1, '(' + cost + ')');
  buyMinerButton.draw();
}

function drawBuyRocketButton() {
  let cost = rocketCost;
  if (cost == 0) cost = 'Free';
  else cost = cost + ' Bits'

  if (bits < rocketCost) buyRocketButton.isLocked = true;
  else buyRocketButton.isLocked = false;

  buyRocketButton.updateText(1, '(' + cost + ')');
  buyRocketButton.draw();
}


