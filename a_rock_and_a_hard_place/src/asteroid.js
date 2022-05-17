class Asteroid {
  sprite;
  angle;
  dist;
  orbitSpeed;

  spin;
  spinSpeed;

  isExploding;
  explosionFrame;

  constructor() {
    this.sprite = asteroidSprites[floor(random(asteroidSprites.length))];
    this.angle = random(360);
    this.dist = centerX * 1.25;
    this.orbitSpeed = asteroidInitialOrbitSpeed;

    this.spin = 0;
    this.spinSpeed = random(-asteroidMaxSpinSpeed, asteroidMaxSpinSpeed);

    this.isExploding = false;
    this.explosionFrame = 0;
  }
  
  // updates the asteroid state to exploding and moves it to the explosions array
  destroy() {
    this.isExploding = true;
  }

  draw() {
    if (this.isExploding) {
      this.#explode();
    }

    push();
    imageMode(CENTER);
    translate(centerX, centerY);
    rotate(this.angle);
    translate(0, this.dist);
    rotate(this.spin);
    image(this.sprite, 0, 0);
    pop();

    if (!this.isExploding) {
      this.dist -= asteroidSpeed;
      this.angle -= this.orbitSpeed;
      this.orbitSpeed *= asteroidOrbitSpeedMultiplier;
      this.spin += this.spinSpeed;
      if (this.dist <= planetRadius) planet.makeImpact();
    }
  }

  #explode() {
    this.sprite = explosionSprites[this.explosionFrame];
    this.explosionFrame++;
  }

  static removeAllExploded() {
    if (explosions.length > 0) {
      while (explosions.length > 0 && explosions[0].explosionFrame > 2) explosions.shift();
    }
  }
}