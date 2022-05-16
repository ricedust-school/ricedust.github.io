class Miner {
  sprite;
  angle;

  cooldown;

  pollutionState;
  pollutionSprite;
  pollutionTimer;

  // create a miner using one of the miner sprites at a random location
  constructor() {
    this.sprite = minerSprites[floor(random(minerSprites.length))];
    this.angle = random(360);

    this.cooldown = minerCooldown;

    this.pollutionSprite = pollutionSprites[0];
    this.pollutionState = 0;
    this.pollutionTimer = pollutionRate;
  }
  
  // displays pollution under the miner
  drawPollution() {
    rotate(this.angle);
    image(this.pollutionSprite, 0, 0);
    rotate(-this.angle);
  }

  // displays the miner according to its location on the planet and its sprite
  drawMiner() {
    rotate(this.angle);
    image(this.sprite, 0, 0);
    rotate(-this.angle);
  }

  // updates the miner's pollution state and sprite over time
  pollute() {
    if (this.pollutionState < pollutionSprites.length - 1) { // if max pollution hasn't been reached
      this.pollutionTimer--; // update pollution timer

      if (this.pollutionTimer <= 0) { // if pollution timer is zero, update pollution state and sprite
        this.pollutionState++;
        this.pollutionSprite = pollutionSprites[this.pollutionState];
        this.pollutionTimer = pollutionRate; // reset  timer
      }
    }
  }

  mine() {
    this.cooldown -= 1; // update cooldown
    if (this.cooldown <= 0) { // if cooldown is zero, add bits
      bits++;
      this.cooldown = minerCooldown; // reset cooldown
    }
  }
}