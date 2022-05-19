class NewsTicker {
  stage;
  headlinesOnDisplay;
  impactHasOccured;

  constructor() {
    this.stage = 0;
    this.headlinesOnDisplay = [];
    this.impactHasOccured = false;
    this.impactHeadlineIsInQueue = false;
  }
  
  draw() {
    push();
    noStroke();
    fill('white');
    textAlign(LEFT);
    textSize(headlineSize);

    this.#drawBox();
    this.#addHeadlines();
    this.#drawHeadlines();
    this.#removeExpiredHeadlines();

    pop();
  }
  
  makeImpact() {
    if (!this.impactHasOccured) {
      this.stage = 2;
      this.impactHasOccured = true;
      this.impactHeadlineIsInQueue = true;
    }
  }
  
  // creates news ticker box
  #drawBox() {
    push();
    rectMode(CENTER);
    strokeWeight(newsTickerBorder);
    stroke('white');
    fill('black');
    rect(centerX, newsTickerHeight / 2, width - newsTickerBorder, newsTickerHeight - newsTickerBorder);
    pop();
  }

  // select a headline to display based on the stage and game state
  #addHeadlines() {
    if (this.#isReadyToDisplay()) { // if 
      let headlineToDisplay;

      if (gameState == 0) {
        this.headlinesOnDisplay.push(new Headline("A ROCK AND A HARD PLACE"));
        return;
      }

      if (this.impactHeadlineIsInQueue) {
        headlineToDisplay = impactHeadlines[floor(random(impactHeadlines.length))];
        this.headlinesOnDisplay.push(new Headline(headlineToDisplay));
        this.impactHeadlineIsInQueue = false;
        return;
      }

      switch (this.stage) {
        case 0: 
          headlineToDisplay = headlines[this.stage].shift();
          this.headlinesOnDisplay.push(new Headline(headlineToDisplay));
          if (headlines[this.stage].length <= 0) {
            this.stage++;
            apocalypseHasStarted = true;
          }
          break;
        case 1:
          headlineToDisplay = headlines[this.stage].splice(floor(random(headlines[this.stage].length)), 1);
          this.headlinesOnDisplay.push(new Headline(headlineToDisplay));
          if (headlines[this.stage].length <= 0 || population < stage1Threshold) this.stage++;
          break;
        case 2:
          headlineToDisplay = headlines[this.stage].splice(floor(random(headlines[this.stage].length)), 1);
          this.headlinesOnDisplay.push(new Headline(headlineToDisplay));
          if (headlines[this.stage].length <= 0 || population < stage2Threshold) this.stage++;
          break;
        case 3:
          headlineToDisplay = headlines[this.stage].shift();
          this.headlinesOnDisplay.push(new Headline(headlineToDisplay));
          if (headlines[this.stage].length <= 0) this.stage++;
          break;
      }
    }
  }

  // checks whether there is a large enough buffer before adding another headline
  #isReadyToDisplay() {
    if (this.headlinesOnDisplay.length <= 0) return true;

    let latestHeadline = this.headlinesOnDisplay[this.headlinesOnDisplay.length - 1]
    if (latestHeadline.xPos + latestHeadline.width + headlineBuffer < width) return true;

    return false;
  }

  // call the draw function on each headline on display
  #drawHeadlines() {
    for (let i = 0; i < this.headlinesOnDisplay.length; i++) {
      this.headlinesOnDisplay[i].draw();
    }
  }

  // remove headlines that have already scrolled past
  #removeExpiredHeadlines() {
    while (this.headlinesOnDisplay.length > 0 && this.headlinesOnDisplay[0].hasScrolledPast) {
      this.headlinesOnDisplay.shift();
    }
  }
}

class Headline {
  text;
  xPos;
  width;
  hasScrolledPast;

  constructor(text) {
    this.text = text;
    this.xPos = width;
    this.width = textWidth(text);
    this.hasScrolledPast = false;
  }

  // draws the headline and moves it left while it is still visible
  draw() {
    if (!this.hasScrolledPast) {
      text(this.text, this.xPos, newsTickerHeight / 2 + headlineSize / 3);
      this.xPos -= scrollSpeed;
    }
    if (this.xPos <= -this.width) this.hasScrolledPast = true;
  }


}