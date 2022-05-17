class Planet {
  rumbleAmplitude;

  constructor() {
    this.rumbleAmplitude = 0;
    this.miners = [];
    this.rockets = [];
  }
  
  draw() {
    // calculate asteroid impact rumble
    if (this.rumbleAmplitude > 0) this.rumbleAmplitude -= 0.1;
    let xOffset = this.rumbleAmplitude * sin(frameCount * 50);

    push();
    // rotate about the center
    imageMode(CENTER);
    translate(centerX + xOffset, centerY);
    rotate(frameCount / 20);

    updateRockets();
    image(planetSprite, 0, 0); // draw planet
    updatePollution();
    updateMiners();
    
    pop();
  }

  makeImpact() { 
    asteroids.shift();
    population -= 800000000;
    this.rumbleAmplitude = asteroidImpactPower;
  }
}