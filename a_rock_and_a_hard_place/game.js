let centerX;
let centerY;

let pixelFont;
let planetSprite;
let healthBar;

let planetRadius = 175;
let asteroidRadius = 32;

let fullHealth = 100000;
let health = 100000;
let time = 0;

let bits = 0;

let minerSprites = [];
let miners = [];
let minerCost = 0;
let buyMinerButton;

let asteroidSprites = [];
let asteroids = [];
let asteroidSpeed = 1;

let rocketSprite;
let rockets = [];
let rocketCost = 0;
let buyRocketButton;

function preload() { // PRELOAD FUNCTION
  pixelFont = loadFont('assets/pixelfont.ttf');
  planetSprite = loadImage('assets/planet.png');
  backgroundImage = loadImage('assets/space.png');
  healthBar = loadImage('assets/healthbar.png');
  
  // load miner sprites
  minerSprites.push(loadImage('assets/miner1.png'));
  minerSprites.push(loadImage('assets/miner2.png'));
  minerSprites.push(loadImage('assets/miner3.png'));

  // load asteroid sprites
  asteroidSprites.push(loadImage('assets/asteroid1.png'));
  asteroidSprites.push(loadImage('assets/asteroid2.png'));
  asteroidSprites.push(loadImage('assets/asteroid3.png'));

  rocketSprite = loadImage('assets/rocket.png');
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

  // assign center variables
  centerX = width / 2;
  centerY = height / 2;

  // draw buttons
  drawButtons();
}

function drawButtons() {
  drawBuyMinerButton();
  drawBuyRocketButton();
}

function draw() { // DRAW FUNCTION
  // background updates
  incrementTime();
  addBits();
  addAsteroids();
  depleteHealth(miners.length * 3);

  // visual updates
  image(backgroundImage, centerX, centerY); 
  drawPlanet();
  drawAsteroids();
  drawHUD();
}

function drawPlanet() {
  push();
  // rotate about the center
  imageMode(CENTER);
  translate(centerX, centerY);
  rotate(frameCount / 20);

  drawMiners(); // draw miners
  drawRockets(); // draw rockets
  image(planetSprite, 0, 0); // draw planet
  pop();

  /* show planet radius
  push();
  stroke('white');
  noFill();
  ellipse(centerX, centerY, planetRadius);
  pop();
  */
}

function drawHUD() {
  drawTime();
  drawBits();
  drawHealthBar();
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
  textSize(50);
  text(minutes + ':' + seconds, 30, 80);
  pop();
}

// HEALTH FUNCTIONS

function drawHealthBar() {
  let healthBarY = 65;
  let healthBarLength = 356 * (health / fullHealth);

  image(healthBar, centerX, healthBarY);

  push();
  fill('white');
  noStroke();
  translate(centerX - 162, healthBarY - 5);
  rect(0, 0, healthBarLength, 10);
  pop();
}

function depleteHealth(toRemove) {
  health -= toRemove;
  if (health <= 0) noLoop();
}

// ASTEROID FUNCTIONS

function addAsteroids() {
  let willSpawn = random() < .02 + (time * .001);
  if (willSpawn) {
    let sprite = asteroidSprites[floor(random(asteroidSprites.length))];
    let angle = random(360);
    let dist = centerX * 1.25;
    asteroids.push([sprite, angle, dist]);
  }
}

function drawAsteroids() {
  
  for (let i = 0; i < asteroids.length; i++) {
    let sprite = asteroids[i][0];
    let angle = asteroids[i][1];
    let dist = asteroids[i][2];

    push();
    imageMode(CENTER);
    translate(centerX, centerY);
    rotate(angle);
    translate(0, dist);
    image(sprite, 0, 0);
    pop();

    asteroids[i][2] -= asteroidSpeed;

    if (dist < planetRadius) makeImpact();
  }
}

function makeImpact() {
  asteroids.shift();
  health -= 10000;
}

// BIT FUNCTIONS

function addBits() {
  if (frameCount % 60 == 0) bits += miners.length;
}

function drawBits() {
  push();
  noStroke();
  fill('white');
  textSize(30);
  text('Bits: ' + bits, centerX, height - 120);
  pop();
}

// MINER FUNCTIONS

function drawBuyMinerButton() {
  let cost = minerCost;
  if (cost == 0) cost = 'FREE';
  else cost = cost + ' Bits';
  buyMinerButton = createButton('Buy Miner (' + cost + ')').center();
  buyMinerButton.position(buyMinerButton.x - 150, height - 90);
  buyMinerButton.mousePressed(buyMiner);
}

function buyMiner() {
  if (bits >= minerCost) {
    bits -= minerCost;
    minerCost += 5;

    // add miner to the miners array with a sprite and a random angle
    let sprite = minerSprites[floor(random(minerSprites.length))];
    let angle = random(360);
    miners.push([sprite, angle]);
    
    drawBuyMinerButton();
  }
}

function drawMiners() {
  // for each miner in the miner array, draw the sprite and rotate accordingly
  
  for (let i = 0; i < miners.length; i++) {
    let sprite = miners[i][0];
    let angle = miners[i][1];
    
    rotate(angle);
    image(sprite, 0, 0);
    rotate(-angle);
  }
  
}

// ROCKET FUNCTIONS

function drawBuyRocketButton() {
  let cost = rocketCost;
  if (cost == 0) cost = 'FREE';
  else cost = cost + ' Bits'
  buyRocketButton = createButton('Buy Rocket (' + cost + ')').center();
  buyRocketButton.position(buyRocketButton.x + 150, height - 90);
  buyRocketButton.mousePressed(buyRocket);
}

function buyRocket() {
  if (bits >= rocketCost) {
    bits -= rocketCost;
    rocketCost += 15;
    
    // add rocket to the rockets array with a sprite and a random angle
    let sprite = rocketSprite;
    let angle = random(360);
    let cooldown = 60;
    rockets.push([sprite, angle, cooldown]);
    
    drawBuyRocketButton();
  }
}

function drawRockets() {
  // for each rocket in the rockets array, draw the sprite and rotate accordingly
  
  for (let i = 0; i < rockets.length; i++) {
    let sprite = rockets[i][0];
    let angle = rockets[i][1];
    let dist = -planetRadius - 35;

    rotate(angle);
    translate(0, dist);
    image(sprite, 0, 0);
    translate(0, -dist);
    rotate(-angle);

    fireRocket(i);
  }
  
  function fireRocket(index) {
    rockets[index][2] -= 1;
    if (rockets[index][2] <= 0) {
      asteroids.shift();
      rockets[index][2] = 60;
    }

  }

}
