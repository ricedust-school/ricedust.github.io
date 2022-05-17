class Planet {
  rumbleOffset;
  impactAmplitude;

  constructor() {
    this.rumbleOffset = 0;
    this.impactAmplitude 
  }
  
  draw() {
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
}