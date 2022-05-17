class Rocket {
  sprite;
  angle;
  dist;
  cooldown;

  constructor() {
    this.sprite = rocketSprite;
    this.angle = random(360);
    this.dist = defaultRocketDist;
    this.cooldown = rocketCooldown;
  }
  
  draw() {
    this.dist -= (this.dist - defaultRocketDist) / 10; // recover from recoil

    rotate(this.angle);
    translate(0, this.dist);
    image(this.sprite, 0, 0);
    translate(0, -this.dist);
    rotate(-this.angle);
  }

  fire() {
    this.cooldown -= 1; // update cooldown

    if (this.cooldown <= 0 && asteroids.length > 0) { // fire if cooldown is 0 and asteroids exist
      // destroy nearest asteroid that is not exploding
      asteroids[0].destroy();
      explosions.push(asteroids.shift());

      this.dist = defaultRocketDist + rocketRecoil;
      this.cooldown = rocketCooldown;
    }
  }
}