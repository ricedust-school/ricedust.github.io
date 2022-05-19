let centerX;
let centerY;

let pixelFont;

let gameState = 0;
let apocalypseHasStarted = false;
let gameIsOver = false;
let isOnEndScreen = false;

let transparency = 0;
let isTransitioning = false;
let fadeSpeed = 5;

let planet;
let planetSprite;
let planetRadius = 132;
let asteroidRadius = 32;

let initialPopulation = 7946363125;
let population = initialPopulation;
let populationRate = 0;

let time = 0;
let timeSurvived = 0;

let bits = 0;

let cursorSprites = [];

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
let initialAsteroidSpawnRate = .01;
let asteroidSpawnRateMultiplier = .0008;
let asteroidSpeed = 1;
let asteroidMinOrbitSpeed = 0.1;
let asteroidMaxOrbitSpeed = 0.3;
let asteroidMaxSpinSpeed = 2;
let asteroidImpactPower = 5;
let asteroidPopulationImpact = 800000000;

let explosionSprites = [];
let explosions = [];

let rockets = [];
let rocketSprite;
let rocketCost = 0;
let rocketCostIncrease = 20;
let defaultRocketDist = -planetRadius - 25;
let rocketRecoil = 100;
let rocketCooldown = 60;

let buttonSprites = [];
let buyMinerButton;
let buyRocketButton;
let playButton;
let replayButton;

let newsTicker;
let newsTickerHeight = 40;
let newsTickerBorder = 4;
let scrollSpeed = 2;
let headlineSize = 18;
let headlineBuffer = 100;
let stage1Threshold = 6000000000;
let stage2Threshold = 2000000000;
let headlines = [];
let impactHeadlines = [];

let moonSprite;

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

  // load rocket sprite
  rocketSprite = loadImage('assets/rocket.png');

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

  // load button sprites
  buttonSprites.push(loadImage('assets/button.png'));
  buttonSprites.push(loadImage('assets/pressedbutton.png'));

  // load headlines
  headlines.push(loadStrings('headlines/stage0.txt'));
  headlines.push(loadStrings('headlines/stage1.txt'));
  headlines.push(loadStrings('headlines/stage2.txt'));
  headlines.push(loadStrings('headlines/stage3.txt'));
  impactHeadlines = loadStrings('headlines/impact.txt');

  // load moon sprite
  moonSprite = loadImage('assets/moon.png');
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

  // create planet
  planet = new Planet();
  planet.y = height + planetRadius; // reposition for title screen

  // create buttons
  createButtons();

  // create news ticker
  newsTicker = new NewsTicker();
}

function draw() { // DRAW FUNCTION
  if (gameState == 0) {
    runTitleScreen();
  }
  else if (gameState == 1) {
    runGame();
  }
  else if (gameState == 2) {
    runEndScreen();
  }

  if (isTransitioning) transition();
  
}

// TITLE SCREEN

function runTitleScreen() {
  drawSpace();
  slideInPlanet();
  newsTicker.draw();
  playButton.draw();
  drawTitle();
}

function slideInPlanet() {
  planet.draw();
  planet.y -= (planet.y - centerY - 30) / 15;
}

function drawTitle() {
  push();
  noStroke();
  fill('white');
  textSize(65);
  text("A ROCK", centerX, centerY - 180);
  textSize(25);
  text("AND A HARD PLACE", centerX, centerY - 140);
  pop();
}

// RUN GAME

function startGame() {
  // recenter planet
  planet.x = centerX;
  planet.y = centerY;

  // update game state
  gameState = 1;

  // clear news ticker
  newsTicker.headlinesOnDisplay = [];
}

function runGame() {
  // background updates
  incrementTime();
  if (apocalypseHasStarted) addAsteroids();
  updatePopulation();

  // visual updates
  drawSpace();
  planet.draw();
  updateAsteroids();
  drawHUD();
  // Planet.drawPlanetRadius();
}

function drawSpace() {
  push();
  imageMode(CENTER);
  image(backgroundImage, centerX, centerY);
  pop();
}

function drawHUD() {
  drawTime();
  drawBits();
  drawPopulation();
  drawBuyMinerButton();
  drawBuyRocketButton();
  newsTicker.draw();
}

// RUN END SCREEN

function endGame() {
  gameState = 2;
}

function runEndScreen() {
  drawSpace();
  drawMoon();
  drawSummary();
  replayButton.draw();
}

function drawMoon() {
  push();
  imageMode(CENTER);
  image(moonSprite, centerX, centerY - 50);
  pop();
}

function drawSummary() {
  let minutes = floor(timeSurvived / 60);
  let seconds = timeSurvived % 60;

  push();
  noStroke();
  fill('white');
  textSize(18);
  text("Extinction reached in", centerX, centerY + 50);
  text(minutes + " minutes and " + seconds + " seconds.", centerX, centerY + 75);
  pop();
}

function resetGame() {
  headlines = [];
  impactHeadlines = [];
  headlines.push(loadStrings('headlines/stage0.txt'));
  headlines.push(loadStrings('headlines/stage1.txt'));
  headlines.push(loadStrings('headlines/stage2.txt'));
  headlines.push(loadStrings('headlines/stage3.txt'));
  impactHeadlines = loadStrings('headlines/impact.txt');

  gameState = 1;
  apocalypseHasStarted = false;
  gameIsOver = false;
  isOnEndScreen = false;

  population = initialPopulation;
  populationRate = 0;

  time = 0;
  bits = 0;
  
  planet.x = centerX;
  planet.y = centerY;

  miners = [];
  minerCost = 0;

  asteroids = [];
  explosions = [];

  rockets = [];
  rocketCost = 0;

  newsTicker.headlinesOnDisplay = [];
}

// TRANSITION FUNCTIONS

function beginTransition() {
  isTransitioning = true;
}

function transition() {
  // fading into the game
  if (gameState == 0) {
    fadeToBlack();
    if (transparency > 255) startGame();
  }
  else if (gameState == 1 && !gameIsOver) {
    fadeBackIn();
    if (transparency <= 0) isTransitioning = false;
  }

  // fading to end screen
  else if (gameState == 1 && gameIsOver) {
    fadeToBlack();
    if (transparency > 255) endGame();
  }
  else if (gameState == 2 && !isOnEndScreen) {
    fadeBackIn();
    if (transparency <= 0) {isOnEndScreen = true; isTransitioning = false;};
  }

  // fading back into game
  else if (gameState == 2 && isOnEndScreen) {
    fadeToBlack();
    if (transparency > 255) resetGame();
  }
}

function fadeToBlack() {
  push();
  noStroke();
  fill(0, transparency);
  rect(0, 0, width, height);
  pop();
  transparency += fadeSpeed;
}

function fadeBackIn() {
  push();
  noStroke();
  fill(0, transparency);
  rect(0, 0, width, height);
  pop();
  transparency -= fadeSpeed;
}

// MOUSE FUNCTIONS

function mousePressed() {
  // update cursor
  cursor('assets/click.png');

  if (gameState == 0 && playButton.over()) {
    playButton.press();
  }
  else if (gameState == 1) {
    if (buyMinerButton.over()) buyMinerButton.press();
    if (buyRocketButton.over()) buyRocketButton.press();
  }
  else if (gameState == 2) {
    if (replayButton.over()) replayButton.press();
  }
}

function mouseReleased() {
  // revert cursor to default
  cursor('assets/cursor.png');

  buyMinerButton.release();
  buyRocketButton.release();
  playButton.release();
  replayButton.release();
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
  textSize(35);
  text(minutes + ':' + seconds, 30, 110);
  pop();
}

// POPULATION FUNCTIONS

function updatePopulation() {
  population += populationRate;
  if (population <= 0) {
    timeSurvived = time;
    gameIsOver = true;
    beginTransition();
  }
}

function drawPopulation() {
  push();
  noStroke();
  fill('white');
  textSize(18);
  text('Population:', centerX, newsTickerHeight + 45);
  textSize(22);
  if (population > 0) text(round(population / 1000000000, 2) + " billion", centerX, newsTickerHeight + 75);
  else text(0, centerX, newsTickerHeight + 75);
  pop();
}

// BIT FUNCTIONS

function drawBits() {
  push();
  noStroke();
  fill('white');
  textSize(22);
  text('Bits: ' + bits, centerX, height - 110);
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
    miners[i].pollute();
    miners[i].drawPollution();
  }
}

function updateMiners() {
  // for each miner in the miner array, mine bits and draw the miner
  for (let i = 0; i < miners.length; i++) {
    miners[i].mine();
    miners[i].drawMiner();
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
}

function updateRockets() {
  // for each rocket in the rockets array, fire rockets and draw the sprite
  for (let i = 0; i < rockets.length; i++) {
    rockets[i].fire();
    rockets[i].draw();
  }
}

// BUTTON FUNCTIONS

function createButtons() {
  createBuyMinerButton();
  createBuyRocketButton();
  createPlayButton();
  createReplayButton();
}

function createBuyMinerButton() {
  buyMinerButton = new Button(centerX - 90, height - 55, buyMiner);
  buyMinerButton.addText("Buy Miner", buyMinerButton.x, buyMinerButton.y - 9, 18);
  buyMinerButton.addText("(Free)", buyMinerButton.x, buyMinerButton.y + 10, 13);
}

function createBuyRocketButton() {
  buyRocketButton = new Button(centerX + 90, height - 55, buyRocket);
  buyRocketButton.addText("Buy Rocket", buyRocketButton.x, buyRocketButton.y - 9, 18);
  buyRocketButton.addText("(Free)", buyRocketButton.x, buyRocketButton.y + 10, 13);
}

function createPlayButton() {
  playButton = new Button(centerX, centerY + 240, beginTransition);
  playButton.addText("PLAY", playButton.x, playButton.y + 5, 30);
}

function createReplayButton() {
  replayButton = new Button(centerX, centerY + 300, beginTransition);
  replayButton.addText("PLAY AGAIN", replayButton.x, replayButton.y + 3, 18);
}

function drawBuyMinerButton() {
  let cost = minerCost;
  if (cost == 0) cost = 'FREE';
  else cost = cost + ' Bits';

  if (bits < minerCost || !apocalypseHasStarted) buyMinerButton.isLocked = true;
  else buyMinerButton.isLocked = false;

  buyMinerButton.updateText(1, '(' + cost + ')');
  buyMinerButton.draw();
}

function drawBuyRocketButton() {
  let cost = rocketCost;
  if (cost == 0) cost = 'Free';
  else cost = cost + ' Bits'

  if (bits < rocketCost || !apocalypseHasStarted) buyRocketButton.isLocked = true;
  else buyRocketButton.isLocked = false;

  buyRocketButton.updateText(1, '(' + cost + ')');
  buyRocketButton.draw();
}


