///////////////////
// OO Twenty-One //
///////////////////

// Game (n)
//      start (v)
// Deck (n)
//      deal (v) (should this be here, or in Dealer?)
// Card (n)
// Participant (n)
// Player (n)
//      hit (v)
//      stay (v)
//      bust (state)
//      Score (n, state)
// Dealer (n)
//      hit (v)
//      stay (v)
//      deal (v) (should this be here, or in Deck?)
//      bust (state)
//      Score (n, state)

class Card {
  constructor(value, suit) {
    this.value = value;
    this.suit = suit;
  }

  // getValue
}

class Deck {
  constructor() {
    //STUB
  }

  deal() {
    //STUB
  }
}

class Participant {
  constructor() {
    //STUB
  }

  hit() {
    //STUB
  }

  stay() {
    //STUB
  }

  bust() {
    //STUB
  }

  score() {
    //STUB
  }
}

class Player extends Participant {
  constructor() {
    //STUB
    super();
  }
}

class Dealer extends Participant {
  constructor() {
    //STUB
    super();
  }
}

class TwentyOneGame {
  constructor() {
    //STUB
  }

  start() {
    //SPIKE
    this.displayWelcomeMessage();
    this.dealCards();
    this.showCards();
    this.playerTurn();
    this.dealerTurn();
    this.displayResult();
    this.displayGoodbyeMessage();
  }

  dealCards() {
    //STUB
  }

  showCards() {
    //STUB
  }

  playerTurn() {
    //STUB
  }

  dealerTurn() {
    //STUB
  }

  displayWelcomeMessage() {
    //STUB
  }

  displayGoodbyeMessage() {
    //STUB
  }

  displayResult() {
    //STUB
  }
}

let game = new TwentyOneGame();
game.start();