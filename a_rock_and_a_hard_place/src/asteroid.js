class Asteroid {
  sprite;
  angle;
  dist;
  orbitSpeed;

  isExploding;
  explosionFrame;

  constructor() {
    this.sprite = asteroidSprites[floor(random(asteroidSprites.length))];
    this.angle = random(360);
    this.dist = centerX * 1.25;
    this.orbitSpeed = random(asteroidOrbitSpeed - asteroidOrbitSpeedVariance, asteroidOrbitSpeed + asteroidOrbitSpeedVariance); // change values to variables

    this.isExploding = false;
    this.explosionFrame = 0;
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
    image(this.sprite, 0, 0);
    pop();

    if (!this.isExploding) {
      this.dist -= asteroidSpeed;
      this.angle -= this.orbitSpeed;
      if (this.dist < planetRadius) Asteroid.#makeImpact();
    }
  }

  static #makeImpact() { 
    asteroids.shift();
    population -= 800000000;
    impactAmplitude = 3;
  }

  // updates the asteroid state to exploding and moves it to the explosions array
  destroy() {
    this.isExploding = true;
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