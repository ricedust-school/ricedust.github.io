class Planet {
  x;
  y;
  rumbleAmplitude;

  constructor() {
    this.x = centerX;
    this.y = centerY;
    this.rumbleAmplitude = 0;
  }
  
  draw() {
    // calculate asteroid impact rumble
    if (this.rumbleAmplitude > 0) this.rumbleAmplitude -= 0.1;
    let xOffset = this.rumbleAmplitude * sin(frameCount * 50);

    push();
    // rotate about the center
    imageMode(CENTER);
    translate(this.x + xOffset, this.y);
    rotate(frameCount / 20);

    updateRockets();
    image(planetSprite, 0, 0); // draw planet
    updatePollution();
    updateMiners();
    
    pop();
  }

  makeImpact() { 
    asteroids.shift();
    population -= asteroidPopulationImpact;
    this.rumbleAmplitude = asteroidImpactPower;
  }

  // debug tool to help visualize planet radius
  static drawPlanetRadius() {
    // show planet radius
    push();
    stroke('white');
    noFill();
    ellipse(this.x, this.y, planetRadius);
    pop();
  }
}